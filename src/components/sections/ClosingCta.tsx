import { site } from "@/config/site";
import { LeadLink } from "../ui/LeadLink";
import { Monogram } from "../ui/Monogram";
import { Reveal } from "../ui/Reveal";
import { InstagramIcon, WhatsAppIcon } from "../ui/icons";

export function ClosingCta({ source = "cta-final" }: { source?: string }) {
  return (
    <section className="dark relative overflow-hidden bg-night-soft py-24 text-white md:py-32">
      <Monogram className="pointer-events-none absolute -right-24 -bottom-24 h-[420px] opacity-[0.08]" />
      <div className="wrap relative text-center">
        <Reveal>
          <p className="t-eyebrow">Fale com a gente</p>
          <h2 className="t-section mt-3">Vamos conversar?</h2>
          <p className="t-sub mx-auto mt-4 max-w-[34ch] text-white/70">
            Tire dúvidas, consulte um modelo ou combine sua visita à loja.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LeadLink channel="whatsapp" source={source} className="btn btn-whatsapp w-full sm:w-auto">
              <WhatsAppIcon /> Falar no WhatsApp
            </LeadLink>
            <LeadLink channel="instagram" source={source} className="btn btn-ghost w-full sm:w-auto">
              <InstagramIcon /> {site.instagram.handle}
            </LeadLink>
          </div>
          <p className="mt-6 text-[14px] text-white/50">{site.payment} Não trabalhamos com boleto.</p>
        </Reveal>
      </div>
    </section>
  );
}
