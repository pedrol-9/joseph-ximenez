"use client";

import { useEffect } from "react";
import Inicio from "@/app/(home)/components/Inicio";
import Pasado from "@/app/(home)/components/Pasado";
import Retiro from "@/app/(home)/components/Retiro";
import Hoguera from "@/app/(home)/components/Hoguera";
import Legado from "@/app/(home)/components/Legado";
import { TimelineSidebar } from "@/app/(home)/components/TimelineSidebar";

export default function HomePage() {
  useEffect(() => {
    // Forzar scroll al inicio al cargar la página
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen font-sans overflow-x-hidden selection:bg-[#C1533B] selection:text-[#100F0D]" style={{ background: "#100F0D", color: "#DDD8CF" }}>

      <TimelineSidebar />

      {/* Actos de la Narrativa */}
      <Inicio />
      <Pasado />
      <Retiro />
      <Hoguera />
      <Legado />

    </main>
  );
}
