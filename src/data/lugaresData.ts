export interface ExternalSource {
  label: string;
  url: string;
  siteName?: string;
}

export interface LugarImagen {
  url: string;
  caption?: string;
  credits?: string;
  externalSource?: ExternalSource;
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
        caption: "Arquitectura tradicional y calle escalonada del pueblo de Guaro",
        credits: "Archivo Personal | Patricia Enciso P.",
      },
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/1.guaro_2.webp",
        caption: "Arquitectura tradicional y calle del pueblo de Guaro",
        credits: "Archivo Personal | Patricia Enciso P.",
      },
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/1.guaro_3.webp",
        caption: "Paisaje rural de Guaro | Sembrado de Olivos",
        credits: "Archivo Personal | Patricia Enciso P.",
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
        caption: "Vista panorámica de la Ciudad de Cádiz en el año 1647",
        credits: "Museo de las Cortes de Cádiz. (c.a. 1647). Vista Arámburu [imagen]. Junta de Andalucía / Universidad de Sevilla (2022).",
      },
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/2.c%C3%A1diz-02.webp",
        caption: "Vista de Cádiz en el siglo XVIII.",
        credits: "Biblioteca Virtual Miguel de Cervantes | Ilustraciones de viajeros españoles",
      },
    ],
  },
  {
    id: "santamarta",
    name: "Santa Marta",
    subtitle: "Desembarco en el Nuevo Mundo",
    description: "Puerto de arribo en la costa caribeña neogranadina, primer contacto de Joseph con la geografía americana antes de remontar las corrientes hacia el interior del continente.",
    imageUrl: "",
    credits: "Colección Banco de la República - Biblioteca virtual",
    images: [
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/3.SantaMarta-Galeones.webp",
        caption: "Obra gráfica de Edward Walhouse - 1843",
        credits: "Colección Banco de la República - Biblioteca virtual",
      },
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/3.SantaMarta-EduardWalhouse.webp",
        caption: "Acuarela en papel de Edward Mark Walhouse | 1843 - 1856",
        credits: "Colección Banco de la República - Biblioteca virtual",
      },
    ],
  },
  {
    id: "magdalena",
    name: "Río Grande de la Magdalena",
    subtitle: "Navegación fluvial en el trayecto de Honda",
    description: "Arteria fluvial primordial de la Nueva Granada. La navegación en champanes río arriba hacia el puerto de Honda constituía un viaje de semanas de introspección ante la inmensidad selvática.",
    imageUrl: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/3.Rio_Magdalena_Honda.webp",
    credits: "Archivo Personal | Patricia Enciso P.",
    images: [
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/4.Rio_Magdalena_Honda.webp",
        caption: "El Río Grande de la Magdalena en la ruta fluvial hacia el interior del reino",
        credits: "Archivo Personal | Patricia Enciso P.",
      },
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/4.Rio_Magdalena_Honda_3.webp",
        caption: "El Río Grande de la Magdalena en la ruta fluvial hacia el interior del reino",
        credits: "Yilmar Javier Amaya P. | Las 2 Orillas",
      },
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/4.honda-puente-de-hierro.webp",
        caption: "Puente de hierro sobre el río Gualí en Honda - José María Gutiérrez de Alba | 1822 - 1897",
        credits: "Colección Banco de la República - Biblioteca virtual",
        externalSource: {
          label: "Impresiones de un viaje a América",
          url: "https://www.banrepcultural.org/impresiones-de-un-viaje/index.php?r=inicio%2Findex",
          siteName: "BanRep Cultural",
        },
      },

    ],
  },
  {
    id: "mariquita",
    name: "Mariquita",
    subtitle: "Primeras rozas de maíz y trabajo en las Indias",
    description: "Villa colonial donde Joseph se asentó temporalmente para dedicarse al laboreo agrícola y las rozas de maíz, experimentando la dureza del trabajo en el trópico antes de su vocación solitaria.",
    imageUrl: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/5.mariquita.webp",
    credits: "Ilustración y fotografía histórica",
    images: [
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/5.mariquita.webp",
        caption: "Ermita del Señor de los Milagros",
        credits: "Archivo Fotográfico | Gobernación del Tolima",
      },
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/5.mariquita-plaza-SE.webp",
        caption: "Vista de la parte S.E. de la plaza de Mariquita - José María Gutiérrez de Alba 1874",
        credits: "Colección Banco de la República - Biblioteca virtual",
        externalSource: {
          label: "Impresiones de un viaje a América",
          url: "https://www.banrepcultural.org/impresiones-de-un-viaje/index.php?r=inicio%2Findex",
          siteName: "BanRep Cultural",
        },
      },
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/5.Mariquita-Mina-de-Bocaneme.webp",
        caption: "Martillos y aparatos de decantación de la Mina de Bocaneme - José María Gutiérrez de Alba 1874",
        credits: "Colección Banco de la República - Biblioteca virtual",
        externalSource: {
          label: "Impresiones de un viaje a América",
          url: "https://www.banrepcultural.org/impresiones-de-un-viaje/index.php?r=inicio%2Findex",
          siteName: "BanRep Cultural",
        },
      },
    ],
  },
  {
    id: "garzon",
    name: "Garzón y Timaná",
    subtitle: "Matrimonio, vida laboral y primer monte",
    description: "Tierras del Alto Magdalena donde Joseph contrajo matrimonio, vivió en familia y trabajó como mercader.",
    imageUrl: "",
    credits: "Archivo Histórico Regional",
    images: [
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/6.-Timana-Martin-Horts.webp",
        caption: "Timaná - Fotografía tomada por el profesor alemán Martín Horts, en su viaje de Bogotá a San Agustin (1934 - 1942)",
        credits: "Museo Etnológico de Dresde Alemania",
      },
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/6.-Timana-Martin-Horts-2.webp",
        caption: "Timaná - Fotografía tomada por el profesor alemán Martín Horts, en su viaje de Bogotá a San Agustin (1934 - 1942)",
        credits: "Museo Etnológico de Dresde Alemania",
      },
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/6.-garzon-martin-horts-2.webp",
        caption: "Garzón - Fotografía tomada por el profesor alemán Martín Horts, en su viaje de Bogotá a San Agustin (1934 - 1942)",
        credits: "Museo Etnológico de Dresde Alemania",
      },
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/6.-garzon-martin-horts.webp",
        caption: "Garzón - Fotografía tomada por el profesor alemán Martín Horts, en su viaje de Bogotá a San Agustin (1934 - 1942)",
        credits: "Museo Etnológico de Dresde Alemania",
      },
    ],
  },
  {
    id: "chiquinquira",
    name: "Chiquinquirá",
    subtitle: "Santuario de la Virgen y oración",
    description: "Foco de peregrinación mariana en el altiplano cundiboyacense. Joseph acudía al santuario en busca de guía espiritual y devoción mariana en sus etapas de discernimiento místico.",
    imageUrl: "",
    credits: "Archivo Basílica de Chiquinquirá",
    images: [
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/7.-ermita_san_lazaro.webp.webp",
        caption: "Ermita de San Lázaro (Hernán Díaz, 1931-2009)",
        credits: "Colección Banco de la República - Biblioteca virtual",
      },
      {
        url: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/7.canastos-chiquinquira.webp",
        caption: "Mercado de canastos Chiquinquirá (Hernán Díaz, 1931-2009)",
        credits: "Colección Banco de la República - Biblioteca virtual",
      },
    ],
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
