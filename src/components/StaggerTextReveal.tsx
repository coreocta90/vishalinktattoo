import React from 'react';
import { motion } from 'framer-motion';

interface StaggerTextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'div';
}

export const StaggerTextReveal: React.FC<StaggerTextRevealProps> = ({
  text,
  className = '',
  as: Component = 'h2',
}) => {
  const characters = text.split('');

  return (
    <Component className={`inline-block overflow-hidden ${className}`}>
      {characters.map((char, idx) => (
        <motion.span
          key={idx}
          initial={{ y: '100%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            ease: [0.33, 1, 0.68, 1],
            delay: idx * 0.02,
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Component>
  );
};
