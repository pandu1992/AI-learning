"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

// Random Forest / Ensemble — "Wisdom of Crowds".
// Many shallow, weak decision trees (each trained on a bootstrap sample with a
// limited depth) vote together. Individually their decision boundaries are
// jagged/overfit; averaged, the ensemble boundary is smoother and more
// accurate. A slider controls the number of trees. Original toy implementation
// (axis-aligned CART-style splits with Gini), kept small for the browser.

// ---- deterministic RNG ----
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---- dataset: two interleaving "moons" in [0,1]^2 ----
function makeData(seed) {
  const r = mulberry32(seed);
  const pts = [];
  for (let i = 0; i < 60; i++) {
    const t = Math.PI * r();
    pts.push({ x: 0.5 + 0.42 * Math.cos(t) - 0.2, y: 0.55 - 0.38 * Math.sin(t) + (r() - 0.5) * 0.12, label: 0 });
  }
  for (let i = 0; i < 60; i++) {
    const t = Math.PI * r();
    pts.push({ x: 0.5 - 0.42 * Math.cos(t) + 0.2, y: 0.45 + 0.38 * Math.sin(t) + (r() - 0.5) * 0.12, label: 1 });
  }
  return pts.map((p) => ({ x: Math.max(0, Math.min(1, p.x)), y: Math.max(0, Math.min(1, p.y)), label: p.label }));
}

const gini = (counts, n) => (n === 0 ? 0 : 1 - counts.reduce((s, c) => s + (c / n) ** 2, 0));

// Build one shallow CART tree on a bootstrap sample, random feature at each split.
function buildTree(data, rng, maxDepth) {
  // bootstrap sample
  const sample = data.map(() => data[Math.floor(rng() * data.length)]);

  function build(rows, depth) {
    const n = rows.length;
    const c0 = rows.filter((r) => r.label === 0).length;
    const c1 = n - c0;
    const majority = c1 >= c0 ? 1 : 0;
    if (depth >= maxDepth || c0 === 0 || c1 === 0 || n < 4) return { leaf: true, label: majority };

    // try a few random (feature, threshold) splits, keep best Gini
    let best = null;
    for (let tries = 0; tries < 12; tries++) {
      const feat = rng() < 0.5 ? "x" : "y";
      const thr = rng();
      const left = rows.filter((r) => r[feat] < thr);
      const right = rows.filter((r) => r[feat] >= thr);
      if (!left.length || !right.length) continue;
      const gl = gini([left.filter((r) => r.label === 0).length, left.filter((r) => r.label === 1).length], left.length);
      const gr = gini([right.filter((r) => r.label === 0).length, right.filter((r) => r.label === 1).length], right.length);
      const w = (left.length * gl + right.length * gr) / n;
      if (!best || w < best.w) best = { feat, thr, left, right, w };
    }
    if (!best) return { leaf: true, label: majority };
    return { leaf: false, feat: best.feat, thr: best.thr, left: build(best.left, depth + 1), right: build(best.right, depth + 1) };
  }
  return build(sample, 0);
}

function predictTree(tree, p) {
  let node = tree;
  while (!node.leaf) node = p[node.feat] < node.thr ? node.left : node.right;
  return node.label;
}

export default function RandomForestDemo() {
  const { lang } = useLang();
  const singleRef = useRef(null);
  const forestRef = useRef(null);
  const [numTrees, setNumTrees] = useState(15);
  const data = useMemo(() => makeData(777), []);

  // build a forest (fixed seed so it's stable); use the first tree as "single"
  const forest = useMemo(() => {
    const rng = mulberry32(2024);
    return Array.from({ length: 40 }, () => buildTree(data, rng, 4));
  }, [data]);

  const activeTrees = forest.slice(0, numTrees);

  // accuracy helpers
  const accSingle = useMemo(() => {
    const correct = data.filter((p) => predictTree(forest[0], p) === p.label).length;
    return correct / data.length;
  }, [data, forest]);

  const accForest = useMemo(() => {
    const correct = data.filter((p) => {
      const votes = activeTrees.reduce((s, t) => s + predictTree(t, p), 0);
      const pred = votes * 2 >= activeTrees.length ? 1 : 0;
      return pred === p.label;
    }).length;
    return correct / data.length;
  }, [data, activeTrees]);

  // draw a boundary grid + points onto a canvas
  const drawBoundary = (canvas, classify) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height, S = 6;
    for (let gx = 0; gx < W; gx += S) {
      for (let gy = 0; gy < H; gy += S) {
        const p = { x: gx / W, y: gy / H };
        const cls = classify(p);
        ctx.fillStyle = cls >= 0.5 ? "rgba(245,162,0,0.22)" : "rgba(0,147,208,0.18)";
        ctx.fillRect(gx, gy, S, S);
      }
    }
    // points
    data.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, 4, 0, Math.PI * 2);
      ctx.fillStyle = p.label === 1 ? "#F5A200" : "#0093D0";
      ctx.fill();
      ctx.lineWidth = 1; ctx.strokeStyle = "#fff"; ctx.stroke();
    });
  };

  useEffect(() => {
    drawBoundary(singleRef.current, (p) => predictTree(forest[0], p));
  }, [forest]);

  useEffect(() => {
    drawBoundary(forestRef.current, (p) => {
      const votes = activeTrees.reduce((s, t) => s + predictTree(t, p), 0);
      return votes / activeTrees.length; // fraction voting class 1 -> smooth
    });
  }, [activeTrees]);

  const L = {
    id: {
      hint: "Random Forest = 'kebijaksanaan orang banyak'. Satu pohon keputusan dangkal sering keliru & batasnya kasar. Tapi BANYAK pohon (tiap pohon dilatih pada sampel acak data + fitur acak) lalu VOTING menghasilkan batas yang lebih halus & akurat. Geser jumlah pohon.",
      single: "1 pohon (lemah)", forest: "Hutan (voting)",
      trees: "Jumlah pohon", acc: "Akurasi",
      note: "Tiap pohon 'overfit' sedikit dengan cara berbeda (karena data & fitur acak). Kesalahan acak mereka saling meniadakan saat divoting — inti teknik ensemble (bagging). Makin banyak pohon, batas makin stabil.",
      blue: "Kelas A", orange: "Kelas B",
    },
    en: {
      hint: "A Random Forest is 'the wisdom of crowds'. One shallow decision tree is often wrong & has a jagged boundary. But MANY trees (each trained on a random sample of data + random features) that VOTE produce a smoother, more accurate boundary. Drag the number of trees.",
      single: "1 tree (weak)", forest: "Forest (voting)",
      trees: "Number of trees", acc: "Accuracy",
      note: "Each tree 'overfits' a little in a different way (thanks to random data & features). Their random errors cancel out when voting — the essence of ensembles (bagging). More trees → a more stable boundary.",
      blue: "Class A", orange: "Class B",
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">{L.single}</span>
            <span className="font-bold text-slate-500">{L.acc}: {Math.round(accSingle * 100)}%</span>
          </div>
          <canvas ref={singleRef} width={240} height={240} className="w-full rounded-lg border border-slate-300 bg-white" style={{ aspectRatio: "1/1" }} />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">{L.forest} ({numTrees})</span>
            <span className="font-bold text-brand-600">{L.acc}: {Math.round(accForest * 100)}%</span>
          </div>
          <canvas ref={forestRef} width={240} height={240} className="w-full rounded-lg border border-slate-300 bg-white" style={{ aspectRatio: "1/1" }} />
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-semibold text-slate-700">{L.trees}: <span className="text-brand-600">{numTrees}</span></div>
        <input type="range" min="1" max="40" value={numTrees} onChange={(e) => setNumTrees(+e.target.value)} className="mt-1 w-full accent-brand-600" />
      </div>

      <div className="mt-3 flex gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded-full" style={{ background: "#0093D0" }} /> {L.blue}</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded-full" style={{ background: "#F5A200" }} /> {L.orange}</span>
      </div>

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
