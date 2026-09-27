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

    // Estado Inicial:
    // El logo grande en el centro, sólido, con escala 1
    gsap.set(curtainRef.current, { opacity: 1 });
    gsap.set([zoomGroupMaskRef.current, zoomGroupBorderRef.current], {
      scale: 1,
      transformOrigin: "540px 520px",
    });
    gsap.set(solidFillGroupRef.current, { fillOpacity: 1, opacity: 1 });
    gsap.set(zoomGroupBorderRef.current, { opacity: 1, strokeWidth: 3 });
    gsap.set(textTitleRef.current, { opacity: 0, y: 15 });

    // 1. Entrada inicial: el logo y texto aparecen (0s - 0.7s)
    tl.fromTo(
      [zoomGroupMaskRef.current, zoomGroupBorderRef.current],
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" }
    )
      .to(
        textTitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      )
      // 2. PAUSA DE 1 SEGUNDO: El usuario contempla el logo grande en el centro
      .to({}, { duration: 1.0 })
      // 3. El texto inferior se desvanece
      .to(textTitleRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.35,
        ease: "power2.in",
      })
      // 4. EL INTERIOR DEL LOGO SE VUELVE TRANSPARENTE:
      // Se desvanece el relleno sólido, dejando ver la web por dentro de la silueta del logo
      .to(
        solidFillGroupRef.current,
        {
          opacity: 0,
          duration: 0.45,
          ease: "power2.inOut",
        },
        "-=0.2"
      )
      // Iluminamos el contorno para que el borde del logo sea visible y marque la silueta
      .to(
        zoomGroupBorderRef.current,
        {
          opacity: 1,
          stroke: "#A45D41",
          duration: 0.4,
        },
        "<"
      )
      // 5. EFECTO ZOOM IN CLARO Y DRAMÁTICO:
      // El logo empieza a crecer progresivamente (hace zoom-in), acercándose a la pantalla
      // mientras la web se ve cada vez más grande dentro de su forma
      .to(
        [zoomGroupMaskRef.current, zoomGroupBorderRef.current],
        {
          scale: 45,
          duration: 1.8,
          ease: "expo.inOut",
          transformOrigin: "540px 520px",
        }
      )
      // 6. El contorno se desvanece al final cuando ya cubre toda la pantalla
      .to(
        zoomGroupBorderRef.current,
        {
          opacity: 0,
          duration: 0.4,
        },
        "-=0.5"
      )
      // 7. Salida de la cortina
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
      {/* ========================================================
          SVG MAESTRO: MÁSCARA DE CAPA CON ZOOM IN + CONTORNO VISIBLE
          ======================================================== */}
      <svg
        viewBox="0 0 1080 1080"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <mask id="pazionart-zoomin-mask">
            {/* Rectángulo blanco = cubre la pantalla en color #151D14 */}
            <rect x="-10000" y="-10000" width="20000" height="20000" fill="white" />
            {/* Grupo de máscara en negro = HUECO TRANSPARENTE hacia la web que hace ZOOM IN */}
            <g ref={zoomGroupMaskRef}>
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

        {/* 1. Rectángulo de fondo Noche que lleva la máscara perforada */}
        <rect
          x="-10000"
          y="-10000"
          width="20000"
          height="20000"
          fill="#151D14"
          mask="url(#pazionart-zoomin-mask)"
        />

        {/* 2. Relleno inicial colorido (se desvanece a 1 segundo para volverse transparente) */}
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

        {/* 3. Contorno visible del logo que hace el ZOOM IN hacia la pantalla */}
        <g ref={zoomGroupBorderRef} fill="none" stroke="#A45D41" strokeWidth="4">
          <path d="M1044.3,816c-23-46.4-72.8-91.4-114.6-121.1C882,661,824.5,639,766.1,640.5c-75,1.9-144.4,41.9-200,92.2c35.9,30.4,85.7,38.5,132.8,37.6s93.8-9.6,140.8-8C913.7,764.8,974.5,798.5,1044.3,816z" />
          <path d="M35.7,816c23-46.4,72.8-91.4,114.6-121.1C198,661,255.5,639,313.9,640.5c75,1.9,144.4,41.9,200,92.2c-35.9,30.4-85.7,38.5-132.8,37.6s-93.8-9.6-140.8-8C166.3,764.8,105.5,798.5,35.7,816z" />
          <path d="M540,309.1c41.5-63.2,104-41.5,104-41.5c120.3,52.4,36.9,178.8,36.9,178.8C643,513.3,547.2,728.2,547.2,728.2l-7.2,16.3l-7.2-16.3c0,0-95.7-214.9-133.7-281.8c0,0-83.4-126.4,36.9-178.8C436,267.6,498.5,245.9,540,309.1" />
          <path d="M639.9,622.6c0.6-1.3,40.8-3.2,45.5-4.2c15.8-3.3,31.2-8.5,45.8-15.2c30-13.9,57-34.8,77.5-60.8c24.4-31,43.1-66.3,56-103.6c6.3-18.2,11.2-36.9,14.8-55.8c2.4-12.5,11.1-40.4,2.9-51.8c-8.7-12-32.6-6.2-43.7-0.7c-12.2,5.9-22.3,15.3-31.9,24.9C732.7,430.5,685.6,527.5,639.9,622.6z" />
          <path d="M440,622.6c-0.6-1.3-40.8-3.2-45.5-4.2c-15.8-3.3-31.2-8.5-45.8-15.2c-30-13.9-57-34.8-77.5-60.8c-24.4-31-43.1-66.3-56-103.6c-6.3-18.2-11.2-36.9-14.8-55.8c-2.4-12.5-11.1-40.4-2.9-51.8c8.7-12,32.6-6.2,43.7-0.7c12.2,5.9,22.3,15.3,31.9,24.9C347.2,430.5,394.3,527.5,440,622.6z" />
        </g>
      </svg>

      {/* Texto de Bienvenida que acompaña al logo durante el primer segundo */}
      <div
        ref={textTitleRef}
        className="absolute bottom-16 sm:bottom-20 z-10 flex flex-col items-center pointer-events-none"
      >
        <span className="text-3xl sm:text-4xl font-light tracking-[0.25em] text-[#F5F2ED] uppercase font-sans mb-1">
          Pazionart
        </span>
        <div className="flex items-center gap-2">
          <span className="w-5 h-[1px] bg-[#8D996E]" />
          <span className="text-xs tracking-[0.3em] text-[#8D996E] uppercase font-mono">
            Amor · Naturaleza · Arte
          </span>
          <span className="w-5 h-[1px] bg-[#8D996E]" />
        </div>
      </div>
    </div>
  );
}
