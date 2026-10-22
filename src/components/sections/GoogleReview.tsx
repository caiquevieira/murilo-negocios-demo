import { Star } from "lucide-react";
import { LeadLink } from "../ui/LeadLink";
import { Reveal } from "../ui/Reveal";

/** Convite para o cliente deixar avaliação na ficha da loja no Google. */
export function GoogleReview({ source = "avaliacao-google" }: { source?: string }) {
  return (
    <section className="bg-white py-16 md:py-20">
      <Reveal className="wrap">
        <div className="marble flex flex-col items-center gap-6 rounded-[var(--radius-tile)] px-6 py-12 text-center md:flex-row md:justify-between md:px-14 md:text-left">
          <div>
            <div className="flex justify-center gap-1 md:justify-start" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={22} className="fill-gold-500 text-gold-500" />
              ))}
            </div>
            <h2 className="t-tile mt-4">Já comprou com a gente?</h2>
            <p className="t-callout mt-2 max-w-[42ch]">
              Conte como foi no Google. Leva menos de um minuto e ajuda outras pessoas a comprar com segurança.
            </p>
          </div>
          <LeadLink channel="avaliacao" source={source} className="btn btn-dark shrink-0">
            <GoogleIcon /> Avaliar no Google
          </LeadLink>
        </div>
      </Reveal>
    </section>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
      <path fill="#4285F4" d="M22.6 12.3c0-.8-.1-1.5-.2-2.3H12v4.3h6c-.3 1.4-1 2.5-2.2 3.3v2.8h3.6c2-1.9 3.2-4.7 3.2-8.1z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.4-2.7l-3.6-2.8c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.6H2v2.9C3.8 20.5 7.6 23 12 23z" />
      <path fill="#FBBC05" d="M5.7 14c-.2-.7-.4-1.4-.4-2s.1-1.4.4-2V7.1H2C1.4 8.6 1 10.3 1 12s.4 3.4 1 4.9L5.7 14z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2C17.5 2.1 15 1 12 1 7.6 1 3.8 3.5 2 7.1L5.7 10c.9-2.7 3.4-4.6 6.3-4.6z" />
    </svg>
  );
}
