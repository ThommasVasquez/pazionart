"use client";

import { usePreferences } from "@/context/PreferencesContext";
import { Sun, Moon } from "lucide-react";

interface ThemeSwitchProps {
  className?: string;
  variant?: "navbar" | "threshold" | "mobile";
  isRestaurante?: boolean;
}

export default function ThemeSwitch({
  className = "",
  variant = "navbar",
  isRestaurante = false,
}: ThemeSwitchProps) {
  const { theme, toggleTheme, t } = usePreferences();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={t.common.toggleTheme}
      title={isLight ? t.common.themeDark : t.common.themeLight}
      onClick={toggleTheme}
      className={`relative inline-flex items-center h-8 w-14 rounded-full p-1 transition-colors duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8D996E] select-none ${
        isLight
          ? isRestaurante
            ? "bg-[#D48B6A]/30 border border-[#A45D41]/40 shadow-inner"
            : "bg-[#8D996E]/25 border border-[#8D996E]/40 shadow-inner"
          : isRestaurante
          ? "bg-[#18110F]/90 border border-[#A45D41]/35 shadow-md"
          : "bg-[#151D14]/90 border border-[#8D996E]/30 shadow-md"
      } ${className}`}
    >
      {/* Background Icons */}
      <span className="absolute left-2 flex items-center justify-center pointer-events-none transition-opacity duration-300">
        <Sun
          className={`w-3.5 h-3.5 transition-all duration-300 ${
            isLight
              ? isRestaurante
                ? "text-[#A45D41] opacity-100 scale-100"
                : "text-[#8D996E] opacity-100 scale-100"
              : "text-[#F5F2ED]/30 opacity-40 scale-75"
          }`}
        />
      </span>
      <span className="absolute right-2 flex items-center justify-center pointer-events-none transition-opacity duration-300">
        <Moon
          className={`w-3.5 h-3.5 transition-all duration-300 ${
            !isLight
              ? "text-[#8D996E] opacity-100 scale-100"
              : "text-[#1C231A]/30 opacity-40 scale-75"
          }`}
        />
      </span>

      {/* Sliding Tactile Knob */}
      <span
        className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-transform duration-500 ease-out transform ${
          isLight
            ? "translate-x-0 bg-[#FFFFFF] text-[#A45D41] shadow-[0_2px_8px_rgba(164,93,65,0.25)]"
            : "translate-x-6 bg-[#212B20] text-[#8D996E] border border-[#8D996E]/30 shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        }`}
      >
        {isLight ? (
          <Sun className={`w-3.5 h-3.5 ${isRestaurante ? "text-[#A45D41]" : "text-[#7B8B5B]"} animate-spin-slow`} />
        ) : (
          <Moon className="w-3.5 h-3.5 text-[#8D996E]" />
        )}
      </span>
    </button>
  );
}
