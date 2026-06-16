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
          <span className="font-serif text-3xl md:text-4xl text-text-primary/80">
            {item.year}
          </span>
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#C1533B]">
            — {item.location}
          </span>
        </div>

        <h3 className="font-serif text-2xl md:text-3xl text-text-primary mb-0 md:mb-4 leading-snug">
          {item.title}
        </h3>

        {/* Contenido Acordeón (Solo Móvil y Tablet) */}
        <div
          className={`grid transition-[grid-template-rows,opacity,margin-top] duration-700 ease-out lg:!grid-rows-[1fr] lg:!opacity-100 lg:!mt-0 ${
            isInView
              ? "grid-rows-[1fr] opacity-100 mt-4"
              : "grid-rows-[0fr] opacity-0 mt-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl font-light pb-6 md:pb-0">
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
      text: "Hijo de campesinos, su destino natural era trabajar la tierra. Sin embargo, la crisis político militar en España lo alejaría muy pronto de la quietud del campo.",
    },
    {
      year: "1650s",
      location: "España y Portugal",
      title: "Diez años entre pólvora y guerra.",
      text: "Se enroló como soldado; peleó con la Armada Real Española en la guerra contra Portugal. Igual que San Ignacio de Loyola en su momento, conoció la violencia de primera mano antes que la paz espiritual.",
    },
    {
      year: "1660",
      location: "Santa Marta",
      title: "El Océano.",
      text: "Un confuso y violento altercado selló su destino. En medio de una riña desesperada, hirió a una mujer llamada Ana y se enfrentó al hermano de esta para lograr escapar. Temiendo por su vida y perseguido por la justicia, se vio obligado a convertirse en prófugo.",
    },
    {
      year: "1661 - 1664",
      location: "Tolima y Huila",
      title: "Viajes, oficios y matrimonio.",
      text: "Es jornalero en Mariquita, ayudante del gobernador en Caguán, Huila, y contrae matrimonio en Timaná, donde ahora es comerciante. Después de un viaje descubre la infidelidad de su esposa. El soldado violento que solía ser no aparece, decide esperar un cambio. Posteriormente siente el llamado de Dios.",
    },
  ];

  return (
    <section id="pasado" className="relative bg-transparent w-full">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:pl-[140px] py-24 md:py-40">
        <motion.div
          id="pasado-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          className="mb-20 md:mb-32 text-center md:text-left"
        >
          <h2 className="font-serif text-text-primary text-[clamp(2.5rem,8vw,5rem)] leading-[1.1] mb-4">
            El eco de <em className="text-[#C1533B] italic">la aventura.</em>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl font-light">
            Antes de ser místico fue labrador, pasó por la milicia y recorrió
            miles de kilómetros cargado de sentires y aventuras.
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
      <div className="relative min-h-[80dvh] flex flex-col items-center justify-center px-6 py-20 text-center border-t border-border-theme bg-bg-card">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,226,210,0.05)_0%,transparent_60%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto lg:pl-[140px] border border-border-theme p-10 md:p-16 bg-bg-primary/50 backdrop-blur-sm"
        >
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 font-serif text-[#C1533B]/20 text-9xl leading-none">
            "
          </span>
          <p className="font-serif text-[clamp(1.8rem,4vw,3rem)] text-text-primary leading-snug">
            Una noche se acostó a su lado, cuando de repente tuvo{" "}
            <em className="text-[#C1533B] not-italic">inspiración de Dios</em>{" "}
            de que se retirase a buscarlo.
          </p>
          <div className="mt-12 flex flex-col items-center gap-2">
            <div className="w-16 h-[1px] bg-[#C1533B]/40" />
            <p className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-text-secondary/60 mt-4">
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
