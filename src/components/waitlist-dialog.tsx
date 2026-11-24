"use client";

import { OctagonX } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Field } from "@/components/ui/field";
import { useWaitlistDialog } from "@/hooks/use-waitlist-dialog";

const label = "font-sans text-[calc(14*var(--u))] leading-[calc(14*var(--u))] font-medium tracking-[0.1em] uppercase";

/**
 * "Be the first to be notified" sheet (Figma catalog): frosted glass (only the sheet blurs what's
 * behind it), slides up from the bottom of the screen when a product card is clicked
 * (`openWaitlist`) and back down when closed (`display`/`overlay` transition discretely, so it stays
 * in the top layer until it's out of view). The backdrop is clear but still closes the sheet on
 * click. Rendered once, in the root layout.
 */
export function WaitlistDialog() {
  const { dialog, status, close, onSubmit } = useWaitlistDialog();

  return (
    <dialog
      ref={dialog}
      aria-label="Waitlist"
      // Wheel events here belong to the sheet, not to Lenis scrolling the page behind it.
      data-lenis-prevent
      onClick={(event) => event.target === event.currentTarget && close()}
      className="mx-0 mt-auto mb-0 max-h-none w-full max-w-none rounded-t-[5px] bg-[#bcbcbc]/35 p-0 text-[#141414] backdrop-blur-xl backdrop:bg-transparent translate-y-full transition-[translate,display,overlay] transition-discrete duration-500 ease-in-out open:translate-y-0 starting:open:translate-y-full"
    >
      <Container className="h-[calc(266*var(--u))] pt-[calc(31*var(--u))] max-md:h-auto max-md:px-6 max-md:pt-6 max-md:pb-6">
        <div className="mx-auto flex w-[calc(363*var(--u))] flex-col gap-[calc(33*var(--u))] max-md:w-full max-md:gap-6">
          <div className="flex items-start justify-between">
            <p className={label}>
              Be the first to be notified
              <br />
              when we go live
            </p>
            <button type="button" aria-label="Close" onClick={close} className="cursor-pointer">
              <OctagonX size={20} strokeWidth={1.5} absoluteStrokeWidth aria-hidden className="size-[calc(20*var(--u))]" />
            </button>
          </div>

          {status === "joined" ? (
            <p className={label} role="status">
              You&apos;re in! Welcome to Cozzi
            </p>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-[calc(13*var(--u))]">
              <Field
                label="Email*"
                type="email"
                name="email"
                required
                autoFocus
                autoComplete="email"
                placeholder="Enter e-mail address"
              />
              {/* Honeypot: hidden from people, ticked by bots; Web3Forms drops those submissions. */}
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
              <button
                type="submit"
                disabled={status === "sending"}
                className={`h-[calc(45*var(--u))] cursor-pointer rounded-[calc(2*var(--u))] border border-[#8e8e8e] transition-colors hover:bg-[#141414] hover:text-cream disabled:cursor-wait disabled:opacity-60 ${label}`}
              >
                {status === "sending" ? "Sending" : "Submit"}
              </button>
              {status === "error" && (
                <p role="alert" className="font-sans text-[calc(11*var(--u))] leading-[calc(13*var(--u))] font-medium">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </Container>
    </dialog>
  );
}
