import type { Metadata } from "next";
import Link from "next/link";
import { Showcase } from "@/components/Showcase";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "iPhones lacrados em Osasco",
  description: "iPhone 18, 17, 16 e anteriores, lacrados e CPO, com preço à vista. Consulte o estoque da loja de Osasco pelo WhatsApp.",
};

export default function IphonePage() {
  return (
    <>
      <PageHeader
        eyebrow="Vitrine"
        title="Todos os iPhones."
        sub="Escolha modelo, cor e capacidade. A gente confirma o estoque na hora pelo WhatsApp."
      />
      <section className="bg-mist pb-24">
        <div className="wrap">
          <Showcase />
          <p className="mt-12 text-center text-[15px] text-ink-soft">
            Não encontrou o modelo, a cor ou a capacidade?{" "}
            <Link href="/encomenda" className="link-more">
              A gente encomenda ›
            </Link>
          </p>
        </div>
      </section>
      <ClosingCta source="vitrine-final" />
    </>
  );
}
