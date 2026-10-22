import type { Metadata } from "next";
import { ProductPage } from "@/components/ProductPage";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { InstagramBlock } from "@/components/sections/InstagramBlock";

export const metadata: Metadata = {
  title: "iPhone à pronta entrega em Osasco",
  description: "iPhone à pronta entrega na loja física do Centro de Osasco. Reserve pelo WhatsApp.",
};

/** Aparelhos cadastrados só na planilha (sem página gerada no build): /iphone/ver/?id=… */
export default function NovoProdutoPage() {
  return (
    <>
      <ProductPage />
      <InstagramBlock source="produto-novo-bloco" />
      <ClosingCta source="produto-novo-final" />
    </>
  );
}
