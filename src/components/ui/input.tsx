import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

const FIELD_CLASSES =
  "w-full rounded-card border border-line bg-white px-4 py-3 text-base text-ink " +
  "placeholder:text-muted focus-visible:border-brand transition-colors";

export function Input({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">) {
  return <input className={cn(FIELD_CLASSES, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea className={cn(FIELD_CLASSES, "min-h-32", className)} {...props} />
  );
}

export function Label({
  className,
  ...props
}: ComponentPropsWithoutRef<"label">) {
  return (
    <label
      className={cn("block text-sm font-medium text-ink", className)}
      {...props}
    />
  );
}
