import { TransitionLink } from "@/components/ui/transition-link";
import { ProductGrid } from "@/components/product-grid";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/typography";
import { UnblurWords } from "@/components/ui/unblur-words";
import { upcoming } from "@/content/products";

/** "On the horizon" cards. Figma spacing (79px above, 80px down to the door section), not a full screen. */
export function Horizon({ id }: { id: string }) {
  return (
    <Section id={id} className="bg-cream md:min-h-0!">
      <Container className="px-[calc(101*var(--u))] pt-[calc(79.29*var(--u))] pb-[calc(79.8*var(--u))] max-md:px-[calc(32*var(--u))] max-md:pt-[calc(45*var(--u))] max-md:pb-[calc(21*var(--u))]">
        <div className="-ml-1 mr-1 flex h-[calc(19*var(--u))] items-start justify-between max-md:mr-0 max-md:ml-1 max-md:h-[calc(40*var(--u))] max-md:items-end">
          <h2 className="font-sans text-[calc(37*var(--u))] leading-[calc(19*var(--u))] font-semibold text-ink uppercase max-md:text-[calc(25*var(--u))] max-md:leading-[calc(20*var(--u))] max-md:font-normal">
            <span className="md:hidden">
              On the <br />
              horizon
            </span>
            <span className="max-md:hidden">
              <UnblurWords text="On the horizon" />
            </span>
          </h2>
          <Text
            as={TransitionLink}
            href="/catalog"
            variant="label-lg"
            className="mt-px text-ink transition-opacity hover:opacity-60 max-md:mt-0 max-md:text-[calc(17*var(--u))]"
          >
            View all
          </Text>
        </div>

        <ProductGrid products={upcoming} className="mt-[calc(64*var(--u))] max-md:mt-[calc(73*var(--u))]" />
      </Container>
    </Section>
  );
}
