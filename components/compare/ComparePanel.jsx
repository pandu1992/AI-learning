"use client";

import { useEffect, useRef } from "react";
import { useLang } from "../LanguageProvider";
import { accuracy } from "@/lib/compareModels";

// Draws one classifier's decision boundary (a colored background grid) plus the
// shared dataset points on a canvas. Used twice side by side on /compare.
const C0_BG = "rgba(56,189,248,0.18)";  // blue region
const C1_BG = "rgba(248,113,113,0.18)"; // red region
const C0 = "#0ea5e9";
const C1 = "#ef4444";

export default function ComparePanel({ clf, points, size = 300 }) {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const model = clf.fit(points);
  const acc = accuracy(clf, model, points);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    // decision-region background (coarse grid for speed)
    const step = 6;
    for (let px = 0; px < size; px += step) {
      for (let py = 0; py < size; py += step) {
        const x = px / size;
        const y = py / size;
        const cls = clf.predict(model, x, y);
        ctx.fillStyle = cls === 0 ? C0_BG : C1_BG;
        ctx.fillRect(px, py, step, step);
      }
    }
    // data points
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x * size, p.y * size, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = p.c === 0 ? C0 : C1;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.stroke();
    }
    // frame
    ctx.strokeStyle = "rgba(148,163,184,0.5)";
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, size - 1, size - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clf, points, size]);

  const meta = clf[lang] || clf.en;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="font-bold text-brand-700">{meta.name}</h3>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
          {lang === "id" ? "Akurasi latih" : "Train acc"}: {(acc * 100).toFixed(0)}%
        </span>
      </div>
      <canvas ref={canvasRef} className="mx-auto block w-full max-w-[300px] rounded-lg" style={{ aspectRatio: "1/1" }} />
      <p className="mt-2 text-xs text-slate-500">{meta.note}</p>
    </div>
  );
}
