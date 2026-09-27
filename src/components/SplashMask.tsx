"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LogoTexto from "./LogoTexto";

export type SplashTheme = "bosque" | "floral" | "fogon";

const THEMES: SplashTheme[] = ["bosque", "floral", "fogon"];

interface SplashMaskProps {
  onClose?: () => void;
}

export default function SplashMask({ onClose }: SplashMaskProps) {
  // Selección aleatoria entre las 3 variantes en cada recarga/visita
  const [currentTheme, setCurrentTheme] = useState<SplashTheme | null>(null);
  const [isDone, setIsDone] = useState(false);

  const splashRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const foliageContainerRef = useRef<HTMLDivElement>(null);

  // Selección estrictamente secuencial (1 -> 2 -> 3 -> 1...) en cada recarga sin repetirse
  useEffect(() => {
    const STORAGE_KEY = "pazionart_splash_seq_index";
    let nextIndex = 0;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null && !isNaN(Number(stored))) {
        nextIndex = (parseInt(stored, 10) + 1) % THEMES.length;
      } else {
        nextIndex = 0;
      }
      localStorage.setItem(STORAGE_KEY, nextIndex.toString());
    } catch {
      nextIndex = 0;
    }
    setCurrentTheme(THEMES[nextIndex]);
  }, []);

  // Ejecución de la coreografía para la variante seleccionada
  useEffect(() => {
    if (!currentTheme || !splashRef.current || !foliageContainerRef.current) return;

    const leaves = foliageContainerRef.current.querySelectorAll(".splash-element");
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const tl = gsap.timeline({
      onComplete: () => {
        if (splashRef.current) {
          gsap.to(splashRef.current, {
            opacity: 0,
            duration: 0.7,
            ease: "power2.inOut",
            onComplete: () => {
              setIsDone(true);
              onClose?.();
            },
          });
        } else {
          setIsDone(true);
          onClose?.();
        }
      },
    });

    // 1. Estado inicial
    gsap.set(splashRef.current, { opacity: 1 });
    gsap.set(logoWrapperRef.current, { scale: 0, opacity: 0, rotation: -20 });
    gsap.set(shineRef.current, { xPercent: -170, yPercent: -170 });
    gsap.set(textRef.current, { opacity: 0, y: 15 });

    // 2. Colapso / succión centrípeta de todos los elementos (0.35s - 1.15s)
    tl.to(leaves, {
      x: (index, target) => {
        const rect = target.getBoundingClientRect();
        const leafCenterX = rect.left + rect.width / 2;
        return centerX - leafCenterX;
      },
      y: (index, target) => {
        const rect = target.getBoundingClientRect();
        const leafCenterY = rect.top + rect.height / 2;
        return centerY - leafCenterY;
      },
      scale: 0.05,
      rotation: (index) => (index % 2 === 0 ? 150 : -150),
      opacity: 0,
      duration: 0.85,
      stagger: {
        each: 0.03,
        from: "edges",
      },
      ease: "power3.in",
      delay: 0.35,
    })
      // 3. Eclosión elástica del Isotipo de Pazionart (1.15s - 1.75s)
      .to(
        logoWrapperRef.current,
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.65,
          ease: "back.out(2.2)",
        },
        "-=0.2"
      )
      // 4. Barrido de luz diagonal brillante sobre el medallón (1.65s - 2.25s)
      .to(
        shineRef.current,
        {
          xPercent: 170,
          yPercent: 170,
          duration: 0.65,
          ease: "power2.inOut",
        },
        "-=0.1"
      )
      // 5. Revelado suave de la tipografía de marca abajo (1.85s - 2.4s)
      .to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        },
        "-=0.35"
      )
      // 6. Contemplación antes de disolver suavemente hacia la web
      .to({}, { duration: 1.2 });

    return () => {
      tl.kill();
    };
  }, [currentTheme, onClose]);

  if (isDone) return null;

  const activeTheme = currentTheme || "bosque";

  return (
    <div
      ref={splashRef}
      className={`fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden select-none pointer-events-none transition-colors duration-500 ${
        activeTheme === "bosque"
          ? "bg-[#151D14]"
          : activeTheme === "floral"
          ? "bg-[#E6E1D7]"
          : "bg-[#291D19]"
      }`}
    >
      {/* ========================================================
          ELEMENTOS ILUSTRADOS SEGÚN LA VARIANTE
          ======================================================== */}
      <div ref={foliageContainerRef} className="absolute inset-0 pointer-events-none">
        {/* ========================================================
            VARIANTE 1: VERDE SELVA / BOSQUE DE MONTAÑA (CHALETS)
            ======================================================== */}
        {activeTheme === "bosque" && (
          <>
            {/* Hojas grandes y helechos en esquinas */}
            <svg
              className="splash-element absolute -top-8 -left-8 w-48 h-48 sm:w-64 sm:h-64 text-[#263725]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M0,0 Q60,10 80,70 Q40,90 10,60 Z" />
              <path d="M15,15 Q70,35 75,65 Q35,75 10,50 Z" opacity="0.3" fill="#8D996E" />
            </svg>

            <svg
              className="splash-element absolute top-12 left-4 w-32 h-32 text-[#354D34]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M20,10 C50,20 80,60 70,90 C40,80 10,40 20,10 Z" />
            </svg>

            <div className="splash-element absolute top-28 left-28 w-4 h-4 rounded-full bg-[#A45D41]" />
            <div className="splash-element absolute top-36 left-20 w-3 h-3 rounded-full bg-[#8D996E]" />

            <svg
              className="splash-element absolute -top-10 -right-10 w-52 h-52 sm:w-72 sm:h-72 text-[#1E2E1D]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M100,0 Q40,20 20,80 Q70,90 90,50 Z" />
              <path d="M85,15 Q45,35 30,75 Q65,75 80,45 Z" opacity="0.3" fill="#8D996E" />
            </svg>

            <svg
              className="splash-element absolute top-16 right-6 w-36 h-36 text-[#2D432C]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M80,10 C50,30 20,60 30,95 C60,80 90,40 80,10 Z" />
            </svg>

            <div className="splash-element absolute top-32 right-32 w-3.5 h-3.5 rounded-full bg-[#A45D41]" />

            <svg
              className="splash-element absolute -bottom-10 -left-10 w-56 h-56 sm:w-80 sm:h-80 text-[#1F301E]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M0,100 Q20,30 85,25 Q75,75 30,95 Z" />
              <path d="M10,85 Q30,45 75,35 Q65,70 30,85 Z" opacity="0.4" fill="#8D996E" />
            </svg>

            <svg
              className="splash-element absolute bottom-20 left-16 w-36 h-36 text-[#354D34]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M10,80 C30,50 65,20 90,30 C80,60 40,90 10,80 Z" />
            </svg>

            <div className="splash-element absolute bottom-36 left-36 w-4 h-4 rounded-full bg-[#A45D41]" />

            <svg
              className="splash-element absolute -bottom-12 -right-12 w-60 h-60 sm:w-84 sm:h-84 text-[#263725]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M100,100 Q80,20 15,20 Q35,70 80,95 Z" />
              <path d="M90,85 Q70,35 25,35 Q40,65 75,85 Z" opacity="0.3" fill="#8D996E" />
            </svg>

            <div className="splash-element absolute bottom-44 right-28 w-4 h-4 rounded-full bg-[#A45D41]" />

            {/* Hojas y brotes flotantes */}
            <div className="splash-element absolute top-[30%] left-[25%] w-6 h-6 rotate-45 rounded-tl-full rounded-br-full bg-[#8D996E]/70" />
            <div className="splash-element absolute top-[28%] right-[28%] w-5 h-5 -rotate-12 rounded-tr-full rounded-bl-full bg-[#354D34]" />
            <div className="splash-element absolute bottom-[32%] left-[30%] w-5 h-5 rotate-12 rounded-tl-full rounded-br-full bg-[#273826]" />
            <div className="splash-element absolute bottom-[30%] right-[25%] w-6 h-6 -rotate-45 rounded-tr-full rounded-bl-full bg-[#8D996E]/80" />
          </>
        )}

        {/* ========================================================
            VARIANTE 2: BEIGE / FLORAL / MANDALAS ARTESANALES (LUZ)
            ======================================================== */}
        {activeTheme === "floral" && (
          <>
            {/* Mandalas Florales Artesanales multicolores (como en el segundo splash del video) */}
            <svg
              className="splash-element absolute top-6 -left-8 w-44 h-44 sm:w-60 sm:h-60 text-[#A45D41]"
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="40" fill="#A45D41" />
              <circle cx="50" cy="50" r="28" fill="#F5F2ED" />
              <circle cx="50" cy="50" r="16" fill="#8D996E" />
              <circle cx="50" cy="50" r="6" fill="#C9A86A" />
              {/* Pétalos radiales */}
              <circle cx="50" cy="6" r="4" fill="#C9A86A" />
              <circle cx="50" cy="94" r="4" fill="#C9A86A" />
              <circle cx="6" cy="50" r="4" fill="#C9A86A" />
              <circle cx="94" cy="50" r="4" fill="#C9A86A" />
            </svg>

            <svg
              className="splash-element absolute -top-8 -right-8 w-52 h-52 sm:w-68 sm:h-68 text-[#8D996E]"
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="42" fill="#8D996E" />
              <circle cx="50" cy="50" r="30" fill="#A45D41" />
              <circle cx="50" cy="50" r="18" fill="#F5F2ED" />
              <circle cx="50" cy="50" r="8" fill="#212B20" />
            </svg>

            <svg
              className="splash-element absolute -bottom-10 -left-10 w-56 h-56 sm:w-72 sm:h-72 text-[#A45D41]"
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="45" fill="#A45D41" />
              <circle cx="50" cy="50" r="32" fill="#C9A86A" />
              <circle cx="50" cy="50" r="18" fill="#8D996E" />
              <circle cx="50" cy="50" r="8" fill="#F5F2ED" />
            </svg>

            <svg
              className="splash-element absolute -bottom-8 -right-8 w-48 h-48 sm:w-64 sm:h-64 text-[#C9A86A]"
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="40" fill="#C9A86A" />
              <circle cx="50" cy="50" r="28" fill="#8D996E" />
              <circle cx="50" cy="50" r="16" fill="#A45D41" />
            </svg>

            {/* Mandalas flotantes intermedias */}
            <div className="splash-element absolute top-[25%] left-[28%] w-14 h-14 rounded-full border-4 border-[#A45D41] bg-[#F5F2ED] flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 rounded-full bg-[#8D996E]" />
            </div>

            <div className="splash-element absolute bottom-[28%] right-[26%] w-16 h-16 rounded-full border-4 border-[#8D996E] bg-[#F5F2ED] flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 rounded-full bg-[#A45D41]" />
            </div>

            <div className="splash-element absolute top-[40%] right-[20%] w-8 h-8 rounded-full bg-[#A45D41]" />
            <div className="splash-element absolute bottom-[40%] left-[22%] w-10 h-10 rounded-full bg-[#8D996E]" />
          </>
        )}

        {/* ========================================================
            VARIANTE 3: MARRÓN CACAO / FOGÓN & FAUNA (TIERRA & FUEGO)
            ======================================================== */}
        {activeTheme === "fogon" && (
          <>
            {/* Silueta del Tigre / Felino Andino de la tercera variante del video */}
            <svg
              className="splash-element absolute top-16 left-6 w-36 h-36 sm:w-52 sm:h-52 text-[#F5F2ED]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Rayos solares */}
              <circle cx="50" cy="40" r="12" fill="#E6DFD5" opacity="0.3" />
              <circle cx="50" cy="50" r="24" fill="#E6DFD5" />
              {/* Orejas de felino */}
              <polygon points="35,32 42,42 30,44" fill="#291D19" />
              <polygon points="65,32 58,42 70,44" fill="#291D19" />
              {/* Ojos y bigotes */}
              <ellipse cx="43" cy="50" rx="3" ry="2" fill="#291D19" />
              <ellipse cx="57" cy="50" rx="3" ry="2" fill="#291D19" />
              <polygon points="50,56 46,53 54,53" fill="#A45D41" />
            </svg>

            {/* Hojas de Roble & Café tono Marfil y Ocre */}
            <svg
              className="splash-element absolute -top-8 -right-8 w-48 h-48 sm:w-68 sm:h-68 text-[#E2DACB]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M100,0 Q40,25 20,80 Q70,90 95,50 Z" />
              <line x1="85" y1="15" x2="30" y2="75" stroke="#291D19" strokeWidth="2" opacity="0.3" />
            </svg>

            <svg
              className="splash-element absolute -bottom-10 -left-10 w-56 h-56 sm:w-80 sm:h-80 text-[#D8CCA9]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M0,100 Q20,30 85,25 Q75,75 30,95 Z" />
            </svg>

            <svg
              className="splash-element absolute -bottom-10 -right-10 w-52 h-52 sm:w-76 sm:h-76 text-[#8B6748]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M100,100 Q80,20 15,20 Q35,70 80,95 Z" />
            </svg>

            {/* Hojas secas y semillas de fogón flotantes */}
            <div className="splash-element absolute top-[32%] left-[28%] w-8 h-8 rounded-tl-full rounded-br-full bg-[#E2DACB] rotate-45" />
            <div className="splash-element absolute bottom-[30%] right-[25%] w-7 h-7 rounded-tr-full rounded-bl-full bg-[#D8CCA9] -rotate-45" />
            <div className="splash-element absolute top-[28%] right-[26%] w-4 h-4 rounded-full bg-[#C2825D]" />
            <div className="splash-element absolute bottom-[34%] left-[24%] w-5 h-5 rounded-full bg-[#A45D41]" />
          </>
        )}
      </div>

      {/* ========================================================
          ISOTIPO CENTRAL CIRCULAR + BARRIDO DE LUZ (REBOTING POP)
          ======================================================== */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Medallón Circular con Rebote Elástico */}
        <div
          ref={logoWrapperRef}
          className={`relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full border-2 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden p-6 transition-colors duration-500 ${
            activeTheme === "bosque"
              ? "bg-[#1E2E1D] border-[#8D996E]/40"
              : activeTheme === "floral"
              ? "bg-[#212B20] border-[#A45D41]/40"
              : "bg-[#1C1310] border-[#C2825D]/40"
          }`}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Resplandor ambiental de fondo */}
          <div
            className={`absolute inset-0 rounded-full bg-radial to-transparent pointer-events-none ${
              activeTheme === "bosque"
                ? "from-[#8D996E]/25"
                : activeTheme === "floral"
                ? "from-[#A45D41]/25"
                : "from-[#C2825D]/25"
            }`}
          />

          {/* Símbolo Vectorial Oficial de Pazionart */}
          <div className="relative w-full h-full">
            <svg
              viewBox="0 0 1080 1080"
              className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
            >
              <path
                fill="#8D996E"
                d="M1044.3,816c-23-46.4-72.8-91.4-114.6-121.1C882,661,824.5,639,766.1,640.5c-75,1.9-144.4,41.9-200,92.2
                c35.9,30.4,85.7,38.5,132.8,37.6s93.8-9.6,140.8-8C913.7,764.8,974.5,798.5,1044.3,816z"
              />
              <path
                fill="#8D996E"
                d="M35.7,816c23-46.4,72.8-91.4,114.6-121.1C198,661,255.5,639,313.9,640.5c75,1.9,144.4,41.9,200,92.2
                c-35.9,30.4-85.7,38.5-132.8,37.6s-93.8-9.6-140.8-8C166.3,764.8,105.5,798.5,35.7,816z"
              />
              <path
                fill="#F5F2ED"
                d="M540,309.1c41.5-63.2,104-41.5,104-41.5c120.3,52.4,36.9,178.8,36.9,178.8C643,513.3,547.2,728.2,547.2,728.2
                l-7.2,16.3l-7.2-16.3c0,0-95.7-214.9-133.7-281.8c0,0-83.4-126.4,36.9-178.8C436,267.6,498.5,245.9,540,309.1"
              />
              <path
                fill="#A45D41"
                d="M639.9,622.6c0.6-1.3,40.8-3.2,45.5-4.2c15.8-3.3,31.2-8.5,45.8-15.2c30-13.9,57-34.8,77.5-60.8
                c24.4-31,43.1-66.3,56-103.6c6.3-18.2,11.2-36.9,14.8-55.8c2.4-12.5,11.1-40.4,2.9-51.8c-8.7-12-32.6-6.2-43.7-0.7
                c-12.2,5.9-22.3,15.3-31.9,24.9C732.7,430.5,685.6,527.5,639.9,622.6z"
              />
              <path
                fill="#A45D41"
                d="M440,622.6c-0.6-1.3-40.8-3.2-45.5-4.2c-15.8-3.3-31.2-8.5-45.8-15.2c-30-13.9-57-34.8-77.5-60.8
                c-24.4-31-43.1-66.3-56-103.6c-6.3-18.2-11.2-36.9-14.8-55.8c-2.4-12.5-11.1-40.4-2.9-51.8c8.7-12,32.6-6.2,43.7-0.7
                c12.2,5.9,22.3,15.3,31.9,24.9C347.2,430.5,394.3,527.5,440,622.6z"
              />
            </svg>
          </div>

          {/* Cinta de Barrido de Luz Diagonal (Light Sweep) */}
          <div
            ref={shineRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(115deg, transparent 25%, rgba(255, 255, 255, 0.45) 50%, rgba(255, 255, 255, 0.8) 53%, transparent 75%)",
              willChange: "transform",
            }}
          />
        </div>

        {/* ========================================================
            REVELADO DE MARCA: LOGO TEXTO + LEMA
            ======================================================== */}
        <div ref={textRef} className="flex flex-col items-center mt-5 text-center">
          <div className="h-6 sm:h-7 md:h-8 flex items-center drop-shadow-md">
            <LogoTexto
              className="h-full w-auto"
              fill={activeTheme === "floral" ? "#212B20" : "#F5F2ED"}
            />
          </div>

          <span
            className={`text-[9px] sm:text-[10px] md:text-[11px] font-mono tracking-[0.35em] uppercase mt-2 ${
              activeTheme === "floral"
                ? "text-[#A45D41]"
                : activeTheme === "fogon"
                ? "text-[#C2825D]"
                : "text-[#8D996E]"
            }`}
          >
            Amor · Naturaleza · Arte
          </span>
        </div>
      </div>
    </div>
  );
}
