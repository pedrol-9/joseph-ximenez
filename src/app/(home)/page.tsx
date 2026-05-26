"use client";

import { useEffect } from "react";
import Inicio from "./components/Inicio";
import Pasado from "./components/Pasado";
import Retiro from "./components/Retiro";
import Hoguera from "./components/Hoguera";
import Legado from "./components/Legado";
// import { InteractiveMap } from "./components/InteractiveMap"; // Ocultado temporalmente - registrado en TODO.md
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
      
      {/* <InteractiveMap /> */}

    </main>
  );
}
