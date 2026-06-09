"use client";

import { motion } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Inicio() {
  return (
    <section id="inicio" className="relative min-h-dvh w-full flex flex-col items-center justify-center overflow-hidden bg-transparent">
      
      {/* Glow animado copiado de la página principal */}
      <motion.div 
        animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.35, 0.18] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,#C1533B 0%,transparent 70%)" }} 
      />

      {/* Grid de puntos copiado de la página principal */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle,#DDD8CF 1px,transparent 1px)", backgroundSize: "28px 28px" }} 
      />

      {/* 
        3. CONTENIDO PRINCIPAL
        Animaciones de entrada calculadas, sin depender del scroll para esta primera vista,
        garantizando que se vea perfecto desde el segundo 1 en cualquier pantalla.
      */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-8 w-full max-w-5xl">
        
        {/* Antetítulo */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="mb-8 md:mb-10"
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
          <span className="block text-[clamp(3.5rem,15vw,11rem)] text-sand">Joseph</span>
          <span className="block italic text-[clamp(3rem,13vw,9.5rem)] text-terracotta mt-0 md:-mt-2 pr-4 md:pr-12">Ximénez</span>
        </motion.h1>

        {/* Cita / Bajada */}
        <div className="mt-10 md:mt-16 flex flex-col items-center w-full">
          
          {/* Línea divisoria animada */}
          <motion.div 
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 0.6, scaleY: 1 }}
            transition={{ duration: 1.2, delay: 2.2, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="w-px h-10 md:h-16 bg-linear-to-b from-terracotta to-transparent mb-6 md:mb-10"
          />
          
          {/* Cita Principal */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
            className="font-serif italic text-xl md:text-2xl max-w-lg md:max-w-2xl mx-auto text-sand/80 leading-relaxed text-center px-4"
          >
            “Místico y mártir del Desierto de la Candelaria”
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
              className="group/link flex flex-col items-center gap-2 cursor-pointer"
            >
              {/* Etiqueta mono con líneas laterales */}
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-terracotta/20 group-hover/link:bg-terracotta/40 transition-colors duration-300" />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-terracotta/80 group-hover/link:text-terracotta transition-colors duration-300">
                  Investigación Histórica
                </span>
                <span className="h-px w-6 bg-terracotta/20 group-hover/link:bg-terracotta/40 transition-colors duration-300" />
              </div>
              
              <p className="font-sans text-xs md:text-sm text-sand/40 max-w-sm md:max-w-md mx-auto leading-relaxed text-center flex items-center justify-center gap-1.5 transition-colors duration-300 group-hover/link:text-sand/60">
                <p>
                  Basado en el libro {" "}
                  <span className="text-terracotta italic font-medium group-hover/link:text-terracotta-dark transition-colors duration-300">  
                    &quot;Del Desierto a la Hoguera&quot; {" "}
                  </span>
                    de Patricia Enciso Patiño
                </p>
                <ArrowUpRight 
                  size={14} 
                  className="text-terracotta/50 group-hover/link:text-terracotta transition-all duration-300 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 shrink-0" 
                />
              </p>
            </Link>
          </motion.div>

        </div>

      </div>

      {/* 
        4. INDICADOR DE SCROLL 
      */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
        className="absolute bottom-8 md:bottom-10 flex flex-col items-center gap-1 cursor-pointer group"
        onClick={() => {
          const titleEl = document.getElementById("pasado-title");
          if (titleEl) {
            const targetY = titleEl.getBoundingClientRect().top + window.scrollY - 80;
            const startY = window.scrollY;
            const distance = targetY - startY;
            const duration = 1000; // 1 segundo
            let start: number | null = null;
            
            const step = (timestamp: number) => {
              if (!start) start = timestamp;
              const progress = Math.min((timestamp - start) / duration, 1);
              // EaseInOutCubic
              const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
              window.scrollTo(0, startY + distance * ease);
              if (progress < 1) {
                window.requestAnimationFrame(step);
              }
            };
            window.requestAnimationFrame(step);
          }
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown 
            size={34} 
            color="#C1533B" 
            strokeWidth={1.5} 
            className="opacity-80 drop-shadow-[0_0_8px_rgba(193,83,59,0.8)] transition-opacity duration-300 group-hover:opacity-100"
          />
        </motion.div>
      </motion.div>

    </section>
  );
}
