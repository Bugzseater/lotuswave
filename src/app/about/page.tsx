import type { Metadata } from "next";

import { Container, Section } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Who we are, how we design journeys, and why we work only with the growers and practitioners we know.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Section>
      <Container>
        <h1 className="font-display text-4xl">About</h1>
      </Container>
    </Section>
  );
}
