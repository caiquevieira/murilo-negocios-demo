import { useId } from "react";

/** Monograma "MN" inspirado no letreiro da loja: anel aberto, seta de crescimento e barras. */
export function Monogram({ className = "", tone = "gold" }: { className?: string; tone?: "gold" | "light" }) {
  const id = useId();
  const fill = tone === "gold" ? `url(#${id})` : "currentColor";

  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Murilo Negócios">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a67c32" />
          <stop offset="35%" stopColor="#ecd08f" />
          <stop offset="55%" stopColor="#f8e9bd" />
          <stop offset="75%" stopColor="#c99f52" />
          <stop offset="100%" stopColor="#8a6420" />
        </linearGradient>
      </defs>
      {/* Anel com aberturas, como no letreiro */}
      <path d="M38 14 A50 50 0 0 1 104 40" fill="none" stroke={fill} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M100 86 A50 50 0 0 1 22 96" fill="none" stroke={fill} strokeWidth="4.5" strokeLinecap="round" />
      <text
        x="54"
        y="78"
        textAnchor="middle"
        fontFamily="var(--font-cinzel), Georgia, serif"
        fontWeight="700"
        fontSize="54"
        fill={fill}
      >
        M
      </text>
      <text
        x="86"
        y="88"
        textAnchor="middle"
        fontFamily="var(--font-cinzel), Georgia, serif"
        fontWeight="700"
        fontSize="44"
        fill={fill}
      >
        N
      </text>
      {/* Barras e seta de crescimento */}
      <rect x="93" y="76" width="4" height="10" fill={fill} />
      <rect x="99" y="70" width="4" height="16" fill={fill} />
      <rect x="105" y="63" width="4" height="23" fill={fill} />
      <path d="M70 84 Q92 78 110 54" fill="none" stroke={fill} strokeWidth="3" strokeLinecap="round" />
      <path d="M103 52 L112 50 L110 59" fill="none" stroke={fill} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Wordmark({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Monogram className="h-8 w-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-[family-name:var(--font-serif)] text-[15px] font-semibold tracking-[0.14em] ${onDark ? "text-white" : "text-ink"}`}
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
