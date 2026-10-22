import Image from "next/image";

/** Monograma "MN" da logo oficial (fundo transparente, funciona no claro e no escuro). */
export function Monogram({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/marca/monograma-mn.webp"
      alt="Murilo Negócios"
      width={240}
      height={208}
      priority={priority}
      className={`w-auto object-contain ${className}`}
    />
  );
}

/** Logo completa: monograma, nome e slogan. */
export function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/marca/logo-murilo-negocios.webp"
      alt="Murilo Negócios · Aqui é sempre um bom negócio"
      width={640}
      height={495}
      priority={priority}
      className={`h-auto object-contain ${className}`}
    />
  );
}

export function Wordmark({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Monogram className="h-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`text-[15px] font-semibold tracking-[0.08em] ${onDark ? "text-white" : "text-ink"}`}
        >
          MURILO <span className="gold-text">NEGÓCIOS</span>
        </span>
        <span className={`mt-1 text-[9.5px] tracking-[0.28em] uppercase ${onDark ? "text-white/55" : "text-ink-mute"}`}>
          TechShop · Osasco
        </span>
      </span>
    </span>
  );
}
