import { cn } from "@/lib/utils";

type SectionProps = React.ComponentPropsWithoutRef<"section">;

/** Owns the vertical rhythm. Every page section breathes by the same amount. */
export function Section({ className, ...props }: SectionProps) {
  return <section className={cn("py-16 sm:py-24 lg:py-32", className)} {...props} />;
}
