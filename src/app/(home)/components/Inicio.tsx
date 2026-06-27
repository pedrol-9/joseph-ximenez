"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Inicio() {
  return (
    <section
      id="inicio"
      className="relative min-h-dvh w-full flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Glow animado copiado de la página principal */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.35, 0.18] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle,#C1533B 0%,transparent 70%)",
        }}
      />

      {/* Grid de puntos copiado de la página principal */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle,#DDD8CF 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* 
        3. CONTENIDO PRINCIPAL
      */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-8 w-full max-w-5xl">
        {/* Antetítulo */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="mb-6 md:mb-8"
        >
          <p className="text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.55em] uppercase font-semibold text-terracotta drop-shadow-sm my-12">
            Conmemoración de los 350 años de la orden de captura contra
          </p>
        </motion.div>

        {/* Título Monumental - Tipografía estrictamente controlada para evitar overflows */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 1, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="font-serif leading-[0.85] flex flex-col items-center"
        >
          <span className="block text-[clamp(3.5rem,15vw,11rem)] text-text-primary">
            Joseph
          </span>
          <span className="block italic text-[clamp(3rem,13vw,9.5rem)] text-terracotta mt-0 md:-mt-2 pr-4 md:pr-12">
            Ximénez
          </span>
        </motion.h1>

        {/* Cita / Bajada */}
        <div className="mt-6 md:mt-10 flex flex-col items-center w-full">
          {/* Línea divisoria animada */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 0.6, scaleY: 1 }}
            transition={{ duration: 1.2, delay: 2.2, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="w-px h-10 md:h-16 bg-linear-to-b from-terracotta to-transparent mb-4 md:mb-6"
          />

          {/* Cita Principal */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
            className="font-serif italic text-xl md:text-2xl max-w-lg md:max-w-2xl mx-auto text-text-primary/80 leading-relaxed text-center px-4"
          >
            Ermitaño y mártir del Desierto de la Candelaria.
          </motion.p>

          {/* Crédito Histórico */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2.8, ease: "easeOut" }}
            className="mt-6 flex flex-col items-center gap-2 px-4"
          >
            <div className="font-sans text-text-secondary max-w-sm md:max-w-md mx-auto leading-relaxed text-center select-text">
              <p className="select-text text-sm md:text-base">
                Basado en el libro{" "}
                <span className="relative inline-block text-terracotta italic font-medium">
                  &quot;Del Desierto a la Hoguera&quot;
                </span>{" "}
                <span className="inline-block">de Patricia Enciso Patiño</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
