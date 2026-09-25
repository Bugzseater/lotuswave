import { cn } from "@/lib/utils";

/**
 * The small uppercase label over each About section heading, with a hairline
 * lead-in — the same treatment as the home page sections. `onBrand` switches
 * it to white for purple backgrounds.
 */
export function Eyebrow({
  children,
  centered = false,
  onBrand = false,
  className,
}: {
  children: React.ReactNode;
  centered?: boolean;
  onBrand?: boolean;
  className?: string;
}) {
  const line = cn("h-px w-10", onBrand ? "bg-white/70" : "bg-brand");

  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase",
        onBrand ? "text-white" : "text-brand",
        centered && "justify-center",
        className,
      )}
    >
      <span aria-hidden="true" className={line} />
      {children}
      {centered && <span aria-hidden="true" className={line} />}
    </p>
  );
}
