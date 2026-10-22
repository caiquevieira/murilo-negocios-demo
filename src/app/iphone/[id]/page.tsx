import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage as ProductView } from "@/components/ProductPage";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { InstagramBlock } from "@/components/sections/InstagramBlock";
import { getProduct, products } from "@/data/products";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) return {};
  const kind = p.condition === "seminovo" ? "seminovo" : p.condition === "cpo" ? "CPO" : "lacrado";
  return pageMetadata({
    path: `/iphone/${p.id}/`,
    title: `${p.name} ${kind} em Osasco`,
    description: `${p.name} ${kind} à pronta entrega na loja física do Centro de Osasco. ${p.tagline} Reserve pelo WhatsApp.`,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: product.condition === "seminovo" ? "Seminovos" : "iPhone", item: absoluteUrl(product.condition === "seminovo" ? "/seminovos/" : "/iphone/") },
      { "@type": "ListItem", position: 3, name: product.name, item: absoluteUrl(`/iphone/${product.id}/`) },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <ProductView id={product.id} />
      <InstagramBlock source={`produto-${product.id}-bloco`} />
      <ClosingCta source={`produto-${product.id}-final`} />
    </>
  );
}
