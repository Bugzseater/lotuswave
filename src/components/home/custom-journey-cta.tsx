import Image from "next/image";
import { Check, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { WHATSAPP_URL } from "@/lib/constants";

const IMAGE = {
  src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80",
  alt: "Mountain peaks rising above a sea of morning cloud",
};

/** Only what the rest of the site already promises — nothing new claimed here. */
const REASSURANCES = [
  "Free to plan, no obligation to book",
  "One travel designer, start to finish",
  "Planned by a local Sri Lankan team",
];

/**
 * Section 12 — the closing conversion block. One of the three sections allowed
 * a full brand treatment (rule 5), so it takes `bg-brand-dark` outright rather
 * than an overlay over a photograph.
 *
 * The composition is a split: the invitation on the left, the photograph framed
 * as a tall panel on the right — on a phone the picture opens the block and the
 * copy follows. Type sits on flat purple instead of over an image, so contrast
 * is fixed rather than at the mercy of the crop.
 *
 * The primary CTA inverts to solid white — brand purple would vanish here. The
 * secondary opens WhatsApp, the fastest route to a person.
 */
export function CustomJourneyCta() {
  return (
    <section
      id="plan"
      aria-labelledby="custom-journey-heading"
      className="relative isolate overflow-hidden bg-brand-dark"
    >
      {/* A soft brand glow lifts the flat purple without another colour. */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-pill bg-brand opacity-50 blur-3xl"
      />
      {/* Dissolves the foot of the section into the charcoal footer, so the
          two meet without a seam. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-charcoal to-transparent sm:h-48"
      />

      <Container className="py-20 sm:py-28 lg:py-36">
        <ScrollReveal disabled className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div
            data-reveal-image="60"
            className="relative aspect-[4/3] w-full overflow-hidden rounded-card ring-1 ring-white/15 sm:aspect-[16/10] lg:order-last lg:aspect-[4/5]"
          >
            <Image
              src={IMAGE.src}
              alt={IMAGE.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p
              data-reveal
              className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-white uppercase"
            >
              <span aria-hidden="true" className="h-px w-10 bg-white/70" />
              Your Journey, Your Way
            </p>
            <h2
              id="custom-journey-heading"
              data-reveal
              className="mt-5 font-display text-4xl leading-[1.05] font-semibold text-balance text-white sm:text-5xl lg:text-6xl"
            >
              Your Sri Lanka Journey Should Be{" "}
              <em className="block font-medium text-white/85">
                As Unique As You Are.
              </em>
            </h2>
            <p
              data-reveal
              className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/85 sm:text-lg"
            >
              Tell us how you like to travel, and a travel designer will shape
              an itinerary around you.
            </p>

            <ul data-reveal className="mt-8 space-y-3 border-t border-white/20 pt-8">
              {REASSURANCES.map((line) => (
                <li key={line} className="flex items-center gap-3 text-white/85">
                  <span
                    aria-hidden="true"
                    className="grid size-6 shrink-0 place-items-center rounded-pill bg-white/15 text-white"
                  >
                    <Check className="size-3.5" strokeWidth={2} />
                  </span>
                  <span className="text-sm sm:text-base">{line}</span>
                </li>
              ))}
            </ul>

            <div data-reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/plan-your-trip"
                size="lg"
                className="w-full bg-white text-brand hover:bg-brand-light focus-visible:outline-white sm:w-auto"
              >
                Plan My Journey
              </ButtonLink>
              <ButtonLink
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="onBrand"
                size="lg"
                className="w-full sm:w-auto"
              >
                <MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.75} />
                Speak With a Travel Designer
              </ButtonLink>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
