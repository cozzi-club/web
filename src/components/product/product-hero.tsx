import { SiteHeader } from "@/components/site-header";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { CircleArrow } from "@/components/ui/circle-arrow";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SizedImage } from "@/components/ui/sized-image";
import type { CoffeeDetail } from "@/content/products";
import { cn } from "@/lib/cn";

/**
 * Dark gradient hero: header, product shot, two-line name (second line muted) and a scroll cue
 * (Figma "COFFEE/product").
 * Mobile (54796:637): short band, centred name, no scroll cue.
 */
export function ProductHero({ product, nextId }: { product: CoffeeDetail; nextId: string }) {
  return (
    // Figma gradient ends at 172.6% of the band, so the bottom lands near espresso.
    <Section className="min-h-svh bg-[linear-gradient(to_bottom,#0a0605_0%,#704338_172.6%)] text-cream max-md:min-h-0">
      <AnnouncementBar />
      <div className="relative flex flex-1 flex-col justify-center">
        <SiteHeader />
        <Container className="h-[calc(697*var(--u))] max-md:h-[calc(324*var(--u))]">
          {/* Figma 2026-11-24 "Frame 2565" (55141:109): the bag rasterized in Figma with its blur baked in
              (4x, transparent), 626x417.5 at 325, 175.2 in the frame (this container starts 44.4px down
              it). Mobile: the same image at the previous mobile scale (0.3647x), centred. */}
          <SizedImage
            src={product.heroBlurred}
            alt={product.name}
            w={626}
            h={417.5}
            mobile={{ w: 228.31, h: 152.27 }}
            priority
            className="absolute! top-[calc(130.8*var(--u))] left-[calc(325*var(--u))] max-md:top-[calc(71.78*var(--u))] max-md:left-[calc(79.84*var(--u))]"
          />
          <h1 className="absolute top-[calc(570*var(--u))] left-[calc(136*var(--u))] font-display text-[calc(25*var(--u))] leading-[calc(25*var(--u))] font-bold tracking-[-0.03em] uppercase max-md:top-[calc(248.14*var(--u))] max-md:left-0 max-md:w-full max-md:text-center max-md:text-[calc(18*var(--u))] max-md:leading-[calc(18*var(--u))]">
            {product.title.map((line, index) => (
              <span key={line} className={cn("block", index > 0 && "text-cream/50")}>
                {line}
              </span>
            ))}
          </h1>
          <a
            href={`#${nextId}`}
            aria-label="Product details"
            className="absolute top-[calc(576*var(--u))] left-[calc(1088*var(--u))] transition-transform duration-300 hover:translate-y-1 max-md:hidden"
          >
            <CircleArrow className="rotate-90" />
          </a>
        </Container>
      </div>
    </Section>
  );
}
