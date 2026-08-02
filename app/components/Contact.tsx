'use client';

import { MapPin, Instagram, Facebook } from 'lucide-react';

const WhatsappBrandIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function Contact() {
  return (
    <section id="contacto" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container matching the light blue background from screenshot */}
        <div className="bg-[#f0f6fc] rounded-[32px] overflow-hidden shadow-sm border border-[#e2eff8] flex flex-col lg:flex-row">
          
          {/* Left Column: Info */}
          <div className="w-full lg:w-[45%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            
            <div className="mb-10">
              <h2 className="text-[28px] sm:text-[34px] font-[800] text-[#0b2854] tracking-tight leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Dirección y redes sociales
              </h2>
              <span className="block w-[42px] h-[2.5px] bg-[#1752b0] mt-4" />
            </div>

            <div className="space-y-6 text-[#173a6e] font-bold text-[15px] sm:text-[16px]">
              
              <div className="flex items-start gap-4">
                <MapPin className="w-[22px] h-[22px] text-[#1752b0] flex-shrink-0 mt-0.5" fill="#1752b0" stroke="white" strokeWidth={1.5} />
                <div className="leading-tight">
                  Avenida Austral 1920,<br/>
                  Puerto Montt
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-[22px] h-[22px] text-[#1752b0] flex-shrink-0 mt-0.5" fill="#1752b0" stroke="white" strokeWidth={1.5} />
                <div className="leading-tight">
                  Miraflores 1530,<br/>
                  Puerto Montt
                </div>
              </div>

              <a href="https://wa.me/56940500068" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-[#25D366] transition-colors">
                <WhatsappBrandIcon />
                <span>+56 9 4050 0068</span>
              </a>

              <a href="https://wa.me/56940500068" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-[#25D366] transition-colors">
                <WhatsappBrandIcon />
                <span>+56 9 4050 0068</span>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-[22px] h-[22px] flex items-center justify-center rounded-[6px] bg-gradient-to-tr from-[#fbc2eb] via-[#e91e63] to-[#9c27b0] text-white flex-shrink-0">
                  <Instagram className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <span>@ice_austral</span>
              </div>

              <div className="flex items-center gap-4">
                <Facebook className="w-[22px] h-[22px] text-[#1877F2] fill-[#1877F2] flex-shrink-0" stroke="white" strokeWidth={0.5} />
                <span>IceAustral Congelados</span>
              </div>

            </div>
          </div>

          {/* Right Column: Google Maps (Using the provided iframe) */}
          <div className="w-full lg:w-[55%] min-h-[400px] sm:min-h-[500px] lg:min-h-full p-4 sm:p-6 lg:p-8 lg:pl-0">
            <div className="w-full h-full rounded-[24px] overflow-hidden shadow-sm border border-white/50 bg-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5981.376725974781!2d-72.9321429!3d-41.44598320000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96183b00250e982b%3A0x70c52a3a0c03e172!2sIce%20Austral%20-%20Congelados!5e0!3m2!1ses-419!2scl!4v1785703867237!5m2!1ses-419!2scl" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '100%' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
