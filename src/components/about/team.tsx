import { CarFront, Flower2, Headset, Route, type LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/about/eyebrow";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

type TeamRole = {
  icon: LucideIcon;
  title: string;
  text: string;
};

/*
 * Described by role until real people have agreed to be shown. When they
 * have, give each entry a name and photo — never a stock portrait standing
 * in for a team member.
 */
const TEAM: TeamRole[] = [
  {
    icon: Route,
    title: "Travel Designers",
    text: "Your one point of contact. They shape the itinerary with you and stay with it until you fly home.",
  },
  {
    icon: CarFront,
    title: "Guides & Chauffeurs",
    text: "Licensed Sri Lankan guides and drivers who know the back roads, the history and the people.",
  },
  {
    icon: Flower2,
    title: "Wellness Advisors",
    text: "They match you with Ayurveda practitioners and retreats suited to what you actually need.",
  },
  {
    icon: Headset,
    title: "Guest Care",
    text: "The in-country line you can call at any hour while you travel, for anything at all.",
  },
];

/** About 05 — the people behind a journey, by what they do for you. */
export function Team() {
  return (
    <Section aria-labelledby="team-heading" className="bg-white">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Our Team</Eyebrow>
          <h2
            id="team-heading"
            className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl"
          >
            The People Who <em className="font-medium text-brand">Look After You</em>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">
            A small Sri Lankan team, so the person who plans your journey is
            the person who answers when you call.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="group rounded-card border border-line bg-white p-6 transition-colors duration-300 ease-out hover:border-brand/40 hover:bg-brand-light sm:p-7"
            >
              <span className="grid size-14 place-items-center rounded-pill bg-brand-light text-brand transition-colors duration-300 ease-out group-hover:bg-brand group-hover:text-white">
                <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
