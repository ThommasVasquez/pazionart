"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { usePreferences } from "@/context/PreferencesContext";
import galleryItems from "@/lib/galleryManifest.json";
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
}

export default function VisualGallery({ onSelectBooking }: VisualGalleryProps) {
  const { theme, lang } = usePreferences();
  const isLight = theme === "light";
  const isEn = lang === "en";

  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: isEn ? "All Assets (34)" : "Todos los Espacios (34)" },
    { id: "susurros", label: isEn ? "Chalet Susurros (7)" : "Chalet Susurros (7)" },
    { id: "aroma", label: isEn ? "Chalet Aroma (12)" : "Chalet Aroma (12)" },
    { id: "bruma", label: isEn ? "Chalet Bruma (9)" : "Chalet Bruma (9)" },
    { id: "spa", label: isEn ? "Herbal Spa Ritual (6)" : "Spa & Baño de Hierbas (6)" },
  ];

  const filteredItems = useMemo(() => {
    if (activeTab === "all") return galleryItems;
    if (activeTab === "susurros") {
      return galleryItems.filter(
        (it) => it.category === "susurros" || it.chalet === "Chalet Susurros"
      );
    }
    if (activeTab === "aroma") {
      return galleryItems.filter(
        (it) => it.category === "aroma" || it.chalet === "Chalet Aroma"
      );
    }
    if (activeTab === "bruma") {
      return galleryItems.filter(
        (it) => it.category === "bruma" || it.chalet === "Chalet Bruma"
      );
    }
    if (activeTab === "spa") {
      return galleryItems.filter(
        (it) => it.category === "spa" || it.chalet === "Baño de Hierbas"
      );
    }
    return galleryItems;
  }, [activeTab]);

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
                {isEn ? "[ Visual Archive · 34 Verified Assets ]" : "[ Archivo Visual · 34 Fotografías Reales ]"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif tracking-tight">
              {isEn ? "The Inhabited Space of" : "El Espacio Habitado de"}{" "}
              <span className="italic font-normal text-[#8D996E]">Pazionart</span>
            </h2>
          </div>

          <p className={`text-xs max-w-md leading-relaxed ${
            isLight ? "text-[#1A2219]/70" : "text-[#F5F2ED]/70"
          }`}>
            {isEn
              ? "Every photograph reflects our true Andean sanctuaries: Chalet Susurros, Chalet Aroma, Chalet Bruma, and the ancestral herbal immersion ritual."
              : "Cada registro corresponde a nuestros santuarios de montaña: Chalet Susurros, Chalet Aroma, Chalet Bruma y el ritual de inmersión en hierbas medicinales."}
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
