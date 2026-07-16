export interface LugarReferencia {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  credits: string;
}

export const LUGARES_REFERENCIA: LugarReferencia[] = [
  {
    id: "guaro",
    name: "Guaro, Sierra de Ronda",
    subtitle: "Pueblo de Málaga, España",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageUrl: "https://rp9jryczlxa748zk.public.blob.vercel-storage.com/lugares_referencia/1.guaro_1.webp",
    credits: "Créditos: Lorem Ipsum"
  },
  {
    id: "candelaria",
    name: "Desierto de la Candelaria",
    subtitle: "Valle de retiro en Boyacá, Colombia",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageUrl: "",
    credits: "Créditos: Lorem Ipsum"
  },
  {
    id: "eccehomo",
    name: "Convento del Santo Eccehomo",
    subtitle: "Monasterio dominico colonial en Boyacá",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageUrl: "",
    credits: "Créditos: Lorem Ipsum"
  },
  {
    id: "cartagena",
    name: "Cartagena de Indias",
    subtitle: "Escenario del auto de fe",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageUrl: "",
    credits: "Créditos: Lorem Ipsum"
  }
];
