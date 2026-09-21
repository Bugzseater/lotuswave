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
import { getAllFeedback, getFounderIntro } from "@/lib/data";
import { cn } from "@/lib/utils";
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

type Tone = "brand" | "tint" | "outline";

/*
 * The quote grid runs as a zig-zag bento: wide, narrow / narrow, wide. Each
 * slot has its own surface so four cards never read as a row of clones.
 */
const LAYOUT: { span: string; tone: Tone }[] = [
  { span: "lg:col-span-7", tone: "brand" },
  { span: "lg:col-span-5", tone: "outline" },
  { span: "lg:col-span-5", tone: "outline" },
  { span: "lg:col-span-7", tone: "tint" },
];

const TONES: Record<
  Tone,
  { card: string; mark: string; tag: string; avatar: string; meta: string }
> = {
  brand: {
    card: "bg-brand text-white",
    mark: "text-white/10",
    tag: "bg-white/15 text-white",
    avatar: "bg-white text-brand",
    meta: "text-white/75",
  },
  tint: {
    card: "bg-section text-ink",
    mark: "text-brand/10",
    tag: "bg-white text-brand",
    avatar: "bg-brand text-white",
    meta: "text-muted",
  },
  outline: {
    card: "border border-line bg-white text-ink hover:border-brand/40",
    mark: "text-brand/10",
    tag: "bg-section text-brand",
    avatar: "bg-brand-light text-brand",
    meta: "text-muted",
  },
};

/**
 * Section 10 — trust, built honestly for a young company. Nothing here is
 * invented:
 *
 * - Founder introduction and guest / partner quotes come from `@/lib/data`
 *   and render only when real entries exist. In dev, labelled samples stand
 *   in so the layout can be judged.
 * - Until any feedback exists, a plain note says so instead of an empty grid.
 * - "Our Standards" is always shown: those are our own commitments.
 *
 * Later: video testimonials and Google / TripAdvisor reviews slot in as new
 * `Testimonial` sources once real travellers start booking.
 */
export async function Testimonials() {
  const [founder, feedback] = await Promise.all([getFounderIntro(), getAllFeedback()]);

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

        {feedback.length > 0 ? (
          <div className="mt-12 sm:mt-16">
            <h3 className="sr-only">In their own words</h3>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
              {feedback.map((item, i) => {
                const slot = LAYOUT[i % LAYOUT.length];
                return (
                  <li
                    key={`${item.name}-${item.quote.slice(0, 24)}`}
                    className={cn(slot.span, slot.tone !== "outline" && "sm:col-span-2")}
                  >
                    <QuoteCard item={item} tone={slot.tone} featured={i === 0} />
                  </li>
                );
              })}
            </ul>
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

        {/* One framed panel, cells split by hairlines rather than four
            floating boxes — reads as a single charter, not a feature grid. */}
        <div className="mt-20 overflow-hidden rounded-card border border-line sm:mt-28">
          <div className="flex flex-col gap-2 border-b border-line bg-section px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-9 sm:py-7">
            <h3 className="flex items-center gap-3 font-display text-2xl text-ink sm:text-3xl">
              <ShieldCheck aria-hidden="true" className="size-7 text-brand" strokeWidth={1.5} />
              Our Standards
            </h3>
            <p className="text-sm text-muted sm:max-w-xs sm:text-right">
              The promises we hold ourselves to, on every journey.
            </p>
          </div>
          <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {STANDARDS.map(({ title, line, icon: Icon }, i) => (
              <li
                key={title}
                className="group bg-white p-6 transition-colors duration-300 ease-out hover:bg-section sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-semibold tracking-widest text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid size-11 place-items-center rounded-pill bg-brand-light text-brand transition-colors duration-300 ease-out group-hover:bg-brand group-hover:text-white">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                  </span>
                </div>
                <h4 className="mt-8 font-display text-xl leading-tight font-semibold text-ink">
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

function QuoteCard({
  item,
  tone,
  featured,
}: {
  item: Testimonial;
  tone: Tone;
  featured: boolean;
}) {
  const t = TONES[tone];
  const initials = item.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <figure
      className={cn(
        "relative isolate flex h-full flex-col overflow-hidden rounded-card p-7 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 sm:p-9",
        t.card,
      )}
    >
      {/* Oversized serif quote mark as texture, set behind the copy. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-10 right-6 -z-10 font-display text-[12rem] leading-none select-none sm:text-[14rem]",
          t.mark,
        )}
      >
        &ldquo;
      </span>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-pill px-3 py-1 text-[11px] font-semibold tracking-[0.15em] uppercase",
            t.tag,
          )}
        >
          {item.source === "partner" ? "Partner" : "Pilot tour"}
        </span>
        {item.sample && (
          <span className="rounded-pill border border-dashed border-current px-3 py-1 text-[11px] font-semibold tracking-[0.15em] uppercase opacity-70">
            Sample
          </span>
        )}
      </div>

      <blockquote
        className={cn(
          "mt-6 font-display leading-snug text-pretty",
          featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
        )}
      >
        &ldquo;{item.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-auto flex items-center gap-3 pt-8">
        <span
          aria-hidden="true"
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-pill font-display text-sm font-semibold",
            t.avatar,
          )}
        >
          {initials}
        </span>
        <span className="text-sm leading-tight">
          <span className="block font-semibold">{item.name}</span>
          <span className={cn("mt-1 block", t.meta)}>
            {item.context}
            {item.country && ` · ${item.country}`}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
