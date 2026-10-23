"use client";

// Optional ambient "spatial" audio generated entirely with the Web Audio API
// (no audio files -> zero extra bytes to download). Default OFF. A small
// floating button toggles a gentle evolving drone; moving the cursor pans the
// sound left/right (spatial feel) and clicks trigger a soft chime. All audio
// is created lazily on first enable to respect autoplay policies.

import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

export default function AmbientAudio() {
  const { lang } = useLang();
  const [on, setOn] = useState(false);
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);

  const label = {
    id: { on: "Matikan suasana audio", off: "Nyalakan suasana audio" },
    en: { on: "Turn ambient audio off", off: "Turn ambient audio on" },
  }[lang];

  const start = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const master = ctx.createGain();
    master.gain.value = 0.0;
    master.connect(ctx.destination);

    // two detuned oscillators + slow LFO on a lowpass for an evolving pad
    const panner = ctx.createStereoPanner();
    panner.connect(master);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 700;
    filter.connect(panner);

    const o1 = ctx.createOscillator();
    o1.type = "sine";
    o1.frequency.value = 110; // A2
    const o2 = ctx.createOscillator();
    o2.type = "triangle";
    o2.frequency.value = 164.81; // E3
    const o3 = ctx.createOscillator();
    o3.type = "sine";
    o3.frequency.value = 220;
    o3.detune.value = 6;
    [o1, o2, o3].forEach((o) => o.connect(filter));

    // LFO gently sweeps the filter for movement
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 320;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    o1.start();
    o2.start();
    o3.start();
    lfo.start();

    // fade in
    master.gain.setTargetAtTime(0.14, ctx.currentTime, 1.5);

    nodesRef.current = { master, panner, filter, oscillators: [o1, o2, o3, lfo] };
    ctxRef.current = ctx;

    // cursor pans the pad; click plays a soft chime
    const onMove = (e) => {
      const x = e.clientX / (window.innerWidth || 1); // 0..1
      panner.pan.setTargetAtTime((x - 0.5) * 1.4, ctx.currentTime, 0.2);
    };
    const onClick = () => chime(ctx, master);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onClick, { passive: true });
    nodesRef.current.listeners = { onMove, onClick };
  };

  const chime = (ctx, master) => {
    const notes = [523.25, 659.25, 783.99]; // C5 E5 G5
    const f = notes[(Math.random() * notes.length) | 0];
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = f;
    g.gain.value = 0;
    osc.connect(g);
    g.connect(master);
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.18, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
    osc.start(t);
    osc.stop(t + 1.2);
  };

  const stop = () => {
    const ctx = ctxRef.current;
    const n = nodesRef.current;
    if (!ctx || !n) return;
    n.master.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
    if (n.listeners) {
      window.removeEventListener("pointermove", n.listeners.onMove);
      window.removeEventListener("pointerdown", n.listeners.onClick);
    }
    setTimeout(() => {
      try {
        n.oscillators.forEach((o) => o.stop());
        ctx.close();
      } catch {
        /* ignore */
      }
      ctxRef.current = null;
      nodesRef.current = null;
    }, 700);
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

  // clean up on unmount
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
      <span className="text-lg">{on ? "🔊" : "🔈"}</span>
      {on && (
        <span className="absolute -inset-0.5 -z-10 animate-ping rounded-full bg-brand-400/40" />
      )}
    </button>
  );
}
