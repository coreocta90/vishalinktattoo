import React from 'react';
import { motion } from 'framer-motion';

interface LineMaskRevealProps {
  lines: string[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'div';
  delay?: number;
  highlightIndex?: number;
  highlightStyle?: 'gold' | 'outline';
}

export const LineMaskReveal: React.FC<LineMaskRevealProps> = ({
  lines,
  className = '',
  as: Component = 'h2',
  delay = 0,
  highlightIndex,
  highlightStyle = 'gold',
}) => {
  return (
    <Component className={className}>
      {lines.map((line, idx) => {
        const isHighlight = highlightIndex === idx;
        let colorClass = 'text-[#F5F5F0]';
        if (isHighlight) {
          if (highlightStyle === 'gold') colorClass = 'text-[#D4AF37]';
          if (highlightStyle === 'outline') colorClass = 'text-outline-gold';
        }

        return (
          <span key={idx} className="block overflow-hidden">
            <motion.span
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: delay + idx * 0.1 }}
              className={`block ${colorClass}`}
            >
              {line}
            </motion.span>
          </span>
        );
      })}
    </Component>
  );
};
