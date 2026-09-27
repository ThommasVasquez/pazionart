"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  Leaf,
  Award,
  ShieldCheck,
  Sun,
  Sparkles,
  Users,
  Eye,
  Wind,
  CheckCircle,
} from "lucide-react";

export default function ValuesAccordion() {
  const [activeIdx, setActiveIdx] = useState(0);

  const values = [
    {
      num: "01",
      title: "Amor por el servicio",
      tag: "Hospitalidad",
      desc: "Servimos desde el corazón, con calidez, respeto y atención genuina a cada persona que llega a Pazionart.",
      icon: Heart,
      image: "/images/artesania-barro.jpg",
      color: "#A45D41",
    },
    {
      num: "02",
      title: "Conexión natural",
      tag: "Biophilia",
      desc: "Valoramos y protegemos el entorno natural, integrándolo en cada experiencia para generar bienestar y armonía viva.",
      icon: Leaf,
      image: "/images/hero-chalet.jpg",
      color: "#8D996E",
    },
    {
      num: "03",
      title: "Excelencia con propósito",
      tag: "Detalle",
      desc: "Hacer todo con calidad, detalle y compromiso, entendiendo que cada acción impacta la experiencia del cliente.",
      icon: Award,
      image: "/images/chalet-interior.jpg",
      color: "#A45D41",
    },
    {
      num: "04",
      title: "Autenticidad & Raíz",
      tag: "Esencia",
      desc: "Somos reales, cercanos y coherentes. Cada rincón y objeto refleja nuestra esencia y nuestra historia.",
      icon: ShieldCheck,
      image: "/images/experiencia-pausa.jpg",
      color: "#8D996E",
    },
    {
      num: "05",
      title: "Bienestar integral",
      tag: "Armonía",
      desc: "Promovemos experiencias que nutren cuerpo, mente y espíritu, tanto para nuestros visitantes como para nuestro equipo.",
      icon: Sun,
      image: "/images/hero-chalet.jpg",
      color: "#A45D41",
    },
    {
      num: "06",
      title: "Innovación consciente",
      tag: "Evolución",
      desc: "En constante evolución, creando experiencias nuevas y significativas sin perder jamás nuestra esencia natural y humana.",
      icon: Sparkles,
      image: "/images/chalet-interior.jpg",
      color: "#8D996E",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center py-6">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#8D996E] uppercase block mb-1">
            [ Brandbook 2026 · Sección Valores ]
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#F5F2ED] tracking-wide font-sans">
            La Filosofía que <span className="font-serif italic text-[#A45D41]">Nos Representa</span>
          </h2>
        </div>
        <p className="text-xs text-[#F5F2ED]/60 font-mono tracking-wider mt-2 sm:mt-0 uppercase">
          Pasa el cursor para explorar cada principio
        </p>
      </div>

      {/* Horizontal Interactive Accordion */}
      <div className="w-full h-[52vh] min-h-[380px] max-h-[500px] flex flex-col md:flex-row gap-2.5 rounded-3xl overflow-hidden">
        {values.map((val, idx) => {
          const isActive = activeIdx === idx;
          const IconComp = val.icon;

          return (
            <div
              key={val.num}
              onMouseEnter={() => setActiveIdx(idx)}
              onClick={() => setActiveIdx(idx)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-out flex flex-col justify-between p-5 md:p-6 border border-[#8D996E]/20 ${
                isActive
                  ? "md:flex-[3.5] bg-[#212B20] border-[#A45D41]/50 shadow-2xl"
                  : "md:flex-1 bg-[#182017]/80 hover:bg-[#212B20]/90"
              }`}
              data-cursor="explore"
            >
              {/* Background Image on Active */}
              <div
                className={`absolute inset-0 z-0 transition-opacity duration-700 ${
                  isActive ? "opacity-35 scale-105" : "opacity-0"
                }`}
              >
                <Image
                  src={val.image}
                  alt={val.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#212B20] via-[#212B20]/80 to-transparent" />
              </div>

              {/* Number and Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span
                  className={`text-2xl md:text-3xl font-mono tracking-tight transition-colors duration-500 ${
                    isActive ? "text-[#A45D41] font-bold" : "text-[#8D996E]/50"
                  }`}
                >
                  {val.num}
                </span>

                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-[#A45D41] text-[#F5F2ED] scale-110 shadow-lg"
                      : "bg-[#8D996E]/15 text-[#8D996E]"
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                </div>
              </div>

              {/* Content bottom */}
              <div className="relative z-10 mt-auto">
                <span className="text-[10px] font-mono tracking-widest text-[#8D996E] uppercase block mb-1">
                  {val.tag}
                </span>

                <h3
                  className={`text-lg md:text-xl font-light text-[#F5F2ED] transition-all duration-300 ${
                    isActive ? "mb-2 font-normal" : "line-clamp-1 md:line-clamp-2"
                  }`}
                >
                  {val.title}
                </h3>

                {/* Expanded text */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    isActive
                      ? "max-h-36 opacity-100 mt-2"
                      : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="text-xs sm:text-sm text-[#F5F2ED]/85 font-light leading-relaxed max-w-md">
                    {val.desc}
                  </p>
                </div>
              </div>

              {/* Vertical title hint for non-active columns on desktop */}
              {!isActive && (
                <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-10 opacity-30">
                  <span className="text-xs font-mono uppercase tracking-[0.3em] rotate-90 text-[#F5F2ED] whitespace-nowrap">
                    {val.title}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
