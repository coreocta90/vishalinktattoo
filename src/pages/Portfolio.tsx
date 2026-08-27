import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

interface PortfolioItem {
  id: string;
  title: string;
  category: 'Realism' | 'Tribal' | 'Script' | 'Cover-up';
  image: string;
  description: string;
  size: string;
}

const portfolioData: PortfolioItem[] = [
  {
    id: '1',
    title: 'Photorealistic Lion Portrait',
    category: 'Realism',
    image: '/stills/bonus_01.webp',
    description: 'Hyper-detailed black & grey realism featuring intense eyes, textured mane, and soft gradient shading on upper arm.',
    size: '8 x 5 inches'
  },
  {
    id: '2',
    title: 'Fine Line Precision Inking',
    category: 'Realism',
    image: '/stills/bonus_02.webp',
    description: 'Razor-sharp line weight execution and micro-shading details during studio session.',
    size: '6 x 4 inches'
  },
  {
    id: '3',
    title: 'Black & Grey Micro-Shading Depth',
    category: 'Realism',
    image: '/frames/frame_0180.webp',
    description: 'Complex gradient transition built with hospital-grade rotary needle setup.',
    size: '10 x 6 inches'
  },
  {
    id: '4',
    title: 'Polynesian Geometric Band',
    category: 'Tribal',
    image: '/frames/frame_0240.webp',
    description: 'Traditional jet-black tribal band depicting strength, lineage, and ancestral warrior symbols.',
    size: '12 x 4 inches'
  },
  {
    id: '5',
    title: 'Chicano Calligraphy & Script',
    category: 'Script',
    image: '/frames/frame_0300.webp',
    description: 'Custom hand-lettered lettering with delicate filigree flourishing and deep black saturation.',
    size: '7 x 3 inches'
  },
  {
    id: '6',
    title: 'Pristine Phoenix Cover-Up',
    category: 'Cover-up',
    image: '/frames/frame_0350.webp',
    description: 'Complete transformation of an old 10-year faded tattoo into a majestic rising phoenix.',
    size: '11 x 7 inches'
  }
];

export const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filters = ['All', 'Realism', 'Tribal', 'Script', 'Cover-up'];

  const filteredItems = activeFilter === 'All'
    ? portfolioData
    : portfolioData.filter((item) => item.category === activeFilter);

  // Keyboard navigation & body scroll lock for Lightbox
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, filteredItems]);

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! === 0 ? filteredItems.length - 1 : prev! - 1));
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! === filteredItems.length - 1 ? 0 : prev! + 1));
  };

  const currentItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  return (
    <div className="pt-28 pb-24 bg-[#050508] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3 inline-block">
            PERMANENT LIVING ART
          </span>
          <h1 className="font-display text-5xl sm:text-8xl tracking-tight text-white mb-6 uppercase">
            PORTFOLIO
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Explore curated masterpieces crafted by Vishal Kumar in Dhanbad. Each piece is designed 1-on-1 for maximum detail and longevity.
          </p>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full shadow-[0_0_12px_#D4AF37]" />
        </div>

        {/* Featured Cover-Up Transformation Slider */}
        <div className="mb-20">
          <div className="text-center mb-6">
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase block mb-1">
              BEFORE & AFTER SPOTLIGHT
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-white">
              TRANSFORMATION SHOWCASE
            </h3>
          </div>
          <BeforeAfterSlider />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setSelectedIndex(null);
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-[#D4AF37] text-[#050508] shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105'
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedIndex(idx)}
                className="group relative bg-[#0a0a12] border border-[#D4AF37]/15 rounded-2xl overflow-hidden cursor-pointer hover:border-[#D4AF37]/60 hover:shadow-[0_0_35px_rgba(212,175,55,0.2)] transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#050508]/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase rounded-md">
                    {item.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl text-white tracking-wide mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ENHANCED LIGHTBOX MODAL WITH PREV/NEXT ARROWS */}
        <AnimatePresence>
          {currentItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
              className="fixed inset-0 z-50 bg-[#050508]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
            >
              {/* Previous Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/60 border border-white/20 rounded-full text-white/80 hover:text-white hover:border-[#D4AF37] transition-colors"
                aria-label="Previous artwork"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/60 border border-white/20 rounded-full text-white/80 hover:text-white hover:border-[#D4AF37] transition-colors"
                aria-label="Next artwork"
              >
                <ChevronRight size={24} />
              </button>

              {/* Modal Card */}
              <motion.div
                key={currentItem.id}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0a0a12] border border-[#D4AF37] rounded-2xl overflow-hidden max-w-3xl w-full relative shadow-[0_0_60px_rgba(212,175,55,0.3)]"
              >
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="absolute top-4 right-4 z-20 p-2.5 bg-black/70 border border-white/20 rounded-full text-white/80 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>

                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="w-full max-h-[60vh] object-cover filter contrast-[1.05]"
                />

                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">
                      {currentItem.category} • {currentItem.size}
                    </span>
                    <span className="text-xs text-white/40">
                      {selectedIndex! + 1} / {filteredItems.length}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl text-white mb-3">
                    {currentItem.title}
                  </h2>
                  <p className="text-sm text-white/70 leading-relaxed mb-6">
                    {currentItem.description}
                  </p>

                  <a
                    href={`https://wa.me/918102578635?text=Hi%20Vishal!%20I%20saw%20your%20portfolio%20tattoo%20"${encodeURIComponent(currentItem.title)}"%20and%20want%20to%20book%20a%20similar%20session.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-lg hover:bg-[#e0bc43] transition-colors"
                  >
                    <span>Request Similar Artwork</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
