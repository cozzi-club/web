import { DiscPlayer } from "@/components/disc-player";
import { CircleArrow } from "@/components/ui/circle-arrow";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";

/**
 * "Get jammin'" + disc player (Figma 2026-11-08). md+: at least one screen tall; the copy sticks near
 * the bottom of the screen while the player scrolls past. A rule runs across the top, like the footer's.
 */
export function Music() {
  return (
    <Section className="bg-espresso text-parchment md:sticky-split md:[--split-top:84.12px] md:[--split-bottom:105.11px] md:[--split-min:100svh]">
      <Container pin="top" className="h-[29px] max-md:hidden">
        <div className="absolute top-[28.93px] left-[43.69px] w-[1202.83px] border-t-2 border-sand/50" />
      </Container>
      <Container className="flex items-start justify-between pr-[113px] pl-[167px] max-md:flex-col max-md:items-center max-md:px-0 max-md:pt-[51px] max-md:pb-[38px]">
        <div className="md:sticky-bottom md:mt-[9.47px] max-md:contents">
          <div className="flex w-[366px] flex-col items-start gap-[40px] max-md:w-[230px] max-md:items-center max-md:gap-[14.4px] max-md:text-center">
            <Heading size="lg" className="max-md:text-[37.7px] max-md:leading-[34.6px]">
              Get
              <br />
              jammin’
            </Heading>
            <Text variant="lead" className="max-md:text-[18px] max-md:leading-[17.1px]">
              Hit the <span className="text-parchment/50">red button</span> to start the playlist. A little COZZI
              soundtrack for the road.
            </Text>
            <CircleArrow className="text-mocha max-md:size-[23px] max-md:rotate-90 max-md:border-[1.4px] max-md:[&_svg]:size-[12px]" />
          </div>
        </div>

        {/* Panel art is 472.66px tall in a 507px box (shadow room below): -34.34px so its visible edge aligns. */}
        <DiscPlayer className="md:-mb-[34.34px] max-md:mt-[31px]" />
      </Container>
    </Section>
  );
}
