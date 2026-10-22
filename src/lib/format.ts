const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatBRL(value: number) {
  // Intl usa espaço não separável após "R$"; normalizamos para espaço comum (mensagens do WhatsApp)
  return brl.format(value).replace(/ /g, " ");
}

export function discountPercent(from: number, to: number) {
  return Math.round(((from - to) / from) * 100);
}
