import Image from "next/image";
import { BadgeCheck, MessageCircle, Store } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const points = [
  { icon: BadgeCheck, title: "Procedência confirmada", text: "Todo aparelho é revisado e testado antes de qualquer negociação." },
  { icon: MessageCircle, title: "Conversa direta", text: "Você fala com quem entende, não com um script de atendimento." },
  { icon: Store, title: "Loja física em Osasco", text: "Endereço fixo, visita marcada, sem enrolação." },
];

export function TeamSection() {
  return (
    <section className="marble py-20 md:py-28">
      <div className="wrap grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-tile)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]">
            <Image
              src="/store/murilo.jpg"
              alt="Murilo segurando iPhones de várias cores"
              fill
              sizes="(min-width: 768px) 460px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-eyebrow">Sobre</p>
          <h2 className="t-section mt-3">Quem atende é quem entende.</h2>
          <p className="t-callout mt-5 max-w-[42ch]">
            Trabalho só com produtos Apple. Cada aparelho passa pelas minhas mãos antes de chegar até você, da revisão à
            entrega.
          </p>
          <ul className="mt-8 divide-y divide-black/10 border-y border-black/10">
            {points.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4 py-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-gold-700 shadow-sm">
                  <Icon size={19} />
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-[15px] text-ink-soft">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
