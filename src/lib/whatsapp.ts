import { site } from "@/config/site";
import { formatBRL } from "./format";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function genericMessage() {
  return `Olá! Vim pelo site e gostaria de falar com a ${site.brand}.`;
}

export function productMessage(p: { name: string; capacity: string; color: string; price: number; seminovo?: boolean }) {
  const kind = p.seminovo ? " seminovo" : "";
  return `Olá, vi no site de vocês o ${p.name}${kind} ${p.capacity} (cor ${p.color}) por ${formatBRL(p.price)} e gostaria de reservar para retirada na loja de Osasco!`;
}

export function tradeInMessage(t: {
  model: string;
  capacity: string;
  condition: string;
  battery: string;
  opened: boolean;
  defect: boolean;
  estimate: { min: number; max: number };
  target?: string;
}) {
  return [
    `Olá! Quero dar meu iPhone como entrada${t.target ? ` no ${t.target}` : ""}.`,
    ``,
    `Aparelho: ${t.model} ${t.capacity}`,
    `Saúde da bateria: ${t.battery}`,
    `Estado: ${t.condition}`,
    `Já foi aberto ou teve peça trocada: ${t.opened ? "Sim" : "Não"}`,
    `Tem defeito: ${t.defect ? "Sim" : "Não"}`,
    ``,
    `O site estimou entre ${formatBRL(t.estimate.min)} e ${formatBRL(t.estimate.max)}. Podemos agendar uma avaliação na loja?`,
  ].join("\n");
}

export function otherModelTradeInMessage() {
  return `Olá! Quero dar meu aparelho como entrada, mas o modelo não está no simulador do site. Vocês fazem a avaliação? Meu aparelho é: `;
}

export function compareMessage(c: { current: string; target: string }) {
  return `Olá! Comparei no site o meu ${c.current} com o ${c.target}. Quero saber quanto fica a troca, dando o meu como entrada.`;
}

export function visitMessage() {
  return `Olá! Gostaria de agendar uma visita à loja de Osasco. Qual o melhor horário?`;
}

export function seminovosMessage() {
  return `Olá! Quero ver os iPhones seminovos disponíveis hoje. Pode me mandar a lista?`;
}
