"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLang } from "../LanguageProvider";

// Understanding data dimensionality: 1D -> 2D -> 3D (rotatable cube) -> 4D
// (4th dim mapped to color), with a linear vs non-linear toggle, and a
// dimensionality-reduction illustration (3D projected down to 2D).
// Pure canvas + simple matrix math — no heavy 3D libraries.

const W = 380;
const H = 340;
const BLUE = "#0093D0";
const ORANGE = "#F5A200";
const GREEN = "#059669";

// ---- data generators (coords roughly in [-1,1]) ----
function gen1D(nonlinear) {
  const pts = [];
  for (let i = 0; i < 24; i++) {
    const x = -1 + (i / 23) * 2;
    // class by threshold (linear) or by |x| (non-linear: two ends vs middle)
    const cls = nonlinear ? (Math.abs(x) > 0.5 ? 1 : 0) : x > 0 ? 1 : 0;
    pts.push({ x, y: 0, z: 0, w: x, cls });
  }
  return pts;
}
function gen2D(nonlinear) {
  const pts = [];
  for (let i = 0; i < 120; i++) {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    const cls = nonlinear ? (x * x + y * y < 0.4 ? 1 : 0) : x + y > 0 ? 1 : 0;
    pts.push({ x, y, z: 0, w: 0, cls });
  }
  return pts;
}
function gen3D(nonlinear) {
  const pts = [];
  for (let i = 0; i < 160; i++) {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    const z = Math.random() * 2 - 1;
    const cls = nonlinear ? (x * x + y * y + z * z < 0.55 ? 1 : 0) : x + y + z > 0 ? 1 : 0;
    pts.push({ x, y, z, w: 0, cls });
  }
  return pts;
}
function gen4D(nonlinear) {
  const pts = [];
  for (let i = 0; i < 160; i++) {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    const z = Math.random() * 2 - 1;
    const w = Math.random() * 2 - 1; // 4th dimension -> color
    const cls = nonlinear ? (x * x + y * y + z * z + w * w < 0.8 ? 1 : 0) : x + y + z + w > 0 ? 1 : 0;
    pts.push({ x, y, z, w, cls });
  }
  return pts;
}

// ---- 3D rotation + perspective projection to 2D ----
function project(p, ax, ay) {
  // rotate around Y then X
  let { x, y, z } = p;
  let x1 = x * Math.cos(ay) + z * Math.sin(ay);
  let z1 = -x * Math.sin(ay) + z * Math.cos(ay);
  let y2 = y * Math.cos(ax) - z1 * Math.sin(ax);
  let z2 = y * Math.sin(ax) + z1 * Math.cos(ax);
  const dist = 4;
  const scale = dist / (dist + z2);
  return { sx: x1 * scale, sy: y2 * scale, depth: z2, scale };
}

// map [-1,1] w to a blue<->orange color (4th dimension)
function wColor(w) {
  const t = (w + 1) / 2; // 0..1
  const r = Math.round(0 + (245 - 0) * t);
  const g = Math.round(147 + (162 - 147) * t);
  const b = Math.round(208 + (0 - 208) * t);
  return `rgb(${r},${g},${b})`;
}

export default function DimensionsDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const [dim, setDim] = useState(2); // 1,2,3,4
  const [nonlinear, setNonlinear] = useState(false);
  const [showReduce, setShowReduce] = useState(false);
  const rot = useRef({ ax: -0.5, ay: 0.7 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const [data, setData] = useState(() => gen2D(false));

  const regen = useCallback((d, nl) => {
    if (d === 1) setData(gen1D(nl));
    else if (d === 2) setData(gen2D(nl));
    else if (d === 3) setData(gen3D(nl));
    else setData(gen4D(nl));
  }, []);

  useEffect(() => { regen(dim, nonlinear); }, [dim, nonlinear, regen]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2, R = 120;

    // axis + point color per class
    const clsColor = (c) => (c === 1 ? BLUE : ORANGE);

    if (dim === 1) {
      // number line
      ctx.strokeStyle = "#cbd5e1"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.stroke();
      // arrow
      ctx.beginPath(); ctx.moveTo(cx + R, cy); ctx.lineTo(cx + R - 8, cy - 5); ctx.lineTo(cx + R - 8, cy + 5); ctx.fillStyle = "#94a3b8"; ctx.fill();
      ctx.fillStyle = "#64748b"; ctx.font = "12px sans-serif"; ctx.fillText("x", cx + R + 6, cy + 4);
      data.forEach((p) => {
        const x = cx + p.x * R;
        ctx.beginPath(); ctx.arc(x, cy, 6, 0, Math.PI * 2); ctx.fillStyle = clsColor(p.cls); ctx.fill();
        ctx.lineWidth = 1; ctx.strokeStyle = "#fff"; ctx.stroke();
      });
    } else if (dim === 2) {
      // axes
      ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();
      ctx.fillStyle = "#64748b"; ctx.font = "12px sans-serif";
      ctx.fillText("x", cx + R + 4, cy + 4); ctx.fillText("y", cx - 4, cy - R - 4);
      // separating boundary
      ctx.strokeStyle = GREEN; ctx.setLineDash([5, 4]); ctx.lineWidth = 2;
      if (nonlinear) {
        ctx.beginPath(); ctx.arc(cx, cy, Math.sqrt(0.4) * R, 0, Math.PI * 2); ctx.stroke();
      } else {
        // line x+y=0 -> in screen coords
        ctx.beginPath(); ctx.moveTo(cx - R, cy - R); ctx.lineTo(cx + R, cy + R); ctx.stroke();
      }
      ctx.setLineDash([]);
      data.forEach((p) => {
        const x = cx + p.x * R, y = cy - p.y * R;
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = clsColor(p.cls); ctx.fill();
      });
    } else {
      // 3D / 4D: rotatable cube
      const { ax, ay } = rot.current;
      // cube edges
      const corners = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
      ];
      const edges = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
      const proj = corners.map(([x, y, z]) => project({ x, y, z }, ax, ay));
      ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 1;
      edges.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(cx + proj[a].sx * R, cy - proj[a].sy * R);
        ctx.lineTo(cx + proj[b].sx * R, cy - proj[b].sy * R);
        ctx.stroke();
      });
      // points sorted by depth (painter's algorithm)
      const pp = data.map((p) => ({ p, pr: project(p, ax, ay) })).sort((a, b) => a.pr.depth - b.pr.depth);
      pp.forEach(({ p, pr }) => {
        const x = cx + pr.sx * R, y = cy - pr.sy * R;
        const rad = 3 + pr.scale * 2;
        ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fillStyle = dim === 4 ? wColor(p.w) : clsColor(p.cls);
        ctx.fill();
      });
    }
  }, [data, dim, nonlinear]);

  useEffect(() => { draw(); }, [draw]);

  // drag to rotate (3D/4D)
  const onDown = (e) => { if (dim >= 3) { dragging.current = true; const t = e.touches?.[0] || e; last.current = { x: t.clientX, y: t.clientY }; } };
  const onMove = (e) => {
    if (!dragging.current) return;
    const t = e.touches?.[0] || e;
    const dx = t.clientX - last.current.x, dy = t.clientY - last.current.y;
    last.current = { x: t.clientX, y: t.clientY };
    rot.current = { ax: rot.current.ax + dy * 0.01, ay: rot.current.ay + dx * 0.01 };
    draw();
  };
  const onUp = () => { dragging.current = false; };

  const L = {
    id: {
      dims: ["1D", "2D", "3D", "4D"],
      linear: "Linear", nonlinear: "Non-linear",
      rotate: "Seret untuk memutar kubus 🔄",
      featureNote: "Tiap dimensi = satu fitur. Data nyata sering punya ratusan fitur (dimensi tinggi).",
      reduceBtn: "Tunjukkan reduksi dimensi (3D → 2D)",
      hint: {
        1: "1D: satu fitur (x). Titik pada garis. Kelas dipisah oleh sebuah ambang.",
        2: "2D: dua fitur (x, y). Batas linear = garis; batas non-linear = kurva (mis. lingkaran).",
        3: "3D: tiga fitur (x, y, z). Seret untuk memutar. Batas linear = bidang; non-linear = permukaan melengkung (mis. bola).",
        4: "4D: fitur ke-4 (w) dipetakan ke WARNA titik, karena manusia tak bisa 'melihat' 4D langsung.",
      },
      reduceTitle: "Reduksi Dimensi (mis. PCA)",
      reduceText: "Karena kita hanya bisa melihat ≤3D dan data nyata berdimensi tinggi, kita PROYEKSIKAN ke dimensi lebih rendah sambil menjaga struktur penting. Ini yang dilakukan PCA/t-SNE untuk visualisasi & efisiensi.",
      linkTitle: "Kaitan ke AI",
      links: [
        "Dimensi = jumlah fitur yang menggambarkan data.",
        "Data linear bisa dipisah model linear; non-linear butuh model 'menekuk' (neural network, kernel).",
        "Dimensi tinggi → sulit divisualkan & boros komputasi → butuh reduksi dimensi (PCA, t-SNE).",
      ],
    },
    en: {
      dims: ["1D", "2D", "3D", "4D"],
      linear: "Linear", nonlinear: "Non-linear",
      rotate: "Drag to rotate the cube 🔄",
      featureNote: "Each dimension = one feature. Real data often has hundreds of features (high-dimensional).",
      reduceBtn: "Show dimensionality reduction (3D → 2D)",
      hint: {
        1: "1D: one feature (x). Points on a line. Classes split by a threshold.",
        2: "2D: two features (x, y). A linear boundary = a line; non-linear = a curve (e.g. a circle).",
        3: "3D: three features (x, y, z). Drag to rotate. Linear boundary = a plane; non-linear = a curved surface (e.g. a sphere).",
        4: "4D: the 4th feature (w) is mapped to point COLOR, since humans can't 'see' 4D directly.",
      },
      reduceTitle: "Dimensionality Reduction (e.g. PCA)",
      reduceText: "Because we can only see ≤3D and real data is high-dimensional, we PROJECT to fewer dimensions while keeping the important structure. This is what PCA/t-SNE do for visualization & efficiency.",
      linkTitle: "Link to AI",
      links: [
        "Dimensions = the number of features describing the data.",
        "Linear data can be split by a linear model; non-linear needs a model that 'bends' (neural network, kernel).",
        "High dimensions → hard to visualize & compute → need dimensionality reduction (PCA, t-SNE).",
      ],
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* dimension selector */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="inline-flex rounded-lg border border-slate-300 p-0.5 text-sm font-semibold">
          {[1, 2, 3, 4].map((d) => (
            <button key={d} onClick={() => { setDim(d); setShowReduce(false); }}
              className={`rounded-md px-3 py-1.5 transition ${dim === d ? "bg-brand-600 text-white" : "text-slate-600"}`}>
              {L.dims[d - 1]}
            </button>
          ))}
        </div>
        <div className="inline-flex rounded-lg border border-slate-300 p-0.5 text-sm font-semibold">
          <button onClick={() => setNonlinear(false)} className={`rounded-md px-3 py-1.5 transition ${!nonlinear ? "bg-green-600 text-white" : "text-slate-600"}`}>{L.linear}</button>
          <button onClick={() => setNonlinear(true)} className={`rounded-md px-3 py-1.5 transition ${nonlinear ? "bg-green-600 text-white" : "text-slate-600"}`}>{L.nonlinear}</button>
        </div>
      </div>

      <p className="mb-3 text-sm text-slate-600">{L.hint[dim]}</p>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div>
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
            onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
            className={`w-full max-w-md rounded-xl border border-slate-300 bg-slate-50 ${dim >= 3 ? "cursor-grab active:cursor-grabbing" : ""}`}
            style={{ aspectRatio: `${W}/${H}`, touchAction: "none" }}
          />
          {dim >= 3 && <p className="mt-1 text-center text-xs text-slate-400">{L.rotate}</p>}
          {dim === 4 && (
            <div className="mt-2 flex items-center justify-center gap-2 text-xs text-slate-500">
              <span>w = −1</span>
              <span className="inline-block h-3 w-24 rounded" style={{ background: `linear-gradient(90deg, ${wColor(-1)}, ${wColor(1)})` }} />
              <span>+1</span>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3">
          <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">🧩 {L.featureNote}</p>

          <div className="rounded-lg border border-brand-200 bg-brand-50 p-3">
            <p className="text-sm font-bold text-brand-800">🔗 {L.linkTitle}</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-xs text-slate-700">
              {L.links.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>

          {dim >= 3 && (
            <button onClick={() => setShowReduce((s) => !s)}
              className="w-full rounded-lg border border-brand-600 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
              {L.reduceBtn}
            </button>
          )}

          {showReduce && dim >= 3 && (
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-sm font-bold text-slate-800">📉 {L.reduceTitle}</p>
              <p className="mt-1 text-xs text-slate-600">{L.reduceText}</p>
              {/* mini 2D projection of the same data (x,y) */}
              <ReducedMini data={data} nonlinear={nonlinear} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Small 2D projection (top-2 axes) to illustrate reduction result.
function ReducedMini({ data }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    const w = c.width, h = c.height, cx = w / 2, cy = h / 2, R = 55;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();
    data.forEach((p) => {
      const x = cx + p.x * R, y = cy - p.y * R;
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = p.cls === 1 ? "#0093D0" : "#F5A200"; ctx.fill();
    });
  }, [data]);
  return <canvas ref={ref} width={160} height={140} className="mt-2 w-full max-w-[200px] rounded border border-slate-200 bg-slate-50" />;
}
