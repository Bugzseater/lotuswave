import {
  BadgeCheck,
  MessageCircle,
  PencilRuler,
  PlaneLanding,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { WaveEdge } from "@/components/ui/wave-edge";

type Step = {
  title: string;
  line: string;
  icon: LucideIcon;
};

const STEPS: Step[] = [
  {
    title: "Tell Us About Yourself",
    line: "Share your travel dates, interests and budget — a short form or a WhatsApp message is enough.",
    icon: MessageCircle,
  },
  {
    title: "We Design Your Journey",
    line: "Our local team prepares a custom itinerary around you, and refines it until it feels right.",
    icon: PencilRuler,
  },
  {
    title: "Confirm Your Experience",
    line: "Approve your itinerary and confirm your booking, with clear pricing and no surprises.",
    icon: BadgeCheck,
  },
  {
    title: "Arrive and Experience Sri Lanka",
    line: "From airport arrival to departure, we look after every detail while you enjoy the island.",
    icon: PlaneLanding,
  },
];

/**
 * Section 07 — one of the three sections allowed a full brand background.
 * Opens on a warm-sand wave so it flows out of the wellness section above,
 * and closes on a white one into the page.
 *
 * Gold is this section's one accent, used only for the large step numerals —
 * display size on purple, which rule 7 allows. Everything else is white.
 */
export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      // Extra top and bottom room so the content clears the waves.
      className="relative isolate overflow-hidden bg-brand pt-28 pb-28 text-white sm:pt-36 sm:pb-36 lg:pt-44 lg:pb-44"
    >
      <WaveEdge position="top" className="fill-warm-sand" />
      <WaveEdge position="bottom" className="fill-white" />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/90 uppercase">
            How It Works
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-4 font-display text-4xl leading-[1.08] text-balance text-white sm:text-5xl lg:text-6xl"
          >
            Your Journey in{" "}
            <em className="font-medium text-white/85">Four Simple Steps.</em>
          </h2>
        </div>

        <ol className="mt-12 grid gap-10 sm:mt-16 sm:grid-cols-2 sm:gap-x-8 lg:mt-20 lg:grid-cols-4 lg:gap-6">
          {STEPS.map(({ title, line, icon: Icon }, i) => (
            <li
              key={title}
              // Dashed thread linking the icons across the row on desktop.
              className="relative lg:after:absolute lg:after:top-7 lg:after:right-0 lg:after:left-[4.5rem] lg:after:border-t lg:after:border-dashed lg:after:border-white/30 lg:last:after:hidden"
            >
              <div className="flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-pill bg-white/10 text-white ring-1 ring-white/25">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
                </span>
                <span
                  aria-hidden="true"
                  className="font-display text-5xl leading-none font-medium text-accent-gold lg:hidden"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <p
                aria-hidden="true"
                className="mt-6 hidden font-display text-5xl leading-none font-medium text-accent-gold lg:block"
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-2xl leading-tight font-semibold text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{line}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 text-center sm:mt-16">
          <ButtonLink
            href="/plan-your-trip"
            size="lg"
            // Purple on purple would vanish, so the CTA inverts: white, brand label.
            className="w-full bg-white text-brand hover:bg-brand-light focus-visible:outline-white sm:w-auto"
          >
            Start Planning
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
