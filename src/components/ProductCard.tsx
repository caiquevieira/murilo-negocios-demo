"use client";

import Link from "next/link";
import { useState } from "react";
import { conditionLabel, defaultColorIndex, type Product } from "@/data/products";
import { productHref } from "@/lib/catalog";
import { productMessage } from "@/lib/whatsapp";
import { LeadLink } from "./ui/LeadLink";
import { PriceTag } from "./ui/PriceTag";
import { ProductVisual } from "./ui/ProductVisual";
import { ColorSwatches, SegmentedControl } from "./ui/Selectors";
import { WhatsAppIcon } from "./ui/icons";

export function ProductCard({ product }: { product: Product }) {
  const [colorIdx, setColorIdx] = useState(() => defaultColorIndex(product));
  const [storage, setStorage] = useState(product.storages[0].capacity);
  const color = product.colors[colorIdx] ?? product.colors[0];
  const st = product.storages.find((s) => s.capacity === storage) ?? product.storages[0];
  const seminovo = product.condition === "seminovo";

  return (
    <article className="group flex h-full flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_18px_48px_-18px_rgba(0,0,0,0.22)]">
      <div className="flex items-center justify-between gap-2 text-[12px]">
        <span className="font-medium text-ink-soft">{conditionLabel[product.condition]}</span>
        {product.badge && (
          <span className="rounded-full bg-gold-50 px-2.5 py-1 font-semibold text-gold-700">{product.badge}</span>
        )}
        {seminovo && product.battery && (
          <span className="rounded-full bg-mist px-2.5 py-1 font-semibold text-ink">Bateria {product.battery}%</span>
        )}
      </div>

      <Link href={productHref(product)} className="my-6 block" aria-label={`Ver ${product.name}`}>
        <ProductVisual
          product={product}
          color={color}
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
          className="h-[220px] w-full transition-transform duration-500 group-hover:-translate-y-1"
        />
      </Link>

      <h3 className="font-[family-name:var(--font-display)] text-[22px] font-semibold leading-tight">
        <Link href={productHref(product)} className="hover:text-gold-700">
          {product.name}
        </Link>
      </h3>
      <p className="mt-1 text-[14px] text-ink-soft">{product.tagline}</p>

      <div className="mt-4 space-y-3">
        <div>
          <ColorSwatches colors={product.colors} value={colorIdx} onChange={setColorIdx} size="sm" />
          <p className="mt-1.5 text-[12px] text-ink-mute">{color.name}</p>
        </div>
        {product.storages.length > 1 ? (
          <SegmentedControl
            ariaLabel="Capacidade"
            options={product.storages.map((s) => ({ id: s.capacity, label: s.capacity }))}
            value={storage}
            onChange={setStorage}
          />
        ) : (
          <span className="inline-block rounded-full border border-line px-3 py-1 text-[13px] text-ink-soft">{st.capacity}</span>
        )}
      </div>

      <div className="mt-5 flex-1">
        <PriceTag price={st.price} priceFrom={st.priceFrom} />
      </div>

      <LeadLink
        channel="whatsapp"
        source={`vitrine-${product.id}`}
        product={`${product.name} ${st.capacity} ${color.name}`}
        value={st.price}
        message={productMessage({ name: product.name, capacity: st.capacity, color: color.name, price: st.price, seminovo })}
        className="btn btn-whatsapp mt-5 w-full"
      >
        <WhatsAppIcon />
        Reservar no WhatsApp
      </LeadLink>
    </article>
  );
}
