import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  BookOpen,
  Scroll,
  Sliders,
  X,
  Headphones,
  Play,
  Pause,
  Bookmark as BookmarkIcon
} from 'lucide-react';
import { ReadingMode, ThemeMode, QuranMetadata, Bookmark } from '../types';
import { toBanglaNumber, getPageInfo, getParaEnglishName } from '../utils/helpers';
import { sfx } from '../utils/sfxService';

interface QuranViewerProps {
  currentPage: number;
  totalPages: number;
  readingMode: ReadingMode;
  theme: ThemeMode;
  metadata: QuranMetadata | null;
  isZenMode: boolean;
  lang?: 'bn' | 'en';
  isAudioPlaying?: boolean;
  audioPlayingPage?: number;
  bookmarks?: Bookmark[];
  onPageChange: (page: number) => void;
  onToggleZenMode: () => void;
  onChangeReadingMode: (mode: ReadingMode) => void;
  onPlayPageAudio?: (page: number) => void;
  onToggleAudio?: () => void;
  onOpenBookmarkModal?: (page: number) => void;
}

export const QuranViewer: React.FC<QuranViewerProps> = ({
  currentPage,
  totalPages,
  readingMode,
  theme,
  metadata,
  isZenMode,
  lang = 'en',
  isAudioPlaying = false,
  audioPlayingPage = 1,
  bookmarks = [],
  onPageChange,
  onToggleZenMode,
  onChangeReadingMode,
  onPlayPageAudio,
  onToggleAudio,
  onOpenBookmarkModal,
}) => {
  const [zoom, setZoom] = useState(100);
  const [fitHeight, setFitHeight] = useState(true);
  const [showSliderPopover, setShowSliderPopover] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const isEn = lang === 'en';

  // Helper to render Corner Bookmark / Save Button on any page
  const renderBookmarkButton = (pageNum: number, positionClass: string) => {
    const isBookmarked = (bookmarks || []).some((b) => b.page === pageNum);
    const bm = (bookmarks || []).find((b) => b.page === pageNum);

    const badgeColor = isBookmarked
      ? bm?.type === 'sabaq'
        ? 'bg-emerald-700 text-white shadow-emerald-900/40 border-emerald-400/50 ring-1 ring-emerald-300/40'
        : bm?.type === 'amukhta'
        ? 'bg-amber-600 text-white shadow-amber-900/40 border-amber-300/50 ring-1 ring-amber-300/40'
        : bm?.type === 'dawr'
        ? 'bg-blue-600 text-white shadow-blue-900/40 border-blue-300/50 ring-1 ring-blue-300/40'
        : 'bg-emerald-700 text-white shadow-emerald-900/40 border-emerald-400/50 ring-1 ring-emerald-300/40'
      : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-100 hover:text-white border-amber-400/30 hover:border-amber-400/70 shadow-md';

    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          sfx.playGoldenClick();
          onOpenBookmarkModal?.(pageNum);
        }}
        className={`absolute ${positionClass} z-30 group flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border text-[11px] sm:text-xs font-bold transition-all duration-200 shadow-md hover:scale-105 active:scale-95 cursor-pointer select-none ${badgeColor}`}
        title={
          isBookmarked
            ? isEn
              ? `Page ${pageNum} Bookmarked (${bm?.title || 'Saved'}) - Click to edit`
              : `পৃষ্ঠা ${toBanglaNumber(pageNum)} বুকমার্ক সংরক্ষিত - পরিবর্তন করতে ক্লিক করুন`
            : isEn
            ? `Bookmark / Save Page ${pageNum}`
            : `পৃষ্ঠা ${toBanglaNumber(pageNum)} সেভ / বুকমার্ক করুন`
        }
      >
        <BookmarkIcon
          className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
            isBookmarked ? 'fill-current text-white' : 'text-amber-300 group-hover:text-amber-200'
          }`}
        />
        <span className="tracking-wide">
          {isBookmarked
            ? bm?.type === 'sabaq'
              ? isEn ? 'Sabaq' : 'সবক'
              : bm?.type === 'amukhta'
              ? isEn ? 'Amukhta' : 'আমুখতা'
              : bm?.type === 'dawr'
              ? isEn ? 'Dawr' : 'দাওর'
              : isEn ? 'Saved' : 'সেভড'
            : isEn ? 'Save' : 'সেভ'}
        </span>
      </button>
    );
  };

  const [isMobileScreen, setIsMobileScreen] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Strict mobile guard: Mobile screens ALWAYS render pure single page view
  const effectiveMode = isMobileScreen ? (readingMode === 'scroll' ? 'scroll' : 'single') : readingMode;

  // In scroll mode, track visible page on scroll
  useEffect(() => {
    if (effectiveMode !== 'scroll') return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const [pageNum, el] of pageRefs.current.entries()) {
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (pageNum !== currentPage) {
              onPageChange(pageNum);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [effectiveMode, currentPage, onPageChange]);

  // Scroll to current page when mode switches to scroll
  useEffect(() => {
    if (effectiveMode === 'scroll') {
      const el = pageRefs.current.get(currentPage);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [effectiveMode]);

  // Theme styling mapping
  const themeClasses = {
    paper: 'bg-[#f7f4ea] text-emerald-950 dark:bg-[#0e1318] dark:text-[#f3f4f6]',
    sepia: 'bg-[#f4ebd0] text-[#433422] dark:bg-[#1a140d] dark:text-[#ede4cf]',
    dark: 'bg-[#0f141c] text-[#e1e7ec]',
  }[theme];

  const pageWrapperClasses = {
    paper: 'bg-white shadow-xl dark:bg-[#151b22] dark:invert dark:contrast-125',
    sepia: 'bg-[#fbf5e6] sepia-[0.35] contrast-105 shadow-xl dark:bg-[#1a140d] dark:invert',
    dark: 'bg-[#151b22] invert contrast-125 shadow-2xl',
  }[theme];

  // In 15-line Hafezi Quran Book Spread:
  // Right page is lower number, Left page is higher number (RTL).
  let rightPage = 1;
  let leftPage = 2;

  if (currentPage > 1) {
    if (currentPage % 2 === 1) {
      rightPage = currentPage;
      leftPage = currentPage + 1;
    } else {
      rightPage = currentPage - 1;
      leftPage = currentPage;
    }
  }

  const changePage = (newPage: number) => {
    const valid = Math.max(1, Math.min(totalPages, newPage));
    if (valid !== currentPage) {
      sfx.playPageFlip();
      onPageChange(valid);
    }
  };

  // Intelligent adjacent page image preloading for instantaneous flips
  useEffect(() => {
    const pagesToPreload = [
      currentPage - 2,
      currentPage - 1,
      currentPage + 1,
      currentPage + 2,
      currentPage + 3,
    ].filter((p) => p >= 1 && p <= totalPages);

    pagesToPreload.forEach((p) => {
      const img = new Image();
      img.src = `/pages/page_${p}.webp`;
    });
  }, [currentPage, totalPages]);

  // Touch Swipe Handlers for smooth mobile gestures
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
      isSwiping.current = false;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartX.current;
    const deltaY = currentY - touchStartY.current;

    // If movement is predominantly horizontal, mark as swiping
    if (Math.abs(deltaX) > 15 && Math.abs(deltaX) > Math.abs(deltaY)) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;
    const deltaTime = Date.now() - touchStartTime.current;

    // Horizontal swipe criteria:
    // 1. Distance > 25px OR fast flick (distance > 18px and time < 300ms)
    // 2. Horizontal movement exceeds vertical movement
    const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.05;
    const isSufficientDist = Math.abs(deltaX) > 25 || (Math.abs(deltaX) > 18 && deltaTime < 350);

    if (isHorizontal && isSufficientDist) {
      isSwiping.current = true;
      if (effectiveMode === 'book') {
        if (deltaX < 0) {
          // In Desktop Book View: Left Arrow/Drag -> Next Spread
          changePage(Math.min(totalPages, rightPage + 2));
        } else {
          // Right Arrow/Drag -> Previous Spread
          changePage(Math.max(1, rightPage - 2));
        }
      } else {
        // Mobile Single Page View:
        if (deltaX > 0) {
          // Swiping Right -> Advance to Next Page (e.g. Page 1 Fatihah -> Page 2 Alif Lam Meem)
          changePage(Math.min(totalPages, currentPage + 1));
        } else {
          // Swiping Left -> Return to Previous Page
          changePage(Math.max(1, currentPage - 1));
        }
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    setTimeout(() => {
      isSwiping.current = false;
    }, 280);
  };

  // Tap-to-flip or tap-to-toggle zen mode on single page
  const handlePageTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSwiping.current) return;
    if ((e.target as HTMLElement).closest('button, input, a')) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (effectiveMode === 'book') {
      if (clickX < width * 0.25) {
        changePage(Math.min(totalPages, rightPage + 2));
      } else if (clickX > width * 0.75) {
        changePage(Math.max(1, rightPage - 2));
      } else {
        onToggleZenMode();
      }
    } else {
      // Mobile Single Page:
      if (clickX > width * 0.70) {
        // Right side tap -> Next Page (Page 1 -> Page 2)
        changePage(Math.min(totalPages, currentPage + 1));
      } else if (clickX < width * 0.30) {
        // Left side tap -> Previous Page
        changePage(Math.max(1, currentPage - 1));
      } else {
        // Center tap -> Toggle Zen Mode
        onToggleZenMode();
      }
    }
  };

  // Keyboard navigation for smooth page flipping (ArrowLeft, ArrowRight, PageUp, PageDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        // In Quran RTL: Left Arrow means Next Page (forward)
        if (effectiveMode === 'book') {
          changePage(Math.min(totalPages, rightPage + 2));
        } else {
          changePage(Math.min(totalPages, currentPage + 1));
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        // In Quran RTL: Right Arrow means Previous Page (backward)
        if (effectiveMode === 'book') {
          changePage(Math.max(1, rightPage - 2));
        } else {
          changePage(Math.max(1, currentPage - 1));
        }
      } else if (e.key === 'PageDown') {
        e.preventDefault();
        if (effectiveMode === 'book') {
          changePage(Math.min(totalPages, rightPage + 2));
        } else {
          changePage(Math.min(totalPages, currentPage + 1));
        }
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        if (effectiveMode === 'book') {
          changePage(Math.max(1, rightPage - 2));
        } else {
          changePage(Math.max(1, currentPage - 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [effectiveMode, rightPage, currentPage, totalPages, onPageChange]);

  const handleZoomIn = () => setZoom((prev) => Math.min(160, prev + 15));
  const handleZoomOut = () => setZoom((prev) => Math.max(80, prev - 15));
  const handleZoomReset = () => setZoom(100);

  const rightPageInfo = getPageInfo(rightPage, metadata);
  const leftPageInfo = getPageInfo(leftPage, metadata);

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`min-h-[100dvh] pt-13 sm:pt-16 pb-0 sm:pb-6 select-none transition-colors duration-300 ${themeClasses} flex flex-col justify-center relative overflow-x-hidden touch-pan-y ${isEn ? 'font-sans' : 'font-bengali'}`}
    >
      {/* Floating Side Flip Buttons on Desktop/Laptop/Tablet (Left & Right Screen Edges) */}
      {effectiveMode === 'book' && !isZenMode && (
        <>
          {/* Next Page Button (Left Side in RTL Quran) */}
          <button
            onClick={() => changePage(Math.min(totalPages, rightPage + 2))}
            disabled={leftPage >= totalPages}
            className="hidden md:flex fixed left-2 lg:left-5 top-1/2 -translate-y-1/2 z-35 w-11 lg:w-14 h-11 lg:h-14 p-2.5 lg:p-3.5 rounded-2xl bg-white/95 dark:bg-[#161c24]/95 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-2xl border border-emerald-200 dark:border-emerald-800 items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-20 disabled:pointer-events-none group cursor-pointer"
            title={isEn ? 'Next Pages (Left Arrow key)' : 'পরবর্তী পৃষ্ঠা (কীবোর্ড বাম তীর)'}
          >
            <ChevronLeft className="w-6 lg:w-8 h-6 lg:h-8 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Previous Page Button (Right Side in RTL Quran) */}
          <button
            onClick={() => changePage(Math.max(1, rightPage - 2))}
            disabled={rightPage <= 1}
            className="hidden md:flex fixed right-2 lg:right-5 top-1/2 -translate-y-1/2 z-35 w-11 lg:w-14 h-11 lg:h-14 p-2.5 lg:p-3.5 rounded-2xl bg-white/95 dark:bg-[#161c24]/95 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-2xl border border-emerald-200 dark:border-emerald-800 items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-20 disabled:pointer-events-none group cursor-pointer"
            title={isEn ? 'Previous Pages (Right Arrow key)' : 'পূর্ববর্তী পৃষ্ঠা (কীবোর্ড ডান তীর)'}
          >
            <ChevronRight className="w-7 lg:w-8 h-7 lg:h-8 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </>
      )}

      {/* ========================================================
          1. BOOK SPREAD VIEW (PC / Big Screen / Realistic Clean Mushaf)
      ======================================================== */}
      {effectiveMode === 'book' && (
        <div className="w-full max-w-[98vw] 2xl:max-w-[1760px] mx-auto px-2 sm:px-6 py-1 flex flex-col items-center justify-center flex-1">
          {/* Top Page Header Bar above the Book */}
          <div className="w-full max-w-5xl flex items-center justify-between px-3 sm:px-6 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
            {/* Left Page Info & Audio Trigger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {leftPage <= totalPages && (
                <>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200 font-bold text-xs sm:text-sm">
                    <span className="text-gray-500 dark:text-gray-400 font-normal">{isEn ? 'Left Page:' : 'বাম পৃষ্ঠা:'}</span>
                    <span>{isEn ? leftPage : toBanglaNumber(leftPage)}</span>
                  </div>

                  {/* Left Page Audio Recitation Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayPageAudio?.(leftPage);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer ${
                      isAudioPlaying && audioPlayingPage === leftPage
                        ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/50 animate-pulse'
                        : 'bg-emerald-100/90 dark:bg-emerald-950/80 hover:bg-emerald-200 dark:hover:bg-emerald-900 text-emerald-900 dark:text-emerald-200 border border-emerald-300/70 dark:border-emerald-700/60'
                    }`}
                    title={isEn ? `Play Page ${leftPage} Audio` : `পৃষ্ঠা ${toBanglaNumber(leftPage)} তিলাওয়াত শুনুন`}
                  >
                    <Headphones className="w-3.5 h-3.5" />
                    <span>{isEn ? `Play P. ${leftPage}` : `পৃষ্ঠা ${toBanglaNumber(leftPage)} তিলাওয়াত`}</span>
                  </button>

                  {leftPageInfo.para && (
                    <span className="hidden xl:inline text-xs text-gray-600 dark:text-gray-300 font-medium">
                      {isEn
                        ? `Para ${leftPageInfo.para.number}: ${getParaEnglishName(leftPageInfo.para.number)}`
                        : `পারা ${toBanglaNumber(leftPageInfo.para.number)}: ${leftPageInfo.para.name_bn}`}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Book Mode Center Label */}
            <div className="hidden md:flex text-center font-bold text-emerald-800 dark:text-emerald-300 items-center gap-2 text-xs sm:text-sm opacity-80">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>{isEn ? '15-Line Noorani Hafezi Quran' : '১৫ লাইনের নূরানী হাফেজী কোরআন'}</span>
            </div>

            {/* Right Page Info & Audio Trigger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {rightPageInfo.para && (
                <span className="hidden xl:inline text-xs text-gray-600 dark:text-gray-300 font-medium">
                  {isEn
                    ? `Para ${rightPageInfo.para.number}: ${getParaEnglishName(rightPageInfo.para.number)}`
                    : `পারা ${toBanglaNumber(rightPageInfo.para.number)}: ${rightPageInfo.para.name_bn}`}
                </span>
              )}

              {/* Right Page Audio Recitation Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayPageAudio?.(rightPage);
                }}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer ${
                  isAudioPlaying && audioPlayingPage === rightPage
                    ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/50 animate-pulse'
                    : 'bg-emerald-100/90 dark:bg-emerald-950/80 hover:bg-emerald-200 dark:hover:bg-emerald-900 text-emerald-900 dark:text-emerald-200 border border-emerald-300/70 dark:border-emerald-700/60'
                }`}
                title={isEn ? `Play Page ${rightPage} Audio` : `পৃষ্ঠা ${toBanglaNumber(rightPage)} তিলাওয়াত শুনুন`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>{isEn ? `Play P. ${rightPage}` : `পৃষ্ঠা ${toBanglaNumber(rightPage)} তিলাওয়াত`}</span>
              </button>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200 font-bold text-xs sm:text-sm">
                <span className="text-gray-500 dark:text-gray-400 font-normal">{isEn ? 'Right Page:' : 'ডান পৃষ্ঠা:'}</span>
                <span>{isEn ? rightPage : toBanglaNumber(rightPage)}</span>
              </div>
            </div>
          </div>

          {/* Clean Quran Book Layout */}
          <div
            className="w-full flex items-center justify-center transition-all duration-300 py-1"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
          >
            {/* Clean Book Spread Container with Natural Soft Shadow */}
            <div className="relative flex items-center justify-center max-w-full rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-[#d8ccb0] dark:border-[#2a3442] bg-[#fcfaf2] overflow-hidden">
              
              {/* Center Spine Shadow Line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-20 pointer-events-none bg-gradient-to-r from-black/15 via-black/5 to-black/15 shadow-inner"></div>

              {/* LEFT PAGE (Next Page in RTL) */}
              {leftPage <= totalPages ? (
                <div
                  onClick={onToggleZenMode}
                  className={`relative cursor-pointer flex items-center justify-center book-spine-left border-r border-[#e8dfc8] dark:border-[#2a323d] ${pageWrapperClasses}`}
                >
                  {/* Top-Left Corner Save/Bookmark Button */}
                  {renderBookmarkButton(leftPage, 'top-3 left-3 sm:top-3.5 sm:left-3.5')}

                  <img
                    src={`/pages/page_${leftPage}.webp`}
                    alt={`Hafezi Quran Page ${leftPage}`}
                    className={`block object-contain transition-all select-none ${
                      fitHeight ? 'h-[76vh] 2xl:h-[82vh] w-auto max-w-[48vw]' : 'w-full max-w-[550px] h-auto'
                    }`}
                    loading="eager"
                  />
                  {/* Page Badge */}
                  <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-emerald-950/75 backdrop-blur-md text-emerald-200 text-xs font-bold shadow-md border border-emerald-500/20">
                    {isEn ? `Page ${leftPage}` : `পৃষ্ঠা ${toBanglaNumber(leftPage)}`}
                  </div>
                </div>
              ) : (
                <div className={`p-20 flex flex-col items-center justify-center text-emerald-800 ${pageWrapperClasses}`}>
                  <span className="font-arabic text-3xl font-bold mb-2">تَمَّتْ بِالْخَيْرِ</span>
                  <span className="font-bold text-base">{isEn ? 'Holy Quran Completed' : 'কোরআন মাজিদ সমাপ্ত'}</span>
                </div>
              )}

              {/* RIGHT PAGE (Current / Lower Page in RTL) */}
              <div
                onClick={onToggleZenMode}
                className={`relative cursor-pointer flex items-center justify-center book-spine-right ${pageWrapperClasses}`}
              >
                {/* Top-Right Corner Save/Bookmark Button */}
                {renderBookmarkButton(rightPage, 'top-3 right-3 sm:top-3.5 sm:right-3.5')}

                <img
                  src={`/pages/page_${rightPage}.webp`}
                  alt={`Hafezi Quran Page ${rightPage}`}
                  className={`block object-contain transition-all select-none ${
                    fitHeight ? 'h-[76vh] 2xl:h-[82vh] w-auto max-w-[48vw]' : 'w-full max-w-[550px] h-auto'
                  }`}
                  loading="eager"
                />
                {/* Page Badge */}
                <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-emerald-950/75 backdrop-blur-md text-emerald-200 text-xs font-bold shadow-md border border-emerald-500/20">
                  {isEn ? `Page ${rightPage}` : `পৃষ্ঠা ${toBanglaNumber(rightPage)}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          2. SINGLE PAGE VIEW (Dedicated Full-Screen Mobile & Focus Reading)
      ======================================================== */}
      {effectiveMode === 'single' && (
        <div 
          onClick={handlePageTap}
          className="w-full flex-1 flex flex-col items-center justify-center relative cursor-pointer p-0 select-none min-h-[calc(100dvh-56px)] pt-14 pb-20 sm:pt-16 sm:pb-6"
        >
          {/* Full-Bleed Quran Page Image (Maximized for Mobile Screen) */}
          <div
            className={`relative rounded-none sm:rounded-2xl overflow-hidden shadow-none sm:shadow-2xl transition-all flex items-center justify-center w-full max-w-full sm:max-w-3xl ${pageWrapperClasses}`}
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
          >
            <img
              src={`/pages/page_${currentPage}.webp`}
              alt={`Hafezi Quran Page ${currentPage}`}
              className="w-full h-[calc(100dvh-145px)] sm:h-[86vh] object-contain block mx-auto select-none transition-all"
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* ========================================================
          3. CONTINUOUS SCROLL VIEW (Clean & Minimalist)
      ======================================================== */}
      {effectiveMode === 'scroll' && (
        <div ref={scrollContainerRef} className="w-full max-w-3xl mx-auto px-2 sm:px-4 py-2 space-y-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
            const isCurrent = pageNum === currentPage;
            const pInfo = getPageInfo(pageNum, metadata);

            return (
              <div
                key={pageNum}
                ref={(el) => {
                  if (el) pageRefs.current.set(pageNum, el);
                  else pageRefs.current.delete(pageNum);
                }}
                className={`relative rounded-2xl overflow-hidden border border-[#d8ccb0] dark:border-[#2a3442] shadow-lg transition-all ${pageWrapperClasses} ${
                  isCurrent ? 'ring-2 ring-emerald-600' : ''
                }`}
              >
                {/* Header for each page with Audio Trigger */}
                <div className="px-3 py-1.5 bg-[#f0e8d5] dark:bg-[#1a222d] border-b border-[#ded1b3] dark:border-[#2a3442] flex items-center justify-between text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0"></span>
                    <span className="text-emerald-950 dark:text-emerald-200 font-extrabold text-sm sm:text-base">
                      {isEn ? `Page ${pageNum}` : `পৃষ্ঠা ${toBanglaNumber(pageNum)}`}
                    </span>
                    {pInfo.para && (
                      <span className="text-gray-600 dark:text-gray-300 font-medium text-xs hidden sm:inline">
                        {isEn
                          ? `(Para ${pInfo.para.number})`
                          : `(পারা ${toBanglaNumber(pInfo.para.number)})`}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Play Audio Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayPageAudio?.(pageNum);
                      }}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer ${
                        isAudioPlaying && audioPlayingPage === pageNum
                          ? 'bg-emerald-600 text-white shadow-md animate-pulse'
                          : 'bg-white dark:bg-[#12161a] hover:bg-emerald-50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                      }`}
                    >
                      <Headphones className="w-3 h-3" />
                      <span>{isEn ? 'Play Audio' : 'অডিও'}</span>
                    </button>

                    {/* Bookmark / Save Button in Scroll Header */}
                    {(() => {
                      const isBookmarked = (bookmarks || []).some((b) => b.page === pageNum);
                      return (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sfx.playGoldenClick();
                            onOpenBookmarkModal?.(pageNum);
                          }}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer ${
                            isBookmarked
                              ? 'bg-emerald-700 text-white shadow-md ring-1 ring-emerald-400'
                              : 'bg-white dark:bg-[#12161a] hover:bg-emerald-50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                          }`}
                        >
                          <BookmarkIcon className={`w-3 h-3 ${isBookmarked ? 'fill-current' : ''}`} />
                          <span>{isBookmarked ? (isEn ? 'Saved' : 'সেভড') : (isEn ? 'Save' : 'সেভ')}</span>
                        </button>
                      );
                    })()}
                  </div>
                </div>

                {/* Page Image */}
                <div onClick={onToggleZenMode} className="cursor-pointer flex justify-center bg-white dark:bg-[#131920]">
                  <img
                    src={`/pages/page_${pageNum}.webp`}
                    alt={`Hafezi Quran Page ${pageNum}`}
                    className="w-full max-w-2xl h-auto object-contain block select-none"
                    loading={Math.abs(pageNum - currentPage) <= 3 ? 'eager' : 'lazy'}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================
          1. MOBILE APP FLOATING BOTTOM NAVIGATION BAR (Clean App Style)
      ======================================================== */}
      {isMobileScreen && !isZenMode && (
        <div className="fixed bottom-3 inset-x-3 max-w-sm mx-auto z-40">
          {/* Slider Popover on Mobile */}
          {showSliderPopover && (
            <div className="p-4 rounded-3xl bg-white/95 dark:bg-[#0c1810]/95 backdrop-blur-2xl border border-emerald-500/40 shadow-[0_15px_50px_rgba(0,0,0,0.6)] flex flex-col gap-2.5 w-full mb-2 animate-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-800 dark:text-gray-200">
                <span className="text-sm font-bold flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <Sliders className="w-4 h-4" />
                  <span>{isEn ? 'Jump to Page' : 'পৃষ্ঠায় যান'}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-black text-sm">
                  {isEn ? `${currentPage} / ${totalPages}` : `${toBanglaNumber(currentPage)} / ${toBanglaNumber(totalPages)}`}
                </span>
                <button
                  onClick={() => setShowSliderPopover(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <input
                type="range"
                min={1}
                max={totalPages}
                value={currentPage}
                onChange={(e) => changePage(parseInt(e.target.value, 10))}
                className="w-full h-3 bg-emerald-100 dark:bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              <div className="flex justify-between text-[11px] text-gray-500 font-bold px-1">
                <span>{isEn ? '1 (Fatihah)' : '১ (ফাতিহা)'}</span>
                <span>{isEn ? '300 (Kahf)' : '৩০০ (কাহাফ)'}</span>
                <span>{isEn ? '611 (Nas)' : '৬১১ (নাস)'}</span>
              </div>
            </div>
          )}

          {/* Floating Mobile App Bar (Luxury Modern 5-Item Pill Dock with Elevated Halo Button) */}
          <div className="relative rounded-3xl bg-white/95 dark:bg-[#07170e]/95 backdrop-blur-2xl border border-emerald-500/25 shadow-[0_12px_45px_rgba(0,0,0,0.35)] dark:shadow-[0_12px_45px_rgba(0,0,0,0.85)] px-2 py-1.5 flex items-center justify-around">
            
            {/* 1. Left Action: Previous Page (Page 2 -> Page 1) */}
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="flex flex-col items-center justify-center w-14 h-12 rounded-2xl text-gray-700 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 disabled:opacity-25 disabled:pointer-events-none transition-all active:scale-90 cursor-pointer"
              title={isEn ? 'Previous Page' : 'পূর্ববর্তী পৃষ্ঠা'}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-[10px] font-bold mt-0.5">{isEn ? 'Prev' : 'পূর্ব'}</span>
            </button>

            {/* 2. Bookmark / Save Action */}
            {(() => {
              const isBookmarked = (bookmarks || []).some((b) => b.page === currentPage);
              return (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sfx.playGoldenClick();
                    onOpenBookmarkModal?.(currentPage);
                  }}
                  className={`flex flex-col items-center justify-center w-14 h-12 rounded-2xl transition-all active:scale-90 cursor-pointer ${
                    isBookmarked
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/60 font-black'
                      : 'text-gray-700 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 font-bold'
                  }`}
                  title={isEn ? 'Bookmark / Save Page' : 'পৃষ্ঠা সেভ / বুকমার্ক করুন'}
                >
                  <BookmarkIcon className={`w-5 h-5 ${isBookmarked ? 'fill-emerald-600 dark:fill-emerald-400 text-emerald-600 dark:text-emerald-400' : ''}`} />
                  <span className="text-[10px] mt-0.5">{isBookmarked ? (isEn ? 'Saved' : 'সংরক্ষিত') : (isEn ? 'Save' : 'সেভ')}</span>
                </button>
              );
            })()}

            {/* 3. Center Elevated Action: Circular Audio Recitation Halo Button (Reference Style) */}
            <div className="relative -mt-6 flex flex-col items-center">
              {/* Concentric Halo Ring */}
              <div className="p-1 rounded-full bg-white/95 dark:bg-[#07170e]/95 shadow-md border border-emerald-500/20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onPlayPageAudio) onPlayPageAudio(currentPage);
                    else onToggleAudio?.();
                  }}
                  className={`w-13 h-13 rounded-full flex items-center justify-center text-white shadow-[0_8px_25px_rgba(16,185,129,0.55)] transition-all active:scale-90 cursor-pointer ${
                    isAudioPlaying && audioPlayingPage === currentPage
                      ? 'bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-400 ring-4 ring-emerald-400/40 animate-pulse'
                      : 'bg-gradient-to-tr from-emerald-800 via-emerald-700 to-emerald-600 hover:scale-105'
                  }`}
                  title={isEn ? 'Play Audio Recitation' : 'অডিও তিলাওয়াত শুনুন'}
                >
                  {isAudioPlaying && audioPlayingPage === currentPage ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>
              </div>
            </div>

            {/* 4. Page Dial / Slider Trigger */}
            <button
              onClick={() => setShowSliderPopover(!showSliderPopover)}
              className="flex flex-col items-center justify-center w-14 h-12 rounded-2xl text-gray-700 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 transition-all active:scale-90 cursor-pointer"
              title={isEn ? 'Page Slider' : 'পৃষ্ঠা স্লাইডার'}
            >
              <Sliders className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-[10px] font-black mt-0.5 text-emerald-700 dark:text-emerald-300">
                {isEn ? `P. ${currentPage}` : `পৃ. ${toBanglaNumber(currentPage)}`}
              </span>
            </button>

            {/* 5. Right Action: Next Page (Page 1 -> Page 2) */}
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="flex flex-col items-center justify-center w-14 h-12 rounded-2xl text-gray-700 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 disabled:opacity-25 disabled:pointer-events-none transition-all active:scale-90 cursor-pointer"
              title={isEn ? 'Next Page' : 'পরবর্তী পৃষ্ঠা'}
            >
              <ChevronRight className="w-5 h-5" />
              <span className="text-[10px] font-bold mt-0.5">{isEn ? 'Next' : 'পরবর্তী'}</span>
            </button>

          </div>
        </div>
      )}

      {/* ========================================================
          2. DESKTOP / TABLET FLOATING TOOL DOCK
      ======================================================== */}
      {!isMobileScreen && !isZenMode && (
        <div className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-35 flex flex-col items-center gap-2 max-w-[96vw]">
          {/* Slider Popover */}
          {showSliderPopover && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-[#12161a]/95 backdrop-blur-xl border border-[#e5dec9] dark:border-[#2a323d] shadow-2xl flex flex-col gap-2.5 w-[90vw] max-w-sm mb-1 animate-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
                <span className="text-sm font-bold flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-emerald-600" />
                  <span>{isEn ? 'Jump to Page' : 'পৃষ্ঠায় যান'}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-extrabold text-sm">
                  {isEn ? `${currentPage} / ${totalPages}` : `${toBanglaNumber(currentPage)} / ${toBanglaNumber(totalPages)}`}
                </span>
                <button
                  onClick={() => setShowSliderPopover(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <input
                type="range"
                min={1}
                max={totalPages}
                value={currentPage}
                onChange={(e) => changePage(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              <div className="flex justify-between text-[11px] text-gray-500 font-bold px-0.5">
                <span>{isEn ? '1 (Fatihah)' : '১ (ফাতিহা)'}</span>
                <span>{isEn ? '300 (Kahf)' : '৩০০ (কাহাফ)'}</span>
                <span>{isEn ? '611 (Nas)' : '৬১১ (নাস)'}</span>
              </div>
            </div>
          )}

          {/* Floating Actions Pill Dock on Desktop */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-2xl bg-white/95 dark:bg-[#12161a]/95 backdrop-blur-xl border border-[#e5dec9] dark:border-[#2a323d] shadow-[0_10px_35px_rgba(0,0,0,0.25)]">
            {/* Previous Page (RTL) */}
            <button
              onClick={() => {
                if (effectiveMode === 'book') changePage(Math.max(1, rightPage - 2));
                else changePage(Math.max(1, currentPage - 1));
              }}
              disabled={currentPage <= 1}
              className="p-2 sm:p-2.5 rounded-xl text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              title={isEn ? 'Previous Page' : 'পূর্বের পৃষ্ঠা'}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Page Slider Popover Trigger */}
            <button
              onClick={() => setShowSliderPopover(!showSliderPopover)}
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-extrabold flex items-center gap-1.5 hover:bg-emerald-100 transition-all cursor-pointer"
              title={isEn ? 'Page Slider & Dial' : 'পৃষ্ঠা ডায়াল ও স্লাইডার'}
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isEn ? `P. ${currentPage}` : `পৃ. ${toBanglaNumber(currentPage)}`}</span>
            </button>

            {/* Next Page (RTL) */}
            <button
              onClick={() => {
                if (effectiveMode === 'book') changePage(Math.min(totalPages, rightPage + 2));
                else changePage(Math.min(totalPages, currentPage + 1));
              }}
              disabled={currentPage >= totalPages}
              className="p-2 sm:p-2.5 rounded-xl text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              title={isEn ? 'Next Page' : 'পরবর্তী পৃষ্ঠা'}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="w-px h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 mx-0.5 sm:mx-1"></div>

            {/* Audio Recitation Dock Quick Toggle / Play Button */}
            <button
              onClick={() => {
                if (onPlayPageAudio) onPlayPageAudio(currentPage);
                else onToggleAudio?.();
              }}
              className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                isAudioPlaying
                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/50 animate-pulse'
                  : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800'
              }`}
              title={isEn ? 'Play Audio Recitation' : 'অডিও তিলাওয়াত শুনুন'}
            >
              <Headphones className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-300" />
              <span className="hidden xs:inline">{isAudioPlaying ? (isEn ? 'Playing' : 'চলছে') : (isEn ? 'Audio' : 'অডিও')}</span>
            </button>

            {/* Desktop Only Extra Tools: Zoom, Height Fit, Mode switch */}
            <div className="hidden sm:flex items-center gap-1">
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

              {/* Fit Screen Height Toggle */}
              <button
                onClick={() => setFitHeight(!fitHeight)}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  fitHeight
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title={isEn ? 'Fit Screen Height' : 'ফিট স্ক্রিন'}
              >
                <Maximize className="w-4 h-4" />
              </button>

              {/* Zoom Controls */}
              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                title={isEn ? 'Zoom Out' : 'জুম কমান'}
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                onClick={handleZoomReset}
                className="px-1 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-emerald-600 cursor-pointer"
                title={isEn ? 'Reset Zoom' : 'রিসেট'}
              >
                {zoom}%
              </button>

              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                title={isEn ? 'Zoom In' : 'জুম বাড়ান'}
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

              {/* Mode Switch (Book / Single / Scroll) */}
              <button
                onClick={() => onChangeReadingMode(readingMode === 'book' ? 'single' : 'book')}
                className="p-2 rounded-xl text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 transition-all cursor-pointer"
                title={readingMode === 'book' ? 'Single Page View' : 'Two-Page Book View'}
              >
                {readingMode === 'book' ? <BookOpen className="w-4 h-4" /> : <Scroll className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
