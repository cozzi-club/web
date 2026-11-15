"use client";

import { Fragment } from "react";
import { Container } from "@/components/ui/container";
import { PositionedImage, type Placement } from "@/components/ui/positioned-image";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";
import { usePhilosophyReveal } from "@/hooks/use-philosophy-reveal";
import { cn } from "@/lib/cn";

// Figma (updated 2026-11-08), section origin y = 811.56 (end of the hero). Listed in reveal order
// (see `usePhilosophyReveal`); none overlap, so order doesn't affect stacking.
const images: Placement[] = [
  { src: "/images/philosophy/hands-cup-3.png", x: 435.92, y: 92, w: 112.09, h: 118.33, mobile: null },
  { src: "/images/philosophy/sun-tile-3.png", x: 826.36, y: 92, w: 107.44, h: 117.77, mobile: null },
  { src: "/images/philosophy/greenery-3.png", x: 309.31, y: 129.99, w: 108.18, h: 114.2, mobile: null },
  { src: "/images/philosophy/kitchen-3.png", x: 1065.11, y: 223.75, w: 144.08, h: 152.09, mobile: null },
  { src: "/images/philosophy/branch-3.png", x: 103.01, y: 346.34, w: 109.93, h: 120.51, mobile: null },
  { src: "/images/philosophy/pour-3.png", x: 980.4, y: 532.86, w: 153.42, h: 126.45, mobile: null },
  { src: "/images/philosophy/mesob-3.png", x: 277.39, y: 573.12, w: 128.49, h: 139.31, mobile: null },
  { src: "/images/philosophy/coffee-swirl-3.png", x: 837.47, y: 570.12, w: 121.01, h: 129.14, mobile: null },
  { src: "/images/philosophy/field-3.png", x: 428.76, y: 573.12, w: 92.12, h: 83.54, mobile: null },
];

// Heading lines (Figma); the first word sits at full ink before the reveal fills the rest.
const lines = [["We've", "never", "been"], ["ones", "for", "too", "much."], ["Less", "is", "more."]];

/** "We've never been ones for too much" — pinned on scroll while the copy fills in and the photos appear (`usePhilosophyReveal`). */
export function Philosophy({ id }: { id: string }) {
  const { section, heading, photos } = usePhilosophyReveal();

  return (
    <Section ref={section} id={id} className="overflow-hidden bg-cream">
      <Container className="h-[813.55px] max-md:h-[722px]">
        <div ref={photos}>
          {images.map((image) => (
            <PositionedImage key={image.src} {...image} className="overflow-hidden rounded-[2px]" />
          ))}
        </div>

        <Heading
          ref={heading}
          size="md"
          className="absolute inset-x-0 top-[336.84px] text-center text-ink max-md:top-[332px] max-md:text-[25.9px] max-md:leading-[25.9px]"
        >
          {lines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line.map((word, j) => (
                <Fragment key={word}>
                  {j > 0 && " "}
                  <span data-word className={cn(!(i === 0 && j === 0) && "opacity-50")}>
                    {word}
                  </span>
                </Fragment>
              ))}
            </Fragment>
          ))}
        </Heading>
      </Container>
    </Section>
  );
}
