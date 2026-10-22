"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { isStoreOpen } from "@/lib/hours";

/** Indicador "Aberto agora" calculado no navegador, no fuso de São Paulo. */
export function StoreStatus({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setOpen(isStoreOpen());
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <span className={`inline-flex items-center gap-2 text-[14px] ${dark ? "text-white/80" : "text-ink-soft"}`}>
      <span className="relative flex h-2.5 w-2.5">
        {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${open === null ? "bg-ink-mute" : open ? "bg-emerald-500" : "bg-red-400"}`}
        />
      </span>
      {open === null ? site.hours.short : open ? `Aberto agora · até ${site.hours.close}h` : `Fechado agora · abre às ${site.hours.open}h`}
    </span>
  );
}
