"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { blogArticles } from "@/data/blogData";
import { notFound } from "next/navigation";

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const article = blogArticles.find(a => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-[#F4F1EA] pt-32 pb-24 text-[#2B2A29] selection:bg-[#7A3B22] selection:text-[#F4F1EA]">
        <article className="max-w-3xl mx-auto px-6">
          
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#7A3B22] hover:-translate-x-2 transition-transform mb-12">
            <ChevronLeft size={14} /> Volver al archivo
          </Link>

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

            {article.content.slice(1).map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </motion.div>

        </article>
      </main>
    </>
  );
}
