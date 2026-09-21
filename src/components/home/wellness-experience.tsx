import Image from "next/image";
import {
  Droplets,
  Flower2,
  Leaf,
  Moon,
  Salad,
  ShieldCheck,
  TreePalm,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type Practice = {
  title: string;
  line: string;
  icon: LucideIcon;
};

/*
 * Copy rule for this section: describe experiences, never outcomes. No
 * "heals", "cures", "treats", "detoxifies" or health promises — relaxation and
 * general wellbeing only. Keep it that way when editing.
 */
const PRACTICES: Practice[] = [
  {
    title: "Ayurveda",
    line: "Sri Lanka's traditional wellbeing practice, guided by registered Ayurveda practitioners.",
    icon: Leaf,
  },
  {
    title: "Yoga",
    line: "Gentle sessions for every level with certified instructors, in gardens and open-air pavilions.",
    icon: Flower2,
  },
  {
    title: "Meditation",
    line: "Quiet, guided moments of stillness at sunrise, in temples or beside the water.",
    icon: Moon,
  },
  {
    title: "Herbal wellness",
    line: "Herbal baths, oils and teas drawn from generations of island tradition.",
    icon: Droplets,
  },
  {
    title: "Healthy Sri Lankan food",
    line: "Fresh, seasonal plates — red rice, garden greens, mild curries and king coconut.",
    icon: Salad,
  },
  {
    title: "Digital detox",
    line: "Unplug in places where the loudest sound is birdsong.",
    icon: WifiOff,
  },
  {
    title: "Nature retreats",
    line: "Rainforest, hill-country and lakeside stays made for slowing down.",
    icon: TreePalm,
  },
];

const IMAGE = {
  src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
  alt: "A person sitting in quiet meditation outdoors in soft morning light",
};

/**
 * Section 06 — the wellness side of the offer, the calm counterpart to the
 * agro section: warm sand where agro is sage. The agro section's closing wave
 * is filled with the same sand, so green flows straight into this section.
 * No waves of its own — the arch-topped photograph carries the softness.
 *
 * The seven practices flank the photograph on desktop — four left, three
 * right — and stack under it on smaller screens. A standing note makes clear
 * who delivers the programmes and that none of it is medical treatment.
 *
 * Warm sand is this section's one accent and only ever a surface; icons and
 * links stay brand. Muted grey is too light on it, so supporting copy uses
 * ink at 75%.
 */
export function WellnessExperience() {
  const left = PRACTICES.slice(0, 4);
  const right = PRACTICES.slice(4);

  return (
    <Section
      id="wellness"
      aria-labelledby="wellness-heading"
      className="relative isolate overflow-hidden bg-warm-sand"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -z-10 aspect-square w-[90%] max-w-4xl -translate-x-1/2 rounded-pill bg-radial from-white/60 to-transparent to-70%"
      />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            Wellness Experience
          </p>
          <h2
            id="wellness-heading"
            className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
          >
            Slow Down. Reconnect.{" "}
            <em className="font-medium text-brand">Restore.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-ink/75 sm:text-lg">
            Unhurried days shaped around rest, good food and time in nature —
            with Sri Lanka&rsquo;s own wellbeing traditions woven through.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 sm:mt-16 lg:mt-20 lg:grid-cols-[1fr_minmax(0,20rem)_1fr] lg:gap-12 xl:gap-16">
          {/* Arch-topped photograph — first on small screens, centre on desktop. */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-t-full rounded-b-card bg-white/50 ring-8 ring-white/60 lg:order-2 lg:max-w-none">
            <Image
              src={IMAGE.src}
              alt={IMAGE.alt}
              fill
              sizes="(min-width: 1024px) 20rem, 20rem"
              className="object-cover"
            />
          </div>

          <PracticeList items={left} className="lg:order-1" />
          <PracticeList items={right} className="lg:order-3" />
        </div>

        <div className="mx-auto mt-14 max-w-3xl sm:mt-20">
          <aside
            aria-label="About our wellness providers"
            className="flex gap-4 rounded-card bg-white/75 p-5 ring-1 ring-brand/15 sm:p-6"
          >
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 size-6 shrink-0 text-brand"
              strokeWidth={1.5}
            />
            <div className="text-sm leading-relaxed text-ink/80">
              <p className="font-semibold text-ink">Qualified hands, honest expectations.</p>
              <p className="mt-1">
                Our wellness programmes are delivered with registered Ayurveda
                practitioners and professionally qualified instructors. They are
                designed for relaxation and general wellbeing, not as medical
                treatment — please speak to your doctor about any health
                condition before you travel.
              </p>
            </div>
          </aside>

          <div className="mt-10 text-center">
            <ButtonLink
              href="/experiences/ayurveda-wellness"
              size="lg"
              className="w-full sm:w-auto"
            >
              Explore Wellness Journeys
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function PracticeList({ items, className }: { items: Practice[]; className?: string }) {
  return (
    <ul className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-8", className)}>
      {items.map(({ title, line, icon: Icon }) => (
        <li key={title} className="flex gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-pill bg-white text-brand ring-1 ring-brand/15">
            <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
          </span>
          <div>
            <h3 className="font-display text-xl leading-tight font-semibold text-ink sm:text-2xl">
              {title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-ink/75">{line}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
