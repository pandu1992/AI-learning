"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLang } from "../LanguageProvider";

const W = 420;
const H = 360;

// Two Gaussian-ish classes. Naive Bayes assumes each feature is independent
// and Gaussian per class; we visualize the resulting posterior boundary.
function seed() {
  const pts = [];
  const gauss = (m, s) => m + (Math.random() + Math.random() + Math.random() - 1.5) * s;
  for (let i = 0; i < 25; i++) {
    pts.push({ x: gauss(140, 45), y: gauss(150, 55), c: 0 });
    pts.push({ x: gauss(290, 50), y: gauss(230, 45), c: 1 });
  }
  return pts;
}

function stats(points) {
  // per-class mean & variance for x and y
  const byClass = {};
  for (const c of [0, 1]) {
    const pc = points.filter((p) => p.c === c);
    const mean = (key) => pc.reduce((s, p) => s + p[key], 0) / pc.length;
    const mx = mean("x");
    const my = mean("y");
    const varr = (key, m) =>
      pc.reduce((s, p) => s + (p[key] - m) ** 2, 0) / pc.length + 1e-6;
    byClass[c] = {
      prior: pc.length / points.length,
      mx,
      my,
      vx: varr("x", mx),
      vy: varr("y", my),
    };
  }
  return byClass;
}

const gaussPdf = (x, m, v) =>
  (1 / Math.sqrt(2 * Math.PI * v)) * Math.exp(-((x - m) ** 2) / (2 * v));

function posterior(st, x, y, c) {
  const s = st[c];
  return s.prior * gaussPdf(x, s.mx, s.vx) * gaussPdf(y, s.my, s.vy);
}

export default function NaiveBayesDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const [points, setPoints] = useState(seed);
  const [showProb, setShowProb] = useState(true);

  const st = stats(points);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);

    const step = 6;
    for (let gx = 0; gx < W; gx += step) {
      for (let gy = 0; gy < H; gy += step) {
        const cx = gx + step / 2;
        const cy = gy + step / 2;
        const p0 = posterior(st, cx, cy, 0);
        const p1 = posterior(st, cx, cy, 1);
        const conf = p1 / (p0 + p1 + 1e-12); // prob of class 1
        if (showProb) {
          // gradient from blue (class0) to red (class1)
          const r = Math.round(37 + (220 - 37) * conf);
          const g = Math.round(99 + (38 - 99) * conf);
          const b = Math.round(235 + (38 - 235) * conf);
          ctx.fillStyle = `rgba(${r},${g},${b},0.22)`;
        } else {
          ctx.fillStyle = conf >= 0.5 ? "rgba(220,38,38,0.12)" : "rgba(37,99,235,0.12)";
        }
        ctx.fillRect(gx, gy, step, step);
      }
    }

    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = p.c === 1 ? "#dc2626" : "#0093D0";
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
    }
  }, [points, st, showProb]);

  const acc =
    points.filter((p) => {
      const p0 = posterior(st, p.x, p.y, 0);
      const p1 = posterior(st, p.x, p.y, 1);
      return (p1 >= p0 ? 1 : 0) === p.c;
    }).length / points.length;

  const L = {
    id: {
      prob: "Tampilkan gradasi probabilitas",
      regen: "Acak ulang data",
      acc: "Akurasi",
      hint: "Naive Bayes menghitung probabilitas tiap kelas dengan teorema Bayes, mengasumsikan tiap fitur independen. Wilayah menunjukkan P(kelas). Perhatikan batas keputusan berbentuk kurva halus (bukan garis lurus seperti decision tree).",
    },
    en: {
      prob: "Show probability gradient",
      regen: "Reshuffle data",
      acc: "Accuracy",
      hint: "Naive Bayes computes each class's probability via Bayes' theorem, assuming features are independent. The regions show P(class). Notice the smooth curved boundary (unlike a decision tree's straight lines).",
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>
      <div className="flex flex-col gap-4 lg:flex-row">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="w-full max-w-md rounded-xl border border-slate-300 bg-slate-50"
          style={{ aspectRatio: `${W}/${H}` }}
        />
        <div className="flex-1 space-y-4">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={showProb}
              onChange={(e) => setShowProb(e.target.checked)}
              className="accent-brand-600"
            />
            {L.prob}
          </label>
          <div className="rounded-lg bg-slate-50 p-3 text-center text-sm">
            <div className="text-slate-500">{L.acc}</div>
            <div className={`text-lg font-bold ${acc >= 0.85 ? "text-green-600" : "text-slate-800"}`}>
              {Math.round(acc * 100)}%
            </div>
          </div>
          <button
            onClick={() => setPoints(seed())}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {L.regen}
          </button>
        </div>
      </div>
    </div>
  );
}
