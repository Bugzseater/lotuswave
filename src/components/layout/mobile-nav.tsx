"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

import { MAIN_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  /** `light` = white outline, for the dark glass capsule over the hero. */
  tone?: "light" | "dark";
  /** Lets the header swap to its light state while the panel is open. */
  onOpenChange?: (open: boolean) => void;
}

/**
 * The capsule's menu button and the panel it opens.
 *
 * Below `lg` this is the whole navigation — the inline nav is hidden there — so
 * it cannot go away entirely. From `lg` up the capsule shows every top-level
 * link itself, which is where the button was redundant, so it hides.
 */
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
        aria-controls="main-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex size-12 items-center justify-center rounded-pill border transition-colors duration-200 ease-out",
          tone === "light" && !open
            ? "border-white/30 text-white hover:bg-white/15 focus-visible:outline-white"
            : "border-line text-ink hover:bg-brand-light",
        )}
      >
        {open ? (
          <X className="size-5" aria-hidden />
        ) : (
          <Menu className="size-5" aria-hidden />
        )}
      </button>

      {open ? (
        <nav
          id="main-menu"
          aria-label="Main"
          className="rounded-card border-line shadow-card absolute inset-x-0 top-[calc(100%+0.75rem)] border bg-white p-2"
        >
          <ul className="grid gap-1 sm:grid-cols-2">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink hover:bg-brand-light hover:text-brand block rounded-[0.875rem] px-4 py-3 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>

                {item.children ? (
                  <ul className="mb-1 ml-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="text-muted hover:text-brand block rounded-[0.875rem] px-4 py-2 text-sm transition-colors"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>

          <Link
            href="/plan-your-trip"
            onClick={() => setOpen(false)}
            className="group bg-brand hover:bg-brand-dark mt-2 flex h-12 items-center justify-center gap-2 rounded-pill px-6 text-sm font-medium text-white transition-colors"
          >
            Plan My Journey
            <ArrowRight
              className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
