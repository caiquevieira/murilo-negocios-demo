// Camada única de medição de conversão, no padrão Underline (_docs/padrao-whatsapp.md):
// data-track = canal, data-origem = de onde veio o clique.
export type TrackChannel = "whatsapp" | "instagram" | "avaliacao" | "mapa";

type TrackEvent = {
  channel: TrackChannel;
  /** Ex.: "hero", "vitrine-iphone-17-pro", "flutuante", "footer" */
  origem: string;
  product?: string;
  value?: number;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track({ channel, origem, product, value }: TrackEvent) {
  if (typeof window === "undefined") return;
  const currency = value ? "BRL" : undefined;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: `track_${channel}`, origem, product, value, currency });

  if (channel === "whatsapp") {
    window.gtag?.("event", "generate_lead", { method: "whatsapp", origem, item_name: product, value, currency });
    window.fbq?.("track", "Contact", { content_name: product ?? origem, value, currency });
  } else {
    window.gtag?.("event", `click_${channel}`, { origem });
  }

  if (process.env.NODE_ENV !== "production") {
    console.info(`[track] ${channel} ← ${origem}`, { product, value });
  }
}
