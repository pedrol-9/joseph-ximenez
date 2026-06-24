"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────── */
interface Perspective { url: string; label: string; isMain: boolean; sortKey: string; }
interface ObraGroup { number: number; perspectives: Perspective[]; }
interface Artist {
  id: string;
  name: string;
  role: string;
  photoFilename?: string;
  technique: string;
  bio: string;
}

/* ─────────────────────────────────────────────
   ARTISTS DATA
   ───────────────────────────────────────────── */
const artists: Artist[] = [
  {
    id: "eduardo",
    name: "Eduardo Rodríguez Ataide",
    role: "Escultor · Ráquira, Boyacá",
    photoFilename: "/obra_eduardo/joseph_ximenez_1.png",
    technique: "Técnica ancestral de modelado en arcilla roja. Eduardo trabaja con arcillas locales tamizadas, esculpiendo rostros y figuras que evocan la memoria histórica del Desierto de la Candelaria.",
    bio: "Creador visual de las obras que ilustran la historia de Joseph Ximénez. Su arte aporta una dimensión profunda y estética a la narrativa histórica, conectando la tradición alfarera de Ráquira con la preservación de la memoria de Joseph Ximénez.",
  },
];

/* ─────────────────────────────────────────────
   OBRA DATA & METADATA (Local images)
   ───────────────────────────────────────────── */
const eduardoObras: ObraGroup[] = [
  {
    number: 1,
    perspectives: [
      { url: "/obra_eduardo/joseph_ximenez_1.png", label: "Vista Principal", isMain: true, sortKey: "0" },
      { url: "/obra_eduardo/joseph_ximenez_2.png", label: "Vista Lateral Izquierda", isMain: false, sortKey: "a" },
      { url: "/obra_eduardo/joseph_ximenez_3.png", label: "Vista Lateral Derecha", isMain: false, sortKey: "b" },
      { url: "/obra_eduardo/joseph_ximenez_4.png", label: "Vista Posterior / Detalle", isMain: false, sortKey: "c" },
      { url: "/obra_eduardo/joseph_ximenez_5.png", label: "Detalle del Rostro", isMain: false, sortKey: "d" },
    ],
  },
];

const eduardoObraMeta: Record<number, { title: string; date: string; description: string }> = {
  1: {
    title: "Joseph Ximénez, Ermitaño del Desierto",
    date: "2026",
    description: "Representación tridimensional del místico y mártir Joseph Ximénez. Moldeada en arcilla local de Ráquira con la técnica tradicional de modelado manual, la obra reivindica la memoria del ermitaño que enfrentó a la Inquisición, capturando su mirada contemplativa y su espíritu indomable.",
  },
};

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */
export function ArtistGallery() {
  const [activeArtist] = useState(0);
  const [activePerspective, setActivePerspective] = useState<Record<number, number>>({});
  const [lightbox, setLightbox] = useState<{ obraNumber: number; perspIdx: number } | null>(null);

  const artist = artists[activeArtist];
  const obras = eduardoObras;
  const obraMeta = eduardoObraMeta;

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
      className="w-full font-sans py-24 transition-colors duration-300"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
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
          <h2 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-tight text-text-primary mb-6">
            Exhibición de{" "}
            <em className="italic text-[#C1533B]">Artistas</em>
          </h2>
          <div className="w-16 h-[1px] bg-[#C1533B]/40 mx-auto" />
        </motion.div>
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
            <div className="bg-bg-card border border-border-theme rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -left-20 -top-20 w-[200px] h-[200px] bg-[#C1533B]/5 blur-[80px] rounded-full pointer-events-none" />

              {/* Artist Photo */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-[#C1533B]/30 overflow-hidden shrink-0 relative bg-[#1A1918]">
                {artist.photoFilename ? (
                  <Image
                    src={artist.photoFilename}
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
                <h3 className="font-serif text-2xl md:text-3xl text-text-primary mb-2">
                  {artist.name}
                </h3>
                <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#C1533B] block mb-4">
                  {artist.role}
                </span>
                <p className="text-sm md:text-base font-light leading-relaxed text-text-secondary mb-4 max-w-2xl">
                  {artist.bio}
                </p>
                <p className="text-xs md:text-sm font-light leading-relaxed text-text-secondary/60 italic mb-6 max-w-2xl">
                  {artist.technique}
                </p>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              OBRAS LIST
              ═══════════════════════════════════════ */}
          {obras.length > 0 ? (
            <div className="max-w-6xl mx-auto px-6 space-y-32">
              {obras.map((obra, obraIdx) => {
                const meta = obraMeta[obra.number] || {
                  title: `Obra ${obra.number}`,
                  date: "2026",
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
                      <div className="flex-1 h-[1px] bg-border-theme" />
                      <span className="font-mono text-[10px] tracking-widest uppercase text-text-secondary/40">
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
                          className="relative aspect-square bg-[#0A0A0A] rounded-xl overflow-hidden border border-border-theme cursor-pointer group shadow-2xl"
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
                            <span className="font-mono text-[9px] tracking-widest text-text-primary/80 uppercase">
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
                                    : "border-border-theme hover:border-border-theme/40 opacity-50 hover:opacity-80"
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
                        <h3 className="font-serif text-3xl md:text-4xl text-text-primary mb-4 leading-tight">
                          {meta.title}
                        </h3>
                        <p className="text-sm md:text-base font-light leading-relaxed text-text-secondary mb-6">
                          {meta.description}
                        </p>

                        {/* Active perspective label */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-[1px] bg-[#C1533B]/40" />
                          <span className="font-mono text-[10px] tracking-widest text-text-secondary/40 uppercase">
                            {activePersp.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center py-20 border border-border-theme rounded-2xl bg-bg-card">
                <span className="font-mono text-[#C1533B] text-xs tracking-[0.3em] uppercase block mb-4">
                  Próximamente
                </span>
                <p className="font-serif text-2xl text-text-secondary/40 italic">
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
