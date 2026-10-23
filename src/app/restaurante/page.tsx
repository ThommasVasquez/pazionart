"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RestaurantePage() {
  const router = useRouter();

  useEffect(() => {
    try {
      localStorage.setItem("pazionart_active_world", "restaurante");
    } catch {}
    router.replace("/?mundo=restaurante");
  }, [router]);

  return (
    <div className="w-full min-h-screen bg-[#1C1512] flex items-center justify-center text-[#F5F2ED] font-mono text-xs">
      Cargando El Fogón & Restaurante...
    </div>
  );
}
