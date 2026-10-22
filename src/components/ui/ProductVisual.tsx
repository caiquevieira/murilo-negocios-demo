"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Product, ProductColor } from "@/data/products";

/** Foto da cor selecionada, se existir; senão, a foto da linha (ou a primeira foto do produto). */
export function productImage(product: Product, color: ProductColor) {
  if (color.image) return { src: color.image, dark: false, single: true };
  if (product.image) return { src: product.image, dark: Boolean(product.imageOnDark), single: false };
  const first = product.colors.find((c) => c.image)?.image ?? "";
  return { src: first, dark: false, single: false };
}

/**
 * Fotos oficiais. Fundo branco: mix-blend-multiply para se fundir ao fundo claro.
 * Fundo preto: exibida sobre um painel escuro arredondado.
 */
export function ProductVisual({
  product,
  color,
  className = "",
  sizes = "300px",
  priority = false,
}: {
  product: Product;
  color: ProductColor;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const img = productImage(product, color);

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={img.src}
          initial={{ opacity: 0, scale: 0.96, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -6 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute inset-0 ${img.dark ? "overflow-hidden rounded-[18px] bg-black" : ""}`}
        >
          <Image
            src={img.src}
            alt={img.single ? `${product.name} ${color.name}` : `${product.name} nas cores disponíveis`}
            fill
            sizes={sizes}
            priority={priority}
            className={img.dark ? "object-contain" : "object-contain mix-blend-multiply"}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
