import React from 'react';
import { motion } from 'framer-motion';

export const SweepTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div className="relative w-full">
      {/* Vertical Gold Sweep Overlay Line */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[9999] bg-[#050508] border-r-2 border-[#D4AF37] pointer-events-none origin-left"
      />
      {children}
    </motion.div>
  );
};
