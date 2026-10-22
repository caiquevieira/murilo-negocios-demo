import { discountPercent, formatBRL } from "@/lib/format";

export function PriceTag({
  price,
  priceFrom,
  size = "md",
  dark = false,
}: {
  price: number;
  priceFrom?: number;
  size?: "md" | "lg";
  dark?: boolean;
}) {
  const off = priceFrom ? discountPercent(priceFrom, price) : 0;
  return (
    <div>
      {priceFrom && (
        <div className="flex items-center gap-2 text-[14px]">
          <span className={`line-through ${dark ? "text-white/45" : "text-ink-mute"}`}>{formatBRL(priceFrom)}</span>
          {off > 0 && (
            <span className="rounded-full bg-gold-50 px-2 py-0.5 text-[12px] font-semibold text-gold-700">−{off}%</span>
          )}
        </div>
      )}
      <div
        className={`font-[family-name:var(--font-display)] font-semibold tracking-tight ${size === "lg" ? "text-[34px]" : "text-[24px]"} ${dark ? "text-white" : "text-ink"}`}
      >
        {formatBRL(price)}
      </div>
      <div className={`text-[13px] ${dark ? "text-white/60" : "text-ink-soft"}`}>à vista no Pix ou dinheiro</div>
    </div>
  );
}
