import { Container } from "@/components/ui/container";
import { WaitlistButton } from "@/components/ui/waitlist-button";
import type { CoffeeDetail } from "@/content/products";
import { cn } from "@/lib/cn";

const small = "font-sans text-[13px] leading-[13px] font-medium tracking-[-0.03em]";

/**
 * "Product description" heading, spec table and the availability box (Figma "COFFEE/product", cream
 * band, 90% of the screen tall with the block centred, Figma 2026-11-08; the design has no description
 * copy under the heading). The availability box (Figma 2026-11-20 "Frame 2538") opens the waitlist.
 * Mobile (54796:637): no heading; specs + box are the desktop block scaled to 358px.
 */
export function ProductDetails({ product, id }: { product: CoffeeDetail; id: string }) {
  return (
    <section id={id} className="bg-cream text-ink md:flex md:min-h-[90svh] md:flex-col md:justify-center">
      <Container className="flex justify-between pt-[70px] pr-[136px] pb-[101px] pl-[139px] max-md:block max-md:px-[15.84px] max-md:pt-[37px] max-md:pb-[25px]">
        <div className="w-[349px] max-md:hidden">
          <h2 className="font-display text-[30px] leading-[25px] font-bold tracking-[-0.03em] uppercase">
            Product description
          </h2>
        </div>

        <div className="mt-[88.5px] w-[479px] max-md:mt-0 max-md:zoom-[0.748]">
          <dl className="border-b border-ink/50">
            {product.specs.map(({ label, value }) => (
              <div key={label} className={cn("flex justify-between border-t border-ink/50 pt-[17px] pb-[13.65px]", small)}>
                <dt className="uppercase">{label}</dt>
                <dd className="text-right text-[#7d7b77]">{value}</dd>
              </div>
            ))}
          </dl>

          {/* 479×99, 52px below the last spec line (cap height); both lines 65px down (14px tall): status 18px from the left, store link 13px from the right. */}
          <WaitlistButton className="mt-[26px] flex h-[99px] w-full cursor-pointer items-end justify-between rounded-[2px] bg-[#2a1915] pr-[13.1px] pb-[20px] pl-[18px] text-left font-sans font-medium tracking-[-0.03em] text-cream transition-colors hover:bg-[#3a241d]">
            <span className="text-[14px] leading-[14px]">{product.availability.title}</span>
            <span className="text-[16px] leading-[14px] underline">{product.availability.note}</span>
          </WaitlistButton>
        </div>
      </Container>
    </section>
  );
}
