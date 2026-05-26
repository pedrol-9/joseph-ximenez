"use client";

// import { CardCarousel } from "./components/CardCarousel"; // Ocultado de la UI - registrado en TODO.md
// import { ArtistGallery } from "./components/ArtistGallery"; // Ocultado de la UI - registrado en TODO.md

export default function GaleriaPage() {
  return (
    <main className="relative min-h-screen font-sans overflow-x-hidden selection:bg-[#C1533B] selection:text-[#100F0D] flex flex-col items-center justify-center" style={{ background: "#100F0D", color: "#DDD8CF" }}>
      <div className="text-center p-8">
        <p className="text-[#E8E2D2]/40 italic font-serif text-lg">La galería se encuentra temporalmente inactiva.</p>
      </div>
    </main>
  );
}
