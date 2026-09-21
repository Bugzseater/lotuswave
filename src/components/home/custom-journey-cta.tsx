import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WHATSAPP_URL } from "@/lib/constants";

const IMAGE = {
  src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80",
  alt: "Mountain peaks rising above a sea of morning cloud",
};

/**
 * Section 12 — the closing conversion block. One of the three sections
 * allowed a full brand treatment: a full-bleed photograph under a
 * `bg-brand-dark/70` overlay (rule 5), white type, two actions.
 *
 * The primary CTA inverts to solid white — brand purple would vanish on the
 * overlay. The secondary opens WhatsApp, the fastest route to a person.
 */
export function CustomJourneyCta() {
  return (
    <section
      id="plan"
      aria-labelledby="custom-journey-heading"
      className="relative isolate overflow-hidden bg-brand-dark"
    >
      <Image
        src={IMAGE.src}
        alt={IMAGE.alt}
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-dark/70" />
      {/* Dissolves the foot of the section into the charcoal footer, so the
          two meet without a seam. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-charcoal to-transparent sm:h-48"
      />

      <Container className="py-24 text-center sm:py-32 lg:py-44">
        <p className="text-xs font-semibold tracking-[0.2em] text-white/90 uppercase">
          Your Journey, Your Way
        </p>
        <h2
          id="custom-journey-heading"
          className="mx-auto mt-5 max-w-4xl font-display text-4xl leading-[1.05] font-semibold text-balance text-white sm:text-6xl lg:text-7xl"
        >
          Your Sri Lanka Journey Should Be{" "}
          <em className="font-medium text-white/85">As Unique As You Are.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/85 sm:text-lg">
          Tell us how you like to travel, and a travel designer will shape an
          itinerary around you. Free to plan, no obligation to book.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
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
      </Container>
    </section>
  );
}
