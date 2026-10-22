import Link from "next/link";
import { Plus } from "lucide-react";
import { site } from "@/config/site";
import { LeadLink } from "../ui/LeadLink";
import { Reveal } from "../ui/Reveal";

// Respostas curtas e diretas: são lidas por clientes, pelo Google e por assistentes de IA.
// Só fatos já confirmados pela loja (site.ts e briefing).
export const faq: { q: string; a: string; link?: { href: string; label: string } }[] = [
  {
    q: "Onde fica a loja da Murilo Negócios?",
    a: `Na ${site.address.street}, ${site.address.district}, ${site.address.city} - ${site.address.state}. As visitas são com horário agendado pelo WhatsApp ${site.phoneLabel}.`,
    link: { href: "/loja/", label: "Ver mapa e como chegar" },
  },
  {
    q: "Qual o horário de atendimento?",
    a: `${site.hours.label}. ${site.hours.note}`,
  },
  {
    q: "Os iPhones estão à pronta entrega?",
    a: "Sim. Todos os aparelhos da vitrine do site estão à pronta entrega na loja de Osasco. Você reserva pelo WhatsApp e retira no horário combinado.",
    link: { href: "/iphone/", label: "Ver os iPhones" },
  },
  {
    q: "Os iPhones novos têm garantia?",
    a: "Os iPhones novos são lacrados e têm até 1 ano de garantia Apple. Os CPO são recondicionados oficiais da Apple, também com garantia.",
  },
  {
    q: "Como funcionam os iPhones seminovos?",
    a: "Cada seminovo é revisado antes da venda, com saúde da bateria informada em porcentagem, IMEI limpo e testes completos. O estoque muda todo dia: peça a lista atualizada pelo WhatsApp.",
    link: { href: "/seminovos/", label: "Ver seminovos" },
  },
  {
    q: "Posso dar meu iPhone usado como entrada?",
    a: "Sim. O simulador do site estima o valor de entrada de qualquer iPhone do XR ao iPhone 18 Pro Max, incluindo o iPhone Duo. O valor final é confirmado na avaliação presencial na loja.",
    link: { href: "/troca/", label: "Simular a troca" },
  },
  {
    q: "Quais são as formas de pagamento?",
    a: `${site.payment} Não trabalhamos com boleto.`,
  },
  {
    q: "Vocês atendem fora de Osasco?",
    a: "Sim. A loja física fica no Centro de Osasco e o atendimento pelo WhatsApp é para todo o Brasil.",
  },
];

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/** Perguntas frequentes em acordeão nativo (<details>), sem JavaScript. */
export function Faq({ withSchema = true }: { withSchema?: boolean }) {
  return (
    <section id="perguntas" className="bg-white py-20 md:py-28">
      <div className="wrap grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Reveal>
          <p className="t-eyebrow">Perguntas frequentes</p>
          <h2 className="t-section mt-3">Tire suas dúvidas.</h2>
          <p className="t-callout mt-4 max-w-[30ch]">Não achou a resposta? A gente responde rápido no WhatsApp.</p>
          <LeadLink channel="whatsapp" source="perguntas" className="link-more mt-5 inline-block">
            Perguntar no WhatsApp ›
          </LeadLink>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="divide-y divide-line border-y border-line">
            {faq.map((f) => (
              <details key={f.q} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                  <h3>{f.q}</h3>
                  <Plus size={20} className="shrink-0 text-gold-700 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <div className="pb-5 text-[16px] leading-relaxed text-ink-soft">
                  <p>{f.a}</p>
                  {f.link && (
                    <Link href={f.link.href} className="link-more mt-2 inline-block">
                      {f.link.label} ›
                    </Link>
                  )}
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
      {withSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />}
    </section>
  );
}
