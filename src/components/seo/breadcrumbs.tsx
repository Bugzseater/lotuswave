import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, type BreadcrumbEntry } from "@/lib/seo/schema";

/** Visible breadcrumbs plus the matching BreadcrumbList structured data. */
export function Breadcrumbs({ entries }: { entries: BreadcrumbEntry[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {entries.map((entry, index) => {
            const isLast = index === entries.length - 1;
            return (
              <li key={entry.path} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page">{entry.name}</span>
                ) : (
                  <>
                    <Link href={entry.path}>{entry.name}</Link>
                    <span aria-hidden>/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd schema={breadcrumbSchema(entries)} />
    </>
  );
}
