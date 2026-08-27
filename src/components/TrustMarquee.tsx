import React from 'react';

export const TrustMarquee: React.FC = () => {
  const text = "TRUSTED BY 300+ CLIENTS ✦ BEST IN JHARKHAND ✦ STERILIZED STUDIO ✦ PREMIUM INKS ✦ FREE CONSULTATION ✦ ";

  return (
    <div className="relative w-full bg-[#050508] border-y border-white/10 py-3 overflow-hidden select-none group z-20">
      <div className="flex whitespace-nowrap animate-marquee-right group-hover:[animation-play-state:paused]">
        <span className="font-sans text-xs font-semibold text-white/30 tracking-[0.2em] uppercase inline-block pr-8">
          {text.repeat(4)}
        </span>
        <span className="font-sans text-xs font-semibold text-white/30 tracking-[0.2em] uppercase inline-block pr-8" aria-hidden="true">
          {text.repeat(4)}
        </span>
      </div>
    </div>
  );
};
