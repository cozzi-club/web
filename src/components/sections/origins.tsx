"use client";

import Image from "next/image";
import { ARCH_FOCUS_X, useArchReveal } from "@/hooks/use-arch-reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SplitWords } from "@/components/ui/split-words";
import { Heading, Text } from "@/components/ui/typography";
import { UnblurWords } from "@/components/ui/unblur-words";
import { designSizes } from "@/lib/design";

// Figma export of the jebena photo (B&W grade baked in), 3907×2544.
const JEBENA = "/images/contact/jebena.jpg";

/**
 * "The door into the club": heading + arched jebena photo, leading into the contact
 * screen. md+: scrolling expands the arch to a full-screen photo, then "Inside story, if you will"
 * rises in word by word (`useArchReveal`). Figma spacing (2026-11-08), not a full-screen block.
 */
export function Origins() {
  const { section, arch, stage, frame, photoWindow, photo, copy, cta } = useArchReveal();

  return (
    // Top padding: Figma's 79px gap from the coffee gradient (On the horizon used to sit between).
    <Section
      ref={section}
      className="overflow-x-clip bg-cream pt-[calc(79.29px*var(--zoom))] md:min-h-0! max-md:pt-[calc(48px*var(--zoom))]"
    >
      {/* Heading and arch form one block (arch bottom 98.7px above the contact collage, which the
          contact section's top padding provides). The arch sits 77px higher than Figma (275.42 vs
          352.42), so the pinned block fits the screen with room above the heading. */}
      <Container className="h-[567.25px] max-md:h-[400px]">
        <Heading className="absolute inset-x-0 top-0 text-center text-ink max-md:top-[10px] max-md:text-[35px] max-md:leading-[30px]">
          <UnblurWords text={"The\ndoor into\nthe club"} />
        </Heading>
        {/* Figma arch (241.79×291.83, black frame, photo masked 5.4 / 6.51 inside), drawn in CSS so the
            jebena can be framed on the vase — the reveal starts from exactly this crop. */}
        <div
          ref={arch}
          className="absolute top-[275.42px] left-[519.1px] h-[291.83px] w-[241.79px] rounded-t-full bg-ink max-md:top-[221px] max-md:left-[132px] max-md:h-[152px] max-md:w-[126px]"
        >
          <div className="absolute inset-x-[2.233%] inset-y-[2.231%] overflow-hidden rounded-t-full">
            <Image
              src={JEBENA}
              alt="A clay jebena on a concrete plinth in a beam of light"
              fill
              sizes={designSizes(231, 120)}
              className="object-cover"
              style={{ objectPosition: `${ARCH_FOCUS_X * 100}% 50%` }}
            />
          </div>
        </div>
      </Container>

      {/* Full-screen reveal layer: hidden until the hook clips it to the arch. Outside the zoomed
          frame so measured px map 1:1. Lazy image, never rendered on mobile. */}
      {/* 2px taller than the screen: smooth scrolling pins at fractional offsets, which would leave a
          sub-pixel line of the section below the stage. */}
      <div
        ref={stage}
        className="pointer-events-none invisible absolute inset-x-0 top-0 z-10 h-[calc(100svh+2px)] max-md:hidden"
      >
        <div ref={frame} aria-hidden className="absolute inset-0 bg-ink">
          <div ref={photoWindow} className="absolute inset-0 overflow-hidden">
            <div ref={photo} className="absolute top-1/2 left-1/2 aspect-[3907/2544] w-[max(100%,calc((100svh+2px)*3907/2544))]">
              <Image src={JEBENA} alt="" fill sizes="100vw" />
            </div>
          </div>
        </div>

        {/* "Inside story, if you will" (Figma Frame 2523, 2026-11-08), centred on the full-screen
            photo; in design px, so it scales with the design zoom. Heading 120px tall, copy 28px
            below it, button 40px below the copy. The copy is 412px (Figma 405.4) because word masks
            add a few px — keeps Figma's three lines. */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div ref={copy} className="flex w-[486.8px] flex-col items-center text-center text-parchment design-zoom">
            <Heading className="leading-[60px]">
              <SplitWords text={"Inside story,\nif you will"} />
            </Heading>
            <Text variant="lead" className="mt-[28px] w-[412px] text-[35.82px] leading-[34.03px] tracking-[-0.02em]">
              <SplitWords text="A place, a way of working, and intentional choices made along the way." />
            </Text>
            <div ref={cta} className="pointer-events-auto invisible mt-[40px]">
              <ButtonLink href="/about" tone="parchment">
                Our story
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
