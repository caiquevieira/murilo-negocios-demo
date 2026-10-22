"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Repeat2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { batteryOptions, conditions, estimateTradeIn, OTHER_MODEL, tradeInModels } from "@/data/tradein";
import { formatBRL } from "@/lib/format";
import { otherModelTradeInMessage, tradeInMessage } from "@/lib/whatsapp";
import { useCatalog } from "./CatalogProvider";
import { LeadLink } from "./ui/LeadLink";
import { WhatsAppIcon } from "./ui/icons";


function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-2xl border px-4 py-3 text-left text-[15px] transition ${
        active ? "border-gold-500 bg-gold-50 ring-2 ring-gold-500/40" : "border-line bg-white hover:border-ink-mute"
      }`}
    >
      {children}
    </button>
  );
}

function YesNo({ label, value, onChange }: { label: string; value: boolean | null; onChange: (v: boolean) => void }) {
  return (
    <div>
      <p className="mb-2 text-[15px] font-medium">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        <Choice active={value === false} onClick={() => onChange(false)}>Não</Choice>
        <Choice active={value === true} onClick={() => onChange(true)}>Sim</Choice>
      </div>
    </div>
  );
}

/** Simulador "Seu usado como entrada": só monta a mensagem do WhatsApp, nenhum dado é enviado. */
export function TradeInSimulator() {
  const [step, setStep] = useState(0);
  const [model, setModel] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [battery, setBattery] = useState<(typeof batteryOptions)[number]["id"] | "">("");
  const [condition, setCondition] = useState<(typeof conditions)[number]["id"] | "">("");
  const [opened, setOpened] = useState<boolean | null>(null);
  const [defect, setDefect] = useState<boolean | null>(null);
  const [target, setTarget] = useState<string>("");

  // Vindo do comparador (/troca?modelo=iphone-xr), o modelo já chega selecionado
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("modelo");
    if (id && tradeInModels.some((t) => t.id === id)) setModel(id);
  }, []);

  const { products, tradeValues } = useCatalog();
  const targets = products.filter((p) => p.condition !== "seminovo");
  const found = tradeInModels.find((t) => t.id === model);
  // Valor da aba Troca da planilha; sem valor lá, o modelo vai para avaliação no WhatsApp
  const m = found && { ...found, base: tradeValues ? tradeValues[found.id] : found.base };
  const noEstimate = Boolean(m && !m.base);
  const isOther = model === OTHER_MODEL || noEstimate;
  const b = batteryOptions.find((o) => o.id === battery);
  const c = conditions.find((o) => o.id === condition);
  const ready = m && capacity && b && c && opened !== null && defect !== null;

  const estimate = useMemo(
    () => (ready ? estimateTradeIn(m.base!, m.capacities, capacity, c.factor, b.factor, opened!, defect!) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ready, m?.id, m?.base, capacity, c, b, opened, defect],
  );
  const targetProduct = targets.find((p) => p.id === target);
  const targetPrice = targetProduct?.storages[0].price;

  const steps = ["Seu iPhone", "Estado", "Resultado"];

  return (
    <div className="rounded-[var(--radius-tile)] bg-white p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] md:p-10">
      <ol className="mb-8 flex items-center gap-2 text-[13px]" aria-label="Etapas">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span
              className={`grid h-6 w-6 place-items-center rounded-full text-[12px] font-semibold ${
                i <= step ? "gold-fill text-ink" : "bg-mist text-ink-mute"
              }`}
            >
              {i + 1}
            </span>
            <span className={i === step ? "font-semibold" : "text-ink-mute"}>{s}</span>
            {i < steps.length - 1 && <span className="mx-1 h-px w-6 bg-line" />}
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <label className="mb-2 block text-[15px] font-medium" htmlFor="ti-model">
              Qual iPhone você tem hoje?
            </label>
            <select
              id="ti-model"
              className="input"
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
                setCapacity("");
              }}
            >
              <option value="">Selecione o modelo</option>
              {tradeInModels.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
              <option value={OTHER_MODEL}>Outro modelo</option>
            </select>

            {isOther && (
              <div className="mt-6 rounded-2xl bg-mist p-5">
                <p className="text-[15px] font-medium">
                  {noEstimate ? `O ${m!.name} é avaliado direto pela equipe.` : "Sem problema, a gente avalia pelo WhatsApp."}
                </p>
                <p className="mt-1 text-[14px] text-ink-soft">
                  Mande o modelo, a capacidade e fotos do aparelho que a equipe responde com o valor de entrada.
                </p>
                <LeadLink
                  channel="whatsapp"
                  source={noEstimate ? "troca-sem-tabela" : "troca-outro-modelo"}
                  product={m?.name}
                  message={noEstimate ? otherModelTradeInMessage(m!.name) : otherModelTradeInMessage()}
                  className="btn btn-whatsapp mt-4 w-full"
                >
                  <WhatsAppIcon /> Pedir avaliação no WhatsApp
                </LeadLink>
              </div>
            )}

            {m && !isOther && (
              <div className="mt-6">
                <p className="mb-2 text-[15px] font-medium">Capacidade</p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {m.capacities.map((cap) => (
                    <Choice key={cap} active={capacity === cap} onClick={() => setCapacity(cap)}>
                      {cap}
                    </Choice>
                  ))}
                </div>
              </div>
            )}

            {!isOther && (
              <button type="button" disabled={!m || !capacity} onClick={() => setStep(1)} className="btn btn-dark mt-8 w-full disabled:opacity-30">
                Continuar
              </button>
            )}
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div>
              <p className="mb-2 text-[15px] font-medium">Saúde da bateria</p>
              <p className="mb-3 text-[13px] text-ink-mute">Ajustes › Bateria › Saúde e Carregamento</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {batteryOptions.map((o) => (
                  <Choice key={o.id} active={battery === o.id} onClick={() => setBattery(o.id)}>
                    {o.label}
                  </Choice>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-[15px] font-medium">Tem riscos ou ralados?</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {conditions.map((o) => (
                  <Choice key={o.id} active={condition === o.id} onClick={() => setCondition(o.id)}>
                    <span className="block font-medium">{o.label}</span>
                    <span className="text-[13px] text-ink-mute">{o.hint}</span>
                  </Choice>
                ))}
              </div>
            </div>
            <YesNo label="Já foi aberto ou teve peça trocada?" value={opened} onChange={setOpened} />
            <YesNo label="Tem algum defeito?" value={defect} onChange={setDefect} />

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setStep(0)} className="btn btn-ghost" aria-label="Voltar">
                <ArrowLeft size={18} />
              </button>
              <button type="button" disabled={!ready} onClick={() => setStep(2)} className="btn btn-dark flex-1 disabled:opacity-30">
                Ver estimativa
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && estimate && (
          <motion.div key="s2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <p className="text-[15px] text-ink-soft">
              {m!.name} {capacity} · estimativa de entrada
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-[clamp(30px,5vw,44px)] font-semibold tracking-tight">
              <span className="gold-text">
                {formatBRL(estimate.min)} a {formatBRL(estimate.max)}
              </span>
            </p>
            <p className="mt-2 text-[13px] text-ink-mute">
              Valor final sujeito à avaliação presencial no balcão. Atendimento com horário agendado.
            </p>

            <div className="mt-8">
              <label htmlFor="ti-target" className="mb-2 block text-[15px] font-medium">
                Quer trocar por qual? <span className="font-normal text-ink-mute">(opcional)</span>
              </label>
              <select id="ti-target" className="input" value={target} onChange={(e) => setTarget(e.target.value)}>
                <option value="">Ainda não sei</option>
                {targets.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} {p.storages[0].capacity} · {formatBRL(p.storages[0].price)}
                  </option>
                ))}
              </select>
              {targetPrice && (
                <p className="mt-3 flex items-center gap-2 rounded-2xl bg-mist px-4 py-3 text-[15px]">
                  <Repeat2 size={18} className="text-gold-700" />
                  Você completaria cerca de{" "}
                  <strong>
                    {formatBRL(Math.max(0, targetPrice - estimate.max))} a {formatBRL(Math.max(0, targetPrice - estimate.min))}
                  </strong>
                </p>
              )}
            </div>

            <LeadLink
              channel="whatsapp"
              source="troca"
              product={m!.name}
              message={tradeInMessage({
                model: m!.name,
                capacity,
                condition: c!.label,
                battery: b!.label,
                opened: opened!,
                defect: defect!,
                estimate,
                target: targetProduct ? `${targetProduct.name} ${targetProduct.storages[0].capacity}` : undefined,
              })}
              className="btn btn-whatsapp mt-8 w-full"
            >
              <WhatsAppIcon /> Enviar avaliação no WhatsApp
            </LeadLink>
            <button type="button" onClick={() => setStep(1)} className="mt-3 w-full py-2 text-[14px] text-ink-soft hover:text-ink">
              Ajustar respostas
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
