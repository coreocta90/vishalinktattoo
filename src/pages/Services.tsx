import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Zap, RotateCcw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PriceCalculator } from '../components/PriceCalculator';
import { AftercareTimeline } from '../components/AftercareTimeline';
import { PainMap } from '../components/PainMap';

interface ServiceItem {
  id: string;
  title: string;
  price: string;
  tag: string;
  icon: React.ElementType;
  description: string;
  features: string[];
}

const servicesData: ServiceItem[] = [
  {
    id: 'realism',
    title: 'BLACK & GREY REALISM',
    price: '₹350 / inch',
    tag: 'MOST POPULAR',
    icon: Sparkles,
    description: 'Photorealistic portraits, animal motifs, and mythic figures constructed with soft gradient shading, photographic contrast, and hyper-detail.',
    features: ['High-contrast gradient depth', 'Smooth micro-shading', 'Photographic realism', 'Long-lasting ink density']
  },
  {
    id: 'tribal',
    title: 'TRIBAL & TRADITIONAL',
    price: '₹300 / inch',
    tag: 'CLASSIC CRAFT',
    icon: Zap,
    description: 'Polynesian, Maori, and Vedic geometric bands executed with rich jet-black saturation and razor-sharp line weight.',
    features: ['Jet-black ink saturation', 'Symmetrical geometric alignment', 'Ancestral symbolism', 'Crisp line definition']
  },
  {
    id: 'custom',
    title: 'CUSTOM DESIGN & STENCILING',
    price: '₹300 / inch',
    tag: 'BESPOKE ART',
    icon: ShieldCheck,
    description: '1-on-1 digital stencil design process transforming your personal memories, symbols, and creative concepts into an exclusive tattoo.',
    features: ['1-on-1 concept consultation', 'Custom digital stencil mockups', 'Anatomical fitting advice', 'Unique original design']
  },
  {
    id: 'coverup',
    title: 'COVER-UP & REWORK',
    price: 'From ₹300 / inch',
    tag: 'TRANSFORMATION',
    icon: RotateCcw,
    description: 'Expert transformation of old, faded, or unwanted tattoos into fresh new masterpieces with optimal pigment layering.',
    features: ['Old ink opacity assessment', 'Strategic dark flow placement', 'Zero trace guarantee', 'Restorative rework option']
  }
];

export const Services: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#050508] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3 inline-block">
            TRANSPARENT PRICING & DISCIPLINES
          </span>
          <h1 className="font-display text-5xl sm:text-8xl tracking-tight text-white mb-6 uppercase">
            SERVICES & PRICING
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Crafted with hospital-grade sterilization protocols and premium imported pigments. Starting at ₹300 per inch in Dhanbad.
          </p>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full shadow-[0_0_12px_#D4AF37]" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {servicesData.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0a0a12] border border-[#D4AF37]/20 rounded-2xl p-8 flex flex-col justify-between hover:border-[#D4AF37]/60 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase rounded-md">
                      {service.tag}
                    </span>
                    <Icon className="text-[#D4AF37]" size={24} />
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {service.title}
                  </h3>

                  <div className="font-display text-3xl text-[#D4AF37] mb-4">
                    {service.price}
                  </div>

                  <p className="text-sm text-white/60 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-8 border-t border-white/10 pt-6">
                    {service.features.map((feat) => (
                      <li key={feat} className="text-xs text-white/80 flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className="w-full py-3.5 bg-white/5 hover:bg-[#D4AF37] text-white hover:text-[#050508] font-bold text-xs tracking-widest uppercase rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 border border-white/10 hover:border-[#D4AF37]"
                >
                  <span>Book This Craft</span>
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Price Calculator Component */}
        <PriceCalculator />

        {/* Pain & Placement Map Component */}
        <PainMap />

        {/* Aftercare Timeline */}
        <AftercareTimeline />

        {/* Hospital Grade Banner */}
        <div className="bg-gradient-to-r from-[#0a0a12] via-[#10101a] to-[#0a0a12] border border-[#D4AF37]/30 rounded-2xl p-8 sm:p-12 text-center mt-16">
          <h3 className="font-display text-3xl sm:text-4xl text-white mb-4">
            100% HOSPITAL-GRADE HYGIENE GUARANTEE
          </h3>
          <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed mb-6">
            All needles are pre-sterilized, single-use disposable cartridges opened in front of you. We adhere strictly to medical hygiene protocols.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-lg hover:bg-[#e0bc43] transition-colors"
          >
            <span>Schedule Private Consultation</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
};
