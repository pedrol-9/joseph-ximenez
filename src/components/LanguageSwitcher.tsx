"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation, Language } from "@/context/LanguageContext";

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile";
}

const languages: { code: Language; label: string; shortLabel: string }[] = [
  { code: "es", label: "Español", shortLabel: "ES" },
  { code: "en", label: "English", shortLabel: "ENG" },
  { code: "de", label: "Deutsch", shortLabel: "GER" },
  { code: "pt", label: "Português", shortLabel: "POR" },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = "desktop" }) => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside (only for desktop dropdown)
  useEffect(() => {
    if (variant !== "desktop") return;

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
  }, [isOpen, variant]);

  // Close on Escape key
  useEffect(() => {
    if (variant !== "desktop") return;

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
  }, [isOpen, variant]);

  // Get active language details
  const activeLang = languages.find((lang) => lang.code === language) || languages[0];

  if (variant === "mobile") {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-4 border-t border-border-theme/20 w-full mt-6">
        <span className="text-[10px] tracking-[0.3em] uppercase text-text-secondary opacity-65 mb-1">
          Idioma / Language
        </span>
        <div className="flex items-center justify-center gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-4 py-2 text-xs tracking-widest rounded-md uppercase font-medium transition-all duration-300 border ${
                language === lang.code
                  ? "bg-terracotta border-terracotta text-bg-primary font-bold shadow-md"
                  : "border-border-theme/40 text-text-secondary hover:text-text-primary hover:bg-bg-card/50"
              }`}
            >
              {lang.shortLabel}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Desktop dropdown
  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-theme bg-bg-card/45 hover:bg-bg-card/90 text-text-secondary hover:text-text-primary backdrop-blur-sm transition-all duration-300 text-[11px] font-semibold tracking-wider cursor-pointer group"
        aria-label="Seleccionar idioma"
        aria-expanded={isOpen}
      >
        <Globe size={13} className="transition-transform duration-300 group-hover:rotate-12" />
        <span>{activeLang.shortLabel}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-36 origin-top-right rounded-lg border border-border-theme bg-bg-card/95 backdrop-blur-md shadow-2xl p-1 z-[10000]"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs tracking-wider rounded-md transition-colors cursor-pointer text-left ${
                  language === lang.code
                    ? "bg-terracotta/10 text-terracotta font-semibold"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-primary/50"
                }`}
              >
                <span>{lang.label}</span>
                {language === lang.code && <Check size={12} className="text-terracotta" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
