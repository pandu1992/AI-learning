"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";
import { batikImages, BATIK_CLASS_ORDER } from "@/lib/batikImages";

// Batik Vision Lab: real in-browser computer vision on the actual batik dataset
// images. Everything runs on a <canvas> via pixel manipulation (no server, no
// ML runtime) so students SEE genuine CV operations on real motifs:
//   • Convolution filters (edge / sharpen / blur / emboss) — the heart of CNNs
//   • Grayscale & per-channel (R/G/B) views
//   • "What the MLP sees": downscale to 32×32 then upscale (the resize step)
// Teaching payoff: edge filters reveal a motif's structure; the 32×32 view shows
// how much detail an MLP loses — motivating CNNs.

const SIZE = 240; // display canvas size

// 3x3 convolution kernels (classic CV filters).
const KERNELS = {
  identity: [0, 0, 0, 0, 1, 0, 0, 0, 0],
  edges: [-1, -1, -1, -1, 8, -1, -1, -1, -1],
  sharpen: [0, -1, 0, -1, 5, -1, 0, -1, 0],
  blur: [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9],
  emboss: [-2, -1, 0, -1, 1, 1, 0, 1, 2],
};

export default function BatikVisionLab() {
  const { lang } = useLang();
  const [cls, setCls] = useState("Parang");
  const [imgIdx, setImgIdx] = useState(0);
  const [mode, setMode] = useState("edges"); // filter/mode key
  const srcRef = useRef(null); // offscreen source image
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  const L = {
    id: {
      pickClass: "Pilih motif", pickImage: "Pilih citra", op: "Operasi visi komputer",
      modes: { original: "Asli", edges: "Deteksi tepi", sharpen: "Pertajam", blur: "Blur", emboss: "Emboss", gray: "Grayscale", r: "Channel Merah", g: "Channel Hijau", b: "Channel Biru", mlp: "Yang 'dilihat' MLP (32×32)" },
      explainTitle: "Apa yang terjadi?",
      explains: {
        original: "Citra batik asli (RGB). Semua operasi di bawah bekerja langsung pada piksel citra ini — nyata, bukan simulasi.",
        edges: "Filter konvolusi Laplacian menyorot perubahan intensitas tajam → menonjolkan GARIS & KONTUR motif. Inilah inti cara CNN 'melihat' bentuk.",
        sharpen: "Kernel sharpen menguatkan tepi relatif terhadap sekitarnya → motif tampak lebih tegas.",
        blur: "Rata-rata 3×3 (box blur) menghaluskan citra → detail halus hilang, mirip langkah pra-pemrosesan untuk meredam noise.",
        emboss: "Kernel emboss memberi kesan timbul/relief berdasarkan arah gradien — cara lain menonjolkan struktur motif.",
        gray: "Mengubah RGB → satu kanal keabuan (luminансi). Banyak operasi tepi bekerja pada grayscale.",
        r: "Hanya kanal Merah. Memisah kanal menunjukkan bagaimana warna motif tersebar — fitur penting untuk klasifikasi.",
        g: "Hanya kanal Hijau.",
        b: "Hanya kanal Biru.",
        mlp: "Citra diperkecil ke 32×32 (sesuai soal) lalu diperbesar lagi. Perhatikan detail yang HILANG — inilah yang membuat MLP kesulitan & alasan CNN biasanya lebih baik untuk citra.",
      },
    },
    en: {
      pickClass: "Pick a motif", pickImage: "Pick an image", op: "Computer-vision operation",
      modes: { original: "Original", edges: "Edge detection", sharpen: "Sharpen", blur: "Blur", emboss: "Emboss", gray: "Grayscale", r: "Red channel", g: "Green channel", b: "Blue channel", mlp: "What the MLP 'sees' (32×32)" },
      explainTitle: "What's happening?",
      explains: {
        original: "The original batik image (RGB). Every operation below works directly on this image's pixels — real, not simulated.",
        edges: "A Laplacian convolution highlights sharp intensity changes → it emphasizes the motif's LINES & CONTOURS. This is the essence of how a CNN 'sees' shape.",
        sharpen: "The sharpen kernel boosts edges relative to their surroundings → the motif looks crisper.",
        blur: "A 3×3 average (box blur) smooths the image → fine detail is lost, like a noise-reduction preprocessing step.",
        emboss: "The emboss kernel gives a raised/relief look based on gradient direction — another way to surface motif structure.",
        gray: "Converts RGB → a single luminance channel. Many edge operations run on grayscale.",
        r: "The Red channel only. Splitting channels shows how a motif's color is distributed — an important feature for classification.",
        g: "The Green channel only.",
        b: "The Blue channel only.",
        mlp: "The image is shrunk to 32×32 (as the task requires) then scaled back up. Notice the detail that's LOST — this is what makes an MLP struggle & why a CNN usually does better on images.",
      },
    },
  }[lang];

  // load the selected source image into an offscreen <img>
  useEffect(() => {
    const img = new Image();
    img.onload = () => { srcRef.current = img; setReady(true); draw(); };
    img.src = batikImages.samples[cls][imgIdx];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cls, imgIdx]);

  // redraw when the operation changes
  useEffect(() => { if (ready) draw(); /* eslint-disable-next-line */ }, [mode, ready]);

  function draw() {
    const canvas = canvasRef.current, img = srcRef.current;
    if (!canvas || !img) return;
    // willReadFrequently: this canvas is read back via getImageData on every
    // filter change, so hint the browser for a faster readback path.
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = SIZE; canvas.height = SIZE;

    if (mode === "mlp") {
      // downscale to 32x32 then upscale (pixelated) to reveal lost detail
      const tmp = document.createElement("canvas"); tmp.width = 32; tmp.height = 32;
      tmp.getContext("2d").drawImage(img, 0, 0, 32, 32);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(tmp, 0, 0, 32, 32, 0, 0, SIZE, SIZE);
      return;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(img, 0, 0, SIZE, SIZE);
    if (mode === "original") return;

    const imageData = ctx.getImageData(0, 0, SIZE, SIZE);
    const d = imageData.data;

    if (mode === "gray" || mode === "r" || mode === "g" || mode === "b") {
      for (let i = 0; i < d.length; i += 4) {
        if (mode === "gray") {
          const v = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
          d[i] = d[i + 1] = d[i + 2] = v;
        } else if (mode === "r") { d[i + 1] = 0; d[i + 2] = 0; }
        else if (mode === "g") { d[i] = 0; d[i + 2] = 0; }
        else if (mode === "b") { d[i] = 0; d[i + 1] = 0; }
      }
      ctx.putImageData(imageData, 0, 0);
      return;
    }

    // convolution
    const k = KERNELS[mode];
    const out = ctx.createImageData(SIZE, SIZE);
    const o = out.data;
    const w = SIZE, h = SIZE;
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        for (let c = 0; c < 3; c++) {
          let sum = 0, ki = 0;
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const p = ((y + ky) * w + (x + kx)) * 4 + c;
              sum += d[p] * k[ki++];
            }
          }
          const idx = (y * w + x) * 4 + c;
          o[idx] = Math.max(0, Math.min(255, mode === "emboss" ? sum + 128 : sum));
        }
        o[(y * w + x) * 4 + 3] = 255;
      }
    }
    ctx.putImageData(out, 0, 0);
  }

  const convModes = ["original", "edges", "sharpen", "blur", "emboss"];
  const colorModes = ["gray", "r", "g", "b"];

  const Btn = ({ m }) => (
    <button onClick={() => setMode(m)} className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${mode === m ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{L.modes[m]}</button>
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* class tabs */}
      <div className="mb-3 flex flex-wrap gap-2">
        {BATIK_CLASS_ORDER.map((c) => (
          <button key={c} onClick={() => { setCls(c); setImgIdx(0); }}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${cls === c ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{c}</button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-[240px_1fr]">
        <div>
          <canvas ref={canvasRef} className="mx-auto block w-full max-w-[240px] rounded-xl border border-slate-200 bg-slate-50" style={{ aspectRatio: "1/1" }} />
          {/* image thumbnails */}
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {batikImages.samples[cls].map((src, i) => (
              <button key={i} onClick={() => setImgIdx(i)} className={`overflow-hidden rounded-md border-2 transition ${imgIdx === i ? "border-brand-500" : "border-transparent opacity-70 hover:opacity-100"}`}>
                <img src={src} alt={`${cls} ${i + 1}`} width={34} height={34} className="block h-[34px] w-[34px] object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{L.op}</p>
          <div className="mb-2 flex flex-wrap gap-1.5">{convModes.map((m) => <Btn key={m} m={m} />)}</div>
          <div className="mb-2 flex flex-wrap gap-1.5">{colorModes.map((m) => <Btn key={m} m={m} />)}</div>
          <div className="mb-4"><Btn m="mlp" /></div>

          <div className="rounded-xl border border-brand-200 bg-brand-50 p-3">
            <p className="text-xs font-bold text-brand-700">💡 {L.explainTitle}</p>
            <p className="mt-1 text-sm text-brand-900">{L.explains[mode]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
