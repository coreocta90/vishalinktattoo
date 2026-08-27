import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Instagram, Calendar, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    style: 'Black & Grey Realism (₹350/inch)',
    placement: '',
    date: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `Hi Vishal! I want to book a tattoo session.%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Style:* ${encodeURIComponent(formData.style)}%0A*Placement/Idea:* ${encodeURIComponent(formData.placement)}%0A*Preferred Date:* ${encodeURIComponent(formData.date)}`;

    window.open(`https://wa.me/918102578635?text=${message}`, '_blank');
  };

  return (
    <div className="pt-28 pb-24 bg-[#050508] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3 inline-block">
            DIRECT STUDIO APPOINTMENT
          </span>
          <h1 className="font-display text-5xl sm:text-8xl tracking-tight text-white mb-6 uppercase">
            BOOK APPOINTMENT
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Reserve your 1-on-1 consultation session with Vishal Kumar at Steel Gate studio in Dhanbad.
          </p>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full shadow-[0_0_12px_#D4AF37]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-[#0a0a12] border border-[#D4AF37]/20 rounded-2xl p-8 space-y-6">
              <h3 className="font-display text-2xl text-white tracking-wide">
                STUDIO INFORMATION
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl text-[#D4AF37]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs text-white/50 uppercase tracking-wider font-semibold">Location</h4>
                    <p className="text-sm text-white font-medium mt-1">
                      Steel Gate, near Baba Sweets, Dhanbad, Jharkhand 828127
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl text-[#D4AF37]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs text-white/50 uppercase tracking-wider font-semibold">Direct Phone / Call</h4>
                    <a href="tel:+918102578635" className="text-sm text-[#D4AF37] font-bold mt-1 inline-block hover:underline">
                      +91 8102578635
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl text-[#D4AF37]">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs text-white/50 uppercase tracking-wider font-semibold">Instagram Profile</h4>
                    <a
                      href="https://instagram.com/bishal_kumar_tattoo_artist"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-[#D4AF37] font-bold mt-1 inline-block hover:underline"
                    >
                      @bishal_kumar_tattoo_artist
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h4 className="text-xs text-[#D4AF37] font-bold tracking-widest uppercase mb-2">STUDIO HOURS</h4>
                <p className="text-xs text-white/60">Monday – Sunday: 11:00 AM – 9:00 PM</p>
              </div>
            </div>

            {/* Quick Consultation Callout */}
            <div className="bg-gradient-to-r from-[#0a0a12] to-[#10101a] border border-[#D4AF37]/30 rounded-2xl p-6 text-center space-y-3">
              <div className="text-xs text-[#D4AF37] font-bold tracking-widest uppercase">NEED INSTANT ANSWERS?</div>
              <p className="text-xs text-white/70">Call or message directly on WhatsApp for instant quote estimation based on tattoo size in inches.</p>
              <a
                href="https://wa.me/918102578635"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-bold text-[#D4AF37] hover:underline"
              >
                <span>Chat on WhatsApp (+91 8102578635) →</span>
              </a>
            </div>
          </motion.div>

          {/* Right Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 bg-[#0a0a12] border border-[#D4AF37]/30 rounded-2xl p-8 sm:p-10 shadow-[0_0_40px_rgba(212,175,55,0.1)]"
          >
            <h3 className="font-display text-2xl text-white tracking-wide mb-6">
              APPOINTMENT INTAKE FORM
            </h3>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 size={48} className="text-[#D4AF37] mx-auto" />
                <h4 className="font-display text-2xl text-white">REQUEST SENT VIA WHATSAPP!</h4>
                <p className="text-sm text-white/60 max-w-md mx-auto">
                  Thank you! Your request details have been forwarded to Vishal Kumar’s WhatsApp line. We will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 bg-white/10 text-xs font-bold text-white rounded-lg hover:bg-white/20"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 8102578635"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Preferred Tattoo Style</label>
                    <select
                      value={formData.style}
                      onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                      className="w-full bg-[#10101a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    >
                      <option>Black & Grey Realism (₹350/inch)</option>
                      <option>Tribal Patterns (₹300/inch)</option>
                      <option>Custom Tattoo Art (₹300/inch)</option>
                      <option>Cover-Up & Rework (From ₹300/inch)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Preferred Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Tattoo Idea & Placement</label>
                  <textarea
                    rows={4}
                    placeholder="Describe placement (forearm, shoulder, chest) and your tattoo concept/size in inches..."
                    value={formData.placement}
                    onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#D4AF37] text-[#050508] font-display text-lg tracking-wider rounded-xl hover:bg-[#e0bc43] transition-transform active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center space-x-2"
                >
                  <span>SEND REQUEST VIA WHATSAPP</span>
                  <Send size={18} />
                </button>

                <p className="text-[11px] text-white/40 text-center">
                  Direct submission to Vishal Kumar’s WhatsApp (+91 8102578635).
                </p>

              </form>
            )}

          </motion.div>

        </div>

      </div>
    </div>
  );
};
