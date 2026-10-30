"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

const W = 420;
const H = 360;

// LDA vs PCA on two labeled classes. PCA picks the max-variance axis (ignores
// labels); LDA picks the axis that best SEPARATES the classes (uses labels).
// We show both axes and the 1D projection histograms so the difference is clear.
function seed() {
  const pts = [];
  // two elongated classes offset along y but spread along x
  const make = (cx, cy, c) => {
    for (let i = 0; i < 30; i++) {
      const t = (Math.random() - 0.5) * 240; // big spread along x (variance)
      const n = (Math.random() - 0.5) * 36;  // class separation along y
      pts.push({ x: cx + t, y: cy + n, c });
    }
  };
  make(W / 2, H / 2 - 34, 0);
  make(W / 2, H / 2 + 34, 1);
  return pts;
}

function mean(pts) {
  const n = pts.length;
  return { x: pts.reduce((s, p) => s + p.x, 0) / n, y: pts.reduce((s, p) => s + p.y, 0) / n };
}

export default function LdaDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const [points] = useState(seed);
  const [axis, setAxis] = useState("lda"); // "lda" | "pca"

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;
    // PCA axis = max variance ≈ horizontal (x) here; LDA axis = class separation ≈ vertical (y)
    const dir = axis === "pca" ? { x: 1, y: 0 } : { x: 0, y: 1 };

    // projection axis line
    ctx.strokeStyle = axis === "pca" ? "rgba(148,163,184,0.9)" : "#F5A200";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - dir.x * 240, cy - dir.y * 150);
    ctx.lineTo(cx + dir.x * 240, cy + dir.y * 150);
    ctx.stroke();

    for (const p of points) {
      const col = p.c === 1 ? "#e4002b" : "#0093D0";
      // projection onto axis
      const t = (p.x - cx) * dir.x + (p.y - cy) * dir.y;
      const px = cx + t * dir.x, py = cy + t * dir.y;
      ctx.strokeStyle = "rgba(100,116,139,0.25)";
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(px, py); ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill();
      // projected marker
      ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = col; ctx.globalAlpha = 0.6; ctx.fill(); ctx.globalAlpha = 1;
    }
  }, [points, axis]);

  // simple separation score: distance between class means projected / spread
  const m0 = mean(points.filter((p) => p.c === 0));
  const m1 = mean(points.filter((p) => p.c === 1));
  const sepLda = Math.abs(m1.y - m0.y);
  const sepPca = Math.abs(m1.x - m0.x);
  const good = axis === "lda" ? sepLda : sepPca;
  const other = axis === "lda" ? sepPca : sepLda;

  const L = {
    id: {
      lda: "LDA (pakai label)", pca: "PCA (abaikan label)",
      sep: "Pemisahan kelas pada sumbu ini",
      hint: "Reduksi dimensi bisa SUPERVISED atau UNSUPERVISED. PCA (unsupervised) memilih arah varians terbesar — di sini mendatar — dan kedua kelas malah menumpuk. LDA (supervised) memakai label untuk memilih arah yang MEMISAHKAN kelas — di sini tegak. Bandingkan kedua proyeksi.",
      verdict: good > other ? "✓ Kelas terpisah baik" : "✗ Kelas menumpuk",
    },
    en: {
      lda: "LDA (uses labels)", pca: "PCA (ignores labels)",
      sep: "Class separation on this axis",
      hint: "Dimensionality reduction can be SUPERVISED or UNSUPERVISED. PCA (unsupervised) picks the max-variance direction — here horizontal — and the two classes overlap. LDA (supervised) uses the labels to pick the direction that SEPARATES classes — here vertical. Compare the two projections.",
      verdict: good > other ? "✓ Classes well separated" : "✗ Classes overlap",
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
          <div className="flex gap-2">
            <button onClick={() => setAxis("lda")}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${axis === "lda" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700"}`}>{L.lda}</button>
            <button onClick={() => setAxis("pca")}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${axis === "pca" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700"}`}>{L.pca}</button>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 text-center text-sm">
            <div className="text-slate-500">{L.sep}</div>
            <div className="text-2xl font-black text-brand-600">{Math.round(good)}px</div>
            <div className={`mt-1 text-xs font-semibold ${good > other ? "text-green-600" : "text-red-500"}`}>{L.verdict}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
