import type { Metadata } from "next";

import { PlanTripForm } from "@/components/forms/plan-trip-form";
import { Container, Section } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Plan Your Trip",
  description:
    "Tell us how you like to travel and our journey designers will build an agro or wellness itinerary around it.",
  path: "/plan-your-trip",
});

export default function PlanYourTripPage() {
  return (
    <Section>
      <Container className="max-w-2xl">
        <h1 className="font-display text-4xl">Plan Your Trip</h1>
        <div className="mt-10">
          <PlanTripForm />
        </div>
      </Container>
    </Section>
  );
}
