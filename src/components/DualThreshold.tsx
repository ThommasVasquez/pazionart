"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Compass, UtensilsCrossed, ChevronDown, Sparkles } from "lucide-react";
import gsap from "gsap";
import LogoTexto from "./LogoTexto";

import { startSafeViewTransition } from "@/lib/viewTransition";

import { usePreferences } from "@/context/PreferencesContext";

interface DualThresholdProps {
  isOpen: boolean;
  onSelectWorld: (world: "chalets" | "restaurante" | "explore") => void;
}

export default function DualThreshold({ isOpen, onSelectWorld }: DualThresholdProps) {
  const [hoveredSide, setHoveredSide] = useState<"chalets" | "restaurante" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chaletsColRef = useRef<HTMLDivElement>(null);
  const restauranteColRef = useRef<HTMLDivElement>(null);
  const centerMedallionRef = useRef<HTMLDivElement>(null);
  const { t, theme } = usePreferences();
  const isLight = theme === "light";

  // Transición cinematográfica fluida y orgánica usando la API nativa de View Transitions
  const handleChoice = (world: "chalets" | "restaurante" | "explore") => {
    // 1. Asignar dinámicamente nombres de transición para que la imagen elegida se expanda al hero
    if (chaletsColRef.current && restauranteColRef.current) {
      const chaletImg = chaletsColRef.current.querySelector("img");
      const restImg = restauranteColRef.current.querySelector("img");

      if (world === "chalets" || world === "explore") {
        if (chaletImg) (chaletImg as HTMLElement).style.viewTransitionName = "hero-sanctuary-image";
        if (restImg) (restImg as HTMLElement).style.viewTransitionName = "none";
      } else if (world === "restaurante") {
        if (restImg) (restImg as HTMLElement).style.viewTransitionName = "hero-sanctuary-image";
        if (chaletImg) (chaletImg as HTMLElement).style.viewTransitionName = "none";
      }
    }

    // 2. Conectar el símbolo y el imagotipo central para que se trasladen suavemente a su lugar en el Hero
    if (centerMedallionRef.current) {
      const symbolImg = centerMedallionRef.current.querySelector("img");
      if (symbolImg) (symbolImg as HTMLElement).style.viewTransitionName = "hero-brand-symbol";
      const logoEl = centerMedallionRef.current.querySelector(".medallion-logo-wrapper");
      if (logoEl) (logoEl as HTMLElement).style.viewTransitionName = "hero-brand-logo";
    }

    // 3. Ejecutar la transición de vistas sin recarga ni saltos bruscos
    startSafeViewTransition(() => {
      onSelectWorld(world);
    });
  };

  // Animación de entrada inicial suave
  useEffect(() => {
    if (isOpen && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" }
      );
      if (centerMedallionRef.current) {
        gsap.fromTo(
          centerMedallionRef.current,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, delay: 0.2, ease: "back.out(1.4)" }
        );
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex flex-col md:flex-row overflow-hidden select-none transition-colors duration-500 ${
        isLight ? "bg-[#FAF7F2]" : "bg-[#151D14]"
      }`}
    >

      {/* ========================================================
          PANEL ARRIBA (MÓVIL) / IZQUIERDA (DESKTOP): CHALETS
          ======================================================== */}
      <div
        ref={chaletsColRef}
        onMouseEnter={() => setHoveredSide("chalets")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => handleChoice("chalets")}
        className={`relative h-1/2 md:h-full transition-all duration-700 ease-out cursor-pointer overflow-hidden group flex flex-col justify-start pt-8 sm:pt-12 md:justify-end md:pb-16 p-6 sm:p-10 md:p-16 border-b border-[#8D996E]/20 md:border-b-0 md:border-r border-[#8D996E]/30 ${
          hoveredSide === "chalets"
            ? "md:w-[58%]"
            : hoveredSide === "restaurante"
            ? "md:w-[42%]"
            : "md:w-1/2"
        }`}
      >
        {/* Imagen de Fondo con Ken Burns suave al hover */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/hero-chalet.jpg"
            alt="Pazionart Chalets de Montaña"
            fill
            priority
            className="object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out brightness-[0.75] group-hover:brightness-[0.9]"
          />
          {/* Velo de Fusión Tonal Noche/Tierra (#212B20 / #8D996E) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#151D14] via-[#212B20]/60 to-[#212B20]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#151D14]/70 via-transparent to-black/50" />
        </div>

        {/* Contenido Editorial Chalets - Alineado a la Izquierda */}
        <div className="relative z-10 max-w-lg transition-transform duration-500 group-hover:translate-y-[-6px] flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-dark text-[9px] md:text-[10px] font-mono tracking-[0.25em] text-[#8D996E] uppercase mb-2 md:mb-3 border border-[#8D996E]/25">
            <Compass className="w-3 h-3 text-[#8D996E]" />
            <span>{t.threshold.chaletsBadge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-[0.08em] text-[#F5F2ED] uppercase font-sans mb-1.5 md:mb-3 drop-shadow-lg text-left">
            {t.threshold.chaletsTitle}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#F5F2ED]/85 font-light leading-relaxed mb-3 md:mb-6 max-w-md drop-shadow text-left line-clamp-2 md:line-clamp-none">
            {t.threshold.chaletsDesc}
          </p>

          <div className="inline-flex items-center gap-2.5 md:gap-3 px-5 py-2 md:px-6 md:py-2.5 rounded-full text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase bg-[#8D996E] hover:bg-[#a2af7e] text-[#151D14] transition-all duration-300 shadow-xl group-hover:shadow-[0_0_25px_rgba(141,153,110,0.4)]">
            <span>{t.threshold.chaletsBtn}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        {/* Resplandor lateral en hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-radial from-[#8D996E]/10 to-transparent" />
      </div>

      {/* ========================================================
          PANEL ABAJO (MÓVIL) / DERECHA (DESKTOP): RESTAURANTE
          (Todo alineado estrictamente a la DERECHA: texto, icono, botón)
          ======================================================== */}
      <div
        ref={restauranteColRef}
        onMouseEnter={() => setHoveredSide("restaurante")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => handleChoice("restaurante")}
        className={`relative h-1/2 md:h-full transition-all duration-700 ease-out cursor-pointer overflow-hidden group flex flex-col justify-end pb-16 sm:pb-20 md:pb-16 p-6 sm:p-10 md:p-16 items-end text-right ${
          hoveredSide === "restaurante"
            ? "md:w-[58%]"
            : hoveredSide === "chalets"
            ? "md:w-[42%]"
            : "md:w-1/2"
        }`}
      >
        {/* Imagen de Fondo Restaurante */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/restaurante-fogon.jpg"
            alt="Pazionart Restaurante & Fogón de Origen"
            fill
            priority
            className="object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out brightness-[0.75] group-hover:brightness-[0.9]"
          />
          {/* Velo de Fusión Tonal Noche/Alma/Café (#1C1512 / #A45D41) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1512] via-[#241A17]/70 to-[#241A17]/35" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#1C1512]/80 via-transparent to-black/60" />
        </div>

        {/* Contenido Editorial Restaurante - Alineado 100% a la Derecha */}
        <div className="relative z-10 max-w-lg transition-transform duration-500 group-hover:translate-y-[-6px] flex flex-col items-end text-right">
          {/* Badge con icono y texto alineados a la derecha */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-dark text-[9px] md:text-[10px] font-mono tracking-[0.25em] text-[#A45D41] uppercase mb-2 md:mb-3 border border-[#A45D41]/30 ml-auto">
            <span>{t.threshold.restaurantBadge}</span>
            <UtensilsCrossed className="w-3 h-3 text-[#A45D41]" />
          </div>

          {/* Título alineado a la derecha */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-[0.08em] text-[#F5F2ED] uppercase font-sans mb-1.5 md:mb-3 drop-shadow-lg text-right">
            {t.threshold.restaurantTitle}
          </h2>

          {/* Párrafo descriptivo alineado a la derecha */}
          <p className="text-xs sm:text-sm md:text-base text-[#F5F2ED]/85 font-light leading-relaxed mb-3 md:mb-6 max-w-md drop-shadow text-right ml-auto line-clamp-2 md:line-clamp-none">
            {t.threshold.restaurantDesc}
          </p>

          {/* Botón CTA alineado a la derecha */}
          <div className="inline-flex items-center gap-2.5 md:gap-3 px-5 py-2 md:px-6 md:py-2.5 rounded-full text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl group-hover:shadow-[0_0_25px_rgba(164,93,65,0.4)] ml-auto cursor-pointer">
            <span>{t.threshold.restaurantBtn}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        {/* Resplandor lateral en hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-radial from-[#A45D41]/10 to-transparent" />
      </div>

      {/* ========================================================
          MEDALLÓN CENTRAL: EL EJE DE PAZIONART
          ======================================================== */}
      <div
        ref={centerMedallionRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center"
      >
        <div
          className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-28 md:h-28 rounded-full backdrop-blur-2xl border flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] p-2.5 md:p-4 group-hover:scale-105 transition-transform duration-500 ${
            isLight
              ? "bg-[#FFFFFF]/92 border-[#8D996E]/40"
              : "bg-[#151D14]/92 border-[#8D996E]/40"
          }`}
        >
          <div className="absolute inset-0 rounded-full bg-radial from-[#8D996E]/15 to-transparent blur-xl" />
          <div className="relative w-full h-full">
            <Image
              src="/brand/simbolo-pazionart.svg"
              alt="Símbolo Pazionart"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Logo Texto pequeño bajo el medallón */}
        <div className="medallion-logo-wrapper h-3 sm:h-3.5 md:h-5 mt-1 sm:mt-1.5 md:mt-2 drop-shadow-md">
          <LogoTexto className="h-full w-auto" fill={isLight ? "#1A2219" : "#F5F2ED"} />
        </div>
        <span className="text-[7px] sm:text-[8px] md:text-[9px] font-mono tracking-[0.3em] uppercase text-[#8D996E] mt-0.5 sm:mt-1 font-semibold">
          {t.threshold.medallionTag}
        </span>
      </div>

      {/* ========================================================
          BOTÓN INFERIOR: EXPLORAR TODO EL SANTUARIO
          ======================================================== */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleChoice("explore");
          }}
          className={`group inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border transition-all duration-300 text-[9px] sm:text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] shadow-xl cursor-pointer backdrop-blur-md ${
            isLight
              ? "bg-[#FFFFFF]/90 text-[#1C231A] border-[#8D996E]/40 hover:border-[#8D996E]"
              : "bg-[#151D14]/85 text-[#F5F2ED]/85 hover:text-[#F5F2ED] border-[#F5F2ED]/20 hover:border-[#8D996E]/50"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#8D996E] transition-transform duration-300 group-hover:rotate-45" />
          <span>{t.threshold.exploreBtn}</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#8D996E] animate-bounce" />
        </button>
      </div>
    </div>
  );
}
