import React from 'react';

export const GrainOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[99] pointer-events-none overflow-hidden select-none opacity-[0.05] mix-blend-overlay">
      <svg className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};
