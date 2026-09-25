import React from 'react';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Search,
  Play
} from 'lucide-react';
import { toBanglaNumber } from '../utils/helpers';
import { QuranMetadata } from '../types';
import { QuranEmblem } from './QuranEmblem';

interface OpeningScreenProps {
  isOpen: boolean;
  onClose: () => void;
  lastReadPage: number;
  metadata: QuranMetadata | null;
  onSelectPage: (page: number) => void;
  onOpenSearch: () => void;
  onOpenDrawer: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({
  isOpen,
  onClose,
  lastReadPage,
  metadata,
  onSelectPage,
  onOpenSearch,
}) => {
  if (!isOpen) return null;

  const currentParaNum = Math.ceil(lastReadPage / 20);
  const currentPara = metadata?.paras.find((p) => p.number === currentParaNum);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-b from-[#041c0e] via-[#092b16] to-[#03150b] text-white flex flex-col justify-between select-none">
      {/* Subtle Islamic Pattern Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Clean Minimalist Top Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-600/50 flex items-center justify-center shadow-lg">
            <BookOpen className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-emerald-100 tracking-wide">
              নূরানী হাফেজী কোরআন শরীফ
            </h2>
            <p className="text-xs text-emerald-400 font-medium">১৫ লাইনের আন্তর্জাতিক সংস্করণ</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-700/60 text-emerald-200 text-xs sm:text-sm font-semibold transition-all hover:scale-105"
          >
            <Search className="w-4 h-4 text-emerald-300" />
            <span className="hidden sm:inline">পৃষ্ঠা বা সূরা খুঁজুন</span>
          </button>
        </div>
      </div>

      {/* Center Stage: Pure, Grand Islamic Presentation */}
      <div className="relative z-10 max-w-3xl mx-auto w-full px-4 py-6 flex-1 flex flex-col items-center justify-center text-center">
        {/* Bismillah Pill */}
        <div className="inline-flex items-center gap-2 px-6 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-600/40 backdrop-blur-md mb-6 shadow-xl">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-arabic text-lg sm:text-xl text-emerald-200 font-bold">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
        </div>

        {/* Central Large Emblem (Click to Enter) */}
        <div
          onClick={onClose}
          className="cursor-pointer hover:scale-105 transition-transform duration-500 mb-6 drop-shadow-[0_20px_45px_rgba(0,0,0,0.7)]"
          title="ক্লিক করে তিলাওয়াত শুরু করুন"
        >
          <QuranEmblem size={290} />
        </div>

        {/* Title */}
        <div className="space-y-2 mb-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide">
            ১৫ লাইনের নূরানী হাফেজী কোরআন শরীফ
          </h1>
          <p className="text-xs sm:text-sm text-emerald-300 font-medium">
            The Holy Quran • 15 Lines Hafezi Standard • Noorani Script
          </p>
        </div>

        {/* Clean Emerald Green Action Buttons */}
        <div className="w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Primary Button: Enter Quran / Start from page 1 */}
          <button
            onClick={() => {
              onSelectPage(1);
              onClose();
            }}
            className="w-full sm:w-1/2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 border border-emerald-400/40 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-emerald-200" />
            <span>সূরা আল-ফাতিহা (১)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary Button: Resume Last Read */}
          {lastReadPage > 1 && (
            <button
              onClick={() => {
                onSelectPage(lastReadPage);
                onClose();
              }}
              className="w-full sm:w-1/2 px-6 py-3.5 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/60 text-emerald-200 hover:text-white font-bold text-sm shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 text-emerald-300 fill-emerald-300" />
              <span>পৃষ্ঠা {toBanglaNumber(lastReadPage)} থেকে পড়ুন</span>
            </button>
          )}
        </div>

        {/* Subtle Last Read Info */}
        {lastReadPage > 1 && currentPara && (
          <div className="text-xs text-emerald-400/90 mt-3">
            সর্বশেষ অবস্থান: পারা {toBanglaNumber(currentPara.number)} ({currentPara.name_bn})
          </div>
        )}
      </div>

      {/* Clean Footer */}
      <div className="relative z-10 py-4 text-center text-xs text-emerald-400/70 border-t border-emerald-900/40">
        ১৫ লাইনের নূরানী হাফেজী কোরআন শরীফ ডিজিটাল সংস্করণ
      </div>
    </div>
  );
};
