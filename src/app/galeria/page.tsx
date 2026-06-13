"use client";

import React from "react";
import { CardCarousel } from "./components/CardCarousel";
import { ArtistGallery } from "./components/ArtistGallery";
import { InteractiveMap } from "@/app/(home)/components/InteractiveMap";
 
export default function GaleriaPage() {
  return (
    <main className="relative min-h-screen font-sans overflow-x-hidden selection:bg-accent selection:text-bg-primary flex flex-col bg-bg-primary text-text-primary transition-colors duration-300">
      <div id="ermitanos" className="w-full pt-20 flex flex-col">
        <CardCarousel />
      </div>
      <ArtistGallery />
      <div className="w-full border-t border-white/5" />
      <InteractiveMap />
    </main>
  );
}
