import Link from "next/link";
import { LeadLink } from "@/components/ui/LeadLink";
import { Monogram } from "@/components/ui/Monogram";
import { WhatsAppIcon } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <section className="marble grid min-h-[70vh] place-items-center py-20 text-center">
      <div className="wrap">
        <Monogram className="mx-auto h-20" />
        <h1 className="t-section mt-6">Página não encontrada.</h1>
        <p className="t-callout mt-3">Mas o seu próximo iPhone está por aqui.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/iphone" className="btn btn-dark">
            Ver iPhones
          </Link>
          <LeadLink channel="whatsapp" source="404" className="btn btn-whatsapp">
            <WhatsAppIcon /> Falar no WhatsApp
          </LeadLink>
        </div>
      </div>
    </section>
  );
}
