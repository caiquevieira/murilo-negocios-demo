"use client";

import { discountPercent, formatBRL } from "@/lib/format";
import { useCatalog } from "../CatalogProvider";

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
  const { ready } = useCatalog();
  const off = priceFrom ? discountPercent(priceFrom, price) : 0;
  if (!ready) {
    return (
      <div aria-busy className="space-y-2">
        <div className={`h-4 w-24 animate-pulse rounded-full ${dark ? "bg-white/10" : "bg-mist"}`} />
        <div className={`h-7 w-36 animate-pulse rounded-full ${dark ? "bg-white/10" : "bg-mist"}`} />
      </div>
    );
  }
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
