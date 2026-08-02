'use client';

import Image from 'next/image';
import { Snowflake, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function About() {
  return (
    <section id="quienes-somos" className="py-12 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Soft Blue Card Container matching screenshot */}
        <div className="bg-[#f0f6fc] rounded-[24px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-[#dcecf8] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
              
              {/* Header with Circular Snowflake Icon Badge & Title */}
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[2.5px] border-[#1752b0] flex items-center justify-center text-[#1752b0] bg-white shadow-sm flex-shrink-0">
                  <Snowflake className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2]" />
                </div>
                
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-[800] text-[#0b2854] tracking-[-0.02em] leading-tight">
                    ¿Quiénes somos?
                  </h2>
                  <span className="block w-12 h-[3.5px] bg-[#1752b0] rounded-full mt-1.5" />
                </div>
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-[#33537e] text-base sm:text-lg leading-relaxed font-[500]">
                <p>
                  Ice Austral es una tienda local de productos congelados en Puerto Montt, especializados en mariscos, pescados y otros productos congelados de alta calidad.
                </p>
                <p>
                  Nos enfocamos en entregar frescura, variedad y confianza a nuestros clientes, a través de un servicio cercano y canales digitales.
                </p>
              </div>

              {/* 3 Pillar Feature Badges at Bottom */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 border-t border-[#d8e8f5]">
                {/* Pillar 1 */}
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#1752b0] flex items-center justify-center text-[#1752b0] bg-white mx-auto shadow-sm">
                    <Snowflake className="w-6 h-6 stroke-[2]" />
                  </div>
                  <p className="text-[#0b2854] font-bold text-xs sm:text-sm leading-snug max-w-[130px] mx-auto">
                    Productos congelados de calidad
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#1752b0] flex items-center justify-center text-[#1752b0] bg-white mx-auto shadow-sm">
                    <ShieldCheck className="w-6 h-6 stroke-[2]" />
                  </div>
                  <p className="text-[#0b2854] font-bold text-xs sm:text-sm leading-snug max-w-[130px] mx-auto">
                    Frescura y seguridad garantizada
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#1752b0] flex items-center justify-center text-[#1752b0] bg-white mx-auto shadow-sm">
                    <HeartHandshake className="w-6 h-6 stroke-[2]" />
                  </div>
                  <p className="text-[#0b2854] font-bold text-xs sm:text-sm leading-snug max-w-[130px] mx-auto">
                    Atención cercana y confiable
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Puerto Montt Landscape Image matching screenshot */}
            <div className="lg:col-span-6">
              <div className="relative w-full h-[280px] sm:h-[360px] lg:h-[420px] rounded-[20px] sm:rounded-[28px] overflow-hidden shadow-md border-2 border-white">
                <Image
                  src="/IMAGENES/NOSOTROS.png"
                  alt="Puerto Montt Paisaje Volcán Osorno"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
