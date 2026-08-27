import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, Sparkles, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BodyZone {
  id: string;
  name: string;
  painLevel: number; // 1 to 10
  painColor: 'green' | 'gold' | 'red';
  healingTime: string;
  styles: string;
  priceRange: string;
  description: string;
}

const zonesData: BodyZone[] = [
  { id: 'forearm', name: 'Outer Forearm', painLevel: 3, painColor: 'green', healingTime: '1 – 2 Weeks', styles: 'Fine Line, Realism, Script', priceRange: '₹1,500 – ₹4,500', description: 'Low pain sensitivity zone. Ideal for first tattoos and detailed fine-line realism.' },
  { id: 'upperarm', name: 'Bicep / Shoulder', painLevel: 4, painColor: 'green', healingTime: '2 Weeks', styles: 'Realism, Tribal Band', priceRange: '₹2,500 – ₹7,000', description: 'Muscular padding absorbs vibration smoothly. Great for large realism portraits.' },
  { id: 'chest', name: 'Upper Chest', painLevel: 7, painColor: 'gold', healingTime: '2 – 3 Weeks', styles: 'Script, Tribal, Eagle Motifs', priceRange: '₹3,000 – ₹9,000', description: 'Medium to high sensitivity near collarbone. Striking visual impact.' },
  { id: 'ribs', name: 'Ribcage & Torso', painLevel: 9, painColor: 'red', healingTime: '3 Weeks', styles: 'Custom Script, Fine Line', priceRange: '₹4,000 – ₹12,000', description: 'High sensitivity zone near nerve endings. Requires steady breathing during inking.' },
  { id: 'back', name: 'Full Back / Upper Back', painLevel: 5, painColor: 'gold', healingTime: '2 – 3 Weeks', styles: 'Large Realism, Japanese Traditional', priceRange: '₹6,000 – ₹25,000', description: 'Expansive flat canvas. Moderate pain on upper back, higher sensitivity on spine.' },
  { id: 'hand', name: 'Hand & Fingers', painLevel: 8, painColor: 'red', healingTime: '1 – 2 Weeks', styles: 'Micro Realism, Script', priceRange: '₹1,200 – ₹3,500', description: 'Thin skin over bone. High visibility area requiring expert pigment depth control.' },
  { id: 'neck', name: 'Side Neck', painLevel: 8, painColor: 'red', healingTime: '2 Weeks', styles: 'Chicano Lettering, Micro Realism', priceRange: '₹2,000 – ₹6,000', description: 'High sensitivity nerve cluster. High prestige statement location.' },
  { id: 'thigh', name: 'Outer Thigh', painLevel: 4, painColor: 'green', healingTime: '2 Weeks', styles: 'Large Realism, Mandalas', priceRange: '₹3,500 – ₹10,000', description: 'Low pain zone with thick skin. Excellent for detailed multi-session pieces.' },
  { id: 'ankle', name: 'Ankle & Lower Leg', painLevel: 7, painColor: 'gold', healingTime: '2 Weeks', styles: 'Anklet Bands, Micro Script', priceRange: '₹1,500 – ₹4,000', description: 'Moderate to high pain near bone joints. Heals crisp with proper elevation.' }
];

export const PainMap: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<BodyZone>(zonesData[0]);

  return (
    <div className="bg-[#0a0a12] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-10 my-16 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
      
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[#D4AF37] font-sans text-xs font-bold tracking-widest uppercase block mb-2">
          BODY SENSITIVITY GUIDE
        </span>
        <h3 className="font-display text-3xl sm:text-4xl text-white">
          INTERACTIVE PAIN & PLACEMENT MAP
        </h3>
        <p className="text-xs text-white/60 mt-2">
          Click any body zone below to explore pain rating, healing duration, and recommended styles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* SVG Silhouette & Zone Buttons */}
        <div className="lg:col-span-6 flex flex-wrap gap-2 justify-center">
          {zonesData.map((zone) => {
            const isSelected = selectedZone.id === zone.id;
            let badgeBg = 'border-emerald-500/30 text-emerald-400';
            if (zone.painColor === 'gold') badgeBg = 'border-[#D4AF37]/40 text-[#D4AF37]';
            if (zone.painColor === 'red') badgeBg = 'border-rose-500/40 text-rose-400';

            return (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#050508] border-[#D4AF37] scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                    : `bg-[#050508] ${badgeBg} hover:bg-white/5`
                }`}
              >
                <MapPin size={14} />
                <span>{zone.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Zone Detail Panel */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedZone.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#050508] border border-[#D4AF37]/30 rounded-xl p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest block">
                    SELECTED ZONE
                  </span>
                  <h4 className="font-display text-2xl sm:text-3xl text-white">
                    {selectedZone.name}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-white/50 uppercase tracking-widest block">
                    ESTIMATED RANGE
                  </span>
                  <span className="font-display text-xl text-[#D4AF37]">
                    {selectedZone.priceRange}
                  </span>
                </div>
              </div>

              {/* Pain Needle Rating */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white/70">Pain Sensitivity Rating:</span>
                  <span className="text-[#D4AF37] font-bold">{selectedZone.painLevel} / 10</span>
                </div>
                <div className="flex space-x-1">
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-3 flex-1 rounded-sm transition-colors ${
                        idx < selectedZone.painLevel
                          ? selectedZone.painColor === 'red'
                            ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
                            : selectedZone.painColor === 'gold'
                            ? 'bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]'
                            : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'
                          : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-[#10101a] p-4 rounded-lg border border-white/5 space-y-1">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider flex items-center space-x-1">
                    <Clock size={12} className="text-[#D4AF37]" />
                    <span>HEALING TIME</span>
                  </span>
                  <div className="font-sans text-xs font-bold text-white">{selectedZone.healingTime}</div>
                </div>

                <div className="bg-[#10101a] p-4 rounded-lg border border-white/5 space-y-1">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider flex items-center space-x-1">
                    <Sparkles size={12} className="text-[#D4AF37]" />
                    <span>RECOMMENDED</span>
                  </span>
                  <div className="font-sans text-xs font-bold text-[#D4AF37] truncate">{selectedZone.styles}</div>
                </div>
              </div>

              <p className="text-xs text-white/60 leading-relaxed font-light">
                {selectedZone.description}
              </p>

              <Link
                to="/contact"
                className="w-full py-3 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-lg hover:bg-[#e0bc43] transition-colors flex items-center justify-center space-x-2"
              >
                <span>BOOK SESSION FOR {selectedZone.name.toUpperCase()}</span>
                <span>→</span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
