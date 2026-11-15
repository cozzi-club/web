"use client";

import { SplitWords } from "@/components/ui/split-words";
import { useIntroUnblur } from "@/hooks/use-intro-unblur";
import { useUnblurReveal } from "@/hooks/use-unblur-reveal";

/** Heading copy that unblurs word by word as it scrolls into view (`useUnblurReveal`). Lines split on "\n". */
export function UnblurWords({ text }: { text: string }) {
  const root = useUnblurReveal<HTMLSpanElement>();
  return (
    <span ref={root}>
      <SplitWords text={text} mask={false} />
    </span>
  );
}

/** On-screen-at-load copy that unblurs with the page intro: with the preloader's doors, or at once (`useIntroUnblur`). */
export function IntroUnblurWords({ text }: { text: string }) {
  const root = useIntroUnblur<HTMLSpanElement>();
  return (
    <span ref={root} data-intro-unblur>
      <SplitWords text={text} mask={false} />
    </span>
  );
}
