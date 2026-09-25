import React, { useState } from 'react';
import {
  BookOpen,
  List,
  Search,
  Bookmark as BookmarkIcon,
  ChevronLeft,
  ChevronRight,
  Home,
  Headphones,
  Play
} from 'lucide-react';
import { QuranMetadata, Bookmark } from '../types';
import { toBanglaNumber, getParaEnglishName } from '../utils/helpers';
import { RECITERS_LIST } from '../data/reciters';

interface SidebarProps {
  metadata: QuranMetadata | null;
  currentPage: number;
  bookmarks: Bookmark[];
  isZenMode: boolean;
  lang?: 'bn' | 'en';
  isAudioPlaying?: boolean;
  onSelectPage: (page: number) => void;
  onOpenSearch: () => void;
  onOpenHome: () => void;
  onToggleAudio?: () => void;
  onPlayPage?: (page: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  metadata,
  currentPage,
  bookmarks,
  isZenMode,
  lang = 'en',
  isAudioPlaying = false,
  onSelectPage,
  onOpenSearch,
  onOpenHome,
  onToggleAudio,
  onPlayPage,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<'paras' | 'surahs' | 'bookmarks' | 'audio' | null>(null);

  if (isZenMode) return null;

  const isEn = lang === 'en';
  const currentParaNum = Math.ceil(currentPage / 20);

  // Saved reciter
  const selectedReciterId = localStorage.getItem('hafezi_reciter_id') || 'ar.husary';
  const selectedReciter = RECITERS_LIST.find((r) => r.id === selectedReciterId) || RECITERS_LIST[0];

  return (
    <aside
      className={`hidden lg:flex fixed left-3 top-20 bottom-24 z-30 flex-row transition-all duration-300 select-none ${
        isExpanded ? 'w-84' : 'w-16'
      } ${isEn ? 'font-sans' : 'font-bengali'}`}
    >
      {/* Icon Rail */}
      <div className="w-16 h-full bg-white/95 dark:bg-[#12161a]/95 backdrop-blur-md border border-[#e2d8bd] dark:border-[#2a3442] shadow-xl rounded-2xl flex flex-col justify-between items-center py-4 text-gray-700 dark:text-gray-300">
        {/* Top Actions */}
        <div className="flex flex-col items-center gap-3.5 w-full">
          {/* Home */}
          <button
            onClick={onOpenHome}
            className="p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 transition-all hover:scale-110 cursor-pointer"
            title={isEn ? 'Home Screen' : 'ওপেনিং হোম স্ক্রিন'}
          >
            <Home className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 transition-all hover:scale-110 cursor-pointer"
            title={isEn ? 'Quick Search & Page Jump' : 'দ্রুত সার্চ ও পেজ জাম্প'}
          >
            <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </button>

          {/* Audio Reciter Drawer Toggle */}
          <button
            onClick={() => {
              if (activeSection === 'audio' && isExpanded) {
                setIsExpanded(false);
                setActiveSection(null);
              } else {
                setActiveSection('audio');
                setIsExpanded(true);
              }
            }}
            className={`p-3 rounded-xl transition-all relative cursor-pointer ${
              isExpanded && activeSection === 'audio'
                ? 'bg-emerald-600 text-white shadow-md'
                : isAudioPlaying
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30 animate-pulse'
                : 'hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
            }`}
            title={isEn ? 'Audio Tilawat & Reciters' : 'অডিও তিলাওয়াত ও ক্বারীগণ'}
          >
            <Headphones className="w-5 h-5" />
            {isAudioPlaying && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#12161a]" />
            )}
          </button>

          <div className="w-8 h-px bg-gray-200 dark:bg-gray-700 my-1"></div>

          {/* Paras Quick Drawer Toggle */}
          <button
            onClick={() => {
              if (activeSection === 'paras' && isExpanded) {
                setIsExpanded(false);
                setActiveSection(null);
              } else {
                setActiveSection('paras');
                setIsExpanded(true);
              }
            }}
            className={`p-3 rounded-xl transition-all relative cursor-pointer ${
              isExpanded && activeSection === 'paras'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-gray-700 dark:text-gray-300'
            }`}
            title={isEn ? '30 Paras Index' : '৩০ পারা তালিকা'}
          >
            <BookOpen className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
              30
            </span>
          </button>

          {/* Surahs Quick Drawer Toggle */}
          <button
            onClick={() => {
              if (activeSection === 'surahs' && isExpanded) {
                setIsExpanded(false);
                setActiveSection(null);
              } else {
                setActiveSection('surahs');
                setIsExpanded(true);
              }
            }}
            className={`p-3 rounded-xl transition-all relative cursor-pointer ${
              isExpanded && activeSection === 'surahs'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-gray-700 dark:text-gray-300'
            }`}
            title={isEn ? '114 Surahs Index' : '১১৪ সূরা তালিকা'}
          >
            <List className="w-5 h-5" />
          </button>

          {/* Bookmarks Quick Drawer Toggle */}
          <button
            onClick={() => {
              if (activeSection === 'bookmarks' && isExpanded) {
                setIsExpanded(false);
                setActiveSection(null);
              } else {
                setActiveSection('bookmarks');
                setIsExpanded(true);
              }
            }}
            className={`p-3 rounded-xl transition-all relative cursor-pointer ${
              isExpanded && activeSection === 'bookmarks'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-gray-700 dark:text-gray-300'
            }`}
            title={isEn ? 'Hifz Bookmarks' : 'হিফজ বুকমার্ক (সবক/আমুখতা/দাওর)'}
          >
            <BookmarkIcon className="w-5 h-5 text-amber-500" />
            {bookmarks.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {bookmarks.length}
              </span>
            )}
          </button>
        </div>

        {/* Bottom Expand / Collapse Handle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2.5 rounded-xl text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          title={
            isExpanded
              ? isEn
                ? 'Collapse Sidebar'
                : 'সাইডবার গুটিয়ে রাখুন'
              : isEn
              ? 'Expand Sidebar'
              : 'সাইডবার প্রসারিত করুন'
          }
        >
          {isExpanded ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>

      {/* Expanded Flyout Menu Panel */}
      {isExpanded && (
        <div className="flex-1 ml-2 h-full bg-white/95 dark:bg-[#12161a]/95 backdrop-blur-md border border-[#e2d8bd] dark:border-[#2a3442] shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in slide-in-from-left-2 duration-200">
          {/* Header of Section */}
          <div className="p-3.5 bg-emerald-800 text-white flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold tracking-wide flex items-center gap-2">
              {activeSection === 'audio' && <Headphones className="w-4 h-4 text-amber-300" />}
              {activeSection === 'audio' && (isEn ? 'Audio Tilawat' : 'অডিও তিলাওয়াত')}
              {activeSection === 'paras' && (isEn ? '30 Paras (Juz)' : '৩০ পারা তালিকা')}
              {activeSection === 'surahs' && (isEn ? '114 Surahs' : '১১৪ সূরা তালিকা')}
              {activeSection === 'bookmarks' && (isEn ? 'Hifz Bookmarks' : 'হিফজ বুকমার্ক')}
            </h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs text-emerald-200 hover:text-white px-2 py-1 rounded hover:bg-emerald-700/50 cursor-pointer"
            >
              {isEn ? 'Close' : 'বন্ধ করুন'}
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {/* ========================================================
                AUDIO TILAWAT SECTION IN SIDEBAR
            ======================================================== */}
            {activeSection === 'audio' && (
              <div className="space-y-3 p-1">
                {/* Current Page Play Trigger */}
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                  <div className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                    {isEn ? 'Current Reading Page' : 'বর্তমান অধ্যয়নরত পৃষ্ঠা'}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-base text-emerald-900 dark:text-emerald-200">
                      {isEn ? `Page ${currentPage}` : `পৃষ্ঠা ${toBanglaNumber(currentPage)}`}
                    </span>
                    <button
                      onClick={() => {
                        onPlayPage?.(currentPage);
                        onToggleAudio?.();
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>{isEn ? 'Play Page Audio' : 'পৃষ্ঠা প্লে করুন'}</span>
                    </button>
                  </div>
                </div>

                {/* Reciter Info Card */}
                <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/60">
                  <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">
                    {isEn ? 'Active Qari / Reciter' : 'নির্বাচিত ক্বারী'}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                        {isEn ? selectedReciter.name_en : selectedReciter.name_bn}
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-arabic">
                        {selectedReciter.name_ar}
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleAudio?.()}
                      className="text-xs font-bold text-emerald-700 dark:text-emerald-400 underline cursor-pointer"
                    >
                      {isEn ? 'Change' : 'বদলান'}
                    </button>
                  </div>
                </div>

                {/* Open Full Player Button */}
                <button
                  onClick={() => {
                    onToggleAudio?.();
                    setIsExpanded(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Headphones className="w-4 h-4 text-amber-300" />
                  <span>{isEn ? 'Open Player Dock' : 'অডিও প্লেয়ার ডক খুলুন'}</span>
                </button>
              </div>
            )}

            {/* PARAS LIST */}
            {activeSection === 'paras' &&
              metadata?.paras.map((para) => {
                const isActive = para.number === currentParaNum;
                return (
                  <div
                    key={para.number}
                    onClick={() => {
                      onSelectPage(para.start_page);
                      setIsExpanded(false);
                    }}
                    className={`p-2.5 rounded-xl cursor-pointer text-xs sm:text-sm transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 font-bold border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 shadow-sm'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-gray-800 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                        {isEn ? para.number : toBanglaNumber(para.number)}
                      </span>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-gray-100">
                          {isEn ? `Para ${para.number}: ${getParaEnglishName(para.number)}` : `পারা: ${para.name_bn}`}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          {isEn ? `Page ${para.start_page}` : `পৃষ্ঠা ${toBanglaNumber(para.start_page)}`}
                        </div>
                      </div>
                    </div>
                    <span className="font-arabic text-base text-emerald-800 dark:text-emerald-300 font-bold">
                      {para.name_ar}
                    </span>
                  </div>
                );
              })}

            {/* SURAHS LIST */}
            {activeSection === 'surahs' &&
              metadata?.surahs.map((surah) => (
                <div
                  key={surah.number}
                  onClick={() => {
                    onSelectPage(surah.page);
                    setIsExpanded(false);
                  }}
                  className="p-2.5 rounded-xl cursor-pointer text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-gray-800 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                      {isEn ? surah.number : toBanglaNumber(surah.number)}
                    </span>
                    <div>
                      <span className="font-bold text-gray-900 dark:text-gray-100">
                        {isEn ? surah.name_en : surah.name_bn}
                      </span>
                      <div className="text-[11px] text-gray-400">
                        {isEn ? `${surah.total_ayahs} Ayahs` : `${toBanglaNumber(surah.total_ayahs)} আয়াত`}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-arabic font-bold text-base text-emerald-800 dark:text-emerald-300">
                      {surah.name_ar}
                    </span>
                    <div className="text-[11px] text-gray-400">
                      {isEn ? `Page ${surah.page}` : `পৃষ্ঠা ${toBanglaNumber(surah.page)}`}
                    </div>
                  </div>
                </div>
              ))}

            {/* BOOKMARKS LIST */}
            {activeSection === 'bookmarks' &&
              (bookmarks.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-xs sm:text-sm font-medium">
                  {isEn ? 'No bookmarks saved yet.' : 'কোনো বুকমার্ক সেভ করা নেই।'}
                </div>
              ) : (
                bookmarks.map((bm) => (
                  <div
                    key={bm.id}
                    onClick={() => {
                      onSelectPage(bm.page);
                      setIsExpanded(false);
                    }}
                    className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-emerald-500 cursor-pointer text-xs sm:text-sm transition-all bg-gray-50/50 dark:bg-gray-800/30"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                          bm.type === 'sabaq'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                            : bm.type === 'amukhta'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200'
                        }`}
                      >
                        {isEn
                          ? bm.type === 'sabaq'
                            ? 'Sabaq (New)'
                            : bm.type === 'amukhta'
                            ? 'Amukhta (Recent)'
                            : 'Dawr (Revision)'
                          : bm.type === 'sabaq'
                          ? 'সবক'
                          : bm.type === 'amukhta'
                          ? 'আমুখতা'
                          : 'দাওর'}
                      </span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-300">
                        {isEn ? `Page ${bm.page}` : `পৃষ্ঠা ${toBanglaNumber(bm.page)}`}
                      </span>
                    </div>
                    <div className="font-bold text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{bm.title}</div>
                  </div>
                ))
              ))}
          </div>
        </div>
      )}
    </aside>
  );
};
