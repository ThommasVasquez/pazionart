"use client";

import { useEffect, useState } from "react";

interface ScrollProgressProps {
  sections: { id: string; label: string }[];
}

export default function ScrollProgress({ sections }: ScrollProgressProps) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      sections.forEach((sec, idx) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(idx);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-5 pointer-events-auto"
      aria-label="Progreso de navegación"
    >
      <div className="flex flex-col items-center gap-3">
        <span className="text-[10px] font-mono tracking-widest text-[#8D996E]">
          0{activeSection + 1}
        </span>
        <div className="w-[1px] h-12 bg-[#8D996E]/20 relative">
          <div
            className="w-[1px] bg-[#A45D41] absolute top-0 left-0 transition-all duration-300"
            style={{
              height: `${((activeSection + 1) / sections.length) * 100}%`,
            }}
          />
        </div>
        <span className="text-[10px] font-mono tracking-widest text-[#F5F2ED]/40">
          0{sections.length}
        </span>
      </div>

      <nav className="flex flex-col items-end gap-3" aria-label="Secciones">
        {sections.map((sec, idx) => {
          const isActive = idx === activeSection;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group flex items-center gap-3 cursor-pointer py-1"
              aria-label={`Ir a ${sec.label}`}
            >
              <span
                className={`text-[11px] tracking-[0.18em] uppercase transition-all duration-300 ${
                  isActive
                    ? "text-[#F5F2ED] opacity-100 font-medium translate-x-0"
                    : "text-[#F5F2ED]/40 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                }`}
              >
                {sec.label}
              </span>
              <span
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-6 bg-[#A45D41]"
                    : "w-2 bg-[#8D996E]/30 group-hover:bg-[#8D996E] group-hover:w-3"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
