import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage as ProductView } from "@/components/ProductPage";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { InstagramBlock } from "@/components/sections/InstagramBlock";
import { getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) return {};
  const kind = p.condition === "seminovo" ? "seminovo" : p.condition === "cpo" ? "CPO" : "lacrado";
  return {
    title: `${p.name} ${kind} em Osasco`,
    description: `${p.name} ${kind} à pronta entrega na loja física do Centro de Osasco. ${p.tagline}`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <>
      <ProductView id={product.id} />
      <InstagramBlock source={`produto-${product.id}-bloco`} />
      <ClosingCta source={`produto-${product.id}-final`} />
    </>
  );
}
