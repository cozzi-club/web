/**
 * Structured data for search engines (Next's JSON-LD guide). Inert data, not a script that runs:
 * the browser never executes `application/ld+json`. `<` is escaped so content can't close the tag.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
