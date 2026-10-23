"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import { startSafeViewTransition } from "@/lib/viewTransition";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ValuesAccordionProps {
  activeWorld?: "chalets" | "restaurante";
}

export default function ValuesAccordion({ activeWorld = "chalets" }: ValuesAccordionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const isCoffee = activeWorld === "restaurante";
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelectValue = (idx: number) => {
    if (activeIdx === idx) return;
    startSafeViewTransition(() => {
      setActiveIdx(idx);
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".values-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      ).fromTo(
        ".values-card",
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeWorld]);

  const values = isCoffee
    ? [
        {
          num: "01",
          title: "Amor por la Brasa",
          tag: "Fuego Vivo",
          desc: "Cocinamos desde el corazón, con leña de roble y el calor paciente del rescoldo para alimentar el alma.",
          icon: Heart,
          image: "/images/gallery/spa-composicion-relajante.jpg",
          color: "#A45D41",
        },
        {
          num: "02",
          title: "Cosecha Viva & Huerto",
          tag: "Agroecología",
          desc: "Honramos la tierra cultivando nuestros propios ingredientes andinos, cosechados frescos para cada servicio.",
          icon: Leaf,
          image: "/images/gallery/spa-ramilletes-frescos.jpg",
          color: "#D48B6A",
        },
        {
          num: "03",
          title: "Vajilla en Barro Vivo",
          tag: "Artesanía",
          desc: "Servimos en platos y cuencos modelados a mano por maestros alfareros de nuestra cordillera.",
          icon: Award,
          image: "/images/gallery/spa-sales-corazon.jpg",
          color: "#A45D41",
        },
        {
          num: "04",
          title: "Sobremesa Serena",
          tag: "Tiempo Lento",
          desc: "El fogón no tiene prisa. Promovemos la pausa consciente, la conversación fértil y el disfrute pausado.",
          icon: ShieldCheck,
          image: "/images/gallery/aroma-comedor-rosas.jpg",
          color: "#D48B6A",
        },
        {
          num: "05",
          title: "Maridaje con Alma",
          tag: "Sensorial",
          desc: "Vinos selectos y botánica andina infusionada para elevar cada bocado en perfecta armonía con el entorno.",
          icon: Sun,
          image: "/images/gallery/spa-preparacion-completa.jpg",
          color: "#A45D41",
        },
        {
          num: "06",
          title: "Memoria de la Tierra",
          tag: "Origen",
          desc: "Rescatamos saberes culinarios campesinos reinterpretados con respeto por la estación y la memoria rural.",
          icon: Sparkles,
          image: "/images/gallery/spa-vista-cenital.jpg",
          color: "#D48B6A",
        },
      ]
    : [
        {
          num: "01",
          title: "Amor por el servicio",
          tag: "Hospitalidad",
          desc: "Servimos desde el corazón, con calidez, respeto y atención genuina a cada persona que llega a los refugios.",
          icon: Heart,
          image: "/images/gallery/aroma-sala-bienvenida.jpg",
          color: "#A45D41",
        },
        {
          num: "02",
          title: "Conexión natural",
          tag: "Biophilia",
          desc: "Valoramos y protegemos el entorno natural, integrando la naturaleza a cada despertar.",
          icon: Leaf,
          image: "/images/gallery/susurros-bosque.jpg",
          color: "#8D996E",
        },
        {
          num: "03",
          title: "Arquitectura con propósito",
          tag: "Diseño Alpino",
          desc: "Cabañas de alta montaña construidas con maderas nobles, techos inclinados y respeto por la orografía.",
          icon: Award,
          image: "/images/gallery/bruma-rincon-lectura.jpg",
          color: "#A45D41",
        },
        {
          num: "04",
          title: "Autenticidad & Raíz",
          tag: "Esencia",
          desc: "Piedra viva, madera lustrada y detalles artesanales que reflejan nuestra identidad de montaña.",
          icon: ShieldCheck,
          image: "/images/gallery/aroma-bano-madera.jpg",
          color: "#8D996E",
        },
        {
          num: "05",
          title: "Descanso sagrado",
          tag: "Armonía",
          desc: "Promovemos el silencio fértil y el descanso reparador rodeado de aire puro y naturaleza.",
          icon: Sun,
          image: "/images/gallery/bruma-cama-altillo.jpg",
          color: "#A45D41",
        },
        {
          num: "06",
          title: "Convivencia serena",
          tag: "Encuentro",
          desc: "Espacios diáfanos con cocina equipada, altillos cálidos y terrazas privadas para reconectar con los que uno más quiere.",
          icon: Sparkles,
          image: "/images/gallery/bruma-cocina-comedor.jpg",
          color: "#8D996E",
        },
      ];

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center py-6">
      {/* Editorial Header */}
      <div className="values-header flex flex-col sm:flex-row sm:items-end justify-between mb-5">
        <div>
          <span className={`text-[10px] font-mono tracking-widest uppercase block mb-1 ${
            isCoffee ? "text-[#D48B6A]" : "text-[#8D996E]"
          }`}>
            {isCoffee ? "[ Filosofía del Fogón & la Brasa ]" : "[ Filosofía de los Refugios Pazionart ]"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#F5F2ED] tracking-wide font-sans">
            {isCoffee ? (
              <>
                Los Pilares de Nuestro <span className="italic font-normal text-[#A45D41]">Fogón</span>
              </>
            ) : (
              <>
                La Filosofía que <span className="italic font-normal text-[#8D996E]">Nos Inspira</span>
              </>
            )}
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
              onMouseEnter={() => handleSelectValue(idx)}
              onClick={() => handleSelectValue(idx)}
              className={`values-card relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-out flex flex-col justify-between p-5 md:p-6 border ${
                isCoffee ? "border-[#A45D41]/25" : "border-[#8D996E]/20"
              } ${
                isActive
                  ? isCoffee
                    ? "md:flex-[3.5] bg-[#241A17] border-[#A45D41]/60 shadow-2xl"
                    : "md:flex-[3.5] bg-[#212B20] border-[#A45D41]/50 shadow-2xl"
                  : isCoffee
                  ? "md:flex-1 bg-[#17100D]/85 hover:bg-[#241A17]/90"
                  : "md:flex-1 bg-[#182017]/80 hover:bg-[#212B20]/90"
              }`}
              data-cursor="explore"
            >
              {/* Background Image on Active */}
              <div
                className={`absolute inset-0 z-0 transition-opacity duration-700 ${
                  isActive ? "opacity-35 scale-105" : "opacity-0"
                }`}
                style={{
                  viewTransitionName: isActive ? "values-active-image" : "none",
                }}
              >
                <Image
                  src={val.image}
                  alt={val.title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  isCoffee
                    ? "from-[#241A17] via-[#241A17]/80 to-transparent"
                    : "from-[#212B20] via-[#212B20]/80 to-transparent"
                }`} />
              </div>

              {/* Number and Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span
                  className={`text-2xl md:text-3xl font-mono tracking-tight transition-colors duration-500 ${
                    isActive
                      ? "text-[#A45D41] font-bold"
                      : isCoffee
                      ? "text-[#D48B6A]/50"
                      : "text-[#8D996E]/50"
                  }`}
                >
                  {val.num}
                </span>

                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-[#A45D41] text-[#F5F2ED] scale-110 shadow-lg"
                      : isCoffee
                      ? "bg-[#A45D41]/15 text-[#D48B6A]"
                      : "bg-[#8D996E]/15 text-[#8D996E]"
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                </div>
              </div>

              {/* Content bottom */}
              <div className="relative z-10 mt-auto">
                <span className={`text-[10px] font-mono tracking-widest uppercase block mb-1 ${
                  isCoffee ? "text-[#D48B6A]" : "text-[#8D996E]"
                }`}>
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
