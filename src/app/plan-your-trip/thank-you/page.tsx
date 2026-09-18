import type { Metadata } from "next";

import { Container, Section } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Thank You",
  description: "Your enquiry has reached our journey designers.",
  path: "/plan-your-trip/thank-you",
  seo: { noIndex: true },
});

export default function ThankYouPage() {
  return (
    <Section>
      <Container>
        <h1 className="font-display text-4xl">Thank You</h1>
      </Container>
    </Section>
  );
}
