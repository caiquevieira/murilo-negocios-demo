"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProduct } from "./CatalogProvider";
import { ProductDetail } from "./ProductDetail";

/** Página de produto com os dados da planilha. Sem `id`, lê o ?id= da URL (aparelhos novos). */
export function ProductPage({ id: fixedId }: { id?: string }) {
  const [id, setId] = useState(fixedId ?? "");
  useEffect(() => {
    if (!fixedId) setId(new URLSearchParams(window.location.search).get("id") ?? "");
  }, [fixedId]);

  const { product, ready } = useProduct(id);

  if (product) return <ProductDetail product={product} />;

  return (
    <section className="bg-white py-24 text-center md:py-32">
      <div className="wrap">
        {ready && id ? (
          <>
            <p className="t-eyebrow">Vitrine</p>
            <h1 className="t-section mt-3">Este aparelho saiu da vitrine.</h1>
            <p className="t-callout mx-auto mt-4 max-w-[40ch]">Veja os iPhones à pronta entrega ou fale com a gente no WhatsApp.</p>
            <Link href="/iphone" className="btn btn-dark mt-8">
              Ver todos os iPhones
            </Link>
          </>
        ) : (
          <div aria-busy className="mx-auto h-[420px] max-w-[900px] animate-pulse rounded-[var(--radius-tile)] bg-mist" />
        )}
      </div>
    </section>
  );
}
