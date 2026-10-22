import { BadgeCheck, MapPin, Repeat2, ShieldCheck, Truck } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Lacrados", text: "Até 1 ano de garantia" },
  { icon: BadgeCheck, title: "Seminovos revisados", text: "Bateria em %, IMEI limpo" },
  { icon: Repeat2, title: "Troca", text: "Seu usado como entrada" },
  { icon: MapPin, title: "Loja física", text: "Centro de Osasco" },
  { icon: Truck, title: "Todo o Brasil", text: "Atendimento à distância" },
];

/** Faixa de "motivos para comprar" logo abaixo do hero. */
export function TrustBar() {
  return (
    <section aria-label="Diferenciais" className="border-b border-line bg-white">
      <ul className="no-scrollbar wrap flex gap-8 overflow-x-auto py-6 md:justify-between">
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex shrink-0 items-center gap-3">
            <Icon size={22} className="text-gold-700" strokeWidth={1.6} />
            <div className="leading-tight">
              <p className="text-[14px] font-semibold">{title}</p>
              <p className="text-[12px] text-ink-soft">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
