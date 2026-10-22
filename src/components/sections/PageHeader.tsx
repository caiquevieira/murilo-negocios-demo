import { Reveal } from "../ui/Reveal";

/** Cabeçalho de capítulo das páginas internas: título grande, frase curta, muito respiro. */
export function PageHeader({
  eyebrow,
  title,
  sub,
  children,
  tone = "light",
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  children?: React.ReactNode;
  tone?: "light" | "dark" | "marble";
}) {
  const bg = tone === "dark" ? "dark bg-night text-white" : tone === "marble" ? "marble" : "bg-mist";
  return (
    <section className={`${bg} pt-16 pb-14 md:pt-24 md:pb-20`}>
      <Reveal className="wrap text-center">
        <p className="t-eyebrow">{eyebrow}</p>
        <h1 className="t-hero mx-auto mt-3 max-w-[16ch]">{title}</h1>
        {sub && <p className={`t-sub mx-auto mt-4 max-w-[36ch] ${tone === "dark" ? "text-white/70" : "text-ink-soft"}`}>{sub}</p>}
        {children && <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div>}
      </Reveal>
    </section>
  );
}
