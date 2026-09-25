import React, { useState } from 'react';
import {
  X,
  BookOpen,
  List,
  Sparkles,
  Bookmark as BookmarkIcon,
  Search,
  ChevronRight,
  Flame,
  Award,
  Trash2,
  UserCheck
} from 'lucide-react';
import { QuranMetadata, Bookmark } from '../types';
import { toBanglaNumber, getParaEnglishName, formatPageNumber } from '../utils/helpers';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  metadata: QuranMetadata | null;
  currentPage: number;
  bookmarks: Bookmark[];
  lang?: 'bn' | 'en';
  onSelectPage: (page: number) => void;
  onDeleteBookmark: (id: string) => void;
  onOpenAboutDeveloper?: () => void;
}

type TabType = 'paras' | 'surahs' | 'musabbahat' | 'manzils' | 'sajdahs' | 'bookmarks';

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  metadata,
  currentPage,
  bookmarks,
  lang = 'en',
  onSelectPage,
  onDeleteBookmark,
  onOpenAboutDeveloper,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('paras');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const isEn = lang === 'en';

  const t = {
    title: isEn ? 'Quran Index & Navigation' : 'হাফেজী কুরআন সূচীপত্র',
    subtitle: isEn ? '15-Line Hafezi Edition • 30 Paras & 114 Surahs' : '১৫ লাইনের পূর্ণাঙ্গ হাফিজি ইনডেক্স',
    searchPlaceholder: isEn ? 'Search Surah, Para, or Page...' : 'পারা বা সূরার নাম দিয়ে খুঁজুন...',
    clear: isEn ? 'Clear' : 'মুছুন',
    tabParas: isEn ? 'Paras (30)' : 'পারা (৩০)',
    tabSurahs: isEn ? 'Surahs (114)' : 'সূরা (১১৪)',
    tabMusabbahat: isEn ? 'Musabbahat (7)' : 'মুসাব্বাহাত (৭)',
    tabManzils: isEn ? 'Manzils (7)' : 'মঞ্জিল (৭)',
    tabSajdahs: isEn ? 'Sajdahs (14)' : 'সিজদাহ (১৪)',
    tabBookmarks: isEn ? `Bookmarks (${bookmarks.length})` : `বুকমার্ক (${bookmarks.length})`,
    open: isEn ? 'Open' : 'প্রবেশ',
    pages: isEn ? 'Pages' : 'পৃষ্ঠা',
    ayahs: isEn ? 'Ayahs' : 'আয়াত',
    noBookmarks: isEn ? 'No bookmarks saved yet.' : 'এখনও কোনো বুকমার্ক সংরক্ষণ করা হয়নি।',
    musabbahatInfo: isEn
      ? 'Musabbahat (المسبحات): Surahs that begin with glorification of Allah (Sabbaha, Yusabbihu, Sabbeh). Essential for memorization & revision.'
      : 'মুসাব্বাহাত (المسبحات): কুরআনের যে সকল সূরা তাসবীহ বা আল্লাহর পবিত্রতা বর্ণনার শব্দ দিয়ে শুরু হয়েছে। হাফেজদের মুখস্থ ও আমলের জন্য অত্যন্ত ফযিলতপূর্ণ।',
    manzilsInfo: isEn
      ? '7 Manzils: Weekly Quran completion portions divided across 7 stages.'
      : '৭ মঞ্জিল: সপ্তাহে পুরো কুরআন এক খতম দেওয়ার জন্য কুরআন শরীফকে ৭টি মঞ্জিলে ভাগ করা হয়েছে।',
    sajdahsInfo: isEn
      ? '14 Sajdahs of Tilawat: Mandatory Prostrations upon reciting or hearing these sacred verses.'
      : '১৪ সিজদায়ে তিলাওয়াত: এই আয়াতগুলো তিলাওয়াত করলে বা শুনলে সিজদা আদায় করা ওয়াজিব।',
  };

  // Filter lists based on search query
  const filteredParas = metadata?.paras.filter((p) => {
    const q = searchQuery.toLowerCase();
    const enName = getParaEnglishName(p.number).toLowerCase();
    return (
      p.name_bn.toLowerCase().includes(q) ||
      p.name_ar.includes(searchQuery) ||
      enName.includes(q) ||
      p.number.toString().includes(searchQuery) ||
      toBanglaNumber(p.number).includes(searchQuery)
    );
  });

  const filteredSurahs = metadata?.surahs.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.name_bn.toLowerCase().includes(q) ||
      s.name_ar.includes(searchQuery) ||
      s.name_en.toLowerCase().includes(q) ||
      s.number.toString().includes(searchQuery) ||
      toBanglaNumber(s.number).includes(searchQuery)
    );
  });

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden select-none ${isEn ? 'font-sans' : 'font-bengali'}`}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-lg bg-white dark:bg-[#12161a] shadow-2xl flex flex-col border-r border-[#e5dec9] dark:border-[#2a323d]">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 to-emerald-900 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700/80 border border-emerald-500/40 flex items-center justify-center shadow">
                <BookOpen className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black tracking-wide">{t.title}</h2>
                <p className="text-xs text-emerald-200/90 font-medium">{t.subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-700/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Box */}
          <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/40 border-b border-[#e5dec9] dark:border-[#2a323d]">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-700 dark:text-emerald-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-12 py-2.5 text-sm bg-white dark:bg-[#1c232c] border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 font-medium shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {t.clear}
                </button>
              )}
            </div>
          </div>

          {/* Tab Navigation (Large, Spacious & Clear) */}
          <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-800 bg-gray-50/90 dark:bg-[#161c23] px-2 pt-2 gap-1.5 no-scrollbar text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab('paras')}
              className={`px-3.5 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'paras'
                  ? 'bg-white dark:bg-[#12161a] border-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-sm'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-emerald-700'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.tabParas}</span>
            </button>
            <button
              onClick={() => setActiveTab('surahs')}
              className={`px-3.5 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'surahs'
                  ? 'bg-white dark:bg-[#12161a] border-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-sm'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-emerald-700'
              }`}
            >
              <List className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.tabSurahs}</span>
            </button>
            <button
              onClick={() => setActiveTab('musabbahat')}
              className={`px-3 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'musabbahat'
                  ? 'bg-white dark:bg-[#12161a] border-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-sm'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-emerald-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.tabMusabbahat}</span>
            </button>
            <button
              onClick={() => setActiveTab('manzils')}
              className={`px-3 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'manzils'
                  ? 'bg-white dark:bg-[#12161a] border-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-sm'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-emerald-700'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{t.tabManzils}</span>
            </button>
            <button
              onClick={() => setActiveTab('sajdahs')}
              className={`px-3 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'sajdahs'
                  ? 'bg-white dark:bg-[#12161a] border-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-sm'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-emerald-700'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-blue-500" />
              <span>{t.tabSajdahs}</span>
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`px-3 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'bookmarks'
                  ? 'bg-white dark:bg-[#12161a] border-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-sm'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-emerald-700'
              }`}
            >
              <BookmarkIcon className="w-3.5 h-3.5 text-red-500" />
              <span>{t.tabBookmarks}</span>
            </button>
          </div>

          {/* Tab Content List (Enlarged, Clear & Legible) */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 p-2">
            {/* PARAS TAB */}
            {activeTab === 'paras' && (
              <div className="space-y-1.5">
                {filteredParas?.map((para) => {
                  const isActive = currentPage >= para.start_page && currentPage <= para.end_page;
                  const displayName = isEn
                    ? `Para ${para.number}: ${getParaEnglishName(para.number)}`
                    : `পারা ${toBanglaNumber(para.number)}: ${para.name_bn}`;
                  const pageRange = isEn
                    ? `Pages ${para.start_page} - ${para.end_page}`
                    : `পৃষ্ঠা ${toBanglaNumber(para.start_page)} হতে ${toBanglaNumber(para.end_page)}`;

                  return (
                    <div
                      key={para.number}
                      onClick={() => {
                        onSelectPage(para.start_page);
                        onClose();
                      }}
                      className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-emerald-100 dark:bg-emerald-950/80 border-2 border-emerald-500 shadow-sm'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800/70 border border-gray-100 dark:border-gray-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${
                            isActive
                              ? 'bg-emerald-600 text-white'
                              : 'bg-emerald-100/70 dark:bg-gray-800 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-gray-700'
                          }`}
                        >
                          {formatPageNumber(para.number, lang)}
                        </div>
                        <div>
                          <div className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                            {displayName}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                            {pageRange}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-arabic text-base sm:text-lg font-bold text-emerald-800 dark:text-emerald-300">
                          {para.name_ar}
                        </div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-end gap-1 mt-0.5">
                          <span>{t.open}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* SURAHS TAB */}
            {activeTab === 'surahs' && (
              <div className="space-y-1.5">
                {filteredSurahs?.map((surah) => {
                  const isActive = currentPage === surah.page;
                  const displayName = isEn ? `${surah.number}. ${surah.name_en}` : `${toBanglaNumber(surah.number)}. ${surah.name_bn}`;
                  const surahType = isEn ? (surah.type === 'মাক্কী' ? 'Makki' : 'Madani') : surah.type;
                  const metaText = isEn
                    ? `${surah.total_ayahs} Ayahs • Para ${surah.juz} • Page ${surah.page}`
                    : `${toBanglaNumber(surah.total_ayahs)} আয়াত • পারা ${toBanglaNumber(surah.juz)} • পৃষ্ঠা ${toBanglaNumber(surah.page)}`;

                  return (
                    <div
                      key={surah.number}
                      onClick={() => {
                        onSelectPage(surah.page);
                        onClose();
                      }}
                      className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-emerald-100 dark:bg-emerald-950/80 border-2 border-emerald-500 shadow-sm'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800/70 border border-gray-100 dark:border-gray-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${
                            isActive
                              ? 'bg-emerald-600 text-white'
                              : 'bg-emerald-100/70 dark:bg-gray-800 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-gray-700'
                          }`}
                        >
                          {formatPageNumber(surah.number, lang)}
                        </div>
                        <div>
                          <div className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <span>{displayName}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold border border-amber-300/50">
                              {surahType}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                            {metaText}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-arabic text-base sm:text-lg font-bold text-emerald-800 dark:text-emerald-300">
                          {surah.name_ar}
                        </div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                          {isEn ? `Page ${surah.page}` : `পৃষ্ঠা ${toBanglaNumber(surah.page)}`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* MUSABBAHAT TAB */}
            {activeTab === 'musabbahat' && (
              <div className="p-2 space-y-2.5">
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm leading-relaxed font-medium">
                  {t.musabbahatInfo}
                </div>

                {metadata?.musabbahat.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onSelectPage(item.page);
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/30 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <span>{isEn ? `Surah ${item.surah_number}` : item.name_bn}</span>
                        <span className="font-arabic text-sm font-bold text-emerald-700 dark:text-emerald-400">
                          {item.name_ar}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 font-arabic font-bold mt-1">
                        {item.start_word}
                      </div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">
                        {isEn
                          ? `Surah ${item.surah_number} • ${item.total_ayahs} Ayahs`
                          : `সূরা নং ${toBanglaNumber(item.surah_number)} • ${toBanglaNumber(item.total_ayahs)} আয়াত`}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-bold text-xs shadow-sm">
                        {isEn ? `Page ${item.page}` : `পৃষ্ঠা ${toBanglaNumber(item.page)}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* MANZILS TAB */}
            {activeTab === 'manzils' && (
              <div className="p-2 space-y-2.5">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm leading-relaxed font-medium">
                  {t.manzilsInfo}
                </div>

                {metadata?.manzils.map((m) => (
                  <div
                    key={m.number}
                    onClick={() => {
                      onSelectPage(m.page_start);
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="font-extrabold text-sm sm:text-base text-emerald-900 dark:text-emerald-200">
                        {isEn ? `Manzil ${m.number}: ${m.name}` : `মঞ্জিল ${toBanglaNumber(m.number)}: ${m.name}`}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                        {isEn
                          ? `Surah Range: ${m.surah_range} (Pages ${m.page_start} - ${m.page_end})`
                          : `সূরা সীমা: ${m.surah_range} (পৃষ্ঠা ${toBanglaNumber(m.page_start)} হতে ${toBanglaNumber(m.page_end)})`}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-emerald-600" />
                  </div>
                ))}
              </div>
            )}

            {/* SAJDAHS TAB */}
            {activeTab === 'sajdahs' && (
              <div className="p-2 space-y-2.5">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 text-xs sm:text-sm leading-relaxed font-medium">
                  {t.sajdahsInfo}
                </div>

                {metadata?.sajdahs.map((saj) => (
                  <div
                    key={saj.number}
                    onClick={() => {
                      onSelectPage(saj.page);
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <span>{isEn ? `Sajdah ${saj.number}` : `সিজদাহ ${toBanglaNumber(saj.number)}`}</span>
                        <span className="font-arabic text-sm font-bold text-blue-700 dark:text-blue-400">
                          {saj.surah_name_ar}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 font-medium mt-1">
                        {isEn
                          ? `Surah ${saj.surah_name_bn} • Ayah ${saj.ayah} • Juz ${saj.juz}`
                          : `সূরা ${saj.surah_name_bn} • আয়াত ${toBanglaNumber(saj.ayah)} • পারা ${toBanglaNumber(saj.juz)}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 font-bold text-xs shadow-sm">
                        {isEn ? `Page ${saj.page}` : `পৃষ্ঠা ${toBanglaNumber(saj.page)}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* BOOKMARKS TAB */}
            {activeTab === 'bookmarks' && (
              <div className="p-2 space-y-2">
                {bookmarks.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 text-sm">
                    <BookmarkIcon className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-700" />
                    {t.noBookmarks}
                  </div>
                ) : (
                  bookmarks.map((bm) => (
                    <div
                      key={bm.id}
                      className="p-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all flex items-center justify-between gap-2"
                    >
                      <div
                        onClick={() => {
                          onSelectPage(bm.page);
                          onClose();
                        }}
                        className="cursor-pointer flex-1"
                      >
                        <div className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                          {bm.title || (isEn ? `Page ${bm.page}` : `পৃষ্ঠা ${toBanglaNumber(bm.page)}`)}
                        </div>
                        <div className="text-xs text-gray-500 font-medium mt-0.5">
                          {isEn ? `Saved on Page ${bm.page}` : `পৃষ্ঠা ${toBanglaNumber(bm.page)}-তে সংরক্ষিত`}
                        </div>
                      </div>
                      <button
                        onClick={() => onDeleteBookmark(bm.id)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
                        title={isEn ? 'Delete Bookmark' : 'বুকমার্ক মুছুন'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Bottom Initiator / About Developer Card */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-[#101419] shrink-0">
            <button
              onClick={() => {
                onClose();
                onOpenAboutDeveloper?.();
              }}
              className="w-full p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200/80 dark:border-emerald-800/60 transition-all flex items-center justify-between group cursor-pointer shadow-xs active:scale-98"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <UserCheck className="w-4 h-4 text-amber-300" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-medium leading-none">
                    {isEn ? 'Planned & Initiated by:' : 'উদ্যোক্তা ও ডেভেলপার:'}
                  </div>
                  <div className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate group-hover:text-emerald-600 transition-colors mt-0.5">
                    Hafiz Md. Moinul Islam
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
