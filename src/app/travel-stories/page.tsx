import type { Metadata } from "next";

import { Container, Section } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Travel Stories",
  description:
    "Guides, field notes and slow reading on Sri Lankan farming, food, wellness and culture.",
  path: "/travel-stories",
});

export default function TravelStoriesPage() {
  return (
    <Section>
      <Container>
        <h1 className="font-display text-4xl">Travel Stories</h1>
      </Container>
    </Section>
  );
}
