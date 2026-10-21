"use client";

// Firebase client for the live quiz (Realtime Database).
// Config is PUBLIC by design (client SDK). Security is enforced via DB rules,
// not by hiding these keys. Analytics is intentionally NOT initialized
// (not needed, and it breaks static export / SSR).

import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDDD6CwJCNUVfKOHQHVrqEHCIvV4C6foIU",
  authDomain: "cognia-live-quiz.firebaseapp.com",
  databaseURL:
    "https://cognia-live-quiz-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cognia-live-quiz",
  storageBucket: "cognia-live-quiz.firebasestorage.app",
  messagingSenderId: "438272559363",
  appId: "1:438272559363:web:40d299a3d231dd2442c136",
};

// Avoid re-initializing during fast-refresh / multiple imports.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getDatabase(app);
export default app;
