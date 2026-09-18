import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/** Surface container. Placeholder — real card layouts come with the page work. */
export function Card({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "bg-white border border-line rounded-card overflow-hidden shadow-card",
        className,
      )}
      {...props}
    />
  );
}

export function CardBody({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("p-6 sm:p-8", className)} {...props} />;
}
