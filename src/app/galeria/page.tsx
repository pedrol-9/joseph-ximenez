"use client";

import React from "react";
import { CardCarousel } from "./components/CardCarousel";
import { ArtistGallery } from "./components/ArtistGallery";
import { LugaresReferencia } from "./components/LugaresReferencia";
 
export default function GaleriaPage() {
  return (
    <main className="relative min-h-screen font-sans overflow-x-hidden selection:bg-accent selection:text-bg-primary flex flex-col bg-bg-primary text-text-primary transition-colors duration-300">
      {/* Spacer for navigation bar */}
      <div className="h-20 w-full" />
      
      <ArtistGallery />

      <LugaresReferencia />

      <div id="ermitanos" className="w-full pb-24 flex flex-col border-t border-border-theme/40 bg-transparent">
        <CardCarousel />
      </div>
    </main>
  );
}
