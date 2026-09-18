"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { MAIN_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  /** `light` = white trigger, for the transparent header over the hero. */
  tone?: "light" | "dark";
  /** Lets the header drop its transparency while the panel is open. */
  onOpenChange?: (open: boolean) => void;
}

/** Placeholder mobile navigation — open/close only, no transitions yet. */
export function MobileNav({ tone = "dark", onOpenChange }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex size-11 items-center justify-center transition-colors duration-200",
          tone === "light" && !open
            ? "text-white focus-visible:outline-white"
            : "text-ink",
        )}
      >
        {open ? <X aria-hidden /> : <Menu aria-hidden />}
      </button>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="bg-white border-line absolute inset-x-0 top-full border-t"
        >
          <ul className="flex flex-col p-4">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink hover:text-brand block py-3 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-line border-t p-4">
            <Link
              href="/plan-your-trip"
              onClick={() => setOpen(false)}
              className="bg-brand hover:bg-brand-dark flex h-11 items-center justify-center rounded-pill px-6 text-sm font-medium text-white transition-colors"
            >
              Plan My Journey
            </Link>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
