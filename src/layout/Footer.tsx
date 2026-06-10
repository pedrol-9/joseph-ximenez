"use client";

import React from "react";
import { BookOpen, MapPin, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Footer = () => {
  const [activeLink, setActiveLink] = React.useState("");
  const pathname = usePathname();

  const isActive = (href: string) => activeLink === href;

  // Sincronizar el link activo con la ruta actual al cargar o cambiar de página
  React.useEffect(() => {
    setActiveLink(window.location.pathname + window.location.hash);
  }, [pathname]);

  const renderNavigationLinks = () => {

    if (pathname?.startsWith("/blog")) {
      return (
        <>
          <h4 className="font-mono text-[#C1533B] text-[10px] tracking-[0.3em] uppercase mb-6">
            Revista
          </h4>
          <ul className="space-y-4 text-sm font-light text-[#E8E2D2]/70">
            <li>
              <Link 
                href="/blog" 
                onClick={() => setActiveLink("/blog")} 
                className="hover:text-[#C1533B] transition-colors" 
                style={{ color: isActive("/blog") ? "#C1533B" : "inherit" }}
              >
                Artículo Conmemorativo
              </Link>
            </li>
          </ul>
        </>
      );
    }

    if (pathname?.startsWith("/galeria")) {
      return (
        <>
          <h4 className="font-mono text-[#C1533B] text-[10px] tracking-[0.3em] uppercase mb-6">
            Colección
          </h4>
          <ul className="space-y-4 text-sm font-light text-[#E8E2D2]/70">
            <li><Link href="/galeria#ermitanos" onClick={() => setActiveLink("/galeria#ermitanos")} className="hover:text-[#C1533B] transition-colors" style={{ color: isActive("/galeria#ermitanos") ? "#C1533B" : "inherit" }}>Ermitaños de la Historia</Link></li>
            <li><Link href="/galeria#arte" onClick={() => setActiveLink("/galeria#arte")} className="hover:text-[#C1533B] transition-colors" style={{ color: isActive("/galeria#arte") ? "#C1533B" : "inherit" }}>Exhibición de Arte</Link></li>
            <li><Link href="/galeria#mapa" onClick={() => setActiveLink("/galeria#mapa")} className="hover:text-[#C1533B] transition-colors" style={{ color: isActive("/galeria#mapa") ? "#C1533B" : "inherit" }}>Mapa de Ruta</Link></li>
            <li><Link href="/galeria#mystic-book" onClick={() => setActiveLink("/galeria#mystic-book")} className="hover:text-[#C1533B] transition-colors" style={{ color: isActive("/galeria#mystic-book") ? "#C1533B" : "inherit" }}>Documentos Históricos</Link></li>
          </ul>
        </>
      );
    }

    return (
      <>
        <h4 className="font-mono text-[#C1533B] text-[10px] tracking-[0.3em] uppercase mb-6">
          La Historia
        </h4>
        <ul className="space-y-4 text-sm font-light text-[#E8E2D2]/70">
          <li><Link href="/#inicio" onClick={() => setActiveLink("/#inicio")} className="hover:text-[#C1533B] transition-colors" style={{ color: isActive("/#inicio") ? "#C1533B" : "inherit" }}>El Origen</Link></li>
          <li><Link href="/#pasado" onClick={() => setActiveLink("/#pasado")} className="hover:text-[#C1533B] transition-colors" style={{ color: isActive("/#pasado") ? "#C1533B" : "inherit" }}>Juventud y Sangre</Link></li>
          <li><Link href="/#retiro" onClick={() => setActiveLink("/#retiro")} className="hover:text-[#C1533B] transition-colors" style={{ color: isActive("/#retiro") ? "#C1533B" : "inherit" }}>11 años de silencio</Link></li>
          <li><Link href="/#hoguera" onClick={() => setActiveLink("/#hoguera")} className="hover:text-[#C1533B] transition-colors" style={{ color: isActive("/#hoguera") ? "#C1533B" : "inherit" }}>El Juicio Final</Link></li>
          <li><Link href="/#legado" onClick={() => setActiveLink("/#legado")} className="hover:text-[#C1533B] transition-colors" style={{ color: isActive("/#legado") ? "#C1533B" : "inherit" }}>El Legado Actual</Link></li>
        </ul>
      </>
    );
  };

  return (
    <footer id="footer" className={`bg-[#050505] text-[#E8E2D2] pt-24 pb-12 z-40 relative ${pathname?.startsWith("/blog") ? "" : "border-t border-[#C1533B]/10"}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
        
        {/* Columna 1: Marca y descripción */}
        <div className="md:col-span-2">
          <span className="font-serif italic text-3xl md:text-4xl text-[#C1533B] drop-shadow-sm block mb-6">
            Joseph Ximénez
          </span>
          <p className="text-[#E8E2D2]/60 font-light leading-relaxed max-w-sm mb-8">
            El ermitaño místico del Desierto de la Candelaria. Una historia de herejía, silencio y martirio que el fuego de la Inquisición no logró borrar de la memoria de Colombia.
          </p>
          <div className="flex gap-4 text-[#C1533B]/80">
            <a 
              href="https://www.instagram.com/josephximenez_hermit/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram" 
              className="hover:text-[#C1533B] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>

        {/* Columna 2: Navegación Dinámica */}
        <div>
          {renderNavigationLinks()}
        </div>

        {/* Columna 3: Información */}
        <div>
          <h4 className="font-mono text-[#C1533B] text-[10px] tracking-[0.3em] uppercase mb-6">
            Investigación
          </h4>
          <ul className="space-y-4 text-sm font-light text-[#E8E2D2]/70">
            <li className="flex items-start gap-3">
              <BookOpen size={16} className="shrink-0 mt-0.5 text-[#C1533B]/60" />
              <a 
                href="https://www.mercadolibre.com.co/del-desierto-a-la-hoguera--patricia-enciso--la-inquisicion/up/MCOU2434042422"
                target="_blank"
                rel="noopener noreferrer"
                className="leading-tight hover:text-[#C1533B] transition-colors"
              >
                Libro "Del desierto a la hoguera" (Patricia Enciso Patiño)
              </a>
            </li>
            <li className="flex items-start gap-3 mt-4">
              <MapPin size={16} className="shrink-0 mt-0.5 text-[#C1533B]/60" />
              <span className="leading-tight">Desierto de la Candelaria, Boyacá, Colombia</span>
            </li>
            <li className="flex items-center gap-3 mt-4">
              <Mail size={16} className="shrink-0 text-[#C1533B]/60" />
              <a href="mailto:contacto@josephximenez.com" className="hover:text-[#C1533B] transition-colors">contacto@josephximenez.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-8 border-t border-[#E8E2D2]/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[#E8E2D2]/30 text-xs">
        <p>© {new Date().getFullYear()} Proyecto Joseph Ximénez. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          <Link href="/privacidad" className="hover:text-[#E8E2D2]/80 transition-colors" style={{ color: isActive("/privacidad") ? "#C1533B" : "inherit" }}>Políticas de Privacidad</Link>
          <Link href="/terminos" className="hover:text-[#E8E2D2]/80 transition-colors" style={{ color: isActive("/terminos") ? "#C1533B" : "inherit" }}>Términos Legales</Link>
        </div>
      </div>
    </footer>
  );
};
