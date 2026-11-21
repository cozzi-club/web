import { Container } from "@/components/ui/container";
import { WaitlistButton } from "@/components/ui/waitlist-button";
import type { CoffeeDetail } from "@/content/products";
import { cn } from "@/lib/cn";

const small = "font-sans text-[calc(13*var(--u))] leading-[calc(13*var(--u))] font-medium tracking-[-0.03em]";

/**
 * "Product description" heading, spec table and the availability box (Figma "COFFEE/product", cream
 * band, 90% of the screen tall with the block centred, Figma 2026-11-08; the design has no description
 * copy under the heading). The availability box (Figma 2026-11-20 "Frame 2538") opens the waitlist.
 * Mobile (54796:637): no heading; specs + box are the desktop block scaled to 358px.
 */
export function ProductDetails({ product, id }: { product: CoffeeDetail; id: string }) {
  return (
    <section id={id} className="bg-cream text-ink md:flex md:min-h-[90svh] md:flex-col md:justify-center">
      <Container className="flex justify-between pt-[calc(70*var(--u))] pr-[calc(136*var(--u))] pb-[calc(101*var(--u))] pl-[calc(139*var(--u))] max-md:block max-md:px-[calc(15.84*var(--u))] max-md:pt-[calc(37*var(--u))] max-md:pb-[calc(25*var(--u))]">
        <div className="w-[calc(349*var(--u))] max-md:hidden">
          <h2 className="font-display text-[calc(30*var(--u))] leading-[calc(25*var(--u))] font-bold tracking-[-0.03em] uppercase">
            Product description
          </h2>
        </div>

        <div className="mt-[calc(88.5*var(--u))] w-[calc(479*var(--u))] max-md:mt-0 max-md:text-body max-md:[--u:calc(var(--u0)*0.748)]">
          <dl className="border-b border-ink/50">
            {product.specs.map(({ label, value }) => (
              <div key={label} className={cn("flex justify-between border-t border-ink/50 pt-[calc(17*var(--u))] pb-[calc(13.65*var(--u))]", small)}>
                <dt className="uppercase">{label}</dt>
                <dd className="text-right text-[#7d7b77]">{value}</dd>
              </div>
            ))}
          </dl>

          {/* 479×99, 52px below the last spec line (cap height); both lines 65px down (14px tall): status 18px from the left, store link 13px from the right. */}
          <WaitlistButton className="mt-[calc(26*var(--u))] flex h-[calc(99*var(--u))] w-full cursor-pointer items-end justify-between rounded-[calc(2*var(--u))] bg-[#2a1915] pr-[calc(13.1*var(--u))] pb-[calc(20*var(--u))] pl-[calc(18*var(--u))] text-left font-sans font-medium tracking-[-0.03em] text-cream transition-colors hover:bg-[#3a241d]">
            <span className="text-[calc(14*var(--u))] leading-[calc(14*var(--u))]">{product.availability.title}</span>
            <span className="text-[calc(16*var(--u))] leading-[calc(14*var(--u))] underline">{product.availability.note}</span>
          </WaitlistButton>
        </div>
      </Container>
    </section>
  );
}
