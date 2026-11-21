"use client";

import { Text } from "@/components/ui/typography";
import { openWaitlist } from "@/hooks/use-waitlist-dialog";

const MESSAGE = "Online store launching soon. Join the waitlist.";

/**
 * Site-wide banner (Figma: ink bar, one 13px line in the regular weight). Desktop height is Figma's
 * 44px less a fifth (35.2px, per the review comment); 33px / 11px in the mobile frame. Sized in
 * design px (--u), like the rest of the page (~53px tall at 1920); the bar itself stays full width.
 * The whole bar opens the waitlist sheet.
 */
export function AnnouncementBar() {
  return (
    <button
      type="button"
      onClick={openWaitlist}
      className="flex h-[calc(35.2*var(--u))] w-full cursor-pointer items-center justify-center bg-ink px-[16px] max-md:h-[calc(33*var(--u))]"
    >
      <Text
        as="span"
        variant="caption"
        className="text-[calc(13*var(--u))]! leading-[1.3] font-normal! whitespace-nowrap text-bone max-md:text-[calc(11*var(--u))]!"
      >
        {MESSAGE}
      </Text>
    </button>
  );
}
