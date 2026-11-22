import { getImageProps } from "next/image";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { SiteHeader } from "@/components/site-header";
import { faqs } from "@/content/faq";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Coffee FAQ",
  description:
    "Answers about COZZI: our mission, coffee from Jimma, Ethiopia, small-batch roasting, whole beans, brewing methods and the story of the founder.",
  path: "/faq",
});

const ALT = "A clay jebena on a stone plinth in a sunlit concrete room";

/** Different crops per breakpoint (Figma desktop portrait vs. mobile still life) — one <picture>, one download. */
function FaqPhoto() {
  const { props: desktop } = getImageProps({ src: "/images/faq/portrait.jpg", alt: ALT, fill: true, sizes: "50vw" });
  const { props: mobile } = getImageProps({ src: "/images/faq/still-life-mobile.jpg", alt: ALT, fill: true, sizes: "100vw" });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes={desktop.sizes} />
      <img {...mobile} alt={ALT} fetchPriority="high" className="object-cover" />
    </picture>
  );
}

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <AnnouncementBar />
      {/* Figma "FAHHH": photo on the left half (full bleed), questions on the right; mobile (54910:907) stacks them. */}
      <main className="relative flex flex-1 bg-cream max-md:flex-col">
        <SiteHeader />
        <div className="relative w-1/2 max-md:aspect-[390/317.485] max-md:w-full">
          <FaqPhoto />
        </div>

        <div className="w-1/2 max-md:w-full">
          <div className="min-h-[calc(855*var(--u))] w-[calc(640*var(--u))] pt-[calc(104*var(--u))] pr-[calc(84*var(--u))] pb-[calc(80*var(--u))] pl-[calc(58*var(--u))] text-body max-md:min-h-0 max-md:w-[calc(390*var(--u))] max-md:pt-[calc(39*var(--u))] max-md:pr-[calc(28.8*var(--u))] max-md:pb-[calc(76*var(--u))] max-md:pl-[calc(26.2*var(--u))]">
            <h1 className="font-display text-[calc(25*var(--u))] leading-[calc(25*var(--u))] font-bold tracking-[-0.03em] text-ink uppercase max-md:w-[calc(285*var(--u))] max-md:text-[calc(18*var(--u))] max-md:leading-[calc(16.83*var(--u))]">
              Frequently asked questions
            </h1>
            <p className="mt-[calc(11*var(--u))] font-sans text-[calc(12*var(--u))] leading-[calc(11*var(--u))] font-medium tracking-[-0.03em] text-ink/75 max-md:mt-[calc(7.4*var(--u))] max-md:w-[calc(285*var(--u))] max-md:text-[calc(17*var(--u))] max-md:leading-[calc(17*var(--u))]">
              Please email us at{" "}
              <a href={`mailto:${site.email}`} className="underline-offset-2 hover:underline">
                {site.email}
              </a>{" "}
              if you have any other questions.
            </p>
            <div className="mt-[calc(42*var(--u))] max-md:mt-[calc(28.3*var(--u))]">
              <FaqAccordion items={faqs} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
