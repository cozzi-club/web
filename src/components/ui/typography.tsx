import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/cn";

type PolymorphicProps<T extends ElementType> = { as?: T } & Omit<ComponentProps<T>, "as">;

const headingSizes = {
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-heading",
} as const;

/** Banter Grotesk display heading — always uppercase, per Figma. */
export function Heading<T extends ElementType = "h2">({
  as,
  size = "lg",
  className,
  ...props
}: PolymorphicProps<T> & { size?: keyof typeof headingSizes }) {
  const Tag: ElementType = as ?? "h2";
  return <Tag className={cn("font-display font-bold uppercase", headingSizes[size], className)} {...props} />;
}

const textVariants = {
  body: "text-body font-hairline",
  lead: "text-lead font-medium",
  label: "text-label font-medium uppercase",
  "label-lg": "text-label-lg font-medium uppercase",
  caption: "text-caption font-medium",
} as const;

/** TT Neoris body copy. */
export function Text<T extends ElementType = "p">({
  as,
  variant = "body",
  className,
  ...props
}: PolymorphicProps<T> & { variant?: keyof typeof textVariants }) {
  const Tag: ElementType = as ?? "p";
  return <Tag className={cn("font-sans", textVariants[variant], className)} {...props} />;
}
