import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC = () => {
  const [shouldShow, setShouldShow] = useState(false);
  const [isSlidingUp, setIsSlidingUp] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('vk_preloaded');
    if (!hasSeen) {
      setShouldShow(true);

      const timer = setTimeout(() => {
        setIsSlidingUp(true);
        sessionStorage.setItem('vk_preloaded', 'true');
        setTimeout(() => {
          setShouldShow(false);
        }, 800);
      }, 1600);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isSlidingUp ? '-100%' : 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[10000] bg-[#050508] flex flex-col items-center justify-center pointer-events-none select-none"
      >
        {/* VK Monogram SVG Stroke Animation */}
        <div className="w-24 h-24 mb-6">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <motion.path
              d="M 20 25 L 45 75 L 55 75 L 80 25 M 50 25 L 50 75"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="rgba(212, 175, 55, 0.3)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Brand Name Expanding Letter Spacing */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="font-display text-xl sm:text-2xl text-white tracking-[0.35em] uppercase text-center"
        >
          <span className="text-[#D4AF37]">VISHAL</span> KUMAR TATTOOS
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.6 }}
          className="font-sans text-[10px] text-[#D4AF37] tracking-widest uppercase mt-4"
        >
          DHANBAD • JHARKHAND
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
