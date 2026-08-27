import React, { useState } from 'react';
import { Type, ExternalLink } from 'lucide-react';

interface FontOption {
  id: string;
  name: string;
  fontFamily: string;
  fontWeight?: string;
  letterSpacing?: string;
}

const fontOptions: FontOption[] = [
  { id: 'script', name: '1. Classic Script', fontFamily: "'Great Vibes', cursive" },
  { id: 'gothic', name: '2. Gothic Blackletter', fontFamily: "'UnifrakturMaguntia', cursive" },
  { id: 'fineline', name: '3. Fine Line Minimal', fontFamily: "'Inter', sans-serif", fontWeight: '200', letterSpacing: '0.25em' },
  { id: 'hindi', name: '4. Devanagari Hindi', fontFamily: "'Tiro Devanagari Hindi', serif" },
  { id: 'sanskrit', name: '5. Sanskrit Traditional', fontFamily: "'Yatra One', cursive" },
  { id: 'serif', name: '6. Bold Serif', fontFamily: "'Cinzel', serif", fontWeight: '700' },
];

export const ScriptPreviewer: React.FC = () => {
  const [typedText, setTypedText] = useState<string>('Vishal');
  const [selectedFont, setSelectedFont] = useState<FontOption>(fontOptions[0]);

  const handleWhatsApp = () => {
    const msg = `Hi Vishal! I used the Script Previewer on your site and typed "${typedText}" in ${selectedFont.name} font. I want to get this inked.`;
    window.open(`https://wa.me/918102578635?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-[#0a0a12] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-10 my-12 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
      
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl text-[#D4AF37]">
          <Type size={24} />
        </div>
        <div>
          <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase block">
            LIVE LETTERING GENERATOR
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-white">
            NAME & SCRIPT PREVIEWER
          </h3>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Type Your Name / Word / Mantra</label>
          <input
            type="text"
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder="Type name here (e.g. Vishal, Karma, Mahadev)..."
            className="w-full bg-[#10101a] border border-white/10 rounded-xl px-5 py-4 text-lg text-white font-medium focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
        </div>

        {/* Font Select Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {fontOptions.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFont(f)}
              className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                selectedFont.id === f.id
                  ? 'bg-[#D4AF37] text-[#050508] border-[#D4AF37] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* Live Skin Preview Canvas Box */}
        <div className="relative w-full min-h-[180px] bg-[#1a1412] rounded-2xl border-2 border-[#D4AF37]/30 flex items-center justify-center p-8 overflow-hidden shadow-inner">
          
          {/* Subtle Skin Grain Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,200,160,0.08)_0%,rgba(20,15,12,0.9)_100%)] pointer-events-none" />

          {/* Rendered Text */}
          <div
            className="relative z-10 text-center text-[#111111] drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)] select-none break-all"
            style={{
              fontFamily: selectedFont.fontFamily,
              fontWeight: selectedFont.fontWeight || 'normal',
              letterSpacing: selectedFont.letterSpacing || 'normal',
              fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
              lineHeight: 1.2,
            }}
          >
            {typedText || 'Your Name'}
          </div>

          <span className="absolute bottom-3 right-4 text-[10px] text-white/40 tracking-widest uppercase font-mono">
            SKIN CANVAS PREVIEW
          </span>
        </div>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="w-full py-4 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-[#e0bc43] transition-all flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
        >
          <span>GET THIS INKED VIA WHATSAPP</span>
          <ExternalLink size={16} />
        </button>

      </div>
    </div>
  );
};
