import React, { useState } from 'react';
import { X, Bookmark as BookmarkIcon, Check } from 'lucide-react';
import { Bookmark, BookmarkType } from '../types';
import { toBanglaNumber } from '../utils/helpers';

interface BookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: number;
  existingBookmark?: Bookmark;
  lang?: 'bn' | 'en';
  onSaveBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  onDeleteBookmark: (id: string) => void;
}

export const BookmarkModal: React.FC<BookmarkModalProps> = ({
  isOpen,
  onClose,
  currentPage,
  existingBookmark,
  lang = 'en',
  onSaveBookmark,
  onDeleteBookmark,
}) => {
  const isEn = lang === 'en';
  const defaultTitle = existingBookmark?.title || (isEn ? `Page ${currentPage}` : `পৃষ্ঠা ${toBanglaNumber(currentPage)}`);

  const [type, setType] = useState<BookmarkType>(existingBookmark?.type || 'sabaq');
  const [title, setTitle] = useState(defaultTitle);
  const [note, setNote] = useState(existingBookmark?.note || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBookmark({
      page: currentPage,
      type,
      title: title.trim() || defaultTitle,
      note: note.trim(),
    });
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 select-none ${isEn ? 'font-sans' : 'font-bengali'}`}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#12161a] rounded-2xl shadow-2xl border border-[#e5dec9] dark:border-[#2a323d] p-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <BookmarkIcon className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-gray-100">
              {isEn ? `Bookmark Page ${currentPage}` : `পৃষ্ঠা ${toBanglaNumber(currentPage)} বুকমার্ক করুন`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Bookmark Category Type */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              {isEn ? 'Select Hifz Category:' : 'হিফজ ক্যাটাগরি নির্বাচন করুন:'}
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setType('sabaq')}
                className={`p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all flex flex-col items-center gap-1.5 ${
                  type === 'sabaq'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 ring-2 ring-emerald-500/20'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span>{isEn ? 'Sabaq (New)' : 'সবক (নতুন পড়া)'}</span>
              </button>

              <button
                type="button"
                onClick={() => setType('amukhta')}
                className={`p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all flex flex-col items-center gap-1.5 ${
                  type === 'amukhta'
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 ring-2 ring-amber-500/20'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span>{isEn ? 'Amukhta (Recent)' : 'আমুখতা (পেছন)'}</span>
              </button>

              <button
                type="button"
                onClick={() => setType('dawr')}
                className={`p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all flex flex-col items-center gap-1.5 ${
                  type === 'dawr'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 ring-2 ring-blue-500/20'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span>{isEn ? 'Dawr (Revision)' : 'দাওর (রিভিশন)'}</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              {isEn ? 'Title / Label:' : 'শিরোনাম:'}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={isEn ? "e.g., Today's Sabaq" : 'যেমন: আজকের সবক'}
              className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-[#1c232c] border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-600 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              {isEn ? 'Notes or Remarks (Optional):' : 'নোট বা মন্তব্য (ঐচ্ছিক):'}
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={isEn ? 'Any revision note, date, or teacher remarks...' : 'কোনো বিশেষ মন্তব্য বা রিভিশনের তারিখ...'}
              className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-[#1c232c] border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-600 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3">
            {existingBookmark ? (
              <button
                type="button"
                onClick={() => {
                  onDeleteBookmark(existingBookmark.id);
                  onClose();
                }}
                className="px-3.5 py-2.5 text-xs sm:text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
              >
                {isEn ? 'Delete Bookmark' : 'বুকমার্ক মুছুন'}
              </button>
            ) : <div />}

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
              >
                {isEn ? 'Cancel' : 'বাতিল'}
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs sm:text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-md flex items-center gap-1.5 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>{isEn ? 'Save Bookmark' : 'সংরক্ষণ করুন'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
