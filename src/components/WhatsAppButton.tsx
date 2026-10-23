"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  activeWorld?: "chalets" | "restaurante";
}

export default function WhatsAppButton({ activeWorld = "chalets" }: WhatsAppButtonProps) {
  const isRestaurante = activeWorld === "restaurante";

  const handleClick = () => {
    const msg = encodeURIComponent(
      isRestaurante
        ? "Hola Pazionart, me gustaría consultar disponibilidad para una reserva en el Restaurante."
        : "Hola Pazionart, me gustaría consultar disponibilidad para una estadía en los chalets."
    );
    const phone = isRestaurante ? "573505791093" : "";
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      title="Conversar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#25D366]/90 hover:bg-[#25D366] text-[#121B12] shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-md"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-4 h-4 fill-current" />
      <span className="hidden sm:inline text-[11px] font-mono tracking-widest">
        Anfitrión en Línea
      </span>
    </button>
  );
}
