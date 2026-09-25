import React from 'react';

export const QuranEmblem: React.FC<{ size?: number; className?: string; animate?: boolean }> = ({
  size = 420,
  className = '',
  animate = true,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center select-none aspect-square ${className}`}
      style={{
        width: size,
        height: size,
        maxWidth: 'min(88vw, 65vh)',
        maxHeight: 'min(88vw, 65vh)',
      }}
    >
      {/* Background Glow Effects */}
      <div className={`absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none ${animate ? 'animate-pulse' : ''}`}></div>
      <div className="absolute inset-8 rounded-full bg-amber-400/20 blur-2xl pointer-events-none"></div>

      {/* 1. Outer Layer: 12 Points + Dashed Line */}
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 w-full h-full pointer-events-none ${animate ? 'animate-[spin_60s_linear_infinite]' : ''}`}
      >
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="#d4af37"
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity="0.65"
        ></circle>

        {/* 12 Round Points */}
        <g fill="#fbd36e">
          <circle cx="196" cy="100" r="2.5" />
          <circle cx="183.1" cy="148" r="2.5" />
          <circle cx="148" cy="183.1" r="2.5" />
          <circle cx="100" cy="196" r="2.5" />
          <circle cx="52" cy="183.1" r="2.5" />
          <circle cx="16.9" cy="148" r="2.5" />
          <circle cx="4" cy="100" r="2.5" />
          <circle cx="16.9" cy="52" r="2.5" />
          <circle cx="52" cy="16.9" r="2.5" />
          <circle cx="100" cy="4" r="2.5" />
          <circle cx="148" cy="16.9" r="2.5" />
          <circle cx="183.1" cy="52" r="2.5" />
        </g>
      </svg>

      {/* 2. Inner Layer: Dashed Line */}
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] pointer-events-none ${animate ? 'animate-[spin_90s_linear_infinite_reverse]' : ''}`}
      >
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="0.8"
          strokeDasharray="2 6"
          opacity="0.5"
        ></circle>
      </svg>

      {/* 3. Central Grand 3D Gold 15-Line Quran Medallion */}
      <div className="relative w-[92%] h-[92%] rounded-full flex items-center justify-center p-0 overflow-hidden">
        <img
          src="/images/quran_medallion.png"
          alt="Al-Quran Al-Kareem 15 Lines Hafezi Quran Medallion"
          className="w-full h-full object-contain drop-shadow-[0_12px_45px_rgba(0,0,0,0.95)] select-none pointer-events-none hover:scale-105 transition-transform duration-500"
          loading="eager"
        />
      </div>
    </div>
  );
};
