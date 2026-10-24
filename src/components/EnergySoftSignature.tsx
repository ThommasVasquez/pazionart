"use client";

import Image from "next/image";
import { usePreferences } from "@/context/PreferencesContext";

interface EnergySoftSignatureProps {
  className?: string;
}

export default function EnergySoftSignature({
  className = "",
}: EnergySoftSignatureProps) {
  const { theme } = usePreferences();
  const isLight = theme === "light";

  return (
    <div
      className={`inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 py-2 px-3.5 rounded-2xl transition-all duration-300 ${
        isLight
          ? "text-[#2A1B14]/85 hover:text-[#000]"
          : "text-[#F5F2ED]/85 hover:text-[#FFF]"
      } ${className}`}
    >
      {/* Logotipo Oficial ENERGY SOFT MEDIA® */}
      <div className="relative flex flex-col items-center shrink-0 group cursor-default">
        <div className="relative flex items-start">
          <div className="relative h-5 sm:h-6 w-auto aspect-[612/188] drop-shadow-sm">
            <Image
              src="/brand/energysoft-logo.png"
              alt="ENERGYSOFT"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 70px, 85px"
            />
          </div>
          <span
            className={`text-[8px] font-mono font-bold leading-none -ml-0.5 -mt-0.5 ${
              isLight ? "text-black" : "text-[#F5F2ED]"
            }`}
          >
            ®
          </span>
        </div>
        <span
          className={`text-[6.5px] sm:text-[7px] font-mono tracking-[0.38em] uppercase block text-center font-medium leading-none mt-0.5 ${
            isLight ? "text-black/80" : "text-[#F5F2ED]/80"
          }`}
        >
          M E D I A
        </span>
      </div>

      {/* Lema Oficial de Firma */}
      <span className="text-xs sm:text-sm font-light tracking-wide leading-snug text-center sm:text-left select-none">
        Desarrollado con todo el poder de{" "}
        <strong
          className={`font-semibold ${
            isLight ? "text-black" : "text-white"
          }`}
        >
          ENERGYSOFTmedia®
        </strong>{" "}
        <span className="opacity-60">|</span> Software con Energía!{" "}
        <span className="inline-block text-[#F26B0F] animate-pulse">⚡</span>
      </span>
    </div>
  );
}
