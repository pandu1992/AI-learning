"use client";

import Link from "next/link";
import { useProgress } from "./ProgressProvider";

export default function TopicCard({ href, icon, title, summary, doneKey }) {
  const { isDone, hydrated } = useProgress();
  const done = doneKey && hydrated && isDone(doneKey);

  return (
    <Link
      href={href}
      className={`group relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
        done ? "border-green-300 hover:border-green-400" : "border-slate-200 hover:border-brand-400"
      }`}
    >
      {done && (
        <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white shadow" title="Selesai / Completed">
          ✓
        </span>
      )}
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-brand-700">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{summary}</p>
      <span className="mt-4 text-sm font-semibold text-brand-600">→</span>
    </Link>
  );
}
