/**
 * Frosted-glass card surface for the article page: a white-to-lavender
 * gradient with a hairline purple edge and a soft purple shadow. Pair it with
 * `<GlassSheen />` as the card's first child for the light catching the glass.
 */
export const GLASS =
  "relative isolate overflow-hidden rounded-card border border-brand/10 bg-linear-to-br from-white via-brand-light/60 to-brand-light shadow-xl shadow-brand/10";

/** A white sheen across the top half and a purple glow in the top-right corner. */
export function GlassSheen() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 -z-10 size-56 rounded-full bg-brand/15 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 bg-linear-to-b from-white/80 to-transparent"
      />
    </>
  );
}
