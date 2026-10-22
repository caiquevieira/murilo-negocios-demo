import Image from "next/image";
import { CalendarClock, MapPin, MessageCircle, Navigation, Store } from "lucide-react";
import { site } from "@/config/site";
import { visitMessage } from "@/lib/whatsapp";
import { StoreStatus } from "../StoreStatus";
import { LeadLink } from "../ui/LeadLink";
import { Reveal } from "../ui/Reveal";
import { InstagramIcon, WhatsAppIcon } from "../ui/icons";

const steps = [
  { icon: MessageCircle, title: "Chame no WhatsApp", text: "Diga qual iPhone quer ver ou trocar." },
  { icon: CalendarClock, title: "Combine o horário", text: "Separamos o aparelho para você." },
  { icon: Store, title: "Venha à loja", text: `${site.address.street}, ${site.address.district}.` },
];

/** Visita à loja: sempre com horário marcado pelo WhatsApp. Mapa ligado à ficha da loja no Google. */
export function StoreSection({ withPhotos = false }: { withPhotos?: boolean }) {
  return (
    <section id="loja" className="bg-mist py-20 md:py-28">
      <div className="wrap">
        <Reveal className="text-center">
          <p className="t-eyebrow">Visita com hora marcada</p>
          <h2 className="t-section mt-3">Venha ver de perto.</h2>
          <p className="t-callout mx-auto mt-4 max-w-[46ch]">
            Atendimento exclusivo, sem fila: você agenda pelo WhatsApp e o seu iPhone já fica separado.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-[1.1fr_1fr]">
          <Reveal className="flex flex-col rounded-[var(--radius-tile)] bg-white p-8">
            <ol className="space-y-6">
              {steps.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="flex gap-4">
                  <span className="gold-fill grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="text-[13px] text-ink-mute">Passo {i + 1}</p>
                    <h3 className="text-[19px] font-semibold leading-tight">{title}</h3>
                    <p className="text-[15px] text-ink-soft">{text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 space-y-2 border-t border-line pt-6 text-[15px]">
              <p className="flex items-center gap-2">
                <MapPin size={17} className="shrink-0 text-gold-700" />
                <LeadLink channel="mapa" source="localizacao-endereco" className="underline-offset-2 hover:underline">
                  {site.address.street} · {site.address.district}, {site.address.city} - {site.address.state}
                </LeadLink>
              </p>
              <p className="flex items-center gap-2">
                <CalendarClock size={17} className="shrink-0 text-gold-700" />
                {site.hours.short}
              </p>
              <StoreStatus />
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
              <LeadLink channel="whatsapp" source="localizacao" message={visitMessage()} className="btn btn-whatsapp flex-1">
                <WhatsAppIcon /> Agendar visita
              </LeadLink>
              <LeadLink channel="instagram" source="localizacao" className="btn btn-ghost flex-1">
                <InstagramIcon /> Ver a loja no Instagram
              </LeadLink>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex min-h-[420px] flex-col overflow-hidden rounded-[var(--radius-tile)] bg-white">
            <iframe
              title={`Mapa: ${site.address.street}, ${site.address.city}`}
              src={site.google.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[320px] w-full flex-1 border-0 grayscale-[0.35]"
            />
            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="leading-tight">
                <p className="font-semibold">{site.legalName}</p>
                <p className="text-[14px] text-ink-soft">
                  {site.address.street} · {site.address.district}, {site.address.city}
                </p>
              </div>
              <LeadLink channel="mapa" source="localizacao-mapa" className="btn btn-dark btn-sm shrink-0">
                <Navigation size={16} /> Abrir no Google Maps
              </LeadLink>
            </div>
          </Reveal>
        </div>

        {withPhotos && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { src: "/store/equipe-reposicao.jpg", alt: "Equipe com iPhones 17 Pro lacrados", caption: "Reposição de iPhone 17 Pro" },
              { src: "/store/murilo.jpg", alt: "Murilo segurando vários iPhones", caption: "Quem atende é quem entende" },
            ].map((p) => (
              <Reveal key={p.src} className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-tile)]">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 640px) 520px, 100vw" className="object-cover" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-[15px] font-medium text-white">
                  {p.caption}
                </span>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
