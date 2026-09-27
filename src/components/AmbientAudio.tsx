"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import gsap from "gsap";

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Efecto de dispersión de hojas (salto en pila de hojas de bosque)
  const triggerLeafBurst = (btn: HTMLElement) => {
    const rect = btn.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    // Paleta viva y contrastada de hojas otoñales y de bosque
    const LEAF_COLORS = [
      "#5B7E43", // verde bosque intenso
      "#7A9652", // verde salvia vivo
      "#8D996E", // oliva clásico Pazionart
      "#B95A34", // terracota rojizo
      "#C2825D", // canela tostada
      "#D4A346", // ocre dorado otoñal
      "#8A4B2A", // marrón hoja seca
      "#E2DACB", // hoja marfil
    ];

    // Siluetas botánicas detalladas: con tallo (pecíolo), nervadura central y secundarias
    const LEAF_SVGS = [
      // 1. Hoja de Roble / Encino (con lóbulos clásicos, nervadura y tallo)
      (c: string) => `
        <svg viewBox="0 0 32 32" class="w-full h-full" style="color: ${c}; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));">
          <path d="M16 2 C13 5 10 7 11 10 C8 11 7 14 9 17 C6 18 6 22 10 24 C9 26 12 27 15 27 L15 31 C15 31.5 17 31.5 17 31 L17 27 C20 27 23 26 22 24 C26 22 26 18 23 17 C25 14 24 11 21 10 C22 7 19 5 16 2 Z" fill="currentColor"/>
          <path d="M16 4 L16 30" stroke="rgba(0,0,0,0.35)" stroke-width="1.4" stroke-linecap="round"/>
          <path d="M16 11 L12 9 M16 15 L20 13 M16 19 L11 17 M16 23 L21 21" stroke="rgba(0,0,0,0.3)" stroke-width="1" stroke-linecap="round"/>
        </svg>
      `,
      // 2. Hoja de Café / Laurel (lanceolada con punta afilada, tallo y costillas laterales)
      (c: string) => `
        <svg viewBox="0 0 32 32" class="w-full h-full" style="color: ${c}; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));">
          <path d="M16 2 C9 7 5 15 7 23 C9 26 14 27 15 27 L15 31 C15 31.5 17 31.5 17 31 L17 27 C18 27 23 26 25 23 C27 15 23 7 16 2 Z" fill="currentColor"/>
          <path d="M16 3 L16 30" stroke="rgba(0,0,0,0.35)" stroke-width="1.4" stroke-linecap="round"/>
          <path d="M16 8 L10 6 M16 13 L22 11 M16 18 L10 16 M16 23 L22 21" stroke="rgba(0,0,0,0.3)" stroke-width="1" stroke-linecap="round"/>
        </svg>
      `,
      // 3. Hoja de Arce / Otoño (3 puntas prominentes con tallo largo)
      (c: string) => `
        <svg viewBox="0 0 32 32" class="w-full h-full" style="color: ${c}; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));">
          <path d="M16 2 L18 8 L24 7 L21 12 L27 15 L21 18 L22 24 L17 22 L17 31 C17 31.5 15 31.5 15 31 L15 22 L10 24 L11 18 L5 15 L11 12 L8 7 L14 8 Z" fill="currentColor"/>
          <path d="M16 4 L16 30" stroke="rgba(0,0,0,0.35)" stroke-width="1.3" stroke-linecap="round"/>
          <path d="M16 14 L23 10 M16 14 L9 10 M16 19 L23 22 M16 19 L9 22" stroke="rgba(0,0,0,0.3)" stroke-width="1" stroke-linecap="round"/>
        </svg>
      `,
      // 4. Hoja silvestre curvada de brisa
      (c: string) => `
        <svg viewBox="0 0 32 32" class="w-full h-full" style="color: ${c}; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));">
          <path d="M6 26 C7 28 8 29 10 30 C10.5 30 11 29 11 28 C11 26 12 25 14 24 C22 22 26 14 26 4 C16 4 8 8 6 16 C5 20 5 23 6 26 Z" fill="currentColor"/>
          <path d="M10 29 C12 26 14 23 18 16 C22 9 24 6 25 5" stroke="rgba(0,0,0,0.35)" stroke-width="1.4" stroke-linecap="round" fill="none"/>
          <path d="M16 19 L12 17 M19 14 L15 11 M22 10 L18 8" stroke="rgba(0,0,0,0.3)" stroke-width="1" stroke-linecap="round"/>
        </svg>
      `,
    ];

    const leafCount = 36; // Cantidad abundante de hojas para evocar un salto en la pila

    for (let i = 0; i < leafCount; i++) {
      const leaf = document.createElement("div");
      leaf.className = "fixed pointer-events-none select-none z-[9999]";

      // Tamaño generoso (16px a 26px) para que se distingan claramente las formas botánicas
      const size = Math.floor(Math.random() * 11) + 16;
      leaf.style.width = `${size}px`;
      leaf.style.height = `${size}px`;
      leaf.style.left = `${originX}px`;
      leaf.style.top = `${originY}px`;
      leaf.style.willChange = "transform, opacity, filter";

      const color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
      const svgBuilder = LEAF_SVGS[Math.floor(Math.random() * LEAF_SVGS.length)];
      leaf.innerHTML = svgBuilder(color);

      document.body.appendChild(leaf);

      // Ángulo de dispersión radial aleatorio con variación natural
      const angle = (Math.PI * 2 * i) / leafCount + (Math.random() - 0.5) * 0.6;
      // Distancia explosiva amplia: de 70px a 180px alrededor del botón
      const distance = Math.random() * 110 + 70;

      // Impulso vertical hacia arriba simulando el impacto del salto en la pila
      const upwardImpulse = Math.random() * 80 + 50;
      const burstX = Math.cos(angle) * distance;
      const burstY = Math.sin(angle) * distance - upwardImpulse;

      // Deriva final por gravedad y brisa del bosque
      const gravityFallY = Math.random() * 70 + 40;
      const windDriftX = (Math.random() - 0.25) * 50; // soplos de viento lateral

      const initialRot = Math.random() * 360;
      const spinAmount = (Math.random() - 0.5) * 720; // giros en el aire

      const tl = gsap.timeline({
        onComplete: () => {
          leaf.remove();
        },
      });

      // Estado inicial centrado en el botón
      gsap.set(leaf, {
        xPercent: -50,
        yPercent: -50,
        scale: 0.25,
        opacity: 1,
        rotation: initialRot,
      });

      // Fase 1 (0.0s a 0.65s): Explosión rápida radial hacia afuera
      tl.to(leaf, {
        x: burstX,
        y: burstY,
        scale: Math.random() * 0.4 + 0.85,
        rotation: initialRot + spinAmount * 0.45,
        duration: 0.65,
        ease: "power3.out",
      })
        // Fase 2 (0.65s a 2.0s): Flotación, descenso por gravedad y difuminado progresivo
        .to(leaf, {
          x: burstX + windDriftX,
          y: burstY + gravityFallY,
          rotation: initialRot + spinAmount,
          opacity: 0,
          filter: "blur(5px)",
          duration: 1.35,
          ease: "power2.in",
        });
    }

    // Micro-rebote háptico del botón al pulsar
    gsap.fromTo(
      btn,
      { scale: 0.9 },
      { scale: 1, duration: 0.4, ease: "back.out(2.2)" }
    );
  };

  const toggleAudio = () => {
    // Si se está activando (o cambiando estado), disparar la dispersión de hojas
    if (buttonRef.current && !isPlaying) {
      triggerLeafBurst(buttonRef.current);
    }

    if (isPlaying) {
      // Fade out
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setValueAtTime(
          gainNodeRef.current.gain.value,
          audioCtxRef.current.currentTime
        );
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0.001,
          audioCtxRef.current.currentTime + 1.2
        );
        setTimeout(() => {
          audioCtxRef.current?.suspend();
          setIsPlaying(false);
        }, 1200);
      }
    } else {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new AudioContextClass();
          audioCtxRef.current = ctx;

          // Generar buffer de ruido rosa filtrado (sonido de brisa en el bosque)
          const bufferSize = ctx.sampleRate * 4;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.02;
            b6 = white * 0.115926;
          }

          // Filtro pasa bajas suave para evocar viento en las copas de los árboles
          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(320, ctx.currentTime);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.001, ctx.currentTime);

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;
          whiteNoise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          gainNodeRef.current = gain;
          noiseSourceRef.current = whiteNoise;
          whiteNoise.start();
        } else {
          audioCtxRef.current.resume();
        }

        if (gainNodeRef.current && audioCtxRef.current) {
          gainNodeRef.current.gain.linearRampToValueAtTime(
            0.12,
            audioCtxRef.current.currentTime + 1.5
          );
        }
        setIsPlaying(true);
      } catch (err) {
        console.error("Audio ambience error:", err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={toggleAudio}
      title={isPlaying ? "Silenciar atmósfera" : "Activar atmósfera sonora del bosque"}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 glass-panel-dark text-[#F5F2ED] hover:border-[#8D996E] hover:text-[#8D996E] shadow-2xl group cursor-pointer"
      aria-label="Atmósfera sonora"
    >
      {isPlaying ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8D996E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8D996E]"></span>
          </span>
          <Volume2 className="w-3.5 h-3.5 text-[#8D996E]" />
          <span className="text-[11px] tracking-widest text-[#F5F2ED]/90">Brisa del Bosque</span>
        </>
      ) : (
        <>
          <Sparkles className="w-3.5 h-3.5 text-[#A45D41] group-hover:rotate-12 transition-transform" />
          <VolumeX className="w-3.5 h-3.5 text-[#F5F2ED]/60" />
          <span className="text-[11px] tracking-widest text-[#F5F2ED]/70 group-hover:text-[#F5F2ED]">
            Atmósfera Sonora
          </span>
        </>
      )}
    </button>
  );
}
