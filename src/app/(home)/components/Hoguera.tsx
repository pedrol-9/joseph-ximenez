"use client";

import { motion } from "framer-motion";

export default function Hoguera() {
  const inquisitionSteps = [
    {
      title: "La Envidia y la Denuncia",
      text: "Su sabiduría y aura mística despertaron la envidia clerical. El cura Agustín de Tovar lo denunció formalmente. El 10 de julio de 1676, el inquisidor Juan de Mier irrumpió en el desierto, arrancándolo de su santuario."
    },
    {
      title: "Doce Años en la Oscuridad",
      text: "Fue exhibido y trasladado encadenado por Sáchica y Santafé, hasta ser sepultado en las mazmorras secretas de Cartagena de Indias. Soportó más de una década de aislamiento, frío e interrogatorios del Tribunal Supremo."
    }
  ];

  return (
    <>
      {/* 
        ========================================
        2. EL MARTIRIO (La Inquisición y la Hoguera)
        ========================================
      */}
    <section id="hoguera" className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 py-32 overflow-hidden bg-transparent border-t border-[#C1533B]/5">
        
        {/* Atmósfera de Fuego (CSS Puro de alto rendimiento) */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-80 flex items-end justify-center">
          <div className="w-full h-[70vh] bg-gradient-to-t from-[#C1533B]/40 via-[#C1533B]/5 to-transparent animate-[pulse-fire_6s_infinite_alternate_ease-in-out]" />
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
          
          <h2 className="font-serif text-[#E8E2D2] text-[clamp(3rem,8vw,6rem)] leading-[0.9] mb-16 tracking-tight">
            El Juicio y <br/>
            <em className="text-[#C1533B] italic drop-shadow-[0_0_20px_rgba(193,83,59,0.3)]">la Hoguera.</em>
          </h2>
          
          {/* Detalles Históricos de la Inquisición */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left bg-[#100F0D]/50 p-8 md:p-12 border border-[#C1533B]/20 rounded-2xl backdrop-blur-sm mb-0">
            {inquisitionSteps.map((step, idx) => (
              <div key={idx}>
                <h3 className="font-serif text-xl md:text-2xl text-[#E8E2D2] mb-4 border-b border-[#C1533B]/30 pb-4 inline-block">{step.title}</h3>
                <p className="text-[#E8E2D2]/60 text-base md:text-lg font-light leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Keyframes de Fuego Optimizados */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-fire {
          0% { transform: scaleY(0.9); opacity: 0.6; }
          100% { transform: scaleY(1.1); opacity: 0.9; }
        }
      `}} />
    </>
  );
}
