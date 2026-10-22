// Catálogo vindo da planilha do Google (editada pelo Murilo). O site lê a planilha no navegador;
// se ela não responder, usa o catálogo de src/data/products.ts como reserva.
import { site } from "@/config/site";
import { iphoneModels } from "@/data/iphones";
import { productPhotos } from "@/data/fotos";
import { products as builtIn, type Category, type Product, type ProductColor } from "@/data/products";

/** Lê uma aba da planilha como CSV (a planilha precisa estar com "qualquer pessoa com o link: leitor"). */
export async function fetchSheet(tab: string): Promise<string[][]> {
  const url = `https://docs.google.com/spreadsheets/d/${site.catalogSheetId}/gviz/tq?tqx=out:csv&headers=1&sheet=${encodeURIComponent(tab)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Planilha respondeu ${res.status}`);
  const text = await res.text();
  if (text.trimStart().startsWith("<")) throw new Error("Planilha não está pública");
  return parseCsv(text);
}

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.map((r) => r.map((c) => c.trim()));
}

/** Aceita "7299", "6099,99", "R$ 7.299,00" e "7,299.00". */
export function parsePrice(raw: string): number | undefined {
  const s = raw.replace(/[^\d.,]/g, "");
  if (!s) return undefined;
  const lastComma = s.lastIndexOf(",");
  const lastDot = s.lastIndexOf(".");
  let normalized: string;
  if (lastComma > lastDot) normalized = s.replace(/\./g, "").replace(",", ".");
  else if (lastDot > lastComma && s.length - lastDot === 4 && lastComma === -1) normalized = s.replace(/\./g, "");
  else normalized = s.replace(/,/g, "");
  const n = Number(normalized);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const slug = (s: string) => norm(s).replace(/ /g, "-");

// Nomes usados na loja que diferem do nome oficial da Apple
const modelAliases: Record<string, string> = { "iphone 17 air": "iphone-air", "iphone air": "iphone-air" };

/** Acha o modelo do comparador pelo nome escrito na planilha (ex.: "iPhone 16E" → iphone-16e). */
export function modelIdFromName(name: string): string | undefined {
  const n = norm(name);
  if (modelAliases[n]) return modelAliases[n];
  return iphoneModels.find((m) => norm(m.name) === n)?.id;
}

// Cores já cadastradas nos produtos + nomes comuns da Apple
const colorHex: Record<string, string> = {
  preto: "#2c2c2e", branco: "#f0f0ee", prateado: "#dedfe0", dourado: "#f1dfc0", grafite: "#4c4b49",
  "cinza espacial": "#4a4a4c", "meia noite": "#2e3238", estelar: "#f0e9df", azul: "#c8d5df", verde: "#c9d7c2",
  rosa: "#f1d3d6", amarelo: "#f0e8b7", roxo: "#d4cbe3", vermelho: "#b0242c", "product red": "#b0242c", coral: "#ee7762",
  "titanio natural": "#bab5ab", "titanio preto": "#3c3b39", "titanio branco": "#e8e6e1", "titanio azul": "#3f4a5a",
};
for (const p of builtIn) for (const c of p.colors) colorHex[norm(c.name)] ??= c.hex;

function colorFromName(name: string): ProductColor {
  return { name, hex: colorHex[norm(name)] ?? "#c9c9cf" };
}

export function photoUrl(value: string): string | undefined {
  const v = value.trim();
  if (!v) return undefined;
  if (/^https?:\/\//.test(v)) return v;
  const name = v.replace(/\.webp$/, "");
  return productPhotos.has(name) ? `/produtos/${name}.webp` : `/comparar/${name}.webp`;
}

function categoryOf(name: string, condition: Product["condition"]): Category {
  if (condition === "seminovo") return "seminovos";
  if (/18|duo/i.test(name)) return "lancamentos";
  if (/17|air/i.test(name)) return "linha-17";
  if (/16/.test(name)) return "linha-16";
  return "anteriores";
}

const conditionOf = (v: string): Product["condition"] => {
  const n = norm(v);
  if (n.startsWith("semi")) return "seminovo";
  if (n === "cpo") return "cpo";
  return "lacrado";
};

// Ordem das colunas da aba Catálogo
const COL = { show: 0, code: 1, model: 2, condition: 3, capacity: 4, price: 5, priceFrom: 6, colors: 7, photo: 8, badge: 9, tagline: 10, battery: 11 };

/** Monta os produtos a partir das linhas da aba Catálogo (a primeira linha é o cabeçalho). */
export function productsFromRows(rows: string[][]): Product[] {
  const byKey = new Map<string, Product>();
  rows.slice(1).forEach((r, i) => {
    const get = (k: keyof typeof COL) => r[COL[k]] ?? "";
    const name = get("model");
    const price = parsePrice(get("price"));
    if (!name || !price || norm(get("show")) === "nao") return;

    const condition = conditionOf(get("condition"));
    const code = get("code");
    // Seminovo sem código é uma unidade única; os demais agrupam capacidades do mesmo modelo
    const key = code || (condition === "seminovo" ? `${slug(name)}-seminovo-${i + 2}` : `${slug(name)}-${condition}`);
    const storage = { capacity: get("capacity") || "—", price, priceFrom: parsePrice(get("priceFrom")) };

    const existing = byKey.get(key);
    if (existing) {
      if (!existing.storages.some((s) => s.capacity === storage.capacity)) existing.storages.push(storage);
      return;
    }

    const base = builtIn.find((p) => p.id === code);
    const colorNames = get("colors").split(",").map((c) => c.trim()).filter(Boolean);
    const colors = colorNames.length
      ? colorNames.map((n) => base?.colors.find((c) => norm(c.name) === norm(n)) ?? colorFromName(n))
      : (base?.colors ?? [colorFromName("Consulte as cores")]);
    const modelId = base?.modelId ?? modelIdFromName(name) ?? "";
    const photo = photoUrl(get("photo"));
    const battery = Number(get("battery").replace(/\D/g, "")) || undefined;

    byKey.set(key, {
      id: base?.id ?? key,
      modelId,
      name,
      category: categoryOf(name, condition),
      condition,
      badge: get("badge") || undefined,
      tagline: get("tagline") || base?.tagline || "",
      // Foto escolhida na planilha substitui as fotos padrão do produto
      image: photo ?? base?.image ?? (modelId ? `/comparar/${modelId}.webp` : undefined),
      imageOnDark: photo ? false : base?.imageOnDark,
      colors: photo ? colors.map((c) => ({ ...c, image: undefined })) : colors,
      storages: [storage],
      battery,
    });
  });
  return [...byKey.values()];
}

/** Valores de entrada da aba Troca: código do modelo → valor (R$). Célula vazia = sem estimativa. */
export function tradeValuesFromRows(rows: string[][]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const r of rows.slice(1)) {
    const id = r[1] || modelIdFromName(r[0] ?? "");
    const v = parsePrice(r[2] ?? "");
    if (id && v) out[id] = v;
  }
  return out;
}

/** Produtos que têm página gerada no build; os novos usam /iphone/ver/?id=… */
const builtInIds = new Set(builtIn.map((p) => p.id));
export function productHref(p: Product) {
  return builtInIds.has(p.id) ? `/iphone/${p.id}` : `/iphone/ver/?id=${encodeURIComponent(p.id)}`;
}
