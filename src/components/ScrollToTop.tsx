"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ScrollToTop = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar en la página de inicio o en cualquier sección de la revista (blog)
  const shouldShowOnRoute = pathname === "/" || pathname?.startsWith("/blog") || pathname?.startsWith("/galeria");

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!shouldShowOnRoute) return null;

  // Adaptar colores del botón flotante según el tema de la ruta
  // (Inicio es de fondo oscuro, Blog es de fondo claro)
  const isDarkTheme = pathname === "/";
  const buttonBg = isDarkTheme 
    ? "bg-[#100F0D]/80 border-[#C1533B]/30 hover:border-[#C1533B] text-[#DDD8CF] hover:bg-[#C1533B]/15" 
    : "bg-[#F4F1EA]/80 border-[#7A3B22]/30 hover:border-[#7A3B22] text-[#2B2A29] hover:bg-[#7A3B22]/15";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 p-3.5 rounded-full border backdrop-blur-md shadow-2xl transition-all duration-300 flex items-center justify-center group ${buttonBg}`}
          aria-label="Volver arriba"
        >
          <ArrowUp size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
