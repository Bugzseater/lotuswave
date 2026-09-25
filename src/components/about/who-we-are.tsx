import Image from "next/image";
import { Compass, MapPin, Sprout, type LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/about/eyebrow";
import { Container } from "@/components/ui/container";
import { WaveEdge } from "@/components/ui/wave-edge";

const FACTS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: MapPin,
    title: "Sri Lankan, on the ground",
    text: "Our team lives and works on the island we plan for.",
  },
  {
    icon: Sprout,
    title: "Agro & wellness specialists",
    text: "Farms, spice gardens, Ayurveda and quiet nature.",
  },
  {
    icon: Compass,
    title: "Private, tailor-made",
    text: "Every journey designed around you alone.",
  },
];

const IMAGE = {
  src: "/bg/aboutUs/who.png",
  alt: "A watercolour of the Queen's Hotel in Kandy, a white colonial building with a domed corner tower, set against misty green hills",
};

/**
 * About 01 — who we are. The "Scroll down" target from the hero, so it keeps
 * the `our-story` id.
 *
 * Desktop: the watercolour fills the section and the copy sits on the left
 * over a white wash, leaving the building clear on the right. The painting's
 * own edges are near-white (≈#FAFAF9), so every side is faded into the white
 * page to avoid a seam. Phone: the painting opens the section, the copy
 * follows below it.
 */
export function WhoWeAre() {
  return (
    <section
      id="our-story"
      aria-labelledby="who-heading"
      className="relative isolate scroll-mt-20 overflow-hidden bg-white"
    >
      {/* Phone / tablet: the painting as a band above the copy. */}
      <div className="relative aspect-[16/10] w-full lg:hidden">
        <Image
          src={IMAGE.src}
          alt={IMAGE.alt}
          fill
          sizes="100vw"
          className="object-cover opacity-[0.3]"
        />

      </div>

      {/* Desktop: the painting behind the whole section. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden lg:block">
        <Image
          src={IMAGE.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[65%_center] opacity-[0.3]"
        />
        {/* White wash under the copy, clearing by the dome. */}
        <div className="absolute inset-0 bg-gradient-to-r from-white from-25% via-white/85 via-45% to-transparent to-65%" />
        {/* Top and foot melt into the neighbouring sections. */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      <Container className="pt-4 pb-16 sm:pb-24 lg:py-36 xl:py-44">
        <div className="max-w-xl">
          <Eyebrow>Who We Are</Eyebrow>
          <h2
            id="who-heading"
            className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl"
          >
            A Local Team Sharing{" "}
            <em className="font-medium text-brand">Sri Lanka From Its Roots</em>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-pretty text-ink/80 sm:text-base">
            LotusWave Lanka Tours is a Sri Lankan travel and wellness company.
            We design private journeys through the island&rsquo;s farms,
            villages, forests and healing traditions the Sri Lanka that lives
            beyond the postcard stops.
          </p>

          <ul className="mt-8 grid gap-4 border-t border-ink/10 pt-6 sm:grid-cols-3 sm:gap-4">
            {FACTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3 sm:block">
                <span className="grid size-8 shrink-0 place-items-center rounded-pill bg-brand-light text-brand">
                  <Icon aria-hidden="true" className="size-4" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-sans text-[13px] leading-snug font-semibold text-ink sm:mt-2">
                    {title}
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink/70">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Waves into Why We Started, which is brand-light — same fill, so the
          two meet on the curve, not a straight line. Nudged 1px past the
          edge to hide any sub-pixel seam. */}
      <WaveEdge position="bottom" flat className="-bottom-px fill-brand-light" />
    </section>
  );
}
