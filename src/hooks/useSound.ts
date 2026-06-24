"use client";

import { useRef } from "react";

type SoundType =
  | "hoverCreator"
  | "hoverCyber"
  | "selectCreator"
  | "selectCyber"
  | "reveal"
  | "pulse";

export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  };

  const playTone = (
    frequency: number,
    duration: number,
    type: OscillatorType = "sine",
    volume = 0.05,
  ) => {
    const ctx = getContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  };

  const playSound = (type: SoundType) => {
    try {
      switch (type) {
        case "hoverCreator":
          playTone(420, 0.12, "sine", 0.025);
          setTimeout(() => playTone(620, 0.1, "sine", 0.018), 70);
          break;

        case "hoverCyber":
          playTone(180, 0.08, "square", 0.018);
          setTimeout(() => playTone(520, 0.09, "triangle", 0.022), 70);
          break;

        case "selectCreator":
          playTone(220, 0.2, "sine", 0.05);
          setTimeout(() => playTone(440, 0.25, "sine", 0.045), 120);
          setTimeout(() => playTone(660, 0.35, "sine", 0.035), 260);
          break;

        case "selectCyber":
          playTone(120, 0.12, "square", 0.035);
          setTimeout(() => playTone(240, 0.14, "square", 0.03), 120);
          setTimeout(() => playTone(720, 0.22, "triangle", 0.035), 260);
          break;

        case "reveal":
          playTone(90, 0.45, "sine", 0.055);
          setTimeout(() => playTone(260, 0.3, "triangle", 0.035), 160);
          break;

        case "pulse":
          playTone(70, 0.25, "sine", 0.035);
          break;
      }
    } catch {
      // Audio may be blocked until user interaction.
    }
  };

  return { playSound };
}
