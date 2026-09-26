import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  Search,
  CheckCircle2,
  Play,
  Globe,
  Bookmark,
  Volume2,
  VolumeX,
  FileText,
} from 'lucide-react';
import { toBanglaNumber } from '../utils/helpers';
import { QuranMetadata } from '../types';
import { HomeQuranDial } from './HomeQuranDial';
import { sfx } from '../utils/sfxService';

interface HomeScreenProps {
  lastReadPage: number;
  metadata: QuranMetadata | null;
  lang: 'bn' | 'en';
  onToggleLang: () => void;
  onSelectPage: (page: number) => void;
  onOpenSearch: () => void;
  onOpenDrawer: () => void;
  onOpenAboutDeveloper?: () => void;
  onOpenBlog?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  lastReadPage,
  metadata,
  lang,
  onToggleLang,
  onSelectPage,
  onOpenSearch,
  onOpenDrawer,
  onOpenAboutDeveloper,
  onOpenBlog,
}) => {
  const [isMuted, setIsMuted] = useState(sfx.isMuted());
  const currentParaNum = Math.ceil(lastReadPage / 20);
  const currentPara = metadata?.paras.find((p) => p.number === currentParaNum);

  const toggleSound = () => {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
  };

  const handleRead = (page: number) => {
    sfx.playGoldenClick();
    onSelectPage(page);
  };

  const handleOpenSearch = () => {
    sfx.playGoldenClick();
    onOpenSearch();
  };

  const handleOpenDrawer = () => {
    sfx.playGoldenClick();
    onOpenDrawer();
  };

  const t = {
    bn: {
      searchPlaceholder: 'পৃষ্ঠা নম্বর (১ - ৬১১) বা সূরা খুঁজুন...',
      readBtn: 'কোরআন পড়ুন',
      langToggle: 'English',
      heroTitle: 'QuranFolio — ১৫ লাইনের নূরানী হাফেজী কোরআন শরীফ',
      heroBadge: 'QuranFolio • পূর্ণাঙ্গ ৩০ পারা ও ১১৪ সূরা • নূরানী স্ট্যান্ডার্ড',
      cardResumeTitle: `পৃষ্ঠা ${toBanglaNumber(lastReadPage)} থেকে পড়ুন`,
      cardResumeTag: 'সর্বশেষ পঠিত',
      cardResumeSub: currentPara ? `পারা ${toBanglaNumber(currentPara.number)}: ${currentPara.name_bn}` : 'যেখান থেকে রেখেছিলেন',
      cardStartTitle: 'সূরা আল-ফাতিহা',
      cardStartTag: 'প্রথম থেকে শুরু',
      cardStartSub: '১ম পারা • ১ম পৃষ্ঠা',
      cardIndexTitle: '৩০ পারা ও ১১৪ সূরা',
      cardIndexTag: 'সম্পূর্ণ সূচীপত্র',
      cardIndexSub: 'মঞ্জিল, সাজদাহ ও মুসাব্বাহাত',
      quickNavTitle: 'বহুল পঠিত গুরুত্বপূর্ণ সূরাসমূহ',
      feat1: '১৫ লাইনের নিখুঁত ছাপা',
      feat2: 'রিয়েল ২-পৃষ্ঠা বুক ভিউ',
      feat3: 'সবক, আমুখতা ও দাওর ট্র্যাকার',
      feat4: '১০০% অফলাইনে ব্যবহারযোগ্য',
      creditLabel: 'পরিকল্পনা ও উদ্যোগে:',
      creditName: 'হাফেজ মোঃ মঈনুল ইসলাম',
      surahYasin: 'সূরা ইয়াসীন',
      surahYasinP: 'পৃ. ৪৩৯',
      surahRahman: 'সূরা আর-রহমান',
      surahRahmanP: 'পৃ. ৫৩১',
      surahMulk: 'সূরা আল-মুলক',
      surahMulkP: 'পৃ. ৫৬২',
      surahKahf: 'সূরা আল-কাহফ',
      surahKahfP: 'পৃ. ২৯৩',
      surahWaqiah: 'সূরা আল-ওয়াক্বিয়া',
      surahWaqiahP: 'পৃ. ৫৩৪',
      ammaPara: 'আম্মা পারা',
      ammaParaP: 'পৃ. ৫৮১',
      cardBlogTitle: 'ইসলামিক ব্লগ',
      cardBlogTag: 'নিবন্ধ ও গাইড',
      cardBlogSub: 'তাফসির, হিফয ও কোরআনের জ্ঞান',
    },
    en: {
      searchPlaceholder: 'Search Page (1 - 611) or Surah...',
      readBtn: 'Read Quran',
      langToggle: 'বাংলা',
      heroTitle: 'QuranFolio — 15-Line Noorani Hafezi Quran Sharif',
      heroBadge: 'QuranFolio • COMPLETE 30 PARAS & 114 SURAHS • NOORANI SCRIPT',
      cardResumeTitle: `Resume from Page ${lastReadPage}`,
      cardResumeTag: 'Last Read',
      cardResumeSub: currentPara ? `Juz ${currentPara.number} • ${currentPara.name_bn}` : 'Continue where you left off',
      cardStartTitle: 'Surah Al-Fatihah',
      cardStartTag: 'Start Page 1',
      cardStartSub: 'Para 1 • Page 1',
      cardIndexTitle: '30 Paras & 114 Surahs',
      cardIndexTag: 'Quran Index',
      cardIndexSub: 'Paras, Manzils & Sajdahs',
      quickNavTitle: 'FREQUENTLY RECITED SURAHS',
      feat1: '15-Line Noorani Script',
      feat2: 'Realistic 2-Page View',
      feat3: 'Hifz Tracker & Revision',
      feat4: '100% Offline Ready',
      creditLabel: 'Planned & Initiated by:',
      creditName: 'Hafiz Md. Moinul Islam',
      surahYasin: 'Surah Yasin',
      surahYasinP: 'p. 439',
      surahRahman: 'Ar-Rahman',
      surahRahmanP: 'p. 531',
      surahMulk: 'Al-Mulk',
      surahMulkP: 'p. 562',
      surahKahf: 'Al-Kahf',
      surahKahfP: 'p. 293',
      surahWaqiah: 'Al-Waqi‘ah',
      surahWaqiahP: 'p. 534',
      ammaPara: 'Juz ‘Amma',
      ammaParaP: 'p. 581',
      cardBlogTitle: 'Islamic Blog',
      cardBlogTag: 'Articles & Guides',
      cardBlogSub: 'Tafsir, Hifz & Quranic Knowledge',
    }
  }[lang];

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-[#03170b] via-[#072614] to-[#010e05] text-white flex flex-col font-bengali select-none">
      {/* Background Star Texture & Ambient Glows */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[800px] lg:w-[1200px] h-[800px] lg:h-[1200px] rounded-full bg-emerald-600/20 blur-[240px] pointer-events-none"></div>

      {/* 4-Corner Royal Islamic Golden Filigree Borders (Delicate, Slender - Desktop/Tablet framing) */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Top-Left Corner */}
        <img
          src="/images/corner_gold.png"
          alt=""
          className="absolute top-0 left-0 w-28 sm:w-32 md:w-36 lg:w-44 xl:w-52 h-auto select-none opacity-90 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          loading="eager"
        />
        {/* Top-Right Corner */}
        <img
          src="/images/corner_gold.png"
          alt=""
          className="absolute top-0 right-0 w-28 sm:w-32 md:w-36 lg:w-44 xl:w-52 h-auto select-none opacity-90 scale-x-[-1] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          loading="eager"
        />
        {/* Bottom-Left Corner */}
        <img
          src="/images/corner_gold.png"
          alt=""
          className="absolute bottom-12 sm:bottom-14 left-0 w-28 sm:w-32 md:w-36 lg:w-44 xl:w-52 h-auto select-none opacity-90 scale-y-[-1] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          loading="eager"
        />
        {/* Bottom-Right Corner */}
        <img
          src="/images/corner_gold.png"
          alt=""
          className="absolute bottom-12 sm:bottom-14 right-0 w-28 sm:w-32 md:w-36 lg:w-44 xl:w-52 h-auto select-none opacity-90 scale-x-[-1] scale-y-[-1] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          loading="eager"
        />

        {/* Connecting Golden Hairline Strokes */}
        <div className="absolute top-4 xs:top-5 left-36 lg:left-48 right-36 lg:right-48 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
        <div className="absolute bottom-16 sm:bottom-18 left-36 lg:left-48 right-36 lg:right-48 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
        <div className="hidden lg:block absolute left-4 lg:left-5 top-36 lg:top-48 bottom-36 lg:bottom-48 w-[1.5px] bg-gradient-to-b from-transparent via-amber-400/40 to-transparent"></div>
        <div className="hidden lg:block absolute right-4 lg:right-5 top-36 lg:top-48 bottom-36 lg:bottom-48 w-[1.5px] bg-gradient-to-b from-transparent via-amber-400/40 to-transparent"></div>
      </div>

      {/* Main Content Area (Natural flow & responsive spacing) */}
      <main className="relative z-20 w-full flex-1 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 pb-8 gap-8 lg:gap-12 xl:gap-16 max-w-[1620px] mx-auto">
        
        {/* ========================================================
            LEFT COLUMN: Celestial Quran Dial (Aligned Harmoniously)
        ======================================================== */}
        <div className="w-full lg:w-[45%] flex items-center justify-center shrink-0 select-none py-1 sm:py-2 lg:py-0">
          <div className="relative flex items-center justify-center">
            <HomeQuranDial
              size={640}
              className="w-[180px] h-[180px] xs:w-[220px] xs:h-[220px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] xl:w-[540px] xl:h-[540px] 2xl:w-[600px] 2xl:h-[600px] max-w-full drop-shadow-[0_25px_80px_rgba(0,0,0,0.95)] cursor-pointer transition-all duration-300 hover:scale-[1.01]"
              onClick={() => handleRead(lastReadPage)}
            />
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: Open & Polished Quran Dashboard
        ======================================================== */}
        <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-2.5 sm:space-y-4 max-w-2xl xl:max-w-3xl">
          
          {/* 1. Raised Grand Bismillah Header Badge (100% Fluid on Mobile) */}
          <div className="inline-flex items-center justify-center gap-2 xs:gap-3 px-3.5 xs:px-6 sm:px-10 py-1.5 sm:py-2.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 backdrop-blur-md shadow-xl mb-0.5 max-w-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-kufi text-sm xs:text-base sm:text-2xl lg:text-[25px] text-amber-200 font-bold tracking-widest select-none leading-none truncate">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          </div>

          {/* 2. Single-Line Title & Subtitle with Integrated Controls */}
          <div className="flex flex-col items-center lg:items-start w-full space-y-1.5 sm:space-y-2.5">
            {/* 3D Golden QuranFolio Logo */}
            <div className="mb-0.5 select-none pointer-events-none">
              <img
                src="/images/quranfolio_logo_gold.png"
                alt="QuranFolio"
                className="w-[130px] xs:w-[160px] sm:w-[200px] lg:w-[230px] h-auto object-contain drop-shadow-[0_4px_16px_rgba(212,175,55,0.4)]"
                loading="eager"
              />
            </div>

            {/* Single-Line Hero Title with Anek Bangla font and fluid responsive size */}
            <h1 className="font-bengali text-lg xs:text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-200 tracking-wide drop-shadow-md leading-[1.3] py-0.5">
              {t.heroTitle}
            </h1>

            {/* Subtitle Badge, Language & Sound Toggle in One Balanced Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2.5">
              <div className="inline-block px-2.5 xs:px-4 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-medium text-[10px] xs:text-xs sm:text-sm tracking-wide shadow">
                {t.heroBadge}
              </div>

              {/* Language Switcher */}
              <button
                onClick={onToggleLang}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/90 hover:bg-emerald-800/80 border border-amber-400/50 text-amber-300 text-[10px] xs:text-xs font-bold transition-all hover:scale-105 shadow cursor-pointer shrink-0"
                title="Switch Language / ভাষা পরিবর্তন করুন"
              >
                <Globe className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-300" />
                <span>{t.langToggle}</span>
              </button>

              {/* Sound Toggle */}
              <button
                onClick={toggleSound}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-950/90 hover:bg-emerald-800/80 border border-emerald-600/60 text-emerald-300 text-[10px] xs:text-xs font-semibold transition-all hover:scale-105 shadow cursor-pointer shrink-0"
                title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
              >
                {isMuted ? <VolumeX className="w-3 h-3 text-red-400" /> : <Volume2 className="w-3 h-3 text-emerald-400" />}
                <span>{isMuted ? 'Muted' : 'Sound'}</span>
              </button>
            </div>
          </div>

          {/* 3. Dedicated Search Bar & Direct Read Action Row (Side-by-Side on all screens) */}
          <div className="w-full flex flex-row items-center gap-2 sm:gap-3">
            {/* Interactive Search Trigger Input Box */}
            <div
              onClick={handleOpenSearch}
              className="flex-1 flex items-center justify-between px-3 xs:px-4 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-700/60 hover:border-amber-400/60 text-emerald-200/90 cursor-pointer transition-all duration-300 shadow-lg group min-w-0"
            >
              <div className="flex items-center gap-2 xs:gap-3 min-w-0">
                <Search className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-amber-300 group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-xs sm:text-sm font-medium truncate">{t.searchPlaceholder}</span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-900 text-[10px] text-emerald-300 font-bold border border-emerald-700/60 hidden sm:inline shadow-inner shrink-0">
                Ctrl + K
              </span>
            </div>

            {/* Direct Read Primary Button */}
            <button
              onClick={() => handleRead(lastReadPage)}
              className="px-3.5 xs:px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/80 border border-emerald-300/50 transition-all flex items-center justify-center gap-1.5 xs:gap-2 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-amber-200" />
              <span className="whitespace-nowrap">{t.readBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-white hidden xs:inline" />
            </button>
          </div>

          {/* 4. Action Cards Grid: 1 Full-width Hero Card + 2 Side-by-Side Cards on Mobile, 3 equal columns on Desktop */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2 xs:gap-3 sm:gap-3.5">
            {/* Card 1: Resume Last Read (Full-width 2-cols on mobile, 1-col on desktop) */}
            <div
              onClick={() => handleRead(lastReadPage)}
              className="col-span-2 sm:col-span-1 group p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-900/80 to-emerald-950/90 hover:from-emerald-800/90 hover:to-emerald-900/95 border border-emerald-600/70 hover:border-amber-400/80 cursor-pointer transition-all duration-300 text-left shadow-xl hover:scale-[1.02] flex flex-row sm:flex-col items-center sm:items-start justify-between min-h-[64px] sm:min-h-[140px]"
            >
              <div className="min-w-0 flex-1 pr-2 sm:pr-0">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-800/90 text-amber-300 text-[10px] sm:text-[11px] font-bold border border-emerald-600/60 mb-1 sm:mb-2 uppercase tracking-wider whitespace-nowrap">
                  <Bookmark className="w-3 h-3 text-amber-300" />
                  {t.cardResumeTag}
                </span>
                <div className="text-xs xs:text-sm sm:text-lg font-bold text-white group-hover:text-amber-100 transition-colors leading-snug truncate">
                  {t.cardResumeTitle}
                </div>
                <div className="text-[10px] xs:text-xs sm:text-sm text-emerald-300 font-normal mt-0.5 truncate">
                  {t.cardResumeSub}
                </div>
              </div>
              <div className="sm:mt-3 self-center sm:self-end w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-600/90 border border-emerald-400/50 text-white flex items-center justify-center shadow-lg group-hover:translate-x-1 group-hover:bg-emerald-500 transition-all shrink-0">
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white translate-x-0.5" />
              </div>
            </div>

            {/* Card 2: Start from Page 1 (1 col on mobile, 1 col on desktop) */}
            <div
              onClick={() => handleRead(1)}
              className="col-span-1 group p-2.5 xs:p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-900/80 to-emerald-950/90 hover:from-emerald-800/90 hover:to-emerald-900/95 border border-emerald-600/70 hover:border-amber-400/80 cursor-pointer transition-all duration-300 text-left shadow-xl hover:scale-[1.02] flex flex-col justify-between min-h-[85px] sm:min-h-[140px]"
            >
              <div>
                <span className="inline-flex items-center gap-1 px-1.5 xs:px-2 py-0.5 rounded-md bg-emerald-800/90 text-emerald-200 text-[9px] xs:text-[10px] sm:text-[11px] font-bold border border-emerald-600/60 mb-1 sm:mb-2 uppercase tracking-wider whitespace-nowrap">
                  <Sparkles className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-emerald-300" />
                  <span className="truncate">{t.cardStartTag}</span>
                </span>
                <div className="text-xs xs:text-sm sm:text-lg font-bold text-white group-hover:text-amber-100 transition-colors leading-snug line-clamp-1">
                  {t.cardStartTitle}
                </div>
                <div className="text-[9px] xs:text-[11px] sm:text-sm text-emerald-300 font-normal mt-0.5 truncate">
                  {t.cardStartSub}
                </div>
              </div>
              <div className="mt-1.5 sm:mt-3 self-end w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-700/80 border border-emerald-500/50 text-emerald-200 flex items-center justify-center shadow-lg group-hover:translate-x-1 transition-all shrink-0">
                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-200" />
              </div>
            </div>

            {/* Card 3: 30 Paras & Index (1 col on mobile, 1 col on desktop) */}
            <div
              onClick={handleOpenDrawer}
              className="col-span-1 group p-2.5 xs:p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-900/80 to-emerald-950/90 hover:from-emerald-800/90 hover:to-emerald-900/95 border border-emerald-600/70 hover:border-amber-400/80 cursor-pointer transition-all duration-300 text-left shadow-xl hover:scale-[1.02] flex flex-col justify-between min-h-[85px] sm:min-h-[140px]"
            >
              <div>
                <span className="inline-flex items-center gap-1 px-1.5 xs:px-2 py-0.5 rounded-md bg-emerald-800/90 text-emerald-200 text-[9px] xs:text-[10px] sm:text-[11px] font-bold border border-emerald-600/60 mb-1 sm:mb-2 uppercase tracking-wider whitespace-nowrap">
                  <Layers className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-emerald-300" />
                  <span className="truncate">{t.cardIndexTag}</span>
                </span>
                <div className="text-xs xs:text-sm sm:text-lg font-bold text-white group-hover:text-amber-100 transition-colors leading-snug line-clamp-1">
                  {t.cardIndexTitle}
                </div>
                <div className="text-[9px] xs:text-[11px] sm:text-sm text-emerald-300 font-normal mt-0.5 truncate">
                  {t.cardIndexSub}
                </div>
              </div>
              <div className="mt-1.5 sm:mt-3 self-end w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-700/80 border border-emerald-500/50 text-emerald-200 flex items-center justify-center shadow-lg group-hover:translate-x-1 transition-all shrink-0">
                <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-200" />
              </div>
            </div>

            {/* Card 4: Islamic Blog */}
            <div
              onClick={() => { sfx.playGoldenClick(); onOpenBlog?.(); }}
              className="col-span-2 sm:col-span-3 group p-2.5 xs:p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-900/80 to-emerald-950/90 hover:from-emerald-800/90 hover:to-emerald-900/95 border border-emerald-600/70 hover:border-amber-400/80 cursor-pointer transition-all duration-300 text-left shadow-xl hover:scale-[1.02] flex flex-row items-center justify-between min-h-[64px] sm:min-h-[80px]"
            >
              <div className="min-w-0 flex-1 pr-2">
                <span className="inline-flex items-center gap-1 px-1.5 xs:px-2 py-0.5 rounded-md bg-emerald-800/90 text-amber-300 text-[9px] xs:text-[10px] sm:text-[11px] font-bold border border-emerald-600/60 mb-1 sm:mb-2 uppercase tracking-wider whitespace-nowrap">
                  <FileText className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-amber-300" />
                  {t.cardBlogTag}
                </span>
                <div className="text-xs xs:text-sm sm:text-base font-bold text-white group-hover:text-amber-100 transition-colors leading-snug truncate">
                  {t.cardBlogTitle}
                </div>
                <div className="text-[9px] xs:text-[11px] sm:text-sm text-emerald-300 font-normal mt-0.5 truncate">
                  {t.cardBlogSub}
                </div>
              </div>
              <div className="self-center w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-600/90 border border-emerald-400/50 text-white flex items-center justify-center shadow-lg group-hover:translate-x-1 group-hover:bg-emerald-500 transition-all shrink-0">
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200" />
              </div>
            </div>
          </div>

          {/* 5. Frequently Recited Surahs Strip (Compact & Ultra-Balanced Fit) */}
          <div className="w-full bg-emerald-950/50 border border-emerald-800/50 rounded-xl sm:rounded-2xl p-2.5 xs:p-3 sm:p-4 backdrop-blur-sm shadow-xl">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[11px] xs:text-xs sm:text-sm font-bold text-amber-300 tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                {t.quickNavTitle}
              </span>
              <span className="text-[10px] xs:text-[11px] text-emerald-400 font-medium">Quick Recitation</span>
            </div>

            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 xs:gap-2 sm:gap-2.5 text-xs">
              {/* 1. Surah Yasin */}
              <button
                onClick={() => handleRead(439)}
                className="group px-2 py-1.5 xs:py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-emerald-900/70 hover:bg-emerald-800 border border-emerald-700/60 hover:border-amber-400/70 text-emerald-100 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer shadow text-center"
              >
                <span className="text-[11px] xs:text-xs sm:text-[13px] font-bold text-white group-hover:text-amber-200 transition-colors leading-tight whitespace-nowrap">{t.surahYasin}</span>
                <span className="text-[9px] xs:text-[10px] sm:text-xs text-amber-300 font-bold mt-0.5 sm:mt-1 px-1.5 py-0.2 rounded-md bg-emerald-950/80 border border-emerald-700/60 shadow-sm whitespace-nowrap">{t.surahYasinP}</span>
              </button>

              {/* 2. Surah Ar-Rahman */}
              <button
                onClick={() => handleRead(531)}
                className="group px-2 py-1.5 xs:py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-emerald-900/70 hover:bg-emerald-800 border border-emerald-700/60 hover:border-amber-400/70 text-emerald-100 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer shadow text-center"
              >
                <span className="text-[11px] xs:text-xs sm:text-[13px] font-bold text-white group-hover:text-amber-200 transition-colors leading-tight whitespace-nowrap">{t.surahRahman}</span>
                <span className="text-[9px] xs:text-[10px] sm:text-xs text-amber-300 font-bold mt-0.5 sm:mt-1 px-1.5 py-0.2 rounded-md bg-emerald-950/80 border border-emerald-700/60 shadow-sm whitespace-nowrap">{t.surahRahmanP}</span>
              </button>

              {/* 3. Surah Al-Waqi'ah */}
              <button
                onClick={() => handleRead(534)}
                className="group px-2 py-1.5 xs:py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-emerald-900/70 hover:bg-emerald-800 border border-emerald-700/60 hover:border-amber-400/70 text-emerald-100 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer shadow text-center"
              >
                <span className="text-[11px] xs:text-xs sm:text-[13px] font-bold text-white group-hover:text-amber-200 transition-colors leading-tight whitespace-nowrap">{t.surahWaqiah}</span>
                <span className="text-[9px] xs:text-[10px] sm:text-xs text-amber-300 font-bold mt-0.5 sm:mt-1 px-1.5 py-0.2 rounded-md bg-emerald-950/80 border border-emerald-700/60 shadow-sm whitespace-nowrap">{t.surahWaqiahP}</span>
              </button>

              {/* 4. Surah Al-Mulk */}
              <button
                onClick={() => handleRead(562)}
                className="group px-2 py-1.5 xs:py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-emerald-900/70 hover:bg-emerald-800 border border-emerald-700/60 hover:border-amber-400/70 text-emerald-100 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer shadow text-center"
              >
                <span className="text-[11px] xs:text-xs sm:text-[13px] font-bold text-white group-hover:text-amber-200 transition-colors leading-tight whitespace-nowrap">{t.surahMulk}</span>
                <span className="text-[9px] xs:text-[10px] sm:text-xs text-amber-300 font-bold mt-0.5 sm:mt-1 px-1.5 py-0.2 rounded-md bg-emerald-950/80 border border-emerald-700/60 shadow-sm whitespace-nowrap">{t.surahMulkP}</span>
              </button>

              {/* 5. Surah Al-Kahf */}
              <button
                onClick={() => handleRead(293)}
                className="group px-2 py-1.5 xs:py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-emerald-900/70 hover:bg-emerald-800 border border-emerald-700/60 hover:border-amber-400/70 text-emerald-100 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer shadow text-center"
              >
                <span className="text-[11px] xs:text-xs sm:text-[13px] font-bold text-white group-hover:text-amber-200 transition-colors leading-tight whitespace-nowrap">{t.surahKahf}</span>
                <span className="text-[9px] xs:text-[10px] sm:text-xs text-amber-300 font-bold mt-0.5 sm:mt-1 px-1.5 py-0.2 rounded-md bg-emerald-950/80 border border-emerald-700/60 shadow-sm whitespace-nowrap">{t.surahKahfP}</span>
              </button>

              {/* 6. Juz Amma */}
              <button
                onClick={() => handleRead(581)}
                className="group px-2 py-1.5 xs:py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-emerald-900/70 hover:bg-emerald-800 border border-emerald-700/60 hover:border-amber-400/70 text-emerald-100 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer shadow text-center"
              >
                <span className="text-[11px] xs:text-xs sm:text-[13px] font-bold text-white group-hover:text-amber-200 transition-colors leading-tight whitespace-nowrap">{t.ammaPara}</span>
                <span className="text-[9px] xs:text-[10px] sm:text-xs text-amber-300 font-bold mt-0.5 sm:mt-1 px-1.5 py-0.2 rounded-md bg-emerald-950/80 border border-emerald-700/60 shadow-sm whitespace-nowrap">{t.ammaParaP}</span>
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Bottom Highlights Row & User Credit (Fluid Responsive) */}
      <footer className="mt-auto relative z-20 bg-[#021308]/95 border-t border-emerald-800/50 py-2 sm:py-2.5 px-3 sm:px-8 shrink-0">
        <div className="w-full max-w-[1620px] mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 sm:gap-3 text-xs text-emerald-300 font-medium">
          {/* Key Feature Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-4 text-[10px] xs:text-[11px] sm:text-xs">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
              <span>{t.feat1}</span>
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
              <span>{t.feat2}</span>
            </div>
            <div className="hidden xs:flex items-center gap-1 whitespace-nowrap">
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
              <span>{t.feat3}</span>
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
              <span>{t.feat4}</span>
            </div>
          </div>

          {/* User Credit in Pure White Text (Clickable to open About Developer) */}
          <button
            onClick={() => {
              sfx.playGoldenClick();
              onOpenAboutDeveloper?.();
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-amber-300/60 shadow-md shrink-0 whitespace-nowrap text-[10px] sm:text-xs cursor-pointer transition-all hover:scale-105 active:scale-95 group text-left"
            title={lang === 'en' ? 'About Developer & Initiator' : 'ডেভেলপার ও উদ্যোক্তা পরিচিতি'}
          >
            <span className="text-white font-medium group-hover:text-amber-200">{t.creditLabel}</span>
            <strong className="text-white font-black tracking-wide drop-shadow underline decoration-amber-400/40 group-hover:text-amber-300">
              {t.creditName}
            </strong>
          </button>
        </div>
      </footer>
    </div>
  );
};
