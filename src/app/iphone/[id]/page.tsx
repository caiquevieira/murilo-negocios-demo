import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { InstagramBlock } from "@/components/sections/InstagramBlock";
import { getProduct, lowestPrice, products } from "@/data/products";
import { formatBRL } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) return {};
  const kind = p.condition === "seminovo" ? "seminovo" : p.condition === "cpo" ? "CPO" : "lacrado";
  return {
    title: `${p.name} ${kind} em Osasco por ${formatBRL(lowestPrice(p))}`,
    description: `${p.name} ${kind} na loja física do Centro de Osasco. ${p.tagline} Consulte o estoque pelo WhatsApp.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <>
      <ProductDetail product={product} />
      <InstagramBlock source={`produto-${product.id}-bloco`} />
      <ClosingCta source={`produto-${product.id}-final`} />
    </>
  );
}
