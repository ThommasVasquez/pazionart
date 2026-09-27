"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Compass, UtensilsCrossed, ChevronDown, Sparkles } from "lucide-react";
import gsap from "gsap";
import LogoTexto from "./LogoTexto";

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

  // Animación de salida cinematográfica cuando el usuario elige un mundo
  const handleChoice = (world: "chalets" | "restaurante" | "explore") => {
    if (!containerRef.current) {
      onSelectWorld(world);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onSelectWorld(world);
      },
    });

    if (world === "chalets") {
      // Chalets se expande a pantalla completa y el restaurante se desliza a la derecha
      tl.to(restauranteColRef.current, {
        xPercent: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut",
      })
        .to(
          chaletsColRef.current,
          {
            width: "100%",
            duration: 0.8,
            ease: "power3.inOut",
          },
          "<"
        )
        .to(
          centerMedallionRef.current,
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          },
          "<"
        )
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
    } else if (world === "restaurante") {
      // Restaurante se expande y chalets se desliza a la izquierda
      tl.to(chaletsColRef.current, {
        xPercent: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut",
      })
        .to(
          restauranteColRef.current,
          {
            width: "100%",
            duration: 0.8,
            ease: "power3.inOut",
          },
          "<"
        )
        .to(
          centerMedallionRef.current,
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          },
          "<"
        )
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
    } else {
      // Explorar todo: Ambos paneles se abren como cortinas hacia los lados
      tl.to(chaletsColRef.current, {
        xPercent: -100,
        duration: 0.8,
        ease: "power3.inOut",
      })
        .to(
          restauranteColRef.current,
          {
            xPercent: 100,
            duration: 0.8,
            ease: "power3.inOut",
          },
          "<"
        )
        .to(
          centerMedallionRef.current,
          {
            scale: 1.2,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
          },
          "<"
        )
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
        });
    }
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
      className="fixed inset-0 z-50 flex flex-col md:flex-row bg-[#151D14] overflow-hidden select-none"
    >
      {/* ========================================================
          PANEL IZQUIERDO: CHALETS & REFUGIO
          ======================================================== */}
      <div
        ref={chaletsColRef}
        onMouseEnter={() => setHoveredSide("chalets")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => handleChoice("chalets")}
        className={`relative h-1/2 md:h-full transition-all duration-700 ease-out cursor-pointer overflow-hidden group flex flex-col justify-end p-8 md:p-16 ${
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

        {/* Contenido Editorial Chalets */}
        <div className="relative z-10 max-w-lg transition-transform duration-500 group-hover:translate-y-[-6px]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-dark text-[9px] md:text-[10px] font-mono tracking-[0.25em] text-[#8D996E] uppercase mb-3 border border-[#8D996E]/25">
            <Compass className="w-3 h-3 text-[#8D996E]" />
            <span>Refugio & Hospitalidad</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.08em] text-[#F5F2ED] uppercase font-sans mb-3 drop-shadow-lg">
            Chalets de Altura
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#F5F2ED]/85 font-light leading-relaxed mb-6 max-w-md drop-shadow">
            Cabañas de arquitectura orgánica suspendidas en la niebla. Diseñadas para la pausa consciente, la intimidad y la reconexión con el bosque.
          </p>

          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase bg-[#8D996E] hover:bg-[#a2af7e] text-[#151D14] transition-all duration-300 shadow-xl group-hover:shadow-[0_0_25px_rgba(141,153,110,0.4)]">
            <span>Entrar a Chalets</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        {/* Resplandor lateral en hover */}
        <div className="absolute inset-0 border-r border-[#8D996E]/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* ========================================================
          PANEL DERECHO: RESTAURANTE & FOGÓN DE ORIGEN
          ======================================================== */}
      <div
        ref={restauranteColRef}
        onMouseEnter={() => setHoveredSide("restaurante")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => handleChoice("restaurante")}
        className={`relative h-1/2 md:h-full transition-all duration-700 ease-out cursor-pointer overflow-hidden group flex flex-col justify-end p-8 md:p-16 ${
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
          {/* Velo de Fusión Tonal Noche/Alma (#151D14 / #A45D41) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#151D14] via-[#1F1916]/65 to-[#1F1916]/30" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#151D14]/70 via-transparent to-black/50" />
        </div>

        {/* Contenido Editorial Restaurante */}
        <div className="relative z-10 max-w-lg transition-transform duration-500 group-hover:translate-y-[-6px]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-dark text-[9px] md:text-[10px] font-mono tracking-[0.25em] text-[#A45D41] uppercase mb-3 border border-[#A45D41]/30">
            <UtensilsCrossed className="w-3 h-3 text-[#A45D41]" />
            <span>Cocina de Origen & Brasa</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.08em] text-[#F5F2ED] uppercase font-sans mb-3 drop-shadow-lg">
            Restaurante & Fogón
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#F5F2ED]/85 font-light leading-relaxed mb-6 max-w-md drop-shadow">
            El ritual sagrado del fuego vivo y la vajilla artesanal de barro. Gastronomía campesina de autor nacida de los huertos de montaña.
          </p>

          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl group-hover:shadow-[0_0_25px_rgba(164,93,65,0.4)]">
            <span>Entrar al Restaurante</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        {/* Resplandor lateral en hover */}
        <div className="absolute inset-0 border-l border-[#A45D41]/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* ========================================================
          MEDALLÓN CENTRAL: EL EJE DE PAZIONART
          ======================================================== */}
      <div
        ref={centerMedallionRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center"
      >
        <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#151D14]/90 backdrop-blur-2xl border border-[#8D996E]/40 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] p-4 group-hover:scale-105 transition-transform duration-500">
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
        <div className="h-4 md:h-5 mt-2 drop-shadow-md">
          <LogoTexto className="h-full w-auto" fill="#F5F2ED" />
        </div>
        <span className="text-[8px] md:text-[9px] font-mono tracking-[0.3em] uppercase text-[#8D996E] mt-1">
          Dos Almas · Un Santuario
        </span>
      </div>

      {/* ========================================================
          BOTÓN INFERIOR: EXPLORAR TODO EL SANTUARIO
          ======================================================== */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleChoice("explore");
          }}
          className="group inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel-dark border border-[#F5F2ED]/15 text-[#F5F2ED]/75 hover:text-[#F5F2ED] hover:border-[#8D996E]/40 transition-all duration-300 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.22em] shadow-lg cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#8D996E] transition-transform duration-300 group-hover:rotate-45" />
          <span>Explorar Todo el Santuario</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#8D996E] animate-bounce" />
        </button>
      </div>
    </div>
  );
}
