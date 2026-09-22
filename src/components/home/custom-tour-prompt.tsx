import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

/**
 * Short interlude after Signature Experiences: a centred, three-line prompt
 * for a tailor-made tour and one CTA. The watercolour lotus hand is pure
 * decoration, bled off the right edge on larger screens.
 */
export function CustomTourPrompt() {
  return (
    <Section
      aria-labelledby="custom-tour-heading"
      className="relative overflow-hidden bg-accent-sand/30 py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-24 hidden aspect-[1185/1327] w-72 -translate-y-1/2 sm:block lg:-right-16 lg:w-96"
      >
        <Image src="/bg/side.png" alt="" fill sizes="(min-width: 1024px) 384px, 288px" className="object-contain opacity-40" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="custom-tour-heading" className="font-display leading-tight font-normal text-balance text-ink">
            <span className="block text-2xl sm:text-3xl lg:text-4xl">Looking for an</span>
            <span className="mt-2 block text-4xl sm:text-5xl lg:text-6xl">Exclusive Customised Tour?</span>
            <span className="mt-3 block text-2xl sm:text-3xl lg:text-4xl">No Problem</span>
          </h2>

          <ButtonLink
            href="/plan-your-trip"
            size="lg"
            className="mt-10 text-xs font-semibold tracking-[0.2em] uppercase"
          >
            Connect With Us
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
