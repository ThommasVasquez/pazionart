"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UtensilsCrossed, Flame, Wine, Clock, Users, Calendar, Sparkles, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { startSafeViewTransition } from "@/lib/viewTransition";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RestaurantSectionProps {
  onOpenBooking: (details?: string) => void;
}

export default function RestaurantSection({ onOpenBooking }: RestaurantSectionProps) {
  const [activeCourse, setActiveCourse] = useState(0);
  const [tableGuests, setTableGuests] = useState("2 Comensales");
  const [tableTime, setTableTime] = useState("Cena al Atardecer (6:30 PM)");
  const [tableDate, setTableDate] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  const handleSelectCourse = (idx: number) => {
    startSafeViewTransition(() => {
      setActiveCourse(idx);
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".restaurant-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".restaurant-title",
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ".restaurant-desc",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".restaurant-photo-box",
          { opacity: 0, y: 55, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0 },
          "-=0.5"
        )
        .fromTo(
          ".restaurant-step-btn",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
          "-=0.6"
        )
        .fromTo(
          ".restaurant-course-card",
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          ".restaurant-booking-form",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const menuCourses = [
    {
      step: "Tiempo I",
      title: "Raíces & Huerto Silvestre",
      desc: "Tubérculos de montaña cocinados al rescoldo de brasas, emulsión de hierbas del huerto orgánico propio y virutas de queso madurado campesino.",
      pairing: "Maridaje sugerido: Infusión fría de poleo y manzana verde.",
      badge: "Entrada Fría / Caliente",
    },
    {
      step: "Tiempo II",
      title: "La Pesca del Manantial & Humo",
      desc: "Trucha asalmonada curada en sal de roca y ahumada lentamente con astillas de madera de encino, acompañada de crema de coliflor asada y cenizas de romero.",
      pairing: "Maridaje sugerido: Vino blanco fresco de cepas de altura.",
      badge: "Plato Principal Marino",
    },
    {
      step: "Tiempo III",
      title: "El Barro & la Brasa Sagrada",
      desc: "Corte de res de pastoreo madurado durante 30 días, sellado a fuego directo con reducción de moras silvestres en cazuela de barro hecha a mano.",
      pairing: "Maridaje sugerido: Tinto reserva de barrica de roble.",
      badge: "Plato Fuerte de Fuego",
    },
    {
      step: "Tiempo IV",
      title: "Dulzura del Fogón Campesino",
      desc: "Bizcocho húmedo de cacao criollo al 70%, helado artesanal de leche bronca ahumada con leña dulce y llovizna de miel virgen de abeja silvestre.",
      pairing: "Maridaje sugerido: Café de especialidad colado en tela.",
      badge: "Postre de Autor",
    },
  ];

  const handleTableReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const dateText = tableDate ? ` para la fecha ${tableDate}` : " para los próximos días";
    const message = encodeURIComponent(
      `Hola Pazionart, deseo reservar una mesa en el Restaurante & Fogón para ${tableGuests}${dateText} en el horario de ${tableTime}. ¿Tienen disponibilidad?`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      id="restaurante"
      className="relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 px-6 md:px-12 bg-[#1F1714] overflow-hidden"
    >
      {/* Difuminado superior desde Sección Propósito en tono Café Leña */}
      <div className="absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-[#1E1613]/85 via-[#1F1714]/50 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-[#A45D41]/30 to-transparent blur-[1px] pointer-events-none z-20" />

      <div className="max-w-7xl mx-auto w-full relative z-20 flex flex-col gap-16">
        {/* Cabecera Editorial de la Sección */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="restaurant-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16100E]/85 text-[10px] font-mono tracking-[0.25em] text-[#D48B6A] uppercase mb-4 border border-[#A45D41]/30 shadow-md">
            <Flame className="w-3.5 h-3.5 text-[#A45D41] animate-pulse" />
            <span>Cocina de Origen · Brasa & Tierra</span>
          </div>

          <h2 className="restaurant-title text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.06em] text-[#F5F2ED] uppercase font-sans mb-4">
            Restaurante & Fogón
          </h2>

          <p className="restaurant-desc text-sm sm:text-base md:text-lg text-[#F5F2ED]/85 font-light leading-relaxed">
            Un homenaje al ritual de la mesa compartida. Cocinamos a fuego de leña con alimentos cultivados a pocos metros y servimos en vajilla de barro moldeada a mano en nuestros talleres rurales.
          </p>
        </div>

        {/* Bloque Principal: Menú Interactivo & Fotografía de Fogón */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Lado Izquierdo: Fotografía del Fogón con Resplandor */}
          <div className="lg:col-span-5 relative">
            <div className="restaurant-photo-box relative aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden border border-[#A45D41]/35 shadow-2xl group">
              <Image
                src="/images/restaurante-fogon.jpg"
                alt="Pazionart Restaurante mesa y fuego"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16100E] via-transparent to-transparent opacity-85" />

              {/* Placa Flotante sobre la Foto */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#16100E]/90 backdrop-blur-md p-4 rounded-2xl border border-[#A45D41]/30 shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Wine className="w-4 h-4 text-[#A45D41]" />
                  <span className="text-[10px] font-mono text-[#F5F2ED] uppercase tracking-wider font-semibold">
                    Experiencia Culinaria Completa
                  </span>
                </div>
                <p className="text-xs text-[#F5F2ED]/80 font-light leading-snug">
                  Cenas íntimas a la luz de las velas frente al calor de la chimenea de piedra natural.
                </p>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Menú Degustación Interactivo */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#D48B6A] uppercase tracking-widest">
                [ Menú Degustación de 4 Tiempos ]
              </span>
              <span className="text-[10px] font-mono text-[#A45D41] uppercase tracking-wider">
                Ingredientes 100% Agroecológicos
              </span>
            </div>

            {/* Selector de Tiempos */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {menuCourses.map((c, idx) => (
                <button
                  key={c.step}
                  onClick={() => handleSelectCourse(idx)}
                  className={`restaurant-step-btn py-2 px-1 text-center rounded-xl transition-all duration-300 cursor-pointer ${
                    activeCourse === idx
                      ? "bg-[#A45D41] text-[#F5F2ED] font-semibold shadow-md"
                      : "bg-[#16100E]/70 border border-[#A45D41]/20 text-[#F5F2ED]/60 hover:text-[#F5F2ED] hover:bg-[#A45D41]/20"
                  }`}
                >
                  <span className="text-[10px] sm:text-xs font-mono block">{c.step}</span>
                </button>
              ))}
            </div>

            {/* Tarjeta del Tiempo Seleccionado */}
            <div
              className="restaurant-course-card bg-[#18110F]/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#A45D41]/35 shadow-xl mb-8 relative overflow-hidden"
              style={{ viewTransitionName: "restaurant-active-course" }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-[#A45D41]/20 to-transparent blur-2xl pointer-events-none" />

              <span className="text-[9px] font-mono text-[#D48B6A] uppercase tracking-widest block mb-1">
                {menuCourses[activeCourse].badge}
              </span>

              <h3 className="text-2xl sm:text-3xl font-light text-[#F5F2ED] mb-3">
                {menuCourses[activeCourse].title}
              </h3>

              <p className="text-sm text-[#F5F2ED]/90 font-light leading-relaxed mb-4">
                {menuCourses[activeCourse].desc}
              </p>

              <div className="pt-4 border-t border-[#A45D41]/20 flex items-center gap-2 text-xs text-[#D48B6A] font-mono">
                <Wine className="w-3.5 h-3.5 shrink-0 text-[#A45D41]" />
                <span>{menuCourses[activeCourse].pairing}</span>
              </div>
            </div>

            {/* Formulario de Reserva Rápida de Mesa */}
            <form
              onSubmit={handleTableReservation}
              className="restaurant-booking-form bg-[#18110F]/90 backdrop-blur-md p-6 rounded-2xl border border-[#A45D41]/30 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end shadow-xl"
            >
              <div>
                <label className="text-[9px] font-mono text-[#D48B6A] uppercase tracking-wider block mb-1">
                  Comensales
                </label>
                <select
                  value={tableGuests}
                  onChange={(e) => setTableGuests(e.target.value)}
                  className="w-full bg-[#130D0B]/85 text-[#F5F2ED] text-xs rounded-xl px-3 py-2 border border-[#A45D41]/30 focus:border-[#D48B6A] outline-none cursor-pointer"
                >
                  <option value="1 Persona" className="bg-[#1C1512]">1 Persona</option>
                  <option value="2 Comensales" className="bg-[#1C1512]">2 Comensales</option>
                  <option value="4 Comensales" className="bg-[#1C1512]">4 Comensales</option>
                  <option value="Grupo Exclusivo (6+)" className="bg-[#1C1512]">Grupo Exclusivo (6+)</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] font-mono text-[#D48B6A] uppercase tracking-wider block mb-1">
                  Turno Culinario
                </label>
                <select
                  value={tableTime}
                  onChange={(e) => setTableTime(e.target.value)}
                  className="w-full bg-[#130D0B]/85 text-[#F5F2ED] text-xs rounded-xl px-3 py-2 border border-[#A45D41]/30 focus:border-[#D48B6A] outline-none cursor-pointer"
                >
                  <option value="Almuerzo de Montaña (1:00 PM)" className="bg-[#1C1512]">Almuerzo (1:00 PM)</option>
                  <option value="Cena al Atardecer (6:30 PM)" className="bg-[#1C1512]">Cena Atardecer (6:30 PM)</option>
                  <option value="Cena de Fuego Tardía (8:30 PM)" className="bg-[#1C1512]">Cena de Fuego (8:30 PM)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Reservar Mesa</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Difuminado inferior hacia Sección siguiente en tono Café Profundo */}
      <div className="absolute -bottom-1 left-0 right-0 h-36 md:h-52 bg-gradient-to-b from-transparent via-[#1D1512]/85 to-[#1D1512] pointer-events-none z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-24 bg-radial from-[#A45D41]/15 to-transparent blur-3xl pointer-events-none z-10" />
    </section>
  );
}
