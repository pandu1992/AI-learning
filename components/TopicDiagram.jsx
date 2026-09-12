"use client";

import { useLang } from "./LanguageProvider";

// Lightweight inline-SVG illustrations, one per topic. No external assets, so
// they load instantly and scale crisply on projectors. Each diagram has a
// bilingual caption. Exported as a map keyed by topic slug.

const C = {
  brand: "#0093D0",
  brandLight: "#cceefa",
  slate: "#334155",
  slateLight: "#e2e8f0",
  green: "#059669",
  red: "#dc2626",
  amber: "#d97706",
  purple: "#7c3aed",
};

function Box({ x, y, w, h, fill, stroke, label, sub, textFill = "#fff", rx = 8 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeWidth="1.5" />
      <text x={x + w / 2} y={y + h / 2 + (sub ? -4 : 4)} textAnchor="middle" fontSize="13" fontWeight="700" fill={textFill}>
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fontSize="9" fill={textFill} opacity="0.85">
          {sub}
        </text>
      )}
    </g>
  );
}

// ---------------- AI Overview: nested hierarchy ----------------
function AiOverviewDiagram({ lang }) {
  const t = {
    id: { ai: "Artificial Intelligence", ml: "Machine Learning", dl: "Deep Learning", llm: "LLM" },
    en: { ai: "Artificial Intelligence", ml: "Machine Learning", dl: "Deep Learning", llm: "LLM" },
  }[lang];
  return (
    <svg viewBox="0 0 440 260" className="w-full" role="img">
      <rect x="10" y="10" width="420" height="240" rx="16" fill={C.brandLight} stroke={C.brand} strokeWidth="1.5" />
      <text x="30" y="34" fontSize="13" fontWeight="800" fill={C.brand}>{t.ai}</text>
      <rect x="40" y="46" width="360" height="184" rx="14" fill="#e6f6fc" stroke={C.brand} strokeWidth="1.5" opacity="0.9" />
      <text x="60" y="68" fontSize="12" fontWeight="800" fill="#007cb0">{t.ml}</text>
      <rect x="70" y="80" width="300" height="130" rx="12" fill="#99ddf4" stroke={C.brand} strokeWidth="1.5" />
      <text x="90" y="102" fontSize="12" fontWeight="800" fill="#00354d">{t.dl}</text>
      <rect x="100" y="116" width="240" height="76" rx="10" fill={C.brand} />
      <text x="220" y="158" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">{t.llm}</text>
    </svg>
  );
}

// ---------------- Machine Learning: supervised vs unsupervised ----------------
function MachineLearningDiagram({ lang }) {
  const t = {
    id: { sup: "Supervised", supSub: "data berlabel", unsup: "Unsupervised", unsupSub: "tanpa label", cls: "Klasifikasi/Regresi", clu: "Clustering" },
    en: { sup: "Supervised", supSub: "labeled data", unsup: "Unsupervised", unsupSub: "no labels", cls: "Classification/Regression", clu: "Clustering" },
  }[lang];
  return (
    <svg viewBox="0 0 440 220" className="w-full" role="img">
      {/* supervised branch */}
      <Box x={30} y={20} w={170} h={44} fill={C.brand} stroke={C.brand} label={t.sup} sub={t.supSub} />
      <line x1="115" y1="64" x2="115" y2="96" stroke={C.slate} strokeWidth="1.5" />
      <Box x={40} y={96} w={150} h={40} fill="#fff" stroke={C.brand} label={t.cls} textFill={C.slate} />
      {/* labeled points */}
      <circle cx="70" cy="170" r="7" fill={C.brand} /><circle cx="95" cy="185" r="7" fill={C.brand} />
      <circle cx="140" cy="165" r="7" fill={C.red} /><circle cx="165" cy="182" r="7" fill={C.red} />
      <line x1="55" y1="195" x2="180" y2="150" stroke={C.slate} strokeDasharray="4 3" strokeWidth="1.5" />

      {/* unsupervised branch */}
      <Box x={240} y={20} w={170} h={44} fill={C.green} stroke={C.green} label={t.unsup} sub={t.unsupSub} />
      <line x1="325" y1="64" x2="325" y2="96" stroke={C.slate} strokeWidth="1.5" />
      <Box x={250} y={96} w={150} h={40} fill="#fff" stroke={C.green} label={t.clu} textFill={C.slate} />
      {/* clusters */}
      <circle cx="285" cy="168" r="7" fill={C.green} /><circle cx="300" cy="183" r="7" fill={C.green} /><circle cx="278" cy="185" r="7" fill={C.green} />
      <circle cx="360" cy="170" r="7" fill={C.amber} /><circle cx="375" cy="184" r="7" fill={C.amber} />
      <ellipse cx="288" cy="178" rx="24" ry="18" fill="none" stroke={C.green} strokeDasharray="3 3" />
      <ellipse cx="367" cy="177" rx="20" ry="15" fill="none" stroke={C.amber} strokeDasharray="3 3" />
    </svg>
  );
}

// ---------------- Deep Learning: neural network + CNN pipeline ----------------
function DeepLearningDiagram({ lang }) {
  const t = {
    id: { in: "Input", h1: "Tersembunyi", out: "Output", img: "Gambar", conv: "Konvolusi", pool: "Pooling", pred: "Prediksi" },
    en: { in: "Input", h1: "Hidden", out: "Output", img: "Image", conv: "Convolution", pool: "Pooling", pred: "Prediction" },
  }[lang];
  const layers = [
    { x: 40, n: 3, color: C.slate },
    { x: 150, n: 4, color: C.brand },
    { x: 260, n: 4, color: C.brand },
    { x: 370, n: 2, color: C.green },
  ];
  const nodeY = (n, i) => 40 + (i * 120) / (n - 1 || 1);
  return (
    <svg viewBox="0 0 440 220" className="w-full" role="img">
      {/* connections */}
      {layers.slice(0, -1).map((L, li) => {
        const next = layers[li + 1];
        return L === undefined ? null : Array.from({ length: L.n }).flatMap((_, i) =>
          Array.from({ length: next.n }).map((__, j) => (
            <line key={`${li}-${i}-${j}`} x1={L.x} y1={nodeY(L.n, i)} x2={next.x} y2={nodeY(next.n, j)} stroke={C.slateLight} strokeWidth="1" />
          ))
        );
      })}
      {/* nodes */}
      {layers.map((L, li) =>
        Array.from({ length: L.n }).map((_, i) => (
          <circle key={`${li}-${i}`} cx={L.x} cy={nodeY(L.n, i)} r="10" fill={L.color} />
        ))
      )}
      <text x="40" y="185" textAnchor="middle" fontSize="10" fill={C.slate}>{t.in}</text>
      <text x="205" y="185" textAnchor="middle" fontSize="10" fill={C.brand}>{t.h1}</text>
      <text x="370" y="185" textAnchor="middle" fontSize="10" fill={C.green}>{t.out}</text>
    </svg>
  );
}

// ---------------- RL: agent-environment loop ----------------
function ReinforcementDiagram({ lang }) {
  const t = {
    id: { agent: "Agen", env: "Lingkungan", action: "Aksi", reward: "Reward + State" },
    en: { agent: "Agent", env: "Environment", action: "Action", reward: "Reward + State" },
  }[lang];
  return (
    <svg viewBox="0 0 440 220" className="w-full" role="img">
      <Box x={50} y={80} w={130} h={56} fill={C.brand} stroke={C.brand} label={t.agent} rx={12} />
      <Box x={260} y={80} w={130} h={56} fill={C.green} stroke={C.green} label={t.env} rx={12} />
      {/* action arrow (top) */}
      <path d="M180 96 C 220 60, 220 60, 260 96" fill="none" stroke={C.slate} strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="220" y="52" textAnchor="middle" fontSize="11" fontWeight="700" fill={C.slate}>{t.action}</text>
      {/* reward/state arrow (bottom) */}
      <path d="M260 120 C 220 156, 220 156, 180 120" fill="none" stroke={C.amber} strokeWidth="2" markerEnd="url(#arrowAmber)" />
      <text x="220" y="178" textAnchor="middle" fontSize="11" fontWeight="700" fill={C.amber}>{t.reward}</text>
      <defs>
        <marker id="arrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.slate} /></marker>
        <marker id="arrowAmber" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.amber} /></marker>
      </defs>
    </svg>
  );
}

// ---------------- LLM: token -> transformer -> next token ----------------
function LlmDiagram({ lang }) {
  const t = {
    id: { tokens: "Token", tf: "Transformer (Self-Attention)", next: "Prediksi token berikutnya" },
    en: { tokens: "Tokens", tf: "Transformer (Self-Attention)", next: "Predict next token" },
  }[lang];
  const toks = lang === "id" ? ["Saya", "suka", "belajar"] : ["I", "love", "to", "learn"];
  return (
    <svg viewBox="0 0 440 220" className="w-full" role="img">
      {toks.map((tok, i) => {
        const w = 74;
        const gap = (440 - toks.length * w) / (toks.length + 1);
        const x = gap + i * (w + gap);
        return (
          <g key={i}>
            <rect x={x} y={20} width={w} height={30} rx={6} fill="#e6f6fc" stroke={C.brand} />
            <text x={x + w / 2} y={40} textAnchor="middle" fontSize="11" fontWeight="700" fill="#007cb0">{tok}</text>
            <line x1={x + w / 2} y1={50} x2={220} y2={86} stroke={C.slateLight} strokeWidth="1" />
          </g>
        );
      })}
      <rect x="70" y="88" width="300" height="52" rx="12" fill={C.purple} />
      <text x="220" y="118" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">{t.tf}</text>
      <line x1="220" y1="140" x2="220" y2="168" stroke={C.slate} strokeWidth="2" markerEnd="url(#arrowLlm)" />
      <rect x="120" y="172" width="200" height="34" rx="8" fill={C.green} />
      <text x="220" y="194" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{t.next}</text>
      <defs>
        <marker id="arrowLlm" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.slate} /></marker>
      </defs>
    </svg>
  );
}

const DIAGRAMS = {
  "ai-overview": { Comp: AiOverviewDiagram, caption: { id: "AI adalah payung terbesar; ML, Deep Learning, dan LLM adalah lapisan di dalamnya.", en: "AI is the biggest umbrella; ML, Deep Learning, and LLMs are layers within it." } },
  "machine-learning": { Comp: MachineLearningDiagram, caption: { id: "Dua cara utama belajar: dengan label (supervised) dan tanpa label (unsupervised).", en: "Two main ways to learn: with labels (supervised) and without (unsupervised)." } },
  "deep-learning": { Comp: DeepLearningDiagram, caption: { id: "Jaringan saraf berlapis: informasi mengalir dari input, melalui lapisan tersembunyi, ke output.", en: "A layered neural network: information flows from input, through hidden layers, to output." } },
  "reinforcement-learning": { Comp: ReinforcementDiagram, caption: { id: "Siklus RL: agen mengambil aksi, lingkungan membalas dengan reward dan state baru.", en: "The RL loop: the agent takes an action, the environment responds with a reward and a new state." } },
  llm: { Comp: LlmDiagram, caption: { id: "LLM memproses token melalui Transformer untuk memprediksi token berikutnya.", en: "An LLM processes tokens through a Transformer to predict the next token." } },
};

export default function TopicDiagram({ slug }) {
  const { lang } = useLang();
  const entry = DIAGRAMS[slug];
  if (!entry) return null;
  const { Comp, caption } = entry;
  return (
    <figure className="my-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <Comp lang={lang} />
      <figcaption className="mt-3 text-center text-sm text-slate-500">{caption[lang]}</figcaption>
    </figure>
  );
}
