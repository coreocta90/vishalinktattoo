import React, { useState } from 'react';
import { Calculator, Sparkles, Check, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/tattoos';

interface PricingCalculatorProps {
  onBookService?: (serviceId: string) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onBookService }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('s2');
  const [width, setWidth] = useState<number>(4);
  const [height, setHeight] = useState<number>(5);
  const [complexity, setComplexity] = useState<'Standard' | 'Detailed' | 'Masterpiece'>('Detailed');

  const currentService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const totalAreaInches = width * height;
  const complexityMultiplier = complexity === 'Standard' ? 1.0 : complexity === 'Detailed' ? 1.15 : 1.35;
  const rawPrice = totalAreaInches * currentService.ratePerInch * complexityMultiplier;
  const finalPrice = Math.round(Math.max(currentService.minPrice, rawPrice));
  const estimatedHours = (totalAreaInches / 5 * complexityMultiplier).toFixed(1);

  return (
    <div className="bg-[#0a0a12] border border-[#D4AF37]/20 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
        <Calculator className="w-4 h-4" />
        <span>Transparent Cost Estimator</span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        Estimate Your Tattoo Investment
      </h3>
      <p className="text-white/60 text-sm mb-6 max-w-xl">
        Adjust dimensions and tattoo style to get an instant cost and duration estimate for your session at Bishal Kumar Tattoos in Dhanbad.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Style Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
              1. Choose Tattoo Style
            </label>
            <div className="grid grid-cols-2 gap-3">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                    selectedServiceId === service.id
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                      : 'bg-white/[0.02] border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  <span className="font-semibold text-white">{service.title}</span>
                  <span className="text-[#D4AF37] mt-1">{service.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Width Slider */}
          <div className="bg-white/[0.02] p-4 rounded-xl border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-white/80">Width (Inches)</span>
              <span className="text-[#D4AF37] font-bold">{width} Inches</span>
            </div>
            <input
              type="range"
              min={2}
              max={15}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full accent-[#D4AF37] bg-white/10 rounded-lg cursor-pointer h-2"
            />
          </div>

          {/* Height Slider */}
          <div className="bg-white/[0.02] p-4 rounded-xl border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-white/80">Height (Inches)</span>
              <span className="text-[#D4AF37] font-bold">{height} Inches</span>
            </div>
            <input
              type="range"
              min={2}
              max={20}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-[#D4AF37] bg-white/10 rounded-lg cursor-pointer h-2"
            />
          </div>

          {/* Detail Complexity */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
              2. Shading & Detail Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Standard', 'Detailed', 'Masterpiece'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setComplexity(lvl)}
                  className={`py-2 px-3 rounded-lg border text-xs font-medium transition-colors text-center ${
                    complexity === lvl
                      ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37]'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card Column */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#10101a] to-[#0a0a12] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col justify-between h-full space-y-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-1">
              Estimation Summary
            </div>
            <h4 className="text-xl font-bold text-white">{currentService.title}</h4>
            <p className="text-xs text-white/50 mt-1">{currentService.meta}</p>

            <div className="my-6 pt-6 border-t border-white/10 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60">Coverage Area:</span>
                <span className="font-semibold text-white">{totalAreaInches} sq. inches</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60">Estimated Session Time:</span>
                <span className="font-semibold text-white">~{estimatedHours} Hours</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60">Rate basis:</span>
                <span className="text-[#D4AF37] font-medium">{currentService.price}</span>
              </div>

              <div className="pt-4 border-t border-[#D4AF37]/20 flex justify-between items-baseline">
                <span className="text-white/80 font-medium">Estimated Investment:</span>
                <span className="text-3xl font-extrabold text-[#D4AF37] tracking-tight">
                  ₹{finalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-white/70">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> Free stenciling & 1-on-1 design review
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> 100% Sterile, single-use needle setup
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> Free 30-day touch-up guarantee
              </li>
            </ul>
          </div>

          <button
            onClick={() => onBookService?.(currentService.id)}
            className="w-full bg-[#D4AF37] hover:bg-[#e0bc43] text-black font-bold text-sm py-3.5 rounded-xl transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
          >
            <span>Book This Estimated Tattoo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
