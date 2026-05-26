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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus.",
      "[ESPACIO PARA IMAGEN]",
      "Fusce dui leo, congue a, semper bibendum, amet ante. Phasellus purus. Proin neque massa, cursus ut, porta nec, laoreet a, lorem. In hac habitasse platea dictumst. Suspendisse potenti. Vivamus laoreet. Cras placerat accumsan nulla. Aliquam erat volutpat. Aliquam convallis sollicitudin purus.",
      "Praesent eget sem vel leo ultrices bibendum. Aenean faucibus. Morbi dolor nulla, malesuada sed, iaculis sit amet, auctor ut, ligula. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem. Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      "Mauris et ligula quis erat dignissim porttitor. Praesent in nunc id felis tempor varius. Etiam laoreet, libero sit amet sit amet, ligula. Vestibulum commodo. Ut ultrices, nisi ac varius, leo arcu tempus magna, sed luctus erat diam a sapien. Proin congue, erat eget pretium, metus elit, convallis sem."
    ]
  }
];
