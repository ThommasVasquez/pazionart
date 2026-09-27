"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Compass, Sparkles } from "lucide-react";
import LogoTexto from "@/components/LogoTexto";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Esencia", href: "#esencia" },
    { name: "Propósito", href: "#proposito" },
    { name: "Chalets", href: "#chalets" },
    { name: "Filosofía", href: "#valores" },
    { name: "Vivencias", href: "#experiencias" },
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "h-14 bg-[#151D14]/92 backdrop-blur-xl border-b border-[#8D996E]/20 shadow-lg"
            : "h-16 bg-gradient-to-b from-[#151D14]/80 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 md:px-10 flex items-center justify-between">
          {/* Logo Pazionart SVG Esbelto */}
          <a
            href="#esencia"
            onClick={(e) => handleScrollTo(e, "#esencia")}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="relative w-7 h-7 md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/brand/simbolo-pazionart.svg"
                alt="Símbolo Pazionart"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="h-5 md:h-6 w-24 md:w-32 flex items-center">
                <LogoTexto
                  viewBox="0 0 1920 880"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  fill="#F5F2ED"
                />
              </div>
              <span className="text-[7px] md:text-[8px] tracking-[0.3em] text-[#8D996E] uppercase -mt-0.5 font-mono">
                Amor · Naturaleza · Arte
              </span>
            </div>
          </a>

          {/* Enlaces de Navegación Compactos & Elegantes */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-[11px] tracking-[0.16em] uppercase text-[#F5F2ED]/75 hover:text-[#8D996E] transition-colors relative py-1 group"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#A45D41] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Botón CTA Esbelto & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] md:text-[11px] font-semibold tracking-[0.16em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <Compass className="w-3 h-3" />
              <span>Reservar</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full text-[#F5F2ED] hover:text-[#8D996E] glass-panel-dark focus:outline-none cursor-pointer"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#151D14]/98 backdrop-blur-2xl transition-all duration-300 md:hidden flex flex-col justify-center px-8 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-start gap-4 max-w-xs mx-auto w-full">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8D996E] font-mono">
            Índice de Navegación
          </span>
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-xl font-light tracking-[0.12em] text-[#F5F2ED] hover:text-[#A45D41] transition-colors flex items-baseline gap-2.5"
            >
              <span className="text-xs text-[#8D996E] font-mono">0{idx + 1}</span>
              <span>{link.name}</span>
            </a>
          ))}

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full mt-4 py-3 rounded-full text-center text-xs font-semibold tracking-[0.2em] uppercase bg-[#A45D41] text-[#F5F2ED] hover:bg-[#bd7356] transition-colors shadow-xl flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Reservar Estadía</span>
          </button>
        </div>
      </div>
    </>
  );
}
