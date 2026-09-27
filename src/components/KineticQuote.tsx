"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Coffee, Flame, Leaf, Layers, ArrowUpRight } from "lucide-react";

export default function KineticQuote({ onBookExperience }: { onBookExperience: (title: string) => void }) {
  const [activeExp, setActiveExp] = useState(0);

  const experiences = [
    {
      id: "alfareria",
      title: "Modelado de Arcilla & Torno",
      category: "Sabiduría Manual",
      desc: "Tacto directo con la tierra húmeda. Un maestro alfarero te enseñará a centrar el barro y dar forma a tu propia vasija conmemorativa.",
      duration: "2.5 horas",
      materials: "Arcilla roja local y esmaltes naturales",
      image: "/images/artesania-barro.jpg",
      badge: "Taller en Taller Rural",
    },
    {
      id: "cafe",
      title: "Ritual de Café de Especialidad",
      category: "Sensorialidad del Sabor",
      desc: "Catación guiada de 3 variedades de café arábica cosechadas a más de 1,800m. Métodos Chemex, V60 y prensa francesa con agua de vertiente.",
      duration: "1.5 horas",
      materials: "Microlotes lavados y honey seleccionados",
      image: "/images/experiencia-pausa.jpg",
      badge: "Barismo Consciente",
    },
    {
      id: "bosque",
      title: "Baño de Bosque & Niebla",
      category: "Conexión Botánica",
      desc: "Shinrin-yoku adaptado a los Andes. Caminata descalza en zonas protegidas, respiración consciente guiada y reconocimiento de helechos.",
      duration: "2 horas",
      materials: "Guía naturista y aromaterapia de pino",
      image: "/images/hero-chalet.jpg",
      badge: "Inmersión Silenciosa",
    },
    {
      id: "fuego",
      title: "Velada de Fogón & Canto Andino",
      category: "Hospitalidad & Relato",
      desc: "Al caer la tarde, encendemos el fuego en la terraza. Tabla de quesos madurados, vino orgánico caliente y conversación sincera bajo la Vía Láctea.",
      duration: "3 horas",
      materials: "Leña seca de roble, copas y mantas de lana",
      image: "/images/chalet-interior.jpg",
      badge: "Pausa Nocturna",
    },
  ];

  const current = experiences[activeExp];

  return (
    <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center py-4">
      {/* Editorial Headline */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono text-[#8D996E] tracking-widest uppercase">
            [ Misión Multisensorial ]
          </span>
          <span className="text-[#8D996E]/40">•</span>
          <span className="text-[10px] font-mono text-[#A45D41] tracking-widest uppercase">
            Vivencias & Aprendizaje
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#F5F2ED] tracking-wide font-sans">
          La Pausa <span className="font-serif italic text-[#8D996E]">Consciente</span>
        </h2>
      </div>

      {/* Split Interactive Experience */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Columna Izquierda: Lista interactiva de experiencias con números y hover */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
          {experiences.map((exp, idx) => {
            const isSelected = activeExp === idx;
            return (
              <div
                key={exp.id}
                onMouseEnter={() => setActiveExp(idx)}
                onClick={() => setActiveExp(idx)}
                className={`p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? "glass-panel-warm border-[#A45D41]/60 shadow-xl translate-x-2"
                    : "glass-panel-dark border-[#8D996E]/15 hover:border-[#8D996E]/40 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#8D996E] tracking-wider uppercase">
                    {exp.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#F5F2ED]/50">
                    {exp.duration}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-medium text-[#F5F2ED] mt-0.5">
                  {exp.title}
                </h4>
              </div>
            );
          })}
        </div>

        {/* Columna Derecha: Tarjeta Fotográfica Ampliada con Detalles */}
        <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-[#8D996E]/25 shadow-2xl flex flex-col justify-between p-6 sm:p-8 min-h-[320px]">
          {/* Imagen de fondo con transición */}
          <div className="absolute inset-0 z-0">
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-cover transition-all duration-700 filter brightness-50 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#212B20] via-[#212B20]/60 to-transparent" />
          </div>

          {/* Top Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-mono tracking-wider text-[#F5F2ED] uppercase">
              {current.badge}
            </span>
            <span className="text-xs font-mono text-[#8D996E]">
              {current.duration}
            </span>
          </div>

          {/* Bottom Info & Action */}
          <div className="relative z-10 mt-auto">
            <span className="text-xs uppercase tracking-widest text-[#A45D41] font-semibold block mb-1">
              {current.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-light text-[#F5F2ED] mb-2 font-sans">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#F5F2ED]/85 font-light leading-relaxed mb-4 max-w-xl">
              {current.desc}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F5F2ED]/15">
              <span className="text-[11px] font-mono text-[#F5F2ED]/70">
                Materiales: <span className="text-[#8D996E]">{current.materials}</span>
              </span>

              <button
                onClick={() => onBookExperience(current.title)}
                className="px-5 py-2 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <span>Añadir a mi estadía</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
