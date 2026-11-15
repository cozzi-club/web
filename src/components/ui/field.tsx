import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

// Figma form fields: 11px label, 10px gap, 46px filled box (r2). light = waitlist glass, dark = enquiry page.
const tones = {
  light: { label: "text-[#252525]", control: "bg-[#afaeae]/50 text-[#252525] placeholder:text-[#252525] focus-visible:ring-[#141414]" },
  // Enquiry labels sit in 7px-tall boxes in Figma (the glyphs overflow), so the field stack matches its height.
  dark: { label: "text-[#dabeb5] leading-[7px]!", control: "bg-[#61463c] text-[#dabeb5] placeholder:text-[#dabeb5]/80 focus-visible:ring-[#dabeb5]" },
};

const text = "font-sans text-[11px] leading-[13px] font-semibold tracking-[-0.03em]";
const control = "w-full rounded-[2px] px-[15px] outline-none focus-visible:ring-1";

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
    <label className={cn("flex flex-col gap-[10px]", className)}>
      <span className={cn(text, styles.label)}>{label}</span>
      {multiline ? (
        <textarea
          {...(props as ComponentProps<"textarea">)}
          className={cn(control, text, styles.control, "h-[172px] resize-none py-[15px]")}
        />
      ) : (
        <input {...(props as ComponentProps<"input">)} className={cn(control, text, styles.control, "h-[46px]")} />
      )}
    </label>
  );
}
