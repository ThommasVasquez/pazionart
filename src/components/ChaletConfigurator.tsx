"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  Flame,
  Coffee,
  Maximize2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Layers,
  SunMedium,
  Wind,
  Check,
} from "lucide-react";
import { startSafeViewTransition } from "@/lib/viewTransition";
import { usePreferences } from "@/context/PreferencesContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ChaletConfiguratorProps {
  onSelectBooking: (chaletName: string, nights: number) => void;
}

export default function ChaletConfigurator({ onSelectBooking }: ChaletConfiguratorProps) {
  const { theme, t } = usePreferences();
  const isLight = theme === "light";

  const [selectedId, setSelectedId] = useState(0);
  const [activeView, setActiveView] = useState<"exterior" | "interior" | "deck">("exterior");
  const [nights, setNights] = useState(2);
  const chaletRef = useRef<HTMLDivElement>(null);

  const handleSelectChalet = (idx: number) => {
    startSafeViewTransition(() => {
      setSelectedId(idx);
    });
  };

  const handleSelectView = (view: "exterior" | "interior" | "deck") => {
    startSafeViewTransition(() => {
      setActiveView(view);
    });
  };

  useEffect(() => {
    if (!chaletRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: chaletRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".chalet-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          ".chalet-tab-pills",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".chalet-visor",
          { opacity: 0, y: 50, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0 },
          "-=0.5"
        )
        .fromTo(
          ".chalet-spec-card",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.6"
        )
        .fromTo(
          ".chalet-right-panel",
          { opacity: 0, y: 45, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          ".chalet-highlight",
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.06 },
          "-=0.5"
        )
        .fromTo(
          ".chalet-estimator",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );
    }, chaletRef);

    return () => ctx.revert();
  }, []);

  const chalets = [
    {
      id: "chalet-susurros",
      name: "Chalet Susurros",
      tagline: "Pabellón de cristal con jacuzzi privado y vista a la naturaleza",
      basePrice: "$280.000 COP",
      area: "Pabellón Panorámico + Deck con Jacuzzi",
      capacity: "2 Huéspedes · 1 Cama Doble",
      orientation: "Noreste · Amanecer sobre la naturaleza de montaña",
      thermal: "Acristalamiento panorámico con cortinajes térmicos",
      views: {
        exterior: "/images/gallery/susurros-fachada.jpg",
        interior: "/images/gallery/susurros-suite.jpg",
        deck: "/images/gallery/susurros-jacuzzi.jpg",
      },
      story:
        "Diseñado como un santuario de intimidad y descanso para disfrutar con los que uno más quiere. Su estructura acristalada sumerge la habitación en la serenidad de la naturaleza, mientras su terraza exterior acoge un jacuzzi privado con agua caliente y espuma aromatizada entre los árboles.",
      highlights: [
        { label: "Jacuzzi Privado", desc: "En terraza exterior con espuma y pétalos de rosa" },
        { label: "Cama Doble Panorámica", desc: "Rodeada de ventanales y dosel de lino blanco" },
        { label: "Cocina Semi Integral", desc: "Nevera, fogón y dotación para parejas" },
        { label: "Baño con Agua Caliente", desc: "Cabina de ducha moderna y acabados rústicos" },
      ],
    },
    {
      id: "chalet-aroma",
      name: "Chalet Aroma",
      tagline: "Arquitectura A-Frame clásica entre jardines y palmeras",
      basePrice: "$200.000 COP",
      area: "Doble nivel con altillo + Jardín exterior",
      capacity: "4 a 6 Huéspedes · 2 Camas Dobles",
      orientation: "Oeste · Luz dorada del atardecer en ventanales",
      thermal: "Madera natural de pino y teca con piso lustrado",
      views: {
        exterior: "/images/gallery/aroma-jardin.jpg",
        interior: "/images/gallery/aroma-altillo-edison.jpg",
        deck: "/images/gallery/aroma-ventanal-jardin.jpg",
      },
      story:
        "Una cabaña alpina clásica con estructura A-Frame que celebra la calidez de la madera y el encuentro con los que uno más quiere. Su altillo ofrece iluminación vintage de filamento Edison y amplios ventanales que abren hacia un jardín privado con palmeras andinas y sendero de piedra blanca.",
      highlights: [
        { label: "2 Camas Dobles", desc: "Capacidad para 4 personas (hasta 6 huéspedes)" },
        { label: "Lámparas Edison", desc: "Iluminación cálida colgante sobre sala en madera" },
        { label: "Cocina Equipada", desc: "Semi-integral con nevera, fogón y utensilios" },
        { label: "Ducha Panorámica", desc: "Lavamanos en mesón de madera viva y agua caliente" },
      ],
    },
    {
      id: "chalet-bruma",
      name: "Chalet Bruma",
      tagline: "Refugio alpino en el corazón de la naturaleza de montaña",
      basePrice: "$220.000 COP",
      area: "Doble nivel con altillo + Zona verde con columpio",
      capacity: "4 a 6 Huéspedes · 2 Camas Dobles",
      orientation: "Norte · Vista a la montaña y el aire puro andino",
      thermal: "Estructura de madera aislante y techos altos inclinados",
      views: {
        exterior: "/images/gallery/bruma-fachada-columpio.jpg",
        interior: "/images/gallery/bruma-cama-altillo.jpg",
        deck: "/images/gallery/bruma-sala-cuero.jpg",
      },
      story:
        "Emplazado en el punto donde la bruma desciende cada tarde sobre el valle andino. Rodeado de flores de jardín, cuenta con su propio columpio rústico al aire libre y una acogedora sala con ventanal corredizo de suelo a techo.",
      highlights: [
        { label: "Altillo Rústico", desc: "Dormitorio acogedor bajo las vigas de madera" },
        { label: "Columpio Privado", desc: "Zona exterior en césped con mesa rústica" },
        { label: "Sala con Sofá de Cuero", desc: "Pisos en madera brillante y ventanal al jardín" },
        { label: "Cocina & Baño Caliente", desc: "Equipamiento completo para estadías familiares" },
      ],
    },
  ];

  const currentChalet = chalets[selectedId];

  return (
    <div ref={chaletRef} className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center py-4">
      {/* Top Bar Editorial */}
      <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-4 pb-3 border-b transition-colors ${
        isLight ? "border-[#8D996E]/20" : "border-[#8D996E]/20"
      }`}>
        <div className="chalet-header">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-[#A45D41] tracking-widest uppercase">
              03 · Refugios de Altura
            </span>
            <span className="text-[#8D996E]/40">•</span>
            <span className={`text-[10px] font-mono tracking-widest uppercase ${
              isLight ? "text-[#5B6D49]" : "text-[#8D996E]"
            }`}>
              Colección Exclusiva
            </span>
          </div>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-light tracking-wide font-sans ${
            isLight ? "text-[#1A2219]" : "text-[#F5F2ED]"
          }`}>
            {t.configurator.title}{" "}
            <span className="italic font-normal text-[#A45D41]">{t.configurator.chaletsWord}</span>
          </h2>
        </div>
      </div>

      {/* Selector de Chalets con Foto para dar máximo protagonismo a los tres */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {chalets.map((ch, idx) => {
          const isSelected = selectedId === idx;
          return (
            <button
              key={ch.id}
              onClick={() => handleSelectChalet(idx)}
              className={`group relative flex items-center gap-3.5 p-2 sm:p-2.5 rounded-2xl border transition-all duration-300 text-left cursor-pointer ${
                isSelected
                  ? "bg-[#A45D41]/20 border-[#A45D41] shadow-xl shadow-[#A45D41]/20 ring-1 ring-[#A45D41]"
                  : isLight
                  ? "bg-white/80 border-[#8D996E]/25 hover:border-[#8D996E]/60 shadow-sm hover:bg-white"
                  : "glass-panel-dark border-[#8D996E]/15 hover:border-[#8D996E]/40 hover:bg-[#151D14]/90"
              }`}
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-md">
                <Image
                  src={ch.views.exterior}
                  alt={ch.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-[#A45D41]/40 backdrop-blur-[1px] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white drop-shadow" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className={`text-[9px] font-mono uppercase tracking-widest block truncate ${
                  isSelected ? "text-[#D48B6A] font-semibold" : "text-[#8D996E]"
                }`}>
                  Refugio 0{idx + 1} · {ch.capacity.split("·")[0].trim()}
                </span>
                <h3 className={`text-sm sm:text-base font-medium tracking-tight truncate ${
                  isSelected
                    ? "text-[#F5F2ED] font-semibold"
                    : isLight
                    ? "text-[#1A2219]"
                    : "text-[#F5F2ED]/90"
                }`}>
                  {ch.name}
                </h3>
                <p className={`text-[11px] font-light truncate mt-0.5 ${
                  isSelected ? "text-[#F5F2ED]/80" : isLight ? "text-[#1A2219]/60" : "text-[#F5F2ED]/60"
                }`}>
                  {ch.basePrice} <span className="text-[9px] font-mono">/ noche</span>
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Columna Izquierda: Visor Fotográfico con Selector de Ángulo */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          <div
            className={`chalet-visor relative aspect-[16/11] lg:aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-2xl group ${
              isLight ? "border border-[#8D996E]/30" : "border border-[#8D996E]/25"
            }`}
            data-cursor="explore"
            style={{ viewTransitionName: "chalet-active-photo" }}
          >
            <Image
              src={currentChalet.views[activeView]}
              alt={`${currentChalet.name} - ${activeView}`}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#212B20]/90 via-[#212B20]/20 to-transparent" />

            {/* Badges superiores sobre la imagen */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-mono tracking-wider text-[#F5F2ED] uppercase">
                {currentChalet.name} · {currentChalet.area}
              </span>

              {/* Angle View Selector */}
              <div className="flex items-center gap-1 p-1 rounded-full glass-panel-dark text-[10px] font-mono">
                {(["exterior", "interior", "deck"] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => handleSelectView(view)}
                    className={`px-2.5 py-1 rounded-full capitalize transition-all cursor-pointer ${
                      activeView === view
                        ? "bg-[#8D996E] text-[#212B20] font-semibold"
                        : "text-[#F5F2ED]/70 hover:text-[#F5F2ED]"
                    }`}
                  >
                    {view === "exterior" ? t.configurator.facade : view === "interior" ? t.configurator.interior : t.configurator.deck}
                  </button>
                ))}
              </div>
            </div>

            {/* Info inferior sobre la imagen */}
            <div className="absolute bottom-4 left-5 right-5">
              <span className="text-[10px] font-mono text-[#8D996E] tracking-widest uppercase">
                {currentChalet.tagline}
              </span>
              <h3 className="text-xl sm:text-2xl font-light text-[#F5F2ED]">
                {currentChalet.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta de Cotización y Experiencias del Chalet */}
        <div className={`chalet-right-panel lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl border transition-colors ${
          isLight
            ? "bg-white/85 border-[#8D996E]/25 text-[#1A2219] shadow-xl"
            : "glass-panel-dark border-[#8D996E]/20 text-[#F5F2ED]"
        }`}>
          <div>
            {/* Story */}
            <p className={`text-xs font-light leading-relaxed mb-4 ${
              isLight ? "text-[#1A2219]/80" : "text-[#F5F2ED]/80"
            }`}>
              {currentChalet.story}
            </p>

            {/* Cuatro Highlights */}
            <div className="space-y-2 mb-5">
              {currentChalet.highlights.map((h) => (
                <div
                  key={h.label}
                  className={`chalet-highlight flex items-start gap-2.5 p-2 rounded-xl transition-colors ${
                    isLight ? "hover:bg-[#8D996E]/15" : "hover:bg-[#8D996E]/10"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A45D41] mt-1.5 shrink-0" />
                  <div>
                    <span className={`text-xs font-medium block ${
                      isLight ? "text-[#1A2219]" : "text-[#F5F2ED]"
                    }`}>
                      {h.label}
                    </span>
                    <span className={`text-[11px] font-light ${
                      isLight ? "text-[#1A2219]/65" : "text-[#F5F2ED]/60"
                    }`}>
                      {h.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Stay Estimator Box */}
          <div className={`chalet-estimator p-4 rounded-2xl border transition-colors ${
            isLight
              ? "bg-[#F7F5EE] border-[#8D996E]/25 shadow-sm"
              : "bg-[#151D14]/80 border-[#8D996E]/20"
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className={`text-[10px] font-mono tracking-wider uppercase block ${
                  isLight ? "text-[#5B6D49]" : "text-[#8D996E]"
                }`}>
                  {t.configurator.totalEstimate}
                </span>
                <span className={`text-lg font-light ${
                  isLight ? "text-[#1A2219]" : "text-[#F5F2ED]"
                }`}>
                  {currentChalet.basePrice}{" "}
                  <span className={`text-xs font-mono ${isLight ? "text-[#1A2219]/50" : "text-[#F5F2ED]/50"}`}>
                    / noche
                  </span>
                </span>
              </div>

              {/* Selector de Noches */}
              <div className={`flex items-center gap-1 p-1 rounded-xl border ${
                isLight
                  ? "bg-white border-[#8D996E]/25"
                  : "bg-[#212B20] border-[#8D996E]/30"
              }`}>
                {[1, 2, 3, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setNights(n)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono cursor-pointer transition-all ${
                      nights === n
                        ? "bg-[#8D996E] text-[#212B20] font-bold"
                        : isLight
                        ? "text-[#1A2219]/60 hover:text-[#1A2219]"
                        : "text-[#F5F2ED]/60 hover:text-[#F5F2ED]"
                    }`}
                  >
                    {n}N
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectBooking(currentChalet.name, nights)}
              data-cursor="reserve"
              className="w-full py-3.5 rounded-xl text-xs font-semibold tracking-[0.2em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{t.configurator.bookBtn} · {nights} {nights === 1 ? (t.common ? "Noche" : "Night") : (t.common ? "Noches" : "Nights")}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
