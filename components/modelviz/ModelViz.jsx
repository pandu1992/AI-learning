"use client";

// Reusable auto-playing canvas animation that explains how an ML model works
// (a "GIF-style" loop, but 100% original code — no copyrighted assets, no video
// files, no 3D library). Each algorithm registers a `draw(ctx, t, W, H, lang)`
// function in SCENES (lib/modelScenes.js); `t` is a looping 0..1 progress.
//
// Parameter Sandbox: if the slug has slider definitions (lib/vizParams.js), we
// use the parametrized scene (lib/modelScenesParam.js) and render sliders whose
// live values are passed as the 6th `params` arg to draw() — so students can
// FEEL how a hyperparameter changes the model's behavior.
//
// Accessibility: under prefers-reduced-motion it renders a single representative
// frame (t = 0.5) and shows a ▶ button so the user can opt in to the motion.

import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";
import { getScene } from "@/lib/modelScenes";
import { getParamScene } from "@/lib/modelScenesParam";
import { getVizParams } from "@/lib/vizParams";

export default function ModelViz({ slug, caption }) {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const [playing, setPlaying] = useState(true);

  const paramDef = getVizParams(slug);
  // prefer the parametrized scene when this slug has sliders
  const scene = (paramDef && getParamScene(slug)) || getScene(slug);

  // live slider values (default from the control defs)
  const [params, setParams] = useState(() => {
    const init = {};
    if (paramDef) for (const c of paramDef.controls) init[c.key] = c.default;
    return init;
  });
  // keep latest params in a ref so the animation loop always reads fresh values
  const paramsRef = useRef(params);
  paramsRef.current = params;

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
      scene.draw(ctx, t01, W, H, lang, paramsRef.current);
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

  // when paused, re-render the static frame as sliders change
  useEffect(() => {
    if (playing) return;
    const canvas = canvasRef.current;
    if (!canvas || !scene) return;
    const ctx = canvas.getContext("2d");
    const W = 460, H = 300;
    ctx.clearRect(0, 0, W, H);
    scene.draw(ctx, scene.staticT ?? 0.5, W, H, lang, params);
  }, [params, playing, scene, lang]);

  if (!scene) return null;

  const L = {
    id: { replay: playing ? "⏸ Jeda" : "▶ Putar", hintReduced: "Animasi dijeda (mode hemat gerak). Tekan ▶ untuk memutar.", sandbox: "Parameter Sandbox", reset: "↺ Reset" },
    en: { replay: playing ? "⏸ Pause" : "▶ Play", hintReduced: "Animation paused (reduced-motion). Press ▶ to play.", sandbox: "Parameter Sandbox", reset: "↺ Reset" },
  }[lang];

  const resetParams = () => {
    const init = {};
    for (const c of paramDef.controls) init[c.key] = c.default;
    setParams(init);
  };

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

      {/* Parameter Sandbox sliders */}
      {paramDef && (
        <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-bold text-amber-300">🎛️ {L.sandbox}</p>
            <button
              onClick={resetParams}
              className="rounded-full border border-white/25 px-2 py-0.5 text-[11px] font-semibold text-white/80 transition hover:bg-white/10"
            >
              {L.reset}
            </button>
          </div>
          {paramDef.intro?.[lang] && <p className="mb-2 text-[11px] text-slate-400">{paramDef.intro[lang]}</p>}
          <div className="space-y-2.5">
            {paramDef.controls.map((c) => (
              <label key={c.key} className="block">
                <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-slate-200">
                  <span>{c.label[lang]}</span>
                  <span className="rounded bg-amber-400/20 px-1.5 py-0.5 font-mono text-amber-200">
                    {Number.isInteger(c.step) ? params[c.key] : Number(params[c.key]).toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min={c.min}
                  max={c.max}
                  step={c.step}
                  value={params[c.key]}
                  onChange={(e) => setParams((p) => ({ ...p, [c.key]: Number(e.target.value) }))}
                  className="w-full accent-amber-400"
                />
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
