import type { Metadata } from "next";
import { IphoneCompare } from "@/components/IphoneCompare";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Compare modelos de iPhone",
  description:
    "Compare o iPhone que você tem com o que quer levar: tela, chip, câmeras, bateria e recursos, do iPhone XR ao iPhone 18 Pro Max.",
};

export default function CompararPage() {
  return (
    <>
      <PageHeader
        tone="marble"
        eyebrow="Comparar"
        title="O seu. O novo. Lado a lado."
        sub="Escolha o iPhone que você tem e o que quer levar para ver tudo o que muda."
      />
      <section className="marble pb-20 md:pb-28">
        <div className="wrap">
          <IphoneCompare />
        </div>
      </section>
      <ClosingCta source="comparar-final" />
    </>
  );
}
