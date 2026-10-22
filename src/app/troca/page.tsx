import type { Metadata } from "next";
import { TradeInSimulator } from "@/components/TradeInSimulator";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { PageHeader } from "@/components/sections/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Troca de iPhone usado em Osasco",
  description: "Simule quanto seu iPhone usado vale de entrada na compra de um novo. Avaliação final na loja do Centro de Osasco.",
};

const steps = [
  { n: "1", title: "Simule aqui", text: "Responda 4 perguntas sobre o seu iPhone." },
  { n: "2", title: "Envie no WhatsApp", text: "A mensagem já vai pronta, com tudo que precisamos." },
  { n: "3", title: "Traga na loja", text: "Avaliação no balcão e você já sai com o novo." },
];

export default function TrocaPage() {
  return (
    <>
      <PageHeader
        tone="marble"
        eyebrow="Seu usado como entrada"
        title="Troque. Pague menos."
        sub="Descubra em 1 minuto quanto o seu iPhone vale na troca."
      />
      <section className="marble pb-20 md:pb-28">
        <div className="wrap grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-start">
          <Reveal>
            <ol className="space-y-6">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="gold-fill grid h-10 w-10 shrink-0 place-items-center rounded-full font-[family-name:var(--font-serif)] font-bold">
                    {s.n}
                  </span>
                  <div>
                    <h2 className="text-[19px] font-semibold">{s.title}</h2>
                    <p className="text-ink-soft">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 rounded-2xl bg-white/70 p-5 text-[14px] text-ink-soft">
              O simulador cobre do iPhone 11 ao 16 Pro Max. Tem outro modelo? Mande uma mensagem que a gente avalia.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <TradeInSimulator />
          </Reveal>
        </div>
      </section>
      <ClosingCta source="troca-final" />
    </>
  );
}
