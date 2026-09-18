import type { Metadata } from "next";

import { Container, Section } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Why Travel With Us",
  description:
    "Small groups, local ownership and itineraries built one at a time.",
  path: "/about/why-travel-with-us",
});

export default function WhyTravelWithUsPage() {
  return (
    <Section>
      <Container>
        <h1 className="font-display text-4xl">Why Travel With Us</h1>
      </Container>
    </Section>
  );
}
