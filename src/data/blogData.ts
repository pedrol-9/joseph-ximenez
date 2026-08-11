// Footnote markers in paragraph text use the pattern [fn:N]
// The renderer replaces them with styled <sup> elements linked to #footnote-N

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "section-title"; text: string }
  | { type: "author-bio"; text: string }
  | { type: "archive-header" }
  | { type: "archive-entry"; text: string }
  | { type: "bibliography-header" }
  | { type: "bibliography-entry"; text: string };

export interface Footnote {
  number: number;
  text: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  author: string;
  category: string;
  date: string;
  readTime: string;
  blocks: ContentBlock[];
  footnotes: Footnote[];
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "articulo-conmemorativo",
    title: "Joseph Ximénez: luz en el Desierto, cenizas en la hoguera",
    author: "Patricia Enciso Patiño",
    category: "Investigación",
    date: "2026",
    readTime: "15 min de lectura",
    blocks: [
      {
        type: "paragraph",
        text: "El 10 de julio de 2026 se cumplen 350 años del día en que el inquisidor Juan de Mier emitió orden de prisión contra Joseph Ximénez, un místico ermitaño que vivía cerca al convento del Santo Eccehomo, en un monte aledaño al Desierto de la Candelaria.[fn:1] El documento, escrito en 1676, fue el resultado de una pesquisa que llevaba más de un año sin que él lo supiera y respondía a una acusación del cura doctrinero de Oicatá, Agustín de Tovar, que declaró haberlo visitado para ganarse su amistad por la fama de santo que tenía en la región. En la humilde choza observó que tenía muchos cuadernos escritos con reflexiones que dijo eran dictadas por Dios. Se presentaba a hacer la denuncia por eso y porque en una página leyó proposiciones que le parecieron heréticas. Quería evitar que enseñara sus errores a otras personas que acudían a él en busca de consejo.[fn:2]",
      },
      {
        type: "paragraph",
        text: "En ese instante comenzó la secuencia de tormentos que a la larga acabaron con la vida de Joseph Ximénez, acusado de hereje, encarcelado, torturado y, doce años más tarde, quemado vivo en la hoguera, en un ostentoso Auto de Fe de la Inquisición de Cartagena de Indias, el 30 de mayo de 1688.[fn:3] El caso aparece ampliamente documentado en el libro Del desierto a la hoguera (Enciso, 1995).[fn:4]",
      },
      {
        type: "paragraph",
        text: "Después de tantos años, tres hechos confluyen para motivar este escrito y revivir la historia de este eremita: primero, la existencia de nuevas miradas sobre la memoria regional, con valiosos aportes desde el arte, el patrimonio histórico, la educación y la cultural local; segundo, la conmemoración de los 350 años del mandamiento de prisión en su contra y, tercero, el interés de muchas personas que no se enteraron de la publicación en su momento y que en los últimos meses han comprado y leído con entusiasmo Del desierto a la hoguera. Este resurgir está abriendo una veta de trabajo colectivo y de creación artística e histórica muy interesante con los vecinos del desierto y otros interesados en el tema. Así lo demuestra la preciosa escultura de Joseph elaborada por el artista y humanista Eduardo Rodríguez, vecino de Ráquira, que con gran sensibilidad nos presenta su imagen tridimensional como una reivindicación a su memoria como místico y mártir del desierto, considerando que padeció terribles sufrimientos y una muerte espantosa en defensa de sus creencias espirituales, aunque algunas fueran heréticas de acuerdo con los cánones de la Inquisición en el momento.",
      },
      {
        type: "paragraph",
        text: "Por otro lado, el renacer de este interesante personaje comprueba que, en efecto, responde al carácter de arquetipo y, por lo tanto, representa un simbolismo que subyace en el inconsciente colectivo a lo largo de los siglos. Su vida es un paradigma representado en el campesino aventurero, que luego es soldado y deja todo para retirarse al desierto, al igual que en su momento lo hicieron San Antonio y el mismo Jesucristo. En ese lugar que históricamente representa un espacio de silencio, espiritualidad y meditación, se convierte en escritor, eremita considerado santo y al final es acusado de hereje.",
      },
      {
        type: "paragraph",
        text: "Y bien que vale la pena recordarlo, porque Joseph Ximénez es un personaje excepcional en nuestra historia y en la historia de la Inquisición de Cartagena de Indias, lo cual se constata en el estudio Misticismo y herejía en la Nueva Granada, siglo XVII (Enciso, 2003),[fn:5] en el que se incluye la sistematización y tipología de una muestra ya depurada de 711 registros de reos procesados.[fn:6] En toda la muestra, desde la creación del Tribunal de Cartagena de Indias en 1610 hasta su cierre en 1821 se procesó únicamente a siete hombres por herejía formal, seis fueron condenados a relajar en la hoguera.[fn:7]",
      },
      {
        type: "paragraph",
        text: "Su caso, es insólito porque fue el único místico, ermitaño y escritor, acusado de hereje dogmatizante y quemado vivo por orden de la Inquisición de Cartagena de Indias. Solo él, entre los eremitas que moraban en el Desierto de la Candelaria, vecino del Santo Eccehomo y del monasterio de la Candelaria, fue condenado a la hoguera. Es el momento de reparar su memoria, pues fue martirizado por sus ideas y hacerlo, no como anteriormente por medio del libro Del desierto a la hoguera, sino en un proyecto colectivo alrededor del arte, la cultura local, la memoria, la educación y el contexto histórico del Desierto de la Candelaria.",
      },
      {
        type: "section-title",
        text: "Una mirada a su vida",
      },
      {
        type: "paragraph",
        text: "Joseph Ximénez (1632-1688) fue un niño campesino que nació en Guaro, un pueblito encaramado en la Sierra de Ronda, Málaga, al sur de España. Todos su familiares eran labradores, oficio tradicional de la región. Al ser apresado por los inquisidores, sus padres Alonso y Catalina habían fallecido.",
      },
      {
        type: "paragraph",
        text: "Cuando tenía 18 años y España estaba en plena guerra contra Portugal que buscaba independizarse se le presentó la oportunidad de convertirse en soldado de presidio, oficio que desempeñó durante tres años. Después fue contratado en Cádiz como soldado de la Armada Real, un oficio mejor pago y que le permitía viajar en los galeones oficiales, para luego formar parte del contingente de tierra asignado a la Provincia de Málaga. Estuvo diez años en la milicia, lo que podría dar cuenta de un interés aventurero, contrario a la calma del labriego en su terruño.",
      },
      {
        type: "paragraph",
        text: "En 1660 obtuvo una licencia para viajar a Guaro y visitar a su familia. Fue recibido con alegría y agasajos. Una de las anfitrionas era Ana, su vecina y amiga de la infancia que seguía soltera y aún se mostraba afectuosa, por lo que él interpretó sus gestos como una declaración. Una noche, al regresar de paseo, entró a su casa con la intención de solicitarla. Ella no quiso consentir, discutieron y al día siguiente lo acusó de querer forzarla, \"siendo falso porque eso no ocurrió.\"[fn:8] La buscó para reclamarle por lo dicho y, cerca del río, en medio de un fuerte alegato terminó cortándole la cara. Preocupado por el incidente se alejó varios días, pero fue emboscado por los hermanos de Ana con estoques, logró defenderse y huir. Lo común en la época era un nuevo enfrentamiento, cuestión de vida o muerte. Ocurrió al amanecer cuando disparó a uno de sus agresores y tuvo que escapar hacia Cádiz, donde consiguió trabajo en un galeón que partía hacia las Indias. Llegó a Santa Marta, en la Nueva Granada, y emprendió un viaje por el Río Grande de la Magdalena hasta Mariquita. Allá trabajó un año como labriego, y después como ayudante del gobernador del Caguán, Matías Carrillo.",
      },
      {
        type: "paragraph",
        text: "En Timaná conoció a una mujer llamada Juana, de quien se enamoró, le propuso matrimonio y se casaron. Para ese entonces ya tenía 30 años. Luego de la boda se trasladaron a Garzón. La unión duró dos años y medio de felicidad. No tuvieron hijos. Ambos trabajaban la tierra en un hato y él viajaba a vender mercaderías. Cierta vez tuvo que ausentarse durante un tiempo y al regresar se dio cuenta de que ella le era infiel. No la agredió, lo que hubiera sido aceptado por la sociedad patriarcal española de ese tiempo; más bien esperó el momento en que debía dejarla.",
      },
      {
        type: "paragraph",
        text: "Una noche se acostó a su lado, cuando de repente tuvo inspiración de Dios de que se retirase a buscarlo.[fn:9] Se levantó y salió en silencio. Caminó hacía un monte situado a una legua de distancia. Allí permaneció cuarenta días[fn:10] siguiendo un patrón de ayuno y oración, como Jesús. Al bajar del monte recorrió varios lugares buscando donde vivir. Visitó la virgen de Chiquinquirá, la Candelaria y el Santo Eccehomo. Milagrosamente apareció un pájaro que se le puso delante y le indicó el sitio donde formó su bohío. Con algunos maderos armó un camastro sobre el que dormía sin cubrirse, aun en las noches más frías. Talló con palo bruto unos asientos y una mesita, donde pasaba largas horas escribiendo. Había aprendido a deletrear y a escribir allí mismo. Todo su vestuario consistía en dos hábitos viejos y rotos de sayal. Se alimentaba de raíces, vegetales y, a veces, complementaba la dieta con pan y queso, que los frailes vecinos le regalaban.",
      },
      {
        type: "paragraph",
        text: "El convento de la Candelaria llamaba especialmente su atención, por haber sido fundado por un grupo de ermitaños que fueron a vivir al desierto para orar y construyeron en 1597 una pequeña ermita en homenaje a la Virgen de la Candelaria. Según la historia que conocía, cuando estos hombres llegaron al desierto vivían en cuevas labradas en las rocas y vestían con túnicas de sayal, dedicaban el tiempo a la contemplación de los divinos misterios, hacían penitencia y largos ayunos, y sólo rompían su retiro los domingos, para asistir a misa, confesarse y comulgar. Algunos años después, fundaron el convento (Enciso, 1995).",
      },
      {
        type: "paragraph",
        text: "Al retirarse al desierto, Joseph Ximénez tenía 33 años. De algún modo, buscaba un paralelismo entre su vida y la de Jesús. Era su modelo. Permaneció en el desierto once años, entre 1665 y 1676, cuando fue apresado. Allí se dedicó a la oración y a seguir el camino de la perfección espiritual, tomando elementos de los místicos españoles y teniendo claro que era necesario seguir unas etapas en el proceso. En sus cuadernos (29 en total, que escribió para formar un libro) explica las etapas o vías purgativa, iluminativa o contemplativa y unitiva. Esta última se refiere a la unión interior con Dios, que es mencionada por Santa Teresa de Jesús y por San Juan de la Cruz. Cuando percibió que había pasado por todas la etapas y que estaba en estado de unión con Dios dejó de ir a confesarse considerando que ya no necesitaba intermediarios. Como durante varios años visitó los conventos para asistir a los actos litúrgicos, el confesor habitual extrañó su ausencia. Esto sumado a que ya tenía seguidores (otros dos ermitaños habían llegado al desierto para imitarlo), escribía sus meditaciones y afirmaba que Dios le mandaba escribir lo que tenía anotado, hizo que los inquisidores se fijaran en él con recelo. La denuncia del cura que lo visitó, rápidamente fue aceptada.",
      },
      {
        type: "paragraph",
        text: "Cuando los inquisidores llegaron a su choza para tomarlo prisionero, hicieron un inventario de bienes, en el que se menciona el escaso mobiliario, las dos túnicas, unos pocos libros, los 29 cuadernos, un crucifijo y una medallita de la virgen de Chiquinquirá, entre otros objetos. Le pusieron grilletes en los tobillos y lo llevaron a la cárcel de Sáchica, después a Santafé, pasando primero por Villa de Leyva y Tunja. Como en todas partes llegaba gente a visitarlo, lo remitían a los conventos para que fuera aislado en celdas mientras continuaba el viaje hasta Cartagena de Indias, donde fue encerrado en una cárcel secreta durante 12 años hasta su relajación en la hoguera. No quiso retractarse de nada, porque estaba convencido de que sus escritos eran mandato de Dios.",
      },
      {
        type: "paragraph",
        text: "Un personaje como Joseph Ximénez se ubica en los márgenes de la sociedad colonial neogranadina; lo dice su vida en el desierto y se observa en sus ideas: no es como la gente de los más bajos estratos sociales porque sabe leer y escribir y es fanático estudioso de los temas religiosos, pero tampoco es un hombre ilustrado; pasa las horas en oración y retiro, como los monjes de los conventos aledaños, pero no es como ellos; su pensamiento es místico, pero linda con las fronteras de la herejía pasando el margen de lo permitido; es un ser extraño, salido de lo normal y fascinante.",
      },
      {
        type: "paragraph",
        text: "Su marginalidad no tiene relación con los poderes locales. Joseph no tenía poder sobre nadie ni sobre nada, no competía por el control político, social o económico con ninguna persona o grupo de la región; de hecho, era casi antisocial. Su fuerza estaba en los arquetipos que imitaba y representaba: el del eremita y el de Jesús en el desierto. De alguna manera, era la encarnación de un arquetipo y como tal podría influir en los hombres que deseaban imitarlo, así como él mismo había imitado a sus propios arquetipos (Enciso, 1995). Es probable que los inquisidores, viendo su poder de convocatoria, temieran la expansión de heterodoxos en la zona, como había ocurrido en España hacía algunos años con los alumbrados de Castilla y de Extremadura, también imitadores de viejos arquetipos. Es que, como dice Caro Baroja (1991), el arquetipo posee una especie de fuerza mágica que lo hace influir en los hombres, no sólo en el presente sino a lo largo del tiempo y aunque las circunstancias cambien.",
      },
      {
        type: "paragraph",
        text: "Otro tipo de marginalidad social, relacionada con las mentalidades y no sólo con los límites físicos de un lugar o con los estratos sociales, se relaciona con la función del ermitaño como intermediario entre la mentalidad de la iglesia y la de los hombres. Es una tarea que él mismo se asigna cuando dice que Dios le ordena transmitir sus enseñanzas a la humanidad; su posición es de mediador en una frontera mental. Estamos frente a un personaje que retoma lo que dice la doctrina católica, lo acomoda en su mente para comprenderlo y luego lo enseña a los demás en un lenguaje sencillo y pedagógico. Joseph Ximénez es un espíritu libre, se cree un instrumento que escribe lo que Dios le dicta; está en una posición privilegiada, en el borde que separa a Dios de los hombres y vive en ese margen durante varios años. Es tan especial y único que merece un lugar real en la historia y salir del silencio y la oscuridad donde fue obligado a permanecer por tanto tiempo.",
      },
      {
        type: "author-bio",
        text: "Doctora en Historia Social de la Universidad Federal Fluminense de Rio de Janeiro. Hizo su maestría en Historia en la Universidad Nacional de Colombia y una licenciatura en Educación en la Universidad San Buenaventura. Con más de treinta años de trayectoria, sus intereses académicos se centran en la investigación histórica, cultural y educativa con población rural, urbano marginal y grupos étnicos. Exprofesora universitaria. Directora y evaluadora de proyectos en Colombia y otros países desde 1991. Autora de diversos libros y artículos.",
      },
      { type: "archive-header" },
      {
        type: "archive-entry",
        text: "Archivo Histórico Nacional. Madrid. Fondo Inquisición de Cartagena de Indias. Proceso contra Joseph Ximénez. 1676. Legajo 1622. Cuaderno No. 4, folios 1r-163v.",
      },
      {
        type: "archive-entry",
        text: "Archivo Histórico Nacional. Madrid. Fondo Inquisición de Cartagena de Indias. Libro 1020 al 1023.",
      },
      {
        type: "archive-entry",
        text: "Biblioteca Nacional de Colombia. Bogotá. Fondo Raros y Curiosos. Cartilla para procesar del Santo Oficio de la Inquisición. Santafé. 1649. Libro 98, folios 1-76.",
      },
      { type: "bibliography-header" },
      {
        type: "bibliography-entry",
        text: "Ángel Alcalá y otros (1984). Inquisición Española y Mentalidad Inquisitorial. Editorial Ariel. Barcelona.",
      },
      {
        type: "bibliography-entry",
        text: "Ayape, Eugenio. O.A.R. fr. (1953). Historia del Desierto de la Candelaria. Editorial Salesiana. Bogotá.",
      },
      {
        type: "bibliography-entry",
        text: "Bennassar, Bartolomé (1981). Inquisición Española: poder político y control social. Editorial Crítica. Barcelona.",
      },
      {
        type: "bibliography-entry",
        text: "Briceño, Manuel. S.I. (1983). Estudio histórico crítico de El desierto prodigioso y prodigio del desierto, de don Pedro de Solís y Valenzuela. Publicaciones Instituto Caro y Cuervo. Bogotá.",
      },
      {
        type: "bibliography-entry",
        text: "Buitrago, Rubén O.A.R. (1965). Memorias biográficas de la. Provincial de Nuestra Señora de la Candelaria de la Orden de Recoletos de San Agustín 1663-1963. Editorial Pax. Bogotá.",
      },
      {
        type: "bibliography-entry",
        text: "Caro Baroja, Julio (1991). De los arquetipos y leyendas. Editorial Istmo. Madrid.",
      },
      {
        type: "bibliography-entry",
        text: "Enciso, Patricia (2003). Inquisição e Heresia Mística na Nova Granada, século XVII. Tesis de Doctorado en Historia. Universidad Federal Fluminense. Rio de Janeiro. Brasil.",
      },
      {
        type: "bibliography-entry",
        text: "Enciso, Patricia (1995). Del desierto a la hoguera. Edit. Ariel. Bogotá.",
      },
      {
        type: "bibliography-entry",
        text: "Enciso, Patricia (1995). \"Santo Oficio y eremitas en el desierto de La Candelaria\", en Inquisición, Muerte y Sexualidad en la Nueva Granada. Jaime Borja. Comp. Editorial Ariel-Ceja. Bogotá.",
      },
      {
        type: "bibliography-entry",
        text: "Tejado Fernández, Manuel. Aspectos de la vida social en Cartagena de Indias durante el seiscientos. Sevilla. Escuela de Estudios Hispanoamericanos. 1954.",
      },
      {
        type: "bibliography-entry",
        text: "Medina, José Toribio (1899). Historia del Tribunal del Santo Oficio de la Inquisición de Cartagena de Indias. Edit. Imprenta Elzeviriana. Santiago de Chile.",
      },
      {
        type: "bibliography-entry",
        text: "Orjuela, Héctor (1984). El desierto prodigioso y prodigio del desierto, de don Pedro de Solís y Valenzuela. Publicaciones Instituto Caro y Cuervo. Bogotá.",
      },
      {
        type: "bibliography-entry",
        text: "Juan de la Cruz, San (1950). Vida y obras. Madrid. Biblioteca de Autores Cristianos.",
      },
      {
        type: "bibliography-entry",
        text: "Splendiani, Anna María y otros. Cincuenta años de Inquisición en el Tribunal de Cartagena de Indias 1610-1660. 4 tomos. Bogotá. Instituto Colombiano de Cultura Hispánica - CEJA. 1997.",
      },
    ],
    footnotes: [
      {
        number: 1,
        text: "Archivo Histórico Nacional. Madrid. Fondo Inquisición de Cartagena de Indias. Proceso contra Joseph Ximénez. Folio 22 v. En adelante se cita solamente el número de folio.",
      },
      { number: 2, text: "Folio 2r." },
      { number: 3, text: "Medina (1899)." },
      {
        number: 4,
        text: "Producto de mi tesis de Postgrado en Historia (1995). Universidad Nacional de Colombia, Bogotá.",
      },
      {
        number: 5,
        text: "Investigación correspondiente a mi tesis de doctorado en Historia de la Universidad Federal Fluminense, Rio de Janeiro.",
      },
      { number: 6, text: "Se omitieron 21 registros que figuraban sin delito." },
      {
        number: 7,
        text: "Los condenados a la hoguera fueron un protestante, tres judaizantes y dos españoles (uno en estatua y otro, Joseph Ximénez, en vivo).",
      },
      {
        number: 8,
        text: "Joseph confesó esto al inquisidor Juan de Mier en la audiencia del 10 de Marzo de 1677. F.68r.",
      },
      { number: 9, text: "F. 66r." },
      { number: 10, text: "F.66r." },
    ],
  },
];
