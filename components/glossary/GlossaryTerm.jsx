"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "../LanguageProvider";
import { getGlossaryTerm } from "@/lib/glossary";

// Inline glossary term: shows the definition in a tooltip on hover/focus, and
// links to the full glossary. Accessible (keyboard-focusable, Esc to close).
// Renders its children as the visible text (so casing/phrasing is preserved).
export default function GlossaryTerm({ term, children }) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const entry = getGlossaryTerm(term);
  if (!entry) return <>{children}</>;

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        className="cursor-help border-b border-dotted border-brand-400 font-medium text-brand-700 outline-none transition hover:text-brand-800 focus:text-brand-800"
        aria-describedby={open ? `gt-${entry.term}` : undefined}
      >
        {children || entry.term}
      </button>
      {open && (
        <span
          id={`gt-${entry.term}`}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-60 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-lg"
        >
          <span className="block text-xs font-bold text-brand-700">{entry.term}</span>
          <span className="mt-1 block text-xs font-normal text-slate-600">{entry[lang]?.def}</span>
          <Link href="/glossary" className="mt-2 block text-[11px] font-semibold text-brand-500 hover:underline">
            {lang === "id" ? "Buka Glosarium →" : "Open Glossary →"}
          </Link>
        </span>
      )}
    </span>
  );
}
