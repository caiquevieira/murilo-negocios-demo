import { LeadLink } from "../ui/LeadLink";

export function PromoRibbon() {
  return (
    <div className="bg-mist text-center text-[14px] text-ink-soft">
      <p className="wrap py-3">
        Ofertas novas todos os dias nos Stories e no Status do WhatsApp.{" "}
        <LeadLink channel="instagram" source="faixa-topo" className="link-more">
          Ver ofertas de hoje ›
        </LeadLink>
      </p>
    </div>
  );
}
