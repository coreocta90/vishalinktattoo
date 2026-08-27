import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineMaskReveal } from '../components/LineMaskReveal';
import { MagneticButton } from '../components/MagneticButton';
import { AnimatedCounter } from '../components/AnimatedCounter';

export const About: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#050508] min-h-screen text-[#F5F5F0]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#D4AF37] font-sans text-xs font-semibold tracking-[0.25em] uppercase mb-4 inline-block">
            01 / ARTIST PROFILE & PHILOSOPHY
          </span>
          
          <LineMaskReveal
            lines={['INK THAT TELLS', 'YOUR STORY']}
            as="h1"
            className="font-display text-5xl sm:text-8xl tracking-tight text-[#F5F5F0] mb-6 uppercase"
            highlightIndex={1}
            highlightStyle="gold"
          />

          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full shadow-[0_0_12px_#D4AF37]" />
        </div>

        {/* STICKY TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Left Column: Sticky Artist Portrait */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.2)] group"
            >
              <img
                src="/stills/bonus_01.webp"
                alt="Vishal Kumar Tattoo Artist"
                className="w-full h-auto object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-70" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#050508]/80 backdrop-blur-md rounded-xl border border-[#D4AF37]/20">
                <div className="font-display text-2xl text-[#D4AF37]">VISHAL KUMAR</div>
                <div className="text-xs text-white/60 font-sans tracking-wider">
                  Master Tattoo Artist & Founder • Dhanbad
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Scrolling Story */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-4">
              <span className="text-[#D4AF37] text-xs font-mono tracking-widest uppercase">
                PHILOSOPHY & VISION
              </span>
              <p className="text-white/90 text-xl sm:text-2xl font-light italic leading-relaxed">
                "Har tattoo ek kahani hai. Main woh kahani skin par hamesha ke liye likhta hoon."
              </p>
            </div>

            <div className="space-y-6 text-white/70 font-light text-base leading-relaxed">
              <p>
                Vishal Kumar is widely recognized as Jharkhand's premier tattoo artist. Operating from his high-end private studio in Steel Gate, Dhanbad, Vishal blends fine art discipline with dark luxury aesthetics and hospital-grade hygiene standards.
              </p>

              <p>
                Specializing in photorealistic black & grey portraiture, fine-line script, Polynesian geometric tribal bands, and pristine cover-up transformations — every piece is individually custom-designed in 1-on-1 stencil sessions to respect body anatomy.
              </p>

              <p>
                With over 7,650+ followers and 300+ satisfied clients across Jharkhand, Bihar, and West Bengal, Vishal Kumar Tattoos guarantees lasting ink density and clinical sterilization for every client.
              </p>
            </div>

            {/* Stats Counter Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="bg-[#0a0a12] p-5 rounded-xl border border-[#D4AF37]/20 text-center">
                <div className="font-display text-3xl sm:text-4xl text-[#D4AF37]">
                  <AnimatedCounter end={7650} suffix="+" />
                </div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Followers</div>
              </div>

              <div className="bg-[#0a0a12] p-5 rounded-xl border border-[#D4AF37]/20 text-center">
                <div className="font-display text-3xl sm:text-4xl text-[#F5F5F0]">
                  <AnimatedCounter end={300} suffix="+" />
                </div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Happy Clients</div>
              </div>

              <div className="bg-[#0a0a12] p-5 rounded-xl border border-[#D4AF37]/20 text-center">
                <div className="font-display text-3xl sm:text-4xl text-[#D4AF37]">
                  <AnimatedCounter end={300} prefix="₹" />
                </div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Per Inch Starting</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-[#e0bc43] transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                >
                  <span>BOOK CONSULTATION WITH VISHAL</span>
                  <ArrowRight size={16} />
                </Link>
              </MagneticButton>
            </div>

          </div>

        </div>

        {/* Pillars / Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10">
          <div className="bg-[#0a0a12] border border-[#D4AF37]/15 rounded-2xl p-8 text-center space-y-4 hover:border-[#D4AF37]/40 transition-colors">
            <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl flex items-center justify-center mx-auto text-[#D4AF37]">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-display text-xl text-[#F5F5F0]">STERILE & HOSPITAL-GRADE</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              100% single-use imported cartridges and medical sanitation standards strictly followed for every appointment.
            </p>
          </div>

          <div className="bg-[#0a0a12] border border-[#D4AF37]/15 rounded-2xl p-8 text-center space-y-4 hover:border-[#D4AF37]/40 transition-colors">
            <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl flex items-center justify-center mx-auto text-[#D4AF37]">
              <Sparkles size={24} />
            </div>
            <h3 className="font-display text-xl text-[#F5F5F0]">1-ON-1 DIGITAL STENCILING</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Collaborative 1-on-1 digital stencil design before inking ensuring perfect placement and custom satisfaction.
            </p>
          </div>

          <div className="bg-[#0a0a12] border border-[#D4AF37]/15 rounded-2xl p-8 text-center space-y-4 hover:border-[#D4AF37]/40 transition-colors">
            <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl flex items-center justify-center mx-auto text-[#D4AF37]">
              <Award size={24} />
            </div>
            <h3 className="font-display text-xl text-[#F5F5F0]">PREMIER INK DENSITY</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Utilizing world-class black & grey inks for intense contrast, crisp line work, and lifelong color retention.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
