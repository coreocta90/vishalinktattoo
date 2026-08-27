import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { GrainOverlay } from './components/GrainOverlay';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { ScrollToTop } from './components/ScrollToTop';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { Services } from './pages/Services';
import { TryOn } from './pages/TryOn';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/try-on" element={<TryOn />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const Layout: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#050508] text-white flex flex-col justify-between overflow-x-hidden">
      {/* 1. Global Custom Gold Cursor */}
      <CustomCursor />

      {/* 2. Session Preloader */}
      <Preloader />

      {/* 3. Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 4. Floating WhatsApp Button */}
      <WhatsAppFloat />

      {/* 5. Scroll to Top Helper */}
      <ScrollToTop />

      {/* 6. SVG Grain Overlay Texture */}
      <GrainOverlay />

      {/* 7. Global Navbar */}
      <Navbar />

      {/* 8. Animated Page View */}
      <main className="flex-grow">
        <AnimatedRoutes />
      </main>

      {/* 9. Global Footer */}
      <Footer />
    </div>
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
