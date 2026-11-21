import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

// Figma form fields: 11px label, 10px gap, 46px filled box (r2). light = waitlist glass, dark = inquiry page.
const tones = {
  light: { label: "text-[#252525]", control: "bg-[#afaeae]/50 text-[#252525] placeholder:text-[#252525] focus-visible:ring-[#141414]" },
  // Inquiry labels sit in 7px-tall boxes in Figma (the glyphs overflow), so the field stack matches its height.
  dark: { label: "text-[#dabeb5] leading-[calc(7*var(--u))]!", control: "bg-[#61463c] text-[#dabeb5] placeholder:text-[#dabeb5]/80 focus-visible:ring-[#dabeb5]" },
};

const text = "font-sans text-[calc(11*var(--u))] leading-[calc(13*var(--u))] font-medium tracking-[-0.03em]";
const control = "w-full rounded-[calc(2*var(--u))] px-[calc(15*var(--u))] outline-none focus-visible:ring-[calc(1*var(--u))]";

type Common = { label: string; tone?: keyof typeof tones; className?: string };

/** Labelled input (or textarea with `multiline`). */
export function Field({
  label,
  tone = "light",
  className,
  multiline,
  ...props
}: Common & ({ multiline?: false } & ComponentProps<"input">) | (Common & { multiline: true } & ComponentProps<"textarea">)) {
  const styles = tones[tone];
  return (
    <label className={cn("flex flex-col gap-[calc(10*var(--u))]", className)}>
      <span className={cn(text, styles.label)}>{label}</span>
      {multiline ? (
        <textarea
          {...(props as ComponentProps<"textarea">)}
          className={cn(control, text, styles.control, "h-[calc(172*var(--u))] resize-none py-[calc(15*var(--u))]")}
        />
      ) : (
        <input {...(props as ComponentProps<"input">)} className={cn(control, text, styles.control, "h-[calc(46*var(--u))]")} />
      )}
    </label>
  );
}
