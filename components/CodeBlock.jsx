"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";

// A dark, copyable code block with a copy button and language badge. Used by the
// Batik case-study module (and reusable elsewhere). Purely presentational — no
// syntax highlighting dependency to keep the bundle light.
export default function CodeBlock({ code, lang = "python", title }) {
  const { lang: uiLang } = useLang();
  const [copied, setCopied] = useState(false);

  const L = { id: { copy: "Salin", copied: "Tersalin!" }, en: { copy: "Copy", copied: "Copied!" } }[uiLang];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-700 px-4 py-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-slate-400">{title || lang}</span>
        <button
          onClick={copy}
          className="rounded-md border border-slate-600 px-2.5 py-1 text-xs font-semibold text-slate-200 transition hover:bg-slate-700"
        >
          {copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-6 text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
