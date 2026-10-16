"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

// Tracks the learner's journey locally (localStorage) — no backend needed.
// State shape:
//   {
//     done: { [key]: ISODate },   // completed items, key = "topic:ml" / "demo:knn" / "quiz:llm/ner"
//     xp: number,                 // experience points
//     last: { href, label } | null, // most recent place (for "Continue learning")
//     streak: { count, lastDay }, // consecutive-day study streak
//   }
// XP awarded per completion type. Marking the same key again is idempotent.

const KEY = "cognia_progress_v1";
const XP = { topic: 20, demo: 15, quiz: 30, module: 25, cert: 100 };

const ProgressContext = createContext(null);

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function load() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

const EMPTY = { done: {}, xp: 0, last: null, streak: { count: 0, lastDay: null } };

export function ProgressProvider({ children }) {
  const [state, setState] = useState(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  // hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    const saved = load();
    if (saved) setState({ ...EMPTY, ...saved, streak: { ...EMPTY.streak, ...(saved.streak || {}) } });
    setHydrated(true);
  }, []);

  // persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  // mark an item complete (idempotent). type is used for XP + grouping.
  const complete = useCallback((key, type = "demo") => {
    setState((s) => {
      if (s.done[key]) return s; // already done -> no double XP
      return { ...s, done: { ...s.done, [key]: new Date().toISOString() }, xp: s.xp + (XP[type] || 10) };
    });
  }, []);

  // record the most recent place the learner visited (for "Continue learning")
  const visit = useCallback((href, label) => {
    if (!href) return;
    setState((s) => {
      // update daily streak on any visit
      const today = todayStr();
      let streak = s.streak || { count: 0, lastDay: null };
      if (streak.lastDay !== today) {
        const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        streak = { count: streak.lastDay === y ? streak.count + 1 : 1, lastDay: today };
      }
      return { ...s, last: { href, label: label || href }, streak };
    });
  }, []);

  const isDone = useCallback((key) => Boolean(state.done[key]), [state.done]);

  const reset = useCallback(() => setState(EMPTY), []);

  const value = {
    hydrated,
    done: state.done,
    xp: state.xp,
    last: state.last,
    streak: state.streak,
    doneCount: Object.keys(state.done).length,
    complete,
    visit,
    isDone,
    reset,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  // safe no-op fallback if used outside provider (shouldn't happen)
  if (!ctx) {
    return {
      hydrated: false, done: {}, xp: 0, last: null, streak: { count: 0 }, doneCount: 0,
      complete: () => {}, visit: () => {}, isDone: () => false, reset: () => {},
    };
  }
  return ctx;
}

// Level helpers: simple XP curve (100 XP per level).
export function levelFromXp(xp) {
  const level = Math.floor(xp / 100) + 1;
  const into = xp % 100;
  return { level, into, next: 100, pct: into };
}
