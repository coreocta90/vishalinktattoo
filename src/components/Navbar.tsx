import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiveStudioStatus } from './LiveStudioStatus';
import { NavHoverPreview } from './NavHoverPreview';
import { MagneticButton } from './MagneticButton';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'PORTFOLIO', path: '/portfolio' },
    { name: 'SERVICES', path: '/services' },
    { name: 'TRY-ON', path: '/try-on' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Nav Hover Floating Image Preview */}
      <NavHoverPreview activeHoverPath={hoveredPath} />

      {/* 1. DESKTOP FULL HORIZONTAL NAVBAR (min-width: 1024px / lg) */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-[100] h-20 px-8 lg:px-12 hidden lg:flex items-center justify-between transition-all duration-300 pointer-events-none ${
          isScrolled
            ? 'bg-[#050508]/85 backdrop-blur-xl border-b border-[#D4AF37]/15 shadow-2xl'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* LEFT: Logo & Live Studio Open Indicator */}
        <div className="flex items-center space-x-6 pointer-events-auto">
          <Link
            to="/"
            className="font-display text-[1.25rem] tracking-[0.05em] uppercase text-[#F5F5F0] hover:opacity-90 transition-opacity"
          >
            <span className="text-[#D4AF37]">VISHAL</span> KUMAR TATTOOS
          </Link>

          <LiveStudioStatus />
        </div>

        {/* CENTER-RIGHT: Navigation Links + BOOK NOW Button */}
        <div className="flex items-center space-x-8 lg:space-x-10">
          <nav className="flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className={`font-sans text-[0.8rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 pointer-events-auto ${
                    isActive ? 'text-[#D4AF37]' : 'text-white/70 hover:text-[#D4AF37]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <MagneticButton>
            <Link
              to="/contact"
              className="font-sans text-xs font-semibold uppercase tracking-[0.1em] px-6 py-2.5 border border-[#D4AF37] text-[#D4AF37] rounded-md hover:bg-[#D4AF37] hover:text-[#050508] transition-all duration-300 pointer-events-auto shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              BOOK NOW
            </Link>
          </MagneticButton>
        </div>
      </motion.header>

      {/* 2. MOBILE TOP-RIGHT "MENU ☰" PILL BUTTON (max-width: 1023px / lg:hidden) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-6 right-6 z-[100] lg:hidden"
      >
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#050508]/80 backdrop-blur-md border border-[#D4AF37]/30 rounded-full text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#050508] transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] group"
        >
          <span className="font-display tracking-widest text-sm uppercase">MENU</span>
          <Menu size={18} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </motion.div>

      {/* 3. MOBILE FULL-SCREEN OVERLAY MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[105] bg-[#050508] flex flex-col justify-between p-8 sm:p-16 overflow-y-auto lg:hidden"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="font-display text-2xl tracking-wider text-[#F5F5F0] block"
                >
                  <span className="text-[#D4AF37]">VISHAL</span> KUMAR TATTOOS
                </Link>
                <LiveStudioStatus />
              </div>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-3 bg-white/5 border border-white/10 rounded-full text-white/70 hover:text-white hover:border-[#D4AF37] transition-all"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>

            <nav className="my-auto py-8 flex flex-col items-center justify-center space-y-5 sm:space-y-7 text-center">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + idx * 0.04 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-display text-4xl sm:text-6xl tracking-wider transition-all duration-300 block ${
                      location.pathname === link.path
                        ? 'text-[#D4AF37] scale-105'
                        : 'text-white/60 hover:text-white hover:scale-105'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40 gap-4">
              <div>Steel Gate near Baba Sweets, Dhanbad, Jharkhand</div>
              <div className="text-[#D4AF37] font-semibold">+91 8102578635</div>
              <div>© 2026 Vishal Kumar Tattoos</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
