import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, CheckCircle2, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/tattoos';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
}) => {
  const [selectedService, setSelectedService] = useState<string>(initialServiceId || 's1');
  const [sizeInches, setSizeInches] = useState<number>(5);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    idea: '',
    preferredDate: '',
    placement: 'Forearm / Arm',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const currentServiceObj = SERVICES.find((s) => s.id === selectedService) || SERVICES[0];
  const estimatedCost = Math.max(currentServiceObj.minPrice, sizeInches * currentServiceObj.ratePerInch);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0a0a12] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.2)] text-white overflow-hidden my-8 z-10"
        >
          {/* Header Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/50 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">
                  <Sparkles className="w-3.5 h-3.5" /> Book Appointment
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-white">
                  Reserve Your Tattoo Session
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  Fill out your details for a personalized consultation with Vishal Kumar in Dhanbad.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                    Select Tattoo Service
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {SERVICES.map((s) => (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setSelectedService(s.id)}
                        className={`p-3 rounded-xl border text-left transition-all text-xs sm:text-sm flex flex-col justify-between ${
                          selectedService === s.id
                            ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                            : 'bg-white/[0.02] border-white/10 text-white/70 hover:border-white/20'
                        }`}
                      >
                        <span className="font-semibold text-white">{s.title}</span>
                        <span className="text-[#D4AF37] text-xs font-medium mt-1">{s.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Estimator Slider */}
                <div className="bg-white/[0.02] p-4 rounded-xl border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-white/80 uppercase tracking-wider">
                      Estimated Size (Inches)
                    </span>
                    <span className="text-[#D4AF37] font-bold text-sm bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                      {sizeInches} Inches (~₹{estimatedCost.toLocaleString('en-IN')})
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={20}
                    value={sizeInches}
                    onChange={(e) => setSizeInches(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] bg-white/10 rounded-lg cursor-pointer h-2"
                  />
                </div>

                {/* Contact Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 8102578635"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Placement & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">
                      Body Placement
                    </label>
                    <select
                      value={formData.placement}
                      onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                      className="w-full bg-[#10101a] border border-white/10 focus:border-[#D4AF37] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    >
                      <option value="Forearm / Arm">Forearm / Arm</option>
                      <option value="Full Sleeve">Full Sleeve</option>
                      <option value="Chest / Sternum">Chest / Sternum</option>
                      <option value="Shoulder / Back">Shoulder / Back</option>
                      <option value="Calf / Leg">Calf / Leg</option>
                      <option value="Neck / Wrist">Neck / Wrist</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Idea Description */}
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Describe Your Tattoo Idea
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe placement, theme, symbolic elements, or references..."
                    value={formData.idea}
                    onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Guarantee */}
                <div className="flex items-center gap-2 text-[11px] text-white/50 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Sterilized equipment, medical needles & free consultation included.</span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] hover:bg-[#e0bc43] text-[#050508] font-bold text-base py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Booking Request</span>
                </button>
              </form>
            </div>
          ) : (
            /* Confirmation View */
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 bg-[#D4AF37]/20 border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">Booking Request Sent!</h3>
                <p className="text-white/60 text-sm max-w-md mx-auto mt-2">
                  Thank you, <span className="text-[#D4AF37] font-semibold">{formData.name}</span>. Vishal Kumar will review your request for{' '}
                  <span className="text-white font-medium">{currentServiceObj.title} ({sizeInches}")</span> on{' '}
                  <span className="text-[#D4AF37]">{formData.preferredDate || 'your date'}</span>.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-[#D4AF37]/20 p-4 rounded-xl text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/50">Studio Location:</span>
                  <span className="text-white font-medium">Steel Gate near Baba Sweets, Dhanbad</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Direct Phone:</span>
                  <span className="text-[#D4AF37] font-bold">+91 8102578635</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Estimated Price:</span>
                  <span className="text-[#D4AF37] font-bold">~₹{estimatedCost.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={`https://wa.me/918102578635?text=${encodeURIComponent(
                    `Hi Vishal! I requested a booking for ${currentServiceObj.title} (${sizeInches} inches) on your website. Name: ${formData.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <Send className="w-4 h-4" /> Confirm instantly on WhatsApp
                </a>
                <button
                  onClick={handleReset}
                  className="border border-white/20 hover:border-white text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
