"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Legado() {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <section id="legado" className="relative z-30 bg-transparent text-[#E8E2D2] pt-32 pb-12 overflow-hidden border-t border-[#C1533B]/10">
      
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

      <div className="max-w-6xl mx-auto px-6 md:pr-12 lg:pl-[140px] relative z-10">
        
        {/* ENCABEZADO DEL LEGADO */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24 md:mb-32"
        >
          <span className="font-mono text-[#E8E2D2]/30 text-[10px] md:text-xs tracking-[0.4em] uppercase block mb-4">
            El Legado · Siglo XXI
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,8vw,5rem)] leading-tight text-[#E8E2D2]">
            La memoria <br/>
            <em className="text-[#C1533B] italic drop-shadow-[0_0_15px_rgba(193,83,59,0.2)]">rescatada.</em>
          </h2>
        </motion.div>

        {/* LA ESCULTURA & EL ARTE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-32 md:mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h3 className="font-serif text-3xl md:text-4xl mb-6 text-[#E8E2D2]">El Rostro del Ermitaño</h3>
            <p className="text-lg md:text-xl font-light leading-relaxed text-[#E8E2D2]/60 mb-8">
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
                  className="absolute inset-0 w-full h-full rounded-2xl border border-[#E8E2D2]/10 bg-[#0A0A0A] overflow-hidden shadow-2xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img 
                    src="https://rp9jryczlxa748zk.public.blob.vercel-storage.com/dr_eduardo/rostro_joseph.png" 
                    alt="Escultura de Eduardo Rodríguez - El Rostro del Ermitaño"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#C1533B]/10 via-transparent to-transparent opacity-40 pointer-events-none" />
                  
                  {/* Botón indicador discreto */}
                  <div className="absolute bottom-4 right-4 bg-[#0A0A0A]/85 backdrop-blur-sm border border-[#C1533B]/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C1533B] animate-pulse" />
                    <span className="font-mono text-[9px] tracking-widest text-[#E8E2D2] uppercase">Detrás de la Arcilla</span>
                  </div>
                </div>

                {/* Lado Reverso */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl border border-[#C1533B]/20 bg-[#0F0E0C] p-6 md:p-8 flex flex-col justify-between shadow-2xl overflow-hidden"
                  style={{ 
                    backfaceVisibility: "hidden", 
                    transform: "rotateY(180deg)" 
                  }}
                >
                  {/* Decoración de fondo */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(193,83,59,0.05)_0%,transparent_70%)] pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <span className="font-mono text-[#C1533B] text-[9px] md:text-xs tracking-[0.3em] uppercase block mb-2 md:mb-4">
                        El Proceso Escultórico
                      </span>
                      <h4 className="font-serif text-xl md:text-2xl text-[#E8E2D2] mb-3 md:mb-4">
                        Del Barro al Legado
                      </h4>
                      <p className="text-xs md:text-sm font-light leading-relaxed text-[#E8E2D2]/75">
                        Esculpido a mano en Ráquira a partir de arcillas locales. La pieza revive a Joseph Ximenez mediante la técnica ancestral de placas y desbaste, decorada con engobes minerales y quemada a más de 900°C en hornos tradicionales para lograr una textura terrosa orgánica única.
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center border-t border-[#E8E2D2]/5 pt-3 md:pt-4 mt-4">
                      <span className="text-[10px] md:text-xs font-mono text-[#E8E2D2]/40">
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

        {/* ESCALABILIDAD: EL LIBRO Y EVENTOS */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-[#0A0A0A] border border-[#C1533B]/10 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl"
        >
          {/* Brillo sutil detrás del libro */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#C1533B]/5 blur-[80px] pointer-events-none rounded-full" />

          <div className="max-w-xl text-center md:text-left relative z-10">
            <span className="font-mono text-[#C1533B] text-[10px] md:text-xs tracking-[0.3em] uppercase block mb-4">
              Investigación Histórica
            </span>
            <h3 className="font-serif text-3xl md:text-5xl mb-6 text-[#E8E2D2]">Del desierto a la hoguera</h3>
            <p className="font-light text-[#E8E2D2]/50 mb-10 leading-relaxed text-base md:text-lg">
              La exhaustiva investigación de Patricia Enciso Patiño que desentierra los folios originales del Archivo Histórico Nacional de Madrid, trayendo a la luz la verdad oculta del ermitaño.
            </p>
            
            {/* Botón preparado para E-Commerce, sutil pero llamativo */}
            <a 
              href="https://www.mercadolibre.com.co/del-desierto-a-la-hoguera--patricia-enciso--la-inquisicion/up/MCOU2434042422"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-transparent border border-[#C1533B]/40 hover:bg-[#C1533B]/10 hover:border-[#C1533B] text-[#E8E2D2] px-8 py-4 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300"
            >
              Adquirir el Libro
            </a>
          </div>

          <a 
            href="https://www.mercadolibre.com.co/del-desierto-a-la-hoguera--patricia-enciso--la-inquisicion/up/MCOU2434042422"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-[300px] shrink-0 bg-[#050505] border border-[#E8E2D2]/10 rounded-lg relative shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-10 overflow-hidden block"
          >
            {/* Portada del libro */}
            <img 
              src="https://http2.mlstatic.com/D_NQ_NP_764888-MCO84533351158_052025-O.webp" 
              alt="Portada del libro Del desierto a la hoguera"
              className="w-full h-auto block"
            />
            {/* Gradiente decorativo */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-40 pointer-events-none" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
