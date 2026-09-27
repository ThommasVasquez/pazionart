"use client";

import { usePreferences } from "@/context/PreferencesContext";
import { Globe } from "lucide-react";

interface LanguageSwitchProps {
  className?: string;
  isRestaurante?: boolean;
}

export default function LanguageSwitch({
  className = "",
  isRestaurante = false,
}: LanguageSwitchProps) {
  const { lang, setLang, theme } = usePreferences();
  const isLight = theme === "light";

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full transition-all duration-300 select-none ${
        isLight
          ? isRestaurante
            ? "bg-[#D48B6A]/15 border border-[#A45D41]/30"
            : "bg-[#8D996E]/15 border border-[#8D996E]/30"
          : isRestaurante
          ? "bg-[#18110F]/90 border border-[#A45D41]/35 shadow-sm"
          : "bg-[#151D14]/90 border border-[#8D996E]/30 shadow-sm"
      } ${className}`}
      role="group"
      aria-label="Selector de idioma / Language selector"
    >
      <div className="pl-1.5 pr-0.5 flex items-center text-xs opacity-60">
        <Globe className={`w-3 h-3 ${isRestaurante ? "text-[#D48B6A]" : "text-[#8D996E]"}`} />
      </div>

      <button
        type="button"
        onClick={() => setLang("es")}
        className={`px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
          lang === "es"
            ? isRestaurante
              ? "bg-[#A45D41] text-[#F5F2ED] shadow-sm"
              : "bg-[#8D996E] text-[#151D14] shadow-sm font-bold"
            : isLight
            ? "text-[#1C231A]/60 hover:text-[#1C231A]"
            : "text-[#F5F2ED]/60 hover:text-[#F5F2ED]"
        }`}
        aria-pressed={lang === "es"}
      >
        ES
      </button>

      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
          lang === "en"
            ? isRestaurante
              ? "bg-[#A45D41] text-[#F5F2ED] shadow-sm"
              : "bg-[#8D996E] text-[#151D14] shadow-sm font-bold"
            : isLight
            ? "text-[#1C231A]/60 hover:text-[#1C231A]"
            : "text-[#F5F2ED]/60 hover:text-[#F5F2ED]"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
