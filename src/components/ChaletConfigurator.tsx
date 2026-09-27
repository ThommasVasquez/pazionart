"use client";

import { useState } from "react";
import Image from "next/image";
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

interface ChaletConfiguratorProps {
  onSelectBooking: (chaletName: string, nights: number) => void;
}

export default function ChaletConfigurator({ onSelectBooking }: ChaletConfiguratorProps) {
  const [selectedId, setSelectedId] = useState(0);
  const [activeView, setActiveView] = useState<"exterior" | "interior" | "deck">("exterior");
  const [nights, setNights] = useState(2);

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
    <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center py-4">
      {/* Top Bar Editorial */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 pb-3 border-b border-[#8D996E]/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-[#A45D41] tracking-widest uppercase">
              [ Colección Arquitectónica 2026 ]
            </span>
            <span className="text-[#8D996E]/40">•</span>
            <span className="text-[10px] font-mono text-[#8D996E] tracking-widest uppercase">
              3 Refugios Exclusivos
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#F5F2ED] tracking-wide font-sans">
            Pazionart <span className="font-serif italic text-[#A45D41]">Chalets</span>
          </h2>
        </div>

        {/* Selector de Chalet en pestañas estilizadas */}
        <div className="flex items-center gap-1.5 mt-3 md:mt-0 p-1 rounded-full glass-panel-dark border border-[#8D996E]/20">
          {chalets.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => setSelectedId(idx)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                selectedId === idx
                  ? "bg-[#A45D41] text-[#F5F2ED] shadow-md shadow-[#A45D41]/30 font-medium"
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
            className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-[#8D996E]/25 shadow-2xl group"
            data-cursor="explore"
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
                    onClick={() => setActiveView(view)}
                    className={`px-2.5 py-1 rounded-full capitalize transition-all cursor-pointer ${
                      activeView === view
                        ? "bg-[#8D996E] text-[#212B20] font-semibold"
                        : "text-[#F5F2ED]/70 hover:text-[#F5F2ED]"
                    }`}
                  >
                    {view === "exterior" ? "Fachada" : view === "interior" ? "Interior" : "Terraza"}
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
            <div className="p-2.5 rounded-xl glass-panel-dark border border-[#8D996E]/15">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8D996E] uppercase mb-0.5">
                <SunMedium className="w-3 h-3 text-[#A45D41]" />
                <span>Orientación</span>
              </div>
              <p className="text-[11px] text-[#F5F2ED]/80 font-light truncate">
                {currentChalet.orientation}
              </p>
            </div>

            <div className="p-2.5 rounded-xl glass-panel-dark border border-[#8D996E]/15">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8D996E] uppercase mb-0.5">
                <Wind className="w-3 h-3 text-[#8D996E]" />
                <span>Confort Térmico</span>
              </div>
              <p className="text-[11px] text-[#F5F2ED]/80 font-light truncate">
                {currentChalet.thermal}
              </p>
            </div>

            <div className="p-2.5 rounded-xl glass-panel-dark border border-[#8D996E]/15 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8D996E] uppercase mb-0.5">
                <ShieldCheck className="w-3 h-3 text-[#A45D41]" />
                <span>Privacidad</span>
              </div>
              <p className="text-[11px] text-[#F5F2ED]/80 font-light truncate">
                Aislado a 60m del chalet más próximo
              </p>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta de Cotización y Experiencias del Chalet */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl glass-panel-dark border border-[#8D996E]/20">
          <div>
            {/* Story */}
            <p className="text-xs text-[#F5F2ED]/80 font-light leading-relaxed mb-4">
              {currentChalet.story}
            </p>

            {/* Cuatro Highlights */}
            <div className="space-y-2 mb-5">
              {currentChalet.highlights.map((h) => (
                <div
                  key={h.label}
                  className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#8D996E]/10 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A45D41] mt-1.5 shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-[#F5F2ED] block">
                      {h.label}
                    </span>
                    <span className="text-[11px] text-[#F5F2ED]/60 font-light">
                      {h.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Stay Estimator Box */}
          <div className="p-4 rounded-2xl bg-[#151D14]/80 border border-[#8D996E]/20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[10px] font-mono text-[#8D996E] tracking-wider uppercase block">
                  Tarifa base estimada
                </span>
                <span className="text-lg font-light text-[#F5F2ED]">
                  {currentChalet.basePrice}{" "}
                  <span className="text-xs text-[#F5F2ED]/50 font-mono">/ noche</span>
                </span>
              </div>

              {/* Selector de Noches */}
              <div className="flex items-center gap-1 bg-[#212B20] p-1 rounded-xl border border-[#8D996E]/30">
                {[1, 2, 3, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setNights(n)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono cursor-pointer transition-all ${
                      nights === n
                        ? "bg-[#8D996E] text-[#212B20] font-bold"
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
              <span>Ver Disponibilidad · {nights} {nights === 1 ? "Noche" : "Noches"}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
