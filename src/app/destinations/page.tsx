import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow } from "@/components/about/eyebrow";
import { DestinationCard } from "@/components/destinations/destination-card";
import { atlasOrder, bestMonths } from "@/components/destinations/destination-category";
import { DestinationInquiryCta } from "@/components/destinations/destination-inquiry-cta";
import { DestinationsHero } from "@/components/destinations/destinations-hero";
import { IslandMap, type MapPin } from "@/components/destinations/island-map";
import { JourneySlider } from "@/components/journeys/journey-slider";
import { SeasonDotLegend } from "@/components/destinations/season-chart";
import { SeasonExplorer, type SeasonPlace } from "@/components/destinations/season-explorer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { WaveEdge } from "@/components/ui/wave-edge";
import { DESTINATION_AREAS } from "@/lib/constants";
import { getDestinations } from "@/lib/data";

// TODO: switch to buildMetadata() once src/lib/seo/metadata.ts exists.
export const metadata: Metadata = {
  title: "Sri Lanka Destinations — Ancient Cities, Hill Country, Wildlife & Coasts",
  description:
    "Fifteen Sri Lanka destinations, from Sigiriya and Kandy to Ella, Yala and Galle — with the best months, agro and wellness experiences, stays and travel tips for each.",
  alternates: { canonical: "/destinations" },
  openGraph: {
    title: "Sri Lanka Destinations | LotusWave Lanka Tours",
  },
};

export default async function DestinationsPage() {
  const ordered = atlasOrder(await getDestinations());
  const pins: MapPin[] = ordered.map(({ destination, number }) => ({
    slug: destination.slug,
    name: destination.name,
    coordinates: destination.coordinates,
    number,
  }));

  // Only the fields the seasons table and its map card use — this crosses
  // into a client component, so the full guide content stays on the server.
  const seasonPlaces: SeasonPlace[] = ordered.map(({ destination, number }) => ({
    slug: destination.slug,
    name: destination.name,
    area: destination.area,
    number,
    months: destination.bestTime.months,
    region: destination.region,
    tagline: destination.tagline,
    image: destination.image,
    category: destination.category,
    coordinates: destination.coordinates,
    best: bestMonths(destination.bestTime.months),
  }));

  const areas = DESTINATION_AREAS.map((area) => ({
    ...area,
    entries: ordered.filter(({ destination }) => destination.area === area.key),
  }));

  return (
    <>
      <DestinationsHero pins={pins} areas={areas} />

      <Container className="pt-5">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Destinations" },
          ]}
        />
      </Container>

      {/* The hero keeps the map to wide screens; phones find it here. */}
      <section aria-labelledby="map-heading" className="pt-4 pb-8 lg:hidden">
        <Container>
          <h2 id="map-heading" className="text-center font-display text-2xl text-ink">
            Find a place on the map
          </h2>
          <IslandMap
            pins={pins}
            linked
            tone="light"
            label="Map of Sri Lanka with numbered destination pins"
            className="mx-auto mt-6 max-w-xs"
          />
          <p className="mt-3 text-center text-xs tracking-[0.16em] text-muted uppercase">
            Tap a number to open its guide
          </p>
        </Container>
      </section>

      {areas.map(({ key, title, intro, entries }) => (
        <Section
          key={key}
          id={key}
          aria-labelledby={`${key}-heading`}
          className="scroll-mt-20 py-8 sm:py-10 lg:py-12"
        >
          <Container>
            <div className="max-w-3xl">
              <h2
                id={`${key}-heading`}
                className="font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl"
              >
                {title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
                {intro}
              </p>
            </div>

            {/* One row per region: three cards in view on desktop, arrows on
                either side for the rest. */}
            <div className="mt-8 lg:mt-10">
              <JourneySlider
                label={`${title} destinations`}
                itemName="destination"
                controlClassName="lg:top-1/2 lg:-translate-y-1/2"
              >
                {entries.map(({ destination, number }) => (
                  <li
                    key={destination.slug}
                    className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                  >
                    <DestinationCard destination={destination} number={number} />
                  </li>
                ))}
              </JourneySlider>
            </div>
          </Container>
        </Section>
      ))}

      <Section
        id="seasons"
        aria-labelledby="seasons-heading"
        className="relative isolate scroll-mt-20 overflow-hidden pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-28"
      >
        {/* Decorative art, faded right back: a Sri Lankan mask bleeding off
            the left edge, the lotus-offering hand off the right. Wide screens
            only — on a phone they would sit under the table. */}
        <Image
          src="/bg/mask.png"
          alt=""
          aria-hidden="true"
          width={1024}
          height={1536}
          sizes="30vw"
          className="pointer-events-none absolute top-1/2 left-0 -z-10 hidden h-[85%] w-auto -translate-y-1/2 opacity-[0.05] select-none lg:block"
        />
        <Image
          src="/bg/side.png"
          alt=""
          aria-hidden="true"
          width={1185}
          height={1327}
          sizes="30vw"
          className="pointer-events-none absolute right-0 bottom-0 -z-10 hidden h-[80%] w-auto opacity-[0.07] select-none lg:block"
        />
        <Container>
          <div className="flex flex-col items-center text-center">
            <Eyebrow centered>When to Go</Eyebrow>
            <h2
              id="seasons-heading"
              className="mt-5 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl"
            >
              The Island&rsquo;s Seasons at a Glance
            </h2>
            <SeasonDotLegend className="mt-6 justify-center" />
          </div>

          <div className="mt-10">
            <SeasonExplorer places={seasonPlaces} />
          </div>
        </Container>

        {/* One flat wave in the CTA's green mist, so this section flows down
            into it. */}
        <WaveEdge position="bottom" flat className="-bottom-px fill-green-mist" />
      </Section>

      <DestinationInquiryCta />
    </>
  );
}
