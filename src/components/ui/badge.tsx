import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Small pill label, e.g. "COMING SOON" on product cards. */
export function Badge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex h-[calc(17*var(--u))] items-center justify-center rounded-[calc(6*var(--u))] bg-ash pt-[calc(3*var(--u))] pr-3 pb-px pl-4",
        "font-sans text-[calc(8.8*var(--u))] leading-[calc(12.4*var(--u))] font-medium text-paper uppercase whitespace-nowrap",
        className,
      )}
      {...props}
    />
  );
}
