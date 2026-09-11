"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLang } from "../LanguageProvider";

const SIZE = 200; // canvas pixels
const GRID = 40; // logical grayscale grid resolution

// Kernels students can apply
const KERNELS = {
  identity: { id: "Asli (Identity)", en: "Original (Identity)", k: [[0, 0, 0], [0, 1, 0], [0, 0, 0]], div: 1 },
  blur: { id: "Blur", en: "Blur", k: [[1, 1, 1], [1, 1, 1], [1, 1, 1]], div: 9 },
  sharpen: { id: "Pertajam", en: "Sharpen", k: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]], div: 1 },
  edge: { id: "Deteksi Tepi", en: "Edge Detect", k: [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]], div: 1 },
  sobelX: { id: "Sobel Horizontal", en: "Sobel Horizontal", k: [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]], div: 1 },
  emboss: { id: "Emboss", en: "Emboss", k: [[-2, -1, 0], [-1, 1, 1], [0, 1, 2]], div: 1 },
};

// Build a simple grayscale "image": a circle + a diagonal bar, so filters show clearly.
function makeImage() {
  const img = Array.from({ length: GRID }, () => new Array(GRID).fill(0.1));
  const cx = GRID * 0.4;
  const cy = GRID * 0.45;
  const r = GRID * 0.22;
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const d = Math.hypot(x - cx, y - cy);
      if (d < r) img[y][x] = 0.85;
      // diagonal bar
      if (Math.abs(x - y - 6) < 2.2) img[y][x] = 0.95;
      // vertical strip
      if (x > GRID * 0.72 && x < GRID * 0.82) img[y][x] = 0.7;
    }
  }
  return img;
}

function convolve(img, kernel, div) {
  const out = Array.from({ length: GRID }, () => new Array(GRID).fill(0));
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      let sum = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const yy = Math.min(GRID - 1, Math.max(0, y + ky));
          const xx = Math.min(GRID - 1, Math.max(0, x + kx));
          sum += img[yy][xx] * kernel[ky + 1][kx + 1];
        }
      }
      out[y][x] = sum / div;
    }
  }
  return out;
}

function drawGrid(ctx, grid) {
  const cell = SIZE / GRID;
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const v = Math.min(1, Math.max(0, grid[y][x]));
      const g = Math.round(v * 255);
      ctx.fillStyle = `rgb(${g},${g},${g})`;
      ctx.fillRect(x * cell, y * cell, cell + 1, cell + 1);
    }
  }
}

export default function CnnFiltersDemo() {
  const inRef = useRef(null);
  const outRef = useRef(null);
  const { lang } = useLang();
  const [image] = useState(makeImage);
  const [kernelKey, setKernelKey] = useState("edge");

  useEffect(() => {
    const inCtx = inRef.current?.getContext("2d");
    const outCtx = outRef.current?.getContext("2d");
    if (!inCtx || !outCtx) return;
    drawGrid(inCtx, image);
    const { k, div } = KERNELS[kernelKey];
    drawGrid(outCtx, convolve(image, k, div));
  }, [image, kernelKey]);

  const L = {
    id: { input: "Gambar Asli", output: "Hasil Konvolusi", kernel: "Pilih kernel",
      hint: "CNN memakai kernel (matriks kecil 3×3) yang digeser ke seluruh gambar untuk mendeteksi fitur seperti tepi, tekstur, atau pola. Pilih kernel berbeda dan bandingkan hasilnya. Angka pada kernel menentukan fitur apa yang ditonjolkan." },
    en: { input: "Original Image", output: "Convolution Result", kernel: "Choose a kernel",
      hint: "A CNN uses kernels (small 3×3 matrices) slid across the whole image to detect features like edges, textures, or patterns. Pick different kernels and compare. The numbers in the kernel decide which feature is emphasized." },
  }[lang];

  const kernel = KERNELS[kernelKey];

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
            <canvas ref={outRef} width={SIZE} height={SIZE} className="rounded-lg border border-brand-300" style={{ imageRendering: "pixelated", width: SIZE, height: SIZE }} />
            <figcaption className="mt-1 text-xs font-semibold text-brand-600">{L.output}</figcaption>
          </figure>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">{L.kernel}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.entries(KERNELS).map(([key, kv]) => (
                <button
                  key={key}
                  onClick={() => setKernelKey(key)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    kernelKey === key ? "border-transparent bg-brand-600 text-white" : "border-slate-300 bg-white text-slate-700"
                  }`}
                >
                  {kv[lang]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold text-slate-500">Kernel 3×3</p>
            <div className="inline-grid grid-cols-3 gap-1">
              {kernel.k.flat().map((v, i) => (
                <div key={i} className="flex h-9 w-9 items-center justify-center rounded bg-slate-100 text-sm font-mono text-slate-700">
                  {v}
                </div>
              ))}
            </div>
            {kernel.div !== 1 && <p className="mt-1 text-xs text-slate-400">÷ {kernel.div}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
