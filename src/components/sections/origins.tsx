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
  const { section, arch, stage, frame, photoWindow, photo, shade, copy, cta } = useArchReveal();

  return (
    // Top padding: Figma's 79px gap from the coffee gradient (On the horizon used to sit between).
    <Section
      ref={section}
      className="overflow-x-clip bg-cream pt-[calc(79.29*var(--u))] md:min-h-0! max-md:pt-[calc(48*var(--u))] max-md:pb-[calc(60*var(--u))]"
    >
      {/* Heading and arch form one block (arch bottom 98.7px above the contact collage, which the
          contact section's top padding provides). The arch sits 77px higher than Figma (275.42 vs
          352.42), so the pinned block fits the screen with room above the heading. */}
      <Container className="h-[calc(567.25*var(--u))] max-md:h-[calc(440.5*var(--u))]">
        <Heading className="absolute inset-x-0 top-0 text-center text-ink max-md:top-[calc(10*var(--u))] max-md:text-[calc(35*var(--u))] max-md:leading-[calc(30*var(--u))]">
          <UnblurWords text={"The\ndoor into\nthe club"} />
        </Heading>
        {/* Figma arch (241.79×291.83, black frame, photo masked 5.4 / 6.51 inside), drawn in CSS so the
            jebena can be framed on the vase. Mobile: 220 wide (same proportions), 75px under the heading.
            The reveal starts from exactly this crop. */}
        <div
          ref={arch}
          className="absolute top-[calc(275.42*var(--u))] left-[calc(519.1*var(--u))] h-[calc(291.83*var(--u))] w-[calc(241.79*var(--u))] rounded-t-full bg-ink max-md:top-[calc(175*var(--u))] max-md:left-[calc(85*var(--u))] max-md:h-[calc(265.5*var(--u))] max-md:w-[calc(220*var(--u))]"
        >
          <div className="absolute inset-x-[2.233%] inset-y-[2.231%] overflow-hidden rounded-t-full">
            <Image
              src={JEBENA}
              alt="A clay jebena on a concrete plinth in a beam of light"
              fill
              sizes={designSizes(231, 210)}
              className="object-cover"
              style={{ objectPosition: `${ARCH_FOCUS_X * 100}% 50%` }}
            />
          </div>
        </div>
      </Container>

      {/* Full-screen reveal layer: hidden until the hook clips it to the arch. Outside the design
          frame (full screen). Lazy image. Mobile: the same reveal; the copy is the desktop block at 0.68×. */}
      {/* lvh: the screen height with mobile browser toolbars hidden, so the layer still covers the
          screen after Chrome hides its address bar on scroll (svh left a gap; dvh resizes mid-pin).
          Same as vh on desktop. 2px taller: smooth scrolling pins at fractional offsets, which would
          leave a sub-pixel line of the section below the stage. */}
      <div
        ref={stage}
        className="pointer-events-none invisible absolute inset-x-0 top-0 z-10 h-[calc(100lvh+2px)]"
      >
        <div ref={frame} aria-hidden className="absolute inset-0 bg-ink">
          <div ref={photoWindow} className="absolute inset-0 overflow-hidden">
            <div ref={photo} className="absolute top-1/2 left-1/2 aspect-[3907/2544] w-[max(100%,calc((100lvh+2px)*3907/2544))]">
              <Image src={JEBENA} alt="" fill sizes="100vw" />
            </div>
          </div>
          {/* Phones: darkens the photo as the copy rises in (the light beam crosses the text there). */}
          <div ref={shade} className="invisible absolute inset-0 bg-ink/70 md:hidden" />
        </div>

        {/* "Inside story, if you will" (Figma Frame 2523, 2026-11-21: white), centred on the full-screen
            photo; in design px (--u), so it scales with the page. Heading 120px tall, copy 28px
            below it, button 40px below the copy. The copy is 412px (Figma 405.4) because word masks
            add a few px — keeps Figma's three lines. */}
        {/* Difference blend on desktop; plain white on phones, over the dark overlay (difference on a
            darkened photo would turn the copy grey where the light beam is). */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference max-md:mix-blend-normal">
          <div ref={copy} className="flex w-[calc(486.8*var(--u))] flex-col items-center text-center text-body text-white max-md:[--u:calc(var(--u0)*0.68)]">
            <Heading className="leading-[calc(60*var(--u))]">
              <SplitWords text={"Inside story,\nif you will"} />
            </Heading>
            <Text variant="lead" className="mt-[calc(28*var(--u))] w-[calc(412*var(--u))] text-[calc(35.82*var(--u))] leading-[calc(34.03*var(--u))] tracking-[-0.02em]">
              <SplitWords text="A place, a way of working, and intentional choices made along the way." />
            </Text>
            <div ref={cta} className="pointer-events-auto invisible mt-[calc(40*var(--u))]">
              <ButtonLink href="/philosophy" tone="white">
                Our philosophy
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
