// Per-topic / per-page immersive visual themes. Each theme gives a page its
// own "personality": a hero gradient (Tailwind classes), a particle palette
// for NeuralCanvas, aurora blob colors, and an accent used for links/orb.
//
// Colors are plain hex / rgb tuples so they can feed the 2D canvas directly.
// `gradient` is a Tailwind class string for the hero background.

export const immersiveThemes = {
  // ---- curriculum topics ----
  "ai-overview": {
    gradient: "from-sky-600 via-brand-700 to-indigo-900",
    nodes: ["#38bdf8", "#0093D0", "#818cf8", "#a5b4fc"],
    link: [56, 189, 248], // sky
    accent: [129, 140, 248], // indigo
    orb: [165, 180, 252],
    eyebrow: { id: "Pengantar · Peta besar AI", en: "Overview · The big map of AI" },
  },
  "machine-learning": {
    gradient: "from-emerald-600 via-teal-700 to-brand-900",
    nodes: ["#34d399", "#10b981", "#2dd4bf", "#5eead4"],
    link: [52, 211, 153], // emerald
    accent: [20, 184, 166], // teal
    orb: [110, 231, 183],
    eyebrow: { id: "Belajar pola dari data", en: "Learning patterns from data" },
  },
  "deep-learning": {
    gradient: "from-fuchsia-600 via-purple-700 to-brand-900",
    nodes: ["#e879f9", "#c026d3", "#a855f7", "#f0abfc"],
    link: [232, 121, 249], // fuchsia
    accent: [168, 85, 247], // purple
    orb: [240, 171, 252],
    eyebrow: { id: "Neural network berlapis", en: "Many-layered neural networks" },
  },
  "reinforcement-learning": {
    gradient: "from-amber-500 via-orange-600 to-rose-800",
    nodes: ["#fbbf24", "#f59e0b", "#fb923c", "#fcd34d"],
    link: [251, 191, 36], // amber
    accent: [249, 115, 22], // orange
    orb: [253, 211, 77],
    eyebrow: { id: "Belajar dari reward & hukuman", en: "Learning from rewards & penalties" },
  },
  llm: {
    gradient: "from-violet-600 via-indigo-700 to-brand-900",
    nodes: ["#a78bfa", "#8b5cf6", "#6366f1", "#c4b5fd"],
    link: [167, 139, 250], // violet
    accent: [99, 102, 241], // indigo
    orb: [196, 181, 253],
    eyebrow: { id: "Model bahasa raksasa seperti GPT", en: "Giant language models like GPT" },
  },
  "ai-ethics": {
    gradient: "from-slate-600 via-brand-800 to-slate-900",
    nodes: ["#38bdf8", "#f5a200", "#e4002b", "#94a3b8"],
    link: [148, 163, 184], // slate
    accent: [245, 162, 0], // binus orange
    orb: [203, 213, 225],
    eyebrow: { id: "AI yang bertanggung jawab", en: "Responsible AI" },
  },

  // ---- standalone pages ----
  demos: {
    gradient: "from-cyan-600 via-brand-700 to-indigo-900",
    nodes: ["#22d3ee", "#0093D0", "#38bdf8", "#67e8f9"],
    link: [34, 211, 238],
    accent: [245, 162, 0],
    orb: [103, 232, 249],
    eyebrow: { id: "Main langsung di browser", en: "Play right in your browser" },
  },
  certification: {
    gradient: "from-amber-500 via-brand-700 to-brand-900",
    nodes: ["#fbbf24", "#0093D0", "#f5a200", "#fcd34d"],
    link: [245, 162, 0], // gold
    accent: [0, 147, 208], // brand blue
    orb: [253, 224, 150],
    eyebrow: { id: "Buktikan penguasaanmu", en: "Prove your mastery" },
  },
};

// Default (brand blue) theme, matching the original look.
export const defaultTheme = {
  gradient: "from-brand-600 via-brand-700 to-brand-900",
  nodes: ["#33b3e4", "#0093D0", "#F5A200", "#66cbef"],
  link: [51, 179, 228],
  accent: [245, 162, 0],
  orb: [102, 203, 239],
  eyebrow: { id: "", en: "" },
};

export function getTheme(key) {
  return immersiveThemes[key] || defaultTheme;
}
