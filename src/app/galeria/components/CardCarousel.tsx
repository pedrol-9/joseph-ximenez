"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  RotateCcw,
  MoveHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CARDS } from "@/data/galeriaData";

export const CardCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNext = () => {
    setDirection("next");
    setFlippedCards({});
    setActiveIndex((prev) => (prev + 1) % CARDS.length);
  };

  const handlePrev = () => {
    setDirection("prev");
    setFlippedCards({});
    setActiveIndex((prev) => (prev - 1 + CARDS.length) % CARDS.length);
  };

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {/* Atmósfera similar a /demo */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle,#DDD8CF 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle,#C1533B 0%,transparent 70%)",
        }}
      />

      {/* Contenedor principal de las cartas */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 pt-20">
        <div className="text-center mb-20 md:mb-28">
          <span className="font-mono text-[#C1533B] text-[10px] md:text-xs tracking-[0.4em] uppercase block mb-4">
            Paralelismos Místicos
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-[#E8E2D2]">
            Ermitaños de la Historia
          </h1>
        </div>

        {/* Galería Stack */}
        <div className="relative w-full max-w-sm md:max-w-md h-[450px] md:h-[500px] perspective-[1000px] mb-24 md:mb-0">
          <AnimatePresence>
            {CARDS.map((card, index) => {
              // Calculate relative position of card in the stack
              let relativeIndex = index - activeIndex;
              if (relativeIndex < 0) {
                relativeIndex += CARDS.length;
              }

              const isFront = relativeIndex === 0;
              const isFlipped = flippedCards[card.id] || false;

              // Calculate animations based on relativeIndex
              const scale = 1 - Math.min(relativeIndex, 3) * 0.05;
              const yOffset = Math.min(relativeIndex, 3) * -30;
              const opacity = relativeIndex >= 3 ? 0 : 1 - relativeIndex * 0.25;
              let zIndex = CARDS.length - relativeIndex;

              // Exit/entry animations for horizontal smoothness
              let x: any = 0;
              if (relativeIndex === CARDS.length - 1 && direction === "next") {
                // Card that just exited (went Next). Exits to the left.
                x = "-120%";
                zIndex = CARDS.length + 1; // Keep on top during exit
              } else if (relativeIndex === 0 && direction === "prev") {
                // Card that just entered (went Prev). Enters from the left.
                x = ["-120%", "0%"];
              }

              return (
                <motion.div
                  key={card.id}
                  drag={isFront && isMobile ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={(e, info) => {
                    const threshold = 80;
                    const velocityThreshold = 300;
                    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
                      handleNext();
                    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
                      handlePrev();
                    }
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 100 }}
                  animate={{
                    opacity: opacity,
                    scale: scale,
                    x: x,
                    y: yOffset,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className={`absolute inset-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${isFront ? (isMobile ? "cursor-grab active:cursor-grabbing" : "cursor-default") : "cursor-default pointer-events-none"}`}
                  style={{
                    transformOrigin: "bottom center",
                    perspective: 1000,
                    zIndex: zIndex,
                  }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{
                      duration: 0.6,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    {/* FRENTE DE LA CARTA (IMAGEN - PRIMERA VISTA) */}
                    <div className="absolute inset-0 bg-[#0A0908] border border-[#E8E2D2]/10 rounded-3xl overflow-hidden [backface-visibility:hidden] flex flex-col">
                      <div className="absolute inset-0">
                        {/* Imagen de fondo sin filtros (colores originales) */}
                        <div
                          className="w-full h-full bg-cover bg-center transition-opacity duration-700"
                          style={{ backgroundImage: `url(${card.imageUrl})` }}
                        />
                        {/* Degradado inferior para legibilidad del texto */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908]/90 via-[#0A0908]/25 to-transparent" />
                      </div>

                      <div className="relative z-10 flex flex-col h-full justify-end p-8 md:p-10">
                        <span
                          className="font-mono text-[#E8E2D2]/70 text-[10px] tracking-widest uppercase mb-2 px-3 py-1 w-fit inline-block rounded-full backdrop-blur-md border border-[#E8E2D2]/20"
                          style={{
                            background:
                              "linear-gradient(to right, rgba(193,83,59,0.4), rgba(193,83,59,0.5), rgba(193,83,59,0.4))",
                          }}
                        >
                          {card.dates} · {card.location}
                        </span>
                        <h3
                          className="font-serif text-2xl md:text-3xl text-[#E8E2D2] mb-1"
                          style={{
                            textShadow: "0 2px 8px rgba(0, 0, 0, 0.95)",
                          }}
                        >
                          {card.name}
                        </h3>
                        <p
                          className="text-[#E8E2D2]/70 text-xs md:text-sm font-light mb-6 italic"
                          style={{
                            textShadow: "0 2px 4px rgba(0, 0, 0, 0.95)",
                          }}
                        >
                          {card.title}
                        </p>

                        {/* Botón para ver detalles */}
                        <div className="flex justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFlip(card.id);
                            }}
                            className={`group flex items-center gap-2 text-xs font-mono tracking-widest uppercase transition-colors duration-300 ${isFront ? "text-[#C1533B] hover:text-[#E8E2D2] pointer-events-auto" : "text-transparent pointer-events-none"}`}
                          >
                            <RotateCcw
                              size={14}
                              className="transition-transform duration-500 group-hover:-rotate-180"
                            />
                            Ver detalles
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* REVERSO DE LA CARTA (TEXTO INFORMATIVO) */}
                    <div className="absolute inset-0 bg-[#0A0908] border border-[#E8E2D2]/10 rounded-3xl p-8 md:p-10 flex flex-col [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      {/* Brillo interno de la carta */}
                      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#C1533B]/5 to-transparent rounded-t-3xl pointer-events-none" />

                      {/* Contenido */}
                      <div className="relative z-10 flex flex-col h-full">
                        <span
                          className="font-mono text-[#E8E2D2]/70 text-[10px] tracking-widest uppercase mb-6 px-3 py-1 w-fit inline-block rounded-full backdrop-blur-md border border-[#E8E2D2]/20"
                          style={{
                            background:
                              "linear-gradient(to right, rgba(193,83,59,0.4), rgba(193,83,59,0.5), rgba(193,83,59,0.4))",
                          }}
                        >
                          {card.dates} · {card.location}
                        </span>

                        <h2 className="font-serif text-3xl md:text-4xl text-[#E8E2D2] leading-tight mb-2">
                          {card.name}
                        </h2>

                        <p className="font-serif italic text-[#E8E2D2]/50 text-lg md:text-xl mb-6">
                          {card.title}
                        </p>

                        <div className="w-12 h-[1px] bg-[#C1533B]/40 mb-6" />

                        <p className="text-[#E8E2D2]/70 font-light text-sm md:text-base leading-relaxed flex-1 pointer-events-none select-none overflow-hidden">
                          {card.description}
                        </p>

                        {/* Botón para volver al retrato */}
                        <div className="mt-6 flex justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFlip(card.id);
                            }}
                            className={`group flex items-center gap-2 text-xs font-mono tracking-widest uppercase transition-colors duration-300 ${isFront ? "text-[#C1533B] hover:text-[#E8E2D2] pointer-events-auto" : "text-transparent pointer-events-none"}`}
                          >
                            <RotateCcw
                              size={14}
                              className="transition-transform duration-500 group-hover:-rotate-180"
                            />
                            Ver retrato
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Indicador de Deslizar (Solo Mobile) */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 opacity-60 flex md:hidden">
            <MoveHorizontal
              size={20}
              className="text-[#E8E2D2] animate-pulse"
            />
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#E8E2D2]">
              Desliza para explorar
            </span>
          </div>

          {/* Flechas de Navegación Laterales (Solo Desktop) */}
          <div className="absolute top-1/2 -left-16 md:-left-24 -translate-y-1/2 z-20 hidden md:block">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-[#100F0D]/80 border border-[#DDD8CF]/10 text-[#DDD8CF] hover:text-[#C1533B] hover:border-[#C1533B]/30 transition-all backdrop-blur-md"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -right-16 md:-right-24 -translate-y-1/2 z-20 hidden md:block">
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-[#100F0D]/80 border border-[#DDD8CF]/10 text-[#DDD8CF] hover:text-[#C1533B] hover:border-[#C1533B]/30 transition-all backdrop-blur-md"
              aria-label="Siguiente"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
