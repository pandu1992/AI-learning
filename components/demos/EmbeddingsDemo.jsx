"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

const W = 440;
const H = 380;
const PAD = 30;

// Precomputed 2D "embedding" coordinates (0..1) grouping words by meaning.
// This mimics how real embeddings place similar words near each other.
const WORDS = [
  { w: { id: "raja", en: "king" }, x: 0.28, y: 0.22, g: "royal" },
  { w: { id: "ratu", en: "queen" }, x: 0.34, y: 0.30, g: "royal" },
  { w: { id: "pangeran", en: "prince" }, x: 0.22, y: 0.32, g: "royal" },
  { w: { id: "kucing", en: "cat" }, x: 0.72, y: 0.24, g: "animal" },
  { w: { id: "anjing", en: "dog" }, x: 0.78, y: 0.30, g: "animal" },
  { w: { id: "harimau", en: "tiger" }, x: 0.68, y: 0.16, g: "animal" },
  { w: { id: "apel", en: "apple" }, x: 0.25, y: 0.74, g: "fruit" },
  { w: { id: "pisang", en: "banana" }, x: 0.32, y: 0.80, g: "fruit" },
  { w: { id: "jeruk", en: "orange" }, x: 0.20, y: 0.82, g: "fruit" },
  { w: { id: "mobil", en: "car" }, x: 0.74, y: 0.72, g: "vehicle" },
  { w: { id: "bus", en: "bus" }, x: 0.80, y: 0.78, g: "vehicle" },
  { w: { id: "sepeda", en: "bicycle" }, x: 0.68, y: 0.80, g: "vehicle" },
];
const GROUP_COLORS = { royal: "#7c3aed", animal: "#dc2626", fruit: "#059669", vehicle: "#0093D0" };

function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

export default function EmbeddingsDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    const toPx = (x, y) => [PAD + x * (W - 2 * PAD), PAD + y * (H - 2 * PAD)];
    const sel = WORDS[selected];

    // lines to nearest neighbors
    const others = WORDS.map((w, i) => ({ i, d: dist(sel, w) })).filter((o) => o.i !== selected).sort((a, b) => a.d - b.d).slice(0, 3);
    const [sx, sy] = toPx(sel.x, sel.y);
    others.forEach((o) => {
      const [ox, oy] = toPx(WORDS[o.i].x, WORDS[o.i].y);
      ctx.strokeStyle = "rgba(100,116,139,0.35)";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ox, oy); ctx.stroke();
    });

    WORDS.forEach((word, i) => {
      const [px, py] = toPx(word.x, word.y);
      const isSel = i === selected;
      ctx.beginPath();
      ctx.arc(px, py, isSel ? 8 : 5, 0, Math.PI * 2);
      ctx.fillStyle = GROUP_COLORS[word.g];
      ctx.fill();
      if (isSel) { ctx.lineWidth = 3; ctx.strokeStyle = "#0f172a"; ctx.stroke(); }
      ctx.fillStyle = "#334155";
      ctx.font = isSel ? "bold 12px sans-serif" : "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(word.w[lang], px, py - 11);
    });
  }, [selected, lang]);

  const sel = WORDS[selected];
  const neighbors = WORDS.map((w, i) => ({ i, d: dist(sel, w) })).filter((o) => o.i !== selected).sort((a, b) => a.d - b.d).slice(0, 3);

  const L = {
    id: { pick: "Pilih kata", nearest: "Kata terdekat (makna serupa)",
      hint: "Word embedding mengubah kata menjadi vektor angka. Kata bermakna serupa ditempatkan berdekatan dalam ruang. Klik sebuah kata untuk melihat tetangga terdekatnya — perhatikan kelompok terbentuk sendiri: hewan, buah, kendaraan, kerajaan. Inilah fondasi cara model memahami makna." },
    en: { pick: "Pick a word", nearest: "Nearest words (similar meaning)",
      hint: "Word embeddings turn words into number vectors. Words with similar meaning sit close together in space. Click a word to see its nearest neighbors — notice groups form on their own: animals, fruits, vehicles, royalty. This is the basis of how models grasp meaning." },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>
      <div className="flex flex-col gap-4 lg:flex-row">
        <canvas ref={canvasRef} width={W} height={H} className="w-full max-w-md rounded-xl border border-slate-300 bg-slate-50" style={{ aspectRatio: `${W}/${H}` }} />
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">{L.pick}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {WORDS.map((word, i) => (
                <button key={i} onClick={() => setSelected(i)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${selected === i ? "text-white" : "bg-slate-100 text-slate-700"}`}
                  style={selected === i ? { backgroundColor: GROUP_COLORS[word.g] } : {}}>
                  {word.w[lang]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">{L.nearest}</p>
            <ol className="mt-2 space-y-1 text-sm text-slate-600">
              {neighbors.map((n) => (
                <li key={n.i} className="flex justify-between rounded bg-slate-50 px-2 py-1">
                  <span>{WORDS[n.i].w[lang]}</span>
                  <span className="text-xs text-slate-400">{(1 - n.d).toFixed(2)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
