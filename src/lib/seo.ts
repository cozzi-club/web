import type { Metadata } from "next";
import { socials } from "@/content/navigation";
import type { Faq } from "@/content/faq";
import { site } from "@/lib/site";

/** Share-card size (Open Graph / X). */
export const ogSize = { width: 1200, height: 630 };

/** The default share card (app/opengraph-image.tsx). */
export const defaultShareImage = {
  url: "/opengraph-image",
  ...ogSize,
  alt: "COZZI: a clay jebena and coffee pot on a dark table, with the words Make a moment, make a ritual of it, make it yours.",
};

/** Open Graph fields every page shares. */
const openGraphBase = { siteName: site.name, locale: "en", type: "website" } as const;

/** Root layout defaults: base URL for relative links/images, the title template and the share card. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.titleSuffix, template: `%s | ${site.titleSuffix}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { ...openGraphBase, images: [defaultShareImage] },
  twitter: { card: "summary_large_image", images: [defaultShareImage] },
};

/**
 * Per-page metadata: title (run through the "| Cozzi Coffee" template unless `absolute`), meta
 * description, canonical URL and the matching Open Graph / X fields.
 *
 * A page's `openGraph` replaces its parent's rather than merging, so the default share image is
 * repeated here. `ownImage`: the route has its own opengraph-image file; leave `images` out, since
 * an `images` entry here would override that file.
 */
export function pageMetadata({
  title,
  description,
  path,
  absolute = false,
  ownImage = false,
}: {
  title: string;
  description: string;
  path: string;
  absolute?: boolean;
  ownImage?: boolean;
}): Metadata {
  const fullTitle = absolute ? title : `${title} | ${site.titleSuffix}`;
  const images = ownImage ? {} : { images: [defaultShareImage] };
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { ...openGraphBase, title: fullTitle, description, url: path, ...images },
    twitter: { card: "summary_large_image", title: fullTitle, description, ...images },
  };
}

const orgId = `${site.url}/#organization`;

/** Organization + WebSite (home page): brand name, alternate names, contact, location, socials. */
export const brandJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: site.name,
      alternateName: site.alternateNames,
      url: site.url,
      logo: `${site.url}/logo.png`,
      description: site.description,
      slogan: site.tagline,
      email: site.email,
      telephone: site.phones.map((p) => p.tel),
      address: { "@type": "PostalAddress", addressLocality: site.address.locality, addressCountry: site.address.country },
      sameAs: socials.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.titleSuffix,
      alternateName: site.alternateNames,
      url: site.url,
      inLanguage: "en",
      publisher: { "@id": orgId },
    },
  ],
};

/** FAQPage from the FAQ content: paragraphs as they are, bulleted lists as "- " lines. */
export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer.map((block) => (Array.isArray(block) ? block.map((item) => `- ${item}`).join("\n") : block)).join("\n\n"),
      },
    })),
  };
}
