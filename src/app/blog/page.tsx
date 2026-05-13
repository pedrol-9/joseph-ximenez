"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronRight, ArrowRight, BookOpen, Quote } from "lucide-react";
import Link from "next/link";
import { blogArticles } from "@/data/blogData";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const articleImages: Record<string, string> = {
  "hallazgo-folio-22": "/blog/manuscrito.png",
  "auto-de-fe-1688": "/blog/autodefe.png",
  "frontera-mental-misticismo": "/blog/misticismo.png",
  "ermitano-siglo-xvii": "/blog/candelaria.png",
  "esculpiendo-silencio": "/blog/escultura.png",
  "meditadores-del-desierto": "/blog/meditadores.jpg",
  "la-senal-del-pajaro": "/blog/pajaro.png",
  "palacio-inquisicion-cartagena": "/blog/tribunal.png",
};

export default function BlogPage() {
  const featuredArticle = blogArticles[0];
  const regularArticles = blogArticles.slice(1);

  return (
    <div className="min-h-screen bg-[#F4F1EA] pt-32 text-[#2B2A29] selection:bg-[#7A3B22] selection:text-[#F4F1EA] relative">

      {/* HEADER */}
      <header className="mb-16 flex flex-col items-center text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#7A3B22] mb-6 font-bold"
        >
          Revista de Investigación e Historia
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="font-serif text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-[#100F0D] mb-8"
        >
          Ecos del <br /><span className="italic text-[#7A3B22]">Desierto</span>
        </motion.h1>
      </header>

      <div className="max-w-7xl mx-auto px-6">

        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {/* MAIN FEATURE */}
            {featuredArticle && (
              <div className="mb-24 border-b border-[#2B2A29]/10 pb-24">
                <Link href={`/blog/${featuredArticle.slug}`} className="group block">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    <div className="lg:col-span-8 overflow-hidden rounded-sm relative shadow-2xl aspect-[16/9] md:aspect-[21/9]">
                      <img 
                        src={articleImages[featuredArticle.slug]} 
                        alt={featuredArticle.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-[#2B2A29]/10 group-hover:bg-transparent transition-colors duration-700" />
                    </div>
                    
                    <div className="lg:col-span-4 pl-0 lg:pl-4 border-l-0 lg:border-l-2 border-[#7A3B22]">
                      <span className="font-sans text-[10px] font-bold text-[#7A3B22] uppercase tracking-widest mb-4 block">
                        {featuredArticle.category} · {featuredArticle.readTime}
                      </span>
                      <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6 group-hover:text-[#7A3B22] transition-colors text-[#100F0D]">
                        {featuredArticle.title}
                      </h2>
                      <p className="font-light text-lg text-[#2B2A29]/70 leading-relaxed mb-8">
                        {featuredArticle.content[0].substring(0, 180)}...
                      </p>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#7A3B22] group-hover:translate-x-2 transition-transform">
                        Leer artículo completo <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* GRID OF REMAINING ARTICLES */}
            {regularArticles.length > 0 && (
              <div className="mb-24">
                <div className="flex justify-between items-end mb-12 border-b border-[#2B2A29]/10 pb-4">
                  <h3 className="font-serif text-3xl text-[#100F0D]">Archivo Histórico</h3>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#2B2A29]/40 flex items-center gap-1">
                    {regularArticles.length} {regularArticles.length === 1 ? 'artículo' : 'artículos'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  {regularArticles.map((article, index) => (
                    <motion.article 
                      key={article.slug}
                      initial="hidden" 
                      whileInView="visible" 
                      viewport={{ once: true, margin: "-10%" }} 
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } }
                      }} 
                      className="group cursor-pointer flex flex-col"
                    >
                      <Link href={`/blog/${article.slug}`} className="block flex-grow">
                        <div className="aspect-[4/3] bg-[#E8E2D2] mb-6 overflow-hidden rounded-sm relative shadow-md">
                          <img 
                            src={articleImages[article.slug]} 
                            alt={article.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                          />
                          <div className="absolute inset-0 bg-[#2B2A29]/10 group-hover:bg-transparent transition-colors" />
                        </div>
                        <div className="flex justify-between items-baseline mb-4">
                          <span className="font-mono text-[10px] tracking-widest text-[#7A3B22] uppercase">{article.category}</span>
                          <span className="font-mono text-[10px] text-[#2B2A29]/40">{article.readTime}</span>
                        </div>
                        <h4 className="font-serif text-2xl text-[#100F0D] group-hover:text-[#7A3B22] transition-colors mb-4 line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="font-light text-[#2B2A29]/70 text-sm leading-relaxed line-clamp-3 mb-6">
                          {article.content[0]}
                        </p>
                      </Link>
                      <Link href={`/blog/${article.slug}`} className="mt-auto inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#7A3B22] opacity-0 group-hover:opacity-100 transition-opacity">
                        Leer más <ArrowRight size={12} />
                      </Link>
                    </motion.article>
                  ))}
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
            className="bg-[#E8E2D2] border border-[#2B2A29]/10 rounded-sm shadow-2xl relative overflow-hidden flex flex-col md:flex-row"
          >
            {/* Decoración de la tarjeta */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7A3B22] to-[#C1533B]" />
            <div className="absolute -right-24 -top-24 text-[#2B2A29]/5 rotate-12 pointer-events-none">
               <Quote size={240} />
            </div>

            {/* Mitad Autora */}
            <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#2B2A29]/10 relative z-10">
              <span className="font-sans text-[10px] text-[#7A3B22] font-bold tracking-[0.3em] uppercase block mb-6 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-[#7A3B22]" /> Sobre la Autora
              </span>
              <h3 className="font-serif text-4xl mb-6 text-[#100F0D]">Patricia Enciso Patiño</h3>
              <p className="font-light text-[#2B2A29]/70 text-base leading-relaxed mb-8">
                PhD en Historia Social por la Universidad Federal Fluminense y Magíster en Historia. Ha dedicado su vida a investigar archivos coloniales, rescatando del silencio historias perdidas en los márgenes de la Inquisición en América Latina.
              </p>
              <div className="flex gap-4 items-center mt-auto">
                <div className="w-10 h-[1px] bg-[#C1533B]" />
                <span className="font-mono text-xs text-[#2B2A29]/40 uppercase tracking-widest">Investigadora Principal</span>
              </div>
            </div>

            {/* Mitad Libro */}
            <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center items-start relative z-10 bg-[radial-gradient(ellipse_at_bottom_right,#F4F1EA,#E8E2D2)]">
              <div className="bg-[#7A3B22]/10 p-4 rounded-full mb-8">
                <BookOpen className="text-[#7A3B22]" size={32} />
              </div>
              <h4 className="font-serif text-3xl md:text-4xl mb-6 text-[#100F0D] leading-tight">
                Del desierto <br/>a la hoguera
              </h4>
              <p className="font-light text-base text-[#2B2A29]/70 mb-10">
                Adquiere el libro completo y sumérgete en los 29 folios inquisitoriales que revelan la verdad sobre Joseph Ximénez.
              </p>
              <button className="px-8 py-4 bg-[#100F0D] text-[#F4F1EA] text-xs font-bold uppercase tracking-widest hover:bg-[#7A3B22] transition-colors duration-300 rounded-sm flex items-center gap-3 shadow-xl cursor-pointer">
                Comprar Ejemplar <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EXACT USER WAVE */}
      {/* EXACT USER WAVE - NO CROP, RESPONSIVE HEIGHT */}
      <div className="w-full overflow-hidden leading-[0] bg-[#F4F1EA] relative -mb-[2px] z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="block w-full h-[100px] md:h-[200px] lg:h-[320px]">
          <path fill="#050505" fillOpacity="1" d="M0,96L48,96C96,96,192,96,288,112C384,128,480,160,576,160C672,160,768,128,864,128C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <div className="w-full h-[5px] bg-[#050505] -mt-[1px]" />
      </div>

    </div>
  );
}
