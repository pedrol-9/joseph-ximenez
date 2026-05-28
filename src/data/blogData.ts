export interface BlogArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "hallazgo-folio-22",
    title: "Artículo conmemorativo por los 350 años de la orden de captura de Joseph Ximénez - 10 de Julio de 1676",
    category: "Investigación",
    date: "Madrid, 1995",
    readTime: "8 min de lectura",
    content: [
      "Durante siglos, la historia oficial de la Nueva Granada mantuvo en las sombras el destino de Joseph Ximénez. No fue hasta que la historiadora Patricia Enciso Patiño, en una labor de arqueología documental en el Archivo Histórico Nacional de Madrid, desenterró el Legajo 1622. Allí, oculto entre miles de procesos administrativos, se encontraba el expediente número 22: la crónica de una persecución que desafió la lógica de su tiempo.",
      "El 'Folio 22' no es un simple registro judicial; es una ventana a la psique de un hombre que se creía habitado por la divinidad. El hallazgo reveló que Ximénez había sido objeto de una vigilancia minuciosa antes de su captura. Los documentos detallan cómo el cura doctrinero de Oicatá, Agustín de Tovar, actuó como el primer 'ojo' de la Inquisición, visitando la humilde choza de Joseph no por caridad, sino para recolectar pruebas de su heterodoxia.",
      "[ESPACIO PARA IMAGEN]",
      "En el interior de ese folio se describen los 29 cuadernos confiscados. Los inquisidores quedaron perplejos ante la caligrafía de un hombre que, supuestamente, apenas sabía deletrear. Ximénez afirmaba que su mano era guiada por un 'dictado divino', una pretensión que en el siglo XVII era el camino más rápido hacia el calabozo. El descubrimiento de este expediente permitió a Patricia Enciso reconstruir no solo los hechos, sino el lenguaje místico y subversivo de Joseph.",
      "Este rescate documental ha permitido a los investigadores modernos analizar el caso bajo la lupa de la microhistoria. Ya no vemos a Joseph como un simple loco o un delincuente, sino como un síntoma de la tensión entre la búsqueda espiritual individual y el control férreo de la Iglesia Colonial. El Folio 22 es, en última instancia, el testimonio de un hombre que prefirió el silencio del desierto al ruido de los dogmas oficiales.",
      "Hoy, gracias a este hallazgo, la figura de Joseph Ximénez ha resurgido en Boyacá y Cartagena no como un hereje, sino como un mártir de la memoria histórica. El libro 'Del desierto a la hoguera' es la culminación de este hallazgo, una obra que nos obliga a preguntarnos cuántas otras voces siguen esperando en los anaqueles de Madrid a ser rescatadas del olvido."
    ]
  }
];
