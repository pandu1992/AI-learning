"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLang } from "../LanguageProvider";

const W = 480;
const H = 360;
const GRID = 8; // resolution of the decision-region grid (pixels per cell)

const CLASSES = [
  { name: { id: "Kelas A", en: "Class A" }, color: "#0093D0", bg: "rgba(0,147,208,0.12)" },
  { name: { id: "Kelas B", en: "Class B" }, color: "#dc2626", bg: "rgba(220,38,38,0.12)" },
  { name: { id: "Kelas C", en: "Class C" }, color: "#059669", bg: "rgba(5,150,105,0.12)" },
];

function seedPoints() {
  return [
    { x: 110, y: 110, c: 0 },
    { x: 150, y: 90, c: 0 },
    { x: 90, y: 160, c: 0 },
    { x: 360, y: 120, c: 1 },
    { x: 400, y: 160, c: 1 },
    { x: 340, y: 80, c: 1 },
    { x: 240, y: 280, c: 2 },
    { x: 200, y: 300, c: 2 },
    { x: 280, y: 260, c: 2 },
  ];
}

export default function KnnDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const [points, setPoints] = useState(seedPoints);
  const [k, setK] = useState(3);
  const [activeClass, setActiveClass] = useState(0);
  const [showRegions, setShowRegions] = useState(true);

  const classify = useCallback(
    (px, py) => {
      if (points.length === 0) return -1;
      const dists = points
        .map((p) => ({ c: p.c, d: (p.x - px) ** 2 + (p.y - py) ** 2 }))
        .sort((a, b) => a.d - b.d)
        .slice(0, Math.min(k, points.length));
      const votes = {};
      for (const item of dists) votes[item.c] = (votes[item.c] || 0) + 1;
      let best = -1;
      let bestVotes = -1;
      for (const cls in votes) {
        if (votes[cls] > bestVotes) {
          bestVotes = votes[cls];
          best = Number(cls);
        }
      }
      return best;
    },
    [points, k]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);

    // Decision regions
    if (showRegions && points.length > 0) {
      for (let gx = 0; gx < W; gx += GRID) {
        for (let gy = 0; gy < H; gy += GRID) {
          const c = classify(gx + GRID / 2, gy + GRID / 2);
          if (c >= 0) {
            ctx.fillStyle = CLASSES[c].bg;
            ctx.fillRect(gx, gy, GRID, GRID);
          }
        }
      }
    }

    // Points
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = CLASSES[p.c].color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
    }
  }, [points, classify, showRegions]);

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const y = ((e.clientY - rect.top) / rect.height) * H;
    setPoints((prev) => [...prev, { x, y, c: activeClass }]);
  };

  const L = {
    id: {
      k: "Nilai k (jumlah tetangga)",
      addAs: "Klik kanvas untuk menambah titik sebagai:",
      regions: "Tampilkan wilayah keputusan",
      reset: "Reset",
      clear: "Kosongkan",
      hint: "Klik di area kanvas untuk menambahkan titik data berlabel. Model akan langsung menghitung wilayah prediksi berdasarkan k tetangga terdekat.",
      count: "Jumlah titik",
    },
    en: {
      k: "k value (number of neighbors)",
      addAs: "Click the canvas to add a point as:",
      regions: "Show decision regions",
      reset: "Reset",
      clear: "Clear",
      hint: "Click on the canvas to add a labeled data point. The model instantly computes the predicted regions based on the k nearest neighbors.",
      count: "Point count",
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
          onClick={handleClick}
          className="w-full max-w-lg cursor-crosshair rounded-xl border border-slate-300 bg-slate-50"
          style={{ aspectRatio: `${W}/${H}` }}
        />

        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              {L.k}: <span className="text-brand-600">{k}</span>
            </label>
            <input
              type="range"
              min="1"
              max="9"
              step="2"
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
              className="mt-1 w-full accent-brand-600"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-700">{L.addAs}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {CLASSES.map((cls, i) => (
                <button
                  key={i}
                  onClick={() => setActiveClass(i)}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                    activeClass === i
                      ? "border-transparent text-white"
                      : "border-slate-300 bg-white text-slate-700"
                  }`}
                  style={activeClass === i ? { backgroundColor: cls.color } : {}}
                >
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: cls.color }}
                  />
                  {cls.name[lang]}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={showRegions}
              onChange={(e) => setShowRegions(e.target.checked)}
              className="accent-brand-600"
            />
            {L.regions}
          </label>

          <div className="text-sm text-slate-500">
            {L.count}: <span className="font-semibold text-slate-700">{points.length}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setPoints(seedPoints())}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              {L.reset}
            </button>
            <button
              onClick={() => setPoints([])}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {L.clear}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
