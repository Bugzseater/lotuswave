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
 * the eight trust points run down the right as a quiet two-column grid.
 */
export function WhyTravelWithUs() {
  return (
    <Section id="why-us" aria-labelledby="why-us-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16 xl:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
              Why LotusWave
            </p>
            <h2
              id="why-us-heading"
              className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
            >
              Why Travel{" "}
              <em className="font-medium text-brand">With Us?</em>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-pretty text-muted sm:text-lg">
              A small Sri Lankan team that plans every journey personally — and
              stays with you from the first message to the flight home.
            </p>
            <ButtonLink href="/contact" variant="secondary" className="mt-8 w-full sm:w-auto">
              Talk to Our Team
            </ButtonLink>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {POINTS.map(({ title, line, icon: Icon }) => (
              <li
                key={title}
                className="flex gap-4 rounded-card border border-line p-5 transition-colors duration-200 ease-out hover:border-brand/40 sm:p-6"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-pill bg-brand-light text-brand">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-display text-xl leading-tight font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{line}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
