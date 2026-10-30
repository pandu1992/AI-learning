"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { retrieve } from "@/lib/tutorIndex";

// A lightweight site-wide "AI Tutor" chat. It's a mini-RAG over the site's own
// content (lib/tutorIndex.js): it retrieves the best-matching passages and shows
// them grounded with source links. No external API — fitting for a site that
// teaches how RAG works. Floating button bottom-right; panel toggles open.

export default function AiTutor() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // { role: 'user'|'tutor', text, sources? }
  const bodyRef = useRef(null);

  const L = {
    id: {
      title: "AI Tutor",
      tag: "Tanya tentang materi di situs ini",
      ph: "Mis. apa itu overfitting?",
      send: "Kirim",
      intro: "Hai! Saya menjawab dari materi situs ini (glosarium, demo, tips). Coba tanya sebuah konsep.",
      noAns: "Maaf, saya belum menemukan materi yang cocok. Coba kata kunci lain, atau jelajahi Glosarium & Demo.",
      found: "Berdasarkan materi situs:",
      sources: "Sumber",
      note: "Jawaban diambil dari konten situs (mini-RAG), bukan model eksternal.",
      suggest: ["Apa itu overfitting?", "Kapan pakai k-NN?", "Apa beda PCA dan t-SNE?", "Apa itu attention?"],
    },
    en: {
      title: "AI Tutor",
      tag: "Ask about the material on this site",
      ph: "e.g. what is overfitting?",
      send: "Send",
      intro: "Hi! I answer from this site's material (glossary, demos, tips). Try asking about a concept.",
      noAns: "Sorry, I couldn't find matching material. Try other keywords, or explore the Glossary & Demos.",
      found: "Based on the site's material:",
      sources: "Sources",
      note: "Answers are retrieved from site content (mini-RAG), not an external model.",
      suggest: ["What is overfitting?", "When to use k-NN?", "PCA vs t-SNE?", "What is attention?"],
    },
  }[lang];

  const ask = (q) => {
    const query = (q ?? input).trim();
    if (!query) return;
    const hits = retrieve(query, lang, 3);
    const tutorMsg = hits.length
      ? { role: "tutor", text: L.found, sources: hits.map((h) => ({ title: h.title, snippet: h.text, href: h.href })) }
      : { role: "tutor", text: L.noAns };
    setMessages((m) => [...m, { role: "user", text: query }, tutorMsg]);
    setInput("");
    // scroll to bottom after render
    requestAnimationFrame(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; });
  };

  return (
    <>
      {/* floating toggle — bottom-LEFT so it never overlaps the ambient-audio
          button (bottom-right). z above it for safety. */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={L.title}
        className="fixed bottom-5 left-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-2xl text-white shadow-lg transition hover:scale-105 hover:bg-brand-700"
      >
        {open ? "✕" : "🤖"}
      </button>

      {open && (
        <div className="fixed bottom-24 left-5 z-[60] flex max-h-[70vh] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {/* header */}
          <div className="flex items-center gap-2 bg-brand-600 px-4 py-3 text-white">
            <span className="text-xl">🤖</span>
            <div>
              <p className="text-sm font-bold leading-tight">{L.title}</p>
              <p className="text-[11px] leading-tight text-white/80">{L.tag}</p>
            </div>
          </div>

          {/* body */}
          <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto p-3">
            <div className="rounded-xl bg-slate-100 p-3 text-sm text-slate-700">{L.intro}</div>

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {L.suggest.map((s) => (
                  <button key={s} onClick={() => ask(s)} className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 transition hover:bg-brand-100">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-brand-600 px-3 py-2 text-sm text-white">{m.text}</div>
              ) : (
                <div key={i} className="max-w-[92%] rounded-xl rounded-bl-sm bg-slate-100 p-3 text-sm text-slate-700">
                  <p>{m.text}</p>
                  {m.sources?.map((s, j) => (
                    <Link
                      key={j}
                      href={s.href}
                      onClick={() => setOpen(false)}
                      className="mt-2 block rounded-lg border border-slate-200 bg-white p-2 transition hover:border-brand-300"
                    >
                      <p className="text-xs font-bold text-brand-700">{s.title}</p>
                      <p className="mt-0.5 line-clamp-3 text-xs text-slate-500">{s.snippet}</p>
                    </Link>
                  ))}
                </div>
              )
            )}
          </div>

          {/* input */}
          <div className="border-t border-slate-200 p-2">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && ask()}
                placeholder={L.ph}
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-400"
              />
              <button onClick={() => ask()} className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                {L.send}
              </button>
            </div>
            <p className="mt-1 px-1 text-[10px] text-slate-400">{L.note}</p>
          </div>
        </div>
      )}
    </>
  );
}
