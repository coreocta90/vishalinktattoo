import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MagneticButton } from '../components/MagneticButton';
import { InkSplatterSvg } from '../components/InkSplatterSvg';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050508] text-[#F5F5F0] flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
      
      {/* Background Radial Glow */}
      <div className="absolute inset-0 gold-radial-bg pointer-events-none" />

      {/* Animated Ink Splatter SVG Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <InkSplatterSvg className="w-[500px] h-[500px]" />
      </div>

      {/* Giant Ghost Text 404 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 overflow-hidden">
        <span className="font-display text-[28vw] leading-none text-white whitespace-nowrap">
          404
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10 space-y-6 max-w-2xl"
      >
        <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.25em] block">
          ERROR 404 • PAGE NOT FOUND
        </span>

        <h1 className="font-display text-6xl sm:text-9xl text-[#F5F5F0] tracking-tight uppercase leading-none">
          LOST IN <span className="text-[#D4AF37]">INK</span>
        </h1>

        <p className="font-sans text-base sm:text-xl text-white/70 max-w-md mx-auto leading-relaxed font-light">
          This page doesn't exist, but your next tattoo should.
        </p>

        <div className="pt-6">
          <MagneticButton>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-[#e0bc43] transition-all shadow-[0_0_35px_rgba(212,175,55,0.4)]"
            >
              <span>BACK TO STUDIO</span>
              <span>→</span>
            </Link>
          </MagneticButton>
        </div>
      </motion.div>

    </div>
  );
};
