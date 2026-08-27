import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from './SoundManager';

export const AudioToggle: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsMuted(soundManager.getIsMuted());
  }, []);

  const handleToggle = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <button
      onClick={handleToggle}
      className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-[#D4AF37] hover:border-[#D4AF37] transition-all pointer-events-auto group"
      aria-label="Toggle Sound Effects"
      title={isMuted ? "Enable Sound Design" : "Disable Sound Design"}
    >
      {isMuted ? (
        <>
          <VolumeX size={14} className="text-white/50 group-hover:text-[#D4AF37]" />
          <span className="text-[10px] text-white/50 uppercase tracking-widest group-hover:text-white">
            SOUND OFF
          </span>
        </>
      ) : (
        <>
          <Volume2 size={14} className="text-[#D4AF37] animate-pulse" />
          <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">
            SOUND ON
          </span>
        </>
      )}
    </button>
  );
};
