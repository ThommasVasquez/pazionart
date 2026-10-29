"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  UtensilsCrossed,
  Home,
  Music,
  Briefcase,
  Sparkles,
  MessageCircle,
  Mail,
  CheckCircle2,
  Phone,
  ArrowRight,
  Flame,
} from "lucide-react";
import { startSafeViewTransition } from "@/lib/viewTransition";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RestaurantSectionProps {
  onOpenBooking: (details?: string) => void;
}

export default function RestaurantSection({ onOpenBooking }: RestaurantSectionProps) {
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const handleSelectService = (idx: number) => {
    startSafeViewTransition(() => {
      setActiveService(idx);
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
          ".restaurant-service-tab",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.6"
        )
        .fromTo(
          ".restaurant-service-card",
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

  const services = [
    {
      id: "presencial",
      shortLabel: "Servicio Presencial",
      tagline: "En Nuestras Mesas",
      badge: "Atención Presencial",
      title: "Servicio Presencial en el Restaurante",
      desc: "Te recibimos en un entorno cálido y natural para que disfrutes de la auténtica cocina colombiana cocinada a fuego de leña. Servimos en vajilla tradicional de barro, con ingredientes frescos y el sabor paciente del fogón andino.",
      highlights: [
        "Atención personalizada en mesas interiores y terraza al aire libre",
        "Gastronomía colombiana nacida en Antioquia preparada al momento",
        "Ambiente rodeado de naturaleza, ideal para compartir con los que uno más quiere",
      ],
      image: "/images/restaurant/restaurante-terraza-mesas.jpg",
      imageAlt: "Mesas de madera y terraza campestre bajo la pérgola del Restaurante Pazionart",
      icon: UtensilsCrossed,
      ctaText: "Reservar Mesa Presencial",
      waMessage: "Hola Pazionart, me gustaría consultar disponibilidad y reservar una mesa para el servicio presencial en el Restaurante.",
    },
    {
      id: "chalet",
      shortLabel: "Comida al Chalet",
      tagline: "Para Huéspedes",
      badge: "Directo a tu Cabaña",
      title: "Comida en la Comodidad del Chalet",
      desc: "Preparamos la comida y la llevamos directamente a tu chalet. Deliciosos desayunos tradicionales, almuerzos campestres y cenas íntimas servidos en tu propia terraza o comedor para que disfrutes de máxima privacidad sin interrumpir tu descanso.",
      highlights: [
        "Desayunos, almuerzos y cenas entregados en la puerta de tu cabaña",
        "Disfruta en tu jacuzzi privado, balcón o sala con absoluta intimidad",
        "Servicio exclusivo y preferencial para los huéspedes de Pazionart",
      ],
      image: "/images/gallery/aroma-comedor-rosas.jpg",
      imageAlt: "Comida servida en la privacidad y confort del chalet",
      icon: Home,
      ctaText: "Pedir Comida para mi Chalet",
      waMessage: "Hola Pazionart, estoy interesado en el servicio de comida directamente a mi chalet.",
    },
    {
      id: "musica",
      shortLabel: "Música en Vivo",
      tagline: "Veladas Especiales",
      badge: "Tardes & Noches Mágicas",
      title: "Eventos con Música en Vivo",
      desc: "Organizamos tardes y noches especiales amenizadas con artistas y música acústica en directo. Una experiencia sensorial que combina buena copa de vino, platos tradicionales al rescoldo y melodías que hacen de cada sobremesa un instante memorable.",
      highlights: [
        "Presentaciones en vivo de artistas acústicos en fechas especiales",
        "Atmósfera íntima y acogedora frente a la naturaleza y bajo las estrellas",
        "Ideal para aniversarios, cumpleaños, cenas románticas y reuniones familiares",
      ],
      image: "/images/restaurant/restaurante-velada-nocturna.jpg",
      imageAlt: "Velada nocturna iluminada con guirnaldas y música en vivo en Pazionart Gastro Bar",
      icon: Music,
      ctaText: "Consultar Fechas de Música en Vivo",
      waMessage: "Hola Pazionart, deseo consultar la programación y próximas fechas de eventos con música en vivo en el Restaurante.",
    },
    {
      id: "empresariales",
      shortLabel: "Eventos Empresariales",
      tagline: "Corporativo & Grupos",
      badge: "Integración & Retiros",
      title: "Eventos Empresariales & Corporativos",
      desc: "El espacio perfecto para desconectar de la ciudad y conectar a tu equipo. Ofrecemos instalaciones campestres para reuniones corporativas, jornadas de integración, celebraciones de fin de año y retiros de liderazgo con atención gastronómica de primer nivel.",
      highlights: [
        "Espacios privados al aire libre y cubiertos adaptados para grupos de trabajo",
        "Menús corporativos, coffee breaks y banquetes diseñados a la medida",
        "Entorno natural que estimula la concentración, el bienestar y la motivación",
      ],
      image: "/images/restaurant/restaurante-gastrobar-pergola.jpg",
      imageAlt: "Pérgola y espacios al aire libre ideales para eventos y encuentros corporativos",
      icon: Briefcase,
      ctaText: "Cotizar Evento Empresarial",
      waMessage: "Hola Pazionart, deseo solicitar información y cotización para un evento empresarial en el Restaurante.",
    },
  ];

  const current = services[activeService];

  const handleWhatsAppClick = (msg: string) => {
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/573505791093?text=${encoded}`, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      id="restaurante"
      className="relative w-full min-h-[100dvh] flex flex-col justify-center py-28 md:py-36 px-6 md:px-12 bg-[#1F1714] overflow-hidden"
    >
      {/* Difuminado superior en tono Café Leña */}
      <div className="absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-[#1E1613]/85 via-[#1F1714]/50 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-[#A45D41]/30 to-transparent blur-[1px] pointer-events-none z-20" />

      <div className="max-w-7xl mx-auto w-full relative z-20 flex flex-col gap-12 lg:gap-16 my-auto">
        {/* Cabecera Editorial de la Sección */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="restaurant-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#16100E]/85 text-xs sm:text-sm font-mono tracking-[0.25em] text-[#D48B6A] uppercase mb-4 border border-[#A45D41]/30 shadow-md">
            <Sparkles className="w-4 h-4 text-[#A45D41]" />
            <span>03 · Servicios Gastronómicos & Eventos</span>
          </div>

          <h2 className="restaurant-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.06em] text-[#F5F2ED] uppercase font-sans mb-4">
            Restaurante de Pazionart
          </h2>

          <p className="restaurant-desc text-base sm:text-lg md:text-xl text-[#F5F2ED]/85 font-light leading-relaxed">
            Ofrecemos servicio presencial en nuestras mesas, preparamos la comida y la llevamos a tu chalet, y organizamos eventos especiales con música en vivo y eventos empresariales en medio de la naturaleza.
          </p>
        </div>

        {/* Bloque Principal: Pestañas de Servicios y Contenido Interactivo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Lado Izquierdo: Fotografía que conmuta con el servicio activo */}
          <div className="lg:col-span-5 relative">
            <div className="restaurant-photo-box relative aspect-[4/5] sm:aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden border border-[#A45D41]/35 shadow-2xl group">
              <Image
                key={current.image}
                src={current.image}
                alt={current.imageAlt}
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16100E] via-[#16100E]/30 to-transparent opacity-80" />

              {/* Badge flotante en la foto con el servicio activo */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#18110F]/85 backdrop-blur-md border border-[#A45D41]/30 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#A45D41]/25 border border-[#A45D41]/40 flex items-center justify-center shrink-0">
                    <current.icon className="w-5 h-5 text-[#D48B6A]" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#D48B6A] block">
                      {current.badge}
                    </span>
                    <span className="text-sm text-[#F5F2ED] font-medium block">
                      {current.shortLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Navegación de los 4 Servicios & Tarjeta de Detalle */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Selector de los 4 Servicios */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {services.map((s, idx) => {
                const IconComponent = s.icon;
                const isSelected = activeService === idx;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelectService(idx)}
                    className={`restaurant-service-tab p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer text-left flex flex-col gap-2 border ${
                      isSelected
                        ? "bg-[#A45D41] text-[#F5F2ED] border-[#A45D41] shadow-lg scale-[1.02]"
                        : "bg-[#18110F]/80 text-[#F5F2ED]/70 border-[#A45D41]/20 hover:border-[#A45D41]/50 hover:bg-[#A45D41]/15 hover:text-[#F5F2ED]"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <IconComponent className={`w-4 h-4 ${isSelected ? "text-[#F5F2ED]" : "text-[#D48B6A]"}`} />
                      <span className={`text-xs font-mono font-medium ${isSelected ? "text-[#F5F2ED]/90" : "text-[#D48B6A]/80"}`}>
                        0{idx + 1}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold leading-snug block">
                      {s.shortLabel}
                    </span>
                    <span className={`text-[10px] sm:text-xs font-mono tracking-wider uppercase block ${isSelected ? "text-[#F5F2ED]/85" : "text-[#D48B6A]/85"}`}>
                      {s.tagline}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tarjeta Detallada del Servicio Seleccionado */}
            <div
              className="restaurant-service-card bg-[#18110F]/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#A45D41]/35 shadow-xl mb-6 relative overflow-hidden"
              style={{ viewTransitionName: "restaurant-active-service" }}
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-radial from-[#A45D41]/25 to-transparent blur-3xl pointer-events-none" />

              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-xs font-mono text-[#D48B6A] uppercase tracking-widest font-semibold">
                  {current.badge}
                </span>
                <span className="text-[#A45D41]">·</span>
                <span className="text-xs font-mono text-[#F5F2ED]/70 uppercase tracking-wider">
                  Restaurante de Pazionart
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#F5F2ED] mb-3">
                {current.title}
              </h3>

              <p className="text-base md:text-lg text-[#F5F2ED]/90 font-light leading-relaxed mb-6">
                {current.desc}
              </p>

              {/* Lista de características y beneficios */}
              <div className="space-y-3 pt-4 border-t border-[#A45D41]/25 mb-6">
                {current.highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D48B6A] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#F5F2ED]/90 font-light leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Botones de Llamado a la Acción: WhatsApp y Correo */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleWhatsAppClick(current.waMessage)}
                  className="py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-[#121B12] text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] transition-all duration-300 shadow-lg flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Contactar por WhatsApp</span>
                </button>

                <a
                  href={`mailto:pazionartchalets@gmail.com?subject=${encodeURIComponent(`Consulta Restaurante Pazionart - ${current.title}`)}&body=${encodeURIComponent(current.waMessage)}`}
                  className="py-3.5 px-6 rounded-2xl bg-[#2A1B14] hover:bg-[#38241B] text-[#F5F2ED] border border-[#A45D41]/50 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] transition-all duration-300 shadow-md flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02]"
                >
                  <Mail className="w-4 h-4 text-[#D48B6A]" />
                  <span>Escribir por Correo</span>
                </a>
              </div>
            </div>

            {/* Caja de Contacto Rápido: Teléfono, WhatsApp y Correo */}
            <div className="restaurant-booking-form bg-[#18110F]/75 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-[#A45D41]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#A45D41]/20 border border-[#A45D41]/35 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#D48B6A]" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-mono text-[#D48B6A] uppercase tracking-wider block">
                    Línea de Reservas & Eventos
                  </span>
                  <a
                    href="tel:+573505791093"
                    className="text-base sm:text-lg font-semibold text-[#F5F2ED] hover:text-[#D48B6A] transition-colors"
                  >
                    +57 350 579 1093
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleWhatsAppClick("Hola Pazionart, me gustaría comunicarme con el Restaurante para reservas y eventos.")}
                  className="flex-1 sm:flex-initial py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-[#121B12] text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp</span>
                </button>
                <a
                  href="mailto:pazionartchalets@gmail.com?subject=Consulta%20Restaurante%20Pazionart&body=Hola%20Pazionart,%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20restaurante,%20reservas%20o%20eventos."
                  className="flex-1 sm:flex-initial py-3 px-5 rounded-xl bg-[#2A1B14] hover:bg-[#38241B] border border-[#A45D41]/40 text-[#F5F2ED] text-xs sm:text-sm font-mono uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 text-center hover:scale-[1.02]"
                >
                  <Mail className="w-4 h-4 text-[#D48B6A]" />
                  <span>Correo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Difuminado inferior hacia Sección siguiente */}
      <div className="absolute -bottom-1 left-0 right-0 h-36 md:h-52 bg-gradient-to-b from-transparent via-[#1D1512]/85 to-[#1D1512] pointer-events-none z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-24 bg-radial from-[#A45D41]/15 to-transparent blur-3xl pointer-events-none z-10" />
    </section>
  );
}
