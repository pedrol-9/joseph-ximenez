"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import NextImage from "next/image";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

type P = string | null;
const BASE = "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/conmemoracion_jx_edicion_digital_png/";
const PW = 420;
const PH = 670;
const DUR = 800;

const SPREADS: [P, P][] = [
  [null,            `${BASE}01.webp`],
  [`${BASE}02.webp`, `${BASE}03.webp`],
  [`${BASE}04.webp`, `${BASE}05.webp`],
  [`${BASE}06.webp`, `${BASE}07.webp`],
  [`${BASE}08.webp`, `${BASE}09.webp`],
  [`${BASE}10.webp`, `${BASE}11.webp`],
];

function Face({ src }: { src: P }) {
  const [loaded, setLoaded] = useState(false);

  // Reset loaded state whenever src changes
  useEffect(() => { setLoaded(false); }, [src]);

  if (!src)
    return <div style={{ width: "100%", height: "100%", background: "#0e0d0b" }} />;

  return (
    <div style={{ width: "100%", height: "100%", background: "#0a0908", position: "relative" }}>
      {/* Placeholder shown while image loads */}
      {!loaded && (
        <div style={{
          position: "absolute", inset: 0, background: "#111",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: 28, height: 28,
            border: "2px solid rgba(193,83,59,0.25)",
            borderTopColor: "#C1533B",
            borderRadius: "50%",
            animation: "spin 0.9s linear infinite",
          }} />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <NextImage
        src={src}
        alt=""
        width={PW}
        height={PH}
        style={{
          objectFit: "cover",
          display: "block",
          width: "100%",
          height: "100%",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        onLoad={() => setLoaded(true)}
        quality={85}
        priority={false}
      />
    </div>
  );
}

export function MysticBook() {
  const [idx,       setIdx]       = useState(0);
  const [flipping,  setFlipping]  = useState(false);
  const [flipDir,   setFlipDir]   = useState<"fwd" | "bwd">("fwd");
  const [busy,      setBusy]      = useState(false);
  const [ready,     setReady]     = useState(false);
  const flipRef  = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3000);
    // Load cover first (triggers ready state)
    const cover = new window.Image();
    cover.src = `${BASE}01.webp`;
    cover.onload = cover.onerror = () => { setReady(true); clearTimeout(t); };
    // Preload ALL remaining images in background so navigation is instant
    SPREADS.flat().filter((u): u is string => !!u && u !== `${BASE}01.webp`).forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
    return () => { clearTimeout(t); clearTimeout(timerRef.current); };
  }, []);

  // Trigger CSS transition AFTER the flip element mounts (two rAF = guaranteed two frames)
  useEffect(() => {
    if (!flipping || !flipRef.current) return;
    const el = flipRef.current;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transform = flipDir === "fwd" ? "rotateY(-180deg)" : "rotateY(180deg)";
    }));
  }, [flipping, flipDir]);

  const flip = useCallback((dir: "fwd" | "bwd") => {
    if (busy) return;
    const next = dir === "fwd" ? idx + 1 : idx - 1;
    if (next < 0 || next >= SPREADS.length) return;
    setBusy(true);
    setFlipDir(dir);
    setFlipping(true);
    timerRef.current = setTimeout(() => {
      setIdx(next);
      setFlipping(false);
      setBusy(false);
    }, DUR + 60);
  }, [busy, idx]);

  const [cL, cR] = SPREADS[idx];
  const ni = flipDir === "fwd" ? idx + 1 : idx - 1;
  const valid = ni >= 0 && ni < SPREADS.length;
  const [nL, nR] = valid ? SPREADS[ni] : [null, null];

  // What each base layer shows:
  // forward: left=cL(static), right=nR(revealed under flip)
  // backward: left=nL(revealed under flip), right=cR(static)
  const baseL = flipping && flipDir === "bwd" ? nL : cL;
  const baseR = flipping && flipDir === "fwd" ? nR : cR;
  const flipFront = flipDir === "fwd" ? cR : cL;
  const flipBack  = flipDir === "fwd" ? nL : nR;

  const shad = (side: "L" | "R") =>
    `linear-gradient(to ${side === "L" ? "right" : "left"}, rgba(0,0,0,0.25) 0%, transparent 50%)`;

  return (
    <section id="mystic-book"
      className="relative w-full flex flex-col items-center justify-center py-20 md:py-32 px-4"
      style={{ background: "#0A0908" }}>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(193,83,59,0.07)_0%,transparent_65%)]" />

      <div className="relative z-10 mb-12 text-center max-w-2xl">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[#C1533B] mb-4">
          <BookOpen size={12} /> Edición Digital Conmemorativa
        </span>
        <h2 className="font-serif text-[clamp(2rem,6vw,4rem)] text-[#E8E2D2] leading-[1.1] mb-3">
          El Libro Místico
        </h2>
        <p className="text-[#E8E2D2]/50 text-base font-light">
          Navega por las páginas de la edición conmemorativa de Joseph Ximénez.
        </p>
      </div>

      {!ready && (
        <div className="relative z-10 flex items-center justify-center" style={{ height: PH }}>
          <div className="flex flex-col items-center gap-3">
            <div className="w-7 h-7 border-2 border-[#C1533B]/30 border-t-[#C1533B] rounded-full animate-spin" />
            <span className="font-mono text-[10px] text-[#E8E2D2]/30 tracking-widest uppercase">Cargando…</span>
          </div>
        </div>
      )}

      {ready && (
        <div className="hidden min-[860px]:flex relative z-10 flex-col items-center gap-10">
          {/* Book container — perspective here, NO overflow:hidden */}
          <div style={{ position: "relative", width: PW * 2, height: PH,
            perspective: "1400px",
            boxShadow: "0 40px 120px rgba(0,0,0,0.85), 0 8px 32px rgba(0,0,0,0.5)" }}>

            {/* Base left */}
            <div style={{ position: "absolute", top: 0, left: 0, width: PW, height: PH }}>
              <Face src={baseL} />
            </div>

            {/* Base right */}
            <div style={{ position: "absolute", top: 0, left: PW, width: PW, height: PH }}>
              <Face src={baseR} />
            </div>

            {/* Flipping page — CSS 3D, no overflow:hidden, no Framer Motion */}
            {flipping && (
              <div ref={flipRef} style={{
                position: "absolute",
                top: 0,
                left: flipDir === "fwd" ? PW : 0,
                width: PW,
                height: PH,
                transformOrigin: flipDir === "fwd" ? "left center" : "right center",
                transformStyle: "preserve-3d",
                transform: "rotateY(0deg)",
                transition: `transform ${DUR}ms cubic-bezier(0.645,0.045,0.355,1)`,
                zIndex: 10,
              }}>
                {/* Front face */}
                <div style={{ position: "absolute", inset: 0,
                  backfaceVisibility: "hidden",
                  // @ts-ignore
                  WebkitBackfaceVisibility: "hidden" }}>
                  <Face src={flipFront} />
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
                    background: shad(flipDir === "fwd" ? "L" : "R") }} />
                </div>
                {/* Back face */}
                <div style={{ position: "absolute", inset: 0,
                  backfaceVisibility: "hidden",
                  // @ts-ignore
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)" }}>
                  <Face src={flipBack} />
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
                    background: shad(flipDir === "fwd" ? "R" : "L") }} />
                </div>
              </div>
            )}

            {/* Spine */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: PW - 1, width: 1,
              background: "rgba(255,255,255,0.07)", pointerEvents: "none", zIndex: 20 }} />
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <button onClick={() => flip("bwd")} disabled={idx === 0 || busy} aria-label="Anterior"
              className="group flex items-center gap-2 px-5 py-2.5 border border-[#E8E2D2]/10 hover:border-[#C1533B]/50 rounded-full text-[#E8E2D2]/50 hover:text-[#E8E2D2] disabled:opacity-20 transition-all">
              <ChevronLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="font-mono text-[11px] tracking-widest uppercase">Anterior</span>
            </button>
            <div className="flex gap-2">
              {SPREADS.map((_, i) => (
                <button key={i} aria-label={`Spread ${i+1}`}
                  onClick={() => { if (!busy) { setIdx(i); setFlipping(false); } }}
                  className={`rounded-full transition-all duration-300 ${i===idx?"w-2.5 h-2.5 bg-[#C1533B]":"w-1.5 h-1.5 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>
            <button onClick={() => flip("fwd")} disabled={idx === SPREADS.length-1 || busy} aria-label="Siguiente"
              className="group flex items-center gap-2 px-5 py-2.5 border border-[#E8E2D2]/10 hover:border-[#C1533B]/50 rounded-full text-[#E8E2D2]/50 hover:text-[#E8E2D2] disabled:opacity-20 transition-all">
              <span className="font-mono text-[11px] tracking-widest uppercase">Siguiente</span>
              <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {ready && (
        <div className="min-[860px]:hidden relative z-10 w-full max-w-md flex flex-col items-center gap-5">
          <div style={{ aspectRatio: `${PW}/${PH}` }} className="relative w-full border border-white/5 shadow-2xl">
            <Face src={cR} />
          </div>
          <div className="flex items-center justify-between w-full px-1">
            <button onClick={() => flip("bwd")} disabled={idx===0||busy} aria-label="Anterior"
              className="p-3 rounded-full border border-white/10 hover:border-[#C1533B]/50 text-[#E8E2D2]/60 hover:text-[#E8E2D2] disabled:opacity-20 transition-all">
              <ChevronLeft size={20} />
            </button>
            <span className="font-mono text-xs text-[#E8E2D2]/40 tabular-nums">{idx+1} / {SPREADS.length}</span>
            <button onClick={() => flip("fwd")} disabled={idx===SPREADS.length-1||busy} aria-label="Siguiente"
              className="p-3 rounded-full border border-white/10 hover:border-[#C1533B]/50 text-[#E8E2D2]/60 hover:text-[#E8E2D2] disabled:opacity-20 transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
      <div className="relative z-10 mt-16 w-px h-14 bg-gradient-to-b from-[#C1533B]/30 to-transparent" />
    </section>
  );
}
