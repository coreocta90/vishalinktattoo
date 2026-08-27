import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HorizontalItem {
  id: string;
  title: string;
  style: string;
  image: string;
}

const portfolioItems: HorizontalItem[] = [
  { id: '1', title: 'LION REALISM', style: 'Black & Grey Portrait', image: '/stills/bonus_01.webp' },
  { id: '2', title: 'FINE LINE DETAIL', style: 'Rose & Micro Shading', image: '/stills/bonus_02.webp' },
  { id: '3', title: 'MICRO SHADING', style: 'Gradient Depth', image: '/frames/frame_0180.webp' },
  { id: '4', title: 'POLYNESIAN BAND', style: 'Tribal Geometric', image: '/frames/frame_0240.webp' },
  { id: '5', title: 'SCRIPT CALLIGRAPHY', style: 'Chicano Lettering', image: '/frames/frame_0300.webp' },
  { id: '6', title: 'PHOENIX REVEAL', style: 'Pristine Cover-Up', image: '/frames/frame_0350.webp' },
];

export const PinnedHorizontalPortfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-70%']);

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-[#050508] hidden lg:block">
      
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-12">
        
        {/* Header Bar */}
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between mb-8">
          <div>
            <span className="text-[#D4AF37] font-sans text-xs font-semibold tracking-[0.25em] uppercase block">
              03 / HORIZONTAL GALLERY
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-[#F5F5F0]">
              PINNED ARTWORK TRACK
            </h2>
          </div>

          <Link
            to="/portfolio"
            className="font-sans text-xs font-bold text-[#D4AF37] uppercase tracking-[0.18em] hover:text-white transition-colors flex items-center space-x-1"
          >
            <span>FULL PORTFOLIO</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Horizontal Track */}
        <motion.div style={{ x }} className="flex space-x-8 px-12">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="w-[420px] shrink-0 group relative rounded-2xl overflow-hidden bg-[#0a0a12] border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.25)] transition-all duration-500"
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />

                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <span className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase block mb-1">
                    {item.style}
                  </span>
                  <h3 className="font-display text-2xl text-[#F5F5F0] uppercase tracking-wide group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Thin Gold Position Progress Line */}
        <div className="max-w-7xl mx-auto px-6 w-full mt-8">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full bg-[#D4AF37] origin-left shadow-[0_0_10px_#D4AF37]"
            />
          </div>
        </div>

      </div>

    </div>
  );
};
