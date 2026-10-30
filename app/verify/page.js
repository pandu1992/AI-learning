"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { parseVerifyPayload, scoreTier } from "@/lib/certificate";

// Certificate verification page. Reads the ?c=<payload> token (embedded in the
// certificate's QR code / share link), decodes it client-side, and shows a
// verification card. The tier is re-derived from the score, so an altered score
// is internally inconsistent — lightweight tamper-evidence without a backend.

const TIER_LABEL = {
  distinction: { id: "DISTINCTION", en: "DISTINCTION", color: "text-brand-700 bg-brand-50 border-brand-200" },
  passed: { id: "LULUS", en: "PASSED", color: "text-green-700 bg-green-50 border-green-200" },
  completion: { id: "PESERTA", en: "COMPLETION", color: "text-slate-600 bg-slate-100 border-slate-200" },
};

function VerifyInner() {
  const { lang } = useLang();
  const [data, setData] = useState(undefined); // undefined=loading, null=invalid

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setData(parseVerifyPayload(params.get("c")));
  }, []);

  const L = {
    id: {
      title: "Verifikasi Sertifikat",
      valid: "Sertifikat Terverifikasi",
      invalid: "Tidak Ada / Tidak Valid",
      invalidSub: "Kode verifikasi tidak ditemukan atau rusak. Pastikan membuka tautan/QR dari sertifikat asli.",
      name: "Nama", score: "Skor", certNo: "No. Sertifikat", issued: "Diterbitkan", tier: "Predikat",
      note: "Diverifikasi dari data yang tertanam pada sertifikat. Predikat dihitung ulang dari skor.",
      back: "← Ke halaman Sertifikasi",
    },
    en: {
      title: "Certificate Verification",
      valid: "Certificate Verified",
      invalid: "Missing / Invalid",
      invalidSub: "The verification code is missing or corrupted. Open the link/QR from an original certificate.",
      name: "Name", score: "Score", certNo: "Certificate No.", issued: "Issued", tier: "Grade",
      note: "Verified from data embedded in the certificate. The grade is recomputed from the score.",
      back: "← To the Certification page",
    },
  }[lang];

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="mb-6 text-center text-2xl font-bold text-slate-900">🔎 {L.title}</h1>

      {data === undefined && <p className="text-center text-slate-400">…</p>}

      {data === null && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-3xl">⚠️</p>
          <p className="mt-2 text-lg font-bold text-red-700">{L.invalid}</p>
          <p className="mt-1 text-sm text-red-600">{L.invalidSub}</p>
        </div>
      )}

      {data && (
        <div className="overflow-hidden rounded-2xl border border-green-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 bg-green-600 px-6 py-4 text-white">
            <span className="text-3xl">✅</span>
            <p className="text-lg font-bold">{L.valid}</p>
          </div>
          <dl className="divide-y divide-slate-100 p-6 text-sm">
            <Row label={L.name} value={data.name} big />
            <Row label={L.tier}>
              {(() => {
                const t = scoreTier(data.score, data.total);
                const m = TIER_LABEL[t];
                return <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${m.color}`}>{m[lang]}</span>;
              })()}
            </Row>
            <Row label={L.score} value={`${data.score}/${data.total} (${data.total ? Math.round((data.score / data.total) * 100) : 0}%)`} />
            <Row label={L.certNo} value={<span className="font-mono text-xs">{data.certNo}</span>} />
            {data.iso && <Row label={L.issued} value={new Date(data.iso).toLocaleString(lang === "id" ? "id-ID" : "en-US")} />}
          </dl>
          <p className="px-6 pb-5 text-xs text-slate-400">{L.note}</p>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link href="/certification" className="text-sm font-semibold text-brand-600 hover:underline">{L.back}</Link>
      </div>
    </div>
  );
}

function Row({ label, value, children, big }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <dt className="shrink-0 font-semibold text-slate-500">{label}</dt>
      <dd className={`text-right ${big ? "text-base font-bold text-slate-900" : "text-slate-700"}`}>{children ?? value}</dd>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={null}>
      <VerifyInner />
    </Suspense>
  );
}
