export type Category = "lancamentos" | "linha-17" | "linha-16" | "anteriores" | "seminovos";

export type ProductColor = {
  name: string;
  hex: string;
  /** Foto real só desta cor (aparece quando a cor está selecionada) */
  image?: string;
};
export type ProductStorage = { capacity: string; price: number; priceFrom?: number };

export type Product = {
  id: string;
  name: string;
  category: Category;
  condition: "lacrado" | "cpo" | "seminovo";
  badge?: string;
  tagline: string;
  /** Foto com a linha de cores completa (card e fallback da página) */
  image?: string;
  /** A foto da linha tem fundo preto: exibir sobre painel escuro */
  imageOnDark?: boolean;
  storages: ProductStorage[];
  colors: ProductColor[];
  /** Apenas seminovos: saúde da bateria em % */
  battery?: number;
};

export const categories: { id: Category | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "lancamentos", label: "iPhone 18" },
  { id: "linha-17", label: "iPhone 17" },
  { id: "linha-16", label: "iPhone 16" },
  { id: "anteriores", label: "Anteriores" },
  { id: "seminovos", label: "Seminovos" },
];

const proTitanium: ProductColor[] = [
  { name: "Titânio-deserto", hex: "#c4a888" },
  { name: "Titânio natural", hex: "#bab5ab" },
  { name: "Titânio branco", hex: "#e8e6e1" },
  { name: "Titânio preto", hex: "#3c3b39" },
];

const pro17: ProductColor[] = [
  { name: "Laranja-cósmico", hex: "#e2793a" },
  { name: "Azul-profundo", hex: "#34415c" },
  { name: "Prateado", hex: "#dedfe0" },
];

const pro18: ProductColor[] = [
  { name: "Vinho-escuro", hex: "#5e2330" },
  { name: "Prateado", hex: "#dedfe0" },
  { name: "Azul-claro", hex: "#b4c8de" },
  { name: "Preto", hex: "#2f3033" },
];

// As cores são referência visual; a disponibilidade de cada uma é confirmada no WhatsApp.
export const products: Product[] = [
  {
    id: "iphone-18-pro-max", name: "iPhone 18 Pro Max", category: "lancamentos", condition: "lacrado", badge: "Lançamento",
    tagline: "O maior. O mais Pro.", image: "/produtos/iphone-18-pro-max-linha.webp",
    colors: pro18.map((c) => (c.name === "Vinho-escuro" ? { ...c, image: "/produtos/iphone-18-pro-max-vinho-escuro.webp" } : c)),
    storages: [{ capacity: "256GB", priceFrom: 14999, price: 10899 }],
  },
  {
    id: "iphone-18-pro", name: "iPhone 18 Pro", category: "lancamentos", condition: "lacrado", badge: "Lançamento",
    tagline: "Todo o Pro na palma da mão.", image: "/produtos/iphone-18-pro-linha-escuro.webp", imageOnDark: true,
    colors: pro18.map((c) => (c.name === "Prateado" ? { ...c, image: "/produtos/iphone-18-pro-prateado.webp" } : c)),
    storages: [{ capacity: "256GB", priceFrom: 14000, price: 8599 }],
  },
  {
    id: "iphone-17-pro-max", name: "iPhone 17 Pro Max", category: "linha-17", condition: "lacrado", badge: "Reposição",
    tagline: "Tela enorme. Bateria de sobra.", image: "/produtos/iphone-17-pro-max-linha.webp", colors: pro17.map((c) => (c.name === "Laranja-cósmico" ? { ...c, image: "/produtos/iphone-17-pro-max-laranja-cosmico.webp" } : c)),
    storages: [{ capacity: "256GB", priceFrom: 8000, price: 7699 }],
  },
  {
    id: "iphone-17-pro", name: "iPhone 17 Pro", category: "linha-17", condition: "lacrado", badge: "Reposição",
    tagline: "Pro de verdade, tamanho certo.", image: "/produtos/iphone-17-pro-linha-escuro.webp", imageOnDark: true,
    colors: pro17.map((c) => (c.name === "Azul-profundo" ? { ...c, image: "/produtos/iphone-17-pro-azul-profundo.webp" } : c)),
    storages: [{ capacity: "256GB", priceFrom: 7599, price: 7299 }],
  },
  {
    id: "iphone-17-air", name: "iPhone 17 Air", category: "linha-17", condition: "lacrado",
    tagline: "Fino de um jeito que impressiona.", image: "/produtos/iphone-17-air-linha.webp",
    colors: [
      { name: "Azul-céu", hex: "#c7d8ea" },
      { name: "Dourado-claro", hex: "#e8dbc0" },
      { name: "Branco-nuvem", hex: "#f1f0ec" },
      { name: "Preto-espacial", hex: "#27282b", image: "/produtos/iphone-17-air-preto-espacial.webp" },
    ],
    storages: [{ capacity: "256GB", priceFrom: 6599, price: 5999 }],
  },
  {
    id: "iphone-17", name: "iPhone 17", category: "linha-17", condition: "lacrado", badge: "1 ano de garantia",
    tagline: "O essencial, muito bem feito.", image: "/produtos/iphone-17-linha.webp",
    colors: [
      { name: "Lavanda", hex: "#c9c0e0", image: "/produtos/iphone-17-lavanda.webp" },
      { name: "Sálvia", hex: "#b7c4a5" },
      { name: "Azul-névoa", hex: "#a8bed5" },
      { name: "Branco", hex: "#f0f0ee" },
      { name: "Preto", hex: "#2c2c2e" },
    ],
    storages: [{ capacity: "256GB", priceFrom: 5999, price: 5599 }],
  },
  {
    id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", category: "linha-16", condition: "lacrado",
    tagline: "Titânio e tela gigante.", image: "/produtos/iphone-16-pro-max-linha.webp",
    colors: proTitanium.map((c) => (c.name === "Titânio preto" ? { ...c, image: "/produtos/iphone-16-pro-max-titanio-preto.webp" } : c)),
    storages: [{ capacity: "256GB", priceFrom: 6999, price: 6499 }],
  },
  {
    id: "iphone-16-pro", name: "iPhone 16 Pro", category: "linha-16", condition: "lacrado",
    tagline: "Câmera Pro. Preço de oportunidade.", image: "/produtos/iphone-16-pro-linha-escuro.webp", imageOnDark: true, colors: proTitanium.map((c) => (c.name === "Titânio-deserto" ? { ...c, image: "/produtos/iphone-16-pro-titanio-deserto.webp" } : c)),
    storages: [{ capacity: "128GB", priceFrom: 7100, price: 6099.99 }],
  },
  {
    id: "iphone-16", name: "iPhone 16", category: "linha-16", condition: "lacrado",
    tagline: "Cores vivas para o dia a dia.", image: "/produtos/iphone-16-linha.webp",
    colors: [
      { name: "Ultramarino", hex: "#5b6fd4", image: "/produtos/iphone-16-ultramarino.webp" },
      { name: "Verde-acinzentado", hex: "#a4c2bd" },
      { name: "Rosa", hex: "#f0b8c7" },
      { name: "Branco", hex: "#f0f0ee" },
      { name: "Preto", hex: "#2c2c2e" },
    ],
    storages: [{ capacity: "256GB", priceFrom: 6200, price: 4999 }],
  },
  {
    id: "iphone-16e", name: "iPhone 16E", category: "linha-16", condition: "lacrado",
    tagline: "Seu primeiro iPhone começa aqui.", image: "/produtos/iphone-16e-linha.webp",
    colors: [
      { name: "Branco", hex: "#f0f0ee", image: "/produtos/iphone-16e-branco.webp" },
      { name: "Preto", hex: "#2c2c2e" },
    ],
    storages: [{ capacity: "128GB", priceFrom: 3999, price: 3499 }],
  },
  {
    id: "iphone-15-pro-max-cpo", name: "iPhone 15 Pro Max", category: "anteriores", condition: "cpo", badge: "CPO",
    tagline: "Recondicionado oficial, com garantia.", image: "/produtos/iphone-15-pro-max-linha.webp",
    colors: [
      { name: "Titânio azul", hex: "#3f4a5a" },
      { name: "Titânio natural", hex: "#bab5ab", image: "/produtos/iphone-15-pro-max-titanio-natural.webp" },
      { name: "Titânio branco", hex: "#e8e6e1" },
      { name: "Titânio preto", hex: "#3c3b39" },
    ],
    storages: [{ capacity: "256GB", priceFrom: 6599, price: 5999 }],
  },
  {
    id: "iphone-15", name: "iPhone 15", category: "anteriores", condition: "lacrado",
    tagline: "USB-C e câmera de 48 MP.", image: "/produtos/iphone-15-linha.webp",
    colors: [
      { name: "Rosa", hex: "#f1d3d6", image: "/produtos/iphone-15-rosa.webp" },
      { name: "Amarelo", hex: "#f0e8b7" },
      { name: "Verde", hex: "#c9d7c2" },
      { name: "Azul", hex: "#c8d5df" },
      { name: "Preto", hex: "#3a3c3f" },
    ],
    storages: [{ capacity: "128GB", priceFrom: 5100, price: 4199 }],
  },
  {
    id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", category: "anteriores", condition: "lacrado",
    tagline: "Clássico Pro, ainda muito atual.", image: "/produtos/iphone-14-pro-max-linha.webp",
    colors: [
      { name: "Roxo-profundo", hex: "#594d61", image: "/produtos/iphone-14-pro-max-roxo-profundo.webp" },
      { name: "Dourado", hex: "#f1dfc0" },
      { name: "Prateado", hex: "#e7e7e5" },
      { name: "Preto-espacial", hex: "#3c3b3a" },
    ],
    storages: [{ capacity: "128GB", priceFrom: 4999, price: 4599 }],
  },
  {
    id: "iphone-13-pro-cpo", name: "iPhone 13 Pro", category: "anteriores", condition: "cpo", badge: "CPO",
    tagline: "Tela ProMotion pelo melhor preço.", image: "/produtos/iphone-13-pro-linha.webp",
    colors: [
      { name: "Azul-sierra", hex: "#a6c0d8" },
      { name: "Grafite", hex: "#4c4b49" },
      { name: "Dourado", hex: "#f2e2c5", image: "/produtos/iphone-13-pro-dourado.webp" },
      { name: "Prateado", hex: "#e8e8e6" },
      { name: "Verde-alpino", hex: "#58665a" },
    ],
    storages: [{ capacity: "128GB", priceFrom: 4299, price: 3799 }],
  },

  // Seminovos: EXEMPLOS de estoque rotativo (modelos, preços e bateria). Substitua pelos aparelhos reais.
  {
    id: "seminovo-15-pro-max", name: "iPhone 15 Pro Max", category: "seminovos", condition: "seminovo", battery: 91,
    tagline: "Revisado, com procedência.",
    colors: [{ name: "Titânio natural", hex: "#bab5ab", image: "/produtos/iphone-15-pro-max-titanio-natural.webp" }],
    storages: [{ capacity: "256GB", price: 4899 }],
  },
  {
    id: "seminovo-14-pro-max", name: "iPhone 14 Pro Max", category: "seminovos", condition: "seminovo", battery: 88,
    tagline: "Revisado, com procedência.",
    colors: [{ name: "Roxo-profundo", hex: "#594d61", image: "/produtos/iphone-14-pro-max-roxo-profundo.webp" }],
    storages: [{ capacity: "128GB", price: 3699 }],
  },
  {
    id: "seminovo-13-pro", name: "iPhone 13 Pro", category: "seminovos", condition: "seminovo", battery: 86,
    tagline: "Revisado, com procedência.",
    colors: [{ name: "Dourado", hex: "#f2e2c5", image: "/produtos/iphone-13-pro-dourado.webp" }],
    storages: [{ capacity: "128GB", price: 2899 }],
  },
  {
    id: "seminovo-13", name: "iPhone 13", category: "seminovos", condition: "seminovo", battery: 85,
    tagline: "Revisado, com procedência.",
    colors: [{ name: "Meia-noite", hex: "#2e3238", image: "/produtos/iphone-13-meia-noite.webp" }],
    storages: [{ capacity: "128GB", price: 2399 }],
  },
];

export const conditionLabel: Record<Product["condition"], string> = {
  lacrado: "Novo · Lacrado",
  cpo: "CPO · Recondicionado Apple",
  seminovo: "Seminovo revisado",
};

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

/** Primeira cor com foto real; assim o produto abre mostrando a foto. */
export function defaultColorIndex(p: Product) {
  const i = p.colors.findIndex((c) => c.image);
  return i >= 0 ? i : 0;
}

export function lowestPrice(p: Product) {
  return Math.min(...p.storages.map((s) => s.price));
}
