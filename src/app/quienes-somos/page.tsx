"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, BookOpen } from "lucide-react";

export default function QuienesSomosPage() {
  const [activeBg, setActiveBg] = useState<"eduardo" | "patricia">("eduardo");
  const [hoveredPanel, setHoveredPanel] = useState<"eduardo" | "patricia" | null>(null);

  return (
    <main className="relative min-h-screen font-sans overflow-hidden bg-bg-primary text-text-primary selection:bg-accent selection:text-bg-primary transition-colors duration-500">
      
      {/* 1. DYNAMIC BACKGROUND COLOR-MORPHING BLOB LAYER (UNIFIED FOR DESKTOP & MOBILE) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Eduardo's Blur Blob (#4C6873) */}
        <motion.div
          animate={{
            scale: activeBg === "eduardo" ? 1.6 : 0.3,
            opacity: activeBg === "eduardo" ? 0.85 : 0,
            x: activeBg === "eduardo" ? "10%" : "-15%",
            y: activeBg === "eduardo" ? "-10%" : "0%",
          }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="absolute left-[-15%] top-[5%] w-[380px] md:w-[600px] h-[380px] md:h-[600px] rounded-full blur-[80px] md:blur-[110px]"
          style={{
            background: "radial-gradient(circle, #4C6873 0%, rgba(76,104,115,0) 70%)",
          }}
        />

        {/* Patricia's Blur Blob (#736A40) */}
        <motion.div
          animate={{
            scale: activeBg === "patricia" ? 1.6 : 0.3,
            opacity: activeBg === "patricia" ? 0.85 : 0,
            x: activeBg === "patricia" ? "-10%" : "15%",
            y: activeBg === "patricia" ? "10%" : "0%",
          }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="absolute right-[-15%] bottom-[5%] w-[380px] md:w-[600px] h-[380px] md:h-[600px] rounded-full blur-[80px] md:blur-[110px]"
          style={{
            background: "radial-gradient(circle, #736A40 0%, rgba(115,106,64,0) 70%)",
          }}
        />
      </div>

      {/* Grid de puntos sutiles */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #DDD8CF 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* HEADER MARGIN FOR NAVIGATION BAR */}
      <div className="h-20 w-full" />

      {/* CONTENT AREA */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24 flex flex-col items-center">
        
        {/* Page Title & Intro */}
        <header className="text-center mb-16 max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-mono text-terracotta text-[10px] md:text-xs tracking-[0.4em] uppercase block mb-3"
          >
            Detrás de la Memoria
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight"
          >
            ¿Quiénes Somos?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base font-light text-text-secondary mt-4 leading-relaxed"
          >
            Conoce a las mentes creativas e investigadoras que han hecho posible la recuperación histórica, el homenaje artístico y la preservación del legado del ermitaño Joseph Ximénez.
          </motion.p>
        </header>

        {/* DESKTOP SPLIT PANEL (Hidden on Mobile) */}
        <div className="hidden md:flex w-full min-h-[580px] h-[65vh] gap-6 items-stretch mb-12">
          
          {/* EDUARDO'S PANEL */}
          <motion.div
            onMouseEnter={() => {
              setHoveredPanel("eduardo");
              setActiveBg("eduardo");
            }}
            onMouseLeave={() => setHoveredPanel(null)}
            animate={{
              width: hoveredPanel === "eduardo" ? "56%" : hoveredPanel === "patricia" ? "44%" : "50%",
            }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={`relative rounded-2xl border transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 lg:p-12 cursor-pointer ${
              hoveredPanel === "eduardo"
                ? "border-[#4C6873]/50 bg-bg-card/35 backdrop-blur-md shadow-[0_20px_50px_rgba(76,104,115,0.15)]"
                : hoveredPanel === "patricia"
                ? "border-border-theme/40 bg-bg-card/10 opacity-55"
                : "border-border-theme bg-bg-card/25 backdrop-blur-xs"
            }`}
          >
            {/* Top decorative badge */}
            <div className="flex justify-between items-start">
              <span className="font-mono text-[9px] tracking-widest text-[#4C6873] uppercase font-semibold">
                [ 01 · Arte Alfarero ]
              </span>
              <Sparkles size={16} className={`text-terracotta/40 transition-transform duration-700 ${hoveredPanel === "eduardo" ? "rotate-45 scale-110" : ""}`} />
            </div>

            {/* Inner Content - Row-like setup on hover expansion */}
            <div className="flex flex-col lg:flex-row gap-8 items-center my-auto">
              
              {/* Sculpture Image */}
              <div className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden shrink-0 border border-border-theme shadow-2xl bg-bg-primary">
                <Image
                  src="/images/eduardo_sculpture.png"
                  alt="Escultura de barro de Eduardo Rodríguez"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 160px, 192px"
                  priority
                />
              </div>

              {/* Biography and Titles */}
              <div className="flex-1 text-left">
                <h2 className="font-serif text-2xl lg:text-3xl text-text-primary mb-2 font-medium tracking-tight">
                  Eduardo Rodríguez Ataide
                </h2>
                <p className="font-mono text-[10px] tracking-widest text-terracotta uppercase mb-4 font-semibold leading-relaxed">
                  Escultor de la obra en barro con estilos alfarero-artísticos propios de Ráquira.
                </p>
                <div className="text-xs lg:text-sm font-light text-text-secondary leading-relaxed max-w-md select-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </div>
              </div>
            </div>

            {/* Bottom meta */}
            <div className="flex justify-between items-center text-[10px] font-mono text-text-secondary/50">
              <span>RÁQUIRA, BOYACÁ</span>
              <span>ESTILO TRADICIONAL ANCESTRAL</span>
            </div>
          </motion.div>

          {/* PATRICIA'S PANEL */}
          <motion.div
            onMouseEnter={() => {
              setHoveredPanel("patricia");
              setActiveBg("patricia");
            }}
            onMouseLeave={() => setHoveredPanel(null)}
            animate={{
              width: hoveredPanel === "patricia" ? "56%" : hoveredPanel === "eduardo" ? "44%" : "50%",
            }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={`relative rounded-2xl border transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 lg:p-12 cursor-pointer ${
              hoveredPanel === "patricia"
                ? "border-[#736A40]/50 bg-bg-card/35 backdrop-blur-md shadow-[0_20px_50px_rgba(115,106,64,0.15)]"
                : hoveredPanel === "eduardo"
                ? "border-border-theme/40 bg-bg-card/10 opacity-55"
                : "border-border-theme bg-bg-card/25 backdrop-blur-xs"
            }`}
          >
            {/* Top decorative badge */}
            <div className="flex justify-between items-start">
              <span className="font-mono text-[9px] tracking-widest text-[#736A40] uppercase font-semibold">
                [ 02 · Investigación Histórica ]
              </span>
              <BookOpen size={16} className={`text-terracotta/40 transition-transform duration-700 ${hoveredPanel === "patricia" ? "scale-110" : ""}`} />
            </div>

            {/* Inner Content */}
            <div className="flex flex-col lg:flex-row gap-8 items-center my-auto">
              
              {/* Book Cover Image */}
              <div className="relative w-36 h-52 shrink-0 shadow-2xl rounded-sm overflow-hidden border border-border-theme/40 bg-bg-primary">
                <Image
                  src="/images/libro/PortadaLibro_1.jpg"
                  alt="Portada del libro Del desierto a la hoguera de Patricia Enciso"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="144px"
                  priority
                />
              </div>

              {/* Biography and Titles */}
              <div className="flex-1 text-left">
                <h2 className="font-serif text-2xl lg:text-3xl text-text-primary mb-2 font-medium tracking-tight">
                  Dra. Patricia Enciso Patiño
                </h2>
                <p className="font-mono text-[10px] tracking-widest text-terracotta uppercase mb-4 font-semibold leading-relaxed">
                  Investigadora y Escritora de &quot;Del Desierto a la Hoguera, 1995&quot;; Escritora del Artículo Conmemorativo.
                </p>
                <div className="text-xs lg:text-sm font-light text-text-secondary leading-relaxed max-w-md select-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </div>
              </div>
            </div>

            {/* Bottom meta */}
            <div className="flex justify-between items-center text-[10px] font-mono text-text-secondary/50">
              <span>UNIVERSIDAD FEDERAL FLUMINENSE</span>
              <span>PHD EN HISTORIA SOCIAL</span>
            </div>
          </motion.div>

        </div>

        {/* MOBILE LAYOUT (Stacked, visible on mobile only) */}
        <div className="md:hidden w-full flex flex-col gap-10 mb-12">
          
          {/* EDUARDO MOBILE */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            onViewportEnter={() => {
              if (window.innerWidth < 768) {
                setActiveBg("eduardo");
              }
            }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border-theme bg-bg-card/40 p-6 flex flex-col gap-6"
          >
            <div className="flex justify-between items-center">
              <span className="font-mono text-[9px] tracking-widest text-[#4C6873] uppercase font-bold">
                [ 01 · Arte Alfarero ]
              </span>
              <Sparkles size={14} className="text-terracotta/40" />
            </div>

            <div className="relative w-36 h-36 mx-auto rounded-xl overflow-hidden border border-border-theme bg-bg-primary shadow-xl">
              <Image
                src="/images/eduardo_sculpture.png"
                alt="Escultura de Eduardo Rodríguez"
                fill
                className="object-cover"
                sizes="144px"
              />
            </div>

            <div className="text-center">
              <h2 className="font-serif text-2xl text-text-primary mb-1">
                Eduardo Rodríguez Ataide
              </h2>
              <p className="font-mono text-[10px] tracking-wider text-terracotta uppercase mb-4 leading-relaxed">
                Escultor de la obra en barro con estilos alfarero-artísticos propios de Ráquira.
              </p>
              <p className="text-xs font-light text-text-secondary leading-relaxed select-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </motion.div>

          {/* PATRICIA MOBILE */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            onViewportEnter={() => {
              if (window.innerWidth < 768) {
                setActiveBg("patricia");
              }
            }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border-theme bg-bg-card/40 p-6 flex flex-col gap-6"
          >
            <div className="flex justify-between items-center">
              <span className="font-mono text-[9px] tracking-widest text-[#736A40] uppercase font-bold">
                [ 02 · Investigación Histórica ]
              </span>
              <BookOpen size={14} className="text-terracotta/40" />
            </div>

            <div className="relative w-28 h-40 mx-auto rounded-sm overflow-hidden border border-border-theme/40 bg-bg-primary shadow-xl">
              <Image
                src="/images/libro/PortadaLibro_1.jpg"
                alt="Libro Del Desierto a la Hoguera"
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>

            <div className="text-center">
              <h2 className="font-serif text-2xl text-text-primary mb-1">
                Dra. Patricia Enciso Patiño
              </h2>
              <p className="font-mono text-[10px] tracking-wider text-terracotta uppercase mb-4 leading-relaxed">
                Investigadora y Escritora de &quot;Del Desierto a la Hoguera, 1995&quot;; Escritora del Artículo Conmemorativo.
              </p>
              <p className="text-xs font-light text-text-secondary leading-relaxed select-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </motion.div>

        </div>

        {/* 3. SANTIAGO RODRÍGUEZ RUIZ - SLEEK PREMIUM BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full flex justify-center mt-6"
        >
          {/* Responsive container for badge: fits elegantly on desktop and centers on mobile */}
          <a
            href="https://www.instagram.com/el_sr_rodriguez/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col sm:flex-row items-center gap-4 px-6 py-4 rounded-2xl border border-border-theme bg-bg-card/75 backdrop-blur-md shadow-2xl hover:border-accent/40 hover:bg-bg-card transition-all duration-300 max-w-xl text-center sm:text-left cursor-pointer"
          >
            {/* Ambient indicator glow for the badge */}
            <div className="absolute inset-0 rounded-2xl bg-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Instagram Circle Icon with pottery-clay accent */}
            <div className="w-11 h-11 rounded-full bg-bg-primary border border-border-theme group-hover:border-accent/30 flex items-center justify-center shrink-0 shadow-lg text-terracotta group-hover:scale-105 transition-transform duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-6 transition-transform">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h4 className="font-serif text-sm font-medium text-text-primary tracking-wide">
                  Santiago Rodríguez Ruiz
                </h4>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary/50 hidden sm:inline-block" />
                <span className="font-mono text-[9px] tracking-wider text-text-secondary/70 uppercase hidden sm:inline-block">
                  Artista Alfarero
                </span>
              </div>
              <p className="text-[11px] text-text-secondary font-light mt-1 max-w-xs sm:max-w-none leading-relaxed select-text">
                Artista alfarero y abogado de Ráquira, Boyacá. Une la tradición del modelado de arcilla con la expresión moderna.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
                <span className="font-mono text-[10px] text-accent font-semibold">
                  @el_sr_rodriguez
                </span>
                <span className="font-mono text-[9px] text-text-secondary/40 font-light sm:hidden">
                  · Artista Alfarero
                </span>
              </div>
            </div>

            {/* Redirect arrow */}
            <div className="w-7 h-7 rounded-full bg-bg-primary/50 group-hover:bg-accent/15 flex items-center justify-center text-text-secondary group-hover:text-accent shrink-0 border border-border-theme/40 group-hover:border-accent/25 transition-all duration-300">
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        </motion.div>

      </div>
    </main>
  );
}
