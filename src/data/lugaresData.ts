export interface LugarImagen {
  url: string;
  caption?: string;
  credits?: string;
}

export interface LugarReferencia {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  credits?: string;
  images?: LugarImagen[];
}

export const LUGARES_REFERENCIA: LugarReferencia[] = [
  {
    id: "guaro",
    name: "Guaro, Sierra de Ronda",
    subtitle: "Pueblo natal en Málaga, España",
    description: "Villa andaluza enclavada en las faldas de la Sierra de las Nieves (Málaga), donde Joseph Ximénez nació y pasó sus primeros años de juventud antes de emprender su viaje hacia el Nuevo Reino de Granada.",
    imageUrl: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/1.guaro_1.webp",
    credits: "Archivo Histórico / Fotografía documental",
    images: [
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/1.guaro_1.webp",
        caption: "Vista panorámica de Guaro en la Sierra de las Nieves",
        credits: "Archivo Histórico / Fotografía documental",
      },
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/1.guaro_2.webp",
        caption: "Arquitectura tradicional y calles del pueblo de Guaro",
        credits: "Archivo Histórico / Fotografía documental",
      },
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/1.guaro_3.webp",
        caption: "Paisaje rural y serranía de Guaro",
        credits: "Archivo Histórico / Fotografía documental",
      },
    ],
  },
  {
    id: "cadiz",
    name: "Cádiz",
    subtitle: "Puerto de partida y huida",
    description: "Principal puerto marítimo de la Carrera de Indias. Desde sus muelles partían las flotas de galeones hacia el Caribe y fue el escenario de partida de Joseph rumbo a América.",
    imageUrl: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/2.c%C3%A1diz_pintura.webp",
    credits: "Pintura de época colonial / Archivo de Indias",
    images: [
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/2.c%C3%A1diz_pintura.webp",
        caption: "Puerto y bahía de Cádiz durante la época de las flotas de Indias",
        credits: "Pintura histórica colonial / Archivo de Indias",
      },
    ],
  },
  {
    id: "santamarta",
    name: "Santa Marta",
    subtitle: "Desembarco en el Nuevo Mundo",
    description: "Puerto de arribo en la costa caribeña neogranadina, primer contacto de Joseph con la geografía americana antes de remontar las corrientes hacia el interior del continente.",
    imageUrl: "",
    credits: "Archivo General de Indias",
    images: [],
  },
  {
    id: "magdalena",
    name: "Río Grande de la Magdalena",
    subtitle: "Navegación fluvial en el trayecto de Honda",
    description: "Arteria fluvial primordial de la Nueva Granada. La navegación en champanes río arriba hacia el puerto de Honda constituía un viaje de semanas de introspección ante la inmensidad selvática.",
    imageUrl: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/3.Rio_Magdalena_Honda.webp",
    credits: "Grabado histórico del trayecto de Honda",
    images: [
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/3.Rio_Magdalena_Honda.webp",
        caption: "El Río Grande de la Magdalena en la ruta fluvial hacia el interior del reino",
        credits: "Grabado histórico / Archivo Nacional",
      },
    ],
  },
  {
    id: "mariquita",
    name: "Mariquita",
    subtitle: "Primeras rozas de maíz y trabajo en las Indias",
    description: "Villa colonial donde Joseph se asentó temporalmente para dedicarse al laboreo agrícola y las rozas de maíz, experimentando la dureza del trabajo en el trópico antes de su vocación solitaria.",
    imageUrl: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/4.mariquita.webp",
    credits: "Ilustración y fotografía histórica",
    images: [
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/4.mariquita.webp",
        caption: "Arquitectura y entorno colonial de Mariquita",
        credits: "Archivo Fotográfico Patrimonial",
      },
    ],
  },
  {
    id: "garzon",
    name: "Garzón y Timaná",
    subtitle: "Matrimonio, vida laboral y primer monte",
    description: "Tierras del Alto Magdalena donde Joseph contrajo matrimonio, vivió en familia y conoció las primeras tentaciones de aislamiento en el monte, preludio de su definitivo retiro eremítico.",
    imageUrl: "",
    credits: "Archivo Histórico Regional",
    images: [],
  },
  {
    id: "chiquinquira",
    name: "Chiquinquirá",
    subtitle: "Santuario de la Virgen y oración",
    description: "Foco de peregrinación mariana en el altiplano cundiboyacense. Joseph acudía al santuario en busca de guía espiritual y devoción mariana en sus etapas de discernimiento místico.",
    imageUrl: "",
    credits: "Archivo Basílica de Chiquinquirá",
    images: [],
  },
  {
    id: "candelaria",
    name: "Desierto de la Candelaria",
    subtitle: "Eremitorio principal y silencio contemplativo",
    description: "Quebrada agreste y solitaria en el valle de Ráquira donde Joseph construyó su humilde choza de sayal y piedras. Allí pasó once años de ayuno, penitencia y redacción de sus 29 cuadernos de revelaciones divinas.",
    imageUrl: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/7.desierto_candelaria.webp",
    credits: "Fotografía del entorno eremítico",
    images: [
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/7.desierto_candelaria.webp",
        caption: "Valle y paisaje árido del Desierto de la Candelaria, escenario del retiro de Joseph",
        credits: "Fotografía documental de Boyacá",
      },
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/8.convento_la_candelaria.webp",
        caption: "Perspectiva del enclave monástico eremítico en el desierto",
        credits: "Archivo Patrimonial de la Candelaria",
      },
    ],
  },
  {
    id: "convento_candelaria",
    name: "Convento de la Candelaria",
    subtitle: "Monasterio de Recoletos de San Agustín",
    description: "Fundado en 1597 por ermitaños agustinos recoletos. Joseph asistía periódicamente a confesar y comulgar antes de alcanzar el estado de unión mística interior que lo llevó a prescindir de intermediarios.",
    imageUrl: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/8.convento_la_candelaria.webp",
    credits: "Monasterio de La Candelaria, Ráquira",
    images: [
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/8.convento_la_candelaria.webp",
        caption: "Fachada y claustro colonial del Convento de Nuestra Señora de la Candelaria",
        credits: "Monasterio de La Candelaria, Ráquira",
      },
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/7.desierto_candelaria.webp",
        caption: "Caminos pedregosos y colinas que conectaban las chozas con el santuario",
        credits: "Registro fotográfico regional",
      },
    ],
  },
  {
    id: "eccehomo",
    name: "Convento del Santo Eccehomo",
    subtitle: "Monasterio dominico y denuncia",
    description: "Cercano al retiro de Joseph, este convento de los frailes dominicos fue punto clave donde el cura de Oicatá conoció los cuadernos del ermitaño e inició las pesquisas inquisitoriales.",
    imageUrl: "",
    credits: "Archivo de la Orden de Predicadores",
    images: [],
  },
  {
    id: "sachica",
    name: "Sáchica",
    subtitle: "Primera prisión tras la captura",
    description: "Población boyacense donde fue recluido inicialmente tras la orden de captura dictada en julio de 1676, iniciando el largo periplo carcelario custodiado por la autoridad eclesiástica.",
    imageUrl: "",
    credits: "Archivo Municipal de Sáchica",
    images: [],
  },
  {
    id: "santafe",
    name: "Santafé de Bogotá",
    subtitle: "Reclusión de tránsito en conventos",
    description: "Capital virreinal donde fue interrogado y recluido provisionalmente antes de su remisión forzosa hacia el tribunal del Santo Oficio de la Inquisición en Cartagena.",
    imageUrl: "",
    credits: "Archivo General de la Nación, Colombia",
    images: [],
  },
  {
    id: "cartagena",
    name: "Cartagena de Indias",
    subtitle: "Cárceles secretas y hoguera",
    description: "Sede del Tribunal del Santo Oficio de la Inquisición. Tras años en las húmedas cárceles secretas, Joseph fue condenado como hereje dogmatizante y martirizado en auto de fe.",
    imageUrl: "",
    credits: "Palacio de la Inquisición, Cartagena",
    images: [],
  },
];
