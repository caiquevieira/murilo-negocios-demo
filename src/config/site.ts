// Dados centrais da loja. Altere aqui e o site inteiro é atualizado.
export const site = {
  name: "TechShop",
  brand: "Murilo Negócios",
  legalName: "TechShop · Murilo Negócios",
  slogan: "Aqui é sempre um bom negócio",
  description:
    "iPhones novos e lacrados, seminovos revisados e troca do seu usado. Loja física no Centro de Osasco, atendimento para todo o Brasil.",
  url: "https://techshop.example.com", // TODO: domínio definitivo

  // DDI + DDD + número, apenas dígitos
  whatsappNumber: "5511993373710",
  phoneLabel: "(11) 99337-3710",

  address: {
    street: "Av. Hilário Pereira de Souza, 406",
    district: "Centro",
    city: "Osasco",
    state: "SP",
    label: "Osasco - Centro",
  },

  google: {
    // Ficha da loja no Google: rota/mapa e página para deixar avaliação
    mapsUrl: "https://share.google/P3xU5cRwPsdguaXAb",
    reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJPVxvrPT_zpQRUQBMScAWnO8",
    // Mapa embutido (sem chave de API): busca pelo endereço
    embedUrl:
      "https://maps.google.com/maps?q=" +
      encodeURIComponent("Av. Hilário Pereira de Souza, 406 - Centro, Osasco - SP") +
      "&z=16&output=embed",
  },

  hours: {
    label: "Segunda a Domingo, das 09:00 às 20:00",
    short: "Seg a Dom · 09h às 20h",
    open: 9,
    close: 20,
    timeZone: "America/Sao_Paulo",
    note: "Visitas somente com horário agendado pelo WhatsApp.",
  },

  instagram: {
    handle: "@murilonegocioss",
    url: "https://www.instagram.com/murilonegocioss/",
    followers: "16,8 mil",
  },
  linkInBio: "https://linklist.bio/murilonegocios",
  email: "techshopfyonline@gmail.com",
  googleRating: "5,0",
  payment: "Pix, cartão ou seu aparelho atual como parte do pagamento.",

  credits: { name: "Underline Lab", url: "https://underlinelab.com.br" },

  // Planilha do Google com o catálogo e a tabela de troca (o ID fica no link: /spreadsheets/d/<ID>/edit).
  // Vazio = o site usa o catálogo de src/data/products.ts.
  catalogSheetId: "1jkDR1hyGcKovWfU7kI0lfGVSqKadDu33cY-Mb2z6IWE",

  // Medição de conversão. Cole os IDs quando tiver; vazio = script não é carregado.
  analytics: {
    ga4Id: "", // ex.: "G-XXXXXXXXXX"
    metaPixelId: "", // ex.: "123456789012345"
  },
} as const;
