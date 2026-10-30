"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

const W = 420;
const H = 360;

const CLUSTER_COLORS = ["#0093D0", "#e4002b", "#16a34a", "#9333ea", "#F5A200"];

// DBSCAN: density-based clustering. Unlike k-means it needs no k, finds
// arbitrary shapes, and labels sparse points as NOISE. We implement the real
// algorithm (eps neighborhood + minPts core points) and color the result.
function seed() {
  const pts = [];
  // two moon-ish arcs + scattered noise → k-means would fail, DBSCAN won't
  for (let i = 0; i < 40; i++) {
    const a = Math.PI * (i / 40);
    pts.push({ x: 150 + Math.cos(a) * 90 + (Math.random() - 0.5) * 18, y: 170 - Math.sin(a) * 90 + (Math.random() - 0.5) * 18 });
  }
  for (let i = 0; i < 40; i++) {
    const a = Math.PI * (i / 40);
    pts.push({ x: 250 - Math.cos(a) * 90 + (Math.random() - 0.5) * 18, y: 210 + Math.sin(a) * 90 + (Math.random() - 0.5) * 18 });
  }
  for (let i = 0; i < 10; i++) pts.push({ x: 40 + Math.random() * 340, y: 30 + Math.random() * 300 });
  return pts;
}

function dbscan(points, eps, minPts) {
  const n = points.length;
  const labels = new Array(n).fill(undefined); // undefined=unvisited, -1=noise, >=0 cluster
  const region = (i) => {
    const out = [];
    for (let j = 0; j < n; j++) {
      const dx = points[i].x - points[j].x, dy = points[i].y - points[j].y;
      if (dx * dx + dy * dy <= eps * eps) out.push(j);
    }
    return out;
  };
  let cid = -1;
  for (let i = 0; i < n; i++) {
    if (labels[i] !== undefined) continue;
    const nb = region(i);
    if (nb.length < minPts) { labels[i] = -1; continue; }
    cid += 1;
    labels[i] = cid;
    const queue = nb.filter((j) => j !== i);
    for (let q = 0; q < queue.length; q++) {
      const j = queue[q];
      if (labels[j] === -1) labels[j] = cid;
      if (labels[j] !== undefined) continue;
      labels[j] = cid;
      const nb2 = region(j);
      if (nb2.length >= minPts) for (const k of nb2) if (!queue.includes(k)) queue.push(k);
    }
  }
  return labels;
}

export default function DbscanDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  // Seed random points only on the client (after mount) to avoid an SSR/client
  // hydration mismatch (Math.random differs between server and browser).
  const [points, setPoints] = useState([]);
  const [eps, setEps] = useState(34);
  const [minPts, setMinPts] = useState(4);
  useEffect(() => { setPoints(seed()); }, []);

  const labels = dbscan(points, eps, minPts);
  const clusters = Math.max(0, ...labels.map((l) => l + 1));
  const noise = labels.filter((l) => l === -1).length;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    points.forEach((p, i) => {
      const l = labels[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      if (l === -1) { ctx.fillStyle = "#cbd5e1"; } else { ctx.fillStyle = CLUSTER_COLORS[l % CLUSTER_COLORS.length]; }
      ctx.fill();
      ctx.lineWidth = 1.2; ctx.strokeStyle = l === -1 ? "#94a3b8" : "#fff"; ctx.stroke();
    });
  }, [points, labels]);

  const L = {
    id: {
      eps: "ε (radius tetangga)", minPts: "minPts (titik minimum)",
      clusters: "Cluster ditemukan", noise: "Titik noise (abu-abu)",
      hint: "DBSCAN mengelompokkan berdasarkan KEPADATAN: titik dengan cukup tetangga (≥ minPts dalam radius ε) menjadi inti dan menumbuhkan cluster. Kelebihannya vs k-means: tak perlu menentukan jumlah cluster, bisa bentuk melengkung, dan menandai pencilan sebagai noise. Atur ε & minPts.",
    },
    en: {
      eps: "ε (neighbor radius)", minPts: "minPts (min points)",
      clusters: "Clusters found", noise: "Noise points (grey)",
      hint: "DBSCAN clusters by DENSITY: a point with enough neighbors (≥ minPts within radius ε) becomes a core point and grows a cluster. Its edge over k-means: no need to set the number of clusters, it handles curved shapes, and it flags outliers as noise. Tune ε & minPts.",
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
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              {L.eps}: <span className="text-brand-600">{eps}</span>
            </label>
            <input type="range" min="16" max="70" value={eps}
              onChange={(e) => setEps(Number(e.target.value))} className="mt-1 w-full accent-brand-600" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              {L.minPts}: <span className="text-brand-600">{minPts}</span>
            </label>
            <input type="range" min="2" max="10" value={minPts}
              onChange={(e) => setMinPts(Number(e.target.value))} className="mt-1 w-full accent-brand-600" />
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-50 p-3 text-center text-sm">
            <div><div className="text-slate-500">{L.clusters}</div><div className="font-bold text-slate-800">{clusters}</div></div>
            <div><div className="text-slate-500">{L.noise}</div><div className="font-bold text-slate-800">{noise}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
