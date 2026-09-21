import Image from "next/image";
import {
  BadgeCheck,
  FileCheck2,
  MessageSquareQuote,
  Quote,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getFounderIntro, getPartnerEndorsements, getPilotFeedback } from "@/lib/data";
import type { Testimonial } from "@/types";

type Standard = {
  title: string;
  line: string;
  icon: LucideIcon;
};

/** Promises about how we work — ours to make, so safe to publish from day one. */
const STANDARDS: Standard[] = [
  {
    title: "Real feedback only",
    line: "Every quote on this site comes from a real guest or partner, shared with their permission.",
    icon: MessageSquareQuote,
  },
  {
    title: "Honest descriptions",
    line: "We describe experiences as they are — no exaggerated claims, no promises we can't keep.",
    icon: FileCheck2,
  },
  {
    title: "Qualified, visited partners",
    line: "Every farm, retreat and provider is visited by our team before a guest ever arrives.",
    icon: BadgeCheck,
  },
  {
    title: "Fair and clear",
    line: "Clear pricing for you, fair payment for the people who host you.",
    icon: Scale,
  },
];

/**
 * Section 10 — trust, built honestly for a young company. Nothing here is
 * invented:
 *
 * - Founder introduction, pilot-tour feedback and partner endorsements come
 *   from `@/lib/data` and render only when real entries exist.
 * - Until any feedback exists, a plain note says so instead of an empty grid.
 * - "Our Standards" is always shown: those are our own commitments.
 *
 * Later: video testimonials and Google / TripAdvisor reviews slot in as new
 * `Testimonial` sources once real travellers start booking.
 */
export async function Testimonials() {
  const [founder, pilot, partners] = await Promise.all([
    getFounderIntro(),
    getPilotFeedback(),
    getPartnerEndorsements(),
  ]);
  const hasFeedback = pilot.length > 0 || partners.length > 0;

  return (
    <Section id="testimonials" aria-labelledby="testimonials-heading">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            Testimonials &amp; Standards
          </p>
          <h2
            id="testimonials-heading"
            className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
          >
            Trust, <em className="font-medium text-brand">Earned Honestly.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
            We&rsquo;re a young company, so we&rsquo;d rather show you how we
            work than borrow words that aren&rsquo;t ours.
          </p>
        </div>

        {founder && (
          <figure className="mt-12 grid items-center gap-8 rounded-card bg-section p-6 sm:mt-16 sm:p-10 lg:grid-cols-[16rem_1fr] lg:gap-12">
            <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-pill bg-white sm:w-48 lg:w-full">
              <Image
                src={founder.photo.src}
                alt={founder.photo.alt}
                fill
                sizes="(min-width: 1024px) 16rem, 12rem"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
                A Word From Our Founder
              </p>
              <blockquote className="mt-4 font-display text-2xl leading-snug text-pretty text-ink sm:text-3xl">
                {founder.message}
              </blockquote>
              <figcaption className="mt-5 text-sm text-ink">
                <span className="font-semibold">{founder.name}</span>
                <span className="text-muted"> — {founder.role}</span>
              </figcaption>
            </div>
          </figure>
        )}

        {hasFeedback ? (
          <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-2">
            {pilot.length > 0 && <QuoteGroup title="From Our Pilot Tours" items={pilot} />}
            {partners.length > 0 && <QuoteGroup title="From Our Partners" items={partners} />}
          </div>
        ) : (
          <p className="mx-auto mt-12 flex max-w-2xl items-start gap-3 rounded-card border border-dashed border-brand/30 p-5 text-sm leading-relaxed text-ink sm:mt-16 sm:p-6">
            <Quote aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" strokeWidth={1.5} />
            <span>
              Our first pilot tours are under way. Feedback from those guests
              and from our farm and wellness partners will appear here in
              their own words, with their permission.
            </span>
          </p>
        )}

        <div className="mt-16 sm:mt-20">
          <h3 className="flex items-center justify-center gap-2 text-center font-display text-3xl text-ink sm:text-4xl">
            <ShieldCheck aria-hidden="true" className="size-7 text-brand" strokeWidth={1.5} />
            Our Standards
          </h3>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {STANDARDS.map(({ title, line, icon: Icon }) => (
              <li key={title} className="rounded-card bg-section p-6">
                <Icon aria-hidden="true" className="size-6 text-brand" strokeWidth={1.5} />
                <h4 className="mt-4 font-display text-xl leading-tight font-semibold text-ink">
                  {title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{line}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

function QuoteGroup({ title, items }: { title: string; items: Testimonial[] }) {
  return (
    <div>
      <h3 className="font-display text-2xl text-ink sm:text-3xl">{title}</h3>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={`${item.name}-${item.quote.slice(0, 24)}`}>
            <figure className="rounded-card border border-line p-6">
              <Quote aria-hidden="true" className="size-6 text-brand" strokeWidth={1.5} />
              <blockquote className="mt-3 text-base leading-relaxed text-ink">
                {item.quote}
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-ink">{item.name}</span>
                <span className="text-muted">
                  {" "}
                  — {item.context}
                  {item.country && `, ${item.country}`}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
