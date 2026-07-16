"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Image as ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { LUGARES_REFERENCIA } from "@/data/lugaresData";

export function LugaresReferencia() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const activeLugar = LUGARES_REFERENCIA[activeIdx];

  // Filtrar solo los lugares que tienen una URL de imagen válida para la navegación del Lightbox
  const lugaresConImagen = LUGARES_REFERENCIA.filter((l) => l.imageUrl);

  // Restablecer el estado de error de la imagen al cambiar de lugar
  useEffect(() => {
    setImageError(false);
  }, [activeIdx]);

  // Manejar el cierre del Lightbox
  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
  }, []);

  // Navegar en el Lightbox
  const navigateLightbox = useCallback((direction: number) => {
    if (lightboxIdx === null) return;
    const newIdx = lightboxIdx + direction;
    if (newIdx >= 0 && newIdx < lugaresConImagen.length) {
      setLightboxIdx(newIdx);
      // Opcional: Sincronizar el lugar activo del fondo con el del Lightbox
      const targetLugarId = lugaresConImagen[newIdx].id;
      const originalIdx = LUGARES_REFERENCIA.findIndex((l) => l.id === targetLugarId);
      if (originalIdx !== -1) {
        setActiveIdx(originalIdx);
      }
    }
  }, [lightboxIdx, lugaresConImagen]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, closeLightbox, navigateLightbox]);

  const showPlaceholder = !activeLugar.imageUrl || imageError;

  return (
    <section
      id="lugares-referencia"
      className="w-full font-sans py-24 transition-colors duration-300 border-t border-border-theme/40 bg-transparent"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* ═══════════════════════════════════════
            SECTION HEADER
            ═══════════════════════════════════════ */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-2 block"
          >
            Escenarios Históricos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif text-[clamp(2rem,4vw,3rem)] leading-tight text-text-primary mb-4"
          >
            Lugares de <em className="italic text-accent-secondary">Referencia</em>
          </motion.h2>
          <div className="w-12 h-[1px] bg-accent/40 mx-auto" />
        </div>

        {/* ═══════════════════════════════════════
            SELECTOR DE LUGARES
            ═══════════════════════════════════════ */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {LUGARES_REFERENCIA.map((lugar, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={lugar.id}
                onClick={() => setActiveIdx(idx)}
                className={`px-4 py-2 text-xs font-mono tracking-wider rounded-full border transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-accent border-accent text-white shadow-md"
                    : "bg-transparent border-border-theme/40 text-text-secondary hover:border-accent/30 hover:text-text-primary"
                }`}
              >
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{lugar.name.split(",")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════
            DETALLE DEL LUGAR ACTIVO (PREMIUM CARD)
            ═══════════════════════════════════════ */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLugar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-bg-card border border-border-theme/40 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Contenedor de Imagen o Placeholder CSS */}
              <div 
                className={`relative aspect-[16/9] w-full bg-[#0E0C0A] flex items-center justify-center ${
                  !showPlaceholder ? "cursor-zoom-in group/img" : ""
                }`}
                onClick={() => {
                  if (!showPlaceholder) {
                    const idxInList = lugaresConImagen.findIndex((l) => l.id === activeLugar.id);
                    if (idxInList !== -1) {
                      setLightboxIdx(idxInList);
                    }
                  }
                }}
              >
                {showPlaceholder ? (
                  /* Placeholder CSS premium si no hay imagen o falla la carga */
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-bg-card via-[#1A1714] to-bg-primary border border-border-theme/20 text-center">
                    <motion.div
                      animate={{ opacity: [0.4, 0.7, 0.4] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="mb-4"
                    >
                      <ImageIcon className="w-12 h-12 text-accent-secondary/40 stroke-[1.2]" />
                    </motion.div>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-text-secondary/60">
                      Fotografía en archivo
                    </span>
                    <span className="text-[9px] font-mono text-text-secondary/30 mt-1 block">
                      Enlace Vercel Blob pendiente
                    </span>
                  </div>
                ) : (
                  /* Imagen normal si tiene URL y no ha dado error */
                  <>
                    <Image
                      src={activeLugar.imageUrl}
                      alt={activeLugar.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 80vw"
                      className="object-cover transition-transform duration-700 group-hover/img:scale-102"
                      onError={() => setImageError(true)}
                      priority
                    />
                    {/* Botón flotante indicador de zoom en hover */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 p-2.5 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 shadow-lg pointer-events-none">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </div>
                  </>
                )}
              </div>

              {/* Información y Créditos */}
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-border-theme/20 pb-4">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-secondary block mb-1">
                      {activeLugar.subtitle}
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl text-text-primary">
                      {activeLugar.name}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-text-secondary/50">
                    {activeLugar.credits}
                  </span>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed font-sans">
                  {activeLugar.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          LIGHTBOX MODAL
          ═══════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-sm select-none"
            onClick={closeLightbox}
          >
            {/* Botón Cerrar */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/60 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors z-[110]"
              aria-label="Cerrar vista expandida"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Contenedor Principal de la Imagen */}
            <div 
              className="relative max-w-5xl w-full h-[70vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic en la imagen
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={lugaresConImagen[lightboxIdx].imageUrl}
                    alt={lugaresConImagen[lightboxIdx].name}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controles de Navegación Lateral (Flechas) */}
            {lugaresConImagen.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox(-1);
                  }}
                  disabled={lightboxIdx === 0}
                  className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md transition-all z-[110] ${
                    lightboxIdx === 0
                      ? "opacity-20 cursor-not-allowed text-white/30"
                      : "text-white/60 hover:text-white bg-white/5 hover:bg-white/10"
                  }`}
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox(1);
                  }}
                  disabled={lightboxIdx === lugaresConImagen.length - 1}
                  className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md transition-all z-[110] ${
                    lightboxIdx === lugaresConImagen.length - 1
                      ? "opacity-20 cursor-not-allowed text-white/30"
                      : "text-white/60 hover:text-white bg-white/5 hover:bg-white/10"
                  }`}
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Información en el pie del Lightbox */}
            <div 
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white/80 max-w-xl w-full px-6 pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="font-serif text-lg md:text-xl text-white">
                {lugaresConImagen[lightboxIdx].name}
              </h4>
              <p className="text-xs text-white/60 font-mono mt-1">
                {lugaresConImagen[lightboxIdx].subtitle} · {lugaresConImagen[lightboxIdx].credits}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
