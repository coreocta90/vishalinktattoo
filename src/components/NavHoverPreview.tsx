import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavHoverPreviewProps {
  activeHoverPath: string | null;
}

const previewImages: Record<string, string> = {
  '/portfolio': '/stills/bonus_01.webp',
  '/services': '/frames/frame_0180.webp',
  '/try-on': '/frames/frame_0240.webp',
  '/about': '/stills/bonus_02.webp',
  '/contact': '/frames/frame_0300.webp',
};

export const NavHoverPreview: React.FC<NavHoverPreviewProps> = ({ activeHoverPath }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    setIsDesktop(true);

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX + 20, y: e.clientY + 20 });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (!isDesktop || !activeHoverPath || !previewImages[activeHoverPath]) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 z-[200] pointer-events-none w-28 h-20 rounded-xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.4)]"
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      >
        <img
          src={previewImages[activeHoverPath]}
          alt="Nav Hover Preview"
          className="w-full h-full object-cover filter contrast-[1.05]"
        />
      </motion.div>
    </AnimatePresence>
  );
};
