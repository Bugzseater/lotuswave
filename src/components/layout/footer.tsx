import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, Siren } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { NewsletterSignup } from "@/components/layout/newsletter-signup";
import { SOCIAL_ICONS } from "@/components/layout/social-icons";
import {
  COMPANY,
  NAV_LINKS,
  POLICY_LINKS,
  SITE,
  SOCIAL_LINKS,
  WHATSAPP_URL,
  telHref,
  type NavLink,
} from "@/lib/constants";
import { getExperiences, getJourneys } from "@/lib/data";

const linkStyle =
  "text-sm text-muted transition-colors duration-200 ease-out hover:text-brand";

const headingStyle =
  "font-sans text-xs font-semibold tracking-[0.2em] text-ink uppercase";

/**
 * Site footer — full bleed on a white ground, separated from the page by a
 * hairline. Ink type throughout; purple carries the icons, the link hovers and
 * the send button, nothing else.
 *
 * Three bands: the closing invitation and sign-up on top, then the link
 * columns, then the legal bar. The Kolam-and-landscape artwork sits behind it
 * all at a whisper — decorative, hidden from assistive tech and from phones,
 * where the crop would show nothing but the pale centre.
 *
 * The experience and journey columns come from `@/lib/data`, so every page the
 * site has is reachable from the footer and stays in step as the collections
 * grow. Contact details live in `COMPANY` (constants); the SLTDA number and
 * social links render only once they have real values.
 */
export async function Footer() {
  const [experiences, journeys] = await Promise.all([
    getExperiences(),
    getJourneys(),
  ]);

  const socials = SOCIAL_LINKS.filter((link) => link.href);
  const explore = NAV_LINKS.filter((link) => link.href !== "/");
  const experienceLinks: NavLink[] = experiences.map((experience) => ({
    label: experience.title,
    href: `/experiences/${experience.slug}`,
  }));
  const journeyLinks: NavLink[] = journeys.map((journey) => ({
    label: journey.title,
    href: `/journeys/${journey.slug}`,
  }));

  return (
    <footer className="relative isolate overflow-hidden border-t border-line bg-white px-4 py-10 text-ink sm:px-8 sm:py-12 lg:px-14 lg:py-14">
        {/* Kolam-and-landscape artwork. It carries its detail on the left and
            right edges and stays pale through the middle, so the columns keep
            their contrast even where it shows through. */}
        <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden [mask-image:linear-gradient(to_bottom,#000,transparent_75%)] sm:block"
      >
        <Image
          src="/bg/footer_bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.14]"
        />
      </div>

      <FooterContent
        socials={socials}
        explore={explore}
        experienceLinks={experienceLinks}
        journeyLinks={journeyLinks}
      />
    </footer>
  );
}

function FooterContent({
  socials,
  explore,
  experienceLinks,
  journeyLinks,
}: {
  socials: readonly NavLink[];
  explore: readonly NavLink[];
  experienceLinks: readonly NavLink[];
  journeyLinks: readonly NavLink[];
}) {
  return (
    <>
      {/* Band 1 — the closing invitation, and the sign-up beside it */}
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Logo tone="brand" size="lg" />
          <h2 className="mt-6 max-w-sm font-display text-3xl leading-tight text-ink sm:text-4xl">
            Shall we plan this journey together?
          </h2>
          {socials.length > 0 && (
            <div className="mt-7">
              <h2 className={headingStyle}>Follow us</h2>
              <ul aria-label="Social media" className="mt-4 flex flex-wrap gap-2.5">
                {socials.map((link) => {
                  const Icon = SOCIAL_ICONS[link.label];
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${SITE.name} on ${link.label}`}
                        className="inline-flex size-11 items-center justify-center rounded-pill border border-line text-brand transition-colors duration-200 ease-out hover:border-brand hover:bg-brand hover:text-white"
                      >
                        {Icon ? (
                          <Icon className="size-4" />
                        ) : (
                          <span className="text-xs font-medium">{link.label}</span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div>
          <NewsletterSignup />

          {/* The three direct lines, one row under the sign-up. */}
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5 text-sm">
            <p className="flex items-center gap-2.5">
              <Phone aria-hidden="true" className="size-4 shrink-0 text-brand" />
              <a href={telHref(COMPANY.phone)} className={linkStyle}>
                {COMPANY.phone}
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <MessageCircle aria-hidden="true" className="size-4 shrink-0 text-brand" />
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={linkStyle}
              >
                WhatsApp +{SITE.whatsappNumber}
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <Mail aria-hidden="true" className="size-4 shrink-0 text-brand" />
              <a href={`mailto:${COMPANY.email}`} className={`${linkStyle} break-all`}>
                {COMPANY.email}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Band 2 — link columns, with contact as the last one */}
      <div className="mt-6 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <LinkColumn heading="Explore the site" links={explore} />
        <LinkColumn heading="Experiences" links={experienceLinks} />
        <LinkColumn heading="Journeys" links={journeyLinks} />

        <div>
          <h2 className={headingStyle}>Visit us</h2>
          <address className="mt-4 space-y-3 text-sm not-italic">
            <p className="flex gap-3 text-muted">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>
                {COMPANY.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </p>
            <p className="flex gap-3">
              <Siren aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
              <span className="text-muted">
                <span className="block">24/7 while you travel</span>
                <a
                  href={telHref(COMPANY.emergencyPhone)}
                  className="font-medium text-brand underline-offset-4 hover:underline"
                >
                  {COMPANY.emergencyPhone}
                </a>
              </span>
            </p>
          </address>
        </div>
      </div>

      {/* Band 3 — the legal line, with the policy pages beside it */}
      <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY.legalName}. All rights
            reserved.
          </p>
          {COMPANY.sltdaRegistration && (
            <p>
              Registered with the Sri Lanka Tourism Development Authority — Reg.
              No. {COMPANY.sltdaRegistration}
            </p>
          )}
        </div>

        <nav aria-label="Policies">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {POLICY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 ease-out hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

/** One heading plus its list of links — the shape every footer column takes. */
function LinkColumn({
  heading,
  links,
}: {
  heading: string;
  links: readonly NavLink[];
}) {
  return (
    <nav aria-label={heading}>
      <h2 className={headingStyle}>{heading}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkStyle}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
