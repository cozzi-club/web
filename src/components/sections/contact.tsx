import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SizedImage } from "@/components/ui/sized-image";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

// Collage art without its sun, which spins on top (`sun`: its box in % of the art).
// light: black stamp and handwriting (Figma 2026-11-20 "Group 2494", 521.66×549.3, sun at 0, 0).
// dark: white stamp and handwriting (Figma 2026-11-08, 541.38×562.37, sun at 19.71, 0).
// Mobile keeps the 2026-11-08 scale (264px for the 541.38px art).
const collages = {
  light: {
    src: "/images/contact/collage-no-sun-3.png",
    w: 521.66,
    h: 549.3,
    mobile: { w: 254.38, h: 267.86 },
    sun: "top-0 left-0 h-[21.724%] w-[23.038%]",
  },
  dark: {
    src: "/images/contact/collage-no-sun-dark.png",
    w: 541.38,
    h: 562.37,
    mobile: { w: 264, h: 274.24 },
    sun: "top-0 left-[3.641%] h-[21.219%] w-[22.198%]",
  },
};

/** Collage art with its spinning sun. */
function Collage({ art, className }: { art: keyof typeof collages; className?: string }) {
  const { src, sun, ...size } = collages[art];
  return (
    <div className={cn("relative", className)}>
      <SizedImage src={src} {...size} />
      <div className={cn("absolute animate-[spin_40s_linear_infinite] motion-reduce:animate-none", sun)}>
        <Image src="/images/contact/sun.svg" alt="" fill unoptimized />
      </div>
    </div>
  );
}

// cream: home · espresso: other pages (/philosophy)
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

/**
 * "Glad to have you here" call to action with the collage (Figma 2026-11-20). md+: the heading lines
 * up with the top of the brown block behind the mesob, and the copy sticks below the top of the
 * screen while the taller collage scrolls past, until their bottoms meet.
 */
export function Contact({ id, surface = "cream" }: { id?: string; surface?: keyof typeof surfaces }) {
  const tone = surfaces[surface];
  const [desktopArt, mobileArt] = tone.collage;
  return (
    <Section id={id} className={cn(tone.section, "md:sticky-split md:[--split-top:98.69px] md:[--split-bottom:90.2px]")}>
      <Container className="flex items-start justify-between pr-[133.32px] pl-[136.77px] max-md:flex-col max-md:items-center max-md:px-0 max-md:pt-[17px] max-md:pb-[48px]">
        {/* Figma "Frame 2566": 59.67px down so the heading's top meets the brown block's; copy
            19.38px below the heading's two 50px lines, button 30px below the copy. Mobile:
            `contents`, so heading / collage / text / button can be re-ordered. */}
        <div className="md:sticky md:top-[calc(var(--split-top)*var(--zoom))] md:mt-[59.67px] max-md:contents">
          <div className={`flex w-[425.24px] flex-col items-start max-md:contents ${tone.text}`}>
            <Heading size="lg" className="md:text-[50px] md:leading-[50px] max-md:order-1 max-md:w-[221px] max-md:text-center max-md:text-[35px] max-md:leading-[30px]">
              Glad to have <br className="max-md:hidden" />
              you <br className="md:hidden" />
              here
            </Heading>
            <Text
              variant="lead"
              className="mt-[19.38px] w-[374px] text-[30.73px]! leading-[30.73px] max-md:order-3 max-md:mt-[36px] max-md:w-[332px] max-md:text-center max-md:text-[18px]! max-md:leading-[16.2px]"
            >
              Got a question about the beans or something else <br className="max-md:hidden" />
              on your mind?
            </Text>
            <ButtonLink
              href="/contact"
              tone={tone.button}
              className="mt-[30px] md:h-[49.17px] md:min-w-[215.12px] max-md:order-4 max-md:mt-[39px] max-md:min-w-[215px]"
            >
              Say hello
            </ButtonLink>
          </div>
        </div>

        <div className="shrink-0 max-md:order-2">
          {desktopArt === mobileArt ? (
            <Collage art={desktopArt} />
          ) : (
            <>
              <Collage art={desktopArt} className="max-md:hidden" />
              <Collage art={mobileArt} className="md:hidden" />
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}
