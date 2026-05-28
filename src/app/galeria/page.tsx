"use client";

import React from "react";
import { CardCarousel } from "./components/CardCarousel";
import { ArtistGallery } from "./components/ArtistGallery";
import { MysticBook } from "./components/MysticBook";
 
export default function GaleriaPage() {
  return (
    <main className="relative min-h-screen font-sans overflow-x-hidden selection:bg-[#C1533B] selection:text-[#100F0D] flex flex-col" style={{ background: "#100F0D", color: "#DDD8CF" }}>
      <div id="ermitanos" className="w-full pt-20 flex flex-col">
        <CardCarousel />
      </div>
      <ArtistGallery />
      <div className="w-full border-t border-white/5" />
      <MysticBook />
    </main>
  );
}
