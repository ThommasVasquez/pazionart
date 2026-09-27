"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Compass, Sparkles } from "lucide-react";
import LogoTexto from "@/components/LogoTexto";
import ThemeSwitch from "@/components/ThemeSwitch";
import LanguageSwitch from "@/components/LanguageSwitch";
import { usePreferences } from "@/context/PreferencesContext";

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenThreshold?: () => void;
  activeWorld?: "chalets" | "restaurante" | "explore";
  onSelectWorld?: (world: "chalets" | "restaurante" | "explore") => void;
}

export default function Navbar({
  onOpenBooking,
  onOpenThreshold,
  activeWorld = "chalets",
  onSelectWorld,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, theme } = usePreferences();
  const isLight = theme === "light";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks =
    activeWorld === "restaurante"
      ? [
          { name: t.nav.fogon, href: "#esencia" },
          { name: t.nav.origen, href: "#proposito" },
          { name: t.nav.menu, href: "#restaurante" },
          { name: t.nav.filosofia, href: "#valores" },
          { name: t.nav.vivencias, href: "#experiencias" },
          { name: t.nav.contacto, href: "#contacto" },
        ]
      : activeWorld === "chalets"
      ? [
          { name: t.nav.esencia, href: "#esencia" },
          { name: t.nav.proposito, href: "#proposito" },
          { name: t.nav.chalets, href: "#chalets" },
          { name: t.nav.filosofia, href: "#valores" },
          { name: t.nav.vivencias, href: "#experiencias" },
          { name: t.nav.contacto, href: "#contacto" },
        ]
      : [
          { name: t.nav.esencia, href: "#esencia" },
          { name: t.nav.proposito, href: "#proposito" },
          { name: t.nav.fogon, href: "#restaurante" },
          { name: t.nav.chalets, href: "#chalets" },
          { name: t.nav.filosofia, href: "#valores" },
          { name: t.nav.vivencias, href: "#experiencias" },
          { name: t.nav.contacto, href: "#contacto" },
        ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isRestaurante = activeWorld === "restaurante";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? isLight
              ? isRestaurante
                ? "h-14 bg-[#F8F3ED]/92 backdrop-blur-xl border-b border-[#A45D41]/20 shadow-md text-[#2A1B14]"
                : "h-14 bg-[#F5F2EA]/92 backdrop-blur-xl border-b border-[#8D996E]/20 shadow-md text-[#1C231A]"
              : isRestaurante
              ? "h-14 bg-[#1C1512]/95 backdrop-blur-xl border-b border-[#A45D41]/30 shadow-lg text-[#F5F2ED]"
              : "h-14 bg-[#151D14]/92 backdrop-blur-xl border-b border-[#8D996E]/20 shadow-lg text-[#F5F2ED]"
            : isLight
            ? isRestaurante
              ? "h-16 bg-gradient-to-b from-[#F8F3ED]/90 to-transparent text-[#2A1B14]"
              : "h-16 bg-gradient-to-b from-[#F5F2EA]/90 to-transparent text-[#1C231A]"
            : isRestaurante
            ? "h-16 bg-gradient-to-b from-[#1C1512]/85 to-transparent text-[#F5F2ED]"
            : "h-16 bg-gradient-to-b from-[#151D14]/80 to-transparent text-[#F5F2ED]"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 md:px-10 flex items-center justify-between">
          {/* Logo Pazionart SVG Esbelto */}
          <a
            href="#esencia"
            onClick={(e) => handleScrollTo(e, "#esencia")}
            className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer"
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
            <div className="flex flex-col">
              <div className="h-[22px] md:h-[26px] flex items-center">
                <LogoTexto
                  className="h-full w-auto transition-transform duration-300 group-hover:scale-[1.02]"
                  preserveAspectRatio="xMinYMid meet"
                  fill={isLight ? (isRestaurante ? "#2A1B14" : "#1C231A") : "#F5F2ED"}
                />
              </div>
              <span
                className={`text-[7px] md:text-[8px] tracking-[0.3em] uppercase mt-0.5 font-mono ${
                  isRestaurante ? (isLight ? "text-[#A45D41]" : "text-[#D48B6A]") : "text-[#8D996E]"
                }`}
              >
                {isRestaurante ? t.nav.taglineRestaurante : t.nav.taglineChalets}
              </span>
            </div>
          </a>

          {/* Enlaces de Navegación Compactos & Elegantes */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`text-[11px] tracking-[0.16em] uppercase transition-colors relative py-1 group ${
                  isLight
                    ? isRestaurante
                      ? "text-[#2A1B14]/80 hover:text-[#A45D41]"
                      : "text-[#1C231A]/80 hover:text-[#8D996E]"
                    : isRestaurante
                    ? "text-[#F5F2ED]/75 hover:text-[#D48B6A]"
                    : "text-[#F5F2ED]/75 hover:text-[#8D996E]"
                }`}
              >
                <span>{link.name}</span>
                <span
                  className={`absolute bottom-0 left-0 w-0 h-[1px] ${
                    isRestaurante ? "bg-[#A45D41]" : "bg-[#8D996E]"
                  } group-hover:w-full transition-all duration-300`}
                />
              </a>
            ))}
          </nav>

          {/* Botones de Control: Idioma, Modo Claro/Oscuro, Umbral, Reservar */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Selector de Idioma (ES / EN) */}
            <LanguageSwitch isRestaurante={isRestaurante} className="hidden sm:inline-flex" />

            {/* Switch de Modo Claro / Oscuro */}
            <ThemeSwitch isRestaurante={isRestaurante} />

            {onOpenThreshold && (
              <button
                onClick={onOpenThreshold}
                className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 glass-panel-dark cursor-pointer group shadow-sm ${
                  isRestaurante
                    ? "border border-[#A45D41]/35 hover:border-[#A45D41]/75"
                    : "border border-[#8D996E]/30 hover:border-[#8D996E]/70"
                } ${isLight ? "text-[#1C231A]" : "text-[#F5F2ED]/85 hover:text-[#F5F2ED]"}`}
                title="Cambiar entre Chalets, Restaurante y Explorar Todo"
              >
                <Sparkles className="w-3 h-3 text-[#A45D41] transition-transform duration-300 group-hover:rotate-45" />
                <span>
                  {activeWorld === "chalets"
                    ? t.nav.chaletsName
                    : activeWorld === "restaurante"
                    ? t.nav.restaurantName
                    : t.nav.sanctuaryName}
                </span>
                <span
                  className={`text-[8px] uppercase opacity-70 group-hover:opacity-100 font-sans ${
                    isRestaurante ? "text-[#D48B6A]" : "text-[#8D996E]"
                  }`}
                >
                  · {t.nav.switch}
                </span>
              </button>
            )}

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-[10px] md:text-[11px] font-semibold tracking-[0.16em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <Compass className="w-3 h-3" />
              <span>{t.nav.book}</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-1.5 rounded-full glass-panel-dark focus:outline-none cursor-pointer ${
                isLight ? "text-[#1C231A]" : "text-[#F5F2ED]"
              }`}
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-2xl transition-all duration-300 lg:hidden flex flex-col justify-center px-8 ${
          isLight
            ? isRestaurante
              ? "bg-[#F8F3ED]/98 text-[#2A1B14]"
              : "bg-[#F5F2EA]/98 text-[#1C231A]"
            : isRestaurante
            ? "bg-[#1C1512]/98 text-[#F5F2ED]"
            : "bg-[#151D14]/98 text-[#F5F2ED]"
        } ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-start gap-3.5 max-w-xs mx-auto w-full">
          <div className="flex items-center justify-between w-full pb-2 border-b border-[#8D996E]/20">
            <span
              className={`text-[10px] uppercase tracking-[0.3em] font-mono ${
                isRestaurante ? "text-[#D48B6A]" : "text-[#8D996E]"
              }`}
            >
              {t.nav.navIndex}
            </span>
            <div className="flex items-center gap-2">
              <LanguageSwitch isRestaurante={isRestaurante} />
              <ThemeSwitch isRestaurante={isRestaurante} />
            </div>
          </div>

          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={`text-lg font-light tracking-[0.12em] transition-colors flex items-baseline gap-2.5 ${
                isLight
                  ? "text-[#1C231A] hover:text-[#A45D41]"
                  : "text-[#F5F2ED] hover:text-[#A45D41]"
              }`}
            >
              <span
                className={`text-xs font-mono ${
                  isRestaurante ? "text-[#D48B6A]" : "text-[#8D996E]"
                }`}
              >
                0{idx + 1}
              </span>
              <span>{link.name}</span>
            </a>
          ))}

          {onOpenThreshold && (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenThreshold();
              }}
              className={`text-xs uppercase tracking-[0.18em] font-mono transition-colors flex items-center gap-2 mt-2 pt-2 border-t w-full cursor-pointer ${
                isRestaurante
                  ? "text-[#D48B6A] hover:text-[#A45D41] border-[#A45D41]/25"
                  : "text-[#8D996E] hover:text-[#A45D41] border-[#8D996E]/20"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A45D41]" />
              <span>
                {t.nav.switch} (
                {activeWorld === "chalets"
                  ? t.nav.chaletsName
                  : activeWorld === "restaurante"
                  ? t.nav.restaurantName
                  : t.nav.sanctuaryName}
                )
              </span>
            </button>
          )}

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full mt-3 py-3 rounded-full text-center text-xs font-semibold tracking-[0.2em] uppercase bg-[#A45D41] text-[#F5F2ED] hover:bg-[#bd7356] transition-colors shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {activeWorld === "restaurante" ? t.nav.bookTable : t.nav.bookChalet}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
