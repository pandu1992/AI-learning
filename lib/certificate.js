// Client-side PDF certificate generator for the Cognia Certification Exam.
// Uses jsPDF (works in the browser; fine for a static-export site).
//
// Grading tiers (by percentage of the 100 questions answered correctly):
//   81–100 : Distinction  (with grade)
//   70–80  : Passed       (with grade)
//    0–69  : Completion    (participation only, no pass grade)
//
// Every participant gets a certificate. The certificate shows the participant's
// full name, the tier, the score, a unique certificate number, and the issue
// date + time (timestamp). Signed by the instructor, Pandu Dwi Luhur Pambudi.

// ---- Verification payload (no backend) ----
// We encode the certificate's facts into a compact base64url token embedded in a
// QR code on the PDF and in a shareable /verify link. Scanning/opening it shows a
// verification card that re-derives the tier from the score — so the data is
// self-consistent (tamper-evident at the UI level: changing the score changes
// the tier shown). This is lightweight attestation, not cryptographic proof.
function b64urlEncode(str) {
  const b64 = typeof window === "undefined"
    ? Buffer.from(str, "utf8").toString("base64")
    : btoa(unescape(encodeURIComponent(str)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecode(token) {
  let b64 = (token || "").replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  return typeof window === "undefined"
    ? Buffer.from(b64, "base64").toString("utf8")
    : decodeURIComponent(escape(atob(b64)));
}

// Build the token from certificate facts.
export function buildVerifyPayload({ name, score, total, certNo, iso }) {
  try {
    return b64urlEncode(JSON.stringify({ n: name, s: score, t: total, c: certNo, d: iso, v: 1 }));
  } catch {
    return "";
  }
}

// Parse a token back into a normalized object (or null if invalid).
export function parseVerifyPayload(token) {
  try {
    const o = JSON.parse(b64urlDecode(token));
    if (!o || typeof o !== "object" || !o.c) return null;
    return { name: o.n || "-", score: Number(o.s) || 0, total: Number(o.t) || 0, certNo: o.c, iso: o.d || "" };
  } catch {
    return null;
  }
}

// Verify URL (points to the static /verify page). Uses the deployed base path.
export function buildVerifyUrl(payload) {
  const base = (typeof window !== "undefined" && window.location?.origin) || "https://pandu1992.github.io";
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "/AI-learning";
  return `${base}${prefix}/verify/?c=${payload}`;
}

// tier is one of: "distinction" | "passed" | "completion"
export function scoreTier(score, total) {
  const pct = total > 0 ? (score / total) * 100 : 0;
  if (pct >= 81) return "distinction";
  if (pct >= 70) return "passed";
  return "completion";
}

function two(n) {
  return String(n).padStart(2, "0");
}

// Build a certificate number like COGNIA-20260914-1530-4821
function makeCertNumber(now) {
  const datePart = `${now.getFullYear()}${two(now.getMonth() + 1)}${two(now.getDate())}`;
  const timePart = `${two(now.getHours())}${two(now.getMinutes())}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `COGNIA-${datePart}-${timePart}-${rand}`;
}

// Format a full timestamp string (date + time) for the certificate body.
function formatTimestamp(now, lang) {
  const months = {
    id: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  }[lang];
  const date = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  const time = `${two(now.getHours())}:${two(now.getMinutes())}:${two(now.getSeconds())}`;
  // include timezone abbreviation if available
  let tz = "";
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    tz = "";
  }
  return { date, time, tz, iso: now.toISOString() };
}

const TIER_META = {
  distinction: {
    accent: [0, 147, 208], // brand blue
    id: { badge: "DISTINCTION", line: "telah menyelesaikan Ujian Sertifikasi dengan predikat DISTINCTION" },
    en: { badge: "DISTINCTION", line: "has completed the Certification Exam with DISTINCTION" },
  },
  passed: {
    accent: [22, 163, 74], // green
    id: { badge: "LULUS (PASSED)", line: "telah menyelesaikan dan LULUS Ujian Sertifikasi" },
    en: { badge: "PASSED", line: "has completed and PASSED the Certification Exam" },
  },
  completion: {
    accent: [100, 116, 139], // slate
    id: { badge: "PESERTA (COMPLETION)", line: "telah mengikuti dan menyelesaikan Ujian Sertifikasi sebagai peserta" },
    en: { badge: "COMPLETION", line: "has participated in and completed the Certification Exam" },
  },
};

// Main entry. Dynamically imports jsPDF so it never runs during SSR/build.
export async function generateCertificate({ name, score, total, lang = "id" }) {
  const { jsPDF } = await import("jspdf");
  const tier = scoreTier(score, total);
  const meta = TIER_META[tier];
  const now = new Date();
  const certNo = makeCertNumber(now);
  const ts = formatTimestamp(now, lang);
  const pct = Math.round((score / total) * 100);

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth(); // 297
  const H = doc.internal.pageSize.getHeight(); // 210
  const [ar, ag, ab] = meta.accent;

  const T = {
    id: {
      title: "SERTIFIKAT",
      subtitle: "Cognia — Platform Pembelajaran AI Interaktif",
      awarded: "Diberikan kepada",
      scoreLbl: "Skor",
      correct: "jawaban benar",
      certNoLbl: "No. Sertifikat",
      issued: "Diterbitkan",
      signName: "Pandu Dwi Luhur Pambudi",
      signRole: "Dosen & Peneliti — Computer Science Department, BINUS University",
      signSub: "Pengajar Cognia",
      note: "Diverifikasi secara digital. Timestamp tercantum sebagai bukti waktu penerbitan.",
    },
    en: {
      title: "CERTIFICATE",
      subtitle: "Cognia — Interactive AI Learning Platform",
      awarded: "Awarded to",
      scoreLbl: "Score",
      correct: "correct answers",
      certNoLbl: "Certificate No.",
      issued: "Issued",
      signName: "Pandu Dwi Luhur Pambudi",
      signRole: "Lecturer & Researcher — Computer Science Department, BINUS University",
      signSub: "Instructor, Cognia",
      note: "Digitally verified. The timestamp is recorded as proof of issuance time.",
    },
  }[lang];

  // ----- background & borders -----
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, W, H, "F");
  // outer accent border
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(2.2);
  doc.rect(8, 8, W - 16, H - 16);
  // thin inner border
  doc.setLineWidth(0.4);
  doc.rect(12, 12, W - 24, H - 24);

  // ----- header -----
  doc.setTextColor(ar, ag, ab);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("COGNIA", W / 2, 26, { align: "center" });

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(34);
  doc.text(T.title, W / 2, 42, { align: "center" });

  // tier badge
  doc.setFillColor(ar, ag, ab);
  const badge = (lang === "id" ? meta.id.badge : meta.en.badge);
  doc.setFontSize(12);
  const badgeW = doc.getTextWidth(badge) + 16;
  doc.roundedRect(W / 2 - badgeW / 2, 47, badgeW, 10, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text(badge, W / 2, 53.7, { align: "center" });

  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(T.subtitle, W / 2, 65, { align: "center" });

  // ----- recipient -----
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(12);
  doc.text(T.awarded, W / 2, 82, { align: "center" });

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.text(name || "-", W / 2, 96, { align: "center" });

  // underline under name
  const nameW = Math.min(doc.getTextWidth(name || "-") + 20, W - 60);
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(0.6);
  doc.line(W / 2 - nameW / 2, 100, W / 2 + nameW / 2, 100);

  // ----- statement -----
  doc.setTextColor(71, 85, 105);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  const line = lang === "id" ? meta.id.line : meta.en.line;
  doc.text(line, W / 2, 112, { align: "center", maxWidth: W - 60 });

  // ----- score -----
  doc.setTextColor(ar, ag, ab);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(`${T.scoreLbl}: ${score}/${total} (${pct}%) — ${score} ${T.correct}`, W / 2, 126, { align: "center" });

  // ----- footer: cert no + timestamp (left), signature (right) -----
  const footY = H - 45;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(9.5);
  doc.text(`${T.certNoLbl}: ${certNo}`, 26, footY);
  doc.text(`${T.issued}: ${ts.date}, ${ts.time}${ts.tz ? " (" + ts.tz + ")" : ""}`, 26, footY + 6);
  doc.setFontSize(7.5);
  doc.text(`Timestamp (ISO): ${ts.iso}`, 26, footY + 11);

  // signature block (right)
  const sigX = W - 26;
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.5);
  doc.line(sigX - 70, footY + 2, sigX, footY + 2);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(T.signName, sigX, footY + 9, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8.5);
  doc.text(T.signRole, sigX, footY + 14, { align: "right" });
  doc.setFont("helvetica", "italic");
  doc.text(T.signSub, sigX, footY + 19, { align: "right" });

  // ----- QR code for verification (points to the /verify page) -----
  const payload = buildVerifyPayload({ name, score, total, certNo, iso: ts.iso });
  const verifyUrl = buildVerifyUrl(payload);
  try {
    const QRCode = (await import("qrcode")).default;
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, { margin: 1, width: 240 });
    const qrSize = 26;
    const qrX = W / 2 - qrSize / 2;
    const qrY = H - 45;
    doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7);
    doc.text(lang === "id" ? "Pindai untuk verifikasi" : "Scan to verify", W / 2, qrY + qrSize + 4, { align: "center" });
  } catch {
    // QR is a nice-to-have; never block certificate generation on it
  }

  // bottom note
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(T.note, W / 2, H - 16, { align: "center" });

  // ----- save -----
  const safe = (name || "peserta").replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_|_$/g, "");
  doc.save(`Cognia_Certificate_${safe}.pdf`);

  return { certNo, tier, timestamp: ts.iso, verifyUrl, payload };
}
