"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Layers,
  Compass,
} from "lucide-react";
import { LUGARES_REFERENCIA, LugarReferencia, LugarImagen } from "@/data/lugaresData";

// Helper para extraer las imágenes normalizadas de un lugar
function getPlaceImages(lugar: LugarReferencia): LugarImagen[] {
  if (lugar.images && lugar.images.length > 0) {
    return lugar.images;
  }
  if (lugar.imageUrl && lugar.imageUrl.trim() !== "") {
    return [
      {
        url: lugar.imageUrl,
        caption: lugar.subtitle,
        credits: lugar.credits,
      },
    ];
  }
  return [];
}

export function LugaresReferencia() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);

  const activeLugar = LUGARES_REFERENCIA[activeIdx];
  const activeImages = getPlaceImages(activeLugar);
  const hasImages = activeImages.length > 0;
  const currentImage = hasImages ? activeImages[activeImageIdx] || activeImages[0] : null;

  // Resetear el índice de imagen activa al cambiar de lugar
  useEffect(() => {
    setActiveImageIdx(0);
  }, [activeIdx]);

  // Listener para cambios de pantalla completa del navegador
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsNativeFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Abrir Lightbox
  const openLightbox = (imageIndex = activeImageIdx) => {
    if (!hasImages) return;
    setActiveImageIdx(imageIndex);
    setIsLightboxOpen(true);
  };

  // Cerrar Lightbox
  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Alternar pantalla completa nativa del navegador
  const toggleNativeFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, []);

  // Navegar entre imágenes del lugar activo
  const nextImage = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!hasImages || activeImages.length <= 1) return;
      setActiveImageIdx((prev) => (prev + 1) % activeImages.length);
    },
    [hasImages, activeImages.length]
  );

  const prevImage = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!hasImages || activeImages.length <= 1) return;
      setActiveImageIdx((prev) => (prev - 1 + activeImages.length) % activeImages.length);
    },
    [hasImages, activeImages.length]
  );

  // Navegar al lugar anterior o siguiente
  const nextPlace = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % LUGARES_REFERENCIA.length);
  }, []);

  const prevPlace = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + LUGARES_REFERENCIA.length) % LUGARES_REFERENCIA.length);
  }, []);

  // Atajos de teclado (Esc, Flechas, F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "f" || e.key === "F") toggleNativeFullscreen();
      } else {
        // En vista normal, permitir navegar entre lugares con flechas si no hay inputs activos
        if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
        if (e.key === "ArrowLeft" && e.altKey) prevPlace();
        if (e.key === "ArrowRight" && e.altKey) nextPlace();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, closeLightbox, prevImage, nextImage, toggleNativeFullscreen, prevPlace, nextPlace]);

  return (
    <section
      id="lugares-referencia"
      className="w-full font-sans py-24 transition-colors duration-300 border-t border-border-theme/40 bg-transparent"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ═══════════════════════════════════════
            ENCABEZADO DE SECCIÓN
            ═══════════════════════════════════════ */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-[#C1533B] mb-2 block"
          >
            Escenarios Históricos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] leading-tight text-text-primary mb-4"
          >
            Lugares de <em className="italic text-[#C1533B]">Referencia</em>
          </motion.h2>
          <p className="text-text-secondary text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed mb-6">
            Itinerario geográfico y espiritual de Joseph Ximénez: desde las serranías andaluzas hasta el retiro eremítico en el Desierto de la Candelaria y las prisiones de la Inquisición.
          </p>
          <div className="w-16 h-[1px] bg-[#C1533B]/40 mx-auto" />
        </div>

        {/* ═══════════════════════════════════════
            SELECTOR DE LUGARES (TODOS VISIBLES CON FLEX-WRAP)
            ═══════════════════════════════════════ */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 mb-12">
          {LUGARES_REFERENCIA.map((lugar, idx) => {
            const isActive = idx === activeIdx;
            const placeImgs = getPlaceImages(lugar);
            const numImgs = placeImgs.length;

            return (
              <button
                key={lugar.id}
                onClick={() => setActiveIdx(idx)}
                className={`px-3.5 py-2 text-xs font-mono tracking-wider rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-[#C1533B] border-[#C1533B] text-white shadow-lg shadow-[#C1533B]/25 scale-[1.02]"
                    : "bg-bg-card/60 border-border-theme/40 text-text-secondary hover:border-[#C1533B]/40 hover:text-text-primary hover:bg-bg-card"
                }`}
              >
                <span className={`text-[10px] ${isActive ? "text-white/80" : "text-[#C1533B]"}`}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="font-sans font-medium text-xs whitespace-nowrap">
                  {lugar.name.split(",")[0]}
                </span>
                {numImgs > 0 && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full flex items-center gap-1 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#C1533B]/10 text-[#C1533B] border border-[#C1533B]/20"
                    }`}
                    title={`${numImgs} imagen${numImgs > 1 ? "es" : ""}`}
                  >
                    <Layers className="w-2.5 h-2.5" />
                    {numImgs}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════
            ESCENARIO PRINCIPAL (SHOWCASE)
            ═══════════════════════════════════════ */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLugar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-bg-card border border-border-theme/50 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Encabezado contextual de la ficha */}
              <div className="p-6 md:p-8 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-theme/30">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#C1533B]">
                      Hito {String(activeIdx + 1).padStart(2, "0")} de {String(LUGARES_REFERENCIA.length).padStart(2, "0")}
                    </span>
                    <span className="text-text-secondary/40 text-xs">·</span>
                    <span className="font-mono text-[10px] text-text-secondary/70 uppercase">
                      {activeLugar.subtitle}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-text-primary">
                    {activeLugar.name}
                  </h3>
                </div>

                {/* Controles de cambio de lugar */}
                <div className="flex items-center gap-2 self-start md:self-auto">
                  <button
                    onClick={prevPlace}
                    className="p-2 rounded-lg border border-border-theme/40 hover:border-[#C1533B]/50 hover:bg-[#C1533B]/10 text-text-secondary hover:text-text-primary transition-colors text-xs font-mono flex items-center gap-1"
                    title="Lugar anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Anterior</span>
                  </button>
                  <button
                    onClick={nextPlace}
                    className="p-2 rounded-lg border border-border-theme/40 hover:border-[#C1533B]/50 hover:bg-[#C1533B]/10 text-text-secondary hover:text-text-primary transition-colors text-xs font-mono flex items-center gap-1"
                    title="Siguiente lugar"
                  >
                    <span className="hidden sm:inline">Siguiente</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Visor de Imagen con respeto al tamaño original */}
              <div className="p-4 md:p-6 bg-black/40">
                {hasImages && currentImage ? (
                  <div className="space-y-4">
                    {/* Contenedor escénico de la imagen principal */}
                    <div
                      className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] lg:h-[600px] bg-[#0A0908] rounded-xl overflow-hidden border border-border-theme/40 flex items-center justify-center p-3 md:p-6 cursor-zoom-in group/img select-none"
                      onClick={() => openLightbox()}
                    >
                      {/* Fondo ambiental difuminado de la misma imagen para inmersión */}
                      <div
                        className="absolute inset-0 bg-cover bg-center blur-3xl opacity-20 scale-125 pointer-events-none transition-all duration-700"
                        style={{ backgroundImage: `url(${currentImage.url})` }}
                      />

                      {/* Viñeta sutil y textura museística */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)] pointer-events-none z-10" />

                      {/* Imagen centrada conservando 100% sus proporciones y dimensiones originales */}
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={`${activeLugar.id}-${activeImageIdx}`}
                          src={currentImage.url}
                          alt={currentImage.caption || activeLugar.name}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.3 }}
                          className="relative z-20 max-h-full max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl transition-transform duration-500 group-hover/img:scale-[1.01]"
                        />
                      </AnimatePresence>

                      {/* Indicador de posición de imagen (esquina superior izquierda) */}
                      {activeImages.length > 1 && (
                        <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 z-30 pointer-events-none text-white/90">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C1533B] animate-pulse" />
                          <span className="font-mono text-[10px] tracking-wider">
                            {String(activeImageIdx + 1).padStart(2, "0")} / {String(activeImages.length).padStart(2, "0")}
                          </span>
                        </div>
                      )}

                      {/* Botón flotante para expandir a pantalla completa (esquina superior derecha) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox();
                        }}
                        className="absolute top-4 right-4 bg-black/75 hover:bg-[#C1533B] text-white/90 hover:text-white backdrop-blur-md border border-white/10 hover:border-[#C1533B] px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono transition-all duration-300 shadow-xl z-30 group/btn"
                        title="Ver en pantalla completa (Click)"
                      >
                        <Maximize2 className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:scale-110" />
                        <span className="text-[11px] tracking-wide">Pantalla Completa</span>
                      </button>

                      {/* Flechas de navegación entre imágenes sobre el contenedor */}
                      {activeImages.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#C1533B] text-white/80 hover:text-white backdrop-blur-md border border-white/10 p-2.5 rounded-full transition-all duration-300 z-30 shadow-lg"
                            title="Imagen anterior"
                            aria-label="Imagen anterior"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#C1533B] text-white/80 hover:text-white backdrop-blur-md border border-white/10 p-2.5 rounded-full transition-all duration-300 z-30 shadow-lg"
                            title="Siguiente imagen"
                            aria-label="Siguiente imagen"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}

                      {/* Pie de foto integrado en el visor */}
                      {currentImage.caption && (
                        <div className="absolute bottom-3 inset-x-3 md:inset-x-6 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg z-30 pointer-events-none flex items-center justify-between gap-4">
                          <p className="font-serif italic text-xs md:text-sm text-white/90 truncate">
                            {currentImage.caption}
                          </p>
                          <span className="font-mono text-[10px] text-white/50 flex-shrink-0">
                            Clic para ampliar
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Fila de miniaturas si hay múltiples imágenes */}
                    {activeImages.length > 1 && (
                      <div className="flex items-center gap-3 overflow-x-auto py-1 px-1 no-scrollbar">
                        <span className="font-mono text-[10px] tracking-widest uppercase text-text-secondary/60 flex-shrink-0 mr-1 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#C1533B]" />
                          Vistas ({activeImages.length}):
                        </span>
                        {activeImages.map((img, i) => {
                          const isSelected = i === activeImageIdx;
                          return (
                            <button
                              key={i}
                              onClick={() => setActiveImageIdx(i)}
                              className={`relative h-16 w-24 md:h-20 md:w-28 rounded-xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 bg-black/80 p-0.5 ${
                                isSelected
                                  ? "border-[#C1533B] shadow-lg shadow-[#C1533B]/30 scale-105"
                                  : "border-border-theme/40 opacity-50 hover:opacity-100 hover:border-[#C1533B]/40"
                              }`}
                              title={img.caption || `Vista ${i + 1}`}
                            >
                              <img
                                src={img.url}
                                alt={`Miniatura ${i + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <span className="absolute bottom-1 right-1 bg-black/80 font-mono text-[9px] px-1 py-0.5 rounded text-white/90">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Placeholder elegante si no hay fotografías aún */
                  <div className="w-full h-[320px] md:h-[400px] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-bg-card via-black/40 to-bg-primary rounded-xl border border-border-theme/30 text-center">
                    <motion.div
                      animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.98, 1.02, 0.98] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="mb-4 p-4 rounded-full bg-[#C1533B]/10 border border-[#C1533B]/20"
                    >
                      <ImageIcon className="w-10 h-10 text-[#C1533B]/60" />
                    </motion.div>
                    <h4 className="font-serif text-lg text-text-primary mb-1">
                      Fotografía en digitalización
                    </h4>
                    <span className="font-mono text-xs text-[#C1533B] tracking-widest uppercase mb-3">
                      Archivo General de Indias
                    </span>
                    <p className="text-xs text-text-secondary/70 max-w-md font-light leading-relaxed">
                      El material iconográfico correspondiente a este enclave geográfico se encuentra actualmente en fase de restauración y catalogación documental.
                    </p>
                  </div>
                )}
              </div>

              {/* Panel de Información Histórica y Créditos */}
              <div className="p-6 md:p-8 space-y-4">
                <p className="text-sm md:text-base text-text-secondary leading-relaxed font-sans font-light">
                  {activeLugar.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border-theme/30 pt-4 text-xs font-mono text-text-secondary/60">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#C1533B]" />
                    <span>Hito de la ruta mística</span>
                  </div>
                  <div className="text-[11px] truncate">
                    {currentImage?.credits || activeLugar.credits}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MODAL DE PANTALLA COMPLETA (LIGHTBOX)
          ═══════════════════════════════════════ */}
      <AnimatePresence>
        {isLightboxOpen && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-[100] flex flex-col justify-between p-4 md:p-6 backdrop-blur-xl select-none"
            onClick={closeLightbox}
          >
            {/* Barra superior de controles del Lightbox */}
            <div
              className="flex items-center justify-between gap-4 w-full max-w-7xl mx-auto z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#C1533B] block">
                  {activeLugar.name}
                </span>
                <span className="text-xs text-white/60 font-mono">
                  {activeLugar.subtitle} · Foto {activeImageIdx + 1} de {activeImages.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Botón de pantalla completa del navegador */}
                <button
                  onClick={toggleNativeFullscreen}
                  className="p-2.5 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors"
                  title={isNativeFullscreen ? "Salir de pantalla completa (F)" : "Pantalla completa completa (F)"}
                  aria-label="Alternar pantalla completa nativa"
                >
                  {isNativeFullscreen ? (
                    <Minimize2 className="w-5 h-5 text-[#C1533B]" />
                  ) : (
                    <Maximize2 className="w-5 h-5" />
                  )}
                </button>

                {/* Botón de cierre */}
                <button
                  onClick={closeLightbox}
                  className="p-2.5 text-white/70 hover:text-white bg-white/5 hover:bg-[#C1533B] rounded-full border border-white/10 transition-colors"
                  title="Cerrar vista (Esc)"
                  aria-label="Cerrar vista expandida"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Escenario central de visualización con preservación absoluta de escala y ratio */}
            <div
              className="relative w-full flex-1 max-h-[75vh] md:max-h-[80vh] flex items-center justify-center p-2 md:p-6 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${activeLugar.id}-lb-${activeImageIdx}`}
                  src={currentImage.url}
                  alt={currentImage.caption || activeLugar.name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="max-h-full max-w-full w-auto h-auto object-contain shadow-2xl rounded-lg"
                  style={{ maxHeight: "calc(100vh - 180px)" }}
                />
              </AnimatePresence>

              {/* Flechas laterales para pasar imágenes */}
              {activeImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-black/60 hover:bg-[#C1533B] text-white/80 hover:text-white border border-white/10 backdrop-blur-md transition-all shadow-2xl"
                    title="Imagen anterior (Flecha Izquierda)"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-black/60 hover:bg-[#C1533B] text-white/80 hover:text-white border border-white/10 backdrop-blur-md transition-all shadow-2xl"
                    title="Siguiente imagen (Flecha Derecha)"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="w-7 h-7" />
                  </button>
                </>
              )}
            </div>

            {/* Barra inferior de detalles y miniaturas en Lightbox */}
            <div
              className="w-full max-w-4xl mx-auto flex flex-col items-center gap-3 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Pie de foto y créditos */}
              <div className="text-center px-4">
                {currentImage.caption && (
                  <p className="font-serif text-sm md:text-base text-white/90 italic mb-1">
                    {currentImage.caption}
                  </p>
                )}
                <p className="font-mono text-[10px] text-white/50">
                  {currentImage.credits || activeLugar.credits}
                </p>
              </div>

              {/* Tira de miniaturas interactiva en pantalla completa */}
              {activeImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto py-1 px-2 no-scrollbar max-w-full">
                  {activeImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIdx(i)}
                      className={`relative h-12 w-16 md:h-14 md:w-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 bg-black/60 ${
                        i === activeImageIdx
                          ? "border-[#C1533B] scale-105"
                          : "border-white/20 opacity-40 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={`Miniatura ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

