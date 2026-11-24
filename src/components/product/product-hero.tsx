import { SiteHeader } from "@/components/site-header";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { CircleArrow } from "@/components/ui/circle-arrow";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SizedImage } from "@/components/ui/sized-image";
import { BAG_RASTER, type CoffeeDetail } from "@/content/products";
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
          {/* Figma 2026-11-24 (55141:109): "Frame 2565" rasterized in Figma, the bag with its blur baked in
              (4x, transparent). The raster spans 645.97×430.81 at 315, 124.19 in this container (the 626-wide
              frame plus the blur's 10px each side), fitted to Figma's earlier render of the frame. Mobile:
              the previous mobile scale (0.3647×), centred. */}
          <SizedImage
            src={product.heroBlurred}
            alt={product.name}
            w={BAG_RASTER.w}
            h={BAG_RASTER.h}
            mobile={{ w: 235.6, h: 157.13 }}
            priority
            className="absolute! top-[calc(124.19*var(--u))] left-[calc(315*var(--u))] max-md:top-[calc(69.37*var(--u))] max-md:left-[calc(76.19*var(--u))]"
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
