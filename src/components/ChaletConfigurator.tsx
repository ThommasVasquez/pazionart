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
      id: "niebla-fuego",
      name: "Chalet Niebla & Fuego",
      code: "CH-01",
      tagline: "El corazón cálido entre las nubes andinas",
      basePrice: "$240 USD",
      area: "78 m² + 32 m² Deck",
      capacity: "2 Huéspedes (Adults Only)",
      orientation: "Sureste · Luz dorada del amanecer",
      thermal: "Bioclimático con doble acristalamiento térmico",
      views: {
        exterior: "/images/hero-chalet.jpg",
        interior: "/images/chalet-interior.jpg",
        deck: "/images/experiencia-pausa.jpg",
      },
      story:
        "Erigido sobre pilotes de madera maciza para flotar sobre el sotobosque. Su chimenea de piedra tallada a mano es el núcleo del chalet, rodeada por ventanales que convierten la niebla en un cuadro vivo.",
      highlights: [
        { label: "Chimenea Viva", desc: "Leña nativa de poda sustentable" },
        { label: "Ritual Pour-Over", desc: "Café de origen con agua de manantial" },
        { label: "Cama King Lino", desc: "Textiles artesanales sin tintes químicos" },
        { label: "Firepit Privado", desc: "Fuego bajo las estrellas en terraza" },
      ],
    },
    {
      id: "bosque-andino",
      name: "Chalet Bosque Andino",
      code: "CH-02",
      tagline: "Inmersión biofílica en el corazón del cedro",
      basePrice: "$280 USD",
      area: "85 m² + 40 m² Deck",
      capacity: "2 a 3 Huéspedes",
      orientation: "Este · Vista directa al valle de bruma",
      thermal: "Aislamiento en lana natural y piedra volcánica",
      views: {
        exterior: "/images/chalet-interior.jpg",
        interior: "/images/hero-chalet.jpg",
        deck: "/images/experiencia-pausa.jpg",
      },
      story:
        "Ubicado en la cota más silenciosa de la reserva. Cuenta con una tina caliente esculpida en barro cocido en la terraza exterior, ideal para baños de inmersión contemplando los helechos arborescentes.",
      highlights: [
        { label: "Tina Caliente de Barro", desc: "Infusión de hierbas medicinales" },
        { label: "Ducha Panorámica", desc: "Vista al cañón con privacidad total" },
        { label: "Espacio de Meditación", desc: "Deck de madera de teca aromática" },
        { label: "Huerta Consciente", desc: "Desayuno campesino cosechado a diario" },
      ],
    },
    {
      id: "refugio-arte",
      name: "Chalet El Refugio de Arte",
      code: "CH-03",
      tagline: "Santuario de creación y pausa reflexiva",
      basePrice: "$220 USD",
      area: "70 m² + 25 m² Deck",
      capacity: "1 a 2 Huéspedes",
      orientation: "Noreste · Luz cenital difusa para artistas",
      thermal: "Muros acústicos para concentración absoluta",
      views: {
        exterior: "/images/experiencia-pausa.jpg",
        interior: "/images/chalet-interior.jpg",
        deck: "/images/hero-chalet.jpg",
      },
      story:
        "Concebido para escritores, creadores y viajeros que buscan reencontrarse con su voz interior. Equipado con un escritorio de roble recuperado, pequeña biblioteca de arte latinoamericano y torno de alfarería.",
      highlights: [
        { label: "Taller & Escritorio", desc: "Materiales de dibujo y arcilla local" },
        { label: "Silencio Fértil", desc: "Cero contaminación lumínica o sonora" },
        { label: "Balcón Volado", desc: "Mirador de aves andinas matutino" },
        { label: "Colección Cerámica", desc: "Piezas de maestros de la región" },
      ],
    },
  ];

  const currentChalet = chalets[selectedId];

  return (
    <div ref={chaletRef} className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center py-4">
      {/* Top Bar Editorial */}
      <div className={`flex flex-col md:flex-row md:items-end justify-between mb-4 pb-3 border-b transition-colors ${
        isLight ? "border-[#8D996E]/20" : "border-[#8D996E]/20"
      }`}>
        <div className="chalet-header">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-[#A45D41] tracking-widest uppercase">
              {t.configurator.tag}
            </span>
            <span className="text-[#8D996E]/40">•</span>
            <span className={`text-[10px] font-mono tracking-widest uppercase ${
              isLight ? "text-[#5B6D49]" : "text-[#8D996E]"
            }`}>
              3 Refugios Exclusivos
            </span>
          </div>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-light tracking-wide font-sans ${
            isLight ? "text-[#1A2219]" : "text-[#F5F2ED]"
          }`}>
            {t.configurator.title}{" "}
            <span className="font-serif italic text-[#A45D41]">{t.configurator.chaletsWord}</span>
          </h2>
        </div>

        {/* Selector de Chalet en pestañas estilizadas */}
        <div className={`chalet-tab-pills flex items-center gap-1.5 mt-3 md:mt-0 p-1 rounded-full border transition-colors ${
          isLight
            ? "bg-white/80 border-[#8D996E]/25 shadow-sm"
            : "glass-panel-dark border-[#8D996E]/20"
        }`}>
          {chalets.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => handleSelectChalet(idx)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                selectedId === idx
                  ? "bg-[#A45D41] text-[#F5F2ED] shadow-md shadow-[#A45D41]/30 font-medium"
                  : isLight
                  ? "text-[#1A2219]/60 hover:text-[#1A2219]"
                  : "text-[#F5F2ED]/60 hover:text-[#F5F2ED]"
              }`}
            >
              {ch.code}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Columna Izquierda: Visor Fotográfico con Selector de Ángulo */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div
            className={`chalet-visor relative aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-2xl group ${
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
                {currentChalet.code} · {currentChalet.area}
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

          {/* Micro-specs de arquitectura bioclimática */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-3">
            <div className={`chalet-spec-card p-2.5 rounded-xl border transition-colors ${
              isLight
                ? "bg-white/80 border-[#8D996E]/20 text-[#1A2219]"
                : "glass-panel-dark border-[#8D996E]/15 text-[#F5F2ED]"
            }`}>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8D996E] uppercase mb-0.5">
                <SunMedium className="w-3 h-3 text-[#A45D41]" />
                <span>Orientación</span>
              </div>
              <p className={`text-[11px] font-light truncate ${
                isLight ? "text-[#1A2219]/80" : "text-[#F5F2ED]/80"
              }`}>
                {currentChalet.orientation}
              </p>
            </div>

            <div className={`chalet-spec-card p-2.5 rounded-xl border transition-colors ${
              isLight
                ? "bg-white/80 border-[#8D996E]/20 text-[#1A2219]"
                : "glass-panel-dark border-[#8D996E]/15 text-[#F5F2ED]"
            }`}>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8D996E] uppercase mb-0.5">
                <Wind className="w-3 h-3 text-[#8D996E]" />
                <span>Confort Térmico</span>
              </div>
              <p className={`text-[11px] font-light truncate ${
                isLight ? "text-[#1A2219]/80" : "text-[#F5F2ED]/80"
              }`}>
                {currentChalet.thermal}
              </p>
            </div>

            <div className={`chalet-spec-card p-2.5 rounded-xl border col-span-2 sm:col-span-1 transition-colors ${
              isLight
                ? "bg-white/80 border-[#8D996E]/20 text-[#1A2219]"
                : "glass-panel-dark border-[#8D996E]/15 text-[#F5F2ED]"
            }`}>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8D996E] uppercase mb-0.5">
                <ShieldCheck className="w-3 h-3 text-[#A45D41]" />
                <span>Privacidad</span>
              </div>
              <p className={`text-[11px] font-light truncate ${
                isLight ? "text-[#1A2219]/80" : "text-[#F5F2ED]/80"
              }`}>
                Aislado a 60m del chalet más próximo
              </p>
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
