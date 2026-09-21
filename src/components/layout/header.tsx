"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * One glass pill carries the logo, the navigation and the calls to action.
 * The pill starts transparent
 * with white type over the hero, then settles into white glass with ink type
 * once the page scrolls past the fold.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // While the panel is open the islands sit on brand-dark, so keep it light.
  const light = !scrolled || menuOpen;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <Container className="max-w-[80rem] pt-3 sm:pt-5">
          <div
            className={cn(
              "flex h-14 items-center justify-between gap-5 rounded-pill border pr-2 pl-4 sm:h-16 sm:pr-2.5 sm:pl-6",
              "backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 ease-out",
              light
                ? "border-white/20 bg-white/10"
                : "border-line bg-white/80 shadow-header",
            )}
          >
            <Logo tone={light ? "light" : "brand"} />

            <nav aria-label="Main" className="hidden xl:block">
              <ul className="flex items-center gap-x-4 2xl:gap-x-6">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "relative block py-2 text-[12px] font-medium whitespace-nowrap",
                          "transition-colors duration-200 ease-out",
                          "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left",
                          "after:scale-x-0 after:transition-transform after:duration-200 after:ease-out",
                          "hover:after:scale-x-100",
                          light
                            ? "text-white/85 after:bg-white hover:text-white focus-visible:outline-white"
                            : "text-ink after:bg-brand hover:text-brand",
                          active &&
                            (light
                              ? "text-white after:scale-x-100"
                              : "text-brand after:scale-x-100"),
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <ButtonLink
                href={WHATSAPP_URL}
                variant={light ? "onBrand" : "secondary"}
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex"
              >
                WhatsApp Us
              </ButtonLink>
              <ButtonLink
                href="/plan-your-trip"
                size="sm"
                className="hidden sm:inline-flex"
              >
                Plan My Journey
              </ButtonLink>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-pill transition-colors duration-200 ease-out xl:hidden",
                  light
                    ? "text-white hover:bg-white/15 focus-visible:outline-white"
                    : "text-ink hover:bg-brand-light",
                )}
              >
                {menuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileNav open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
