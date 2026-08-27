import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export const StudioMapEmbed: React.FC = () => {
  const mapUrl = "https://www.google.com/maps?q=Steel+Gate,+near+Baba+Sweets,+Dhanbad,+Jharkhand+828127&output=embed";
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Steel+Gate,+near+Baba+Sweets,+Dhanbad";

  return (
    <div className="w-full space-y-6 my-12">
      
      {/* 5. SECTION HEADER */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.25em] block">
          FIND THE STUDIO
        </span>
        <h3 className="font-display text-3xl sm:text-5xl text-[#F5F5F0] uppercase">
          STEEL GATE, DHANBAD
        </h3>
      </div>

      {/* MAP EMBED CONTAINER WITH GOLD BORDER AND FALLBACK LAYER */}
      <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.15)] bg-[#0a0a12] select-none">
        
        {/* 4. GRACEFUL FALLBACK LAYER (Behind Iframe) */}
        <div className="absolute inset-0 z-0 bg-[#0a0a12] p-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full flex items-center justify-center text-[#D4AF37]">
            <MapPin size={24} />
          </div>
          <div>
            <h4 className="font-display text-2xl text-[#F5F5F0]">VISHAL KUMAR TATTOOS STUDIO</h4>
            <p className="text-xs text-white/60 mt-1 max-w-md">
              Steel Gate, near Baba Sweets, Dhanbad, Jharkhand 828127
            </p>
          </div>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-[#e0bc43] transition-colors flex items-center space-x-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            <Navigation size={14} />
            <span>GET DIRECTIONS VIA GOOGLE MAPS</span>
          </a>
        </div>

        {/* 1 & 2 & 3. KEYLESS GOOGLE MAPS EMBED IFRAME (NO DARK FILTERS) */}
        <iframe
          src={mapUrl}
          width="100%"
          height="420"
          className="relative z-10 w-full min-h-[320px] h-[420px] block"
          style={{ display: 'block', border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title="Vishal Kumar Tattoos Studio Location"
        />

      </div>

    </div>
  );
};
