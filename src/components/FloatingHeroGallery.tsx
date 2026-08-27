import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Sparkles, ZoomIn } from 'lucide-react';
import { HERO_FLOATING_PLACEHOLDERS } from '../data/tattoos';

interface FloatingHeroGalleryProps {
  onSelectItem?: (id: string) => void;
}

export const FloatingHeroGallery: React.FC<FloatingHeroGalleryProps> = ({ onSelectItem }) => {
  return (
    <div className="relative w-full h-[520px] lg:h-[620px] flex items-center justify-center overflow-visible">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 via-transparent to-[#3B82F6]/5 rounded-full filter blur-3xl opacity-60 pointer-events-none" />

      {/* Floating scattered placeholders container */}
      <div className="relative w-full h-full max-w-[550px]">
        {HERO_FLOATING_PLACEHOLDERS.map((item, index) => {
          // Floating Y keyframe variation for parallax depth feel
          const floatDistance = (index % 2 === 0 ? 10 : -10);
          const floatDuration = 3.5 + index * 0.4;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, floatDistance, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: index * 0.08 },
                scale: { duration: 0.8, delay: index * 0.08 },
                y: {
                  duration: floatDuration,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
              }}
              whileHover={{
                scale: 1.08,
                rotate: 0,
                zIndex: 30,
                borderColor: 'rgba(212, 175, 55, 0.8)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,55,0.3)',
              }}
              onClick={() => onSelectItem?.(item.id)}
              style={{
                width: item.width,
                height: item.height,
                transform: item.rotation,
                zIndex: item.zIndex,
              }}
              className={`absolute ${item.positionClass} rounded-xl bg-white/[0.02] border-2 border-dashed border-[#D4AF37]/30 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-sm cursor-pointer p-3 flex flex-col justify-between group transition-all duration-300 select-none overflow-hidden hover:bg-[#0a0a12]/90`}
            >
              {/* Top Bar Label */}
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-1.5">
                <span className="text-[10px] font-bold tracking-wider text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-2 py-0.5 rounded">
                  {item.label}
                </span>
                <Sparkles className="w-3 h-3 text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors" />
              </div>

              {/* Center Artwork Mockup Placeholder */}
              <div className="flex-1 my-2 rounded-lg bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/5 flex flex-col items-center justify-center p-2 text-center group-hover:border-[#D4AF37]/30 transition-colors relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:12px_12px] opacity-10" />
                
                <ImageIcon className="w-7 h-7 text-[#D4AF37]/40 mb-1 group-hover:scale-110 group-hover:text-[#D4AF37] transition-all" />
                <span className="text-[11px] font-medium text-white/70 line-clamp-1">
                  {item.title}
                </span>
                <span className="text-[9px] text-white/40 mt-0.5">
                  {item.width} × {item.height}
                </span>

                <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] text-[#D4AF37] font-semibold flex items-center gap-1 bg-[#050508]/90 px-2.5 py-1 rounded-full border border-[#D4AF37]/40">
                    <ZoomIn className="w-3 h-3" /> View Detail
                  </span>
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="flex items-center justify-between text-[9px] text-white/40 pt-1">
                <span>Dhanbad Studio</span>
                <span className="text-[#D4AF37]/80">Vishal Ink</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
