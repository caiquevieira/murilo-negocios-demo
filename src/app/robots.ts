import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

// A demo fica fora dos buscadores; o site publicado libera tudo, inclusive para buscadores de IA
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_DEMO === "1") return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: absoluteUrl("/sitemap.xml") };
}
