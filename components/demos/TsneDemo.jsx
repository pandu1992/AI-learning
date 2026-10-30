"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

const W = 420;
const H = 360;

// Conceptual t-SNE: three classes live in a high-D space where they're tangled
// when shown by a naive linear projection, but t-SNE pulls same-class neighbors
// together and pushes different classes apart. We fake "high-D" by assigning
// each point a class + target cluster center, then animate from a scrambled
// linear layout toward well-separated neighborhoods (attraction/repulsion feel).
const COLORS = ["#0093D0", "#e4002b", "#16a34a"];

function makePoints() {
  const pts = [];
  const centers = [
    { x: 120, y: 120 }, { x: 300, y: 130 }, { x: 210, y: 270 },
  ];
  for (let c = 0; c < 3; c++) {
    for (let i = 0; i < 18; i++) {
      pts.push({
        c,
        // scrambled "linear projection" start (classes overlap in the middle)
        x: W / 2 + (Math.random() - 0.5) * 120,
        y: H / 2 + (Math.random() - 0.5) * 120,
        tx: centers[c].x + (Math.random() - 0.5) * 70,
        ty: centers[c].y + (Math.random() - 0.5) * 70,
      });
    }
  }
  return pts;
}

export default function TsneDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]); // client-seeded
  const [t, setT] = useState(0); // 0 = tangled (linear), 1 = t-SNE embedded
  const [running, setRunning] = useState(false);
  const raf = useRef(0);
  useEffect(() => { setPoints(makePoints()); }, []);

  useEffect(() => {
    if (!running) return undefined;
    const tick = () => {
      setT((v) => {
        const nv = Math.min(1, v + 0.015);
        if (nv >= 1) setRunning(false);
        return nv;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    // ease
    const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
    for (const p of points) {
      const x = p.x + (p.tx - p.x) * e;
      const y = p.y + (p.ty - p.y) * e;
      ctx.beginPath();
      ctx.arc(x, y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = COLORS[p.c];
      ctx.fill();
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.2; ctx.stroke();
    }
  }, [points, t]);

  const L = {
    id: {
      run: "▶ Jalankan t-SNE", reset: "↺ Acak ulang",
      stage: t < 0.05 ? "Proyeksi linear: kelas bertumpuk" : t >= 1 ? "t-SNE: kelas terpisah rapi" : "Mengoptimasi tetangga…",
      hint: "t-SNE adalah reduksi dimensi NON-LINEAR untuk VISUALISASI. Ia menjaga tetangga: titik yang mirip di ruang berdimensi tinggi ditarik berdekatan, yang berbeda didorong menjauh — sehingga kelompok yang tadinya bertumpuk jadi terpisah jelas di 2D. (Tak seperti PCA, jaraknya tidak boleh ditafsir harfiah.)",
    },
    en: {
      run: "▶ Run t-SNE", reset: "↺ Reshuffle",
      stage: t < 0.05 ? "Linear projection: classes overlap" : t >= 1 ? "t-SNE: classes cleanly separated" : "Optimizing neighborhoods…",
      hint: "t-SNE is a NON-LINEAR reduction for VISUALIZATION. It preserves neighborhoods: points similar in high-D are pulled together, dissimilar ones pushed apart — so groups that were tangled become clearly separated in 2D. (Unlike PCA, the distances shouldn't be read literally.)",
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
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { if (t >= 1) { setPoints(makePoints()); setT(0); } setRunning(true); }}
              disabled={running}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
            >{L.run}</button>
            <button
              onClick={() => { setRunning(false); setPoints(makePoints()); setT(0); }}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >{L.reset}</button>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 text-center text-sm font-semibold text-slate-700">
            {L.stage}
          </div>
        </div>
      </div>
    </div>
  );
}
