import React from 'react';
import { motion } from 'framer-motion';

export const AftercareTimeline: React.FC = () => {
  const steps = [
    {
      phase: 'DAY 1–3',
      title: 'PROTECT & WASH GENTLY',
      desc: 'Keep original protective wrap on for 3–5 hours. Wash gently with antibacterial soap and warm water. Pat dry with clean paper towel.'
    },
    {
      phase: 'WEEK 1–2',
      title: 'MOISTURIZE & RECOVER',
      desc: 'Apply thin layer of tattoo aftercare balm 3x daily. Do not pick or scratch scabs. Avoid direct sunlight, swimming pools, and hot tubs.'
    },
    {
      phase: 'MONTH 1',
      title: 'FULLY HEALED & TOUCH-UP',
      desc: 'Skin layer is fully regenerated. Color contrast settles into permanent tone. Contact studio for complimentary 30-day touch-up if required.'
    }
  ];

  return (
    <div className="my-16">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[#D4AF37] font-sans text-xs font-bold tracking-widest uppercase block mb-2">
          OPTIMAL RECOVERY
        </span>
        <h3 className="font-display text-3xl sm:text-4xl text-white">
          TATTOO AFTERCARE TIMELINE
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => (
          <motion.div
            key={step.phase}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#0a0a12] border border-[#D4AF37]/20 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-[#D4AF37] text-[#050508] font-bold text-xs rounded-md">
                {step.phase}
              </span>
              <span className="font-display text-2xl text-white/20">0{idx + 1}</span>
            </div>

            <h4 className="font-display text-lg text-white mb-2">{step.title}</h4>
            <p className="font-sans text-xs text-white/60 leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
