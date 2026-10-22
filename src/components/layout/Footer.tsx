import Link from "next/link";
import { site } from "@/config/site";
import { visitMessage } from "@/lib/whatsapp";
import { LeadLink } from "../ui/LeadLink";
import { Wordmark } from "../ui/Monogram";

export function Footer() {
  return (
    <footer className="bg-mist pb-28 text-[12px] leading-[1.4] text-black/60 md:pb-10">
      <div className="wrap">
        <div className="border-b border-line py-8">
          <p>
            Preços à vista no Pix ou dinheiro. Todos os aparelhos da vitrine estão à pronta entrega. Valores de troca são estimativas e
            dependem da avaliação presencial. Aparelhos lacrados com até 1 ano de garantia Apple; CPO = recondicionado
            oficial Apple.
          </p>
          <p className="mt-3">
            A TechShop · Murilo Negócios é uma revendedora independente, sem afiliação com a Apple Inc. iPhone é marca
            registrada da Apple Inc.
          </p>
        </div>

        <div className="grid gap-8 py-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-2 font-semibold text-ink">Comprar</h3>
            <ul className="space-y-2">
              <li><Link className="hover:underline" href="/iphone">iPhones novos</Link></li>
              <li><Link className="hover:underline" href="/seminovos">Seminovos</Link></li>
              <li><Link className="hover:underline" href="/comparar">Comparar modelos</Link></li>
              <li><Link className="hover:underline" href="/troca">Seu usado como entrada</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-ink">Fale com a gente</h3>
            <ul className="space-y-2">
              <li><LeadLink channel="whatsapp" source="footer" className="hover:underline">WhatsApp {site.phoneLabel}</LeadLink></li>
              <li><LeadLink channel="instagram" source="footer" className="hover:underline">Instagram {site.instagram.handle}</LeadLink></li>
              <li><a className="hover:underline" href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-ink">Loja física</h3>
            <address className="not-italic">
              {site.address.street}
              <br />
              {site.address.district}, {site.address.city} - {site.address.state}
            </address>
            <ul className="mt-2 space-y-2">
              <li>
                <LeadLink channel="whatsapp" source="footer-visita" message={visitMessage()} className="hover:underline">
                  Agendar visita ›
                </LeadLink>
              </li>
              <li>
                <LeadLink channel="mapa" source="footer" className="hover:underline">
                  Ver no Google Maps ›
                </LeadLink>
              </li>
              <li>
                <LeadLink channel="avaliacao" source="footer" className="hover:underline">
                  Avaliar no Google ›
                </LeadLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-ink">Horário</h3>
            <p>{site.hours.label}</p>
            <p className="mt-1">{site.hours.note}</p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-6 md:flex-row md:items-center">
          <Wordmark />
          <div className="flex flex-col gap-1 md:items-end">
            <p>
              © {new Date().getFullYear()} {site.legalName}. {site.slogan}.
            </p>
            <p>
              Site criado por{" "}
              <a
                href={site.credits.url}
                target="_blank"
                rel="noopener"
                className="font-medium text-ink underline-offset-2 hover:underline"
              >
                {site.credits.name}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
