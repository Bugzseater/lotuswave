import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";
import { FOOTER_LEGAL_NAV, MAIN_NAV } from "@/lib/constants";
import { getSettings } from "@/lib/data";

/** Placeholder footer — structure only, styling arrives with the page work. */
export async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="bg-brand text-white mt-auto">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* White-on-purple, so the light mark. */}
          <Logo tone="light" />
          <p className="mt-4 text-sm opacity-80">{settings.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="space-y-2 text-sm">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <ul className="space-y-2 text-sm">
            {FOOTER_LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="space-y-2 text-sm not-italic">
          {settings.contact.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="block">
            {settings.contact.city}, {settings.contact.country}
          </span>
          <a href={`mailto:${settings.contact.email}`} className="block">
            {settings.contact.email}
          </a>
          <a href={`tel:${settings.contact.phone}`} className="block">
            {settings.contact.phone}
          </a>
        </address>
      </Container>

      <Container className="border-t border-white/15 py-6 text-xs opacity-70">
        © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
      </Container>
    </footer>
  );
}
