"use client";

import { useState } from "react";
import { orderCapacities, orderableModels } from "@/data/tradein";
import { orderMessage } from "@/lib/whatsapp";
import { LeadLink } from "./ui/LeadLink";
import { WhatsAppIcon } from "./ui/icons";

/** Encomenda de modelos fora da vitrine: só monta a mensagem do WhatsApp. */
export function OrderForm() {
  const [model, setModel] = useState("");
  const [capacity, setCapacity] = useState("256GB");
  const [color, setColor] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="rounded-[var(--radius-tile)] bg-white p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] md:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="enc-modelo" className="mb-2 block text-[15px] font-medium">
            Modelo
          </label>
          <select id="enc-modelo" className="input" value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="">Selecione o iPhone</option>
            {orderableModels.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="enc-cap" className="mb-2 block text-[15px] font-medium">
            Capacidade
          </label>
          <select id="enc-cap" className="input" value={capacity} onChange={(e) => setCapacity(e.target.value)}>
            {orderCapacities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="enc-cor" className="mb-2 block text-[15px] font-medium">
            Cor preferida
          </label>
          <input
            id="enc-cor"
            className="input"
            placeholder="Ex.: Azul-profundo"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="enc-obs" className="mb-2 block text-[15px] font-medium">
            Observações <span className="font-normal text-ink-mute">(opcional)</span>
          </label>
          <textarea
            id="enc-obs"
            rows={3}
            className="input resize-none"
            placeholder="Ex.: quero dar meu iPhone 13 na troca"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      {model ? (
        <LeadLink
          channel="whatsapp"
          source="encomenda"
          product={`${model} ${capacity}`}
          message={orderMessage({ model, capacity, color, notes })}
          className="btn btn-whatsapp mt-8 w-full"
        >
          <WhatsAppIcon /> Encomendar pelo WhatsApp
        </LeadLink>
      ) : (
        <button type="button" disabled className="btn btn-whatsapp mt-8 w-full opacity-30">
          <WhatsAppIcon /> Escolha o modelo para continuar
        </button>
      )}
      <p className="mt-3 text-center text-[13px] text-ink-mute">Respondemos com prazo e valor. Nenhum dado fica salvo no site.</p>
    </div>
  );
}
