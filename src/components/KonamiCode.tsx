import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  opacity: number;
}

export const KonamiCode: React.FC = () => {
  const [triggered, setTriggered] = useState(false);
  const keyIndex = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI_SEQUENCE[keyIndex.current].toLowerCase();

      if (key === expected) {
        keyIndex.current++;
        if (keyIndex.current === KONAMI_SEQUENCE.length) {
          triggerSecret();
          keyIndex.current = 0;
        }
      } else {
        keyIndex.current = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerSecret = () => {
    setTriggered(true);

    setTimeout(() => {
      window.open(
        'https://wa.me/918102578635?text=I%20found%20the%20secret!%20Give%20me%2010%25%20off%20%F0%9F%98%84',
        '_blank'
      );
    }, 3000);

    setTimeout(() => {
      setTriggered(false);
    }, 4000);
  };

  useEffect(() => {
    if (!triggered) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const colors = ['#D4AF37', '#F5F5F0', '#e0bc43', '#8a6d1f', '#ffffff'];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: width / 2,
        y: height / 2,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.5) * 18 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        opacity: 1.0,
      });
    }

    let rafId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gravity
        p.rotation += p.vRot;
        p.opacity -= 0.008;

        if (p.opacity > 0) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(rafId);
  }, [triggered]);

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] pointer-events-none flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          <motion.div
            initial={{ scale: 0.5, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: -30 }}
            className="bg-[#0a0a12] border-2 border-[#D4AF37] p-8 sm:p-12 rounded-2xl text-center shadow-[0_0_60px_rgba(212,175,55,0.6)] z-10 space-y-4 max-w-md mx-4 pointer-events-auto"
          >
            <span className="text-[#D4AF37] font-mono text-xs font-bold uppercase tracking-widest block">
              SECRET KONAMI CODE UNLOCKED! 🎮
            </span>

            <h3 className="font-display text-3xl sm:text-4xl text-[#F5F5F0]">
              YOU FOUND THE SECRET INK ✦
            </h3>

            <p className="text-xs text-white/70 leading-relaxed font-light">
              Claim your exclusive 10% secret discount! Opening WhatsApp in 3 seconds...
            </p>

            <a
              href="https://wa.me/918102578635?text=I%20found%20the%20secret!%20Give%20me%2010%25%20off%20%F0%9F%98%84"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-6 py-3 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-[#e0bc43] transition-colors mt-2"
            >
              Claim 10% Off Now →
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
