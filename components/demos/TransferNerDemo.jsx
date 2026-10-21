"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useLang } from "../LanguageProvider";

// Transfer Learning + NER — why modern NLP fine-tunes a pretrained model
// instead of training from scratch. A slider sets how many LABELED sentences
// you have; two accuracy curves are drawn:
//   - "From scratch": needs lots of data to get good.
//   - "Transfer / fine-tune": a pretrained model (general language features)
//     starts high and reaches good NER accuracy with very few labels.
// Also shows the frozen pretrained encoder + a small trainable NER head.
// Illustrative curves (not a trained model) — for teaching the intuition.

// accuracy model (toy): saturating curves vs #labeled examples n
function accFromScratch(n) { return Math.min(0.97, 0.45 + 0.52 * (1 - Math.exp(-n / 900))); }
function accTransfer(n) { return Math.min(0.98, 0.78 + 0.20 * (1 - Math.exp(-n / 150))); }

export default function TransferNerDemo() {
  const { lang } = useLang();
  const [n, setN] = useState(120); // labeled sentences
  const canvasRef = useRef(null);

  const scratch = useMemo(() => accFromScratch(n), [n]);
  const transfer = useMemo(() => accTransfer(n), [n]);

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height, PAD = 30, MAXN = 2000;
    ctx.clearRect(0, 0, W, H);
    const X = (nn) => PAD + (nn / MAXN) * (W - 2 * PAD);
    const Y = (a) => H - PAD - ((a - 0.4) / 0.6) * (H - 2 * PAD);
    // axes
    ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 1;
    ctx.strokeRect(PAD, PAD, W - 2 * PAD, H - 2 * PAD);
    // curves
    const draw = (fn, color) => {
      ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let nn = 0; nn <= MAXN; nn += 20) { const px = X(nn), py = Y(fn(nn)); nn ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
      ctx.stroke();
    };
    draw(accFromScratch, "#94a3b8"); // scratch = grey
    draw(accTransfer, "#0093D0");    // transfer = brand
    // current-n markers
    [["#64748b", scratch], ["#0093D0", transfer]].forEach(([col, a]) => {
      ctx.beginPath(); ctx.arc(X(n), Y(a), 5, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle = "#fff"; ctx.stroke();
    });
    // vertical guide at current n
    ctx.strokeStyle = "rgba(0,147,208,0.3)"; ctx.setLineDash([4, 3]); ctx.beginPath();
    ctx.moveTo(X(n), PAD); ctx.lineTo(X(n), H - PAD); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = "#64748b"; ctx.font = "10px sans-serif";
    ctx.fillText("0", PAD, H - PAD + 12); ctx.fillText(String(MAXN), W - PAD - 24, H - PAD + 12);
  }, [n, scratch, transfer]);

  const L = {
    id: {
      hint: "Transfer learning adalah 'resep rahasia' NLP modern. Alih-alih melatih model dari nol, kita pakai model bahasa PRA-LATIH (sudah paham bahasa umum dari miliaran kata), lalu fine-tune dengan sedikit data berlabel untuk tugas spesifik seperti NER. Geser jumlah data berlabel & bandingkan.",
      labeled: "Jumlah kalimat berlabel",
      scratch: "Dari nol (from scratch)", transfer: "Transfer learning (fine-tune)",
      acc: "Akurasi NER",
      arch: "Arsitektur transfer learning",
      frozen: "Encoder pra-latih (dibekukan)", frozenDesc: "Fitur bahasa umum — dipelajari dari korpus raksasa.",
      head: "Kepala NER (dilatih)", headDesc: "Lapisan kecil yang dilatih pada data berlabelmu.",
      verdict: "Dengan {n} contoh: transfer unggul {d} poin.",
      note: "Dengan sedikit data, transfer learning jauh mengungguli latih-dari-nol karena model sudah 'tahu bahasa'. Inilah mengapa BERT/GPT di-fine-tune, bukan dilatih ulang, untuk tiap tugas.",
    },
    en: {
      hint: "Transfer learning is modern NLP's 'secret sauce'. Instead of training from scratch, we take a PRETRAINED language model (it already understands general language from billions of words), then fine-tune it with a little labeled data for a specific task like NER. Drag the labeled-data count & compare.",
      labeled: "Number of labeled sentences",
      scratch: "From scratch", transfer: "Transfer learning (fine-tune)",
      acc: "NER accuracy",
      arch: "Transfer-learning architecture",
      frozen: "Pretrained encoder (frozen)", frozenDesc: "General language features — learned from a huge corpus.",
      head: "NER head (trained)", headDesc: "A small layer trained on your labeled data.",
      verdict: "With {n} examples: transfer wins by {d} points.",
      note: "With little data, transfer learning hugely beats from-scratch because the model already 'knows language'. This is why BERT/GPT are fine-tuned, not retrained, for each task.",
    },
  }[lang];

  const diff = Math.round((transfer - scratch) * 100);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      {/* architecture */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{L.arch}</p>
        <div className="flex flex-wrap items-stretch gap-2">
          <div className="flex-1 rounded-lg border-2 border-slate-300 bg-slate-50 p-3">
            <div className="text-sm font-bold text-slate-700">🧊 {L.frozen}</div>
            <p className="mt-1 text-xs text-slate-500">{L.frozenDesc}</p>
          </div>
          <div className="flex items-center text-xl text-slate-400">→</div>
          <div className="flex-1 rounded-lg border-2 border-brand-400 bg-brand-50 p-3">
            <div className="text-sm font-bold text-brand-700">🎯 {L.head}</div>
            <p className="mt-1 text-xs text-brand-700/80">{L.headDesc}</p>
          </div>
        </div>
      </div>

      {/* chart */}
      <canvas ref={canvasRef} width={520} height={240} className="w-full max-w-xl rounded-xl border border-slate-300 bg-white" style={{ aspectRatio: "520/240" }} />

      {/* slider */}
      <div className="mt-4">
        <div className="text-sm font-semibold text-slate-700">{L.labeled}: <span className="text-brand-600">{n}</span></div>
        <input type="range" min="10" max="2000" step="10" value={n} onChange={(e) => setN(+e.target.value)} className="mt-1 w-full accent-brand-600" />
      </div>

      {/* readouts */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-slate-200 p-3 text-center">
          <div className="text-xs text-slate-500">⚪ {L.scratch}</div>
          <div className="text-2xl font-black text-slate-600">{Math.round(scratch * 100)}%</div>
        </div>
        <div className="rounded-lg border border-brand-200 bg-brand-50 p-3 text-center">
          <div className="text-xs text-brand-700">🔵 {L.transfer}</div>
          <div className="text-2xl font-black text-brand-600">{Math.round(transfer * 100)}%</div>
        </div>
      </div>
      <p className="mt-2 text-center text-sm font-semibold text-brand-700">
        {L.verdict.replace("{n}", n).replace("{d}", Math.max(0, diff))}
      </p>

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
