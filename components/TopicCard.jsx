"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";

export default function TopicCard({ href, icon, title, summary }) {
  useLang();
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-400 hover:shadow-md"
    >
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-brand-700">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{summary}</p>
      <span className="mt-4 text-sm font-semibold text-brand-600">→</span>
    </Link>
  );
}
