import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Breadcrumb trail for light backgrounds. Every crumb but the last is a link;
 * the last is the current page.
 */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {items.map(({ label, href }, i) => {
          const last = i === items.length - 1;
          return (
            <li key={label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight aria-hidden="true" className="size-4 text-muted/70" />}
              {last || !href ? (
                <span aria-current={last ? "page" : undefined} className={cn(last && "font-medium text-ink")}>
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="transition-colors duration-200 ease-out hover:text-brand hover:underline underline-offset-4"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
