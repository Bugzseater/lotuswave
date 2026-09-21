import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getJourneyBySlug, getJourneys } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

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

export default async function JourneyPage({ params }: Props) {
  const { slug } = await params;
  const journey = await getJourneyBySlug(slug);
  if (!journey) notFound();

  const { title, durationDays, bestFor, summary, description, highlights, startingPrice, image } =
    journey;

  return (
    <article>
      {/* Dark image hero so the transparent header's white links stay legible. */}
      <header className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-brand-dark">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-dark/70" />

        <Container className="pt-36 pb-16 sm:pb-20">
          <div className="max-w-2xl text-white">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase">
              {durationDays}-Day Journey
            </p>
            <h1 className="mt-3 font-display text-5xl leading-[1.04] font-semibold text-balance text-white sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-5 max-w-lg text-base text-pretty text-white/85 sm:text-lg">
              {summary}
            </p>
          </div>
        </Container>
      </header>

      <Section>
        <Container className="max-w-3xl">
          <dl className="grid grid-cols-1 gap-4 rounded-card bg-section p-5 sm:grid-cols-3 sm:p-6">
            <div>
              <dt className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                <Clock aria-hidden="true" className="size-3.5 text-brand" />
                Duration
              </dt>
              <dd className="mt-1 font-display text-xl font-semibold text-ink">
                {durationDays} Days
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                <Users aria-hidden="true" className="size-3.5 text-brand" />
                Best for
              </dt>
              <dd className="mt-1 text-sm leading-snug text-ink">{bestFor}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                {startingPrice === null ? "Price" : "Starting from"}
              </dt>
              <dd className="mt-1 font-display text-xl font-semibold text-ink">
                {startingPrice === null ? "Request Price" : `${formatPrice(startingPrice)} pp`}
              </dd>
            </div>
          </dl>

          <p className="mt-12 font-display text-2xl leading-snug text-pretty text-ink sm:text-3xl">
            {description}
          </p>

          <h2 className="mt-12 font-display text-3xl text-ink sm:text-4xl">Journey highlights</h2>
          <ul className="mt-6 space-y-4">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-base leading-relaxed text-ink">
                <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand" />
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <ButtonLink href="/plan-your-trip" size="lg">
              Plan This Journey
            </ButtonLink>
            <Link
              href="/#journeys"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Browse all featured journeys
            </Link>
          </div>
        </Container>
      </Section>
    </article>
  );
}
