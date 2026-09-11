"use client";

import { useState, useMemo } from "react";
import { useLang } from "../LanguageProvider";

// Illustrates subword tokenization. We use a small heuristic: split on spaces,
// then break long/unknown words into subword chunks with a "##" continuation
// marker (like WordPiece/BPE). IDs are hashed for display.
const COMMON = new Set([
  "the", "a", "is", "to", "of", "and", "in", "it", "you", "learning", "model", "data",
  "saya", "yang", "dan", "di", "itu", "adalah", "belajar", "model", "data", "ini",
]);

function subword(word) {
  if (COMMON.has(word) || word.length <= 4) return [word];
  // naive chunking into pieces of ~3-4 chars
  const chunks = [];
  let i = 0;
  while (i < word.length) {
    const len = Math.min(4, word.length - i);
    const piece = word.slice(i, i + len);
    chunks.push(i === 0 ? piece : "##" + piece);
    i += len;
  }
  return chunks;
}

function hashId(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 30000;
  return 1000 + h;
}

export default function TokenizationDemo() {
  const { lang } = useLang();
  const [text, setText] = useState(lang === "id" ? "Belajar tokenization itu menyenangkan!" : "Tokenization of language is fascinating!");

  const tokens = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const out = [];
    words.forEach((w) => {
      const clean = w.replace(/[^A-Za-z\u00C0-\u024F]/g, "");
      const punct = w.replace(/[A-Za-z\u00C0-\u024F]/g, "");
      if (clean) subword(clean.toLowerCase()).forEach((t) => out.push(t));
      if (punct) punct.split("").forEach((p) => out.push(p));
    });
    return out;
  }, [text]);

  const L = {
    id: { input: "Masukkan teks", tokens: "Token", count: "Jumlah token", chars: "Jumlah karakter",
      hint: "LLM tidak membaca kata utuh — teks dipecah menjadi token (sering berupa sub-kata). Kata umum jadi satu token; kata panjang/langka dipecah, ditandai '##' untuk lanjutan. Tiap token dipetakan ke sebuah ID angka. Perhatikan: jumlah token biasanya lebih banyak dari jumlah kata." },
    en: { input: "Enter text", tokens: "Tokens", count: "Token count", chars: "Character count",
      hint: "LLMs don't read whole words — text is split into tokens (often sub-words). Common words become one token; long/rare words get split, marked '##' for continuation. Each token maps to a numeric ID. Notice: token count is usually higher than word count." },
  }[lang];

  const colors = ["bg-blue-100 text-blue-800", "bg-emerald-100 text-emerald-800", "bg-amber-100 text-amber-800", "bg-purple-100 text-purple-800", "bg-rose-100 text-rose-800"];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>
      <label className="block text-sm font-semibold text-slate-700">{L.input}</label>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} className="mt-1 w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-brand-500 focus:outline-none" />

      <div className="mt-4">
        <div className="flex flex-wrap gap-1.5">
          {tokens.map((t, i) => (
            <span key={i} className={`inline-flex flex-col items-center rounded-md px-2 py-1 ${colors[i % colors.length]}`}>
              <span className="text-sm font-semibold">{t}</span>
              <span className="text-[10px] opacity-60">#{hashId(t)}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-3 text-sm">
        <div className="rounded-lg bg-slate-50 px-3 py-2">{L.count}: <b className="text-brand-600">{tokens.length}</b></div>
        <div className="rounded-lg bg-slate-50 px-3 py-2">{L.chars}: <b>{text.length}</b></div>
      </div>
    </div>
  );
}
