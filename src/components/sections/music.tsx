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
    <Section className="bg-espresso text-parchment md:sticky-split md:[--split-top:calc(84.12*var(--u))] md:[--split-bottom:calc(105.11*var(--u))] md:[--split-min:100svh]">
      <Container pin="top" className="h-[calc(29*var(--u))] max-md:hidden">
        <div className="absolute top-[calc(28.93*var(--u))] left-[calc(43.69*var(--u))] w-[calc(1202.83*var(--u))] border-t-[calc(2*var(--u))] border-sand/50" />
      </Container>
      <Container className="flex items-start justify-between pr-[calc(113*var(--u))] pl-[calc(167*var(--u))] max-md:flex-col max-md:items-center max-md:px-0 max-md:pt-[calc(51*var(--u))] max-md:pb-[calc(38*var(--u))]">
        <div className="md:sticky-bottom md:mt-[calc(9.47*var(--u))] max-md:contents">
          <div className="flex w-[calc(366*var(--u))] flex-col items-start gap-[calc(40*var(--u))] max-md:w-[calc(230*var(--u))] max-md:items-center max-md:gap-[calc(14.4*var(--u))] max-md:text-center">
            <Heading size="lg" className="max-md:text-[calc(37.7*var(--u))] max-md:leading-[calc(34.6*var(--u))]">
              Get
              <br />
              jammin’
            </Heading>
            <Text variant="lead" className="max-md:text-[calc(18*var(--u))] max-md:leading-[calc(17.1*var(--u))]">
              Hit the <span className="text-parchment/50">red button</span> to start the playlist. A little COZZI
              soundtrack for the road.
            </Text>
            <CircleArrow className="text-mocha max-md:size-[calc(23*var(--u))] max-md:rotate-90 max-md:border-[calc(1.4*var(--u))] max-md:[&_svg]:size-[calc(12*var(--u))]" />
          </div>
        </div>

        {/* Panel art is 472.66px tall in a 507px box (shadow room below): -34.34px so its visible edge aligns. */}
        <DiscPlayer className="md:-mb-[calc(34.34*var(--u))] max-md:mt-[calc(31*var(--u))]" />
      </Container>
    </Section>
  );
}
