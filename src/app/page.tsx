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
import AmbientAudio from "@/components/AmbientAudio";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingModal from "@/components/BookingModal";
import ChaletConfigurator from "@/components/ChaletConfigurator";
import ValuesAccordion from "@/components/ValuesAccordion";
import SplashMask from "@/components/SplashMask";
import LogoTexto from "@/components/LogoTexto";
import DualThreshold from "@/components/DualThreshold";
import RestaurantSection from "@/components/RestaurantSection";
import VisualGallery from "@/components/VisualGallery";
import EnergySoftSignature from "@/components/EnergySoftSignature";
import { startSafeViewTransition } from "@/lib/viewTransition";
import { usePreferences } from "@/context/PreferencesContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedChalet, setSelectedChalet] = useState("Chalet Susurros");
  const [selectedChaletPhotoSrc, setSelectedChaletPhotoSrc] = useState<string | undefined>(undefined);
  const [galleryTab, setGalleryTab] = useState<string>("all");
  const [showThreshold, setShowThreshold] = useState(true);
  const [activeWorld, setActiveWorld] = useState<"chalets" | "restaurante">("chalets");
  const isRestaurante = activeWorld === "restaurante";

  const handleGoToChalet = (chaletName: string, photoSrc?: string) => {
    setSelectedChalet(chaletName);
    if (photoSrc) {
      setSelectedChaletPhotoSrc(photoSrc);
    }
    const chaletSection = document.getElementById("chalets");
    if (chaletSection) {
      chaletSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleViewInGallery = (chaletSlug: string) => {
    setGalleryTab(chaletSlug);
    const gallerySection = document.getElementById("galeria");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { t, theme } = usePreferences();
  const isLight = theme === "light";

  // Hero Quick Booking Bar State - Chalets
  const [heroChalet, setHeroChalet] = useState("Chalet Susurros");
  const [heroGuests, setHeroGuests] = useState("2 Huéspedes");
  const [heroDate, setHeroDate] = useState("");

  // Leer preferencia previa o query param (?mundo=) en cliente
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlWorld = params.get("mundo");
      if (urlWorld === "chalets" || urlWorld === "restaurante") {
        setActiveWorld(urlWorld);
        setShowThreshold(false);
        return;
      }
      const savedWorld = localStorage.getItem("pazionart_active_world") as
        | "chalets"
        | "restaurante"
        | null;
      if (savedWorld && (savedWorld === "chalets" || savedWorld === "restaurante")) {
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


  const handleHeroBooking = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (activeWorld === "restaurante") {
      const msg = encodeURIComponent(
        "Hola Pazionart, deseo contactarme con el Restaurante de Pazionart para consultar disponibilidad y realizar una reserva."
      );
      window.open(`https://wa.me/573505791093?text=${msg}`, "_blank");
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

  const handleWorldSelection = (world: "chalets" | "restaurante") => {
    startSafeViewTransition(
      () => {
        setActiveWorld(world);
        try {
          localStorage.setItem("pazionart_active_world", world);
          const url = new URL(window.location.href);
          url.searchParams.set("mundo", world);
          window.history.replaceState(null, "", url.toString());
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
      {!showThreshold && <AmbientAudio />}
      {!showThreshold && <WhatsAppButton activeWorld={activeWorld} />}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        selectedChalet={selectedChalet}
        activeWorld={activeWorld}
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
          className="relative w-full min-h-[100dvh] flex flex-col justify-center items-center pt-24 pb-16 px-6 md:px-12 overflow-hidden"
        >
          {/* Fondo fotográfico con velo cinemático adaptado al mundo y al tema */}
          <div className="absolute inset-0 z-0">
            <Image
              src={
                activeWorld === "restaurante"
                  ? "/images/gallery/aroma-comedor-rosas.jpg"
                  : "/images/gallery/aroma-atardecer.jpg"
              }
              alt={
                activeWorld === "restaurante"
                  ? "Pazionart Restaurante"
                  : "Pazionart Chalets & Refugios"
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

          <div className="hero-content relative z-20 max-w-6xl mx-auto w-full flex flex-col items-center text-center my-auto">
            {/* Símbolo Pazionart SVG con resplandor suave */}
            <div
              className="hero-symbol w-20 h-20 md:w-24 md:h-24 relative mb-5 drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
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

            {/* Título de la marca con Logo Texto Oficial SVG */}
            <h1 className="sr-only">Pazionart</h1>
            <div
              className="hero-logo h-16 sm:h-20 md:h-32 lg:h-40 flex items-center justify-center mb-3"
              style={{ viewTransitionName: "hero-brand-logo" }}
            >
              <LogoTexto
                className="h-full w-auto filter drop-shadow-2xl"
                fill={isLight ? (isRestaurante ? "#2A1B14" : "#1A2219") : "#F5F2ED"}
              />
            </div>

            {/* Tagline ubicado debajo del logo */}
            <div className="hero-tagline flex items-center justify-center mb-4">
              <span
                className={`text-xs sm:text-sm md:text-base font-medium tracking-[0.34em] uppercase font-mono ${
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
            </div>

            {/* Cita del Propósito - Aumentado a text-base sm:text-lg md:text-xl */}
            <p
              className={`hero-description text-base sm:text-lg md:text-xl max-w-3xl font-light leading-relaxed mt-1 mb-10 drop-shadow-md ${
                isLight ? "text-[#1A2219]/90" : "text-[#F5F2ED]/90"
              }`}
            >
              {activeWorld === "restaurante" ? (
                <>
                  {t.hero.restaurantDescP1} {t.hero.restaurantDescHighlight}{t.hero.restaurantDescP2}
                </>
              ) : activeWorld === "chalets" ? (
                <>
                  {t.hero.chaletsDescP1} {t.hero.chaletsDescHighlight}{t.hero.chaletsDescP2}
                </>
              ) : (
                <>
                  {t.hero.exploreDescP1} {t.hero.exploreDescHighlight}{t.hero.exploreDescP2}
                </>
              )}
            </p>

            {/* ========================================================
                BOTÓN DIRECTO DE CONTACTO PARA RESERVAS (RESTAURANTE)
                ======================================================== */}
            {activeWorld === "restaurante" ? (
              <div className="hero-booking-form flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl mx-auto">
                <button
                  type="button"
                  onClick={() => handleHeroBooking()}
                  className="w-full sm:w-auto py-4 px-8 rounded-2xl text-sm sm:text-base font-semibold tracking-[0.18em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 text-[#F5F2ED]" />
                  <span>Contactar al Restaurante para Reservas</span>
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleHeroBooking}
                className={`hero-booking-form w-full max-w-4xl backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-center text-left transition-colors duration-500 ${
                  isLight
                    ? "bg-white/90 border border-[#8D996E]/30 text-[#1A2219]"
                    : "glass-panel-dark border border-[#8D996E]/30 text-[#F5F2ED]"
                }`}
              >
                {/* Selector de Chalet */}
                <div className={`p-3 rounded-2xl border transition-colors ${
                  isLight
                    ? "bg-[#F7F5EE] border-[#8D996E]/25"
                    : "bg-[#151D14]/70 border-[#8D996E]/20"
                }`}>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#8D996E] uppercase mb-1.5">
                    <HomeIcon className="w-3.5 h-3.5 text-[#A45D41]" />
                    <span>{t.hero.chaletLabel}</span>
                  </div>
                  <select
                    value={heroChalet}
                    onChange={(e) => setHeroChalet(e.target.value)}
                    className={`w-full bg-transparent text-sm font-medium focus:outline-none cursor-pointer ${
                      isLight ? "text-[#1A2219]" : "text-[#F5F2ED]"
                    }`}
                  >
                    <option value="Chalet Susurros" className={isLight ? "bg-white text-[#1A2219]" : "bg-[#212B20] text-[#F5F2ED]"}>
                      Chalet Susurros (con Jacuzzi Privado)
                    </option>
                    <option value="Chalet Aroma" className={isLight ? "bg-white text-[#1A2219]" : "bg-[#212B20] text-[#F5F2ED]"}>
                      Chalet Aroma (Cabaña A-Frame)
                    </option>
                    <option value="Chalet Bruma" className={isLight ? "bg-white text-[#1A2219]" : "bg-[#212B20] text-[#F5F2ED]"}>
                      Chalet Bruma (Cabaña Familiar)
                    </option>
                  </select>
                </div>

                {/* Selector de Huéspedes */}
                <div className={`p-3 rounded-2xl border transition-colors ${
                  isLight
                    ? "bg-[#F7F5EE] border-[#8D996E]/25"
                    : "bg-[#151D14]/70 border-[#8D996E]/20"
                }`}>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#8D996E] uppercase mb-1.5">
                    <Users className="w-3.5 h-3.5 text-[#8D996E]" />
                    <span>{t.hero.guestsLabel}</span>
                  </div>
                  <select
                    value={heroGuests}
                    onChange={(e) => setHeroGuests(e.target.value)}
                    className={`w-full bg-transparent text-sm font-medium focus:outline-none cursor-pointer ${
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
                <div className={`p-3 rounded-2xl border transition-colors ${
                  isLight
                    ? "bg-[#F7F5EE] border-[#8D996E]/25"
                    : "bg-[#151D14]/70 border-[#8D996E]/20"
                }`}>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#8D996E] uppercase mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#A45D41]" />
                    <span>{t.hero.datesLabel}</span>
                  </div>
                  <input
                    type="text"
                    placeholder={t.hero.datesPlaceholder}
                    value={heroDate}
                    onChange={(e) => setHeroDate(e.target.value)}
                    className={`w-full bg-transparent text-sm focus:outline-none ${
                      isLight
                        ? "text-[#1A2219] placeholder-[#1A2219]/40"
                        : "text-[#F5F2ED] placeholder-[#F5F2ED]/40"
                    }`}
                  />
                </div>

                {/* Botón CTA de Acción */}
                <button
                  type="submit"
                  className="w-full h-full py-4 px-6 rounded-2xl text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
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
              <span className="text-xs tracking-[0.25em] uppercase font-mono">
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
          className={`relative w-full min-h-[100dvh] flex flex-col justify-center py-28 md:py-36 px-6 md:px-12 overflow-hidden transition-colors duration-700 ${
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

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-20 my-auto">
            {/* Foto de Artesano & Textura de Arcilla */}
            <div className="lg:col-span-5 relative">
              <div className={`proposito-photo relative aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl ${
                isRestaurante ? "border border-[#A45D41]/35" : "border border-[#8D996E]/25"
              }`}>
                <Image
                  src={
                    activeWorld === "restaurante"
                      ? "/images/gallery/bruma-cocina-comedor.jpg"
                      : "/images/gallery/susurros-bosque.jpg"
                  }
                  alt={
                    activeWorld === "restaurante"
                      ? "Cocina y comedor tradicional del Restaurante de Pazionart"
                      : "Arquitectura bioclimática en la naturaleza andina"
                  }
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
              </div>
            </div>

            {/* Narrativa Editorial & 4 Rasgos */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="proposito-tagline flex items-center gap-2 mb-3">
                <span className={`text-sm font-mono font-semibold ${isRestaurante ? "text-[#D48B6A]" : isLight ? "text-[#5B6D49]" : "text-[#8D996E]"}`}>02</span>
                <span className={`w-10 h-[1px] ${isRestaurante ? "bg-[#A45D41]/40" : "bg-[#8D996E]/40"}`} />
                <span className={`text-xs sm:text-sm font-mono uppercase tracking-[0.25em] ${isRestaurante ? "text-[#D48B6A]" : isLight ? "text-[#5B6D49]" : "text-[#8D996E]"}`}>
                  {activeWorld === "restaurante"
                    ? "Restaurante de Pazionart"
                    : "Propósito"}
                </span>
              </div>

              <h2 className={`proposito-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight mb-5 font-sans ${
                isLight ? (isRestaurante ? "text-[#2A1B14]" : "text-[#1A2219]") : "text-[#F5F2ED]"
              }`}>
                {activeWorld === "restaurante" ? (
                  <>
                    Cocina de origen donde la{" "}
                    <span className="text-[#D48B6A]">huerta viva</span>, la leña y el{" "}
                    <span className="italic font-normal text-[#A45D41]">tiempo lento</span> se encuentran.
                  </>
                ) : (
                  <>
                    Ofrecer una experiencia multisensorial donde el{" "}
                    <span className="italic font-normal text-[#A45D41]">arte</span>, la{" "}
                    <span className={isLight ? "text-[#5B6D49]" : "text-[#8D996E]"}>naturaleza</span> y la hospitalidad se encuentran.
                  </>
                )}
              </h2>

              <p className={`proposito-desc text-base sm:text-lg font-light leading-relaxed mb-8 ${
                isLight ? (isRestaurante ? "text-[#2A1B14]/85" : "text-[#1A2219]/85") : "text-[#F5F2ED]/85"
              }`}>
                {activeWorld === "restaurante"
                  ? t.proposito.descRestaurant
                  : t.proposito.descChalets}
              </p>

              {/* Pilares Clave de la Experiencia */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                {(activeWorld === "restaurante"
                  ? [
                      {
                        name: "Cocina a la Leña",
                        desc: "Fuego tradicional y preparaciones auténticas con el verdadero sabor de nuestra tierra.",
                        color: "#D48B6A",
                      },
                      {
                        name: "Origen Colombiano",
                        desc: "Gastronomía nacida en Antioquia, honrando nuestras raíces con ingredientes frescos y locales.",
                        color: "#A45D41",
                      },
                      {
                        name: "Mesa para Compartir",
                        desc: "Un ambiente cálido y sin afanes, pensado para disfrutar con los que uno más quiere.",
                        color: "#D48B6A",
                      },
                      {
                        name: "Vajilla Artesanal",
                        desc: "Servido en auténtico barro moldeado a mano, uniendo arte, tradición y buen comer.",
                        color: "#A45D41",
                      },
                    ]
                  : [
                      {
                        name: "Naturaleza Viva",
                        desc: "Entorno natural y aire puro que invitan al descanso y la reconexión íntima.",
                        color: isLight ? "#5B6D49" : "#8D996E",
                      },
                      {
                        name: "Pausa Consciente",
                        desc: "Desconecta del afán diario en un refugio diseñado para habitar el presente.",
                        color: "#A45D41",
                      },
                      {
                        name: "Hospitalidad Real",
                        desc: "Atención cálida, humana y dedicada a cuidar cada detalle de tu estancia.",
                        color: isLight ? "#5B6D49" : "#8D996E",
                      },
                      {
                        name: "Arquitectura & Alma",
                        desc: "Cabañas con chimenea, jacuzzi y acabados nobles para compartir con los que uno más quiere.",
                        color: "#A45D41",
                      },
                    ]
                ).map((trait) => (
                  <div
                    key={trait.name}
                    className={`proposito-trait p-4 rounded-2xl transition-colors ${
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
                      className="text-sm font-mono font-semibold uppercase tracking-wider block mb-1.5"
                      style={{ color: trait.color }}
                    >
                      {trait.name}
                    </span>
                    <span className={`text-xs sm:text-sm font-light leading-relaxed block ${
                      isLight ? "text-[#1A2219]/75" : "text-[#F5F2ED]/75"
                    }`}>
                      {trait.desc}
                    </span>
                  </div>
                ))}
              </div>

              <blockquote className={`proposito-quote border-l-2 border-[#A45D41] pl-5 text-sm sm:text-base italic leading-relaxed ${
                isLight ? (isRestaurante ? "text-[#2A1B14]/90" : "text-[#1A2219]/90") : "text-[#F5F2ED]/90"
              }`}>
                {activeWorld === "restaurante"
                  ? "“En nuestro restaurante cocinamos con amor, honramos la tierra y preparamos cada plato para disfrutar con los que uno más quiere.”"
                  : "“El verdadero lujo contemporáneo no es el exceso, sino el silencio, el tiempo y la compañía de los que uno más quiere.”"}
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
            SECCIÓN 03: RESTAURANTE O CHALETS (ESTRICTAMENTE SEPARADOS)
            ======================================================== */}
        {activeWorld === "restaurante" ? (
          <RestaurantSection onOpenBooking={(details) => openBookingFor(details || "Restaurante de Pazionart")} />
        ) : (
          <section
            id="chalets"
            className="relative w-full min-h-[100dvh] flex flex-col justify-center py-24 md:py-32 px-6 md:px-12 bg-[#1D251C] overflow-hidden"
          >
            {/* Difuminado superior */}
            <div className="absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-[#171E16]/75 via-[#1D251C]/50 to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-[#8D996E]/15 to-transparent blur-[1px] pointer-events-none z-20" />

            <div className="relative z-20 w-full my-auto">
              <ChaletConfigurator
                selectedChaletName={selectedChalet}
                onChaletChange={(name) => setSelectedChalet(name)}
                selectedPhotoSrc={selectedChaletPhotoSrc}
                onSelectBooking={(chaletName, nights) =>
                  openBookingFor(`${chaletName} (${nights} noches)`)
                }
                onViewInGallery={handleViewInGallery}
              />
            </div>

            {/* Difuminado inferior */}
            <div className="absolute -bottom-1 left-0 right-0 h-36 md:h-52 bg-gradient-to-b from-transparent via-[#182017]/80 to-[#182017] pointer-events-none z-10" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-24 bg-radial from-[#A45D41]/8 to-transparent blur-3xl pointer-events-none z-10" />
          </section>
        )}

        {/* ========================================================
            SECCIÓN 04: FILOSOFÍA & VALORES FUNDAMENTALES
            ======================================================== */}
        <section
          id="valores"
          className={`relative w-full min-h-[100dvh] flex flex-col justify-center py-24 md:py-32 px-6 md:px-12 overflow-hidden transition-colors duration-700 ${
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

          <div className="relative z-20 w-full my-auto">
            <ValuesAccordion activeWorld={activeWorld} />
          </div>

          {/* Difuminado inferior hacia Galería o Contacto */}
          <div className={`absolute -bottom-1 left-0 right-0 h-36 md:h-52 bg-gradient-to-b pointer-events-none z-10 ${
            isRestaurante
              ? "from-transparent via-[#17110F]/85 to-[#17110F]"
              : "from-transparent via-[#0E150D]/85 to-[#0E150D]"
          }`} />
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-24 bg-radial pointer-events-none z-10 blur-3xl ${
            isRestaurante
              ? "from-[#A45D41]/14 to-transparent"
              : "from-[#8D996E]/10 to-transparent"
          }`} />
        </section>

        {/* ========================================================
            SECCIÓN FOTOGRÁFICA: GALERÍA EXCLUSIVA DE CHALETS
            ======================================================== */}
        {activeWorld === "chalets" && (
          <VisualGallery
            onSelectBooking={(chalet) => openBookingFor(chalet)}
            onGoToChalet={handleGoToChalet}
            activeWorld={activeWorld}
            activeTab={galleryTab}
            onTabChange={setGalleryTab}
          />
        )}

        {/* ========================================================
            SECCIÓN 05: CONTACTO & MANIFIESTO FINAL
            ======================================================== */}
        <section
          id="contacto"
          className={`relative w-full min-h-[100dvh] flex flex-col justify-between py-24 md:py-32 px-6 md:px-12 overflow-hidden transition-colors duration-700 ${
            isLight
              ? isRestaurante
                ? "bg-[#F3ECE4]"
                : "bg-[#EDEAE1]"
              : isRestaurante
              ? "bg-[#17110F]"
              : "bg-[#141B13]"
          }`}
        >
          {/* Difuminado superior */}
          <div className={`absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b pointer-events-none z-10 ${
            isLight
              ? isRestaurante
                ? "from-[#F8F3ED]/80 via-[#F3ECE4]/50 to-transparent"
                : "from-[#F7F5EE]/80 via-[#EDEAE1]/50 to-transparent"
              : isRestaurante
              ? "from-[#1D1512]/85 via-[#17110F]/50 to-transparent"
              : "from-[#0E150D]/85 via-[#141B13]/50 to-transparent"
          }`} />
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r pointer-events-none z-20 blur-[1px] ${
            isRestaurante
              ? "from-transparent via-[#A45D41]/25 to-transparent"
              : "from-transparent via-[#8D996E]/15 to-transparent"
          }`} />

          <div className="max-w-7xl mx-auto w-full flex flex-col justify-between relative z-20 my-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
              {/* Lado Izquierdo: Coordenadas & Datos de Hospitalidad */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="contacto-tagline flex items-center gap-2 mb-3">
                  <span className={`text-sm font-mono font-semibold ${isRestaurante ? "text-[#D48B6A]" : isLight ? "text-[#5B6D49]" : "text-[#8D996E]"}`}>05</span>
                  <span className={`w-10 h-[1px] ${isRestaurante ? "bg-[#A45D41]/40" : "bg-[#8D996E]/40"}`} />
                  <span className={`text-xs sm:text-sm font-mono uppercase tracking-[0.25em] ${isRestaurante ? "text-[#D48B6A]" : isLight ? "text-[#5B6D49]" : "text-[#8D996E]"}`}>
                    {isRestaurante ? "Encuentro & Mesa Colombiana" : "Encuentro & Hospitalidad"}
                  </span>
                </div>

                <h2 className={`contacto-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-5 font-sans leading-tight ${
                  isLight ? (isRestaurante ? "text-[#2A1B14]" : "text-[#1A2219]") : "text-[#F5F2ED]"
                }`}>
                  {isRestaurante ? (
                    <>
                      El restaurante te aguarda.{" "}
                      <span className="italic font-normal text-[#A45D41]">Conversemos.</span>
                    </>
                  ) : (
                    <>
                      El refugio te aguarda.{" "}
                      <span className="italic font-normal text-[#A45D41]">Hablemos.</span>
                    </>
                  )}
                </h2>

                <p className={`contacto-desc text-sm sm:text-base md:text-lg font-light leading-relaxed mb-8 max-w-lg ${
                  isLight ? (isRestaurante ? "text-[#2A1B14]/85" : "text-[#1A2219]/85") : "text-[#F5F2ED]/85"
                }`}>
                  {isRestaurante
                    ? "Ya sea para reservar una mesa especial en el salón principal, un almuerzo de huerto o una velada íntima al calor de las brasas vivas, nuestro equipo coordinará cada detalle de tu visita."
                    : "Ya sea para una escapada de fin de semana, un retiro creativo o una estancia prolongada en medio de la naturaleza y los que uno más quiere, nuestro equipo de anfitriones coordinará cada detalle de tu estancia."}
                </p>

                <div className="space-y-4 mb-6">
                  <div className={`contacto-item flex items-center gap-3.5 text-sm ${
                    isLight ? "text-[#1A2219]/90" : "text-[#F5F2ED]/90"
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isRestaurante ? "bg-[#A45D41]/20 text-[#D48B6A]" : isLight ? "bg-[#5B6D49]/20 text-[#5B6D49]" : "bg-[#8D996E]/20 text-[#8D996E]"
                    }`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-medium text-sm sm:text-base block">Pazionart</span>
                      <span className={`text-xs sm:text-sm font-light ${
                        isLight ? "text-[#1A2219]/70" : "text-[#F5F2ED]/65"
                      }`}>
                        Antioquia, Colombia
                      </span>
                    </div>
                  </div>

                  <div className={`contacto-item flex items-center gap-3.5 text-sm ${
                    isLight ? "text-[#1A2219]/90" : "text-[#F5F2ED]/90"
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isRestaurante ? "bg-[#A45D41]/20 text-[#D48B6A]" : isLight ? "bg-[#5B6D49]/20 text-[#5B6D49]" : "bg-[#8D996E]/20 text-[#8D996E]"
                    }`}>
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-medium text-sm sm:text-base block">
                        {isRestaurante ? "Línea Exclusiva del Restaurante" : "Línea Exclusiva de Hospitalidad"}
                      </span>
                      {isRestaurante ? (
                        <a
                          href="https://wa.me/573505791093"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs sm:text-sm font-light hover:underline transition-colors block ${
                            isLight ? "text-[#1A2219]/70 hover:text-[#1A2219]" : "text-[#F5F2ED]/65 hover:text-[#F5F2ED]"
                          }`}
                        >
                          +57 350 579 1093 · Reservas Restaurante
                        </a>
                      ) : (
                        <span className={`text-xs sm:text-sm font-light ${
                          isLight ? "text-[#1A2219]/70" : "text-[#F5F2ED]/65"
                        }`}>
                          Atención personalizada vía WhatsApp todos los días
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`contacto-item flex items-center gap-3.5 text-sm ${
                    isLight ? "text-[#1A2219]/90" : "text-[#F5F2ED]/90"
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isRestaurante ? "bg-[#A45D41]/20 text-[#D48B6A]" : isLight ? "bg-[#5B6D49]/20 text-[#5B6D49]" : "bg-[#8D996E]/20 text-[#8D996E]"
                    }`}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-medium text-sm sm:text-base block">Correspondencia Digital</span>
                      <a
                        href="mailto:pazionartchalets@gmail.com"
                        className={`text-xs sm:text-sm font-light hover:underline transition-colors block ${
                          isLight ? "text-[#1A2219]/70 hover:text-[#1A2219]" : "text-[#F5F2ED]/65 hover:text-[#F5F2ED]"
                        }`}
                      >
                        pazionartchalets@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lado Derecho: Tarjeta de Pasaporte de Reserva & Paleta */}
              <div className={`contacto-card lg:col-span-6 p-6 sm:p-10 rounded-3xl shadow-2xl transition-colors ${
                isLight
                  ? isRestaurante
                    ? "bg-white/90 backdrop-blur-xl border border-[#A45D41]/30 text-[#2A1B14]"
                    : "bg-white/90 backdrop-blur-xl border border-[#8D996E]/30 text-[#1A2219]"
                  : isRestaurante
                  ? "bg-[#140D0B]/90 backdrop-blur-xl border border-[#A45D41]/35 text-[#F5F2ED]"
                  : "glass-panel-dark border border-[#8D996E]/25 text-[#F5F2ED]"
              }`}>
                <div className="mb-6">
                  <span className={`text-xs sm:text-sm font-mono uppercase tracking-widest block mb-2 ${
                    isRestaurante ? "text-[#D48B6A]" : isLight ? "text-[#5B6D49]" : "text-[#8D996E]"
                  }`}>
                    {isRestaurante ? "[ Solicitud de Reserva de Mesa ]" : "[ Solicitud Directa de Estancia ]"}
                  </span>
                  <h3 className={`text-2xl sm:text-3xl font-light ${
                    isLight ? (isRestaurante ? "text-[#2A1B14]" : "text-[#1A2219]") : "text-[#F5F2ED]"
                  }`}>
                    {isRestaurante ? "Coordina tu Mesa en el Restaurante" : "Coordina tu Llegada a los Chalets"}
                  </h3>
                </div>

                <div className="space-y-3.5">
                  <a
                    href={
                      isRestaurante
                        ? "mailto:pazionartchalets@gmail.com?subject=Reserva%20Mesa%20Restaurante%20Pazionart&body=Hola%20Pazionart,%20deseo%20reservar%20una%20mesa%20en%20el%20Restaurante%20o%20solicitar%20información."
                        : "mailto:pazionartchalets@gmail.com?subject=Reserva%20Chalet%20Pazionart&body=Hola%20Pazionart,%20deseo%20solicitar%20información%20y%20reservar%20una%20estancia%20en%20los%20chalets."
                    }
                    className={`w-full py-4 rounded-2xl text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02] ${
                      isRestaurante
                        ? "bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED]"
                        : isLight
                        ? "bg-[#5B6D49] hover:bg-[#4a5a3b] text-[#F5F2ED]"
                        : "bg-[#8D996E] hover:bg-[#9eb07d] text-[#151D14]"
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Enviar Correo</span>
                  </a>

                  <a
                    href={
                      isRestaurante
                        ? "https://wa.me/573505791093?text=Hola%20Pazionart,%20deseo%20reservar%20una%20mesa%20en%20el%20Restaurante%20y%20conocer%20los%20servicios."
                        : "https://wa.me/?text=Hola%20Pazionart,%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20chalets%20y%20reservas."
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-2xl text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02] bg-[#25D366] hover:bg-[#20ba5a] text-[#121B12] shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Conectar por WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>

                  <button
                    type="button"
                    onClick={() => openBookingFor(isRestaurante ? "Mesa en Restaurante" : "Chalet Susurros")}
                    className={`w-full text-center text-xs sm:text-sm font-mono tracking-wider underline transition-opacity cursor-pointer pt-2 block ${
                      isLight ? "text-[#1A2219]/65 hover:text-[#1A2219]" : "text-[#F5F2ED]/65 hover:text-[#F5F2ED]"
                    }`}
                  >
                    O abrir formulario de reserva en línea
                  </button>
                </div>
              </div>
            </div>

            {/* Footer con imagotipo y créditos */}
            <footer className={`site-footer pt-8 pb-4 border-t flex flex-col items-center gap-4 transition-colors ${
              isLight
                ? isRestaurante
                  ? "border-[#A45D41]/20 text-[#2A1B14]/75"
                  : "border-[#8D996E]/20 text-[#1A2219]/75"
                : isRestaurante
                ? "border-[#A45D41]/20 text-[#F5F2ED]/65"
                : "border-[#8D996E]/15 text-[#F5F2ED]/65"
            }`}>
              <div className="w-full flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm font-light gap-3">
                <div className="flex items-center gap-2.5">
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
                <div className={`text-xs tracking-widest font-mono font-medium ${
                  isRestaurante ? "text-[#D48B6A]" : isLight ? "text-[#5B6D49]" : "text-[#8D996E]"
                }`}>
                  {isRestaurante
                    ? "AMOR · NATURALEZA · ARTE — RESTAURANTE DE PAZIONART"
                    : "AMOR · NATURALEZA · ARTE — CHALETS & EXPERIENCIAS"}
                </div>
              </div>

              {/* Firma de Desarrollador Oficial ENERGYSOFTmedia® */}
              <div className={`w-full pt-3.5 border-t flex items-center justify-center ${
                isLight
                  ? isRestaurante
                    ? "border-[#A45D41]/15"
                    : "border-[#8D996E]/15"
                  : isRestaurante
                  ? "border-[#A45D41]/15"
                  : "border-[#8D996E]/15"
              }`}>
                <EnergySoftSignature />
              </div>
            </footer>
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}
