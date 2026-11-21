import { TransitionLink } from "@/components/ui/transition-link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";
import { contact, sitemap, socials, type NavLink } from "@/content/navigation";
import { cn } from "@/lib/cn";

// Hairline weight thickened with a stroke; all of it parchment (links included), like the wordmark.
const strokeText = "text-parchment [-webkit-text-stroke:0.75px_var(--color-parchment)]";
const rule = "border-t-2 border-sand/50 max-md:border-t-[1.5px]";
const ruleBelow = "border-b-2 border-sand/50 max-md:border-b-[1.5px]";

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
        "grid grid-cols-[700px_1fr] pt-[19.5px] pb-[22px] text-[20px] leading-[19px]",
        "max-md:grid-cols-1 max-md:gap-4 max-md:pt-4 max-md:pb-5",
        rule,
      )}
    >
      <h2 className="max-md:text-[17px] max-md:leading-[16px] max-md:opacity-75">{title}</h2>
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
          "flex min-h-[calc(80svh/var(--zoom))] flex-col justify-between px-[38.5px] pt-[19px] pb-5 max-md:min-h-0 max-md:px-[27px] max-md:pt-[29px] max-md:pb-[25px]",
          strokeText,
        )}
      >
        <div className={ruleBelow}>
          <LinkList
            links={socials}
            className="mb-5 flex gap-8 text-[13px] leading-[12.3px] opacity-80 [-webkit-text-stroke-width:0.47px] md:hidden"
          />
          <FooterRow
            title="Sitemap"
            links={sitemap}
            listClassName="flex flex-col gap-3 max-md:text-[25px] max-md:leading-[23.8px] max-md:[-webkit-text-stroke-width:1px]"
          />
          {/* Mobile: the email on its own line, the two numbers side by side below it. */}
          <FooterRow
            title="Contact"
            links={contact}
            listClassName="flex flex-col gap-3 whitespace-nowrap max-md:flex-row max-md:flex-wrap max-md:justify-between max-md:text-[17px] max-md:leading-[16px] max-md:[-webkit-text-stroke-width:0.65px] max-md:[&>li:first-child]:basis-full"
          />
        </div>

        <Wordmark className="mt-[33.86px] w-[1200.97px] max-w-full text-parchment max-md:mt-[25px] max-md:w-[337px]" />

        <div className="mt-[33.72px] flex justify-between pr-1.5 text-[15px] leading-[14.2px] [-webkit-text-stroke-width:0.5px] max-md:mt-[21px] max-md:pr-0 max-md:text-[13px] max-md:opacity-80">
          <LinkList links={socials} className="flex gap-16 max-md:hidden" />
          <p>© 2026 COZZI. Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
