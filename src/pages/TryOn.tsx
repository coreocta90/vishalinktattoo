import React from 'react';
import { TattooTryOn } from '../components/TattooTryOn';
import { ScriptPreviewer } from '../components/ScriptPreviewer';

export const TryOn: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#050508] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3 inline-block">
            INTERACTIVE DIGITAL SUITE
          </span>
          <h1 className="font-display text-5xl sm:text-8xl tracking-tight text-white mb-6 uppercase">
            TATTOO TRY-ON & SCRIPT STUDIO
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Preview custom tattoos on your own body photo and test 6 live script fonts before booking your session.
          </p>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full shadow-[0_0_12px_#D4AF37]" />
        </div>

        {/* 1. Tattoo AR Try-On Studio */}
        <TattooTryOn />

        {/* 2. Live Name & Script Previewer */}
        <ScriptPreviewer />

      </div>
    </div>
  );
};
