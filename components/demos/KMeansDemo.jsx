"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLang } from "../LanguageProvider";

const W = 480;
const H = 360;
const COLORS = ["#0093D0", "#dc2626", "#059669", "#d97706", "#7c3aed"];

function randomPoints(n) {
  const pts = [];
  // three loose blobs so clustering is visually meaningful
  const centers = [
    [130, 110],
    [360, 130],
    [240, 280],
  ];
  for (let i = 0; i < n; i++) {
    const [cx, cy] = centers[i % centers.length];
    pts.push({
      x: cx + (Math.random() - 0.5) * 130,
      y: cy + (Math.random() - 0.5) * 130,
      cluster: -1,
    });
  }
  return pts;
}

function initCentroids(k) {
  return Array.from({ length: k }, () => ({
    x: 40 + Math.random() * (W - 80),
    y: 40 + Math.random() * (H - 80),
  }));
}

export default function KMeansDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const [k, setK] = useState(3);
  const [points, setPoints] = useState(() => randomPoints(90));
  const [centroids, setCentroids] = useState(() => initCentroids(3));
  const [iteration, setIteration] = useState(0);
  const [converged, setConverged] = useState(false);

  const assign = useCallback((pts, cents) => {
    let changed = false;
    const next = pts.map((p) => {
      let best = 0;
      let bestD = Infinity;
      cents.forEach((c, i) => {
        const d = (c.x - p.x) ** 2 + (c.y - p.y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      if (best !== p.cluster) changed = true;
      return { ...p, cluster: best };
    });
    return { next, changed };
  }, []);

  const recompute = useCallback((pts, cents) => {
    return cents.map((c, i) => {
      const members = pts.filter((p) => p.cluster === i);
      if (members.length === 0) return c;
      const sx = members.reduce((s, p) => s + p.x, 0) / members.length;
      const sy = members.reduce((s, p) => s + p.y, 0) / members.length;
      return { x: sx, y: sy };
    });
  }, []);

  const step = useCallback(() => {
    if (converged) return;
    const { next, changed } = assign(points, centroids);
    const newCentroids = recompute(next, centroids);
    setPoints(next);
    setCentroids(newCentroids);
    setIteration((it) => it + 1);
    if (!changed && iteration > 0) setConverged(true);
  }, [points, centroids, assign, recompute, converged, iteration]);

  const reset = useCallback(
    (newK = k) => {
      setPoints(randomPoints(90));
      setCentroids(initCentroids(newK));
      setIteration(0);
      setConverged(false);
    },
    [k]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);

    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = p.cluster >= 0 ? COLORS[p.cluster % COLORS.length] : "#94a3b8";
      ctx.fill();
    }

    centroids.forEach((c, i) => {
      ctx.beginPath();
      ctx.moveTo(c.x - 9, c.y);
      ctx.lineTo(c.x + 9, c.y);
      ctx.moveTo(c.x, c.y - 9);
      ctx.lineTo(c.x, c.y + 9);
      ctx.strokeStyle = COLORS[i % COLORS.length];
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(c.x, c.y, 11, 0, Math.PI * 2);
      ctx.strokeStyle = COLORS[i % COLORS.length];
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [points, centroids]);

  const changeK = (newK) => {
    setK(newK);
    reset(newK);
  };

  const L = {
    id: {
      k: "Jumlah cluster (k)",
      step: "Langkah berikutnya",
      auto: "Jalankan sampai selesai",
      reset: "Acak ulang",
      iter: "Iterasi",
      converged: "✓ Konvergen (stabil)",
      running: "Belum stabil",
      hint: "k-means mengelompokkan data tanpa label. Tanda + adalah centroid (pusat cluster). Klik 'Langkah berikutnya' untuk melihat centroid bergerak: setiap titik ikut centroid terdekat, lalu centroid pindah ke rata-rata anggotanya.",
    },
    en: {
      k: "Number of clusters (k)",
      step: "Next step",
      auto: "Run to completion",
      reset: "Reshuffle",
      iter: "Iteration",
      converged: "✓ Converged (stable)",
      running: "Not stable yet",
      hint: "k-means groups unlabeled data. The + marks are centroids (cluster centers). Click 'Next step' to watch them move: each point joins its nearest centroid, then each centroid moves to the average of its members.",
    },
  }[lang];

  const runAll = () => {
    let p = points;
    let c = centroids;
    for (let i = 0; i < 30; i++) {
      const { next, changed } = assign(p, c);
      const nc = recompute(next, c);
      p = next;
      c = nc;
      if (!changed && i > 0) break;
    }
    setPoints(p);
    setCentroids(c);
    setIteration((it) => it + 1);
    setConverged(true);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      <div className="flex flex-col gap-4 lg:flex-row">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="w-full max-w-lg rounded-xl border border-slate-300 bg-slate-50"
          style={{ aspectRatio: `${W}/${H}` }}
        />

        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              {L.k}: <span className="text-brand-600">{k}</span>
            </label>
            <input
              type="range"
              min="2"
              max="5"
              value={k}
              onChange={(e) => changeK(Number(e.target.value))}
              className="mt-1 w-full accent-brand-600"
            />
          </div>

          <div className="rounded-lg bg-slate-50 p-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">{L.iter}</span>
              <span className="font-semibold text-slate-800">{iteration}</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-slate-600">Status</span>
              <span className={converged ? "font-semibold text-green-600" : "text-slate-500"}>
                {converged ? L.converged : L.running}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={step}
              disabled={converged}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {L.step}
            </button>
            <button
              onClick={runAll}
              disabled={converged}
              className="rounded-lg border border-brand-600 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 disabled:opacity-50"
            >
              {L.auto}
            </button>
            <button
              onClick={() => reset()}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {L.reset}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
