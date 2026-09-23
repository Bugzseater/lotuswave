/**
 * Brand glyphs for the footer's social row. lucide-react no longer ships brand
 * marks, so these are minimal inline paths drawn on a 24px grid in
 * `currentColor` — nothing here carries a palette colour of its own.
 *
 * Keyed by the `label` used in `SOCIAL_LINKS`.
 */

type GlyphProps = { className?: string };

const Facebook = ({ className }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.62A22 22 0 0 0 14.3 3.5c-2.4 0-4 1.46-4 4.14V9.9H7.6V13h2.7v8Z" />
  </svg>
);

const Instagram = ({ className }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 4.6c2.4 0 2.69.01 3.64.05.88.04 1.35.19 1.67.31.42.16.72.36 1.03.67.31.31.51.61.67 1.03.12.32.27.79.31 1.67.04.95.05 1.24.05 3.64s-.01 2.69-.05 3.64c-.04.88-.19 1.35-.31 1.67-.16.42-.36.72-.67 1.03-.31.31-.61.51-1.03.67-.32.12-.79.27-1.67.31-.95.04-1.24.05-3.64.05s-2.69-.01-3.64-.05c-.88-.04-1.35-.19-1.67-.31a2.78 2.78 0 0 1-1.03-.67 2.78 2.78 0 0 1-.67-1.03c-.12-.32-.27-.79-.31-1.67C4.61 14.69 4.6 14.4 4.6 12s.01-2.69.05-3.64c.04-.88.19-1.35.31-1.67.16-.42.36-.72.67-1.03.31-.31.61-.51 1.03-.67.32-.12.79-.27 1.67-.31C9.31 4.61 9.6 4.6 12 4.6ZM12 3c-2.44 0-2.75.01-3.71.05-.96.05-1.61.2-2.19.42-.6.23-1.1.54-1.6 1.04-.5.5-.81 1-1.04 1.6-.22.58-.37 1.23-.42 2.19C3.01 9.25 3 9.56 3 12s.01 2.75.05 3.71c.05.96.2 1.61.42 2.19.23.6.54 1.1 1.04 1.6.5.5 1 .81 1.6 1.04.58.22 1.23.37 2.19.42.96.04 1.27.05 3.71.05s2.75-.01 3.71-.05c.96-.05 1.61-.2 2.19-.42.6-.23 1.1-.54 1.6-1.04.5-.5.81-1 1.04-1.6.22-.58.37-1.23.42-2.19.04-.96.05-1.27.05-3.71s-.01-2.75-.05-3.71c-.05-.96-.2-1.61-.42-2.19a4.4 4.4 0 0 0-1.04-1.6c-.5-.5-1-.81-1.6-1.04-.58-.22-1.23-.37-2.19-.42C14.75 3.01 14.44 3 12 3Zm0 4.38a4.62 4.62 0 1 0 0 9.24 4.62 4.62 0 0 0 0-9.24ZM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.88-7.8a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0Z" />
  </svg>
);

const YouTube = ({ className }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.28 5 12 5 12 5s-6.28 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.72 19 12 19 12 19s6.28 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10.2 14.85v-5.7L15.1 12Z" />
  </svg>
);

const TikTok = ({ className }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M16.3 3h-2.72v11.05a2.24 2.24 0 1 1-1.6-2.15V9.13a5.06 5.06 0 1 0 4.32 5v-5.6a5.9 5.9 0 0 0 3.45 1.1V6.86A3.42 3.42 0 0 1 16.3 3Z" />
  </svg>
);

export const SOCIAL_ICONS: Record<string, (props: GlyphProps) => React.ReactElement> = {
  Facebook,
  Instagram,
  YouTube,
  TikTok,
};
