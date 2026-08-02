'use client';

import Image from 'next/image';
import { ShoppingCart, MessageCircle } from 'lucide-react';

interface HeroProps {
  onCatalogClick: () => void;
}

export default function Hero({ onCatalogClick }: HeroProps) {
  const whatsappNumber = '56940500068';
  const defaultMessage = encodeURIComponent('¡Hola Ice Austral! Quisiera hacer un pedido por WhatsApp.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <section id="inicio" className="relative min-h-[92vh] sm:min-h-[88vh] lg:min-h-screen flex items-start sm:items-center pt-28 sm:pt-32 pb-16 overflow-hidden bg-[#e6f3fb]">
      
      {/* Background Image for Mobile (movil.png) */}
      <div className="block md:hidden absolute top-[-20px] bottom-[20px] left-[-5%] right-[-25%] z-0 overflow-hidden">
        <Image
          src="/IMAGENES/movil.png"
          alt="Ice Austral Seafood Mobile Background"
          fill
          priority
          quality={100}
          style={{ transform: 'scale(1.15) translateX(15%)', transformOrigin: 'right top' }}
          className="object-cover object-[right_top] vivid-hero-image hero-bg-animate select-none"
        />
      </div>

      {/* Background Image for Desktop (portada.png) */}
      <div className="hidden md:block absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/IMAGENES/portada.png"
          alt="Ice Austral Seafood Desktop Background"
          fill
          priority
          quality={100}
          className="object-cover object-right lg:object-right-top vivid-hero-image hero-bg-animate select-none"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Hero Content Left - Responsive to match both PC and Mobile references */}
          <div 
            style={{ fontFamily: "'Outfit', sans-serif" }}
            className="lg:col-span-7 xl:col-span-6 space-y-4 sm:space-y-6 text-left pt-20 sm:pt-20 lg:pt-24 w-[58%] min-w-[200px] max-w-[240px] md:w-full md:max-w-xl relative z-10"
          >
            
            {/* Top Pill Badge - Mobile Only */}
            <div className="animate-fade-in-up md:hidden">
              <span className="inline-block bg-[#e2ebf4] text-[#0b2854] font-bold text-[11px] px-3.5 py-[6px] rounded-full shadow-sm">
                Congelados en Puerto Montt
              </span>
            </div>

            {/* Title in Deep Blue - thinner on mobile, bolder on desktop */}
            <h1 className="text-[34px] sm:text-[48px] lg:text-[54px] font-[700] md:font-[800] text-[#1246a0] md:text-[#0c3a80] leading-[1.05] tracking-[-0.02em] animate-fade-in-up delay-1">
              Congelados<br />
              de calidad en<br />
              Puerto Montt
            </h1>

            {/* Subtitle Paragraph - Mobile */}
            <p className="md:hidden text-[13.5px] text-[#33537e] font-[400] leading-[1.5] animate-fade-in-up delay-2 max-w-[200px]">
              Mariscos, pescados y productos congelados seleccionados para llevar a tu mesa lo mejor del sur.
            </p>

            {/* Subtitle Paragraph - PC */}
            <p className="hidden md:block text-base lg:text-[18px] text-[#33537e] font-[500] leading-[1.45] animate-fade-in-up delay-2 w-full pr-4">
              Mariscos, pescados y productos congelados seleccionados para tu negocio y tu hogar. Frescura del sur, siempre a tu mesa.
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-col gap-3 pt-4 w-full max-w-[220px] md:max-w-none md:flex-row md:items-center animate-fade-in-up delay-3">
              <button
                onClick={onCatalogClick}
                className="w-full md:w-auto flex items-center justify-center gap-2.5 bg-[#1752b0] hover:bg-[#094bb5] active:scale-[0.98] text-white px-4 py-[13px] md:px-6 md:py-3 rounded-[12px] md:rounded-[14px] font-bold text-[14.5px] md:text-base shadow-md transition-all duration-200"
              >
                <ShoppingCart className="w-[18px] h-[18px] md:w-5 md:h-5" />
                <span>Ver catálogo</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 active:scale-[0.98] text-[#1752b0] border-[1.5px] border-[#1752b0] px-4 py-[11px] md:px-6 md:py-[11px] rounded-[12px] md:rounded-[14px] font-bold text-[14.5px] md:text-base shadow-sm transition-all duration-200"
              >
                <MessageCircle className="w-[18px] h-[18px] md:w-5 md:h-5" />
                <span>Pide por WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Spacer for desktop background composition */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6" />

        </div>
      </div>
    </section>
  );
}

