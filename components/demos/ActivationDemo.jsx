"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

const W = 440;
const H = 300;
const PAD = 30;

const FUNCS = {
  relu: { name: "ReLU", f: (x) => Math.max(0, x), color: "#2563eb", range: [-2, 2] },
  sigmoid: { name: "Sigmoid", f: (x) => 1 / (1 + Math.exp(-x)), color: "#dc2626", range: [-0.2, 1.2] },
  tanh: { name: "Tanh", f: (x) => Math.tanh(x), color: "#059669", range: [-1.2, 1.2] },
  leaky: { name: "Leaky ReLU", f: (x) => (x >= 0 ? x : 0.1 * x), color: "#d97706", range: [-2, 2] },
};

export default function ActivationDemo() {
  const canvasRef = useRef(null);
  const { lang } = useLang();
  const [active, setActive] = useState("relu");
  const [input, setInput] = useState(0.8);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    const fn = FUNCS[active];
    const xMin = -5, xMax = 5;
    const [yMin, yMax] = fn.range;
    const toPx = (x, y) => [
      PAD + ((x - xMin) / (xMax - xMin)) * (W - 2 * PAD),
      H - PAD - ((y - yMin) / (yMax - yMin)) * (H - 2 * PAD),
    ];

    // axes
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    const [zx0, zy0] = toPx(0, yMin);
    const [zx1] = toPx(0, yMax);
    ctx.beginPath(); ctx.moveTo(zx0, PAD); ctx.lineTo(zx1, H - PAD); ctx.stroke();
    const [, y0line] = toPx(xMin, 0);
    ctx.beginPath(); ctx.moveTo(PAD, y0line); ctx.lineTo(W - PAD, y0line); ctx.stroke();

    // curve
    ctx.strokeStyle = fn.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const x = xMin + (i / 200) * (xMax - xMin);
      const [px, py] = toPx(x, fn.f(x));
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // marker for current input
    const y = fn.f(input);
    const [mx, my] = toPx(input, y);
    ctx.fillStyle = fn.color;
    ctx.beginPath(); ctx.arc(mx, my, 6, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
  }, [active, input]);

  const L = {
    id: { input: "Input (x)", output: "Output", pick: "Pilih fungsi",
      hint: "Fungsi aktivasi memberi jaringan saraf kemampuan mempelajari pola non-linear. Tanpa aktivasi, banyak lapisan hanya setara satu lapisan linear. Bandingkan bentuk kurva: ReLU sederhana & cepat, sigmoid/tanh menghaluskan output ke rentang tertentu." },
    en: { input: "Input (x)", output: "Output", pick: "Choose function",
      hint: "Activation functions give a neural network the ability to learn non-linear patterns. Without them, many layers collapse into a single linear layer. Compare the curve shapes: ReLU is simple & fast, while sigmoid/tanh squash output into a fixed range." },
  }[lang];

  const out = FUNCS[active].f(input);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>
      <div className="flex flex-col gap-4 lg:flex-row">
        <canvas ref={canvasRef} width={W} height={H} className="w-full max-w-md rounded-xl border border-slate-300 bg-slate-50" style={{ aspectRatio: `${W}/${H}` }} />
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">{L.pick}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.entries(FUNCS).map(([key, fn]) => (
                <button key={key} onClick={() => setActive(key)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${active === key ? "border-transparent text-white" : "border-slate-300 bg-white text-slate-700"}`}
                  style={active === key ? { backgroundColor: fn.color } : {}}>
                  {fn.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">{L.input}: <span className="text-brand-600">{input.toFixed(2)}</span></label>
            <input type="range" min="-5" max="5" step="0.1" value={input} onChange={(e) => setInput(Number(e.target.value))} className="mt-1 w-full accent-brand-600" />
          </div>
          <div className="rounded-lg bg-slate-50 p-3 text-center text-sm">
            <span className="text-slate-500">{L.output}: </span>
            <span className="text-lg font-bold text-slate-800">{out.toFixed(3)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
