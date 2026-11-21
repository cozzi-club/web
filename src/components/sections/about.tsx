import Image from "next/image";
import type { ReactNode } from "react";
import { HorizontalScroll } from "@/components/horizontal-scroll";
import { StoryBlock } from "@/components/story-block";
import { CircleArrow } from "@/components/ui/circle-arrow";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import { u } from "@/lib/design";

// Desktop track: the 1280×736 intro frame continued by the 5413px side-scroll frame (offset 822),
// with a tighter intro than Figma: a narrower black panel (the still life is shown whole, at its
// natural width). Everything after the still life sits SHIFT px left of its Figma (track)
// position; `fig()` converts.
const INTRO = { panel: 620, photo: 1274.94 };
const SHIFT = 822 + 1274.94 - (INTRO.panel - 8 + INTRO.photo);
const fig = (x: number) => x - SHIFT;
const TRACK = { width: fig(6235), height: 736 };
// Mobile: the vertical "mob" frame (390px wide), without its own header (the page uses SiteHeader) and contact block.
const MOBILE = { width: 390, height: 3010 };

/**
 * Collage piece, in track px. `stagger`: order within its collage cluster (later pieces drift a little
 * further, see useHorizontalScroll). `zoom`: starts scaled by this much and settles to 1 as the
 * track scrolls. `attached`: pieces stuck to this one (painted on top, moving with it).
 */
type Layer = {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  stagger?: number;
  zoom?: number;
  className?: string;
  attached?: Layer[];
};

// Scans at full ink. Figma shows them at 20%, but its downscaling keeps strokes heavier; 30% reads the same.
const letter = { src: "/images/about/letter.png", className: "opacity-30" };
// On dark backgrounds the handwriting turns white (Figma 2026-11-08).
const letterOnDark = { ...letter, className: "opacity-40 invert" };
const score = { src: "/images/about/score.png", className: "opacity-30" };

// Collage pieces baked from Figma (crops, masks and colour adjustments applied), in paint order.
const stillLife: Layer = { src: "/images/about/still-life.jpg", x: INTRO.panel - 8, y: 0, w: INTRO.photo, h: 736, zoom: 1.5 };
const collageLayers: Layer[] = [
  { src: "/images/about/paper.jpg", x: 4722.11, y: 0, w: 254.16, h: 599.39, stagger: 1 },
  { ...letter, x: 3211.72, y: 24.57, w: 373.57, h: 90.94, stagger: 1 },
  { src: "/images/about/ephemera-stamps.png", x: 4832.32, y: 86.7, w: 202.69, h: 132.67, stagger: 2 },
  { src: "/images/about/basket.png", x: 2446.18, y: 126.5, w: 258.6, h: 501.01, stagger: 1 },
  // 40px left of Figma (3408.4): its drift runs up to ~34px ahead of the cup photo's, which would
  // open a gap between them.
  { src: "/images/about/drum-cutout.png", x: 3368.4, y: 0, w: 736.85, h: 732.76, stagger: 1 },
  { src: "/images/about/pour.jpg", x: 3324.08, y: 220.8, w: 401.09, h: 311.59, stagger: 0 },
  { src: "/images/about/table-cup.jpg", x: 2224.55, y: 218.08, w: 357.93, h: 335.68, stagger: 0 },
  { src: "/images/about/map-3.jpg", x: 5644.68, y: 44.02, w: 215.01, h: 435.42, stagger: 1 },
  { src: "/images/about/farmer-2.jpg", x: 5710.05, y: 241.65, w: 433.81, h: 286.2, stagger: 2 },
  { ...score, x: 3677.4, y: 637.67, w: 277.53, h: 69.79, stagger: 2 },
  { src: "/images/about/landscape.png", x: 4485.24, y: 280.38, w: 429.91, h: 252.17, stagger: 0 },
  // No stagger: the seal stays put on the track while the map and farmer drift past it.
  { src: "/images/about/wax-seal.png", x: 5534.8, y: 383.59, w: 370.74, h: 322.57 },
].map((layer) => ({ ...layer, x: fig(layer.x) }));

const mobileLayers: Layer[] = [
  { src: "/images/about/still-life-m.jpg", x: 0, y: 448.96, w: 390, h: 423.08 },
  { src: "/images/about/map-m-3.jpg", x: 0.03, y: 2712.93, w: 232.31, h: 114.71 },
  { src: "/images/about/farmer-2.jpg", x: 94.44, y: 2765.36, w: 205.81, h: 135.78 },
  { src: "/images/about/wax-seal-m.png", x: 201.18, y: 2818.19, w: 188.82, h: 159.41 },
  { src: "/images/about/paper-m.jpg", x: 0, y: 2241.37, w: 351.42, h: 149.01 },
  { src: "/images/about/ephemera-stamps.png", x: 194, y: 2352, w: 119, h: 78 },
  { src: "/images/about/landscape.png", x: 74, y: 2194, w: 239, h: 140 },
  { ...score, x: 100, y: 1784, w: 190, h: 48 },
];
// Painted after the black band (it sits on top of it).
const mobileBandLayers: Layer[] = [
  { ...letterOnDark, x: 113, y: 857, w: 186, h: 45 },
  { src: "/images/about/basket.png", x: 201, y: 928, w: 142, h: 276 },
  { src: "/images/about/grinder.png", x: 52, y: 963, w: 264, h: 205 },
];

function CollageLayer({ src, x, y, w, h, stagger, zoom, className, attached = [], sizes }: Layer & { sizes: (w: number) => string }) {
  // The box spans the piece and anything attached; the inner layer is what the scroll hook moves.
  const left = Math.min(x, ...attached.map((a) => a.x));
  const top = Math.min(y, ...attached.map((a) => a.y));
  const right = Math.max(x + w, ...attached.map((a) => a.x + a.w));
  const bottom = Math.max(y + h, ...attached.map((a) => a.y + a.h));
  return (
    <div
      className={cn("absolute", zoom !== undefined && "overflow-hidden")}
      style={{ left: u(left), top: u(top), width: u(right - left), height: u(bottom - top) }}
      data-stagger={stagger}
      data-zoom={zoom}
    >
      <div className="absolute inset-0">
        {[{ src, x, y, w, h, className }, ...attached].map((piece) => (
          <div
            key={piece.src}
            className={cn("absolute", piece.className)}
            style={{ left: u(piece.x - left), top: u(piece.y - top), width: u(piece.w), height: u(piece.h) }}
          >
            <Image src={piece.src} alt="" fill sizes={sizes(piece.w)} className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Absolute box for a block that sets its own smaller --u (which would also scale its own left/top). */
function Place({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <div className="absolute" style={{ left: u(x), top: u(y) }}>
      {children}
    </div>
  );
}

function Rect({ x, y, w, h, className }: Omit<Layer, "src"> & { className: string }) {
  return <div className={cn("absolute", className)} style={{ left: u(x), top: u(y), width: u(w), height: u(h) }} />;
}

function Headline({ className }: { className?: string }) {
  return (
    <Heading as="h2" className={cn("w-[calc(400*var(--u))] text-[calc(89.2*var(--u))]! leading-[calc(85.4*var(--u))]! text-sand", className)}>
      <span className="block text-right">Whole</span>
      <span className="block">Lot</span>
      <span className="block text-right">More</span>
      <span className="block text-right">to Cozzi</span>
    </Heading>
  );
}

const stories = {
  story: {
    label: "Philosophy",
    title: (
      <>
        The radiant
        <br />
        throughline
      </>
    ),
    body: "We exist to restore the essence of intentionality by actively giving meaning to the currently rushed and overlooked moment in everyday life whilst also honouring, celebrating and educating our audience as well as the wider world about the heritage, deep history and culture surrounding one of the most consumed commodities for centuries and beyond.",
  },
  origin: {
    label: "Origin",
    title: (
      <>
        ‘Jimma’
        <br />A coffee
        <br />
        landscape
        <br />
        of its own
      </>
    ),
    body: "The place that doesn't need to grab its reputation from another has merit. Jimma has been producing coffee that is hard to confuse with anywhere else for its character.",
  },
  ethical: {
    label: "Ethical sourcing",
    title: (
      <>
        The work behind
        <br />
        the work
      </>
    ),
    body: "Good coffee should mean something to farmers who grow it. We care about where the coffee goes after it leaves the farm and what comes back. So we source responsibly and give back to the farmers behind it, because their work should have a stake in what it becomes. For us, that is part of making coffee properly.",
  },
};

const vh = (px: number) => `${Math.ceil((px / TRACK.height) * 100)}vh`;
const vw = (px: number) => `${Math.ceil((px / MOBILE.width) * 100)}vw`;

/** Desktop/tablet: pinned, side-scrolling brand story. */
function AboutTrack() {
  return (
    <HorizontalScroll width={TRACK.width} height={TRACK.height} className="bg-ink max-md:hidden">
      {/* backgrounds: cream story band; black bands for the intro panel and behind the first collage */}
      <Rect x={fig(2087)} y={0} w={TRACK.width - fig(2087)} h={TRACK.height} className="bg-cream" />
      <CollageLayer {...stillLife} sizes={vh} />
      {/* 1px over the still life's edge: they meet at a fractional x, which showed a hairline (Figma 2026-11-08). */}
      <Rect x={fig(2097) - 1} y={0} w={431} h={TRACK.height} className="bg-ink" />
      <Rect x={0} y={0} w={INTRO.panel} h={TRACK.height} className="bg-ink" />
      {collageLayers.map((layer) => (
        <CollageLayer key={layer.src} {...layer} sizes={vh} />
      ))}

      {/* intro panel */}
      <Headline className="absolute top-[calc(146*var(--u))] left-[calc(108*var(--u))]" />
      <p className="absolute top-[calc(502*var(--u))] left-[calc(116*var(--u))] w-[calc(391*var(--u))] text-justify font-sans text-[calc(20*var(--u))] leading-[calc(21.6*var(--u))] font-medium tracking-[-0.02em] text-bone">
        Built on our vision of things. What we choose, what we leave out, and what we believe is worth doing right. This
        is where that thinking begins.
      </p>
      <button
        type="button"
        data-scroll-to={fig(3023)}
        aria-label="Read our story"
        className="absolute top-[calc(646*var(--u))] left-[calc(294*var(--u))] cursor-pointer text-mocha"
      >
        <CircleArrow />
      </button>

      {/* stories */}
      <StoryBlock
        label={stories.story.label}
        title={stories.story.title}
        gap={36}
        next={fig(4195)}
        className="absolute w-[calc(422*var(--u))]"
        style={{ left: u(fig(2812)), top: u(176) }}
      >
        {stories.story.body}
      </StoryBlock>
      <StoryBlock
        label={stories.origin.label}
        title={stories.origin.title}
        gap={33}
        className="absolute w-[calc(365*var(--u))]"
        style={{ left: u(fig(4013)), top: u(176) }}
      >
        {stories.origin.body}
      </StoryBlock>
      <button
        type="button"
        data-scroll-to={fig(5324)}
        aria-label="Next story"
        className="absolute top-[calc(178*var(--u))] cursor-pointer text-espresso"
        style={{ left: u(fig(4587)) }}
      >
        <CircleArrow />
      </button>
      <StoryBlock
        label={stories.ethical.label}
        title={stories.ethical.title}
        gap={37}
        titleClassName="text-[calc(55*var(--u))]! leading-[calc(55*var(--u))]!"
        className="absolute w-[calc(509*var(--u))]"
        style={{ left: u(fig(5070)), top: u(176) }}
      >
        {stories.ethical.body}
      </StoryBlock>
    </HorizontalScroll>
  );
}

/** Mobile: the same story stacked vertically (Figma "mob" frame). Blocks are the desktop ones, shrunk (local --u). */
function AboutStack() {
  return (
    <div className="overflow-hidden bg-cream md:hidden">
      <Container style={{ height: u(MOBILE.height) }}>
        <Rect x={0} y={0} w={390} h={449} className="bg-ink" />
        {mobileLayers.map((layer) => (
          <CollageLayer key={layer.src} {...layer} sizes={vw} />
        ))}
        <Rect x={0} y={871} w={390} h={210} className="bg-ink" />
        {mobileBandLayers.map((layer) => (
          <CollageLayer key={layer.src} {...layer} sizes={vw} />
        ))}

        <Place x={55} y={136}>
          <Headline className="text-body [--u:calc(var(--u0)*0.7)]" />
        </Place>
        <Place x={52} y={1239}>
          <StoryBlock
            label={stories.story.label}
            title={stories.story.title}
            gap={36}
            className="w-[calc(422*var(--u))] text-body [--u:calc(var(--u0)*0.687)]"
          >
            {stories.story.body}
          </StoryBlock>
        </Place>
        <Place x={62} y={1866}>
          <StoryBlock
            label={stories.origin.label}
            title={stories.origin.title}
            gap={33}
            className="w-[calc(365*var(--u))] text-body [--u:calc(var(--u0)*0.726)]"
          >
            {stories.origin.body}
          </StoryBlock>
        </Place>
        <Place x={40} y={2461}>
          <StoryBlock
            label={stories.ethical.label}
            title={stories.ethical.title}
            gap={37}
            titleClassName="text-[calc(55*var(--u))]! leading-[calc(55*var(--u))]!"
            className="w-[calc(509*var(--u))] text-body [--u:calc(var(--u0)*0.611)]"
          >
            {stories.ethical.body}
          </StoryBlock>
        </Place>
      </Container>
    </div>
  );
}

/** "A whole lot more to COZZI" brand story (the /philosophy page). */
export function About({ id }: { id: string }) {
  return (
    <div id={id}>
      <AboutTrack />
      <AboutStack />
    </div>
  );
}
