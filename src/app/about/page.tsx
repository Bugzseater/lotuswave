import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { AgroWellnessVision } from "@/components/about/agro-wellness-vision";
import { FounderStory } from "@/components/about/founder-story";
import { Trust } from "@/components/about/trust";
import { WhoWeAre } from "@/components/about/who-we-are";
// Hidden for now — components kept, re-enable by uncommenting.
// import { ContactCta } from "@/components/about/contact-cta";
// import { Licences } from "@/components/about/licences";
// import { PartnerNetwork } from "@/components/about/partner-network";
// import { Team } from "@/components/about/team";
// import { WhyWeStarted } from "@/components/about/why-we-started";
// import { ResponsibleTravel } from "@/components/home/responsible-travel";

// TODO: switch to buildMetadata() once src/lib/seo/metadata.ts exists.
export const metadata: Metadata = {
  title: "About Us",
  description:
    "LotusWave Lanka Tours is a Sri Lankan travel and wellness company sharing the island's nature, culture and communities through authentic, sustainable journeys.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About LotusWave Lanka Tours",
    images: [{ url: "/bg/aboutUs/hero.png", alt: "Sunrise over Sigiriya rock, Sri Lanka" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      {/* <WhyWeStarted /> */}
      <AgroWellnessVision />
      <FounderStory />
      {/* <Team /> */}
      {/* <PartnerNetwork /> */}
      {/* <ResponsibleTravel /> */}
      {/* <Licences /> */}
      <Trust />
      {/* <ContactCta /> */}
    </>
  );
}
