"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

const W = 420;
const H = 360;

// SVM intuition: two separable classes; the "best" line is the one with the
// widest MARGIN (gap) to the nearest points (the support vectors). We let the
// user rotate the separating line and show the resulting margin; the max-margin
// line is highlighted as the target.
function seed() {
  const pts = [];
  for (let i = 0; i < 16; i++) pts.push({ x: 90 + Math.random() * 90, y: 60 + Math.random() * 240, c: 0 });
  for (let i = 0; i < 16; i++) pts.push({ x: 240 + Math.random() * 90, y: 60 + Math.random() * 240, c: 1 });
  return pts;
}

export default function SvmDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const [points] = useState(seed);
  const [angle, setAngle] = useState(90); // degrees; 90 = vertical line

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;
    const rad = (angle * Math.PI) / 180;
    // line direction & its normal
    const dx = Math.cos(rad), dy = Math.sin(rad);
    const nx = -dy, ny = dx; // normal

    // signed distance of each point to the line through center
    let minPos = Infinity, minNeg = Infinity;
    for (const p of points) {
      const d = (p.x - cx) * nx + (p.y - cy) * ny;
      if (p.c === 1) minPos = Math.min(minPos, Math.abs(d));
      else minNeg = Math.min(minNeg, Math.abs(d));
    }
    const margin = Math.min(minPos, minNeg);

    // margin band
    ctx.fillStyle = "rgba(245,162,0,0.12)";
    ctx.beginPath();
    ctx.moveTo(cx + dx * 300 + nx * margin, cy + dy * 300 + ny * margin);
    ctx.lineTo(cx - dx * 300 + nx * margin, cy - dy * 300 + ny * margin);
    ctx.lineTo(cx - dx * 300 - nx * margin, cy - dy * 300 - ny * margin);
    ctx.lineTo(cx + dx * 300 - nx * margin, cy + dy * 300 - ny * margin);
    ctx.closePath(); ctx.fill();

    // decision line
    ctx.strokeStyle = "#111827"; ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx + dx * 300, cy + dy * 300);
    ctx.lineTo(cx - dx * 300, cy - dy * 300);
    ctx.stroke();
    // margin boundaries
    ctx.strokeStyle = "#F5A200"; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
    for (const s of [1, -1]) {
      ctx.beginPath();
      ctx.moveTo(cx + dx * 300 + s * nx * margin, cy + dy * 300 + s * ny * margin);
      ctx.lineTo(cx - dx * 300 + s * nx * margin, cy - dy * 300 + s * ny * margin);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    for (const p of points) {
      const d = (p.x - cx) * nx + (p.y - cy) * ny;
      const isSV = Math.abs(Math.abs(d) - margin) < 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, isSV ? 6.5 : 4.5, 0, Math.PI * 2);
      ctx.fillStyle = p.c === 1 ? "#e4002b" : "#0093D0";
      ctx.fill();
      ctx.lineWidth = isSV ? 3 : 1.2;
      ctx.strokeStyle = isSV ? "#F5A200" : "#fff";
      ctx.stroke();
    }
  }, [points, angle]);

  // margin for readout
  const cx = W / 2, cy = H / 2, rad = (angle * Math.PI) / 180;
  const nx = -Math.sin(rad), ny = Math.cos(rad);
  let minPos = Infinity, minNeg = Infinity;
  for (const p of points) {
    const d = (p.x - cx) * nx + (p.y - cy) * ny;
    if (p.c === 1) minPos = Math.min(minPos, Math.abs(d)); else minNeg = Math.min(minNeg, Math.abs(d));
  }
  const margin = Math.round(Math.min(minPos, minNeg));

  const L = {
    id: {
      angle: "Putar garis pemisah",
      margin: "Lebar margin",
      hint: "SVM memilih garis pemisah dengan MARGIN (jarak ke titik terdekat) TERLEBAR. Titik yang menyentuh batas margin disebut support vector (dilingkari oranye) — merekalah penentu garis. Putar garis: margin maksimum = pemisah paling tahan-noise.",
    },
    en: {
      angle: "Rotate the separating line",
      margin: "Margin width",
      hint: "An SVM picks the separating line with the WIDEST MARGIN (distance to the nearest points). The points touching the margin are the support vectors (circled orange) — they alone define the line. Rotate the line: the maximum margin = the most noise-robust separator.",
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
              {L.angle}: <span className="text-brand-600">{angle}°</span>
            </label>
            <input type="range" min="45" max="135" value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="mt-1 w-full accent-brand-600" />
          </div>
          <div className="rounded-lg bg-slate-50 p-3 text-center text-sm">
            <div className="text-slate-500">{L.margin}</div>
            <div className="text-2xl font-black text-brand-600">{margin}px</div>
          </div>
        </div>
      </div>
    </div>
  );
}
