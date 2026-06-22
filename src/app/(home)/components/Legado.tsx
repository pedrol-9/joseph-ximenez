"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bookImages = [
  { src: "/images/libro/PortadaLibro_1.jpg", alt: "Portada original - Del desierto a la hoguera" },
  { src: "/images/libro/PortadaLibro_2.jpg", alt: "Página de título interior" },
];

export default function Legado() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % bookImages.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + bookImages.length) % bookImages.length);
  };
  return (
    <section id="legado" className="relative z-30 bg-transparent text-text-primary pt-32 pb-12 overflow-hidden border-t border-border-theme">

      {/* Marca de agua gigante de JX */}
      <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden opacity-[0.03]">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-serif font-bold leading-none text-center"
          style={{ fontSize: "40vw", color: "#C1533B", WebkitTextStroke: "1px rgba(193,83,59,0.4)" }}
        >
          JX
        </motion.p>
      </div>

      {/* Luz tenue de fondo para diferenciar la época */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(232,226,210,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:pr-12 xl:pl-[140px] relative z-10">

        {/* ENCABEZADO DEL LEGADO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24 md:mb-32"
        >
          <span className="font-mono text-text-secondary/40 text-[10px] md:text-xs tracking-[0.4em] uppercase block mb-4">
            El Legado · Siglo XXI
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,8vw,5rem)] leading-tight text-text-primary">
            La memoria <br />
            <em className="text-[#C1533B] italic drop-shadow-[0_0_15px_rgba(193,83,59,0.2)]">rescatada.</em>
          </h2>
        </motion.div>

        {/* ESCALABILIDAD: EL LIBRO Y EVENTOS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-[#C1533B]/10 border border-[#C1533B]/25 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl mb-32 md:mb-40"
        >
          {/* Brillo sutil detrás del libro */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#C1533B]/5 blur-[80px] pointer-events-none rounded-full" />

          <div className="max-w-xl text-center md:text-left relative z-10">
            <span className="font-mono text-[#C1533B] text-[10px] md:text-xs tracking-[0.3em] uppercase block mb-4">
              Investigación Histórica
            </span>
            <h3 className="font-serif text-3xl md:text-5xl mb-6 text-text-primary">Del desierto a la hoguera</h3>
            <p className="font-light text-text-secondary leading-relaxed text-base md:text-lg mb-6">
              La exhaustiva investigación de Patricia Enciso Patiño que desentierra los folios originales del Archivo Histórico Nacional de Madrid, trayendo a la luz la verdad oculta del ermitaño.
            </p>
            <p className="font-light text-text-secondary/80 leading-relaxed text-sm md:text-base">
              Publicada en 1995 por la Editorial Ariel, esta obra documenta el proceso del Santo Oficio. A la derecha se pueden examinar las páginas del volumen original: la portada de la primera edición y el título interior.
            </p>
            <p className="font-light text-text-secondary/60 leading-relaxed text-xs md:text-sm mt-3 italic">
              En cubierta: fragmento de ilustración de Carlos Páramo Bonilla.
            </p>
          </div>

          {/* Carrusel Premium del Libro */}
          <div className="w-full md:w-[280px] lg:w-[320px] shrink-0 bg-black/40 border border-[#C1533B]/20 rounded-2xl p-4 flex flex-col items-center relative z-10 shadow-xl">
            {/* Image Slider */}
            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-stone-955 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSlide}
                  src={bookImages[activeSlide].src}
                  alt={bookImages[activeSlide].alt}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover select-none"
                />
              </AnimatePresence>

              {/* Botón Anterior */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-[#C1533B] text-white flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-20"
                aria-label="Imagen anterior"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Botón Siguiente */}
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-[#C1533B] text-white flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-20"
                aria-label="Siguiente imagen"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dot Pagination */}
            <div className="flex gap-2.5 mt-4">
              {bookImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === i ? "bg-[#C1533B] scale-125" : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Ir a página ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* LA ESCULTURA & EL ARTE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h3 className="font-serif text-3xl md:text-4xl mb-6 text-text-primary">El Rostro del Ermitaño</h3>
            <p className="text-lg md:text-xl font-light leading-relaxed text-text-secondary mb-8">
              Una historia que se negó a ser ceniza. Hoy, el artista y humanista Eduardo Rodríguez, desde Ráquira, ha esculpido la memoria tridimensional de Joseph, reivindicando su figura como místico y mártir del desierto.
            </p>
            <div className="w-12 h-[1px] bg-[#C1533B]/50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full aspect-[3/4] max-w-[420px] mx-auto"
          >
            <div
              className="w-full h-full cursor-pointer relative"
              style={{ perspective: "1200px" }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <motion.div
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* Lado Frontal */}
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl border border-[#C1533B]/25 bg-[#C1533B]/10 p-6 flex items-center justify-center shadow-2xl relative"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Doble marco de Galería */}
                  <div className="absolute inset-3 border border-[#C1533B]/15 rounded-xl pointer-events-none z-20" />
                  
                  <img
                    src="https://rp9jryczlxa748zk.public.blob.vercel-storage.com/dr_eduardo/rostro_joseph.png"
                    alt="Escultura de Eduardo Rodríguez - El Rostro del Ermitaño"
                    className="w-full h-full object-contain relative z-10 transition-transform duration-500 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-3 bg-gradient-to-tr from-[#C1533B]/5 via-transparent to-transparent opacity-40 z-20 pointer-events-none" />

                  {/* Botón indicador discreto */}
                  <div className="absolute bottom-6 right-6 bg-bg-card/85 backdrop-blur-sm border border-border-theme px-3 py-1.5 rounded-full flex items-center gap-1.5 z-30 pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C1533B] animate-pulse" />
                    <span className="font-mono text-[9px] tracking-widest text-text-primary uppercase">Detrás de la Arcilla</span>
                  </div>
                </div>

                {/* Lado Reverso */}
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl border border-[#C1533B]/25 bg-[#C1533B]/10 p-6 md:p-8 flex flex-col justify-between shadow-2xl overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  }}
                >
                  {/* Doble marco de Galería */}
                  <div className="absolute inset-3 border border-[#C1533B]/15 rounded-xl pointer-events-none z-0" />
                  
                  {/* Decoración de fondo */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(193,83,59,0.05)_0%,transparent_70%)] z-1 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <span className="font-mono text-[#C1533B] text-[9px] md:text-xs tracking-[0.3em] uppercase block mb-2 md:mb-4">
                        El Proceso Escultórico
                      </span>
                      <h4 className="font-serif text-xl md:text-2xl text-text-primary mb-3 md:mb-4">
                        Del Barro al Legado
                      </h4>
                      <p className="text-xs md:text-sm font-light leading-relaxed text-text-secondary">
                        Esculpido a mano en Ráquira a partir de arcillas locales. La pieza revive a Joseph Ximenez mediante la técnica ancestral de placas y desbaste, decorada con engobes minerales y quemada a más de 900°C en hornos tradicionales para lograr una textura terrosa orgánica única.
                      </p>
                    </div>

                    <div className="flex justify-between items-center border-t border-border-theme pt-3 md:pt-4 mt-4">
                      <span className="text-[10px] md:text-xs font-mono text-text-secondary/60">
                        [ Eduardo Rodríguez ]
                      </span>
                      <span className="text-[9px] font-mono tracking-widest text-[#C1533B] uppercase">
                        Volver a la Obra
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}