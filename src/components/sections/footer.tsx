import { TransitionLink } from "@/components/ui/transition-link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";
import { contact, sitemap, socials, type NavLink } from "@/content/navigation";
import { cn } from "@/lib/cn";

// Hairline weight thickened with a stroke; all of it parchment (links included), like the wordmark.
const strokeText = "text-parchment [-webkit-text-stroke:calc(0.75*var(--u))_var(--color-parchment)]";
const rule = "border-t-[calc(2*var(--u))] border-sand/50 max-md:border-t-[calc(1.5*var(--u))]";
const ruleBelow = "border-b-[calc(2*var(--u))] border-sand/50 max-md:border-b-[calc(1.5*var(--u))]";

function FooterAnchor({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  // Other sites (the socials) open in a new tab.
  const external = href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <TransitionLink href={href} {...external} className={cn("transition-opacity hover:opacity-60", className)}>
      {children}
    </TransitionLink>
  );
}

function LinkList({ links, className }: { links: NavLink[]; className?: string }) {
  return (
    <ul className={className}>
      {links.map(({ label, href }) => (
        <li key={label}>
          <FooterAnchor href={href}>{label}</FooterAnchor>
        </li>
      ))}
    </ul>
  );
}

/** Desktop: title + links side by side. Mobile: small muted title above the links. */
function FooterRow({ title, links, listClassName }: { title: string; links: NavLink[]; listClassName: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-[calc(700*var(--u))_1fr] pt-[calc(19.5*var(--u))] pb-[calc(22*var(--u))] text-[calc(20*var(--u))] leading-[calc(19*var(--u))]",
        "max-md:grid-cols-1 max-md:gap-4 max-md:pt-4 max-md:pb-5",
        rule,
      )}
    >
      <h2 className="max-md:text-[calc(17*var(--u))] max-md:leading-[calc(16*var(--u))] max-md:opacity-75">{title}</h2>
      <LinkList links={links} className={listClassName} />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-espresso">
      {/* md+: at least 80% of the screen tall; any extra space is shared evenly between the link
          rows, the wordmark and the bottom row (Figma: ~34px each at its natural height). */}
      <Container
        className={cn(
          "flex min-h-[80svh] flex-col justify-between px-[calc(38.5*var(--u))] pt-[calc(19*var(--u))] pb-5 max-md:min-h-0 max-md:px-[calc(27*var(--u))] max-md:pt-[calc(29*var(--u))] max-md:pb-[calc(25*var(--u))]",
          strokeText,
        )}
      >
        <div className={ruleBelow}>
          <LinkList
            links={socials}
            className="mb-5 flex gap-8 text-[calc(13*var(--u))] leading-[calc(12.3*var(--u))] opacity-80 [-webkit-text-stroke-width:calc(0.47*var(--u))] md:hidden"
          />
          <FooterRow
            title="Sitemap"
            links={sitemap}
            listClassName="flex flex-col gap-3 max-md:text-[calc(25*var(--u))] max-md:leading-[calc(23.8*var(--u))] max-md:[-webkit-text-stroke-width:calc(1*var(--u))]"
          />
          {/* Mobile: the email on its own line, the two numbers side by side below it. */}
          <FooterRow
            title="Contact"
            links={contact}
            listClassName="flex flex-col gap-3 whitespace-nowrap max-md:flex-row max-md:flex-wrap max-md:justify-between max-md:text-[calc(17*var(--u))] max-md:leading-[calc(16*var(--u))] max-md:[-webkit-text-stroke-width:calc(0.65*var(--u))] max-md:[&>li:first-child]:basis-full"
          />
        </div>

        <Wordmark className="mt-[calc(33.86*var(--u))] w-[calc(1200.97*var(--u))] max-w-full text-parchment max-md:mt-[calc(25*var(--u))] max-md:w-[calc(337*var(--u))]" />

        <div className="mt-[calc(33.72*var(--u))] flex justify-between pr-1.5 text-[calc(15*var(--u))] leading-[calc(14.2*var(--u))] [-webkit-text-stroke-width:calc(0.5*var(--u))] max-md:mt-[calc(21*var(--u))] max-md:pr-0 max-md:text-[calc(13*var(--u))] max-md:opacity-80">
          <LinkList links={socials} className="flex gap-16 max-md:hidden" />
          <p>© 2026 COZZI. Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
