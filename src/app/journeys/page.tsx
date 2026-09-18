import type { Metadata } from "next";

import { Container, Section } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Journeys",
  description:
    "Multi-day agro and wellness itineraries across Sri Lanka — tea trails, Ayurvedic retreats, heritage and coast.",
  path: "/journeys",
});

export default function JourneysPage() {
  return (
    <Section>
      <Container>
        <h1 className="font-display text-4xl">Journeys</h1>
      </Container>
    </Section>
  );
}
