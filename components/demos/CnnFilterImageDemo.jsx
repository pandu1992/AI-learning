"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

// CNN Filter on your own image — see what a convolution layer "sees".
// Upload an image (or use the built-in pattern), choose a 3x3 convolution kernel
// (the same operation a CNN applies, except CNNs LEARN their kernels), and view
// the filtered result side by side with the kernel values. Pure Canvas API; no
// dependencies; the image never leaves the browser. Original implementation.

const KERNELS = {
  identity: { id: "Asli (identitas)", en: "Original (identity)", k: [0, 0, 0, 0, 1, 0, 0, 0, 0], div: 1 },
  edges: { id: "Deteksi tepi", en: "Edge detect", k: [-1, -1, -1, -1, 8, -1, -1, -1, -1], div: 1 },
  sharpen: { id: "Pertajam", en: "Sharpen", k: [0, -1, 0, -1, 5, -1, 0, -1, 0], div: 1 },
  blur: { id: "Blur (rata-rata)", en: "Blur (box)", k: [1, 1, 1, 1, 1, 1, 1, 1, 1], div: 9 },
  emboss: { id: "Emboss", en: "Emboss", k: [-2, -1, 0, -1, 1, 1, 0, 1, 2], div: 1 },
  sobelx: { id: "Sobel X (tepi vertikal)", en: "Sobel X (vertical edges)", k: [-1, 0, 1, -2, 0, 2, -1, 0, 1], div: 1 },
  sobely: { id: "Sobel Y (tepi horizontal)", en: "Sobel Y (horizontal edges)", k: [-1, -2, -1, 0, 0, 0, 1, 2, 1], div: 1 },
};

const SIZE = 200;

// draw a default pattern (gradient + shapes) so the demo works without an upload
function drawDefault(ctx) {
  const g = ctx.createLinearGradient(0, 0, SIZE, SIZE);
  g.addColorStop(0, "#0093D0"); g.addColorStop(1, "#F5A200");
  ctx.fillStyle = g; ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.arc(SIZE * 0.35, SIZE * 0.4, 42, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(SIZE * 0.55, SIZE * 0.55, 70, 55);
  ctx.font = "bold 46px sans-serif"; ctx.fillStyle = "#fff";
  ctx.fillText("AI", SIZE * 0.1, SIZE * 0.9);
}

function convolve(src, kernel, div) {
  const { data, width: W, height: H } = src;
  const out = new ImageData(W, H);
  const k = kernel;
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      for (let c = 0; c < 3; c++) {
        let sum = 0, ki = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const idx = ((y + dy) * W + (x + dx)) * 4 + c;
            sum += data[idx] * k[ki++];
          }
        }
        const o = (y * W + x) * 4 + c;
        out.data[o] = Math.max(0, Math.min(255, sum / div));
      }
      out.data[(y * W + x) * 4 + 3] = 255;
    }
  }
  return out;
}

export default function CnnFilterImageDemo() {
  const { lang } = useLang();
  const srcRef = useRef(null);
  const outRef = useRef(null);
  const [kernelKey, setKernelKey] = useState("edges");
  const [hasImage, setHasImage] = useState(false);

  const applyFilter = useCallback((key) => {
    const srcC = srcRef.current, outC = outRef.current;
    if (!srcC || !outC) return;
    const sctx = srcC.getContext("2d", { willReadFrequently: true });
    const octx = outC.getContext("2d");
    const img = sctx.getImageData(0, 0, SIZE, SIZE);
    const { k, div } = KERNELS[key];
    octx.putImageData(convolve(img, k, div), 0, 0);
  }, []);

  // init default pattern
  useEffect(() => {
    const srcC = srcRef.current;
    if (!srcC) return;
    drawDefault(srcC.getContext("2d"));
    applyFilter(kernelKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { applyFilter(kernelKey); }, [kernelKey, applyFilter]);

  const onUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const sctx = srcRef.current.getContext("2d");
      sctx.clearRect(0, 0, SIZE, SIZE);
      // cover-fit
      const scale = Math.max(SIZE / img.width, SIZE / img.height);
      const w = img.width * scale, h = img.height * scale;
      sctx.drawImage(img, (SIZE - w) / 2, (SIZE - h) / 2, w, h);
      setHasImage(true);
      applyFilter(kernelKey);
    };
    img.src = URL.createObjectURL(file);
  };

  const resetImg = () => {
    drawDefault(srcRef.current.getContext("2d"));
    setHasImage(false);
    applyFilter(kernelKey);
  };

  const kernel = KERNELS[kernelKey];

  const L = {
    id: {
      hint: "Inilah yang dilakukan satu lapisan CNN: menggeser 'kernel' kecil (3×3) ke seluruh gambar dan menghitung jumlah berbobot di tiap posisi (konvolusi). Pilih kernel & lihat fitur apa yang ditonjolkan. Bedanya: CNN BELAJAR nilai kernelnya dari data.",
      upload: "Unggah gambar", reset: "Pakai pola bawaan",
      kernel: "Kernel (filter konvolusi)",
      original: "Input", filtered: "Output (setelah konvolusi)",
      values: "Nilai kernel 3×3",
      privacy: "🔒 Gambar diproses di browser Anda; tidak diunggah ke mana pun.",
      note: "Deteksi tepi/Sobel menonjolkan garis; blur menghaluskan; sharpen menegaskan detail. CNN menumpuk banyak lapisan konvolusi: lapisan awal menemukan tepi, lapisan dalam menyusunnya jadi bentuk, lalu objek.",
    },
    en: {
      hint: "This is what one CNN layer does: slide a small 'kernel' (3×3) across the image and compute a weighted sum at each position (convolution). Pick a kernel & see which features it emphasizes. The difference: a CNN LEARNS its kernel values from data.",
      upload: "Upload image", reset: "Use built-in pattern",
      kernel: "Kernel (convolution filter)",
      original: "Input", filtered: "Output (after convolution)",
      values: "3×3 kernel values",
      privacy: "🔒 The image is processed in your browser; never uploaded.",
      note: "Edge/Sobel detect lines; blur smooths; sharpen boosts detail. CNNs stack many convolution layers: early layers find edges, deeper layers assemble them into shapes, then objects.",
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-3 text-sm text-slate-600">{L.hint}</p>
      <p className="mb-4 rounded-md bg-slate-50 px-3 py-1.5 text-xs text-slate-500">{L.privacy}</p>

      {/* controls */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <label className="cursor-pointer rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
          📁 {L.upload}
          <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
        </label>
        {hasImage && <button onClick={resetImg} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">{L.reset}</button>}
      </div>

      {/* kernel picker */}
      <div className="mb-4">
        <div className="mb-1 text-sm font-semibold text-slate-700">{L.kernel}</div>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(KERNELS).map(([key, v]) => (
            <button key={key} onClick={() => setKernelKey(key)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${kernelKey === key ? "border-transparent bg-brand-600 text-white" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"}`}>
              {v[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* images */}
      <div className="flex flex-wrap items-start gap-4">
        <div>
          <p className="mb-1 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">{L.original}</p>
          <canvas ref={srcRef} width={SIZE} height={SIZE} className="rounded-lg border border-slate-300" />
        </div>
        <div>
          <p className="mb-1 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">{L.filtered}</p>
          <canvas ref={outRef} width={SIZE} height={SIZE} className="rounded-lg border border-slate-300 bg-black" />
        </div>

        {/* kernel values */}
        <div>
          <p className="mb-1 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">{L.values}</p>
          <div className="grid grid-cols-3 gap-1">
            {kernel.k.map((v, i) => (
              <div key={i} className="flex h-10 w-10 items-center justify-center rounded bg-slate-100 font-mono text-sm font-bold text-slate-700">
                {kernel.div !== 1 ? `${v}/${kernel.div}` : v}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
