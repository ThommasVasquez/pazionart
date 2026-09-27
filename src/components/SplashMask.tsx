"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function SplashMask() {
  const [isDone, setIsDone] = useState(false);
  const curtainRef = useRef<HTMLDivElement>(null);
  const introIconRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const maskHoleRef = useRef<SVGGElement>(null);
  const svgMaskOverlayRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
      },
    });

    // 1. Estado inicial
    gsap.set(introIconRef.current, { scale: 0.8, opacity: 0, y: 20 });
    gsap.set(introTextRef.current, { opacity: 0, y: 15 });
    gsap.set(svgMaskOverlayRef.current, { opacity: 0 });
    gsap.set(maskHoleRef.current, { scale: 0.08, transformOrigin: "540px 540px" });

    // 2. Aparición del splash con el isotipo de Pazionart
    tl.to(introIconRef.current, {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
    })
      .to(
        introTextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      )
      // 3. Pausa de ~1 segundo contemplativo según la petición del usuario
      .to({}, { duration: 0.9 })
      // 4. El texto se desvanece suavemente
      .to(introTextRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
      })
      // 5. Activamos el overlay de máscara SVG en el mismo instante
      .set(svgMaskOverlayRef.current, { opacity: 1 }, "<")
      .to(
        introIconRef.current,
        {
          opacity: 0,
          duration: 0.25,
        },
        "<"
      )
      // 6. El hueco de máscara con la forma exacta del símbolo se expande masivamente
      // revelando el contenido de la web a través de la silueta botánica
      .fromTo(
        maskHoleRef.current,
        {
          scale: 0.12,
          transformOrigin: "540px 540px",
        },
        {
          scale: 18,
          duration: 1.3,
          ease: "expo.inOut",
        }
      )
      // 7. Desvanecimiento final de la cortina
      .to(
        curtainRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
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
      {/* 
        MÁSCARA DE CAPA SVG NATIVA
        El fondo #151D14 se recorta dejando ver la web a través del símbolo que se expande
      */}
      <svg
        ref={svgMaskOverlayRef}
        viewBox="0 0 1080 1080"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <mask id="pazionart-mask-reveal">
            {/* Rectángulo blanco = cubre y tapa la pantalla */}
            <rect x="-2000" y="-2000" width="6000" height="6000" fill="white" />
            {/* Silueta negra = HUECO TRANSPARENTE con la forma del isotipo de Pazionart */}
            <g ref={maskHoleRef}>
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
        {/* Fondo del splash que lleva la máscara */}
        <rect
          x="-2000"
          y="-2000"
          width="6000"
          height="6000"
          fill="#151D14"
          mask="url(#pazionart-mask-reveal)"
        />
      </svg>

      {/* 
        SPLASHSCREEN VISUAL INICIAL
        Ícono nítido en sus colores Tierra y Alma + Lettering
      */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pointer-events-none">
        {/* Isotipo con resplandor cálido */}
        <div
          ref={introIconRef}
          className="relative w-28 h-28 sm:w-36 sm:h-36 mb-5 drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
        >
          <div className="absolute inset-0 rounded-full bg-[#8D996E]/25 filter blur-2xl scale-125" />
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

        {/* Tipografía de marca */}
        <div ref={introTextRef} className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-light tracking-[0.3em] text-[#F5F2ED] uppercase font-sans mb-1">
            Pazionart
          </span>
          <div className="flex items-center gap-2">
            <span className="w-4 h-[1px] bg-[#8D996E]" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.35em] text-[#8D996E] uppercase font-mono font-medium">
              Amor · Naturaleza · Arte
            </span>
            <span className="w-4 h-[1px] bg-[#8D996E]" />
          </div>
        </div>
      </div>
    </div>
  );
}
