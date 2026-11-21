import type { Metadata } from "next";
import { getImageProps } from "next/image";
import { FaqAccordion } from "@/components/faq-accordion";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { SiteHeader } from "@/components/site-header";
import { faqs } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ | Cozzi",
  description: "Frequently asked questions about COZZI coffee: origin, grind, bulk orders and more.",
};

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
      <AnnouncementBar />
      {/* Figma "FAHHH": photo on the left half (full bleed), questions on the right; mobile (54910:907) stacks them. */}
      <main className="relative flex flex-1 bg-cream max-md:flex-col">
        <SiteHeader />
        <div className="relative w-1/2 max-md:aspect-[390/317.485] max-md:w-full">
          <FaqPhoto />
        </div>

        <div className="w-1/2 max-md:w-full">
          <div className="min-h-[855px] w-[640px] pt-[104px] pr-[84px] pb-[80px] pl-[58px] design-zoom max-md:min-h-0 max-md:w-[390px] max-md:pt-[39px] max-md:pr-[28.8px] max-md:pb-[76px] max-md:pl-[26.2px]">
            <h1 className="font-display text-[25px] leading-[25px] font-bold tracking-[-0.03em] text-ink uppercase max-md:w-[285px] max-md:text-[18px] max-md:leading-[16.83px]">
              Frequently asked questions
            </h1>
            <p className="mt-[11px] font-sans text-[12px] leading-[11px] font-medium tracking-[-0.03em] text-ink/75 max-md:mt-[7.4px] max-md:w-[285px] max-md:text-[17px] max-md:leading-[17px]">
              Please email us at{" "}
              <a href="mailto:info@cozzi.world" className="underline-offset-2 hover:underline">
                info@cozzi.world
              </a>{" "}
              if you have any other questions.
            </p>
            <div className="mt-[42px] max-md:mt-[28.3px]">
              <FaqAccordion items={faqs} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
