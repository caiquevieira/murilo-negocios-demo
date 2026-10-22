"use client";

import Link from "next/link";
import { BadgeCheck, Columns2, MapPin, PackageCheck, Repeat2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { conditionLabel, defaultColorIndex, type Product } from "@/data/products";
import { productHref } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/seo";
import { productMessage } from "@/lib/whatsapp";
import { LeadLink } from "./ui/LeadLink";
import { PriceTag } from "./ui/PriceTag";
import { ProductVisual } from "./ui/ProductVisual";
import { ColorSwatches, SegmentedControl } from "./ui/Selectors";
import { InstagramIcon, WhatsAppIcon } from "./ui/icons";

export function ProductDetail({ product }: { product: Product }) {
  const [colorIdx, setColorIdx] = useState(() => defaultColorIndex(product));
  const [storage, setStorage] = useState(product.storages[0].capacity);
  const color = product.colors[colorIdx] ?? product.colors[0];
  const hasPhoto = Boolean(color.image ?? product.image);
  const st = product.storages.find((s) => s.capacity === storage) ?? product.storages[0];
  const seminovo = product.condition === "seminovo";

  const perks = seminovo
    ? [
        { icon: BadgeCheck, text: `Bateria em ${product.battery}%, medida na loja` },
        { icon: ShieldCheck, text: "IMEI limpo e testes completos" },
      ]
    : [
        { icon: ShieldCheck, text: product.condition === "cpo" ? "Recondicionado oficial Apple, com garantia" : "Lacrado, até 1 ano de garantia Apple" },
        { icon: BadgeCheck, text: "Procedência confirmada" },
      ];

  // Ficha de produto (Schema.org) com preço e disponibilidade da planilha
  const photo = color.image ?? product.image;
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} ${conditionLabel[product.condition]}`,
    brand: { "@type": "Brand", name: "Apple" },
    description: product.tagline,
    ...(photo && { image: /^https?:/.test(photo) ? photo : absoluteUrl(photo) }),
    itemCondition: seminovo ? "https://schema.org/UsedCondition" : product.condition === "cpo" ? "https://schema.org/RefurbishedCondition" : "https://schema.org/NewCondition",
    offers: product.storages.map((s) => ({
      "@type": "Offer",
      name: `${product.name} ${s.capacity}`,
      price: s.price.toFixed(2),
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(productHref(product)),
      seller: { "@id": absoluteUrl("/#loja") },
    })),
  };

  return (
    <section className="bg-white py-12 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <div className="wrap grid items-start gap-10 md:grid-cols-2 md:gap-16">
        {/* Visual fixo enquanto a coluna de compra rola */}
        <div className="md:sticky md:top-20">
          <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[var(--radius-tile)] bg-mist">
            <div
              aria-hidden
              className="absolute inset-0 opacity-60 transition-colors duration-700"
              style={{ background: `radial-gradient(circle at 50% 45%, ${color.hex}55, transparent 60%)` }}
            />
            <ProductVisual
              product={product}
              color={color}
              priority
              sizes="(min-width: 768px) 520px, 100vw"
              className={hasPhoto ? "h-[84%] w-[84%]" : "h-[72%] w-[72%]"}
            />
          </div>
          <p className="mt-3 text-center text-[12px] text-ink-mute">
            {color.image
              ? `Foto: ${product.name} ${color.name}.`
              : hasPhoto
                ? `Foto da linha ${product.name} em todas as cores.`
                : "Ilustração. Cores reais podem variar."}
          </p>
        </div>

        <div>
          <p className="t-eyebrow">{product.badge ?? conditionLabel[product.condition]}</p>
          <h1 className="t-section mt-2">{product.name}</h1>
          <p className="t-callout mt-2">{product.tagline}</p>

          <div className="mt-8 border-t border-line pt-6">
            <h2 className="text-[17px] font-semibold">
              Cor. <span className="font-normal text-ink-soft">{color.name}</span>
            </h2>
            <div className="mt-4">
              <ColorSwatches colors={product.colors} value={colorIdx} onChange={setColorIdx} />
            </div>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <h2 className="text-[17px] font-semibold">Capacidade.</h2>
            <div className="mt-4">
              {product.storages.length > 1 ? (
                <SegmentedControl
                  ariaLabel="Capacidade"
                  options={product.storages.map((s) => ({ id: s.capacity, label: s.capacity }))}
                  value={storage}
                  onChange={setStorage}
                />
              ) : (
                <span className="inline-block rounded-2xl border-2 border-gold-500 px-5 py-3 font-semibold">{st.capacity}</span>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-[var(--radius-card)] bg-mist p-6">
            <PriceTag price={st.price} priceFrom={st.priceFrom} size="lg" />
            <ul className="mt-5 space-y-2 text-[15px]">
              {perks.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2">
                  <Icon size={18} className="text-gold-700" /> {text}
                </li>
              ))}
              <li className="flex items-center gap-2">
                <PackageCheck size={18} className="text-gold-700" /> Pronta entrega
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-gold-700" /> Retirada com horário agendado em Osasco
              </li>
            </ul>

            <LeadLink
              channel="whatsapp"
              source={`produto-${product.id}`}
              product={`${product.name} ${st.capacity} ${color.name}`}
              value={st.price}
              message={productMessage({ name: product.name, capacity: st.capacity, color: color.name, price: st.price, seminovo })}
              className="btn btn-whatsapp mt-6 w-full !min-h-[52px] !text-[17px]"
            >
              <WhatsAppIcon /> Reservar no WhatsApp
            </LeadLink>
            <LeadLink channel="instagram" source={`produto-${product.id}`} className="btn btn-ghost mt-3 w-full">
              <InstagramIcon /> Ver oferta do dia no Instagram
            </LeadLink>
          </div>

          <Link
            href="/troca"
            className="mt-4 flex items-center gap-3 rounded-[var(--radius-card)] border border-line p-5 transition hover:border-gold-500"
          >
            <Repeat2 className="text-gold-700" />
            <span className="flex-1">
              <span className="block font-semibold">Tem um iPhone usado?</span>
              <span className="text-[14px] text-ink-soft">Simule quanto ele vale de entrada.</span>
            </span>
            <span className="link-more">Simular ›</span>
          </Link>

          <Link
            href={`/comparar?para=${product.modelId}`}
            className="mt-3 flex items-center gap-3 rounded-[var(--radius-card)] border border-line p-5 transition hover:border-gold-500"
          >
            <Columns2 className="text-gold-700" />
            <span className="flex-1">
              <span className="block font-semibold">Vale a pena trocar?</span>
              <span className="text-[14px] text-ink-soft">Compare o {product.name} com o seu iPhone.</span>
            </span>
            <span className="link-more">Comparar ›</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
