"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ACTIVE_COLOR = "#C1533B"; // Mantenemos el color terracota de la galería

const artworks = [
  { 
    id: "artista", // Sin foto por ahora
    year: "El Artista", 
    title: "@el_sr_rodriguez", 
    sub: "Perfil",
    body: "Creador visual de las obras que ilustran la historia de Joseph Ximénez. Su arte aporta una dimensión profunda, estética y misteriosa a la narrativa histórica del proyecto.",
    instagram: "https://www.instagram.com/el_sr_rodriguez/"
  },
  { 
    id: "obra_1_sf.png", 
    year: "Obra I", 
    title: "Título de la Obra I", 
    sub: "Técnica - Año",
    body: "Aquí irá la descripción de la primera obra, qué representa en la vida de Joseph Ximénez o los detalles artísticos de la ilustración."
  },
  { 
    id: "obra_2_sf.png", 
    year: "Obra II (Sin Fondo)", 
    title: "Título de la Obra II", 
    sub: "Técnica - Año",
    body: "Esta es la versión de prueba sin fondo (SF) para evaluar cómo se integra el arte directamente con el color de la galería."
  },
  { 
    id: "obra_3_sf.png", 
    year: "Obra III", 
    title: "Título de la Obra III", 
    sub: "Técnica - Año",
    body: "Aquí irá la descripción de la tercera obra, qué representa en la vida de Joseph Ximénez o los detalles artísticos de la ilustración."
  },
  { 
    id: "obra_4_sf.png", 
    year: "Obra IV", 
    title: "Título de la Obra IV", 
    sub: "Técnica - Año",
    body: "Aquí irá la descripción de la cuarta obra, qué representa en la vida de Joseph Ximénez o los detalles artísticos de la ilustración."
  },
  { 
    id: "obra_5.png", 
    year: "Obra V", 
    title: "Título de la Obra V", 
    sub: "Técnica - Año",
    body: "Nota: Esta obra aún no tiene versión sin fondo (sf) subida, se muestra la original."
  }
];

export function ArtShowcase() {
  const [active, setActive] = useState(0);
  const [blobs, setBlobs] = useState<any[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/artworks');
        if (res.ok) {
          const data = await res.json();
          setBlobs(data.blobs || []);
        }
      } catch (err) {
        console.error("Failed to fetch images", err);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      const container = trackRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = active / (artworks.length - 1);
      const targetScroll = maxScroll * progress;
      
      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  }, [active]);

  return (
    <section id="arte" className="w-full font-sans flex flex-col min-h-[80vh]" style={{ background:"#100F0D", color:"#DDD8CF" }}>
      
      {/* Título de la Sección */}
      <div className="py-12 px-6 text-center border-b border-white/5">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#F4F1EA] mb-4">Exhibición de Arte</h2>
        <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ background: ACTIVE_COLOR }} />
        <p className="max-w-2xl mx-auto text-[#DDD8CF] text-lg opacity-80">
          Una mirada visual al universo de JX, por @el_sr_rodriguez
        </p>
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        
        {/* =========================================
            SIDEBAR DESKTOP (Solo visible en md y lg)
            ========================================= */}
        <div className="hidden md:flex flex-col flex-shrink-0 overflow-y-auto custom-scrollbar shadow-[4px_0_20px_rgba(0,0,0,0.2)] z-10 w-56 lg:w-80" style={{ background:"#1A1918" }}>
          {artworks.map((art, i) => (
            <button key={art.id} onClick={() => setActive(i)}
              className="px-6 py-6 lg:py-8 text-left transition-all duration-300 relative border-b border-white/5"
              style={{ background:active===i ? ACTIVE_COLOR : "transparent" }}>
              <span className="block font-mono text-xs mb-1" style={{ color:active===i?"rgba(244,241,234,0.65)":"rgba(221,216,207,0.4)" }}>{art.year}</span>
              <span className="block font-serif italic text-base lg:text-lg leading-tight" style={{ color:active===i?"#F4F1EA":"rgba(221,216,207,0.6)" }}>{art.title}</span>
            </button>
          ))}
        </div>

        {/* =========================================
            CARRUSEL MÓVIL (Deslizamiento proporcional)
            ========================================= */}
        <div className="md:hidden relative z-10 shadow-[0_4px_20px_rgba(0,0,0,0.2)] bg-[#1A1918] py-4">
          
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#1A1918] via-[#1A1918]/80 to-transparent z-20 flex items-center justify-start pl-2 pointer-events-none">
            <button 
              onClick={() => setActive(a => Math.max(0, a-1))} 
              disabled={active===0}
              className="p-1 text-[#F4F1EA]/50 disabled:opacity-0 hover:text-[#F4F1EA] transition-opacity pointer-events-auto"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          
          <div ref={trackRef} className="flex overflow-hidden px-10 gap-3 scroll-smooth custom-scrollbar">
            {artworks.map((art, i) => {
              const isActive = active === i;
              return (
                <button 
                  key={art.id} 
                  onClick={() => setActive(i)}
                  className={`flex-shrink-0 px-5 py-3 rounded-lg text-left transition-all duration-300 min-w-[160px] ${
                    isActive ? "scale-100 opacity-100 shadow-lg" : "scale-90 opacity-40 hover:opacity-70"
                  }`}
                  style={{ background: isActive ? ACTIVE_COLOR : "rgba(255,255,255,0.05)" }}
                >
                  <span className="block font-mono text-[10px] mb-1 transition-colors duration-300" style={{ color: isActive ? "rgba(244,241,234,0.65)" : "rgba(255,255,255,0.5)" }}>
                    {art.year}
                  </span>
                  <span className="block font-serif italic text-base leading-tight transition-colors duration-300" style={{ color: isActive ? "#F4F1EA" : "rgba(255,255,255,0.8)" }}>
                    {art.title}
                  </span>
                </button>
              )
            })}
          </div>
          
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#1A1918] via-[#1A1918]/80 to-transparent z-20 flex items-center justify-end pr-2 pointer-events-none">
            <button 
              onClick={() => setActive(a => Math.min(artworks.length-1, a+1))} 
              disabled={active===artworks.length-1}
              className="p-1 text-[#F4F1EA]/50 disabled:opacity-0 hover:text-[#F4F1EA] transition-opacity pointer-events-auto"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* =========================================
            PANEL DE CONTENIDO (ZONA DE EXHIBICIÓN)
            ========================================= */}
        <div className="flex-1 flex flex-col relative bg-[#100F0D]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={active} 
              initial={{ opacity:0, scale: 0.98 }} 
              animate={{ opacity:1, scale: 1 }} 
              exit={{ opacity:0, scale: 1.02 }}
              transition={{ duration:0.4, ease:"easeOut" }}
              className="flex-1 flex flex-col xl:flex-row p-6 md:p-8 gap-6 md:gap-8 overflow-y-auto custom-scrollbar"
            >
              
              {/* Lado Izquierdo: IMAGEN */}
              <div className="w-full xl:w-3/5 flex flex-col items-center justify-center">
                <div className="w-full aspect-square md:aspect-square xl:aspect-square bg-[#1A1918] border border-white/10 rounded-xl flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
                  {(() => {
                    const activeArtwork = artworks[active];
                    // Busca la imagen que contenga exactamente el id (ej: "obra_1.png" o "obra_2_sf.png")
                    const activeBlob = blobs.find((b: any) => b.pathname.toLowerCase().includes(activeArtwork.id.toLowerCase()));
                    // Ya no usamos el índice de respaldo para que la de "artista" u otras sin imagen no tomen una equivocada
                    const imageUrl = activeBlob ? activeBlob.url : null;

                    return imageUrl ? (
                      <Image 
                        src={imageUrl} 
                        alt={activeArtwork.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 40vw"
                        priority
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/10 mb-4 group-hover:scale-110 transition-transform duration-500"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                        <p className="text-white/20 font-mono text-sm tracking-widest uppercase">Cargando o Sin Imagen</p>
                      </>
                    );
                  })()}
                  
                  {/* Decoración de marco */}
                  <div className="absolute inset-4 border border-white/5 pointer-events-none"></div>
                </div>
              </div>

              {/* Lado Derecho: INFORMACIÓN */}
              <div className="w-full xl:w-2/5 flex flex-col justify-center relative z-10">
                <span className="block text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 md:mb-3 font-bold" style={{ color: ACTIVE_COLOR }}>
                  {artworks[active].year} · {artworks[active].sub}
                </span>
                
                <h2 className="font-serif mb-3 md:mb-4 leading-tight" style={{ fontSize:"clamp(32px,5vw,56px)", color:"#F4F1EA" }}>
                  {artworks[active].title}
                </h2>
                
                <p className="text-base md:text-lg leading-relaxed font-light mb-6 md:mb-6" style={{ color:"rgba(221,216,207,0.8)" }}>
                  {artworks[active].body}
                </p>

                {/* Si es el perfil del artista, mostramos el botón de Instagram */}
                {artworks[active].instagram && (
                  <a 
                    href={artworks[active].instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-[#1A1918] hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 w-fit group"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#C1533B] group-hover:scale-110 transition-transform"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    <span className="font-sans text-sm tracking-wide text-[#F4F1EA]">Visitar Instagram</span>
                  </a>
                )}
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Navegación inferior (Anterior / Siguiente) */}
          <div className="flex items-center justify-between px-6 md:px-12 py-6 mt-auto" style={{ borderTop:"1px solid rgba(255,255,255,0.05)", background:"#100F0D" }}>
            <button onClick={() => setActive(a => Math.max(0,a-1))} disabled={active===0}
              className="text-xs md:text-sm font-semibold tracking-widest uppercase transition-all disabled:opacity-20 hover:opacity-60"
              style={{ color:"#F4F1EA" }}>← Anterior</button>
            
            <span className="font-mono text-xs" style={{ color:"rgba(255,255,255,0.3)" }}>{active+1} / {artworks.length}</span>
            
            <button onClick={() => setActive(a => Math.min(artworks.length-1,a+1))} disabled={active===artworks.length-1}
              className="text-xs md:text-sm font-semibold tracking-widest uppercase transition-all disabled:opacity-20 hover:opacity-70"
              style={{ color: ACTIVE_COLOR }}>Siguiente →</button>
          </div>

        </div>
      </div>
    </section>
  );
}
