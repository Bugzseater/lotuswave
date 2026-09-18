import type { Metadata } from "next";

import { Container, Section } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Our Team",
  description:
    "The journey designers, guides and physicians behind LotusWave Lanka Tours.",
  path: "/about/our-team",
});

export default function OurTeamPage() {
  return (
    <Section>
      <Container>
        <h1 className="font-display text-4xl">Our Team</h1>
      </Container>
    </Section>
  );
}
