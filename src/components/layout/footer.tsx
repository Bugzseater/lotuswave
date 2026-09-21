import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, Siren } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";

const linkStyle =
  "text-sm text-white/80 transition-colors duration-200 ease-out hover:text-white";

/**
 * Site footer — charcoal background, white type, with the content on a
 * frosted-glass card whose top edge is a wave (`.glass-wave` in globals.css).
 *
 * Glass only reads when there is something behind it to blur, so the
 * charcoal backdrop carries two soft, warm glows. Four columns on desktop: brand,
 * explore, contact, policies; stacked on phones. The emergency line gets its
 * own tinted card so a guest mid-trip finds it fast.
 *
 * Contact details live in `COMPANY` (constants). The SLTDA number and social
 * links render only once they have real values.
 */
export function Footer() {
  const socials = SOCIAL_LINKS.filter((link) => link.href);
  const explore = NAV_LINKS.filter((link) => link.href !== "/");

  return (
    <footer className="relative isolate overflow-hidden bg-charcoal pt-12 pb-6 text-white sm:pt-16 sm:pb-8 [&_a:focus-visible]:outline-white">
      {/* Warm, neutral glows for the glass to blur — no purple on charcoal. */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 -z-10 size-[36rem] rounded-pill bg-warm-sand/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 -bottom-48 -z-10 size-[32rem] rounded-pill bg-white/10 blur-3xl"
      />
      {/* Holds the top edge at flat charcoal across the full width, so the
          sand glow cannot lighten the seam with the section above. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-charcoal to-transparent"
      />

      {/* Wider than the page container: 80% of the viewport on desktop,
          the usual 16/24px gutter below that. */}
      <div className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0">
        <div className="relative">
          <div className="glass-wave rounded-b-card border-x border-b border-white/15 bg-white/[0.07] px-6 pt-20 pb-6 backdrop-blur-xl sm:px-10 sm:pt-24 lg:px-12 lg:pt-28">
            <FooterContent socials={socials} explore={explore} />
          </div>

          {/* Light catching the wave crest — same curve as the mask. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-0 h-12 w-full fill-none stroke-white/35 lg:h-[4.5rem]"
          >
            <path
              d="M1440 46c-150 34-300 44-470 22S690 12 520 28 210 92 0 66"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </footer>
  );
}

function FooterContent({
  socials,
  explore,
}: {
  socials: readonly NavLink[];
  explore: readonly NavLink[];
}) {
  return (
    <>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.2fr_1fr] lg:gap-10">
          {/* Brand */}
          <div>
            <Logo tone="light" size="lg" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/80">
              {SITE.tagline} Agro and wellness journeys, personally designed by
              a local team.
            </p>
            <ButtonLink
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="onBrand"
              className="mt-6"
            >
              <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />
              WhatsApp Us
            </ButtonLink>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-white uppercase">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkStyle}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-white uppercase">
              Contact
            </h2>
            <address className="mt-5 space-y-4 text-sm not-italic">
              <p className="flex gap-3 text-white/80">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-white" />
                <span>
                  <span className="block font-semibold text-white">{COMPANY.legalName}</span>
                  {COMPANY.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
              <p className="flex gap-3">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-white" />
                <a href={telHref(COMPANY.phone)} className={linkStyle}>
                  {COMPANY.phone}
                </a>
              </p>
              <p className="flex gap-3">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-white" />
                <a href={`mailto:${COMPANY.email}`} className={cn(linkStyle, "break-all")}>
                  {COMPANY.email}
                </a>
              </p>
              <p className="flex gap-3">
                <MessageCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-white" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkStyle}
                >
                  WhatsApp +{SITE.whatsappNumber}
                </a>
              </p>
            </address>

            <div className="mt-6 flex gap-3 rounded-card bg-white/10 p-4 ring-1 ring-white/20">
              <Siren aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-white" strokeWidth={1.5} />
              <div className="text-sm">
                <p className="font-semibold text-white">24/7 emergency line</p>
                <p className="mt-0.5 text-white/80">For guests currently travelling with us</p>
                <a
                  href={telHref(COMPANY.emergencyPhone)}
                  className="mt-1 inline-block font-semibold text-white underline-offset-4 hover:underline"
                >
                  {COMPANY.emergencyPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Policies */}
          <nav aria-label="Policies">
            <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-white uppercase">
              Policies
            </h2>
            <ul className="mt-5 space-y-3">
              {POLICY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkStyle}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/20 pt-8 text-xs text-white/70 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <p>
              &copy; {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
            </p>
            {COMPANY.sltdaRegistration && (
              <p>
                Registered with the Sri Lanka Tourism Development Authority — Reg. No.{" "}
                {COMPANY.sltdaRegistration}
              </p>
            )}
          </div>

          {socials.length > 0 && (
            <ul aria-label="Social media" className="flex flex-wrap gap-2">
              {socials.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center rounded-pill border border-white/30 px-4 text-xs font-medium text-white transition-colors duration-200 ease-out hover:bg-white hover:text-charcoal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
    </>
  );
}
