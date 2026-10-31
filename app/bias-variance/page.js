"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import ImmersiveHero from "@/components/immersive/ImmersiveHero";
import { getTheme } from "@/lib/immersiveThemes";
import { makeData, polyfit, polyval, mse, trueFn } from "@/lib/biasVariance";

// Bias–Variance tradeoff visual: a complexity slider fits a polynomial of that
// degree to noisy data. Left canvas shows the fitted curve vs the true function
// and data; right canvas shows train vs test error across all degrees, marking
// the current degree and the sweet spot. Pure canvas + from-scratch polyfit.

export default function BiasVariancePage() {
  const { lang } = useLang();
  const [degree, setDegree] = useState(3);
  const fitRef = useRef(null);
  const errRef = useRef(null);

  const { train, test } = useMemo(() => makeData(7), []);
  const maxDegree = 9;

  // precompute error curves across degrees once
  const curves = useMemo(() => {
    const arr = [];
    for (let d = 1; d <= maxDegree; d++) {
      const c = polyfit(train, d);
      arr.push({ d, train: mse(c, train), test: mse(c, test) });
    }
    return arr;
  }, [train, test]);
  const sweet = useMemo(() => curves.reduce((b, c) => (c.test < b.test ? c : b), curves[0]), [curves]);

  const coef = useMemo(() => polyfit(train, degree), [train, degree]);
  const cur = curves.find((c) => c.d === degree);

  const L = {
    id: {
      title: "Bias–Variance Tradeoff",
      sub: "Geser kompleksitas model (derajat polinomial) dan lihat kurva pas-nya serta error latih vs uji.",
      complexity: "Kompleksitas model (derajat)",
      fitTitle: "Kecocokan Model", errTitle: "Error vs Kompleksitas",
      trainE: "Error latih", testE: "Error uji", sweet: "Sweet spot",
      status: "Status",
      underfit: "Underfit — model terlalu sederhana (bias tinggi). Garis tak menangkap pola.",
      overfit: "Overfit — model terlalu kompleks (variansi tinggi). Mengejar noise, buruk di data uji.",
      good: "Pas — keseimbangan bias & variansi mendekati optimal. Error uji minimum.",
      legendTrue: "Fungsi sebenarnya", legendFit: "Model", legendData: "Data",
    },
    en: {
      title: "Bias–Variance Tradeoff",
      sub: "Slide the model complexity (polynomial degree) and watch its fit and the train vs test error.",
      complexity: "Model complexity (degree)",
      fitTitle: "Model Fit", errTitle: "Error vs Complexity",
      trainE: "Train error", testE: "Test error", sweet: "Sweet spot",
      status: "Status",
      underfit: "Underfit — model too simple (high bias). The curve misses the pattern.",
      overfit: "Overfit — model too complex (high variance). It chases noise, poor on test data.",
      good: "Just right — bias & variance are near-balanced. Test error is minimal.",
      legendTrue: "True function", legendFit: "Model", legendData: "Data",
    },
  }[lang];

  const theme = getTheme("demos");
  const status = degree <= sweet.d - 2 ? "underfit" : degree >= sweet.d + 2 ? "overfit" : "good";

  // --- draw fit canvas ---
  useEffect(() => {
    const canvas = fitRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = 360, H = 280;
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const pad = 24;
    const xToPx = (x) => pad + ((x + 1) / 2) * (W - 2 * pad);
    const yToPx = (y) => H - pad - ((y + 1.2) / 2.4) * (H - 2 * pad);
    // axes
    ctx.strokeStyle = "rgba(148,163,184,0.4)"; ctx.lineWidth = 1;
    ctx.strokeRect(pad, pad, W - 2 * pad, H - 2 * pad);
    // true function
    ctx.strokeStyle = "#94a3b8"; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath();
    for (let i = 0; i <= 100; i++) { const x = -1 + (2 * i) / 100; const px = xToPx(x), py = yToPx(trueFn(x)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    ctx.stroke(); ctx.setLineDash([]);
    // fitted model
    ctx.strokeStyle = "#0093d0"; ctx.lineWidth = 2.5; ctx.beginPath();
    for (let i = 0; i <= 100; i++) { const x = -1 + (2 * i) / 100; const px = xToPx(x), py = yToPx(Math.max(-1.3, Math.min(1.3, polyval(coef, x)))); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    ctx.stroke();
    // data points
    for (const p of train) { ctx.beginPath(); ctx.arc(xToPx(p.x), yToPx(p.y), 3.5, 0, Math.PI * 2); ctx.fillStyle = "#1e293b"; ctx.fill(); }
  }, [coef, train]);

  // --- draw error-curve canvas ---
  useEffect(() => {
    const canvas = errRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = 360, H = 280;
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const pad = 30;
    const maxErr = Math.max(...curves.flatMap((c) => [c.train, c.test])) * 1.1 || 1;
    const xToPx = (d) => pad + ((d - 1) / (maxDegree - 1)) * (W - 2 * pad);
    const yToPx = (e) => H - pad - (e / maxErr) * (H - 2 * pad);
    ctx.strokeStyle = "rgba(148,163,184,0.4)"; ctx.lineWidth = 1; ctx.strokeRect(pad, pad, W - 2 * pad, H - 2 * pad);
    const line = (key, color) => {
      ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.beginPath();
      curves.forEach((c, i) => { const px = xToPx(c.d), py = yToPx(c[key]); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
      ctx.stroke();
      curves.forEach((c) => { ctx.beginPath(); ctx.arc(xToPx(c.d), yToPx(c[key]), 3, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); });
    };
    line("train", "#34d399");
    line("test", "#f87171");
    // sweet-spot marker
    ctx.strokeStyle = "rgba(251,191,36,0.9)"; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(xToPx(sweet.d), pad); ctx.lineTo(xToPx(sweet.d), H - pad); ctx.stroke(); ctx.setLineDash([]);
    // current-degree marker
    ctx.strokeStyle = "#0093d0"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(xToPx(degree), pad); ctx.lineTo(xToPx(degree), H - pad); ctx.stroke();
  }, [curves, sweet, degree]);

  return (
    <div>
      <ImmersiveHero theme={theme} icon="📈" title={L.title} subtitle={L.sub} eyebrow={theme.eyebrow[lang]} />
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* complexity slider */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <label className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-600">
            <span>{L.complexity}</span>
            <span className="rounded bg-brand-50 px-2 py-0.5 font-mono text-brand-700">{degree}</span>
          </label>
          <input type="range" min={1} max={maxDegree} step={1} value={degree} onChange={(e) => setDegree(Number(e.target.value))} className="w-full accent-brand-500" />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <figure className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <figcaption className="mb-2 text-sm font-bold text-slate-800">{L.fitTitle}</figcaption>
            <canvas ref={fitRef} className="mx-auto block w-full max-w-[360px]" style={{ aspectRatio: "360/280" }} />
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="inline-block h-0.5 w-4 bg-slate-400" style={{ borderTop: "2px dashed #94a3b8" }} />{L.legendTrue}</span>
              <span className="flex items-center gap-1"><span className="inline-block h-0.5 w-4" style={{ background: "#0093d0" }} />{L.legendFit}</span>
              <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-slate-800" />{L.legendData}</span>
            </div>
          </figure>

          <figure className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <figcaption className="mb-2 text-sm font-bold text-slate-800">{L.errTitle}</figcaption>
            <canvas ref={errRef} className="mx-auto block w-full max-w-[360px]" style={{ aspectRatio: "360/280" }} />
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="inline-block h-0.5 w-4" style={{ background: "#34d399" }} />{L.trainE}</span>
              <span className="flex items-center gap-1"><span className="inline-block h-0.5 w-4" style={{ background: "#f87171" }} />{L.testE}</span>
              <span className="flex items-center gap-1"><span className="inline-block h-0.5 w-4" style={{ borderTop: "2px dashed #fbbf24" }} />{L.sweet} (d={sweet.d})</span>
            </div>
          </figure>
        </div>

        {/* status */}
        <div className={`mt-6 rounded-xl border p-4 text-sm ${status === "good" ? "border-green-300 bg-green-50 text-green-900" : status === "underfit" ? "border-sky-300 bg-sky-50 text-sky-900" : "border-amber-300 bg-amber-50 text-amber-900"}`}>
          <p className="font-bold">{L.status}: {status === "good" ? "✅" : status === "underfit" ? "⬇️" : "⬆️"} {cur && `(train ${cur.train.toFixed(3)} / test ${cur.test.toFixed(3)})`}</p>
          <p className="mt-1">{L[status]}</p>
        </div>
      </div>
    </div>
  );
}
