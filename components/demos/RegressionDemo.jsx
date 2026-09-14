"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLang } from "../LanguageProvider";

const W = 480;
const H = 360;
const PAD = 40;

// data domain: x in [0,10], y in [0,10]
const toPx = (x, y) => [
  PAD + (x / 10) * (W - 2 * PAD),
  H - PAD - (y / 10) * (H - 2 * PAD),
];

function seedLinear() {
  // roughly y = 0.8x + 1 with noise
  const pts = [];
  for (let i = 0; i < 14; i++) {
    const x = 0.5 + Math.random() * 9;
    const y = 0.8 * x + 1 + (Math.random() - 0.5) * 2.5;
    pts.push({ x, y: Math.max(0.2, Math.min(9.8, y)) });
  }
  return pts;
}

function seedLogistic() {
  // class 0 low x, class 1 high x, with overlap
  const pts = [];
  for (let i = 0; i < 16; i++) {
    const cls = i % 2;
    const base = cls === 0 ? 3 : 7;
    const x = base + (Math.random() - 0.5) * 4;
    pts.push({ x: Math.max(0.2, Math.min(9.8, x)), c: cls });
  }
  return pts;
}

// Multiple linear regression toy data: house price (in hundreds of millions Rp)
// from two features: x1 = size (100 m² units), x2 = number of bedrooms.
// True relation ~ price = 1.6*size + 0.9*rooms + 1 (+ noise).
function seedMultiple() {
  const pts = [];
  for (let i = 0; i < 12; i++) {
    const x1 = +(0.5 + Math.random() * 2.5).toFixed(2); // size
    const x2 = Math.max(1, Math.round(1 + Math.random() * 4)); // rooms
    const price = 1.6 * x1 + 0.9 * x2 + 1 + (Math.random() - 0.5) * 1.2;
    pts.push({ x1, x2, y: +Math.max(0.5, price).toFixed(2) });
  }
  return pts;
}

const sigmoid = (z) => 1 / (1 + Math.exp(-z));

export default function RegressionDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const [mode, setMode] = useState("linear"); // linear | logistic | multiple
  const [linData] = useState(seedLinear);
  const [logData] = useState(seedLogistic);
  const [multiData] = useState(seedMultiple);

  // linear params: y = m*x + b
  const [m, setM] = useState(1);
  const [b, setB] = useState(0.5);
  // logistic params: p = sigmoid(w*(x - x0)) ; w steepness, x0 threshold
  const [w, setW] = useState(1);
  const [x0, setX0] = useState(5);
  // multiple params: y = w1*x1 + w2*x2 + b2
  const [w1, setW1] = useState(1);
  const [w2, setW2] = useState(1);
  const [b2, setB2] = useState(0);

  // Mean squared error for multiple regression
  const mseMulti = useCallback(() => {
    if (multiData.length === 0) return 0;
    const sum = multiData.reduce((s, p) => {
      const pred = w1 * p.x1 + w2 * p.x2 + b2;
      return s + (pred - p.y) ** 2;
    }, 0);
    return sum / multiData.length;
  }, [multiData, w1, w2, b2]);

  // Mean squared error for linear
  const mse = useCallback(() => {
    if (linData.length === 0) return 0;
    const sum = linData.reduce((s, p) => {
      const pred = m * p.x + b;
      return s + (pred - p.y) ** 2;
    }, 0);
    return sum / linData.length;
  }, [linData, m, b]);

  // Accuracy for logistic (threshold at p=0.5)
  const accuracy = useCallback(() => {
    if (logData.length === 0) return 0;
    const correct = logData.reduce((s, p) => {
      const pred = sigmoid(w * (p.x - x0)) >= 0.5 ? 1 : 0;
      return s + (pred === p.c ? 1 : 0);
    }, 0);
    return correct / logData.length;
  }, [logData, w, x0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);

    // axes
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD, H - PAD);
    ctx.lineTo(W - PAD, H - PAD);
    ctx.moveTo(PAD, H - PAD);
    ctx.lineTo(PAD, PAD);
    ctx.stroke();

    if (mode === "multiple") {
      // "Predicted vs Actual" plot: x-axis = actual price, y-axis = predicted.
      // Points near the diagonal y=x mean accurate predictions.
      const vals = multiData.flatMap((p) => [p.y, w1 * p.x1 + w2 * p.x2 + b2]);
      const maxV = Math.max(6, ...vals) * 1.05;
      const mp = (v) => v / maxV; // 0..1
      // diagonal reference line (perfect prediction)
      const [dx1, dy1] = toPx(0, 0);
      const [dx2, dy2] = toPx(10, 10);
      ctx.strokeStyle = "#94a3b8";
      ctx.setLineDash([5, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(dx1, dy1);
      ctx.lineTo(dx2, dy2);
      ctx.stroke();
      ctx.setLineDash([]);
      // points
      for (const p of multiData) {
        const pred = w1 * p.x1 + w2 * p.x2 + b2;
        const [px, py] = toPx(mp(p.y) * 10, mp(pred) * 10);
        // error segment to the diagonal (vertical gap = prediction error)
        const [, diagPy] = toPx(mp(p.y) * 10, mp(p.y) * 10);
        ctx.strokeStyle = "rgba(220,38,38,0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, diagPy);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#0093D0";
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#fff";
        ctx.stroke();
      }
      // axis labels
      ctx.fillStyle = "#64748b";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(lang === "id" ? "Harga aktual →" : "Actual price →", W / 2, H - 12);
      ctx.save();
      ctx.translate(14, H / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(lang === "id" ? "Prediksi →" : "Predicted →", 0, 0);
      ctx.restore();
    } else if (mode === "linear") {
      // fitted line across x=0..10
      const [x1, y1] = toPx(0, m * 0 + b);
      const [x2, y2] = toPx(10, m * 10 + b);
      ctx.strokeStyle = "#0093D0";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // residuals + points
      for (const p of linData) {
        const [px, py] = toPx(p.x, p.y);
        const [, predPy] = toPx(p.x, m * p.x + b);
        ctx.strokeStyle = "rgba(220,38,38,0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, predPy);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#0f172a";
        ctx.fill();
      }
    } else {
      // sigmoid curve p in [0,1] mapped to y in [0,10]
      ctx.strokeStyle = "#7c3aed";
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const x = (i / 100) * 10;
        const p = sigmoid(w * (x - x0));
        const [px, py] = toPx(x, p * 10);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // decision threshold line at x0
      const [tx1, ty1] = toPx(x0, 0);
      const [tx2, ty2] = toPx(x0, 10);
      ctx.strokeStyle = "rgba(100,116,139,0.6)";
      ctx.setLineDash([5, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tx1, ty1);
      ctx.lineTo(tx2, ty2);
      ctx.stroke();
      ctx.setLineDash([]);

      // points at y=0 (class 0) and y=10 (class 1)
      for (const p of logData) {
        const [px, py] = toPx(p.x, p.c === 1 ? 9.6 : 0.4);
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = p.c === 1 ? "#dc2626" : "#0093D0";
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#fff";
        ctx.stroke();
      }
    }
  }, [mode, m, b, w, x0, w1, w2, b2, linData, logData, multiData, lang]);

  const L = {
    id: {
      linear: "Regresi Linear",
      logistic: "Regresi Logistik",
      slope: "Kemiringan (m)",
      intercept: "Perpotongan (b)",
      steep: "Kecuraman (w)",
      thresh: "Ambang (x₀)",
      mse: "Error (MSE)",
      acc: "Akurasi",
      reset: "Reset garis",
      linHint: "Geser slider untuk menyesuaikan garis. Garis merah = selisih (residual) antara prediksi dan data. Tujuan: perkecil MSE.",
      logHint: "Kurva ungu = probabilitas kelas 1 (sigmoid). Titik biru = kelas 0, merah = kelas 1. Geser ambang & kecuraman agar akurasi maksimal.",
      multiple: "Regresi Linear Berganda",
      multiHint: "Prediksi harga rumah dari DUA fitur: luas (x₁) & jumlah kamar (x₂). Geser bobot w₁, w₂, dan b agar titik mendekati garis diagonal (prediksi = aktual). Tujuan: perkecil MSE.",
      w1: "Bobot luas (w₁)",
      w2: "Bobot kamar (w₂)",
      bias: "Bias (b)",
    },
    en: {
      linear: "Linear Regression",
      logistic: "Logistic Regression",
      slope: "Slope (m)",
      intercept: "Intercept (b)",
      steep: "Steepness (w)",
      thresh: "Threshold (x₀)",
      mse: "Error (MSE)",
      acc: "Accuracy",
      reset: "Reset line",
      linHint: "Drag the sliders to fit the line. Red segments = residuals between prediction and data. Goal: minimize MSE.",
      logHint: "Purple curve = probability of class 1 (sigmoid). Blue points = class 0, red = class 1. Adjust threshold & steepness to maximize accuracy.",
      multiple: "Multiple Linear Regression",
      multiHint: "Predict house price from TWO features: size (x₁) & number of bedrooms (x₂). Adjust weights w₁, w₂, and b so points approach the diagonal (prediction = actual). Goal: minimize MSE.",
      w1: "Size weight (w₁)",
      w2: "Rooms weight (w₂)",
      bias: "Bias (b)",
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 inline-flex rounded-lg border border-slate-300 p-0.5 text-sm font-semibold">
        <button
          onClick={() => setMode("linear")}
          className={`rounded-md px-4 py-1.5 transition ${mode === "linear" ? "bg-brand-600 text-white" : "text-slate-600"}`}
        >
          {L.linear}
        </button>
        <button
          onClick={() => setMode("logistic")}
          className={`rounded-md px-4 py-1.5 transition ${mode === "logistic" ? "bg-brand-600 text-white" : "text-slate-600"}`}
        >
          {L.logistic}
        </button>
        <button
          onClick={() => setMode("multiple")}
          className={`rounded-md px-4 py-1.5 transition ${mode === "multiple" ? "bg-brand-600 text-white" : "text-slate-600"}`}
        >
          {L.multiple}
        </button>
      </div>

      <p className="mb-4 text-sm text-slate-600">
        {mode === "linear" ? L.linHint : mode === "logistic" ? L.logHint : L.multiHint}
      </p>

      <div className="flex flex-col gap-4 lg:flex-row">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="w-full max-w-lg rounded-xl border border-slate-300 bg-slate-50"
          style={{ aspectRatio: `${W}/${H}` }}
        />

        <div className="flex-1 space-y-4">
          {mode === "linear" && (
            <>
              <Slider label={`${L.slope}: ${m.toFixed(2)}`} min={-2} max={3} step={0.05} value={m} onChange={setM} />
              <Slider label={`${L.intercept}: ${b.toFixed(2)}`} min={-2} max={6} step={0.1} value={b} onChange={setB} />
              <Metric label={L.mse} value={mse().toFixed(3)} good={mse() < 1.2} />
            </>
          )}
          {mode === "logistic" && (
            <>
              <Slider label={`${L.steep}: ${w.toFixed(2)}`} min={0.3} max={4} step={0.05} value={w} onChange={setW} />
              <Slider label={`${L.thresh}: ${x0.toFixed(2)}`} min={1} max={9} step={0.1} value={x0} onChange={setX0} />
              <Metric label={L.acc} value={`${Math.round(accuracy() * 100)}%`} good={accuracy() >= 0.8} />
            </>
          )}
          {mode === "multiple" && (
            <>
              <p className="rounded-md bg-slate-50 px-3 py-2 text-center font-mono text-xs text-slate-600">
                ŷ = {w1.toFixed(2)}·x₁ + {w2.toFixed(2)}·x₂ + {b2.toFixed(2)}
              </p>
              <Slider label={`${L.w1}: ${w1.toFixed(2)}`} min={-1} max={3} step={0.05} value={w1} onChange={setW1} />
              <Slider label={`${L.w2}: ${w2.toFixed(2)}`} min={-1} max={3} step={0.05} value={w2} onChange={setW2} />
              <Slider label={`${L.bias}: ${b2.toFixed(2)}`} min={-2} max={4} step={0.1} value={b2} onChange={setB2} />
              <Metric label={L.mse} value={mseMulti().toFixed(3)} good={mseMulti() < 1.0} />
            </>
          )}
          <button
            onClick={() => {
              if (mode === "linear") { setM(1); setB(0.5); }
              else if (mode === "logistic") { setW(1); setX0(5); }
              else { setW1(1); setW2(1); setB2(0); }
            }}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {L.reset}
          </button>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, min, max, step, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full accent-brand-600"
      />
    </div>
  );
}

function Metric({ label, value, good }) {
  return (
    <div className={`rounded-lg p-3 text-sm ${good ? "bg-green-50" : "bg-slate-50"}`}>
      <div className="flex items-center justify-between">
        <span className="text-slate-600">{label}</span>
        <span className={`text-lg font-bold ${good ? "text-green-600" : "text-slate-800"}`}>
          {value}
        </span>
      </div>
    </div>
  );
}
