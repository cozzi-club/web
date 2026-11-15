import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SizedImage } from "@/components/ui/sized-image";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

// Collage art: grey stamp and handwriting for light surfaces, white for dark ones (Figma 2026-11-08).
const collages = {
  light: "/images/contact/collage-no-sun-2.png",
  dark: "/images/contact/collage-no-sun-dark.png",
};

// cream: home · espresso: other pages (/about)
// coffee: /coffee — the espresso variant on desktop, cream on mobile (Figma)
// `collage`: [desktop, mobile] art.
const surfaces = {
  cream: { section: "bg-cream", text: "text-ink", button: "ink", collage: ["light", "light"] },
  espresso: { section: "bg-espresso", text: "text-cream", button: "parchment", collage: ["dark", "dark"] },
  coffee: {
    section: "bg-espresso max-md:bg-cream",
    text: "text-cream max-md:text-ink",
    button: "ink-parchment",
    collage: ["dark", "light"],
  },
} as const;

const COLLAGE = { w: 541.38, h: 562.37, mobile: { w: 264, h: 274.24 } };

/**
 * "Stay on the same page" call to action with the collage (Figma 2026-11-08). md+: the heading lines
 * up with the top of the brown block behind the mesob, and the copy sticks below the top of the
 * screen while the taller collage scrolls past, until their bottoms meet.
 */
export function Contact({ id, surface = "cream" }: { id?: string; surface?: keyof typeof surfaces }) {
  const tone = surfaces[surface];
  const [desktopArt, mobileArt] = tone.collage;
  return (
    <Section id={id} className={cn(tone.section, "md:sticky-split md:[--split-top:98.69px] md:[--split-bottom:90.2px]")}>
      <Container className="flex items-start justify-between pr-[133.32px] pl-[132.97px] max-md:flex-col max-md:items-center max-md:px-0 max-md:pt-[17px] max-md:pb-[48px]">
        {/* Figma scales this group by 1.0244 (60px heading → 61.46px, button 210 → 215px); 58.77px
            down so the heading's top meets the brown block's. Mobile: `contents`, so heading /
            collage / text / button can be re-ordered. */}
        <div className="md:sticky md:top-[calc(var(--split-top)*var(--zoom))] md:mt-[58.77px] max-md:contents">
          <div className={`flex w-[379px] flex-col items-start gap-8 zoom-[1.0244] max-md:contents ${tone.text}`}>
            <Heading size="lg" className="md:text-[57px] md:leading-[52px] max-md:order-1 max-md:text-center max-md:text-[35px] max-md:leading-[30px]">
              Stay on the
              <br />
              same page
            </Heading>
            <Text
              variant="lead"
              className="w-[365px] text-[28px]! max-md:order-3 max-md:mt-[36px] max-md:w-[332px] max-md:text-center max-md:text-[18px]! max-md:leading-[16.2px]"
            >
              Have a coffee, product, or <br className="md:hidden" />
              collaboration in mind? <br className="md:hidden" />
              Tell us&nbsp;about it.
            </Text>
            <ButtonLink
              href="/contact"
              tone={tone.button}
              className="max-md:order-4 max-md:mt-[39px] max-md:min-w-[215px]"
            >
              Reach out
            </ButtonLink>
          </div>
        </div>

        {/* Collage with the sun cut out; the sun (Figma vector at 19.71, 0 — 120.18×119.33) spins
            slowly on top, sized in % of the collage box (so the scroll padding lives on the outer div). */}
        <div className="shrink-0 max-md:order-2">
          <div className="relative">
            {desktopArt === mobileArt ? (
              <SizedImage src={collages[desktopArt]} {...COLLAGE} />
            ) : (
              <>
                <SizedImage src={collages[desktopArt]} {...COLLAGE} className="max-md:hidden" />
                <SizedImage src={collages[mobileArt]} {...COLLAGE} className="md:hidden" />
              </>
            )}
            <div className="absolute top-0 left-[3.641%] h-[21.219%] w-[22.198%] animate-[spin_40s_linear_infinite] motion-reduce:animate-none">
              <Image src="/images/contact/sun.svg" alt="" fill unoptimized />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
