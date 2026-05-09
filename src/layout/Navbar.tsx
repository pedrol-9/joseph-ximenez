"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Inicio", href: "/" },
    { label: "Galería", href: "/galeria" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <>
      <nav className="!fixed !top-0 !left-0 !right-0 z-[9999] flex items-center justify-between px-6 py-5 transition-colors duration-300"
        style={{
          background: isOpen ? "rgba(16,15,13,1)" : "rgba(16,15,13,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(221,216,207,0.06)"
        }}>
        <Link href="/" className="font-serif italic text-xl relative z-10 hover:opacity-80 transition-opacity" style={{ color: "#C1533B" }}>J. Ximénez</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-xs tracking-widest uppercase relative z-10" style={{ color: "rgba(221,216,207,0.4)" }}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#C1533B] transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden relative z-10 p-2 -mr-2 text-[#DDD8CF]"
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
            <div className="flex flex-col items-center gap-8 text-sm tracking-widest uppercase" style={{ color: "rgba(221,216,207,0.8)" }}>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-[#C1533B] transition-colors p-4"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
