"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function QuienesSomosPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main className="relative min-h-screen font-sans overflow-hidden bg-bg-primary text-text-primary selection:bg-accent selection:text-bg-primary transition-colors duration-500">
      
      {/* 1. DYNAMIC BACKGROUND BLOB LAYER (SINGLE CENTERED BLUE GLOW) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            scale: isHovered ? 1.4 : 1.0,
            opacity: isHovered ? 0.6 : 0.2,
          }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full blur-[100px] md:blur-[150px]"
          style={{
            background: "radial-gradient(circle, #4C6873 0%, rgba(76,104,115,0) 70%)",
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
            className="text-base md:text-lg font-normal text-text-secondary mt-4 leading-relaxed"
          >
            Conoce a las mentes creativas e investigadoras que han hecho posible la recuperación histórica, el homenaje artístico y la preservación del legado del ermitaño Joseph Ximénez.
          </motion.p>
        </header>

        {/* DESKTOP SPLIT PANEL (Hidden on Mobile) */}
        <div className="hidden md:block relative w-full min-h-[580px] h-[65vh] mb-12">
          
          {/* EDUARDO'S PANEL */}
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "calc(50% - 12px)",
              zIndex: 10,
            }}
            className="rounded-2xl border border-border-theme bg-bg-card/25 backdrop-blur-xs overflow-hidden flex flex-col justify-between p-8 lg:p-12"
          >
            {/* Top decorative badge */}
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs md:text-sm tracking-widest text-[#4C6873] uppercase font-bold">
                [ 01 · Arte Alfarero ]
              </span>
            </div>

            {/* Inner Content - Restructured to full width header with image & description below */}
            <div className="flex flex-col gap-6 my-auto w-full">
              {/* Header inside card (Full Width) */}
              <div className="text-left w-full">
                <h2 className="font-serif text-2xl lg:text-3xl text-text-primary mb-2 font-medium tracking-tight text-left">
                  Eduardo Rodríguez Ataíde
                </h2>
                <p className="font-mono text-xs lg:text-sm tracking-widest text-terracotta uppercase font-bold leading-relaxed text-left">
                  Profesor Universitario Magister en Odontología, excatedrático de Antropología Médica y profesor de postgrado de UNICOC
                </p>
              </div>

              {/* Side-by-side content */}
              <div className="flex flex-col lg:flex-row gap-8 lg:items-start items-center w-full">
                {/* Sculpture Image */}
                <div className="relative w-36 h-52 shrink-0 rounded-2xl overflow-hidden border border-[#C1533B]/30 shadow-2xl bg-bg-card/20">
                  <Image
                    src="/obra_eduardo/joseph_ximenez_1.png"
                    alt="Escultura de Joseph Ximénez"
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>

                {/* Biography Description */}
                <div className="text-sm lg:text-base font-normal text-text-secondary leading-relaxed max-w-md select-text text-left">
                  Me interesa el revisionismo histórico, rescatar valores culturales de nuestra región, trabajar la arcilla para construir identidad y compartir mis reflexiones a través de la literatura, la pintura y la escultura.
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "calc(50% - 12px)",
              zIndex: 10,
            }}
            className="rounded-2xl border border-border-theme bg-bg-card/25 backdrop-blur-xs overflow-hidden flex flex-col justify-between p-8 lg:p-12"
          >
            {/* Top decorative badge */}
            <div className="flex justify-end items-start">
              <span className="font-mono text-xs md:text-sm tracking-widest text-[#4C6873] uppercase font-bold text-right">
                [ 02 · Investigación Histórica ]
              </span>
            </div>

            {/* Inner Content - Restructured to full width header with image & description below */}
            <div className="flex flex-col gap-6 my-auto w-full">
              {/* Header inside card (Full Width, Right aligned) */}
              <div className="text-right w-full">
                <h2 className="font-serif text-2xl lg:text-3xl text-text-primary mb-2 font-medium tracking-tight text-right">
                  Dra. Patricia Enciso Patiño
                </h2>
                <p className="font-mono text-xs lg:text-sm tracking-widest text-terracotta uppercase font-bold leading-relaxed text-right">
                  Investigadora y Escritora de &quot;Del Desierto a la Hoguera, 1995&quot;; Escritora del Artículo Conmemorativo.
                </p>
              </div>

              {/* Side-by-side content (Image on Right, Text on Left) */}
              <div className="flex flex-col lg:flex-row-reverse gap-8 lg:items-start items-center w-full">
                {/* Book Cover Image (Empty Placeholder) */}
                <div className="relative w-36 h-52 shrink-0 shadow-2xl rounded-sm overflow-hidden border border-border-theme/40 bg-bg-card/20 flex items-center justify-center">
                  <span className="font-mono text-[9px] text-text-secondary/20 uppercase tracking-widest">[ Libro ]</span>
                </div>

                {/* Biography Description (Right aligned text) */}
                <div className="text-sm lg:text-base font-normal text-text-secondary leading-relaxed select-text text-right flex-1">
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
                setIsHovered(true);
              }
            }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border-theme bg-bg-card/40 p-6 flex flex-col gap-6"
          >
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs tracking-widest text-[#4C6873] uppercase font-bold">
                [ 01 · Arte Alfarero ]
              </span>
            </div>

            <div className="relative w-28 h-40 mx-auto rounded-xl overflow-hidden border border-[#C1533B]/30 bg-bg-card/20 shadow-xl">
              <Image
                src="/obra_eduardo/joseph_ximenez_1.png"
                alt="Escultura de Joseph Ximénez"
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>

            <div className="text-center">
              <h2 className="font-serif text-2xl text-text-primary mb-1">
                Eduardo Rodríguez Ataide
              </h2>
              <p className="font-mono text-xs tracking-wider text-terracotta uppercase mb-4 font-bold leading-relaxed">
                Escultor de la obra en barro con estilos alfarero-artísticos propios de Ráquira.
              </p>
              <p className="text-sm font-normal text-text-secondary leading-relaxed select-text">
                Me interesa el revisionismo histórico, rescatar valores culturales de nuestra región, trabajar la arcilla para construir identidad y compartir mis reflexiones a través de la literatura, la pintura y la escultura.
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
                setIsHovered(true);
              }
            }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border-theme bg-bg-card/40 p-6 flex flex-col gap-6"
          >
            <div className="flex justify-end items-center">
              <span className="font-mono text-xs tracking-widest text-[#4C6873] uppercase font-bold text-right">
                [ 02 · Investigación Histórica ]
              </span>
            </div>

            <div className="relative w-28 h-40 mx-auto rounded-sm overflow-hidden border border-border-theme/40 bg-bg-card/20 shadow-xl flex items-center justify-center">
              <span className="font-mono text-[9px] text-text-secondary/20 uppercase tracking-widest">[ Libro ]</span>
            </div>

            <div className="text-center">
              <h2 className="font-serif text-2xl text-text-primary mb-1">
                Dra. Patricia Enciso Patiño
              </h2>
              <p className="font-mono text-xs tracking-wider text-terracotta uppercase mb-4 font-bold leading-relaxed">
                Investigadora y Escritora de &quot;Del Desierto a la Hoguera, 1995&quot;; Escritora del Artículo Conmemorativo.
              </p>
              <p className="text-sm font-normal text-text-secondary leading-relaxed select-text">
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
            className="group relative flex flex-col sm:flex-row items-center gap-6 px-8 py-5 rounded-2xl border border-border-theme bg-bg-card/75 backdrop-blur-md shadow-2xl hover:border-accent/40 hover:bg-bg-card transition-all duration-300 max-w-3xl text-center sm:text-left cursor-pointer"
          >
            {/* Ambient indicator glow for the badge */}
            <div className="absolute inset-0 rounded-2xl bg-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Instagram Circle Icon with pottery-clay accent */}
            <div className="w-12 h-12 rounded-full bg-bg-primary border border-border-theme group-hover:border-accent/30 flex items-center justify-center shrink-0 shadow-lg text-terracotta group-hover:scale-105 transition-transform duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-6 transition-transform">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <h4 className="font-serif text-base md:text-lg font-bold text-text-primary tracking-wide">
                  Santiago Rodríguez Ruiz
                </h4>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary/50 hidden sm:inline-block" />
                <span className="font-mono text-sm tracking-wider text-text-secondary/80 uppercase hidden sm:inline-block font-extrabold">
                  Artista Invitado
                </span>
              </div>
              <p className="text-sm md:text-base text-text-secondary font-normal mt-2 max-w-xs sm:max-w-none leading-relaxed select-text">
                Heredero de la tradición alfarera de Ráquira. Estudió Derecho que le permite una proyección social y ser líder joven de su municipio. Su obra es moderna sin traicionar sus raíces y está basada en una profunda reflexión y originalidad que le ha permitido traspasar fronteras.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <span className="font-mono text-xs md:text-sm text-accent font-bold">
                  @el_sr_rodriguez
                </span>
                <span className="font-mono text-xs md:text-sm text-text-secondary/50 font-bold sm:hidden">
                  · Artista Alfarero
                </span>
              </div>
            </div>

            {/* Redirect arrow */}
            <div className="w-8 h-8 rounded-full bg-bg-primary/50 group-hover:bg-accent/15 flex items-center justify-center text-text-secondary group-hover:text-accent shrink-0 border border-border-theme/40 group-hover:border-accent/25 transition-all duration-300">
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        </motion.div>

      </div>
    </main>
  );
}
