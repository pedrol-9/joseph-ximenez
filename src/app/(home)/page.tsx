"use client";

import { useEffect } from "react";
import Inicio from "./components/Inicio";
import Pasado from "./components/Pasado";
import Retiro from "./components/Retiro";
import Hoguera from "./components/Hoguera";
import Legado from "./components/Legado";
import { TimelineSidebar } from "@/app/(home)/components/TimelineSidebar";

export default function HomePage() {
  useEffect(() => {
    // Forzar scroll al inicio al cargar la página
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen font-sans overflow-x-hidden selection:bg-accent selection:text-bg-primary transition-colors duration-300">
      
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
