"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight, Check, Minus, Repeat2, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getIphoneModel, iphoneModels, type IphoneModel } from "@/data/iphones";
import { products } from "@/data/products";
import { compareMessage } from "@/lib/whatsapp";
import { LeadLink } from "./ui/LeadLink";
import { WhatsAppIcon } from "./ui/icons";

const DEFAULT_CURRENT = "iphone-13";
const DEFAULT_TARGET = "iphone-18-pro-max";

// ---- Leitura numérica das especificações (para saber o que melhora) ----
const num = (s: string) => parseFloat(s.replace(",", "."));
const chipGen = (m: IphoneModel) => num(m.chip.match(/A(\d+)/)?.[1] ?? "0") + (m.chip.includes("Pro") ? 0.5 : 0);
const screenInches = (m: IphoneModel) => num(m.display);
const maxZoom = (m: IphoneModel) => Math.max(...(m.zoom.match(/[\d,]+(?=x)/g) ?? ["1"]).map(num));
const mainCameraMp = (m: IphoneModel) => num(m.camera.match(/(\d+) MP/)?.[1] ?? "12");
const frontMp = (m: IphoneModel) => num(m.front.match(/(\d+) MP/)?.[1] ?? "0");
const depthMeters: Record<string, number> = { um: 1, dois: 2, quatro: 4, seis: 6 };
const waterRank = (m: IphoneModel) => depthMeters[m.water.match(/até (\w+) metros?/)?.[1] ?? ""] ?? 0;

type Better = "a" | "b" | null;
const cmp = (a: number, b: number): Better => (a === b ? null : a > b ? "a" : "b");

type Row = { label: string; value: (m: IphoneModel) => string | boolean; better?: (a: IphoneModel, b: IphoneModel) => Better };
type Group = { title: string; rows: Row[] };

const groups: Group[] = [
  {
    title: "Tela",
    rows: [
      { label: "Tamanho e tipo", value: (m) => m.display, better: (a, b) => cmp(screenInches(a), screenInches(b)) },
      { label: "ProMotion (até 120 Hz)", value: (m) => m.promotion },
      { label: "Tela Sempre Ativa", value: (m) => m.alwaysOn },
      { label: "Dynamic Island", value: (m) => m.dynamicIsland },
    ],
  },
  {
    title: "Desempenho",
    rows: [
      { label: "Chip", value: (m) => m.chip, better: (a, b) => cmp(chipGen(a), chipGen(b)) },
      { label: "Apple Intelligence", value: (m) => m.appleIntelligence },
      { label: "Armazenamento", value: (m) => m.capacities.join(" · ") },
    ],
  },
  {
    title: "Câmeras",
    rows: [
      { label: "Traseira", value: (m) => m.camera, better: (a, b) => cmp(mainCameraMp(a), mainCameraMp(b)) },
      { label: "Zoom óptico", value: (m) => m.zoom, better: (a, b) => cmp(maxZoom(a), maxZoom(b)) },
      { label: "Frontal", value: (m) => m.front, better: (a, b) => cmp(frontMp(a), frontMp(b)) },
      { label: "Controle da Câmera", value: (m) => m.cameraControl },
    ],
  },
  {
    title: "Bateria e carregamento",
    rows: [
      { label: "Reprodução de vídeo", value: (m) => m.battery, better: (a, b) => cmp(a.batteryHours, b.batteryHours) },
      { label: "MagSafe", value: (m) => m.magsafe },
      { label: "Conector", value: (m) => m.connector, better: (a, b) => cmp(Number(a.usbC), Number(b.usbC)) },
    ],
  },
  {
    title: "Design e segurança",
    rows: [
      { label: "Resistência à água", value: (m) => m.water, better: (a, b) => cmp(waterRank(a), waterRank(b)) },
      { label: "Botão de Ação", value: (m) => m.actionButton },
      { label: "Desbloqueio", value: (m) => m.auth },
      { label: "Detecção de Acidente", value: (m) => m.crashDetection },
      { label: "Peso", value: (m) => m.weight },
      { label: "Espessura", value: (m) => m.thickness },
    ],
  },
  {
    title: "Conexão",
    rows: [{ label: "5G", value: (m) => m.fiveG }],
  },
];

const boolFeatures: { key: keyof IphoneModel; label: string }[] = [
  { key: "appleIntelligence", label: "Apple Intelligence" },
  { key: "dynamicIsland", label: "Dynamic Island" },
  { key: "promotion", label: "Tela ProMotion de até 120 Hz" },
  { key: "alwaysOn", label: "Tela Sempre Ativa" },
  { key: "cameraControl", label: "Controle da Câmera" },
  { key: "actionButton", label: "Botão de Ação" },
  { key: "usbC", label: "Conector USB-C" },
  { key: "magsafe", label: "Recarga MagSafe" },
  { key: "fiveG", label: "5G" },
  { key: "crashDetection", label: "Detecção de Acidente" },
];

/** Lista do que o cliente ganha saindo do aparelho atual para o novo. */
function gains(cur: IphoneModel, tgt: IphoneModel) {
  const out: string[] = [];
  const hours = tgt.batteryHours - cur.batteryHours;
  if (hours > 0) out.push(`Até ${hours} horas a mais de bateria (vídeo)`);
  if (chipGen(tgt) > chipGen(cur)) out.push(`Chip ${tgt.chip} no lugar do ${cur.chip}`);
  if (maxZoom(tgt) > maxZoom(cur)) out.push(`Zoom óptico de até ${String(maxZoom(tgt)).replace(".", ",")}x`);
  if (mainCameraMp(tgt) > mainCameraMp(cur)) out.push(`Câmera principal de ${mainCameraMp(tgt)} MP`);
  if (screenInches(tgt) > screenInches(cur)) out.push(`Tela maior: ${tgt.display.split(" · ")[0]}`);
  if (waterRank(tgt) > waterRank(cur)) out.push(`Mais resistente à água (${tgt.water})`);
  for (const f of boolFeatures) if (tgt[f.key] && !cur[f.key]) out.push(f.label);
  return out;
}

function groupLabel(name: string) {
  if (name.includes("Duo") || name.includes("18")) return "iPhone 18 e Duo";
  if (name.includes("Air") || name.includes("17")) return "iPhone 17 e Air";
  const n = name.match(/iPhone (\d+)/)?.[1];
  return n ? `iPhone ${n}` : "iPhone SE, XS e XR";
}

const grouped = iphoneModels.reduce<{ label: string; models: IphoneModel[] }[]>((acc, m) => {
  const label = groupLabel(m.name);
  const g = acc.find((x) => x.label === label);
  if (g) g.models.push(m);
  else acc.push({ label, models: [m] });
  return acc;
}, []);

function ModelSelect({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className="t-eyebrow block !text-[12px]">
        {label}
      </label>
      <select id={id} className="input mt-2 !px-3 !text-[15px] md:!px-4 md:!text-[17px]" value={value} onChange={(e) => onChange(e.target.value)}>
        {grouped.map((g) => (
          <optgroup key={g.label} label={g.label}>
            {g.models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

function Value({ v, best }: { v: string | boolean; best: boolean }) {
  if (typeof v === "boolean") {
    return v ? (
      <span className="inline-flex items-center gap-1.5 font-medium">
        <Check size={17} className="text-gold-700" strokeWidth={2.5} /> Sim
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 text-ink-mute">
        <Minus size={17} /> Não tem
      </span>
    );
  }
  return (
    <span className={best ? "font-semibold text-ink" : "text-ink-soft"}>
      {v}
      {best && <span className="ml-1.5 inline-block translate-y-[-1px] rounded-full bg-gold-50 px-2 py-0.5 text-[11px] font-semibold text-gold-700">melhor</span>}
    </span>
  );
}

/** Comparador lado a lado: o iPhone que a pessoa tem x o que quer levar. Dados oficiais da Apple. */
export function IphoneCompare() {
  const [current, setCurrent] = useState(DEFAULT_CURRENT);
  const [target, setTarget] = useState(DEFAULT_TARGET);

  // Links diretos: /comparar?de=iphone-xr&para=iphone-17-pro
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const de = q.get("de");
    const para = q.get("para");
    if (de && getIphoneModel(de)) setCurrent(de);
    if (para && getIphoneModel(para)) setTarget(para);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("de", current);
    url.searchParams.set("para", target);
    window.history.replaceState(null, "", url);
  }, [current, target]);

  const cur = getIphoneModel(current)!;
  const tgt = getIphoneModel(target)!;
  const list = useMemo(() => gains(cur, tgt), [cur, tgt]);
  const same = cur.id === tgt.id;

  // Produto da vitrine correspondente ao modelo desejado (para levar ao preço)
  const inStock = products.find((p) => p.modelId === tgt.id && p.condition !== "seminovo") ?? products.find((p) => p.modelId === tgt.id);

  return (
    <div>
      {/* Seletores + fotos */}
      <div className="sticky top-14 z-20 -mx-[22px] border-b border-line bg-white/90 px-[22px] pt-4 pb-4 backdrop-blur-xl md:static md:mx-0 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3 md:gap-6">
          <ModelSelect id="cmp-atual" label="Seu iPhone" value={current} onChange={setCurrent} />
          <button
            type="button"
            onClick={() => {
              setCurrent(target);
              setTarget(current);
            }}
            className="mb-1 grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink-soft transition hover:border-gold-500 hover:text-ink"
            aria-label="Inverter os modelos"
          >
            <ArrowLeftRight size={18} />
          </button>
          <ModelSelect id="cmp-novo" label="Quer levar" value={target} onChange={setTarget} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:gap-6">
        {[cur, tgt].map((m, i) => (
          <div key={i} className="flex flex-col items-center rounded-[var(--radius-tile)] bg-white px-3 pt-6 pb-5 text-center md:px-6 md:pt-10">
            <div className="relative aspect-square w-full max-w-[300px]">
              <Image
                key={m.id}
                src={`/comparar/${m.id}.webp`}
                alt={m.name}
                fill
                sizes="(min-width: 768px) 300px, 45vw"
                className="object-contain mix-blend-multiply"
              />
            </div>
            <p className="mt-4 text-[12px] tracking-[0.18em] text-ink-mute uppercase">{i === 0 ? "Seu iPhone" : "Quer levar"}</p>
            <h2 className="mt-1 text-[19px] leading-tight font-semibold md:text-[26px]">{m.name}</h2>
            <p className="mt-1 text-[13px] text-ink-soft md:text-[15px]">
              {m.chip} · {m.display.split(" · ")[0]}
            </p>
          </div>
        ))}
      </div>

      {/* O que muda */}
      <div className="dark mt-3 rounded-[var(--radius-tile)] bg-night p-7 text-white md:mt-6 md:p-12">
        {same ? (
          <p className="t-callout !text-white/75">Escolha dois modelos diferentes para ver o que muda.</p>
        ) : list.length > 0 ? (
          <>
            <p className="t-eyebrow on-dark flex items-center gap-2">
              <Sparkles size={15} /> O que você ganha
            </p>
            <h3 className="t-tile mt-3">
              Do {cur.name} para o <span className="gold-text">{tgt.name}</span>.
            </h3>
            <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {list.map((g) => (
                <li key={g} className="flex items-start gap-3 text-[16px] text-white/85">
                  <span className="gold-fill mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-ink">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="t-eyebrow on-dark">Comparação</p>
            <h3 className="t-tile mt-3">O {cur.name} já está à frente do {tgt.name}.</h3>
            <p className="t-callout mt-2 !text-white/70">Veja abaixo a comparação completa, item por item.</p>
          </>
        )}

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <LeadLink
            channel="whatsapp"
            source="comparador"
            product={tgt.name}
            message={compareMessage({ current: cur.name, target: tgt.name })}
            className="btn btn-whatsapp"
          >
            <WhatsAppIcon /> Quanto fica a troca?
          </LeadLink>
          <Link href={`/troca?modelo=${cur.id}`} className="btn btn-ghost">
            <Repeat2 size={18} /> Simular o valor do meu {cur.name}
          </Link>
          {inStock && (
            <Link href={`/iphone/${inStock.id}`} className="link-more self-center sm:ml-2">
              Ver preço do {inStock.name} ›
            </Link>
          )}
        </div>
      </div>

      {/* Tabela completa */}
      <div className="mt-3 rounded-[var(--radius-tile)] bg-white px-5 py-4 md:mt-6 md:px-12 md:py-8">
        {groups.map((g) => (
          <section key={g.title} className="border-b border-line py-6 last:border-0">
            <h3 className="text-[21px] font-semibold tracking-tight md:text-[24px]">{g.title}</h3>
            <dl className="mt-2">
              {g.rows.map((r) => {
                const a = r.value(cur);
                const b = r.value(tgt);
                const better = same ? null : r.better?.(cur, tgt) ?? null;
                return (
                  <div key={r.label} className="grid grid-cols-2 gap-x-4 border-t border-line/70 py-3.5 first:border-0 md:grid-cols-[220px_1fr_1fr] md:gap-x-8">
                    <dt className="col-span-2 mb-1.5 text-[13px] text-ink-mute md:col-span-1 md:mb-0 md:text-[14px]">{r.label}</dt>
                    <dd className="text-[14px] leading-snug md:text-[15px]">
                      <Value v={a} best={better === "a"} />
                    </dd>
                    <dd className="text-[14px] leading-snug md:text-[15px]">
                      <Value v={b} best={better === "b"} />
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>
        ))}
        <p className="pt-4 text-[12px] text-ink-mute">
          Especificações oficiais da Apple (apple.com/br/iphone/compare). Bateria em horas de reprodução de vídeo, segundo testes da
          Apple; o uso real varia.
        </p>
      </div>
    </div>
  );
}
