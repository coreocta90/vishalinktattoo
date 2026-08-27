import React from 'react';
import { motion } from 'framer-motion';

export const InkSplatterSvg: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none opacity-20 ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full text-[#D4AF37]">
        <motion.path
          d="M 100 20 C 130 10 160 40 170 70 C 180 100 160 140 130 160 C 100 180 60 170 30 140 C 0 110 20 60 50 30 C 70 10 90 30 100 20 Z"
          fill="currentColor"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        {/* Drops */}
        <circle cx="40" cy="40" r="6" fill="currentColor" />
        <circle cx="160" cy="50" r="4" fill="currentColor" />
        <circle cx="170" cy="140" r="8" fill="currentColor" />
        <circle cx="30" cy="160" r="5" fill="currentColor" />
      </svg>
    </div>
  );
};
