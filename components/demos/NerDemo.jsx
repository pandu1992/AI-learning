"use client";

import { useMemo, useState } from "react";
import { useLang } from "../LanguageProvider";

// Named Entity Recognition (NER) demo. Highlights entities in text and labels
// their type: PERSON, LOCATION (GPE), ORGANIZATION, DATE, MONEY, NUMBER.
// This is a transparent, rule- + gazetteer-based tagger (not a trained model)
// so students can SEE why each span is tagged. Real NER uses sequence models
// (BiLSTM-CRF, Transformers), but the goal here is the concept. Original code.

// Small gazetteers (dictionaries). Lowercased for matching.
const GAZ = {
  PER: ["budi", "siti", "andi", "dewi", "pandu", "einstein", "ada lovelace", "alan turing", "sutan", "kartini"],
  LOC: ["jakarta", "bandung", "surabaya", "indonesia", "bali", "yogyakarta", "singapura", "singapore", "london", "paris", "amerika", "america"],
  ORG: ["binus", "google", "microsoft", "openai", "nvidia", "universitas", "university", "kementerian", "ministry", "pbb", "un", "nasa"],
  MONTHS: ["januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember",
    "january", "february", "march", "may", "june", "july", "august", "october", "december"],
};

const TYPE_META = {
  PER: { color: "#0093D0", id: "Orang", en: "Person" },
  LOC: { color: "#16a34a", id: "Lokasi", en: "Location" },
  ORG: { color: "#F5A200", id: "Organisasi", en: "Organization" },
  DATE: { color: "#7c3aed", id: "Tanggal", en: "Date" },
  MONEY: { color: "#059669", id: "Uang", en: "Money" },
  NUM: { color: "#db2777", id: "Angka", en: "Number" },
};

// Tokenize keeping track of character offsets and trailing punctuation.
function tokenize(text) {
  const tokens = [];
  const re = /\S+/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const raw = m[0];
    // split trailing punctuation (keep for display, ignore for matching)
    const core = raw.replace(/[.,!?;:()"']+$/g, "");
    tokens.push({ raw, core, start: m.index, end: m.index + raw.length });
  }
  return tokens;
}

const isCap = (w) => /^[A-Z][a-zA-Z]+$/.test(w);
const inGaz = (list, w) => list.includes(w.toLowerCase());

// Tag tokens -> array of { ...token, type|null }. Multi-word gazetteer entries
// (e.g. "ada lovelace") are matched greedily first.
function tagTokens(text) {
  const tokens = tokenize(text);
  const types = new Array(tokens.length).fill(null);

  // 1) multi-word gazetteer matches (PER/LOC/ORG)
  const multi = [
    ...GAZ.PER.filter((x) => x.includes(" ")).map((x) => ["PER", x]),
    ...GAZ.LOC.filter((x) => x.includes(" ")).map((x) => ["LOC", x]),
    ...GAZ.ORG.filter((x) => x.includes(" ")).map((x) => ["ORG", x]),
  ];
  for (let i = 0; i < tokens.length; i++) {
    for (const [type, phrase] of multi) {
      const parts = phrase.split(" ");
      const slice = tokens.slice(i, i + parts.length).map((t) => t.core.toLowerCase()).join(" ");
      if (slice === phrase && types.slice(i, i + parts.length).every((t) => t === null)) {
        for (let k = 0; k < parts.length; k++) types[i + k] = type;
        i += parts.length - 1;
        break;
      }
    }
  }

  // 2) per-token rules
  for (let i = 0; i < tokens.length; i++) {
    if (types[i]) continue;
    const w = tokens[i].core;
    const lw = w.toLowerCase();
    if (!w) continue;

    // MONEY: Rp 1.000.000 / $100 / 100 dollar/rupiah
    if (/^(rp|\$|usd|idr)/i.test(w) || (/^\d[\d.,]*$/.test(w) && /^(rupiah|dollar|dolar|usd|idr)$/i.test(tokens[i + 1]?.core || ""))) {
      types[i] = "MONEY";
      if (/^\d/.test(w) && tokens[i + 1]) types[i + 1] = "MONEY";
      continue;
    }
    // DATE: a year 1900-2099, or a day-number followed by a month name, or a month name
    if (/^(19|20)\d{2}$/.test(w)) { types[i] = "DATE"; continue; }
    if (/^\d{1,2}$/.test(w) && GAZ.MONTHS.includes((tokens[i + 1]?.core || "").toLowerCase())) {
      types[i] = "DATE"; types[i + 1] = "DATE"; i += 1; continue;
    }
    if (GAZ.MONTHS.includes(lw)) { types[i] = "DATE"; continue; }
    // gazetteers
    if (inGaz(GAZ.ORG, lw)) { types[i] = "ORG"; continue; }
    if (inGaz(GAZ.LOC, lw)) { types[i] = "LOC"; continue; }
    if (inGaz(GAZ.PER, lw)) { types[i] = "PER"; continue; }
    // NUMBER: a standalone number not already money/date
    if (/^\d[\d.,]*$/.test(w)) { types[i] = "NUM"; continue; }
    // Heuristic PERSON: capitalized word, not sentence-start, not known LOC/ORG
    if (isCap(w) && i > 0 && !/[.!?]$/.test(tokens[i - 1]?.raw || "")) {
      // avoid tagging if it's clearly a gazetteer location/org already handled
      types[i] = "PER";
    }
  }
  return tokens.map((t, i) => ({ ...t, type: types[i] }));
}

export default function NerDemo() {
  const { lang } = useLang();
  const SAMPLE = {
    id: "Pandu bekerja di BINUS di Jakarta sejak Agustus 2019 dan memimpin proyek senilai Rp 500.000.000 bersama tim OpenAI.",
    en: "Pandu works at BINUS in Jakarta since August 2019 and leads a project worth $50000 with the OpenAI team.",
  };
  const [text, setText] = useState(SAMPLE[lang]);

  const tagged = useMemo(() => tagTokens(text), [text]);

  const counts = useMemo(() => {
    const c = {};
    tagged.forEach((t) => { if (t.type) c[t.type] = (c[t.type] || 0) + 1; });
    return c;
  }, [tagged]);

  const L = {
    id: {
      hint: "Named Entity Recognition (NER) menandai 'entitas bernama' dalam teks — nama orang, lokasi, organisasi, tanggal, uang, angka. Ini tugas inti NLP (dipakai di pencarian, chatbot, ekstraksi informasi). Edit teks untuk mencoba.",
      input: "Teks",
      legend: "Jenis entitas",
      none: "Belum ada entitas terdeteksi — coba tulis nama orang, kota, atau tanggal.",
      sample: "Pakai contoh",
      note: "Demo ini memakai aturan + kamus (gazetteer) agar transparan. NER sungguhan memakai model urutan (BiLSTM-CRF, Transformer) yang belajar dari ribuan contoh berlabel — lebih akurat & tahan konteks.",
    },
    en: {
      hint: "Named Entity Recognition (NER) tags 'named entities' in text — people, locations, organizations, dates, money, numbers. It's a core NLP task (used in search, chatbots, information extraction). Edit the text to try it.",
      input: "Text",
      legend: "Entity types",
      none: "No entities detected yet — try writing a person's name, a city, or a date.",
      sample: "Use sample",
      note: "This demo uses rules + a dictionary (gazetteer) to stay transparent. Real NER uses sequence models (BiLSTM-CRF, Transformers) trained on thousands of labeled examples — more accurate & context-aware.",
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">{L.input}</label>
        <button onClick={() => setText(SAMPLE[lang])} className="text-xs font-semibold text-brand-600 hover:underline">{L.sample}</button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="mt-1 w-full rounded-lg border border-slate-300 p-2 text-sm focus:border-brand-500 focus:outline-none"
      />

      {/* annotated output */}
      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-[15px] leading-9">
        {tagged.map((t, i) => {
          if (!t.type) return <span key={i}>{t.raw} </span>;
          const meta = TYPE_META[t.type];
          return (
            <span key={i} className="whitespace-nowrap">
              <span
                className="rounded px-1.5 py-0.5 font-medium text-white"
                style={{ backgroundColor: meta.color }}
              >
                {t.raw}
                <sub className="ml-1 text-[9px] font-bold uppercase opacity-90">{t.type}</sub>
              </span>{" "}
            </span>
          );
        })}
        {tagged.every((t) => !t.type) && <p className="text-sm text-slate-400">{L.none}</p>}
      </div>

      {/* legend + counts */}
      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{L.legend}</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(TYPE_META).map(([key, meta]) => (
            <span key={key} className="flex items-center gap-1.5 rounded-full border border-slate-200 px-2.5 py-1 text-xs">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: meta.color }} />
              <span className="font-medium text-slate-700">{meta[lang]}</span>
              <span className="text-slate-400">({key})</span>
              {counts[key] ? <span className="ml-1 rounded-full bg-slate-100 px-1.5 font-bold text-slate-600">{counts[key]}</span> : null}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
