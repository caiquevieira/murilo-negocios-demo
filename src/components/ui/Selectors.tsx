"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import type { ProductColor } from "@/data/products";

export function ColorSwatches({
  colors,
  value,
  onChange,
  size = "md",
}: {
  colors: ProductColor[];
  value: number;
  onChange: (index: number) => void;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-[18px] w-[18px]" : "h-7 w-7";
  return (
    <div role="radiogroup" aria-label="Cor" className="flex flex-wrap items-center gap-2.5">
      {colors.map((c, i) => (
        <button
          key={c.name}
          type="button"
          role="radio"
          aria-checked={i === value}
          aria-label={c.name}
          title={c.name}
          onClick={() => onChange(i)}
          className={`relative rounded-full transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ${dim}`}
        >
          <span
            className="absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]"
            style={{ background: `linear-gradient(135deg, ${c.hex}, ${c.hex}cc)` }}
          />
          {i === value && <span className="absolute -inset-[4px] rounded-full ring-2 ring-gold-500" />}
        </button>
      ))}
    </div>
  );
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  dark = false,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  ariaLabel: string;
  dark?: boolean;
}) {
  const layoutId = useId();
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`no-scrollbar inline-flex max-w-full overflow-x-auto rounded-full p-1 ${dark ? "bg-white/10" : "bg-black/[0.05]"}`}
    >
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.id)}
            className={`relative shrink-0 rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
              active ? (dark ? "text-ink" : "text-white") : dark ? "text-white/70 hover:text-white" : "text-ink-soft hover:text-ink"
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className={`absolute inset-0 rounded-full ${dark ? "bg-white" : "bg-ink"}`}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
