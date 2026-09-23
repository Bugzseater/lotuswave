import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

type StoryPart = {
  question: string;
  answer: string;
};

/*
 * DRAFT COPY — replace with the founder's own story. Written in the company's
 * voice with no names, dates or personal anecdotes, so nothing here claims a
 * fact about a real person. Swap in specifics (where they grew up, the farm
 * that started it) once the founder has written or approved them.
 */
const STORY: StoryPart[] = [
  {
    question: "Why we started",
    answer:
      "We kept meeting travellers who had seen Sri Lanka's famous sights yet left without really knowing the island — its farms, its kitchens, its people. We started LotusWave to close that gap.",
  },
  {
    question: "Why agro tourism",
    answer:
      "Agriculture is the root of Sri Lankan life: the paddy fields, tea estates and spice gardens shape our food, our festivals and our days. Time on a working farm is the most honest way we know to understand the island.",
  },
  {
    question: "Why local communities",
    answer:
      "The best of Sri Lanka lives with its farmers, cooks and village hosts. Travelling with them — and paying them fairly — means your journey keeps giving long after you have flown home.",
  },
  {
    question: "What we want you to feel",
    answer:
      "Welcomed rather than guided. Rested rather than rushed. We want you to leave feeling you have been a guest in Sri Lanka, not just a visitor to it.",
  },
];

const IMAGE = {
  src: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1400&q=80",
  alt: "Hands stirring a home-cooked meal in a pan by a sunlit window",
};

/**
 * Section 11 — why the company exists. White, so the page runs clean into the
 * footer. Photograph holds the left column (sticky on desktop); the story runs
 * on the right as four short answers to the questions a traveller would
 * actually ask.
 */
export function FounderStory() {
  return (
    <Section id="our-story" aria-labelledby="our-story-heading" className="bg-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16 xl:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-brand-light">
              <Image
                src={IMAGE.src}
                alt={IMAGE.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-center text-xs font-semibold tracking-[0.2em] text-muted uppercase">
              Founded in Sri Lanka
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
              Our Story
            </p>
            <h2
              id="our-story-heading"
              className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
            >
              Born in Sri Lanka.{" "}
              <em className="font-medium text-brand">Designed With Purpose.</em>
            </h2>
            <p className="mt-6 font-display text-2xl leading-snug text-pretty text-ink/85 sm:text-3xl">
              We are Sri Lankans who wanted to share the island the way we know
              it — from the ground up.
            </p>

            <div className="mt-10 grid gap-8 border-t border-ink/15 pt-10 sm:grid-cols-2 sm:gap-x-10">
              {STORY.map(({ question, answer }) => (
                <div key={question}>
                  <h3 className="font-display text-2xl leading-tight font-semibold text-ink">
                    {question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">
                    {answer}
                  </p>
                </div>
              ))}
            </div>

            <ButtonLink
              href="/about"
              variant="secondary"
              size="lg"
              className="mt-10 w-full sm:w-auto"
            >
              Meet Our Story
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
