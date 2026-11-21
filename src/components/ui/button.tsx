import { TransitionLink } from "@/components/ui/transition-link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * parchment = on dark backgrounds, white = on dark photos, rust = on light backgrounds, ink = dark outline on light,
 * ink-parchment = ink on mobile, parchment from md (sections that are light on mobile, dark on desktop).
 */
type Tone = "parchment" | "white" | "rust" | "ink" | "ink-parchment";

type StyleProps = { tone?: Tone };

// Figma "btn state 0" is the outline; "btn hover" is the filled state.
const tones: Record<Tone, { outline: string; fill: string }> = {
  parchment: { outline: "border-parchment text-parchment", fill: "bg-parchment text-ink" },
  white: { outline: "border-white text-white", fill: "bg-white text-ink" },
  rust: { outline: "border-rust text-rust", fill: "bg-rust text-parchment" },
  ink: { outline: "border-ink text-ink", fill: "bg-ink text-parchment" },
  "ink-parchment": {
    outline: "border-ink text-ink md:border-parchment md:text-parchment",
    fill: "bg-ink text-parchment md:bg-parchment md:text-ink",
  },
};

const base =
  "group relative inline-flex h-12 min-w-[210px] items-center justify-center rounded-[2.5px] border-[1.25px] px-10 " +
  "font-sans text-label font-medium uppercase whitespace-nowrap " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current";

// Filled copy of the button (covers the border), revealed left → right with clip-path,
// so the label colour flips exactly at the wipe edge.
const fillLayer =
  "absolute inset-[-1.25px] flex items-center justify-center rounded-[inherit] " +
  "[clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-350 ease-[cubic-bezier(0.65,0,0.35,1)] " +
  "group-hover:[clip-path:inset(0)] group-focus-visible:[clip-path:inset(0)] motion-reduce:transition-none";

function ButtonContent({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <>
      {children}
      <span aria-hidden className={cn(fillLayer, tones[tone].fill)}>
        {children}
      </span>
    </>
  );
}

export function Button({
  tone = "ink",
  className,
  type = "button",
  children,
  ...props
}: StyleProps & ComponentProps<"button">) {
  return (
    <button type={type} className={cn(base, tones[tone].outline, className)} {...props}>
      <ButtonContent tone={tone}>{children}</ButtonContent>
    </button>
  );
}

export function ButtonLink({ tone = "ink", className, children, ...props }: StyleProps & ComponentProps<typeof TransitionLink>) {
  return (
    <TransitionLink className={cn(base, tones[tone].outline, className)} {...props}>
      <ButtonContent tone={tone}>{children}</ButtonContent>
    </TransitionLink>
  );
}
