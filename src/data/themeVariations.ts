/**
 * Variaciones del Tema Cripta para Joseph Ximénez
 * 
 * Este archivo contiene diferentes objetos de configuración para probar tonalidades de fondo
 * un poco más claras (café-terracota, café espresso, cacao) para el tema oscuro "Cripta".
 * 
 * Puedes copiar y pegar estos valores directamente en tu src/app/globals.css
 * bajo la regla [data-theme="cripta"] o la sección :root.
 */

export interface ThemeColors {
  name: string;
  description: string;
  cssVariables: {
    "--bg-primary": string;        // Fondo general
    "--bg-card": string;           // Fondo de tarjetas y elementos flotantes
    "--text-primary": string;      // Texto principal (más claro)
    "--text-secondary": string;    // Texto secundario (más tenue)
    "--accent": string;            // Terracota principal
    "--accent-secondary": string;  // Dorado/bronce secundario
    "--border-theme": string;      // Bordes (con opacidad)
    "--arrow-halo-bg": string;     // Resplandor de flechas
  };
}

export const themeVariations: Record<string, ThemeColors> = {
  // El tema por defecto que viene del código original
  criptaOriginal: {
    name: "Cripta Original",
    description: "El fondo casi negro original. Elegante pero de alto contraste y cansador para algunas pantallas.",
    cssVariables: {
      "--bg-primary": "#0D0C0A",
      "--bg-card": "#141311",
      "--text-primary": "#E5E0D8",
      "--text-secondary": "#9E9689",
      "--accent": "#C1533B",
      "--accent-secondary": "#A87D4A",
      "--border-theme": "rgba(229, 224, 216, 0.07)",
      "--arrow-halo-bg": "rgba(168, 125, 74, 0.25)"
    }
  },

  // Variante 1: Solo un poquitito más de café/calidez, casi imperceptible pero relaja la vista
  criptaEspresso: {
    name: "Cripta Café Espresso (Sutil)",
    description: "Mantiene el misticismo pero introduce un tono café espresso ultra-oscuro que suaviza el contraste puro.",
    cssVariables: {
      "--bg-primary": "#12100E",
      "--bg-card": "#1A1714",
      "--text-primary": "#E6E1D9",
      "--text-secondary": "#A0988B",
      "--accent": "#C3573E",
      "--accent-secondary": "#AA804E",
      "--border-theme": "rgba(230, 225, 217, 0.08)",
      "--arrow-halo-bg": "rgba(170, 128, 78, 0.25)"
    }
  },

  // Variante 2: Café-terracota oscuro. Tono cálido, claramente más amigable con los ojos
  criptaTerracotaUmbria: {
    name: "Cripta Terracota Umbría (Recomendado)",
    description: "Fondo café terracota profundo y cenizo. El preferido para evitar dolores de cabeza manteniendo la oscuridad.",
    cssVariables: {
      "--bg-primary": "#191512",
      "--bg-card": "#211D19",
      "--text-primary": "#E8E3DB",
      "--text-secondary": "#A59C8F",
      "--accent": "#C65C43",
      "--accent-secondary": "#AF8452",
      "--border-theme": "rgba(232, 227, 219, 0.09)",
      "--arrow-halo-bg": "rgba(175, 132, 82, 0.25)"
    }
  },

  // Variante 3: Café cacao/tierra suave. Un paso más claro y cálido
  criptaCacaoSuave: {
    name: "Cripta Cacao Suave",
    description: "Tono chocolate oscuro y arcilla. Claramente más claro que la cripta original, muy acogedor y legible.",
    cssVariables: {
      "--bg-primary": "#201B17",
      "--bg-card": "#28231E",
      "--text-primary": "#EDE8E0",
      "--text-secondary": "#ABA193",
      "--accent": "#CA624A",
      "--accent-secondary": "#B58A59",
      "--border-theme": "rgba(237, 232, 224, 0.10)",
      "--arrow-halo-bg": "rgba(181, 138, 89, 0.25)"
    }
  },

  // Variante 4: Café colonial oscuro
  criptaColonialOscuro: {
    name: "Cripta Colonial Oscuro",
    description: "Una mezcla del color papel pergamino colonial pero llevado a un nivel de brillo muy bajo y cálido.",
    cssVariables: {
      "--bg-primary": "#28221D",
      "--bg-card": "#312B25",
      "--text-primary": "#EFEAE2",
      "--text-secondary": "#B0A698",
      "--accent": "#CE6850",
      "--accent-secondary": "#BA905F",
      "--border-theme": "rgba(239, 234, 226, 0.11)",
      "--arrow-halo-bg": "rgba(186, 144, 95, 0.25)"
    }
  }
};
