"use client";

import { Fragment } from "react";
import { Container } from "@/components/ui/container";
import { PositionedImage, type Placement } from "@/components/ui/positioned-image";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";
import { usePhilosophyReveal } from "@/hooks/use-philosophy-reveal";
import { cn } from "@/lib/cn";

// Figma (updated 2026-11-20), section origin y = 811.56 (end of the hero). Listed in reveal order
// (see `usePhilosophyReveal`); none overlap, so order doesn't affect stacking. Photos are Figma
// exports (masks and colour adjustments baked in).
const images: Placement[] = [
  { src: "/images/philosophy/white-tee-4.png", x: 435.92, y: 92, w: 112.09, h: 118.33, mobile: null },
  { src: "/images/philosophy/sun-tile-4.png", x: 826.36, y: 92, w: 107.44, h: 117.77, mobile: null },
  { src: "/images/philosophy/greenery-4.png", x: 309.31, y: 129.99, w: 108.18, h: 114.2, mobile: null },
  { src: "/images/philosophy/kitchen-4.png", x: 1065.11, y: 223.75, w: 144.08, h: 152.09, mobile: null },
  { src: "/images/philosophy/branch-4.png", x: 103.01, y: 346.34, w: 109.93, h: 120.51, mobile: null },
  { src: "/images/philosophy/pour-4.png", x: 980.4, y: 532.86, w: 153.42, h: 126.45, mobile: null },
  { src: "/images/philosophy/mesob-4.png", x: 277.39, y: 573.12, w: 128.49, h: 139.31, mobile: null },
  // A video in Figma: the client's clip (720×720, 2026-11-21) cropped to the box (676×720, centred),
  // no audio; its first frame is the poster.
  { src: "/images/philosophy/buna-poster.jpg", video: "/video/buna-2.mp4", x: 837.47, y: 570.12, w: 121.01, h: 129.14, mobile: null },
  { src: "/images/philosophy/field-4.png", x: 428.76, y: 573.12, w: 92.12, h: 83.54, mobile: null },
];

// Heading (Figma 2026-11-20; its "LIIVES" typo fixed). Breaks after these words, desktop / mobile.
const words = "For the buna enthusiasts. Where daily lives are transformed into moments of presence".split(" ");
const breaks = { desktop: ["enthusiasts.", "transformed"], mobile: ["buna", "daily", "into"] };

/** "For the buna enthusiasts" — pinned on scroll while the copy fills in and the photos appear (`usePhilosophyReveal`). */
export function Philosophy({ id }: { id: string }) {
  const { section, heading, photos } = usePhilosophyReveal();

  return (
    <Section ref={section} id={id} className="overflow-hidden bg-cream">
      <Container className="h-[calc(813.55*var(--u))] max-md:h-[calc(722*var(--u))]">
        <div ref={photos}>
          {images.map((image) => (
            <PositionedImage key={image.src} {...image} className="overflow-hidden rounded-[calc(2*var(--u))]" />
          ))}
        </div>

        {/* Figma: 30/28px, 581px wide, 356.84px down; mobile 20/20px, 304px wide, 310px down. */}
        <Heading
          ref={heading}
          size="md"
          className="absolute inset-x-0 top-[calc(356.84*var(--u))] text-center text-[calc(30*var(--u))] leading-[calc(28*var(--u))] text-ink max-md:top-[calc(310*var(--u))] max-md:text-[calc(20*var(--u))] max-md:leading-[calc(20*var(--u))]"
        >
          {words.map((word, i) => (
            <Fragment key={i}>
              {/* The first word sits at full ink before the reveal fills the rest. */}
              <span data-word className={cn(i > 0 && "opacity-50")}>
                {word}
              </span>
              {breaks.desktop.includes(word) && <br className="max-md:hidden" />}
              {breaks.mobile.includes(word) && <br className="md:hidden" />}
              {i < words.length - 1 && " "}
            </Fragment>
          ))}
        </Heading>
      </Container>
    </Section>
  );
}
