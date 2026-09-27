"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function SplashMask() {
  const [isDone, setIsDone] = useState(false);
  const curtainRef = useRef<HTMLDivElement>(null);
  const zoomGroupMaskRef = useRef<SVGGElement>(null);
  const zoomGroupBorderRef = useRef<SVGGElement>(null);
  const solidFillGroupRef = useRef<SVGGElement>(null);
  const textTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
      },
    });

    // 1. Estado Inicial:
    // Logo grande y centrado, opaco con sus colores oficiales
    gsap.set(curtainRef.current, { opacity: 1 });
    gsap.set([zoomGroupMaskRef.current, zoomGroupBorderRef.current], {
      scale: 1,
      transformOrigin: "540px 525px",
    });
    gsap.set(solidFillGroupRef.current, { opacity: 1 });
    gsap.set(zoomGroupBorderRef.current, { opacity: 1 });
    gsap.set(textTitleRef.current, { opacity: 0, y: 15 });

    // Entrada inicial del splash (0s - 0.6s)
    tl.fromTo(
      [zoomGroupMaskRef.current, zoomGroupBorderRef.current],
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }
    )
      .to(
        textTitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      )
      // 2. PAUSA EXACTA DE 1 SEGUNDO: Contemplación del logo antes de la transformación
      .to({}, { duration: 1.0 })

      // 3. MOMENTO CLAVE SIMULTÁNEO:
      // Exactamente al cumplirse el segundo, AL MISMO TIEMPO:
      // a) El interior se vuelve transparente dejando ver la web por dentro
      // b) Comienza el ZOOM IN directo hacia el centro del logo
      // c) El texto se desvanece
      .addLabel("zoomStart")
      // a) Transparencia del interior
      .to(
        solidFillGroupRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "zoomStart"
      )
      // Desvanecer el texto inferior
      .to(
        textTitleRef.current,
        {
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.in",
        },
        "zoomStart"
      )
      // b) ZOOM IN AL CENTRO DEL LOGO simultáneo
      .to(
        [zoomGroupMaskRef.current, zoomGroupBorderRef.current],
        {
          scale: 48,
          duration: 1.6,
          ease: "power2.inOut",
          transformOrigin: "540px 525px",
        },
        "zoomStart"
      )
      // Suavizar el contorno del logo a medida que se agranda saliendo de la pantalla
      .to(
        zoomGroupBorderRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        },
        "zoomStart+=0.8"
      )
      // Desvanecer la cortina negra final para entregar la web completamente interactiva
      .to(
        curtainRef.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.35"
      );

    return () => {
      tl.kill();
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[1000] pointer-events-none flex items-center justify-center overflow-hidden bg-[#151D14]"
      style={{ willChange: "opacity" }}
    >
      {/* ========================================================
          MÁSCARA DE CAPA SVG NATIVA CON ZOOM IN AL CENTRO
          ======================================================== */}
      <svg
        viewBox="0 0 1080 1080"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <mask id="pazionart-simultaneous-mask">
            {/* Fondo blanco cubre toda la pantalla en negro */}
            <rect x="-10000" y="-10000" width="20000" height="20000" fill="white" />
            {/* Silueta en negro = HUECO TRANSPARENTE hacia la web que hace ZOOM IN AL CENTRO */}
            <g ref={zoomGroupMaskRef} style={{ transformOrigin: "540px 525px" }}>
              <path
                fill="black"
                d="M1044.3,816c-23-46.4-72.8-91.4-114.6-121.1C882,661,824.5,639,766.1,640.5c-75,1.9-144.4,41.9-200,92.2
                c35.9,30.4,85.7,38.5,132.8,37.6s93.8-9.6,140.8-8C913.7,764.8,974.5,798.5,1044.3,816z"
              />
              <path
                fill="black"
                d="M35.7,816c23-46.4,72.8-91.4,114.6-121.1C198,661,255.5,639,313.9,640.5c75,1.9,144.4,41.9,200,92.2
                c-35.9,30.4-85.7,38.5-132.8,37.6s-93.8-9.6-140.8-8C166.3,764.8,105.5,798.5,35.7,816z"
              />
              <path
                fill="black"
                d="M540,309.1c41.5-63.2,104-41.5,104-41.5c120.3,52.4,36.9,178.8,36.9,178.8C643,513.3,547.2,728.2,547.2,728.2
                l-7.2,16.3l-7.2-16.3c0,0-95.7-214.9-133.7-281.8c0,0-83.4-126.4,36.9-178.8C436,267.6,498.5,245.9,540,309.1"
              />
              <path
                fill="black"
                d="M639.9,622.6c0.6-1.3,40.8-3.2,45.5-4.2c15.8-3.3,31.2-8.5,45.8-15.2c30-13.9,57-34.8,77.5-60.8
                c24.4-31,43.1-66.3,56-103.6c6.3-18.2,11.2-36.9,14.8-55.8c2.4-12.5,11.1-40.4,2.9-51.8c-8.7-12-32.6-6.2-43.7-0.7
                c-12.2,5.9-22.3,15.3-31.9,24.9C732.7,430.5,685.6,527.5,639.9,622.6z"
              />
              <path
                fill="black"
                d="M440,622.6c-0.6-1.3-40.8-3.2-45.5-4.2c-15.8-3.3-31.2-8.5-45.8-15.2c-30-13.9-57-34.8-77.5-60.8
                c-24.4-31-43.1-66.3-56-103.6c-6.3-18.2-11.2-36.9-14.8-55.8c-2.4-12.5-11.1-40.4-2.9-51.8c8.7-12,32.6-6.2,43.7-0.7
                c12.2,5.9,22.3,15.3,31.9,24.9C347.2,430.5,394.3,527.5,440,622.6z"
              />
            </g>
          </mask>
        </defs>

        {/* 1. Fondo que se recorta con la máscara mostrando la web detrás */}
        <rect
          x="-10000"
          y="-10000"
          width="20000"
          height="20000"
          fill="#151D14"
          mask="url(#pazionart-simultaneous-mask)"
        />

        {/* 2. Relleno inicial del logo con colores oficiales (se desvanece simultáneamente al zoom-in) */}
        <g ref={solidFillGroupRef}>
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
        </g>

        {/* 3. Contorno visible que hace el ZOOM IN AL CENTRO hacia la cámara */}
        <g
          ref={zoomGroupBorderRef}
          fill="none"
          stroke="#A45D41"
          strokeWidth="3.5"
          style={{ transformOrigin: "540px 525px" }}
        >
          <path d="M1044.3,816c-23-46.4-72.8-91.4-114.6-121.1C882,661,824.5,639,766.1,640.5c-75,1.9-144.4,41.9-200,92.2c35.9,30.4,85.7,38.5,132.8,37.6s93.8-9.6,140.8-8C913.7,764.8,974.5,798.5,1044.3,816z" />
          <path d="M35.7,816c23-46.4,72.8-91.4,114.6-121.1C198,661,255.5,639,313.9,640.5c75,1.9,144.4,41.9,200,92.2c-35.9,30.4-85.7,38.5-132.8,37.6s-93.8-9.6-140.8-8C166.3,764.8,105.5,798.5,35.7,816z" />
          <path d="M540,309.1c41.5-63.2,104-41.5,104-41.5c120.3,52.4,36.9,178.8,36.9,178.8C643,513.3,547.2,728.2,547.2,728.2l-7.2,16.3l-7.2-16.3c0,0-95.7-214.9-133.7-281.8c0,0-83.4-126.4,36.9-178.8C436,267.6,498.5,245.9,540,309.1" />
          <path d="M639.9,622.6c0.6-1.3,40.8-3.2,45.5-4.2c15.8-3.3,31.2-8.5,45.8-15.2c30-13.9,57-34.8,77.5-60.8c24.4-31,43.1-66.3,56-103.6c6.3-18.2,11.2-36.9,14.8-55.8c2.4-12.5,11.1-40.4,2.9-51.8c-8.7-12-32.6-6.2-43.7-0.7c-12.2,5.9-22.3,15.3-31.9,24.9C732.7,430.5,685.6,527.5,639.9,622.6z" />
          <path d="M440,622.6c-0.6-1.3-40.8-3.2-45.5-4.2c-15.8-3.3-31.2-8.5-45.8-15.2c-30-13.9-57-34.8-77.5-60.8c-24.4-31-43.1-66.3-56-103.6c-6.3-18.2-11.2-36.9-14.8-55.8c-2.4-12.5-11.1-40.4-2.9-51.8c8.7-12,32.6-6.2,43.7-0.7c12.2,5.9,22.3,15.3,31.9,24.9C347.2,430.5,394.3,527.5,440,622.6z" />
        </g>
      </svg>

      {/* Texto de Introducción durante el primer segundo */}
      <div
        ref={textTitleRef}
        className="absolute bottom-14 sm:bottom-18 z-10 flex flex-col items-center pointer-events-none"
      >
        <span className="text-2xl sm:text-3xl font-light tracking-[0.28em] text-[#F5F2ED] uppercase font-sans mb-1">
          Pazionart
        </span>
        <div className="flex items-center gap-2.5">
          <span className="w-5 h-[1px] bg-[#8D996E]" />
          <span className="text-[11px] tracking-[0.3em] text-[#8D996E] uppercase font-mono">
            Amor · Naturaleza · Arte
          </span>
          <span className="w-5 h-[1px] bg-[#8D996E]" />
        </div>
      </div>
    </div>
  );
}
