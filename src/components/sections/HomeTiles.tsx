import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/data/products";
import { Repeat2 } from "lucide-react";
import { seminovosMessage, visitMessage } from "@/lib/whatsapp";
import { LeadLink } from "../ui/LeadLink";
import { Reveal } from "../ui/Reveal";

/** Hero secundário (claro) com a reposição do iPhone 17 Pro, usando a foto real da equipe. */
export function RestockTile() {
  const p = getProduct("iphone-17-pro")!;
  return (
    <section className="bg-mist pt-14 text-center md:pt-20">
      <Reveal>
        <p className="t-eyebrow">Reposição</p>
        <h2 className="t-hero mt-3">iPhone 17 Pro.</h2>
        <p className="t-sub mt-2">Chegou mais. Laranja, azul e prateado.</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 px-6 text-[17px] sm:flex-row sm:gap-6">
          <Link href={`/iphone/${p.id}`} className="btn btn-dark">
            Ver cores e preço
          </Link>
          <LeadLink channel="whatsapp" source="reposicao-17-pro" product={p.name} className="link-more self-center">
            Reservar no WhatsApp ›
          </LeadLink>
        </div>
      </Reveal>
      <Reveal delay={0.15} className="wrap mt-12">
        <div className="relative mx-auto aspect-[1386/1130] max-w-[760px] overflow-hidden rounded-t-[var(--radius-tile)]">
          <Image
            src="/store/equipe-reposicao.jpg"
            alt="Equipe da loja segurando caixas lacradas do iPhone 17 Pro nas cores laranja, azul e prateado"
            fill
            sizes="(min-width: 768px) 760px, 100vw"
            className="object-cover object-top"
          />
        </div>
      </Reveal>
    </section>
  );
}

type TileProps = {
  eyebrow: string;
  title: string;
  sub: string;
  theme: "dark" | "light" | "marble" | "photo";
  children: React.ReactNode;
  visual?: React.ReactNode;
};

function Tile({ eyebrow, title, sub, theme, children, visual }: TileProps) {
  const bg = {
    dark: "dark bg-night text-white",
    light: "bg-mist",
    marble: "marble",
    photo: "dark bg-night text-white",
  }[theme];
  return (
    <Reveal className={`tile flex min-h-[520px] flex-col items-center px-6 pt-12 text-center md:min-h-[600px] ${bg}`}>
      <div className="relative z-10">
        <p className={`t-eyebrow ${theme === "dark" || theme === "photo" ? "on-dark" : ""}`}>{eyebrow}</p>
        <h3 className="t-tile mt-2">{title}</h3>
        <p className={`t-callout mt-2 ${theme === "dark" || theme === "photo" ? "!text-white/70" : ""}`}>{sub}</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">{children}</div>
      </div>
      {visual}
    </Reveal>
  );
}

/** Foto oficial ancorada na base do tile. */
function TileImage({ src, alt, dark = false, className = "" }: { src: string; alt: string; dark?: boolean; className?: string }) {
  return (
    <div className={`relative mt-auto h-[260px] w-full md:h-[320px] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className={`object-contain object-bottom ${dark ? "" : "mix-blend-multiply"}`}
      />
    </div>
  );
}

export function HomeTiles() {
  return (
    <section className="bg-white py-3">
      <div className="wrap-wide grid gap-3 md:grid-cols-2">
        <Tile
          theme="dark"
          eyebrow="Seminovos"
          title="Revisado. Com procedência."
          sub="Bateria informada em %, IMEI limpo e testes completos."
          visual={
            <TileImage src="/produtos/iphone-16-pro-linha-escuro.webp" alt="iPhones 16 Pro em quatro cores de titânio" dark />
          }
        >
          <Link href="/seminovos" className="btn btn-gold gold-fill btn-sm">
            Ver seminovos
          </Link>
          <LeadLink channel="whatsapp" source="tile-seminovos" message={seminovosMessage()} className="link-more">
            Lista de hoje no WhatsApp ›
          </LeadLink>
        </Tile>

        <Tile
          theme="marble"
          eyebrow="Troca"
          title="Seu usado vale entrada."
          sub="Simule em 1 minuto e traga o seu na loja."
          visual={
            <div className="mt-auto flex h-[260px] w-full items-center justify-center gap-2 md:h-[320px]">
              <TileImage src="/produtos/iphone-13-meia-noite.webp" alt="iPhone 13 usado" className="!mt-0 h-[70%] flex-1" />
              <span className="gold-fill z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full text-ink shadow-lg">
                <Repeat2 size={24} />
              </span>
              <TileImage src="/produtos/iphone-17-pro-max-laranja-cosmico.webp" alt="iPhone 17 Pro Max novo" className="!mt-0 h-full flex-1" />
            </div>
          }
        >
          <Link href="/troca" className="btn btn-dark btn-sm">
            Simular troca
          </Link>
          <LeadLink channel="whatsapp" source="tile-troca" message="Olá! Quero avaliar meu iPhone para dar de entrada." className="link-more">
            Avaliar no WhatsApp ›
          </LeadLink>
        </Tile>

        <Tile
          theme="light"
          eyebrow="Comparar"
          title="O seu ou o novo?"
          sub="Coloque lado a lado o iPhone que você tem e o que quer levar."
          visual={
            <div className="mt-auto flex h-[260px] w-full items-end justify-center gap-6 md:h-[320px]">
              <TileImage src="/comparar/iphone-xr.webp" alt="iPhone XR" className="!mt-0 h-[72%] max-w-[200px] flex-1" />
              <span className="mb-[18%] text-[13px] font-semibold tracking-[0.2em] text-ink-mute">VS</span>
              <TileImage src="/comparar/iphone-18-pro-max.webp" alt="iPhone 18 Pro Max" className="!mt-0 h-full max-w-[240px] flex-1" />
            </div>
          }
        >
          <Link href="/comparar" className="btn btn-dark btn-sm">
            Comparar modelos
          </Link>
        </Tile>

        <Reveal className="tile dark relative flex min-h-[520px] flex-col justify-end text-white md:min-h-[600px]">
          <Image
            src="/store/parede-logo.jpg"
            alt="Letreiro dourado Murilo Negócios na parede de mármore da loja"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="relative z-10 p-10 text-center">
            <p className="t-eyebrow on-dark">Loja física</p>
            <h3 className="t-tile mt-2">Centro de Osasco.</h3>
            <p className="t-callout mt-2 !text-white/75">Seg a Dom, 09h às 20h. Visitas com horário agendado.</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <LeadLink channel="whatsapp" source="tile-loja" message={visitMessage()} className="btn btn-gold gold-fill btn-sm">
                Agendar visita
              </LeadLink>
              <Link href="/loja" className="link-more">
                Conhecer a loja ›
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
