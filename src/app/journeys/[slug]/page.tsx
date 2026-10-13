import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  BedDouble,
  Car,
  Check,
  MessageCircle,
  Plus,
  Moon,
  Plane,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { JourneyInquiryForm } from "@/components/forms/journey-inquiry-form";
import { ExperienceCarousel } from "@/components/journeys/experience-carousel";
import { JourneyHero } from "@/components/journeys/journey-hero";
import { JourneyItinerary } from "@/components/journeys/journey-itinerary";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { WaveEdge } from "@/components/ui/wave-edge";
import { COMFORT_LEVELS, EXPERIENCE_CATEGORIES, GROUP_TYPES, SITE, WHATSAPP_URL } from "@/lib/constants";
import { getExperiencesBySlugs, getJourneyBySlug, getJourneys } from "@/lib/data";
import { absoluteUrl, cn, formatPrice } from "@/lib/utils";
import type { Journey, Meal } from "@/types";

type Props = { params: Promise<{ slug: string }> };

/** Watercolour at the foot of What's included. Hidden until the file is in place. */
const INCLUDED_ART = "/bg/journeys/included-base.png";

export async function generateStaticParams() {
  const journeys = await getJourneys();
  return journeys.map(({ slug }) => ({ slug }));
}

// TODO: switch to buildMetadata() once src/lib/seo/metadata.ts exists.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const journey = await getJourneyBySlug(slug);
  if (!journey) return {};

  return {
    title: journey.seo.title,
    description: journey.seo.description,
    alternates: { canonical: `/journeys/${slug}` },
    openGraph: {
      title: journey.seo.title,
      description: journey.seo.description,
      images: [{ url: journey.image.src, alt: journey.image.alt }],
    },
  };
}

const MEAL_PLURAL: Record<Meal, string> = {
  breakfast: "Breakfasts",
  lunch: "Lunches",
  dinner: "Dinners",
};

/** Meals across the whole journey, counting each day of a multi-day run. */
function mealCounts({ itinerary }: Journey) {
  const counts: Record<Meal, number> = { breakfast: 0, lunch: 0, dinner: 0 };
  for (const day of itinerary) {
    const span = (day.toDay ?? day.day) - day.day + 1;
    for (const meal of day.meals) counts[meal] += span;
  }
  return counts;
}

export default async function JourneyPage({ params }: Props) {
  const { slug } = await params;
  const journey = await getJourneyBySlug(slug);
  if (!journey) notFound();

  const {
    title,
    description,
    highlights,
    bestFor,
    whoFor,
    groupTypes,
    comfort,
    route,
    accommodation,
    meals,
    transport,
    included,
    notIncluded,
    gallery,
    faqs,
    startingPrice,
    durationDays,
  } = journey;

  const experiences = await getExperiencesBySlugs(journey.experiences);
  const comfortLevel = COMFORT_LEVELS.find(({ key }) => key === comfort);
  const counts = mealCounts(journey);
  const hasIncludedArt = existsSync(path.join(process.cwd(), "public", INCLUDED_ART));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        name: title,
        description,
        url: absoluteUrl(`/journeys/${slug}`),
        image: absoluteUrl(journey.image.src),
        touristType: bestFor,
        itinerary: {
          "@type": "ItemList",
          itemListElement: route.map((stop, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Place",
              name: `${stop.name}, Sri Lanka`,
              geo: {
                "@type": "GeoCoordinates",
                latitude: stop.coordinates.lat,
                longitude: stop.coordinates.lng,
              },
            },
          })),
        },
        ...(startingPrice !== null && {
          offers: {
            "@type": "Offer",
            price: startingPrice,
            priceCurrency: "USD",
            description: "Per person, based on two adults sharing",
          },
        }),
        provider: { "@type": "TravelAgency", name: SITE.name, url: SITE.url },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Journeys", item: absoluteUrl("/journeys") },
          { "@type": "ListItem", position: 3, name: title, item: absoluteUrl(`/journeys/${slug}`) },
        ],
      },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <JourneyHero journey={journey} />

      {/* ── Breadcrumb ── */}
      <Container className="pt-5">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Journeys", href: "/journeys" },
            { label: title },
          ]}
        />
      </Container>

      {/* ── Overview + who it's for ── */}
      <Section id="overview" aria-label={`${title} overview`} className="scroll-mt-20 pt-10 pb-10 sm:pt-12 sm:pb-12 lg:pt-16 lg:pb-16">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <section aria-labelledby="overview-heading" className="lg:col-span-7">
            <h2 id="overview-heading" className="font-display text-3xl leading-tight text-ink sm:text-4xl">
              Journey overview
            </h2>
            <p className="mt-6 font-display text-xl leading-snug text-pretty text-ink sm:text-2xl">
              {description}
            </p>

            <h3 className="mt-10 font-display text-xl text-ink">Highlights</h3>
            <TickList items={highlights} className="mt-4" />
          </section>

          <aside aria-labelledby="who-heading" className="self-start rounded-card bg-section p-6 sm:p-8 lg:col-span-5">
            <h2 id="who-heading" className="font-display text-2xl leading-tight text-ink sm:text-3xl">
              Who this is for
            </h2>
            <p className="mt-3 font-display text-lg text-ink/80 italic">{bestFor}</p>
            <DotList items={whoFor} className="mt-5" />

            <dl className="mt-8 grid grid-cols-2 gap-5 border-t border-brand/15 pt-6">
              <div>
                <dt className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">Travelling as</dt>
                <dd className="mt-1.5 text-sm text-ink">
                  {groupTypes.map((g) => GROUP_TYPES.find(({ key }) => key === g)?.label).join(", ")}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">Comfort level</dt>
                <dd className="mt-1.5 text-sm text-ink">{comfortLevel?.label}</dd>
              </div>
            </dl>
          </aside>
        </Container>
      </Section>

      {/* ── Route map + day by day ── */}
      <JourneyItinerary journey={journey} />

      {/* ── Accommodation + experiences ── */}
      <Section id="stays" aria-label={`Stays and experiences on ${title}`} className="scroll-mt-20 pt-4 pb-12 sm:pt-6 sm:pb-14 lg:pt-6 lg:pb-16">
        <Container>
          {/* Left: the standard on a three-step comfort meter. Right: the
              nights as one strip split by stay, then a card per stay with a
              moon for each night. Stays alternate solid and soft purple so
              the strip and the cards read together. */}
          <section aria-labelledby="stays-heading" className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <h2 id="stays-heading" className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                Accommodation standard
              </h2>
              <p className="mt-5 text-base leading-relaxed text-pretty text-ink">{accommodation}</p>

              <div className="relative isolate mt-6 overflow-hidden rounded-card bg-section p-5 sm:p-6">
                <BedDouble
                  aria-hidden="true"
                  className="absolute -right-4 -bottom-6 -z-10 size-32 text-brand/[0.07]"
                  strokeWidth={1.25}
                />
                <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">Comfort level</p>
                <p className="mt-1 font-display text-3xl text-ink">{comfortLevel?.label}</p>

                <ol aria-label="Comfort scale" className="mt-4 grid grid-cols-3 gap-1.5">
                  {COMFORT_LEVELS.map((level, i) => {
                    const at = COMFORT_LEVELS.findIndex(({ key }) => key === comfort);
                    return (
                      <li key={level.key} aria-current={i === at ? "true" : undefined}>
                        <span
                          aria-hidden="true"
                          className={cn("block h-1.5 rounded-pill", i <= at ? "bg-brand" : "bg-brand/15")}
                        />
                        <span
                          className={cn(
                            "mt-2 block text-xs",
                            i === at ? "font-semibold text-brand" : "text-muted",
                          )}
                        >
                          {level.label}
                        </span>
                      </li>
                    );
                  })}
                </ol>

                <p className="mt-5 text-sm leading-relaxed text-pretty text-ink/75">{comfortLevel?.text}</p>
              </div>
            </div>

            <div className="lg:col-span-7">
              {/* The nights, start to finish, split by stay. */}
              <div aria-hidden="true">
                <div className="flex h-9 gap-1">
                  {route.map((stop, i) => (
                    <span
                      key={stop.id}
                      style={{ flexGrow: stop.nights }}
                      className={cn(
                        "grid basis-0 place-items-center rounded-pill text-xs font-semibold",
                        i % 2 === 0 ? "bg-brand text-white" : "bg-brand/25 text-brand-dark",
                      )}
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[11px] font-medium tracking-[0.12em] text-muted uppercase">
                  <span>Arrive</span>
                  <span>
                    {durationDays - 1} nights
                  </span>
                  <span>Depart</span>
                </div>
              </div>

              <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                {route.map((stop, i) => (
                  <li
                    key={stop.id}
                    className="group relative flex flex-col rounded-card border border-line bg-white p-5 transition-[box-shadow,translate] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "grid size-8 place-items-center rounded-pill font-display text-sm italic",
                          i % 2 === 0 ? "bg-brand text-white" : "bg-brand/25 text-brand-dark",
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className="flex items-center gap-0.5 text-brand" aria-label={`${stop.nights} ${stop.nights === 1 ? "night" : "nights"}`}>
                        {Array.from({ length: Math.min(stop.nights, 7) }, (_, n) => (
                          <Moon key={n} aria-hidden="true" className="size-3.5 fill-brand/15" strokeWidth={1.75} />
                        ))}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-xl leading-snug text-ink">{stop.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-pretty text-muted">{stop.stay}</p>
                    <p className="mt-auto pt-4 text-xs font-semibold tracking-[0.12em] text-ink uppercase">
                      {stop.nights} {stop.nights === 1 ? "night" : "nights"}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {experiences.length > 0 && (
            <section aria-labelledby="experiences-heading" className="mt-12 sm:mt-14">
              <h2 id="experiences-heading" className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                Experiences included
              </h2>

              <div className="mt-8">
                <ExperienceCarousel
                  experiences={experiences.map((experience) => ({
                    slug: experience.slug,
                    title: experience.title,
                    type: experience.type,
                    category: experience.category,
                    location: experience.location,
                    image: experience.image,
                    href: `/experiences/${EXPERIENCE_CATEGORIES.find(({ key }) => key === experience.category)?.slug}#${experience.slug}`,
                  }))}
                />
              </div>
            </section>
          )}
        </Container>
      </Section>

      {/* ── What's included ── one card for what's in and what's out, side
          by side; beside it, the meals as rings (days covered out of the
          whole journey) and the transport as stops on a dashed road. */}
      <Section
        id="inclusions"
        aria-labelledby="inclusions-heading"
        className={cn(
          "relative isolate scroll-mt-20 overflow-hidden pt-0 sm:pt-0 lg:pt-0",
          hasIncludedArt ? "pb-40 sm:pb-52 lg:pb-60" : "pb-24 sm:pb-28 lg:pb-36",
        )}
      >
        {/* Watercolour base faded in along the bottom, closed by a white
            wave into the gallery below. */}
        {hasIncludedArt && (
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-72 sm:h-96 lg:h-[30rem]">
            <Image src={INCLUDED_ART} alt="" fill sizes="100vw" className="object-cover object-bottom opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-transparent" />
          </div>
        )}
        <WaveEdge position="bottom" flat className="-bottom-px fill-white" />

        <Container>
          <h2 id="inclusions-heading" className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            What&rsquo;s included
          </h2>

          <div className="mt-8 grid gap-5 lg:grid-cols-12 lg:gap-6">
            <div className="grid overflow-hidden rounded-card border border-line sm:grid-cols-2 lg:col-span-7">
              <section aria-labelledby="included-heading" className="relative isolate bg-section p-6 sm:p-7">
                <Check
                  aria-hidden="true"
                  className="absolute -right-6 -bottom-6 -z-10 size-40 text-brand/[0.06]"
                  strokeWidth={1.5}
                />
                <h3 id="included-heading" className="flex items-center gap-3 font-display text-xl text-ink">
                  <span className="grid size-9 shrink-0 place-items-center rounded-pill bg-brand text-white">
                    <Check aria-hidden="true" className="size-4" strokeWidth={2.25} />
                  </span>
                  What is included
                </h3>
                <ul className="mt-6 space-y-3">
                  {included.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-pill bg-brand text-white"
                      >
                        <Check className="size-3" strokeWidth={2.5} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="not-included-heading" className="relative isolate bg-white p-6 sm:p-7">
                <X
                  aria-hidden="true"
                  className="absolute -right-6 -bottom-6 -z-10 size-40 text-ink/[0.03]"
                  strokeWidth={1.5}
                />
                <h3 id="not-included-heading" className="flex items-center gap-3 font-display text-xl text-ink">
                  <span className="grid size-9 shrink-0 place-items-center rounded-pill border border-line text-muted">
                    <X aria-hidden="true" className="size-4" strokeWidth={2.25} />
                  </span>
                  What is not included
                </h3>
                <ul className="mt-6 space-y-3">
                  {notIncluded.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-pill border border-line text-muted"
                      >
                        <X className="size-3" strokeWidth={2.5} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="grid content-start gap-5 lg:col-span-5 lg:gap-6">
              <section aria-labelledby="meals-heading" className="rounded-card border border-line p-6 sm:p-7">
                <h3 id="meals-heading" className="flex items-center gap-3 font-display text-xl text-ink">
                  <span className="grid size-9 shrink-0 place-items-center rounded-pill bg-brand-light text-brand">
                    <UtensilsCrossed aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  </span>
                  Meals included
                </h3>
                {/* Each ring fills by the share of the journey's days that
                    include that meal. */}
                <dl className="mt-6 grid grid-cols-3 gap-3">
                  {(Object.keys(counts) as Meal[]).map((meal) => (
                    <div key={meal} className="flex flex-col-reverse items-center text-center">
                      <dt className="mt-2 text-xs font-medium text-muted">{MEAL_PLURAL[meal]}</dt>
                      <dd className="relative grid size-20 place-items-center">
                        <svg aria-hidden="true" viewBox="0 0 64 64" className="absolute inset-0 -rotate-90">
                          <circle cx="32" cy="32" r="28" fill="none" strokeWidth="5" className="stroke-brand/10" />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            strokeWidth="5"
                            strokeLinecap="round"
                            pathLength={100}
                            strokeDasharray={`${Math.round((counts[meal] / durationDays) * 100)} 100`}
                            className="stroke-brand"
                          />
                        </svg>
                        <span className="font-display text-2xl text-ink">{counts[meal]}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-pretty text-muted">{meals}</p>
              </section>

              <section
                aria-labelledby="transport-heading"
                className="relative isolate overflow-hidden rounded-card bg-section p-6 sm:p-7"
              >
                <Car
                  aria-hidden="true"
                  className="absolute -right-5 -bottom-5 -z-10 size-36 text-brand/[0.07]"
                  strokeWidth={1.25}
                />
                <h3 id="transport-heading" className="flex items-center gap-3 font-display text-xl text-ink">
                  <span className="grid size-9 shrink-0 place-items-center rounded-pill bg-white text-brand">
                    <Car aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  </span>
                  Transport details
                </h3>
                {/* The items as stops on a dashed road. */}
                <ul className="relative mt-6 space-y-4 before:absolute before:top-2 before:bottom-2 before:left-[0.3125rem] before:border-l-2 before:border-dashed before:border-brand/25 before:content-['']">
                  {transport.map((item) => (
                    <li key={item} className="relative flex gap-4 text-sm leading-relaxed text-ink">
                      <span
                        aria-hidden="true"
                        className="relative mt-1.5 size-3 shrink-0 rounded-pill border-2 border-brand bg-white"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Photo gallery ── an expanding strip. On wide screens the photos
          sit side by side as tall panels; the one under the pointer widens
          to take most of the row and shows its caption, and the first is
          open while nothing is hovered. Phones and tablets swipe a row of
          panels instead. CSS only. */}
      <Section
        id="gallery"
        aria-labelledby="gallery-heading"
        className="scroll-mt-20 pt-6 pb-0 sm:pt-8 sm:pb-0 lg:pt-10 lg:pb-0"
      >
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 id="gallery-heading" className="font-display text-3xl leading-tight text-ink sm:text-4xl">
              Photo gallery
            </h2>
            <p className="hidden text-xs font-semibold tracking-[0.14em] text-muted uppercase lg:block">
              Hover to explore
            </p>
            <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase lg:hidden">
              Swipe to explore
            </p>
          </div>

          <ul className="-mx-4 mt-8 flex h-80 snap-x snap-mandatory gap-3 overflow-x-auto px-4 [scrollbar-width:none] sm:h-96 lg:mx-0 lg:h-[28rem] lg:overflow-visible lg:px-0 lg:[&:not(:hover)>li:first-child]:grow-[4] [&::-webkit-scrollbar]:hidden">
            {gallery.map((photo, i) => (
              <li
                key={photo.src}
                className="group/photo relative w-[80%] shrink-0 snap-center overflow-hidden rounded-card bg-brand-light sm:w-[45%] lg:w-auto lg:min-w-0 lg:shrink lg:grow lg:basis-0 lg:transition-[flex-grow] lg:duration-500 lg:ease-out lg:hover:grow-[4]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, (min-width: 640px) 45vw, 80vw"
                  className="object-cover transition-transform duration-500 ease-out lg:group-hover/photo:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 via-45% to-transparent"
                />

                <span
                  aria-hidden="true"
                  className="absolute top-4 left-4 rounded-pill border border-white/25 bg-white/15 px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-white tabular-nums backdrop-blur-md"
                >
                  {String(i + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
                </span>

                {/* Caption: always on phones; on wide screens only on the
                    open panel. */}
                <p
                  aria-hidden="true"
                  className="absolute inset-x-5 bottom-5 line-clamp-2 max-w-md text-sm leading-snug text-white transition-opacity duration-300 ease-out lg:opacity-0 lg:group-hover/photo:opacity-100 lg:[ul:not(:hover)>li:first-child>&]:opacity-100"
                >
                  {photo.alt}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── FAQs ── left, a sticky intro with a giant question mark and a
          route to a person; right, each question as a numbered card that
          opens in place. Native <details>, so no JavaScript; where the
          browser supports it, the answer slides open rather than jumping. */}
      <Section
        id="faqs"
        aria-labelledby="faqs-heading"
        className="scroll-mt-20 pt-12 pb-8 sm:pt-14 sm:pb-10 lg:pt-16 lg:pb-12"
      >
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="relative isolate lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -left-2 -z-10 font-display text-[10rem] leading-none font-semibold text-brand/[0.07] select-none"
            >
              ?
            </span>
            <h2 id="faqs-heading" className="font-display text-3xl leading-tight text-balance text-ink sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-pretty text-muted sm:text-base">
              The things guests ask most about {title}. Something else on your mind?
            </p>
            <ButtonLink
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hello! I have a question about the ${title} journey.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="mt-6"
            >
              <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />
              Ask a travel designer
            </ButtonLink>
          </div>

          <ol className="space-y-3 lg:col-span-8">
            {faqs.map(({ question, answer }, i) => (
              <li key={question}>
                <details
                  open={i === 0}
                  className="group rounded-card border border-line bg-white transition-colors duration-300 ease-out [interpolate-size:allow-keywords] open:border-brand/25 open:bg-section [&::details-content]:h-0 [&::details-content]:overflow-hidden [&::details-content]:transition-[height,content-visibility] [&::details-content]:transition-discrete [&::details-content]:duration-300 [&::details-content]:ease-out open:[&::details-content]:h-auto"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                    <span
                      aria-hidden="true"
                      className="w-7 shrink-0 font-display text-base text-brand/60 italic tabular-nums transition-colors duration-300 group-open:text-brand"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-base font-medium text-ink transition-colors duration-200 group-hover:text-brand">
                      {question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="grid size-9 shrink-0 place-items-center rounded-pill border border-brand/30 text-brand transition-[background-color,color,rotate] duration-300 ease-out group-open:rotate-45 group-open:border-brand group-open:bg-brand group-open:text-white"
                    >
                      <Plus className="size-4" strokeWidth={2} />
                    </span>
                  </summary>
                  <p className="px-5 pb-5 pl-16 text-sm leading-relaxed text-pretty text-ink/75 sm:px-6 sm:pb-6 sm:pl-[4.25rem] sm:text-base">
                    {answer}
                  </p>
                </details>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── Booking / enquiry ── drawn as a boarding pass. The stub, on a
          journey's photo with black fades only, carries the route, length and price; a
          perforated tear line with notches cut from the page separates it
          from the form. Stacked on phones, the tear line runs across. */}
      <Section
        id="book"
        aria-labelledby="book-heading"
        className="mb-32 scroll-mt-20 pt-0 pb-0 sm:mb-36 sm:pt-0 sm:pb-0 lg:mb-48 lg:pt-0 lg:pb-0"
      >
        <Container>
          <div className="grid overflow-hidden rounded-card shadow-card ring-1 ring-line lg:grid-cols-12">
            {/* Stub. */}
            <div className="relative isolate flex min-h-[22rem] flex-col justify-between gap-10 overflow-hidden bg-ink p-6 text-white sm:p-8 lg:col-span-5 lg:p-10">
              {/* The journey's photo in its own colours — only black fades,
                  at the top for the heading and the foot for the details. */}
              <Image
                src={journey.image.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="-z-20 object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/10 via-45% to-ink/85"
              />

              <h2 id="book-heading" className="font-display text-3xl leading-[1.1] text-balance text-white sm:text-4xl">
                Enquire about {title}
              </h2>

              <div>
              {/* Route: first stop → last stop. */}
              <div className="flex items-center gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-white/70 uppercase">From</p>
                  <p className="mt-1 truncate font-display text-xl text-white">{route[0].name}</p>
                </div>
                <div aria-hidden="true" className="flex flex-1 items-center gap-2 text-white/70">
                  <span className="h-px flex-1 border-t border-dashed border-white/40" />
                  <Plane className="size-4 shrink-0" strokeWidth={1.75} />
                  <span className="h-px flex-1 border-t border-dashed border-white/40" />
                </div>
                <div className="min-w-0 text-right">
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-white/70 uppercase">To</p>
                  <p className="mt-1 truncate font-display text-xl text-white">{route.at(-1)?.name}</p>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/25 pt-5">
                <div>
                  <dt className="text-[10px] font-semibold tracking-[0.16em] text-white/70 uppercase">Duration</dt>
                  <dd className="mt-1 text-sm text-white">
                    {durationDays} days / {durationDays - 1} nights
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold tracking-[0.16em] text-white/70 uppercase">
                    {startingPrice === null ? "Price" : "From"}
                  </dt>
                  <dd className="mt-1 text-sm text-white">
                    {startingPrice === null ? (
                      "Request Price"
                    ) : (
                      <>
                        <span className="font-display text-lg">{formatPrice(startingPrice)}</span> pp
                      </>
                    )}
                  </dd>
                </div>
              </dl>
              </div>

            </div>

            {/* Form, behind the tear line. */}
            <div className="relative bg-white p-6 sm:p-8 lg:col-span-7 lg:p-10">
              {/* Perforation and the two notches — across the top on phones,
                  down the left edge on wide screens. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-6 top-0 border-t-2 border-dashed border-line lg:inset-x-auto lg:inset-y-6 lg:left-0 lg:border-t-0 lg:border-l-2"
              />
              <span aria-hidden="true" className="absolute top-0 -left-3 size-6 -translate-y-1/2 rounded-pill bg-white lg:-top-3 lg:left-0 lg:-translate-x-1/2 lg:translate-y-0" />
              <span aria-hidden="true" className="absolute top-0 -right-3 size-6 -translate-y-1/2 rounded-pill bg-white lg:top-auto lg:-bottom-3 lg:left-0 lg:right-auto lg:-translate-x-1/2 lg:translate-y-0" />

              <JourneyInquiryForm journey={{ slug, title }} />
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}

function TickList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink sm:text-base">
          <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function DotList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink sm:text-base">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-pill bg-brand" />
          {item}
        </li>
      ))}
    </ul>
  );
}
