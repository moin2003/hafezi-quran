import React, { useState, useEffect } from 'react';
import { QuranMetadata, Bookmark, ReadingMode, ThemeMode } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { QuranViewer } from './components/QuranViewer';
import { NavigationDrawer } from './components/NavigationDrawer';
import { SearchModal } from './components/SearchModal';
import { BookmarkModal } from './components/BookmarkModal';
import { HafizTrackerModal } from './components/HafizTrackerModal';
import { AudioPlayer } from './components/AudioPlayer';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { AboutDeveloperModal } from './components/AboutDeveloperModal';
import { getPageInfo } from './utils/helpers';
import {
  getLastReadPage,
  setLastReadPage,
  getBookmarks,
  saveBookmarks,
  getSettings,
  saveSettings,
  getTodayReadCount,
} from './utils/storage';

type ViewState = 'splash' | 'home' | 'reader';

export const App: React.FC = () => {
  const [metadata, setMetadata] = useState<QuranMetadata | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(getLastReadPage());
  const [readingMode, setReadingMode] = useState<ReadingMode>('book');
  const [theme, setTheme] = useState<ThemeMode>('paper');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(getBookmarks());
  const [todayReadCount, setTodayReadCount] = useState<number>(getTodayReadCount());

  // Dual-Language Support ('en' by default on launch)
  const [lang, setLang] = useState<'bn' | 'en'>('en');

  // Distinct View States: 'splash' -> 'home' -> 'reader'
  const [viewState, setViewState] = useState<ViewState>('splash');

  // Modals & Panels for the reader
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const [targetBookmarkPage, setTargetBookmarkPage] = useState<number | null>(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isAboutDeveloperOpen, setIsAboutDeveloperOpen] = useState(false);

  const activeBookmarkPage = targetBookmarkPage ?? currentPage;
  const currentBookmark = bookmarks.find((b) => b.page === activeBookmarkPage);

  const handleOpenBookmarkForPage = (page: number) => {
    setTargetBookmarkPage(page);
    setIsBookmarkModalOpen(true);
  };
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioPlayingPage, setAudioPlayingPage] = useState<number>(currentPage);
  const [playPageTrigger, setPlayPageTrigger] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);

  // Load Quran Metadata
  useEffect(() => {
    fetch('/data/quran_metadata.json')
      .then((res) => res.json())
      .then((data) => setMetadata(data))
      .catch((err) => console.error('Failed to load metadata:', err));
  }, []);

  // Load settings & set default mode based on screen width
  useEffect(() => {
    const settings = getSettings();
    setTheme(settings.theme);

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setReadingMode('single');
    } else {
      setReadingMode(settings.readingMode || 'book');
    }
  }, []);

  // Apply Theme to document root
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    if (theme === 'dark') {
      root.classList.add('dark');
    }
  }, [theme]);

  // Sync Last Read Page & Navigate into Reader
  const handlePageChange = (newPage: number) => {
    const validPage = Math.max(1, Math.min(611, newPage));
    setCurrentPage(validPage);
    setLastReadPage(validPage);
    setTodayReadCount(getTodayReadCount());
  };

  const handleSelectPageFromHome = (page: number) => {
    handlePageChange(page);
    setViewState('reader');
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  // Bookmark actions
  const handleSaveBookmark = (bmData: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBm: Bookmark = {
      ...bmData,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    const updated = [newBm, ...bookmarks.filter((b) => b.page !== bmData.page)];
    setBookmarks(updated);
    saveBookmarks(updated);
  };

  const handleDeleteBookmark = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    saveBookmarks(updated);
  };

  const isCurrentPageBookmarked = bookmarks.some((b) => b.page === currentPage);

  // Fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const pageInfo = getPageInfo(currentPage, metadata);

  const handlePlaySpecificPage = (pageNumber: number) => {
    handlePageChange(pageNumber);
    setAudioPlayingPage(pageNumber);
    setPlayPageTrigger(pageNumber);
    setIsAudioOpen(true);
  };

  // 1. Cinematic Opening Splash Screen (Shown first, purely isolated)
  if (viewState === 'splash') {
    return (
      <>
        <SplashScreen
          onEnter={() => setViewState('home')}
          onOpenAboutDeveloper={() => setIsAboutDeveloperOpen(true)}
        />
        <AboutDeveloperModal
          isOpen={isAboutDeveloperOpen}
          onClose={() => setIsAboutDeveloperOpen(false)}
          lang={lang}
        />
      </>
    );
  }

  // 2. Full Informative Home Hub (Purely isolated without reader bars)
  if (viewState === 'home') {
    return (
      <div className={lang === 'en' ? 'font-sans' : 'font-bengali'}>
        <HomeScreen
          lastReadPage={currentPage}
          metadata={metadata}
          lang={lang}
          onToggleLang={handleToggleLang}
          onSelectPage={handleSelectPageFromHome}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onOpenAboutDeveloper={() => setIsAboutDeveloperOpen(true)}
        />
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          metadata={metadata}
          lang={lang}
          onSelectPage={handleSelectPageFromHome}
        />
        <NavigationDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          metadata={metadata}
          currentPage={currentPage}
          bookmarks={bookmarks}
          lang={lang}
          onSelectPage={handleSelectPageFromHome}
          onDeleteBookmark={handleDeleteBookmark}
          onOpenAboutDeveloper={() => setIsAboutDeveloperOpen(true)}
        />
        <AboutDeveloperModal
          isOpen={isAboutDeveloperOpen}
          onClose={() => setIsAboutDeveloperOpen(false)}
          lang={lang}
        />
      </div>
    );
  }

  // 3. Primary Quran Reader Experience (Only shows when inside reader)
  return (
    <div className={`min-h-screen relative ${lang === 'en' ? 'font-sans' : 'font-bengali'}`}>
      {/* Top Header */}
      <Header
        pageInfo={pageInfo}
        totalPages={metadata?.total_pages || 611}
        readingMode={readingMode}
        theme={theme}
        isBookmarked={isCurrentPageBookmarked}
        isFullscreen={isFullscreen}
        isZenMode={isZenMode}
        isAudioOpen={isAudioOpen}
        lang={lang}
        onToggleAudio={() => setIsAudioOpen((prev) => !prev)}
        onToggleLang={handleToggleLang}
        onOpenHome={() => setViewState('home')}
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmark={() => setIsBookmarkModalOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onChangeReadingMode={(mode) => {
          setReadingMode(mode);
          saveSettings({ ...getSettings(), readingMode: mode });
        }}
        onChangeTheme={(th) => {
          setTheme(th);
          saveSettings({ ...getSettings(), theme: th });
        }}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Floating Left Sidebar on PC */}
      <Sidebar
        metadata={metadata}
        currentPage={currentPage}
        bookmarks={bookmarks}
        isZenMode={isZenMode}
        lang={lang}
        isAudioPlaying={isAudioPlaying}
        onSelectPage={handlePageChange}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenHome={() => setViewState('home')}
        onToggleAudio={() => setIsAudioOpen((prev) => !prev)}
        onPlayPage={handlePlaySpecificPage}
      />

      {/* Main Quran Reader */}
      <QuranViewer
        currentPage={currentPage}
        totalPages={metadata?.total_pages || 611}
        readingMode={readingMode}
        theme={theme}
        metadata={metadata}
        isZenMode={isZenMode}
        lang={lang}
        isAudioPlaying={isAudioPlaying}
        audioPlayingPage={audioPlayingPage}
        bookmarks={bookmarks}
        onPageChange={handlePageChange}
        onToggleZenMode={() => setIsZenMode((prev) => !prev)}
        onChangeReadingMode={(mode) => {
          setReadingMode(mode);
          saveSettings({ ...getSettings(), readingMode: mode });
        }}
        onPlayPageAudio={handlePlaySpecificPage}
        onToggleAudio={() => setIsAudioOpen((prev) => !prev)}
        onOpenBookmarkModal={handleOpenBookmarkForPage}
      />

      {/* Modern Floating Audio Recitation Dock (Positioned Bottom-Right) */}
      <AudioPlayer
        currentPage={currentPage}
        totalPages={metadata?.total_pages || 611}
        readingMode={readingMode}
        isOpen={isAudioOpen}
        isZenMode={isZenMode}
        lang={lang}
        playPageTrigger={playPageTrigger}
        onPlayStateChange={(playing, page) => {
          setIsAudioPlaying(playing);
          setAudioPlayingPage(page);
        }}
        onClose={() => {
          setIsAudioOpen(false);
          setIsAudioPlaying(false);
        }}
        onPageChange={handlePageChange}
      />

      {/* Navigation Drawer (Paras, Surahs, Musabbahat, Manzils, Sajdahs, Bookmarks) */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        metadata={metadata}
        currentPage={currentPage}
        bookmarks={bookmarks}
        lang={lang}
        onSelectPage={handlePageChange}
        onDeleteBookmark={handleDeleteBookmark}
        onOpenAboutDeveloper={() => setIsAboutDeveloperOpen(true)}
      />

      {/* Quick Search & Page Dial Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        metadata={metadata}
        lang={lang}
        onSelectPage={handlePageChange}
      />

      {/* Bookmark Modal */}
      <BookmarkModal
        isOpen={isBookmarkModalOpen}
        onClose={() => {
          setIsBookmarkModalOpen(false);
          setTargetBookmarkPage(null);
        }}
        currentPage={activeBookmarkPage}
        existingBookmark={currentBookmark}
        lang={lang}
        onSaveBookmark={handleSaveBookmark}
        onDeleteBookmark={handleDeleteBookmark}
      />

      {/* Hafiz Progress Tracker Modal */}
      <HafizTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        currentPage={currentPage}
        totalPages={metadata?.total_pages || 611}
        todayReadCount={todayReadCount}
        bookmarks={bookmarks}
        lang={lang}
        onSelectPage={handlePageChange}
      />

      {/* About Developer & Initiator Modal */}
      <AboutDeveloperModal
        isOpen={isAboutDeveloperOpen}
        onClose={() => setIsAboutDeveloperOpen(false)}
        lang={lang}
      />
    </div>
  );
};
