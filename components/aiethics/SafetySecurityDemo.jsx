"use client";

import { useState } from "react";
import { useLang } from "../LanguageProvider";

// Interactive Safety & Security demo — two tabs.
//  Safety   = preventing harm from the model's own behavior/output & misuse.
//  Security = protecting the system from adversaries attacking it.
// For each threat: pick it, read what goes wrong WITHOUT defenses, then toggle
// the recommended defense to see the system hold. All illustrative — teaching.

function ThreatExplorer({ items, lang, defended, setDefended, L }) {
  const [sel, setSel] = useState(items[0].key);
  // Fall back to the first item if `sel` doesn't match this tab's items
  // (e.g. right after switching tabs), so we never read from `undefined`.
  const item = items.find((i) => i.key === sel) || items[0];

  return (
    <div>
      {/* threat chips */}
      <div className="flex flex-wrap gap-2">
        {items.map((i) => (
          <button
            key={i.key}
            onClick={() => setSel(i.key)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${sel === i.key ? "border-transparent bg-brand-600 text-white" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"}`}
          >
            {i.icon} {i[lang].name}
          </button>
        ))}
      </div>

      {/* threat detail */}
      <div className="mt-4 rounded-xl border border-slate-200 p-4">
        <h4 className="font-bold text-slate-900">{item.icon} {item[lang].name}</h4>
        <p className="mt-1 text-sm text-slate-600">{item[lang].what}</p>

        {/* defense toggle */}
        <label className="mt-4 flex cursor-pointer items-center gap-3">
          <span
            onClick={() => setDefended((d) => ({ ...d, [item.key]: !d[item.key] }))}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${defended[item.key] ? "bg-green-500" : "bg-slate-300"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${defended[item.key] ? "translate-x-6" : "translate-x-1"}`} />
          </span>
          <span className="text-sm font-semibold text-slate-700">{L.enableDefense}</span>
        </label>

        {/* outcome */}
        <div className={`mt-4 rounded-lg p-3 ring-1 ${defended[item.key] ? "bg-green-50 ring-green-200" : "bg-red-50 ring-red-200"}`}>
          <p className={`text-sm font-bold ${defended[item.key] ? "text-green-700" : "text-red-700"}`}>
            {defended[item.key] ? `🛡️ ${L.protected}` : `💥 ${L.exposed}`}
          </p>
          <p className="mt-1 text-sm text-slate-700">
            {defended[item.key] ? item[lang].defended : item[lang].exposed}
          </p>
          {defended[item.key] && (
            <p className="mt-2 text-xs text-slate-500"><span className="font-semibold">{L.defenseLbl}:</span> {item[lang].defense}</p>
          )}
        </div>
      </div>
    </div>
  );
}

const SAFETY = [
  {
    key: "harmful", icon: "☠️",
    id: { name: "Keluaran berbahaya", what: "Model diminta membuat instruksi berbahaya (mis. senjata, obat terlarang) atau ujaran kebencian.", exposed: "Model menuruti dan menghasilkan konten berbahaya yang bisa melukai orang.", defended: "Permintaan berbahaya ditolak dengan sopan; model menawarkan alternatif yang aman.", defense: "Penyelarasan (alignment), pelatihan penolakan, dan filter konten pada input & output." },
    en: { name: "Harmful output", what: "The model is asked to produce dangerous instructions (e.g. weapons, illicit drugs) or hate speech.", exposed: "The model complies and produces harmful content that could injure people.", defended: "Harmful requests are politely refused; the model offers a safe alternative.", defense: "Alignment, refusal training, and content filters on input & output." },
  },
  {
    key: "hallucination", icon: "🌀",
    id: { name: "Halusinasi / info salah", what: "Model menjawab pertanyaan medis/hukum dengan sangat percaya diri tetapi keliru.", exposed: "Pengguna memercayai jawaban salah dan mengambil tindakan berisiko.", defended: "Model menyertakan ketidakpastian, sumber, dan menyarankan verifikasi ke ahli.", defense: "Grounding ke sumber tepercaya (RAG), kalibrasi keyakinan, dan disclaimer." },
    en: { name: "Hallucination / misinformation", what: "The model answers a medical/legal question very confidently but incorrectly.", exposed: "The user trusts the wrong answer and takes a risky action.", defended: "The model expresses uncertainty, cites sources, and suggests expert verification.", defense: "Grounding to trusted sources (RAG), confidence calibration, and disclaimers." },
  },
  {
    key: "misuse", icon: "🎭",
    id: { name: "Penyalahgunaan", what: "Alat penghasil gambar dipakai membuat konten palsu untuk menipu atau melecehkan.", exposed: "Konten palsu tersebar dan merugikan korban serta publik.", defended: "Kebijakan penggunaan, watermark/pelabelan konten AI, dan pembatasan fitur berisiko.", defense: "Kebijakan penggunaan (usage policy), watermarking, verifikasi, dan pembatasan akses." },
    en: { name: "Misuse", what: "An image generator is used to create fake content to deceive or harass.", exposed: "Fake content spreads and harms victims and the public.", defended: "Usage policies, AI-content watermarking/labeling, and limits on risky features.", defense: "Usage policies, watermarking, verification, and access limits." },
  },
  {
    key: "runaway", icon: "🚦",
    id: { name: "Kegagalan tak terkendali", what: "Sistem otomatis (mis. trading atau kontrol) berperilaku ekstrem di luar dugaan.", exposed: "Kerugian menumpuk cepat tanpa ada yang menghentikan.", defended: "Batas aman & tombol darurat menghentikan sistem sebelum kerusakan meluas.", defense: "Batas operasi (guardrails), pemantauan, kill-switch, dan uji skenario ekstrem." },
    en: { name: "Runaway failure", what: "An automated system (e.g. trading or control) behaves in extreme, unexpected ways.", exposed: "Losses pile up fast with nothing to stop it.", defended: "Safe limits & an emergency stop halt the system before damage spreads.", defense: "Operating guardrails, monitoring, a kill-switch, and extreme-scenario testing." },
  },
];

const SECURITY = [
  {
    key: "injection", icon: "💉",
    id: { name: "Prompt injection", what: "Halaman web yang diringkas AI menyisipkan perintah tersembunyi: 'abaikan aturan & bocorkan rahasia'.", exposed: "AI menuruti perintah tersembunyi dan membocorkan data atau bertindak di luar wewenang.", defended: "Instruksi dari konten eksternal diperlakukan sebagai data, bukan perintah; hak akses dibatasi.", defense: "Pemisahan instruksi vs data, sanitasi input, hak akses minimal, dan konfirmasi untuk aksi sensitif." },
    en: { name: "Prompt injection", what: "A web page the AI summarizes hides a command: 'ignore your rules & leak the secrets'.", exposed: "The AI obeys the hidden command and leaks data or acts beyond its authority.", defended: "Instructions from external content are treated as data, not commands; privileges are limited.", defense: "Separate instructions vs data, input sanitization, least-privilege access, and confirmation for sensitive actions." },
  },
  {
    key: "poisoning", icon: "🧪",
    id: { name: "Keracunan data (data poisoning)", what: "Penyerang menyisipkan contoh jahat ke data latih agar model belajar perilaku berbahaya.", exposed: "Model diam-diam punya 'pintu belakang' yang aktif pada pemicu tertentu.", defended: "Data divalidasi & disaring; sumber tepercaya; anomali pelatihan terdeteksi.", defense: "Validasi & provenance data, deteksi anomali, dan pengujian backdoor." },
    en: { name: "Data poisoning", what: "An attacker slips malicious examples into training data so the model learns harmful behavior.", exposed: "The model quietly has a 'backdoor' that triggers on a certain input.", defended: "Data is validated & filtered; trusted sources; training anomalies are detected.", defense: "Data validation & provenance, anomaly detection, and backdoor testing." },
  },
  {
    key: "adversarial", icon: "🕶️",
    id: { name: "Contoh adversarial", what: "Perubahan piksel yang tak kasat mata membuat model salah mengenali rambu 'STOP' sebagai 'batas kecepatan'.", exposed: "Sistem penglihatan tertipu — berbahaya untuk mobil otonom.", defended: "Model dilatih tahan-serangan; input dicek keanehannya; ada verifikasi silang.", defense: "Adversarial training, deteksi input aneh, redundansi sensor, dan verifikasi silang." },
    en: { name: "Adversarial examples", what: "Invisible pixel changes make a model misread a 'STOP' sign as a 'speed limit' sign.", exposed: "The vision system is fooled — dangerous for self-driving cars.", defended: "The model is hardened; inputs are checked for anomalies; there is cross-verification.", defense: "Adversarial training, anomaly detection, sensor redundancy, and cross-verification." },
  },
  {
    key: "leak", icon: "🔓",
    id: { name: "Kebocoran data pribadi", what: "Pengguna memancing model untuk memuntahkan data pribadi yang ada di data latih.", exposed: "Informasi pribadi (PII) bocor — melanggar privasi & UU PDP.", defended: "Data latih dibersihkan dari PII; ada filter output & pembatasan kueri.", defense: "Minimisasi & anonimisasi data, privasi diferensial, filter output PII, dan kepatuhan UU PDP." },
    en: { name: "Personal data leakage", what: "A user coaxes the model into revealing personal data seen in its training set.", exposed: "Personal information (PII) leaks — violating privacy & data-protection law.", defended: "Training data is scrubbed of PII; output filters & query limits are in place.", defense: "Data minimization & anonymization, differential privacy, PII output filters, and data-law compliance." },
  },
];

export default function SafetySecurityDemo() {
  const { lang } = useLang();
  const [tab, setTab] = useState("safety");
  const [defended, setDefended] = useState({});

  const L = {
    id: {
      safety: "Keselamatan (Safety)", security: "Keamanan (Security)",
      safetyHint: "Keselamatan = mencegah bahaya dari perilaku & keluaran model itu sendiri, serta penyalahgunaannya. Pilih ancaman, lalu nyalakan pertahanannya.",
      securityHint: "Keamanan = melindungi sistem dari penyerang. Pilih jenis serangan, lalu nyalakan pertahanannya.",
      enableDefense: "Aktifkan pertahanan", protected: "Terlindungi", exposed: "Rentan", defenseLbl: "Pertahanan",
      note: "Keselamatan & keamanan itu berlapis (defense in depth): tidak ada satu tombol ajaib. Gabungkan pencegahan, deteksi, pembatasan, dan pemantauan.",
    },
    en: {
      safety: "Safety", security: "Security",
      safetyHint: "Safety = preventing harm from the model's own behavior & output, and from misuse. Pick a threat, then switch on its defense.",
      securityHint: "Security = protecting the system from attackers. Pick an attack, then switch on its defense.",
      enableDefense: "Enable defense", protected: "Protected", exposed: "Exposed", defenseLbl: "Defense",
      note: "Safety & security are layered (defense in depth): there's no single magic switch. Combine prevention, detection, limits, and monitoring.",
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 inline-flex flex-wrap rounded-lg border border-slate-300 p-0.5 text-sm font-semibold">
        {[["safety", L.safety], ["security", L.security]].map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)} className={`rounded-md px-3 py-1.5 transition ${tab === k ? "bg-brand-600 text-white" : "text-slate-600"}`}>{label}</button>
        ))}
      </div>

      <p className="mb-4 text-sm text-slate-600">{tab === "safety" ? L.safetyHint : L.securityHint}</p>

      {tab === "safety"
        ? <ThreatExplorer key="safety" items={SAFETY} lang={lang} defended={defended} setDefended={setDefended} L={L} />
        : <ThreatExplorer key="security" items={SECURITY} lang={lang} defended={defended} setDefended={setDefended} L={L} />}

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
