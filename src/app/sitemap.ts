import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/iphone/", priority: 0.9, changeFrequency: "daily" },
    { path: "/seminovos/", priority: 0.8, changeFrequency: "daily" },
    { path: "/troca/", priority: 0.8, changeFrequency: "weekly" },
    { path: "/comparar/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/loja/", priority: 0.7, changeFrequency: "monthly" },
  ];
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), lastModified: now, changeFrequency: p.changeFrequency, priority: p.priority })),
    ...products.map((p) => ({ url: absoluteUrl(`/iphone/${p.id}/`), lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
