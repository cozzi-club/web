import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Small pill label, e.g. "COMING SOON" on product cards. */
export function Badge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex h-[17px] items-center justify-center rounded-[6px] bg-ash pt-[3px] pr-3 pb-px pl-4",
        "font-sans text-[8.8px] leading-[12.4px] font-semibold text-paper uppercase whitespace-nowrap",
        className,
      )}
      {...props}
    />
  );
}
