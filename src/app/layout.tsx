import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { CatalogProvider } from "@/components/CatalogProvider";
import { Analytics } from "@/components/layout/Analytics";
import { Footer } from "@/components/layout/Footer";
import { GlobalNav } from "@/components/layout/GlobalNav";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { site } from "@/config/site";
import { absoluteUrl, defaultImage, siteUrl } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

// Demo para aprovação do cliente: fora dos buscadores (meta robots + robots.txt)
const isDemo = process.env.NEXT_PUBLIC_DEMO === "1";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "iPhone em Osasco: lacrado, seminovo e troca · Murilo Negócios",
    template: "%s · Murilo Negócios",
  },
  description: site.description,
  applicationName: site.brand,
  robots: isDemo ? { index: false, follow: false, nocache: true } : { index: true, follow: true, "max-image-preview": "large" },
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: "Murilo Negócios · iPhone em Osasco",
    description: site.description,
    url: absoluteUrl("/"),
    siteName: site.brand,
    locale: "pt_BR",
    type: "website",
    images: [defaultImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Murilo Negócios · iPhone em Osasco",
    description: site.description,
    images: [defaultImage.url],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#161617",
};

// Dados estruturados da loja (Google, Maps e assistentes de IA leem daqui)
const storeId = absoluteUrl("/#loja");
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "MobilePhoneStore",
    "@id": storeId,
    name: site.brand,
    alternateName: [site.name, site.legalName],
    slogan: site.slogan,
    description: site.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/marca/logo-murilo-negocios.webp"),
    image: [defaultImage.url, absoluteUrl("/store/parede-logo.jpg"), absoluteUrl("/store/equipe-reposicao.jpg")],
    telephone: "+55 11 99337-3710",
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "Osasco" },
      { "@type": "Country", name: "Brasil" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    paymentAccepted: "Pix, cartão, aparelho usado como parte do pagamento",
    currenciesAccepted: "BRL",
    knowsAbout: ["iPhone lacrado", "iPhone seminovo", "iPhone CPO (recondicionado oficial Apple)", "Troca de iPhone usado"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+55 11 99337-3710",
      url: `https://wa.me/${site.whatsappNumber}`,
      availableLanguage: "Portuguese",
    },
    hasMap: site.google.mapsUrl,
    sameAs: [site.instagram.url, site.linkInBio, site.google.mapsUrl],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.brand,
    url: absoluteUrl("/"),
    inLanguage: "pt-BR",
    publisher: { "@id": storeId },
  },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <CatalogProvider>
          <GlobalNav />
          <main>{children}</main>
          <Footer />
          <MobileStickyBar />
          <Analytics />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </CatalogProvider>
      </body>
    </html>
  );
}
