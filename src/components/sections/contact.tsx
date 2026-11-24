import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SizedImage } from "@/components/ui/sized-image";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

// Collage art without its sun, which spins on top (`sun`: its box in % of the art).
// Figma 2026-11-24 "Group 2494" (667.88×665.07): brown block, basket and the masked jebena, rebuilt
// from the node tree (transforms, mask path, image fits); sun at 0, 99.65. No ink, so cream and brown
// pages both use it. Mobile: the same art, 348px wide (centred).
const ART = { src: "/images/contact/collage-5.png", w: 667.88, h: 665.07, sun: "top-[14.983%] left-0 h-[21.437%] w-[21.498%]" };
const MOBILE_ART = { w: 348, h: (348 * ART.h) / ART.w };

/** Collage art with its spinning sun. */
function Collage({ className }: { className?: string }) {
  const { src, w, h, sun } = ART;
  return (
    <div className={cn("relative", className)}>
      <SizedImage src={src} w={w} h={h} mobile={MOBILE_ART} />
      <div className={cn("absolute animate-[spin_40s_linear_infinite] motion-reduce:animate-none", sun)}>
        <Image src="/images/contact/sun.svg" alt="" fill unoptimized />
      </div>
    </div>
  );
}

// cream: home · espresso: other pages (/philosophy)
// coffee: /coffee — the espresso variant on desktop, cream on mobile (Figma)
const surfaces = {
  // Mobile (cream, espresso): 29.9px more on top, so the heading sits 46.9px below the section above
  // (home: the door photo; philosophy: its last image).
  cream: { section: "bg-cream max-md:pt-[calc(29.9*var(--u))]", text: "text-ink", button: "ink" },
  espresso: { section: "bg-espresso max-md:pt-[calc(29.9*var(--u))]", text: "text-cream", button: "parchment" },
  coffee: {
    section: "bg-espresso max-md:bg-cream",
    text: "text-cream max-md:text-ink",
    button: "ink-parchment",
  },
} as const;

/**
 * "Glad to have you here" call to action with the collage (Figma 2026-11-24 "Group 2508"): copy on
 * the left, the collage on the right, side by side (no sticky scroll). 48.4px below the door arch,
 * 37.9px above the footer. Mobile (Figma "MacBook Air - 8" layout): heading, the collage (its sun
 * overlapping the heading by 12.8px), "Have a coffee…" 30px below the art, "Reach out" 25.6px below that.
 */
export function Contact({ id, surface = "cream" }: { id?: string; surface?: keyof typeof surfaces }) {
  const tone = surfaces[surface];
  return (
    <Section id={id} className={cn(tone.section, "md:min-h-0! md:pt-[calc(48.4*var(--u))] md:pb-[calc(37.9*var(--u))]")}>
      <Container className="flex items-start justify-between pr-[calc(31.2*var(--u))] pl-[calc(105.5*var(--u))] max-md:flex-col max-md:items-center max-md:px-0 max-md:pt-[calc(17*var(--u))] max-md:pb-[calc(48*var(--u))]">
        {/* Figma "Frame 2566": 167.6px below the collage's top; copy 21.29px below the heading's two
            54.92px lines, button 32.96px below the copy (the button's label keeps the site's size).
            Mobile: `contents`, so heading / collage / text / button can be re-ordered. */}
        <div className="md:mt-[calc(167.6*var(--u))] max-md:contents">
          <div className={`flex w-[calc(467.1*var(--u))] flex-col items-start max-md:contents ${tone.text}`}>
            <Heading size="lg" className="md:text-[calc(54.92*var(--u))] md:leading-[calc(54.92*var(--u))] max-md:order-1 max-md:w-[calc(221*var(--u))] max-md:text-center max-md:text-[calc(35*var(--u))] max-md:leading-[calc(30*var(--u))]">
              Glad to have <br className="max-md:hidden" />
              you <br className="md:hidden" />
              here
            </Heading>
            <Text
              variant="lead"
              className="mt-[calc(21.29*var(--u))] w-[calc(410.5*var(--u))] text-[calc(33.76*var(--u))]! leading-[calc(33.76*var(--u))] max-md:order-3 max-md:mt-[calc(30*var(--u))] max-md:w-[calc(332*var(--u))] max-md:text-center max-md:text-[calc(18*var(--u))]! max-md:leading-[calc(16.2*var(--u))]"
            >
              <span className="max-md:hidden">
                Got a question about the beans or something else <br />
                on your mind?
              </span>
              <span className="md:hidden">
                Got a question about the <br />
                beans or something else <br />
                on your mind?
              </span>
            </Text>
            <ButtonLink
              href="/contact"
              tone={tone.button}
              className="mt-[calc(32.96*var(--u))] md:h-[calc(54*var(--u))] md:min-w-[calc(236.3*var(--u))] max-md:order-4 max-md:mt-[calc(25.6*var(--u))] max-md:min-w-[calc(215*var(--u))]"
            >
              <span className="max-md:hidden">Say hello</span>
              <span className="md:hidden">Reach out</span>
            </ButtonLink>
          </div>
        </div>

        {/* Mobile: the art's box has 51.9px of empty space above the sun and 69.6px below the art,
            pulled in so the sun overlaps the heading by 12.8px and the copy sits 30px below the art. */}
        <div className="shrink-0 max-md:order-2 max-md:-mt-[calc(50.7*var(--u))] max-md:-mb-[calc(69.6*var(--u))]">
          <Collage />
        </div>
      </Container>
    </Section>
  );
}
