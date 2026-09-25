import { Quote } from "lucide-react";
import { Eyebrow } from "@/components/about/eyebrow";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

/*
 * DRAFT COPY — in the company's voice, with no dates, names or anecdotes, so
 * it claims nothing about a real person. Replace once the founder has written
 * or approved the real account.
 */
const PARTS = [
  {
    title: "The gap we saw",
    text: "Travellers were seeing Sri Lanka's famous sights, then flying home without ever really meeting the island — its paddy fields, its kitchens, its healers, its people.",
  },
  {
    title: "What we set out to do",
    text: "Build journeys around the life of the island: a morning on a working farm, a meal cooked with a village family, rest guided by Ayurveda rather than a spa menu.",
  },
  {
    title: "Who it should benefit",
    text: "The hosts as much as the guests. Money spent on a journey should stay with the farmers, cooks and small businesses who made it.",
  },
];

/** About 02 — the reason the company exists. A pull quote over three short beats. */
export function WhyWeStarted() {
  return (
    <Section aria-labelledby="why-started-heading" className="bg-brand-light">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow centered>Why We Started</Eyebrow>
          <Quote aria-hidden="true" className="mx-auto mt-8 size-10 text-brand/40" strokeWidth={1.25} />
          <h2
            id="why-started-heading"
            className="mt-4 font-display text-3xl leading-snug font-normal text-balance text-ink sm:text-4xl lg:text-5xl"
          >
            We wanted travellers to leave Sri Lanka feeling like{" "}
            <em className="font-medium text-brand">guests of the island</em>, not
            just visitors to it.
          </h2>
        </div>

        <ol className="mx-auto mt-14 grid max-w-6xl gap-10 sm:mt-20 lg:grid-cols-3 lg:gap-12">
          {PARTS.map(({ title, text }, i) => (
            <li key={title} className="border-t border-brand/20 pt-6">
              <span className="font-display text-sm font-semibold text-brand">
                0{i + 1}
              </span>
              <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{title}</h3>
              <p className="mt-3 text-base leading-relaxed text-pretty text-ink/75">{text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
