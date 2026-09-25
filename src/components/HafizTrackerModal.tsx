import React from 'react';
import { X, Award, Flame, BookCheck, ChevronRight } from 'lucide-react';
import { Bookmark } from '../types';
import { toBanglaNumber } from '../utils/helpers';

interface HafizTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: number;
  totalPages: number;
  todayReadCount: number;
  bookmarks: Bookmark[];
  lang?: 'bn' | 'en';
  onSelectPage: (page: number) => void;
}

export const HafizTrackerModal: React.FC<HafizTrackerModalProps> = ({
  isOpen,
  onClose,
  currentPage,
  totalPages,
  todayReadCount,
  bookmarks,
  lang = 'en',
  onSelectPage,
}) => {
  if (!isOpen) return null;

  const isEn = lang === 'en';
  const khatamPercent = Math.min(100, Math.round((currentPage / totalPages) * 100));

  const sabaqBookmark = bookmarks.find((b) => b.type === 'sabaq');
  const amukhtaBookmark = bookmarks.find((b) => b.type === 'amukhta');
  const dawrBookmark = bookmarks.find((b) => b.type === 'dawr');

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 select-none ${isEn ? 'font-sans' : 'font-bengali'}`}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#12161a] rounded-2xl shadow-2xl border border-[#e5dec9] dark:border-[#2a323d] p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-gray-100">
                {isEn ? 'Hafiz Progress Tracker' : 'হাফিজ প্রগ্রেস ট্র্যাকার'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                {isEn ? 'Daily Quran Recitation & Hifz Tracking' : 'হিফজ ও তিলাওয়াতের সার্বিক হিসাব'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* Khatam Progress Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white shadow-md relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs sm:text-sm font-semibold text-emerald-200">
                  {isEn ? 'Khatm Completion' : 'খতম অগ্রগতি'}
                </span>
                <h4 className="text-2xl sm:text-3xl font-black mt-0.5">
                  {isEn ? `${khatamPercent}%` : `${toBanglaNumber(khatamPercent)}%`}{' '}
                  <span className="text-sm font-normal text-emerald-300">
                    {isEn ? 'Completed' : 'সম্পন্ন'}
                  </span>
                </h4>
              </div>
              <div className="text-right text-xs sm:text-sm text-emerald-200">
                <span className="font-bold text-white text-base sm:text-lg">
                  {isEn ? currentPage : toBanglaNumber(currentPage)}
                </span>{' '}
                / {isEn ? `${totalPages} Pages` : `${toBanglaNumber(totalPages)} পৃষ্ঠা`}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-emerald-950/70 rounded-full overflow-hidden border border-emerald-700/50">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${khatamPercent}%` }}
              />
            </div>

            <div className="mt-3 text-xs text-emerald-200 flex items-center justify-between font-medium">
              <span>
                {isEn
                  ? `Currently at Para ${Math.ceil(currentPage / 20)}`
                  : `পারা ${toBanglaNumber(Math.ceil(currentPage / 20))} এর মধ্যে অবস্থান করছেন`}
              </span>
              <span>
                {isEn
                  ? `Remaining: ${totalPages - currentPage} pages`
                  : `বাকি: ${toBanglaNumber(totalPages - currentPage)} পৃষ্ঠা`}
              </span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/40">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>{isEn ? 'Read Today' : 'আজকে পঠিত'}</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                {isEn ? todayReadCount : toBanglaNumber(todayReadCount)}{' '}
                <span className="text-xs sm:text-sm font-normal text-gray-500">
                  {isEn ? 'Pages' : 'পৃষ্ঠা'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/40">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
                <BookCheck className="w-4 h-4 text-emerald-600" />
                <span>{isEn ? 'Total Bookmarks' : 'মোট বুকমার্ক'}</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                {isEn ? bookmarks.length : toBanglaNumber(bookmarks.length)}{' '}
                <span className="text-xs sm:text-sm font-normal text-gray-500">
                  {isEn ? 'Saved' : 'টি'}
                </span>
              </div>
            </div>
          </div>

          {/* Active Sabaq / Amukhta / Dawr Shortcuts */}
          <div className="space-y-2.5 pt-1">
            <h5 className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              {isEn ? 'Current Hifz Status' : 'বর্তমান হিফজ অবস্থানসমূহ'}
            </h5>

            {/* Sabaq */}
            <div
              onClick={() => {
                if (sabaqBookmark) {
                  onSelectPage(sabaqBookmark.page);
                  onClose();
                }
              }}
              className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                sabaqBookmark
                  ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30 hover:bg-emerald-100/60 cursor-pointer shadow-sm'
                  : 'border-dashed border-gray-300 dark:border-gray-700 bg-transparent opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shrink-0"></div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-200">
                    {isEn ? "Today's Sabaq (New Lesson)" : 'আজকের সবক (নতুন পড়া)'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {sabaqBookmark
                      ? isEn
                        ? `Page ${sabaqBookmark.page} • ${sabaqBookmark.title}`
                        : `পৃষ্ঠা ${toBanglaNumber(sabaqBookmark.page)} • ${sabaqBookmark.title}`
                      : isEn
                      ? 'No Sabaq marked yet'
                      : 'এখনো কোনো সবক মার্ক করা হয়নি'}
                  </div>
                </div>
              </div>
              {sabaqBookmark && <ChevronRight className="w-5 h-5 text-emerald-600" />}
            </div>

            {/* Amukhta */}
            <div
              onClick={() => {
                if (amukhtaBookmark) {
                  onSelectPage(amukhtaBookmark.page);
                  onClose();
                }
              }}
              className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                amukhtaBookmark
                  ? 'border-amber-300 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/30 hover:bg-amber-100/60 cursor-pointer shadow-sm'
                  : 'border-dashed border-gray-300 dark:border-gray-700 bg-transparent opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500 shrink-0"></div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200">
                    {isEn ? 'Amukhta (Recent Lessons)' : 'আমুখতা (পেছনের পড়া)'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {amukhtaBookmark
                      ? isEn
                        ? `Page ${amukhtaBookmark.page} • ${amukhtaBookmark.title}`
                        : `পৃষ্ঠা ${toBanglaNumber(amukhtaBookmark.page)} • ${amukhtaBookmark.title}`
                      : isEn
                      ? 'No Amukhta marked yet'
                      : 'এখনো কোনো আমুখতা মার্ক করা হয়নি'}
                  </div>
                </div>
              </div>
              {amukhtaBookmark && <ChevronRight className="w-5 h-5 text-amber-600" />}
            </div>

            {/* Dawr */}
            <div
              onClick={() => {
                if (dawrBookmark) {
                  onSelectPage(dawrBookmark.page);
                  onClose();
                }
              }}
              className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                dawrBookmark
                  ? 'border-blue-300 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/30 hover:bg-blue-100/60 cursor-pointer shadow-sm'
                  : 'border-dashed border-gray-300 dark:border-gray-700 bg-transparent opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-500 shrink-0"></div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-200">
                    {isEn ? 'Dawr (Full Revision)' : 'দাওর (রিভিশন খতম)'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {dawrBookmark
                      ? isEn
                        ? `Page ${dawrBookmark.page} • ${dawrBookmark.title}`
                        : `পৃষ্ঠা ${toBanglaNumber(dawrBookmark.page)} • ${dawrBookmark.title}`
                      : isEn
                      ? 'No Dawr marked yet'
                      : 'এখনো কোনো দাওর মার্ক করা হয়নি'}
                  </div>
                </div>
              </div>
              {dawrBookmark && <ChevronRight className="w-5 h-5 text-blue-600" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
