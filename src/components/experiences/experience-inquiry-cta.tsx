import { MessageCircle } from "lucide-react";
import { Eyebrow } from "@/components/about/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WHATSAPP_URL } from "@/lib/constants";

/**
 * Closing inquiry block for the experiences pages. Full brand-dark surface
 * (rule 5, as the home Custom Journey CTA). Given an experience, both routes
 * carry its name: the plan link as a query param for the form to prefill,
 * the WhatsApp link as an opening message.
 */
export function ExperienceInquiryCta({
  experience,
}: {
  experience?: { slug: string; title: string };
}) {
  const planHref = experience
    ? `/plan-your-trip?experience=${experience.slug}`
    : "/plan-your-trip";
  const whatsappHref = experience
    ? `${WHATSAPP_URL}?text=${encodeURIComponent(
        `Hello! I'd like to ask about the ${experience.title} experience.`,
      )}`
    : WHATSAPP_URL;

  return (
    <section
      aria-labelledby="experience-inquiry-heading"
      className="relative isolate overflow-hidden bg-brand-dark"
    >
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-pill bg-brand opacity-50 blur-3xl"
      />

      <Container className="py-20 text-center sm:py-28 lg:py-32">
        <Eyebrow onBrand centered>
          {experience ? "Make It Yours" : "Not Sure Where to Start?"}
        </Eyebrow>
        <h2
          id="experience-inquiry-heading"
          className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-[1.08] font-semibold text-balance text-white sm:text-5xl"
        >
          {experience
            ? `Add ${experience.title} to Your Journey`
            : "Tell Us What Draws You, We'll Shape the Rest"}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/85 sm:text-lg">
          Every experience can stand alone or sit inside a tailor-made journey.
          A travel designer will reply personally — free to plan, with no
          obligation to book.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink
            href={planHref}
            size="lg"
            className="w-full bg-white text-brand hover:bg-brand-light focus-visible:outline-white sm:w-auto"
          >
            {experience ? "Plan This Experience" : "Plan My Journey"}
          </ButtonLink>
          <ButtonLink
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="onBrand"
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
