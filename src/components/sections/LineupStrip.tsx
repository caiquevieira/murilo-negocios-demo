import Link from "next/link";
import { defaultColorIndex, products } from "@/data/products";
import { formatBRL } from "@/lib/format";
import { ProductVisual } from "../ui/ProductVisual";
import { Reveal } from "../ui/Reveal";

/** Faixa horizontal "Conheça a linha": todos os modelos novos, com rolagem lateral. */
export function LineupStrip() {
  const lineup = products.filter((p) => p.condition !== "seminovo");
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="wrap flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <p className="t-eyebrow">A linha completa</p>
          <h2 className="t-section mt-3">Escolha o seu iPhone.</h2>
        </Reveal>
        <Link href="/iphone" className="link-more text-[17px]">
          Ver todos com filtros ›
        </Link>
      </div>

      <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[max(22px,calc((100vw_-_1080px)/2_+_22px))] pb-4">
        {lineup.map((p) => {
          const st = p.storages[0];
          return (
            <li key={p.id} className="snap-start">
              <Link
                href={`/iphone/${p.id}`}
                className="group flex h-full w-[220px] flex-col rounded-[var(--radius-card)] bg-mist p-5 transition hover:bg-[#ededf0]"
              >
                <ProductVisual
                  product={p}
                  color={p.colors[defaultColorIndex(p)]}
                  sizes="220px"
                  className="h-[170px] w-full transition-transform duration-500 group-hover:-translate-y-1.5"
                />
                <div className="mt-4 flex gap-1">
                  {p.colors.map((c) => (
                    <span key={c.name} className="h-2.5 w-2.5 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]" style={{ background: c.hex }} />
                  ))}
                </div>
                {p.badge && <p className="mt-3 text-[12px] font-semibold text-gold-700">{p.badge}</p>}
                <h3 className="mt-1 text-[19px] font-semibold leading-tight">{p.name}</h3>
                <p className="mt-1 text-[14px] text-ink-soft">{p.tagline}</p>
                <p className="mt-auto pt-4 text-[14px]">
                  <span className="text-ink-mute">{st.capacity} por </span>
                  <span className="font-semibold">{formatBRL(st.price)}</span>
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
