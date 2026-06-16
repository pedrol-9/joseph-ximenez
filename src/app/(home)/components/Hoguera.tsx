"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Hoguera() {
  const inquisitionSteps = [
    {
      title: "La Denuncia",
      text: "El cura Agustín de Tovar lo denuncia formalmente por sospecha de herejía. Inicia al proceso inquisitorial en su contra, por sus escritos y sus dichos. El 10 de julio de 1676, se emite la orden de prisión.",
    },
    {
      title: "Doce Años en la Oscuridad",
      text: "Lo trasladan y exhiben encadenado por Sáchica, Tunja y Santafé, hasta su entrega en las cárceles secretas de la Inquisición de Cartagena de Indias. Soporta más de una década de aislamiento, interrogatorios y tormentos del Tribunal Supremo, hasta que se cumple la sentencia.",
    },
  ];

  return (
    <>
      {/* 
        ========================================
        2. EL MARTIRIO (La Inquisición y la Hoguera)
        ========================================
      */}
      <section
        id="hoguera"
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 pt-32 pb-16 overflow-hidden bg-[#0a0806] border-y border-[#C1533B]/10 transition-colors duration-500"
      >
        {/* Atmósfera de Fuego (CSS Puro de alto rendimiento) */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-80 flex items-end justify-center">
          <div className="w-full h-[70vh] bg-gradient-to-t from-[#C1533B]/40 via-[#C1533B]/5 to-transparent origin-bottom animate-[pulse-fire_6s_infinite_alternate_ease-in-out]" />
          <div className="absolute bottom-[-10vh] w-[150vw] md:w-[80vw] h-[40vh] bg-[#C1533B]/20 blur-[100px] rounded-[100%]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.5 }}
          className="relative z-10 text-center max-w-4xl mx-auto w-full px-6 lg:pl-[140px]"
        >
          <div className="w-[1px] h-16 md:h-24 bg-gradient-to-b from-transparent to-[#C1533B] mx-auto mb-10 md:mb-16 opacity-50" />

          <h2 className="font-serif text-[#E5E0D8] text-[clamp(3rem,8vw,6rem)] leading-[0.9] mb-16 tracking-tight">
            El Juicio y <br />
            <em className="text-[#C1533B] italic drop-shadow-[0_0_20px_rgba(193,83,59,0.3)]">
              la Hoguera.
            </em>
          </h2>

          {/* Detalles Históricos de la Inquisición */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left bg-[#C1533B]/10 p-8 md:p-12 border border-[#C1533B]/25 rounded-2xl backdrop-blur-sm mb-0">
            {inquisitionSteps.map((step, idx) => (
              <div key={idx}>
                <h3 className="font-serif text-xl md:text-2xl text-[#E5E0D8] mb-4 border-b border-[#C1533B]/30 pb-4 inline-block">
                  {step.title}
                </h3>
                <p className="text-[#9E9689] text-base md:text-lg font-light leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          {/* Tarjeta Premium del Juicio Insólito (Ahora es la invitación al Blog) */}
          <Link
            href="/blog/hallazgo-folio-22"
            className="block mt-12 max-w-3xl mx-auto w-full group/card relative z-20 cursor-pointer text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="relative overflow-hidden bg-black/40 hover:bg-black/60 backdrop-blur-md border border-[#C1533B]/25 group-hover/card:border-[#C1533B]/50 rounded-2xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6),_inset_0_1px_1px_rgba(255,255,255,0.03)] hover:shadow-[0_25px_60px_rgba(193,83,59,0.15),_inset_0_1px_1px_rgba(255,255,255,0.06)] transition-all duration-500 w-full"
            >
              {/* Brillo de fondo naranja tenue en una esquina que se intensifica en hover */}
              <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-[#C1533B]/10 group-hover/card:bg-[#C1533B]/20 rounded-full blur-[80px] pointer-events-none transition-colors duration-500" />

              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative z-10">
                {/* Badge/Icono Lateral */}
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#C1533B]/15 group-hover/card:bg-[#C1533B]/25 border border-[#C1533B]/30 group-hover/card:border-[#C1533B]/50 shadow-[0_0_15px_rgba(193,83,59,0.2)] transition-all duration-500">
                  <svg
                    className="w-6 h-6 text-[#C1533B]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </div>

                <div className="flex-1">
                  {/* Badge Superior */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C1533B]/10 border border-[#C1533B]/20 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C1533B] animate-pulse" />
                    <span className="font-mono text-[10px] tracking-wider text-[#A87D4A] uppercase font-semibold">
                      Artículo conmemorativo · 350 Años
                    </span>
                  </div>

                  <h4 className="font-serif text-xl md:text-2xl text-[#E5E0D8] group-hover/card:text-[#F4F1EA] mb-3 transition-colors duration-300">
                    La Singularidad de su Condena
                  </h4>

                  <p className="text-[#9E9689] group-hover/card:text-[#B5AC9E] text-base md:text-lg font-light leading-relaxed mb-6 italic transition-colors duration-300">
                    &ldquo;De los 711 reos procesados por el Tribunal de la Inquisición de Cartagena de Indias, solo siete fueron juzgados por herejía formal. Joseph Ximénez fue el único místico, ermitaño y escritor entre ellos, y el único condenado a ser quemado vivo en la hoguera.&rdquo;
                  </p>

                  {/* Fila Inferior: Autoría + Enlace Interactivo con Efecto Portal */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#C1533B]/15 pt-5 transition-colors duration-500">
                    {/* Firma con línea decorativa */}
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-[1px] bg-[#C1533B]/40" />
                      <span className="font-mono text-xs text-[#A87D4A]">
                        Dra. Patricia Enciso Patiño, <span className="italic">Del Desierto a la Hoguera</span>
                      </span>
                    </div>

                    {/* Botón de Invitación con Efecto Portal */}
                    <div className="flex items-center gap-2 self-start sm:self-auto text-[#C1533B] group-hover/card:text-[#E5E0D8] transition-colors duration-300">
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold whitespace-nowrap">
                        Leer en el Blog
                      </span>
                      <div className="relative flex items-center justify-center w-[18px] h-[18px] shrink-0">
                        <div className="relative overflow-hidden w-[18px] h-[18px]">
                          <ArrowUpRight
                            size={18}
                            className="absolute inset-0 text-[#C1533B] group-hover/card:text-[#E5E0D8] transition-transform duration-500 ease-out transform group-hover/card:translate-x-full group-hover/card:-translate-y-full"
                          />
                          <ArrowUpRight
                            size={18}
                            className="absolute inset-0 text-[#C1533B] group-hover/card:text-[#E5E0D8] transition-transform duration-500 ease-out transform translate-x-[-100%] translate-y-[100%] group-hover/card:translate-x-0 group-hover/card:translate-y-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Keyframes de Fuego Optimizados */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes pulse-fire {
          0% { transform: scaleY(0.95); opacity: 0.5; }
          100% { transform: scaleY(1.05); opacity: 0.85; }
        }
      `,
        }}
      />
    </>
  );
}
