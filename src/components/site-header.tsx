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

const navText = "font-sans text-[15.55px] leading-[15.5px] font-normal tracking-[0.15em] uppercase";

/**
 * Page header on every page (Figma catalog frame): logo + nav, white with `mix-blend-difference`
 * so it stays legible over any section. Fixed: starts at its spot in the page (its positioned
 * parent's top) and stays at the top of the screen while scrolling (`useFixedHeader`). Slides away
 * while `<html data-header="hidden">` (set by the About side-scroll), and back while the mouse is at
 * the top of the screen (`useHeaderPeek`). Mobile: logo + Menu button.
 */
export function SiteHeader({ className }: { className?: string }) {
  const header = useFixedHeader();
  useHeaderPeek();
  return (
    <Container
      ref={header}
      pin="fixed"
      className={cn(
        "z-40 h-[80px] text-white mix-blend-difference transition-[translate,opacity] duration-500 ease-out",
        "header-hidden:pointer-events-none header-hidden:-translate-y-full header-hidden:opacity-0",
        className,
      )}
    >
      <TransitionLink
        href="/"
        aria-label="Cozzi home"
        className="absolute top-[23.8px] left-[92.81px] w-[94.89px] max-md:top-[21px] max-md:left-[23px] max-md:w-[68px]"
      >
        <Logo />
      </TransitionLink>

      <nav aria-label="Main" className="absolute top-[26.48px] right-[83px] max-md:hidden">
        <ul className={cn("flex gap-6", navText)}>
          {headerNav.map(({ label, href, soon }) => (
            <li key={label} className="relative">
              {soon ? (
                <button type="button" onClick={openWaitlist} className="cursor-pointer uppercase transition-opacity hover:opacity-60">
                  {label}
                  <span className="absolute top-[16px] left-1/2 flex h-4 w-[58px] -translate-x-1/2 items-center justify-center rounded-[10px] bg-[#7f3f25] text-[7.5px] leading-[7.5px] tracking-[-0.02em] normal-case">
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

      <MobileMenu className="absolute top-[16px] right-[27px] md:hidden" />
    </Container>
  );
}
