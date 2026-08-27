import React from 'react';
import { motion } from 'framer-motion';

interface AuroraBlobProps {
  color?: string; // 'gold' | 'blue'
  size?: number;
  className?: string;
}

export const AuroraBlob: React.FC<AuroraBlobProps> = ({
  color = 'gold',
  size = 600,
  className = '',
}) => {
  const gradientColor =
    color === 'blue'
      ? 'rgba(59, 130, 246, 0.05)'
      : 'rgba(212, 175, 55, 0.08)';

  return (
    <div className={`absolute pointer-events-none z-0 overflow-hidden ${className}`}>
      <motion.div
        animate={{
          x: [-30, 30, -30],
          y: [-20, 20, -20],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at center, ${gradientColor} 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
        className="rounded-full"
      />
    </div>
  );
};
