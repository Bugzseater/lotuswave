import Image from "next/image";
import { WellnessShowcase } from "@/components/home/wellness-showcase";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { ImageAsset } from "@/types";

type Practice = {
  title: string;
  line: string;
  image: ImageAsset;
};

/** Square crops are enough for a circle — nothing here renders above 224px. */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&h=600&q=80`;

/*
 * Copy rule for this section: describe experiences, never outcomes. No
 * "heals", "cures", "treats", "detoxifies" or health promises — relaxation and
 * general wellbeing only. Keep it that way when editing.
 */
const PRACTICES: Practice[] = [
  {
    title: "Ayurveda",
    line: "Guided by registered practitioners.",
    image: {
      // The one circle drawn from our own library — the rest are placeholders.
      src: "/bg/wellness/ayurvedic%20spa%20outdoor.png",
      alt: "Warm oil streaming from a brass vessel during a shirodhara treatment",
    },
  },
  {
    title: "Yoga",
    line: "Gentle sessions, every level.",
    image: {
      src: unsplash("1506126613408-eca07ce68773"),
      alt: "A person holding a seated yoga pose on a mat at first light",
    },
  },
  {
    title: "Meditation",
    line: "Stillness at sunrise, beside the water.",
    image: {
      src: unsplash("1474418397713-7ede21d49118"),
      alt: "Hands resting open in the lap during quiet meditation",
    },
  },
  {
    title: "Herbal wellness",
    line: "Baths, oils and teas from island tradition.",
    image: {
      src: "/bg/wellness/herbal%20wellnes.png",
      alt: "A bowl of fresh green herbal paste held beside a treatment table",
    },
  },
  {
    title: "Island food",
    line: "Red rice, garden greens, mild curries.",
    image: {
      src: unsplash("1585937421612-70a008356fbe"),
      alt: "Small dishes of rice, greens and curry laid out on a table",
    },
  },
  {
    title: "Digital detox",
    line: "Where the loudest sound is birdsong.",
    image: {
      src: unsplash("1518173946687-a4c8892bbd9f"),
      alt: "An empty hammock strung between palms in a quiet garden",
    },
  },
  {
    title: "Nature retreats",
    line: "Rainforest, hills and lakeside stays.",
    image: {
      src: "/bg/wellness/natural.png",
      alt: "Treatment tables set out on the rocks beside a forest stream",
    },
  },
];

/**
 * Section 06 — the wellness side of the offer, the calm counterpart to the
 * agro section. White ground, because the photographs in the band below fade
 * to white along their own lower edge.
 *
 * The seven practices read as a row of circles under the heading — one line
 * each, scrolling sideways on phones and settling into seven columns on
 * desktop. Below them the showcase crossfades three photographs and carries
 * the section's one CTA.
 *
 * Brand-light is the section's one tint, sitting under each circle while its
 * photograph loads; links stay brand, supporting copy stays muted.
 *
 * Four of the seven circles carry Unsplash placeholders — swap them for the
 * real library the moment it exists.
 */
export function WellnessExperience() {
  return (
    <Section
      id="wellness"
      aria-labelledby="wellness-heading"
      className="relative isolate overflow-hidden bg-white pt-10 pb-0 sm:pt-12 lg:pt-16"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            Wellness Experience
          </p>
          <h2
            id="wellness-heading"
            className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl"
          >
            Slow Down. Reconnect.{" "}
            <em className="font-medium text-brand">Restore.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-pretty text-muted">
            Unhurried days shaped around rest, good food and time in nature —
            with Sri Lanka&rsquo;s own wellbeing traditions woven through.
          </p>
        </div>

        {/* The seven practices. A snap-scrolling row on phones — the gutter is
            cancelled so the first circle still lines up with the container —
            then a plain seven-column grid from lg. */}
        <ul className="mt-8 -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-10 lg:grid-cols-7 lg:gap-6">
          {PRACTICES.map(({ title, line, image }) => (
            <li
              key={title}
              className="w-[38%] shrink-0 snap-start text-center sm:w-auto"
            >
              {/* A photograph in a circle, on a hairline ring the same purple
                  as the headings — the ring is what holds the row together
                  when the crops differ in tone. */}
              <span className="relative mx-auto block size-24 overflow-hidden rounded-pill bg-brand-light ring-1 ring-brand/20 ring-offset-4 ring-offset-white lg:size-28">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 7rem, 6rem"
                  className="object-cover"
                />
              </span>
              <h3 className="mt-5 font-display text-lg leading-tight font-semibold text-balance text-ink">
                {title}
              </h3>
              <p className="mt-1 text-[13px] leading-snug text-pretty text-muted">
                {line}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center sm:mt-10">
          <ButtonLink
            href="/experiences/ayurveda-wellness"
            size="lg"
            className="w-full sm:w-auto"
          >
            Explore Wellness Journeys
          </ButtonLink>
        </div>
      </Container>

      {/* Full-bleed, and pulled up under the copy so the band's own height
          does less of the section's. `-z-10` keeps it behind the text while
          still painting over the section's white ground — the top of each
          photograph is quiet background, so nothing legible is lost. */}
      <div className="relative -z-10 -mt-4 sm:-mt-8 lg:-mt-14">
        <WellnessShowcase />
      </div>
    </Section>
  );
}
