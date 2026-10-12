"use client";

import { useMemo, useState } from "react";
import { useLang } from "../LanguageProvider";

// Retrieval-Augmented Generation (RAG) — mini, transparent, client-side.
// Flow: knowledge base -> split into chunks -> embed each (TF-IDF bag-of-words)
// -> for a question, retrieve the top-k chunks by cosine similarity -> compose
// a grounded answer from the retrieved chunks (+ show their scores). This is how
// modern LLM apps avoid hallucination: answer FROM retrieved context, with
// citations. Original toy retriever (no external model). Bilingual.

const STOP = new Set([
  "the", "a", "an", "is", "are", "was", "were", "to", "of", "and", "or", "in", "on", "for", "with", "that", "this", "it", "as", "by", "at", "be", "from",
  "yang", "dan", "atau", "di", "ke", "dari", "itu", "ini", "adalah", "pada", "untuk", "dengan", "sebuah", "para", "oleh", "akan", "juga", "dapat",
]);

function tokenize(s) {
  return s.toLowerCase().replace(/[^a-z0-9\u00c0-\u024f\s]/gi, " ").split(/\s+/).filter((w) => w && !STOP.has(w));
}

// split text into chunks (by sentence, grouped to ~max words)
function chunkText(text) {
  const sentences = text.split(/(?<=[.!?])\s+|\n+/).map((s) => s.trim()).filter(Boolean);
  const chunks = [];
  let cur = [];
  let count = 0;
  for (const s of sentences) {
    cur.push(s);
    count += s.split(/\s+/).length;
    if (count >= 25) { chunks.push(cur.join(" ")); cur = []; count = 0; }
  }
  if (cur.length) chunks.push(cur.join(" "));
  return chunks;
}

// Build TF-IDF vectors for chunks; return {vectors, idf, vocab}
function buildIndex(chunks) {
  const docsTokens = chunks.map(tokenize);
  const df = new Map();
  docsTokens.forEach((toks) => {
    new Set(toks).forEach((t) => df.set(t, (df.get(t) || 0) + 1));
  });
  const N = chunks.length || 1;
  const idf = new Map();
  df.forEach((d, t) => idf.set(t, Math.log((N + 1) / (d + 1)) + 1));
  const vectors = docsTokens.map((toks) => tfidf(toks, idf));
  return { vectors, idf };
}

function tfidf(tokens, idf) {
  const tf = new Map();
  tokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
  const v = new Map();
  tf.forEach((c, t) => { if (idf.has(t)) v.set(t, (c / tokens.length) * idf.get(t)); });
  return v;
}

function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  a.forEach((va, k) => { na += va * va; if (b.has(k)) dot += va * b.get(k); });
  b.forEach((vb) => { nb += vb * vb; });
  return na && nb ? dot / (Math.sqrt(na) * Math.sqrt(nb)) : 0;
}

export default function RagChatbotDemo() {
  const { lang } = useLang();

  const SAMPLE = {
    id: `Cognia adalah platform pembelajaran AI interaktif buatan Pandu Dwi Luhur Pambudi di BINUS University.
Reinforcement Learning adalah cara agen belajar dari reward atas aksinya di sebuah lingkungan.
Overfitting terjadi ketika model menghafal noise data latih sehingga buruk pada data baru.
Named Entity Recognition menandai nama orang, lokasi, dan organisasi dalam teks.
Gradient descent melatih model dengan menuruni lembah loss mengikuti gradien; learning rate mengatur besar langkah.
Normalisasi Min-Max mengubah nilai fitur ke rentang 0 sampai 1.`,
    en: `Cognia is an interactive AI learning platform built by Pandu Dwi Luhur Pambudi at BINUS University.
Reinforcement Learning is how an agent learns from rewards for its actions in an environment.
Overfitting happens when a model memorizes training noise and does poorly on new data.
Named Entity Recognition tags people, locations, and organizations in text.
Gradient descent trains a model by walking down the loss valley following the gradient; the learning rate sets the step size.
Min-Max normalization maps a feature's values to the range 0 to 1.`,
  };

  const [kb, setKb] = useState(SAMPLE[lang]);
  const [question, setQuestion] = useState(lang === "id" ? "Apa itu overfitting?" : "What is overfitting?");
  const [asked, setAsked] = useState(null); // {question, retrieved:[{chunk,score,i}], answer}

  const chunks = useMemo(() => chunkText(kb), [kb]);
  const index = useMemo(() => buildIndex(chunks), [chunks]);

  const ask = () => {
    const q = question.trim();
    if (!q || !chunks.length) return;
    const qv = tfidf(tokenize(q), index.idf);
    const scored = chunks
      .map((chunk, i) => ({ chunk, i, score: cosine(qv, index.vectors[i]) }))
      .sort((a, b) => b.score - a.score);
    const topK = scored.slice(0, 2).filter((s) => s.score > 0.01);

    let answer;
    if (!topK.length) {
      answer = lang === "id"
        ? "Maaf, saya tidak menemukan informasi relevan di basis pengetahuan. Coba tambah teks atau ubah pertanyaan."
        : "Sorry, I couldn't find relevant info in the knowledge base. Try adding text or rephrasing.";
    } else {
      // grounded answer = the best chunk(s), framed as an answer
      answer = (lang === "id" ? "Berdasarkan dokumen: " : "Based on the documents: ") + topK.map((t) => t.chunk).join(" ");
    }
    setAsked({ question: q, retrieved: topK, answer });
  };

  const L = {
    id: {
      hint: "RAG (Retrieval-Augmented Generation) membuat chatbot menjawab BERDASARKAN dokumen, bukan mengarang. Alurnya: pecah dokumen → cari potongan paling relevan dengan pertanyaan (via kemiripan) → susun jawaban dari potongan itu. Begitulah LLM modern mengurangi halusinasi & memberi sumber.",
      kb: "Basis pengetahuan (tempel teks apa pun)",
      chunks: "potongan",
      question: "Pertanyaan",
      ask: "Tanya",
      retrieved: "Potongan yang diambil (konteks)",
      answer: "Jawaban (grounded)",
      score: "skor",
      sample: "Contoh",
      flow: "Pecah → Embed → Ambil (retrieve) → Jawab",
      note: "Demo ini memakai TF-IDF + cosine similarity agar transparan. RAG asli memakai embedding neural + database vektor, lalu LLM merangkai jawaban dari potongan yang diambil — dengan sitasi ke sumber.",
      emptyAns: "Ketik pertanyaan lalu klik Tanya.",
    },
    en: {
      hint: "RAG (Retrieval-Augmented Generation) makes a chatbot answer FROM documents instead of making things up. The flow: split documents → retrieve the chunks most relevant to the question (by similarity) → compose an answer from them. This is how modern LLMs reduce hallucination & cite sources.",
      kb: "Knowledge base (paste any text)",
      chunks: "chunks",
      question: "Question",
      ask: "Ask",
      retrieved: "Retrieved chunks (context)",
      answer: "Grounded answer",
      score: "score",
      sample: "Sample",
      flow: "Split → Embed → Retrieve → Answer",
      note: "This demo uses TF-IDF + cosine similarity to stay transparent. Real RAG uses neural embeddings + a vector database, then an LLM composes the answer from the retrieved chunks — with citations.",
      emptyAns: "Type a question and click Ask.",
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-3 text-sm text-slate-600">{L.hint}</p>
      <p className="mb-4 rounded-md bg-brand-50 px-3 py-1.5 text-center text-xs font-semibold text-brand-700">🔎 {L.flow}</p>

      {/* knowledge base */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">{L.kb} <span className="font-normal text-slate-400">({chunks.length} {L.chunks})</span></label>
        <button onClick={() => setKb(SAMPLE[lang])} className="text-xs font-semibold text-brand-600 hover:underline">{L.sample}</button>
      </div>
      <textarea value={kb} onChange={(e) => setKb(e.target.value)} rows={5} className="mt-1 w-full rounded-lg border border-slate-300 p-2 text-sm focus:border-brand-500 focus:outline-none" />

      {/* question */}
      <label className="mt-4 block text-sm font-semibold text-slate-700">{L.question}</label>
      <div className="mt-1 flex gap-2">
        <input value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask()}
          className="w-full rounded-lg border border-slate-300 p-2 text-sm focus:border-brand-500 focus:outline-none" />
        <button onClick={ask} className="shrink-0 rounded-lg bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700">{L.ask}</button>
      </div>

      {/* answer + retrieved */}
      {asked ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-green-700">💬 {L.answer}</div>
            <p className="text-sm text-slate-700">{asked.answer}</p>
          </div>
          {asked.retrieved.length > 0 && (
            <div>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">📄 {L.retrieved}</div>
              <div className="space-y-2">
                {asked.retrieved.map((r) => (
                  <div key={r.i} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>#{r.i + 1}</span>
                      <span className="rounded-full bg-brand-100 px-2 font-semibold text-brand-700">{L.score}: {r.score.toFixed(3)}</span>
                    </div>
                    <p className="text-sm text-slate-600">{r.chunk}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-400">{L.emptyAns}</p>
      )}

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
