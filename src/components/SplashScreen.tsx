import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, UserCheck, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { QuranEmblem } from './QuranEmblem';
import { sfx } from '../utils/sfxService';

interface SplashScreenProps {
  onEnter: () => void;
  onOpenAboutDeveloper?: () => void;
}

const quranicVerses = [
  "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ✦",
  "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا ✦",
  "نُورٌ عَلَىٰ نُورٍ ✦",
  "تَنْزِيلٌ مِنْ رَبِّ الْعَالَمِينَ ✦",
  "كِتَابٌ أَنْزَلْنَاهُ إِلَيْكَ مُبَارَكٌ ✦",
  "শِفَاءٌ وَرَحْمَةٌ لِلْمُؤْمِنِينَ ✦",
  "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ ✦",
  "هُدًى وَبُشْرَىٰ لِلْمُؤْمِنِينَ ✦",
  "فَاسْتَبِقُوا الْخَيْرَاتِ ✦",
  "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنْتُمْ ✦",
];

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter, onOpenAboutDeveloper }) => {
  const [isAnimated, setIsAnimated] = useState(true);
  const [isMuted, setIsMuted] = useState(sfx.isMuted());
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const lastTapRef = useRef<number>(0);

  const toggleAnimation = () => {
    setIsAnimated((prev) => !prev);
    setToastMessage(!isAnimated ? 'Animations Resumed' : 'Animations Paused (Static Calm Mode)');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2400);
  };

  const toggleSound = () => {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
    setToastMessage(muted ? 'Sound Effects Muted' : 'Islamic Sound Effects Enabled 🔔');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const handleEnterQuran = () => {
    sfx.playGoldenClick();
    sfx.playCelestialTransition();
    onEnter();
  };

  // Global double click & touch double-tap listener
  useEffect(() => {
    const handleGlobalDblClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest('button')) return;
      toggleAnimation();
    };

    const handleGlobalTouchEnd = (e: TouchEvent) => {
      if ((e.target as HTMLElement)?.closest('button')) return;
      const now = Date.now();
      if (now - lastTapRef.current < 350) {
        toggleAnimation();
      }
      lastTapRef.current = now;
    };

    window.addEventListener('dblclick', handleGlobalDblClick);
    window.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      window.removeEventListener('dblclick', handleGlobalDblClick);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 bg-gradient-to-b from-[#021309] via-[#052111] to-[#010c05] text-white flex flex-col justify-between items-center select-none overflow-hidden ${
        !isAnimated ? 'motion-paused' : ''
      }`}
    >
      {/* Background Star Texture & Ambient Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute w-[800px] h-[800px] rounded-full bg-emerald-600/15 blur-[160px] pointer-events-none"></div>

      {/* Floating Status Toast */}
      {showToast && (
        <div className="absolute top-20 z-50 px-4 py-1.5 rounded-full bg-emerald-950/95 border border-amber-400/60 text-amber-200 text-xs shadow-2xl backdrop-blur-md animate-fade-in flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Quick Controls: Sound & Motion (Hidden on mobile to keep top clean & pure) */}
      <div className="hidden sm:flex absolute top-4 right-8 sm:right-20 lg:right-24 z-30 items-center gap-2">
        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          className="px-2.5 py-1 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-amber-400/30 text-amber-200 text-[11px] flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md cursor-pointer opacity-85 hover:opacity-100"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3 h-3 text-red-400" />
              <span>Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3 h-3 text-emerald-300" />
              <span>Sound On</span>
            </>
          )}
        </button>

        {/* Motion Pause Toggle */}
        <button
          onClick={toggleAnimation}
          title="Double Click screen anywhere or click here to toggle animations"
          className="px-2.5 py-1 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-amber-400/30 text-amber-200 text-[11px] flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md cursor-pointer opacity-85 hover:opacity-100"
        >
          {isAnimated ? (
            <>
              <Pause className="w-3 h-3 text-amber-300" />
              <span>Pause Motion</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-emerald-300" />
              <span>Resume Motion</span>
            </>
          )}
        </button>
      </div>

      {/* ========================================================
          LEFT EDGE STRIPE: Fixed Sidebar with Vertical Flow
      ======================================================== */}
      <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-14 sm:w-16 lg:w-20 bg-emerald-950/60 border-r border-amber-400/30 backdrop-blur-md z-20 flex-col items-center overflow-hidden pointer-events-none shadow-xl">
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#021309] to-transparent z-10"></div>

        <div className={`${isAnimated ? 'animate-stripe-down' : ''} flex flex-row items-center justify-center gap-10 lg:gap-12 [writing-mode:vertical-rl] font-scheherazade text-amber-200 text-lg sm:text-xl lg:text-2xl font-bold tracking-widest py-6 w-full`}>
          {[...quranicVerses, ...quranicVerses].map((verse, idx) => (
            <span key={`left-${idx}`} className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] whitespace-nowrap">
              {verse}
            </span>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#010c05] to-transparent z-10"></div>
      </div>

      {/* ========================================================
          RIGHT EDGE STRIPE: Fixed Sidebar with Vertical Flow
      ======================================================== */}
      <div className="hidden md:flex fixed right-0 top-0 bottom-0 w-14 sm:w-16 lg:w-20 bg-emerald-950/60 border-l border-amber-400/30 backdrop-blur-md z-20 flex-col items-center overflow-hidden pointer-events-none shadow-xl">
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#021309] to-transparent z-10"></div>

        <div className={`${isAnimated ? 'animate-stripe-up' : ''} flex flex-row items-center justify-center gap-10 lg:gap-12 [writing-mode:vertical-rl] font-scheherazade text-amber-200 text-lg sm:text-xl lg:text-2xl font-bold tracking-widest py-6 w-full`}>
          {[...quranicVerses, ...quranicVerses].map((verse, idx) => (
            <span key={`right-${idx}`} className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] whitespace-nowrap">
              {verse}
            </span>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#010c05] to-transparent z-10"></div>
      </div>

      {/* ========================================================
          TOP: Small 3D Golden Bismillah with Left & Right Ribbon Stripes
      ======================================================== */}
      <div className="relative sm:absolute sm:top-6 sm:left-0 sm:right-0 z-20 w-full pt-7 xs:pt-9 sm:pt-0 pb-2 px-3 xs:px-6 sm:px-14 lg:px-24 flex items-center justify-center shrink-0">
        {/* Left Ribbon / Golden Stripe */}
        <div className="flex-1 flex items-center justify-end min-w-0">
          <div className="w-full max-w-[50px] xs:max-w-[100px] sm:max-w-[280px] lg:max-w-[420px] h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/50 to-amber-300/80 rounded-full"></div>
          <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rotate-45 border border-amber-300/80 bg-amber-400/30 -ml-0.5 xs:-ml-1 shrink-0"></div>
        </div>

        {/* Center: Scaled-down 3D Golden Bismillah */}
        <div className="px-2 xs:px-3 sm:px-5 shrink-0">
          <img
            src="/images/bismillah_gold.png"
            alt="Bismillahir Rahmanir Rahim"
            className="w-[125px] xs:w-[155px] sm:w-[180px] md:w-[200px] lg:w-[220px] max-w-[50vw] h-auto object-contain select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] transition-transform duration-300"
            loading="eager"
          />
        </div>

        {/* Right Ribbon / Golden Stripe */}
        <div className="flex-1 flex items-center justify-start min-w-0">
          <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rotate-45 border border-amber-300/80 bg-amber-400/30 -mr-0.5 xs:-mr-1 shrink-0"></div>
          <div className="w-full max-w-[50px] xs:max-w-[100px] sm:max-w-[280px] lg:max-w-[420px] h-[1.5px] bg-gradient-to-l from-transparent via-amber-400/50 to-amber-300/80 rounded-full"></div>
        </div>
      </div>

      {/* ========================================================
          CENTER: Exact Center Grand Medallion Dial & Action Button (Dead Center on PC)
      ======================================================== */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-2 flex-1 w-full max-w-6xl px-3 sm:px-4">
        {/* Ripple Waves Behind Emblem */}
        <div className="relative flex items-center justify-center">
          {isAnimated && (
            <>
              <div className="absolute w-[270px] h-[270px] xs:w-[330px] xs:h-[330px] sm:w-[460px] sm:h-[460px] md:w-[540px] md:h-[540px] lg:w-[640px] lg:h-[640px] xl:w-[700px] xl:h-[700px] rounded-full border border-amber-400/20 animate-ripple-1 pointer-events-none"></div>
              <div className="absolute w-[270px] h-[270px] xs:w-[330px] xs:h-[330px] sm:w-[460px] sm:h-[460px] md:w-[540px] md:h-[540px] lg:w-[640px] lg:h-[640px] xl:w-[700px] xl:h-[700px] rounded-full border border-emerald-400/15 animate-ripple-2 pointer-events-none"></div>
            </>
          )}

          {/* Grand Central Emblem (Fluid Responsive Dimensions) */}
          <div
            onClick={handleEnterQuran}
            onMouseEnter={() => sfx.playOrbitalPulse()}
            className="cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 drop-shadow-[0_20px_60px_rgba(0,0,0,0.95)] relative z-10"
            title="Click to Enter Holy Quran"
          >
            <QuranEmblem
              size={650}
              animate={isAnimated}
              className="w-[240px] h-[240px] xs:w-[280px] xs:h-[280px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] lg:w-[540px] lg:h-[540px] xl:w-[600px] xl:h-[600px]"
            />
          </div>
        </div>

        {/* Enter Holy Quran Button (Enhanced size & positioned comfortably below dial on PC) */}
        <div className="mt-8 sm:mt-8 md:mt-10 lg:mt-12 shrink-0 flex items-center justify-center">
          <button
            onClick={handleEnterQuran}
            onMouseEnter={() => sfx.playHoverTone()}
            className="relative group px-6 sm:px-10 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-bengali font-bold text-xs sm:text-sm tracking-widest shadow-[0_10px_35px_rgba(4,120,87,0.6)] hover:shadow-[0_15px_45px_rgba(4,120,87,0.85)] border border-emerald-300/60 hover:border-amber-300/80 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5 sm:gap-3 cursor-pointer overflow-hidden"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0 animate-pulse" />
            <span className="uppercase whitespace-nowrap font-black drop-shadow-md tracking-widest">ENTER HOLY QURAN</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform shrink-0 text-white" />
          </button>
        </div>
      </div>

      {/* ========================================================
          BOTTOM FOOTER: Clean Typography Dock (Desktop & Mobile Specialized)
      ======================================================== */}
      <footer className="relative sm:absolute sm:bottom-4 sm:left-0 sm:right-0 z-20 w-full pt-1 pb-4 sm:py-0 px-3 sm:px-16 lg:px-24 shrink-0">
        
        {/* DESKTOP FOOTER (sm and up) - Clean Unboxed Normal Typography */}
        <div className="hidden sm:block">
          {/* Top Golden Hairline Divider */}
          <div className="w-full max-w-5xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mb-2.5"></div>

          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 text-center">
            {/* Left: Edition Specifications Clean Typography */}
            <div className="flex items-center gap-2 text-xs tracking-wider uppercase">
              <span className="flex items-center gap-1.5 font-bold text-amber-300 drop-shadow">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                15 LINES HAFEZI SCRIPT
              </span>
              <span className="text-emerald-500/70">•</span>
              <span className="text-emerald-100/90 font-semibold tracking-wide">NOORANI STANDARD</span>
              <span className="text-emerald-500/70">•</span>
              <span className="text-emerald-300 font-medium">COMPLETE 30 PARAS</span>
            </div>

            {/* Right: Initiator Credit Clean Typography (Clickable to open About Developer) */}
            <button
              onClick={() => {
                sfx.playGoldenClick();
                onOpenAboutDeveloper?.();
              }}
              className="flex items-center gap-1.5 text-xs text-white hover:text-amber-200 transition-all cursor-pointer group hover:scale-105 active:scale-95"
              title="About Developer & Initiator"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-300 group-hover:text-amber-300 transition-colors shrink-0" />
              <span className="text-emerald-100/90 font-normal group-hover:text-amber-200">Planned & Initiated by:</span>
              <strong className="text-white font-bold tracking-wide drop-shadow underline decoration-amber-400/40 group-hover:text-amber-300">
                Hafiz Md. Moinul Islam
              </strong>
            </button>
          </div>
        </div>

        {/* MOBILE FOOTER (xs and down) - Clean Vertical Stacked Layout */}
        <div className="sm:hidden flex flex-col items-center justify-center">
          {/* 1. Unboxed Clean Typography (Above Divider) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] xs:text-[11px] tracking-wider uppercase mb-2">
            <span className="flex items-center gap-1 font-bold text-amber-300 drop-shadow">
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
              15 LINES HAFEZI SCRIPT
            </span>
            <span className="text-emerald-500/70">•</span>
            <span className="text-emerald-100/90 font-semibold tracking-wide">NOORANI STANDARD</span>
          </div>

          {/* 2. Middle Golden Hairline Divider */}
          <div className="w-full max-w-xs mx-auto h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mb-2"></div>

          {/* 3. Initiator Credit Deluxe Glass Capsule (Clickable to open About Developer) */}
          <button
            onClick={() => {
              sfx.playGoldenClick();
              onOpenAboutDeveloper?.();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-amber-300/60 shadow-lg backdrop-blur-md text-[10px] xs:text-[11px] text-white transition-all shrink-0 cursor-pointer active:scale-95 group"
            title="About Developer & Initiator"
          >
            <UserCheck className="w-3 h-3 text-emerald-300 group-hover:text-amber-300 transition-colors shrink-0" />
            <span className="text-emerald-100/90 font-normal group-hover:text-amber-200">Planned & Initiated by:</span>
            <strong className="text-white font-black tracking-wide drop-shadow underline decoration-amber-400/40 group-hover:text-amber-300">
              Hafiz Md. Moinul Islam
            </strong>
          </button>
        </div>

      </footer>
    </div>
  );
};
