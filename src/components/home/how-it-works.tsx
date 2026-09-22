import {
  BadgeCheck,
  MessageCircle,
  PencilRuler,
  PlaneLanding,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
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
 * Set as an editorial spread: headline left, standfirst and CTA opposite,
 * then the steps as ruled columns with large outlined numerals. Gold is this
 * section's one accent — the numerals fill with it on hover, display size on
 * purple, which rule 7 allows. Everything else is white.
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
        <ScrollReveal disabled>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <p
                data-reveal
                className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-white uppercase"
              >
                <span aria-hidden="true" className="h-px w-10 bg-white" />
                How It Works
              </p>
              <h2
                id="how-it-works-heading"
                data-reveal
                className="mt-5 font-display text-4xl leading-[1.08] text-balance text-white sm:text-5xl lg:text-6xl"
              >
                Your Journey in{" "}
                <em className="block font-medium text-white/85">Four Simple Steps.</em>
              </h2>
            </div>

            <div data-reveal className="lg:col-span-5 lg:pb-2">
              <p className="text-base leading-relaxed text-pretty text-white/85 sm:text-lg">
                From your first message to your last morning on the island, one
                local team plans, books and looks after everything.
              </p>
              <ButtonLink
                href="/plan-your-trip"
                size="lg"
                // Purple on purple would vanish, so the CTA inverts: white, brand label.
                className="mt-6 w-full bg-white text-brand hover:bg-brand-light focus-visible:outline-white sm:w-auto"
              >
                Start Planning
              </ButtonLink>
            </div>
          </div>

          {/* Ruled columns, like a printed itinerary. Hairlines between steps
              rather than boxes; each column lifts slightly on hover. */}
          <ol className="mt-12 grid border-t border-white/20 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {STEPS.map(({ title, line, icon: Icon }, i) => (
              <li
                key={title}
                data-reveal-step
                className="group border-b border-white/20 py-10 transition-colors duration-300 ease-out hover:bg-white/5 sm:px-8 sm:odd:border-r lg:border-r lg:border-b-0 lg:last:border-r-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-white/80 uppercase">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid size-11 place-items-center rounded-pill text-white ring-1 ring-white/30 transition-colors duration-300 ease-out group-hover:bg-white group-hover:text-brand">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                  </span>
                </div>

                {/* Outlined numeral that fills gold on hover — display size on
                    purple, which rule 7 allows. */}
                <p
                  aria-hidden="true"
                  className="mt-8 font-display text-7xl leading-none font-semibold text-transparent transition-colors duration-300 ease-out [-webkit-text-stroke:1px_color-mix(in_srgb,var(--color-white)_50%,transparent)] group-hover:text-accent-gold group-hover:[-webkit-text-stroke-color:var(--color-accent-gold)] sm:text-8xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-6 font-display text-2xl leading-tight font-medium text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{line}</p>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
