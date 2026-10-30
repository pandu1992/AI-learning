"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";
import { useProgress, levelFromXp } from "./ProgressProvider";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

// Navigation is organized into a few grouped dropdowns so the top bar stays
// compact no matter how many pages the site grows to. Each "menu" is a labeled
// dropdown of related links; a couple of high-traffic destinations stay as plain
// top-level links. Both desktop (hover/click dropdowns) and mobile (accordion)
// render from the same MENUS definition.

const MENUS = [
  {
    key: "topics",
    id: "Topik", en: "Topics",
    items: [
      { href: "/topics/ai-overview", id: "Pengantar AI", en: "AI Overview", icon: "🧠" },
      { href: "/topics/machine-learning", id: "Machine Learning", en: "Machine Learning", icon: "📈" },
      { href: "/topics/deep-learning", id: "Deep Learning", en: "Deep Learning", icon: "🕸️" },
      { href: "/topics/reinforcement-learning", id: "Reinforcement Learning", en: "Reinforcement Learning", icon: "🎮" },
      { href: "/topics/llm", id: "Large Language Models", en: "Large Language Models", icon: "💬" },
      { href: "/topics/ai-ethics", id: "Etika AI", en: "AI Ethics", icon: "⚖️" },
    ],
  },
  {
    key: "learn",
    id: "Belajar", en: "Learn",
    items: [
      { href: "/demos", id: "Demo Interaktif", en: "Interactive Demos", icon: "🧪" },
      { href: "/learning-path", id: "Jalur Belajar", en: "Learning Path", icon: "🗺️" },
      { href: "/compare", id: "Bandingkan Algoritma", en: "Compare Algorithms", icon: "⚖️" },
      { href: "/flashcards", id: "Flashcard", en: "Flashcards", icon: "🃏" },
      { href: "/case-studies", id: "Studi Kasus", en: "Case Studies", icon: "🏭" },
    ],
  },
  {
    key: "reference",
    id: "Referensi", en: "Reference",
    items: [
      { href: "/glossary", id: "Glosarium", en: "Glossary", icon: "📖" },
      { href: "/cheat-sheet", id: "Cheat Sheet Metrik", en: "Metrics Cheat Sheet", icon: "📋" },
    ],
  },
  {
    key: "progress",
    id: "Progres", en: "Progress",
    items: [
      { href: "/dashboard", id: "Dasbor Belajar", en: "Learning Dashboard", icon: "📊" },
      { href: "/certification", id: "Sertifikasi", en: "Certification", icon: "🎓" },
      { href: "/profile", id: "Profil", en: "Profile", icon: "👤" },
    ],
  },
];

// Plain top-level links (besides Home) kept outside dropdowns for quick access.
const topLinks = [
  { href: "/live-quiz", id: "Kuis Live", en: "Live Quiz" },
];

function XpBadge() {
  const { hydrated, xp } = useProgress();
  if (!hydrated || xp <= 0) return null;
  const lv = levelFromXp(xp);
  return (
    <span
      className="hidden items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700 ring-1 ring-brand-100 lg:inline-flex"
      title={`${xp} XP`}
    >
      ⭐ Lv {lv.level}
    </span>
  );
}

const linkClass =
  "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700";

// One desktop dropdown menu (hover to open, click toggles, closes on outside/Esc).
function DesktopDropdown({ menu, lang, openKey, setOpenKey }) {
  const ref = useRef(null);
  const isOpen = openKey === menu.key;

  useEffect(() => {
    if (!isOpen) return undefined;
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpenKey(null); };
    const onKey = (e) => e.key === "Escape" && setOpenKey(null);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, setOpenKey]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpenKey(menu.key)}
      onMouseLeave={() => setOpenKey((k) => (k === menu.key ? null : k))}
    >
      <button
        onClick={() => setOpenKey(isOpen ? null : menu.key)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center gap-1 ${linkClass} ${isOpen ? "bg-brand-50 text-brand-700" : ""}`}
      >
        {menu[lang]}
        <span className={`text-[10px] transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full w-64 pt-1">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
            {menu.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpenKey(null)}
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
  );
}

export default function Header() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false); // mobile menu
  const [openKey, setOpenKey] = useState(null); // which desktop dropdown is open
  const [mobileGroup, setMobileGroup] = useState(null); // which mobile accordion group is open

  const T = { id: { home: "Beranda" }, en: { home: "Home" } }[lang];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" aria-label="Cognia — home">
          <Logo size={34} attribution />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          <Link href="/" className={linkClass}>{T.home}</Link>

          {MENUS.map((menu) => (
            <DesktopDropdown key={menu.key} menu={menu} lang={lang} openKey={openKey} setOpenKey={setOpenKey} />
          ))}

          {topLinks.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item[lang]}
            </Link>
          ))}

          <div className="ml-2 flex shrink-0 items-center gap-2">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("cognia:open-palette"))}
              className="hidden items-center gap-1 rounded-lg border border-slate-300 px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 xl:inline-flex dark:border-slate-600 dark:hover:bg-slate-700"
              title="Search (Ctrl/⌘ + K)"
            >
              🔍 <kbd className="rounded bg-slate-100 px-1 font-sans dark:bg-slate-700">⌘K</kbd>
            </button>
            <XpBadge />
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </nav>

        {/* mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
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
        <nav className="max-h-[70vh] overflow-y-auto border-t border-slate-200 bg-white px-4 py-2 md:hidden">
          <Link href="/" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50">
            {T.home}
          </Link>

          {MENUS.map((menu) => {
            const groupOpen = mobileGroup === menu.key;
            return (
              <div key={menu.key}>
                <button
                  onClick={() => setMobileGroup((g) => (g === menu.key ? null : menu.key))}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50"
                >
                  {menu[lang]}
                  <span className={`text-[10px] transition-transform ${groupOpen ? "rotate-180" : ""}`}>▼</span>
                </button>
                {groupOpen && (
                  <div className="ml-2 border-l border-slate-200 pl-2">
                    {menu.items.map((item) => (
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
              </div>
            );
          })}

          {topLinks.map((item) => (
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
