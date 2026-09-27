"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LogoTexto from "./LogoTexto";

export default function SplashMask() {
  const [isDone, setIsDone] = useState(false);
  const splashRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const foliageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!splashRef.current || !foliageContainerRef.current) return;

    const leaves = foliageContainerRef.current.querySelectorAll(".splash-leaf");
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
      },
    });

    // 1. Estado inicial
    gsap.set(splashRef.current, { opacity: 1 });
    gsap.set(logoWrapperRef.current, { scale: 0, opacity: 0, rotation: -20 });
    gsap.set(shineRef.current, { xPercent: -160, yPercent: -160 });
    gsap.set(textRef.current, { opacity: 0, y: 15 });

    // 2. Colapso / succión botánica hacia el centro exacto (0.3s - 1.1s)
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
      rotation: (index) => (index % 2 === 0 ? 140 : -140),
      opacity: 0,
      duration: 0.85,
      stagger: {
        each: 0.035,
        from: "edges",
      },
      ease: "power3.in",
      delay: 0.35,
    })
      // 3. Eclosión elástica del Isotipo de Pazionart (1.1s - 1.7s)
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
      // 4. Barrido de luz diagonal brillante sobre el medallón (1.6s - 2.2s)
      .to(
        shineRef.current,
        {
          xPercent: 160,
          yPercent: 160,
          duration: 0.65,
          ease: "power2.inOut",
        },
        "-=0.1"
      )
      // 5. Revelado suave del LogoTexto Pazionart abajo (1.8s - 2.4s)
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
      // 6. Pausa de contemplación de marca (2.4s - 3.4s)
      .to({}, { duration: 1.0 })
      // 7. Disolución suave hacia la web / el umbral
      .to(splashRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      });

    return () => {
      tl.kill();
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#151D14] overflow-hidden select-none pointer-events-none"
    >
      {/* ========================================================
          CAPA BOTÁNICA: HOJAS, VEGETACIÓN Y BROTES DE MONTAÑA
          ======================================================== */}
      <div ref={foliageContainerRef} className="absolute inset-0 pointer-events-none">
        {/* Esquina Superior Izquierda */}
        <svg
          className="splash-leaf absolute -top-8 -left-8 w-44 h-44 sm:w-64 sm:h-64 text-[#263725]"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M0,0 Q60,10 80,70 Q40,90 10,60 Z" />
          <path d="M15,15 Q70,35 75,65 Q35,75 10,50 Z" opacity="0.3" fill="#8D996E" />
        </svg>

        <svg
          className="splash-leaf absolute top-12 left-2 w-28 h-28 sm:w-36 sm:h-36 text-[#354D34]"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M20,10 C50,20 80,60 70,90 C40,80 10,40 20,10 Z" />
          <line x1="20" y1="10" x2="60" y2="75" stroke="#151D14" strokeWidth="2" opacity="0.5" />
        </svg>

        {/* Pequeña cereza de café / fruto de monte superior izq */}
        <div className="splash-leaf absolute top-28 left-28 w-4 h-4 rounded-full bg-[#A45D41] shadow-[0_0_10px_rgba(164,93,65,0.6)]" />
        <div className="splash-leaf absolute top-36 left-20 w-3 h-3 rounded-full bg-[#8D996E]" />

        {/* Esquina Superior Derecha */}
        <svg
          className="splash-leaf absolute -top-10 -right-10 w-48 h-48 sm:w-72 sm:h-72 text-[#1E2E1D]"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M100,0 Q40,20 20,80 Q70,90 90,50 Z" />
          <path d="M85,15 Q45,35 30,75 Q65,75 80,45 Z" opacity="0.3" fill="#8D996E" />
        </svg>

        <svg
          className="splash-leaf absolute top-16 right-6 w-32 h-32 text-[#2D432C]"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M80,10 C50,30 20,60 30,95 C60,80 90,40 80,10 Z" />
        </svg>

        <div className="splash-leaf absolute top-32 right-32 w-3.5 h-3.5 rounded-full bg-[#A45D41]" />
        <div className="splash-leaf absolute top-20 right-44 w-2.5 h-2.5 rounded-full bg-[#F5F2ED]" />

        {/* Esquina Inferior Izquierda */}
        <svg
          className="splash-leaf absolute -bottom-10 -left-10 w-52 h-52 sm:w-80 sm:h-80 text-[#1F301E]"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M0,100 Q20,30 85,25 Q75,75 30,95 Z" />
          <path d="M10,85 Q30,45 75,35 Q65,70 30,85 Z" opacity="0.4" fill="#8D996E" />
        </svg>

        <svg
          className="splash-leaf absolute bottom-20 left-16 w-32 h-32 text-[#354D34]"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M10,80 C30,50 65,20 90,30 C80,60 40,90 10,80 Z" />
        </svg>

        <div className="splash-leaf absolute bottom-40 left-32 w-4 h-4 rounded-full bg-[#A45D41]" />
        <div className="splash-leaf absolute bottom-24 left-48 w-3 h-3 rounded-full bg-[#F5F2ED] opacity-80" />

        {/* Esquina Inferior Derecha */}
        <svg
          className="splash-leaf absolute -bottom-12 -right-12 w-56 h-56 sm:w-84 sm:h-84 text-[#263725]"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M100,100 Q80,20 15,20 Q35,70 80,95 Z" />
          <path d="M90,85 Q70,35 25,35 Q40,65 75,85 Z" opacity="0.3" fill="#8D996E" />
        </svg>

        <svg
          className="splash-leaf absolute bottom-24 right-12 w-36 h-36 text-[#334A32]"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M90,80 C70,50 35,20 10,30 C20,60 60,90 90,80 Z" />
        </svg>

        <div className="splash-leaf absolute bottom-44 right-28 w-4 h-4 rounded-full bg-[#A45D41]" />
        <div className="splash-leaf absolute bottom-28 right-44 w-3 h-3 rounded-full bg-[#8D996E]" />

        {/* Hojas flotantes y pétalos dispersos hacia el centro */}
        <div className="splash-leaf absolute top-[30%] left-[25%] w-6 h-6 rotate-45 rounded-tl-full rounded-br-full bg-[#8D996E]/70" />
        <div className="splash-leaf absolute top-[28%] right-[28%] w-5 h-5 -rotate-12 rounded-tr-full rounded-bl-full bg-[#354D34]" />
        <div className="splash-leaf absolute bottom-[32%] left-[30%] w-5 h-5 rotate-12 rounded-tl-full rounded-br-full bg-[#273826]" />
        <div className="splash-leaf absolute bottom-[30%] right-[25%] w-6 h-6 -rotate-45 rounded-tr-full rounded-bl-full bg-[#8D996E]/80" />

        {/* Pequeñas flores silvestres blancas de montaña */}
        <svg
          className="splash-leaf absolute top-[22%] left-[45%] w-5 h-5 text-[#F5F2ED]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="3" fill="#A45D41" />
          <circle cx="12" cy="5" r="2.5" />
          <circle cx="12" cy="19" r="2.5" />
          <circle cx="5" cy="12" r="2.5" />
          <circle cx="19" cy="12" r="2.5" />
        </svg>

        <svg
          className="splash-leaf absolute bottom-[22%] right-[42%] w-5 h-5 text-[#F5F2ED]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="3" fill="#8D996E" />
          <circle cx="12" cy="5" r="2.5" />
          <circle cx="12" cy="19" r="2.5" />
          <circle cx="5" cy="12" r="2.5" />
          <circle cx="19" cy="12" r="2.5" />
        </svg>
      </div>

      {/* ========================================================
          ISOTIPO CENTRAL CIRCULAR + BARRIDO DE LUZ (STARBUCKS STYLE)
          ======================================================== */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Contenedor del Medallón Circular con Rebote Elástico */}
        <div
          ref={logoWrapperRef}
          className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-[#1E2E1D] border-2 border-[#8D996E]/30 flex items-center justify-center shadow-[0_15px_45px_rgba(0,0,0,0.8)] overflow-hidden p-6"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Resplandor ambiental de fondo */}
          <div className="absolute inset-0 rounded-full bg-radial from-[#8D996E]/20 via-transparent to-transparent pointer-events-none" />

          {/* Símbolo Vectorial Oficial de Pazionart */}
          <div className="relative w-full h-full">
            <svg
              viewBox="0 0 1080 1080"
              className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]"
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
                "linear-gradient(115deg, transparent 25%, rgba(255, 255, 255, 0.45) 50%, rgba(255, 255, 255, 0.75) 53%, transparent 75%)",
              willChange: "transform",
            }}
          />
        </div>

        {/* ========================================================
            REVELADO DE MARCA: LOGO TEXTO + LEMA
            ======================================================== */}
        <div ref={textRef} className="flex flex-col items-center mt-5 text-center">
          <div className="h-6 sm:h-7 md:h-8 flex items-center drop-shadow-md">
            <LogoTexto className="h-full w-auto" fill="#F5F2ED" />
          </div>

          <span className="text-[9px] sm:text-[10px] md:text-[11px] font-mono tracking-[0.35em] text-[#8D996E] uppercase mt-2">
            Amor · Naturaleza · Arte
          </span>
        </div>
      </div>
    </div>
  );
}
