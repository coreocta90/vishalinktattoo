import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { TiltCard } from './TiltCard';

interface Testimonial {
  quote: string;
  name: string;
  city: string;
  rotation: string;
}

const testimonials: Testimonial[] = [
  { quote: "Vishal bhai ne meri tattoo itni perfectly banai ki main shabd nahi dhundh pa raha. Best artist in Jharkhand!", name: "Rahul M.", city: "Dhanbad", rotation: "-rotate-2" },
  { quote: "Amazing attention to detail. My black and grey portrait looks absolutely real.", name: "Priya S.", city: "Ranchi", rotation: "rotate-1" },
  { quote: "The tribal design was exactly what I wanted. Very professional and clean studio.", name: "Amit K.", city: "Bokaro", rotation: "-rotate-1" },
  { quote: "I was nervous about my first tattoo but Vishal made me feel completely comfortable.", name: "Sneha R.", city: "Dhanbad", rotation: "rotate-2" },
];

export const GlassmorphicTestimonials: React.FC = () => {
  return (
    <div className="space-y-12 py-8">
      
      {/* Featured Large Quote Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <TiltCard className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-12 border-l-4 border-l-[#D4AF37] shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative">
          <Quote size={48} className="text-[#D4AF37] mb-4 opacity-80" />
          <p className="font-sans text-xl sm:text-3xl text-[#F5F5F0] italic leading-relaxed font-light mb-6">
            "{testimonials[0].quote}"
          </p>
          <div className="flex items-center space-x-3 text-sm">
            <span className="font-sans font-bold text-white">{testimonials[0].name}</span>
            <span className="text-[#D4AF37]">•</span>
            <span className="text-[#D4AF37] font-semibold">{testimonials[0].city}</span>
          </div>
        </TiltCard>
      </motion.div>

      {/* Grid of Floating Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.slice(1).map((t, idx) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`transform ${t.rotation}`}
          >
            <TiltCard className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-[#D4AF37]/50 transition-colors">
              <div>
                <Quote size={28} className="text-[#D4AF37] mb-4 opacity-80" />
                <p className="font-sans text-sm text-white/80 italic leading-relaxed mb-6 font-light">
                  "{t.quote}"
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs">
                <span className="font-sans font-bold text-white">{t.name}</span>
                <span className="font-sans font-semibold text-[#D4AF37]">{t.city}</span>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

    </div>
  );
};
