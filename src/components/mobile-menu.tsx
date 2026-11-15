"use client";

import { Plus, X } from "lucide-react";
import { TransitionLink } from "@/components/ui/transition-link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Logo } from "@/components/ui/logo";
import { sitemap } from "@/content/navigation";
import { cn } from "@/lib/cn";

/** Mobile "Menu" button (Figma: 20px ring + plus, tiny label) with a full-screen sitemap overlay. */
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
        onClick={() => setOpen(true)}
        className={cn("flex cursor-pointer flex-col items-center gap-[6px]", className)}
      >
        <span className="flex size-5 items-center justify-center rounded-full border-[0.75px] border-current">
          <Plus size={9} strokeWidth={1} absoluteStrokeWidth aria-hidden />
        </span>
        <span className="font-sans text-[6px] leading-[7.8px] tracking-[-0.1em]">Menu</span>
      </button>

      {/* Portalled to <body> so the zoomed header container doesn't scale the overlay. */}
      {open &&
        createPortal(
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-lenis-prevent
            className="fixed inset-0 z-50 flex flex-col bg-espresso px-6 py-5 text-parchment transition-opacity duration-300 starting:opacity-0"
          >
            <div className="flex items-center justify-between">
              <Logo className="w-[68px]" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="cursor-pointer p-1"
              >
                <X size={22} strokeWidth={1.5} absoluteStrokeWidth aria-hidden />
              </button>
            </div>
            <nav className="mt-auto mb-auto">
              <ul className="flex flex-col gap-3 font-display text-[42px] leading-[42px] font-bold tracking-[-0.03em] uppercase">
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
