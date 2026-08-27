import React from 'react';
import { motion } from 'framer-motion';

export const SvgMachineDraw: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-[200px] h-[200px] flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37]">
        {/* Monogram / Tattoo Machine Stylized SVG Path */}
        <motion.path
          d="M 20 20 L 50 80 L 80 20 M 35 50 L 65 50 M 50 10 L 50 30 M 50 80 L 50 95"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Circular Shield Outline */}
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, delay: 0.3 }}
        />
      </svg>
    </div>
  );
};
