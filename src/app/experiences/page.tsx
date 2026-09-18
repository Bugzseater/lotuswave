import type { Metadata } from "next";

import { Container, Section } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Experiences",
  description:
    "Tea harvests, spice gardens, farm stays, Ayurveda and yoga — single experiences you can slot into any journey.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  return (
    <Section>
      <Container>
        <h1 className="font-display text-4xl">Experiences</h1>
      </Container>
    </Section>
  );
}
