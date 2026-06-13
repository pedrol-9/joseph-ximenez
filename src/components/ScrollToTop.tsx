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

  // Adaptar colores del botón flotante según el tema activo
  const buttonBg = "bg-bg-card/85 border-border-theme hover:border-accent text-text-primary hover:bg-accent/10 hover:shadow-accent/5";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={scrollToTop}
          className={`fixed bottom-24 right-8 z-50 p-3.5 rounded-full border backdrop-blur-md shadow-2xl transition-all duration-300 flex items-center justify-center group cursor-pointer ${buttonBg}`}
          aria-label="Volver arriba"
        >
          <ArrowUp size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
