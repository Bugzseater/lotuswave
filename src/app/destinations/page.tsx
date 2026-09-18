import type { Metadata } from "next";

import { Container, Section } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Destinations",
  description:
    "Kandy, Ella, Sigiriya, Nuwara Eliya, Galle, Anuradhapura and beyond — the places our journeys pass through.",
  path: "/destinations",
});

export default function DestinationsPage() {
  return (
    <Section>
      <Container>
        <h1 className="font-display text-4xl">Destinations</h1>
      </Container>
    </Section>
  );
}
