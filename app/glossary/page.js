"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import ImmersiveHero from "@/components/immersive/ImmersiveHero";
import { getTheme } from "@/lib/immersiveThemes";
import {
  glossary,
  glossaryCategories,
  categoryOrder,
  searchGlossary,
} from "@/lib/glossary";

export default function GlossaryPage() {
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  const labels = {
    id: {
      title: "Glosarium AI",
      sub: "Istilah penting AI, Machine Learning, NLP, dan Reinforcement Learning — dijelaskan singkat dalam dua bahasa.",
      search: "Cari istilah…",
      all: "Semua",
      related: "Terkait",
      empty: "Tidak ada istilah yang cocok.",
      count: (n) => `${n} istilah`,
    },
    en: {
      title: "AI Glossary",
      sub: "Key terms across AI, Machine Learning, NLP, and Reinforcement Learning — explained briefly in both languages.",
      search: "Search a term…",
      all: "All",
      related: "Related",
      empty: "No matching terms.",
      count: (n) => `${n} terms`,
    },
  }[lang];

  const cats = glossaryCategories[lang];
  const theme = getTheme("demos");

  const results = useMemo(() => {
    let list = searchGlossary(query, lang);
    if (activeCat !== "all") list = list.filter((e) => e.category === activeCat);
    return list;
  }, [query, activeCat, lang]);

  // group results by category, preserving curriculum order
  const grouped = useMemo(() => {
    const map = {};
    for (const e of results) (map[e.category] ||= []).push(e);
    for (const k of Object.keys(map)) map[k].sort((a, b) => a.term.localeCompare(b.term));
    return map;
  }, [results]);

  return (
    <div>
      <ImmersiveHero
        theme={theme}
        icon="📖"
        title={labels.title}
        subtitle={labels.sub}
        eyebrow={theme.eyebrow[lang]}
      />
      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* search */}
        <div className="mb-5">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.search}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        {/* category filter chips */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCat("all")}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              activeCat === "all"
                ? "bg-brand-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {labels.all}
          </button>
          {categoryOrder.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                activeCat === c
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cats[c]}
            </button>
          ))}
        </div>

        <p className="mb-6 text-sm text-slate-500">{labels.count(results.length)}</p>

        {results.length === 0 && (
          <p className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
            {labels.empty}
          </p>
        )}

        {categoryOrder
          .filter((c) => grouped[c]?.length)
          .map((c) => (
            <section key={c} className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                {cats[c]}
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                  {grouped[c].length}
                </span>
              </h2>
              <dl className="grid gap-4 sm:grid-cols-2">
                {grouped[c].map((e) => (
                  <div
                    key={e.term}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <dt className="font-bold text-brand-700">{e.term}</dt>
                    <dd className="mt-1 text-sm text-slate-600">{e[lang].def}</dd>
                    {e.also?.length > 0 && (
                      <p className="mt-2 text-xs text-slate-400">
                        <span className="font-semibold">{labels.related}: </span>
                        {e.also.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </dl>
            </section>
          ))}
      </div>
    </div>
  );
}
