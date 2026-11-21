import type { ReactNode } from "react";
import { HeroObjects, type HeroObject } from "@/components/hero-objects";
import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/ui/container";
import { ScrollCue } from "@/components/ui/scroll-cue";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";
import { IntroUnblurWords } from "@/components/ui/unblur-words";

const ID = "hero";
const FRAMES = { desktop: { width: 1280, height: 768 }, mobile: { width: 390, height: 730 } };

const MODELS = {
  mask: "/3d/hero/african_tribal_mask.glb",
  jug: "/3d/hero/clay_vessel.glb",
  drum: "/3d/hero/drum.glb",
  stool: "/3d/hero/wooden_stool.glb",
};

// Per layout: poster = Figma export box; fit = the object's visible bounds, which the 3D model fills.
// Diagonal pairs (mask/stool, jug/drum) morph-swap in place on an interval, pairs taking turns;
// a swapped-in model fills its new slot's fit box, so every slot keeps its Figma size.
const objects: HeroObject[] = [
  {
    src: "/images/hero/mask.png",
    model: MODELS.mask,
    swapWith: MODELS.stool,
    // 10% smaller than its Figma box (2026-11-20), wherever it sits after a swap.
    size: 0.9,
    pose: [0.1, 0.35, -0.18],
    drift: 120,
    desktop: { poster: { x: 163.7, y: 106.68, w: 183.53, h: 223.13 }, fit: { x: 206.6, y: 143.1, w: 106.7, h: 150.3 } },
    mobile: { poster: { x: -3, y: 126, w: 178, h: 223 }, fit: { x: 38.6, y: 162.4, w: 103.5, h: 150.2 } },
  },
  {
    src: "/images/hero/jug.png",
    model: MODELS.jug,
    swapWith: MODELS.drum,
    pose: [0.15, 0.5, -0.1],
    drift: 180,
    desktop: { poster: { x: 961.35, y: 150.42, w: 148.95, h: 216.32 }, fit: { x: 982.8, y: 182.4, w: 96, h: 154.9 } },
    mobile: { poster: { x: 303, y: 188, w: 115, h: 177 }, fit: { x: 319.6, y: 214.2, w: 74.1, h: 126.7 } },
  },
  {
    src: "/images/hero/drum.png",
    model: MODELS.drum,
    pose: [0.55, 0.2, 0.45],
    drift: 240,
    desktop: { poster: { x: 118.7, y: 321.63, w: 324.03, h: 392.71 }, fit: { x: 192.6, y: 426.1, w: 195.7, h: 204.8 } },
    mobile: { poster: { x: -58, y: 320, w: 246, h: 298 }, fit: { x: -1.9, y: 399.3, w: 148.6, h: 155.4 } },
  },
  {
    src: "/images/hero/stool.png",
    model: MODELS.stool,
    pose: [0.35, 0.5, -0.15],
    drift: 160,
    desktop: { poster: { x: 886.11, y: 372.75, w: 279.6, h: 308.36 }, fit: { x: 913.6, y: 436.7, w: 171.3, h: 194.9 } },
    mobile: { poster: { x: 180, y: 392, w: 233, h: 257 }, fit: { x: 202.9, y: 445.3, w: 142.8, h: 162.4 } },
  },
];

/** Banner + hero fill exactly one screen; header pins to the top, scroll cue to the bottom. */
export function Hero({ banner, nextId }: { banner?: ReactNode; nextId: string }) {
  return (
    // Figma: radial gradient from espresso behind the copy to near-black at the edges.
    <Section
      id={ID}
      className="min-h-svh overflow-hidden bg-[radial-gradient(211.45%_211.44%_at_50%_50%,#452a20_11.538%,#251712_42.548%,#150e0c_58.053%,#050505_73.558%)] text-parchment"
    >
      {banner}
      <div className="relative flex flex-1 flex-col justify-center">
        <SiteHeader />

        {/* `data-preloader-zoom`: settles from a slight zoom as the preloader's doors open. 10px above
            Figma (headline and objects together, 2026-11-20). */}
        <Container data-preloader-zoom className="-top-[calc(10*var(--u))] h-[calc(768*var(--u))] max-md:h-[calc(730*var(--u))]">
          <Heading
            as="h1"
            size="xl"
            className="absolute inset-x-0 top-[calc(251*var(--u))] text-center max-md:top-[calc(319*var(--u))] max-md:text-[calc(33*var(--u))] max-md:leading-[calc(31.5*var(--u))]"
          >
            <IntroUnblurWords text={"Make a moment,\nmake a ritual of it,\nmake it yours."} />
          </Heading>

          <HeroObjects objects={objects} frames={FRAMES} triggerId={ID} />
        </Container>

        {/* Arrow top 143.3px above the bottom of the screen (Figma 2026-11-20: y 688.7 of 832). */}
        <Container pin="bottom" className="h-[calc(143.3*var(--u))] max-md:h-[calc(63*var(--u))]">
          <ScrollCue href={`#${nextId}`} className="absolute top-0 left-1/2 -translate-x-1/2 text-mocha" />
        </Container>
      </div>
    </Section>
  );
}
