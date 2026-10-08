import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Breadcrumb trail. Every crumb but the last is a link; the last is the
 * current page. `onBrand` switches to white for dark image heroes.
 */
export function Breadcrumbs({
  items,
  onBrand = false,
  className,
}: {
  items: Crumb[];
  onBrand?: boolean;
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm", onBrand ? "text-white/80" : "text-muted")}>
        {items.map(({ label, href }, i) => {
          const last = i === items.length - 1;
          return (
            <li key={label} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight
                  aria-hidden="true"
                  className={cn("size-4", onBrand ? "text-white/60" : "text-muted/70")}
                />
              )}
              {last || !href ? (
                <span
                  aria-current={last ? "page" : undefined}
                  className={cn(last && (onBrand ? "font-medium text-white" : "font-medium text-ink"))}
                >
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className={cn(
                    "underline-offset-4 transition-colors duration-200 ease-out hover:underline",
                    onBrand ? "hover:text-white focus-visible:outline-white" : "hover:text-brand",
                  )}
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
