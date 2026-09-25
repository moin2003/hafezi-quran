import React from 'react';

interface HomeQuranDialProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const HomeQuranDial: React.FC<HomeQuranDialProps> = ({
  size = 650,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center select-none cursor-pointer group aspect-square ${className}`}
      style={{
        width: size,
        height: size,
        maxWidth: 'min(88vw, 60vh)',
        maxHeight: 'min(88vw, 60vh)',
      }}
    >
      {/* 1. Deep Ambient Aura Behind Dial */}
      <div className="absolute inset-0 rounded-full bg-emerald-500/25 blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute inset-10 rounded-full bg-amber-400/20 blur-2xl pointer-events-none"></div>

      {/* 2. Outer Orbital Ring with 12 Celestial Golden Dots */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite] pointer-events-none"
      >
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="#d4af37"
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity="0.75"
        ></circle>

        {/* 12 Outer Celestial Points */}
        <g fill="#fbd36e">
          <circle cx="196" cy="100" r="2.6" />
          <circle cx="183.1" cy="148" r="2.6" />
          <circle cx="148" cy="183.1" r="2.6" />
          <circle cx="100" cy="196" r="2.6" />
          <circle cx="52" cy="183.1" r="2.6" />
          <circle cx="16.9" cy="148" r="2.6" />
          <circle cx="4" cy="100" r="2.6" />
          <circle cx="16.9" cy="52" r="2.6" />
          <circle cx="52" cy="16.9" r="2.6" />
          <circle cx="100" cy="4" r="2.6" />
          <circle cx="148" cy="16.9" r="2.6" />
          <circle cx="183.1" cy="52" r="2.6" />
        </g>
      </svg>

      {/* 3. Middle Counter-Rotating Dashed Orbit Ring */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-3.5 w-[calc(100%-28px)] h-[calc(100%-28px)] animate-[spin_90s_linear_infinite_reverse] pointer-events-none"
      >
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="0.9"
          strokeDasharray="3 6"
          opacity="0.6"
        ></circle>
      </svg>

      {/* 4. Central Grand 3D Gold 15-Line Quran Medallion */}
      <div className="relative w-[88%] h-[88%] rounded-full flex items-center justify-center p-0 overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
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
