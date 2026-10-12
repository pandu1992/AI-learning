"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

// Gradient Descent Visualizer — the heart of training any neural network.
// A ball sits on a 1-D "loss curve" L(x). Each step moves it downhill:
//   x <- x - learningRate * L'(x)
// Students tune the learning rate and watch it converge, oscillate, or diverge,
// and switch landscapes (convex bowl vs. a bumpy one with a local minimum).
// Original, transparent implementation.

// Loss landscapes: each returns { f(x), df(x), domain:[lo,hi], label }
const LANDSCAPES = {
  bowl: {
    id: "Mangkuk (konveks)", en: "Bowl (convex)",
    f: (x) => 0.5 * x * x,
    df: (x) => x,
    domain: [-5, 5],
  },
  bumpy: {
    id: "Berbukit (ada minimum lokal)", en: "Bumpy (has a local minimum)",
    f: (x) => 0.15 * x * x + Math.sin(1.6 * x) * 1.4 + 2,
    df: (x) => 0.3 * x + 1.6 * Math.cos(1.6 * x),
    domain: [-6, 6],
  },
};

export default function GradientDescentDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const runningRef = useRef(false);

  const [landscapeKey, setLandscapeKey] = useState("bowl");
  const [lr, setLr] = useState(0.3);
  const [x, setX] = useState(4.2);
  const [steps, setSteps] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [trail, setTrail] = useState([]); // past x positions
  const [diverged, setDiverged] = useState(false);

  const land = LANDSCAPES[landscapeKey];

  const loss = useMemo(() => land.f(x), [land, x]);
  const grad = useMemo(() => land.df(x), [land, x]);

  // one gradient-descent step
  const doStep = () => {
    setX((prevX) => {
      const g = land.df(prevX);
      let nx = prevX - lr * g;
      // clamp to a slightly larger range; detect divergence
      const [lo, hi] = land.domain;
      if (!Number.isFinite(nx) || nx < lo * 2 || nx > hi * 2) {
        setDiverged(true);
        setPlaying(false);
        return prevX;
      }
      setTrail((t) => [...t.slice(-40), prevX]);
      return nx;
    });
    setSteps((s) => s + 1);
  };

  // autoplay loop
  useEffect(() => {
    if (!playing) return;
    let last = 0;
    const loop = (ts) => {
      if (!runningRef.current) return;
      if (ts - last > 220) { doStep(); last = ts; }
      // stop when essentially converged (tiny gradient) on convex-ish spots
      rafRef.current = requestAnimationFrame(loop);
    };
    runningRef.current = true;
    rafRef.current = requestAnimationFrame(loop);
    return () => { runningRef.current = false; if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, lr, landscapeKey]);

  // auto-stop when converged
  useEffect(() => {
    if (playing && Math.abs(grad) < 0.01) { setPlaying(false); }
  }, [grad, playing]);

  const reset = (key = landscapeKey) => {
    setPlaying(false);
    runningRef.current = false;
    setLandscapeKey(key);
    const [lo, hi] = LANDSCAPES[key].domain;
    setX(hi * 0.84);
    setSteps(0);
    setTrail([]);
    setDiverged(false);
  };

  // ---- draw the loss curve + ball ----
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height, PAD = 24;
    const [lo, hi] = land.domain;
    // sample curve to find y-range
    const N = 240;
    const xs = Array.from({ length: N }, (_, i) => lo + ((hi - lo) * i) / (N - 1));
    const ys = xs.map(land.f);
    const yMin = Math.min(...ys), yMax = Math.max(...ys);
    const X = (xv) => PAD + ((xv - lo) / (hi - lo)) * (W - 2 * PAD);
    const Y = (yv) => H - PAD - ((yv - yMin) / (yMax - yMin || 1)) * (H - 2 * PAD);

    ctx.clearRect(0, 0, W, H);
    // axes baseline
    ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(PAD, H - PAD); ctx.lineTo(W - PAD, H - PAD); ctx.stroke();

    // loss curve
    ctx.strokeStyle = "#94a3b8"; ctx.lineWidth = 2.5;
    ctx.beginPath();
    xs.forEach((xv, i) => { const px = X(xv), py = Y(ys[i]); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
    ctx.stroke();

    // trail
    trail.forEach((tx, i) => {
      ctx.beginPath();
      ctx.arc(X(tx), Y(land.f(tx)), 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,162,0,${0.15 + (i / trail.length) * 0.5})`;
      ctx.fill();
    });

    // tangent line at current x (shows the gradient)
    const g = land.df(x);
    const tx0 = Math.max(lo, x - 1), tx1 = Math.min(hi, x + 1);
    ctx.strokeStyle = "#dc2626"; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(X(tx0), Y(land.f(x) + g * (tx0 - x)));
    ctx.lineTo(X(tx1), Y(land.f(x) + g * (tx1 - x)));
    ctx.stroke();

    // ball
    ctx.beginPath();
    ctx.arc(X(x), Y(land.f(x)), 9, 0, Math.PI * 2);
    ctx.fillStyle = "#0093D0";
    ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = "#fff"; ctx.stroke();
  }, [land, x, trail]);

  const L = {
    id: {
      hint: "Gradient descent adalah cara model BELAJAR: turuni 'lembah loss' selangkah demi selangkah mengikuti kemiringan (gradien). Aturannya: x ← x − (learning rate) × gradien. Atur learning rate dan lihat hasilnya.",
      landscape: "Bentuk loss", lr: "Learning rate (α)",
      step: "Satu langkah", run: "▶ Jalankan", pause: "⏸ Jeda", reset: "↻ Reset",
      lossLbl: "Loss", gradLbl: "Gradien", stepsLbl: "Langkah", posLbl: "Posisi x",
      diverged: "💥 DIVERGEN! Learning rate terlalu besar — bola melompat makin jauh, bukan turun. Kecilkan α.",
      converged: "✅ Konvergen — gradien ≈ 0, bola berhenti di dasar lembah (minimum).",
      lrLow: "α kecil = lambat tapi stabil", lrHigh: "α besar = cepat tapi bisa osilasi/divergen",
      note: "Learning rate adalah hyperparameter paling penting: terlalu kecil → latihan lambat; terlalu besar → tak pernah konvergen. Pada bentuk 'berbukit', gradient descent bisa terjebak di minimum LOKAL — masalah nyata di deep learning.",
      tangent: "Garis merah = kemiringan (gradien) di posisi bola.",
    },
    en: {
      hint: "Gradient descent is how a model LEARNS: walk down the 'loss valley' step by step, following the slope (gradient). The rule: x ← x − (learning rate) × gradient. Tune the learning rate and watch.",
      landscape: "Loss landscape", lr: "Learning rate (α)",
      step: "One step", run: "▶ Run", pause: "⏸ Pause", reset: "↻ Reset",
      lossLbl: "Loss", gradLbl: "Gradient", stepsLbl: "Steps", posLbl: "Position x",
      diverged: "💥 DIVERGED! Learning rate too high — the ball jumps further away instead of down. Lower α.",
      converged: "✅ Converged — gradient ≈ 0, the ball settled at the bottom of the valley (a minimum).",
      lrLow: "small α = slow but stable", lrHigh: "large α = fast but may oscillate/diverge",
      note: "The learning rate is the most important hyperparameter: too small → slow training; too large → never converges. On the 'bumpy' landscape, gradient descent can get stuck in a LOCAL minimum — a real problem in deep learning.",
      tangent: "Red line = the slope (gradient) at the ball's position.",
    },
  }[lang];

  const converged = !diverged && Math.abs(grad) < 0.01;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      {/* landscape toggle */}
      <div className="mb-3 inline-flex flex-wrap rounded-lg border border-slate-300 p-0.5 text-sm font-semibold">
        {Object.entries(LANDSCAPES).map(([k, v]) => (
          <button key={k} onClick={() => reset(k)} className={`rounded-md px-3 py-1.5 transition ${landscapeKey === k ? "bg-brand-600 text-white" : "text-slate-600"}`}>
            {v[lang]}
          </button>
        ))}
      </div>

      <canvas ref={canvasRef} width={520} height={260} className="w-full max-w-xl rounded-xl border border-slate-300 bg-white" style={{ aspectRatio: "520/260" }} />
      <p className="mt-1 text-[11px] text-slate-400">{L.tangent}</p>

      {/* learning rate */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-700">{L.lr}: <span className="text-brand-600">{lr.toFixed(2)}</span></span>
        </div>
        <input type="range" min="0.01" max="2.1" step="0.01" value={lr} onChange={(e) => setLr(+e.target.value)} className="mt-1 w-full accent-brand-600" />
        <div className="flex justify-between text-[10px] text-slate-400"><span>{L.lrLow}</span><span>{L.lrHigh}</span></div>
      </div>

      {/* readouts */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[[L.posLbl, x.toFixed(2)], [L.lossLbl, loss.toFixed(3)], [L.gradLbl, grad.toFixed(3)], [L.stepsLbl, steps]].map(([lbl, val]) => (
          <div key={lbl} className="rounded-lg bg-slate-50 p-2 text-center">
            <div className="text-[11px] text-slate-500">{lbl}</div>
            <div className="font-mono text-sm font-bold text-slate-800">{val}</div>
          </div>
        ))}
      </div>

      {/* controls */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => { setDiverged(false); doStep(); }} disabled={playing} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40">{L.step}</button>
        <button onClick={() => { setDiverged(false); setPlaying((p) => !p); }} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">{playing ? L.pause : L.run}</button>
        <button onClick={() => reset()} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">{L.reset}</button>
      </div>

      {diverged && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{L.diverged}</p>}
      {converged && <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">{L.converged}</p>}

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
