import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Quote, Phone, Calendar } from 'lucide-react';
import { MarqueeStrip } from '../components/MarqueeStrip';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { HygieneSection } from '../components/HygieneSection';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { InkStyleQuiz } from '../components/InkStyleQuiz';
import { StudioTour } from '../components/StudioTour';

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

  // Chapters data
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

  const craftCards = [
    { tag: 'REALISM', title: 'Black & Grey Realism', desc: 'Photorealistic portraits and wildlife with soft gradient shading and photographic depth.', price: '₹350 / inch' },
    { tag: 'TRIBAL', title: 'Tribal Patterns', desc: 'Polynesian, Maori and Vedic geometric bands with jet-black saturation and razor-sharp lines.', price: '₹300 / inch' },
    { tag: 'CUSTOM', title: 'Custom Design', desc: 'One-of-a-kind designs built with you — from first sketch to final ink.', price: '₹300 / inch' },
    { tag: 'COVER-UP', title: 'Cover-Up & Rework', desc: 'Old or faded tattoos transformed into bold new artwork.', price: 'From ₹300 / inch' }
  ];

  const featuredWorks = [
    { title: 'LION PORTRAIT', style: 'Black & Grey Realism', image: '/stills/bonus_01.webp', offset: false },
    { title: 'FINE LINE PRECISION', style: 'Realism Detail', image: '/stills/bonus_02.webp', offset: true },
    { title: 'MICRO SHADING DEPTH', style: 'Black & Grey', image: '/frames/frame_0180.webp', offset: false },
    { title: 'POLYNESIAN GEOMETRY', style: 'Tribal Pattern', image: '/frames/frame_0240.webp', offset: true },
    { title: 'SCRIPT CALLIGRAPHY', style: 'Custom Lettering', image: '/frames/frame_0300.webp', offset: false },
    { title: 'PHOENIX REVEAL', style: 'Cover-Up Artwork', image: '/frames/frame_0350.webp', offset: true }
  ];

  const testimonials = [
    { quote: "Vishal bhai ne meri tattoo itni perfectly banai ki main shabd nahi dhundh pa raha. Best artist in Jharkhand!", name: "Rahul M.", city: "Dhanbad" },
    { quote: "Amazing attention to detail. My black and grey portrait looks absolutely real.", name: "Priya S.", city: "Ranchi" },
    { quote: "The tribal design was exactly what I wanted. Very professional and clean studio.", name: "Amit K.", city: "Bokaro" },
    { quote: "I was nervous about my first tattoo but Vishal made me feel completely comfortable.", name: "Sneha R.", city: "Dhanbad" },
    { quote: "Got a cover-up done and you can't even tell there was an old tattoo. Master at his craft!", name: "Vikram P.", city: "Jamshedpur" }
  ];

  return (
    <div className="relative w-full bg-[#050508]">
      
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

      {/* CANVAS VIEWPORT (FIXED) */}
      <div className="fixed top-0 left-0 w-vw h-vh z-1 pointer-events-none flex items-center justify-center overflow-hidden bg-[#050508]">
        <canvas ref={canvasRef} className="w-full h-full block filter contrast-[1.05] brightness-[0.95]" />
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
            <h1 className="font-display text-4xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] mb-4">
              {cap.title}
            </h1>
            <p className="text-sm sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)]">
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
            className="font-display text-5xl sm:text-8xl tracking-tight text-white mb-8"
          >
            BECOME THE MASTERPIECE
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center px-10 py-5 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-display text-xl sm:text-2xl tracking-wider rounded-xl hover:bg-[#D4AF37] hover:text-[#050508] transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.25)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] group"
            >
              <span>ENTER THE STUDIO</span>
              <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6">
          <div className="text-xs text-white/40">
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

      {/* SECTION 1 — MANIFESTO */}
      <section className="relative z-20 bg-[#050508] py-20 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.2em] inline-block">
              01 / MANIFESTO
            </span>
            
            <h2 className="font-display text-4xl sm:text-7xl lg:text-8xl tracking-tight leading-none uppercase">
              <span className="text-white block">EVERY SKIN TELLS A STORY.</span>
              <span className="text-[#D4AF37] block mt-2">WE INK IT FOREVER.</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-white/60 max-w-[600px] mx-auto leading-relaxed font-light">
              From fine-line scripts to full black & grey realism — every piece at Vishal Kumar Tattoos is designed, sterilized, and inked like a masterpiece.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — STATS STRIP */}
      <section className="relative z-20 bg-[#0a0a12] py-16 border-y border-[#D4AF37]/15">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#D4AF37]/15 text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="py-4 md:py-0 md:px-6 space-y-1"
            >
              <div className="font-display text-4xl sm:text-5xl text-[#D4AF37]">
                <AnimatedCounter end={7650} suffix="+" />
              </div>
              <div className="font-sans text-xs font-semibold text-white/50 uppercase tracking-widest">Instagram Followers</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="py-4 md:py-0 md:px-6 space-y-1"
            >
              <div className="font-display text-4xl sm:text-5xl text-[#D4AF37]">
                <AnimatedCounter end={300} suffix="+" />
              </div>
              <div className="font-sans text-xs font-semibold text-white/50 uppercase tracking-widest">Happy Clients</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="py-4 md:py-0 md:px-6 space-y-1"
            >
              <div className="font-display text-4xl sm:text-5xl text-[#D4AF37]">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="font-sans text-xs font-semibold text-white/50 uppercase tracking-widest">Tattoos Inked</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="py-4 md:py-0 md:px-6 space-y-1"
            >
              <div className="font-display text-4xl sm:text-5xl text-[#D4AF37]">
                <AnimatedCounter end={300} prefix="₹" />
              </div>
              <div className="font-sans text-xs font-semibold text-white/50 uppercase tracking-widest">Per Inch Starting</div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* INK STYLE QUIZ (Placed right after stats) */}
      <InkStyleQuiz />

      {/* SECTION 3 — CRAFT PREVIEW */}
      <section className="relative z-20 bg-[#050508] py-20 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-2 block">
                02 / DISCIPLINES
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase">
                THE CRAFT
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {craftCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#0a0a12] border border-[#D4AF37]/15 rounded-[16px] p-8 flex flex-col justify-between hover:border-[#D4AF37] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all duration-300 group"
              >
                <div>
                  <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase rounded-md inline-block mb-4">
                    {card.tag}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {card.title}
                  </h3>
                  <p className="font-sans text-sm text-white/60 leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <span className="font-display text-2xl text-[#D4AF37]">{card.price}</span>
                  <Link
                    to="/contact"
                    className="font-sans text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center space-x-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Reserve Session</span>
                    <span>→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* HYGIENE & SAFETY SECTION */}
      <HygieneSection />

      {/* STUDIO TOUR (Placed after hygiene section) */}
      <StudioTour />

      {/* SECTION 4 — FEATURED WORK & BEFORE/AFTER COVER-UP SLIDER */}
      <section className="relative z-20 bg-[#050508] py-20 sm:py-32 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-2 block">
                03 / GALLERY TEASER
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase">
                FEATURED WORK
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

          <div className="mb-16">
            <BeforeAfterSlider />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWorks.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative rounded-[12px] overflow-hidden bg-[#0a0a12] border border-[#D4AF37]/15 hover:border-[#D4AF37] hover:scale-[1.03] transition-all duration-300 shadow-xl ${
                  item.offset ? 'lg:translate-y-8' : ''
                }`}
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[#D4AF37] font-sans text-[10px] font-bold uppercase tracking-widest block mb-1">
                      {item.style}
                    </span>
                    <h3 className="font-display text-xl text-white uppercase tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5 — CLIENT VOICES */}
      <section className="relative z-20 bg-[#0a0a12] py-20 sm:py-32 border-y border-[#D4AF37]/15 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="mb-12">
            <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-2 block">
              04 / TESTIMONIALS
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase">
              CLIENT VOICES
            </h2>
          </div>

          <div className="flex space-x-6 overflow-x-auto pb-8 pt-2 no-scrollbar snap-x snap-mandatory">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="w-[320px] sm:w-[350px] shrink-0 bg-white/[0.03] border border-white/10 rounded-2xl p-8 flex flex-col justify-between snap-start hover:border-[#D4AF37]/40 transition-colors"
              >
                <div>
                  <Quote size={32} className="text-[#D4AF37] mb-4 opacity-80" />
                  <p className="font-sans text-sm text-white/80 italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <span className="font-sans text-sm font-bold text-white">{t.name}</span>
                  <span className="font-sans text-xs font-semibold text-[#D4AF37]">{t.city}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6 — ARTIST TEASER */}
      <section className="relative z-20 bg-[#050508] py-20 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative"
            >
              <div className="rounded-[16px] overflow-hidden border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                <img
                  src="/stills/bonus_01.webp"
                  alt="Vishal Kumar Tattoo Artist"
                  className="w-full h-auto object-cover filter contrast-[1.05]"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 space-y-6"
            >
              <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.2em] block">
                05 / THE ARTIST
              </span>

              <h2 className="font-display text-4xl sm:text-7xl text-white tracking-tight uppercase leading-none">
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

      {/* SECTION 7 — FINAL BOOKING CTA */}
      <section className="relative z-20 bg-[#050508] py-20 sm:py-32 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,rgba(5,5,8,0)_70%)]" />

        <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10 space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase"
          >
            READY TO INK YOUR STORY?
          </motion.h2>

          <p className="font-sans text-sm sm:text-base text-white/60 max-w-xl mx-auto font-light">
            Free consultation. Sterilized equipment. Premium ink. Book your session today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-[#e0bc43] transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center space-x-2"
            >
              <Calendar size={16} />
              <span>BOOK APPOINTMENT</span>
            </Link>

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
