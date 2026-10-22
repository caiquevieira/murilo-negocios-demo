import { iphoneModels } from "./iphones";

// Valores de referência do simulador de troca: estimativa, sujeita à avaliação na loja.
// "base" = aparelho em estado excelente, na MENOR capacidade do modelo, bateria acima de 85%.
// EXEMPLOS: todos os valores precisam ser confirmados com o Murilo antes da publicação.
const baseValues: Record<string, number> = {
  "iphone-duo": 9000,
  "iphone-18-pro-max": 7600,
  "iphone-18-pro": 6800,
  "iphone-17-pro-max": 6300,
  "iphone-17-pro": 5600,
  "iphone-air": 4700,
  "iphone-17": 4300,
  "iphone-17e": 3300,
  "iphone-16-pro-max": 5200,
  "iphone-16-pro": 4600,
  "iphone-16-plus": 3900,
  "iphone-16": 3600,
  "iphone-16e": 2600,
  "iphone-15-pro-max": 4200,
  "iphone-15-pro": 3700,
  "iphone-15-plus": 3100,
  "iphone-15": 2900,
  "iphone-14-pro-max": 3400,
  "iphone-14-pro": 3000,
  "iphone-14-plus": 2500,
  "iphone-14": 2300,
  "iphone-13-pro-max": 2700,
  "iphone-13-pro": 2400,
  "iphone-13": 1900,
  "iphone-13-mini": 1600,
  "iphone-se-3a-geracao": 800,
  "iphone-12-pro-max": 2000,
  "iphone-12-pro": 1800,
  "iphone-12": 1250,
  "iphone-12-mini": 1100,
  "iphone-11-pro-max": 1300,
  "iphone-11-pro": 1150,
  "iphone-11": 950,
  "iphone-se-2a-geracao": 450,
  "iphone-xs-max": 800,
  "iphone-xs": 700,
  "iphone-xr": 600,
};

/** Todos os iPhones do XR em diante, do mais novo para o mais antigo. */
export const tradeInModels = iphoneModels.map((m) => ({
  id: m.id,
  name: m.name,
  base: baseValues[m.id],
  capacities: m.capacities,
}));

/** Opção do seletor para aparelhos fora da lista: vai direto para avaliação no WhatsApp. */
export const OTHER_MODEL = "outro";

// Acréscimo por capacidade, contado a partir da menor capacidade do modelo
export const capacityAdjust: Record<string, number> = {
  "64GB": 0,
  "128GB": 150,
  "256GB": 400,
  "512GB": 650,
  "1TB": 950,
  "2TB": 1450,
};

// As perguntas seguem a mensagem automática do WhatsApp da loja
export const conditions = [
  { id: "excelente", label: "Excelente", hint: "Sem riscos nem ralados", factor: 1 },
  { id: "bom", label: "Bom", hint: "Riscos leves de uso", factor: 0.85 },
  { id: "marcas", label: "Com marcas", hint: "Ralados ou amassados", factor: 0.65 },
] as const;

export const batteryOptions = [
  { id: "alta", label: "85% ou mais", factor: 1 },
  { id: "media", label: "80% a 84%", factor: 0.93 },
  { id: "baixa", label: "Abaixo de 80%", factor: 0.85 },
] as const;

export function estimateTradeIn(
  base: number,
  capacities: string[],
  capacity: string,
  conditionFactor: number,
  batteryFactor: number,
  opened: boolean,
  defect: boolean,
) {
  const value =
    (base + (capacityAdjust[capacity] ?? 0) - (capacityAdjust[capacities[0]] ?? 0)) * conditionFactor * batteryFactor * (opened ? 0.8 : 1) * (defect ? 0.6 : 1);
  const max = Math.round(value / 50) * 50;
  const min = Math.round((value * 0.88) / 50) * 50;
  return { min, max };
}
