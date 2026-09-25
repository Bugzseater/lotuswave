import Image from "next/image";
import {
  BedDouble,
  Binoculars,
  ChefHat,
  Flower2,
  Tractor,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/about/eyebrow";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const PARTNERS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Tractor, title: "Family farms", text: "Paddy, tea, spice and fruit growers who host hands-on days." },
  { icon: ChefHat, title: "Village cooks", text: "Home kitchens where you cook, and eat, with the family." },
  { icon: Flower2, title: "Ayurveda centres", text: "Practitioners and retreats we have visited ourselves." },
  { icon: BedDouble, title: "Homestays & guesthouses", text: "Small, family-run places over large chains." },
  { icon: Binoculars, title: "Naturalist guides", text: "Local trackers and birders who read the forest." },
  { icon: Users, title: "Community groups", text: "Craft makers, farmer societies and village projects." },
];

/** About 06 — who we work with on the ground. Tinted surface, photo alongside. */
export function PartnerNetwork() {
  return (
    <Section aria-labelledby="partners-heading" className="bg-brand-light">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-20">
          <div>
            <Eyebrow>Local Partner Network</Eyebrow>
            <h2
              id="partners-heading"
              className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl"
            >
              Every Experience Has{" "}
              <em className="font-medium text-brand">a Host Behind It</em>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-pretty text-ink/75 sm:text-lg">
              Our journeys run on relationships, not bookings. Each partner is
              someone we know by name, have visited in person and pay fairly
              for their time and knowledge.
            </p>

            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-card bg-white">
              <Image
                src="/bg/responsibal_travel/Local communities.png"
                alt="Villagers and travellers sharing a home-cooked meal on a hillside veranda"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {PARTNERS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-card bg-white p-6">
                <Icon aria-hidden="true" className="size-7 text-brand" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
