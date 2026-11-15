import { Container } from "@/components/ui/container";
import { WaitlistButton } from "@/components/ui/waitlist-button";
import type { CoffeeDetail } from "@/content/products";
import { cn } from "@/lib/cn";

const small = "font-sans text-[13px] leading-[13px] font-semibold tracking-[-0.03em]";

/**
 * "Product description" heading, spec table and availability cards (Figma "COFFEE/product", cream
 * band, 90% of the screen tall with the block centred, Figma 2026-11-08; the design has no description
 * copy under the heading). The online-store card opens the waitlist. Mobile (54796:637): no heading;
 * specs + cards are the desktop block scaled to 358px.
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

          <ul
            className={cn(
              "mt-6 grid gap-[13px]",
              product.availability.length > 1 ? "grid-cols-[209px_257px]" : "grid-cols-[209px]",
            )}
          >
            {product.availability.map(({ title, note, store }) => {
              const content = (
                <>
                  <span className="text-[14px] leading-[13px] tracking-[-0.03em]">{title}</span>
                  <span className={cn("text-[16px] leading-[13px] tracking-[-0.03em] opacity-50", store && "underline")}>{note}</span>
                </>
              );
              const box = "flex h-[147px] w-full flex-col items-start justify-between rounded-[2px] bg-[#2a1915] pt-4 pr-6 pb-[14px] pl-[19px] text-left font-sans font-semibold text-cream";
              return (
                <li key={title}>
                  {store ? (
                    <WaitlistButton className={cn(box, "cursor-pointer transition-colors hover:bg-[#3a241d]")}>{content}</WaitlistButton>
                  ) : (
                    <div className={box}>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
