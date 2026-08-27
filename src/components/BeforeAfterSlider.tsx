import React, { useState } from 'react';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  title?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage = '/stills/bonus_02.webp',
  afterImage = '/frames/frame_0350.webp',
  title = 'COVER-UP TRANSFORMATION',
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50);

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.2)] select-none">
      
      {/* Container aspect ratio */}
      <div className="relative aspect-[16/10] w-full bg-[#050508]">
        
        {/* BEFORE IMAGE (Bottom Layer) */}
        <img
          src={beforeImage}
          alt="Before Cover-Up"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] contrast-[0.9]"
        />
        <span className="absolute bottom-4 left-4 px-3 py-1 bg-black/80 border border-white/20 rounded text-[10px] font-bold text-white/70 uppercase tracking-widest z-10">
          BEFORE (OLD TATTOO)
        </span>

        {/* AFTER IMAGE (Top Layer clipped) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={afterImage}
            alt="After Cover-Up Masterpiece"
            className="absolute inset-0 w-full h-full object-cover filter contrast-[1.05]"
          />
          <span className="absolute bottom-4 right-4 px-3 py-1 bg-[#D4AF37] text-[#050508] rounded text-[10px] font-bold uppercase tracking-widest z-10">
            AFTER (MASTERPIECE)
          </span>
        </div>

        {/* GOLD DIVIDER LINE & HANDLE */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#D4AF37] shadow-[0_0_15px_#D4AF37] z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-[#050508] border-2 border-[#D4AF37] rounded-full flex items-center justify-center text-[#D4AF37] shadow-[0_0_20px_#D4AF37]">
            <span className="text-xs font-bold font-mono">◄►</span>
          </div>
        </div>

        {/* INVISIBLE RANGE SLIDER OVERLAY */}
        <input
          type="range"
          min={0}
          max={100}
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          aria-label="Before after comparison slider"
        />

      </div>

      <div className="bg-[#0a0a12] p-4 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs">
        <span className="text-[#D4AF37] font-bold uppercase tracking-wider">{title}</span>
        <span className="text-white/50">Drag slider left/right to view transformation</span>
      </div>

    </div>
  );
};
