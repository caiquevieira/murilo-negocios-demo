import { Check } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const checks = [
  { title: "Bateria", text: "Saúde medida e informada em porcentagem, sem estimativa." },
  { title: "Tela", text: "Toque, cores e ausência de manchas ou marcas de queimado." },
  { title: "Face ID", text: "Reconhecimento facial testado e funcionando." },
  { title: "Câmeras", text: "Foco, flash e qualidade de imagem em todas as lentes." },
  { title: "IMEI limpo", text: "Consulta feita antes da venda: sem bloqueio, roubo ou pendência." },
  { title: "Chip e conectividade", text: "Sinal, Wi-Fi, Bluetooth e carregamento testados." },
];

export function VerificationList() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="wrap">
        <Reveal>
          <p className="t-eyebrow">Verificação</p>
          <h2 className="t-section mt-3 max-w-[18ch]">O que verificamos em cada seminovo.</h2>
          <p className="t-callout mt-4 max-w-[46ch]">Antes de chegar até você, cada aparelho passa por uma checagem completa.</p>
        </Reveal>
        <ul className="mt-12 grid gap-x-10 sm:grid-cols-2">
          {checks.map((c, i) => (
            <Reveal key={c.title} delay={0.05 * i}>
              <li className="flex gap-4 border-b border-line py-6">
                <span className="gold-fill grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink">
                  <Check size={15} strokeWidth={3} />
                </span>
                <div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-[15px] text-ink-soft">{c.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
