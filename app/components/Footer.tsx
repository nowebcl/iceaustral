'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#06172d] text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <Image
                src="/IMAGENES/logo.png"
                alt="Ice Austral Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="font-extrabold text-white text-lg tracking-tight">Ice Austral Congelados</div>
              <div className="text-xs text-slate-400">Frescura del sur, siempre a tu mesa • Puerto Montt</div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-300">
            <a href="#inicio" className="hover:text-white transition-colors">Inicio</a>
            <a href="#catalogo" className="hover:text-white transition-colors">Catálogo</a>
            <a href="#quienes-somos" className="hover:text-white transition-colors">Quiénes somos</a>
            <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Ice Austral Congelados. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            <span>
              Diseñado por <a href="https://www.noweb.cl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-semibold">Noweb Labs</a>
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
}
