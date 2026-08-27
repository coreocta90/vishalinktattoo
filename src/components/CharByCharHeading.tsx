import React from 'react';
import { motion } from 'framer-motion';

interface CharByCharHeadingProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  highlightWord?: string;
}

export const CharByCharHeading: React.FC<CharByCharHeadingProps> = ({
  text,
  className = '',
  as: Component = 'h2',
  highlightWord,
}) => {
  const words = text.split(' ');

  return (
    <Component className={`flex flex-wrap items-center justify-center gap-x-[0.3em] gap-y-[0.1em] ${className}`}>
      {words.map((word, wordIdx) => {
        const isHighlight = highlightWord && word.toUpperCase() === highlightWord.toUpperCase();
        const wordChars = word.split('');

        return (
          <span key={wordIdx} className="inline-flex overflow-hidden">
            {wordChars.map((char, charIdx) => {
              const globalIdx = wordIdx * 10 + charIdx;
              return (
                <motion.span
                  key={charIdx}
                  initial={{ opacity: 0, y: 40, rotateX: -40 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: globalIdx * 0.02,
                  }}
                  className={`inline-block ${
                    isHighlight ? 'text-[#D4AF37]' : 'text-[#F5F5F0]'
                  }`}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </Component>
  );
};
