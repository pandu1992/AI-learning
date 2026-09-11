"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLang } from "../LanguageProvider";

// Value iteration on a maze. Values propagate from the goal outward.
const ROWS = 6;
const COLS = 8;
const CELL = 56;
const W = COLS * CELL;
const H = ROWS * CELL;

const GOAL = [0, 7];
const WALLS = [
  [1, 1], [2, 1], [3, 1], [4, 1],
  [1, 3], [1, 4], [1, 5],
  [3, 3], [3, 4], [3, 5], [3, 6],
  [4, 6], [5, 3],
];
const isWall = (r, c) => WALLS.some(([wr, wc]) => wr === r && wc === c);
const isGoal = (r, c) => r === GOAL[0] && c === GOAL[1];
const ACTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const ARROWS = ["↑", "↓", "←", "→"];

function emptyValues() {
  return Array.from({ length: ROWS }, () => new Array(COLS).fill(0));
}

export default function MazeValueDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const [V, setV] = useState(emptyValues);
  const [iter, setIter] = useState(0);
  const [showPolicy, setShowPolicy] = useState(true);
  const gamma = 0.9;

  const iterate = useCallback(() => {
    setV((prev) => {
      const next = prev.map((r) => [...r]);
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (isWall(r, c)) continue;
          if (isGoal(r, c)) { next[r][c] = 1; continue; }
          let best = -Infinity;
          for (const [dr, dc] of ACTIONS) {
            const nr = r + dr, nc = c + dc;
            if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || isWall(nr, nc)) continue;
            const val = -0.02 + gamma * prev[nr][nc];
            if (val > best) best = val;
          }
          next[r][c] = best === -Infinity ? 0 : best;
        }
      }
      return next;
    });
    setIter((i) => i + 1);
  }, []);

  const bestAction = useCallback((r, c, values) => {
    let best = -1, bestV = -Infinity;
    ACTIONS.forEach(([dr, dc], a) => {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || isWall(nr, nc)) return;
      if (values[nr][nc] > bestV) { bestV = values[nr][nc]; best = a; }
    });
    return best;
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    let maxV = 0.01;
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) if (V[r][c] > maxV) maxV = V[r][c];

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = c * CELL, y = r * CELL;
        if (isWall(r, c)) ctx.fillStyle = "#334155";
        else if (isGoal(r, c)) ctx.fillStyle = "#bbf7d0";
        else {
          const t = Math.max(0, V[r][c]) / maxV;
          ctx.fillStyle = `rgba(37,99,235,${0.08 + t * 0.6})`;
        }
        ctx.fillRect(x, y, CELL, CELL);
        ctx.strokeStyle = "#e2e8f0";
        ctx.strokeRect(x, y, CELL, CELL);

        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        if (isGoal(r, c)) { ctx.font = "22px serif"; ctx.fillText("🏁", x + CELL / 2, y + CELL / 2); }
        else if (!isWall(r, c)) {
          if (showPolicy && iter > 0) {
            const a = bestAction(r, c, V);
            if (a >= 0) { ctx.fillStyle = "#1e3a8a"; ctx.font = "18px sans-serif"; ctx.fillText(ARROWS[a], x + CELL / 2, y + CELL / 2 - 6); }
          }
          ctx.fillStyle = "#475569"; ctx.font = "9px monospace";
          ctx.fillText(V[r][c].toFixed(2), x + CELL / 2, y + CELL - 9);
        }
      }
    }
  }, [V, iter, showPolicy, bestAction]);

  const runAll = () => { for (let i = 0; i < 30; i++) iterate(); };
  const reset = () => { setV(emptyValues()); setIter(0); };

  const L = {
    id: { step: "Satu iterasi", all: "Sampai konvergen", reset: "Reset", iter: "Iterasi", policy: "Tampilkan kebijakan",
      hint: "Value iteration menghitung 'nilai' tiap kotak: seberapa dekat ke tujuan 🏁. Nilai menyebar mundur dari tujuan. Klik satu iterasi berulang kali untuk melihatnya merambat, lalu panah menunjukkan jalur optimal dari mana pun." },
    en: { step: "One iteration", all: "Until converged", reset: "Reset", iter: "Iteration", policy: "Show policy",
      hint: "Value iteration computes each cell's 'value': how close it is to the goal 🏁. Values spread backward from the goal. Click one iteration repeatedly to watch it propagate, then the arrows show the optimal path from anywhere." },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>
      <div className="flex flex-col gap-4 lg:flex-row">
        <canvas ref={canvasRef} width={W} height={H} className="rounded-xl border border-slate-300 bg-slate-50" style={{ width: "100%", maxWidth: W, aspectRatio: `${W}/${H}` }} />
        <div className="flex-1 space-y-4">
          <div className="rounded-lg bg-slate-50 p-3 text-center text-sm">
            <div className="text-slate-500">{L.iter}</div>
            <div className="text-lg font-bold text-slate-800">{iter}</div>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={showPolicy} onChange={(e) => setShowPolicy(e.target.checked)} className="accent-brand-600" />
            {L.policy}
          </label>
          <div className="flex flex-col gap-2">
            <button onClick={iterate} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">{L.step}</button>
            <button onClick={runAll} className="rounded-lg border border-brand-600 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">{L.all}</button>
            <button onClick={reset} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">{L.reset}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
