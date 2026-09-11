"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext({ lang: "id", setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("id");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("lang") : null;
    if (saved === "id" || saved === "en") setLang(saved);
  }, []);

  const update = (value) => {
    setLang(value);
    if (typeof window !== "undefined") window.localStorage.setItem("lang", value);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: update }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

// Helper: pick a localized string, falling back to Indonesian.
export function t(obj, lang) {
  if (!obj) return "";
  return obj[lang] ?? obj.id ?? "";
}
