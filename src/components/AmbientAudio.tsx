"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const toggleAudio = () => {
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
