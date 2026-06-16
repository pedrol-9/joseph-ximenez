"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronRight, ArrowRight, BookOpen, Quote } from "lucide-react";
import Link from "next/link";
import { blogArticles } from "@/data/blogData";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const articleImages: Record<string, string> = {
  "hallazgo-folio-22": "/blog/manuscrito.png",
  "auto-de-fe-1688": "/blog/autodefe.png",
  "frontera-mental-misticismo": "/blog/misticismo.png",
  "ermitano-siglo-xvii": "/blog/candelaria.png",
  "esculpiendo-silencio": "/blog/rostro-joseph.jpeg",
  "meditadores-del-desierto": "/blog/meditadores.jpg",
  "la-senal-del-pajaro": "/blog/pajaro.png",
  "palacio-inquisicion-cartagena": "/blog/tribunal.png",
};

export default function BlogPage() {
  const featuredArticle = blogArticles[0];

  return (
    <div className="min-h-screen bg-bg-primary pt-32 text-text-primary selection:bg-accent selection:text-bg-primary relative transition-colors duration-300">

      {/* HEADER */}
      <header className="mb-16 flex flex-col items-center text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="font-sans text-[10px] tracking-[0.4em] uppercase text-terracotta mb-6 font-bold"
        >
          Revista de Investigación e Historia
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="font-serif text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-text-primary mb-8"
        >
          Ecos del <br /><span className="italic text-terracotta">Desierto</span>
        </motion.h1>
      </header>

      <div className="max-w-3xl mx-auto px-6">

        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {/* FULL CONMEMORATIVE ARTICLE */}
            {featuredArticle && (
              <div className="mb-24">
                <header className="mb-14 text-center max-w-2xl mx-auto">
                  <div className="flex justify-center items-center gap-3 mb-6">
                    <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-terracotta font-bold">
                      {featuredArticle.category}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-text-primary/20" />
                    <span className="font-mono text-[10px] text-text-secondary">
                      {featuredArticle.date} · {featuredArticle.readTime}
                    </span>
                  </div>
                  
                  <h2 className="font-serif text-[clamp(1.6rem,4.2vw,2.5rem)] md:text-[clamp(2rem,4.8vw,3rem)] leading-[1.2] text-text-primary font-medium tracking-tight">
                    {featuredArticle.title}
                  </h2>
                  
                  <div className="w-12 h-px bg-terracotta/30 mx-auto mt-8" />
                </header>

                <div className="flex flex-col gap-6 md:gap-8 font-sans text-base md:text-lg text-text-primary/85 leading-relaxed font-light">
                  {/* Letra Capitular para el primer párrafo */}
                  <p>
                    <span className="float-left text-7xl font-serif text-terracotta leading-[0.8] pr-3 pt-1 select-none font-bold">
                      {featuredArticle.content[0].charAt(0)}
                    </span>
                    {featuredArticle.content[0].slice(1)}
                  </p>

                  {featuredArticle.content.slice(1).map((paragraph, idx) => {
                    if (paragraph === "[ESPACIO PARA IMAGEN]") {
                      const imageSrc = articleImages[featuredArticle.slug] || "";
                      
                      if (!imageSrc) return null;

                      return (
                        <div key={idx} className="my-10 group/img">
                          <div className="overflow-hidden rounded-sm border border-stone/10 shadow-xl bg-sand/20 p-2">
                            <img 
                              src={imageSrc} 
                              alt={featuredArticle.title} 
                              className="w-full aspect-video object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                            />
                          </div>
                          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-stone/50 mt-4 text-center italic">
                            Ilustración conceptual: {featuredArticle.title}
                          </p>
                        </div>
                      );
                    }
                    return <p key={idx}>{paragraph}</p>;
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* AUTHOR & BOOK PROMO SECTION - PREMIUM EDITORIAL DESIGN */}
      <section className="px-6 py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Tarjeta flotante estilo revista */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bg-bg-card border border-border-theme rounded-sm shadow-2xl relative overflow-hidden flex flex-col md:flex-row"
          >
            {/* Decoración de la tarjeta */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-terracotta to-terracotta/80" />
            <div className="absolute -right-24 -top-24 text-text-primary/5 rotate-12 pointer-events-none">
               <Quote size={240} />
            </div>

            {/* Mitad Autora */}
            <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border-theme relative z-10">
              <span className="font-sans text-[10px] text-terracotta font-bold tracking-[0.3em] uppercase block mb-6 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-terracotta" /> Sobre la Autora
              </span>
              <h3 className="font-serif text-4xl mb-6 text-text-primary">Patricia Enciso Patiño</h3>
              <p className="font-light text-text-primary/70 text-base leading-relaxed mb-8">
                PhD en Historia Social por la Universidad Federal Fluminense y Magíster en Historia. Ha dedicado su vida a investigar archivos coloniales, rescatando del silencio historias perdidas en los márgenes de la Inquisición en América Latina.
              </p>
              <div className="flex gap-4 items-center mt-auto">
                <div className="w-10 h-[1px] bg-terracotta" />
                <span className="font-mono text-xs text-text-primary/40 uppercase tracking-widest">Investigadora Principal</span>
              </div>
            </div>

            {/* Mitad Libro */}
            <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center items-start relative z-10 bg-[radial-gradient(ellipse_at_bottom_right,var(--bg-primary),var(--bg-card))]">
              <div className="bg-terracotta/10 p-4 rounded-full mb-8">
                <BookOpen className="text-terracotta" size={32} />
              </div>
              <h4 className="font-serif text-3xl md:text-4xl mb-6 text-text-primary leading-tight">
                Del desierto <br/>a la hoguera
              </h4>
              <p className="font-light text-base text-text-primary/70 mb-10">
                La obra fundamental de Patricia Enciso Patiño que desentierra los folios inquisitoriales que revelan la verdad sobre Joseph Ximénez.
              </p>
              <div className="px-6 py-4 border border-terracotta/30 text-terracotta text-xs font-mono uppercase tracking-widest rounded-sm">
                Edición de Colección (1995)
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EXACT USER WAVE */}
      {/* EXACT USER WAVE - NO CROP, RESPONSIVE HEIGHT */}
      <div className="w-full overflow-hidden leading-[0] bg-bg-primary relative -mb-[2px] z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="block w-full h-[100px] md:h-[200px] lg:h-[320px]">
          <path fill="#050505" fillOpacity="1" d="M0,96L48,96C96,96,192,96,288,112C384,128,480,160,576,160C672,160,768,128,864,128C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <div className="w-full h-[5px] bg-[#050505] -mt-[1px]" />
      </div>

    </div>
  );
}
