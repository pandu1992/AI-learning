"use client";

import { useLang } from "./LanguageProvider";
import Formula from "./Formula";

// Renders a KaTeX formula together with a notation glossary so students can
// understand every symbol. Matches the "Rumusnya: … dengan: x = …, μ = …" style.
//
// Props:
//   tex       : LaTeX string for the main formula
//   display   : block (true, default) vs inline formula
//   symbols   : array of { sym, id, en } — sym is a LaTeX snippet, id/en are the
//               bilingual meanings. (You may also pass { sym, meaning } directly.)
//   compact   : if true, uses tighter spacing (for small cards)
export default function FormulaWithNotation({ tex, display = true, symbols = [], compact = false }) {
  const { lang } = useLang();
  const L = { id: { where: "dengan:" }, en: { where: "where:" } }[lang];

  return (
    <div>
      <div className={`overflow-x-auto ${compact ? "py-1" : "py-2"} text-center`}>
        <Formula tex={tex} display={display} />
      </div>

      {symbols.length > 0 && (
        <div className={compact ? "mt-1.5" : "mt-3"}>
          <p className="mb-1 text-xs font-semibold text-slate-600">{L.where}</p>
          <ul className="space-y-1">
            {symbols.map((s, i) => (
              <li key={i} className="flex items-baseline gap-2 text-xs text-slate-600">
                <span className="mt-0.5 shrink-0"><Formula tex={s.sym} display={false} /></span>
                <span>= {s.meaning ?? (lang === "id" ? s.id : s.en)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
