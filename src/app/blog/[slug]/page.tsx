"use client";

import { use } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronLeft, Share2, Link2, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { blogArticles } from "@/data/blogData";
import { notFound } from "next/navigation";

const articleImages: Record<string, string> = {};

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
        className="fixed top-0 left-0 right-0 h-1 bg-terracotta origin-left z-50"
        style={{ scaleX }}
      />

      <main className="min-h-screen bg-bg-primary pt-32 pb-24 text-text-primary selection:bg-accent selection:text-bg-primary transition-colors duration-300">
        <article className="max-w-3xl mx-auto px-6 relative w-full">
          
          {/* BREADCRUMBS */}
          <nav className="flex items-center flex-wrap gap-2 text-[10px] uppercase tracking-widest font-bold text-text-secondary mb-8">
            <Link href="/" className="hover:text-terracotta transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-terracotta transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-terracotta">{article.category}</span>
          </nav>

          <Link href="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-terracotta hover:-translate-x-1.5 transition-transform mb-12">
            <ChevronLeft size={14} /> Volver al archivo
          </Link>

          {/* FLOATING SHARE BUTTONS (Only on wide screens to prevent overlapping on standard laptops) */}
          <div className="hidden xl:flex flex-col items-center gap-4 absolute -left-24 top-48">
            <span className="text-[10px] uppercase tracking-widest font-bold text-text-secondary mb-2 rotate-180" style={{ writingMode: 'vertical-rl' }}>Compartir</span>
            <div className="w-px h-8 bg-border-theme mb-2" />
            <button onClick={copyLink} className="p-2 rounded-full border border-border-theme text-text-secondary hover:text-accent hover:border-accent hover:bg-bg-card transition-all cursor-pointer group" title="Copiar Enlace">
              <Link2 size={16} className="group-hover:scale-110 transition-transform" />
            </button>
            <button onClick={shareArticle} className="p-2 rounded-full border border-border-theme text-text-secondary hover:text-accent hover:border-accent hover:bg-bg-card transition-all cursor-pointer group" title="Compartir">
              <Share2 size={16} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <header className="mb-14 text-center max-w-2xl mx-auto">
            <div className="flex justify-center items-center gap-3 mb-6">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-terracotta font-bold">
                {article.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-text-primary/20" />
              <span className="font-mono text-[10px] text-text-secondary">
                {article.date} · {article.readTime}
              </span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(1.6rem,4.2vw,2.5rem)] md:text-[clamp(2rem,4.8vw,3rem)] leading-[1.2] text-text-primary font-medium tracking-tight"
            >
              {article.title}
            </motion.h1>
            
            <div className="w-12 h-px bg-terracotta/30 mx-auto mt-8" />
          </header>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6 md:gap-8 font-sans text-base md:text-lg text-text-primary/85 leading-relaxed font-light"
          >
            {/* Letra Capitular para el primer párrafo */}
            <p>
              <span className="float-left text-7xl font-serif text-terracotta leading-[0.8] pr-3 pt-1 select-none font-bold">
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
                    <div key={idx} className="w-full aspect-video bg-bg-card/30 border border-border-theme rounded-sm my-12 flex flex-col items-center justify-center text-text-secondary">
                      <span className="font-mono text-xs uppercase tracking-widest mb-2">Espacio para Ilustración</span>
                      <span className="font-serif italic text-sm">{article.title}</span>
                    </div>
                  );
                }

                return (
                  <div key={idx} className="my-10 group/img">
                    <div className="overflow-hidden rounded-sm border border-border-theme shadow-xl bg-bg-card/20 p-2">
                      <img 
                        src={imageSrc} 
                        alt={article.title} 
                        className="w-full aspect-video object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                      />
                    </div>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-text-secondary mt-4 text-center italic">
                      Ilustración conceptual: {article.title}
                    </p>
                  </div>
                );
              }
              return <p key={idx}>{paragraph}</p>;
            })}

            {/* COMPARTIR (Móvil/Bottom) */}
            <div className="mt-16 pt-8 border-t border-border-theme flex flex-col sm:flex-row items-center justify-between gap-6">
              <span className="font-mono text-[10px] tracking-widest uppercase text-text-secondary">¿Te resultó interesante?</span>
              <div className="flex gap-3">
                <button onClick={copyLink} className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-theme text-text-secondary hover:text-accent hover:border-accent hover:bg-bg-card transition-all text-xs font-bold uppercase tracking-widest cursor-pointer">
                  <Link2 size={14} /> Copiar Enlace
                </button>
                <button onClick={shareArticle} className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-theme text-text-secondary hover:text-accent hover:border-accent hover:bg-bg-card transition-all text-xs font-bold uppercase tracking-widest cursor-pointer">
                  <Share2 size={14} /> Compartir
                </button>
              </div>
            </div>

          </motion.div>

        </article>

        {/* ARTÍCULOS RELACIONADOS */}
        {relatedArticles.length > 0 && (
          <div className="max-w-5xl mx-auto px-6 mt-32 border-t border-border-theme pt-16">
            <div className="flex items-center justify-between mb-12">
              <h3 className="font-serif text-3xl text-text-primary">Sigue Leyendo</h3>
              <Link href="/blog" className="text-[10px] uppercase tracking-widest font-bold text-accent flex items-center gap-2 hover:translate-x-2 transition-transform">
                Ver Todo <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {relatedArticles.map((relArticle) => (
                <Link href={`/blog/${relArticle.slug}`} key={relArticle.slug} className="group block">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start p-6 rounded-sm border border-border-theme bg-bg-card hover:bg-bg-primary hover:border-accent/30 transition-colors shadow-sm">
                    {/* Thumbnail */}
                    <div className="w-full sm:w-32 aspect-square shrink-0 overflow-hidden rounded-sm relative bg-bg-primary/50 border border-border-theme flex items-center justify-center text-accent/40 group-hover:text-accent/60 transition-colors duration-500">
                      <BookOpen size={28} />
                    </div>
                    {/* Contenido */}
                    <div className="flex flex-col justify-center h-full">
                      <span className="font-sans text-[10px] tracking-widest uppercase text-accent font-bold mb-2">
                        {relArticle.category}
                      </span>
                      <h4 className="font-serif text-xl leading-tight text-text-primary group-hover:text-accent transition-colors mb-3">
                        {relArticle.title}
                      </h4>
                      <p className="font-mono text-[10px] text-text-secondary flex items-center gap-2">
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
      
      {/* EXACT USER WAVE */}
      {/* EXACT USER WAVE - NO CROP, RESPONSIVE HEIGHT */}
      <div className="w-full overflow-hidden leading-0 bg-bg-primary relative -mb-0.5 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="block w-full h-25 md:h-50 lg:h-80">
          <path fill="#050505" fillOpacity="1" d="M0,96L48,96C96,96,192,96,288,112C384,128,480,160,576,160C672,160,768,128,864,128C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <div className="w-full h-1.25 bg-[#050505] -mt-px" />
      </div>
    </>
  );
}
