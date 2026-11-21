"use client";

import { OctagonX } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Field } from "@/components/ui/field";
import { useWaitlistDialog } from "@/hooks/use-waitlist-dialog";

const label = "font-sans text-[14px] leading-[14px] font-medium tracking-[0.1em] uppercase";

/**
 * "Be the first to be notified" sheet (Figma catalog): frosted glass (only the sheet blurs what's
 * behind it), slides up from the bottom of the screen when a product card is clicked
 * (`openWaitlist`) and back down when closed (`display`/`overlay` transition discretely, so it stays
 * in the top layer until it's out of view). The backdrop is clear but still closes the sheet on
 * click. Rendered once, in the root layout.
 */
export function WaitlistDialog() {
  const { dialog, joined, close, onSubmit } = useWaitlistDialog();

  return (
    <dialog
      ref={dialog}
      aria-label="Waitlist"
      // Wheel events here belong to the sheet, not to Lenis scrolling the page behind it.
      data-lenis-prevent
      onClick={(event) => event.target === event.currentTarget && close()}
      className="mx-0 mt-auto mb-0 max-h-none w-full max-w-none rounded-t-[5px] bg-[#bcbcbc]/35 p-0 text-[#141414] backdrop-blur-xl backdrop:bg-transparent translate-y-full transition-[translate,display,overlay] transition-discrete duration-500 ease-in-out open:translate-y-0 starting:open:translate-y-full"
    >
      <Container className="h-[266px] pt-[31px] max-md:h-auto max-md:px-6 max-md:pt-6 max-md:pb-6">
        <div className="mx-auto flex w-[363px] flex-col gap-[33px] max-md:w-full max-md:gap-6">
          <div className="flex items-start justify-between">
            <p className={label}>
              Be the first to be notified
              <br />
              when we go live
            </p>
            <button type="button" aria-label="Close" onClick={close} className="cursor-pointer">
              <OctagonX size={20} strokeWidth={1.5} absoluteStrokeWidth aria-hidden />
            </button>
          </div>

          {joined ? (
            <p className={label} role="status">
              Thank you! We&apos;ll let you know.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-[13px]">
              <Field
                label="Email*"
                type="email"
                name="email"
                required
                autoFocus
                autoComplete="email"
                placeholder="Enter e-mail address"
              />
              <button
                type="submit"
                className={`h-[45px] cursor-pointer rounded-[2px] border border-[#8e8e8e] transition-colors hover:bg-[#141414] hover:text-cream ${label}`}
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </Container>
    </dialog>
  );
}
