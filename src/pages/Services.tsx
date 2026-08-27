import React from 'react';
import { ServiceRowList } from '../components/ServiceRowList';
import { PriceCalculator } from '../components/PriceCalculator';
import { AftercareTimeline } from '../components/AftercareTimeline';
import { PainMap } from '../components/PainMap';
import { LineMaskReveal } from '../components/LineMaskReveal';
import { MagneticButton } from '../components/MagneticButton';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#050508] min-h-screen text-[#F5F5F0]">
      
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] gold-radial-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#D4AF37] font-sans text-xs font-semibold tracking-[0.25em] uppercase mb-4 inline-block">
            TRANSPARENT PRICING & DISCIPLINES
          </span>
          
          <LineMaskReveal
            lines={['SERVICES &', 'PRICING']}
            as="h1"
            className="font-display text-5xl sm:text-8xl tracking-tight text-[#F5F5F0] mb-6 uppercase"
            highlightIndex={1}
            highlightStyle="gold"
          />

          <p className="font-sans text-white/60 text-base sm:text-lg leading-relaxed font-light max-w-xl mx-auto">
            Crafted with hospital-grade sterilization protocols and premium imported pigments. Starting at ₹300 per inch in Dhanbad.
          </p>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full shadow-[0_0_12px_#D4AF37]" />
        </div>

        {/* Section 01: Linear.app Style Full-Width Service Rows */}
        <div className="mb-24">
          <div className="mb-8 flex items-center justify-between">
            <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.25em]">
              01 / DISCIPLINES & RATES
            </span>
            <span className="text-xs text-white/40 font-mono hidden sm:inline-block">
              CLICK ANY ROW TO BOOK CONSULTATION
            </span>
          </div>

          <ServiceRowList />
        </div>

        {/* Section 02: Price Calculator */}
        <div className="mb-24">
          <div className="mb-4">
            <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.25em] block">
              02 / ESTIMATOR TOOL
            </span>
          </div>
          <PriceCalculator />
        </div>

        {/* Section 03: Pain & Placement Map */}
        <div className="mb-24">
          <div className="mb-4">
            <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.25em] block">
              03 / ANATOMICAL SENSITIVITY
            </span>
          </div>
          <PainMap />
        </div>

        {/* Section 04: Aftercare Timeline */}
        <div className="mb-24">
          <div className="mb-4">
            <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.25em] block">
              04 / RECOVERY GUIDE
            </span>
          </div>
          <AftercareTimeline />
        </div>

        {/* Hospital Grade Banner */}
        <div className="bg-gradient-to-r from-[#0a0a12] via-[#10101a] to-[#0a0a12] border border-[#D4AF37]/30 rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="font-display text-3xl sm:text-5xl text-[#F5F5F0] mb-4 uppercase">
            100% HOSPITAL-GRADE HYGIENE GUARANTEE
          </h3>
          <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed mb-8 font-light">
            All needles are pre-sterilized, single-use disposable cartridges opened in front of you. We adhere strictly to medical hygiene protocols.
          </p>

          <MagneticButton>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-[#e0bc43] transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              <span>SCHEDULE PRIVATE CONSULTATION</span>
              <ArrowRight size={16} />
            </Link>
          </MagneticButton>
        </div>

      </div>
    </div>
  );
};
