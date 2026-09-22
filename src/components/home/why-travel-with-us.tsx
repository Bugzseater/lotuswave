import {
  CarFront,
  Handshake,
  Headset,
  MapPin,
  Receipt,
  Route,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Section } from "@/components/ui/section";

type TrustPoint = {
  title: string;
  line: string;
  icon: LucideIcon;
};

const POINTS: TrustPoint[] = [
  {
    title: "Local Sri Lankan expertise",
    line: "We live here, and we know the island well beyond the guidebooks.",
    icon: MapPin,
  },
  {
    title: "Personally designed itineraries",
    line: "Every journey is built around your interests, pace and budget.",
    icon: Route,
  },
  {
    title: "Carefully selected partners",
    line: "Farms, retreats and stays we have visited and trust ourselves.",
    icon: Handshake,
  },
  {
    title: "Licensed guides and trusted transport",
    line: "Licensed, experienced guides and reliable, well-kept vehicles.",
    icon: CarFront,
  },
  {
    title: "24/7 in-country assistance",
    line: "Someone from our team is a call or message away, day and night.",
    icon: Headset,
  },
  {
    title: "Responsible local tourism",
    line: "Your journey supports farming families, local hosts and the places you visit.",
    icon: Sprout,
  },
  {
    title: "Transparent pricing",
    line: "Clear quotes that show what is included — no hidden extras.",
    icon: Receipt,
  },
  {
    title: "Authentic small-group experiences",
    line: "Private and small-group travel, never the crowded coach tour.",
    icon: Users,
  },
];

/**
 * Section 08 — the reasons to book with us. Back on white after the purple
 * How It Works. The heading holds the left column (sticky on desktop) while
 * the eight trust points run down the right as a two-column ledger of
 * numbered, hairline-ruled entries.
 */
export function WhyTravelWithUs() {
  return (
    <Section id="why-us" aria-labelledby="why-us-heading">
      <Container>
        <ScrollReveal disabled className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16 xl:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p
              data-reveal
              className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-brand uppercase"
            >
              <span aria-hidden="true" className="h-px w-10 bg-brand" />
              Why LotusWave
            </p>
            <h2
              id="why-us-heading"
              data-reveal
              className="mt-5 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
            >
              Why Travel{" "}
              <em className="block font-medium text-brand">With Us?</em>
            </h2>
            <p
              data-reveal
              className="mt-6 max-w-md text-base leading-relaxed text-pretty text-muted sm:text-lg"
            >
              A small Sri Lankan team that plans every journey personally — and
              stays with you from the first message to the flight home.
            </p>
            <div data-reveal className="mt-8">
              <ButtonLink href="/contact" variant="secondary" className="w-full sm:w-auto">
                Talk to Our Team
              </ButtonLink>
            </div>
          </div>

          {/* A ledger rather than a card grid: hairline-ruled entries, and on
              hover a brand line draws along the rule above the entry. */}
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {POINTS.map(({ title, line, icon: Icon }, i) => (
              <li
                key={title}
                data-reveal-step
                className="group relative border-t border-line pt-6 pb-9 before:absolute before:-top-px before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-brand before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-semibold tracking-widest text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid size-10 place-items-center rounded-pill text-brand ring-1 ring-line transition-colors duration-300 ease-out group-hover:bg-brand group-hover:text-white group-hover:ring-brand">
                    <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.5} />
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl leading-tight font-medium text-ink sm:text-2xl">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{line}</p>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
