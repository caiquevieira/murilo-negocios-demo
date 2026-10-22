import type { Metadata } from "next";
import Link from "next/link";
import { Showcase } from "@/components/Showcase";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "iPhones lacrados em Osasco",
  description: "iPhone 18, 17, 16 e anteriores, lacrados e CPO, com preço à vista. À pronta entrega na loja de Osasco.",
};

export default function IphonePage() {
  return (
    <>
      <PageHeader
        eyebrow="Vitrine"
        title="Todos os iPhones."
        sub="Todos à pronta entrega. Escolha modelo, cor e capacidade e reserve pelo WhatsApp."
      />
      <section className="bg-mist pb-24">
        <div className="wrap">
          <Showcase />
          <p className="mt-12 text-center text-[15px] text-ink-soft">
            Todos os modelos da vitrine estão à pronta entrega.{" "}
            <Link href="/comparar" className="link-more">
              Compare com o seu iPhone ›
            </Link>
          </p>
        </div>
      </section>
      <ClosingCta source="vitrine-final" />
    </>
  );
}
