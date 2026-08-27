import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceRow {
  num: string;
  title: string;
  desc: string;
  price: string;
  tag: string;
}

const servicesList: ServiceRow[] = [
  {
    num: '01',
    title: 'BLACK & GREY REALISM',
    desc: 'Photorealistic portraits, animal motifs, and mythic figures with soft gradient depth and smooth micro-shading.',
    price: '₹350 / INCH',
    tag: 'REALISM'
  },
  {
    num: '02',
    title: 'TRIBAL & GEOMETRIC',
    desc: 'Polynesian, Maori, and Vedic geometric bands executed with jet-black ink saturation and razor-sharp lines.',
    price: '₹300 / INCH',
    tag: 'TRIBAL'
  },
  {
    num: '03',
    title: 'CUSTOM DESIGN & STENCIL',
    desc: '1-on-1 digital stencil design process transforming your personal memories into an exclusive tattoo.',
    price: '₹300 / INCH',
    tag: 'BESPOKE'
  },
  {
    num: '04',
    title: 'COVER-UP & REWORK',
    price: 'FROM ₹300 / INCH',
    tag: 'REWORK',
    desc: 'Expert transformation of old, faded, or unwanted tattoos into fresh new masterpieces with zero trace.'
  }
];

export const ServiceRowList: React.FC = () => {
  return (
    <div className="w-full divide-y divide-[#D4AF37]/15 border-y border-[#D4AF37]/15">
      {servicesList.map((service, idx) => (
        <motion.div
          key={service.num}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
        >
          <Link
            to="/contact"
            className="group py-8 sm:py-10 px-4 sm:px-8 block hover:bg-[#0a0a12] transition-colors duration-300 relative overflow-hidden"
          >
            {/* Animated Bottom Gold Border */}
            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Number & Tag */}
              <div className="md:col-span-2 flex items-center space-x-3">
                <span className="font-mono text-sm text-[#D4AF37] font-bold">
                  {service.num}
                </span>
                <span className="px-2.5 py-0.5 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase rounded">
                  {service.tag}
                </span>
              </div>

              {/* Title & Description */}
              <div className="md:col-span-6 space-y-1">
                <h3 className="font-display text-2xl sm:text-4xl text-[#F5F5F0] group-hover:text-[#D4AF37] group-hover:translate-x-2 transition-all duration-300">
                  {service.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/60 font-light max-w-xl">
                  {service.desc}
                </p>
              </div>

              {/* Price & Arrow */}
              <div className="md:col-span-4 flex items-center justify-between md:justify-end space-x-6">
                <span className="font-display text-xl sm:text-2xl text-[#D4AF37]">
                  {service.price}
                </span>

                <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#050508] flex items-center justify-center text-white/60 transition-all duration-300">
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
