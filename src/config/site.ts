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
    // Por segurança, só a rua. Número e sala são passados no WhatsApp ao agendar a visita.
    street: "Av. Hilário Pereira de Souza",
    district: "Centro",
    city: "Osasco",
    state: "SP",
    label: "Osasco - Centro",
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

  // Medição de conversão. Cole os IDs quando tiver; vazio = script não é carregado.
  analytics: {
    ga4Id: "", // ex.: "G-XXXXXXXXXX"
    metaPixelId: "", // ex.: "123456789012345"
  },
} as const;
