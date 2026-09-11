"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLang } from "../LanguageProvider";

const N = 10; // 10x10 drawing grid
const SIZE = 220;

// Prototype templates for digits 0, 1, 7 (10x10, values 0/1). Simple on purpose:
// the "classifier" compares the drawing to each prototype (nearest template) —
// a stand-in for how a trained net matches learned feature patterns.
const TEMPLATES = {
  0: [
    "0011110000",
    "0110011000",
    "0100001000",
    "1100001100",
    "1100001100",
    "1100001100",
    "1100001100",
    "0100001000",
    "0110011000",
    "0011110000",
  ],
  1: [
    "0000110000",
    "0001110000",
    "0011110000",
    "0000110000",
    "0000110000",
    "0000110000",
    "0000110000",
    "0000110000",
    "0011111100",
    "0011111100",
  ],
  7: [
    "1111111100",
    "1111111100",
    "0000011000",
    "0000110000",
    "0001100000",
    "0011000000",
    "0011000000",
    "0110000000",
    "0110000000",
    "0110000000",
  ],
};

function parse(t) {
  return t.map((row) => row.split("").map((c) => (c === "1" ? 1 : 0)));
}
const PROTOS = Object.fromEntries(Object.entries(TEMPLATES).map(([k, v]) => [k, parse(v)]));

function classify(grid) {
  let best = null;
  let bestScore = -Infinity;
  const scores = {};
  for (const [label, proto] of Object.entries(PROTOS)) {
    let match = 0;
    let total = 0;
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) {
        // reward agreement, weight "on" pixels more
        if (proto[y][x] === 1) { total += 2; if (grid[y][x] === 1) match += 2; }
        else { total += 1; if (grid[y][x] === 0) match += 1; }
      }
    const s = match / total;
    scores[label] = s;
    if (s > bestScore) { bestScore = s; best = label; }
  }
  return { best, scores };
}

export default function PixelClassifierDemo() {
  const canvasRef = useRef(null);
  const { lang } = useLang();
  const [grid, setGrid] = useState(() => Array.from({ length: N }, () => new Array(N).fill(0)));
  const drawing = useRef(false);
  const [result, setResult] = useState(() => classify(Array.from({ length: N }, () => new Array(N).fill(0))));

  const redraw = useCallback((g) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const cell = SIZE / N;
    ctx.clearRect(0, 0, SIZE, SIZE);
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) {
        ctx.fillStyle = g[y][x] ? "#0f172a" : "#f8fafc";
        ctx.fillRect(x * cell, y * cell, cell, cell);
        ctx.strokeStyle = "#e2e8f0";
        ctx.strokeRect(x * cell, y * cell, cell, cell);
      }
  }, []);

  useEffect(() => { redraw(grid); }, [grid, redraw]);

  const paint = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const cell = rect.width / N;
    const x = Math.floor((e.clientX - rect.left) / cell);
    const y = Math.floor((e.clientY - rect.top) / cell);
    if (x < 0 || x >= N || y < 0 || y >= N) return;
    setGrid((prev) => {
      if (prev[y][x] === 1) return prev;
      const next = prev.map((r) => [...r]);
      next[y][x] = 1;
      setResult(classify(next));
      return next;
    });
  };

  const clear = () => {
    const g = Array.from({ length: N }, () => new Array(N).fill(0));
    setGrid(g);
    setResult(classify(g));
  };

  const L = {
    id: { clear: "Bersihkan", pred: "Prediksi", conf: "Keyakinan", draw: "Gambar digit (0, 1, atau 7) dengan menahan & menggeser mouse.",
      hint: "Gambar sebuah digit, lalu model membandingkan pola piksel Anda dengan pola yang 'dipelajari'. Ini menyederhanakan cara jaringan saraf pengenal digit (seperti pada dataset MNIST) mencocokkan fitur. Coba gambar angka 1 lalu 7." },
    en: { clear: "Clear", pred: "Prediction", conf: "Confidence", draw: "Draw a digit (0, 1, or 7) by holding & dragging the mouse.",
      hint: "Draw a digit, then the model compares your pixel pattern to 'learned' patterns. This simplifies how a digit-recognition neural network (like on the MNIST dataset) matches features. Try drawing a 1 then a 7." },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>
      <div className="flex flex-col gap-5 lg:flex-row">
        <div>
          <canvas
            ref={canvasRef}
            width={SIZE}
            height={SIZE}
            onMouseDown={(e) => { drawing.current = true; paint(e); }}
            onMouseMove={(e) => drawing.current && paint(e)}
            onMouseUp={() => (drawing.current = false)}
            onMouseLeave={() => (drawing.current = false)}
            className="cursor-crosshair rounded-lg border border-slate-300"
            style={{ width: SIZE, height: SIZE, touchAction: "none" }}
          />
          <p className="mt-2 max-w-[220px] text-xs text-slate-400">{L.draw}</p>
        </div>

        <div className="flex-1 space-y-4">
          <div className="rounded-lg bg-slate-50 p-4 text-center">
            <div className="text-sm text-slate-500">{L.pred}</div>
            <div className="text-5xl font-black text-brand-600">{result.best}</div>
          </div>
          <div className="space-y-2">
            {Object.entries(result.scores)
              .sort((a, b) => b[1] - a[1])
              .map(([label, score]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Digit {label}</span>
                    <span>{Math.round(score * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 rounded-full bg-brand-500" style={{ width: `${score * 100}%` }} />
                  </div>
                </div>
              ))}
          </div>
          <button onClick={clear} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            {L.clear}
          </button>
        </div>
      </div>
    </div>
  );
}
