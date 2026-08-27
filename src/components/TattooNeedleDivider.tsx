import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const TattooNeedleDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start: number | null = null;
          const duration = 1200; // 1.2s draw

          const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const p = Math.min(1, elapsed / duration);
            const easeP = 1 - Math.pow(1 - p, 3);
            setProgress(easeP);

            if (p < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const pathLength = 1000;
  const strokeDashoffset = pathLength * (1 - progress);
  const needleXPercent = progress * 100;

  return (
    <div ref={containerRef} className={`relative w-full py-8 overflow-hidden select-none ${className}`}>
      <div className="max-w-[1200px] mx-auto px-6 relative h-6 flex items-center">
        
        {/* Base Faded Guideline */}
        <div className="absolute inset-x-6 h-[1px] bg-white/10" />

        {/* Animated Gold Needle Path */}
        <div
          className="absolute left-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37] shadow-[0_0_10px_#D4AF37] transition-all duration-75"
          style={{ width: `calc((100% - 3rem) * ${progress})` }}
        />

        {/* Needle Tip Gold Dot with Pulse */}
        <div
          className="absolute h-3 w-3 bg-[#D4AF37] rounded-full -translate-x-1/2 shadow-[0_0_15px_#D4AF37] transition-all duration-75 flex items-center justify-center z-10"
          style={{ left: `calc(1.5rem + (100% - 3rem) * ${progress})` }}
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
        </div>

      </div>
    </div>
  );
};
