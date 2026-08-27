import React from 'react';
import { motion } from 'framer-motion';

interface ClipPathImageRevealProps {
  src: string;
  alt: string;
  className?: string;
}

export const ClipPathImageReveal: React.FC<ClipPathImageRevealProps> = ({
  src,
  alt,
  className = '',
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
        whileInView={{ clipPath: 'circle(75% at 50% 50%)' }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full object-cover filter contrast-[1.05]"
      />
    </div>
  );
};
