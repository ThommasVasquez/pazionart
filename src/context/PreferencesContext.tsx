"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language, Theme } from "@/lib/translations";
import { startSafeViewTransition } from "@/lib/viewTransition";

interface PreferencesContextType {
  theme: Theme;
  lang: Language;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setLang: (lang: Language) => void;
  t: (typeof translations)["es"];
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [lang, setLangState] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("pazionart_theme") as Theme | null;
      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeState(savedTheme);
        if (savedTheme === "light") {
          document.documentElement.classList.add("light-theme");
        } else {
          document.documentElement.classList.remove("light-theme");
        }
      }

      const savedLang = localStorage.getItem("pazionart_lang") as Language | null;
      if (savedLang === "es" || savedLang === "en") {
        setLangState(savedLang);
      }
    } catch {}
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    startSafeViewTransition(() => {
      setThemeState(newTheme);
      try {
        localStorage.setItem("pazionart_theme", newTheme);
      } catch {}
      if (newTheme === "light") {
        document.documentElement.classList.add("light-theme");
      } else {
        document.documentElement.classList.remove("light-theme");
      }
    });
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  const setLang = (newLang: Language) => {
    startSafeViewTransition(() => {
      setLangState(newLang);
      try {
        localStorage.setItem("pazionart_lang", newLang);
      } catch {}
    });
  };

  const t = translations[lang] || translations.es;

  return (
    <PreferencesContext.Provider
      value={{
        theme,
        lang,
        toggleTheme,
        setTheme,
        setLang,
        t,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}
