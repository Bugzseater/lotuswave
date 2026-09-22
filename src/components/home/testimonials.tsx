import Image from "next/image";
import {
  BadgeCheck,
  FileCheck2,
  MessageSquareQuote,
  Quote,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { QuoteSlider } from "@/components/home/quote-slider";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Section } from "@/components/ui/section";
import { getAllFeedback, getFounderIntro } from "@/lib/data";
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
 * - Founder introduction and guest / partner quotes come from `@/lib/data`
 *   and render only when real entries exist. In dev, labelled samples stand
 *   in so the layout can be judged.
 * - Until any feedback exists, a plain note says so instead of an empty track.
 * - "Our Standards" is always shown: those are our own commitments.
 *
 * The layout follows the shape a travel site earns trust with: a split header,
 * a quiet carousel of quotes in one card size, then an open credentials strip
 * along the foot. White throughout — the tinted Responsible Travel sits above
 * it and the sand Founder Story below, so this one stays the clear page.
 *
 * Later: video testimonials and Google / TripAdvisor reviews slot in as new
 * `Testimonial` sources once real travellers start booking.
 */
export async function Testimonials() {
  const [founder, feedback] = await Promise.all([getFounderIntro(), getAllFeedback()]);

  return (
    <Section id="testimonials" aria-labelledby="testimonials-heading">
      <Container>
        <ScrollReveal>
          {/* Split header: the claim on the left, the reason for it on the
              right, sharing a baseline rather than stacked and centred. */}
          <div className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16 lg:pb-14">
            <div>
              <p
                data-reveal
                className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-brand uppercase"
              >
                <span aria-hidden="true" className="h-px w-10 bg-brand" />
                Testimonials &amp; Standards
              </p>
              <h2
                id="testimonials-heading"
                data-reveal
                className="mt-5 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
              >
                Trust, <em className="block font-medium text-brand">Earned Honestly.</em>
              </h2>
            </div>
            <p
              data-reveal
              className="max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg"
            >
              We&rsquo;re a young company, so we&rsquo;d rather show you how we
              work than borrow words that aren&rsquo;t ours. Below are the
              words guests and partners gave us, and the standards we hold
              ourselves to.
            </p>
          </div>

          {founder && (
            <figure className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-[20rem_1fr] lg:items-center lg:gap-16">
              <div
                data-reveal-image="40"
                className="relative aspect-[4/5] w-48 overflow-hidden rounded-card bg-section sm:w-60 lg:w-full"
              >
                <Image
                  src={founder.photo.src}
                  alt={founder.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 20rem, 15rem"
                  className="object-cover"
                />
              </div>
              <div className="lg:border-l lg:border-line lg:pl-16">
                <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
                  A Word From Our Founder
                </p>
                <blockquote className="mt-5 font-display text-2xl leading-snug text-pretty text-ink sm:text-3xl lg:text-4xl">
                  {founder.message}
                </blockquote>
                <figcaption className="mt-6 text-sm text-ink">
                  <span className="font-semibold">{founder.name}</span>
                  <span className="text-muted"> — {founder.role}</span>
                </figcaption>
              </div>
            </figure>
          )}

          {feedback.length > 0 ? (
            <div className="mt-12 sm:mt-16">
              <h3 className="sr-only">In their own words</h3>
              <QuoteSlider label="Guest and partner feedback">
                {feedback.map((item) => (
                  <li
                    key={`${item.name}-${item.quote.slice(0, 24)}`}
                    data-reveal-card
                    // One card width everywhere: most of the screen on phones
                    // so the next card peeks in, then two, then three across.
                    className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                  >
                    <QuoteCard item={item} />
                  </li>
                ))}
              </QuoteSlider>
            </div>
          ) : (
            <p className="mt-12 flex max-w-2xl items-start gap-4 border-l-2 border-brand pl-6 text-base leading-relaxed text-pretty text-muted sm:mt-16">
              <Quote aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand" strokeWidth={1.5} />
              <span>
                Our first pilot tours are under way. Feedback from those guests
                and from our farm and wellness partners will appear here in
                their own words, with their permission.
              </span>
            </p>
          )}
        </ScrollReveal>

        {/* The standards run as an open credentials strip — hairline-divided
            columns, no boxes — so they read as one charter under the quotes. */}
        <ScrollReveal className="mt-20 border-t border-line pt-12 sm:mt-28 sm:pt-16">
          <p
            data-reveal
            className="text-center text-xs font-semibold tracking-[0.2em] text-brand uppercase"
          >
            Our Standards
          </p>
          <h3
            data-reveal
            className="mx-auto mt-4 max-w-2xl text-center font-display text-2xl leading-snug text-balance text-ink sm:text-3xl"
          >
            The promises we hold ourselves to, on every journey.
          </h3>

          <ul className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-x-12 lg:mt-16 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line">
            {STANDARDS.map(({ title, line, icon: Icon }) => (
              <li
                key={title}
                data-reveal-step
                className="group text-center lg:px-8 lg:first:pl-0 lg:last:pr-0"
              >
                <span className="mx-auto grid size-14 place-items-center rounded-pill bg-section text-brand transition-colors duration-300 ease-out group-hover:bg-brand group-hover:text-white">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
                </span>
                <h4 className="mt-6 font-display text-xl leading-tight font-medium text-ink">
                  {title}
                </h4>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-pretty text-muted">
                  {line}
                </p>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

/**
 * One quote, one card size. Uniform cards keep the carousel calm and let the
 * words do the work; the brand hairline only shows up on hover.
 */
function QuoteCard({ item }: { item: Testimonial }) {
  const initials = item.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <figure className="flex h-full flex-col rounded-card border border-line bg-white p-7 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 sm:p-9">
      <span
        aria-hidden="true"
        className="grid size-12 place-items-center rounded-pill bg-section text-brand"
      >
        <Quote className="size-5" strokeWidth={1.5} />
      </span>

      <blockquote className="mt-7 font-display text-xl leading-snug text-pretty text-ink sm:text-2xl">
        &ldquo;{item.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-auto flex items-center gap-4 border-t border-line pt-6 text-sm">
        <span
          aria-hidden="true"
          className="grid size-11 shrink-0 place-items-center rounded-pill bg-brand font-display text-sm font-semibold text-white"
        >
          {initials}
        </span>
        <span className="leading-tight">
          <span className="block font-semibold text-ink">{item.name}</span>
          <span className="mt-1 block text-muted">
            {item.context}
            {item.country && ` · ${item.country}`}
          </span>
        </span>
        <span className="ml-auto shrink-0 text-right text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          {item.source === "partner" ? "Partner" : "Pilot tour"}
          {item.sample && <span className="mt-1 block text-muted">Sample</span>}
        </span>
      </figcaption>
    </figure>
  );
}
