export interface ImagenDetalle {
  url: string;
  title?: string;
  credits: string;
}

export interface LugarReferencia {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  painting: ImagenDetalle;
  currentPhoto: ImagenDetalle;
}

export const LUGARES_REFERENCIA: LugarReferencia[] = [
  {
    id: "guaro",
    name: "Guaro, Sierra de Ronda",
    subtitle: "El origen en las tierras andaluzas",
    description: "Pueblo natal de Joseph Ximénez (1632), un rincón agrícola encaramado en la Sierra de Ronda, Málaga. Aquí transcurrió su infancia entre labradores y fue el escenario del trágico conflicto amoroso con su amiga Ana que lo obligó a huir para convertirse en fugitivo rumbo a las Indias.",
    painting: {
      url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/1.guaro_1.webp",
      title: "Guaro en el siglo XVII",
      credits: "Óleo histórico de autor desconocido, Archivo Histórico de Málaga"
    },
    currentPhoto: {
      url: "/images/lugares/guaro_actual.png",
      credits: "Fotografía de archivo municipal de Guaro (2025)"
    }
  },
  {
    id: "candelaria",
    name: "Desierto de la Candelaria",
    subtitle: "El refugio del silencio y la contemplación",
    description: "El valle árido y silencioso en Boyacá donde Joseph vivió retirado como ermitaño durante once años (1665-1676). En este espacio de penitencia extrema construyó su bohío de madera y escribió sus 29 cuadernos místicos inspirados en la unión directa con Dios.",
    painting: {
      url: "/images/lugares/candelaria_pintura.png",
      title: "Eremitas en el Desierto",
      credits: "Acuarela de la Comisión Corográfica, siglo XIX"
    },
    currentPhoto: {
      url: "/images/lugares/candelaria_actual.png",
      credits: "Fotografía por Juan Camilo Gómez (2026)"
    }
  },
  {
    id: "eccehomo",
    name: "Convento del Santo Eccehomo",
    subtitle: "Centro espiritual de la provincia",
    description: "Ubicado a las afueras de Villa de Leyva, este convento de los padres dominicos era vecino al retiro de Joseph. Fue el cura doctrinero de Oicatá quien lo visitó en su choza cercana al convento para denunciarlo ante el Santo Oficio al sospechar de sus proposiciones heréticas.",
    painting: {
      url: "/images/lugares/eccehomo_pintura.png",
      title: "Santo Eccehomo Colonial",
      credits: "Pintura al temple sobre madera, Colección Convento Santo Eccehomo"
    },
    currentPhoto: {
      url: "/images/lugares/eccehomo_actual.png",
      credits: "Fotografía por María Alejandra Fonseca (2025)"
    }
  },
  {
    id: "cartagena",
    name: "Cartagena de Indias",
    subtitle: "Las cárceles secretas y el auto de fe",
    description: "Destino final de Joseph Ximénez tras su captura. En las prisiones secretas del Tribunal del Santo Oficio de Cartagena padeció doce años de cautiverio y torturas antes de ser condenado a morir quemado vivo en la hoguera el 30 de mayo de 1688, defendiendo sus escritos.",
    painting: {
      url: "/images/lugares/cartagena_pintura.png",
      title: "El Auto de Fe de 1688",
      credits: "Grabado calcográfico de época, Archivo General de Indias"
    },
    currentPhoto: {
      url: "/images/lugares/cartagena_actual.png",
      credits: "Fotografía por Ricardo Durán (2026)"
    }
  }
];
