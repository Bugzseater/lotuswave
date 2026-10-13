import { existsSync } from "node:fs";
import path from "node:path";
import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { JourneyFinder, JourneyFinderFallback } from "@/components/journeys/journey-finder";
import { JourneysInquiryCta } from "@/components/journeys/journeys-inquiry-cta";
import { JOURNEYS_HERO_IMAGE as HERO_IMAGE, JourneysHero } from "@/components/journeys/journeys-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { WaveEdge } from "@/components/ui/wave-edge";
import { getJourneys } from "@/lib/data";
import { absoluteUrl, cn } from "@/lib/utils";
import type { JourneySummary } from "@/types";

// TODO: switch to buildMetadata() once src/lib/seo/metadata.ts exists.
export const metadata: Metadata = {
  title: "Sri Lanka Tour Packages — Agro, Wellness & Private Journeys",
  description:
    "Private Sri Lanka journeys from 5 to 14 days: farm stays, Ayurveda retreats, tea country, wildlife safaris, beach escapes and luxury tours — every one tailor-made.",
  alternates: { canonical: "/journeys" },
  openGraph: {
    title: "Sri Lanka Journeys | LotusWave Lanka Tours",
    images: [{ url: HERO_IMAGE.src, alt: HERO_IMAGE.alt }],
  },
};

/** Watercolour at the foot of the finder. Hidden until the file is in place. */
const BASE_ART = "/bg/journeys/base.png";

export default async function JourneysPage() {
  const journeys = await getJourneys();
  const hasBaseArt = existsSync(path.join(process.cwd(), "public", BASE_ART));
  // Only what the cards and filters use crosses to the client.
  const summaries: JourneySummary[] = journeys.map((journey) => ({
    slug: journey.slug,
    title: journey.title,
    durationDays: journey.durationDays,
    bestFor: journey.bestFor,
    startingPrice: journey.startingPrice,
    theme: journey.theme,
    image: journey.image,
    route: journey.route,
    categories: journey.categories,
    travelStyles: journey.travelStyles,
    comfort: journey.comfort,
    groupTypes: journey.groupTypes,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: "Sri Lanka journeys",
        itemListElement: journeys.map((journey, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(`/journeys/${journey.slug}`),
          name: journey.title,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Journeys", item: absoluteUrl("/journeys") },
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

      <JourneysHero />

      <Container className="pt-5">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Journeys" },
          ]}
        />
      </Container>

      {/* overflow-clip, not hidden, so the sticky filter column still sticks. */}
      <Section
        id="finder"
        aria-labelledby="finder-heading"
        className={cn(
          "relative isolate scroll-mt-24 overflow-clip pt-10 sm:pt-12 lg:pt-16",
          hasBaseArt && "pb-44 sm:pb-56 lg:pb-64",
        )}
      >
        {/* Watercolour base faded in along the bottom, closed by the CTA's
            green-mist wave — as on the experience category pages. */}
        {hasBaseArt && (
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-80 sm:h-[26rem] lg:h-[34rem]">
            <Image src={BASE_ART} alt="" fill sizes="100vw" className="object-cover object-bottom opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-transparent" />
          </div>
        )}
        {/* One flat wave in the CTA's green mist, so this section flows down
            into it. */}
        <WaveEdge position="bottom" flat className="-bottom-px fill-green-mist" />

        <Container>
          <Suspense fallback={<JourneyFinderFallback journeys={summaries} />}>
            <JourneyFinder journeys={summaries} />
          </Suspense>
        </Container>
      </Section>

      <JourneysInquiryCta />
    </>
  );
}
