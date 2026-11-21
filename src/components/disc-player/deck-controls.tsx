import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { u } from "@/lib/design";
import styles from "./volume-slider.module.css";

// Figma deck buttons: 39×26, #242c35, gradient rim, four inset shadows.
const deckButton =
  "flex h-[calc(26*var(--u))] w-[calc(39*var(--u))] cursor-pointer items-center justify-center rounded-[calc(3.25*var(--u))] border-[calc(1.8*var(--u))] border-transparent text-[#fbffff] " +
  "[background:linear-gradient(#242c35,#242c35)_padding-box,linear-gradient(160deg,#363a3f,#373b40_92%,#63676f)_border-box] " +
  "shadow-[inset_calc(1.8*var(--u))_calc(1.8*var(--u))_calc(1.8*var(--u))_#191c22,inset_calc(-1.8*var(--u))_calc(-1.8*var(--u))_calc(1.8*var(--u))_#191c22,inset_calc(1.8*var(--u))_calc(-1.8*var(--u))_calc(1.8*var(--u))_#191c22,inset_calc(-1.8*var(--u))_calc(1.8*var(--u))_calc(1.8*var(--u))_#191c22] " +
  "transition-transform active:translate-y-px active:brightness-90 " +
  "focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-parchment";

function DeckButton({ label, onClick, pressed, children }: { label: string; onClick: () => void; pressed?: boolean; children: ReactNode }) {
  return (
    <button type="button" aria-label={label} aria-pressed={pressed} onClick={onClick} className={deckButton}>
      {children}
    </button>
  );
}

const icon = { fill: "currentColor", "aria-hidden": true } as const;

const icons = {
  previous: (
    <svg width="11.8" height="7.5" style={{ width: u(11.8), height: u(7.5) }} viewBox="0 0 11.8 7.5" {...icon}>
      <path d="M6.5 0v7.5L0 3.75zM10.8 0v7.5L4.3 3.75z" />
    </svg>
  ),
  playPause: (
    <svg width="16.4" height="7.5" style={{ width: u(16.4), height: u(7.5) }} viewBox="0 0 16.4 7.5" {...icon}>
      <path d="M0 0v7.5l6.5-3.75z" />
      <path d="M10.4 1.6 9.3 5.7M13.6 2.1v3.4M15.9 2.1v3.4" stroke="currentColor" strokeWidth={1.06} strokeLinecap="round" />
    </svg>
  ),
  next: (
    <svg width="11.8" height="7.5" style={{ width: u(11.8), height: u(7.5) }} viewBox="0 0 11.8 7.5" {...icon}>
      <path d="M0 0v7.5l6.5-3.75zM4.3 0v7.5l6.5-3.75z" />
    </svg>
  ),
};

type Props = {
  playing: boolean;
  onToggle: () => void;
  onPrevious: () => void;
  onNext: () => void;
  /** 0–1 */
  volume: number;
  onVolume: (volume: number) => void;
  style?: CSSProperties;
};

const VOLUME_STEPS = 50; // matches the 0–50 scale printed on the deck

/** Transport buttons + volume slider of the disc player. */
export function DeckControls({ playing, onToggle, onPrevious, onNext, volume, onVolume, style }: Props) {
  return (
    <div className="absolute flex flex-col gap-[calc(9.3*var(--u))]" style={style}>
      <div className="flex justify-between">
        <DeckButton label="Previous track" onClick={onPrevious}>
          {icons.previous}
        </DeckButton>
        <DeckButton label={playing ? "Pause" : "Play"} pressed={playing} onClick={onToggle}>
          {icons.playPause}
        </DeckButton>
        <DeckButton label="Next track" onClick={onNext}>
          {icons.next}
        </DeckButton>
      </div>
      <input
        type="range"
        min={0}
        max={VOLUME_STEPS}
        step={1}
        value={Math.round(volume * VOLUME_STEPS)}
        onChange={(event) => onVolume(Number(event.target.value) / VOLUME_STEPS)}
        aria-label="Volume"
        className={cn(styles.slider, "w-full")}
      />
    </div>
  );
}
