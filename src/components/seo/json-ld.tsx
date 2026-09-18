import type { JsonLdSchema } from "@/lib/seo/schema";

/**
 * Renders structured data. Server component — the JSON is built on the server
 * and never reaches the client bundle.
 */
export function JsonLd({ schema }: { schema: JsonLdSchema | JsonLdSchema[] }) {
  const payload = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {payload.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Values come from our own data layer, never from user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
