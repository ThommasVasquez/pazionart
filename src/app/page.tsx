"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  Heart,
  Leaf,
  Sparkles,
  Flame,
  Coffee,
  CheckCircle,
  Eye,
  ShieldCheck,
  Award,
  Sun,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  ChevronDown,
  Wind,
  Layers,
  Calendar,
} from "lucide-react";

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import AmbientAudio from "@/components/AmbientAudio";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedChalet, setSelectedChalet] = useState("Chalet Niebla & Fuego");
  const [activeChaletIndex, setActiveChaletIndex] = useState(0);
  const [activeValueTab, setActiveValueTab] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const propositoRef = useRef<HTMLDivElement>(null);
  const chaletsRef = useRef<HTMLDivElement>(null);
  const valoresRef = useRef<HTMLDivElement>(null);
  const experienciasRef = useRef<HTMLDivElement>(null);
  const contactoRef = useRef<HTMLDivElement>(null);

  const sectionsList = [
    { id: "esencia", label: "Esencia" },
    { id: "proposito", label: "Propósito" },
    { id: "chalets", label: "Chalets" },
    { id: "valores", label: "Valores" },
    { id: "experiencias", label: "Pausa" },
    { id: "contacto", label: "Contacto" },
  ];

  const chaletsData = [
    {
      name: "Chalet Niebla & Fuego",
      tagline: "El corazón cálido entre las nubes",
      description:
        "Diseñado con chimenea central de piedra volcánica, ventanales de triple altura que enmarcan la cordillera y una terraza suspendida con fogata privada.",
      capacity: "2 a 3 personas",
      area: "78 m²",
      features: [
        "Chimenea de leña tradicional",
        "Cama King con sábanas de lino orgánico",
        "Terraza mirador con firepit artesanal",
        "Estación de café de especialidad pour-over",
      ],
      image: "/images/hero-chalet.jpg",
    },
    {
      name: "Chalet Bosque Andino",
      tagline: "Inmersión biofílica total",
      description:
        "Rodeado de helechos gigantes y cedros centenarios. Cuenta con tina exterior de barro cocido, baño panorámico y arquitectura que respeta cada árbol del entorno.",
      capacity: "2 personas",
      area: "65 m²",
      features: [
        "Tina artesanal caliente al aire libre",
        "Ducha panorámica con luz natural",
        "Deck para meditación y yoga",
        "Desayuno campesino servido en cabaña",
      ],
      image: "/images/chalet-interior.jpg",
    },
    {
      name: "Chalet El Refugio de Arte",
      tagline: "Espacio de pausa para creadores",
      description:
        "Un santuario de silencio con estudio de lectura, obras de ceramistas locales y un balcón sobre el cañón para contemplar el vuelo de las aves al amanecer.",
      capacity: "2 a 4 personas",
      area: "90 m²",
      features: [
        "Estudio creativo con escritorio de roble",
        "Colección de cerámica y arte rural",
        "Cocina de autor equipada",
        "Telescopio para observación nocturna",
      ],
      image: "/images/experiencia-pausa.jpg",
    },
  ];

  const valoresData = [
    {
      num: "01",
      title: "Amor por el servicio",
      desc: "Servimos desde el corazón, con calidez, respeto y atención genuina a cada persona que llega a Pazionart.",
      icon: Heart,
    },
    {
      num: "02",
      title: "Conexión con la naturaleza",
      desc: "Valoramos y protegemos el entorno natural, integrándolo en cada experiencia para generar bienestar y armonía.",
      icon: Leaf,
    },
    {
      num: "03",
      title: "Excelencia con propósito",
      desc: "Buscamos hacer todo con calidad, detalle y compromiso, entendiendo que cada acción impacta la experiencia del cliente.",
      icon: Award,
    },
    {
      num: "04",
      title: "Autenticidad",
      desc: "Somos reales, cercanos y coherentes. Cada detalle refleja nuestra esencia pura y nuestra historia artesanal.",
      icon: ShieldCheck,
    },
    {
      num: "05",
      title: "Bienestar integral",
      desc: "Promovemos experiencias que nutren cuerpo, mente y espíritu, tanto para nuestros visitantes como para nuestro equipo.",
      icon: Sun,
    },
    {
      num: "06",
      title: "Innovación consciente",
      desc: "Evolucionamos de forma continua, creando nuevas experiencias sin perder nuestra esencia natural y humana.",
      icon: Sparkles,
    },
    {
      num: "07",
      title: "Responsabilidad social",
      desc: "Actuamos con conciencia comunitaria, apoyando a artesanos rurales y causas con propósito duradero.",
      icon: Eye,
    },
    {
      num: "08",
      title: "Gratitud",
      desc: "Valoramos cada huésped, cada colaborador y cada oportunidad de crecer en armonía con la tierra.",
      icon: Wind,
    },
  ];

  const experienciasData = [
    {
      title: "Alfarería & Cerámica en Barro",
      tag: "Artesanía Rural",
      desc: "Aprende a modelar vasijas con arcilla local guiado por maestros de la región. Una meditación táctil con la tierra.",
      icon: Layers,
    },
    {
      title: "Cata de Café de Origen",
      tag: "Sabores de la Tierra",
      desc: "Descubre las notas aromáticas de cafés cultivados en altura, preparados con métodos de extracción lenta y agua de manantial.",
      icon: Coffee,
    },
    {
      title: "Senderos del Bosque Nuboso",
      tag: "Conexión Botánica",
      desc: "Caminatas conscientes entre orquídeas silvestres, musgos y niebla para despertar los cinco sentidos.",
      icon: Leaf,
    },
    {
      title: "Veladas de Fuego & Estrellas",
      tag: "Hospitalidad Cálida",
      desc: "Reuniones íntimas alrededor de la fogata con relatos de la montaña, copas de vino y mantas de lino.",
      icon: Flame,
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animación de entrada para Hero
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
      .fromTo(".hero-symbol", { opacity: 0, scale: 0.85, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 1.2 })
      .fromTo(".hero-title-pazionart", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.8")
      .fromTo(".hero-tagline", { opacity: 0, letterSpacing: "0.5em" }, { opacity: 1, letterSpacing: "0.35em", duration: 1.2 }, "-=0.7")
      .fromTo(".hero-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
      .fromTo(".hero-cta", { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8 }, "-=0.5");

    // GSAP ScrollTrigger para cada sección a pantalla completa
    const sections = [
      propositoRef.current,
      chaletsRef.current,
      valoresRef.current,
      experienciasRef.current,
      contactoRef.current,
    ];

    sections.forEach((sec) => {
      if (!sec) return;
      const revealElements = sec.querySelectorAll(".reveal-item");
      if (revealElements.length > 0) {
        gsap.fromTo(
          revealElements,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.18,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 75%",
              end: "bottom 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

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
            SECCIÓN 01: HERO - EL UMBRAL CONSCIENTE
            ======================================================== */}
        <section
          id="esencia"
          ref={heroRef}
          className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden snap-start"
        >
          {/* Fondo fotográfico con overlay cinemático */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-chalet.jpg"
              alt="Pazionart Chalet en la montaña"
              fill
              priority
              className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Gradientes orgánicos en color Noche (#212B20) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#212B20] via-[#212B20]/60 to-[#212B20]/40" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#212B20]/50 to-[#212B20]" />
            {/* Modulación de marca como textura sutil al 5% de opacidad */}
            <div className="absolute inset-0 bg-modulacion opacity-5 pointer-events-none mix-blend-screen" />
          </div>

          {/* Contenido Central Hero */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center pt-16">
            {/* Símbolo Pazionart animado */}
            <div className="hero-symbol w-20 h-20 md:w-24 md:h-24 relative mb-6 drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
              <Image
                src="/brand/simbolo-pazionart.svg"
                alt="Símbolo Pazionart"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Tagline superior */}
            <div className="hero-tagline flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#8D996E]" />
              <span className="text-xs md:text-sm font-semibold tracking-[0.35em] text-[#8D996E] uppercase">
                Amor · Naturaleza · Arte
              </span>
              <span className="w-6 h-[1px] bg-[#8D996E]" />
            </div>

            {/* Nombre de la marca */}
            <h1 className="hero-title-pazionart text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.18em] uppercase text-[#F5F2ED] font-sans drop-shadow-2xl">
              Pazionart
            </h1>

            {/* Texto de propósito extraído del Brandbook */}
            <p className="hero-text text-sm sm:text-base md:text-lg text-[#F5F2ED]/90 max-w-2xl font-light leading-relaxed mt-4 drop-shadow-md">
              El puente entre la{" "}
              <span className="text-[#8D996E] font-medium">sabiduría artesanal rural</span>{" "}
              y la{" "}
              <span className="text-[#A45D41] font-medium">pausa consciente</span>{" "}
              que buscan tanto locales como el viajero moderno.
            </p>

            {/* Acciones principales */}
            <div className="hero-cta flex flex-wrap items-center justify-center gap-4 mt-8">
              <button
                onClick={() => openBookingFor("Chalet Niebla & Fuego")}
                className="px-8 py-3.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl hover:shadow-[#A45D41]/40 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2.5"
              >
                <Compass className="w-4 h-4" />
                <span>Explorar Chalets</span>
              </button>

              <a
                href="#proposito"
                className="px-8 py-3.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase glass-panel-dark text-[#F5F2ED] hover:text-[#8D996E] hover:border-[#8D996E] transition-all duration-300 cursor-pointer"
              >
                Conocer la Esencia
              </a>
            </div>

            {/* Scroll down indicator */}
            <a
              href="#proposito"
              className="absolute bottom-6 flex flex-col items-center gap-2 text-[#F5F2ED]/60 hover:text-[#8D996E] transition-colors"
              aria-label="Deslizar hacia abajo"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase font-mono">
                Desliza para adentrarte
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
          ref={propositoRef}
          className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden bg-[#212B20] px-6 md:px-12 py-12 snap-start"
        >
          {/* Patrón de modulación en esquina */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-modulacion opacity-5 pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Columna Izquierda: Fotografía de Artesanía & Manos */}
            <div className="lg:col-span-6 relative reveal-item">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-[#8D996E]/20">
                <Image
                  src="/images/artesania-barro.jpg"
                  alt="Manos artesanas modelando barro en Pazionart"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#212B20]/90 via-transparent to-transparent" />

                {/* Badge flotante en la foto */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between glass-panel-dark px-5 py-3 rounded-2xl">
                  <div>
                    <span className="text-[10px] font-mono text-[#8D996E] tracking-widest uppercase">
                      Sabiduría Rural
                    </span>
                    <h4 className="text-sm font-medium text-[#F5F2ED]">
                      Manos que transforman la tierra
                    </h4>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#A45D41]/30 flex items-center justify-center text-[#A45D41] border border-[#A45D41]/40">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Narrativa y Personalidad */}
            <div className="lg:col-span-6 flex flex-col justify-center reveal-item">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-[#8D996E] tracking-widest">
                  02
                </span>
                <span className="w-8 h-[1px] bg-[#8D996E]/40" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#8D996E] font-medium">
                  Propósito & Misión
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F2ED] tracking-wide leading-tight mb-4 font-sans">
                La pausa consciente donde el{" "}
                <span className="text-[#A45D41] italic font-serif">arte</span> y la{" "}
                <span className="text-[#8D996E]">naturaleza</span> se encuentran.
              </h2>

              <p className="text-sm md:text-base text-[#F5F2ED]/80 font-light leading-relaxed mb-6">
                Ofrecemos una experiencia multisensorial arraigada en el legado vivo de la comunidad rural. Un refugio donde el viajero y el habitante local redescubren el sosiego, la autenticidad y la contemplación profunda.
              </p>

              {/* Los 4 Pilares de Personalidad del Brandbook */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { tag: "Culta", desc: "Sabiduría ancestral y respeto por el origen" },
                  { tag: "Serena", desc: "Silencio fértil y armonía natural" },
                  { tag: "Acogedora", desc: "Hospitalidad genuina desde el corazón" },
                  { tag: "Artística", desc: "Intención y estética en cada detalle" },
                ].map((item) => (
                  <div
                    key={item.tag}
                    className="p-3.5 rounded-2xl glass-panel-dark border border-[#8D996E]/15 hover:border-[#8D996E]/40 transition-colors"
                  >
                    <div className="text-xs font-semibold tracking-wider uppercase text-[#8D996E] mb-1">
                      {item.tag}
                    </div>
                    <div className="text-[11px] text-[#F5F2ED]/70 leading-snug">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cita textual del Brandbook */}
              <blockquote className="border-l-2 border-[#A45D41] pl-4 py-1 text-xs sm:text-sm italic text-[#F5F2ED]/90">
                “En Pazionart servimos con amor, conectamos con la naturaleza y creamos experiencias con propósito.”
              </blockquote>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECCIÓN 03: PAZIONART CHALETS
            ======================================================== */}
        <section
          id="chalets"
          ref={chaletsRef}
          className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden bg-[#1D251C] px-6 md:px-12 py-10 snap-start"
        >
          {/* Fondo interactivo */}
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src={chaletsData[activeChaletIndex].image}
              alt="Chalet Pazionart"
              fill
              className="object-cover filter blur-sm transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-[#212B20]/90" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-center h-full">
            {/* Cabecera sección */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 reveal-item">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-[#8D996E] tracking-widest">03</span>
                  <span className="w-8 h-[1px] bg-[#8D996E]/40" />
                  <span className="text-xs uppercase tracking-[0.25em] text-[#8D996E] font-medium">
                    Arquitectura de Hospitalidad
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F2ED] tracking-wide">
                  Pazionart <span className="text-[#8D996E] font-normal">Chalets</span>
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#F5F2ED]/70 max-w-md mt-2 md:mt-0 leading-relaxed">
                Refugios bioclimáticos construidos con madera noble, piedra autóctona y ventanales panorámicos orientados a la niebla y al amanecer.
              </p>
            </div>

            {/* Pestañas de Chalets */}
            <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 mb-6 scrollbar-none reveal-item">
              {chaletsData.map((ch, idx) => (
                <button
                  key={ch.name}
                  onClick={() => setActiveChaletIndex(idx)}
                  className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    activeChaletIndex === idx
                      ? "bg-[#A45D41] text-[#F5F2ED] shadow-lg shadow-[#A45D41]/30 scale-[1.02]"
                      : "glass-panel-dark text-[#F5F2ED]/70 hover:text-[#F5F2ED] hover:border-[#8D996E]/40"
                  }`}
                >
                  {ch.name}
                </button>
              ))}
            </div>

            {/* Tarjeta Destacada del Chalet Activo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center glass-panel-dark p-6 sm:p-8 md:p-10 rounded-3xl border border-[#8D996E]/20 reveal-item">
              {/* Imagen del chalet */}
              <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-[#8D996E]/20">
                <Image
                  src={chaletsData[activeChaletIndex].image}
                  alt={chaletsData[activeChaletIndex].name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 glass-pill px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider text-[#F5F2ED]">
                  {chaletsData[activeChaletIndex].area} · {chaletsData[activeChaletIndex].capacity}
                </div>
              </div>

              {/* Detalles y reservas */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#8D996E] font-medium">
                    {chaletsData[activeChaletIndex].tagline}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#F5F2ED] mt-1 mb-3">
                    {chaletsData[activeChaletIndex].name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F5F2ED]/80 leading-relaxed mb-5 font-light">
                    {chaletsData[activeChaletIndex].description}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    {chaletsData[activeChaletIndex].features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 text-xs text-[#F5F2ED]/90">
                        <CheckCircle className="w-3.5 h-3.5 text-[#8D996E] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openBookingFor(chaletsData[activeChaletIndex].name)}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reservar este Chalet</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECCIÓN 04: VALORES FUNDAMENTALES (BRANDBOOK)
            ======================================================== */}
        <section
          id="valores"
          ref={valoresRef}
          className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden bg-[#212B20] px-6 md:px-12 py-10 snap-start"
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col justify-center h-full">
            {/* Título sección */}
            <div className="text-center max-w-2xl mx-auto mb-8 reveal-item">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-xs font-mono text-[#8D996E] tracking-widest">04</span>
                <span className="w-8 h-[1px] bg-[#8D996E]/40" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#8D996E] font-medium">
                  Lo que nos representa
                </span>
                <span className="w-8 h-[1px] bg-[#8D996E]/40" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F2ED] tracking-wide">
                Valores con <span className="text-[#A45D41] font-normal">Propósito</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#F5F2ED]/70 mt-2 font-light">
                Cada detalle, cada servicio y cada encuentro en Pazionart se rige por diez principios inquebrantables.
              </p>
            </div>

            {/* Grid interactivo de Valores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal-item">
              {valoresData.map((val, idx) => {
                const IconComponent = val.icon;
                const isHovered = activeValueTab === idx;
                return (
                  <div
                    key={val.num}
                    onMouseEnter={() => setActiveValueTab(idx)}
                    className={`p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between cursor-default border ${
                      isHovered
                        ? "glass-panel-warm border-[#A45D41]/50 -translate-y-1 shadow-2xl"
                        : "glass-panel-dark border-[#8D996E]/15 hover:border-[#8D996E]/40"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-[#8D996E]">
                          {val.num}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            isHovered
                              ? "bg-[#A45D41] text-[#F5F2ED]"
                              : "bg-[#8D996E]/20 text-[#8D996E]"
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="text-base font-medium text-[#F5F2ED] mb-2 font-sans">
                        {val.title}
                      </h3>
                      <p className="text-xs text-[#F5F2ED]/70 leading-relaxed font-light">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Manifiesto inferior */}
            <div className="mt-8 text-center reveal-item">
              <span className="text-xs tracking-[0.2em] uppercase font-mono text-[#8D996E]/80">
                Hospitalidad · Bienestar · Autenticidad · Respeto
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECCIÓN 05: EXPERIENCIAS & PAUSA CONSCIENTE
            ======================================================== */}
        <section
          id="experiencias"
          ref={experienciasRef}
          className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden bg-[#1B231B] px-6 md:px-12 py-10 snap-start"
        >
          {/* Fondo cinemático de terraza y niebla */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/experiencia-pausa.jpg"
              alt="Pausa consciente al atardecer en Pazionart"
              fill
              className="object-cover object-center opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#212B20] via-[#212B20]/80 to-[#212B20]/60" />
            <div className="absolute inset-0 bg-modulacion opacity-5 pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-center h-full">
            {/* Cabecera */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 reveal-item">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-[#8D996E] tracking-widest">05</span>
                  <span className="w-8 h-[1px] bg-[#8D996E]/40" />
                  <span className="text-xs uppercase tracking-[0.25em] text-[#8D996E] font-medium">
                    Experiencia Multisensorial
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F2ED] tracking-wide">
                  La <span className="text-[#8D996E]">Pausa Consciente</span>
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#F5F2ED]/80 max-w-md mt-2 md:mt-0 font-light leading-relaxed">
                Desconecta del ruido digital y vuelve a conectar con el ritmo biológico de la montaña a través de vivencias artesanales y sensoriales.
              </p>
            </div>

            {/* 4 Cards de experiencias */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 reveal-item">
              {experienciasData.map((exp) => {
                const IconComp = exp.icon;
                return (
                  <div
                    key={exp.title}
                    className="p-6 rounded-3xl glass-panel-dark border border-[#8D996E]/20 hover:border-[#A45D41]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-xl"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-2xl bg-[#A45D41]/20 text-[#A45D41] flex items-center justify-center mb-4 group-hover:bg-[#A45D41] group-hover:text-[#F5F2ED] transition-colors border border-[#A45D41]/30">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#8D996E] block mb-1">
                        {exp.tag}
                      </span>
                      <h3 className="text-lg font-medium text-[#F5F2ED] mb-2 font-sans">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-[#F5F2ED]/70 leading-relaxed font-light">
                        {exp.desc}
                      </p>
                    </div>

                    <div className="pt-5 mt-4 border-t border-[#8D996E]/15 flex items-center justify-between text-xs text-[#8D996E] group-hover:text-[#F5F2ED]">
                      <span>Incluido en estadía</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            SECCIÓN 06: CONTACTO, RESERVA & MANIFIESTO FINAL
            ======================================================== */}
        <section
          id="contacto"
          ref={contactoRef}
          className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden bg-[#182017] px-6 md:px-12 py-10 snap-start"
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col justify-between h-full py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto reveal-item">
              {/* Columna Izquierda: Información de Contacto & Ubicación */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-[#8D996E] tracking-widest">06</span>
                  <span className="w-8 h-[1px] bg-[#8D996E]/40" />
                  <span className="text-xs uppercase tracking-[0.25em] text-[#8D996E] font-medium">
                    Encuentro & Hospitalidad
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F2ED] tracking-wide mb-4 font-sans">
                  Inicia tu viaje hacia la calma en{" "}
                  <span className="text-[#A45D41]">Pazionart</span>.
                </h2>

                <p className="text-xs sm:text-sm text-[#F5F2ED]/80 leading-relaxed font-light mb-8 max-w-lg">
                  Estaremos encantados de recibirte en nuestro refugio de arte y naturaleza. Contáctanos directamente para reservar tu chalet o coordinar una experiencia personalizada.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3.5 text-xs sm:text-sm text-[#F5F2ED]/90">
                    <div className="w-9 h-9 rounded-xl bg-[#8D996E]/20 text-[#8D996E] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium">Ubicación Privilegiada</div>
                      <div className="text-xs text-[#F5F2ED]/60 font-light">
                        Cordillera Andina · Entre bosques de niebla y miradores de montaña
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 text-xs sm:text-sm text-[#F5F2ED]/90">
                    <div className="w-9 h-9 rounded-xl bg-[#8D996E]/20 text-[#8D996E] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium">Línea de Hospitalidad Directa</div>
                      <div className="text-xs text-[#F5F2ED]/60 font-light">
                        Atención personalizada vía WhatsApp los 7 días de la semana
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 text-xs sm:text-sm text-[#F5F2ED]/90">
                    <div className="w-9 h-9 rounded-xl bg-[#8D996E]/20 text-[#8D996E] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium">Correo Electrónico</div>
                      <div className="text-xs text-[#F5F2ED]/60 font-light">
                        contacto@pazionart.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Tarjeta de Solicitud Rápida */}
              <div className="lg:col-span-6 glass-panel-dark p-6 sm:p-8 rounded-3xl border border-[#8D996E]/25 shadow-2xl">
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-widest text-[#8D996E] font-medium">
                    Consulta Inmediata
                  </span>
                  <h3 className="text-2xl font-light text-[#F5F2ED] mt-1 font-sans">
                    Reserva tu Pausa en la Naturaleza
                  </h3>
                  <p className="text-xs text-[#F5F2ED]/70 mt-1">
                    Déjanos tus datos o abre el asistente de reserva para verificar fechas disponibles.
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => openBookingFor("Chalet Niebla & Fuego")}
                    className="w-full py-4 rounded-xl text-xs font-semibold tracking-[0.2em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Abrir Calendario de Reservas</span>
                  </button>

                  <a
                    href="https://wa.me/?text=Hola%20Pazionart,%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20chalets%20y%20experiencias."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl text-xs font-semibold tracking-[0.16em] uppercase glass-panel-dark hover:border-[#8D996E] text-[#F5F2ED] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Conversar con un Anfitrión por WhatsApp</span>
                  </a>
                </div>

                {/* Muestra de la Paleta de Fusión (Brandbook pág 15) */}
                <div className="mt-8 pt-6 border-t border-[#8D996E]/20">
                  <span className="text-[10px] font-mono tracking-widest text-[#8D996E] uppercase block mb-3">
                    Paleta de Fusión Oficial
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-[#212B20] border border-[#F5F2ED]/30 mb-1" />
                      <span className="text-[10px] font-mono text-[#F5F2ED]/70">Noche</span>
                      <span className="text-[9px] font-mono text-[#F5F2ED]/40">#212b20</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-[#8D996E] mb-1" />
                      <span className="text-[10px] font-mono text-[#F5F2ED]/70">Tierra</span>
                      <span className="text-[9px] font-mono text-[#8D996E]">#8d996e</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-[#A45D41] mb-1" />
                      <span className="text-[10px] font-mono text-[#F5F2ED]/70">Alma</span>
                      <span className="text-[9px] font-mono text-[#A45D41]">#a45d41</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-[#F5F2ED] mb-1" />
                      <span className="text-[10px] font-mono text-[#F5F2ED]/70">Luz</span>
                      <span className="text-[9px] font-mono text-[#F5F2ED]/40">#f5f2ed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Integrado */}
            <footer className="pt-6 border-t border-[#8D996E]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5F2ED]/60 font-light gap-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 relative">
                  <Image
                    src="/brand/simbolo-pazionart.svg"
                    alt="Pazionart"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>© {new Date().getFullYear()} Pazionart. Todos los derechos reservados.</span>
              </div>
              <div className="text-[11px] tracking-wider text-[#8D996E]">
                AMOR · NATURALEZA · ARTE — CHALETS & EXPERIENCIAS
              </div>
            </footer>
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}
