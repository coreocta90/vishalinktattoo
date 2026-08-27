import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { LenisProvider } from './components/LenisProvider';
import { GrainOverlay } from './components/GrainOverlay';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { ScrollToTop } from './components/ScrollToTop';
import { SweepTransition } from './components/SweepTransition';
import { CursorParticles } from './components/CursorParticles';
import { KonamiCode } from './components/KonamiCode';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { Services } from './pages/Services';
import { TryOn } from './pages/TryOn';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <SweepTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/try-on" element={<TryOn />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SweepTransition>
    </AnimatePresence>
  );
};

const Layout: React.FC = () => {
  return (
    <LenisProvider>
      <div className="relative min-h-screen bg-[#050508] text-[#F5F5F0] flex flex-col justify-between overflow-x-hidden">
        {/* 1. Global Custom Gold Cursor */}
        <CustomCursor />

        {/* 2. Easter Egg Konami Code Listener */}
        <KonamiCode />

        {/* 13. Desktop Gold Cursor Particle Trail */}
        <CursorParticles />

        {/* 3. Session Preloader */}
        <Preloader />

        {/* 4. Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* 5. Floating WhatsApp Button */}
        <WhatsAppFloat />

        {/* 6. Scroll to Top Helper */}
        <ScrollToTop />

        {/* 7. SVG Grain Overlay Texture */}
        <GrainOverlay />

        {/* 8. Global Navbar */}
        <Navbar />

        {/* 9. Animated Page View with Gold Sweep Transition */}
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>

        {/* 10. Global Footer */}
        <Footer />
      </div>
    </LenisProvider>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
