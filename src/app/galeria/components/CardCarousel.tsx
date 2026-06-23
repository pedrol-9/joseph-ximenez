"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  RotateCcw,
  MoveHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CARDS } from "@/data/galeriaData";

export const CardCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (activeIndex < CARDS.length - 1) {
      setFlippedCards({}); // Reset flips on navigation
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setFlippedCards({}); // Reset flips on navigation
      setActiveIndex((prev) => prev - 1);
    }
  };

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;

    let opacity = 0;
    let scale = 0.8;
    let x = 0;
    let y = 0;
    let rotate = 0;
    let zIndex = 0;
    let pointerEvents: "auto" | "none" = "none";

    const offset = isMobile ? 180 : 285;

    if (diff === 0) {
      opacity = 1;
      scale = 1;
      x = 0;
      y = 0;
      rotate = 0;
      zIndex = 30;
      pointerEvents = "auto";
    } else if (diff === 1) {
      opacity = 0.55;
      scale = 0.85;
      x = offset;
      y = 0;
      rotate = 4;
      zIndex = 20;
      pointerEvents = "none";
    } else if (diff === -1) {
      opacity = 0.55;
      scale = 0.85;
      x = -offset;
      y = 0;
      rotate = -4;
      zIndex = 20;
      pointerEvents = "none";
    } else {
      // Hidden cards pre-positioned to the left or right to slide in when activeIndex shifts
      opacity = 0;
      scale = 0.7;
      x = diff > 0 ? offset * 1.5 : -offset * 1.5;
      y = 0;
      rotate = diff > 0 ? 8 : -8;
      zIndex = 10;
      pointerEvents = "none";
    }

    return {
      opacity,
      scale,
      x,
      y,
      rotate,
      zIndex,
      pointerEvents,
    };
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 80;
    const swipeVelocity = 0.5;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocity) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocity) {
      handlePrev();
    }
  };

  const cardTransition = {
    type: "spring" as const,
    stiffness: 260,
    damping: 26,
    mass: 0.8,
  };

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === CARDS.length - 1;

  return (
    <>
      {/* Atmósfera similar a /demo */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle,var(--text-primary) 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle,var(--accent) 0%,transparent 70%)",
        }}
      />

      {/* Contenedor principal de las cartas */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 pt-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="font-serif text-3xl md:text-5xl text-text-primary">
            Místicos de la Historia
          </h1>
        </div>

        {/* Galería Stack */}
        <div className="relative w-full max-w-sm md:max-w-md h-[470px] md:h-[530px] perspective-[1000px] mb-24 md:mb-0">
          {CARDS.map((card, index) => {
            const style = getCardStyle(index);
            const isFlipped = flippedCards[card.id] || false;
            const isFront = index === activeIndex;

            return (
              <motion.div
                key={card.id}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  zIndex: style.zIndex,
                  pointerEvents: style.pointerEvents,
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                }}
                animate={{
                  x: style.x,
                  y: style.y,
                  scale: style.scale,
                  rotate: style.rotate,
                  opacity: style.opacity,
                }}
                transition={cardTransition}
                drag={isFront && !isFlipped ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={handleDragEnd}
                className="bg-transparent rounded-3xl"
              >
                <div
                  className="relative w-full h-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl"
                  style={{
                    transformStyle: "preserve-3d",
                    WebkitTransformStyle: "preserve-3d",
                  }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    style={{
                      transformStyle: "preserve-3d",
                      WebkitTransformStyle: "preserve-3d",
                      willChange: "transform",
                    }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{
                      duration: 0.6,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    {/* FRENTE DE LA CARTA (IMAGEN - PRIMERA VISTA) */}
                    <div
                      className="absolute inset-0 bg-bg-card border border-border-theme rounded-3xl overflow-hidden flex flex-col"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "translate3d(0,0,0)",
                        WebkitTransform: "translate3d(0,0,0)",
                      }}
                    >
                      <div className="absolute inset-0">
                        {/* Imagen de fondo optimizada sin filtros (colores originales) */}
                        <Image
                          src={card.imageUrl}
                          alt={card.name}
                          fill
                          sizes="(max-width: 768px) 320px, 450px"
                          priority={index === 0 || Math.abs(index - activeIndex) <= 1}
                          className="object-cover transition-opacity duration-700 pointer-events-none"
                        />
                        {/* Degradado inferior para legibilidad del texto */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908]/90 via-[#0A0908]/25 to-transparent z-10" />
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
                            className="group flex items-center gap-2 text-xs font-mono tracking-widest uppercase transition-colors duration-300 text-accent hover:text-text-primary pointer-events-auto cursor-pointer"
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
                    <div
                      className="absolute inset-0 bg-bg-card border border-border-theme rounded-3xl p-8 md:p-10 flex flex-col"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg) translate3d(0,0,0)",
                        WebkitTransform: "rotateY(180deg) translate3d(0,0,0)",
                      }}
                    >
                      {/* Brillo interno de la carta */}
                      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-accent/5 to-transparent rounded-t-3xl pointer-events-none" />

                      {/* Contenido */}
                      <div className="relative z-10 flex flex-col h-full">
                        <span
                          className="font-mono text-accent text-[10px] tracking-widest uppercase mb-6 px-3 py-1 w-fit inline-block rounded-full bg-accent/10 border border-accent/25"
                        >
                          {card.dates} · {card.location}
                        </span>

                        <h2 className="font-serif text-3xl md:text-4xl text-text-primary leading-tight mb-2">
                          {card.name}
                        </h2>

                        <p className="font-serif italic text-text-secondary text-lg md:text-xl mb-6">
                          {card.title}
                        </p>

                        <div className="w-12 h-[1px] bg-accent/40 mb-6" />

                        <p className="text-text-primary/80 font-light text-sm md:text-base leading-relaxed flex-1 overflow-y-auto pr-1 select-text">
                          {card.description}
                        </p>

                        {/* Botón para volver al retrato */}
                        <div className="mt-6 flex justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFlip(card.id);
                            }}
                            className="group flex items-center gap-2 text-xs font-mono tracking-widest uppercase transition-colors duration-300 text-accent hover:text-text-primary pointer-events-auto cursor-pointer"
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
                </div>
              </motion.div>
            );
          })}

          {/* Indicador de Deslizar (Solo Mobile) */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 opacity-60 flex md:hidden">
            <MoveHorizontal
              size={20}
              className="text-text-primary animate-pulse"
            />
            <span className="font-mono text-[10px] tracking-widest uppercase text-text-primary">
              Deslizar
            </span>
          </div>

          {/* Flechas de Navegación Laterales (Solo Desktop) */}
          <div className="absolute top-1/2 -left-16 md:-left-24 -translate-y-1/2 z-20 hidden md:block">
            <button
              onClick={handlePrev}
              disabled={isFirst}
              className={`p-3 rounded-full bg-bg-primary/80 border border-border-theme text-text-primary transition-all backdrop-blur-md ${
                isFirst
                  ? "opacity-30 cursor-not-allowed pointer-events-none"
                  : "hover:text-accent hover:border-accent/30 cursor-pointer"
              }`}
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -right-16 md:-right-24 -translate-y-1/2 z-20 hidden md:block">
            <button
              onClick={handleNext}
              disabled={isLast}
              className={`p-3 rounded-full bg-bg-primary/80 border border-border-theme text-text-primary transition-all backdrop-blur-md ${
                isLast
                  ? "opacity-30 cursor-not-allowed pointer-events-none"
                  : "hover:text-accent hover:border-accent/30 cursor-pointer"
              }`}
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
