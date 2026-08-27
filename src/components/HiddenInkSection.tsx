import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const HiddenInkSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 500, y: 200 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setIsMobile(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative z-20 w-full min-h-[450px] sm:min-h-[550px] bg-[#050508] border-y border-[#D4AF37]/20 flex items-center justify-center overflow-hidden select-none cursor-crosshair py-20"
    >
      {/* Hidden Dark Base Layer */}
      <div className="absolute inset-0 bg-[#050508] opacity-95 flex items-center justify-center p-6 text-center">
        <span className="font-display text-4xl sm:text-7xl text-white/10 uppercase tracking-tight">
          HOVER TO REVEAL HIDDEN INK
        </span>
      </div>

      {/* Spotlight Illuminated Layer */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none transition-all duration-75"
        style={{
          background: isMobile
            ? 'radial-gradient(circle 220px at 50% 50%, rgba(212, 175, 55, 0.35) 0%, rgba(5, 5, 8, 0.98) 75%)'
            : `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.35) 0%, rgba(5, 5, 8, 0.98) 75%)`,
        }}
      >
        {/* Hidden Artwork SVG Background Outline */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-[350px] h-[350px] text-[#D4AF37]">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <polygon points="100,20 120,80 180,80 130,120 150,180 100,140 50,180 70,120 20,80 80,80" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <span className="text-[#D4AF37] font-sans text-xs font-bold uppercase tracking-[0.3em] block">
            FLASHLIGHT REVEAL
          </span>

          <h3 className="font-display text-3xl sm:text-6xl text-[#F5F5F0] tracking-tight uppercase leading-none">
            SOME STORIES ARE WRITTEN <br />
            <span className="text-[#D4AF37]">UNDER THE SKIN.</span>
          </h3>

          <p className="font-sans text-xs sm:text-sm text-white/70 max-w-lg mx-auto font-light leading-relaxed">
            Move your cursor across this section to uncover the sacred geometric artwork hidden beneath the dark surface.
          </p>
        </div>
      </div>
    </section>
  );
};
