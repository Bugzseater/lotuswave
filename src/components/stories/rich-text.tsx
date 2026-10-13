import { Fragment } from "react";
import Link from "next/link";

/** `[label](href)` or `**bold**`. */
const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

/**
 * Article text with its inline markup turned into elements: `[label](/path)`
 * becomes a brand link — internal paths through `next/link`, anything else
 * opening in a new tab — and `**text**` becomes `<strong>`. Nothing else is
 * parsed, so the text can never inject markup.
 */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(TOKEN)) {
    const [whole, label, href, bold] = match;
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));

    if (bold) {
      parts.push(
        <strong key={index} className="font-semibold text-ink">
          {bold}
        </strong>,
      );
    } else if (href.startsWith("/")) {
      parts.push(
        <Link key={index} href={href} className={LINK}>
          {label}
        </Link>,
      );
    } else {
      parts.push(
        <a key={index} href={href} target="_blank" rel="noopener noreferrer" className={LINK}>
          {label}
        </a>,
      );
    }
    last = index + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return <Fragment>{parts}</Fragment>;
}

const LINK =
  "font-medium text-brand underline decoration-brand/30 underline-offset-4 transition-colors duration-200 ease-out hover:decoration-brand";
