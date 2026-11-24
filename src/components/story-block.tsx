import type { CSSProperties, ReactNode } from "react";
import { CircleArrow } from "@/components/ui/circle-arrow";
import { Heading } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import { u } from "@/lib/design";

type Props = {
  label: string;
  title: ReactNode;
  /** Body copy (optional: a block can be label + title only). */
  children?: ReactNode;
  /** Design x the arrow button brings to the viewport centre (omit for no arrow). */
  next?: number;
  /** Vertical gap (px) between label, title and body — differs per block in Figma. */
  gap: number;
  titleClassName?: string;
  className?: string;
  style?: CSSProperties;
};

/** About story column: small label, Banter title, optional muted justified body (+ optional next arrow). */
export function StoryBlock({ label, title, children, next, gap, titleClassName, className, style }: Props) {
  return (
    <article className={cn("flex flex-col items-center text-center text-ink", className)} style={{ ...style, gap: u(gap) }}>
      <p className="font-sans text-[calc(10.9*var(--u))] leading-[calc(14.8*var(--u))] font-medium tracking-[0.1em] text-espresso uppercase">{label}</p>
      <Heading size="lg" className={cn("leading-[calc(57.2*var(--u))]!", titleClassName)}>
        {title}
      </Heading>
      {children && (
        <p className="w-[calc(329*var(--u))] text-justify font-sans text-[calc(18.5*var(--u))] leading-[calc(20*var(--u))] font-medium tracking-[-0.02em] opacity-50">
          {children}
        </p>
      )}
      {next !== undefined && (
        <button type="button" data-scroll-to={next} aria-label="Next story" className="cursor-pointer text-espresso">
          <CircleArrow />
        </button>
      )}
    </article>
  );
}
