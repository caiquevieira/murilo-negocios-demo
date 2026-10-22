"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MapPin, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { getProduct } from "@/data/products";
import { asset } from "@/lib/asset";
import { formatBRL } from "@/lib/format";
import { productMessage } from "@/lib/whatsapp";
import { useProduct } from "../CatalogProvider";
import { LeadLink } from "../ui/LeadLink";
import { InstagramIcon, WhatsAppIcon } from "../ui/icons";
import { Logo } from "../ui/Monogram";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yFront = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const glow = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  // Preço e cores vêm da planilha; se o 18 Pro Max sair da vitrine, o preço some do destaque
  const { product: live, ready } = useProduct("iphone-18-pro-max");
  const flagship = live ?? getProduct("iphone-18-pro-max")!;
  const st = flagship.storages[0];
  const color = flagship.colors[0];
  const heroImage = getProduct("iphone-18-pro-max")!.image!;

  return (
    <section ref={ref} className="dark relative overflow-hidden bg-night text-white">
      {/* Luz dourada que "acende" o aparelho */}
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease }}
        className="pointer-events-none absolute top-[38%] left-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,176,106,0.32)_0%,rgba(212,176,106,0.08)_40%,transparent_68%)] md:top-1/2 md:left-[66%] md:h-[900px] md:w-[900px]"
      />

      {/* Mobile: título → foto → botões. Desktop: texto à esquerda, aparelho grande à direita. */}
      <div className="wrap relative grid min-h-[calc(100svh-56px)] gap-x-8 gap-y-6 py-10 md:grid-cols-[0.82fr_1.18fr] md:grid-rows-2 md:gap-y-0 md:py-16">
        <div className="relative z-10 order-1 text-center md:self-end md:text-left">
          {/* Logo oficial: grande e centralizada no celular, discreta acima do título no desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease }}
          >
            <Logo
              priority
              className="mx-auto w-[min(72vw,280px)] drop-shadow-[0_8px_30px_rgba(212,176,106,0.25)] md:mx-0 md:w-[190px]"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="t-hero mt-8 md:mt-7"
          >
            iPhone 18 Pro Max.
            <br />
            <span className="gold-text">Já em Osasco.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="t-sub mx-auto mt-5 max-w-[30ch] text-white/75 md:mx-0"
          >
            Lacrado, com garantia e quem entende de iPhone do seu lado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: ready ? 1 : 0, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="mt-6 min-h-[26px] text-[17px]"
          >
            {live && (
              <>
                {st.priceFrom && <span className="text-white/50 line-through">{formatBRL(st.priceFrom)} </span>}
                <span className="font-semibold text-white">por {formatBRL(st.price)}</span>{" "}
                <span className="text-white/60">à vista</span>
              </>
            )}
          </motion.div>
        </div>

        <div className="relative z-10 order-3 text-center md:col-start-1 md:row-start-2 md:self-start md:text-left">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:mt-8 md:justify-start"
          >
            <LeadLink
              channel="whatsapp"
              source="hero"
              product={`${flagship.name} ${st.capacity}`}
              value={st.price}
              message={productMessage({ name: flagship.name, capacity: st.capacity, color: color.name, price: st.price })}
              className="btn btn-whatsapp w-full sm:w-auto"
            >
              <WhatsAppIcon /> Reservar no WhatsApp
            </LeadLink>
            <LeadLink channel="instagram" source="hero" className="btn btn-ghost w-full sm:w-auto">
              <InstagramIcon /> Ofertas de hoje
            </LeadLink>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-2 text-[13px] md:justify-start"
          >
            <li className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-white/85">
              <MapPin size={14} className="text-gold-400" /> Loja física em Osasco - Centro
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-white/85">
              <ShieldCheck size={14} className="text-gold-400" /> Lacrados · até 1 ano de garantia
            </li>
          </motion.ul>
        </div>

        {/* Linha do 18 Pro Max revelada pela luz */}
        <div className="relative order-2 mx-auto aspect-square w-full max-w-[420px] md:col-start-2 md:row-span-2 md:row-start-1 md:max-w-[680px] md:self-center">
          <motion.div
            style={{ y: yFront }}
            initial={{ opacity: 0, y: 60, scale: 0.94, filter: "blur(16px) brightness(0.2)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px) brightness(1)" }}
            transition={{ duration: 1.8, delay: 0.25, ease }}
            className="absolute inset-0"
          >
            <Image
              src={heroImage}
              alt="iPhone 18 Pro Max nas cores preto, prateado, azul-claro e vinho"
              fill
              priority
              sizes="(min-width: 768px) 680px, 100vw"
              className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
            />
            {/* Brilho que atravessa só os aparelhos (máscara = a própria foto) */}
            {!reduce && (
              <div
                aria-hidden
                className="absolute inset-0 overflow-hidden"
                style={{
                  WebkitMaskImage: `url(${asset(heroImage)})`,
                  maskImage: `url(${asset(heroImage)})`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              >
                <motion.div
                  initial={{ x: "-120%" }}
                  animate={{ x: "420%" }}
                  transition={{ duration: 1.8, delay: 1.5, ease: "easeInOut" }}
                  className="h-full w-1/4 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent"
                />
              </div>
            )}
          </motion.div>
          <div className="absolute inset-x-[12%] bottom-[8%] h-8 rounded-[50%] bg-black/70 blur-xl" aria-hidden />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease }}
            className="absolute inset-x-0 bottom-0 flex justify-center"
          >
            <Link
              href={`/iphone/${flagship.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] text-white/85 backdrop-blur transition hover:bg-white/10"
            >
              <span className="flex gap-1">
                {flagship.colors.map((c) => (
                  <span key={c.name} className="h-2.5 w-2.5 rounded-full ring-1 ring-white/30" style={{ background: c.hex }} />
                ))}
              </span>
              {flagship.colors.length} cores · {st.capacity} · <span className="text-gold-400">Ver detalhes ›</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
