"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Compass,
  ArrowRight,
  ChevronDown,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Users,
  Home as HomeIcon,
  MessageCircle,
  ExternalLink,
  Heart,
  Leaf,
  Award,
  ShieldCheck,
  Sun,
  Flame,
  CheckCircle2,
} from "lucide-react";

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import AmbientAudio from "@/components/AmbientAudio";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingModal from "@/components/BookingModal";
import ChaletConfigurator from "@/components/ChaletConfigurator";
import ValuesAccordion from "@/components/ValuesAccordion";
import KineticQuote from "@/components/KineticQuote";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedChalet, setSelectedChalet] = useState("Chalet Niebla & Fuego");

  // Hero Quick Booking Bar State
  const [heroChalet, setHeroChalet] = useState("Chalet Niebla & Fuego");
  const [heroGuests, setHeroGuests] = useState("2 Huéspedes");
  const [heroDate, setHeroDate] = useState("");

  const sectionsList = [
    { id: "esencia", label: "01 Esencia" },
    { id: "proposito", label: "02 Propósito" },
    { id: "chalets", label: "03 Chalets" },
    { id: "valores", label: "04 Filosofía" },
    { id: "experiencias", label: "05 Vivencias" },
    { id: "contacto", label: "06 Encuentro" },
  ];

  const handleHeroBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedChalet(heroChalet);
    setIsBookingOpen(true);
  };

  const openBookingFor = (chaletName: string) => {
    setSelectedChalet(chaletName);
    setIsBookingOpen(true);
  };

  return (
    <SmoothScroll>
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
      <ScrollProgress sections={sectionsList} />
      <AmbientAudio />
      <WhatsAppButton />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedChalet={selectedChalet}
      />

      <main className="w-full bg-[#212B20] text-[#F5F2ED]">
        {/* ========================================================
            SECCIÓN 01: HERO - EL UMBRAL CONSCIENTE
            ======================================================== */}
        <section
          id="esencia"
          className="relative w-full min-h-screen flex items-center justify-center pt-28 pb-16 px-6 md:px-12 overflow-hidden"
        >
          {/* Fondo fotográfico con velo cinemático */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-chalet.jpg"
              alt="Pazionart Chalet en la montaña"
              fill
              priority
              className="object-cover object-center scale-105"
            />
            {/* Gradientes en tono Noche (#212B20) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#212B20] via-[#212B20]/65 to-[#212B20]/45" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#212B20]/40 to-[#212B20]" />
            <div className="absolute inset-0 bg-modulacion opacity-5 pointer-events-none mix-blend-screen" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
            {/* Símbolo Pazionart SVG con resplandor suave */}
            <div className="w-16 h-16 md:w-20 md:h-20 relative mb-4 drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
              <Image
                src="/brand/simbolo-pazionart.svg"
                alt="Símbolo Pazionart"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Tagline superior */}
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[1px] bg-[#8D996E]" />
              <span className="text-xs md:text-sm font-semibold tracking-[0.35em] text-[#8D996E] uppercase font-mono">
                Amor · Naturaleza · Arte
              </span>
              <span className="w-8 h-[1px] bg-[#8D996E]" />
            </div>

            {/* Título de la marca */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.15em] uppercase text-[#F5F2ED] font-sans drop-shadow-2xl">
              Pazionart
            </h1>

            {/* Cita del Propósito del Brandbook */}
            <p className="text-sm sm:text-base md:text-lg text-[#F5F2ED]/90 max-w-2xl font-light leading-relaxed mt-3 mb-8 drop-shadow-md">
              El puente entre la{" "}
              <span className="text-[#8D996E] font-medium border-b border-[#8D996E]/40 pb-0.5">
                sabiduría artesanal rural
              </span>{" "}
              y la{" "}
              <span className="text-[#A45D41] font-medium border-b border-[#A45D41]/40 pb-0.5">
                pausa consciente
              </span>{" "}
              que buscan tanto locales como el viajero del mundo.
            </p>

            {/* ========================================================
                BARRA FLOTANTE DE RESERVA RÁPIDA (HERO BOOKING ENGINE)
                ======================================================== */}
            <form
              onSubmit={handleHeroBooking}
              className="w-full max-w-4xl glass-panel-dark p-3 sm:p-4 rounded-3xl border border-[#8D996E]/30 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center text-left"
            >
              {/* Selector de Chalet */}
              <div className="p-2.5 rounded-2xl bg-[#151D14]/70 border border-[#8D996E]/20">
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#8D996E] uppercase mb-1">
                  <HomeIcon className="w-3 h-3 text-[#A45D41]" />
                  <span>Refugio / Chalet</span>
                </div>
                <select
                  value={heroChalet}
                  onChange={(e) => setHeroChalet(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#F5F2ED] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="Chalet Niebla & Fuego" className="bg-[#212B20]">
                    Chalet Niebla & Fuego
                  </option>
                  <option value="Chalet Bosque Andino" className="bg-[#212B20]">
                    Chalet Bosque Andino
                  </option>
                  <option value="Chalet El Refugio de Arte" className="bg-[#212B20]">
                    Chalet El Refugio de Arte
                  </option>
                </select>
              </div>

              {/* Selector de Huéspedes */}
              <div className="p-2.5 rounded-2xl bg-[#151D14]/70 border border-[#8D996E]/20">
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#8D996E] uppercase mb-1">
                  <Users className="w-3 h-3 text-[#8D996E]" />
                  <span>Huéspedes</span>
                </div>
                <select
                  value={heroGuests}
                  onChange={(e) => setHeroGuests(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#F5F2ED] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="1 Huésped (Retiro)" className="bg-[#212B20]">
                    1 Huésped (Retiro)
                  </option>
                  <option value="2 Huéspedes (Pareja)" className="bg-[#212B20]">
                    2 Huéspedes (Pareja)
                  </option>
                  <option value="3-4 Huéspedes" className="bg-[#212B20]">
                    3 a 4 Huéspedes
                  </option>
                </select>
              </div>

              {/* Fecha Estimada */}
              <div className="p-2.5 rounded-2xl bg-[#151D14]/70 border border-[#8D996E]/20">
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#8D996E] uppercase mb-1">
                  <Calendar className="w-3 h-3 text-[#A45D41]" />
                  <span>Fechas Deseadas</span>
                </div>
                <input
                  type="text"
                  placeholder="Ej. Próximo fin de semana"
                  value={heroDate}
                  onChange={(e) => setHeroDate(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#F5F2ED] placeholder-[#F5F2ED]/40 focus:outline-none"
                />
              </div>

              {/* Botón CTA de Acción */}
              <button
                type="submit"
                className="w-full h-full py-3.5 px-6 rounded-2xl text-xs font-semibold tracking-[0.18em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <Compass className="w-4 h-4" />
                <span>Ver Disponibilidad</span>
              </button>
            </form>

            {/* Scroll Indicator */}
            <a
              href="#proposito"
              className="mt-12 flex flex-col items-center gap-2 text-[#F5F2ED]/60 hover:text-[#8D996E] transition-colors"
            >
              <span className="text-[10px] tracking-[0.25em] uppercase font-mono">
                Desliza para explorar la pausa
              </span>
              <ChevronDown className="w-4 h-4 animate-bounce text-[#8D996E]" />
            </a>
          </div>
        </section>

        {/* ========================================================
            SECCIÓN 02: PROPÓSITO & SABIDURÍA ARTESANAL
            ======================================================== */}
        <section
          id="proposito"
          className="relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 px-6 md:px-12 bg-[#182017]"
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Foto de Artesano & Textura de Arcilla */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden border border-[#8D996E]/25 shadow-2xl">
                <Image
                  src="/images/artesania-barro.jpg"
                  alt="Manos artesanas modelando barro en Pazionart"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151D14] via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 glass-panel-dark p-4 rounded-2xl border border-[#8D996E]/20">
                  <span className="text-[9px] font-mono text-[#8D996E] uppercase tracking-widest block mb-0.5">
                    [ Sabiduría Rural · 100% Manual ]
                  </span>
                  <p className="text-xs text-[#F5F2ED]/90 font-light leading-snug">
                    El barro modelado con paciencia, sin prisa, como homenaje al tiempo vivo.
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

              <p className="text-sm text-[#F5F2ED]/80 font-light leading-relaxed mb-6">
                En Pazionart entendemos la hospitalidad como un acto de cariño y coherencia. No somos un hotel convencional; somos un refugio donde reconectar con la quietud y el oficio de la tierra.
              </p>

              {/* Los 4 Rasgos del Brandbook */}
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
          className="relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 px-6 md:px-12 bg-[#1D251C]"
        >
          <ChaletConfigurator
            onSelectBooking={(chaletName) => openBookingFor(chaletName)}
          />
        </section>

        {/* ========================================================
            SECCIÓN 04: FILOSOFÍA & VALORES FUNDAMENTALES
            ======================================================== */}
        <section
          id="valores"
          className="relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 px-6 md:px-12 bg-[#182017]"
        >
          <ValuesAccordion />
        </section>

        {/* ========================================================
            SECCIÓN 05: LA PAUSA CONSCIENTE (VIVENCIAS SENSORIALES)
            ======================================================== */}
        <section
          id="experiencias"
          className="relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 px-6 md:px-12 bg-[#1B231B]"
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
          className="relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 px-6 md:px-12 bg-[#141B13]"
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col justify-between">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
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
            <footer className="pt-6 border-t border-[#8D996E]/15 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F5F2ED]/60 font-light gap-2">
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
