import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Sparkles, Star, Clock, Maximize2, Shield } from 'lucide-react';
import { PortfolioItem } from '../data/tattoos';

interface LightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onBook: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose, onBook }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-lg"
        />

        {/* Dialog Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-3xl bg-[#0a0a12] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.2)] text-white z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white p-2 rounded-full bg-black/50 hover:bg-white/10 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Image Placeholder view */}
            <div className="relative min-h-[380px] bg-[#050508] border-r border-[#D4AF37]/15 p-6 flex flex-col justify-between items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
              
              <div className="w-full flex justify-between items-center z-10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded border border-[#D4AF37]/20">
                  {item.category}
                </span>
                <span className="text-xs text-white/40 flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" /> {item.dimension}
                </span>
              </div>

              <div className="my-auto py-8 text-center z-10 w-full">
                <div className="w-full aspect-[3/4] max-w-[260px] mx-auto rounded-xl border-2 border-dashed border-[#D4AF37]/40 bg-white/[0.02] flex flex-col items-center justify-center p-6 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                  <Sparkles className="w-10 h-10 text-[#D4AF37] mb-2 animate-pulse" />
                  <span className="text-sm font-bold text-white tracking-wide">{item.label}</span>
                  <span className="text-xs text-white/50 mt-1">PORTFOLIO IMAGE</span>
                  <span className="text-[10px] text-[#D4AF37] mt-3 bg-[#D4AF37]/10 px-2 py-0.5 rounded">
                    Vishal Kumar Studio • Dhanbad
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-white/40 z-10">
                Original Artwork by Vishal Kumar Tattoos
              </div>
            </div>

            {/* Right: Details & Action */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#D4AF37] mb-2 font-medium">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span>{item.rating}.0 Masterwork</span>
                </div>

                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <p className="text-white/60 text-sm mt-3 leading-relaxed">
                  {item.description}
                </p>

                <div className="my-6 space-y-3 pt-6 border-t border-white/10 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/40">Category Style:</span>
                    <span className="text-[#D4AF37] font-semibold">{item.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Canvas Dimensions:</span>
                    <span className="text-white font-medium">{item.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Session Duration:</span>
                    <span className="text-white font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {item.duration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Studio Location:</span>
                    <span className="text-white font-medium">Steel Gate, Dhanbad</span>
                  </div>
                </div>

                <div className="bg-white/[0.02] p-3 rounded-lg border border-white/10 text-[11px] text-white/60 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Custom adaptations available for your preferred body placement.</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onBook();
                  }}
                  className="w-full bg-[#D4AF37] hover:bg-[#e0bc43] text-black font-bold text-sm py-3 rounded-xl transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Similar Custom Artwork</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full border border-white/10 hover:border-white/30 text-white/70 hover:text-white font-medium text-xs py-2.5 rounded-xl transition-colors text-center"
                >
                  Return to Gallery
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
