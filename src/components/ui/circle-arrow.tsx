import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** 37px outlined circle with a right arrow (Figma "Group 2483"). Color from `text-*`. */
export function CircleArrow({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn("flex size-[37px] items-center justify-center rounded-full border-2 border-current", className)}
      aria-hidden
      {...props}
    >
      <ArrowRight size={20} strokeWidth={2.3} absoluteStrokeWidth />
    </span>
  );
}
