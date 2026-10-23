"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChaletsPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      localStorage.setItem("pazionart_active_world", "chalets");
    } catch {}
    router.replace("/?mundo=chalets");
  }, [router]);

  return (
    <div className="w-full min-h-screen bg-[#212B20] flex items-center justify-center text-[#F5F2ED] font-mono text-xs">
      Cargando Santuario de Chalets...
    </div>
  );
}
