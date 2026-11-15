"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Track } from "@/content/playlist";

const RESTART_AFTER = 3; // seconds — "previous" restarts the track past this point

/**
 * Audio playback for a list of tracks. Attach `audio` to an <audio> element.
 *
 * `play()` starts the element muted inside the click (so browsers allow it) and remembers
 * the position; `engage()` — called when the needle touches the record — rewinds to that
 * position and unmutes, so sound starts exactly on needle-down.
 */
export function usePlaylist(tracks: Track[], { initialVolume = 0.3 } = {}) {
  const audio = useRef<HTMLAudioElement>(null);
  const resumeAt = useRef(0);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [volume, setVolume] = useState(initialVolume);

  const play = useCallback(() => {
    const element = audio.current;
    if (!element) return;
    resumeAt.current = element.currentTime;
    element.muted = true;
    element.play().catch(() => setPlaying(false));
    setPlaying(true);
  }, []);

  const engage = useCallback(() => {
    const element = audio.current;
    if (!element) return;
    element.currentTime = resumeAt.current;
    element.muted = false;
    setEngaged(true);
  }, []);

  const pause = useCallback(() => {
    audio.current?.pause();
    setPlaying(false);
    setEngaged(false);
  }, []);

  const toggle = useCallback(() => (playing ? pause() : play()), [playing, pause, play]);

  const skip = useCallback((step: 1 | -1) => {
    const element = audio.current;
    if (step === -1 && element && element.currentTime > RESTART_AFTER) {
      element.currentTime = 0;
      return;
    }
    resumeAt.current = 0;
    setIndex((current) => (current + step + tracks.length) % tracks.length);
  }, [tracks.length]);

  const next = useCallback(() => skip(1), [skip]);
  const previous = useCallback(() => skip(-1), [skip]);

  // Keep playing across track changes once the needle is down.
  useEffect(() => {
    const element = audio.current;
    if (!element || !engaged) return;
    element.muted = false;
    element.play().catch(() => setPlaying(false));
  }, [index, engaged]);

  useEffect(() => {
    if (audio.current) audio.current.volume = volume;
  }, [volume]);

  return {
    audio,
    track: tracks[index],
    playing,
    volume,
    setVolume,
    play,
    pause,
    toggle,
    next,
    previous,
    engage,
    /** Wire to the <audio> element's `ended` event. */
    onEnded: next,
  };
}
