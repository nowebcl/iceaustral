'use client';

import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const whatsappNumber = '56940500068';
  const message = encodeURIComponent('¡Hola Ice Austral! Quisiera realizar una consulta rápida.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 animate-whatsapp-pulse group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-white stroke-[#25D366]" />
      <span className="hidden sm:inline font-extrabold text-sm tracking-wide">
        ¿Dudas? ¡Escríbenos!
      </span>
    </a>
  );
}

