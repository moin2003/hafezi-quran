import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  X,
  Check,
  Loader2,
  Headphones,
  Repeat,
  Repeat1,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  RotateCw,
  ListMusic,
  BookOpen
} from 'lucide-react';
import { AyahAudioData, RepeatMode, ReadingMode } from '../types';
import { RECITERS_LIST, DEFAULT_RECITER_ID } from '../data/reciters';
import { fetchPageAyahs } from '../utils/audioService';
import { toBanglaNumber } from '../utils/helpers';

interface AudioPlayerProps {
  currentPage: number;
  totalPages: number;
  readingMode?: ReadingMode;
  isOpen: boolean;
  lang: 'bn' | 'en';
  onClose: () => void;
  onPageChange: (newPage: number) => void;
  onPlayStateChange?: (isPlaying: boolean, playingPage: number, reciterName: string) => void;
  playPageTrigger?: number | null; // Trigger to jump and play a specific page
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentPage,
  totalPages,
  readingMode = 'book',
  isOpen,
  lang = 'en',
  onClose,
  onPageChange,
  onPlayStateChange,
  playPageTrigger,
}) => {
  const isEn = lang === 'en';

  // Saved reciter or default Husary
  const [selectedReciterId, setSelectedReciterId] = useState<string>(() => {
    return localStorage.getItem('hafezi_reciter_id') || DEFAULT_RECITER_ID;
  });

  const [isReciterModalOpen, setIsReciterModalOpen] = useState(false);
  const [isAyahDrawerOpen, setIsAyahDrawerOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageAyahs, setPageAyahs] = useState<AyahAudioData[]>([]);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('continuous');

  // Audio seeking / time tracking
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const selectedReciter = RECITERS_LIST.find((r) => r.id === selectedReciterId) || RECITERS_LIST[0];

  // Book Spread 2-page calculation (RTL)
  const isBookSpread = readingMode === 'book';
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

  // Notify parent of play state
  useEffect(() => {
    onPlayStateChange?.(isPlaying, currentPage, isEn ? selectedReciter.name_en : selectedReciter.name_bn);
  }, [isPlaying, currentPage, selectedReciterId, isEn]);

  // Save selected reciter
  const handleSelectReciter = (id: string) => {
    setSelectedReciterId(id);
    localStorage.setItem('hafezi_reciter_id', id);
    setIsReciterModalOpen(false);
    loadPageAudio(currentPage, id, true);
  };

  // Load ayahs for page
  const loadPageAudio = async (page: number, reciterId: string, autoPlay: boolean = false, targetAyahIndex: number = 0) => {
    setIsLoading(true);
    try {
      const ayahs = await fetchPageAyahs(page, reciterId);
      setPageAyahs(ayahs);
      const safeIndex = Math.min(targetAyahIndex, Math.max(0, ayahs.length - 1));
      setCurrentAyahIndex(safeIndex);
      setIsLoading(false);

      if (autoPlay && ayahs.length > 0 && audioRef.current) {
        audioRef.current.src = ayahs[safeIndex].audioUrl;
        audioRef.current.playbackRate = playbackSpeed;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } catch (err) {
      console.error('Audio load error:', err);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  // When currentPage or isOpen changes, load audio
  useEffect(() => {
    if (isOpen) {
      loadPageAudio(currentPage, selectedReciterId, isPlaying);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    }
  }, [currentPage, isOpen]);

  // When external playPageTrigger fires
  useEffect(() => {
    if (playPageTrigger && isOpen) {
      loadPageAudio(playPageTrigger, selectedReciterId, true);
    }
  }, [playPageTrigger]);

  // Handle Ayah Ended event
  const handleAyahEnded = () => {
    if (repeatMode === 'repeat-ayah') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return;
    }

    if (currentAyahIndex < pageAyahs.length - 1) {
      // Next ayah on same page
      const nextIndex = currentAyahIndex + 1;
      playSpecificAyah(nextIndex);
    } else {
      // Page completed
      if (repeatMode === 'repeat-page') {
        playSpecificAyah(0);
      } else if (repeatMode === 'continuous') {
        if (currentPage < totalPages) {
          onPageChange(currentPage + 1);
        } else {
          setIsPlaying(false);
        }
      } else {
        setIsPlaying(false);
      }
    }
  };

  // Play a specific Ayah by index on the active page
  const playSpecificAyah = (index: number) => {
    if (!pageAyahs[index]) return;
    setCurrentAyahIndex(index);
    if (audioRef.current) {
      audioRef.current.src = pageAyahs[index].audioUrl;
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (pageAyahs.length === 0) {
        loadPageAudio(currentPage, selectedReciterId, true);
      } else {
        if (!audioRef.current.src && pageAyahs[currentAyahIndex]) {
          audioRef.current.src = pageAyahs[currentAyahIndex].audioUrl;
        }
        audioRef.current.playbackRate = playbackSpeed;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  // Previous Ayah
  const playPreviousAyah = () => {
    if (currentAyahIndex > 0) {
      playSpecificAyah(currentAyahIndex - 1);
    } else if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Next Ayah
  const playNextAyah = () => {
    if (currentAyahIndex < pageAyahs.length - 1) {
      playSpecificAyah(currentAyahIndex + 1);
    } else if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Forward / Rewind audio by N seconds
  const handleSeekRelative = (seconds: number) => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, Math.min(duration || 100, audioRef.current.currentTime + seconds));
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Seek to exact position with slider
  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Change playback speed
  const cycleSpeed = () => {
    const speeds = [0.75, 1.0, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const newSpeed = speeds[nextIdx];
    setPlaybackSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  // Cycle Repeat Mode
  const cycleRepeat = () => {
    const modes: RepeatMode[] = ['continuous', 'repeat-page', 'repeat-ayah', 'none'];
    const nextIdx = (modes.indexOf(repeatMode) + 1) % modes.length;
    setRepeatMode(modes[nextIdx]);
  };

  // Global Spacebar hotkey to toggle Play/Pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          target.closest('input') ||
          target.closest('textarea'))
      ) {
        return;
      }

      if (e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        togglePlay();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, isPlaying, pageAyahs, currentAyahIndex, currentPage, selectedReciterId, playbackSpeed]);

  // Format MM:SS helper
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen) return null;

  const currentAyah = pageAyahs[currentAyahIndex];

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={handleAyahEnded}
        onError={() => {
          setIsLoading(false);
          setIsPlaying(false);
        }}
      />

      {/* ========================================================
          FLOATING AUDIO DOCK (Smooth Animated Fluid Glass Deck)
      ======================================================== */}
      <div
        className={`fixed bottom-3 sm:bottom-6 right-2 sm:right-6 left-2 sm:left-auto z-45 max-w-[96vw] sm:max-w-md w-auto sm:w-[420px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] animate-player-in ${
          isEn ? 'font-sans' : 'font-bengali'
        }`}
      >
        {isMinimized ? (
          /* ========================================================
             MINIMIZED FLOATING PILL (Solid Opaque Luxury Pill)
          ======================================================== */
          <div className="bg-white dark:bg-[#12161a] rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.35)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.85)] border border-[#e2d8bd] dark:border-[#2a3442] p-2 sm:px-3.5 flex items-center justify-between gap-2.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] animate-in fade-in zoom-in-95">
            {/* Left: Wave Icon + Ayah title */}
            <div
              onClick={() => setIsMinimized(false)}
              className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm relative">
                <Headphones className="w-4 h-4 text-amber-300" />
                {isPlaying && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                )}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate flex items-center gap-1.5">
                  {currentAyah ? (
                    <>
                      <span>{isEn ? currentAyah.surahName_en : currentAyah.surahName_bn}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                        {isEn ? `:${currentAyah.numberInSurah}` : `:${toBanglaNumber(currentAyah.numberInSurah)}`}
                      </span>
                    </>
                  ) : (
                    <span>{isEn ? `Page ${currentPage}` : `পৃষ্ঠা ${toBanglaNumber(currentPage)}`}</span>
                  )}
                </div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                  {isEn ? selectedReciter.name_en : selectedReciter.name_bn}
                </div>
              </div>
            </div>

            {/* Right: Play/Pause, Expand, Close */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={togglePlay}
                disabled={isLoading}
                className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-sm cursor-pointer transition-transform active:scale-90"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                )}
              </button>

              <button
                onClick={() => setIsMinimized(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                title={isEn ? 'Expand Player' : 'প্লেয়ার বড় করুন'}
              >
                <ChevronUp className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                title={isEn ? 'Close Player' : 'বন্ধ করুন'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================
             EXPANDED FLOATING DOCK (Solid Opaque Luxury Card)
          ======================================================== */
          <div className="bg-white dark:bg-[#12161a] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-[#e2d8bd] dark:border-[#2a3442] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] animate-in fade-in zoom-in-95 flex flex-col max-h-[85vh]">
            
            {/* Top Bar: Reciter Picker Pill & Window Controls */}
            <div className="px-4 py-2.5 bg-gray-50/80 dark:bg-gray-900/60 border-b border-gray-100 dark:border-gray-800/80 flex items-center justify-between gap-2">
              {/* Reciter trigger button */}
              <button
                onClick={() => setIsReciterModalOpen(true)}
                className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 border border-emerald-200 dark:border-emerald-800 text-left transition-all group shrink-0 cursor-pointer"
                title={isEn ? 'Change Reciter' : 'ক্বারী পরিবর্তন করুন'}
              >
                <Headphones className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate max-w-[130px]">
                  {isEn ? selectedReciter.name_en : selectedReciter.name_bn}
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 underline font-semibold ml-0.5">
                  {isEn ? 'Change' : 'বদলান'}
                </span>
              </button>

              {/* Sound wave animated equalizer when playing */}
              {isPlaying && (
                <div className="flex items-center gap-0.5 h-3.5 px-1">
                  <span className="w-0.5 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-0.5 h-3.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-0.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.4s]" />
                  <span className="w-0.5 h-3 bg-emerald-500 rounded-full animate-bounce" />
                </div>
              )}

              {/* Window Controls */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  title={isEn ? 'Minimize' : 'ছোট করুন'}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  title={isEn ? 'Close' : 'বন্ধ করুন'}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Book Spread Two-Page Switcher Pill (In Book Mode) */}
            {isBookSpread && leftPage <= totalPages && (
              <div className="px-4 pt-2.5 pb-1 flex items-center justify-center gap-2 bg-emerald-50/40 dark:bg-emerald-950/20 border-b border-gray-100 dark:border-gray-800/50 text-xs">
                <span className="text-gray-500 dark:text-gray-400 font-semibold text-[11px] flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isEn ? 'Recite Page:' : 'তিলাওয়াত পৃষ্ঠা:'}</span>
                </span>
                
                {/* Right Page Button */}
                <button
                  onClick={() => {
                    if (currentPage !== rightPage) {
                      loadPageAudio(rightPage, selectedReciterId, true);
                    }
                  }}
                  className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer shadow-2xs ${
                    currentPage === rightPage
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white dark:bg-[#1b232e] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-emerald-50'
                  }`}
                >
                  {isEn ? `Right P. ${rightPage}` : `ডান পৃষ্ঠা ${toBanglaNumber(rightPage)}`}
                </button>

                {/* Left Page Button */}
                <button
                  onClick={() => {
                    if (currentPage !== leftPage) {
                      loadPageAudio(leftPage, selectedReciterId, true);
                    }
                  }}
                  className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer shadow-2xs ${
                    currentPage === leftPage
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white dark:bg-[#1b232e] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-emerald-50'
                  }`}
                >
                  {isEn ? `Left P. ${leftPage}` : `বাম পৃষ্ঠা ${toBanglaNumber(leftPage)}`}
                </button>
              </div>
            )}

            {/* Center: Live Ayah Track Info & Play Controls */}
            <div className="p-4 flex flex-col items-center overflow-y-auto">
              {/* Surah Name & Ayah Details */}
              <div className="w-full text-center mb-2.5">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 py-1">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{isEn ? 'Loading audio for this page...' : 'এই পৃষ্ঠার অডিও লোড হচ্ছে...'}</span>
                  </div>
                ) : currentAyah ? (
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-base font-bold text-gray-900 dark:text-gray-100">
                        {isEn ? currentAyah.surahName_en : currentAyah.surahName_bn}
                      </span>
                      {currentAyah.surahName_ar && (
                        <span className="font-arabic text-sm text-emerald-700 dark:text-emerald-400 font-bold">
                          ({currentAyah.surahName_ar})
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-1 text-xs text-emerald-800 dark:text-emerald-300 font-bold">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200">
                        {isEn
                          ? `Ayah ${currentAyah.numberInSurah}`
                          : `আয়াত ${toBanglaNumber(currentAyah.numberInSurah)}`}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600 dark:text-gray-400 font-medium">
                        {isEn ? `Page ${currentPage}` : `পৃষ্ঠা ${toBanglaNumber(currentPage)}`}
                      </span>
                    </div>

                    {/* Arabic Text Snippet of Current Ayah */}
                    {currentAyah.text_ar && (
                      <p className="font-arabic text-sm text-emerald-950 dark:text-emerald-100 mt-2 line-clamp-1 px-3 py-1 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-lg max-w-full text-center">
                        {currentAyah.text_ar}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    {isEn ? `Page ${currentPage} Recitation` : `পৃষ্ঠা ${toBanglaNumber(currentPage)} তিলাওয়াত`}
                  </div>
                )}
              </div>

              {/* Audio Progress Scrubber (Forward / Rewind Slider) */}
              <div className="w-full px-2 mb-2">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleScrubberChange}
                  className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Media Controls Bar with 10s Rewind / Forward */}
              <div className="w-full flex items-center justify-between gap-1.5 px-1 mb-2.5">
                {/* Playback Speed Switcher */}
                <button
                  onClick={cycleSpeed}
                  className="px-2 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                  title={isEn ? 'Playback Speed' : 'তিলাওয়াতের গতি'}
                >
                  {playbackSpeed}x
                </button>

                {/* 10s Rewind */}
                <button
                  onClick={() => handleSeekRelative(-10)}
                  className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  title={isEn ? 'Rewind 10s' : '১০ সেকেন্ড পিছিয়ে যান'}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Previous Ayah */}
                <button
                  onClick={playPreviousAyah}
                  className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  title={isEn ? 'Previous Ayah' : 'পূর্ববর্তী আয়াত'}
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                {/* Main Play / Pause Button */}
                <button
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                  title={isPlaying ? (isEn ? 'Pause' : 'পজ করুন') : (isEn ? 'Play' : 'প্লে করুন')}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-5 h-5 fill-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  )}
                </button>

                {/* Next Ayah */}
                <button
                  onClick={playNextAyah}
                  className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  title={isEn ? 'Next Ayah' : 'পরবর্তী আয়াত'}
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                {/* 10s Forward */}
                <button
                  onClick={() => handleSeekRelative(10)}
                  className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  title={isEn ? 'Forward 10s' : '১০ সেকেন্ড এগিয়ে যান'}
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                {/* Repeat Mode Switcher */}
                <button
                  onClick={cycleRepeat}
                  className={`p-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    repeatMode !== 'none'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 ring-1 ring-amber-400/40'
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                  }`}
                  title={
                    repeatMode === 'continuous'
                      ? isEn ? 'Continuous (Auto Next Page)' : 'ধারাবাহিক (পরবর্তী পৃষ্ঠা অটো-প্লে)'
                      : repeatMode === 'repeat-page'
                      ? isEn ? 'Repeat Page' : 'সম্পূর্ণ পৃষ্ঠা রিপিট'
                      : repeatMode === 'repeat-ayah'
                      ? isEn ? 'Repeat Single Ayah' : 'একই আয়াত রিপিট (হিফজ)'
                      : isEn ? 'No Repeat' : 'রিপিট বন্ধ'
                  }
                >
                  {repeatMode === 'repeat-ayah' ? (
                    <Repeat1 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  ) : (
                    <Repeat className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Ayah List Toggle Drawer Button */}
              <div className="w-full pt-1">
                <button
                  onClick={() => setIsAyahDrawerOpen(!isAyahDrawerOpen)}
                  className={`w-full py-2 px-3 rounded-2xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                    isAyahDrawerOpen
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ListMusic className="w-4 h-4" />
                    <span>
                      {isEn
                        ? `Select Ayah on Page (${pageAyahs.length} Ayahs)`
                        : `পৃষ্ঠার নির্দিষ্ট আয়াত নির্বাচন (${toBanglaNumber(pageAyahs.length)} আয়াত)`}
                    </span>
                  </span>
                  <span className="text-[11px] underline">
                    {isAyahDrawerOpen
                      ? isEn ? 'Hide List' : 'তালিকা লুকান'
                      : isEn ? 'View All Ayahs' : 'সব আয়াত দেখুন'}
                  </span>
                </button>

                {/* Expandable Ayahs List on Current Page with Smooth Sliding Accordion */}
                <div
                  className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                    isAyahDrawerOpen
                      ? 'max-h-56 opacity-100 mt-2'
                      : 'max-h-0 opacity-0 mt-0 pointer-events-none'
                  }`}
                >
                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1 py-1">
                    {pageAyahs.map((ayah, idx) => {
                      const isCurrent = idx === currentAyahIndex;
                      return (
                        <div
                          key={ayah.number}
                          onClick={() => playSpecificAyah(idx)}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                            isCurrent
                              ? 'bg-emerald-100/90 dark:bg-emerald-950/90 border-emerald-500 font-bold shadow-xs'
                              : 'bg-gray-50/60 dark:bg-gray-900/40 border-gray-100 dark:border-gray-800 hover:bg-emerald-50/50 hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <span
                              className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                                isCurrent
                                  ? 'bg-emerald-700 text-white'
                                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {isEn ? ayah.numberInSurah : toBanglaNumber(ayah.numberInSurah)}
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                                {isEn ? ayah.surahName_en : ayah.surahName_bn} •{' '}
                                {isEn ? `Ayah ${ayah.numberInSurah}` : `আয়াত ${toBanglaNumber(ayah.numberInSurah)}`}
                              </div>
                              {ayah.text_ar && (
                                <p className="font-arabic text-[11px] text-emerald-800 dark:text-emerald-300 truncate mt-0.5">
                                  {ayah.text_ar}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="shrink-0">
                            {isCurrent && isPlaying ? (
                              <div className="flex items-center gap-0.5 h-3 px-1">
                                <span className="w-0.5 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-0.5 h-3 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-0.5 h-2 bg-emerald-600 rounded-full animate-bounce" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                                <Play className="w-3 h-3 fill-emerald-600 ml-0.5" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reciters Selection Modal */}
      {isReciterModalOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 select-none ${isEn ? 'font-sans' : 'font-bengali'}`}>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsReciterModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white dark:bg-[#12161a] rounded-3xl shadow-2xl border border-[#e5dec9] dark:border-[#2a323d] p-5 sm:p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shadow-xs">
                  <Headphones className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-gray-100">
                    {isEn ? 'Select Quran Reciter' : 'কুরআন তিলাওয়াতকারী (ক্বারী) নির্বাচন'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {isEn ? 'High quality 128kbps crystal clear audio' : 'বিশ্ববিখ্যাত ক্বারীদের সহীহ ও সুমধুর তিলাওয়াত'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsReciterModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Reciters List */}
            <div className="mt-4 space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {RECITERS_LIST.map((reciter) => {
                const isSelected = reciter.id === selectedReciterId;
                return (
                  <div
                    key={reciter.id}
                    onClick={() => handleSelectReciter(reciter.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/50 shadow-sm ring-2 ring-emerald-500/20'
                        : 'border-gray-200 dark:border-gray-800 hover:border-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                          isSelected
                            ? 'bg-emerald-700 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {isSelected ? <Check className="w-5 h-5" /> : <Headphones className="w-4 h-4 text-gray-400" />}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100 truncate">
                            {isEn ? reciter.name_en : reciter.name_bn}
                          </span>
                          {reciter.style && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                              {reciter.style}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                          {isEn ? reciter.description_en : reciter.description_bn}
                        </p>
                      </div>
                    </div>

                    <span className="font-arabic text-base text-emerald-800 dark:text-emerald-300 font-bold ml-2 shrink-0">
                      {reciter.name_ar}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
