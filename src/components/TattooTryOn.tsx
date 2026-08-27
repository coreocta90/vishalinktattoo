import React, { useState, useRef } from 'react';
import { Upload, Move, RotateCw, ZoomIn, Eye, ExternalLink, ShieldCheck } from 'lucide-react';

interface TattooDesign {
  id: string;
  name: string;
  image: string;
}

const designsData: TattooDesign[] = [
  { id: '1', name: 'Lion Realism', image: '/stills/bonus_01.webp' },
  { id: '2', name: 'Fine Line Rose', image: '/stills/bonus_02.webp' },
  { id: '3', name: 'Micro Shading Depth', image: '/frames/frame_0180.webp' },
  { id: '4', name: 'Polynesian Geometric', image: '/frames/frame_0240.webp' },
  { id: '5', name: 'Calligraphy Script', image: '/frames/frame_0300.webp' },
  { id: '6', name: 'Phoenix Cover-Up', image: '/frames/frame_0350.webp' },
];

export const TattooTryOn: React.FC = () => {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<TattooDesign>(designsData[0]);

  // Controls state
  const [posX, setPosX] = useState<number>(0);
  const [posY, setPosY] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(0.85);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserPhoto(event.target?.result as string);
        setPosX(0);
        setPosY(0);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag handlers (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX - posX, y: e.clientY - posY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    setPosX(e.clientX - dragStart.current.x);
    setPosY(e.clientY - dragStart.current.y);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const handleWhatsApp = () => {
    const msg = `Hi Vishal! I used the Virtual Tattoo Try-On Studio on your website for "${selectedDesign.name}" design. I want to book a consultation session.`;
    window.open(`https://wa.me/918102578635?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-[#0a0a12] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-10 my-8 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase block">
            VIRTUAL INK AR STUDIO
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-white">
            TATTOO TRY-ON STUDIO
          </h2>
        </div>

        <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-full">
          <ShieldCheck size={16} />
          <span>100% Private • Photo stays on your device</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Interactive Canvas Area */}
        <div className="lg:col-span-8 space-y-4">
          
          <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] bg-[#050508] border-2 border-dashed border-[#D4AF37]/30 rounded-2xl overflow-hidden flex items-center justify-center select-none"
          >
            {userPhoto ? (
              <>
                {/* User Photo Background */}
                <img
                  src={userPhoto}
                  alt="User Body Canvas"
                  className="w-full h-full object-cover pointer-events-none filter contrast-[1.02]"
                />

                {/* Draggable Tattoo Overlay */}
                <div
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  className="absolute cursor-move touch-none p-2 border-2 border-dashed border-[#D4AF37]/50 rounded-lg hover:border-[#D4AF37] transition-all"
                  style={{
                    transform: `translate(${posX}px, ${posY}px) rotate(${rotation}deg) scale(${scale})`,
                    opacity: opacity,
                    mixBlendMode: 'multiply',
                  }}
                >
                  <img
                    src={selectedDesign.image}
                    alt={selectedDesign.name}
                    className="w-48 h-48 object-contain pointer-events-none filter contrast-[1.3] brightness-[0.85] grayscale"
                  />
                </div>
              </>
            ) : (
              <label className="flex flex-col items-center justify-center p-8 text-center cursor-pointer group">
                <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform mb-4">
                  <Upload size={32} />
                </div>
                <span className="font-display text-xl text-white mb-2">
                  UPLOAD YOUR BODY PHOTO
                </span>
                <span className="text-xs text-white/50 max-w-sm leading-relaxed">
                  Click to select arm, leg, shoulder, or chest photo from your device. Photo stays 100% private.
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}

            {userPhoto && (
              <label className="absolute top-4 right-4 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white/80 hover:text-white cursor-pointer transition-colors">
                Change Photo
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            )}
          </div>

          {/* Interactive Sliders (When photo is uploaded) */}
          {userPhoto && (
            <div className="bg-[#050508] border border-white/10 rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Scale Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white/70 font-semibold uppercase">
                    <span className="flex items-center space-x-1">
                      <ZoomIn size={14} className="text-[#D4AF37]" />
                      <span>Size / Scale</span>
                    </span>
                    <span>{Math.round(scale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min={0.3}
                    max={2.5}
                    step={0.05}
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  />
                </div>

                {/* Rotation Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white/70 font-semibold uppercase">
                    <span className="flex items-center space-x-1">
                      <RotateCw size={14} className="text-[#D4AF37]" />
                      <span>Rotation</span>
                    </span>
                    <span>{rotation}°</span>
                  </div>
                  <input
                    type="range"
                    min={-180}
                    max={180}
                    step={1}
                    value={rotation}
                    onChange={(e) => setRotation(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  />
                </div>

                {/* Opacity Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white/70 font-semibold uppercase">
                    <span className="flex items-center space-x-1">
                      <Eye size={14} className="text-[#D4AF37]" />
                      <span>Ink Darkness</span>
                    </span>
                    <span>{Math.round(opacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min={0.2}
                    max={1}
                    step={0.05}
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  />
                </div>

              </div>
              <p className="text-[11px] text-white/40 text-center flex items-center justify-center space-x-1">
                <Move size={12} className="text-[#D4AF37]" />
                <span>Drag the tattoo directly on the photo to position it perfectly on your skin.</span>
              </p>
            </div>
          )}

        </div>

        {/* Right Side Panel: Select Design */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-3">
            <h3 className="font-display text-xl text-white">SELECT TATTOO DESIGN</h3>
            <p className="text-xs text-white/60">Choose an artwork design to try on your body photo.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
            {designsData.map((design) => (
              <button
                key={design.id}
                onClick={() => setSelectedDesign(design)}
                className={`p-2 rounded-xl border text-left transition-all ${
                  selectedDesign.id === design.id
                    ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-2 ring-[#D4AF37]/30'
                    : 'border-white/10 bg-[#050508] hover:border-white/30'
                }`}
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-black">
                  <img
                    src={design.image}
                    alt={design.name}
                    className="w-full h-full object-cover filter contrast-[1.05]"
                  />
                </div>
                <span className="text-xs font-semibold text-white block truncate">{design.name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleWhatsApp}
            className="w-full py-4 bg-[#D4AF37] text-[#050508] font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-[#e0bc43] transition-all flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            <span>BOOK THIS DESIGN VIA WHATSAPP</span>
            <ExternalLink size={16} />
          </button>
        </div>

      </div>

    </div>
  );
};
