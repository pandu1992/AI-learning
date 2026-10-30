"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";
import { knn } from "@/lib/compareModels";

// "Bring your own data" playground: the user clicks on the canvas to place their
// OWN 2D points, then watches k-NN decision regions (classify mode) or k-means
// clusters (cluster mode) update live on that data. Makes learning personal.
// Pure canvas + the from-scratch k-NN from lib/compareModels.js.

const C0 = "#0ea5e9", C1 = "#ef4444";
const PALETTE = ["#0ea5e9", "#ef4444", "#34d399", "#fbbf24", "#c4b5fd"];

export default function DataPlayground() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const [mode, setMode] = useState("classify"); // 'classify' | 'cluster'
  const [placing, setPlacing] = useState(0); // which class to place (classify)
  const [k, setK] = useState(3);
  const [points, setPoints] = useState([]); // { x, y, c } in [0,1]
  const [iter, setIter] = useState(0); // k-means animation nudge
  const size = 360;

  const L = {
    id: {
      classify: "Klasifikasi (k-NN)", cluster: "Clustering (k-means)",
      placing: "Menempatkan kelas", class0: "Kelas A", class1: "Kelas B",
      kLabel: "k", clear: "🗑️ Bersihkan", sample: "✨ Contoh data", step: "▶ Iterasi k-means",
      hintC: "Klik kanvas untuk menambah titik. Ganti kelas lalu tambahkan lagi — wilayah keputusan diperbarui langsung.",
      hintK: "Klik kanvas untuk menambah titik (tanpa label). Atur k, lalu tekan 'Iterasi' untuk menggerakkan centroid.",
      empty: "Kanvas kosong — klik untuk mulai menambah titik.",
      count: (n) => `${n} titik`,
    },
    en: {
      classify: "Classify (k-NN)", cluster: "Cluster (k-means)",
      placing: "Placing class", class0: "Class A", class1: "Class B",
      kLabel: "k", clear: "🗑️ Clear", sample: "✨ Sample data", step: "▶ Step k-means",
      hintC: "Click the canvas to add points. Switch class and add more — the decision regions update live.",
      hintK: "Click the canvas to add points (unlabeled). Set k, then press 'Step' to move the centroids.",
      empty: "Empty canvas — click to start adding points.",
      count: (n) => `${n} points`,
    },
  }[lang];

  // k-means state kept in a ref-ish piece of state; recomputed on iter/k/points
  const [centroids, setCentroids] = useState([]);

  // (re)initialize centroids when entering cluster mode / changing k
  useEffect(() => {
    if (mode !== "cluster") return;
    const cs = Array.from({ length: k }, (_, i) => ({
      x: 0.2 + 0.6 * ((i + 0.5) / k),
      y: 0.5 + (i % 2 === 0 ? -0.12 : 0.12),
      c: PALETTE[i % PALETTE.length],
    }));
    setCentroids(cs);
    setIter(0);
  }, [mode, k]);

  // one k-means iteration: assign points, move centroids to member means
  const stepKmeans = () => {
    if (!points.length || !centroids.length) return;
    const assign = points.map((p) => {
      let best = 0, bd = Infinity;
      centroids.forEach((c, i) => { const d = (c.x - p.x) ** 2 + (c.y - p.y) ** 2; if (d < bd) { bd = d; best = i; } });
      return best;
    });
    const next = centroids.map((c, i) => {
      const members = points.filter((_, j) => assign[j] === i);
      if (!members.length) return c;
      return { ...c, x: members.reduce((a, p) => a + p.x, 0) / members.length, y: members.reduce((a, p) => a + p.y, 0) / members.length };
    });
    setCentroids(next);
    setIter((n) => n + 1);
  };

  const addPoint = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    if (x < 0 || x > 1 || y < 0 || y > 1) return;
    setPoints((pts) => [...pts, { x, y, c: mode === "classify" ? placing : 0 }]);
  };

  const sample = () => {
    const pts = [];
    const r = (n) => Math.random() * n;
    if (mode === "classify") {
      for (let i = 0; i < 12; i++) pts.push({ x: 0.3 + (r(1) - 0.5) * 0.3, y: 0.35 + (r(1) - 0.5) * 0.3, c: 0 });
      for (let i = 0; i < 12; i++) pts.push({ x: 0.68 + (r(1) - 0.5) * 0.3, y: 0.65 + (r(1) - 0.5) * 0.3, c: 1 });
    } else {
      for (let b = 0; b < 3; b++) { const cx = 0.25 + b * 0.25, cy = 0.3 + (b % 2) * 0.35; for (let i = 0; i < 10; i++) pts.push({ x: cx + (r(1) - 0.5) * 0.18, y: cy + (r(1) - 0.5) * 0.18, c: 0 }); }
    }
    setPoints(pts);
  };

  // render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    if (mode === "classify" && points.length >= 2 && points.some((p) => p.c === 0) && points.some((p) => p.c === 1)) {
      // k-NN decision regions
      const model = knn.fit(points);
      const stepPx = 8;
      for (let px = 0; px < size; px += stepPx) {
        for (let py = 0; py < size; py += stepPx) {
          const cls = knn.predict(model, px / size, py / size, Math.min(k, points.length));
          ctx.fillStyle = cls === 0 ? "rgba(14,165,233,0.14)" : "rgba(239,68,68,0.14)";
          ctx.fillRect(px, py, stepPx, stepPx);
        }
      }
    }

    // cluster coloring
    let assign = [];
    if (mode === "cluster" && centroids.length) {
      assign = points.map((p) => {
        let best = 0, bd = Infinity;
        centroids.forEach((c, i) => { const d = (c.x - p.x) ** 2 + (c.y - p.y) ** 2; if (d < bd) { bd = d; best = i; } });
        return best;
      });
    }

    // points
    points.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x * size, p.y * size, 5, 0, Math.PI * 2);
      ctx.fillStyle = mode === "classify" ? (p.c === 0 ? C0 : C1) : (centroids[assign[i]]?.c || "#94a3b8");
      ctx.fill();
      ctx.lineWidth = 1; ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.stroke();
    });

    // centroids
    if (mode === "cluster") {
      centroids.forEach((c) => {
        ctx.beginPath(); ctx.arc(c.x * size, c.y * size, 10, 0, Math.PI * 2);
        ctx.fillStyle = c.c; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = "#fff"; ctx.stroke();
      });
    }

    // frame
    ctx.strokeStyle = "rgba(148,163,184,0.5)"; ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, size - 1, size - 1);
  }, [points, mode, k, centroids, iter]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* mode toggle */}
      <div className="mb-4 flex flex-wrap gap-2">
        {[["classify", L.classify], ["cluster", L.cluster]].map(([m, label]) => (
          <button
            key={m}
            onClick={() => { setMode(m); setPoints([]); }}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${mode === m ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-[360px_1fr]">
        <div>
          <canvas
            ref={canvasRef}
            onClick={addPoint}
            className="mx-auto block w-full max-w-[360px] cursor-crosshair rounded-lg bg-slate-50"
            style={{ aspectRatio: "1/1" }}
          />
          <p className="mt-2 text-center text-xs text-slate-400">{points.length === 0 ? L.empty : L.count(points.length)}</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-slate-600">{mode === "classify" ? L.hintC : L.hintK}</p>

          {mode === "classify" && (
            <div>
              <p className="mb-1 text-xs font-semibold text-slate-500">{L.placing}</p>
              <div className="flex gap-2">
                <button onClick={() => setPlacing(0)} className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-semibold ${placing === 0 ? "border-sky-400 bg-sky-50 text-sky-700" : "border-slate-200 text-slate-600"}`}>
                  <span className="h-3 w-3 rounded-full" style={{ background: C0 }} /> {L.class0}
                </button>
                <button onClick={() => setPlacing(1)} className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-semibold ${placing === 1 ? "border-red-400 bg-red-50 text-red-700" : "border-slate-200 text-slate-600"}`}>
                  <span className="h-3 w-3 rounded-full" style={{ background: C1 }} /> {L.class1}
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>{L.kLabel}</span>
              <span className="rounded bg-brand-50 px-1.5 py-0.5 font-mono text-brand-700">{k}</span>
            </label>
            <input type="range" min={1} max={mode === "classify" ? 9 : 5} step={mode === "classify" ? 2 : 1} value={k} onChange={(e) => setK(Number(e.target.value))} className="w-full accent-brand-500" />
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={sample} className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">{L.sample}</button>
            {mode === "cluster" && <button onClick={stepKmeans} className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700">{L.step}</button>}
            <button onClick={() => setPoints([])} className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">{L.clear}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
