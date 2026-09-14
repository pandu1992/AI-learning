"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "./LanguageProvider";
import LanguageToggle from "./LanguageToggle";
import Logo from "./Logo";

const nav = [
  { href: "/home", id: "Beranda", en: "Home" },
  { href: "/topics/ai-overview", id: "Pengantar", en: "Overview" },
  { href: "/topics/machine-learning", id: "Machine Learning", en: "Machine Learning" },
  { href: "/topics/deep-learning", id: "Deep Learning", en: "Deep Learning" },
  { href: "/topics/reinforcement-learning", id: "RL", en: "RL" },
  { href: "/topics/llm", id: "LLM", en: "LLM" },
  { href: "/topics/ai-ethics", id: "Etika AI", en: "AI Ethics" },
  { href: "/demos", id: "Demo", en: "Demos" },
  { href: "/case-studies", id: "Studi Kasus", en: "Case Studies" },
  { href: "/profile", id: "Profil", en: "Profile" },
];

export default function Header() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" aria-label="Cognia — home">
          <Logo size={34} attribution />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
            >
              {item[lang]}
            </Link>
          ))}
          <div className="ml-2">
            <LanguageToggle />
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-md border border-slate-300 p-2"
            aria-label="Menu"
          >
            <span className="block h-0.5 w-5 bg-slate-700" />
            <span className="mt-1 block h-0.5 w-5 bg-slate-700" />
            <span className="mt-1 block h-0.5 w-5 bg-slate-700" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50"
            >
              {item[lang]}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
