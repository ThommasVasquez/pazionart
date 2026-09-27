"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Compass } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Esencia", href: "#esencia" },
    { name: "Propósito", href: "#proposito" },
    { name: "Chalets", href: "#chalets" },
    { name: "Valores", href: "#valores" },
    { name: "Pausa Consciente", href: "#experiencias" },
    { name: "Contacto", href: "#contacto" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3.5 bg-[#212B20]/90 backdrop-blur-md border-b border-[#8D996E]/20 shadow-xl"
            : "py-6 bg-gradient-to-b from-[#212B20]/80 via-[#212B20]/30 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Pazionart SVG */}
          <a
            href="#esencia"
            onClick={(e) => handleScrollTo(e, "#esencia")}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-9 h-9 md:w-11 md:h-11 transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/brand/simbolo-pazionart.svg"
                alt="Símbolo Pazionart"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-light tracking-[0.25em] text-[#F5F2ED] uppercase font-sans">
                Pazionart
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#8D996E] uppercase -mt-1 font-medium">
                Amor · Naturaleza · Arte
              </span>
            </div>
          </a>

          {/* Enlaces Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-[13px] tracking-[0.18em] uppercase text-[#F5F2ED]/80 hover:text-[#8D996E] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#A45D41] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium tracking-[0.16em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-lg hover:shadow-[#A45D41]/30 hover:scale-[1.02] cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Reservar Estadía</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[#F5F2ED] hover:text-[#8D996E] glass-panel-dark focus:outline-none cursor-pointer"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#212B20]/98 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col justify-center px-10 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-start gap-6 max-w-sm mx-auto w-full">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8D996E] font-semibold">
            Navegación
          </span>
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-2xl font-light tracking-[0.12em] text-[#F5F2ED] hover:text-[#A45D41] transition-colors"
            >
              <span className="text-xs text-[#8D996E] mr-3 font-mono">0{idx + 1}</span>
              {link.name}
            </a>
          ))}

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full mt-6 py-3.5 rounded-full text-center text-xs font-semibold tracking-[0.2em] uppercase bg-[#A45D41] text-[#F5F2ED] hover:bg-[#bd7356] transition-colors shadow-xl"
          >
            Reservar Chalet
          </button>
        </div>
      </div>
    </>
  );
}
