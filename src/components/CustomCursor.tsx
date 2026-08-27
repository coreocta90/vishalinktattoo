import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer fine devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentRingX = -100;
    let currentRingY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setDotPos({ x: mouseX, y: mouseY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('a') ||
          target.closest('button') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);

    const animateRing = () => {
      currentRingX += (mouseX - currentRingX) * 0.15;
      currentRingY += (mouseY - currentRingY) * 0.15;
      setRingPos({ x: currentRingX, y: currentRingY });
      rafId = requestAnimationFrame(animateRing);
    };

    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block overflow-hidden">
      {/* Small Dot */}
      <div
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-[#D4AF37] rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out shadow-[0_0_8px_#D4AF37] ${
          isHovered ? 'scale-50' : 'scale-100'
        }`}
        style={{ transform: `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)` }}
      />

      {/* Trailing Ring */}
      <div
        className={`fixed top-0 left-0 w-9 h-9 border border-[#D4AF37] rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out opacity-40 ${
          isHovered ? 'scale-[1.6] bg-[#D4AF37]/10 opacity-70 border-[#D4AF37]' : 'scale-100'
        }`}
        style={{ transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)` }}
      />
    </div>
  );
};
