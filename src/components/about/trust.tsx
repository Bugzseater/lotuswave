import Image from "next/image";
import {
  FileText,
  Handshake,
  Headset,
  MapPin,
  Receipt,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/about/eyebrow";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

/** Only promises the rest of the site already makes — nothing new claimed. */
const REASONS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Receipt,
    title: "Clear, itemised quotes",
    text: "You see what every part of the journey costs before you commit. No surprise extras on arrival.",
  },
  {
    icon: UserRound,
    title: "One designer, start to finish",
    text: "The person who plans your trip is the one you speak to throughout. No call centres.",
  },
  {
    icon: Headset,
    title: "24/7 in-country support",
    text: "A direct line to our team, answered day and night, for as long as you are in Sri Lanka.",
  },
  {
    icon: Handshake,
    title: "Partners we know personally",
    text: "Every farm, host and practitioner has been visited by our team before a guest ever arrives.",
  },
  {
    icon: FileText,
    title: "Written policies",
    text: "Booking, cancellation and refund terms are published in full, so you know where you stand.",
  },
  {
    icon: MapPin,
    title: "A real, local business",
    text: "A registered Sri Lankan company with an address, a phone number and people you can meet.",
  },
];

/** About 09 — why travellers can trust us. */
export function Trust() {
  return (
    <Section
      aria-labelledby="trust-heading"
      // Last section before the footer, which is pulled up over this one's
      // foot (its artwork's top is transparent). Extra bottom padding keeps
      // the cards clear of the footer lettering, and the foot fades to white
      // so the footer's white ground continues it with no edge.
      className="relative isolate overflow-hidden bg-brand-light pt-6 pb-40 sm:pt-10 sm:pb-52 lg:pt-12 lg:pb-72"
    >
      {/* Watercolour of a guide with travellers at an elephant river. The
          painting sits on the right behind the cards; its blank paper on the
          left falls under the heading. Faint like the other About paintings,
          and faded into brand-light at the top so the Founder fade above
          runs straight into it. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/bg/aboutUs/trust.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-right opacity-[0.3]"
        />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-brand-light to-transparent" />
      </div>
      {/* Foot fade to white — over the section's own brand-light too, so it
          sits outside the painting's wrapper. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-white from-30% to-transparent sm:h-72 lg:h-96"
      />

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow centered>Why Trust Us</Eyebrow>
          <h2
            id="trust-heading"
            className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl"
          >
            Booking From Afar <em className="font-medium text-brand">Takes Trust</em>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-pretty text-ink/75">
            You are handing us your holiday before you have met us. Here is how
            we earn that.
          </p>
        </div>

        <div className="mt-12 sm:mt-16">
          <ul className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                // Frosted glass, matching the Vision & Mission cards, so the
                // painting shows through.
                className="flex gap-3 rounded-card border border-white/60 bg-white/35 p-4 shadow-[0_8px_32px_color-mix(in_srgb,var(--color-brand)_8%,transparent)] backdrop-blur-md sm:p-5"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-pill bg-brand text-white">
                  <Icon aria-hidden="true" className="size-4" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-sans text-sm font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink/75">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
