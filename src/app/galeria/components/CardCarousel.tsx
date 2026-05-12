"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, RotateCcw, MoveHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { CARDS } from "@/data/galeriaData";

export const CardCarousel = () => {
  const [cards, setCards] = useState(CARDS);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [animatingDir, setAnimatingDir] = useState<"left" | "right" | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNext = () => {
    if (animatingDir) return;
    setAnimatingDir("left");
    setTimeout(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        const frontCard = newArray.shift();
        if (frontCard) newArray.push(frontCard);
        return newArray;
      });
      setAnimatingDir(null);
    }, 250);
  };

  const handlePrev = () => {
    if (animatingDir) return;
    setAnimatingDir("right");
    setTimeout(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        const backCard = newArray.pop();
        if (backCard) newArray.unshift(backCard);
        return newArray;
      });
      setAnimatingDir(null);
    }, 250);
  };

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <>
      {/* Atmósfera similar a /demo */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle,#DDD8CF 1px,transparent 1px)", backgroundSize: "28px 28px" }} 
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle,#C1533B 0%,transparent 70%)" }} 
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
            {cards.map((card, index) => {
              // Calculamos estilos basados en la posición de la carta en el array
              const isFront = index === 0;
              const scale = 1 - index * 0.05; // 1, 0.95, 0.90
              const yOffset = index * -30; // 0, -30px, -60px (Efecto de cascada hacia atrás/arriba)
              const zIndex = cards.length - index; // El primero (0) tiene el z-index más alto
              const opacity = 1 - index * 0.25; // 1, 0.75, 0.50

              const isFlipped = flippedCards[card.id] || false;

              return (
                <motion.div
                  key={card.id}
                  layout
                  drag={isFront && isMobile ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x > 50) {
                      setCards((prevCards) => {
                        const newArray = [...prevCards];
                        const backCard = newArray.pop();
                        if (backCard) newArray.unshift(backCard);
                        return newArray;
                      });
                    } else if (offset.x < -50) {
                      setCards((prevCards) => {
                        const newArray = [...prevCards];
                        const frontCard = newArray.shift();
                        if (frontCard) newArray.push(frontCard);
                        return newArray;
                      });
                    }
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 100 }}
                  animate={{
                    opacity: opacity,
                    scale: scale,
                    x: isFront && animatingDir === "left" ? -250 : isFront && animatingDir === "right" ? 250 : 0,
                    y: yOffset,
                    zIndex: zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className={`absolute inset-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${isFront ? 'cursor-grab active:cursor-grabbing' : 'cursor-default pointer-events-none'}`}
                  style={{ transformOrigin: "bottom center", perspective: 1000 }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                  >
                    {/* FRENTE DE LA CARTA */}
                    <div className="absolute inset-0 bg-[#0A0908] border border-[#E8E2D2]/10 rounded-3xl p-8 md:p-10 flex flex-col [backface-visibility:hidden]">
                      {/* Brillo interno de la carta */}
                      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#C1533B]/5 to-transparent rounded-t-3xl pointer-events-none" />

                      {/* Contenido */}
                      <div className="relative z-10 flex flex-col h-full">
                        <span className="font-mono text-[#C1533B] text-[10px] tracking-widest uppercase mb-6">
                          {card.dates} · {card.location}
                        </span>
                        
                        <h2 className="font-serif text-3xl md:text-4xl text-[#E8E2D2] leading-tight mb-2">
                          {card.name}
                        </h2>
                        
                        <p className="font-serif italic text-[#E8E2D2]/50 text-lg md:text-xl mb-6">
                          {card.title}
                        </p>
                        
                        <div className="w-12 h-[1px] bg-[#C1533B]/40 mb-6" />
                        
                        <p className="text-[#E8E2D2]/70 font-light text-sm md:text-base leading-relaxed overflow-y-auto pr-2 custom-scrollbar flex-1">
                          {card.description}
                        </p>
                        
                        {/* Botón para ver imagen (Flip) */}
                        <div className="mt-6 flex justify-center">
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleFlip(card.id); }}
                            className={`group flex items-center gap-2 text-xs font-mono tracking-widest uppercase transition-colors duration-300 ${isFront ? 'text-[#C1533B] hover:text-[#E8E2D2] pointer-events-auto' : 'text-transparent pointer-events-none'}`}
                          >
                            <RotateCcw size={14} className="transition-transform duration-500 group-hover:-rotate-180" />
                            Ver Imagen
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* REVERSO DE LA CARTA (IMAGEN) */}
                    <div className="absolute inset-0 bg-[#0A0908] border border-[#E8E2D2]/10 rounded-3xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col">
                      <div className="absolute inset-0">
                        {/* Imagen de fondo (Placeholder o real) */}
                        <div 
                          className="w-full h-full bg-cover bg-center opacity-40 transition-opacity duration-700"
                          style={{ backgroundImage: `url(${card.imageUrl})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-[#0A0908]/40 to-transparent" />
                      </div>
                      
                      <div className="relative z-10 flex flex-col h-full justify-end p-8 md:p-10">
                        <h3 className="font-serif text-2xl text-[#E8E2D2] mb-2">{card.name}</h3>
                        <p className="text-[#E8E2D2]/60 text-sm font-light mb-8 italic">Archivo visual</p>
                        
                        {/* Botón para volver al texto */}
                        <div className="flex justify-center">
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleFlip(card.id); }}
                            className={`group flex items-center gap-2 text-xs font-mono tracking-widest uppercase transition-colors duration-300 ${isFront ? 'text-[#C1533B] hover:text-[#E8E2D2] pointer-events-auto' : 'text-transparent pointer-events-none'}`}
                          >
                            <RotateCcw size={14} className="transition-transform duration-500 group-hover:-rotate-180" />
                            Volver al texto
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
            <MoveHorizontal size={20} className="text-[#E8E2D2] animate-pulse" />
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
