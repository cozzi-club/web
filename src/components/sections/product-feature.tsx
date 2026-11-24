import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SizedImage } from "@/components/ui/sized-image";
import { Heading, Text } from "@/components/ui/typography";
import { UnblurWords } from "@/components/ui/unblur-words";

/** Coffee feature (Figma 2026-11-24): "Reserve" over the blurred bag (mobile too), one line + "Find out"; md+ at least 110% of the screen tall, mobile full screen. */
export function ProductFeature({ id }: { id: string }) {
  return (
    // overflow-x-clip: the mobile bag (Figma 396px + 3px offset) bleeds past the 390px frame.
    <Section id={id} className="noise overflow-x-clip max-md:min-h-svh md:min-h-[110svh]! bg-[linear-gradient(to_bottom,#452a20_0%,#583629_21%,#6d4233_40%,#7d533e_56%,#8c634a_71%,#ae8864_89%,#d5b181_100%)] text-parchment">
      <Container className="h-[calc(812.03*var(--u))] pt-[calc(198.89*var(--u))] pr-[calc(105*var(--u))] pl-[calc(91*var(--u))] max-md:h-[calc(642*var(--u))] max-md:pt-[calc(126*var(--u))] max-md:pr-0 max-md:pl-0">
        <Heading size="lg" className="absolute inset-x-0 top-[calc(109.92*var(--u))] text-center text-parchment max-md:top-[calc(60*var(--u))] max-md:text-[calc(35*var(--u))] max-md:leading-[calc(30*var(--u))]">
          <UnblurWords text="Reserve" />
        </Heading>
        {/* Figma's blurred bag ("Frame 2565", progressive layer blur baked into the file; transparent).
            The file covers Figma's render bounds: the 626×417 frame plus the blur's 10px spill. */}
        <SizedImage
          src="/images/product/reserve-bag-blur.png"
          alt="COZZI single-origin coffee bag"
          w={636.45}
          h={437}
          mobile={{ w: 402.6, h: 276.4 }}
          className="-mt-[calc(7.02*var(--u))] ml-[calc(234.03*var(--u))] max-md:-mt-[calc(6.35*var(--u))] max-md:-ml-[calc(3.62*var(--u))]"
        />

        <div className="mt-[calc(21.03*var(--u))] flex items-end justify-between max-md:mt-[calc(40.95*var(--u))] max-md:flex-col max-md:items-start">
          {/* One line, its bottom on the button's bottom; a thin stroke thickens the hairline weight. */}
          <Text className="w-[calc(480*var(--u))] [-webkit-text-stroke:calc(0.5*var(--u))_currentColor] max-md:ml-[calc(40*var(--u))] max-md:w-[calc(310*var(--u))] max-md:text-center max-md:text-[calc(13*var(--u))] max-md:leading-[calc(17*var(--u))] max-md:[-webkit-text-stroke:calc(0.35*var(--u))_var(--color-bone)]">
            Single-origin coffee from Jimma, Ethiopia.
          </Text>
          <ButtonLink
            href="/coffee"
            tone="parchment"
            className="max-md:mt-[calc(83*var(--u))] max-md:ml-[calc(102*var(--u))] max-md:min-w-[calc(185*var(--u))] max-md:px-[calc(28.8*var(--u))] max-md:text-[calc(11.5*var(--u))]"
          >
            Find out
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
