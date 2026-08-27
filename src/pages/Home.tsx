import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Calendar, ArrowRight } from 'lucide-react';
import { MarqueeStrip } from '../components/MarqueeStrip';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { HygieneSection } from '../components/HygieneSection';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { InkStyleQuiz } from '../components/InkStyleQuiz';
import { StudioTour } from '../components/StudioTour';
import { MagneticButton } from '../components/MagneticButton';
import { TattooNeedleDivider } from '../components/TattooNeedleDivider';
import { HiddenInkSection } from '../components/HiddenInkSection';
import { PinnedHorizontalPortfolio } from '../components/PinnedHorizontalPortfolio';
import { TextScramble } from '../components/TextScramble';
import { CharByCharHeading } from '../components/CharByCharHeading';
import { AuroraBlob } from '../components/AuroraBlobs';
import { SvgMachineDraw } from '../components/SvgMachineDraw';
import { ExpandingServiceAccordion } from '../components/ExpandingServiceAccordion';
import { ClipPathImageReveal } from '../components/ClipPathImageReveal';
import { GlassmorphicTestimonials } from '../components/GlassmorphicTestimonials';
import { TiltCard } from '../components/TiltCard';

const TOTAL_FRAMES = 356;
const FRAME_PREFIX = '/frames/frame_';
const FRAME_EXT = '.webp';
const PARALLEL_CONCURRENCY = 4;

export const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);
  
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalToLoadCount, setTotalToLoadCount] = useState(TOTAL_FRAMES);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeCaptionIndex, setActiveCaptionIndex] = useState<number | null>(0);
  const [showScrollHint, setShowScrollHint] = useState(true);

  const chapters = [
    { tag: 'CHAPTER 01', title: 'THE CANVAS', sub: 'Every journey begins on untouched skin. Pure potential waiting for an enduring story.', in: -0.02, out: 0.13 },
    { tag: 'CHAPTER 02', title: 'THE RITUAL', sub: 'Rotary machine spinning. Pre-sterilized medical needles. The solemn preparation of sacred art.', in: 0.12, out: 0.25 },
    { tag: 'CHAPTER 03', title: 'FIRST LINE', sub: 'Needle meets skin. Unwavering hand, razor-sharp line weight, permanent commitment.', in: 0.24, out: 0.37 },
    { tag: 'CHAPTER 04', title: 'SHADING MAGIC', sub: 'Masterful gradient depth. Black & grey photorealism coming to life layer by intricate layer.', in: 0.36, out: 0.63 },
    { tag: 'CHAPTER 05', title: 'TRIBAL FIRE', sub: 'Bold, jet-black geometric strokes representing protection, honor, and ancestral heritage.', in: 0.62, out: 0.75 },
    { tag: 'CHAPTER 06', title: 'THE MASTERPIECE', sub: 'The reveal. A living artwork that travels with you forever.', in: 0.74, out: 0.87 },
    { tag: 'PREMIER TATTOO ARTIST', title: 'VISHAL KUMAR TATTOOS', sub: 'Ink That Tells Your Story • Dhanbad, Jharkhand', in: 0.86, out: 0.98 }
  ];

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
    const connection = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const isSlowNet = connection && (connection.saveData || ['slow-2g', '2g', '3g'].includes(connection.effectiveType || ''));
    const frameStride = (isMobile || isSlowNet) ? 2 : 1;

    const loadedMap = new Map<number, HTMLImageElement>();
    const loadingSet = new Set<number>();
    const queue: number[] = [];
    
    let currentFrameIndex = 1;
    let activeWorkers = 0;
    let totalToLoad = 0;
    let totalLoaded = 0;
    let rafId: number | null = null;

    function formatFrameNumber(num: number) {
      return String(num).padStart(4, '0');
    }

    function getFrameUrl(num: number) {
      return `${FRAME_PREFIX}${formatFrameNumber(num)}${FRAME_EXT}`;
    }

    function getNearestLoadedFrameIndex(target: number): number {
      if (loadedMap.has(target)) return target;
      let delta = 1;
      while (delta < TOTAL_FRAMES) {
        const prev = target - delta;
        if (prev >= 1 && loadedMap.has(prev)) return prev;
        const next = target + delta;
        if (next <= TOTAL_FRAMES && loadedMap.has(next)) return next;
        delta++;
      }
      return 1;
    }

    function loadFrame(index: number): Promise<void> {
      if (loadedMap.has(index) || loadingSet.has(index)) {
        return Promise.resolve();
      }
      loadingSet.add(index);

      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(index);

        img.onload = () => {
          loadedMap.set(index, img);
          loadingSet.delete(index);
          totalLoaded++;
          setLoadedCount(totalLoaded);

          if (getNearestLoadedFrameIndex(currentFrameIndex) === index) {
            renderFrame(currentFrameIndex);
          }
          resolve();
        };

        img.onerror = () => {
          loadingSet.delete(index);
          totalLoaded++;
          setLoadedCount(totalLoaded);
          resolve();
        };
      });
    }

    function processQueue() {
      while (activeWorkers < PARALLEL_CONCURRENCY && queue.length > 0) {
        const nextIdx = queue.shift()!;
        activeWorkers++;
        loadFrame(nextIdx).then(() => {
          activeWorkers--;
          processQueue();
        });
      }
    }

    function renderFrame(targetIndex: number) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const actualIdx = getNearestLoadedFrameIndex(targetIndex);
      const img = loadedMap.get(actualIdx);
      if (!img) return;

      const canvasW = window.innerWidth;
      const canvasH = window.innerHeight;
      const imgRatio = img.naturalWidth / img.naturalHeight || (960 / 540);
      const canvasRatio = canvasW / canvasH;

      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (canvasW <= 768) {
        if (canvasRatio > imgRatio) {
          drawW = canvasW;
          drawH = canvasW / imgRatio;
          drawX = 0;
          drawY = (canvasH - drawH) / 2;
        } else {
          drawH = canvasH;
          drawW = canvasH * imgRatio;
          drawX = (canvasW - drawW) / 2;
          drawY = 0;
        }
      } else {
        if (canvasRatio > imgRatio) {
          drawH = canvasH;
          drawW = canvasH * imgRatio;
          drawX = (canvasW - drawW) / 2;
          drawY = 0;
        } else {
          drawW = canvasW;
          drawH = canvasW / imgRatio;
          drawX = 0;
          drawY = (canvasH - drawH) / 2;
        }
      }

      ctx.clearRect(0, 0, canvasW, canvasH);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    function resizeCanvas() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      renderFrame(currentFrameIndex);
    }

    function updateScrollScrubber() {
      const scrollTrack = scrollTrackRef.current;
      if (!scrollTrack) return;

      const trackRect = scrollTrack.getBoundingClientRect();
      const totalScrollableDistance = scrollTrack.offsetHeight - window.innerHeight;
      const currentScrollPosition = Math.max(0, -trackRect.top);

      let progress = 0;
      if (totalScrollableDistance > 0 && window.scrollY > 0) {
        progress = Math.min(Math.max(currentScrollPosition / totalScrollableDistance, 0), 1);
      }

      const targetFrame = Math.min(
        Math.max(1, Math.floor(progress * (TOTAL_FRAMES - 1)) + 1),
        TOTAL_FRAMES
      );

      if (targetFrame !== currentFrameIndex) {
        currentFrameIndex = targetFrame;
        renderFrame(currentFrameIndex);
      }

      let activeCapIdx: number | null = null;
      chapters.forEach((cap, idx) => {
        if (progress >= cap.in && progress <= cap.out) {
          activeCapIdx = idx;
        }
      });
      setActiveCaptionIndex(activeCapIdx);

      if (progress > 0.02 || window.scrollY > 30) {
        setShowScrollHint(false);
      } else {
        setShowScrollHint(true);
      }
    }

    function onScroll() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScrollScrubber);
    }

    for (let i = 1; i <= TOTAL_FRAMES; i += frameStride) {
      queue.push(i);
    }
    if (queue[queue.length - 1] !== TOTAL_FRAMES) {
      queue.push(TOTAL_FRAMES);
    }

    totalToLoad = queue.length;
    setTotalToLoadCount(totalToLoad);

    const priorityBatch = queue.slice(0, 5);
    const priorityPromises = priorityBatch.map((idx) => loadFrame(idx));

    Promise.all(priorityPromises).then(() => {
      setIsUnlocked(true);
      window.scrollTo(0, 0);
      resizeCanvas();
      renderFrame(1);
      processQueue();
    });

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const loaderPct = Math.min(100, Math.floor((loadedCount / totalToLoadCount) * 100));

  return (
    <div className="relative w-full bg-[#050508] text-[#F5F5F0]">
      
      {/* PRELOADER OVERLAY */}
      {!isUnlocked && (
        <div className="fixed inset-0 z-50 bg-[#050508] flex flex-col items-center justify-center transition-opacity duration-500">
          <div className="font-display text-xl sm:text-2xl text-[#D4AF37] tracking-widest mb-6 uppercase">
            VISHAL KUMAR TATTOOS
          </div>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-[#D4AF37] shadow-[0_0_12px_#D4AF37] transition-all duration-150"
              style={{ width: `${loaderPct}%` }}
            />
          </div>
          <div className="text-xs text-white/40 tracking-wider font-mono">
            INITIALIZING FILM ENGINE {loaderPct}%
          </div>
        </div>
      )}

      {/* CANVAS VIEWPORT (FIXED) WITH ANIMATED NOISE GRADIENT */}
      <div className="fixed top-0 left-0 w-vw h-vh z-1 pointer-events-none flex items-center justify-center overflow-hidden bg-[#050508]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03)_0%,rgba(59,130,246,0.02)_50%,transparent_100%)] opacity-70 animate-pulse" />
        <canvas ref={canvasRef} className="w-full h-full block filter contrast-[1.05] brightness-[0.95] relative z-1" />
        <div className="absolute inset-0 z-2 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(5,5,8,0.25)_30%,rgba(5,5,8,0.75)_80%,#050508_100%)]" />
      </div>

      {/* 600vh DUMMY SCROLL TRACK */}
      <div ref={scrollTrackRef} className="h-[600vh] w-full relative pointer-events-none" />

      {/* CHAPTER CAPTIONS OVERLAY */}
      <div className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center p-6">
        {chapters.map((cap, idx) => (
          <div
            key={cap.title}
            className={`absolute text-center max-w-4xl px-4 transition-all duration-500 transform ${
              activeCaptionIndex === idx
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 translate-y-6 pointer-events-none'
            }`}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#050508]/80 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-md shadow-2xl">
              {cap.tag}
            </span>
            <h1 className="font-display text-4xl sm:text-7xl md:text-8xl tracking-tight text-[#F5F5F0] uppercase leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] mb-4">
              {cap.title}
            </h1>
            <p className="text-sm sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)] font-light">
              {cap.sub}
            </p>
          </div>
        ))}
      </div>

      {/* SCROLL HINT BAR */}
      <div
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-12 flex flex-col items-center space-y-2 text-white/40 text-xs tracking-widest uppercase pointer-events-none transition-opacity duration-400 ${
          showScrollHint ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-5 h-8 border-2 border-[#D4AF37]/40 rounded-full relative">
          <div className="w-1 h-1.5 bg-[#D4AF37] rounded-full absolute top-1.5 left-1/2 -translate-x-1/2 animate-bounce" />
        </div>
        <span>SCROLL TO UNFOLD FILM</span>
      </div>

      {/* ENDING FILM CTA SECTION */}
      <section className="relative z-20 min-h-screen bg-[#050508] border-t border-[#D4AF37]/20 flex flex-col justify-between p-8 sm:p-16 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-5">
          <span className="font-display text-[18vw] leading-none text-white whitespace-nowrap tracking-tighter">
            INK YOUR STORY
          </span>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs tracking-widest text-[#D4AF37] font-semibold uppercase">
          <span>07 / THE SIGNATURE</span>
          <span>VISHAL KUMAR TATTOOS • DHANBAD</span>
        </div>

        <div className="relative z-10 my-auto text-center py-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl sm:text-8xl tracking-tight text-[#F5F5F0] mb-8 uppercase"
          >
            BECOME THE MASTERPIECE
          </motion.h2>

          <MagneticButton>
            <Link
              to="/portfolio"
              className="inline-flex items-center px-10 py-5 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-display text-xl sm:text-2xl tracking-wider rounded-xl hover:bg-[#D4AF37] hover:text-[#050508] transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.25)] group"
            >
              <span>ENTER THE STUDIO</span>
              <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </MagneticButton>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6">
          <div className="text-xs text-white/40 font-mono">
            Steel Gate, near Baba Sweets, Dhanbad, Jharkhand
          </div>
          <Link
            to="/portfolio"
            className="font-display text-lg sm:text-xl text-[#D4AF37] hover:text-white transition-colors tracking-wider flex items-center space-x-1"
          >
            <span>DISCOVER WORK</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="relative z-20">
        <MarqueeStrip />
      </div>

      {/* SECTION 1 — MANIFESTO WITH AURORA BLOB & CHAR-BY-CHAR HEADING */}
      <section className="relative z-20 bg-[#050508] py-24 sm:py-36 overflow-hidden">
        {/* Aurora Blob 1 */}
        <AuroraBlob color="gold" size={650} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04]">
          <span className="font-display text-[25vw] leading-none text-white uppercase tracking-tighter">
            INK
          </span>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10 space-y-6">
          <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.25em] inline-block">
            <TextScramble text="01 / MANIFESTO" />
          </span>
          
          {/* Character-by-character 3D Rise Reveal Heading */}
          <CharByCharHeading
            text="EVERY SKIN TELLS A STORY WE INK IT FOREVER"
            highlightWord="FOREVER"
            as="h2"
            className="font-display text-4xl sm:text-7xl lg:text-8xl tracking-tight leading-none uppercase"
          />

          <p className="font-sans text-sm sm:text-base text-white/60 max-w-[600px] mx-auto leading-relaxed font-light pt-2">
            From fine-line scripts to full black & grey realism — every piece at Vishal Kumar Tattoos is designed, sterilized, and inked like a masterpiece.
          </p>
        </div>
      </section>

      {/* NEEDLE DRAW DIVIDER 1 */}
      <TattooNeedleDivider className="relative z-20" />

      {/* SECTION 2 — STATS STRIP */}
      <section className="relative z-20 bg-[#0a0a12] py-16 border-y border-[#D4AF37]/15">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#D4AF37]/15 text-center">
            
            <div className="py-4 md:py-0 md:px-6 space-y-1">
              <div className="font-display text-4xl sm:text-5xl text-[#D4AF37]">
                <AnimatedCounter end={7650} suffix="+" />
              </div>
              <div className="font-sans text-xs font-semibold text-white/50 uppercase tracking-widest">Instagram Followers</div>
            </div>

            <div className="py-4 md:py-0 md:px-6 space-y-1">
              <div className="font-display text-4xl sm:text-5xl text-[#D4AF37]">
                <AnimatedCounter end={300} suffix="+" />
              </div>
              <div className="font-sans text-xs font-semibold text-white/50 uppercase tracking-widest">Happy Clients</div>
            </div>

            <div className="py-4 md:py-0 md:px-6 space-y-1">
              <div className="font-display text-4xl sm:text-5xl text-[#D4AF37]">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="font-sans text-xs font-semibold text-white/50 uppercase tracking-widest">Tattoos Inked</div>
            </div>

            <div className="py-4 md:py-0 md:px-6 space-y-1">
              <div className="font-display text-4xl sm:text-5xl text-[#D4AF37]">
                <AnimatedCounter end={300} prefix="₹" />
              </div>
              <div className="font-sans text-xs font-semibold text-white/50 uppercase tracking-widest">Per Inch Starting</div>
            </div>

          </div>
        </div>
      </section>

      {/* FLASHLIGHT HIDDEN INK SPOTLIGHT SECTION */}
      <HiddenInkSection />

      {/* INK STYLE QUIZ */}
      <InkStyleQuiz />

      {/* NEEDLE DRAW DIVIDER 2 */}
      <TattooNeedleDivider className="relative z-20" />

      {/* SECTION 3 — EXPANDING SERVICE ACCORDION */}
      <section className="relative z-20 bg-[#050508] py-24 sm:py-36 overflow-hidden">
        <AuroraBlob color="gold" size={800} className="top-1/4 right-0" />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.25em] mb-2 block">
                <TextScramble text="02 / DISCIPLINES" />
              </span>
              <h2 className="font-display text-4xl sm:text-6xl text-[#F5F5F0] tracking-wide uppercase">
                THE CRAFT ACCORDION
              </h2>
            </div>

            <Link
              to="/services"
              className="font-sans text-xs font-bold text-[#D4AF37] uppercase tracking-[0.18em] hover:text-white transition-colors flex items-center space-x-1"
            >
              <span>ALL SERVICES</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <ExpandingServiceAccordion />

        </div>
      </section>

      {/* HYGIENE & SAFETY SECTION */}
      <HygieneSection />

      {/* STUDIO TOUR */}
      <StudioTour />

      {/* 1. PINNED HORIZONTAL SCROLL GALLERY (DESKTOP) */}
      <PinnedHorizontalPortfolio />

      {/* BEFORE/AFTER COVER-UP SLIDER */}
      <section className="relative z-20 bg-[#050508] py-20 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.25em] block mb-2">
              <TextScramble text="04 / COVER-UP SPOTLIGHT" />
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-[#F5F5F0] uppercase">
              TRANSFORMATION SHOWCASE
            </h2>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* SECTION 5 — GLASSMORPHIC FLOATING TESTIMONIALS */}
      <section className="relative z-20 bg-[#0a0a12] py-24 sm:py-36 border-y border-[#D4AF37]/15 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          
          <div className="mb-12">
            <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.25em] mb-2 block">
              <TextScramble text="05 / TESTIMONIALS" />
            </span>
            <h2 className="font-display text-4xl sm:text-6xl text-[#F5F5F0] tracking-wide uppercase">
              GLASSMORPHIC VOICES
            </h2>
          </div>

          <GlassmorphicTestimonials />

        </div>
      </section>

      {/* NEEDLE DRAW DIVIDER 3 */}
      <TattooNeedleDivider className="relative z-20" />

      {/* SECTION 6 — ARTIST TEASER WITH CLIP-PATH REVEAL & SVG MACHINE DRAW */}
      <section className="relative z-20 bg-[#050508] py-24 sm:py-36">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Portrait with Expanding Circular Clip-Path Reveal */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-[16px] overflow-hidden border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                <ClipPathImageReveal
                  src="/stills/bonus_01.webp"
                  alt="Vishal Kumar Tattoo Artist"
                  className="aspect-[4/5]"
                />
              </div>
            </div>

            {/* Right Bio Content with Self-Drawing SVG Motif */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.25em] block">
                  <TextScramble text="06 / THE ARTIST" />
                </span>

                {/* Self-Drawing Tattoo Machine SVG Outline Motif */}
                <SvgMachineDraw className="w-16 h-16 shrink-0" />
              </div>

              <h2 className="font-display text-4xl sm:text-7xl text-[#F5F5F0] tracking-tight uppercase leading-none">
                VISHAL KUMAR
              </h2>

              <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light">
                Jharkhand's most trusted tattoo artist. Specialist in black & grey realism, tribal art and custom fine-line work — every piece crafted with precision, hygiene and pure artistic passion.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-4 py-2 bg-white/5 border border-[#D4AF37]/30 rounded-full text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  BEST IN JHARKHAND
                </span>
                <span className="px-4 py-2 bg-white/5 border border-[#D4AF37]/30 rounded-full text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  7,650+ FOLLOWERS
                </span>
                <span className="px-4 py-2 bg-white/5 border border-[#D4AF37]/30 rounded-full text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  300+ CLIENTS
                </span>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="font-sans text-xs font-bold text-[#D4AF37] uppercase tracking-[0.18em] hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>READ FULL STORY</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* SECTION 7 — FINAL BOOKING CTA WITH AURORA BLOB 2 & CHAR-BY-CHAR HEADING */}
      <section className="relative z-20 bg-[#050508] py-24 sm:py-36 border-t border-white/5 overflow-hidden">
        {/* Aurora Blob 2 (Blue Tint) */}
        <AuroraBlob color="blue" size={600} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10 space-y-8">
          <CharByCharHeading
            text="READY TO INK YOUR STORY?"
            highlightWord="STORY?"
            as="h2"
            className="font-display text-4xl sm:text-7xl lg:text-8xl tracking-tight uppercase"
          />

          <p className="font-sans text-sm sm:text-base text-white/60 max-w-xl mx-auto font-light">
            Free consultation. Sterilized equipment. Premium ink. Book your session today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <MagneticButton>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-[#e0bc43] transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center space-x-2"
              >
                <Calendar size={16} />
                <span>BOOK APPOINTMENT</span>
              </Link>
            </MagneticButton>

            <a
              href="tel:+918102578635"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-[#D4AF37] hover:text-[#050508] transition-all flex items-center justify-center space-x-2"
            >
              <Phone size={16} />
              <span>CALL: +91 8102578635</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
