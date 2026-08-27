import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MagneticButton } from './MagneticButton';

interface CraftCardItem {
  num: string;
  title: string;
  tag: string;
  desc: string;
  price: string;
  image: string;
}

const craftItems: CraftCardItem[] = [
  {
    num: '01',
    tag: 'REALISM',
    title: 'BLACK & GREY REALISM',
    desc: 'Photorealistic portraits, animal motifs, and mythic figures with soft gradient depth and smooth micro-shading.',
    price: '₹350 / INCH',
    image: '/stills/bonus_01.webp'
  },
  {
    num: '02',
    tag: 'TRIBAL',
    title: 'TRIBAL & GEOMETRIC BANDS',
    desc: 'Polynesian, Maori, and Vedic geometric bands executed with rich jet-black ink saturation and razor-sharp line weight.',
    price: '₹300 / INCH',
    image: '/frames/frame_0240.webp'
  },
  {
    num: '03',
    tag: 'CUSTOM',
    title: 'CUSTOM DESIGN & STENCIL',
    desc: '1-on-1 digital stencil design process transforming your personal memories and symbols into exclusive tattoo art.',
    price: '₹300 / INCH',
    image: '/frames/frame_0300.webp'
  },
  {
    num: '04',
    tag: 'COVER-UP',
    title: 'COVER-UP & REWORK',
    desc: 'Expert transformation of old, faded, or unwanted tattoos into fresh new masterpieces with zero trace.',
    price: 'FROM ₹300 / INCH',
    image: '/frames/frame_0350.webp'
  }
];

export const StackedCraftCards: React.FC = () => {
  return (
    <div className="w-full space-y-8 pb-12">
      {craftItems.map((item, idx) => (
        <div
          key={item.num}
          className="sticky top-28 z-10 w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#0a0a12] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-[#D4AF37] transition-all duration-300"
          >
            {/* Left Content */}
            <div className="space-y-4 md:w-3/5">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-sm text-[#D4AF37] font-bold">
                  {item.num}
                </span>
                <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase rounded">
                  {item.tag}
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-5xl text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors">
                {item.title}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-white/60 font-light leading-relaxed max-w-lg">
                {item.desc}
              </p>

              <div className="pt-2 flex items-center space-x-6">
                <span className="font-display text-2xl text-[#D4AF37]">
                  {item.price}
                </span>

                <MagneticButton>
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-lg hover:bg-[#e0bc43] transition-colors"
                  >
                    <span>RESERVE</span>
                    <ArrowRight size={14} />
                  </Link>
                </MagneticButton>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-2/5 aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group-hover:border-[#D4AF37]/50 transition-colors">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
              />
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};
