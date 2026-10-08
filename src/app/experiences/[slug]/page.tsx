import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Backpack,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  HeartHandshake,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Users,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/about/eyebrow";
import { ExperienceIcon } from "@/components/experiences/experience-icon";
import { ExperienceInquiryCta } from "@/components/experiences/experience-inquiry-cta";
import { JourneyCard } from "@/components/journeys/journey-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { EXPERIENCE_CATEGORIES, WHATSAPP_URL } from "@/lib/constants";
import { getExperienceBySlug, getExperiences, getJourneysBySlugs } from "@/lib/data";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const experiences = await getExperiences();
  return experiences.map(({ slug }) => ({ slug }));
}

// TODO: switch to buildMetadata() once src/lib/seo/metadata.ts exists.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) return {};

  return {
    title: experience.seo.title,
    description: experience.seo.description,
    alternates: { canonical: `/experiences/${slug}` },
    openGraph: {
      title: experience.seo.title,
      description: experience.seo.description,
      images: [{ url: experience.image.src, alt: experience.image.alt }],
    },
  };
}

export default async function ExperiencePage({ params }: Props) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) notFound();

  const {
    title,
    category,
    type,
    promise,
    overview,
    activities,
    included,
    duration,
    location,
    bestSeason,
    suitableFor,
    groupSize,
    whatToBring,
    safety,
    impact,
    image,
    heroVideo,
    gallery,
  } = experience;

  const categoryInfo = EXPERIENCE_CATEGORIES.find(({ key }) => key === category);
  const relatedJourneys = await getJourneysBySlugs(experience.relatedJourneys);

  const facts: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Clock, label: "Duration", value: duration },
    { icon: MapPin, label: "Location", value: location },
    { icon: CalendarDays, label: "Best season", value: bestSeason },
    { icon: UserRound, label: "Suitable for", value: suitableFor },
    { icon: Users, label: "Group size", value: groupSize },
  ];

  const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(
    `Hello! I'd like to ask about the ${title} experience.`,
  )}`;

  return (
    <article>
      {/* Dark image hero so the transparent header's white links stay legible.
          The still is always there — it is the poster, and the whole hero
          when motion is reduced, since the video is hidden then. */}
      <header className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-brand-dark">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        {heroVideo && (
          <video
            aria-hidden="true"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 -z-20 size-full object-cover motion-reduce:hidden"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-dark/70" />

        <Container className="pt-36 pb-16 sm:pb-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/80">
              <li>
                <Link href="/experiences" className="hover:text-white hover:underline focus-visible:outline-white">
                  Experiences
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight aria-hidden="true" className="size-4" />
                <Link
                  href={`/experiences#${category}`}
                  className="hover:text-white hover:underline focus-visible:outline-white"
                >
                  {categoryInfo?.title}
                </Link>
              </li>
              <li aria-current="page" className="flex items-center gap-1.5 text-white">
                <ChevronRight aria-hidden="true" className="size-4" />
                {title}
              </li>
            </ol>
          </nav>

          <div className="mt-8 max-w-3xl text-white">
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase">
              <ExperienceIcon icon={category} className="size-5" />
              {type}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.04] font-semibold text-balance text-white sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-pretty text-white/90 sm:text-xl">{promise}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="#inquire"
                size="lg"
                className="w-full bg-white text-brand hover:bg-brand-light focus-visible:outline-white sm:w-auto"
              >
                Plan This Experience
              </ButtonLink>
              <ButtonLink
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="onBrand"
                size="lg"
                className="w-full sm:w-auto"
              >
                <MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.75} />
                WhatsApp Us
              </ButtonLink>
            </div>
          </div>
        </Container>
      </header>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          {/* Facts first in the source so phones see them straight after the
              hero; on wide screens they move to a sticky sidebar. */}
          <aside aria-labelledby="facts-heading" className="lg:col-start-2 lg:row-start-1">
            <div className="rounded-card bg-section p-6 sm:p-8 lg:sticky lg:top-28">
              <h2 id="facts-heading" className="font-display text-2xl text-ink">
                At a glance
              </h2>
              <dl className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" strokeWidth={1.5} />
                    <div>
                      <dt className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                        {label}
                      </dt>
                      <dd className="mt-1 text-sm leading-snug text-ink">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <ButtonLink href="#inquire" size="lg" className="mt-8 w-full">
                Plan This Experience
              </ButtonLink>
            </div>
          </aside>

          <div className="space-y-16 lg:col-start-1 lg:row-start-1">
            <section aria-labelledby="overview-heading">
              <h2 id="overview-heading" className="font-display text-3xl text-ink sm:text-4xl">
                Experience overview
              </h2>
              <div className="mt-6 space-y-5">
                {overview.map((paragraph, i) => (
                  <p
                    key={paragraph}
                    className={cn(
                      "text-pretty text-ink",
                      i === 0
                        ? "font-display text-2xl leading-snug sm:text-3xl"
                        : "text-base leading-relaxed sm:text-lg",
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section aria-labelledby="activities-heading">
              <h2 id="activities-heading" className="font-display text-3xl text-ink sm:text-4xl">
                What you will do
              </h2>
              <ol className="mt-8 space-y-6">
                {activities.map((activity, i) => (
                  <li key={activity} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="grid size-9 shrink-0 place-items-center rounded-pill border border-brand font-display text-sm font-semibold text-brand"
                    >
                      {i + 1}
                    </span>
                    <span className="pt-1.5 text-base leading-relaxed text-ink">{activity}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="included-heading">
              <h2 id="included-heading" className="font-display text-3xl text-ink sm:text-4xl">
                What is included
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {included.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed text-ink">
                    <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <div className="grid gap-10 border-t border-line pt-12 sm:grid-cols-2">
              <NoteList id="bring" icon={Backpack} heading="What to bring" items={whatToBring} />
              <NoteList
                id="safety"
                icon={ShieldCheck}
                heading="Safety & accessibility"
                items={safety}
              />
            </div>

            <section aria-labelledby="impact-heading" className="rounded-card border border-line p-6 sm:p-8">
              <HeartHandshake aria-hidden="true" className="size-7 text-brand" strokeWidth={1.5} />
              <h2 id="impact-heading" className="mt-4 font-display text-2xl text-ink sm:text-3xl">
                Responsible-travel impact
              </h2>
              <ul className="mt-5 space-y-3">
                {impact.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed text-ink">
                    <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted">
                Read how we work in our{" "}
                <Link
                  href="/responsible-travel-policy"
                  className="font-medium text-brand underline underline-offset-4 hover:text-brand-dark"
                >
                  responsible travel policy
                </Link>
                .
              </p>
            </section>
          </div>
        </Container>
      </Section>

      {gallery.length > 0 && (
        <Section aria-labelledby="gallery-heading" className="bg-section">
          <Container>
            <h2 id="gallery-heading" className="font-display text-3xl text-ink sm:text-4xl">
              Moments from the day
            </h2>
            <ul className="mt-10 grid auto-rows-[14rem] gap-4 sm:grid-cols-2 sm:auto-rows-[16rem] lg:grid-cols-3 lg:auto-rows-[18rem]">
              {gallery.map((photo, i) => (
                <li
                  key={`${photo.src}-${i}`}
                  className={cn(
                    "relative overflow-hidden rounded-card bg-brand-light",
                    i === 0 && "sm:col-span-2 lg:row-span-2",
                  )}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {relatedJourneys.length > 0 && (
        <Section aria-labelledby="related-heading">
          <Container>
            <Eyebrow>Related Journeys</Eyebrow>
            <h2 id="related-heading" className="mt-5 font-display text-3xl text-balance text-ink sm:text-4xl">
              Journeys that include this experience
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedJourneys.map((journey) => (
                <li key={journey.slug}>
                  <JourneyCard {...journey} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <div id="inquire" className="scroll-mt-20">
        <ExperienceInquiryCta experience={experience} />
      </div>
    </article>
  );
}

function NoteList({
  id,
  icon: Icon,
  heading,
  items,
}: {
  id: string;
  icon: LucideIcon;
  heading: string;
  items: string[];
}) {
  return (
    <section aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="flex items-center gap-3 font-display text-2xl text-ink">
        <Icon aria-hidden="true" className="size-6 text-brand" strokeWidth={1.5} />
        {heading}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-relaxed text-ink">
            <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-pill bg-brand" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
