import React from 'react';

export const MarqueeStrip: React.FC = () => {
  const marqueeText = "CUSTOM INK ✦ BLACK & GREY ✦ TRIBAL ✦ COVER-UP ✦ FINE LINE ✦ DHANBAD ✦ ";

  return (
    <div className="relative w-full bg-[#0a0a12] border-y border-[#D4AF37]/20 py-4 overflow-hidden select-none group">
      <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
        <span
          className="font-display text-4xl sm:text-5xl text-transparent tracking-widest uppercase inline-block pr-8"
          style={{ WebkitTextStroke: '1px rgba(212, 175, 55, 0.5)' }}
        >
          {marqueeText.repeat(4)}
        </span>
        <span
          className="font-display text-4xl sm:text-5xl text-transparent tracking-widest uppercase inline-block pr-8"
          aria-hidden="true"
          style={{ WebkitTextStroke: '1px rgba(212, 175, 55, 0.5)' }}
        >
          {marqueeText.repeat(4)}
        </span>
      </div>
    </div>
  );
};
