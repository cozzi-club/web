"use client";

import { MobileMenu } from "@/components/mobile-menu";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { TransitionLink } from "@/components/ui/transition-link";
import { headerNav } from "@/content/navigation";
import { useFixedHeader } from "@/hooks/use-fixed-header";
import { useHeaderPeek } from "@/hooks/use-header-peek";
import { openWaitlist } from "@/hooks/use-waitlist-dialog";
import { cn } from "@/lib/cn";

const navText = "font-sans text-[calc(15.55*var(--u))] leading-[calc(15.5*var(--u))] font-normal tracking-[0.15em] uppercase";

/**
 * Page header on every page (Figma catalog frame): logo + nav, white with `mix-blend-difference`
 * so it stays legible over any section. Fixed: starts at its spot in the page (its positioned
 * parent's top) and stays at the top of the screen while scrolling (`useFixedHeader`). Slides away
 * while `<html data-header="hidden">` (set by the About side-scroll), and back while the mouse is at
 * the top of the screen (`useHeaderPeek`). Mobile: logo + burger menu.
 */
export function SiteHeader({ className }: { className?: string }) {
  const header = useFixedHeader();
  useHeaderPeek();
  return (
    <Container
      ref={header}
      pin="fixed"
      className={cn(
        "z-40 h-[calc(80*var(--u))] text-white mix-blend-difference transition-[translate,opacity] duration-500 ease-out",
        "header-hidden:pointer-events-none header-hidden:-translate-y-full header-hidden:opacity-0",
        className,
      )}
    >
      <TransitionLink
        href="/"
        aria-label="Cozzi home"
        className="absolute top-[calc(23.8*var(--u))] left-[calc(92.81*var(--u))] w-[calc(94.89*var(--u))] max-md:top-[calc(21*var(--u))] max-md:left-[calc(23*var(--u))] max-md:w-[calc(68*var(--u))]"
      >
        <Logo />
      </TransitionLink>

      <nav aria-label="Main" className="absolute top-[calc(26.48*var(--u))] right-[calc(83*var(--u))] max-md:hidden">
        <ul className={cn("flex gap-6", navText)}>
          {headerNav.map(({ label, href, soon }) => (
            <li key={label} className="relative">
              {soon ? (
                <button type="button" onClick={openWaitlist} className="cursor-pointer uppercase transition-opacity hover:opacity-60">
                  {label}
                  <span className="absolute top-[calc(16*var(--u))] left-1/2 flex h-4 w-[calc(58*var(--u))] -translate-x-1/2 items-center justify-center rounded-[calc(10*var(--u))] bg-[#7f3f25] text-[calc(7.5*var(--u))] leading-[calc(7.5*var(--u))] tracking-[-0.02em] normal-case">
                    Coming Soon!
                  </span>
                </button>
              ) : (
                <TransitionLink href={href} className="transition-opacity hover:opacity-60">
                  {label}
                </TransitionLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Burger: icon centred on the logo line, its right edge 27px in (the button adds 8px padding). */}
      <MobileMenu className="absolute top-[calc(12*var(--u))] right-[calc(19*var(--u))] md:hidden" />
    </Container>
  );
}
