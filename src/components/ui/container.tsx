import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Props = ComponentProps<"div"> & {
  /** Pin the frame to the top/bottom edge of its (positioned) parent, or `fixed` to the top of the viewport. */
  pin?: "top" | "bottom" | "fixed";
};

/**
 * A design frame: 390 design px wide below md, 1280 above (--u: the screen width, capped at 1920px
 * on desktop). Children are laid out in design px. Positioning context for placed images.
 */
export function Container({ pin, className, ...props }: Props) {
  return (
    <div
      className={cn(
        "mx-auto w-[calc(390*var(--u))] text-body md:w-[calc(1280*var(--u))]",
        pin === "fixed" ? "fixed inset-x-0 top-0" : pin ? `absolute inset-x-0 ${pin === "top" ? "top-0" : "bottom-0"}` : "relative",
        className,
      )}
      {...props}
    />
  );
}
