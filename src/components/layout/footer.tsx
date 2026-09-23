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
import { cn } from "@/lib/utils";

const linkStyle =
  "text-sm text-muted transition-colors duration-200 ease-out hover:text-brand";

const headingStyle =
  "font-sans text-xs font-semibold tracking-[0.2em] text-ink uppercase";

/**
 * Site footer — white background, ink type, separated from the page by a
 * hairline. Three stacked bands: brand plus newsletter, a contact strip, then
 * the link columns, each divided by a `border-line` rule and all collapsing to
 * one column on phones.
 *
 * A faint Kolam-and-landscape artwork sits behind the whole footer: its detail
 * is on the left and right edges and it stays pale through the middle, so the
 * columns keep their contrast. Decorative only — hidden from assistive tech,
 * and from phones, where the crop would show nothing but the pale centre.
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
    <footer className="relative isolate overflow-hidden border-t border-line bg-white pt-12 pb-8 text-ink sm:pt-16">
      {/* Kolam-and-landscape artwork, full width. It carries its detail on the
          left and right edges and stays pale through the middle, so the
          columns keep their contrast. Faint, fading in from the top edge so
          the seam with the section above stays soft. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden [mask-image:linear-gradient(to_bottom,transparent,#000_15%)] sm:block"
      >
        <Image
          src="/bg/footer_bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.1]"
        />
      </div>

      {/* Wider than the page container: 80% of the viewport on desktop,
          the usual 16/24px gutter below that. */}
      <div className="relative mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0">
        <FooterContent
          socials={socials}
          explore={explore}
          experienceLinks={experienceLinks}
          journeyLinks={journeyLinks}
        />
      </div>
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
      {/* Band 1 — brand and newsletter */}
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Logo tone="brand" size="lg" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            {SITE.tagline} Agro and wellness journeys, personally designed by a
            local team.
          </p>

          {socials.length > 0 && (
            <ul aria-label="Social media" className="mt-7 flex flex-wrap gap-3">
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
          )}
        </div>

        <NewsletterSignup />
      </div>

      {/* Band 2 — the three ways to reach us, side by side */}
      <div className="mt-12 grid gap-6 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
        <ContactTile
          icon={<MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.5} />}
          label="WhatsApp"
          href={WHATSAPP_URL}
          value={`+${SITE.whatsappNumber}`}
          external
        />
        <ContactTile
          icon={<Phone aria-hidden="true" className="size-5" strokeWidth={1.5} />}
          label="Call us"
          href={telHref(COMPANY.phone)}
          value={COMPANY.phone}
        />
        <ContactTile
          icon={<Mail aria-hidden="true" className="size-5" strokeWidth={1.5} />}
          label="Email"
          href={`mailto:${COMPANY.email}`}
          value={COMPANY.email}
        />
      </div>

      {/* Band 3 — link columns */}
      <div className="mt-12 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1.2fr_1.2fr] lg:gap-12">
        <LinkColumn heading="Explore the site" links={explore} />
        <LinkColumn heading="Experiences" links={experienceLinks} />
        <LinkColumn heading="Journeys" links={journeyLinks} />

        <div>
          <h2 className={headingStyle}>Visit us</h2>
          <address className="mt-5 text-sm not-italic">
            <p className="flex gap-3 text-muted">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>
                <span className="block font-semibold text-ink">
                  {COMPANY.legalName}
                </span>
                {COMPANY.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </p>
          </address>

          <div className="mt-6 flex gap-3 rounded-card bg-brand-light p-4">
            <Siren
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-brand"
              strokeWidth={1.5}
            />
            <div className="text-sm">
              <p className="font-semibold text-ink">24/7 emergency line</p>
              <p className="mt-0.5 text-muted">
                For guests currently travelling with us
              </p>
              <a
                href={telHref(COMPANY.emergencyPhone)}
                className="mt-1 inline-block font-semibold text-brand underline-offset-4 hover:underline"
              >
                {COMPANY.emergencyPhone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — the legal line, with the policy pages beside it */}
      <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 text-xs text-muted lg:flex-row lg:items-center lg:justify-between">
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
      <ul className="mt-5 space-y-3">
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

/** One reach-us tile: round tinted icon, small label, the link itself. */
function ContactTile({
  icon,
  label,
  href,
  value,
  external = false,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  value: string;
  external?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-pill bg-brand-light text-brand">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs tracking-[0.16em] text-muted uppercase">
          {label}
        </span>
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={cn(
            linkStyle,
            "mt-1 block font-medium break-words text-ink hover:text-brand",
          )}
        >
          {value}
        </a>
      </span>
    </div>
  );
}
