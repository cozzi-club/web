"use client";

import { Text } from "@/components/ui/typography";
import { openWaitlist } from "@/hooks/use-waitlist-dialog";

const MESSAGE = "Online store launching soon. Join the waitlist.";

/**
 * Site-wide banner (Figma: ink bar, one 13px line in the regular weight). Desktop height is Figma's
 * 44px less a fifth (35.2px, per the review comment); 33px / 11px in the mobile frame. Sized in
 * design px × the design zoom, like the rest of the page (~53px tall at 1920).
 * Height and text are scaled directly rather than with CSS zoom, which would also widen the
 * full-width bar. The whole bar opens the waitlist sheet.
 */
export function AnnouncementBar() {
  return (
    <button
      type="button"
      onClick={openWaitlist}
      className="flex h-[calc(35.2px*var(--zoom))] w-full cursor-pointer items-center justify-center bg-ink px-4 max-md:h-[calc(33px*var(--zoom))]"
    >
      <Text
        as="span"
        variant="caption"
        className="text-[calc(13px*var(--zoom))]! leading-[1.3] font-normal! whitespace-nowrap text-bone max-md:text-[calc(11px*var(--zoom))]!"
      >
        {MESSAGE}
      </Text>
    </button>
  );
}
