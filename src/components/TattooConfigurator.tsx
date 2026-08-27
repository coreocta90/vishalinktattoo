import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, ShieldCheck, RotateCcw, ArrowRight, ArrowLeft, Check, Send } from 'lucide-react';

interface ConfigState {
  style: string;
  styleRate: number;
  placement: string;
  placementMultiplier: number;
  size: number;
  name: string;
  phone: string;
  idea: string;
  date: string;
}

export const TattooConfigurator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<ConfigState>({
    style: 'Black & Grey Realism',
    styleRate: 350,
    placement: 'Forearm / Arm',
    placementMultiplier: 1.0,
    size: 6,
    name: '',
    phone: '',
    idea: '',
    date: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const styleOptions = [
    { title: 'Black & Grey Realism', rate: 350, icon: Sparkles, tag: 'MOST POPULAR', desc: 'Photorealistic depth & smooth micro-shading.' },
    { title: 'Tribal & Geometric', rate: 300, icon: Zap, tag: 'BOLD CRAFT', desc: 'Jet-black saturation & sharp line bands.' },
    { title: 'Custom Artwork', rate: 300, icon: ShieldCheck, tag: 'BESPOKE ART', desc: '1-on-1 digital stencil design consultation.' },
    { title: 'Cover-Up & Rework', rate: 300, icon: RotateCcw, tag: 'REFILL / REWORK', desc: 'Transform old faded tattoos into fresh ink.' },
  ];

  const placementOptions = [
    { name: 'Forearm / Arm', multiplier: 1.0 },
    { name: 'Shoulder / Bicep', multiplier: 1.0 },
    { name: 'Upper Chest', multiplier: 1.1 },
    { name: 'Full Back', multiplier: 1.1 },
    { name: 'Hand / Wrist / Neck', multiplier: 1.2 },
    { name: 'Thigh / Leg', multiplier: 1.0 },
  ];

  // Calculated estimate
  const basePrice = Math.round(config.size * config.styleRate * config.placementMultiplier);
  const minPrice = Math.round(basePrice * 0.9);
  const maxPrice = Math.round(basePrice * 1.15);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `Hi Vishal! I configured my tattoo session on your website:%0A%0A*Name:* ${encodeURIComponent(config.name)}%0A*Phone:* ${encodeURIComponent(config.phone)}%0A*Style:* ${encodeURIComponent(config.style)}%0A*Placement:* ${encodeURIComponent(config.placement)}%0A*Estimated Size:* ${config.size} inches%0A*Estimated Range:* ₹${minPrice.toLocaleString('en-IN')} – ₹${maxPrice.toLocaleString('en-IN')}%0A*Idea:* ${encodeURIComponent(config.idea)}%0A*Preferred Date:* ${encodeURIComponent(config.date)}`;

    window.open(`https://wa.me/918102578635?text=${message}`, '_blank');
  };

  return (
    <div className="bg-[#0a0a12] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-10 my-8 shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden">
      
      {/* Top Gold Progress Bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37] transition-all duration-300"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {/* Header Bar */}
      <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
        <div>
          <span className="text-[#D4AF37] font-mono text-xs font-bold uppercase tracking-widest block">
            STEP 0{step} / 04
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-[#F5F5F0]">
            TATTOO CONFIGURATOR WIZARD
          </h3>
        </div>

        {step > 1 && !submitted && (
          <button
            onClick={handleBack}
            className="flex items-center space-x-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>BACK</span>
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="submitted"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center space-y-4"
          >
            <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/40 rounded-full flex items-center justify-center text-[#D4AF37] mx-auto">
              <Check size={32} />
            </div>
            <h4 className="font-display text-3xl text-white uppercase">CONFIRMED ON WHATSAPP!</h4>
            <p className="text-sm text-white/60 max-w-md mx-auto leading-relaxed">
              Your custom configuration has been sent to Vishal Kumar's WhatsApp line (+91 8102578635).
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
              }}
              className="px-6 py-2.5 bg-white/10 border border-white/15 text-xs font-bold text-white rounded-lg hover:bg-white/20"
            >
              Configure Another Session
            </button>
          </motion.div>
        ) : step === 1 ? (
          /* STEP 1: STYLE SELECTION */
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h4 className="font-sans text-sm font-semibold text-white/80 uppercase tracking-wider">
              1. Select Tattoo Style Discipline
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {styleOptions.map((item) => {
                const Icon = item.icon;
                const isSelected = config.style === item.title;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setConfig({ ...config, style: item.title, styleRate: item.rate })}
                    className={`p-6 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 shadow-[0_0_25px_rgba(212,175,55,0.3)] ring-2 ring-[#D4AF37]/30'
                        : 'border-white/10 bg-[#050508] hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase rounded">
                        {item.tag}
                      </span>
                      <Icon size={20} className="text-[#D4AF37]" />
                    </div>
                    <h5 className="font-display text-xl text-white mb-1">{item.title}</h5>
                    <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                    <div className="font-display text-lg text-[#D4AF37] mt-3">₹{item.rate} / inch</div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3.5 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-lg hover:bg-[#e0bc43] transition-all flex items-center space-x-2"
              >
                <span>NEXT: PLACEMENT</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ) : step === 2 ? (
          /* STEP 2: PLACEMENT */
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h4 className="font-sans text-sm font-semibold text-white/80 uppercase tracking-wider">
              2. Select Body Placement Location
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {placementOptions.map((p) => {
                const isSelected = config.placement === p.name;
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setConfig({ ...config, placement: p.name, placementMultiplier: p.multiplier })}
                    className={`p-4 rounded-xl border text-center text-xs font-semibold uppercase tracking-wider transition-all ${
                      isSelected
                        ? 'bg-[#D4AF37] text-[#050508] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] font-bold'
                        : 'bg-[#050508] border-white/10 text-white/70 hover:border-white/30'
                    }`}
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3.5 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-lg hover:bg-[#e0bc43] transition-all flex items-center space-x-2"
              >
                <span>NEXT: SIZE & ESTIMATE</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ) : step === 3 ? (
          /* STEP 3: SIZE & LIVE ESTIMATE */
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h4 className="font-sans text-sm font-semibold text-white/80 uppercase tracking-wider">
              3. Adjust Tattoo Size (Inches)
            </h4>

            <div className="bg-[#050508] border border-white/10 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">Selected Size:</span>
                <span className="font-display text-2xl text-[#D4AF37]">{config.size} Inches</span>
              </div>

              <input
                type="range"
                min={2}
                max={20}
                value={config.size}
                onChange={(e) => setConfig({ ...config, size: Number(e.target.value) })}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />

              <div className="flex justify-between text-[10px] text-white/40">
                <span>2" Small Accent</span>
                <span>10" Half Sleeve</span>
                <span>20" Full Masterpiece</span>
              </div>
            </div>

            {/* Live Calculated Estimate Display */}
            <div className="bg-[#10101a] border border-[#D4AF37]/40 rounded-xl p-6 text-center space-y-2">
              <span className="text-[10px] text-white/50 uppercase tracking-widest block font-mono">
                LIVE ESTIMATED RANGE ({config.style})
              </span>
              <div className="font-display text-4xl sm:text-5xl text-[#D4AF37]">
                ₹{minPrice.toLocaleString('en-IN')} – ₹{maxPrice.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3.5 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-lg hover:bg-[#e0bc43] transition-all flex items-center space-x-2"
              >
                <span>NEXT: ENTER DETAILS</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ) : (
          /* STEP 4: CONTACT & CONFIRM */
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
              <h4 className="font-sans text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
                4. Enter Contact Details & Request Session
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-white/60 uppercase">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={config.name}
                    onChange={(e) => setConfig({ ...config, name: e.target.value })}
                    className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-white/60 uppercase">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 8102578635"
                    value={config.phone}
                    onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                    className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-white/60 uppercase">Tattoo Concept / Idea</label>
                  <input
                    type="text"
                    placeholder="e.g. Lion portrait, Vedic Sanskrit mantra..."
                    value={config.idea}
                    onChange={(e) => setConfig({ ...config, idea: e.target.value })}
                    className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-white/60 uppercase">Preferred Date</label>
                  <input
                    type="date"
                    value={config.date}
                    onChange={(e) => setConfig({ ...config, date: e.target.value })}
                    className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#D4AF37] text-[#050508] font-display text-lg tracking-wider rounded-xl hover:bg-[#e0bc43] transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center space-x-2 mt-6"
              >
                <span>CONFIRM & BOOK VIA WHATSAPP</span>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
