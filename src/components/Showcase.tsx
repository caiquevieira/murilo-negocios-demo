"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { categories, type Category } from "@/data/products";
import { useCatalog } from "./CatalogProvider";
import { ProductCard } from "./ProductCard";
import { SegmentedControl } from "./ui/Selectors";

type Filter = Category | "todos";

export function Showcase({
  initial = "todos",
  only,
  showFilters = true,
}: {
  initial?: Filter;
  /** Limita a vitrine a algumas categorias (ex.: só seminovos) */
  only?: Category[];
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>(initial);
  const { products } = useCatalog();
  const options = only ? categories.filter((c) => c.id === "todos" || only.includes(c.id as Category)) : categories;
  const list = products.filter(
    (p) => (only ? only.includes(p.category) : true) && (filter === "todos" || p.category === filter),
  );

  return (
    <div>
      {showFilters && options.length > 2 && (
        <div className="mb-10 flex justify-center">
          <SegmentedControl ariaLabel="Filtrar modelos" options={options} value={filter} onChange={setFilter} />
        </div>
      )}
      <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <ProductCard product={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
