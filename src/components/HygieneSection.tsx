import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Droplets, HeartHandshake } from 'lucide-react';

export const HygieneSection: React.FC = () => {
  const hygieneItems = [
    {
      icon: ShieldCheck,
      title: 'SINGLE-USE NEEDLES',
      desc: 'All rotary needle cartridges are pre-sterilized by EO gas and opened in front of you.'
    },
    {
      icon: Sparkles,
      title: 'MEDICAL-GRADE STERILIZATION',
      desc: 'Hospital-grade autoclaves and surface disinfectants applied before and after every appointment.'
    },
    {
      icon: Droplets,
      title: 'PREMIUM VEGAN INKS',
      desc: '100% non-toxic, cruelty-free imported pigments with deep black retention.'
    },
    {
      icon: HeartHandshake,
      title: 'FREE AFTERCARE SUPPORT',
      desc: 'Complimentary aftercare balm and 30-day touch-up guarantee for optimal healing.'
    }
  ];

  return (
    <section className="relative z-20 bg-[#0a0a12] py-20 sm:py-32 border-y border-[#D4AF37]/15">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-16 space-y-3"
        >
          <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.2em] block">
            UNCOMPROMISING SAFETY
          </span>
          <h2 className="font-display text-4xl sm:text-7xl text-white tracking-tight uppercase">
            STERILE. SAFE. SERIOUS.
          </h2>
          <p className="font-sans text-sm text-white/60 font-light">
            Your health and safety are our highest priority. We follow strict clinical infection control protocols.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hygieneItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#050508] border border-[#D4AF37]/20 rounded-2xl p-6 text-center space-y-4 hover:border-[#D4AF37]/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl flex items-center justify-center mx-auto text-[#D4AF37]">
                  <Icon size={24} />
                </div>
                <h3 className="font-display text-lg text-white tracking-wide">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-white/60 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
