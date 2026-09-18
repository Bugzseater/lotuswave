"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Container } from "@/components/ui/container";
import { MAIN_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Matches the header's own height — the spacer and `scroll-mt-18` track it. */
const HEADER_HEIGHT = "h-18";

/** The lockup renders the name, so the link only needs it for assistive tech. */
const SITE_NAME = "LotusWave Lanka Tours";

interface HeaderProps {
  /** Shown beside the CTA on desktop. From `settings.contact.phone`. */
  phone: string;
}

/**
 * Site header.
 *
 * On the home page it floats over the hero with no background of its own, so
 * the full-height still starts at the top of the viewport. It turns solid as
 * soon as you scroll past the fold, while the mobile panel is open, and on
 * every other route — otherwise white-on-white nav links would vanish.
 *
 * Note this is a deliberate departure from the "header: white background, ink
 * nav links" rule in CLAUDE.md, which predates the full-bleed hero.
 */
export function Header({ phone }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const overHero = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); // Catch a restored scroll position on back-navigation.
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const isActive = useCallback(
    (href: string) => pathname === href || pathname.startsWith(`${href}/`),
    [pathname],
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out",
          overHero
            ? "bg-transparent"
            : "bg-white/90 border-line border-b backdrop-blur",
        )}
      >
        <Container
          className={cn(
            "grid grid-cols-[auto_1fr] items-center gap-6 lg:grid-cols-[1fr_auto_1fr]",
            HEADER_HEIGHT,
          )}
        >
          <Link
            href="/"
            aria-label={`${SITE_NAME} — home`}
            className={cn(
              "transition-colors duration-300",
              overHero ? "text-white focus-visible:outline-white" : "text-brand",
            )}
          >
            <Logo tone="both" onDark={overHero} priority />
          </Link>

          <nav aria-label="Main" className="hidden justify-self-center lg:block">
            <ul className="flex items-center gap-8 text-sm">
              {MAIN_NAV.map((item) => {
                const active = isActive(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "transition-colors duration-200",
                        overHero
                          ? "hover:text-white focus-visible:outline-white"
                          : "hover:text-brand",
                        overHero && active && "font-medium text-white",
                        overHero && !active && "text-white/80",
                        !overHero && active && "text-brand font-medium",
                        !overHero && !active && "text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-2 lg:gap-5">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className={cn(
                "hidden text-sm transition-colors duration-200 lg:inline",
                overHero
                  ? "text-white/80 hover:text-white focus-visible:outline-white"
                  : "text-muted hover:text-brand",
              )}
            >
              {phone}
            </a>

            <Link
              href="/plan-your-trip"
              className={cn(
                "hidden h-11 items-center rounded-pill px-6 text-sm font-medium transition-colors duration-200 sm:inline-flex",
                // On the purple top of the hero a brand-filled pill disappears,
                // so it inverts — the same move the closing CTA makes.
                overHero
                  ? "text-brand hover:bg-brand-light bg-white focus-visible:outline-white"
                  : "bg-brand hover:bg-brand-dark text-white",
              )}
            >
              Plan My Journey
            </Link>

            <MobileNav
              tone={overHero ? "light" : "dark"}
              onOpenChange={setMenuOpen}
            />
          </div>
        </Container>
      </header>

      {/* The header is out of flow, so every page but the home hero needs the
          space back at the top. */}
      {isHome ? null : <div aria-hidden className={HEADER_HEIGHT} />}
    </>
  );
}
