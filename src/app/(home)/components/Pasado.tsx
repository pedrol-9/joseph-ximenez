"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function TimelineItem({ item }: { item: any }) {
  const ref = useRef(null);
  // Se activa cuando el elemento cruza el 66% de la pantalla desde arriba (es decir, 33% desde abajo)
  const isInView = useInView(ref, { once: false, margin: "0px 0px -33% 0px" });

  return (
    <div ref={ref} className="relative pl-8 md:pl-16">
      {/* Punto en la línea de tiempo */}
      <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[#C1533B] shadow-[0_0_15px_rgba(193,83,59,0.8)]" />
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-6 mb-1 md:mb-6">
          <span className="font-serif text-3xl md:text-4xl text-[#E8E2D2]/80">{item.year}</span>
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#C1533B]">
            — {item.location}
          </span>
        </div>
        
        <h3 className="font-serif text-2xl md:text-3xl text-[#E8E2D2] mb-0 md:mb-4 leading-snug">
          {item.title}
        </h3>
        
        {/* Contenido Acordeón (Solo Móvil y Tablet) */}
        <div 
          className={`grid transition-[grid-template-rows,opacity,margin-top] duration-700 ease-out lg:!grid-rows-[1fr] lg:!opacity-100 lg:!mt-0 ${
            isInView ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="text-[#E8E2D2]/60 text-base md:text-lg leading-relaxed max-w-2xl font-light pb-6 md:pb-0">
              {item.text}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Pasado() {
  const timeline = [
    {
      year: "1632",
      location: "Guaro, Málaga",
      title: "El origen labrador.",
      text: "Hijo de campesinos, su destino natural era trabajar la tierra en Andalucía. Sin embargo, la pobreza y la inquietud de la época lo alejarían muy pronto de la quietud del campo."
    },
    {
      year: "Años 1650s",
      location: "España y Portugal",
      title: "La pólvora y la guerra.",
      text: "Se enroló como soldado sirviendo por diez años. Estuvo en la guerra entre España y Portugal, y sirvió en la Armada Real y en los galeones. Conoció la violencia de primera mano antes de conocer la paz."
    },
    {
      year: "Circa 1660",
      location: "Málaga",
      title: "El punto de quiebre.",
      text: "Un confuso y violento altercado selló su destino. En medio de una riña desesperada, hirió a una mujer llamada Ana y se enfrentó al hermano de esta para lograr escapar. Temiendo por su vida y perseguido por la justicia, se vio obligado a convertirse en prófugo."
    },
    {
      year: "1661",
      location: "El Océano / Santa Marta",
      title: "La huida a las Indias.",
      text: "Escapando de la muerte o la prisión, cruzó el Atlántico. Llegó a Santa Marta y remontó el traicionero río Magdalena hasta Honda, buscando perderse en la inmensidad del Nuevo Reino de Granada."
    },
    {
      year: "1662–1664",
      location: "Mariquita, Caguán y Timaná",
      title: "El jornalero errante.",
      text: "No encontró hogar fácilmente. Recorrió diversas tierras trabajando como jornalero en labores del campo, intentando reconstruir su vida desde el anonimato en pueblos remotos."
    },
    {
      year: "1665",
      location: "Garzón, Huila",
      title: "Juana y la traición.",
      text: "Parecía haber encontrado paz al casarse con Juana. Pero tras volver de un viaje de dos meses a Pasto vendiendo cerdos, descubrió que ella le era infiel. El soldado violento que solía ser no apareció; en su lugar, surgió un silencio absoluto."
    }
  ];

  return (
    <section id="pasado" className="relative bg-transparent w-full">
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-40">
        
        <motion.div 
          id="pasado-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          className="mb-20 md:mb-32 text-center md:text-left"
        >
          <h2 className="font-serif text-[#E8E2D2] text-[clamp(2.5rem,8vw,5rem)] leading-[1.1] mb-4">
            El eco de <em className="text-[#C1533B] italic">la violencia.</em>
          </h2>
          <p className="text-[#E8E2D2]/50 text-lg max-w-xl font-light">
            Antes de ser místico, fue un hombre acorralado por sus propias sombras y contradicciones.
          </p>
        </motion.div>

        {/* Timeline Vertical */}
        <div className="relative border-l border-[#C1533B]/20 ml-2 md:ml-6 space-y-12 md:space-y-32 pb-20">
          {timeline.map((item, i) => (
            <TimelineItem key={i} item={item} />
          ))}
        </div>
      </div>

      {/* Epifanía */}
      <div className="relative min-h-[80dvh] flex flex-col items-center justify-center px-6 py-20 text-center border-t border-[#100F0D] bg-[#0A0908]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,226,210,0.05)_0%,transparent_60%)] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto lg:pl-[140px] border border-[#E8E2D2]/10 p-10 md:p-16 bg-[#100F0D]/50 backdrop-blur-sm"
        >
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 font-serif text-[#C1533B]/20 text-9xl leading-none">"</span>
          <p className="font-serif text-[clamp(1.8rem,4vw,3rem)] text-[#E8E2D2] leading-snug">
            Una noche se acostó a su lado, cuando de repente tuvo <em className="text-[#C1533B] not-italic">inspiración de Dios</em> de que se retirase a buscarlo.
          </p>
          <div className="mt-12 flex flex-col items-center gap-2">
            <div className="w-16 h-[1px] bg-[#C1533B]/40" />
            <p className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-[#E8E2D2]/40 mt-4">
              [ Folio Extraído · Archivo Histórico Nacional de Madrid ]
            </p>
            <p className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-[#C1533B]/60">
              Proceso Inquisitorial contra Joseph Ximénez
            </p>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
