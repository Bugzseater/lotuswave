import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Flower2,
  MapPin,
  Sprout,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { DestinationCard } from "@/components/destinations/destination-card";
import {
  atlasOrder,
  bestMonths,
  formatCoordinates,
  MONTH_RATING_LABEL,
  MONTHS,
} from "@/components/destinations/destination-category";
import { DestinationHero } from "@/components/destinations/destination-hero";
import { DestinationInquiryCta } from "@/components/destinations/destination-inquiry-cta";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  getDestinationBySlug,
  getDestinations,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import type {
  DestinationActivity,
  ImageAsset,
} from "@/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map(({ slug }) => ({ slug }));
}

// TODO: switch to buildMetadata() once src/lib/seo/metadata.ts exists.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return {};

  return {
    title: destination.seo.title,
    description: destination.seo.description,
    alternates: { canonical: `/destinations/${slug}` },
    openGraph: {
      title: destination.seo.title,
      description: destination.seo.description,
      images: [{ url: destination.image.src, alt: destination.image.alt }],
    },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();

  const {
    name,
    area,
    image,
    coordinates,
    intro,
    whyVisit,
    agro,
    wellness,
    highlights,
    tips,
  } = destination;

  const ordered = atlasOrder(await getDestinations());
  const pins = ordered.map((entry) => ({
    slug: entry.destination.slug,
    name: entry.destination.name,
    coordinates: entry.destination.coordinates,
    number: entry.number,
  }));
  // Same region first, then the rest of the island, three in all.
  const others = ordered.filter((entry) => entry.destination.slug !== slug);
  const nearby = [
    ...others.filter((entry) => entry.destination.area === area),
    ...others.filter((entry) => entry.destination.area !== area),
  ].slice(0, 3);
  const best = bestMonths(destination.bestTime.months);
  const { bestTime } = destination;
  const { sights } = destination;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `${name}, Sri Lanka`,
    description: intro,
    image: image.src,
    geo: {
      "@type": "GeoCoordinates",
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    },
    containedInPlace: { "@type": "Country", name: "Sri Lanka" },
    includesAttraction: highlights.map((highlight) => ({
      "@type": "TouristAttraction",
      name: highlight.title,
      description: highlight.text,
    })),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* ── Hero ── same vibe as the destinations and About heroes. */}
      <DestinationHero destination={destination} pins={pins} />

      {/* ── Breadcrumb ── */}
      <Container className="pt-5">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Destinations", href: "/destinations" },
            { label: name },
          ]}
        />
      </Container>

      {/* ── 01 Why visit ── heading, intro and CTA on the left; the reasons
          as a vertical trail on the right. */}
      <Section
        id="why-visit"
        aria-labelledby="why-visit-heading"
        className="scroll-mt-20 pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20"
      >
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="why-visit-heading" className="font-display text-2xl leading-tight text-balance text-ink sm:text-3xl">
              Why visit {name}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-muted">{intro}</p>
            <ButtonLink href={`/plan-your-trip?destination=${slug}`} className="mt-6">
              Plan My Journey
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </div>

          {/* The reasons as a trail: numbered stops on a dashed path. */}
          <div className="relative lg:col-span-7">
            <span
              aria-hidden="true"
              className="absolute top-4 bottom-4 left-4 border-l-2 border-dashed border-brand/25"
            />
            <ol className="relative space-y-6">
              {whyVisit.map(({ title, text }, i) => (
                <li key={title} className="grid grid-cols-[2rem_1fr] gap-4">
                  <span
                    aria-hidden="true"
                    className="relative grid size-8 place-items-center rounded-pill bg-brand font-display text-sm text-white italic ring-4 ring-white"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg leading-snug text-ink">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-pretty text-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ── Agro + Wellness ── one section, two tiles side by side. They
          share a palette; icons tell them apart (theme never changes colour).
          The Best time tile is parked for now — it will join this section
          again later. */}
      <Section
        aria-label={`Agro and wellness in ${name}`}
        className="bg-section py-12 sm:py-16 lg:py-20"
      >
        <Container className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          <ActivityTile
            id="agro"
            icon={Sprout}
            heading={`Agro experiences in ${name}`}
            items={agro}
            linkLabel="Explore agro experiences"
            image={TILE_IMAGE.agro}
          />
          <ActivityTile
            id="wellness"
            icon={Flower2}
            heading={`Wellness in ${name}`}
            items={wellness}
            linkLabel="Explore wellness experiences"
            image={TILE_IMAGE.wellness}
          />
        </Container>
      </Section>

      {/* ── Places to see + Where & when ── on white, after the lilac agro
          and wellness tiles. Left: the numbered list of places. Right: the
          destination's own photo with its coordinates and a glass panel of
          the best months as a twelve-bar strip. */}
      <Section
        aria-label={`Places to see and when to visit ${name}`}
        className="bg-white pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20"
      >
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <section id="places" aria-labelledby="places-heading" className="scroll-mt-20 lg:col-span-6">
            <h2 id="places-heading" className="font-display text-3xl leading-tight text-ink sm:text-4xl">
              Places to see in {name}
            </h2>

            {/* One column, about ten rows tall; any more scroll inside with
                the scrollbar hidden. */}
            <ol className="mt-3 max-h-[33rem] overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {sights.map((sight, i) => (
                <li
                  key={sight}
                  className="group flex items-baseline gap-4 border-b border-brand/10 py-2.5"
                >
                  <span
                    aria-hidden="true"
                    className="w-7 shrink-0 font-display text-base text-brand/60 italic tabular-nums transition-colors duration-200 ease-out group-hover:text-brand"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-ink transition-transform duration-200 ease-out group-hover:translate-x-1">
                    {sight}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section
            id="best-time"
            aria-labelledby="best-time-heading"
            // Fixed height at every width — it never stretches with the list.
            className="relative isolate flex h-[34rem] scroll-mt-20 flex-col gap-5 overflow-hidden rounded-card bg-ink p-5 text-white sm:p-6 lg:col-span-6"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="-z-20 object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/35" />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-linear-to-b from-ink/40 via-transparent to-ink/70"
            />

            {/* Top: where it is. */}
            <div className="flex justify-end">
              <p className="rounded-pill border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-white uppercase tabular-nums backdrop-blur-md">
                {formatCoordinates(destination.coordinates)}
              </p>
            </div>

            {/* Bottom: when to go — best months and the year as twelve bars. */}
            <div className="mt-auto rounded-card border border-white/25 bg-white/10 p-5 backdrop-blur-md sm:p-6">
              <h2
                id="best-time-heading"
                className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white uppercase"
              >
                <Sun aria-hidden="true" className="size-4" strokeWidth={1.75} />
                Best time to visit
              </h2>
              {best && <p className="mt-2 font-display text-2xl leading-tight sm:text-3xl">{best}</p>}

              <ol className="mt-5 grid h-12 grid-cols-12 items-end gap-1.5">
                {bestTime.months.map((rating, i) => (
                  <li key={MONTHS[i]} className="flex h-full items-end">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "w-full rounded-t-pill",
                        rating === "best" && "h-full bg-white",
                        rating === "good" && "h-1/2 bg-white/55",
                        rating === "off" && "h-1.5 bg-white/25",
                      )}
                    />
                    <span className="sr-only">
                      {MONTHS[i]}: {MONTH_RATING_LABEL[rating]}
                    </span>
                  </li>
                ))}
              </ol>
              <div aria-hidden="true" className="mt-1.5 grid grid-cols-12 gap-1.5">
                {MONTHS.map((month) => (
                  <span key={month} className="text-center text-[10px] font-semibold text-white/70">
                    {month[0]}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-pretty text-white/85">{bestTime.summary}</p>
            </div>
          </section>
        </Container>
      </Section>

      {/* ── Travel tips ── the tips on the left; a watercolour of a guide and
          travellers watching elephants on the right. The painting's left edge
          is already white, so on wide screens it sits behind the section and
          melts into the page. Phones get it as a picture under the tips. */}
      <Section
        id="tips"
        aria-labelledby="tips-heading"
        className="relative isolate scroll-mt-20 overflow-hidden pt-0 pb-12 sm:pt-0 sm:pb-16 lg:flex lg:min-h-[32rem] lg:items-center lg:pt-0 lg:pb-16"
      >
        {/* Masked at top and bottom so the painting dissolves into the white
            sections above and below instead of ending on a hard line. */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 -z-10 hidden w-[62%] opacity-25 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] lg:block"
        >
          <Image
            src={TIPS_ART.src}
            alt=""
            fill
            sizes="62vw"
            className="object-cover object-right"
          />
        </div>

        <Container className="w-full">
          <div className="lg:max-w-[42%]">
            <h2 id="tips-heading" className="font-display text-2xl leading-tight text-balance text-ink sm:text-3xl">
              Travel tips for {name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-pretty text-muted">
              Notes from our guides — the small things that make the day go well.
            </p>

            <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {tips.map((tip, i) => (
                <li
                  key={tip}
                  className="flex gap-3 rounded-card border border-line bg-white/90 p-4 backdrop-blur-sm"
                >
                  <span aria-hidden="true" className="w-5 shrink-0 font-display text-base text-brand italic">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-pretty text-ink">{tip}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mt-8 aspect-[16/9] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] lg:hidden">
            <Image
              src={TIPS_ART.src}
              alt={TIPS_ART.alt}
              fill
              sizes="100vw"
              className="object-cover object-right"
            />
          </div>
        </Container>
      </Section>

      {/* ── Keep exploring ── */}
      <Section aria-labelledby="nearby-heading" className="pt-4 pb-10 sm:pt-6 sm:pb-12 lg:pt-8 lg:pb-16">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-brand uppercase">
                <MapPin aria-hidden="true" className="size-4" />
                Keep exploring
              </p>
              <h2 id="nearby-heading" className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl">
                Pair {name} with
              </h2>
            </div>
            <ButtonLink href="/destinations" variant="secondary">
              All Sri Lanka destinations
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </div>

          <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {nearby.map((entry) => (
              <li key={entry.destination.slug}>
                <DestinationCard destination={entry.destination} number={entry.number} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <div id="plan" className="scroll-mt-20">
        <DestinationInquiryCta destination={destination} waveTop />
      </div>
    </article>
  );
}

/** Watercolour beside the travel tips. Its left side fades to white. */
const TIPS_ART: ImageAsset = {
  src: "/bg/destinations/tips-watercolor.png",
  alt: "Watercolour of a guide showing travellers a herd of elephants bathing in a river at sunrise",
};

/** The agro and wellness tile photos — the same two on every destination. */
const TILE_IMAGE: Record<"agro" | "wellness", ImageAsset> = {
  agro: {
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
    alt: "Golden farmland glowing under a low morning sun",
  },
  wellness: {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=80",
    alt: "A therapist pouring warm herbal oil for a traditional Ayurveda massage",
  },
};

/**
 * Photo tile for the agro or wellness chapter. The image fills the tile
 * under an ink veil; the label, icon and heading sit at the top in white,
 * and a white pill at the foot links to that section of the experiences page.
 */
function ActivityTile({
  id,
  icon: Icon,
  heading,
  items,
  linkLabel,
  image,
}: {
  id: "agro" | "wellness";
  icon: LucideIcon;
  heading: string;
  items: DestinationActivity[];
  linkLabel: string;
  image: ImageAsset;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="group relative isolate flex min-h-[22rem] scroll-mt-20 flex-col overflow-hidden rounded-card bg-ink p-5 text-white sm:min-h-[26rem] sm:p-7"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      {/* Even veil, deeper at the top for the heading and at the foot for
          the glass rows. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/30" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-ink/60 via-transparent to-ink/70"
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id={`${id}-heading`} className="max-w-xs font-display text-3xl leading-tight text-balance text-white sm:text-4xl">
            {heading}
          </h2>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-pill border border-white/30 bg-white/10 backdrop-blur-md">
          <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
        </span>
      </div>

      {/* Activity titles, always shown. A long list splits into two columns
          so the tile doesn't grow tall. */}
      {items.length > 0 && (
        <ul
          className={cn(
            "mt-auto grid gap-x-6 gap-y-2 pb-5",
            items.length > 3 && "sm:grid-cols-2",
          )}
        >
          {items.map(({ title }) => (
            <li key={title} className="flex items-start gap-3 text-base leading-snug text-white">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-pill bg-white" />
              {title}
            </li>
          ))}
        </ul>
      )}

      <Link
        href={`/experiences#${id}`}
        className={cn(
          // Frosted glass to match the icon disc; brightens on hover.
          "group/link inline-flex h-12 items-center gap-4 self-start rounded-pill border border-white/30 bg-white/10 pr-1.5 pl-5 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-200 ease-out hover:bg-white/20 focus-visible:outline-white",
          items.length === 0 && "mt-auto",
        )}
      >
        {linkLabel}
        <span className="grid size-9 place-items-center rounded-pill bg-white text-brand">
          <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-200 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </span>
      </Link>
    </section>
  );
}
