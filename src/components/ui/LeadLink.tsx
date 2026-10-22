"use client";

import type { ReactNode } from "react";
import { site } from "@/config/site";
import { track, type TrackChannel } from "@/lib/analytics";
import { buildWhatsAppLink, genericMessage } from "@/lib/whatsapp";

type Props = {
  channel: TrackChannel;
  /** Origem do clique no relatório de conversão (data-origem) */
  source: string;
  /** Mensagem do WhatsApp; padrão = mensagem genérica */
  message?: string;
  product?: string;
  value?: number;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

const defaultLabel: Record<TrackChannel, string> = {
  whatsapp: "Conversar no WhatsApp",
  instagram: "Abrir o Instagram @murilonegocioss",
};

/** Link de conversão: href estático (funciona sem JS) + evento de tracking no clique. */
export function LeadLink({ channel, source, message, product, value, className, children, ariaLabel }: Props) {
  const href = channel === "whatsapp" ? buildWhatsAppLink(message ?? genericMessage()) : site.instagram.url;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={className}
      aria-label={ariaLabel ?? defaultLabel[channel]}
      data-track={channel}
      data-origem={source}
      onClick={() => track({ channel, origem: source, product, value })}
    >
      {children}
    </a>
  );
}
