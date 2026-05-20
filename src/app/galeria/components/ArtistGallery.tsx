"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────── */
interface BlobItem { pathname: string; url: string; }
interface Perspective { url: string; label: string; isMain: boolean; sortKey: string; }
interface ObraGroup { number: number; perspectives: Perspective[]; }

/* ─────────────────────────────────────────────
   ARTISTS DATA
   ───────────────────────────────────────────── */
const artists = [
  {
    id: "santiago",
    name: "Santiago Rodríguez Ruiz",
    role: "Alfarero · Ráquira, Boyacá",
    instagram: "https://www.instagram.com/el_sr_rodriguez/",
    instagramHandle: "@el_sr_rodriguez",
    photoFilename: "foto_sr_rdriguez.png",
    technique: "Modelado manual en arcilla roja de Ráquira. Cada pieza es esculpida a mano mediante la técnica ancestral de placas y desbaste, decorada con engobes minerales naturales y cocida en hornos tradicionales a más de 900°C.",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "eduardo",
    name: "Eduardo Rodríguez Ataide",
    role: "Escultor · Ráquira, Boyacá",
    technique: "Misma técnica ancestral de modelado en arcilla roja. Eduardo trabaja con arcillas locales tamizadas, esculpiendo rostros y figuras que evocan la memoria histórica del Desierto de la Candelaria.",
    bio: "Creador visual de las obras que ilustran la historia de Joseph Ximénez. Su arte aporta una dimensión profunda y estética a la narrativa histórica, conectando la tradición alfarera de Ráquira con la preservación de la memoria de Joseph Ximénez.",
  },
];

/* ─────────────────────────────────────────────
   OBRA METADATA (Placeholder titles until user provides real ones)
   ───────────────────────────────────────────── */
const obraMeta: Record<number, { title: string; date: string; description: string }> = {
  1: {
    title: "Obra I",
    date: "2024",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
  },
  2: {
    title: "Obra II",
    date: "2024",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
  },
  4: {
    title: "Obra IV",
    date: "2024",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
  },
  5: {
    title: "Obra V",
    date: "2024",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
  },
  6: {
    title: "Obra VI",
    date: "2024",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
  },
  7: {
    title: "Obra VII",
    date: "2024",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
  },
  8: {
    title: "Obra VIII",
    date: "2024",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
  },
  9: {
    title: "Obra IX",
    date: "2024",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
  },
};

/* ─────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────── */
function groupBlobsByObra(blobs: BlobItem[]): ObraGroup[] {
  const sfBlobs = blobs.filter(b => b.pathname.toLowerCase().includes("_sf"));

  const groups = new Map<number, Perspective[]>();

  for (const blob of sfBlobs) {
    const match = blob.pathname.match(/obra_(\d+)([a-d])?_sf/i);
    if (!match) continue;

    const obraNum = parseInt(match[1]);
    const variant = match[2] || "";
    const isMain = !variant;

    if (!groups.has(obraNum)) groups.set(obraNum, []);
    groups.get(obraNum)!.push({
      url: blob.url,
      label: isMain ? "Principal" : `Vista ${variant.toUpperCase()}`,
      isMain,
      sortKey: variant || "0",
    });
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => {
      if (a === 5) return 1;
      if (b === 5) return -1;
      return a - b;
    })
    .map(([num, perspectives]) => ({
      number: num,
      perspectives: perspectives.sort((a, b) => {
        if (a.isMain && !b.isMain) return -1;
        if (!a.isMain && b.isMain) return 1;
        return a.sortKey.localeCompare(b.sortKey);
      }),
    }));
}

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */
export function ArtistGallery() {
  const [activeArtist, setActiveArtist] = useState(0);
  const [blobs, setBlobs] = useState<BlobItem[]>([]);
  const [activePerspective, setActivePerspective] = useState<Record<number, number>>({});
  const [lightbox, setLightbox] = useState<{ obraNumber: number; perspIdx: number } | null>(null);

  // Fetch blobs from API
  useEffect(() => {
    fetch("/api/artworks")
      .then(r => r.json())
      .then(d => setBlobs(d.blobs || []))
      .catch(() => {});
  }, []);

  const obras = groupBlobsByObra(blobs);
  const artist = artists[activeArtist];

  // Find artist photo
  const artistPhoto = blobs.find(b =>
    b.pathname.toLowerCase().includes("foto_sr")
  );

  // Get active perspective index for an obra
  const getActiveIdx = (obraNum: number) => activePerspective[obraNum] || 0;

  // Lightbox navigation
  const lightboxObra = lightbox ? obras.find(o => o.number === lightbox.obraNumber) : null;

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const navigateLightbox = useCallback((dir: number) => {
    if (!lightbox || !lightboxObra) return;
    const newIdx = lightbox.perspIdx + dir;
    if (newIdx >= 0 && newIdx < lightboxObra.perspectives.length) {
      setLightbox({ ...lightbox, perspIdx: newIdx });
    }
  }, [lightbox, lightboxObra]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, closeLightbox, navigateLightbox]);

  return (
    <section
      id="arte"
      className="w-full font-sans py-24"
      style={{ background: "#100F0D", color: "#DDD8CF" }}
    >
      {/* ═══════════════════════════════════════
          SECTION HEADER
          ═══════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <span className="font-mono text-[#C1533B] text-[10px] md:text-xs tracking-[0.4em] uppercase block mb-4">
            Colección de Arte
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-tight text-[#E8E2D2] mb-6">
            Exhibición de{" "}
            <em className="italic text-[#C1533B]">Artistas</em>
          </h2>
          <div className="w-16 h-[1px] bg-[#C1533B]/40 mx-auto" />
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════
          ARTIST TABS
          ═══════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="flex justify-center gap-2 md:gap-4">
          {artists.map((a, i) => (
            <button
              key={a.id}
              onClick={() => setActiveArtist(i)}
              className={`relative px-5 md:px-8 py-3 md:py-4 rounded-full text-xs md:text-sm font-mono tracking-widest uppercase transition-all duration-300 border ${
                activeArtist === i
                  ? "bg-[#C1533B]/15 border-[#C1533B]/50 text-[#E8E2D2]"
                  : "bg-transparent border-[#E8E2D2]/10 text-[#E8E2D2]/40 hover:text-[#E8E2D2]/70 hover:border-[#E8E2D2]/20"
              }`}
            >
              {a.name.split(" ")[0]}
              {activeArtist === i && (
                <motion.div
                  layoutId="artistIndicator"
                  className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#C1533B] rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          ARTIST BIO HEADER
          ═══════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={artist.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-6xl mx-auto px-6 mb-24">
            <div className="bg-[#0A0A0A] border border-[#E8E2D2]/5 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -left-20 -top-20 w-[200px] h-[200px] bg-[#C1533B]/5 blur-[80px] rounded-full pointer-events-none" />

              {/* Artist Photo */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-[#C1533B]/30 overflow-hidden shrink-0 relative bg-[#1A1918]">
                {artistPhoto && activeArtist === 0 ? (
                  <Image
                    src={artistPhoto.url}
                    alt={artist.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-serif text-3xl text-[#C1533B]/40 italic">
                      {artist.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Artist Info */}
              <div className="flex-1 text-center md:text-left relative z-10">
                <h3 className="font-serif text-2xl md:text-3xl text-[#E8E2D2] mb-2">
                  {artist.name}
                </h3>
                <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#C1533B] block mb-4">
                  {artist.role}
                </span>
                <p className="text-sm md:text-base font-light leading-relaxed text-[#E8E2D2]/60 mb-4 max-w-2xl">
                  {artist.bio}
                </p>
                <p className="text-xs md:text-sm font-light leading-relaxed text-[#E8E2D2]/40 italic mb-6 max-w-2xl">
                  {artist.technique}
                </p>

                {artist.instagram && (
                  <a
                    href={artist.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#1A1918] hover:bg-[#C1533B]/10 border border-[#E8E2D2]/10 hover:border-[#C1533B]/30 rounded-full transition-all duration-300 group"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#C1533B] group-hover:scale-110 transition-transform">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                    <span className="font-mono text-xs tracking-wide text-[#E8E2D2]/80">
                      {artist.instagramHandle}
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              OBRAS LIST
              ═══════════════════════════════════════ */}
          {activeArtist === 0 && obras.length > 0 && (
            <div className="max-w-6xl mx-auto px-6 space-y-32">
              {obras.map((obra, obraIdx) => {
                const meta = obraMeta[obra.number] || {
                  title: `Obra ${obra.number}`,
                  date: "2024",
                  description: "Escultura en arcilla roja de Ráquira.",
                };
                const activeIdx = getActiveIdx(obra.number);
                const activePersp = obra.perspectives[activeIdx];

                return (
                  <motion.div
                    key={obra.number}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    {/* Obra Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C1533B]">
                        {String(obraIdx + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 h-[1px] bg-[#E8E2D2]/5" />
                      <span className="font-mono text-[10px] tracking-widest uppercase text-[#E8E2D2]/30">
                        {obra.perspectives.length}{" "}
                        {obra.perspectives.length === 1
                          ? "vista"
                          : "vistas"}
                      </span>
                    </div>

                    {/* Obra Content: Image + Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                      {/* Main Image */}
                      <div className="lg:col-span-7">
                        <div
                          className="relative aspect-square bg-[#0A0A0A] rounded-xl overflow-hidden border border-[#E8E2D2]/5 cursor-pointer group shadow-2xl"
                          onClick={() =>
                            setLightbox({
                              obraNumber: obra.number,
                              perspIdx: activeIdx,
                            })
                          }
                        >
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activePersp.url}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="w-full h-full relative"
                            >
                              <Image
                                src={activePersp.url}
                                alt={`${meta.title} - ${activePersp.label}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 60vw"
                                className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.03]"
                              />
                            </motion.div>
                          </AnimatePresence>

                          {/* Expand hint */}
                          <div className="absolute bottom-4 right-4 bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#C1533B]/20 px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <span className="font-mono text-[9px] tracking-widest text-[#E8E2D2]/80 uppercase">
                              Ampliar
                            </span>
                          </div>
                        </div>

                        {/* Thumbnails */}
                        {obra.perspectives.length > 1 && (
                          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                            {obra.perspectives.map((p, pIdx) => (
                              <button
                                key={p.url}
                                onClick={() =>
                                  setActivePerspective(prev => ({
                                    ...prev,
                                    [obra.number]: pIdx,
                                  }))
                                }
                                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-300 ${
                                  pIdx === activeIdx
                                    ? "border-[#C1533B] shadow-[0_0_12px_rgba(193,83,59,0.3)]"
                                    : "border-[#E8E2D2]/10 hover:border-[#E8E2D2]/30 opacity-50 hover:opacity-80"
                                }`}
                              >
                                <Image
                                  src={p.url}
                                  alt={p.label}
                                  fill
                                  sizes="80px"
                                  className="object-contain bg-[#0A0A0A] p-1"
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Info Panel */}
                      <div className="lg:col-span-5 flex flex-col justify-center lg:sticky lg:top-32">
                        <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#C1533B] block mb-3">
                          {meta.date} · Arcilla Roja
                        </span>
                        <h3 className="font-serif text-3xl md:text-4xl text-[#E8E2D2] mb-4 leading-tight">
                          {meta.title}
                        </h3>
                        <p className="text-sm md:text-base font-light leading-relaxed text-[#E8E2D2]/60 mb-6">
                          {meta.description}
                        </p>

                        {/* Active perspective label */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-[1px] bg-[#C1533B]/40" />
                          <span className="font-mono text-[10px] tracking-widest text-[#E8E2D2]/30 uppercase">
                            {activePersp.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Eduardo placeholder */}
          {activeArtist === 1 && (
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center py-20 border border-[#E8E2D2]/5 rounded-2xl bg-[#0A0A0A]">
                <span className="font-mono text-[#C1533B] text-xs tracking-[0.3em] uppercase block mb-4">
                  Próximamente
                </span>
                <p className="font-serif text-2xl text-[#E8E2D2]/40 italic">
                  El portafolio de Eduardo está en preparación
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ═══════════════════════════════════════
          LIGHTBOX
          ═══════════════════════════════════════ */}
      <AnimatePresence>
        {lightbox && lightboxObra && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all"
            >
              <X size={20} />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 z-10">
              <span className="font-mono text-xs text-white/40 tracking-widest">
                {lightbox.perspIdx + 1} / {lightboxObra.perspectives.length}
              </span>
            </div>

            {/* Navigation */}
            {lightbox.perspIdx > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
                className="absolute left-4 md:left-8 z-10 p-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all bg-black/40"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {lightbox.perspIdx < lightboxObra.perspectives.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
                className="absolute right-4 md:right-8 z-10 p-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all bg-black/40"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxObra.perspectives[lightbox.perspIdx].url}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-[90vw] h-[80vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxObra.perspectives[lightbox.perspIdx].url}
                alt="Vista ampliada"
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Perspective label */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
              <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">
                {lightboxObra.perspectives[lightbox.perspIdx].label}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
