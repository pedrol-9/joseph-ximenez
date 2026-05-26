"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: "Inicio", href: "/" },
    { label: "Galería", href: "/galeria" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <>
      <nav className={`!fixed !top-0 !left-0 !right-0 z-[9999] flex items-center justify-between px-6 py-5 transition-colors duration-300 backdrop-blur-md border-b border-sand/[0.06] ${isOpen || pathname?.startsWith("/blog") ? "bg-[#100F0D]" : "bg-[#100F0D]/80"}`}>
        <Link href="/" className="font-serif italic text-xl relative z-10 hover:opacity-80 transition-opacity text-terracotta">J. Ximénez</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-xs tracking-widest uppercase relative z-10 text-sand/40">
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

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden relative z-10 p-2 -mr-2 text-sand"
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
            className="!fixed !inset-0 z-[9998] flex flex-col items-center justify-center bg-[#100F0D]"
          >
            <div className="flex flex-col items-center gap-8 text-sm tracking-widest uppercase text-sand/80">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
