import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#050508] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Left: Artist Portrait Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
              <img
                src="/stills/bonus_01.webp"
                alt="Vishal Kumar Tattoo Artist"
                className="w-full h-auto object-cover filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#050508]/80 backdrop-blur-md rounded-xl border border-[#D4AF37]/20">
                <div className="font-display text-xl text-[#D4AF37]">VISHAL KUMAR</div>
                <div className="text-xs text-white/60">Lead Tattoo Artist & Creative Director</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase inline-block">
              ARTIST PROFILE & PHILOSOPHY
            </span>

            <h1 className="font-display text-5xl sm:text-7xl tracking-tight text-white uppercase leading-none">
              INK THAT TELLS <br />
              <span className="text-[#D4AF37]">YOUR STORY</span>
            </h1>

            <p className="text-white/80 text-lg leading-relaxed font-light">
              "Har tattoo ek kahani hai. Main woh kahani likhta hoon."
            </p>

            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              Vishal Kumar is widely recognized as one of the premier tattoo artists in Jharkhand. Based out of Steel Gate, Dhanbad, Vishal brings years of meticulous discipline, dark luxury aesthetics, and hospital-grade safety standards to every client session.
            </p>

            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              Whether it’s a photorealistic black & grey portrait, an intricate Polynesian tribal band, or a complete cover-up transformation, every artwork is individually custom-designed to respect the anatomy and personal narrative of the wearer.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="bg-[#0a0a12] p-4 rounded-xl border border-[#D4AF37]/20 text-center">
                <div className="font-display text-2xl sm:text-3xl text-[#D4AF37]">7,650+</div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider">Followers</div>
              </div>

              <div className="bg-[#0a0a12] p-4 rounded-xl border border-[#D4AF37]/20 text-center">
                <div className="font-display text-2xl sm:text-3xl text-white">300+</div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider">Happy Clients</div>
              </div>

              <div className="bg-[#0a0a12] p-4 rounded-xl border border-[#D4AF37]/20 text-center">
                <div className="font-display text-2xl sm:text-3xl text-[#D4AF37]">₹300</div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider">Starting / Inch</div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-[#e0bc43] transition-transform active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              >
                <span>Book Consultation with Vishal</span>
                <ArrowRight size={16} />
              </Link>
            </div>

          </motion.div>

        </div>

        {/* Pillars / Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0a0a12] border border-[#D4AF37]/15 rounded-2xl p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl flex items-center justify-center mx-auto text-[#D4AF37]">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-display text-xl text-white">STERILE & HOSPITAL-GRADE</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              100% single-use imported cartridges and medical sanitation standards strictly followed for every appointment.
            </p>
          </div>

          <div className="bg-[#0a0a12] border border-[#D4AF37]/15 rounded-2xl p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl flex items-center justify-center mx-auto text-[#D4AF37]">
              <Sparkles size={24} />
            </div>
            <h3 className="font-display text-xl text-white">1-ON-1 DIGITAL STENCILING</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Collaborative 1-on-1 digital stencil design before inking ensuring perfect placement and custom satisfaction.
            </p>
          </div>

          <div className="bg-[#0a0a12] border border-[#D4AF37]/15 rounded-2xl p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl flex items-center justify-center mx-auto text-[#D4AF37]">
              <Award size={24} />
            </div>
            <h3 className="font-display text-xl text-white">PREMIER INK DENSITY</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Utilizing world-class black & grey inks for intense contrast, crisp line work, and lifelong color retention.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
