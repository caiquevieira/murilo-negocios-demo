import type { Metadata } from "next";
import { site } from "@/config/site";

/** Endereço público do site (a demo do GitHub Pages passa o próprio endereço no build). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/$/, "");

/** URL absoluta de uma página ou arquivo do site, com a barra final usada pelo export estático. */
export function absoluteUrl(path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${clean}`;
}

export const defaultImage = { url: absoluteUrl("/og/murilo-negocios.jpg"), width: 1200, height: 630, alt: "Murilo Negócios: iPhone lacrado, seminovo e troca no Centro de Osasco" };

/** Metadados completos de uma página: título, descrição, canônica, Open Graph e Twitter. */
export function pageMetadata({
  path,
  title,
  description,
  image,
}: {
  path: string;
  title: string;
  description: string;
  image?: { url: string; alt: string };
}): Metadata {
  const url = absoluteUrl(path);
  const images = [image ? { url: absoluteUrl(image.url), alt: image.alt } : defaultImage];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} · ${site.brand}`, description, url, siteName: site.brand, locale: "pt_BR", type: "website", images },
    twitter: { card: "summary_large_image", title: `${title} · ${site.brand}`, description, images: images.map((i) => i.url) },
  };
}
