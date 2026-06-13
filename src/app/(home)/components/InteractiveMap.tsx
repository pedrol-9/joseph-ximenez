"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Importación dinámica con ssr: false para evitar errores de hidratación y uso del objeto 'window' en el servidor
const Map = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center bg-bg-primary rounded-xl border border-border-theme">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        <p className="text-text-primary font-serif italic text-lg">Cargando el mapa de ruta...</p>
      </div>
    </div>
  )
});

export function InteractiveMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section id="mapa" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10 relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-text-primary mb-4">
          El Recorrido de JX
        </h2>
        <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-6" />
        <p className="max-w-2xl mx-auto text-text-primary text-lg opacity-80">
          Explora la travesía de Joseph Ximénez, desde sus humildes orígenes en España hasta su trágico final en Cartagena de Indias.
        </p>
      </div>
      
      <div className="w-full h-[600px] rounded-xl overflow-hidden border border-[rgba(193,83,59,0.2)] shadow-[0_0_30px_rgba(193,83,59,0.1)] relative z-0">
        <Map />
      </div>
    </section>
  );
}
