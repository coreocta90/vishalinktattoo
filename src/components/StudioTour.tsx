import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, MapPin } from 'lucide-react';

export const StudioTour: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <section className="relative z-20 bg-[#050508] py-20 sm:py-32 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.2em] block">
            BEHIND THE SCENES
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-white uppercase">
            INSIDE THE STUDIO
          </h2>
          <p className="font-sans text-sm text-white/60 font-light">
            Steel Gate, near Baba Sweets, Dhanbad, Jharkhand
          </p>
        </div>

        {/* Video Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.2)] group cursor-pointer"
        >
          <div className="aspect-[16/9] bg-[#0a0a12] relative overflow-hidden">
            <video
              ref={videoRef}
              src="/master_film.mp4"
              muted
              loop
              playsInline
              className="w-full h-full object-cover filter contrast-[1.05]"
            />
            
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 bg-[#D4AF37] text-[#050508] rounded-full flex items-center justify-center shadow-[0_0_30px_#D4AF37] group-hover:scale-110 transition-transform">
                <Play size={28} className="fill-current ml-1" />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white z-10 pointer-events-none">
              <span className="px-4 py-1.5 bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 rounded-full font-bold uppercase tracking-widest text-[#D4AF37]">
                STUDIO REEL
              </span>
              <span className="hidden sm:inline-block text-white/70">
                Hover to preview studio atmosphere
              </span>
            </div>
          </div>

          <div className="bg-[#0a0a12] p-6 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-display text-xl text-white">VISHAL KUMAR TATTOOS STUDIO</h4>
              <p className="text-xs text-white/50">Steel Gate, near Baba Sweets, Dhanbad, Jharkhand 828127</p>
            </div>

            <a
              href="https://maps.google.com/?q=Steel+Gate+near+Baba+Sweets+Dhanbad"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-lg hover:bg-[#e0bc43] transition-colors flex items-center space-x-2 shrink-0"
            >
              <MapPin size={16} />
              <span>GET DIRECTIONS</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
