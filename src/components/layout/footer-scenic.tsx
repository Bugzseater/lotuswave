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
 * Alternative footer — the hill-country photograph runs across the top and
 * dissolves into the white content below on its own mist, so no overlay, no
 * frame and no divider are needed where the two meet.
 *
 * Under it: the logo on its own centred line, then one row of three — socials,
 * the sign-up, the direct lines — then the link columns and the legal line.
 * Same data and same components as `Footer`; only the arrangement differs.
 *
 * The experience and journey columns come from `@/lib/data`, so every page the
 * site has is reachable from the footer and stays in step as the collections
 * grow. Contact details live in `COMPANY` (constants); the SLTDA number and
 * social links render only once they have real values.
 */
export async function FooterScenic() {
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
    // Pulled up over the foot of the section above. The white ground sits on
    // the content only, so the artwork's transparent top shows what is beneath.
    <footer className="relative -mt-16 text-ink sm:-mt-24 lg:-mt-32">
      {/* The file's own 1920×871 ratio, so the photograph shows whole — no
          crop, which keeps the lettering along its top edge intact. Its mist
          along the lower edge is what meets the content. */}
      <div className="relative aspect-[1920/871] w-full">
        <Image
          src="/bg/mountion_1.png"
          alt="Green hills of Sri Lanka's hill country rolling into morning mist, under the words Let's travel around Sri Lanka"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        {/* Row 1 — the logo alone, centred */}
        <div className="flex justify-center">
          <Logo tone="brand" size="lg" />
        </div>

        {/* Row 2 — socials, sign-up and the direct lines, three across */}
        <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div>
            {socials.length > 0 && (
              <>
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
              </>
            )}
          </div>

          <NewsletterSignup compact />

          {/* The three direct lines, stacked in the last column. */}
          <div className="space-y-3 text-sm lg:justify-self-end">
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

        {/* Row 2 — the links */}
        <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
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

        {/* Row 3 — the legal line, with the policy pages beside it */}
        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <p>
              &copy; {new Date().getFullYear()} {COMPANY.legalName}. All rights
              reserved.
            </p>
            {COMPANY.sltdaRegistration && (
              <p>
                Registered with the Sri Lanka Tourism Development Authority —
                Reg. No. {COMPANY.sltdaRegistration}
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
      </div>
      </div>
    </footer>
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
