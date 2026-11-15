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
      <Container className="px-[101px] pt-[79.29px] pb-[79.8px] max-md:px-[32px] max-md:pt-[45px] max-md:pb-[21px]">
        <div className="-ml-1 mr-1 flex h-[19px] items-start justify-between max-md:mr-0 max-md:ml-1 max-md:h-[40px] max-md:items-end">
          <h2 className="font-sans text-[37px] leading-[19px] font-semibold text-ink uppercase max-md:text-[25px] max-md:leading-[20px] max-md:font-normal">
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
            className="mt-px text-ink transition-opacity hover:opacity-60 max-md:mt-0 max-md:text-[17px]"
          >
            View all
          </Text>
        </div>

        <ProductGrid products={upcoming} className="mt-[64px] max-md:mt-[73px]" />
      </Container>
    </Section>
  );
}
