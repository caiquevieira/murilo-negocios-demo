import type { Metadata, Viewport } from "next";
import { Cinzel, Inter } from "next/font/google";
import { CatalogProvider } from "@/components/CatalogProvider";
import { Analytics } from "@/components/layout/Analytics";
import { Footer } from "@/components/layout/Footer";
import { GlobalNav } from "@/components/layout/GlobalNav";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { site } from "@/config/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });

// Demo para aprovação do cliente: fora dos buscadores (meta robots + robots.txt)
const isDemo = process.env.NEXT_PUBLIC_DEMO === "1";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Murilo Negócios · iPhone em Osasco | Lacrados, seminovos e troca",
    template: "%s · Murilo Negócios",
  },
  description: site.description,
  robots: isDemo ? { index: false, follow: false, nocache: true } : undefined,
  openGraph: {
    title: "Murilo Negócios · O especialista em iPhone de Osasco",
    description: site.description,
    locale: "pt_BR",
    type: "website",
    images: ["/store/parede-logo.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#161617",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: site.legalName,
  image: `${site.url}/store/parede-logo.jpg`,
  telephone: "+55 11 99337-3710",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  hasMap: site.google.mapsUrl,
  sameAs: [site.instagram.url],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cinzel.variable}`}>
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
