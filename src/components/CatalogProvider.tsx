"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { site } from "@/config/site";
import { products as builtIn, type Product } from "@/data/products";
import { fetchSheet, productsFromRows, tradeValuesFromRows } from "@/lib/catalog";

type Catalog = {
  products: Product[];
  /** Valores de entrada do simulador vindos da planilha (vazio = usa os de src/data/tradein.ts) */
  tradeValues: Record<string, number> | null;
  /** false enquanto a primeira leitura da planilha não termina (evita mostrar preço antigo) */
  ready: boolean;
};

const CACHE_KEY = "catalogo-v1";
const CatalogContext = createContext<Catalog>({ products: builtIn, tradeValues: null, ready: true });

export function useCatalog() {
  return useContext(CatalogContext);
}

export function useProduct(id: string) {
  const { products, ready } = useCatalog();
  return { product: products.find((p) => p.id === id), ready };
}

/** Carrega a planilha uma vez por visita; guarda a última versão no navegador para abrir mais rápido. */
export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const enabled = Boolean(site.catalogSheetId);
  const [state, setState] = useState<Catalog>({ products: builtIn, tradeValues: null, ready: !enabled });

  useEffect(() => {
    if (!enabled) return;
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) ?? "null");
      if (cached?.products?.length) setState({ ...cached, ready: true });
    } catch {}

    let cancelled = false;
    // Se a planilha demorar, libera a vitrine com o que já tem
    const timeout = setTimeout(() => setState((s) => ({ ...s, ready: true })), 4000);

    Promise.all([fetchSheet("Catálogo"), fetchSheet("Troca").catch(() => null)])
      .then(([catalogRows, tradeRows]) => {
        const products = productsFromRows(catalogRows);
        if (!products.length) throw new Error("Aba Catálogo vazia");
        const tradeValues = tradeRows ? tradeValuesFromRows(tradeRows) : null;
        if (cancelled) return;
        setState({ products, tradeValues, ready: true });
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ products, tradeValues }));
        } catch {}
      })
      .catch((err) => {
        console.warn("[catálogo] usando a versão do site:", err);
        if (!cancelled) setState((s) => ({ ...s, ready: true }));
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [enabled]);

  return <CatalogContext.Provider value={state}>{children}</CatalogContext.Provider>;
}
