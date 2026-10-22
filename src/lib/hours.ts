import { site } from "@/config/site";

/** Indica se a loja está aberta agora, no fuso de São Paulo. */
export function isStoreOpen(now = new Date()) {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", timeZone: site.hours.timeZone }).format(now),
  );
  return hour >= site.hours.open && hour < site.hours.close;
}
