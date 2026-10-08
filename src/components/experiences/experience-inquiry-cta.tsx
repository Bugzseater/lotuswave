import { MessageCircle } from "lucide-react";
import { Eyebrow } from "@/components/about/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WHATSAPP_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Closing inquiry block for the experiences pages. Full brand-dark surface
 * (rule 5, as the home Custom Journey CTA). Given an experience, both routes
 * carry its name: the plan link as a query param for the form to prefill,
 * the WhatsApp link as an opening message.
 *
 * `light` puts it on white instead, for the overview page, where it follows
 * the white-waved category sections.
 */
export function ExperienceInquiryCta({
  experience,
  light = false,
}: {
  experience?: { slug: string; title: string };
  light?: boolean;
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
      className={cn("relative isolate overflow-hidden", light ? "bg-white" : "bg-brand-dark")}
    >
      {!light && (
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-pill bg-brand opacity-50 blur-3xl"
        />
      )}

      <Container
        className={cn(
          "text-center",
          light ? "pt-8 pb-28 sm:pt-10 sm:pb-36 lg:pt-12 lg:pb-44" : "py-20 sm:py-28 lg:py-32",
        )}
      >
        <Eyebrow onBrand={!light} centered>
          {experience ? "Make It Yours" : "Not Sure Where to Start?"}
        </Eyebrow>
        <h2
          id="experience-inquiry-heading"
          className={cn(
            "mx-auto mt-5 max-w-3xl font-display text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl",
            light ? "text-ink" : "text-white",
          )}
        >
          {experience
            ? `Add ${experience.title} to Your Journey`
            : "Tell Us What Draws You, We'll Shape the Rest"}
        </h2>
        <p
          className={cn(
            "mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty sm:text-lg",
            light ? "text-muted" : "text-white/85",
          )}
        >
          Every experience can stand alone or sit inside a tailor-made journey.
          A travel designer will reply personally — free to plan, with no
          obligation to book.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink
            href={planHref}
            size="lg"
            className={cn(
              "w-full sm:w-auto",
              !light && "bg-white text-brand hover:bg-brand-light focus-visible:outline-white",
            )}
          >
            {experience ? "Plan This Experience" : "Plan My Journey"}
          </ButtonLink>
          <ButtonLink
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            variant={light ? "secondary" : "onBrand"}
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
