"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { LUGARES_REFERENCIA } from "@/data/lugaresData";

export function LugaresReferencia() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeLugar = LUGARES_REFERENCIA[activeIdx];

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
              {/* Contenedor de la Imagen */}
              <div className="relative aspect-[16/9] w-full bg-[#0A0A0A]">
                <Image
                  src={activeLugar.imageUrl}
                  alt={activeLugar.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
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
