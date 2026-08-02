'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, MessageCircle } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappNumber = '56940500068';
  const defaultMessage = encodeURIComponent('¡Hola Ice Austral! Me gustaría solicitar información sobre sus productos congelados.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setIsScrolled(scrollPos > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'quienes-somos', label: 'Quiénes somos' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/65 shadow-md py-2.5 border-b border-white/40'
          : 'bg-white/35 md:bg-transparent py-3.5 border-b border-white/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Circular Logo Badge Hanging Down (Matching Screenshot) */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('inicio');
              }}
              className="group relative z-20 transition-transform duration-200 hover:scale-105"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 -mb-6 sm:-mb-10 lg:-mb-12 mt-1 bg-white rounded-full p-1.5 sm:p-2 shadow-md border-2 sm:border-4 border-white flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/IMAGENES/logo.png"
                    alt="Ice Austral Congelados Logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10 pl-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className={`relative px-1 py-2 text-base font-bold tracking-tight transition-colors duration-200 ${
                    isActive ? 'text-[#0c3a80]' : 'text-[#0c3a80] hover:text-[#1752b0]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[3.5px] bg-[#0c3a80] rounded-full transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop WhatsApp CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-2xl font-extrabold text-base shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-5 h-5 fill-white stroke-[#25D366]" />
              <span>Pide por WhatsApp</span>
            </a>
          </div>

          {/* Unencapsulated 3-line Asymmetric Hamburger Menu for Mobile (Matching Screenshot) */}
          <div className="md:hidden flex items-center pr-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 focus:outline-none transition-transform active:scale-95 flex items-center justify-center bg-transparent border-0"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? (
                <X className="w-8 h-8 text-[#0b2854]" />
              ) : (
                <div className="flex flex-col items-end justify-center gap-1.5 w-7">
                  <span className="h-[3px] w-7 bg-[#0b2854] rounded-full transition-all duration-200" />
                  <span className="h-[3px] w-7 bg-[#0b2854] rounded-full transition-all duration-200" />
                  <span className="h-[3px] w-5 bg-[#0b2854] rounded-full transition-all duration-200" />
                </div>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <nav className="flex flex-col space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                    isActive ? 'bg-blue-50 text-[#0c4394]' : 'text-[#061c3b] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-2xl font-bold text-base shadow-sm active:scale-95 transition-transform"
            >
              <MessageCircle className="w-5 h-5 fill-white stroke-[#25D366]" />
              <span>Pide por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

