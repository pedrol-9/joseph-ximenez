"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, MapPin, Info, ArrowLeftRight, HelpCircle } from "lucide-react";
import { LUGARES_REFERENCIA, LugarReferencia } from "@/data/lugaresData";

export function LugaresReferencia() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [autoAnimate, setAutoAnimate] = useState(true);

  const activeLugar = LUGARES_REFERENCIA[activeIdx];

  // Pequeña animación introductoria para el slider para que el usuario note que es interactivo
  useEffect(() => {
    if (!autoAnimate) return;

    let startTime = Date.now();
    const duration = 2000; // 2 segundos

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= duration) {
        setSliderPosition(50);
        setAutoAnimate(false);
        clearInterval(interval);
        return;
      }

      // Animación de vaivén (senoidal) alrededor del centro
      const progress = elapsed / duration;
      const wave = Math.sin(progress * Math.PI * 2);
      setSliderPosition(50 + wave * 18);
    }, 16);

    return () => clearInterval(interval);
  }, [activeIdx, autoAnimate]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoAnimate(false);
    setSliderPosition(Number(e.target.value));
  };

  const handleLugarChange = (idx: number) => {
    setActiveIdx(idx);
    setSliderPosition(50);
    setAutoAnimate(true);
  };

  return (
    <section
      id="lugares-referencia"
      className="w-full font-sans py-24 transition-colors duration-300 border-t border-border-theme/40 bg-transparent"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* ═══════════════════════════════════════
            SECTION HEADER
            ═══════════════════════════════════════ */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-3 block"
          >
            Geografía de una vida
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-tight text-text-primary mb-4"
          >
            Lugares de <em className="italic text-accent-secondary">Referencia</em>
          </motion.h2>
          <div className="w-12 h-[1px] bg-accent/40 mx-auto mb-6" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-2xl mx-auto text-sm text-text-secondary leading-relaxed"
          >
            Contempla los escenarios que marcaron la historia de Joseph Ximénez, contrastando representaciones artísticas de la época con su fisonomía actual. Desliza el cursor sobre las imágenes para viajar en el tiempo.
          </motion.p>
        </div>

        {/* ═══════════════════════════════════════
            INTERACTIVE LAYOUT
            ═══════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Column 1: Selector de lugares & Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Lista de lugares interactiva */}
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 gap-2 custom-scrollbar snap-x snap-mandatory">
              {LUGARES_REFERENCIA.map((lugar, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={lugar.id}
                    onClick={() => handleLugarChange(idx)}
                    className={`flex-shrink-0 snap-start text-left px-5 py-4 rounded-xl border transition-all duration-300 w-[240px] lg:w-full flex items-center justify-between group ${
                      isActive
                        ? "bg-bg-card border-accent/40 shadow-lg text-text-primary"
                        : "bg-transparent border-border-theme/40 text-text-secondary hover:border-accent/20 hover:text-text-primary"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin
                        className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                          isActive ? "text-accent" : "text-text-secondary/60"
                        }`}
                      />
                      <div>
                        <span className="font-serif text-sm font-semibold block leading-tight">
                          {lugar.name}
                        </span>
                        <span className="text-[10px] text-text-secondary/70 font-mono tracking-wider block mt-0.5">
                          {lugar.id.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Ficha descriptiva del lugar activo */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLugar.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="bg-bg-card border border-border-theme/40 rounded-2xl p-6 shadow-xl"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-secondary block mb-1">
                  {activeLugar.subtitle}
                </span>
                <h3 className="font-serif text-xl text-text-primary mb-4">
                  {activeLugar.name}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-6 font-sans">
                  {activeLugar.description}
                </p>

                <div className="border-t border-border-theme/40 pt-4 mt-4 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <Info className="w-3.5 h-3.5 text-accent/60 mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-text-secondary/80 leading-normal">
                      <strong className="text-text-primary font-medium">Pintura:</strong>{" "}
                      {activeLugar.painting.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[9px] text-text-secondary/40 pl-6">
                    <span>Créditos: {activeLugar.painting.credits}</span>
                  </div>

                  <div className="flex items-start gap-2.5 pt-2">
                    <Info className="w-3.5 h-3.5 text-accent-secondary/60 mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-text-secondary/80 leading-normal">
                      <strong className="text-text-primary font-medium">Foto Actual:</strong>{" "}
                      Registro contemporáneo del lugar
                    </p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[9px] text-text-secondary/40 pl-6">
                    <span>Créditos: {activeLugar.currentPhoto.credits}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Column 2: Comparador Visual (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Contenedor del Comparador */}
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border-theme/80 bg-[#0A0A0A] shadow-2xl group select-none">
              {/* Imagen de fondo (Pintura Histórica) */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={activeLugar.painting.url}
                  alt={activeLugar.painting.title || activeLugar.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                  priority
                />
                {/* Etiqueta flotante */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-mono text-white/90 z-10">
                  PINTURA HISTÓRICA
                </div>
              </div>

              {/* Imagen superpuesta recortada (Foto Actual) */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                }}
              >
                <Image
                  src={activeLugar.currentPhoto.url}
                  alt={`Fotografía actual de ${activeLugar.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                  priority
                />
                {/* Etiqueta flotante */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-mono text-white/90 z-10">
                  FOTO ACTUAL
                </div>
              </div>

              {/* Línea divisoria y control deslizable */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-accent z-10 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-accent border-2 border-bg-primary shadow-xl flex items-center justify-between px-1.5 hover:scale-105 active:scale-95 transition-transform duration-200">
                  <ArrowLeftRight className="w-5 h-5 text-text-primary mx-auto" />
                </div>
              </div>

              {/* Control deslizante nativo invisible superpuesto para accesibilidad e interacción impecable */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                aria-label="Deslizar para comparar pintura y foto actual"
              />
            </div>

            {/* Barra de control inferior: Atajos de visualización */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-2">
              <div className="flex items-center gap-1.5 text-[11px] text-text-secondary/70">
                <HelpCircle className="w-3.5 h-3.5 text-accent/60" />
                <span>Arrastra sobre la imagen para revelar el pasado o presente.</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAutoAnimate(false);
                    setSliderPosition(0);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-border-theme/40 text-[10px] font-mono text-text-secondary hover:text-text-primary hover:border-accent/30 transition-all"
                >
                  Pintura 100%
                </button>
                <button
                  onClick={() => {
                    setAutoAnimate(false);
                    setSliderPosition(50);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-border-theme/40 text-[10px] font-mono text-text-secondary hover:text-text-primary hover:border-accent/30 transition-all"
                >
                  Dividido 50%
                </button>
                <button
                  onClick={() => {
                    setAutoAnimate(false);
                    setSliderPosition(100);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-border-theme/40 text-[10px] font-mono text-text-secondary hover:text-text-primary hover:border-accent/30 transition-all"
                >
                  Foto 100%
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
