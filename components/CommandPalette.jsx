"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "./LanguageProvider";
import { topics } from "@/lib/content";
import { demoList } from "@/lib/demos";

// ⌘K / Ctrl-K command palette: fuzzy-ish search across topics, demos, and key
// pages; arrow keys to move, Enter to go. Lightweight, dependency-free.
export default function CommandPalette() {
  const { lang } = useLang();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const PAGES = useMemo(() => {
    const id = lang === "id";
    return [
      { label: id ? "Beranda" : "Home", href: "/", group: id ? "Halaman" : "Pages", icon: "🏠" },
      { label: id ? "Semua Demo" : "All Demos", href: "/demos", group: id ? "Halaman" : "Pages", icon: "🧪" },
      { label: id ? "Studi Kasus" : "Case Studies", href: "/case-studies", group: id ? "Halaman" : "Pages", icon: "📚" },
      { label: id ? "Ujian Sertifikasi" : "Certification Exam", href: "/certification", group: id ? "Halaman" : "Pages", icon: "🎓" },
      { label: id ? "Profil Pengajar" : "Instructor Profile", href: "/profile", group: id ? "Halaman" : "Pages", icon: "👤" },
    ];
  }, [lang]);

  const items = useMemo(() => {
    const topicItems = topics.map((t) => ({ label: t[lang].title, href: `/topics/${t.slug}`, group: lang === "id" ? "Topik" : "Topics", icon: t.icon }));
    const demoItems = demoList.map((d) => ({ label: d[lang].title, href: `/demos/${d.slug}`, group: "Demo", icon: d.icon }));
    return [...PAGES, ...topicItems, ...demoItems];
  }, [lang, PAGES]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items.slice(0, 8);
    return items.filter((i) => i.label.toLowerCase().includes(term) || i.group.toLowerCase().includes(term)).slice(0, 12);
  }, [q, items]);

  // open/close via keyboard
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("cognia:open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cognia:open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) { setQ(""); setActive(0); setTimeout(() => inputRef.current?.focus(), 30); }
  }, [open]);

  useEffect(() => { setActive(0); }, [q]);

  const go = (href) => { setOpen(false); router.push(href); };

  if (!open) return null;

  const L = { id: { ph: "Cari topik, demo, halaman…", hint: "↑↓ pilih · Enter buka · Esc tutup", empty: "Tidak ada hasil" }, en: { ph: "Search topics, demos, pages…", hint: "↑↓ to move · Enter to open · Esc to close", empty: "No results" } }[lang];

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-[12vh]" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700">
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
            else if (e.key === "Enter" && results[active]) { e.preventDefault(); go(results[active].href); }
          }}
          placeholder={L.ph}
          className="w-full border-b border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none dark:border-slate-700"
        />
        <ul className="max-h-80 overflow-y-auto py-1">
          {results.length === 0 && <li className="px-4 py-6 text-center text-sm text-slate-400">{L.empty}</li>}
          {results.map((r, i) => (
            <li key={r.href}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r.href)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm ${i === active ? "bg-brand-50 text-brand-800" : "text-slate-700"}`}
              >
                <span className="text-lg">{r.icon}</span>
                <span className="flex-1 truncate">{r.label}</span>
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">{r.group}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t border-slate-200 px-4 py-2 text-[11px] text-slate-400 dark:border-slate-700">{L.hint}</div>
      </div>
    </div>
  );
}
