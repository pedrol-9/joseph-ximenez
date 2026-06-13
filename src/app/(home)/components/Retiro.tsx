"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { section } from "framer-motion/client";

function DesertStep({ step, index }: { step: any, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "0px 0px -33% 0px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1, delay: index * 0.1 }}
      className={`relative flex flex-col lg:flex-row gap-8 items-start lg:items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse text-left lg:text-right' : 'text-left'}`}
    >
      {/* Punto iluminado */}
      <div className="absolute left-[24px] lg:left-1/2 w-3 h-3 rounded-full bg-[#C1533B] lg:-translate-x-1/2 mt-1.5 lg:mt-0 shadow-[0_0_15px_rgba(193,83,59,0.8)]" />
      
      {/* Contenido */}
      <div className="w-full lg:w-1/2 pl-16 lg:pl-0">
        <div className={`${index % 2 !== 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
          <span className="font-mono text-[#C1533B] text-[10px] tracking-[0.3em] uppercase block mb-3">
            {step.subtitle}
          </span>
          <h3 className="font-serif text-2xl md:text-4xl text-text-primary mb-4">
            {step.title}
          </h3>
          
          {/* Contenido Acordeón (Solo Móvil) */}
          <div 
            className={`grid transition-[grid-template-rows,opacity,margin-top] duration-700 ease-out lg:!grid-rows-[1fr] lg:!opacity-100 lg:!mt-0 ${
              isInView ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="text-text-secondary text-base lg:text-xl leading-relaxed font-light">
                {step.text}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Espaciador para centrar en Desktop */}
      <div className="hidden lg:block w-1/2" />
    </motion.div>
  );
}

export default function Retiro() {
  const desertSteps = [
    {
      title: "El Desierto de la Candelaria",
      subtitle: "33 Años · La edad del sacrificio",
      text: "Llegó a este páramo buscando un paralelismo absoluto con Cristo. Inmerso en un aislamiento extremo, dejó atrás al soldado violento y al campesino errante, entregándose por completo al misticismo puro y a la contemplación divina."
    },
    {
      title: "Los 29 Cuadernos",
      subtitle: "La obra magna dictada",
      text: "Durante once años de silencio sepulcral, su única voz fue la tinta. Llenó folios enteros delineando meticulosamente el viaje del alma a través de las tres vías místicas: la Purgativa, la Iluminativa y la Unitiva."
    },
    {
      title: "La Herejía Suprema",
      subtitle: "La Vía Unitiva",
      text: "Al alcanzar la comunión directa con Dios, concluyó que la Iglesia, los sacerdotes y la confesión eran innecesarios. Esta convicción, nacida de su iluminación, fue su mayor epifanía, pero también su sentencia de muerte."
    }
  ];

  return (
      <section id="retiro" className="relative z-20 w-full overflow-hidden bg-transparent border-y border-border-theme">
      
      {/* Marca de agua gigante */}
      <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden opacity-[0.03]">
        <motion.p 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="font-serif font-bold leading-none text-center" 
          style={{ fontSize: "50vw", color: "#C1533B" }}
        >
          11
        </motion.p>
      </div>
      
      {/* 
        ========================================
        1. EL DESIERTO (Los 11 años de silencio)
        ========================================
      */}
      <div className="py-24 md:py-40 px-6 md:px-12 lg:pl-[140px] max-w-6xl mx-auto border-t border-border-theme">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-24 md:mb-32"
        >
          <span className="font-mono text-[#C1533B] text-[10px] md:text-xs tracking-[0.4em] uppercase block mb-6">
            1665 — 1676 · El Retiro
          </span>
          <h2 className="font-serif text-text-primary text-[clamp(3.5rem,10vw,7rem)] leading-[0.9] tracking-tight">
            Once años<br/>
            <em className="text-text-secondary/40 italic font-light">de silencio.</em>
          </h2>
        </motion.div>

        {/* Narrativa del Desierto (Timeline Serpenteante) */}
        <div className="relative max-w-4xl mx-auto">
          {/* Línea central sutil */}
          <div className="absolute left-[28px] lg:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#C1533B]/20 to-transparent lg:-translate-x-1/2" />
          
          <div className="space-y-24 lg:space-y-32">
            {desertSteps.map((step, i) => (
              <DesertStep key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>

  );
}
