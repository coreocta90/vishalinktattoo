import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PriceCalculator: React.FC = () => {
  const [styleRate, setStyleRate] = useState<number>(350);
  const [sizeInches, setSizeInches] = useState<number>(6);
  const [placementMultiplier, setPlacementMultiplier] = useState<number>(1.0);
  const [detailMultiplier, setDetailMultiplier] = useState<number>(1.0);

  // Formula: Base = size * styleRate * placement * detail
  const baseCost = Math.round(sizeInches * styleRate * placementMultiplier * detailMultiplier);
  const minCost = Math.round(baseCost * 0.9);
  const maxCost = Math.round(baseCost * 1.15);

  return (
    <div className="bg-[#0a0a12] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-10 shadow-[0_0_50px_rgba(212,175,55,0.15)] my-16">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl text-[#D4AF37]">
          <Calculator size={24} />
        </div>
        <div>
          <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase block">
            INSTANT ESTIMATOR
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-white">
            TATTOO PRICE CALCULATOR
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Controls */}
        <div className="space-y-6">
          
          {/* Style Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">1. Select Tattoo Style</label>
            <select
              value={styleRate}
              onChange={(e) => setStyleRate(Number(e.target.value))}
              className="w-full bg-[#10101a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            >
              <option value={350}>Black & Grey Realism (₹350 / inch)</option>
              <option value={300}>Tribal Patterns (₹300 / inch)</option>
              <option value={300}>Custom Artwork (₹300 / inch)</option>
              <option value={300}>Cover-Up & Rework (₹300 / inch)</option>
            </select>
          </div>

          {/* Size Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-white/70 uppercase tracking-wider">
              <span>2. Tattoo Size (Inches)</span>
              <span className="text-[#D4AF37] font-bold text-sm">{sizeInches} Inches</span>
            </div>
            <input
              type="range"
              min={2}
              max={20}
              step={1}
              value={sizeInches}
              onChange={(e) => setSizeInches(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
            <div className="flex justify-between text-[10px] text-white/40">
              <span>2" Small</span>
              <span>10" Half Sleeve</span>
              <span>20" Full Sleeve</span>
            </div>
          </div>

          {/* Placement Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">3. Body Placement</label>
            <select
              value={placementMultiplier}
              onChange={(e) => setPlacementMultiplier(Number(e.target.value))}
              className="w-full bg-[#10101a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            >
              <option value={1.0}>Forearm / Bicep / Calf (Standard - 1.0x)</option>
              <option value={1.1}>Chest / Back / Thigh (Intricate - 1.1x)</option>
              <option value={1.2}>Hand / Neck / Ribs / Fingers (High Precision - 1.2x)</option>
            </select>
          </div>

          {/* Detail Level */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">4. Artwork Detail Level</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDetailMultiplier(0.9)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-colors ${
                  detailMultiplier === 0.9
                    ? 'bg-[#D4AF37] text-[#050508] border-[#D4AF37]'
                    : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                }`}
              >
                Minimal
              </button>
              <button
                type="button"
                onClick={() => setDetailMultiplier(1.0)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-colors ${
                  detailMultiplier === 1.0
                    ? 'bg-[#D4AF37] text-[#050508] border-[#D4AF37]'
                    : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                }`}
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => setDetailMultiplier(1.3)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-colors ${
                  detailMultiplier === 1.3
                    ? 'bg-[#D4AF37] text-[#050508] border-[#D4AF37]'
                    : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                }`}
              >
                Detailed
              </button>
            </div>
          </div>

        </div>

        {/* Live Result Box */}
        <div className="bg-[#10101a] border border-[#D4AF37]/30 rounded-xl p-8 text-center flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs text-white/50 uppercase tracking-widest font-semibold block mb-2">
              ESTIMATED PRICE RANGE
            </span>
            <div className="font-display text-4xl sm:text-6xl text-[#D4AF37] tracking-tight">
              ₹{minCost.toLocaleString('en-IN')} – ₹{maxCost.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-white/40 mt-3 italic">
              * Includes pre-sterilized needle setup and digital stencil design.
            </p>
          </div>

          <div className="border-t border-white/10 pt-6 space-y-4">
            <p className="text-xs text-white/60">
              Final quote provided after 1-on-1 free consultation at the studio in Dhanbad.
            </p>

            <Link
              to="/contact"
              className="w-full py-3.5 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-lg hover:bg-[#e0bc43] transition-all inline-flex items-center justify-center space-x-2"
            >
              <span>LOCK THIS ESTIMATE</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
