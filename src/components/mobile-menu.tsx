"use client";

import { TransitionLink } from "@/components/ui/transition-link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { sitemap } from "@/content/navigation";
import { cn } from "@/lib/cn";

/** Line geometry of the burger, in its 26×18 viewBox (design px). */
const LINE = "transition-[translate,rotate,opacity] duration-300 ease-out [transform-box:fill-box] origin-center";

/**
 * Burger (three lines) that turns into an X while open: the middle line fades out, the top and
 * bottom lines meet in the middle and rotate ±45°.
 */
function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 26 18" fill="none" aria-hidden className="h-[calc(18*var(--u))] w-[calc(26*var(--u))] overflow-visible">
      <g stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <path d="M1 1h24" className={cn(LINE, open && "translate-y-[8px] rotate-45")} />
        <path d="M1 9h24" className={cn(LINE, open && "opacity-0")} />
        <path d="M1 17h24" className={cn(LINE, open && "-translate-y-[8px] -rotate-45")} />
      </g>
    </svg>
  );
}

/**
 * Mobile menu: a burger in the header that opens a full-screen sitemap overlay. The overlay sits
 * under the header (z-30 vs the header's z-40), so the logo and the button stay on top and the
 * burger becomes the close (X) button.
 */
export function MobileMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className={cn("cursor-pointer p-[calc(8*var(--u))]", className)}
      >
        <BurgerIcon open={open} />
      </button>

      {/* Portalled to <body>, out of the header frame; plain px inside (--u: 1px). */}
      {open &&
        createPortal(
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-lenis-prevent
            className="fixed inset-0 z-30 flex flex-col bg-espresso px-6 py-5 text-parchment [--u:1px] transition-opacity duration-300 starting:opacity-0"
          >
            <nav className="mt-auto mb-auto">
              <ul className="flex flex-col gap-3 font-display text-[calc(42*var(--u))] leading-[calc(42*var(--u))] font-bold tracking-[-0.03em] uppercase">
                {sitemap.map(({ label, href }) => (
                  <li key={label}>
                    <TransitionLink href={href} onClick={() => setOpen(false)} className="transition-opacity hover:opacity-60">
                      {label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}
