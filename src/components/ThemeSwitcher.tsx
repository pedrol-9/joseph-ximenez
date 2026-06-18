"use client";

import React, { useState, useEffect, useRef } from "react";
import { Palette, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, Theme } from "./ThemeProvider";

interface ThemeOption {
  id: Theme;
  name: string;
  icon: string;
  colors: {
    bg: string;
    card: string;
    text: string;
    accent: string;
  };
  description: string;
}

const themes: ThemeOption[] = [
  {
    id: "cripta",
    name: "Cripta",
    icon: "⛪",
    colors: { bg: "#191512", card: "#211D19", text: "#E8E3DB", accent: "#C65C43" },
    description: "Oscuro café-terracota, místico y sobrio.",
  },
  {
    id: "colonial",
    name: "Colonial",
    icon: "🏛️",
    colors: { bg: "#F5F2EB", card: "#FCFAF6", text: "#262421", accent: "#B84A33" },
    description: "Tono pergamino claro inspirado en el archivo.",
  },
  {
    id: "terracota",
    name: "Terracota",
    icon: "🌅",
    colors: { bg: "#201B17", card: "#28231E", text: "#EDE8E0", accent: "#CA624A" },
    description: "Tono chocolate oscuro y arcilla. Claramente más claro que la cripta original, muy acogedor y legible.",
  },
  {
    id: "indigo",
    name: "T. Místico",
    icon: "🏺",
    colors: { bg: "#12100E", card: "#1A1714", text: "#E6E1D9", accent: "#C3573E" },
    description: "Mantiene el misticismo pero introduce un tono café espresso ultra-oscuro que suaviza el contraste puro.",
  },
];

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-8 right-8 z-[9990]" ref={containerRef}>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3.5 rounded-full border border-border-theme bg-bg-card/85 text-text-primary backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-accent hover:bg-accent/10 flex items-center justify-center cursor-pointer group"
        aria-label="Cambiar tema"
        title="Cambiar color de tema"
      >
        <Palette size={18} className="transition-transform duration-300 group-hover:rotate-12" />
      </button>

      {/* Theme Selection Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 right-0 w-80 max-w-[calc(100vw-2rem)] bg-bg-card border border-border-theme rounded-xl shadow-2xl p-5 overflow-hidden backdrop-blur-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-border-theme">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎨</span>
                <h3 className="font-serif italic text-base font-semibold text-text-primary">Gama de Colores</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-text-secondary hover:text-text-primary hover:bg-bg-primary/50 transition-colors cursor-pointer"
                aria-label="Cerrar panel"
              >
                <X size={14} />
              </button>
            </div>

            {/* List of themes */}
            <div className="flex flex-col gap-3">
              {themes.map((t) => {
                const isActive = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                    }}
                    className={`flex flex-col w-full text-left p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "border-accent bg-accent/5 shadow-sm"
                        : "border-border-theme/40 hover:border-border-theme hover:bg-bg-primary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{t.icon}</span>
                        <span className="font-serif text-sm font-medium text-text-primary">
                          {t.name}
                        </span>
                      </div>
                      
                      {/* Swatch indicator */}
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5 items-center">
                          <div
                            className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-sm"
                            style={{ backgroundColor: t.colors.bg }}
                            title="Fondo"
                          />
                          <div
                            className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-sm"
                            style={{ backgroundColor: t.colors.card }}
                            title="Tarjeta"
                          />
                          <div
                            className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-sm"
                            style={{ backgroundColor: t.colors.text }}
                            title="Texto"
                          />
                          <div
                            className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-sm"
                            style={{ backgroundColor: t.colors.accent }}
                            title="Acento"
                          />
                        </div>
                        {isActive && (
                          <Check size={12} className="text-accent ml-1" />
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-text-secondary leading-relaxed pl-7">
                      {t.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
