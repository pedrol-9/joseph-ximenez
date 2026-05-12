"use client";

import { use } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronLeft, Share2, Link2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogArticles } from "@/data/blogData";
import { notFound } from "next/navigation";

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

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const article = blogArticles.find(a => a.slug === slug);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!article) {
    notFound();
  }

  let relatedArticles = blogArticles.filter(a => a.category === article.category && a.slug !== slug).slice(0, 2);
  if (relatedArticles.length < 2) {
    const additional = blogArticles.filter(a => a.slug !== slug && !relatedArticles.find(r => r.slug === a.slug)).slice(0, 2 - relatedArticles.length);
    relatedArticles = [...relatedArticles, ...additional];
  }

  const copyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert("Enlace copiado al portapapeles");
    }
  };

  const shareArticle = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: article.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      copyLink();
    }
  };

  return (
    <>
      {/* BARRA DE PROGRESO DE LECTURA */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#7A3B22] origin-left z-50"
        style={{ scaleX }}
      />

      <main className="min-h-screen bg-[#F4F1EA] pt-32 pb-24 text-[#2B2A29] selection:bg-[#7A3B22] selection:text-[#F4F1EA]">
        <article className="max-w-3xl mx-auto px-6 relative">
          
          {/* BREADCRUMBS */}
          <nav className="flex items-center flex-wrap gap-2 text-[10px] uppercase tracking-widest font-bold text-[#2B2A29]/40 mb-10">
            <Link href="/" className="hover:text-[#7A3B22] transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#7A3B22] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[#7A3B22]">{article.category}</span>
          </nav>

          <Link href="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#7A3B22] hover:-translate-x-2 transition-transform mb-12">
            <ChevronLeft size={14} /> Volver al archivo
          </Link>

          {/* FLOATING SHARE BUTTONS (Desktop) */}
          <div className="hidden lg:flex flex-col items-center gap-4 absolute -left-20 top-40">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#2B2A29]/40 mb-2 rotate-180" style={{ writingMode: 'vertical-rl' }}>Compartir</span>
            <div className="w-[1px] h-8 bg-[#2B2A29]/10 mb-2" />
            <button onClick={copyLink} className="p-2 rounded-full border border-[#2B2A29]/10 text-[#2B2A29]/40 hover:text-[#7A3B22] hover:border-[#7A3B22] hover:bg-[#E8E2D2] transition-all group" title="Copiar Enlace">
              <Link2 size={16} className="group-hover:scale-110 transition-transform" />
            </button>
            <button onClick={shareArticle} className="p-2 rounded-full border border-[#2B2A29]/10 text-[#2B2A29]/40 hover:text-[#7A3B22] hover:border-[#7A3B22] hover:bg-[#E8E2D2] transition-all group" title="Compartir">
              <Share2 size={16} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <header className="mb-16">
            <div className="flex gap-4 items-baseline mb-6 border-b border-[#2B2A29]/10 pb-4">
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#7A3B22] font-bold">
                {article.category}
              </span>
              <span className="font-mono text-[10px] text-[#2B2A29]/40">
                {article.date} · {article.readTime}
              </span>
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-tight text-[#100F0D]"
            >
              {article.title}
            </motion.h1>
          </header>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="prose prose-lg prose-p:font-light prose-p:text-[#2B2A29]/80 prose-p:leading-relaxed prose-p:mb-8"
          >
            {/* Letra Capitular para el primer párrafo */}
            <p>
              <span className="float-left text-7xl font-serif text-[#7A3B22] leading-[0.8] pr-2 pt-2">
                {article.content[0].charAt(0)}
              </span>
              {article.content[0].slice(1)}
            </p>

            {article.content.slice(1).map((paragraph, idx) => {
              if (paragraph === "[ESPACIO PARA IMAGEN]") {
                const imgKey = article.slug;
                const imageSrc = articleImages[imgKey] || "";
                
                if (!imageSrc) {
                  return (
                    <div key={idx} className="w-full aspect-video bg-[#E8E2D2]/50 border border-[#2B2A29]/10 rounded-sm my-12 flex flex-col items-center justify-center text-[#2B2A29]/40">
                      <span className="font-mono text-xs uppercase tracking-widest mb-2">Espacio para Ilustración</span>
                      <span className="font-serif italic text-sm">{article.title}</span>
                    </div>
                  );
                }

                return (
                  <div key={idx} className="my-12">
                    <img 
                      src={imageSrc} 
                      alt={article.title} 
                      className="w-full aspect-video object-cover rounded-sm shadow-2xl"
                    />
                    <p className="text-[10px] uppercase tracking-widest text-[#2B2A29]/40 mt-4 text-center">
                      Ilustración conceptual para "{article.title}"
                    </p>
                  </div>
                );
              }
              return <p key={idx}>{paragraph}</p>;
            })}

            {/* COMPARTIR (Móvil/Bottom) */}
            <div className="mt-20 pt-8 border-t border-[#2B2A29]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#2B2A29]/40">¿Te resultó interesante?</span>
              <div className="flex gap-3">
                <button onClick={copyLink} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#2B2A29]/10 text-[#2B2A29]/60 hover:text-[#7A3B22] hover:border-[#7A3B22] hover:bg-[#E8E2D2] transition-all text-xs font-bold uppercase tracking-widest">
                  <Link2 size={14} /> Copiar Enlace
                </button>
                <button onClick={shareArticle} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#2B2A29]/10 text-[#2B2A29]/60 hover:text-[#7A3B22] hover:border-[#7A3B22] hover:bg-[#E8E2D2] transition-all text-xs font-bold uppercase tracking-widest">
                  <Share2 size={14} /> Compartir
                </button>
              </div>
            </div>

          </motion.div>

        </article>

        {/* ARTÍCULOS RELACIONADOS */}
        {relatedArticles.length > 0 && (
          <div className="max-w-5xl mx-auto px-6 mt-32 border-t border-[#2B2A29]/10 pt-16">
            <div className="flex items-center justify-between mb-12">
              <h3 className="font-serif text-3xl text-[#100F0D]">Sigue Leyendo</h3>
              <Link href="/blog" className="text-[10px] uppercase tracking-widest font-bold text-[#7A3B22] flex items-center gap-2 hover:translate-x-2 transition-transform">
                Ver Todo <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {relatedArticles.map((relArticle) => (
                <Link href={`/blog/${relArticle.slug}`} key={relArticle.slug} className="group block">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start p-6 rounded-sm border border-[#2B2A29]/5 bg-[#F4F1EA] hover:bg-[#E8E2D2] hover:border-[#2B2A29]/10 transition-colors shadow-sm">
                    {/* Thumbnail */}
                    <div className="w-full sm:w-32 aspect-square shrink-0 overflow-hidden rounded-sm relative">
                      <img 
                        src={articleImages[relArticle.slug]} 
                        alt={relArticle.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    {/* Contenido */}
                    <div className="flex flex-col justify-center h-full">
                      <span className="font-sans text-[10px] tracking-widest uppercase text-[#7A3B22] font-bold mb-2">
                        {relArticle.category}
                      </span>
                      <h4 className="font-serif text-xl leading-tight text-[#100F0D] group-hover:text-[#7A3B22] transition-colors mb-3">
                        {relArticle.title}
                      </h4>
                      <p className="font-mono text-[10px] text-[#2B2A29]/40 flex items-center gap-2">
                        {relArticle.readTime}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>
    </>
  );
}
