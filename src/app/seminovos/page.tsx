import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Showcase } from "@/components/Showcase";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { InstagramBlock } from "@/components/sections/InstagramBlock";
import { PageHeader } from "@/components/sections/PageHeader";
import { VerificationList } from "@/components/sections/VerificationList";
import { LeadLink } from "@/components/ui/LeadLink";
import { WhatsAppIcon } from "@/components/ui/icons";
import { seminovosMessage } from "@/lib/whatsapp";

export const metadata: Metadata = pageMetadata({
  path: "/seminovos/",
  title: "iPhone seminovo revisado em Osasco",
  description:
    "iPhone seminovo com bateria informada em %, IMEI limpo e testes completos, na loja física do Centro de Osasco. Peça a lista do dia pelo WhatsApp.",
});

export default function SeminovosPage() {
  return (
    <>
      <PageHeader
        tone="dark"
        eyebrow="Seminovos"
        title={
          <>
            Seminovo de verdade.
            <br />
            <span className="gold-text">Sem surpresa.</span>
          </>
        }
        sub="Cada aparelho passa pelas mãos do Murilo antes de chegar até você."
      >
        <LeadLink channel="whatsapp" source="seminovos-topo" message={seminovosMessage()} className="btn btn-whatsapp">
          <WhatsAppIcon /> Receber a lista de hoje
        </LeadLink>
      </PageHeader>

      <section className="bg-mist py-16 md:py-24">
        <div className="wrap">
          <p className="mb-8 text-center text-[15px] text-ink-soft">
            Estoque rotativo: confirme a disponibilidade no WhatsApp.
          </p>
          <Showcase only={["seminovos"]} showFilters={false} />
        </div>
      </section>

      <VerificationList />
      <InstagramBlock source="seminovos-instagram" />
      <ClosingCta source="seminovos-final" />
    </>
  );
}
