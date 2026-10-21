"use client";

import { useMemo, useState } from "react";
import { useLang } from "../LanguageProvider";

// NLU vs NLG — the two halves of a conversational system.
//   NLU (Understanding): text -> structured meaning (intent + entities + sentiment).
//   NLG (Generation):   structured meaning -> natural-language response.
// This transparent, rule-based demo runs the FULL loop: understand the user,
// then generate a reply from the parsed meaning — showing how assistants work.

// ---- tiny NLU: intent + entities + sentiment ----
const INTENTS = [
  { key: "book", kw: ["book", "pesan", "reserve", "booking", "order"] },
  { key: "cancel", kw: ["cancel", "batal", "refund"] },
  { key: "greet", kw: ["hi", "hello", "halo", "hai", "pagi"] },
  { key: "weather", kw: ["weather", "cuaca", "rain", "hujan"] },
  { key: "thanks", kw: ["thanks", "thank", "makasih", "terima kasih"] },
];
const CITIES = ["jakarta", "bandung", "bali", "surabaya", "yogyakarta", "singapore", "singapura"];
const POS = ["good", "great", "love", "bagus", "hebat", "senang", "mantap"];
const NEG = ["bad", "terrible", "hate", "buruk", "jelek", "kecewa", "marah"];

function nlu(text) {
  const t = text.toLowerCase();
  const words = t.split(/\s+/);
  let intent = "unknown";
  for (const it of INTENTS) if (it.kw.some((k) => t.includes(k))) { intent = it.key; break; }
  const city = CITIES.find((c) => t.includes(c)) || null;
  const numMatch = t.match(/\b(\d+)\b/);
  const count = numMatch ? parseInt(numMatch[1], 10) : null;
  const dateKw = ["today", "tomorrow", "friday", "monday", "besok", "jumat", "senin", "hari ini"].find((d) => t.includes(d)) || null;
  let sentiment = "neutral";
  if (words.some((w) => POS.includes(w))) sentiment = "positive";
  if (words.some((w) => NEG.includes(w))) sentiment = "negative";
  return { intent, entities: { city, count, date: dateKw }, sentiment };
}

// ---- tiny NLG: structured meaning -> response (bilingual templates) ----
function nlg(parsed, lang) {
  const { intent, entities } = parsed;
  const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const id = lang === "id";
  const city = cap(entities.city);
  const n = entities.count, date = entities.date;
  const t = {
    book: id
      ? `Baik! Saya siapkan pemesanan${city ? " ke " + city : ""}${n ? " untuk " + n + " orang" : ""}${date ? " (" + date + ")" : ""}. Lanjut konfirmasi?`
      : `Sure! I'll set up a booking${city ? " to " + city : ""}${n ? " for " + n + " people" : ""}${date ? " (" + date + ")" : ""}. Shall I confirm?`,
    cancel: id ? "Tentu, saya bantu batalkan/refund pesanan Anda. Boleh sebutkan kode booking-nya?" : "Of course, I can help cancel/refund your order. Could you share the booking code?",
    greet: id ? "Halo! Ada yang bisa saya bantu hari ini? 😊" : "Hi! How can I help you today? 😊",
    weather: id ? `Mengecek cuaca${city ? " di " + city : ""}… sebentar ya.` : `Checking the weather${city ? " in " + city : ""}… one moment.`,
    thanks: id ? "Sama-sama! Senang bisa membantu. 🙌" : "You're welcome! Happy to help. 🙌",
    unknown: id ? "Maaf, saya belum paham maksudnya. Bisa dijelaskan lagi?" : "Sorry, I didn't quite get that. Could you rephrase?",
  };
  return t[intent] || t.unknown;
}

export default function NluNlgDemo() {
  const { lang } = useLang();
  const SAMPLE = { id: "Tolong pesan tiket ke Bali untuk 2 orang hari Jumat", en: "Please book a ticket to Bali for 2 people on Friday" };
  const [text, setText] = useState(SAMPLE[lang]);

  const parsed = useMemo(() => nlu(text), [text]);
  const reply = useMemo(() => nlg(parsed, lang), [parsed, lang]);

  const L = {
    id: {
      hint: "Sistem percakapan punya dua sisi: NLU (Natural Language UNDERSTANDING) mengubah teks jadi makna terstruktur (intent + entitas + sentimen), lalu NLG (Natural Language GENERATION) mengubah makna itu kembali jadi kalimat balasan. Ketik sesuatu & lihat keduanya bekerja.",
      input: "Masukan pengguna", sample: "Contoh",
      nlu: "NLU — Pemahaman", nlg: "NLG — Pembangkitan",
      intent: "Intent (maksud)", entities: "Entitas", sentiment: "Sentimen", reply: "Balasan yang dibangkitkan",
      none: "—",
      note: "NLU memetakan bahasa → makna; NLG memetakan makna → bahasa. LLM modern menyatukan keduanya, tetapi memisahkannya membantu memahami cara asisten memahami lalu merespons.",
      intents: { book: "pesan tiket", cancel: "batalkan", greet: "sapaan", weather: "cuaca", thanks: "terima kasih", unknown: "tidak dikenali" },
      senti: { positive: "positif", negative: "negatif", neutral: "netral" },
    },
    en: {
      hint: "A conversational system has two halves: NLU (Natural Language UNDERSTANDING) turns text into structured meaning (intent + entities + sentiment), then NLG (Natural Language GENERATION) turns that meaning back into a reply. Type something & watch both work.",
      input: "User input", sample: "Sample",
      nlu: "NLU — Understanding", nlg: "NLG — Generation",
      intent: "Intent", entities: "Entities", sentiment: "Sentiment", reply: "Generated reply",
      none: "—",
      note: "NLU maps language → meaning; NLG maps meaning → language. Modern LLMs blend both, but separating them clarifies how an assistant first understands, then responds.",
      intents: { book: "book ticket", cancel: "cancel", greet: "greeting", weather: "weather", thanks: "thanks", unknown: "unrecognized" },
      senti: { positive: "positive", negative: "negative", neutral: "neutral" },
    },
  }[lang];

  const sentiColor = parsed.sentiment === "positive" ? "#16a34a" : parsed.sentiment === "negative" ? "#dc2626" : "#64748b";
  const ent = parsed.entities;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">{L.input}</label>
        <button onClick={() => setText(SAMPLE[lang])} className="text-xs font-semibold text-brand-600 hover:underline">{L.sample}</button>
      </div>
      <input value={text} onChange={(e) => setText(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2 text-sm focus:border-brand-500 focus:outline-none" />

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {/* NLU */}
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-brand-700">🧩 {L.nlu}</div>
          <div className="mt-2 space-y-2 text-sm">
            <div className="flex items-center justify-between rounded-md bg-white px-2 py-1.5">
              <span className="text-slate-500">{L.intent}</span>
              <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs font-bold text-white">{L.intents[parsed.intent]}</span>
            </div>
            <div className="rounded-md bg-white px-2 py-1.5">
              <span className="text-slate-500">{L.entities}</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {ent.city && <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">📍 {ent.city}</span>}
                {ent.count != null && <span className="rounded bg-purple-100 px-1.5 py-0.5 text-xs font-medium text-purple-700">#️⃣ {ent.count}</span>}
                {ent.date && <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">📅 {ent.date}</span>}
                {!ent.city && ent.count == null && !ent.date && <span className="text-xs text-slate-400">{L.none}</span>}
              </div>
            </div>
            <div className="flex items-center justify-between rounded-md bg-white px-2 py-1.5">
              <span className="text-slate-500">{L.sentiment}</span>
              <span className="text-xs font-bold" style={{ color: sentiColor }}>{L.senti[parsed.sentiment]}</span>
            </div>
          </div>
        </div>

        {/* NLG */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">💬 {L.nlg}</div>
          <div className="mt-2 rounded-lg bg-white p-3 text-sm text-slate-700">
            <span className="mr-1">🤖</span>{reply}
          </div>
          <p className="mt-2 text-[11px] text-amber-700/80">
            {lang === "id" ? "Dibangkitkan dari intent + entitas di sebelah kiri." : "Generated from the intent + entities on the left."}
          </p>
        </div>
      </div>

      {/* flow */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
        <span className="rounded bg-slate-100 px-2 py-1">{lang === "id" ? "Teks" : "Text"}</span>→
        <span className="rounded bg-brand-100 px-2 py-1 text-brand-700">NLU</span>→
        <span className="rounded bg-slate-100 px-2 py-1">{lang === "id" ? "Makna" : "Meaning"}</span>→
        <span className="rounded bg-amber-100 px-2 py-1 text-amber-700">NLG</span>→
        <span className="rounded bg-slate-100 px-2 py-1">{lang === "id" ? "Balasan" : "Reply"}</span>
      </div>

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
