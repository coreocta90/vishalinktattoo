import React, { useRef, useState, useEffect } from 'react';
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
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [slideDistance, setSlideDistance] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [progress, setProgress] = useState(0);

  // STEP 3: DYNAMIC TRACK HEIGHT CALCULATION
  const measureTrack = () => {
    if (!trackRef.current) return;
    const trackWidth = trackRef.current.scrollWidth;
    const windowWidth = window.innerWidth;
    // Calculate exact scroll distance needed to reveal the last card completely
    const distance = Math.max(0, trackWidth - windowWidth + 96);
    const secH = window.innerHeight + distance;

    setSlideDistance(distance);
    setSectionHeight(secH);
  };

  useEffect(() => {
    measureTrack();

    const handleResize = () => {
      measureTrack();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // STEP 4: SCROLL TO TRANSLATE MAPPING
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (!sectionRef.current || slideDistance <= 0) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableDistance = sectionHeight - window.innerHeight;

      if (scrollableDistance <= 0) return;

      // How far we have scrolled past section top
      const scrollOffset = -rect.top;
      const rawProgress = scrollOffset / scrollableDistance;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

      const currentTx = -clampedProgress * slideDistance;

      setProgress(clampedProgress);
      setTranslateX(currentTx);
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [slideDistance, sectionHeight]);

  return (
    <>
      {/* 1. DESKTOP DYNAMIC PINNED HORIZONTAL SCROLL SECTION */}
      <section
        ref={sectionRef}
        id="horizontal-gallery"
        style={{
          height: sectionHeight > 0 ? `${sectionHeight}px` : 'auto',
          position: 'relative',
        }}
        className="hidden lg:block bg-[#050508]"
      >
        {/* INNER STICKY VIEWPORT (100vh) */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          className="w-full py-12"
        >
          {/* Header Bar */}
          <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between mb-8">
            <div>
              <span className="text-[#D4AF37] font-sans text-xs font-semibold tracking-[0.25em] uppercase block">
                03 / HORIZONTAL CINEMATIC STRIP
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-[#F5F5F0]">
                FEATURED WORK TRACK
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

          {/* Gallery Track (Dynamic translateX) */}
          <div
            ref={trackRef}
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              willChange: 'transform',
            }}
            className="flex gap-[24px] px-12 transition-transform duration-75 ease-out"
          >
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="w-[450px] aspect-[3/4] shrink-0 group relative rounded-2xl overflow-hidden bg-[#0a0a12] border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.25)] transition-all duration-500"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  onLoad={measureTrack}
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
            ))}
          </div>

          {/* Thin Gold Position Progress Line */}
          <div className="max-w-7xl mx-auto px-6 w-full mt-8">
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                style={{ width: `${progress * 100}%` }}
                className="h-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37] transition-all duration-75"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MOBILE FALLBACK (< 1024px): SWIPE SCROLL-SNAP (NO PIN, NO DEAD SPACE) */}
      <section className="lg:hidden py-16 bg-[#050508] px-6 space-y-6 border-t border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#D4AF37] font-sans text-xs font-semibold tracking-[0.25em] uppercase block mb-1">
              03 / GALLERY
            </span>
            <h2 className="font-display text-3xl text-[#F5F5F0]">
              FEATURED WORK
            </h2>
          </div>
          <Link to="/portfolio" className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold">
            VIEW ALL →
          </Link>
        </div>

        <div className="flex space-x-6 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="w-[300px] shrink-0 aspect-[3/4] rounded-2xl overflow-hidden bg-[#0a0a12] border border-[#D4AF37]/20 snap-start relative"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <span className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase block mb-0.5">
                  {item.style}
                </span>
                <h3 className="font-display text-xl text-white uppercase">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
