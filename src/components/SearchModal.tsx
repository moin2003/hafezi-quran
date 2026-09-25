import React, { useState, useEffect, useRef } from 'react';
import { Search, X, CornerDownLeft, Sparkles, Layers } from 'lucide-react';
import { QuranMetadata } from '../types';
import { toBanglaNumber, getParaEnglishName } from '../utils/helpers';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  metadata: QuranMetadata | null;
  lang?: 'bn' | 'en';
  onSelectPage: (page: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  metadata,
  lang = 'en',
  onSelectPage,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const isEn = lang === 'en';

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle direct page jump if number entered
  const banglaDigitsMap: Record<string, string> = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
  };
  const numericVal = parseInt(
    query.trim().replace(/[০-৯]/g, (d) => banglaDigitsMap[d] || d),
    10
  );
  const isValidPage = !isNaN(numericVal) && numericVal >= 1 && numericVal <= 611;

  const handlePageSubmit = (page: number) => {
    if (page >= 1 && page <= 611) {
      onSelectPage(page);
      onClose();
    }
  };

  // Search in surahs and paras
  const matchingSurahs = query.trim()
    ? metadata?.surahs.filter(
        (s) =>
          s.name_bn.toLowerCase().includes(query.toLowerCase()) ||
          s.name_ar.includes(query) ||
          s.name_en.toLowerCase().includes(query.toLowerCase()) ||
          s.number.toString() === query.trim()
      ).slice(0, 6)
    : [];

  const matchingParas = query.trim()
    ? metadata?.paras.filter(
        (p) =>
          p.name_bn.toLowerCase().includes(query.toLowerCase()) ||
          p.name_ar.includes(query) ||
          getParaEnglishName(p.number).toLowerCase().includes(query.toLowerCase()) ||
          p.number.toString() === query.trim()
      ).slice(0, 4)
    : [];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200 ${isEn ? 'font-sans' : 'font-bengali'}`}>
      {/* Dark Ambient Backdrop with Blur */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Center Glassmorphic Modal Dialog */}
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#072c16] via-[#041d0e] to-[#021208] text-white rounded-3xl shadow-[0_25px_90px_rgba(0,0,0,0.95)] border border-amber-400/40 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header & Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-emerald-800/60 bg-emerald-950/60 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-800/90 border border-emerald-600/60 flex items-center justify-center shrink-0 shadow">
            <Search className="w-5 h-5 text-amber-300" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (isValidPage) handlePageSubmit(numericVal);
                else if (matchingSurahs && matchingSurahs.length > 0) {
                  handlePageSubmit(matchingSurahs[0].page);
                } else if (matchingParas && matchingParas.length > 0) {
                  handlePageSubmit(matchingParas[0].start_page);
                }
              } else if (e.key === 'Escape') {
                onClose();
              }
            }}
            placeholder={
              isEn
                ? 'Page number (1-611) or Surah / Para name...'
                : 'পৃষ্ঠা নম্বর (১-৬১১) অথবা সূরা / পারার নাম...'
            }
            className="w-full text-base sm:text-lg bg-transparent border-none focus:outline-none text-white placeholder-emerald-400/60 font-medium"
          />

          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-2 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-800/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-400 border border-emerald-700/60 hover:text-white hover:bg-emerald-800/60 transition-colors cursor-pointer"
            >
              ESC
            </button>
          )}
        </div>

        {/* Dynamic Results & Shortcuts */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          {/* Direct Numeric Page Jump Action */}
          {isValidPage && (
            <div
              onClick={() => handlePageSubmit(numericVal)}
              className="p-4 rounded-2xl bg-gradient-to-r from-emerald-800/90 to-emerald-900/90 border border-amber-400/60 cursor-pointer flex items-center justify-between text-white font-medium hover:scale-[1.02] transition-all shadow-xl"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black text-base shadow">
                  {isEn ? numericVal : toBanglaNumber(numericVal)}
                </div>
                <div>
                  <div className="font-extrabold text-base text-amber-100">
                    {isEn ? `Jump directly to Page ${numericVal}` : `সরাসরি পৃষ্ঠা ${toBanglaNumber(numericVal)}-এ যান`}
                  </div>
                  <div className="text-xs text-emerald-300 font-medium">
                    {isEn ? 'Click or press Enter to navigate' : 'ক্লিক করুন অথবা কীবোর্ডে Enter চাপুন'}
                  </div>
                </div>
              </div>
              <CornerDownLeft className="w-5 h-5 text-amber-300" />
            </div>
          )}

          {/* Quick Shortcuts when search query is empty */}
          {!query && (
            <div className="space-y-3 pt-1">
              <div className="text-xs font-bold text-amber-300 tracking-wider uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{isEn ? 'Popular & Quick Jump Shortcuts' : 'জনপ্রিয় ও দ্রুত জাম্প শর্টকাট'}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                {[
                  { title_bn: 'সূরা আল-ফাতিহা', title_en: 'Surah Al-Fatihah', page: 1 },
                  { title_bn: 'সূরা আল-বাকারাহ', title_en: 'Surah Al-Baqarah', page: 2 },
                  { title_bn: 'সূরা আল-কাহফ', title_en: 'Surah Al-Kahf', page: 293 },
                  { title_bn: 'সূরা ইয়াসীন', title_en: 'Surah Ya-Sin', page: 439 },
                  { title_bn: 'সূরা আর-রহমান', title_en: 'Surah Ar-Rahman', page: 531 },
                  { title_bn: 'সূরা আল-ওয়াকিয়া', title_en: 'Surah Al-Waqiah', page: 534 },
                  { title_bn: 'সূরা আল-মুলক', title_en: 'Surah Al-Mulk', page: 562 },
                  { title_bn: 'আম্মা পারা (৩০তম)', title_en: 'Amma Para (30th)', page: 581 },
                  { title_bn: 'খতমে কুরআন দোয়া', title_en: 'Khatm-e-Quran Dua', page: 611 },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageSubmit(item.page)}
                    className="group p-3 rounded-xl bg-emerald-900/40 hover:bg-emerald-800/80 border border-emerald-700/50 hover:border-amber-400/60 text-left transition-all hover:scale-105 cursor-pointer shadow-sm"
                  >
                    <div className="font-bold text-white group-hover:text-amber-200 truncate transition-colors text-xs sm:text-sm">
                      {isEn ? item.title_en : item.title_bn}
                    </div>
                    <div className="text-[11px] text-amber-300 font-semibold mt-1">
                      {isEn ? `Page ${item.page}` : `পৃষ্ঠা ${toBanglaNumber(item.page)}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matching Surahs */}
          {matchingSurahs && matchingSurahs.length > 0 && (
            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider px-1">
                {isEn ? 'Matching Surahs' : 'সূরা সমূহ'}
              </div>
              {matchingSurahs.map((surah) => (
                <div
                  key={surah.number}
                  onClick={() => handlePageSubmit(surah.page)}
                  className="p-3 rounded-xl bg-emerald-900/40 hover:bg-emerald-800/80 border border-emerald-700/50 hover:border-amber-400/60 cursor-pointer flex items-center justify-between transition-all hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center text-xs font-black border border-emerald-600/50">
                      {isEn ? surah.number : toBanglaNumber(surah.number)}
                    </span>
                    <div>
                      <span className="font-bold text-white text-sm">
                        {isEn ? surah.name_en : surah.name_bn}
                      </span>
                      <span className="text-xs text-emerald-300 ml-2 font-medium">
                        {isEn ? `(${surah.name_bn})` : `(${surah.name_en})`}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-arabic text-lg font-bold text-amber-200">
                      {surah.name_ar}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-950 border border-emerald-700/60 text-emerald-300">
                      {isEn ? `Page ${surah.page}` : `পৃষ্ঠা ${toBanglaNumber(surah.page)}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Matching Paras */}
          {matchingParas && matchingParas.length > 0 && (
            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider px-1">
                {isEn ? 'Matching Paras (Juz)' : 'পারা সমূহ'}
              </div>
              {matchingParas.map((para) => (
                <div
                  key={para.number}
                  onClick={() => handlePageSubmit(para.start_page)}
                  className="p-3 rounded-xl bg-emerald-900/40 hover:bg-emerald-800/80 border border-emerald-700/50 hover:border-amber-400/60 cursor-pointer flex items-center justify-between transition-all hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0 border border-emerald-600/50">
                      <Layers className="w-4 h-4 text-amber-300" />
                    </div>
                    <span className="font-bold text-white text-sm">
                      {isEn
                        ? `Para ${para.number}: ${getParaEnglishName(para.number)}`
                        : `পারা ${toBanglaNumber(para.number)}: ${para.name_bn}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-arabic text-lg font-bold text-amber-200">
                      {para.name_ar}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-950 border border-emerald-700/60 text-emerald-300">
                      {isEn ? `Page ${para.start_page}` : `পৃষ্ঠা ${toBanglaNumber(para.start_page)}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
