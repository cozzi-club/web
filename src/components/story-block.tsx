import type { CSSProperties, ReactNode } from "react";
import { CircleArrow } from "@/components/ui/circle-arrow";
import { Heading } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

type Props = {
  label: string;
  title: ReactNode;
  children: ReactNode;
  /** Design x the arrow button brings to the viewport centre (omit for no arrow). */
  next?: number;
  /** Vertical gap (px) between label, title and body — differs per block in Figma. */
  gap: number;
  titleClassName?: string;
  className?: string;
  style?: CSSProperties;
};

/** About story column: small label, Banter title, muted justified body (+ optional next arrow). */
export function StoryBlock({ label, title, children, next, gap, titleClassName, className, style }: Props) {
  return (
    <article className={cn("flex flex-col items-center text-center text-ink", className)} style={{ ...style, gap }}>
      <p className="font-sans text-[10.9px] leading-[14.8px] font-medium tracking-[0.1em] text-espresso uppercase">{label}</p>
      <Heading size="lg" className={cn("leading-[57.2px]!", titleClassName)}>
        {title}
      </Heading>
      <p className="w-[329px] text-justify font-sans text-[18.5px] leading-[20px] font-medium tracking-[-0.02em] opacity-50">
        {children}
      </p>
      {next !== undefined && (
        <button type="button" data-scroll-to={next} aria-label="Next story" className="cursor-pointer text-espresso">
          <CircleArrow />
        </button>
      )}
    </article>
  );
}
