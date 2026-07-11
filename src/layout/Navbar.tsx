"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  const links = [
    { label: t("nav.inicio"), href: "/" },
    { label: t("nav.galeria"), href: "/galeria" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.quienes_somos"), href: "/quienes-somos" },
  ];

  return (
    <>
      <nav className={`!fixed !top-0 !left-0 !right-0 z-[9999] flex items-center justify-between px-6 py-5 transition-colors duration-300 backdrop-blur-md border-b border-border-theme ${isOpen || pathname?.startsWith("/blog") ? "bg-bg-primary" : "bg-bg-primary/80"}`}>
        <Link href="/" className="font-serif italic text-xl relative z-10 hover:opacity-80 transition-opacity text-terracotta">J. Ximénez</Link>

        {/* Desktop Links & Language Switcher */}
        <div className="hidden md:flex items-center gap-8 relative z-10">
          <div className="flex gap-8 text-xs tracking-widest uppercase text-text-secondary">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`transition-colors ${isActive ? "text-terracotta" : "text-inherit hover:text-terracotta"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <LanguageSwitcher variant="desktop" />
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden relative z-10 p-2 -mr-2 text-text-secondary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="!fixed !inset-0 z-[9998] flex flex-col items-center justify-center bg-bg-primary"
          >
            <div className="flex flex-col items-center gap-8 text-sm tracking-widest uppercase text-text-primary w-full max-w-xs">
              {links.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`transition-colors p-4 ${isActive ? "text-terracotta" : "text-inherit hover:text-terracotta"}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <LanguageSwitcher variant="mobile" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

