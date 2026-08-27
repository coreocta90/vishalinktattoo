import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  return (
    <a
      href="https://wa.me/918102578635?text=Hi%20Vishal!%20I%20want%20to%20book%20a%20tattoo%20consultation."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-transform group"
    >
      {/* Pulse Ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40 group-hover:opacity-60" />
      <MessageCircle size={28} className="relative z-10 fill-current" />
    </a>
  );
};
