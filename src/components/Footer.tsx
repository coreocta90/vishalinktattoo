import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, Check, Copy } from 'lucide-react';

export const Footer: React.FC = () => {
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const handleCopy = (text: string, type: 'upi' | 'coupon') => {
    navigator.clipboard.writeText(text);
    if (type === 'upi') {
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    } else {
      setCopiedCoupon(true);
      setTimeout(() => setCopiedCoupon(false), 2000);
    }
  };

  const waQrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://wa.me/918102578635?text=Hi%20Vishal!%20I%20want%20to%20book%20a%20tattoo%20session.";
  const igQrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://instagram.com/bishal_kumar_tattoo_artist";

  return (
    <footer className="bg-[#050508] border-t border-[#D4AF37]/20 pt-16 pb-12 text-white relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Feature Bar: UPI Deposit & Coupon Pill */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 pb-12 border-b border-white/10">
          
          {/* Coupon Pill */}
          <div className="bg-[#0a0a12] border-2 border-dashed border-[#D4AF37]/40 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest block mb-1">
                SPECIAL WELCOME OFFER
              </span>
              <div className="font-display text-xl text-white">
                FIRST10 — 10% OFF FIRST INK
              </div>
              <p className="text-xs text-white/50 mt-1">Mention this code during 1-on-1 consultation.</p>
            </div>
            <button
              onClick={() => handleCopy('FIRST10', 'coupon')}
              className="px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#050508] transition-all flex items-center space-x-1 shrink-0"
            >
              {copiedCoupon ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedCoupon ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
          </div>

          {/* UPI Deposit Line */}
          <div className="bg-[#0a0a12] border border-white/10 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest block mb-1">
                STUDIO BOOKING DEPOSIT
              </span>
              <div className="font-sans text-sm font-semibold text-white">
                UPI: <span className="text-[#D4AF37]">vishaltattoos@upi</span>
              </div>
              <p className="text-xs text-white/50 mt-1">Confirm slot with ₹500 advance deposit.</p>
            </div>
            <button
              onClick={() => handleCopy('vishaltattoos@upi', 'upi')}
              className="px-4 py-2 bg-white/5 border border-white/15 text-white/80 rounded-lg text-xs font-bold uppercase tracking-wider hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center space-x-1 shrink-0"
            >
              {copiedUpi ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedUpi ? 'COPIED!' : 'COPY UPI'}</span>
            </button>
          </div>

        </div>

        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="font-display text-2xl tracking-wider text-white inline-block">
              <span className="text-[#D4AF37]">VISHAL</span> KUMAR TATTOOS
            </Link>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              Jharkhand's premier dark luxury tattoo studio. Fine line precision, black & grey photorealism, and 100% hospital-grade sterilization standards in Dhanbad.
            </p>
            <div className="text-xs text-[#D4AF37] font-semibold tracking-wider pt-2">
              7,650+ Followers • 300+ Happy Clients
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-lg text-white tracking-wide">QUICK NAVIGATION</h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li><Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#D4AF37] transition-colors">Portfolio</Link></li>
              <li><Link to="/services" className="hover:text-[#D4AF37] transition-colors">Services & Pricing</Link></li>
              <li><Link to="/try-on" className="hover:text-[#D4AF37] transition-colors">Tattoo Try-On</Link></li>
              <li><Link to="/about" className="hover:text-[#D4AF37] transition-colors">About Artist</Link></li>
              <li><Link to="/contact" className="hover:text-[#D4AF37] transition-colors">Book Appointment</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Address */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-lg text-white tracking-wide">STUDIO LOCATION</h4>
            <div className="space-y-2 text-xs text-white/60">
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Steel Gate, near Baba Sweets, Dhanbad, Jharkhand 828127</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-[#D4AF37] shrink-0" />
                <a href="tel:+918102578635" className="hover:text-[#D4AF37] font-bold">+91 8102578635</a>
              </div>
              <div className="flex items-center space-x-2">
                <Instagram size={16} className="text-[#D4AF37] shrink-0" />
                <a href="https://instagram.com/bishal_kumar_tattoo_artist" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37]">
                  @bishal_kumar_tattoo_artist
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: QR Codes */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-lg text-white tracking-wide">SCAN TO CONNECT</h4>
            <div className="flex items-center space-x-4">
              
              {/* WhatsApp QR */}
              <div className="bg-white p-2 rounded-xl text-center space-y-1">
                <img src={waQrUrl} alt="Scan to Book WhatsApp" className="w-20 h-20" />
                <span className="block text-[9px] font-bold text-black uppercase tracking-wider">
                  SCAN TO BOOK
                </span>
              </div>

              {/* Instagram QR */}
              <div className="bg-white p-2 rounded-xl text-center space-y-1">
                <img src={igQrUrl} alt="Scan to Follow Instagram" className="w-20 h-20" />
                <span className="block text-[9px] font-bold text-black uppercase tracking-wider">
                  SCAN TO FOLLOW
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <div>© 2026 Vishal Kumar Tattoos. All rights reserved.</div>
          <div className="flex space-x-6">
            <span>Sterile Medical Needles</span>
            <span>•</span>
            <span>Hospital Hygiene Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
