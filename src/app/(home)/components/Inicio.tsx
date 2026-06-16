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
          <p className="text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.55em] uppercase text-terracotta drop-shadow-sm">
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
            <Link 
              href="/blog"
              draggable={false}
              className="group/link flex flex-col items-center gap-2 cursor-pointer select-text"
            >
              {/* Etiqueta mono con líneas laterales */}
              <div className="flex items-center gap-3 select-text">
                <span className="h-px w-6 bg-terracotta/20 group-hover/link:bg-terracotta/40 transition-colors duration-300" />
                <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-terracotta/80 group-hover/link:text-terracotta transition-colors duration-300 select-text">
                  Una historia que el fuego no pudo borrar
                </span>
                <span className="h-px w-6 bg-terracotta/20 group-hover/link:bg-terracotta/40 transition-colors duration-300" />
              </div>

              <div className="font-sans text-xs md:text-sm text-text-secondary max-w-sm md:max-w-md mx-auto leading-relaxed text-center flex items-center justify-center gap-1.5 transition-colors duration-300 group-hover/link:text-text-primary/60 select-text">
                <p className="select-text">
                  Basado en el libro{" "}
                  <span className="relative inline-block text-terracotta italic font-medium group-hover/link:text-terracotta-dark transition-colors duration-300">
                    &quot;Del Desierto a la Hoguera&quot;
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-terracotta origin-center scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300" />
                  </span>{" "}
                  de Patricia Enciso Patiño
                </p>
                <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                  {/* Halo con Framer Motion para un pulso suave de respiración */}
                  <motion.div
                    animate={{
                      scale: [0.8, 1.25, 0.8],
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full bg-arrow-halo-bg pointer-events-none"
                  />
                  {/* Caja de la flecha con el Portal Effect */}
                  <div className="relative overflow-hidden w-[19px] h-[19px]">
                    <ArrowUpRight
                      size={19}
                      className="absolute inset-0 text-terracotta/50 group-hover/link:text-terracotta transition-transform duration-500 ease-out transform group-hover/link:translate-x-full group-hover/link:-translate-y-full"
                    />
                    <ArrowUpRight
                      size={19}
                      className="absolute inset-0 text-terracotta/50 group-hover/link:text-terracotta transition-transform duration-500 ease-out transform translate-x-[-100%] translate-y-[100%] group-hover/link:translate-x-0 group-hover/link:translate-y-0"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
