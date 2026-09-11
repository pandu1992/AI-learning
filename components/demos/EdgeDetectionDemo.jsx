"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

const SIZE = 220;
const GRID = 44;

// Draw a small "scene": house shape (square + triangle roof) + sun
function makeScene() {
  const img = Array.from({ length: GRID }, () => new Array(GRID).fill(0.12));
  // house body
  for (let y = 24; y < 38; y++) for (let x = 12; x < 30; x++) img[y][x] = 0.75;
  // roof (triangle)
  for (let y = 15; y < 24; y++) {
    const half = (y - 15);
    for (let x = 21 - half; x <= 21 + half; x++) if (x >= 0 && x < GRID) img[y][x] = 0.55;
  }
  // door
  for (let y = 31; y < 38; y++) for (let x = 19; x < 23; x++) img[y][x] = 0.2;
  // sun
  const cx = 34, cy = 12, r = 5;
  for (let y = 0; y < GRID; y++) for (let x = 0; x < GRID; x++) if (Math.hypot(x - cx, y - cy) < r) img[y][x] = 0.95;
  return img;
}

const SOBEL_X = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
const SOBEL_Y = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];

function sobel(img) {
  const out = Array.from({ length: GRID }, () => new Array(GRID).fill(0));
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      let gx = 0, gy = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const yy = Math.min(GRID - 1, Math.max(0, y + ky));
          const xx = Math.min(GRID - 1, Math.max(0, x + kx));
          gx += img[yy][xx] * SOBEL_X[ky + 1][kx + 1];
          gy += img[yy][xx] * SOBEL_Y[ky + 1][kx + 1];
        }
      }
      out[y][x] = Math.hypot(gx, gy);
    }
  }
  return out;
}

function draw(ctx, grid, threshold, isEdge) {
  const cell = SIZE / GRID;
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      let g;
      if (isEdge) {
        const mag = grid[y][x];
        g = mag > threshold ? 255 : 0; // white edges on black
      } else {
        g = Math.round(Math.min(1, Math.max(0, grid[y][x])) * 255);
      }
      ctx.fillStyle = `rgb(${g},${g},${g})`;
      ctx.fillRect(x * cell, y * cell, cell + 1, cell + 1);
    }
  }
}

export default function EdgeDetectionDemo() {
  const inRef = useRef(null);
  const outRef = useRef(null);
  const { lang } = useLang();
  const [image] = useState(makeScene);
  const [threshold, setThreshold] = useState(0.6);

  useEffect(() => {
    const inCtx = inRef.current?.getContext("2d");
    const outCtx = outRef.current?.getContext("2d");
    if (!inCtx || !outCtx) return;
    draw(inCtx, image, 0, false);
    draw(outCtx, sobel(image), threshold, true);
  }, [image, threshold]);

  const L = {
    id: { input: "Gambar Asli", output: "Peta Tepi (Sobel)", thr: "Ambang tepi",
      hint: "Deteksi tepi menemukan tempat kecerahan berubah tajam — yaitu batas objek. Operator Sobel menghitung gradien di arah x dan y. Geser ambang: rendah = banyak detail (termasuk noise), tinggi = hanya tepi paling kuat. Ini langkah awal klasik dalam computer vision." },
    en: { input: "Original Image", output: "Edge Map (Sobel)", thr: "Edge threshold",
      hint: "Edge detection finds where brightness changes sharply — i.e. object boundaries. The Sobel operator computes gradients in x and y. Slide the threshold: low = lots of detail (incl. noise), high = only the strongest edges. This is a classic first step in computer vision." },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex gap-4">
          <figure className="text-center">
            <canvas ref={inRef} width={SIZE} height={SIZE} className="rounded-lg border border-slate-300" style={{ imageRendering: "pixelated", width: SIZE, height: SIZE }} />
            <figcaption className="mt-1 text-xs font-semibold text-slate-500">{L.input}</figcaption>
          </figure>
          <figure className="text-center">
            <canvas ref={outRef} width={SIZE} height={SIZE} className="rounded-lg border border-brand-300 bg-black" style={{ imageRendering: "pixelated", width: SIZE, height: SIZE }} />
            <figcaption className="mt-1 text-xs font-semibold text-brand-600">{L.output}</figcaption>
          </figure>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              {L.thr}: <span className="text-brand-600">{threshold.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="1.6"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="mt-1 w-full accent-brand-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
