"use client";

import { motion, Variants } from "framer-motion";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { ChevronRight, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F4F1EA] pt-32 pb-24 text-[#2B2A29] selection:bg-[#7A3B22] selection:text-[#F4F1EA]">
        
        {/* HEADER */}
        <header className="mb-20 flex flex-col items-center text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#7A3B22] mb-6 font-bold"
          >
            Revista de Investigación e Historia
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-serif text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-[#100F0D]"
          >
            Ecos del <br/><span className="italic text-[#7A3B22]">Desierto</span>
          </motion.h1>
          <motion.p
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
             className="mt-8 font-light text-[#2B2A29]/60 max-w-xl text-sm md:text-base"
          >
            Explorando el contexto histórico, la vida eremítica y los secretos inquisitoriales detrás de la vida de Joseph Ximénez (1632-1688).
          </motion.p>
        </header>

        <div className="max-w-7xl mx-auto px-6">
          
          {/* MAIN FEATURE & SIDEBAR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24 border-b border-[#2B2A29]/10 pb-24">
            
            {/* MAIN ARTICLE */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={fadeUp}
              className="lg:col-span-8 group cursor-pointer"
            >
              <Link href="/blog/hallazgo-folio-22" className="block">
                <div className="aspect-[16/9] md:aspect-[21/9] bg-[#100F0D] mb-8 overflow-hidden relative rounded-sm shadow-xl">
                  <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(122,59,34,0.15)_0%,rgba(16,15,13,1)_100%)] group-hover:scale-105 transition-transform duration-1000 flex items-center justify-center">
                    <span className="font-serif italic text-[#F4F1EA]/10 text-6xl">Folio 22</span>
                  </div>
                </div>
                <div className="pl-4 border-l-2 border-[#7A3B22]">
                  <span className="font-sans text-[10px] font-bold text-[#7A3B22] uppercase tracking-widest mb-3 block">Investigación · Madrid, 1995</span>
                  <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-4 group-hover:text-[#7A3B22] transition-colors text-[#100F0D]">
                    El hallazgo del Folio 22: Un proceso inquisitorial olvidado
                  </h2>
                  <p className="font-light text-lg text-[#2B2A29]/80 leading-relaxed max-w-2xl mb-6">
                    Durante siglos, la historia oficial silenció el destino de un ermitaño que escribió 29 cuadernos bajo "dictado divino". El descubrimiento de los archivos secretos de la Inquisición de Cartagena de Indias en Madrid abrió la puerta a una historia de herejía y martirio.
                  </p>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#7A3B22] group-hover:translate-x-2 transition-transform">
                    Leer artículo completo <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* SIDEBAR ARTICLES */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={fadeUp}
              className="lg:col-span-4 space-y-12 lg:border-l border-[#2B2A29]/10 lg:pl-12"
            >
              <Link href="/blog/ermitano-siglo-xvii" className="group cursor-pointer block">
                <span className="font-sans text-[10px] font-bold text-[#7A3B22] uppercase tracking-widest mb-2 block">Cultura y Sociedad</span>
                <h3 className="font-serif text-2xl leading-snug group-hover:text-[#7A3B22] transition-colors mb-3 text-[#100F0D]">
                  ¿Qué significaba ser un ermitaño en el siglo XVII?
                </h3>
                <p className="font-light text-sm text-[#2B2A29]/70 leading-relaxed">
                  Aislarse en el Desierto de la Candelaria, alimentarse de raíces y dormir sobre tablas no era solo penitencia; era un acto de rebeldía espiritual que rozaba los límites del dogma permitido.
                </p>
              </Link>
              
              <div className="w-12 h-[1px] bg-[#2B2A29]/10" />

              <Link href="/blog/esculpiendo-silencio" className="group cursor-pointer block">
                <span className="font-sans text-[10px] font-bold text-[#7A3B22] uppercase tracking-widest mb-2 block">Memoria y Arte</span>
                <h3 className="font-serif text-2xl leading-snug group-hover:text-[#7A3B22] transition-colors mb-3 text-[#100F0D]">
                  Esculpiendo el silencio: El rostro de Joseph
                </h3>
                <p className="font-light text-sm text-[#2B2A29]/70 leading-relaxed">
                  El artista Eduardo Rodríguez, vecino de Ráquira, ha creado una escultura tridimensional que le devuelve el rostro al místico, reivindicando su figura como mártir del desierto.
                </p>
              </Link>
            </motion.div>
          </div>

          {/* GRID SECUNDARIO */}
          <div className="mb-24">
            <div className="flex justify-between items-end mb-12 border-b border-[#2B2A29]/10 pb-4">
              <h3 className="font-serif text-3xl text-[#100F0D]">Más lecturas</h3>
              <span className="text-xs font-bold uppercase tracking-widest text-[#7A3B22] transition-colors flex items-center gap-1 opacity-50">
                Archivo Histórico <ArrowRight size={14}/>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              
              <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={fadeUp} className="group cursor-pointer">
                <Link href="/blog/auto-de-fe-1688" className="block">
                  <div className="aspect-[4/3] bg-[#E8E2D2] mb-6 overflow-hidden rounded-sm relative">
                     <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,#E8E2D2,#D5CFC1)] group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-[#2B2A29]/5" />
                  </div>
                  <div className="flex gap-4 items-baseline mb-3">
                    <span className="font-mono text-[10px] tracking-widest text-[#7A3B22] uppercase">Contexto Histórico</span>
                    <span className="font-mono text-[10px] text-[#2B2A29]/40">7 min de lectura</span>
                  </div>
                  <h4 className="font-serif text-2xl text-[#100F0D] group-hover:text-[#7A3B22] transition-colors mb-3">El Auto de Fe de 1688 en Cartagena de Indias</h4>
                  <p className="font-light text-[#2B2A29]/70 text-sm leading-relaxed">
                    De 711 procesos inquisitoriales en Nueva Granada a lo largo de 200 años, solo siete hombres fueron condenados a la hoguera por herejía formal. Joseph fue el único místico entre ellos.
                  </p>
                </Link>
              </motion.article>

              <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={fadeUp} className="group cursor-pointer">
                <Link href="/blog/frontera-mental-misticismo" className="block">
                  <div className="aspect-[4/3] bg-[#E8E2D2] mb-6 overflow-hidden rounded-sm relative">
                     <div className="w-full h-full bg-[radial-gradient(circle_at_bottom_left,#E8E2D2,#D5CFC1)] group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-[#2B2A29]/5" />
                  </div>
                  <div className="flex gap-4 items-baseline mb-3">
                    <span className="font-mono text-[10px] tracking-widest text-[#7A3B22] uppercase">Psicología y Fe</span>
                    <span className="font-mono text-[10px] text-[#2B2A29]/40">5 min de lectura</span>
                  </div>
                  <h4 className="font-serif text-2xl text-[#100F0D] group-hover:text-[#7A3B22] transition-colors mb-3">La frontera mental del misticismo</h4>
                  <p className="font-light text-[#2B2A29]/70 text-sm leading-relaxed">
                    Creerse un instrumento de Dios lo situó en una frontera peligrosa. Al dejar de confesarse por sentir "unión directa" con lo divino, selló su condena a muerte frente a un tribunal inflexible.
                  </p>
                </Link>
              </motion.article>

            </div>
          </div>

        </div>

        {/* AUTHOR & BOOK PROMO SECTION */}
        <section className="bg-[#100F0D] text-[#E8E2D2] py-24 px-6 mt-12 relative overflow-hidden">
           {/* Textura de fondo sutil */}
           <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#E8E2D2_1px,transparent_1px)]" style={{ backgroundSize: "40px 40px" }} />
           
           <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <span className="font-sans text-[10px] text-[#C1533B] font-bold tracking-[0.3em] uppercase block mb-4">Sobre la Autora</span>
                <h3 className="font-serif text-4xl mb-6 leading-tight">Patricia Enciso Patiño</h3>
                <p className="font-light text-[#E8E2D2]/60 text-sm leading-relaxed mb-6">
                  PhD en Historia Social por la Universidad Federal Fluminense (Río de Janeiro) y Magíster en Historia de la Universidad Nacional de Colombia. Ha dedicado gran parte de su vida a investigar archivos coloniales, rescatando del silencio historias perdidas en los márgenes de la Inquisición.
                </p>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-[1px] bg-[#C1533B]" />
                  <span className="font-mono text-xs text-[#E8E2D2]/40 italic">Investigadora Principal</span>
                </div>
              </motion.div>

              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-[#1A1918] p-10 border border-[#E8E2D2]/10 flex flex-col items-center text-center rounded-sm"
              >
                <div className="bg-[#C1533B]/10 p-4 rounded-full mb-6">
                  <BookOpen className="text-[#C1533B]" size={32} />
                </div>
                <h4 className="font-serif text-2xl mb-4">Del desierto a la hoguera</h4>
                <p className="font-light text-sm text-[#E8E2D2]/50 mb-8 max-w-sm">
                  Adquiere el libro completo y sumérgete en los folios inquisitoriales que revelan la verdad sobre Joseph Ximénez.
                </p>
                <button className="w-full md:w-auto px-8 py-4 bg-[#E8E2D2] text-[#100F0D] text-xs font-bold uppercase tracking-widest hover:bg-[#C1533B] hover:text-[#E8E2D2] transition-colors rounded-sm">
                  Comprar Libro
                </button>
              </motion.div>
           </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
