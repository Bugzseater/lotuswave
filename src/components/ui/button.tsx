import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "onBrand";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  /** Default CTA — "Plan My Journey", "Design My Journey". */
  primary: "bg-brand text-white hover:bg-brand-dark",
  /** On light backgrounds — transparent with a brand hairline. */
  secondary:
    "border border-brand bg-transparent text-brand hover:bg-brand hover:text-white",
  /** On purple or over a dark image overlay — white hairline, white label. */
  onBrand:
    "border border-white/70 bg-transparent text-white hover:bg-white hover:text-brand focus-visible:outline-white",
};

const SIZES: Record<ButtonSize, string> = {
  /** Header island — compact enough to sit inside a 56–64px bar. */
  sm: "h-9 px-4 text-[12px]",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium " +
  "whitespace-nowrap transition-colors duration-200 ease-out " +
  "disabled:pointer-events-none disabled:opacity-50";

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant,
  size,
  className,
  ...props
}: StyleProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      className={buttonStyles({ variant, size, className })}
    />
  );
}

/** Same styling as `Button`, rendered as a `next/link` anchor. */
export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: StyleProps & React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link {...props} className={buttonStyles({ variant, size, className })} />
  );
}
