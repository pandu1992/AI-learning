"use client";

import { useLang } from "./LanguageProvider";
import { LogoMark } from "./Logo";

export default function Footer() {
  const { lang } = useLang();
  const text = {
    id: "Dibuat untuk pembelajaran. Bebas digunakan di kelas.",
    en: "Built for education. Free to use in class.",
  };
  const attribution = {
    id: "BINUS Online · Computer Science",
    en: "BINUS Online · Computer Science",
  };
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-500">
        <p className="flex items-center justify-center gap-2">
          <LogoMark size={22} />
          <span className="font-semibold text-slate-700">Cognia</span>
          <span>— {text[lang]}</span>
        </p>
        <p className="mt-1 font-semibold" style={{ color: "#0093D0" }}>{attribution[lang]}</p>
        <p className="mt-1">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
