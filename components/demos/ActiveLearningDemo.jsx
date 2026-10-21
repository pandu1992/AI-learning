"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useLang } from "../LanguageProvider";

// Semi-Supervised & Active Learning — label budget is precious. Start with a
// few labeled points among many UNLABELED ones. Each "label round" reveals a
// few more labels, chosen by a strategy:
//   - Random: label random points.
//   - Active learning: label the most UNCERTAIN points (nearest the current
//     decision boundary) — the most informative ones.
// A simple linear-ish boundary (nearest-labeled-centroid) is fit from labeled
// points; accuracy on the whole pool is tracked so students see active learning
// reach high accuracy with far fewer labels. Deterministic synthetic data.

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// two gaussian blobs in [0,1]^2; label = true class
function makePool(seed) {
  const r = mulberry32(seed);
  const nz = (m, s) => { const u = Math.max(1e-9, r()), v = r(); return m + s * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const cl = (x) => Math.max(0.03, Math.min(0.97, x));
  const pts = [];
  for (let i = 0; i < 40; i++) pts.push({ x: cl(nz(0.35, 0.12)), y: cl(nz(0.45, 0.14)), cls: 0 });
  for (let i = 0; i < 40; i++) pts.push({ x: cl(nz(0.65, 0.12)), y: cl(nz(0.55, 0.14)), cls: 1 });
  return pts;
}

// fit nearest-centroid boundary from labeled points -> predict all
function predictAll(pts, labeledIdx) {
  const c0 = { x: 0, y: 0, n: 0 }, c1 = { x: 0, y: 0, n: 0 };
  labeledIdx.forEach((i) => { const p = pts[i]; const c = p.cls === 0 ? c0 : c1; c.x += p.x; c.y += p.y; c.n++; });
  if (!c0.n || !c1.n) return { pred: pts.map(() => 0), c0, c1, ok: false };
  c0.x /= c0.n; c0.y /= c0.n; c1.x /= c1.n; c1.y /= c1.n;
  const d2 = (p, c) => (p.x - c.x) ** 2 + (p.y - c.y) ** 2;
  const pred = pts.map((p) => (d2(p, c0) <= d2(p, c1) ? 0 : 1));
  return { pred, c0, c1, ok: true };
}

export default function ActiveLearningDemo() {
  const { lang } = useLang();
  const [strategy, setStrategy] = useState("active"); // random | active
  const [pool] = useState(() => makePool(2024));
  const [labeled, setLabeled] = useState(() => [0, 40, 1, 41]); // a few seeds from both classes
  const canvasRef = useRef(null);

  const { pred, c0, c1, ok } = useMemo(() => predictAll(pool, labeled), [pool, labeled]);
  const accuracy = useMemo(() => pool.filter((p, i) => pred[i] === p.cls).length / pool.length, [pool, pred]);

  // margin (uncertainty) = how close to the midline between centroids
  const uncertainty = (p) => {
    if (!ok) return 0;
    const d0 = (p.x - c0.x) ** 2 + (p.y - c0.y) ** 2;
    const d1 = (p.x - c1.x) ** 2 + (p.y - c1.y) ** 2;
    return -Math.abs(d0 - d1); // closer to boundary -> higher (less negative)
  };

  const labelMore = () => {
    const unlabeled = pool.map((_, i) => i).filter((i) => !labeled.includes(i));
    if (!unlabeled.length) return;
    let pick;
    if (strategy === "random") {
      pick = unlabeled.sort(() => Math.random() - 0.5).slice(0, 4);
    } else {
      pick = unlabeled.sort((a, b) => uncertainty(pool[b]) - uncertainty(pool[a])).slice(0, 4);
    }
    setLabeled((l) => [...l, ...pick]);
  };
  const reset = () => setLabeled([0, 40, 1, 41]);

  // draw
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H);
    // boundary region shading (predicted class per grid cell)
    if (ok) {
      const S = 10;
      for (let gx = 0; gx < W; gx += S) for (let gy = 0; gy < H; gy += S) {
        const p = { x: gx / W, y: gy / H };
        const d0 = (p.x - c0.x) ** 2 + (p.y - c0.y) ** 2, d1 = (p.x - c1.x) ** 2 + (p.y - c1.y) ** 2;
        ctx.fillStyle = d0 <= d1 ? "rgba(0,147,208,0.10)" : "rgba(245,162,0,0.12)";
        ctx.fillRect(gx, gy, S, S);
      }
    }
    pool.forEach((p, i) => {
      const isLabeled = labeled.includes(i);
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, isLabeled ? 6 : 3.5, 0, Math.PI * 2);
      if (isLabeled) {
        ctx.fillStyle = p.cls === 0 ? "#0093D0" : "#F5A200";
        ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = "#fff"; ctx.stroke();
      } else {
        ctx.fillStyle = "rgba(100,116,139,0.45)"; ctx.fill();
      }
    });
  }, [pool, labeled, c0, c1, ok]);

  const L = {
    id: {
      hint: "Memberi label itu mahal. Semi-supervised & active learning memakai sedikit label + banyak data tak berlabel secara cerdas. Active learning memilih contoh paling TIDAK PASTI (dekat batas keputusan) untuk dilabeli — paling informatif. Bandingkan dengan pelabelan acak.",
      strategy: "Strategi pelabelan", random: "Acak", active: "Active Learning (paling tidak pasti)",
      labelMore: "+ Labeli 4 contoh", reset: "↻ Reset",
      labeledN: "Berlabel", accuracy: "Akurasi model",
      legend: "🔵/🟠 = berlabel (kelas) · abu-abu kecil = belum berlabel",
      note: "Active learning mencapai akurasi tinggi dengan JAUH lebih sedikit label karena fokus pada contoh yang paling membingungkan model. Hemat biaya anotasi — penting untuk NLP di mana melabeli teks mahal.",
    },
    en: {
      hint: "Labeling is expensive. Semi-supervised & active learning use a few labels + lots of unlabeled data wisely. Active learning picks the most UNCERTAIN examples (near the decision boundary) to label — the most informative ones. Compare with random labeling.",
      strategy: "Labeling strategy", random: "Random", active: "Active Learning (most uncertain)",
      labelMore: "+ Label 4 examples", reset: "↻ Reset",
      labeledN: "Labeled", accuracy: "Model accuracy",
      legend: "🔵/🟠 = labeled (class) · small grey = unlabeled",
      note: "Active learning reaches high accuracy with FAR fewer labels by focusing on the examples that confuse the model most. It saves annotation cost — crucial for NLP where labeling text is expensive.",
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      {/* strategy */}
      <div className="mb-3 inline-flex flex-wrap rounded-lg border border-slate-300 p-0.5 text-sm font-semibold">
        {[["random", L.random], ["active", L.active]].map(([k, lab]) => (
          <button key={k} onClick={() => setStrategy(k)} className={`rounded-md px-3 py-1.5 transition ${strategy === k ? "bg-brand-600 text-white" : "text-slate-600"}`}>{lab}</button>
        ))}
      </div>

      <canvas ref={canvasRef} width={320} height={260} className="w-full max-w-sm rounded-xl border border-slate-300 bg-white" style={{ aspectRatio: "320/260" }} />
      <p className="mt-1 text-[11px] text-slate-400">{L.legend}</p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-slate-200 p-2 text-center">
          <div className="text-xs text-slate-500">🏷️ {L.labeledN}</div>
          <div className="text-xl font-black text-slate-700">{labeled.length} / {pool.length}</div>
        </div>
        <div className="rounded-lg border border-brand-200 bg-brand-50 p-2 text-center">
          <div className="text-xs text-brand-700">🎯 {L.accuracy}</div>
          <div className="text-xl font-black text-brand-600">{Math.round(accuracy * 100)}%</div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={labelMore} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">{L.labelMore}</button>
        <button onClick={reset} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">{L.reset}</button>
      </div>

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
