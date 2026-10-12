import { ChevronDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A native `<details>` fold — no client JavaScript, keyboard-accessible.
 * `heading` can be any node, so a caller can put a real heading element in
 * the summary when the fold's title belongs in the page outline.
 */
export function Disclosure({
  icon: Icon,
  heading,
  open = false,
  className,
  children,
}: {
  icon?: LucideIcon;
  heading: React.ReactNode;
  open?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <details open={open} className={cn("group", className)}>
      <summary className="flex cursor-pointer list-none items-center gap-3 py-4 text-base font-medium text-ink transition-colors duration-200 ease-out hover:text-brand [&::-webkit-details-marker]:hidden">
        {Icon && <Icon aria-hidden="true" className="size-5 shrink-0 text-brand" strokeWidth={1.5} />}
        <span className="flex-1">{heading}</span>
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-180"
        />
      </summary>
      <div className={cn("pb-5", Icon && "pl-8")}>{children}</div>
    </details>
  );
}
