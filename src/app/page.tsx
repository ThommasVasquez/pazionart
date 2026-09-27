"use client";

import { useState, useEffect, useRef } from "react";
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
  UtensilsCrossed,
  Clock,
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
import SplashMask from "@/components/SplashMask";
import LogoTexto from "@/components/LogoTexto";
import DualThreshold from "@/components/DualThreshold";
import RestaurantSection from "@/components/RestaurantSection";
import { startSafeViewTransition } from "@/lib/viewTransition";
import { usePreferences } from "@/context/PreferencesContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedChalet, setSelectedChalet] = useState("Chalet Niebla & Fuego");
  const [showThreshold, setShowThreshold] = useState(true);
  const [activeWorld, setActiveWorld] = useState<"chalets" | "restaurante" | "explore">("chalets");
  const isRestaurante = activeWorld === "restaurante";

  const { t, theme } = usePreferences();
  const isLight = theme === "light";

  // Hero Quick Booking Bar State - Chalets
  const [heroChalet, setHeroChalet] = useState("Chalet Niebla & Fuego");
  const [heroGuests, setHeroGuests] = useState("2 Huéspedes");
  const [heroDate, setHeroDate] = useState("");

  // Hero Quick Booking Bar State - Restaurante
  const [heroTableGuests, setHeroTableGuests] = useState("2 Comensales");
  const [heroTableService, setHeroTableService] = useState("Cena al Atardecer (5:30 PM)");

  // Hero Quick Booking Bar State - Explore
  const [heroExploreType, setHeroExploreType] = useState("Estadía en Chalet");

  // Leer preferencia previa o query param (?mundo=) en cliente
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlWorld = params.get("mundo");
      if (urlWorld === "chalets" || urlWorld === "restaurante" || urlWorld === "explore") {
        setActiveWorld(urlWorld);
        setShowThreshold(false);
        return;
      }
      const savedWorld = localStorage.getItem("pazionart_active_world") as
        | "chalets"
        | "restaurante"
        | "explore"
        | null;
      if (savedWorld && ["chalets", "restaurante", "explore"].includes(savedWorld)) {
        setActiveWorld(savedWorld);
      }
    } catch {}
  }, []);

  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (showThreshold || !mainRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Entrance Timeline (Tagline, Descripción y Formulario complementan la View Transition)
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTl
        .fromTo(
          ".hero-tagline",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, delay: 0.15 }
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ".hero-booking-form",
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ".hero-scroll-indicator",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );

      // 2. Hero Scroll Parallax & Gentle Content Lift
      gsap.to(".hero-bg-image", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: "#esencia",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-content", {
        y: -45,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: "#esencia",
          start: "center top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 3. Propósito Section ScrollTrigger
      const propositoTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#proposito",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      propositoTl
        .fromTo(
          ".proposito-photo",
          { opacity: 0, y: 55, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0 }
        )
        .fromTo(
          ".proposito-photo-badge",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.6"
        )
        .fromTo(
          ".proposito-tagline",
          { opacity: 0, x: -25 },
          { opacity: 1, x: 0, duration: 0.6 },
          "-=0.8"
        )
        .fromTo(
          ".proposito-heading",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".proposito-desc",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.6"
        )
        .fromTo(
          ".proposito-trait",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.5"
        )
        .fromTo(
          ".proposito-quote",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.7 },
          "-=0.4"
        );

      // 4. Portal Switch Cards
      gsap.utils.toArray<HTMLElement>(".portal-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 5. Contacto Section ScrollTrigger
      const contactoTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#contacto",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      contactoTl
        .fromTo(
          ".contacto-tagline",
          { opacity: 0, x: -25 },
          { opacity: 1, x: 0, duration: 0.6 }
        )
        .fromTo(
          ".contacto-heading",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ".contacto-desc",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          ".contacto-item",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 },
          "-=0.4"
        )
        .fromTo(
          ".contacto-card",
          { opacity: 0, y: 45, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          ".contacto-palette-item",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05 },
          "-=0.4"
        )
        .fromTo(
          ".site-footer",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        );
    }, mainRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [showThreshold, activeWorld]);

  const sectionsList =
    activeWorld === "restaurante"
      ? [
          { id: "esencia", label: `01 ${t.nav.fogon}` },
          { id: "proposito", label: `02 ${t.nav.origen}` },
          { id: "restaurante", label: `03 ${t.nav.menu}` },
          { id: "valores", label: `04 ${t.nav.filosofia}` },
          { id: "experiencias", label: `05 ${t.nav.vivencias}` },
          { id: "contacto", label: `06 ${t.nav.contacto}` },
        ]
      : activeWorld === "chalets"
      ? [
          { id: "esencia", label: `01 ${t.nav.esencia}` },
          { id: "proposito", label: `02 ${t.nav.proposito}` },
          { id: "chalets", label: `03 ${t.nav.chalets}` },
          { id: "valores", label: `04 ${t.nav.filosofia}` },
          { id: "experiencias", label: `05 ${t.nav.vivencias}` },
          { id: "contacto", label: `06 ${t.nav.contacto}` },
        ]
      : [
          { id: "esencia", label: `01 ${t.nav.esencia}` },
          { id: "proposito", label: `02 ${t.nav.proposito}` },
          { id: "restaurante", label: `03 ${t.nav.fogon}` },
          { id: "chalets", label: `04 ${t.nav.chalets}` },
          { id: "valores", label: `05 ${t.nav.filosofia}` },
          { id: "experiencias", label: `06 ${t.nav.vivencias}` },
          { id: "contacto", label: `07 ${t.nav.contacto}` },
        ];

  const handleHeroBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeWorld === "restaurante") {
      const dateText = heroDate ? ` para la fecha ${heroDate}` : "";
      const msg = encodeURIComponent(
        `Hola Pazionart, deseo reservar una mesa en El Fogón para ${heroTableGuests}${dateText} en el turno de ${heroTableService}. ¿Tienen disponibilidad?`
      );
      window.open(`https://wa.me/?text=${msg}`, "_blank");
    } else if (activeWorld === "explore") {
      if (heroExploreType.includes("Fogón")) {
        const dateText = heroDate ? ` para la fecha ${heroDate}` : "";
        const msg = encodeURIComponent(
          `Hola Pazionart, deseo consultar disponibilidad para una mesa en El Fogón para ${heroGuests}${dateText}. ¿Tienen disponibilidad?`
        );
        window.open(`https://wa.me/?text=${msg}`, "_blank");
      } else {
        setSelectedChalet(heroChalet);
        setIsBookingOpen(true);
      }
    } else {
      setSelectedChalet(heroChalet);
      setIsBookingOpen(true);
    }
  };

  const openBookingFor = (chaletName: string) => {
    startSafeViewTransition(() => {
      setSelectedChalet(chaletName);
      setIsBookingOpen(true);
    });
  };

  const handleCloseBooking = () => {
    startSafeViewTransition(() => {
      setIsBookingOpen(false);
    });
  };

  const handleCloseSplash = () => {
    startSafeViewTransition(() => {
      setShowSplash(false);
    });
  };

  const handleWorldSelection = (world: "chalets" | "restaurante" | "explore") => {
    startSafeViewTransition(
      () => {
        setActiveWorld(world);
        try {
          localStorage.setItem("pazionart_active_world", world);
        } catch {}
        setShowThreshold(false);
      },
      {
        onFinished: () => {
          ScrollTrigger.refresh();
        },
      }
    );
  };

  const handleOpenThreshold = () => {
    startSafeViewTransition(
      () => {
        setShowThreshold(true);
      },
      {
        onFinished: () => {
          ScrollTrigger.refresh();
        },
      }
    );
  };

  return (
    <SmoothScroll>
      {showSplash && <SplashMask onClose={handleCloseSplash} />}
      <DualThreshold
        isOpen={showThreshold}
        onSelectWorld={handleWorldSelection}
      />
      {!showThreshold && (
        <Navbar
          onOpenBooking={() => openBookingFor(selectedChalet)}
          onOpenThreshold={handleOpenThreshold}
          activeWorld={activeWorld}
          onSelectWorld={handleWorldSelection}
        />
      )}
      {!showThreshold && <ScrollProgress sections={sectionsList} activeWorld={activeWorld} />}
      {!showThreshold && <AmbientAudio />}
      {!showThreshold && <WhatsAppButton />}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        selectedChalet={selectedChalet}
      />

      <main
        ref={mainRef}
        className={`w-full transition-colors duration-700 ${
          isLight
            ? isRestaurante
              ? "bg-[#F8F3ED] text-[#2A1B14]"
              : "bg-[#F7F5EE] text-[#1A2219]"
            : isRestaurante
            ? "bg-[#1C1512] text-[#F5F2ED]"
            : "bg-[#212B20] text-[#F5F2ED]"
        }`}
      >
        {/* ========================================================
            SECCIÓN 01: HERO - EL UMBRAL CONSCIENTE
            ======================================================== */}
        <section
          id="esencia"
          className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-12 px-6 md:px-12 overflow-hidden"
        >
          {/* Fondo fotográfico con velo cinemático adaptado al mundo y al tema */}
          <div className="absolute inset-0 z-0">
            <Image
              src={
                activeWorld === "restaurante"
                  ? "/images/restaurante-fogon.jpg"
                  : "/images/hero-chalet.jpg"
              }
              alt={
                activeWorld === "restaurante"
                  ? "Pazionart Restaurante & Fogón Campesino"
                  : "Pazionart Chalets en la montaña"
              }
              fill
              priority
              className="hero-bg-image object-cover object-center scale-105"
              style={{ viewTransitionName: "hero-sanctuary-image" }}
            />
            {/* Gradientes adaptados para modo Oscuro (Noche) o Claro (Sol & Tierra) */}
            {isLight ? (
              isRestaurante ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F8F3ED] via-[#F8F3ED]/75 to-[#F8F3ED]/35" />
                  <div className="absolute inset-0 bg-radial from-transparent via-[#F8F3ED]/25 to-[#F8F3ED]" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F7F5EE] via-[#F7F5EE]/75 to-[#F7F5EE]/35" />
                  <div className="absolute inset-0 bg-radial from-transparent via-[#F7F5EE]/25 to-[#F7F5EE]" />
                </>
              )
            ) : isRestaurante ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1512] via-[#1C1512]/70 to-[#1C1512]/45" />
                <div className="absolute inset-0 bg-radial from-transparent via-[#1C1512]/40 to-[#1C1512]" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-[#212B20] via-[#212B20]/65 to-[#212B20]/45" />
                <div className="absolute inset-0 bg-radial from-transparent via-[#212B20]/40 to-[#212B20]" />
              </>
            )}
            <div className="absolute inset-0 bg-modulacion opacity-5 pointer-events-none mix-blend-screen" />
          </div>

          <div className="hero-content relative z-20 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
            {/* Símbolo Pazionart SVG con resplandor suave */}
            <div
              className="hero-symbol w-16 h-16 md:w-20 md:h-20 relative mb-4 drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
              style={{ viewTransitionName: "hero-brand-symbol" }}
            >
              <Image
                src="/brand/simbolo-pazionart.svg"
                alt="Símbolo Pazionart"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Tagline superior */}
            <div className="hero-tagline flex items-center gap-3 mb-2">
              <span className={`w-8 h-[1px] ${activeWorld === "restaurante" ? "bg-[#A45D41]" : "bg-[#8D996E]"}`} />
              <span
                className={`text-xs md:text-sm font-semibold tracking-[0.35em] uppercase font-mono ${
                  activeWorld === "restaurante"
                    ? isLight
                      ? "text-[#A45D41]"
                      : "text-[#D48B6A]"
                    : "text-[#8D996E]"
                }`}
              >
                {activeWorld === "restaurante"
                  ? t.hero.restaurantTagline
                  : activeWorld === "chalets"
                  ? t.hero.chaletsTagline
                  : t.hero.exploreTagline}
              </span>
              <span className={`w-8 h-[1px] ${activeWorld === "restaurante" ? "bg-[#A45D41]" : "bg-[#8D996E]"}`} />
            </div>

            {/* Título de la marca con Logo Texto Oficial SVG */}
            <h1 className="sr-only">Pazionart</h1>
            <div
              className="hero-logo h-12 sm:h-[72px] md:h-24 lg:h-32 flex items-center justify-center"
              style={{ viewTransitionName: "hero-brand-logo" }}
            >
              <LogoTexto
                className="h-full w-auto filter drop-shadow-2xl"
                fill={isLight ? (isRestaurante ? "#2A1B14" : "#1A2219") : "#F5F2ED"}
              />
            </div>

            {/* Cita del Propósito del Brandbook adaptada al mundo y traducida */}
            <p
              className={`hero-description text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed mt-3 mb-8 drop-shadow-md ${
                isLight ? "text-[#1A2219]/90" : "text-[#F5F2ED]/90"
              }`}
            >
              {activeWorld === "restaurante" ? (
                <>
                  {t.hero.restaurantDescP1}{" "}
                  <span className="text-[#A45D41] font-medium border-b border-[#A45D41]/40 pb-0.5">
                    {t.hero.restaurantDescHighlight}
                  </span>{" "}
                  {t.hero.restaurantDescP2}
                </>
              ) : activeWorld === "chalets" ? (
                <>
                  {t.hero.chaletsDescP1}{" "}
                  <span
                    className={`${
                      isLight ? "text-[#5B6D49]" : "text-[#8D996E]"
                    } font-medium border-b border-[#8D996E]/40 pb-0.5`}
                  >
                    {t.hero.chaletsDescHighlight}
                  </span>{" "}
                  {t.hero.chaletsDescP2}
                </>
              ) : (
                <>
                  {t.hero.exploreDescP1}{" "}
                  <span className="text-[#A45D41] font-medium border-b border-[#A45D41]/40 pb-0.5">
                    {t.hero.exploreDescHighlight}
                  </span>{" "}
                  {t.hero.exploreDescP2}
                </>
              )}
            </p>

            {/* ========================================================
                BARRA FLOTANTE DE RESERVA RÁPIDA (HERO BOOKING ENGINE)
                ======================================================== */}
            {activeWorld === "restaurante" ? (
              <form
                onSubmit={handleHeroBooking}
                className={`hero-booking-form w-full max-w-4xl backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center text-left transition-colors duration-500 ${
                  isLight
                    ? "bg-white/90 border border-[#A45D41]/35 text-[#2A1B14]"
                    : "bg-[#16100E]/90 border border-[#A45D41]/35 text-[#F5F2ED]"
                }`}
              >
                {/* Selector de Comensales */}
                <div className={`p-2.5 rounded-2xl border transition-colors ${
                  isLight
                    ? "bg-[#FAF5EF] border-[#A45D41]/25"
                    : "bg-[#140D0B]/80 border-[#A45D41]/25"
                }`}>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#D48B6A] uppercase mb-1">
                    <Users className="w-3 h-3 text-[#A45D41]" />
                    <span>{t.hero.tableGuestsLabel}</span>
                  </div>
                  <select
                    value={heroTableGuests}
                    onChange={(e) => setHeroTableGuests(e.target.value)}
                    className={`w-full bg-transparent text-xs font-medium focus:outline-none cursor-pointer ${
                      isLight ? "text-[#2A1B14]" : "text-[#F5F2ED]"
                    }`}
                  >
                    <option value="2 Comensales (Mesa Íntima)" className={isLight ? "bg-white text-[#2A1B14]" : "bg-[#1C1512] text-[#F5F2ED]"}>
                      2 Comensales (Mesa Íntima)
                    </option>
                    <option value="3 a 4 Comensales (Mesa Familiar)" className={isLight ? "bg-white text-[#2A1B14]" : "bg-[#1C1512] text-[#F5F2ED]"}>
                      3 a 4 Comensales (Mesa Familiar)
                    </option>
                    <option value="5 a 8 Comensales (Mesa del Fogón)" className={isLight ? "bg-white text-[#2A1B14]" : "bg-[#1C1512] text-[#F5F2ED]"}>
                      5 a 8 Comensales (Mesa del Fogón)
                    </option>
                  </select>
                </div>

                {/* Turno / Experiencia */}
                <div className={`p-2.5 rounded-2xl border transition-colors ${
                  isLight
                    ? "bg-[#FAF5EF] border-[#A45D41]/25"
                    : "bg-[#140D0B]/80 border-[#A45D41]/25"
                }`}>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#D48B6A] uppercase mb-1">
                    <Clock className="w-3 h-3 text-[#D48B6A]" />
                    <span>{t.hero.serviceLabel}</span>
                  </div>
                  <select
                    value={heroTableService}
                    onChange={(e) => setHeroTableService(e.target.value)}
                    className={`w-full bg-transparent text-xs font-medium focus:outline-none cursor-pointer ${
                      isLight ? "text-[#2A1B14]" : "text-[#F5F2ED]"
                    }`}
                  >
                    <option value="Almuerzo de Huerto (12:30 PM)" className={isLight ? "bg-white text-[#2A1B14]" : "bg-[#1C1512] text-[#F5F2ED]"}>
                      Almuerzo de Huerto (12:30 PM)
                    </option>
                    <option value="Cena al Atardecer (5:30 PM)" className={isLight ? "bg-white text-[#2A1B14]" : "bg-[#1C1512] text-[#F5F2ED]"}>
                      Cena al Atardecer (5:30 PM)
                    </option>
                    <option value="Noche de Fuego & Vinos (7:30 PM)" className={isLight ? "bg-white text-[#2A1B14]" : "bg-[#1C1512] text-[#F5F2ED]"}>
                      Noche de Fuego & Vinos (7:30 PM)
                    </option>
                  </select>
                </div>

                {/* Fecha Estimada */}
                <div className={`p-2.5 rounded-2xl border transition-colors ${
                  isLight
                    ? "bg-[#FAF5EF] border-[#A45D41]/25"
                    : "bg-[#140D0B]/80 border-[#A45D41]/25"
                }`}>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#D48B6A] uppercase mb-1">
                    <Calendar className="w-3 h-3 text-[#A45D41]" />
                    <span>{t.hero.datesLabel}</span>
                  </div>
                  <input
                    type="text"
                    placeholder={t.hero.datesPlaceholder}
                    value={heroDate}
                    onChange={(e) => setHeroDate(e.target.value)}
                    className={`w-full bg-transparent text-xs focus:outline-none ${
                      isLight
                        ? "text-[#2A1B14] placeholder-[#2A1B14]/40"
                        : "text-[#F5F2ED] placeholder-[#F5F2ED]/40"
                    }`}
                  />
                </div>

                {/* Botón CTA de Acción Fogón */}
                <button
                  type="submit"
                  className="w-full h-full py-3.5 px-6 rounded-2xl text-xs font-semibold tracking-[0.18em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <Flame className="w-4 h-4 text-[#F5F2ED]" />
                  <span>{t.hero.reserveTableBtn}</span>
                </button>
              </form>
            ) : activeWorld === "explore" ? (
              <form
                onSubmit={handleHeroBooking}
                className={`hero-booking-form w-full max-w-4xl backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center text-left transition-colors duration-500 ${
                  isLight
                    ? "bg-white/90 border border-[#8D996E]/30 text-[#1A2219]"
                    : "glass-panel-dark border border-[#8D996E]/30 text-[#F5F2ED]"
                }`}
              >
                {/* Selector de Experiencia */}
                <div className={`p-2.5 rounded-2xl border transition-colors ${
                  isLight
                    ? "bg-[#F7F5EE] border-[#8D996E]/25"
                    : "bg-[#151D14]/70 border-[#8D996E]/20"
                }`}>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#8D996E] uppercase mb-1">
                    <Sparkles className="w-3 h-3 text-[#A45D41]" />
                    <span>{t.hero.experienceTypeLabel}</span>
                  </div>
                  <select
                    value={heroExploreType}
                    onChange={(e) => setHeroExploreType(e.target.value)}
                    className={`w-full bg-transparent text-xs font-medium focus:outline-none cursor-pointer ${
                      isLight ? "text-[#1A2219]" : "text-[#F5F2ED]"
                    }`}
                  >
                    <option value="Estadía en Chalet" className={isLight ? "bg-white text-[#1A2219]" : "bg-[#212B20] text-[#F5F2ED]"}>
                      {t.hero.stayInChalet}
                    </option>
                    <option value="Mesa en El Fogón" className={isLight ? "bg-white text-[#1A2219]" : "bg-[#212B20] text-[#F5F2ED]"}>
                      {t.hero.lunchDinner}
                    </option>
                    <option value="Santuario Completo (Estadía + Fogón)" className={isLight ? "bg-white text-[#1A2219]" : "bg-[#212B20] text-[#F5F2ED]"}>
                      {t.hero.completeExperience}
                    </option>
                  </select>
                </div>

                {/* Selector de Personas */}
                <div className={`p-2.5 rounded-2xl border transition-colors ${
                  isLight
                    ? "bg-[#F7F5EE] border-[#8D996E]/25"
                    : "bg-[#151D14]/70 border-[#8D996E]/20"
                }`}>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#8D996E] uppercase mb-1">
                    <Users className="w-3 h-3 text-[#8D996E]" />
                    <span>{t.hero.guestsLabel}</span>
                  </div>
                  <select
                    value={heroGuests}
                    onChange={(e) => setHeroGuests(e.target.value)}
                    className={`w-full bg-transparent text-xs font-medium focus:outline-none cursor-pointer ${
                      isLight ? "text-[#1A2219]" : "text-[#F5F2ED]"
                    }`}
                  >
                    <option value="1 Persona (Retiro)" className={isLight ? "bg-white text-[#1A2219]" : "bg-[#212B20] text-[#F5F2ED]"}>
                      1 Persona (Retiro)
                    </option>
                    <option value="2 Personas (Pareja)" className={isLight ? "bg-white text-[#1A2219]" : "bg-[#212B20] text-[#F5F2ED]"}>
                      2 Personas (Pareja)
                    </option>
                    <option value="3 a 4 Personas" className={isLight ? "bg-white text-[#1A2219]" : "bg-[#212B20] text-[#F5F2ED]"}>
                      3 a 4 Personas
                    </option>
                  </select>
                </div>

                {/* Fecha Estimada */}
                <div className={`p-2.5 rounded-2xl border transition-colors ${
                  isLight
                    ? "bg-[#F7F5EE] border-[#8D996E]/25"
                    : "bg-[#151D14]/70 border-[#8D996E]/20"
                }`}>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#8D996E] uppercase mb-1">
                    <Calendar className="w-3 h-3 text-[#A45D41]" />
                    <span>{t.hero.datesLabel}</span>
                  </div>
                  <input
                    type="text"
                    placeholder={t.hero.datesPlaceholder}
                    value={heroDate}
                    onChange={(e) => setHeroDate(e.target.value)}
                    className={`w-full bg-transparent text-xs focus:outline-none ${
                      isLight
                        ? "text-[#1A2219] placeholder-[#1A2219]/40"
                        : "text-[#F5F2ED] placeholder-[#F5F2ED]/40"
                    }`}
                  />
                </div>

                {/* Botón CTA Explore */}
                <button
                  type="submit"
                  className="w-full h-full py-3.5 px-6 rounded-2xl text-xs font-semibold tracking-[0.18em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <Compass className="w-4 h-4" />
                  <span>{t.hero.exploreBtn}</span>
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleHeroBooking}
                className={`hero-booking-form w-full max-w-4xl backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center text-left transition-colors duration-500 ${
                  isLight
                    ? "bg-white/90 border border-[#8D996E]/30 text-[#1A2219]"
                    : "glass-panel-dark border border-[#8D996E]/30 text-[#F5F2ED]"
                }`}
              >
                {/* Selector de Chalet */}
                <div className={`p-2.5 rounded-2xl border transition-colors ${
                  isLight
                    ? "bg-[#F7F5EE] border-[#8D996E]/25"
                    : "bg-[#151D14]/70 border-[#8D996E]/20"
                }`}>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#8D996E] uppercase mb-1">
                    <HomeIcon className="w-3 h-3 text-[#A45D41]" />
                    <span>{t.hero.chaletLabel}</span>
                  </div>
                  <select
                    value={heroChalet}
                    onChange={(e) => setHeroChalet(e.target.value)}
                    className={`w-full bg-transparent text-xs font-medium focus:outline-none cursor-pointer ${
                      isLight ? "text-[#1A2219]" : "text-[#F5F2ED]"
                    }`}
                  >
                    <option value="Chalet Niebla & Fuego" className={isLight ? "bg-white text-[#1A2219]" : "bg-[#212B20] text-[#F5F2ED]"}>
                      Chalet Niebla & Fuego
                    </option>
                    <option value="Chalet Bosque Andino" className={isLight ? "bg-white text-[#1A2219]" : "bg-[#212B20] text-[#F5F2ED]"}>
                      Chalet Bosque Andino
                    </option>
                    <option value="Chalet El Refugio de Arte" className={isLight ? "bg-white text-[#1A2219]" : "bg-[#212B20] text-[#F5F2ED]"}>
                      Chalet El Refugio de Arte
                    </option>
                  </select>
                </div>

                {/* Selector de Huéspedes */}
                <div className={`p-2.5 rounded-2xl border transition-colors ${
                  isLight
                    ? "bg-[#F7F5EE] border-[#8D996E]/25"
                    : "bg-[#151D14]/70 border-[#8D996E]/20"
                }`}>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#8D996E] uppercase mb-1">
                    <Users className="w-3 h-3 text-[#8D996E]" />
                    <span>{t.hero.guestsLabel}</span>
                  </div>
                  <select
                    value={heroGuests}
                    onChange={(e) => setHeroGuests(e.target.value)}
                    className={`w-full bg-transparent text-xs font-medium focus:outline-none cursor-pointer ${
                      isLight ? "text-[#1A2219]" : "text-[#F5F2ED]"
                    }`}
                  >
                    <option value="1 Huésped (Retiro)" className={isLight ? "bg-white text-[#1A2219]" : "bg-[#212B20] text-[#F5F2ED]"}>
                      1 Huésped (Retiro)
                    </option>
                    <option value="2 Huéspedes (Pareja)" className={isLight ? "bg-white text-[#1A2219]" : "bg-[#212B20] text-[#F5F2ED]"}>
                      2 Huéspedes (Pareja)
                    </option>
                    <option value="3 a 4 Huéspedes" className={isLight ? "bg-white text-[#1A2219]" : "bg-[#212B20] text-[#F5F2ED]"}>
                      3 a 4 Huéspedes
                    </option>
                  </select>
                </div>

                {/* Fecha Estimada */}
                <div className={`p-2.5 rounded-2xl border transition-colors ${
                  isLight
                    ? "bg-[#F7F5EE] border-[#8D996E]/25"
                    : "bg-[#151D14]/70 border-[#8D996E]/20"
                }`}>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#8D996E] uppercase mb-1">
                    <Calendar className="w-3 h-3 text-[#A45D41]" />
                    <span>{t.hero.datesLabel}</span>
                  </div>
                  <input
                    type="text"
                    placeholder={t.hero.datesPlaceholder}
                    value={heroDate}
                    onChange={(e) => setHeroDate(e.target.value)}
                    className={`w-full bg-transparent text-xs focus:outline-none ${
                      isLight
                        ? "text-[#1A2219] placeholder-[#1A2219]/40"
                        : "text-[#F5F2ED] placeholder-[#F5F2ED]/40"
                    }`}
                  />
                </div>

                {/* Botón CTA de Acción */}
                <button
                  type="submit"
                  className="w-full h-full py-3.5 px-6 rounded-2xl text-xs font-semibold tracking-[0.18em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <Compass className="w-4 h-4" />
                  <span>{t.hero.consultBtn}</span>
                </button>
              </form>
            )}

            {/* Scroll Indicator */}
            <a
              href="#proposito"
              className={`hero-scroll-indicator mt-12 flex flex-col items-center gap-2 transition-colors ${
                isLight
                  ? isRestaurante
                    ? "text-[#2A1B14]/60 hover:text-[#A45D41]"
                    : "text-[#1A2219]/60 hover:text-[#5B6D49]"
                  : isRestaurante
                  ? "text-[#F5F2ED]/60 hover:text-[#D48B6A]"
                  : "text-[#F5F2ED]/60 hover:text-[#8D996E]"
              }`}
            >
              <span className="text-[10px] tracking-[0.25em] uppercase font-mono">
                {t.hero.scrollHint}
              </span>
              <ChevronDown className={`w-4 h-4 animate-bounce ${isRestaurante ? "text-[#A45D41]" : isLight ? "text-[#5B6D49]" : "text-[#8D996E]"}`} />
            </a>
          </div>

          {/* Difuminado suave de transición hacia Sección 02 */}
          <div className={`absolute -bottom-1 left-0 right-0 h-36 md:h-56 bg-gradient-to-b from-transparent pointer-events-none z-10 ${
            isRestaurante ? "via-[#1E1613]/85 to-[#1E1613]" : "via-[#182017]/80 to-[#182017]"
          }`} />
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-28 bg-radial pointer-events-none z-10 blur-3xl ${
            isRestaurante ? "from-[#A45D41]/16 to-transparent" : "from-[#8D996E]/12 to-transparent"
          }`} />
        </section>

        {/* ========================================================
            SECCIÓN 02: PROPÓSITO & SABIDURÍA ARTESANAL
            ======================================================== */}
        <section
          id="proposito"
          className={`relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 px-6 md:px-12 overflow-hidden transition-colors duration-700 ${
            isLight
              ? isRestaurante
                ? "bg-[#FAF5EF]"
                : "bg-[#F7F5EE]"
              : isRestaurante
              ? "bg-[#1E1613]"
              : "bg-[#182017]"
          }`}
        >
          {/* Difuminado superior desde Hero */}
          <div className={`absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b pointer-events-none z-10 ${
            isLight
              ? isRestaurante
                ? "from-[#F8F3ED]/80 via-[#FAF5EF]/50 to-transparent"
                : "from-[#F7F5EE]/80 via-[#F7F5EE]/50 to-transparent"
              : isRestaurante
              ? "from-[#1C1512]/80 via-[#1E1613]/50 to-transparent"
              : "from-[#212B20]/75 via-[#182017]/50 to-transparent"
          }`} />
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r pointer-events-none z-20 blur-[1px] ${
            isRestaurante ? "from-transparent via-[#A45D41]/30 to-transparent" : "from-transparent via-[#8D996E]/20 to-transparent"
          }`} />

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-20">
            {/* Foto de Artesano & Textura de Arcilla */}
            <div className="lg:col-span-5 relative">
              <div className={`proposito-photo relative aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl ${
                isRestaurante ? "border border-[#A45D41]/35" : "border border-[#8D996E]/25"
              }`}>
                <Image
                  src="/images/artesania-barro.jpg"
                  alt="Manos artesanas modelando barro en Pazionart"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  isLight
                    ? "from-black/40 via-transparent to-transparent"
                    : isRestaurante
                    ? "from-[#16100E] via-transparent to-transparent"
                    : "from-[#151D14] via-transparent to-transparent"
                }`} />

                <div className={`proposito-photo-badge absolute bottom-6 left-6 right-6 p-4 rounded-2xl border ${
                  isLight
                    ? isRestaurante
                      ? "bg-white/90 backdrop-blur-md border-[#A45D41]/30 shadow-lg text-[#2A1B14]"
                      : "bg-white/90 backdrop-blur-md border-[#8D996E]/25 shadow-lg text-[#1A2219]"
                    : isRestaurante
                    ? "bg-[#16100E]/90 backdrop-blur-md border-[#A45D41]/30 shadow-lg text-[#F5F2ED]"
                    : "glass-panel-dark border-[#8D996E]/20 text-[#F5F2ED]"
                }`}>
                  <span className={`text-[9px] font-mono uppercase tracking-widest block mb-0.5 ${
                    isRestaurante ? "text-[#D48B6A]" : isLight ? "text-[#5B6D49]" : "text-[#8D996E]"
                  }`}>
                    {activeWorld === "restaurante"
                      ? t.proposito.tagRestaurant
                      : t.proposito.tagChalets}
                  </span>
                  <p className={`text-xs font-light leading-snug ${
                    isLight ? "text-inherit opacity-90" : "text-[#F5F2ED]/90"
                  }`}>
                    {activeWorld === "restaurante"
                      ? "El barro modelado para alimentar el alma, honrando el ciclo de la semilla y la brasa."
                      : "El barro modelado con paciencia, sin prisa, como homenaje al tiempo vivo."}
                  </p>
                </div>
              </div>
            </div>

            {/* Narrativa Editorial & 4 Rasgos de Personalidad */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="proposito-tagline flex items-center gap-2 mb-2">
                <span className={`text-xs font-mono ${isRestaurante ? "text-[#D48B6A]" : isLight ? "text-[#5B6D49]" : "text-[#8D996E]"}`}>02</span>
                <span className={`w-8 h-[1px] ${isRestaurante ? "bg-[#A45D41]/40" : "bg-[#8D996E]/40"}`} />
                <span className={`text-[10px] font-mono uppercase tracking-[0.25em] ${isRestaurante ? "text-[#D48B6A]" : isLight ? "text-[#5B6D49]" : "text-[#8D996E]"}`}>
                  {activeWorld === "restaurante"
                    ? "Filosofía del Fogón & Huerta"
                    : "Propósito & Personalidad de Marca"}
                </span>
              </div>

              <h2 className={`proposito-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide leading-tight mb-4 font-sans ${
                isLight ? (isRestaurante ? "text-[#2A1B14]" : "text-[#1A2219]") : "text-[#F5F2ED]"
              }`}>
                {activeWorld === "restaurante" ? (
                  <>
                    Cocina de origen donde la{" "}
                    <span className="text-[#D48B6A]">huerta viva</span>, la leña y el{" "}
                    <span className="font-serif italic text-[#A45D41]">tiempo lento</span> se encuentran.
                  </>
                ) : (
                  <>
                    Ofrecer una experiencia multisensorial donde el{" "}
                    <span className="font-serif italic text-[#A45D41]">arte</span>, la{" "}
                    <span className={isLight ? "text-[#5B6D49]" : "text-[#8D996E]"}>naturaleza</span> y la hospitalidad se encuentran.
                  </>
                )}
              </h2>

              <p className={`proposito-desc text-sm font-light leading-relaxed mb-6 ${
                isLight ? (isRestaurante ? "text-[#2A1B14]/80" : "text-[#1A2219]/80") : "text-[#F5F2ED]/80"
              }`}>
                {activeWorld === "restaurante"
                  ? t.proposito.descRestaurant
                  : t.proposito.descChalets}
              </p>

              {/* Los 4 Rasgos del Brandbook */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  {
                    name: "Culta",
                    desc:
                      activeWorld === "restaurante"
                        ? "Botánica andina, fermentos y memoria gastronómica rural."
                        : "Sabiduría rural, botánica y respeto por las raíces históricas.",
                    color: isRestaurante ? "#D48B6A" : isLight ? "#5B6D49" : "#8D996E",
                  },
                  {
                    name: "Serena",
                    desc:
                      activeWorld === "restaurante"
                        ? "Cocción al rescoldo, sobremesa sin prisa y conversación fértil."
                        : "Ritmo desacelerado, silencio fértil y armonía con el bosque.",
                    color: "#A45D41",
                  },
                  {
                    name: "Acogedora",
                    desc:
                      activeWorld === "restaurante"
                        ? "El abrazo del fuego central y la hospitalidad generosa."
                        : "Servicio desde el corazón, con calidez, respeto y escucha.",
                    color: isRestaurante ? "#D48B6A" : isLight ? "#5B6D49" : "#8D996E",
                  },
                  {
                    name: "Artística",
                    desc:
                      activeWorld === "restaurante"
                        ? "Vajilla de barro artesanal y platos concebidos con intención estética."
                        : "Cada objeto y textura concebido con intención estética y alma.",
                    color: "#A45D41",
                  },
                ].map((trait) => (
                  <div
                    key={trait.name}
                    className={`proposito-trait p-3.5 rounded-2xl transition-colors ${
                      isLight
                        ? isRestaurante
                          ? "bg-white/80 border border-[#A45D41]/25 hover:border-[#A45D41]/60 shadow-sm"
                          : "bg-white/80 border border-[#8D996E]/25 hover:border-[#5B6D49]/60 shadow-sm"
                        : isRestaurante
                        ? "bg-[#16100E]/80 border border-[#A45D41]/25 hover:border-[#A45D41]/60"
                        : "glass-panel-dark border border-[#8D996E]/15 hover:border-[#A45D41]/40"
                    }`}
                  >
                    <span
                      className="text-xs font-mono font-semibold uppercase tracking-wider block mb-1"
                      style={{ color: trait.color }}
                    >
                      {trait.name}
                    </span>
                    <span className={`text-[11px] font-light leading-snug block ${
                      isLight ? "text-[#1A2219]/70" : "text-[#F5F2ED]/70"
                    }`}>
                      {trait.desc}
                    </span>
                  </div>
                ))}
              </div>

              <blockquote className={`proposito-quote border-l-2 border-[#A45D41] pl-4 text-xs italic ${
                isLight ? (isRestaurante ? "text-[#2A1B14]/85" : "text-[#1A2219]/85") : "text-[#F5F2ED]/85"
              }`}>
                {activeWorld === "restaurante"
                  ? "“En El Fogón cocinamos con amor, honramos la tierra y alimentamos con propósito.”"
                  : "“En Pazionart servimos con amor, conectamos con la naturaleza y creamos experiencias con propósito.”"}
              </blockquote>
            </div>
          </div>

          {/* Difuminado inferior */}
          <div className={`absolute -bottom-1 left-0 right-0 h-36 md:h-52 bg-gradient-to-b pointer-events-none z-10 ${
            isLight
              ? isRestaurante
                ? "from-transparent via-[#FAF5EF]/85 to-[#FAF5EF]"
                : "from-transparent via-[#F7F5EE]/85 to-[#F7F5EE]"
              : isRestaurante
              ? "from-transparent via-[#1F1714]/85 to-[#1F1714]"
              : "from-transparent via-[#171E16]/80 to-[#171E16]"
          }`} />
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-24 bg-radial pointer-events-none z-10 blur-3xl ${
            isRestaurante ? "from-[#A45D41]/14 to-transparent" : "from-[#8D996E]/10 to-transparent"
          }`} />
        </section>

        {/* ========================================================
            SECCIÓN RESTAURANTE: SOLO SI RESTAURANTE O EXPLORAR
            ======================================================== */}
        {(activeWorld === "restaurante" || activeWorld === "explore") && (
          <RestaurantSection onOpenBooking={(details) => openBookingFor(details || "Restaurante & Fogón")} />
        )}

        {/* Portal de enlace a Chalets cuando está en modo solo Restaurante */}
        {activeWorld === "restaurante" && (
          <div className="portal-card w-full max-w-5xl mx-auto px-6 py-12 relative z-20">
            <div className="bg-[#18110F]/90 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-[#A45D41]/35 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#A45D41]/20 to-transparent blur-3xl pointer-events-none" />
              <div className="flex flex-col text-left">
                <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D48B6A] mb-2">
                  <Compass className="w-3.5 h-3.5 text-[#A45D41]" />
                  <span>El Otro Lado del Santuario</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-light text-[#F5F2ED] tracking-wide">
                  ¿Deseas pernoctar bajo las estrellas del bosque?
                </h3>
                <p className="text-xs md:text-sm text-[#F5F2ED]/75 font-light mt-2 max-w-xl leading-relaxed">
                  Descubre los Chalets de Pazionart: arquitectura biofílica suspendida sobre el sotobosque andino, chimenea viva, ritual pour-over y descanso sagrado.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => handleWorldSelection("chalets")}
                  className="w-full sm:w-auto whitespace-nowrap px-7 py-3.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase bg-[#8D996E] hover:bg-[#a2af7e] text-[#151D14] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                >
                  <Compass className="w-4 h-4" />
                  <span>Conocer los Chalets</span>
                </button>
                <button
                  onClick={() => handleWorldSelection("explore")}
                  className="w-full sm:w-auto whitespace-nowrap px-5 py-3.5 rounded-full text-[11px] font-mono tracking-[0.16em] uppercase text-[#F5F2ED]/70 hover:text-[#F5F2ED] border border-[#F5F2ED]/15 hover:border-[#8D996E]/40 transition-all cursor-pointer"
                >
                  <span>Explorar Todo</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SECCIÓN CHALETS: SOLO SI CHALETS O EXPLORAR
            ======================================================== */}
        {(activeWorld === "chalets" || activeWorld === "explore") && (
          <section
            id="chalets"
            className="relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 px-6 md:px-12 bg-[#1D251C] overflow-hidden"
          >
            {/* Difuminado superior */}
            <div className="absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-[#171E16]/75 via-[#1D251C]/50 to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-[#8D996E]/15 to-transparent blur-[1px] pointer-events-none z-20" />

            <div className="relative z-20 w-full">
              <ChaletConfigurator
                onSelectBooking={(chaletName) => openBookingFor(chaletName)}
              />
            </div>

            {/* Difuminado inferior */}
            <div className="absolute -bottom-1 left-0 right-0 h-36 md:h-52 bg-gradient-to-b from-transparent via-[#182017]/80 to-[#182017] pointer-events-none z-10" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-24 bg-radial from-[#A45D41]/8 to-transparent blur-3xl pointer-events-none z-10" />
          </section>
        )}

        {/* Portal de enlace al Fogón cuando está en modo solo Chalets */}
        {activeWorld === "chalets" && (
          <div className="portal-card w-full max-w-5xl mx-auto px-6 py-12 relative z-20">
            <div className="glass-panel-dark p-8 md:p-12 rounded-3xl border border-[#A45D41]/35 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#A45D41]/20 to-transparent blur-3xl pointer-events-none" />
              <div className="flex flex-col text-left">
                <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#A45D41] mb-2">
                  <Flame className="w-3.5 h-3.5 text-[#A45D41] animate-pulse" />
                  <span>El Otro Lado del Santuario</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-light text-[#F5F2ED] tracking-wide">
                  ¿Deseas degustar nuestra cocina de origen?
                </h3>
                <p className="text-xs md:text-sm text-[#F5F2ED]/75 font-light mt-2 max-w-xl leading-relaxed">
                  Descubre El Fogón de Pazionart: horno de barro, ingredientes cosechados en nuestra huerta y 4 tiempos al calor de la leña viva.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => handleWorldSelection("restaurante")}
                  className="w-full sm:w-auto whitespace-nowrap px-7 py-3.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Entrar al Fogón</span>
                </button>
                <button
                  onClick={() => handleWorldSelection("explore")}
                  className="w-full sm:w-auto whitespace-nowrap px-5 py-3.5 rounded-full text-[11px] font-mono tracking-[0.16em] uppercase text-[#F5F2ED]/70 hover:text-[#F5F2ED] border border-[#F5F2ED]/15 hover:border-[#8D996E]/40 transition-all cursor-pointer"
                >
                  <span>Explorar Todo</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SECCIÓN 04: FILOSOFÍA & VALORES FUNDAMENTALES
            ======================================================== */}
        <section
          id="valores"
          className={`relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 px-6 md:px-12 overflow-hidden transition-colors duration-700 ${
            isRestaurante ? "bg-[#1D1512]" : "bg-[#182017]"
          }`}
        >
          {/* Difuminado superior */}
          <div className={`absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b pointer-events-none z-10 ${
            isRestaurante
              ? "from-[#1F1714]/85 via-[#1D1512]/50 to-transparent"
              : "from-[#1D251C]/75 via-[#182017]/50 to-transparent"
          }`} />
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r pointer-events-none z-20 blur-[1px] ${
            isRestaurante
              ? "from-transparent via-[#A45D41]/30 to-transparent"
              : "from-transparent via-[#8D996E]/15 to-transparent"
          }`} />

          <div className="relative z-20 w-full">
            <ValuesAccordion activeWorld={activeWorld} />
          </div>

          {/* Difuminado inferior hacia Sección 05 (Vivencias) */}
          <div className={`absolute -bottom-1 left-0 right-0 h-36 md:h-52 bg-gradient-to-b pointer-events-none z-10 ${
            isRestaurante
              ? "from-transparent via-[#221814]/85 to-[#221814]"
              : "from-transparent via-[#1B231B]/80 to-[#1B231B]"
          }`} />
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-24 bg-radial pointer-events-none z-10 blur-3xl ${
            isRestaurante
              ? "from-[#A45D41]/14 to-transparent"
              : "from-[#8D996E]/10 to-transparent"
          }`} />
        </section>

        {/* ========================================================
            SECCIÓN 05: LA PAUSA CONSCIENTE (VIVENCIAS SENSORIALES)
            ======================================================== */}
        <section
          id="experiencias"
          className={`relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 px-6 md:px-12 overflow-hidden transition-colors duration-700 ${
            isRestaurante ? "bg-[#221814]" : "bg-[#1B231B]"
          }`}
        >
          {/* Difuminado superior desde Filosofía */}
          <div className={`absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b pointer-events-none z-10 ${
            isRestaurante
              ? "from-[#1D1512]/80 via-[#221814]/50 to-transparent"
              : "from-[#182017]/75 via-[#1B231B]/50 to-transparent"
          }`} />
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r pointer-events-none z-20 blur-[1px] ${
            isRestaurante
              ? "from-transparent via-[#A45D41]/25 to-transparent"
              : "from-transparent via-[#8D996E]/15 to-transparent"
          }`} />

          <div className="relative z-20 w-full">
            <KineticQuote
              onBookExperience={(expTitle) => openBookingFor(`Experiencia: ${expTitle}`)}
              activeWorld={activeWorld}
            />
          </div>

          {/* Difuminado inferior hacia Sección 06 (Contacto) */}
          <div className={`absolute -bottom-1 left-0 right-0 h-36 md:h-52 bg-gradient-to-b pointer-events-none z-10 ${
            isRestaurante
              ? "from-transparent via-[#17110F]/85 to-[#17110F]"
              : "from-transparent via-[#141B13]/85 to-[#141B13]"
          }`} />
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-24 bg-radial pointer-events-none z-10 blur-3xl ${
            isRestaurante
              ? "from-[#A45D41]/12 to-transparent"
              : "from-[#A45D41]/8 to-transparent"
          }`} />
        </section>

        {/* ========================================================
            SECCIÓN 06: CONTACTO & MANIFIESTO FINAL
            ======================================================== */}
        <section
          id="contacto"
          className={`relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 px-6 md:px-12 overflow-hidden transition-colors duration-700 ${
            isLight
              ? isRestaurante
                ? "bg-[#F3ECE4]"
                : "bg-[#EDEAE1]"
              : isRestaurante
              ? "bg-[#17110F]"
              : "bg-[#141B13]"
          }`}
        >
          {/* Difuminado superior desde Experiencias */}
          <div className={`absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b pointer-events-none z-10 ${
            isLight
              ? isRestaurante
                ? "from-[#F8F3ED]/80 via-[#F3ECE4]/50 to-transparent"
                : "from-[#F7F5EE]/80 via-[#EDEAE1]/50 to-transparent"
              : isRestaurante
              ? "from-[#221814]/80 via-[#17110F]/50 to-transparent"
              : "from-[#1B231B]/75 via-[#141B13]/50 to-transparent"
          }`} />
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r pointer-events-none z-20 blur-[1px] ${
            isRestaurante
              ? "from-transparent via-[#A45D41]/25 to-transparent"
              : "from-transparent via-[#8D996E]/15 to-transparent"
          }`} />

          <div className="max-w-7xl mx-auto w-full flex flex-col justify-between relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
              {/* Lado Izquierdo: Coordenadas & Datos de Hospitalidad */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="contacto-tagline flex items-center gap-2 mb-2">
                  <span className={`text-xs font-mono ${isRestaurante ? "text-[#D48B6A]" : isLight ? "text-[#5B6D49]" : "text-[#8D996E]"}`}>06</span>
                  <span className={`w-8 h-[1px] ${isRestaurante ? "bg-[#A45D41]/40" : "bg-[#8D996E]/40"}`} />
                  <span className={`text-[10px] font-mono uppercase tracking-[0.25em] ${isRestaurante ? "text-[#D48B6A]" : isLight ? "text-[#5B6D49]" : "text-[#8D996E]"}`}>
                    {isRestaurante ? "Encuentro & Mesa Campesina" : "Encuentro & Hospitalidad"}
                  </span>
                </div>

                <h2 className={`contacto-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-4 font-sans ${
                  isLight ? (isRestaurante ? "text-[#2A1B14]" : "text-[#1A2219]") : "text-[#F5F2ED]"
                }`}>
                  {isRestaurante ? (
                    <>
                      El fogón te aguarda.{" "}
                      <span className="font-serif italic text-[#A45D41]">Conversemos.</span>
                    </>
                  ) : (
                    <>
                      El refugio te aguarda.{" "}
                      <span className="font-serif italic text-[#A45D41]">Hablemos.</span>
                    </>
                  )}
                </h2>

                <p className={`contacto-desc text-xs sm:text-sm font-light leading-relaxed mb-6 max-w-lg ${
                  isLight ? (isRestaurante ? "text-[#2A1B14]/80" : "text-[#1A2219]/80") : "text-[#F5F2ED]/80"
                }`}>
                  {isRestaurante
                    ? "Ya sea para reservar una mesa especial en el salón principal, un almuerzo de huerto o una velada íntima al calor de las brasas vivas, nuestro equipo coordinará cada detalle de tu visita."
                    : "Ya sea para una escapada de fin de semana, un retiro creativo o una estancia prolongada en medio del bosque de niebla, nuestro equipo de anfitriones coordinará cada detalle de tu estancia."}
                </p>

                <div className="space-y-3 mb-6">
                  <div className={`contacto-item flex items-center gap-3 text-xs ${
                    isLight ? "text-[#1A2219]/90" : "text-[#F5F2ED]/90"
                  }`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isRestaurante ? "bg-[#A45D41]/20 text-[#D48B6A]" : isLight ? "bg-[#5B6D49]/20 text-[#5B6D49]" : "bg-[#8D996E]/20 text-[#8D996E]"
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium block">Reserva Pazionart</span>
                      <span className={`text-[11px] font-light ${
                        isLight ? "text-[#1A2219]/65" : "text-[#F5F2ED]/60"
                      }`}>
                        Montañas Andinas · Bosque Nuboso y Miradores Naturales
                      </span>
                    </div>
                  </div>

                  <div className={`contacto-item flex items-center gap-3 text-xs ${
                    isLight ? "text-[#1A2219]/90" : "text-[#F5F2ED]/90"
                  }`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isRestaurante ? "bg-[#A45D41]/20 text-[#D48B6A]" : isLight ? "bg-[#5B6D49]/20 text-[#5B6D49]" : "bg-[#8D996E]/20 text-[#8D996E]"
                    }`}>
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium block">
                        {isRestaurante ? "Línea Exclusiva del Fogón" : "Línea Exclusiva de Hospitalidad"}
                      </span>
                      <span className={`text-[11px] font-light ${
                        isLight ? "text-[#1A2219]/65" : "text-[#F5F2ED]/60"
                      }`}>
                        Atención personalizada vía WhatsApp todos los días
                      </span>
                    </div>
                  </div>

                  <div className={`contacto-item flex items-center gap-3 text-xs ${
                    isLight ? "text-[#1A2219]/90" : "text-[#F5F2ED]/90"
                  }`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isRestaurante ? "bg-[#A45D41]/20 text-[#D48B6A]" : isLight ? "bg-[#5B6D49]/20 text-[#5B6D49]" : "bg-[#8D996E]/20 text-[#8D996E]"
                    }`}>
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium block">Correspondencia Digital</span>
                      <span className={`text-[11px] font-light ${
                        isLight ? "text-[#1A2219]/65" : "text-[#F5F2ED]/60"
                      }`}>
                        contacto@pazionart.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lado Derecho: Tarjeta de Pasaporte de Reserva & Paleta */}
              <div className={`contacto-card lg:col-span-6 p-6 sm:p-8 rounded-3xl shadow-2xl transition-colors ${
                isLight
                  ? isRestaurante
                    ? "bg-white/90 backdrop-blur-xl border border-[#A45D41]/30 text-[#2A1B14]"
                    : "bg-white/90 backdrop-blur-xl border border-[#8D996E]/30 text-[#1A2219]"
                  : isRestaurante
                  ? "bg-[#140D0B]/90 backdrop-blur-xl border border-[#A45D41]/35 text-[#F5F2ED]"
                  : "glass-panel-dark border border-[#8D996E]/25 text-[#F5F2ED]"
              }`}>
                <div className="mb-5">
                  <span className={`text-[10px] font-mono uppercase tracking-widest block mb-1 ${
                    isRestaurante ? "text-[#D48B6A]" : isLight ? "text-[#5B6D49]" : "text-[#8D996E]"
                  }`}>
                    {isRestaurante ? "[ Solicitud de Reserva de Mesa ]" : "[ Solicitud Directa de Estancia ]"}
                  </span>
                  <h3 className={`text-xl sm:text-2xl font-light ${
                    isLight ? (isRestaurante ? "text-[#2A1B14]" : "text-[#1A2219]") : "text-[#F5F2ED]"
                  }`}>
                    {isRestaurante ? "Coordina tu Mesa en El Fogón" : "Coordina tu Llegada a los Chalets"}
                  </h3>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => openBookingFor(isRestaurante ? "Mesa en El Fogón" : "Chalet Niebla & Fuego")}
                    className="w-full py-3.5 rounded-xl text-xs font-semibold tracking-[0.2em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{isRestaurante ? "Reservar Mesa en el Fogón" : "Abrir Calendario & Fechas"}</span>
                  </button>

                  <a
                    href={
                      isRestaurante
                        ? "https://wa.me/?text=Hola%20Pazionart,%20deseo%20reservar%20una%20mesa%20en%20el%20Fog%C3%B3n%20y%20conocer%20el%20men%C3%BA."
                        : "https://wa.me/?text=Hola%20Pazionart,%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20chalets%20y%20experiencias."
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 rounded-xl text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      isLight
                        ? isRestaurante
                          ? "bg-[#FAF5EF] text-[#2A1B14] border border-[#A45D41]/30 hover:border-[#A45D41]"
                          : "bg-[#F7F5EE] text-[#1A2219] border border-[#8D996E]/30 hover:border-[#5B6D49]"
                        : isRestaurante
                        ? "bg-[#18110F]/80 text-[#F5F2ED] border border-[#A45D41]/30 hover:border-[#A45D41]"
                        : "glass-panel-dark text-[#F5F2ED] hover:border-[#8D996E]"
                    }`}
                  >
                    <MessageCircle className={`w-4 h-4 ${isRestaurante ? "text-[#D48B6A]" : isLight ? "text-[#5B6D49]" : "text-[#8D996E]"}`} />
                    <span>Conectar por WhatsApp</span>
                    <ExternalLink className={`w-3 h-3 ${isLight ? "opacity-60" : "text-[#F5F2ED]/40"}`} />
                  </a>
                </div>

                {/* Paleta de Fusión Oficial del Brandbook */}
                <div className={`mt-6 pt-5 border-t ${
                  isRestaurante ? "border-[#A45D41]/25" : "border-[#8D996E]/20"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[9px] font-mono tracking-widest uppercase ${
                      isRestaurante ? "text-[#D48B6A]" : isLight ? "text-[#5B6D49]" : "text-[#8D996E]"
                    }`}>
                      {isRestaurante ? "Paleta Fusión Fogón (Brandbook)" : "Paleta de Fusión Oficial (Brandbook)"}
                    </span>
                    <span className={`text-[9px] font-mono ${isLight ? "opacity-60" : "text-[#F5F2ED]/40"}`}>
                      {isRestaurante
                        ? "#1c1512 · #a45d41 · #d48b6a · #f5f2ed"
                        : "#212b20 · #8d996e · #a45d41 · #f5f2ed"}
                    </span>
                  </div>

                  {isRestaurante ? (
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="contacto-palette-item p-2 rounded-xl bg-[#1C1512] border border-[#A45D41]/40">
                        <div className="text-[10px] font-mono font-medium text-[#F5F2ED]">Café</div>
                        <div className="text-[8px] font-mono text-[#F5F2ED]/50">#1c1512</div>
                      </div>
                      <div className="contacto-palette-item p-2 rounded-xl bg-[#A45D41] text-[#F5F2ED]">
                        <div className="text-[10px] font-mono font-semibold">Brasa</div>
                        <div className="text-[8px] font-mono opacity-80">#a45d41</div>
                      </div>
                      <div className="contacto-palette-item p-2 rounded-xl bg-[#D48B6A] text-[#1C1512]">
                        <div className="text-[10px] font-mono font-semibold">Leña</div>
                        <div className="text-[8px] font-mono opacity-80">#d48b6a</div>
                      </div>
                      <div className="contacto-palette-item p-2 rounded-xl bg-[#F5F2ED] text-[#1C1512]">
                        <div className="text-[10px] font-mono font-semibold">Humo</div>
                        <div className="text-[8px] font-mono opacity-80">#f5f2ed</div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="contacto-palette-item p-2 rounded-xl bg-[#212B20] border border-[#F5F2ED]/20">
                        <div className="text-[10px] font-mono font-medium text-[#F5F2ED]">Noche</div>
                        <div className="text-[8px] font-mono text-[#F5F2ED]/50">#212b20</div>
                      </div>
                      <div className="contacto-palette-item p-2 rounded-xl bg-[#8D996E] text-[#212B20]">
                        <div className="text-[10px] font-mono font-semibold">Tierra</div>
                        <div className="text-[8px] font-mono opacity-80">#8d996e</div>
                      </div>
                      <div className="contacto-palette-item p-2 rounded-xl bg-[#A45D41] text-[#F5F2ED]">
                        <div className="text-[10px] font-mono font-semibold">Alma</div>
                        <div className="text-[8px] font-mono opacity-80">#a45d41</div>
                      </div>
                      <div className="contacto-palette-item p-2 rounded-xl bg-[#F5F2ED] text-[#212B20]">
                        <div className="text-[10px] font-mono font-semibold">Luz</div>
                        <div className="text-[8px] font-mono opacity-80">#f5f2ed</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer con imagotipo y créditos */}
            <footer className={`site-footer pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] font-light gap-2 transition-colors ${
              isLight
                ? isRestaurante
                  ? "border-[#A45D41]/20 text-[#2A1B14]/70"
                  : "border-[#8D996E]/20 text-[#1A2219]/70"
                : isRestaurante
                ? "border-[#A45D41]/20 text-[#F5F2ED]/60"
                : "border-[#8D996E]/15 text-[#F5F2ED]/60"
            }`}>
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
              <div className={`text-[10px] tracking-widest font-mono ${
                isRestaurante ? "text-[#D48B6A]" : isLight ? "text-[#5B6D49]" : "text-[#8D996E]"
              }`}>
                {isRestaurante
                  ? "AMOR · FOGÓN · TIERRA — COCINA DE ORIGEN & VIVENCIAS"
                  : "AMOR · NATURALEZA · ARTE — CHALETS & EXPERIENCIAS"}
              </div>
            </footer>
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}
