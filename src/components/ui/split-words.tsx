import { Fragment } from "react";

/**
 * Text split into words (`[data-word]`) for word-by-word reveals. Lines split on "\n".
 * `mask` (default): each word sits in an overflow mask, so animating its yPercent from ~110 → 0
 * slides it up into view; the mask is padded so descenders aren't clipped by tight line-heights.
 * `mask={false}`: bare inline-block words (for effects a mask would clip, like a blur).
 */
export function SplitWords({ text, mask = true }: { text: string; mask?: boolean }) {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line.split(" ").map((word, j) => (
        <Fragment key={j}>
          {j > 0 && " "}
          {mask ? (
            <span className="-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
              <span data-word className="inline-block">
                {word}
              </span>
            </span>
          ) : (
            <span data-word className="inline-block">
              {word}
            </span>
          )}
        </Fragment>
      ))}
    </Fragment>
  ));
}
