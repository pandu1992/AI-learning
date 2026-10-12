"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

// Latent Space Explorer — a hands-on intuition for generative models (VAE/GAN).
// A generative model has a "decoder" that maps a small LATENT VECTOR z to an
// output. Here the decoder is a transparent procedural face generator: each
// latent dimension smoothly controls a visual trait (face width, eye size,
// smile, color hue). Moving a slider a little changes the output a little —
// the core property of a well-structured latent space. Students can also
// sample a random z, or click a 2D latent map to navigate. Original toy decoder.

// Smoothstep for pleasant interpolation.
const clamp01 = (x) => Math.max(0, Math.min(1, x));

// Procedural "decoder": z = [z0..z3] in [-1,1] -> drawing params.
function decode(z) {
  const [z0, z1, z2, z3] = z;
  return {
    faceW: 0.55 + 0.3 * (z0 * 0.5 + 0.5), // width
    faceH: 0.62 + 0.25 * (z1 * 0.5 + 0.5), // height
    eyeR: 0.03 + 0.06 * clamp01(z2 * 0.5 + 0.5), // eye size
    smile: z3, // -1 frown .. +1 big smile
    hue: ((Math.round(((z0 + z1) * 0.25 + 0.5) * 360) % 360) + 360) % 360, // wrapped 0..359 from z0,z1
  };
}

function drawFace(ctx, W, H, p) {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;
  const rw = (p.faceW * W) / 2;
  const rh = (p.faceH * H) / 2;

  // head
  ctx.beginPath();
  ctx.ellipse(cx, cy, rw, rh, 0, 0, Math.PI * 2);
  ctx.fillStyle = `hsl(${p.hue}, 70%, 85%)`;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = `hsl(${p.hue}, 60%, 45%)`;
  ctx.stroke();

  // eyes
  const eyeDX = rw * 0.42;
  const eyeY = cy - rh * 0.18;
  const eyeR = p.eyeR * W;
  ctx.fillStyle = "#1e293b";
  for (const sx of [-1, 1]) {
    ctx.beginPath();
    ctx.arc(cx + sx * eyeDX, eyeY, eyeR, 0, Math.PI * 2);
    ctx.fill();
  }

  // mouth (smile controlled by z3)
  const mY = cy + rh * 0.35;
  const mW = rw * 0.6;
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#1e293b";
  // control-point y: positive smile dips down (quadratic curve)
  const curve = -p.smile * rh * 0.35;
  ctx.moveTo(cx - mW, mY);
  ctx.quadraticCurveTo(cx, mY + curve + (p.smile >= 0 ? rh * 0.18 : -rh * 0.05), cx + mW, mY);
  ctx.stroke();
}

const DIMS = [
  { key: 0, id: "z₁ — Lebar wajah & warna", en: "z₁ — Face width & color" },
  { key: 1, id: "z₂ — Tinggi wajah & warna", en: "z₂ — Face height & color" },
  { key: 2, id: "z₃ — Ukuran mata", en: "z₃ — Eye size" },
  { key: 3, id: "z₄ — Senyum", en: "z₄ — Smile" },
];

export default function LatentSpaceDemo() {
  const { lang } = useLang();
  const [z, setZ] = useState([0.2, -0.1, 0.3, 0.6]);
  const canvasRef = useRef(null);
  const mapRef = useRef(null);

  const params = useMemo(() => decode(z), [z]);

  // draw the generated face whenever z changes
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    drawFace(c.getContext("2d"), c.width, c.height, params);
  }, [params]);

  // draw the 2D latent map (z0 x z1) with current position marker
  useEffect(() => {
    const c = mapRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height;
    // background gradient to suggest a continuous space
    for (let x = 0; x < W; x += 8) {
      for (let y = 0; y < H; y += 8) {
        const zx = (x / W) * 2 - 1, zy = (y / H) * 2 - 1;
        const hue = Math.round(((zx + zy) * 0.5 + 0.5) * 360);
        ctx.fillStyle = `hsl(${hue}, 60%, 88%)`;
        ctx.fillRect(x, y, 8, 8);
      }
    }
    // current position
    const px = ((z[0] + 1) / 2) * W;
    const py = ((z[1] + 1) / 2) * H;
    ctx.beginPath();
    ctx.arc(px, py, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#0093D0";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#fff";
    ctx.stroke();
  }, [z]);

  const setDim = (i, v) => setZ((prev) => prev.map((x, k) => (k === i ? v : x)));
  const randomize = () => setZ(Array.from({ length: 4 }, () => +(Math.random() * 2 - 1).toFixed(2)));
  const reset = () => setZ([0, 0, 0, 0]);

  const onMapClick = (e) => {
    const c = mapRef.current;
    const rect = c.getBoundingClientRect();
    const zx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const zy = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setZ((prev) => [+zx.toFixed(2), +zy.toFixed(2), prev[2], prev[3]]);
  };

  const L = {
    id: {
      hint: "Model generatif (seperti VAE/GAN di balik pembuat gambar) punya 'decoder' yang mengubah vektor laten kecil z menjadi output. Geser tiap dimensi laten dan lihat wajah berubah MULUS — titik laten yang berdekatan menghasilkan output yang mirip. Itulah kunci ruang laten yang baik.",
      vector: "Vektor laten z",
      map: "Peta laten (z₁ × z₂) — klik untuk menjelajah",
      random: "🎲 Sampel acak dari ruang laten",
      reset: "↻ Tengah (z = 0)",
      output: "Output decoder",
      note: "Model asli belajar decoder ini dari ribuan gambar, dan setiap dimensi laten menangkap faktor yang lebih abstrak (mis. pose, gaya, identitas). Interpolasi antar dua titik laten menghasilkan 'morphing' yang mulus.",
    },
    en: {
      hint: "A generative model (like the VAE/GAN behind image generators) has a 'decoder' that turns a small latent vector z into an output. Drag each latent dimension and watch the face change SMOOTHLY — nearby latent points produce similar outputs. That's the key to a good latent space.",
      vector: "Latent vector z",
      map: "Latent map (z₁ × z₂) — click to explore",
      random: "🎲 Sample a random z from latent space",
      reset: "↻ Center (z = 0)",
      output: "Decoder output",
      note: "Real models learn this decoder from thousands of images, and each latent dimension captures a more abstract factor (e.g. pose, style, identity). Interpolating between two latent points gives smooth 'morphing'.",
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      <div className="flex flex-col gap-5 lg:flex-row">
        {/* output + map */}
        <div className="flex flex-col items-center gap-3">
          <div>
            <p className="mb-1 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">{L.output}</p>
            <canvas ref={canvasRef} width={220} height={220} className="rounded-xl border border-slate-300 bg-white" />
          </div>
          <div>
            <p className="mb-1 text-center text-[11px] text-slate-500">{L.map}</p>
            <canvas ref={mapRef} width={160} height={160} onClick={onMapClick} className="cursor-crosshair rounded-lg border border-slate-300" />
          </div>
        </div>

        {/* latent sliders */}
        <div className="flex-1">
          <p className="mb-2 text-sm font-semibold text-slate-700">{L.vector}</p>
          <div className="space-y-3">
            {DIMS.map((d) => (
              <label key={d.key} className="block text-sm">
                <span className="flex justify-between text-slate-600">
                  <span>{d[lang]}</span>
                  <span className="font-mono text-brand-600">{z[d.key].toFixed(2)}</span>
                </span>
                <input
                  type="range" min="-1" max="1" step="0.01"
                  value={z[d.key]}
                  onChange={(e) => setDim(d.key, +e.target.value)}
                  className="mt-1 w-full accent-brand-600"
                />
              </label>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={randomize} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">{L.random}</button>
            <button onClick={reset} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">{L.reset}</button>
          </div>

          {/* z as a vector readout */}
          <div className="mt-4 rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-600">
            z = [ {z.map((v) => v.toFixed(2)).join(", ")} ]
          </div>
        </div>
      </div>

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
