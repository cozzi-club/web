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
        <Container className="h-[697px] max-md:h-[324px]">
          <SizedImage
            src={product.hero}
            alt={product.name}
            w={538}
            h={359}
            mobile={{ w: 228.32, h: 152.23 }}
            priority
            className="absolute! top-[169px] left-[370px] max-md:top-[71.78px] max-md:left-[79.84px]"
          />
          <h1 className="absolute top-[570px] left-[136px] font-display text-[25px] leading-[25px] font-bold tracking-[-0.03em] uppercase max-md:top-[248.14px] max-md:left-0 max-md:w-full max-md:text-center max-md:text-[18px] max-md:leading-[18px]">
            {product.title.map((line, index) => (
              <span key={line} className={cn("block", index > 0 && "text-cream/50")}>
                {line}
              </span>
            ))}
          </h1>
          <a
            href={`#${nextId}`}
            aria-label="Product details"
            className="absolute top-[576px] left-[1088px] transition-transform duration-300 hover:translate-y-1 max-md:hidden"
          >
            <CircleArrow className="rotate-90" />
          </a>
        </Container>
      </div>
    </Section>
  );
}
