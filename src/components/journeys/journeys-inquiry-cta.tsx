import { MessageCircle } from "lucide-react";
import { Eyebrow } from "@/components/about/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WHATSAPP_URL } from "@/lib/constants";

/**
 * Closing inquiry block for the journeys page, built like the destinations
 * "Can't Choose?" block: green mist fading to white at the foot, ink
 * heading, primary and secondary buttons. The finder above ends in a
 * green-mist wave that flows into it.
 */
export function JourneysInquiryCta() {
  return (
    <section
      aria-labelledby="journeys-inquiry-heading"
      // Solid green mist for most of its height, then a soft fade to white
      // at the foot so it melts into the page instead of ending on a line.
      className="relative isolate mb-12 overflow-hidden bg-linear-to-b from-green-mist from-55% to-white sm:mb-16 lg:mb-20"
    >
      <Container className="pt-6 pb-16 text-center sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24">
        <Eyebrow centered>Your Journey, Your Way</Eyebrow>
        <h2
          id="journeys-inquiry-heading"
          className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-[1.08] font-semibold text-balance text-ink sm:text-5xl"
        >
          Don&rsquo;t See Your Journey? We&rsquo;ll Design It
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
          Every journey here is a starting point. Tell us how you like to
          travel, and a travel designer will shape the route, the stays and
          the experiences around you — free to plan, with no obligation to book.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/plan-your-trip" size="lg" className="w-full sm:w-auto">
            Plan My Journey
          </ButtonLink>
          <ButtonLink
            href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hello! I'd like help planning a Sri Lanka journey.")}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            <MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.75} />
            WhatsApp Us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
