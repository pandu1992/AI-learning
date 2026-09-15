"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";
import LanguageToggle from "./LanguageToggle";
import Logo from "./Logo";

// The six curriculum topics are grouped under a single "Topics" dropdown so the
// top bar stays compact (no horizontal scroll).
const topicItems = [
  { href: "/topics/ai-overview", id: "Pengantar AI", en: "AI Overview", icon: "🧠" },
  { href: "/topics/machine-learning", id: "Machine Learning", en: "Machine Learning", icon: "📈" },
  { href: "/topics/deep-learning", id: "Deep Learning", en: "Deep Learning", icon: "🕸️" },
  { href: "/topics/reinforcement-learning", id: "Reinforcement Learning", en: "Reinforcement Learning", icon: "🎮" },
  { href: "/topics/llm", id: "Large Language Models", en: "Large Language Models", icon: "💬" },
  { href: "/topics/ai-ethics", id: "Etika AI", en: "AI Ethics", icon: "⚖️" },
];

// Top-level items shown as plain links (besides the Topics dropdown).
const topLevel = [
  { href: "/", id: "Beranda", en: "Home" },
  { href: "/demos", id: "Demo", en: "Demos" },
  { href: "/case-studies", id: "Studi Kasus", en: "Case Studies" },
  { href: "/certification", id: "Sertifikasi", en: "Certification" },
  { href: "/profile", id: "Profil", en: "Profile" },
];

export default function Header() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false); // mobile menu
  const [topicsOpen, setTopicsOpen] = useState(false); // desktop dropdown
  const [mobileTopicsOpen, setMobileTopicsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const T = { id: { topics: "Topik", home: "Beranda" }, en: { topics: "Topics", home: "Home" } }[lang];

  // close the desktop dropdown on outside click / Escape
  useEffect(() => {
    if (!topicsOpen) return;
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setTopicsOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setTopicsOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [topicsOpen]);

  const linkClass =
    "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" aria-label="Cognia — home">
          <Logo size={34} attribution />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          <Link href="/" className={linkClass}>{T.home}</Link>

          {/* Topics dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setTopicsOpen(true)}
            onMouseLeave={() => setTopicsOpen(false)}
          >
            <button
              onClick={() => setTopicsOpen((o) => !o)}
              aria-expanded={topicsOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1 ${linkClass} ${topicsOpen ? "bg-brand-50 text-brand-700" : ""}`}
            >
              {T.topics}
              <span className={`text-[10px] transition-transform ${topicsOpen ? "rotate-180" : ""}`}>▼</span>
            </button>

            {topicsOpen && (
              <div className="absolute left-0 top-full w-64 pt-1">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                  {topicItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setTopicsOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item[lang]}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {topLevel.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item[lang]}
            </Link>
          ))}

          <div className="ml-2 shrink-0">
            <LanguageToggle />
          </div>
        </nav>

        {/* mobile toggle */}
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

      {/* mobile menu */}
      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-2 md:hidden">
          <Link href="/" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50">
            {T.home}
          </Link>

          {/* Topics group */}
          <button
            onClick={() => setMobileTopicsOpen((o) => !o)}
            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50"
          >
            {T.topics}
            <span className={`text-[10px] transition-transform ${mobileTopicsOpen ? "rotate-180" : ""}`}>▼</span>
          </button>
          {mobileTopicsOpen && (
            <div className="ml-2 border-l border-slate-200 pl-2">
              {topicItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-brand-50"
                >
                  <span>{item.icon}</span> {item[lang]}
                </Link>
              ))}
            </div>
          )}

          {topLevel.slice(1).map((item) => (
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
