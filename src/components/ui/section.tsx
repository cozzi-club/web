import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Page section: full-screen (min one viewport, content centred) from md up; natural height on mobile. */
export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("relative flex flex-col justify-center md:min-h-svh", className)} {...props} />;
}
