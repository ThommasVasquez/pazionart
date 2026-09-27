"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  ArrowRight,
  ChevronDown,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  Flame,
  Coffee,
  Leaf,
  Layers,
  Calendar,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import AmbientAudio from "@/components/AmbientAudio";
import BookingModal from "@/components/BookingModal";
import CustomCursor from "@/components/CustomCursor";
import ChaletConfigurator from "@/components/ChaletConfigurator";
import ValuesAccordion from "@/components/ValuesAccordion";
import KineticQuote from "@/components/KineticQuote";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedChalet, setSelectedChalet] = useState("Chalet Niebla & Fuego");

  const heroRef = useRef<HTMLDivElement>(null);
  const propositoRef = useRef<HTMLDivElement>(null);
  const chaletsRef = useRef<HTMLDivElement>(null);
  const valoresRef = useRef<HTMLDivElement>(null);
  const experienciasRef = useRef<HTMLDivElement>(null);
  const contactoRef = useRef<HTMLDivElement>(null);

  const sectionsList = [
    { id: "esencia", label: "01 Esencia" },
    { id: "proposito", label: "02 Propósito" },
    { id: "chalets", label: "03 Chalets" },
    { id: "valores", label: "04 Filosofía" },
    { id: "experiencias", label: "05 Vivencias" },
    { id: "contacto", label: "06 Encuentro" },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animación de apertura Hero
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
      .fromTo(".hero-asym-meta", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo(".hero-asym-title", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1.1 }, "-=0.7")
      .fromTo(".hero-asym-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
      .fromTo(".hero-asym-photo", { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.3 }, "-=0.9");

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const openBookingFor = (chaletName: string) => {
    setSelectedChalet(chaletName);
    setIsBookingOpen(true);
  };

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
      <ScrollProgress sections={sectionsList} />
      <AmbientAudio />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedChalet={selectedChalet}
      />

      <main className="w-full bg-[#212B20] text-[#F5F2ED] overflow-hidden">
        {/* ========================================================
            SECCIÓN 01: HERO ASIMÉTRICO - EL UMBRAL CONSCIENTE
            ======================================================== */}
        <section
          id="esencia"
          ref={heroRef}
          className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden snap-start px-6 md:px-12 pt-20 pb-8"
        >
          {/* Fondo sutil con modulación de marca */}
          <div className="absolute inset-0 bg-[#161E15] z-0">
            <div className="absolute inset-0 bg-modulacion opacity-4 pointer-events-none mix-blend-screen" />
            <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#8D996E]/10 filter blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#A45D41]/15 filter blur-[120px] pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Lado Izquierdo: Composición Tipográfica Asimétrica */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Meta etiqueta de encabezado */}
              <div className="hero-asym-meta flex items-center gap-3 mb-4">
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#8D996E] uppercase border border-[#8D996E]/30 px-3 py-1 rounded-full glass-panel-dark">
                  Reserva Natural & Arquitectura Viva
                </span>
                <span className="text-[#A45D41] text-xs font-mono">04°38&apos;N · 75°34&apos;W</span>
              </div>

              {/* Título de gran impacto con contraste */}
              <div className="hero-asym-title">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs md:text-sm font-semibold tracking-[0.35em] text-[#8D996E] uppercase">
                    Amor · Naturaleza · Arte
                  </span>
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#F5F2ED] uppercase leading-[0.95] mb-4">
                  Pazionart
                </h1>
              </div>

              {/* Texto de propósito con jerarquía editorial */}
              <p className="hero-asym-desc text-sm sm:text-base md:text-lg text-[#F5F2ED]/85 font-light leading-relaxed max-w-xl mb-8">
                El puente entre la{" "}
                <span className="text-[#8D996E] font-medium border-b border-[#8D996E]/40 pb-0.5">
                  sabiduría artesanal rural
                </span>{" "}
                y la{" "}
                <span className="text-[#A45D41] font-medium border-b border-[#A45D41]/40 pb-0.5">
                  pausa consciente
                </span>{" "}
                que buscan tanto los habitantes locales como el viajero del mundo.
              </p>

              {/* Controles de Acción Rápida con Estilo Boutique */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openBookingFor("Chalet Niebla & Fuego")}
                  data-cursor="reserve"
                  className="px-8 py-4 rounded-full text-xs font-semibold tracking-[0.2em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-2xl flex items-center gap-3 cursor-pointer group"
                >
                  <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  <span>Explorar Chalets</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#proposito"
                  data-cursor="explore"
                  className="px-7 py-4 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass-panel-dark text-[#F5F2ED]/90 hover:text-[#8D996E] hover:border-[#8D996E] transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <span>Nuestra Esencia</span>
                  <ChevronDown className="w-4 h-4 text-[#8D996E]" />
                </a>
              </div>
            </div>

            {/* Lado Derecho: Marco de Fotografía Flotante Editorial */}
            <div className="hero-asym-photo lg:col-span-5 relative">
              <div
                className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-[#8D996E]/30 shadow-2xl group"
                data-cursor="explore"
              >
                <Image
                  src="/images/hero-chalet.jpg"
                  alt="Chalet Pazionart al atardecer en el bosque andino"
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151D14]/90 via-[#151D14]/20 to-transparent" />

                {/* Símbolo de Pazionart en marca de agua */}
                <div className="absolute top-5 right-5 w-12 h-12 relative opacity-80">
                  <Image
                    src="/brand/simbolo-pazionart.svg"
                    alt="Símbolo"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Micro-datos al pie de foto */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#8D996E] tracking-widest uppercase block mb-1">
                      Arquitectura Biofílica
                    </span>
                    <h3 className="text-base font-medium text-[#F5F2ED]">
                      Chalet Niebla & Fuego
                    </h3>
                  </div>

                  <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-mono text-[#F5F2ED]">
                    1,850 M.S.N.M.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECCIÓN 02: PROPÓSITO & SABIDURÍA ARTESANAL
            ======================================================== */}
        <section
          id="proposito"
          ref={propositoRef}
          className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden bg-[#182017] px-6 md:px-12 py-8 snap-start"
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Foto Editorial de Artesano y Barro */}
            <div className="lg:col-span-5 relative">
              <div
                className="relative aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden border border-[#8D996E]/25 shadow-2xl"
                data-cursor="view"
              >
                <Image
                  src="/images/artesania-barro.jpg"
                  alt="Manos artesanas en Pazionart"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151D14] via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 glass-panel-dark p-4 rounded-2xl border border-[#8D996E]/20">
                  <span className="text-[9px] font-mono text-[#8D996E] uppercase tracking-widest block">
                    [ Artesanía Viva · Manos Rurales ]
                  </span>
                  <p className="text-xs text-[#F5F2ED]/90 mt-1 font-light leading-snug">
                    El barro modelado con paciencia, sin prisa, como metáfora de la vida serena.
                  </p>
                </div>
              </div>
            </div>

            {/* Narrativa Editorial & 4 Rasgos de Personalidad */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-[#8D996E]">02</span>
                <span className="w-8 h-[1px] bg-[#8D996E]/40" />
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8D996E]">
                  Propósito & Personalidad de Marca
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F2ED] tracking-wide leading-tight mb-4 font-sans">
                Ofrecer una experiencia multisensorial donde el{" "}
                <span className="font-serif italic text-[#A45D41]">arte</span>, la{" "}
                <span className="text-[#8D996E]">naturaleza</span> y la hospitalidad se encuentran.
              </h2>

              <p className="text-xs sm:text-sm text-[#F5F2ED]/80 font-light leading-relaxed mb-6">
                En Pazionart entendemos la hospitalidad como un acto de cariño y coherencia. No somos un hotel convencional; somos un punto de inflexión donde reconectar con la quietud y el oficio de la tierra.
              </p>

              {/* Los 4 Rasgos con UI de Tarjetas Editoriales */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  {
                    name: "Culta",
                    desc: "Sabiduría rural, botánica y respeto por las raíces históricas.",
                    color: "#8D996E",
                  },
                  {
                    name: "Serena",
                    desc: "Ritmo desacelerado, silencio fértil y armonía con el bosque.",
                    color: "#A45D41",
                  },
                  {
                    name: "Acogedora",
                    desc: "Servicio desde el corazón, con calidez, respeto y escucha.",
                    color: "#8D996E",
                  },
                  {
                    name: "Artística",
                    desc: "Cada objeto y textura concebido con intención estética y alma.",
                    color: "#A45D41",
                  },
                ].map((trait) => (
                  <div
                    key={trait.name}
                    className="p-3.5 rounded-2xl glass-panel-dark border border-[#8D996E]/15 hover:border-[#A45D41]/40 transition-colors"
                  >
                    <span
                      className="text-xs font-mono font-semibold uppercase tracking-wider block mb-1"
                      style={{ color: trait.color }}
                    >
                      {trait.name}
                    </span>
                    <span className="text-[11px] text-[#F5F2ED]/70 font-light leading-snug block">
                      {trait.desc}
                    </span>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-2 border-[#A45D41] pl-4 text-xs italic text-[#F5F2ED]/85">
                “En Pazionart servimos con amor, conectamos con la naturaleza y creamos experiencias con propósito.”
              </blockquote>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECCIÓN 03: PAZIONART CHALETS (CONFIGURADOR INTERACTIVO)
            ======================================================== */}
        <section
          id="chalets"
          ref={chaletsRef}
          className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden bg-[#1D251C] px-6 md:px-12 py-8 snap-start"
        >
          <ChaletConfigurator
            onSelectBooking={(chaletName) => openBookingFor(chaletName)}
          />
        </section>

        {/* ========================================================
            SECCIÓN 04: FILOSOFÍA & VALORES (ACORDEÓN EDITORIAL)
            ======================================================== */}
        <section
          id="valores"
          ref={valoresRef}
          className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden bg-[#182017] px-6 md:px-12 py-8 snap-start"
        >
          <ValuesAccordion />
        </section>

        {/* ========================================================
            SECCIÓN 05: LA PAUSA CONSCIENTE (VIVENCIAS SENSORIALES)
            ======================================================== */}
        <section
          id="experiencias"
          ref={experienciasRef}
          className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden bg-[#1B231B] px-6 md:px-12 py-8 snap-start"
        >
          <KineticQuote
            onBookExperience={(expTitle) => openBookingFor(`Experiencia: ${expTitle}`)}
          />
        </section>

        {/* ========================================================
            SECCIÓN 06: CONTACTO & MANIFIESTO FINAL
            ======================================================== */}
        <section
          id="contacto"
          ref={contactoRef}
          className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden bg-[#141B13] px-6 md:px-12 py-8 snap-start"
        >
          <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between py-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
              {/* Lado Izquierdo: Coordenadas & Datos de Hospitalidad */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-[#8D996E]">06</span>
                  <span className="w-8 h-[1px] bg-[#8D996E]/40" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8D996E]">
                    Encuentro & Hospitalidad
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F2ED] tracking-wide mb-4 font-sans">
                  El refugio te aguarda.{" "}
                  <span className="font-serif italic text-[#A45D41]">Hablemos.</span>
                </h2>

                <p className="text-xs sm:text-sm text-[#F5F2ED]/80 font-light leading-relaxed mb-6 max-w-lg">
                  Ya sea para una escapada de fin de semana, un retiro creativo o una estancia prolongada en medio del bosque de niebla, nuestro equipo de anfitriones coordinará cada detalle de tu estancia.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-xs text-[#F5F2ED]/90">
                    <div className="w-8 h-8 rounded-lg bg-[#8D996E]/20 text-[#8D996E] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium block">Reserva Pazionart</span>
                      <span className="text-[11px] text-[#F5F2ED]/60 font-light">
                        Montañas Andinas · Bosque Nuboso y Miradores Naturales
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#F5F2ED]/90">
                    <div className="w-8 h-8 rounded-lg bg-[#8D996E]/20 text-[#8D996E] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium block">Línea Exclusiva de Hospitalidad</span>
                      <span className="text-[11px] text-[#F5F2ED]/60 font-light">
                        Atención personalizada vía WhatsApp todos los días
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#F5F2ED]/90">
                    <div className="w-8 h-8 rounded-lg bg-[#8D996E]/20 text-[#8D996E] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium block">Correspondencia Digital</span>
                      <span className="text-[11px] text-[#F5F2ED]/60 font-light">
                        contacto@pazionart.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lado Derecho: Tarjeta de Pasaporte de Reserva & Paleta */}
              <div className="lg:col-span-6 glass-panel-dark p-6 sm:p-8 rounded-3xl border border-[#8D996E]/25 shadow-2xl">
                <div className="mb-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8D996E] block mb-1">
                    [ Solicitud Directa de Estancia ]
                  </span>
                  <h3 className="text-xl sm:text-2xl font-light text-[#F5F2ED]">
                    Coordina tu Llegada a los Chalets
                  </h3>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => openBookingFor("Chalet Niebla & Fuego")}
                    data-cursor="reserve"
                    className="w-full py-3.5 rounded-xl text-xs font-semibold tracking-[0.2em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Abrir Calendario & Fechas</span>
                  </button>

                  <a
                    href="https://wa.me/?text=Hola%20Pazionart,%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20chalets%20y%20experiencias."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl text-xs font-semibold tracking-[0.16em] uppercase glass-panel-dark hover:border-[#8D996E] text-[#F5F2ED] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#8D996E]" />
                    <span>Conectar por WhatsApp</span>
                    <ExternalLink className="w-3 h-3 text-[#F5F2ED]/40" />
                  </a>
                </div>

                {/* Paleta de Fusión Oficial del Brandbook */}
                <div className="mt-6 pt-5 border-t border-[#8D996E]/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono tracking-widest text-[#8D996E] uppercase">
                      Paleta de Fusión Oficial (Brandbook)
                    </span>
                    <span className="text-[9px] font-mono text-[#F5F2ED]/40">
                      #212b20 · #8d996e · #a45d41 · #f5f2ed
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-[#212B20] border border-[#F5F2ED]/20">
                      <div className="text-[10px] font-mono font-medium text-[#F5F2ED]">Noche</div>
                      <div className="text-[8px] font-mono text-[#F5F2ED]/50">#212b20</div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#8D996E] text-[#212B20]">
                      <div className="text-[10px] font-mono font-semibold">Tierra</div>
                      <div className="text-[8px] font-mono opacity-80">#8d996e</div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#A45D41] text-[#F5F2ED]">
                      <div className="text-[10px] font-mono font-semibold">Alma</div>
                      <div className="text-[8px] font-mono opacity-80">#a45d41</div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#F5F2ED] text-[#212B20]">
                      <div className="text-[10px] font-mono font-semibold">Luz</div>
                      <div className="text-[8px] font-mono opacity-80">#f5f2ed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer con imagotipo y créditos */}
            <footer className="pt-4 border-t border-[#8D996E]/15 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F5F2ED]/60 font-light gap-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 relative">
                  <Image
                    src="/brand/simbolo-pazionart.svg"
                    alt="Pazionart"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>© {new Date().getFullYear()} Pazionart. Todos los derechos reservados.</span>
              </div>
              <div className="text-[10px] tracking-widest text-[#8D996E] font-mono">
                AMOR · NATURALEZA · ARTE — CHALETS & EXPERIENCIAS
              </div>
            </footer>
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}
