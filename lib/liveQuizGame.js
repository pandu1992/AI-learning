// Shared constants + pure helpers for the Firebase-backed live quiz.
// No React / no Firebase imports here so it can be unit-tested in plain Node.

export const QUESTION_SECONDS = 25;
export const BASE_POINTS = 1000;

// Kahoot-like answer colors/shapes (index 0..3)
export const OPT = [
  { bg: "#e4002b", shape: "▲" },
  { bg: "#0093D0", shape: "◆" },
  { bg: "#F5A200", shape: "●" },
  { bg: "#16a34a", shape: "■" },
];

// 6-digit numeric game PIN (as string, leading zeros allowed).
export function makePin() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// Score for one answer.
//   - wrong / no answer  -> 0
//   - correct            -> 50% base + speed bonus (up to 100% base)
// elapsedMs = answeredAt - questionStartAt (clamped to [0, limit]).
export function scoreAnswer({ correct, elapsedMs, limitMs = QUESTION_SECONDS * 1000, base = BASE_POINTS }) {
  if (!correct) return 0;
  const e = Math.max(0, Math.min(elapsedMs, limitMs));
  const fractionLeft = 1 - e / limitMs; // 1.0 instant .. 0.0 at buzzer
  const speedBonus = Math.round(fractionLeft * base);
  return Math.round(base * 0.5) + speedBonus;
}

// DB paths (one game per PIN).
export const paths = {
  game: (pin) => `games/${pin}`,
  meta: (pin) => `games/${pin}/meta`,
  players: (pin) => `games/${pin}/players`,
  player: (pin, pid) => `games/${pin}/players/${pid}`,
  answers: (pin, qIndex) => `games/${pin}/answers/${qIndex}`,
  answer: (pin, qIndex, pid) => `games/${pin}/answers/${qIndex}/${pid}`,
};

// Normalize a Firebase object map ({id: {...}}) into a sorted array.
export function playersToRanked(playersObj) {
  const arr = Object.entries(playersObj || {}).map(([id, p]) => ({ id, ...p }));
  arr.sort((a, b) => (b.score || 0) - (a.score || 0) || (a.name || "").localeCompare(b.name || ""));
  return arr;
}
