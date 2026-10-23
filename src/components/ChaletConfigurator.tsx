"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  Flame,
  Coffee,
  Maximize2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Camera,
  X,
  ShieldCheck,
  Calendar,
  Layers,
  SunMedium,
  Wind,
  Check,
} from "lucide-react";
import { startSafeViewTransition } from "@/lib/viewTransition";
import { usePreferences } from "@/context/PreferencesContext";
import galleryItems from "@/lib/galleryManifest.json";

interface GalleryPhoto {
  id: string;
  title: string;
  chalet: string;
  category?: string;
  description: string;
  src: string;
  width?: number;
  height?: number;
}

const allGalleryItems = galleryItems as GalleryPhoto[];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ChaletConfiguratorProps {
  onSelectBooking: (chaletName: string, nights: number) => void;
  selectedChaletName?: string;
  onChaletChange?: (chaletName: string) => void;
  selectedPhotoSrc?: string;
  onViewInGallery?: (chaletSlug: string) => void;
}

export default function ChaletConfigurator({
  onSelectBooking,
  selectedChaletName,
  onChaletChange,
  selectedPhotoSrc,
  onViewInGallery,
}: ChaletConfiguratorProps) {
  const { theme, t } = usePreferences();
  const isLight = theme === "light";

  const [selectedId, setSelectedId] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [nights, setNights] = useState(2);
  const chaletRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chaletRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: chaletRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".chalet-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          ".chalet-tab-pills",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".chalet-visor",
          { opacity: 0, y: 50, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0 },
          "-=0.5"
        )
        .fromTo(
          ".chalet-spec-card",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.6"
        )
        .fromTo(
          ".chalet-right-panel",
          { opacity: 0, y: 45, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          ".chalet-highlight",
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.06 },
          "-=0.5"
        )
        .fromTo(
          ".chalet-estimator",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );
    }, chaletRef);

    return () => ctx.revert();
  }, []);

  const chalets = [
    {
      id: "chalet-susurros",
      slug: "susurros",
      name: "Chalet Susurros",
      tagline: "Pabellón de cristal con jacuzzi privado y vista a la naturaleza",
      basePrice: "$280.000 COP",
      area: "Pabellón Panorámico + Deck con Jacuzzi",
      capacity: "2 Huéspedes · 1 Cama Doble",
      orientation: "Noreste · Amanecer sobre la naturaleza y bosque",
      thermal: "Acristalamiento panorámico con cortinajes térmicos",
      views: {
        exterior: "/images/gallery/susurros-fachada.jpg",
        interior: "/images/gallery/susurros-suite.jpg",
        deck: "/images/gallery/susurros-jacuzzi.jpg",
      },
      story:
        "Diseñado como un santuario de intimidad y descanso para disfrutar con los que uno más quiere. Su estructura acristalada sumerge la habitación en la serenidad de la naturaleza, mientras su terraza exterior acoge un jacuzzi privado con agua caliente y espuma aromatizada entre los árboles.",
      highlights: [
        { label: "Jacuzzi Privado", desc: "En terraza exterior con espuma y pétalos de rosa" },
        { label: "Cama Doble Panorámica", desc: "Rodeada de ventanales y dosel de lino blanco" },
        { label: "Cocina Semi Integral", desc: "Nevera, fogón y dotación para parejas" },
        { label: "Baño con Agua Caliente", desc: "Cabina de ducha moderna y acabados rústicos" },
      ],
    },
    {
      id: "chalet-aroma",
      slug: "aroma",
      name: "Chalet Aroma",
      tagline: "Arquitectura A-Frame clásica entre jardines y palmeras",
      basePrice: "$200.000 COP",
      area: "Doble nivel con altillo + Jardín exterior",
      capacity: "4 a 6 Huéspedes · 2 Camas Dobles",
      orientation: "Oeste · Luz dorada del atardecer en ventanales",
      thermal: "Madera natural de pino y teca con piso lustrado",
      views: {
        exterior: "/images/gallery/aroma-jardin.jpg",
        interior: "/images/gallery/aroma-altillo-edison.jpg",
        deck: "/images/gallery/aroma-ventanal-jardin.jpg",
      },
      story:
        "Una cabaña alpina clásica con estructura A-Frame que celebra la calidez de la madera y el encuentro con los que uno más quiere. Su altillo ofrece un acogedor espacio de descanso y amplios ventanales que abren hacia un jardín privado con palmeras andinas y sendero de piedra blanca.",
      highlights: [
        { label: "2 Camas Dobles", desc: "Capacidad para 4 personas (hasta 6 huéspedes)" },
        { label: "Altillo en Madera", desc: "Espacio cálido y acogedor en el segundo nivel" },
        { label: "Cocina Equipada", desc: "Semi-integral con nevera, fogón y utensilios" },
        { label: "Jardín Privado", desc: "Zona verde exterior con palmeras y sendero de piedra" },
      ],
    },
    {
      id: "chalet-bruma",
      slug: "bruma",
      name: "Chalet Bruma",
      tagline: "Refugio familiar con espacios de juegos y ocio al aire libre",
      basePrice: "$220.000 COP",
      area: "Doble nivel con altillo + Zona verde con columpio",
      capacity: "4 a 6 Huéspedes · 2 Camas Dobles",
      orientation: "Norte · Vista a la naturaleza y aire puro",
      thermal: "Estructura de madera aislante y techos altos inclinados",
      views: {
        exterior: "/images/gallery/bruma-fachada-columpio.jpg",
        interior: "/images/gallery/bruma-cama-altillo.jpg",
        deck: "/images/gallery/bruma-sala-cuero.jpg",
      },
      story:
        "Un refugio acogedor diseñado para compartir y disfrutar con los que uno más quiere. Rodeado de naturaleza y flores de jardín, cuenta con amplios espacios pensados para el descanso, el entretenimiento y el ocio tanto dentro como fuera de la cabaña, incluyendo su propia zona verde privada con columpio rústico.",
      highlights: [
        { label: "Juegos y Ocio", desc: "Espacios de entretenimiento para disfrutar dentro y fuera del chalet" },
        { label: "Columpio Privado", desc: "Zona verde exterior en césped para relajarse en familia" },
        { label: "Sala de Estar", desc: "Ambiente cálido con amplio ventanal corredizo hacia el jardín" },
        { label: "Altillo & Cocina", desc: "2 camas dobles, cocina equipada y baño con agua caliente" },
      ],
    },
  ];

  // Sincronizar selección externa de chalet
  useEffect(() => {
    if (!selectedChaletName) return;
    const lower = selectedChaletName.toLowerCase();
    let targetIdx = 0;
    if (lower.includes("aroma")) targetIdx = 1;
    else if (lower.includes("bruma")) targetIdx = 2;
    else targetIdx = 0;
    if (targetIdx !== selectedId) {
      setSelectedId(targetIdx);
      setPhotoIndex(0);
    }
  }, [selectedChaletName]);

  const currentChalet = chalets[selectedId];

  // Todas las fotos reales del chalet seleccionado
  const currentPhotos = useMemo(() => {
    const list = allGalleryItems.filter((it: GalleryPhoto) => it.chalet === currentChalet.name);
    return list.length > 0
      ? list
      : [
          {
            id: currentChalet.id,
            title: currentChalet.name,
            chalet: currentChalet.name,
            description: currentChalet.tagline,
            src: currentChalet.views.exterior,
          },
        ];
  }, [currentChalet]);

  // Sincronizar foto específica si viene desde la galería
  useEffect(() => {
    if (!selectedPhotoSrc) return;
    const foundIdx = currentPhotos.findIndex((p) => p.src === selectedPhotoSrc);
    if (foundIdx !== -1) {
      setPhotoIndex(foundIdx);
    }
  }, [selectedPhotoSrc, currentPhotos]);

  const handleSelectChalet = (idx: number) => {
    startSafeViewTransition(() => {
      setSelectedId(idx);
      setPhotoIndex(0);
      onChaletChange?.(chalets[idx].name);
    });
  };

  const activePhoto = currentPhotos[photoIndex] || currentPhotos[0];

  return (
    <div ref={chaletRef} className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center py-4">
      {/* Top Bar Editorial */}
      <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-4 pb-3 border-b transition-colors ${
        isLight ? "border-[#8D996E]/20" : "border-[#8D996E]/20"
      }`}>
        <div className="chalet-header">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-[#A45D41] tracking-widest uppercase">
              03 · Refugios de Altura
            </span>
            <span className="text-[#8D996E]/40">•</span>
            <span className={`text-[10px] font-mono tracking-widest uppercase ${
              isLight ? "text-[#5B6D49]" : "text-[#8D996E]"
            }`}>
              Colección Exclusiva
            </span>
          </div>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-light tracking-wide font-sans ${
            isLight ? "text-[#1A2219]" : "text-[#F5F2ED]"
          }`}>
            {t.configurator.title}{" "}
            <span className="italic font-normal text-[#A45D41]">{t.configurator.chaletsWord}</span>
          </h2>
        </div>
      </div>

      {/* Selector de Chalets con Foto para dar máximo protagonismo a los tres */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {chalets.map((ch, idx) => {
          const isSelected = selectedId === idx;
          const photosCount = allGalleryItems.filter((it: GalleryPhoto) => it.chalet === ch.name).length;
          return (
            <button
              key={ch.id}
              onClick={() => handleSelectChalet(idx)}
              className={`group relative flex items-center gap-3.5 p-2 sm:p-2.5 rounded-2xl border transition-all duration-300 text-left cursor-pointer ${
                isSelected
                  ? "bg-[#A45D41]/20 border-[#A45D41] shadow-xl shadow-[#A45D41]/20 ring-1 ring-[#A45D41]"
                  : isLight
                  ? "bg-white/80 border-[#8D996E]/25 hover:border-[#8D996E]/60 shadow-sm hover:bg-white"
                  : "glass-panel-dark border-[#8D996E]/15 hover:border-[#8D996E]/40 hover:bg-[#151D14]/90"
              }`}
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-md">
                <Image
                  src={ch.views.exterior}
                  alt={ch.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-[#A45D41]/40 backdrop-blur-[1px] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white drop-shadow" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-[9px] font-mono uppercase tracking-widest block truncate ${
                    isSelected ? "text-[#D48B6A] font-semibold" : "text-[#8D996E]"
                  }`}>
                    Refugio 0{idx + 1} · {ch.capacity.split("·")[0].trim()}
                  </span>
                  <span className="text-[9px] font-mono text-[#F5F2ED]/60 bg-black/30 px-1.5 py-0.5 rounded">
                    {photosCount} fotos
                  </span>
                </div>
                <h3 className={`text-sm sm:text-base font-medium tracking-tight truncate ${
                  isSelected
                    ? "text-[#F5F2ED] font-semibold"
                    : isLight
                    ? "text-[#1A2219]"
                    : "text-[#F5F2ED]/90"
                }`}>
                  {ch.name}
                </h3>
                <p className={`text-[11px] font-light truncate mt-0.5 ${
                  isSelected ? "text-[#F5F2ED]/80" : isLight ? "text-[#1A2219]/60" : "text-[#F5F2ED]/60"
                }`}>
                  {ch.basePrice} <span className="text-[9px] font-mono">/ noche</span>
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Columna Izquierda: Visor Fotográfico con Galería Completa de Fotos del Chalet */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          <div
            className={`chalet-visor relative aspect-[16/11] lg:aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-2xl group ${
              isLight ? "border border-[#8D996E]/30" : "border border-[#8D996E]/25"
            }`}
            data-cursor="explore"
            style={{ viewTransitionName: "chalet-active-photo" }}
          >
            <Image
              src={activePhoto.src}
              alt={`${currentChalet.name} - ${activePhoto.title}`}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#212B20]/90 via-[#212B20]/25 to-transparent pointer-events-none" />

            {/* Badges superiores sobre la imagen */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="glass-pill px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider text-[#F5F2ED] uppercase flex items-center gap-1.5 shadow-md">
                <Camera className="w-3.5 h-3.5 text-[#D48B6A]" />
                <span>Foto {photoIndex + 1} de {currentPhotos.length} · {currentChalet.name}</span>
              </span>

              {/* Botones de acción */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="px-3 py-1.5 rounded-full glass-panel-dark text-[10px] font-mono text-[#F5F2ED] hover:bg-[#A45D41] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  title="Ver todas las fotos en tamaño completo"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span className="hidden sm:inline">Ver las {currentPhotos.length} fotos</span>
                </button>

                {onViewInGallery && (
                  <button
                    onClick={() => onViewInGallery(currentChalet.slug)}
                    className="px-3 py-1.5 rounded-full glass-panel-dark text-[10px] font-mono text-[#8D996E] hover:text-white hover:bg-[#8D996E]/40 transition-all flex items-center gap-1 cursor-pointer shadow-md"
                    title="Ver álbum completo en la Galería"
                  >
                    <span>Galería ↓</span>
                  </button>
                )}
              </div>
            </div>

            {/* Flechas Prev / Next directamente sobre la imagen */}
            {currentPhotos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoIndex((photoIndex - 1 + currentPhotos.length) % currentPhotos.length);
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer z-10 opacity-80 group-hover:opacity-100 hover:scale-110 shadow-xl"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoIndex((photoIndex + 1) % currentPhotos.length);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer z-10 opacity-80 group-hover:opacity-100 hover:scale-110 shadow-xl"
                  aria-label="Siguiente foto"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Info inferior sobre la foto activa */}
            <div className="absolute bottom-4 left-5 right-5 z-10 pointer-events-none">
              <span className="text-[10px] font-mono text-[#D48B6A] tracking-widest uppercase font-semibold block mb-0.5">
                {activePhoto.title}
              </span>
              <p className="text-xs text-[#F5F2ED]/90 font-light line-clamp-2 max-w-xl">
                {activePhoto.description}
              </p>
            </div>
          </div>

          {/* Tira horizontal de miniaturas de TODAS las fotos de este chalet */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <span className="text-[10px] font-mono text-[#8D996E] uppercase tracking-wider flex items-center gap-1.5">
                <span>Fotos de {currentChalet.name}</span>
                <span className="text-[#F5F2ED]/40">({currentPhotos.length} fotos disponibles)</span>
              </span>
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="text-[10px] font-mono text-[#D48B6A] hover:underline cursor-pointer"
              >
                Ampliar todas ↗
              </button>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#8D996E]/20">
              {currentPhotos.map((photo, idx) => {
                const isActive = photoIndex === idx;
                return (
                  <button
                    key={photo.id || idx}
                    onClick={() => setPhotoIndex(idx)}
                    className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden shrink-0 border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "border-[#A45D41] ring-2 ring-[#A45D41] scale-105 shadow-lg"
                        : "border-white/15 opacity-60 hover:opacity-100 hover:border-white/40"
                    }`}
                    title={photo.title}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="object-cover"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-[#A45D41]/20" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta de Cotización y Experiencias del Chalet */}
        <div className={`chalet-right-panel lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl border transition-colors ${
          isLight
            ? "bg-white/85 border-[#8D996E]/25 text-[#1A2219] shadow-xl"
            : "glass-panel-dark border-[#8D996E]/20 text-[#F5F2ED]"
        }`}>
          <div>
            {/* Story */}
            <p className={`text-xs font-light leading-relaxed mb-4 ${
              isLight ? "text-[#1A2219]/80" : "text-[#F5F2ED]/80"
            }`}>
              {currentChalet.story}
            </p>

            {/* Cuatro Highlights */}
            <div className="space-y-2 mb-5">
              {currentChalet.highlights.map((h) => (
                <div
                  key={h.label}
                  className={`chalet-highlight flex items-start gap-2.5 p-2 rounded-xl transition-colors ${
                    isLight ? "hover:bg-[#8D996E]/15" : "hover:bg-[#8D996E]/10"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A45D41] mt-1.5 shrink-0" />
                  <div>
                    <span className={`text-xs font-medium block ${
                      isLight ? "text-[#1A2219]" : "text-[#F5F2ED]"
                    }`}>
                      {h.label}
                    </span>
                    <span className={`text-[11px] font-light ${
                      isLight ? "text-[#1A2219]/65" : "text-[#F5F2ED]/60"
                    }`}>
                      {h.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Stay Estimator Box */}
          <div className={`chalet-estimator p-4 rounded-2xl border transition-colors ${
            isLight
              ? "bg-[#F7F5EE] border-[#8D996E]/25 shadow-sm"
              : "bg-[#151D14]/80 border-[#8D996E]/20"
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className={`text-[10px] font-mono tracking-wider uppercase block ${
                  isLight ? "text-[#5B6D49]" : "text-[#8D996E]"
                }`}>
                  {t.configurator.totalEstimate}
                </span>
                <span className={`text-lg font-light ${
                  isLight ? "text-[#1A2219]" : "text-[#F5F2ED]"
                }`}>
                  {currentChalet.basePrice}{" "}
                  <span className={`text-xs font-mono ${isLight ? "text-[#1A2219]/50" : "text-[#F5F2ED]/50"}`}>
                    / noche
                  </span>
                </span>
              </div>

              {/* Selector de Noches */}
              <div className={`flex items-center gap-1 p-1 rounded-xl border ${
                isLight
                  ? "bg-white border-[#8D996E]/25"
                  : "bg-[#212B20] border-[#8D996E]/30"
              }`}>
                {[1, 2, 3, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setNights(n)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono cursor-pointer transition-all ${
                      nights === n
                        ? "bg-[#8D996E] text-[#212B20] font-bold"
                        : isLight
                        ? "text-[#1A2219]/60 hover:text-[#1A2219]"
                        : "text-[#F5F2ED]/60 hover:text-[#F5F2ED]"
                    }`}
                  >
                    {n}N
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectBooking(currentChalet.name, nights)}
              data-cursor="reserve"
              className="w-full py-3.5 rounded-xl text-xs font-semibold tracking-[0.2em] uppercase bg-[#A45D41] hover:bg-[#bd7356] text-[#F5F2ED] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{t.configurator.bookBtn} · {nights} {nights === 1 ? (t.common ? "Noche" : "Night") : (t.common ? "Noches" : "Nights")}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal de ChaletConfigurator */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Botón cerrar */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-30"
            aria-label="Cerrar galería"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Flecha Izquierda */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPhotoIndex((photoIndex - 1 + currentPhotos.length) % currentPhotos.length);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer z-30 shadow-2xl"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Flecha Derecha */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPhotoIndex((photoIndex + 1) % currentPhotos.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer z-30 shadow-2xl"
            aria-label="Siguiente foto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Contenedor Modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[92vh] w-full flex flex-col bg-[#151D14] border border-[#8D996E]/30 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Info y miniaturas inferiores */}
            <div className="p-4 sm:p-6 bg-[#151D14] border-t border-[#8D996E]/20 text-[#F5F2ED] flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-[#8D996E]/20 text-[#8D996E] border border-[#8D996E]/30">
                      {currentChalet.name}
                    </span>
                    <span className="text-xs text-[#8D996E]/70 font-mono">
                      Foto {photoIndex + 1} de {currentPhotos.length}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-medium text-white">{activePhoto.title}</h4>
                  <p className="text-xs text-[#F5F2ED]/70 max-w-xl">{activePhoto.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {onViewInGallery && (
                    <button
                      onClick={() => {
                        setIsLightboxOpen(false);
                        onViewInGallery(currentChalet.slug);
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-[#8D996E] border border-[#8D996E]/30 hover:bg-[#8D996E]/20 transition-all cursor-pointer"
                    >
                      Ver en Galería General ↓
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsLightboxOpen(false);
                      onSelectBooking(currentChalet.name, nights);
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase bg-[#A45D41] hover:bg-[#bd7356] text-white cursor-pointer shadow-lg transition-all"
                  >
                    Reservar {currentChalet.name}
                  </button>
                </div>
              </div>

              {/* Tira rápida de miniaturas dentro del modal */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-white/10 scrollbar-none">
                {currentPhotos.map((p, idx) => (
                  <button
                    key={p.id || idx}
                    onClick={() => setPhotoIndex(idx)}
                    className={`relative w-12 h-9 sm:w-14 sm:h-10 rounded-lg overflow-hidden shrink-0 border transition-all cursor-pointer ${
                      photoIndex === idx
                        ? "border-[#A45D41] ring-2 ring-[#A45D41] scale-105"
                        : "border-white/15 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image src={p.src} alt={p.title} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
