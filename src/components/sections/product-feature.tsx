import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SizedImage } from "@/components/ui/sized-image";
import { Heading, Text } from "@/components/ui/typography";
import { UnblurWords } from "@/components/ui/unblur-words";

/** Coffee feature (Figma 2026-11-08): "Forme" over the bag, copy + "Learn more"; md+ at least 110% of the screen tall. */
export function ProductFeature({ id }: { id: string }) {
  return (
    // overflow-x-clip: the mobile bag (Figma 396px + 3px offset) bleeds past the 390px frame.
    <Section id={id} className="noise overflow-x-clip md:min-h-[110svh]! bg-[linear-gradient(to_bottom,#452a20_0%,#583629_21%,#6d4233_40%,#7d533e_56%,#8c634a_71%,#ae8864_89%,#d5b181_100%)] text-parchment">
      <Container className="h-[812.03px] pt-[198.89px] pr-[105px] pl-[91px] max-md:h-[642px] max-md:pt-[126px] max-md:pr-0 max-md:pl-0">
        <Heading size="lg" className="absolute inset-x-0 top-[109.92px] text-center text-parchment max-md:hidden">
          <UnblurWords text="Forme" />
        </Heading>
        <SizedImage
          src="/images/product/coffee-bag.png"
          alt="COZZI single-origin coffee bag"
          w={625.97}
          h={417.37}
          mobile={{ w: 396, h: 264 }}
          className="ml-[238px] max-md:ml-[3px]"
        />

        <div className="mt-[33.63px] flex items-start justify-between max-md:mt-[47px] max-md:flex-col">
          {/* Figma adds a thin stroke to the hairline weight here */}
          <Text className="mt-1 w-[480px] [-webkit-text-stroke:0.5px_currentColor] max-md:mt-0 max-md:ml-[69px] max-md:w-[266px] max-md:text-center max-md:text-[10.6px] max-md:leading-[14px] max-md:[-webkit-text-stroke:0.35px_var(--color-bone)]">
            Single-origin coffee from West Nekemte, Ethiopia. Medium roast, to bring out a softer &amp; fuller
            expression of the bean.
          </Text>
          <ButtonLink
            href="/coffee"
            tone="parchment"
            className="max-md:mt-[83px] max-md:ml-[102px] max-md:min-w-[185px] max-md:px-[28.8px] max-md:text-[11.5px]"
          >
            Learn more
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
