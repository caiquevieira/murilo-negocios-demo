import type { Metadata } from "next";
import { StoreStatus } from "@/components/StoreStatus";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { GoogleReview } from "@/components/sections/GoogleReview";
import { InstagramBlock } from "@/components/sections/InstagramBlock";
import { PageHeader } from "@/components/sections/PageHeader";
import { StoreSection } from "@/components/sections/StoreSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { LeadLink } from "@/components/ui/LeadLink";
import { WhatsAppIcon } from "@/components/ui/icons";
import { visitMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Loja física no Centro de Osasco",
  description:
    "Loja física na Av. Hilário Pereira de Souza, 406, Centro de Osasco. Segunda a domingo, 09h às 20h, com visita agendada pelo WhatsApp.",
};

export default function LojaPage() {
  return (
    <>
      <PageHeader
        tone="dark"
        eyebrow="Loja física"
        title={
          <>
            Centro de Osasco.
            <br />
            <span className="gold-text">Te esperamos.</span>
          </>
        }
        sub="Segunda a domingo, das 09h às 20h. Visitas somente com horário marcado pelo WhatsApp."
      >
        <LeadLink channel="whatsapp" source="loja-topo" message={visitMessage()} className="btn btn-whatsapp">
          <WhatsAppIcon /> Agendar visita
        </LeadLink>
        <div className="w-full pt-2">
          <StoreStatus dark />
        </div>
      </PageHeader>
      <StoreSection withPhotos />
      <TeamSection />
      <GoogleReview source="loja-avaliacao" />
      <InstagramBlock source="loja-instagram" />
      <ClosingCta source="loja-final" />
    </>
  );
}
