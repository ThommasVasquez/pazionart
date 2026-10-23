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
} from "lucide-react";

interface VisualGalleryProps {
  onSelectBooking?: (chaletName: string) => void;
  activeWorld?: "chalets" | "restaurante";
}

export default function VisualGallery({
  onSelectBooking,
  activeWorld = "chalets",
}: VisualGalleryProps) {
  const { theme, lang } = usePreferences();
  const isLight = theme === "light";
  const isEn = lang === "en";
  const isRestaurante = activeWorld === "restaurante";

  const [activeTab, setActiveTab] = useState<string>("all");
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
  // Restaurante contiene estrictamente mesa, vino, fuego y huerta (7 fotos)
  const baseItems = useMemo(() => {
    if (isRestaurante) {
      return galleryItems.filter(
        (it) => it.category === "spa" || it.id === "aroma-06"
      );
    }
    return galleryItems.filter(
      (it) => it.category !== "spa" && it.id !== "aroma-06"
    );
  }, [isRestaurante]);

  const categories = useMemo(() => {
    if (isRestaurante) {
      return [
        { id: "all", label: isEn ? "All Fogón & Mesa (7)" : "Todo El Fogón & Mesa (7)" },
        { id: "mesas", label: isEn ? "Tables & Candles" : "Mesas & Cenas Íntimas" },
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
      if (activeTab === "mesas") {
        return baseItems.filter((it) =>
          ["aroma-06", "spa-01", "spa-05", "spa-06"].includes(it.id)
        );
      }
      if (activeTab === "huerta") {
        return baseItems.filter((it) =>
          ["spa-02", "spa-03", "spa-04"].includes(it.id)
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
      className={`py-20 px-4 sm:px-6 md:px-8 border-t transition-colors duration-500 ${
        isLight
          ? "bg-[#F5F2ED] border-[#8D996E]/20 text-[#1A2219]"
          : "bg-[#0E150D] border-[#8D996E]/20 text-[#F5F2ED]"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#8D996E]/20 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Camera className="w-4 h-4 text-[#A45D41]" />
              <span className="text-[10px] font-mono text-[#A45D41] tracking-widest uppercase">
                {isRestaurante
                  ? isEn
                    ? "[ Culinary Visual Archive · El Fogón ]"
                    : "[ Registro Visual · El Fogón & la Mesa ]"
                  : isEn
                  ? "[ Mountain Sanctuaries Archive · 27 Photos ]"
                  : "[ Archivo Visual · Chalets de Montaña (27) ]"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif tracking-tight">
              {isRestaurante ? (
                <>
                  {isEn ? "The Culinary Ritual of" : "El Ritual del Fogón &"}{" "}
                  <span className="italic font-normal text-[#A45D41]">
                    {isEn ? "El Fogón" : "la Mesa"}
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

          <p className={`text-xs max-w-md leading-relaxed ${
            isLight ? "text-[#1A2219]/70" : "text-[#F5F2ED]/70"
          }`}>
            {isRestaurante
              ? isEn
                ? "Tables served by candlelight, glasses of Malbec wine, handmade clay vessels, and aromatic herbs harvested fresh from the mountain garden."
                : "Mesas servidas a la luz de las velas, copas de vino tinto, cazuelas de barro campesino y hierbas aromáticas recién cosechadas de la huerta."
              : isEn
              ? "Every photograph reflects our true mountain refuges: Chalet Susurros, Chalet Aroma, and Chalet Bruma."
              : "Cada registro fotográfico corresponde fielmente a nuestros 3 refugios de montaña: Chalet Susurros, Chalet Aroma y Chalet Bruma."}
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#8D996E] text-[#151D14] font-semibold shadow-md scale-105"
                    : isLight
                    ? "bg-white/80 text-[#1A2219]/70 border border-[#8D996E]/25 hover:border-[#8D996E] hover:text-[#1A2219]"
                    : "bg-[#151D14]/80 text-[#F5F2ED]/70 border border-[#8D996E]/25 hover:border-[#8D996E] hover:text-[#F5F2ED]"
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
              onClick={() => setSelectedPhotoIndex(idx)}
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
                  <span className="px-2 py-1 rounded-md text-[9px] font-mono uppercase tracking-widest bg-black/60 backdrop-blur-md text-[#E8EDDF] border border-white/10">
                    {item.chalet}
                  </span>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Captions */}
                <div className="absolute bottom-0 inset-x-0 p-3.5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xs font-serif font-medium leading-snug line-clamp-1 mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-[10px] leading-tight line-clamp-2">
                    {item.description}
                  </p>
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

                <h3 className="text-xl font-serif font-light mb-3 text-white">
                  {currentPhoto.title}
                </h3>

                <p className="text-xs text-[#F5F2ED]/75 leading-relaxed mb-6">
                  {currentPhoto.description}
                </p>

                <div className="p-3 rounded-xl bg-black/40 border border-[#8D996E]/20 text-[11px] font-mono text-[#8D996E]">
                  ✓ Archivo Oficial Pazionart
                </div>
              </div>

              {onSelectBooking && currentPhoto.chalet.includes("Chalet") && (
                <button
                  onClick={() => {
                    onSelectBooking(currentPhoto.chalet);
                    setSelectedPhotoIndex(null);
                  }}
                  className="mt-6 w-full py-3 rounded-xl text-xs font-semibold tracking-wider uppercase bg-[#A45D41] hover:bg-[#bd7356] text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reservar {currentPhoto.chalet}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
