"use client";

// Reusable auto-playing canvas animation that explains how an ML model works
// (a "GIF-style" loop, but 100% original code — no copyrighted assets, no video
// files, no 3D library). Each algorithm registers a `draw(ctx, t, W, H, lang)`
// function in SCENES (lib/modelScenes.js); `t` is a looping 0..1 progress.
//
// Accessibility: under prefers-reduced-motion it renders a single representative
// frame (t = 0.5) and shows a ▶ button so the user can opt in to the motion.

import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";
import { getScene } from "@/lib/modelScenes";

export default function ModelViz({ slug, caption }) {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const [playing, setPlaying] = useState(true);
  const scene = getScene(slug);

  // honor reduced motion: start paused on a static frame
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) setPlaying(false);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !scene) return undefined;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = 460;
    const H = 300;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const period = scene.period || 6000; // ms for one loop

    const render = (t01) => {
      ctx.clearRect(0, 0, W, H);
      scene.draw(ctx, t01, W, H, lang);
    };

    if (!playing) {
      render(scene.staticT ?? 0.5); // representative still frame
      return undefined;
    }

    const loop = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) % period;
      render(elapsed / period);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      startRef.current = 0;
    };
  }, [scene, playing, lang]);

  if (!scene) return null;

  const L = {
    id: { replay: playing ? "⏸ Jeda" : "▶ Putar", hintReduced: "Animasi dijeda (mode hemat gerak). Tekan ▶ untuk memutar." },
    en: { replay: playing ? "⏸ Pause" : "▶ Play", hintReduced: "Animation paused (reduced-motion). Press ▶ to play." },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-4 shadow-sm">
      <canvas
        ref={canvasRef}
        className="mx-auto block w-full max-w-[460px] rounded-xl"
        style={{ aspectRatio: "460/300" }}
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-300">{caption?.[lang] || scene.caption?.[lang]}</p>
        <button
          onClick={() => { startRef.current = 0; setPlaying((p) => !p); }}
          className="shrink-0 rounded-full border border-white/30 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/10"
        >
          {L.replay}
        </button>
      </div>
    </div>
  );
}
