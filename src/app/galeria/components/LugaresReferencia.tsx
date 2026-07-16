"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Image as ImageIcon } from "lucide-react";
import { LUGARES_REFERENCIA } from "@/data/lugaresData";

export function LugaresReferencia() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [imageError, setImageError] = useState(false);

  const activeLugar = LUGARES_REFERENCIA[activeIdx];

  // Restablecer el estado de error de la imagen al cambiar de lugar
  useEffect(() => {
    setImageError(false);
  }, [activeIdx]);

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
              <div className="relative aspect-[16/9] w-full bg-[#0E0C0A] flex items-center justify-center">
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
                  <Image
                    src={activeLugar.imageUrl}
                    alt={activeLugar.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    onError={() => setImageError(true)}
                    priority
                  />
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
    </section>
  );
}
