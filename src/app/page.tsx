import { PromoRibbon } from "@/components/layout/PromoRibbon";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Hero } from "@/components/sections/Hero";
import { HomeTiles, RestockTile } from "@/components/sections/HomeTiles";
import { InstagramBlock } from "@/components/sections/InstagramBlock";
import { LineupStrip } from "@/components/sections/LineupStrip";
import { StoreSection } from "@/components/sections/StoreSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TrustBar } from "@/components/sections/TrustBar";

export default function Home() {
  return (
    <>
      <PromoRibbon />
      <Hero />
      <TrustBar />
      <RestockTile />
      <HomeTiles />
      <LineupStrip />
      <InstagramBlock />
      <TeamSection />
      <StoreSection />
      <ClosingCta />
    </>
  );
}
