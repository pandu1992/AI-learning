"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

const W = 420;
const H = 360;

// Correlated 2D cloud; PCA finds the directions (principal components) of max
// variance. We compute the covariance matrix and its eigenvectors in closed
// form (2x2), then project onto PC1 to show the 2D→1D reduction.
function seed(spread) {
  const pts = [];
  const cx = W / 2, cy = H / 2;
  for (let i = 0; i < 60; i++) {
    const t = (Math.random() - 0.5) * 220; // along the main axis
    const n = (Math.random() - 0.5) * spread; // noise across it
    // main axis rotated ~ -30deg
    const a = -Math.PI / 6;
    pts.push({
      x: cx + t * Math.cos(a) - n * Math.sin(a),
      y: cy + t * Math.sin(a) + n * Math.cos(a),
    });
  }
  return pts;
}

// 2x2 covariance eigen-decomposition (symmetric) in closed form.
function pca(points) {
  const n = points.length;
  const mx = points.reduce((s, p) => s + p.x, 0) / n;
  const my = points.reduce((s, p) => s + p.y, 0) / n;
  let cxx = 0, cyy = 0, cxy = 0;
  for (const p of points) {
    cxx += (p.x - mx) ** 2;
    cyy += (p.y - my) ** 2;
    cxy += (p.x - mx) * (p.y - my);
  }
  cxx /= n; cyy /= n; cxy /= n;
  const tr = cxx + cyy;
  const det = cxx * cyy - cxy * cxy;
  const disc = Math.sqrt(Math.max(0, (tr / 2) ** 2 - det));
  const l1 = tr / 2 + disc; // larger eigenvalue (PC1 variance)
  const l2 = tr / 2 - disc;
  // eigenvector for l1
  let vx = cxy, vy = l1 - cxx;
  if (Math.abs(cxy) < 1e-9 && Math.abs(l1 - cxx) < 1e-9) { vx = 1; vy = 0; }
  const len = Math.hypot(vx, vy) || 1;
  vx /= len; vy /= len;
  return { mx, my, l1, l2, vx, vy, ratio: l1 / (l1 + l2 || 1) };
}

export default function PcaDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const [spread, setSpread] = useState(40);
  const [project, setProject] = useState(false);
  const [points, setPoints] = useState([]); // client-seeded to avoid hydration mismatch

  useEffect(() => { setPoints(seed(spread)); }, [spread]);

  const model = points.length ? pca(points) : { mx: W / 2, my: H / 2, l1: 1, l2: 1, vx: 1, vy: 0, ratio: 0.5 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    const { mx, my, vx, vy } = model;

    // PC1 axis line
    ctx.strokeStyle = "#F5A200";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(mx - vx * 240, my - vy * 240);
    ctx.lineTo(mx + vx * 240, my + vy * 240);
    ctx.stroke();
    // PC2 axis (perpendicular)
    ctx.strokeStyle = "rgba(148,163,184,0.7)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(mx + vy * 80, my - vx * 80);
    ctx.lineTo(mx - vy * 80, my + vx * 80);
    ctx.stroke();

    for (const p of points) {
      // projection of p onto PC1
      const t = (p.x - mx) * vx + (p.y - my) * vy;
      const px = mx + t * vx, py = my + t * vy;
      if (project) {
        // dashed drop line to the PC1 axis
        ctx.strokeStyle = "rgba(100,116,139,0.35)";
        ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(px, py); ctx.stroke();
        ctx.setLineDash([]);
      }
      // original point
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = project ? "rgba(37,99,235,0.35)" : "#0093D0";
      ctx.fill();
      if (project) {
        // projected point on the axis
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = "#e4002b";
        ctx.fill();
      }
    }
    // centroid
    ctx.beginPath(); ctx.arc(mx, my, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#111827"; ctx.fill();
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5; ctx.stroke();
  }, [points, model, project]);

  const L = {
    id: {
      spread: "Sebaran melintang (noise)", project: "Proyeksikan ke PC1 (2D → 1D)",
      pc1: "Varians dijelaskan PC1",
      hint: "PCA mencari arah dengan varians terbesar (PC1, garis oranye). Memproyeksikan data ke PC1 menurunkan 2D menjadi 1D sambil mempertahankan sebanyak mungkin informasi. Perkecil noise melintang → PC1 menjelaskan hampir semua varians.",
    },
    en: {
      spread: "Cross spread (noise)", project: "Project onto PC1 (2D → 1D)",
      pc1: "Variance explained by PC1",
      hint: "PCA finds the direction of maximum variance (PC1, the orange line). Projecting the data onto PC1 reduces 2D to 1D while keeping as much information as possible. Lower the cross-noise → PC1 explains almost all the variance.",
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
              {L.spread}: <span className="text-brand-600">{spread}</span>
            </label>
            <input type="range" min="5" max="120" value={spread}
              onChange={(e) => setSpread(Number(e.target.value))}
              className="mt-1 w-full accent-brand-600" />
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input type="checkbox" checked={project} onChange={(e) => setProject(e.target.checked)} className="accent-brand-600" />
            {L.project}
          </label>
          <div className="rounded-lg bg-slate-50 p-3 text-center text-sm">
            <div className="text-slate-500">{L.pc1}</div>
            <div className="text-2xl font-black text-brand-600">{Math.round(model.ratio * 100)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
