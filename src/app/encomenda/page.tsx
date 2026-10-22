import type { Metadata } from "next";
import { OrderForm } from "@/components/OrderForm";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { PageHeader } from "@/components/sections/PageHeader";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Encomende seu iPhone",
  description: "Não encontrou o modelo, a cor ou a capacidade? A Murilo Negócios encomenda para você. Retirada com horário agendado em Osasco.",
};

export default function EncomendaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Encomenda"
        title="Não achou o seu? A gente traz."
        sub="Qualquer iPhone, na cor e na capacidade que você quiser."
      />
      <section className="bg-mist pb-20 md:pb-28">
        <div className="wrap grid items-center gap-10 md:grid-cols-[1fr_1.2fr]">
          <Reveal className="relative hidden aspect-square md:block">
            <Image
              src="/produtos/iphone-17-air-linha.webp"
              alt="iPhone 17 Air em quatro cores"
              fill
              sizes="(min-width: 768px) 460px, 100vw"
              className="object-contain mix-blend-multiply"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <OrderForm />
          </Reveal>
        </div>
      </section>
      <ClosingCta source="encomenda-final" />
    </>
  );
}
