import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Target, type LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/about/eyebrow";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

/*
 * DRAFT — the company's vision and mission. Replace with the approved
 * wording once the owners have signed it off.
 */
const STATEMENTS: { icon: LucideIcon; label: string; text: string }[] = [
  {
    icon: Eye,
    label: "Our Vision",
    text: "To be Sri Lanka's most trusted name in agro and wellness travel — where every journey leaves travellers restored and the island's communities stronger.",
  },
  {
    icon: Target,
    label: "Our Mission",
    text: "To design personal journeys through Sri Lanka's farms, healing traditions and nature, working hand in hand with local hosts, paying them fairly and protecting the places we share.",
  },
];

/** About 03 — the company's vision and mission. */
export function AgroWellnessVision() {
  return (
    <Section
      aria-labelledby="vision-heading"
      // Tighter than the Section baseline: the Who We Are wave above already
      // opens the space, so the heading can sit close under it.
      className="relative isolate overflow-hidden bg-brand-light pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20"
    >
      {/* Sigiriya watercolour filling the section. Faint, like Who We Are,
          and faded into brand-light top and bottom so the waves on either
          side meet it without an edge. Sized to the section (not the
          painting's aspect), so the bottom fade always lands on the
          section's foot instead of being clipped above it. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/bg/aboutUs/mision.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-left opacity-[0.3]"
        />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-brand-light to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brand-light from-15% to-transparent" />
      </div>

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow centered>Vision &amp; Mission</Eyebrow>
          <h2
            id="vision-heading"
            className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl"
          >
            Agro <span className="text-brand">+</span> Wellness,{" "}
            <em className="font-medium text-brand">One Journey</em>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">
            Working with the land and resting in it are two halves of the same
            island. We bring them together, so a trip can nourish you as much
            as it shows you.
          </p>
        </div>

        <ul className="mx-auto mt-8 grid max-w-4xl gap-4 sm:mt-10 md:grid-cols-2 md:gap-5">
          {STATEMENTS.map(({ icon: Icon, label, text }) => (
            <li
              key={label}
              // Frosted glass: translucent white over the watercolour, blurred
              // behind, with a white hairline catching the edge.
              className="rounded-card border border-white/70 bg-white/45 p-5 shadow-[0_8px_32px_color-mix(in_srgb,var(--color-brand)_8%,transparent)] backdrop-blur-md sm:p-6"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-pill bg-brand text-white">
                  <Icon aria-hidden="true" className="size-4" strokeWidth={1.5} />
                </span>
                <h3 className="font-display text-lg font-semibold text-ink">{label}</h3>
              </div>
              <p className="mt-3 font-display text-base leading-relaxed text-pretty text-ink/85 sm:text-[17px]">
                {text}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center sm:mt-10">
          <Link
            href="/experiences"
            className="group inline-flex items-center gap-2 font-medium text-brand hover:text-brand-dark"
          >
            Explore our agro and wellness experiences
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
            />
          </Link>
        </p>
      </Container>
    </Section>
  );
}
