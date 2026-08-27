import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MagneticButton } from './MagneticButton';

interface ServiceAccordionItem {
  num: string;
  title: string;
  desc: string;
  price: string;
  tag: string;
  image: string;
  features: string[];
}

const servicesAccordionList: ServiceAccordionItem[] = [
  {
    num: '01',
    tag: 'REALISM',
    title: 'BLACK & GREY REALISM',
    desc: 'Photorealistic portraits, animal motifs, and mythic figures with soft gradient depth and smooth micro-shading.',
    price: '₹350 / INCH',
    image: '/stills/bonus_01.webp',
    features: ['High-contrast gradient depth', 'Smooth micro-shading', 'Photographic realism', 'Long-lasting ink density']
  },
  {
    num: '02',
    tag: 'TRIBAL',
    title: 'TRIBAL & GEOMETRIC BANDS',
    desc: 'Polynesian, Maori, and Vedic geometric bands executed with jet-black ink saturation and razor-sharp lines.',
    price: '₹300 / INCH',
    image: '/frames/frame_0240.webp',
    features: ['Jet-black ink saturation', 'Symmetrical geometric alignment', 'Ancestral symbolism', 'Crisp line definition']
  },
  {
    num: '03',
    tag: 'CUSTOM',
    title: 'CUSTOM DESIGN & STENCIL',
    desc: '1-on-1 digital stencil design process transforming your personal memories into an exclusive tattoo.',
    price: '₹300 / INCH',
    image: '/frames/frame_0300.webp',
    features: ['1-on-1 concept consultation', 'Custom digital stencil mockups', 'Anatomical fitting advice', 'Unique original design']
  },
  {
    num: '04',
    tag: 'REWORK',
    title: 'COVER-UP & REWORK',
    desc: 'Expert transformation of old, faded, or unwanted tattoos into fresh new masterpieces with zero trace.',
    price: 'FROM ₹300 / INCH',
    image: '/frames/frame_0350.webp',
    features: ['Old ink opacity assessment', 'Strategic dark flow placement', 'Zero trace guarantee', 'Restorative rework option']
  }
];

export const ExpandingServiceAccordion: React.FC = () => {
  const [expandedNum, setExpandedNum] = useState<string | null>('01');

  return (
    <div className="w-full divide-y divide-[#D4AF37]/15 border-y border-[#D4AF37]/15 select-none">
      {servicesAccordionList.map((service) => {
        const isExpanded = expandedNum === service.num;

        return (
          <div
            key={service.num}
            onMouseEnter={() => setExpandedNum(service.num)}
            onClick={() => setExpandedNum(service.num)}
            className={`py-8 px-4 sm:px-8 transition-all duration-500 relative cursor-pointer ${
              isExpanded ? 'bg-[#0a0a12]' : 'hover:bg-white/[0.02] opacity-60 hover:opacity-100'
            }`}
          >
            {/* Left Indicator Line */}
            {isExpanded && (
              <motion.div
                layoutId="activeAccordionLine"
                className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37] shadow-[0_0_12px_#D4AF37]"
              />
            )}

            {/* Row Main Bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-2 flex items-center space-x-3">
                <span className="font-mono text-sm text-[#D4AF37] font-bold">
                  {service.num}
                </span>
                <span className="px-2.5 py-0.5 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase rounded">
                  {service.tag}
                </span>
              </div>

              <div className="md:col-span-6 space-y-1">
                <h3 className="font-display text-2xl sm:text-4xl text-[#F5F5F0]">
                  {service.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/60 font-light">
                  {service.desc}
                </p>
              </div>

              <div className="md:col-span-4 text-right">
                <span className="font-display text-xl sm:text-2xl text-[#D4AF37]">
                  {service.price}
                </span>
              </div>
            </div>

            {/* Smooth Expanded Drawer */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden pt-8 mt-6 border-t border-white/10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Left Thumbnail Image */}
                    <div className="md:col-span-3 aspect-[4/3] rounded-xl overflow-hidden border border-[#D4AF37]/30">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover filter contrast-[1.05]"
                      />
                    </div>

                    {/* Center Features */}
                    <div className="md:col-span-6 space-y-2">
                      <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest block">
                        WHAT'S INCLUDED IN SESSION:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feat) => (
                          <div key={feat} className="flex items-center space-x-2 text-xs text-white/80">
                            <Check size={14} className="text-[#D4AF37]" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Book Button */}
                    <div className="md:col-span-3 text-right">
                      <MagneticButton>
                        <Link
                          to="/contact"
                          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-[#e0bc43] transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                        >
                          <span>BOOK THIS CRAFT</span>
                          <ArrowRight size={14} />
                        </Link>
                      </MagneticButton>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        );
      })}
    </div>
  );
};
