import type { Metadata } from "next";
import { PlanTripHero } from "@/components/plan-trip/plan-trip-hero";
import { PlanTripSection } from "@/components/plan-trip/plan-trip-section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Container } from "@/components/ui/container";
import { getDestinations, getExperiences, getJourneys } from "@/lib/data";

// TODO: switch to buildMetadata() once src/lib/seo/metadata.ts exists.
export const metadata: Metadata = {
  title: "Plan Your Trip — Tailor-Made Sri Lanka Journeys",
  description:
    "Plan a private, tailor-made Sri Lanka journey. Share your dates, interests and travel style — agro, wellness, Ayurveda, culture or wildlife — and a local travel designer replies within one working day.",
  alternates: { canonical: "/plan-your-trip" },
  openGraph: {
    title: "Plan Your Sri Lanka Journey | LotusWave Lanka Tours",
    images: [
      {
        url: "/bg/planTrip/hero.png",
        alt: "Travellers and a local guide on a rocky viewpoint above misty tea-covered hills at sunrise in Sri Lanka's hill country",
      },
    ],
  },
};

export default async function PlanYourTripPage() {
  const [journeys, experiences, destinations] = await Promise.all([
    getJourneys(),
    getExperiences(),
    getDestinations(),
  ]);

  // `kind:slug` → title, so the form can name the page a guest came from
  // (`?experience=…`) without the page reading searchParams and going dynamic.
  const sources: Record<string, string> = Object.fromEntries([
    ...journeys.map((j) => [`journey:${j.slug}`, j.title]),
    ...experiences.map((e) => [`experience:${e.slug}`, e.title]),
    ...destinations.map((d) => [`destination:${d.slug}`, d.name]),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: "Plan Your Trip",
        url: "/plan-your-trip",
        description: metadata.description,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Plan Your Trip", item: "/plan-your-trip" },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <PlanTripHero />

      <Container className="max-w-[80rem] pt-5">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Plan Your Trip" },
          ]}
        />
      </Container>

      <PlanTripSection sources={sources} />
    </>
  );
}
