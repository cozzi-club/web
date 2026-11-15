import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Props = ComponentProps<"div"> & {
  /** Pin the frame to the top/bottom edge of its (positioned) parent, or `fixed` to the top of the viewport. */
  pin?: "top" | "bottom" | "fixed";
};

/**
 * A design frame: 390px wide below md, 1280px above, scaled to the viewport via `design-zoom`.
 * Children are laid out in design px. Positioning context for placed images.
 */
export function Container({ pin, className, ...props }: Props) {
  return (
    <div
      className={cn(
        "mx-auto w-[390px] design-zoom md:w-[1280px]",
        pin === "fixed" ? "fixed inset-x-0 top-0" : pin ? `absolute inset-x-0 ${pin === "top" ? "top-0" : "bottom-0"}` : "relative",
        className,
      )}
      {...props}
    />
  );
}
