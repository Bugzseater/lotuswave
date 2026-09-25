import { BadgeCheck, Building2, IdCard, ShieldCheck, type LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/about/eyebrow";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { COMPANY } from "@/lib/constants";

type Credential = {
  icon: LucideIcon;
  title: string;
  issuer: string;
  /** Shown when known; otherwise the "on request" line. */
  reference: string | null;
};

/*
 * !! VERIFY BEFORE LAUNCH — each entry is a claim about the business. Keep
 * only the ones that are true, and fill in the reference numbers. The SLTDA
 * number is read from COMPANY so the footer and this section never disagree.
 */
const CREDENTIALS: Credential[] = [
  {
    icon: BadgeCheck,
    title: "Registered Tour Operator",
    issuer: "Sri Lanka Tourism Development Authority (SLTDA)",
    reference: COMPANY.sltdaRegistration,
  },
  {
    icon: Building2,
    title: "Registered Company",
    issuer: COMPANY.legalName,
    reference: null,
  },
  {
    icon: IdCard,
    title: "Licensed Guides",
    issuer: "SLTDA-licensed national and chauffeur guides",
    reference: null,
  },
  {
    icon: ShieldCheck,
    title: "Insured Journeys",
    issuer: "Public liability cover for our tours",
    reference: null,
  },
];

/*
 * Memberships and associations, shown as a row of names under the
 * credentials. Empty hides the row — add only real memberships.
 */
const AFFILIATIONS: string[] = [];

/** About 08 — licences and affiliations. Plain white, hairline cards. */
export function Licences() {
  return (
    <Section aria-labelledby="licences-heading" className="bg-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow centered>Licences & Affiliations</Eyebrow>
          <h2
            id="licences-heading"
            className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl"
          >
            Properly Registered, <em className="font-medium text-brand">Fully Accountable</em>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">
            We operate under Sri Lankan tourism regulations, and we are happy to
            share any of the details below before you book.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {CREDENTIALS.map(({ icon: Icon, title, issuer, reference }) => (
            <li key={title} className="rounded-card border border-line p-6 text-center sm:p-7">
              <span className="mx-auto grid size-14 place-items-center rounded-pill border border-brand/30 text-brand">
                <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{issuer}</p>
              <p className="mt-4 border-t border-line pt-4 text-xs font-medium tracking-wide text-ink">
                {reference ? `Reg. No. ${reference}` : "Details available on request"}
              </p>
            </li>
          ))}
        </ul>

        {AFFILIATIONS.length > 0 && (
          <div className="mt-12 text-center">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
              Members of
            </h3>
            <ul className="mt-4 flex flex-wrap justify-center gap-3">
              {AFFILIATIONS.map((name) => (
                <li
                  key={name}
                  className="rounded-pill border border-line px-5 py-2 text-sm font-medium text-ink"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </Section>
  );
}
