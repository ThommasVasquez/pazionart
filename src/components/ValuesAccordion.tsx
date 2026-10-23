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
          image: "/images/gallery/bruma-cocina-comedor.jpg",
          color: "#C85A32",
        },
        {
          num: "02",
          title: "Cosecha Viva & Huerto",
          tag: "Agroecología",
          desc: "Honramos la tierra cultivando nuestros propios ingredientes andinos, cosechados frescos para cada servicio.",
          icon: Leaf,
          image: "/images/gallery/spa-ramilletes-frescos.jpg",
          color: "#7A9652",
        },
        {
          num: "03",
          title: "Vajilla en Barro Vivo",
          tag: "Artesanía",
          desc: "Servimos en platos y cuencos modelados a mano por maestros alfareros de nuestra cordillera.",
          icon: Award,
          image: "/images/gallery/spa-sales-corazon.jpg",
          color: "#B8684A",
        },
        {
          num: "04",
          title: "Sobremesa Serena",
          tag: "Tiempo Lento",
          desc: "Nuestra cocina no tiene prisa. Promovemos la pausa consciente, la conversación fértil y el disfrute pausado.",
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
          color: "#C4924A",
        },
        {
          num: "06",
          title: "Memoria de la Tierra",
          tag: "Origen",
          desc: "Rescatamos saberes culinarios colombianos nacidos en Antioquia, reinterpretados con respeto por la estación y la memoria de nuestra tierra.",
          icon: Sparkles,
          image: "/images/gallery/spa-vista-cenital.jpg",
          color: "#9E6746",
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
          color: "#C86446",
        },
        {
          num: "02",
          title: "Conexión natural",
          tag: "Biophilia",
          desc: "Valoramos y protegemos el entorno natural, integrando la naturaleza a cada despertar.",
          icon: Leaf,
          image: "/images/gallery/susurros-bosque.jpg",
          color: "#7D9B65",
        },
        {
          num: "03",
          title: "Arquitectura con propósito",
          tag: "Diseño Alpino",
          desc: "Cabañas de arquitectura orgánica construidas con maderas nobles, techos inclinados y respeto por la naturaleza.",
          icon: Award,
          image: "/images/gallery/bruma-rincon-lectura.jpg",
          color: "#D19A4B",
        },
        {
          num: "04",
          title: "Autenticidad & Raíz",
          tag: "Esencia",
          desc: "Piedra viva, madera lustrada y detalles artesanales que reflejan nuestra identidad natural.",
          icon: ShieldCheck,
          image: "/images/gallery/aroma-bano-madera.jpg",
          color: "#A06248",
        },
        {
          num: "05",
          title: "Descanso sagrado",
          tag: "Armonía",
          desc: "Promovemos el silencio fértil y el descanso reparador rodeado de aire puro y naturaleza.",
          icon: Sun,
          image: "/images/gallery/bruma-cama-altillo.jpg",
          color: "#568779",
        },
        {
          num: "06",
          title: "Convivencia serena",
          tag: "Encuentro",
          desc: "Espacios diáfanos con cocina equipada, altillos cálidos y terrazas privadas para reconectar con los que uno más quiere.",
          icon: Sparkles,
          image: "/images/gallery/bruma-cocina-comedor.jpg",
          color: "#B57351",
        },
      ];

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center py-6">
      {/* Editorial Header - Limpio sin etiquetas redundantes */}
      <div className="values-header mb-5">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#F5F2ED] tracking-wide font-sans">
          {isCoffee ? (
            <>
              Los Pilares de Nuestro <span className="italic font-normal text-[#A45D41]">Restaurante</span>
            </>
          ) : (
            <>
              La Filosofía que <span className="italic font-normal text-[#8D996E]">Nos Inspira</span>
            </>
          )}
        </h2>
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
                isActive
                  ? isCoffee
                    ? "md:flex-[3.5] bg-[#241A17] shadow-2xl"
                    : "md:flex-[3.5] bg-[#212B20] shadow-2xl"
                  : isCoffee
                  ? "md:flex-1 bg-[#17100D]/85 hover:bg-[#241A17]/90"
                  : "md:flex-1 bg-[#182017]/80 hover:bg-[#212B20]/90"
              }`}
              style={{
                borderColor: isActive ? val.color : `${val.color}35`,
              }}
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

              {/* Number and Icon Button with unique color per card */}
              <div className="relative z-10 flex items-center justify-between">
                <span
                  className="text-2xl md:text-3xl font-mono tracking-tight transition-colors duration-500 font-medium"
                  style={{ color: isActive ? val.color : `${val.color}80` }}
                >
                  {val.num}
                </span>

                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? val.color : `${val.color}25`,
                    color: isActive ? "#F5F2ED" : val.color,
                    boxShadow: isActive ? `0 4px 18px ${val.color}50` : "none",
                    transform: isActive ? "scale(1.12)" : "scale(1)",
                  }}
                >
                  <IconComp className="w-4 h-4" />
                </div>
              </div>

              {/* Content bottom - SOLO visible en la tarjeta abierta/activa (elimina el texto partido/duplicado con ❌) */}
              <div
                className={`relative z-10 mt-auto transition-all duration-500 ${
                  isActive
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 md:hidden pointer-events-none translate-y-4"
                }`}
              >
                <span
                  className="text-[10px] font-mono tracking-widest uppercase block mb-1 font-semibold"
                  style={{ color: val.color }}
                >
                  {val.tag}
                </span>

                <h3 className="text-xl md:text-2xl font-light text-[#F5F2ED] mb-2 font-normal tracking-wide">
                  {val.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#F5F2ED]/85 font-light leading-relaxed max-w-md">
                  {val.desc}
                </p>
              </div>

              {/* Vertical title hint for non-active columns on desktop */}
              {!isActive && (
                <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span
                    className="text-xs font-mono uppercase tracking-[0.28em] rotate-90 whitespace-nowrap"
                    style={{ color: val.color }}
                  >
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
