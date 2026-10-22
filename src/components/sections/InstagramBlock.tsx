import Image from "next/image";
import { Star } from "lucide-react";
import { site } from "@/config/site";
import { LeadLink } from "../ui/LeadLink";
import { Reveal } from "../ui/Reveal";
import { InstagramIcon, VerifiedIcon, WhatsAppIcon } from "../ui/icons";

const feed = [
  { src: "/store/equipe-reposicao.jpg", alt: "Equipe da loja com caixas lacradas de iPhone 17 Pro" },
  { src: "/store/parede-logo.jpg", alt: "Letreiro dourado Murilo Negócios na loja" },
  { src: "/store/murilo.jpg", alt: "Murilo segurando vários iPhones" },
];

/** Bloco de conversão para o Instagram: as ofertas do dia saem nos Stories. */
export function InstagramBlock({ source = "bloco-instagram" }: { source?: string }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="wrap grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="t-eyebrow">Ofertas do dia</p>
          <h2 className="t-section mt-3">
            O preço de hoje
            <br />
            está nos Stories.
          </h2>
          <p className="t-callout mt-5 max-w-[38ch]">
            Todo dia sai uma oferta nova no Instagram e no Status do WhatsApp, às vezes abaixo do preço do site. Siga para
            não perder.
          </p>

          <div className="mt-7 flex items-center gap-4">
            <div className="gold-fill grid h-16 w-16 place-items-center rounded-full p-[2px]">
              <div className="grid h-full w-full place-items-center overflow-hidden rounded-full bg-white">
                <Image src="/store/murilo.jpg" alt="" width={64} height={64} className="h-full w-full object-cover" />
              </div>
            </div>
            <div>
              <p className="flex items-center gap-1 font-semibold">
                {site.instagram.handle} <VerifiedIcon />
              </p>
              <p className="text-[14px] text-ink-soft">
                <strong className="text-ink">{site.instagram.followers}</strong> seguidores ·{" "}
                <span className="inline-flex items-center gap-0.5">
                  <Star size={13} className="fill-gold-500 text-gold-500" /> {site.googleRating} no Google
                </span>
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-8 flex flex-wrap gap-3">
            <LeadLink channel="instagram" source={source} className="btn btn-instagram">
              <InstagramIcon /> Seguir no Instagram
            </LeadLink>
            <LeadLink
              channel="whatsapp"
              source={`${source}:status`}
              message="Olá! Quero receber as ofertas do dia. Já salvei o contato de vocês!"
              className="btn btn-ghost"
            >
              <WhatsAppIcon /> Receber ofertas no WhatsApp
            </LeadLink>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <LeadLink
            channel="instagram"
            source={`${source}:feed`}
            ariaLabel="Abrir o Instagram @murilonegocioss"
            className="group grid grid-cols-2 gap-2"
          >
            {feed.map((f, i) => (
              <span
                key={f.src}
                className={`relative block overflow-hidden rounded-[18px] bg-mist ${i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"}`}
              >
                <Image
                  src={f.src}
                  alt={f.alt}
                  fill
                  sizes="(min-width: 768px) 520px, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </span>
            ))}
          </LeadLink>
        </Reveal>
      </div>
    </section>
  );
}
