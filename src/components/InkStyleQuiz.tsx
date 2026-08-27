import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Question {
  id: number;
  title: string;
  options: { label: string; tag: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    title: "Where's your tattoo going?",
    options: [
      { label: 'Arm or Forearm', tag: 'arm' },
      { label: 'Back or Chest', tag: 'back' },
      { label: 'Hand, Neck or Ribs', tag: 'hand' },
    ]
  },
  {
    id: 2,
    title: 'What size are you planning?',
    options: [
      { label: 'Small (2 - 4 Inches)', tag: 'small' },
      { label: 'Medium (5 - 8 Inches)', tag: 'medium' },
      { label: 'Large (Full Sleeve / Back)', tag: 'large' },
    ]
  },
  {
    id: 3,
    title: 'What is your aesthetic vibe?',
    options: [
      { label: 'Soft & Photorealistic', tag: 'realism' },
      { label: 'Bold & Jet-Black Geometric', tag: 'tribal' },
      { label: 'Thin & Delicate Script / Fine Line', tag: 'script' },
    ]
  },
  {
    id: 4,
    title: 'Personal meaning or pure artwork?',
    options: [
      { label: 'Deep Personal Story & Symbolism', tag: 'story' },
      { label: 'Pure Aesthetic Masterpiece', tag: 'art' },
    ]
  }
];

interface Recommendation {
  title: string;
  style: string;
  reason: string;
  image: string;
  price: string;
}

export const InkStyleQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<Recommendation | null>(null);

  const handleSelect = (tag: string) => {
    const nextAnswers = { ...answers, [currentStep]: tag };
    setAnswers(nextAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate Result
      const vibe = nextAnswers[2];
      let rec: Recommendation;

      if (vibe === 'tribal') {
        rec = {
          title: 'Polynesian & Vedic Tribal Patterns',
          style: 'Tribal & Geometric',
          reason: 'Matched for your desire for bold jet-black geometric definition and strong ancestral aesthetic presence.',
          image: '/frames/frame_0240.webp',
          price: '₹300 / inch'
        };
      } else if (vibe === 'script') {
        rec = {
          title: 'Chicano Calligraphy & Fine Line Script',
          style: 'Custom Script',
          reason: 'Matched for your preference for delicate line weight, elegant lettering, and personal statement tattoos.',
          image: '/frames/frame_0300.webp',
          price: '₹300 / inch'
        };
      } else {
        rec = {
          title: 'Black & Grey Photorealism',
          style: 'Black & Grey Realism',
          reason: 'Matched for your focus on smooth gradient depth, lifelike portraiture, and maximum photographic detail.',
          image: '/stills/bonus_01.webp',
          price: '₹350 / inch'
        };
      }

      setResult(rec);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <section className="relative z-20 bg-[#0a0a12] py-20 sm:py-32 border-y border-[#D4AF37]/15">
      <div className="max-w-[1000px] mx-auto px-6">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-2 block">
            INTERACTIVE RECOMMENDER
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white uppercase">
            FIND YOUR PERFECT INK STYLE
          </h2>
        </div>

        <div className="bg-[#050508] border border-[#D4AF37]/30 rounded-2xl p-8 sm:p-12 shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Step Indicator */}
                <div className="flex items-center justify-between text-xs text-white/50 border-b border-white/10 pb-4">
                  <span className="font-mono text-[#D4AF37]">QUESTION 0{currentStep + 1} / 04</span>
                  <span>{Math.round(((currentStep + 1) / 4) * 100)}% COMPLETED</span>
                </div>

                {/* Question Title */}
                <h3 className="font-display text-2xl sm:text-4xl text-white text-center">
                  {questions[currentStep].title}
                </h3>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  {questions[currentStep].options.map((opt) => (
                    <button
                      key={opt.tag}
                      onClick={() => handleSelect(opt.tag)}
                      className="p-6 bg-[#0a0a12] border border-white/10 rounded-xl text-center hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:scale-105 transition-all duration-300 group"
                    >
                      <span className="font-sans text-sm font-semibold text-white group-hover:text-[#D4AF37]">
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Image */}
                <div className="md:col-span-5 rounded-xl overflow-hidden border border-[#D4AF37]/40">
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-full aspect-square object-cover filter contrast-[1.05]"
                  />
                </div>

                {/* Info */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center space-x-2 text-[#D4AF37]">
                    <Sparkles size={20} />
                    <span className="font-sans text-xs font-bold uppercase tracking-widest">
                      RECOMMENDED MATCH
                    </span>
                  </div>

                  <h3 className="font-display text-3xl text-white">
                    {result.title}
                  </h3>

                  <p className="font-sans text-sm text-white/70 leading-relaxed font-light">
                    {result.reason}
                  </p>

                  <div className="font-display text-2xl text-[#D4AF37]">
                    {result.price}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <Link
                      to="/contact"
                      className="px-6 py-3 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-lg hover:bg-[#e0bc43] transition-all flex items-center space-x-2"
                    >
                      <span>BOOK THIS STYLE</span>
                      <ArrowRight size={16} />
                    </Link>

                    <button
                      onClick={handleRestart}
                      className="px-4 py-3 bg-white/5 border border-white/10 text-white/70 text-xs font-semibold tracking-wider uppercase rounded-lg hover:text-white hover:border-white/30 flex items-center space-x-2"
                    >
                      <RotateCcw size={14} />
                      <span>RESTART QUIZ</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
