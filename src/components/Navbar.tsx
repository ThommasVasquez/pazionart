"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Compass, Sparkles } from "lucide-react";
import MountainStatus from "./MountainStatus";

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
    { name: "Esencia", href: "#esencia", num: "01" },
    { name: "Propósito", href: "#proposito", num: "02" },
    { name: "Chalets", href: "#chalets", num: "03" },
    { name: "Valores", href: "#valores", num: "04" },
    { name: "Vivencias", href: "#experiencias", num: "05" },
    { name: "Contacto", href: "#contacto", num: "06" },
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
            ? "py-3 bg-[#151D14]/90 backdrop-blur-xl border-b border-[#8D996E]/20 shadow-2xl"
            : "py-5 bg-gradient-to-b from-[#151D14]/90 via-[#151D14]/40 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Pazionart SVG con Isotipo */}
          <a
            href="#esencia"
            onClick={(e) => handleScrollTo(e, "#esencia")}
            className="flex items-center gap-3.5 group cursor-pointer"
            data-cursor="explore"
          >
            <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/brand/simbolo-pazionart.svg"
                alt="Símbolo Pazionart"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-light tracking-[0.25em] text-[#F5F2ED] uppercase font-sans">
                Pazionart
              </span>
              <span className="text-[8px] md:text-[9px] tracking-[0.35em] text-[#8D996E] uppercase -mt-1 font-mono">
                Amor · Naturaleza · Arte
              </span>
            </div>
          </a>

          {/* Center: Live Mountain Meta Status Widget */}
          <div className="hidden xl:block">
            <MountainStatus />
          </div>

          {/* Enlaces Desktop */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-xs tracking-[0.16em] uppercase text-[#F5F2ED]/75 hover:text-[#8D996E] transition-all relative py-1 flex items-center gap-1 group"
              >
                <span className="text-[9px] font-mono text-[#8D996E]/60 group-hover:text-[#A45D41] transition-colors">
                  {link.num}
                </span>
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#A45D41] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Botón de Reserva con Estilo Boutique */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              data-cursor="reserve"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl hover:shadow-[#A45D41]/40 hover:-translate-y-0.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Reservar Chalet</span>
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
        className={`fixed inset-0 z-40 bg-[#151D14]/98 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col justify-center px-10 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-start gap-5 max-w-sm mx-auto w-full">
          <div className="mb-2">
            <MountainStatus />
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#8D996E] font-mono">
            Índice de Navegación
          </span>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-2xl font-light tracking-[0.12em] text-[#F5F2ED] hover:text-[#A45D41] transition-colors flex items-baseline gap-3"
            >
              <span className="text-xs text-[#8D996E] font-mono">{link.num}</span>
              <span>{link.name}</span>
            </a>
          ))}

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full mt-4 py-3.5 rounded-full text-center text-xs font-semibold tracking-[0.2em] uppercase bg-[#A45D41] text-[#F5F2ED] hover:bg-[#bd7356] transition-colors shadow-2xl flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Reservar Estadía</span>
          </button>
        </div>
      </div>
    </>
  );
}
