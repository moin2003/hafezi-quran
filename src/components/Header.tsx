import React from 'react';
import {
  Menu,
  Search,
  BookOpen,
  Scroll,
  FileText,
  Sun,
  Moon,
  Bookmark as BookmarkIcon,
  Maximize2,
  Minimize2,
  Sparkles,
  Award,
  Home,
  Globe,
  Headphones
} from 'lucide-react';
import { PageInfo, toBanglaNumber, getParaEnglishName } from '../utils/helpers';
import { ReadingMode, ThemeMode } from '../types';

interface HeaderProps {
  pageInfo: PageInfo;
  totalPages: number;
  readingMode: ReadingMode;
  theme: ThemeMode;
  isBookmarked: boolean;
  isFullscreen: boolean;
  isZenMode: boolean;
  isAudioOpen: boolean;
  lang: 'bn' | 'en';
  onToggleAudio: () => void;
  onToggleLang: () => void;
  onOpenHome: () => void;
  onToggleDrawer: () => void;
  onOpenSearch: () => void;
  onOpenBookmark: () => void;
  onOpenTracker: () => void;
  onChangeReadingMode: (mode: ReadingMode) => void;
  onChangeTheme: (theme: ThemeMode) => void;
  onToggleFullscreen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  pageInfo,
  totalPages,
  readingMode,
  theme,
  isBookmarked,
  isFullscreen,
  isZenMode,
  isAudioOpen,
  lang,
  onToggleAudio,
  onToggleLang,
  onOpenHome,
  onToggleDrawer,
  onOpenSearch,
  onOpenBookmark,
  onOpenTracker,
  onChangeReadingMode,
  onChangeTheme,
  onToggleFullscreen,
}) => {
  const isEn = lang === 'en';

  const t = {
    home: isEn ? 'Home' : 'হোম',
    index: isEn ? 'Index' : 'সূচীপত্র',
    brand: isEn ? 'Hafezi Quran' : 'হাফেজী কোরআন',
    audio: isEn ? 'Recite' : 'তিলাওয়াত',
    tracker: isEn ? 'Hafiz Tracker' : 'হাফিজ ট্র্যাকার',
    bookmark: isEn ? 'Bookmark' : 'বুকমার্ক',
    bookMode: isEn ? 'Book' : 'বই',
    scrollMode: isEn ? 'Scroll' : 'স্ক্রল',
    singleMode: isEn ? 'Single' : 'এক পাতা',
    langToggle: isEn ? 'বাংলা' : 'EN',
  };

  const activeSurahName = pageInfo.surahs.length > 0
    ? (isEn ? pageInfo.surahs[0].name_en : pageInfo.surahs[0].name_bn)
    : '';

  const activeParaName = pageInfo.para
    ? (isEn ? `Para ${pageInfo.para.number}: ${getParaEnglishName(pageInfo.para.number)}` : `পারা ${toBanglaNumber(pageInfo.para.number)}`)
    : '';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isZenMode ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      } bg-white/95 dark:bg-[#12161a]/95 backdrop-blur-md border-b border-[#e5dec9] dark:border-[#2a323d] shadow-xs select-none ${
        isEn ? 'font-sans' : 'font-bengali'
      }`}
    >
      <div className="max-w-[1760px] mx-auto px-2.5 xs:px-3 sm:px-8 h-16 flex items-center justify-between">
        
        {/* ========================================================
            1. MOBILE APP HEADER (< md / 768px) - Spacious, Elegant & Clear
        ======================================================== */}
        <div className="flex md:hidden items-center justify-between w-full gap-1.5 h-16">
          {/* Left: Home & Index Drawer */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onOpenHome}
              className="w-10 h-10 rounded-full text-amber-600 dark:text-amber-400 hover:bg-amber-50/80 dark:hover:bg-amber-950/40 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
              title={isEn ? 'Return Home' : 'হোমে ফিরে যান'}
            >
              <Home className="w-5 h-5" />
            </button>
            <button
              onClick={onToggleDrawer}
              className="h-10 px-3 rounded-full text-emerald-900 dark:text-emerald-200 bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-500/25 font-bold text-xs flex items-center gap-1.5 shadow-2xs active:scale-95 transition-all cursor-pointer"
              title={isEn ? 'Open Quran Index' : 'সূচীপত্র'}
            >
              <Menu className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t.index}</span>
            </button>
          </div>

          {/* Center: Live Surah & Page Number (Tappable Search & Jump) */}
          <button
            onClick={onOpenSearch}
            className="flex-1 flex items-center justify-center gap-1.5 h-10 px-3 rounded-full bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-500/25 text-emerald-950 dark:text-emerald-100 shadow-2xs active:scale-98 transition-all group cursor-pointer min-w-0 max-w-[210px] mx-1"
            title={isEn ? 'Search or Jump to Surah / Page' : 'সূরা বা পৃষ্ঠায় যান'}
          >
            <span className="truncate text-xs font-black text-emerald-950 dark:text-emerald-100">
              {activeSurahName || (isEn ? 'Holy Quran' : 'পবিত্র কুরআন')}
            </span>
            <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px] font-black shadow-2xs whitespace-nowrap shrink-0">
              {isEn ? `P. ${pageInfo.page}` : `পৃ. ${toBanglaNumber(pageInfo.page)}`}
            </span>
          </button>

          {/* Right: Theme Toggle & Language Switch */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={() => {
                if (theme === 'paper') onChangeTheme('sepia');
                else if (theme === 'sepia') onChangeTheme('dark');
                else onChangeTheme('paper');
              }}
              className="w-9 h-9 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors cursor-pointer"
              title={isEn ? `Theme: ${theme}` : `থিম: ${theme}`}
            >
              {theme === 'paper' && <Sun className="w-4.5 h-4.5 text-amber-500" />}
              {theme === 'sepia' && <Sparkles className="w-4.5 h-4.5 text-yellow-600" />}
              {theme === 'dark' && <Moon className="w-4.5 h-4.5 text-blue-400" />}
            </button>

            {/* Language Switch */}
            <button
              onClick={onToggleLang}
              className="h-9 px-2.5 rounded-full bg-amber-50/90 dark:bg-amber-950/50 border border-amber-500/25 text-amber-900 dark:text-amber-200 text-[11px] font-extrabold flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              title={isEn ? 'Switch Language' : 'ভাষা পরিবর্তন'}
            >
              {t.langToggle}
            </button>
          </div>
        </div>

        {/* ========================================================
            2. DESKTOP HEADER (md and up / 768px+) - Full Feature Suite
        ======================================================== */}
        <div className="hidden md:flex items-center justify-between w-full gap-4">
          {/* Left Side: Brand, Home & Index Button */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            {/* Home Button */}
            <button
              onClick={onOpenHome}
              className="px-3.5 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all flex items-center gap-1.5 font-bold text-sm cursor-pointer"
              title={isEn ? 'Return to Home Screen' : 'হোম স্ক্রিনে ফিরে যান'}
            >
              <Home className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="font-semibold">{t.home}</span>
            </button>

            {/* Drawer Index Button */}
            <button
              onClick={onToggleDrawer}
              className="px-3.5 py-2 rounded-xl text-emerald-800 dark:text-emerald-200 bg-emerald-50/80 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200/80 dark:border-emerald-800/60 transition-all flex items-center gap-1.5 font-bold text-sm shadow-2xs cursor-pointer shrink-0"
              title={isEn ? 'Open Quran Index (30 Paras & 114 Surahs)' : 'সূচীপত্র ও হাফিজ টুলস'}
            >
              <Menu className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t.index}</span>
            </button>

            {/* Brand Logo Text */}
            <div
              onClick={onOpenHome}
              className="hidden xl:flex items-center gap-2 ml-2 pl-3 border-l border-gray-200 dark:border-gray-700 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-bold text-emerald-900 dark:text-emerald-200 tracking-normal">
                {t.brand}
              </span>
            </div>
          </div>

          {/* Center: Search & Current Location Capsule */}
          <div className="flex items-center justify-center flex-1 max-w-xl mx-2 min-w-0">
            <button
              onClick={onOpenSearch}
              className="w-auto flex items-center justify-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50/90 via-emerald-50/60 to-emerald-50/90 dark:from-emerald-950/40 dark:via-emerald-900/30 dark:to-emerald-950/40 border border-emerald-300/70 dark:border-emerald-700/60 text-emerald-950 dark:text-emerald-100 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-md transition-all text-sm font-medium shadow-2xs group cursor-pointer min-w-0"
              title={isEn ? 'Click to search or jump to page' : 'ক্লিক করে সার্চ বা সরাসরি পেজে যান'}
            >
              {pageInfo.para && (
                <span className="font-bold text-emerald-800 dark:text-emerald-300 truncate max-w-[170px]">
                  {activeParaName}
                </span>
              )}
              {activeSurahName && (
                <>
                  <span className="text-emerald-400 dark:text-emerald-600 font-bold">•</span>
                  <span className="truncate max-w-[140px] text-gray-700 dark:text-gray-200 font-semibold">
                    {activeSurahName}
                  </span>
                </>
              )}
              <span className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-0.5 rounded-full text-xs font-black shadow-2xs whitespace-nowrap shrink-0">
                {isEn ? `P. ${pageInfo.page}/${totalPages}` : `পৃ. ${toBanglaNumber(pageInfo.page)}`}
              </span>
              <Search className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
            </button>
          </div>

          {/* Right Side: Audio Recitation, Language Toggle, Tools, Modes & Settings */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            {/* Audio Recitation Toggle Button */}
            <button
              onClick={onToggleAudio}
              className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold shadow-2xs cursor-pointer ${
                isAudioOpen
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md animate-pulse'
                  : 'bg-emerald-50/90 dark:bg-emerald-950/50 hover:bg-emerald-100 text-emerald-900 dark:text-emerald-200 border-emerald-300/70 dark:border-emerald-800/60'
              }`}
              title={isEn ? 'Toggle Quran Audio Recitation' : 'কুরআন অডিও তিলাওয়াত চালু/বন্ধ'}
            >
              <Headphones className={`w-4 h-4 ${isAudioOpen ? 'text-amber-300' : 'text-emerald-600 dark:text-emerald-400'}`} />
              <span>{t.audio}</span>
            </button>

            {/* Language Switcher Pill */}
            <button
              onClick={onToggleLang}
              className="px-3 py-1.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 hover:bg-amber-100/90 dark:hover:bg-amber-900/50 border border-amber-300/70 dark:border-amber-700/60 text-amber-900 dark:text-amber-200 text-xs font-bold transition-all flex items-center gap-1 shadow-2xs cursor-pointer shrink-0"
              title={isEn ? 'Switch to Bangla' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{t.langToggle}</span>
            </button>

            {/* Hafiz Progress Tracker Button */}
            <button
              onClick={onOpenTracker}
              className="p-2 rounded-xl text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors cursor-pointer"
              title={t.tracker}
            >
              <Award className="w-5 h-5" />
            </button>

            {/* Bookmark Button */}
            <button
              onClick={onOpenBookmark}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isBookmarked
                  ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/60'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title={t.bookmark}
            >
              <BookmarkIcon className={`w-5 h-5 ${isBookmarked ? 'fill-emerald-600 text-emerald-600' : ''}`} />
            </button>

            {/* Reading Mode Switcher (Book, Scroll, Single) */}
            <div className="hidden lg:flex items-center bg-gray-100/80 dark:bg-[#1a222c] rounded-xl p-1 border border-gray-200/80 dark:border-gray-700/80 gap-0.5">
              <button
                onClick={() => onChangeReadingMode('book')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  readingMode === 'book'
                    ? 'bg-white dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
                title={isEn ? 'Two-Page Realistic Book Mode' : 'বই মোড (দুই পাতা পাশাপাশি)'}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t.bookMode}</span>
              </button>
              <button
                onClick={() => onChangeReadingMode('scroll')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  readingMode === 'scroll'
                    ? 'bg-white dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
                title={isEn ? 'Continuous Vertical Scrolling' : 'স্ক্রলিং মোড (একনাগাড়ে স্ক্রল)'}
              >
                <Scroll className="w-3.5 h-3.5" />
                <span>{t.scrollMode}</span>
              </button>
              <button
                onClick={() => onChangeReadingMode('single')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  readingMode === 'single'
                    ? 'bg-white dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
                title={isEn ? 'Single Page Focus' : 'সিঙ্গেল পাতা মোড'}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.singleMode}</span>
              </button>
            </div>

            {/* Theme Switcher */}
            <button
              onClick={() => {
                if (theme === 'paper') onChangeTheme('sepia');
                else if (theme === 'sepia') onChangeTheme('dark');
                else onChangeTheme('paper');
              }}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              title={isEn ? `Theme: ${theme}` : `বর্তমান থিম: ${theme}`}
            >
              {theme === 'paper' && <Sun className="w-5 h-5 text-amber-500" />}
              {theme === 'sepia' && <Sparkles className="w-5 h-5 text-yellow-600" />}
              {theme === 'dark' && <Moon className="w-5 h-5 text-blue-400" />}
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={onToggleFullscreen}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              title={isEn ? 'Toggle Fullscreen' : 'ফুলস্ক্রিন করুন'}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
