"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

/** Full-screen brand panel for viewports below the desktop nav breakpoint. */
export function MobileNav({ open, onClose, pathname }: MobileNavProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-nav"
      hidden={!open}
      className="fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-xl xl:hidden"
    >
      <div className="flex h-full flex-col px-4 pt-24 pb-10 sm:px-6">
        <nav aria-label="Main" className="flex-1 overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block py-3 font-display text-3xl transition-opacity duration-200 ease-out focus-visible:outline-white",
                      active ? "text-white" : "text-white/70 hover:text-white",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          <ButtonLink href="/plan-your-trip" size="lg" onClick={onClose}>
            Plan My Journey
          </ButtonLink>
          <ButtonLink
            href={WHATSAPP_URL}
            variant="onBrand"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            WhatsApp Us
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
