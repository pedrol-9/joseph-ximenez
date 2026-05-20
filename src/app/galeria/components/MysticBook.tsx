"use client";

import React, { useState, useEffect, useRef } from "react";
import NextImage from "next/image";
import { ChevronLeft, ChevronRight, BookOpen, Maximize, Minimize } from "lucide-react";
import HTMLFlipBook from "react-pageflip";
import Lottie from "lottie-react";

const BASE = "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/conmemoracion_jx_edicion_digital_png/";
const PW = 420;
const PH = 670;

const PAGES = [
  `${BASE}01.webp`,
  `${BASE}02.webp`,
  `${BASE}03.webp`,
  `${BASE}04.webp`,
  `${BASE}05.webp`,
  `${BASE}06.webp`,
  `${BASE}07.webp`,
  `${BASE}08.webp`,
  `${BASE}09.webp`,
  `${BASE}10.webp`,
  `${BASE}11.webp`,
  null // Contraportada (Placeholder)
];

const Page = React.forwardRef<HTMLDivElement, { image: string | null; index: number; isCover?: boolean }>((props, ref) => {
  return (
    <div className={`page bg-[#0a0908] overflow-hidden relative ${props.isCover ? 'hard' : ''}`} ref={ref}>
      {props.image ? (
        <NextImage
          src={props.image}
          alt={`Page ${props.index}`}
          fill
          unoptimized={true}
          style={{ objectFit: "cover" }}
          priority={true}
          draggable={false}
        />
      ) : (
        <div className="w-full h-full bg-[#0a0908] flex items-center justify-center flex-col gap-6 p-8 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(193,83,59,0.1)_0%,transparent_70%)]" />
          <div className="w-12 h-12 border border-[#C1533B]/30 rounded-full flex items-center justify-center mb-4">
            <span className="font-serif italic text-[#C1533B] text-xl">J</span>
          </div>
          <p className="font-serif italic text-[#E8E2D2]/50 text-center max-w-[200px] leading-relaxed">
            "En el silencio más profundo, se escucha la verdad."
          </p>
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#C1533B] mt-12">
            FIN
          </span>
        </div>
      )}

      {/* Sombra interna para dar profundidad al centro del libro */}
      {!props.isCover && (
        <div
          className="absolute inset-y-0 w-8 pointer-events-none"
          style={{
            background: props.index % 2 === 0
              ? 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 100%)'
              : 'linear-gradient(to left, rgba(0,0,0,0.15) 0%, transparent 100%)',
            left: props.index % 2 === 0 ? 0 : 'auto',
            right: props.index % 2 !== 0 ? 0 : 'auto'
          }}
        />
      )}
    </div>
  );
});
Page.displayName = 'Page';

export function MysticBook() {
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bookState, setBookState] = useState<"cover" | "open" | "back">("cover");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const bookRef = useRef<any>(null);
  const containerRef = useRef<HTMLElement>(null);
  const scrollPosRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    // Precargar TODAS las páginas antes de quitar el skeleton loader
    let loadedCount = 0;
    const totalImages = PAGES.filter(src => src !== null).length; // Solo contar páginas reales

    if (totalImages === 0) {
      setReady(true);
      return;
    }

    let isReady = false;

    const checkReady = () => {
      if (isReady) return;
      loadedCount++;
      if (loadedCount >= totalImages) {
        isReady = true;
        setReady(true);
      }
    };

    PAGES.forEach(src => {
      if (!src) return;
      const img = new window.Image();
      // Es vital asignar los eventos ANTES del src para evitar fallos en caché de móviles
      img.onload = checkReady;
      img.onerror = checkReady;
      img.src = src;
    });

    // Fallback de seguridad: Si la red móvil falla o bloquea algo, mostramos el libro sí o sí a los 5 segundos
    const timeoutId = setTimeout(() => {
      if (!isReady) {
        isReady = true;
        setReady(true);
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Prevenir scroll en el body y restaurar posición al salir de pantalla completa
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (scrollPosRef.current !== null) {
        // Usar requestAnimationFrame asegura que el DOM se haya repintado
        // y la altura original de la página haya vuelto antes de hacer scroll.
        requestAnimationFrame(() => {
          window.scrollTo({ top: scrollPosRef.current as number, behavior: "instant" });
          scrollPosRef.current = null;
        });
      }
    }
    return () => { document.body.style.overflow = ""; };
  }, [isFullscreen]);

  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [showPinchHint, setShowPinchHint] = useState(false);
  const [pinchData, setPinchData] = useState(null);

  useEffect(() => {
    // Detectar móvil para filtrar páginas
    const handleResize = () => setIsMobileScreen(window.innerWidth < 840);
    handleResize(); // Check initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch Lottie JSON
  useEffect(() => {
    fetch("/pinch.json")
      .then((res) => res.json())
      .then((data) => setPinchData(data))
      .catch((err) => console.error("Error loading Lottie JSON:", err));
  }, []);

  // Mostrar el hint animado de 3 segundos solo cuando entra en fullscreen móvil
  useEffect(() => {
    if (isFullscreen && isMobileScreen && pinchData) {
      setShowPinchHint(true);
      const timer = setTimeout(() => setShowPinchHint(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setShowPinchHint(false);
    }
  }, [isFullscreen, isMobileScreen, pinchData]);

  // Escuchar si el usuario sale de pantalla completa (ej: presionando ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!(document.fullscreenElement || (document as any).webkitFullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  const onFlip = (e: any) => {
    const page = e.data;
    if (page === 0) {
      setBookState("cover");
    } else if (page >= displayedPages.length - 1) {
      setBookState("back");
    } else {
      setBookState("open");
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement && !(document as any).webkitFullscreenElement && !isFullscreen) {
        if (containerRef.current) {
          scrollPosRef.current = window.scrollY;
          
          if (isMobileScreen) {
            setIsFullscreen(true); // Evitar API nativa en móviles para permitir Zoom
          } else if (containerRef.current.requestFullscreen) {
            await containerRef.current.requestFullscreen();
          } else if ((containerRef.current as any).webkitRequestFullscreen) {
            await (containerRef.current as any).webkitRequestFullscreen();
          } else {
            setIsFullscreen(true);
          }
        }
      } else {
        if (isMobileScreen && isFullscreen) {
          setIsFullscreen(false);
        } else if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else {
          setIsFullscreen(false);
        }
      }
    } catch (err) {
      console.error("Error toggling fullscreen", err);
      setIsFullscreen(!isFullscreen);
    }
  };

  const getTransformClass = () => {
    if (isPortrait) return "translate-x-0";
    if (bookState === "cover") return "max-[872px]:translate-x-0 min-[872px]:-translate-x-[210px]";
    if (bookState === "back") return "max-[872px]:translate-x-0 min-[872px]:translate-x-[210px]";
    return "translate-x-0";
  };

  const displayedPages = isMobileScreen ? PAGES.filter((_, i) => i !== 1) : PAGES;

  return (
    <section
      id="mystic-book"
      ref={containerRef}
      className={`w-full flex flex-col items-center justify-center overflow-hidden ${
        isFullscreen ? "fixed inset-0 z-[150] h-[100dvh] bg-[#0A0908] py-4 px-2 overflow-auto" : "relative py-20 md:py-32 px-4"
      }`}
      style={{ background: "#0A0908" }}>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(193,83,59,0.07)_0%,transparent_65%)]" />

      {isFullscreen && isMobileScreen && (
        <style dangerouslySetInnerHTML={{ __html: `
          .mystic-flip-book, .mystic-flip-book * {
            touch-action: auto !important;
          }
        `}} />
      )}

      {/* Overlay Profesional Lottie (Pinch to Zoom) */}
      {showPinchHint && pinchData && (
        <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none animate-in fade-in duration-500">
          <div className="w-64 h-64 md:w-80 md:h-80 opacity-90 drop-shadow-[0_0_30px_rgba(193,83,59,0.3)]">
            <Lottie animationData={pinchData} loop={true} />
          </div>
        </div>
      )}

      <div className={`relative z-10 text-center max-w-2xl ${isFullscreen ? "hidden" : "mb-12"}`}>
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

      {!ready || !mounted ? (
        <div className="relative z-10 mx-auto flex justify-center w-full overflow-hidden" style={{ maxWidth: PW }}>
          <div className="w-full bg-[#111] border border-white/5 shadow-2xl flex flex-col items-center justify-center gap-6 animate-pulse relative" style={{ aspectRatio: `${PW} / ${PH}` }}>
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/40 to-transparent" />
            <BookOpen size={40} className="text-[#C1533B]/50 mb-2" />
            <div className="w-6 h-6 border-2 border-[#C1533B]/30 border-t-[#C1533B] rounded-full animate-spin" />
            <span className="font-mono text-[10px] text-[#E8E2D2]/50 tracking-[0.2em] uppercase text-center px-4">
              Restaurando Archivo<br />Histórico...
            </span>
          </div>
        </div>
      ) : (
        <div className={`relative z-10 mx-auto flex justify-center w-full overflow-visible transition-transform duration-700 ease-in-out origin-center ${getTransformClass()} ${isFullscreen ? "scale-100 md:scale-[1.3] lg:scale-[1.45] xl:scale-[1.5] mb-6 md:mt-[100px] md:mb-[120px] lg:mt-[150px] lg:mb-[170px] xl:mt-[168px] xl:mb-[190px]" : "scale-100 mb-0"}`}>
          {/* @ts-ignore */}
          <HTMLFlipBook
            key={isMobileScreen ? "mobile-book" : "desktop-book"}
            width={PW}
            height={PH}
            size="stretch"
            minWidth={315}
            maxWidth={PW}
            minHeight={400}
            maxHeight={PH}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            useMouseEvents={!isMobileScreen}
            clickEventForward={false}
            className="mystic-flip-book shadow-2xl"
            ref={bookRef}
            usePortrait={true}
            drawShadow={true}
            flippingTime={1000}
            swipeDistance={isMobileScreen ? 99999 : 30}
            onFlip={onFlip}
            onChangeOrientation={(e: any) => setIsPortrait(e.data === 'portrait')}
          >
            {displayedPages.map((src, i) => (
              <Page
                key={src ? `${src}-${i}` : `blank-${i}`}
                image={src}
                index={i}
                isCover={i === 0 || i === displayedPages.length - 1}
              />
            ))}
          </HTMLFlipBook>
        </div>
      )}

      <div className={`flex items-center justify-center ${isFullscreen ? "relative z-[150] w-auto bg-[#0A0908]/90 px-3 py-3 md:px-4 md:py-3 rounded-full border border-[#E8E2D2]/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-xl gap-6" : "gap-6 relative z-10 mt-6"}`}>
        
        <button onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
          className={`group flex items-center justify-center rounded-full text-[#E8E2D2] transition-colors ${isFullscreen ? "w-12 h-12 md:w-14 md:h-14 bg-white/5 hover:bg-white/10" : "gap-2 px-5 py-2.5 border border-[#E8E2D2]/10 hover:border-[#C1533B]/50 text-[#E8E2D2]/50 hover:text-[#E8E2D2] bg-[#0A0908]/80 backdrop-blur-md"}`}>
          <ChevronLeft size={isFullscreen ? 24 : 15} className="group-hover:-translate-x-0.5 transition-transform" />
          {!isFullscreen && <span className="font-mono text-[11px] tracking-widest uppercase hidden md:inline">Anterior</span>}
        </button>
        
        <button onClick={() => bookRef.current?.pageFlip()?.flipNext()}
          className={`group flex items-center justify-center rounded-full text-[#E8E2D2] transition-colors ${isFullscreen ? "w-12 h-12 md:w-14 md:h-14 bg-white/5 hover:bg-white/10" : "gap-2 px-5 py-2.5 border border-[#E8E2D2]/10 hover:border-[#C1533B]/50 text-[#E8E2D2]/50 hover:text-[#E8E2D2] bg-[#0A0908]/80 backdrop-blur-md"}`}>
          {!isFullscreen && <span className="font-mono text-[11px] tracking-widest uppercase hidden md:inline">Siguiente</span>}
          <ChevronRight size={isFullscreen ? 24 : 15} className="group-hover:translate-x-0.5 transition-transform" />
        </button>

        <button onClick={toggleFullscreen}
          className="flex group items-center justify-center w-10 h-10 border border-[#E8E2D2]/10 hover:border-[#C1533B]/50 rounded-full text-[#E8E2D2]/50 hover:text-[#E8E2D2] transition-colors bg-[#0A0908]/50 backdrop-blur-sm"
          title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
        >
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </button>
      </div>

    </section>
  );
}
