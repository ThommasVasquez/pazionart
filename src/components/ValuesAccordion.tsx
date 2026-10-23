"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Leaf, Sparkles } from "lucide-react";
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
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeWorld]);

  const values = isCoffee
    ? [
        {
          num: "01",
          title: "Amor",
          tag: "Hospitalidad & Buena Mesa",
          desc: "Cocinamos desde el corazón, con calidez y dedicación. Cada plato de nuestra cocina tradicional colombiana se prepara con esmero para compartir momentos entrañables con los que uno más quiere.",
          icon: Heart,
          image: "/images/gallery/bruma-cocina-comedor.jpg",
          color: "#C85A32",
        },
        {
          num: "02",
          title: "Naturaleza",
          tag: "Entorno Campestre & Aire Puro",
          desc: "Un remanso de paz inmerso en la vegetación andina. Desconecta de la rutina citadina y disfruta de la buena mesa en un ambiente abierto, sereno y en total armonía con el paisaje natural.",
          icon: Leaf,
          image: "/images/gallery/aroma-jardin.jpg",
          color: "#7A9652",
        },
        {
          num: "03",
          title: "Arte",
          tag: "Identidad, Sabor & Atmósfera",
          desc: "Cuidamos cada detalle estético y sensorial: la música en directo, la calidez de la leña, la presentación acogedora y la autenticidad de recetas colombianas preparadas con verdadera identidad.",
          icon: Sparkles,
          image: "/images/gallery/aroma-comedor-rosas.jpg",
          color: "#B8684A",
        },
      ]
    : [
        {
          num: "01",
          title: "Amor",
          tag: "Calidez & Descanso Íntimo",
          desc: "Servimos con vocación y atención genuina. Cabañas concebidas para el descanso profundo, el romance y la desconexión total junto a las personas que más valoras.",
          icon: Heart,
          image: "/images/gallery/aroma-sala-bienvenida.jpg",
          color: "#C86446",
        },
        {
          num: "02",
          title: "Naturaleza",
          tag: "Santuario Andino & Bosque",
          desc: "Refugios integrados respetuosamente en la naturaleza. Despierta con el canto de las aves, respira aire limpio y contempla el paisaje desde tu terraza o jacuzzi privado.",
          icon: Leaf,
          image: "/images/gallery/susurros-bosque.jpg",
          color: "#7D9B65",
        },
        {
          num: "03",
          title: "Arte",
          tag: "Arquitectura Orgánica & Detalle",
          desc: "Cabañas con diseño arquitectónico en madera natural, amplios ventanales, altillos acogedores y acabados cuidados que convierten cada estancia en una vivencia única.",
          icon: Sparkles,
          image: "/images/gallery/susurros-fachada.jpg",
          color: "#D19A4B",
        },
      ];

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center py-6">
      {/* Editorial Header */}
      <div className="values-header mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className={`w-3.5 h-3.5 ${isCoffee ? "text-[#A45D41]" : "text-[#8D996E]"}`} />
          <span className={`text-[10px] font-mono tracking-widest uppercase ${
            isCoffee ? "text-[#D48B6A]" : "text-[#8D996E]"
          }`}>
            {isCoffee ? "[ 04 · Amor · Naturaleza · Arte ]" : "[ 04 · Amor · Naturaleza · Arte ]"}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#F5F2ED] tracking-wide font-sans">
          {isCoffee ? (
            <>
              Los Pilares de Nuestro <span className="italic font-normal text-[#A45D41]">Restaurante</span>
            </>
          ) : (
            <>
              La Filosofía de Nuestros <span className="italic font-normal text-[#8D996E]">Chalets</span>
            </>
          )}
        </h2>
        <p className="text-xs sm:text-sm text-[#F5F2ED]/75 font-light mt-1.5 max-w-xl">
          Amor, Naturaleza y Arte: los tres pilares fundamentales que guían cada vivencia en Pazionart.
        </p>
      </div>

      {/* Horizontal Interactive Accordion con los 3 Pilares Reales */}
      <div className="w-full h-[54vh] min-h-[400px] max-h-[520px] flex flex-col md:flex-row gap-3.5 rounded-3xl overflow-hidden">
        {values.map((val, idx) => {
          const isActive = activeIdx === idx;
          const IconComp = val.icon;

          return (
            <div
              key={val.num}
              onMouseEnter={() => handleSelectValue(idx)}
              onClick={() => handleSelectValue(idx)}
              className={`values-card relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-out flex flex-col justify-between p-6 md:p-8 border ${
                isActive
                  ? isCoffee
                    ? "md:flex-[2.6] bg-[#241A17] shadow-2xl"
                    : "md:flex-[2.6] bg-[#212B20] shadow-2xl"
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
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? val.color : `${val.color}25`,
                    color: isActive ? "#F5F2ED" : val.color,
                    boxShadow: isActive ? `0 4px 18px ${val.color}50` : "none",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <IconComp className="w-5 h-5" />
                </div>
              </div>

              {/* Content bottom - Visible en la tarjeta abierta/activa */}
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

                <h3 className="text-2xl md:text-3xl font-light text-[#F5F2ED] mb-2 font-normal tracking-wide">
                  {val.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#F5F2ED]/85 font-light leading-relaxed max-w-lg">
                  {val.desc}
                </p>
              </div>

              {/* Vertical title hint for non-active columns on desktop */}
              {!isActive && (
                <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span
                    className="text-sm font-mono uppercase tracking-[0.28em] rotate-90 whitespace-nowrap font-medium"
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
