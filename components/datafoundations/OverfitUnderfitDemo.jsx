"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useLang } from "../LanguageProvider";

// Interactive Overfitting vs Underfitting demo.
// A noisy sample from a smooth true function is split into train/test.
// A polynomial of adjustable degree is fit via least squares; we plot the fit
// and report train vs test error to reveal the "sweet spot".

// ---- tiny linear algebra: solve normal equations for polynomial fit ----
function polyFit(xs, ys, degree) {
  // Build Vandermonde X (n x (degree+1)) and solve (XᵀX) w = Xᵀy
  const n = xs.length;
  const m = degree + 1;
  const X = xs.map((x) => {
    const row = [];
    let p = 1;
    for (let j = 0; j < m; j++) { row.push(p); p *= x; }
    return row;
  });
  // XtX (m x m) and Xty (m)
  const XtX = Array.from({ length: m }, () => new Array(m).fill(0));
  const Xty = new Array(m).fill(0);
  for (let i = 0; i < n; i++) {
    for (let a = 0; a < m; a++) {
      Xty[a] += X[i][a] * ys[i];
      for (let b = 0; b < m; b++) XtX[a][b] += X[i][a] * X[i][b];
    }
  }
  // small ridge for numerical stability at high degree
  for (let a = 0; a < m; a++) XtX[a][a] += 1e-6;
  return solve(XtX, Xty);
}

// Gaussian elimination
function solve(A, b) {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < n; col++) {
    let piv = col;
    for (let r = col + 1; r < n; r++) if (Math.abs(M[r][col]) > Math.abs(M[piv][col])) piv = r;
    [M[col], M[piv]] = [M[piv], M[col]];
    const d = M[col][col] || 1e-9;
    for (let j = col; j <= n; j++) M[col][j] /= d;
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = M[r][col];
      for (let j = col; j <= n; j++) M[r][j] -= f * M[col][j];
    }
  }
  return M.map((row) => row[n]);
}

const evalPoly = (w, x) => { let p = 1, s = 0; for (const c of w) { s += c * p; p *= x; } return s; };

// true function on x in [0,1]
const trueFn = (x) => Math.sin(x * Math.PI * 1.5) * 0.6 + 0.5;

function makeSplit() {
  const train = [], test = [];
  for (let i = 0; i < 14; i++) {
    const x = Math.random();
    train.push({ x, y: trueFn(x) + (Math.random() - 0.5) * 0.28 });
  }
  for (let i = 0; i < 10; i++) {
    const x = Math.random();
    test.push({ x, y: trueFn(x) + (Math.random() - 0.5) * 0.28 });
  }
  return { train, test };
}

const mse = (pts, w) => pts.reduce((s, p) => s + (evalPoly(w, p.x) - p.y) ** 2, 0) / pts.length;

export default function OverfitUnderfitDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const [degree, setDegree] = useState(3);
  const [{ train, test }, setSplit] = useState(makeSplit);

  const w = useMemo(() => polyFit(train.map((p) => p.x), train.map((p) => p.y), degree), [train, degree]);
  const trainErr = useMemo(() => mse(train, w), [train, w]);
  const testErr = useMemo(() => mse(test, w), [test, w]);

  const state = degree <= 1 ? "under" : testErr > trainErr * 2.4 && degree >= 6 ? "over" : "good";

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height, PAD = 24;
    ctx.clearRect(0, 0, W, H);
    const xOf = (x) => PAD + x * (W - 2 * PAD);
    const yOf = (y) => H - PAD - Math.max(-0.2, Math.min(1.2, y)) / 1.4 * (H - 2 * PAD);
    // axes
    ctx.strokeStyle = "#e2e8f0"; ctx.beginPath(); ctx.moveTo(PAD, H - PAD); ctx.lineTo(W - PAD, H - PAD); ctx.moveTo(PAD, PAD); ctx.lineTo(PAD, H - PAD); ctx.stroke();
    // true function (dashed grey)
    ctx.strokeStyle = "#94a3b8"; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5; ctx.beginPath();
    for (let i = 0; i <= 100; i++) { const x = i / 100; const [px, py] = [xOf(x), yOf(trueFn(x))]; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
    ctx.stroke(); ctx.setLineDash([]);
    // fitted polynomial (blue)
    ctx.strokeStyle = "#0093D0"; ctx.lineWidth = 3; ctx.beginPath();
    for (let i = 0; i <= 200; i++) { const x = i / 200; const [px, py] = [xOf(x), yOf(evalPoly(w, x))]; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
    ctx.stroke();
    // train points (dark) + test points (orange)
    train.forEach((p) => { ctx.beginPath(); ctx.arc(xOf(p.x), yOf(p.y), 4, 0, Math.PI * 2); ctx.fillStyle = "#0f172a"; ctx.fill(); });
    test.forEach((p) => { ctx.beginPath(); ctx.arc(xOf(p.x), yOf(p.y), 4, 0, Math.PI * 2); ctx.fillStyle = "#F5A200"; ctx.fill(); });
  }, [w, train, test]);

  const L = {
    id: {
      degree: "Kompleksitas model (derajat polinomial)",
      trainErr: "Error latih", testErr: "Error uji",
      reshuffle: "Acak ulang data",
      legend: "— fungsi asli · 🔵 model · ⚫ data latih · 🟠 data uji",
      under: "UNDERFITTING: model terlalu sederhana — error latih & uji sama-sama tinggi.",
      good: "PAS: model menangkap pola tanpa menghafal noise — error uji rendah.",
      over: "OVERFITTING: model terlalu rumit — error latih kecil TAPI error uji besar (menghafal noise).",
      hint: "Geser kompleksitas model. Derajat rendah = underfitting; derajat tinggi = overfitting (error uji melonjak). Tujuannya menemukan titik seimbang.",
    },
    en: {
      degree: "Model complexity (polynomial degree)",
      trainErr: "Train error", testErr: "Test error",
      reshuffle: "Reshuffle data",
      legend: "— true function · 🔵 model · ⚫ train data · 🟠 test data",
      under: "UNDERFITTING: model too simple — both train & test error are high.",
      good: "JUST RIGHT: model captures the pattern without memorizing noise — low test error.",
      over: "OVERFITTING: model too complex — low train error BUT high test error (memorizing noise).",
      hint: "Slide the model complexity. Low degree = underfitting; high degree = overfitting (test error spikes). The goal is the balanced sweet spot.",
    },
  }[lang];

  const stateStyle = { under: "bg-amber-50 text-amber-800 border-amber-200", good: "bg-green-50 text-green-800 border-green-200", over: "bg-red-50 text-red-800 border-red-200" }[state];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div>
          <canvas ref={canvasRef} width={420} height={280} className="w-full max-w-lg rounded-xl border border-slate-300 bg-slate-50" style={{ aspectRatio: "420/280" }} />
          <p className="mt-1 text-center text-xs text-slate-400">{L.legend}</p>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700">{L.degree}: <span className="text-brand-600">{degree}</span></label>
            <input type="range" min="1" max="12" value={degree} onChange={(e) => setDegree(+e.target.value)} className="mt-1 w-full accent-brand-600" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-50 p-3 text-center">
              <div className="text-xs text-slate-500">{L.trainErr}</div>
              <div className="text-lg font-bold text-slate-800">{trainErr.toFixed(3)}</div>
            </div>
            <div className={`rounded-lg p-3 text-center ${testErr < 0.05 ? "bg-green-50" : "bg-slate-50"}`}>
              <div className="text-xs text-slate-500">{L.testErr}</div>
              <div className={`text-lg font-bold ${testErr < 0.05 ? "text-green-600" : "text-slate-800"}`}>{testErr.toFixed(3)}</div>
            </div>
          </div>
          <div className={`rounded-lg border p-3 text-sm ${stateStyle}`}>{L[state]}</div>
          <button onClick={() => setSplit(makeSplit())} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">{L.reshuffle}</button>
        </div>
      </div>
    </div>
  );
}
