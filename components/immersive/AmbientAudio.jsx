"use client";

// Optional CALMING study music, generated entirely with the Web Audio API
// (no audio files -> zero download). Default OFF. A floating button toggles it.
//
// Design for "relaxing music to study to": a slow, warm MAJOR chord progression
// (I–vi–IV–V, which always resolves pleasantly), played by soft pad voices with
// gentle attack/release, plus an occasional quiet bell melody from the same
// scale. A mild lowpass + a short feedback delay add warmth. No fast beats, no
// dissonant drone — it should fade into the background and reduce anxiety.

import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

// Note frequencies (Hz). Low octave for the pad, higher for the bell melody.
const NOTE = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0,
  C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880.0,
};

// Warm I–vi–IV–V progression in C major (C, Am, F, G) — soothing & resolved.
const PROGRESSION = [
  ["C3", "E3", "G4"], // C
  ["A3", "C4", "E4"], // Am
  ["F3", "A3", "C4"], // F
  ["G3", "B3", "D4"], // G
];
// Pentatonic-ish melody pool (always consonant over the progression).
const MELODY = ["C5", "D5", "E5", "G5", "A5", "G4", "E4"];

const CHORD_SECONDS = 7; // slow, calm pace

export default function AmbientAudio() {
  const { lang } = useLang();
  const [on, setOn] = useState(false);
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);
  const timersRef = useRef([]);

  const label = {
    id: { on: "Matikan musik relaksasi", off: "Putar musik relaksasi untuk belajar" },
    en: { on: "Turn off study music", off: "Play relaxing study music" },
  }[lang];

  const start = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // master chain: master gain -> soft lowpass -> destination
    const master = ctx.createGain();
    master.gain.value = 0;
    const tone = ctx.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = 2000;
    tone.Q.value = 0.4;
    master.connect(tone);
    tone.connect(ctx.destination);

    // gentle feedback delay for warmth/space (very subtle)
    const delay = ctx.createDelay(1.0);
    delay.delayTime.value = 0.38;
    const fb = ctx.createGain();
    fb.gain.value = 0.22;
    const wet = ctx.createGain();
    wet.gain.value = 0.18;
    delay.connect(fb);
    fb.connect(delay);
    delay.connect(wet);
    wet.connect(tone);

    // soft fade-in
    master.gain.setTargetAtTime(0.16, ctx.currentTime, 2.0);

    nodesRef.current = { master, tone, delay, wet };
    ctxRef.current = ctx;

    // --- play one pad chord (soft, long attack/release) ---
    const playChord = (names) => {
      const t = ctx.currentTime;
      names.forEach((n, i) => {
        const f = NOTE[n];
        if (!f) return;
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? "sine" : "triangle"; // warm
        osc.frequency.value = f;
        osc.detune.value = (Math.random() - 0.5) * 6; // slight chorus
        const g = ctx.createGain();
        g.gain.value = 0;
        osc.connect(g);
        g.connect(master);
        g.connect(delay);
        const peak = 0.07;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(peak, t + 2.2); // slow swell
        g.gain.linearRampToValueAtTime(peak * 0.8, t + CHORD_SECONDS - 2);
        g.gain.exponentialRampToValueAtTime(0.0001, t + CHORD_SECONDS + 0.5);
        osc.start(t);
        osc.stop(t + CHORD_SECONDS + 0.6);
      });
    };

    // --- occasional soft bell note from the melody pool ---
    const playBell = () => {
      const f = NOTE[MELODY[(Math.random() * MELODY.length) | 0]];
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0;
      osc.connect(g);
      g.connect(master);
      g.connect(delay);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.05, t + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 2.6);
      osc.start(t);
      osc.stop(t + 2.7);
    };

    // sequence the progression on a slow loop
    let chordIdx = 0;
    playChord(PROGRESSION[0]);
    const chordTimer = setInterval(() => {
      chordIdx = (chordIdx + 1) % PROGRESSION.length;
      playChord(PROGRESSION[chordIdx]);
    }, CHORD_SECONDS * 1000);

    // sparse, gentle melody (every ~3.5s, sometimes skipped)
    const bellTimer = setInterval(() => {
      if (Math.random() < 0.7) playBell();
    }, 3500);

    timersRef.current = [chordTimer, bellTimer];
  };

  const stop = () => {
    const ctx = ctxRef.current;
    const n = nodesRef.current;
    timersRef.current.forEach((t) => clearInterval(t));
    timersRef.current = [];
    if (!ctx || !n) return;
    n.master.gain.setTargetAtTime(0, ctx.currentTime, 0.6);
    setTimeout(() => {
      try {
        ctx.close();
      } catch {
        /* ignore */
      }
      ctxRef.current = null;
      nodesRef.current = null;
    }, 1200);
  };

  const toggle = () => {
    if (on) {
      stop();
      setOn(false);
    } else {
      start();
      setOn(true);
    }
  };

  useEffect(() => () => stop(), []);

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? label.on : label.off}
      title={on ? label.on : label.off}
      className={`fixed bottom-4 right-4 z-[55] flex h-11 w-11 items-center justify-center rounded-full border shadow-lg backdrop-blur transition ${
        on
          ? "border-brand-300 bg-brand-500/90 text-white"
          : "border-slate-300 bg-white/90 text-slate-600 hover:text-brand-600"
      }`}
    >
      <span className="text-lg">{on ? "🎵" : "🎧"}</span>
      {on && (
        <span className="absolute -inset-0.5 -z-10 animate-ping rounded-full bg-brand-400/40" />
      )}
    </button>
  );
}
