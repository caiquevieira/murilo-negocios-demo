// Valores de referência do simulador de troca: estimativa, sujeita à avaliação na loja.
// "base" = aparelho em estado excelente, 128GB, bateria acima de 85%.
export const tradeInModels: { name: string; base: number; capacities: string[] }[] = [
  { name: "iPhone 11", base: 1100, capacities: ["64GB", "128GB", "256GB"] },
  { name: "iPhone 11 Pro", base: 1300, capacities: ["64GB", "256GB", "512GB"] },
  { name: "iPhone 11 Pro Max", base: 1450, capacities: ["64GB", "256GB", "512GB"] },
  { name: "iPhone 12", base: 1400, capacities: ["64GB", "128GB", "256GB"] },
  { name: "iPhone 12 Pro", base: 1800, capacities: ["128GB", "256GB", "512GB"] },
  { name: "iPhone 12 Pro Max", base: 2000, capacities: ["128GB", "256GB", "512GB"] },
  { name: "iPhone 13", base: 1900, capacities: ["128GB", "256GB", "512GB"] },
  { name: "iPhone 13 Pro", base: 2400, capacities: ["128GB", "256GB", "512GB", "1TB"] },
  { name: "iPhone 13 Pro Max", base: 2700, capacities: ["128GB", "256GB", "512GB", "1TB"] },
  { name: "iPhone 14", base: 2300, capacities: ["128GB", "256GB", "512GB"] },
  { name: "iPhone 14 Plus", base: 2500, capacities: ["128GB", "256GB", "512GB"] },
  { name: "iPhone 14 Pro", base: 3000, capacities: ["128GB", "256GB", "512GB", "1TB"] },
  { name: "iPhone 14 Pro Max", base: 3400, capacities: ["128GB", "256GB", "512GB", "1TB"] },
  { name: "iPhone 15", base: 2900, capacities: ["128GB", "256GB", "512GB"] },
  { name: "iPhone 15 Plus", base: 3100, capacities: ["128GB", "256GB", "512GB"] },
  { name: "iPhone 15 Pro", base: 3700, capacities: ["128GB", "256GB", "512GB", "1TB"] },
  { name: "iPhone 15 Pro Max", base: 4200, capacities: ["256GB", "512GB", "1TB"] },
  { name: "iPhone 16E", base: 2600, capacities: ["128GB", "256GB", "512GB"] },
  { name: "iPhone 16", base: 3600, capacities: ["128GB", "256GB", "512GB"] },
  { name: "iPhone 16 Plus", base: 3900, capacities: ["128GB", "256GB", "512GB"] },
  { name: "iPhone 16 Pro", base: 4600, capacities: ["128GB", "256GB", "512GB", "1TB"] },
  { name: "iPhone 16 Pro Max", base: 5200, capacities: ["256GB", "512GB", "1TB"] },
];

export const capacityAdjust: Record<string, number> = {
  "64GB": -150,
  "128GB": 0,
  "256GB": 250,
  "512GB": 500,
  "1TB": 800,
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
  capacity: string,
  conditionFactor: number,
  batteryFactor: number,
  opened: boolean,
  defect: boolean,
) {
  const value =
    (base + (capacityAdjust[capacity] ?? 0)) * conditionFactor * batteryFactor * (opened ? 0.8 : 1) * (defect ? 0.6 : 1);
  const max = Math.round(value / 50) * 50;
  const min = Math.round((value * 0.88) / 50) * 50;
  return { min, max };
}

// Modelos que podem ser encomendados, inclusive os que não estão na vitrine
export const orderableModels = [
  "iPhone 18 Pro Max", "iPhone 18 Pro", "iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 17 Air", "iPhone 17",
  "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16", "iPhone 16E",
  "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
  "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
  "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 mini", "Outro modelo",
];

export const orderCapacities = ["128GB", "256GB", "512GB", "1TB"];
