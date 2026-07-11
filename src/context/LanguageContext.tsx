"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import es from "../locales/es.json";
import en from "../locales/en.json";
import de from "../locales/de.json";
import pt from "../locales/pt.json";

export type Language = "es" | "en" | "de" | "pt";

const translations: Record<Language, any> = { es, en, de, pt };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    // Read from localStorage on mount
    try {
      const savedLanguage = localStorage.getItem("jx-lang") as Language;
      if (savedLanguage && ["es", "en", "de", "pt"].includes(savedLanguage)) {
        setLanguageState(savedLanguage);
        document.documentElement.setAttribute("lang", savedLanguage);
      } else {
        // Try to detect user browser language
        const browserLang = navigator.language.split("-")[0];
        if (["es", "en", "de", "pt"].includes(browserLang)) {
          setLanguageState(browserLang as Language);
          document.documentElement.setAttribute("lang", browserLang);
        }
      }
    } catch (e) {
      console.error("Failed to load language from localStorage", e);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("jx-lang", lang);
      document.documentElement.setAttribute("lang", lang);
    } catch (e) {
      console.error("Failed to save language to localStorage", e);
    }
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let current: any = translations[language];

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        // Fallback to ES key if not found in current language
        let fallback: any = translations["es"];
        for (const fk of keys) {
          if (fallback && typeof fallback === "object" && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return key;
          }
        }
        return typeof fallback === "string" ? fallback : key;
      }
    }

    return typeof current === "string" ? current : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
