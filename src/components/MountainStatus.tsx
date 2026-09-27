"use client";

import { useEffect, useState } from "react";
import { CloudFog, Compass, Mountain, Moon } from "lucide-react";

export default function MountainStatus() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("es-CO", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#F5F2ED]/70 uppercase">
      {/* Hora local montaña */}
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8D996E] animate-pulse" />
        <span className="text-[#8D996E] font-medium">BOSQUE ANDINO</span>
        <span className="text-[#F5F2ED] font-semibold">{time || "11:45:00"}</span>
      </div>

      <span className="hidden sm:inline text-[#8D996E]/40">•</span>

      {/* Altitud y Coordenadas */}
      <div className="hidden sm:flex items-center gap-1.5">
        <Mountain className="w-3 h-3 text-[#A45D41]" />
        <span>1,850 M.S.N.M.</span>
      </div>

      <span className="hidden md:inline text-[#8D996E]/40">•</span>

      {/* Clima & Atmósfera */}
      <div className="hidden md:flex items-center gap-1.5">
        <CloudFog className="w-3 h-3 text-[#8D996E]" />
        <span>16°C · NIEBLA DISPERSA</span>
      </div>

      <span className="hidden lg:inline text-[#8D996E]/40">•</span>

      {/* Fase */}
      <div className="hidden lg:flex items-center gap-1.5 text-[#F5F2ED]/60">
        <Moon className="w-3 h-3 text-[#A45D41]" />
        <span>PAUSA CONSCIENTE</span>
      </div>
    </div>
  );
}
