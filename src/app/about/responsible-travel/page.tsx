import type { Metadata } from "next";

import { Container, Section } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Responsible Travel",
  description:
    "How we share revenue with farms and estates, and what we ask of travellers in return.",
  path: "/about/responsible-travel",
});

export default function ResponsibleTravelPage() {
  return (
    <Section>
      <Container>
        <h1 className="font-display text-4xl">Responsible Travel</h1>
      </Container>
    </Section>
  );
}
