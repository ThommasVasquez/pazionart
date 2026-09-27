"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function SplashMask() {
  const [isDone, setIsDone] = useState(false);
  const splashRef = useRef<HTMLDivElement>(null);
  const logoContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
      },
    });

    // 1. Estado Inicial
    gsap.set(splashRef.current, { opacity: 1 });
    gsap.set(logoContentRef.current, { opacity: 0, scale: 0.92, y: 15 });

    // 2. Aparición suave del logo y texto (0s - 0.7s)
    tl.to(logoContentRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
    })
      // 3. Pausa contemplativa con el logo centrado
      .to({}, { duration: 1.2 })
      // 4. Fade-out suave y limpio de todo el splashscreen
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
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#151D14] pointer-events-none"
      style={{ willChange: "opacity" }}
    >
      <div
        ref={logoContentRef}
        className="flex flex-col items-center text-center px-6"
      >
        {/* Isotipo Oficial de Pazionart Centrado y Grande */}
        <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 mb-6 drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
          {/* Resplandor ambiental suave */}
          <div className="absolute inset-0 rounded-full bg-[#8D996E]/20 filter blur-3xl scale-125" />
          <svg viewBox="0 0 1080 1080" className="w-full h-full relative z-10">
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
              fill="#8D996E"
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

        {/* Tipografía Oficial */}
        <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.25em] text-[#F5F2ED] uppercase font-sans mb-2">
          Pazionart
        </span>
        <div className="flex items-center gap-3">
          <span className="w-6 h-[1px] bg-[#8D996E]" />
          <span className="text-xs sm:text-sm tracking-[0.35em] text-[#8D996E] uppercase font-mono font-medium">
            Amor · Naturaleza · Arte
          </span>
          <span className="w-6 h-[1px] bg-[#8D996E]" />
        </div>
      </div>
    </div>
  );
}
