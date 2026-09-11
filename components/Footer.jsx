"use client";

import { useLang } from "./LanguageProvider";

export default function Footer() {
  const { lang } = useLang();
  const text = {
    id: "Dibuat untuk pembelajaran. Bebas digunakan di kelas.",
    en: "Built for education. Free to use in class.",
  };
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-500">
        <p>🤖 AI Belajar — {text[lang]}</p>
        <p className="mt-1">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
