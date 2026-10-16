"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

// Dark/light theme. Adds/removes the `dark` class on <html>, persists the choice
// to localStorage, and falls back to the OS preference on first visit.
const KEY = "cognia_theme";
const ThemeContext = createContext({ theme: "light", toggle: () => {}, ready: false });

function apply(theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let initial = "light";
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === "dark" || saved === "light") initial = saved;
      else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) initial = "dark";
    } catch {}
    setTheme(initial);
    apply(initial);
    setReady(true);
  }, []);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      apply(next);
      try { window.localStorage.setItem(KEY, next); } catch {}
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle, ready }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
