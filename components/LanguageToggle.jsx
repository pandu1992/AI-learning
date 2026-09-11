"use client";

import { useLang } from "./LanguageProvider";

export default function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="inline-flex rounded-full border border-slate-300 bg-white p-0.5 text-xs font-semibold">
      <button
        onClick={() => setLang("id")}
        className={`rounded-full px-3 py-1 transition ${
          lang === "id" ? "bg-brand-600 text-white" : "text-slate-600 hover:text-brand-600"
        }`}
        aria-pressed={lang === "id"}
      >
        ID
      </button>
      <button
        onClick={() => setLang("en")}
        className={`rounded-full px-3 py-1 transition ${
          lang === "en" ? "bg-brand-600 text-white" : "text-slate-600 hover:text-brand-600"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
