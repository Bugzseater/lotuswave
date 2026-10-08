import { MessageCircle } from "lucide-react";
import { Eyebrow } from "@/components/about/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WaveEdge } from "@/components/ui/wave-edge";
import { WHATSAPP_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Closing inquiry block for the destinations pages, on green mist: ink heading,
 * primary and secondary buttons. Given a destination, both routes carry its name: the plan link as
 * a query param for the form to prefill, WhatsApp as an opening message.
 */
export function DestinationInquiryCta({
  destination,
  waveTop = false,
}: {
  destination?: { slug: string; name: string };
  /** A white wave along the top edge, for when a white section sits directly above. */
  waveTop?: boolean;
}) {
  const planHref = destination
    ? `/plan-your-trip?destination=${destination.slug}`
    : "/plan-your-trip";
  const whatsappHref = destination
    ? `${WHATSAPP_URL}?text=${encodeURIComponent(
        `Hello! I'd like to plan a journey that includes ${destination.name}.`,
      )}`
    : WHATSAPP_URL;

  return (
    <section
      aria-labelledby="destination-inquiry-heading"
      // Solid green mist for most of its height, then a soft fade to white
      // at the foot so it melts into the page instead of ending on a line.
      className="relative isolate mb-12 overflow-hidden bg-linear-to-b from-green-mist from-55% to-white sm:mb-16 lg:mb-20"
    >
      {waveTop && <WaveEdge position="top" flat className="-top-px fill-white" />}

      {/* With a wave, the copy starts below it. */}
      <Container
        className={cn(
          "pb-16 text-center sm:pb-20 lg:pb-24",
          waveTop ? "pt-16 sm:pt-20 lg:pt-28" : "pt-6 sm:pt-8 lg:pt-10",
        )}
      >
        <Eyebrow centered>
          {destination ? "Make It Yours" : "Can't Choose?"}
        </Eyebrow>
        <h2
          id="destination-inquiry-heading"
          className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-[1.08] font-semibold text-balance text-ink sm:text-5xl"
        >
          {destination
            ? `Plan a Journey Through ${destination.name}`
            : "Tell Us the Season, We'll Draw the Route"}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
          Pick a place, or several. A travel designer will shape the route,
          the stays and the experiences around your dates — free to plan, with
          no obligation to book.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={planHref} size="lg" className="w-full sm:w-auto">
            Plan My Journey
          </ButtonLink>
          <ButtonLink
            href={whatsappHref}
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
