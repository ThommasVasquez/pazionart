"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { usePreferences } from "@/context/PreferencesContext";
import galleryItems from "@/lib/galleryManifest.json";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Camera,
  Layers,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

interface VisualGalleryProps {
  onSelectBooking?: (chaletName: string) => void;
  onGoToChalet?: (chaletName: string, photoSrc?: string) => void;
  activeWorld?: "chalets" | "restaurante";
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function VisualGallery({
  onSelectBooking,
  onGoToChalet,
  activeWorld = "chalets",
  activeTab: externalTab,
  onTabChange,
}: VisualGalleryProps) {
  const { theme, lang } = usePreferences();
  const isLight = theme === "light";
  const isEn = lang === "en";
  const isRestaurante = activeWorld === "restaurante";

  const [internalTab, setInternalTab] = useState<string>("all");
  const activeTab = externalTab !== undefined ? externalTab : internalTab;
  const setActiveTab = (tab: string) => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Recalcular límites de scroll inmediatamente cuando cambian las pestañas o el mundo
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        window.__lenis?.resize();
        ScrollTrigger.refresh();
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [activeTab, activeWorld]);

  // Chalet items contienen estrictamente los 3 chalets (27 fotos)
  // Restaurante contiene Gastro-Bar (5 fotos reales), mesa, vino, fuego y huerta (12 fotos)
  const baseItems = useMemo(() => {
    if (isRestaurante) {
      return galleryItems.filter(
        (it) => it.category === "restaurante" || it.category === "spa" || it.id === "aroma-06"
      );
    }
    return galleryItems.filter(
      (it) => it.category !== "spa" && it.id !== "aroma-06" && it.category !== "restaurante"
    );
  }, [isRestaurante]);

  const categories = useMemo(() => {
    if (isRestaurante) {
      return [
        { id: "all", label: isEn ? "All Restaurant & Gastro-Bar (12)" : "Todo el Restaurante & Gastro-Bar (12)" },
        { id: "terraza", label: isEn ? "Gastro-Bar & Terrace (5)" : "Fachada & Terraza (5)" },
        { id: "mesas", label: isEn ? "Tables & Intimate Dining" : "Mesas & Cenas Íntimas" },
        { id: "huerta", label: isEn ? "Garden & Botanicals" : "Huerta & Botánica" },
      ];
    }
    return [
      { id: "all", label: isEn ? "All Chalets (27)" : "Todos los Chalets (27)" },
      { id: "susurros", label: isEn ? "Chalet Susurros (7)" : "Chalet Susurros (7)" },
      { id: "aroma", label: isEn ? "Chalet Aroma (11)" : "Chalet Aroma (11)" },
      { id: "bruma", label: isEn ? "Chalet Bruma (9)" : "Chalet Bruma (9)" },
    ];
  }, [isRestaurante, isEn]);

  const filteredItems = useMemo(() => {
    if (activeTab === "all") return baseItems;
    if (isRestaurante) {
      if (activeTab === "terraza") {
        return baseItems.filter((it) => it.category === "restaurante");
      }
      if (activeTab === "mesas") {
        return baseItems.filter((it) =>
          ["aroma-06", "spa-preparacion-completa", "spa-composicion-relajante", "spa-vista-cenital"].includes(it.id)
        );
      }
      if (activeTab === "huerta") {
        return baseItems.filter((it) =>
          ["spa-sales-corazon", "spa-ramilletes-frescos", "spa-detalle-aromas"].includes(it.id)
        );
      }
      return baseItems;
    }
    if (activeTab === "susurros") {
      return baseItems.filter(
        (it) => it.category === "susurros" || it.chalet === "Chalet Susurros"
      );
    }
    if (activeTab === "aroma") {
      return baseItems.filter(
        (it) => it.category === "aroma" || it.chalet === "Chalet Aroma"
      );
    }
    if (activeTab === "bruma") {
      return baseItems.filter(
        (it) => it.category === "bruma" || it.chalet === "Chalet Bruma"
      );
    }
    return baseItems;
  }, [activeTab, baseItems, isRestaurante]);

  const currentPhoto =
    selectedPhotoIndex !== null ? filteredItems[selectedPhotoIndex] : null;

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredItems.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(
      (selectedPhotoIndex - 1 + filteredItems.length) % filteredItems.length
    );
  };

  return (
    <section
      id="galeria"
      className={`min-h-[100dvh] flex flex-col justify-center py-28 md:py-36 px-4 sm:px-6 md:px-8 border-t transition-colors duration-500 ${
        isLight
          ? "bg-[#F5F2ED] border-[#8D996E]/20 text-[#1A2219]"
          : "bg-[#0E150D] border-[#8D996E]/20 text-[#F5F2ED]"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full my-auto">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#8D996E]/20 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Camera className="w-4 h-4 text-[#A45D41]" />
              <span className="text-xs font-mono text-[#A45D41] tracking-widest uppercase font-semibold">
                {isRestaurante
                  ? isEn
                    ? "[ Culinary Visual Archive · Restaurant ]"
                    : "[ Registro Visual · Restaurante de Pazionart ]"
                  : isEn
                  ? "[ Sanctuaries Archive · 27 Photos ]"
                  : "[ Archivo Visual · Chalets & Refugios (27) ]"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-sans tracking-tight">
              {isRestaurante ? (
                <>
                  {isEn ? "The Culinary Ritual &" : "El Ritual Culinario &"}{" "}
                  <span className="italic font-normal text-[#A45D41]">
                    {isEn ? "the Table" : "la Buena Mesa"}
                  </span>
                </>
              ) : (
                <>
                  {isEn ? "The Inhabited Space of" : "El Espacio Habitado de"}{" "}
                  <span className="italic font-normal text-[#8D996E]">los Chalets</span>
                </>
              )}
            </h2>
          </div>

          <p className={`text-sm sm:text-base max-w-md leading-relaxed ${
            isLight ? "text-[#1A2219]/80" : "text-[#F5F2ED]/80"
          }`}>
            {isRestaurante
              ? isEn
                ? "Tables served by candlelight, glasses of Malbec wine, handmade clay vessels, and aromatic herbs harvested fresh from the garden."
                : "Mesas servidas a la luz de las velas, copas de vino tinto, cazuelas de barro campesino y hierbas aromáticas recién cosechadas de la huerta."
              : isEn
              ? "Every photograph reflects our true refuges: Chalet Susurros, Chalet Aroma, and Chalet Bruma."
              : "Cada registro fotográfico corresponde fielmente a nuestros 3 refugios: Chalet Susurros, Chalet Aroma y Chalet Bruma."}
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#8D996E] text-[#151D14] font-semibold shadow-md scale-105"
                    : isLight
                    ? "bg-white/80 text-[#1A2219]/75 border border-[#8D996E]/25 hover:border-[#8D996E] hover:text-[#1A2219]"
                    : "bg-[#151D14]/80 text-[#F5F2ED]/75 border border-[#8D996E]/25 hover:border-[#8D996E] hover:text-[#F5F2ED]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Masonry / Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                if (!isRestaurante && onGoToChalet && item.chalet.includes("Chalet")) {
                  onGoToChalet(item.chalet, item.src);
                } else {
                  setSelectedPhotoIndex(idx);
                }
              }}
              className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${
                isLight
                  ? "bg-white border-[#8D996E]/20"
                  : "bg-[#151D14] border-[#8D996E]/20"
              }`}
            >
              {/* Aspect Ratio Box */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Badge top */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#E8EDDF] border border-white/10 flex items-center gap-1.5 group-hover:border-[#8D996E] transition-colors">
                    <span>{item.chalet}</span>
                    {!isRestaurante && item.chalet.includes("Chalet") && (
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#D48B6A]" />
                    )}
                  </span>
                </div>

                {/* Botón de ampliar foto independiente */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPhotoIndex(idx);
                    }}
                    className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md flex items-center justify-center text-white border border-white/15 cursor-pointer shadow-lg hover:scale-110 transition-all"
                    title="Ampliar foto"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Captions */}
                <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-sm sm:text-base font-sans font-medium leading-snug line-clamp-1 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm font-light leading-snug line-clamp-2">
                    {item.description}
                  </p>
                  {!isRestaurante && item.chalet.includes("Chalet") && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-mono text-[#D48B6A] uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Ir a la ficha de este Chalet</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentPhoto && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Card in Modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] w-full flex flex-col md:flex-row bg-[#151D14] border border-[#8D996E]/30 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Image Box */}
            <div className="relative flex-1 min-h-[350px] sm:min-h-[480px] bg-black">
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Sidebar Details */}
            <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-[#151D14] border-t md:border-t-0 md:border-l border-[#8D996E]/20 text-[#F5F2ED]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest bg-[#8D996E]/20 text-[#8D996E] border border-[#8D996E]/30">
                    {currentPhoto.chalet}
                  </span>
                  <span className="text-xs text-[#8D996E]/50 font-mono">
                    {selectedPhotoIndex !== null ? selectedPhotoIndex + 1 : 1} / {filteredItems.length}
                  </span>
                </div>

                <h3 className="text-xl font-sans font-light mb-3 text-white">
                  {currentPhoto.title}
                </h3>

                <p className="text-xs text-[#F5F2ED]/75 leading-relaxed mb-6">
                  {currentPhoto.description}
                </p>

                <div className="p-3 rounded-xl bg-black/40 border border-[#8D996E]/20 text-[11px] font-mono text-[#8D996E]">
                  ✓ Archivo Oficial Pazionart
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mt-6">
                {onGoToChalet && currentPhoto.chalet.includes("Chalet") && (
                  <button
                    onClick={() => {
                      onGoToChalet(currentPhoto.chalet, currentPhoto.src);
                      setSelectedPhotoIndex(null);
                    }}
                    className="w-full py-3 rounded-xl text-xs font-semibold tracking-wider uppercase bg-[#8D996E] hover:bg-[#a1b07e] text-[#151D14] flex items-center justify-center gap-2 transition-all cursor-pointer font-bold shadow-lg"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Ver este Chalet en la sección Chalets</span>
                  </button>
                )}

                {onSelectBooking && currentPhoto.chalet.includes("Chalet") && (
                  <button
                    onClick={() => {
                      onSelectBooking(currentPhoto.chalet);
                      setSelectedPhotoIndex(null);
                    }}
                    className="w-full py-3 rounded-xl text-xs font-semibold tracking-wider uppercase bg-[#A45D41] hover:bg-[#bd7356] text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reservar {currentPhoto.chalet}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
