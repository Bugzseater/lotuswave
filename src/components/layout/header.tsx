"use client";

import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MAIN_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Capsule height plus the padding above it. Every page but the home hero
 * reserves this much space, and `scroll-mt-24` on anchor targets matches it.
 */
const HEADER_SPACE = "h-24";

/** The lockup renders the name, so the link only needs it for assistive tech. */
const SITE_NAME = "LotusWave Lanka Tours";

interface HeaderProps {
  /** Shown beside the CTA on wide screens. From `settings.contact.phone`. */
  phone: string;
}

/**
 * Site header — a floating glass capsule rather than a full-width bar.
 *
 * On the home page it rides over the hero as dark glass with white type, so the
 * full-height still starts at the very top of the viewport. It flips to light
 * glass with ink type as soon as you scroll past the fold, while the menu panel
 * is open, and on every other route — otherwise white-on-white would vanish.
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
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 lg:px-6 lg:pt-5">
        <div
          className={cn(
            "relative mx-auto flex h-16 max-w-[90rem] items-center gap-4 rounded-pill border py-2 pr-2 pl-4 backdrop-blur-md transition-colors duration-300 ease-out sm:pl-5 lg:gap-6 lg:pr-3 lg:pl-6",
            overHero
              ? "border-white/20 bg-white/10 text-white"
              : "border-line bg-white/85 text-ink shadow-card",
          )}
        >
          <Link
            href="/"
            aria-label={`${SITE_NAME} — home`}
            className={cn(
              "shrink-0 transition-colors duration-300",
              overHero ? "text-white focus-visible:outline-white" : "text-brand",
            )}
          >
            <Logo tone="both" onDark={overHero} priority />
          </Link>

          <nav aria-label="Main" className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-6 text-sm whitespace-nowrap xl:gap-8">
              {MAIN_NAV.map((item) => {
                const active = isActive(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-block py-1 transition-colors duration-200",
                        overHero
                          ? "hover:text-white focus-visible:outline-white"
                          : "hover:text-brand",
                        overHero && active && "font-medium text-white",
                        overHero && !active && "text-white/75",
                        !overHero && active && "text-brand font-medium",
                        !overHero && !active && "text-ink",
                      )}
                    >
                      {item.label}
                      {active ? (
                        <span
                          aria-hidden
                          className={cn(
                            "absolute -bottom-1.5 left-1/2 size-1.5 -translate-x-1/2 rounded-pill",
                            // Brand purple is too dark to read on the glass.
                            overHero ? "bg-white" : "bg-brand",
                          )}
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0 lg:gap-4">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className={cn(
                // Only from xl — below that the nav and the CTA need the room.
                "hidden items-center gap-2 text-sm whitespace-nowrap transition-colors duration-200 xl:inline-flex",
                overHero
                  ? "text-white/80 hover:text-white focus-visible:outline-white"
                  : "text-muted hover:text-brand",
              )}
            >
              <Phone className="size-4 shrink-0" aria-hidden />
              {phone}
            </a>

            <Link
              href="/plan-your-trip"
              // The filled brand pill works in both states: over the hero it
              // sits on darkened glass, not on the bright image itself.
              className={cn(
                "group bg-brand hover:bg-brand-dark hidden h-12 items-center gap-2 rounded-pill px-6 text-sm font-medium whitespace-nowrap text-white transition-colors duration-200 sm:inline-flex",
                overHero && "focus-visible:outline-white",
              )}
            >
              Plan My Journey
              <ArrowRight
                className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                aria-hidden
              />
            </Link>

            <MobileNav
              tone={overHero ? "light" : "dark"}
              onOpenChange={setMenuOpen}
            />
          </div>
        </div>
      </header>

      {/* The header is out of flow, so every page but the home hero needs the
          space back at the top. */}
      {isHome ? null : <div aria-hidden className={HEADER_SPACE} />}
    </>
  );
}
