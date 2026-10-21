"use client";

// Thin React hooks over Firebase Realtime Database for the live quiz.
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";

// Subscribe to a DB path and return its live value (or null while loading).
export function useDbValue(path) {
  const [value, setValue] = useState(null);
  useEffect(() => {
    if (!path) return undefined;
    const r = ref(db, path);
    const unsub = onValue(r, (snap) => setValue(snap.val()));
    return () => unsub();
  }, [path]);
  return value;
}
