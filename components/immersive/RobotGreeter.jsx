"use client";

// GIANT interactive AI robot for the HOME hero only (inspired by "eyes follow
// mouse" showpieces). A large humanoid whose whole HEAD turns/tilts toward the
// cursor, whose eyes track the pointer, and who REACTS when the cursor comes
// near (eyes widen, eyebrows raise, it smiles, glow intensifies) and when you
// CLICK (it waves). It greets in 5 languages (ID/ZH/JA/EN/AR) with a
// typewriter effect and optional speech synthesis.
//
// Scroll behavior: as you scroll past the hero, the robot smoothly SHRINKS and
// docks into a floating "assistant" in the bottom-right corner, where it keeps
// watching the cursor.
//
// Motion policy: this robot is the home showpiece, so its own animation keeps
// running even when the OS prefers-reduced-motion is on (otherwise it looked
// frozen on desktops with "reduce animations"). Users who truly want it still
// can pause it with the ⏸ button. The rest of the site still respects
// reduced-motion — only this decorative mascot opts in via `robot-force-motion`.

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

const GREETINGS = [
  { code: "id", label: "Indonesia", text: "Halo, apa kabar?", lang: "id-ID", rtl: false, costume: "id" },
  { code: "zh", label: "中文", text: "你好，你好吗？", lang: "zh-CN", rtl: false, costume: "zh" },
  { code: "ja", label: "日本語", text: "こんにちは、お元気ですか？", lang: "ja-JP", rtl: false, costume: "ja" },
  { code: "en", label: "English", text: "Hello, how are you?", lang: "en-US", rtl: false, costume: "en" },
  { code: "ar", label: "العربية", text: "مرحبا، كيف حالك؟", lang: "ar-SA", rtl: true, costume: "ar" },
];

// Accurate country flags via Twemoji SVG assets rendered as <img>. Native flag
// emojis (🇮🇩 etc.) don't render on many desktop browsers (esp. Windows, which
// ships no flag-emoji font), and hand-drawn CSS flags were inaccurate. Twemoji
// gives the correct official flag artwork, identical on every OS, from a CDN
// (no bundled dependency). Each code maps to its ISO 3166 regional-indicator
// codepoints. If the image ever fails to load, we fall back to the native
// emoji so there's always something.
const TWEMOJI_BASE = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg";
const FLAG = {
  id: { hex: "1f1ee-1f1e9", emoji: "🇮🇩", alt: "Bendera Indonesia" },
  zh: { hex: "1f1e8-1f1f3", emoji: "🇨🇳", alt: "中国国旗" },
  ja: { hex: "1f1ef-1f1f5", emoji: "🇯🇵", alt: "日本の国旗" },
  en: { hex: "1f1ec-1f1e7", emoji: "🇬🇧", alt: "United Kingdom flag" },
  ar: { hex: "1f1f8-1f1e6", emoji: "🇸🇦", alt: "علم المملكة العربية السعودية" },
};
function FlagChip({ code }) {
  const f = FLAG[code];
  if (!f) return null;
  return (
    <img
      src={`${TWEMOJI_BASE}/${f.hex}.svg`}
      alt={f.alt}
      width={22}
      height={16}
      loading="eager"
      className="inline-block h-4 w-[22px] shrink-0 rounded-[2px] align-[-3px] shadow-sm"
      onError={(e) => {
        // graceful fallback to the native emoji character
        const span = document.createElement("span");
        span.textContent = f.emoji;
        span.style.fontSize = "16px";
        e.currentTarget.replaceWith(span);
      }}
    />
  );
}

// Per-language costume worn on the robot's HEAD, so the robot "dresses up" for
// each culture as it greets. Pure SVG (no assets). Each returns head-gear drawn
// in the head's local coordinate space (head shell spans x:96..264, y:62..212).
// Costumes are drawn to hug the new humanoid dome. The cranium top arcs from
// about (104,150) up to (180,56) and down to (256,150); hats sit on that dome
// (~y 52–96) and curve with it so they look worn, not floating.
function Costume({ code }) {
  switch (code) {
    case "id": // Indonesia — blangkon (Javanese cap), hugs the dome
      return (
        <g aria-hidden="true">
          {/* band wrapping the lower dome */}
          <path d="M108 112 Q180 78 252 112 Q252 92 180 84 Q108 92 108 112 Z" fill="#5b3a1a" />
          {/* crown cap following the dome */}
          <path d="M116 92 Q180 48 244 92 Q180 70 116 92 Z" fill="#6e451f" />
          <path d="M116 92 Q180 64 244 92 L244 100 Q180 78 116 100 Z" fill="#7a4e22" />
          {/* mondolan knot at back-right */}
          <path d="M226 86 q24 -4 22 16 q-2 14 -18 10 q-12 -4 -4 -26 Z" fill="#8a5a28" />
          <circle cx="236" cy="94" r="4" fill="#F5A200" />
          {/* batik zigzag accent */}
          <path d="M140 96 l7 6 l7 -6 l7 6 l7 -6 l7 6" fill="none" stroke="#F5A200" strokeWidth="2" opacity="0.9" />
        </g>
      );
    case "zh": // China — imperial/scholar hat, seated on the crown
      return (
        <g aria-hidden="true">
          <path d="M124 80 Q180 60 236 80 L236 92 Q180 74 124 92 Z" fill="#b91c1c" />
          <rect x="150" y="52" width="60" height="26" rx="10" fill="#dc2626" />
          <rect x="150" y="48" width="60" height="8" rx="4" fill="#F5A200" />
          <circle cx="180" cy="42" r="6" fill="#fde047" />
        </g>
      );
    case "ja": // Japan — samurai kabuto, bowl hugs the dome + gold crest
      return (
        <g aria-hidden="true">
          <path d="M106 108 Q180 60 254 108 Q254 86 180 80 Q106 86 106 108 Z" fill="#334155" />
          <path d="M112 96 Q180 58 248 96 Q180 74 112 96 Z" fill="#273445" />
          <path d="M112 96 Q180 74 248 96 L248 104 Q180 82 112 104 Z" fill="#1e293b" />
          {/* maedate (crescent crest) */}
          <path d="M164 60 Q180 28 196 60 Q180 46 164 60 Z" fill="#F5A200" />
          {/* fukigaeshi side flares */}
          <path d="M118 104 q-14 8 -10 30" fill="none" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
          <path d="M242 104 q14 8 10 30" fill="none" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
        </g>
      );
    case "en": // UK/English — graduation mortarboard on the crown
      return (
        <g aria-hidden="true">
          <path d="M150 74 Q180 66 210 74 L210 86 Q180 78 150 86 Z" fill="#0b2436" />
          <path d="M122 70 L180 54 L238 70 L180 86 Z" fill="#0b2436" />
          <circle cx="180" cy="70" r="3" fill="#F5A200" />
          <path d="M180 70 Q214 74 214 62" fill="none" stroke="#F5A200" strokeWidth="2" />
          <circle cx="214" cy="62" r="3" fill="#F5A200" />
        </g>
      );
    case "ar": // Arabic — keffiyeh draping over the dome + black agal cord
      return (
        <g aria-hidden="true">
          <path d="M100 104 Q180 56 260 104 L262 128 Q180 92 98 128 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M112 96 Q180 74 248 96 L248 104 Q180 86 112 104 Z" fill="#0b2436" />
          <path d="M112 106 Q180 90 248 106" fill="none" stroke="#334155" strokeWidth="4" />
          {/* side drapes down past the ears */}
          <path d="M104 104 L92 168 M256 104 L268 168" stroke="#e2e8f0" strokeWidth="7" strokeLinecap="round" />
        </g>
      );
    default:
      return null;
  }
}

export default function RobotGreeter({ onLangChange }) {
  const wrapRef = useRef(null);
  const headRef = useRef(null);
  const leftPupil = useRef(null);
  const rightPupil = useRef(null);

  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [talking, setTalking] = useState(false);
  const [near, setNear] = useState(false); // cursor close to the robot
  const [waving, setWaving] = useState(false);
  const [bowing, setBowing] = useState(false); // culture gesture (bow for JA)
  const [speak, setSpeak] = useState(false);
  const [paused, setPaused] = useState(false); // user can stop all motion
  const [docked, setDocked] = useState(false); // shrunk floating assistant on scroll
  const [mounted, setMounted] = useState(false); // client-only (for portal)
  const speakRef = useRef(false);
  const pausedRef = useRef(false);

  useEffect(() => setMounted(true), []);

  // notify parent of the active language so the hero backdrop can follow
  useEffect(() => {
    if (onLangChange) onLangChange(GREETINGS[idx].code);
  }, [idx, onLangChange]);

  // ---- head + eyes track the cursor; detect proximity ----
  useEffect(() => {
    const move = (e) => {
      if (pausedRef.current) return;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.4;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      const isNear = dist < Math.max(r.width, r.height) * 0.9;
      setNear((prev) => (prev !== isNear ? isNear : prev));

      const rotY = Math.max(-16, Math.min(16, dx / 22));
      const rotX = Math.max(-12, Math.min(12, -dy / 26));
      if (headRef.current) {
        headRef.current.style.transform = `perspective(700px) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg)`;
      }

      const ang = Math.atan2(dy, dx);
      const pd = Math.min(7, dist / 55);
      const px = Math.cos(ang) * pd;
      const py = Math.sin(ang) * pd;
      if (leftPupil.current) leftPupil.current.setAttribute("transform", `translate(${px},${py})`);
      if (rightPupil.current) rightPupil.current.setAttribute("transform", `translate(${px},${py})`);
    };
    const leave = () => setNear(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, []);

  // ---- shrink/dock on scroll (rAF-throttled) ----
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setDocked(window.scrollY > 260);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---- greeting cycle + typewriter ----
  useEffect(() => {
    const g = GREETINGS[idx];
    let i = 0;
    let typer, holdTimer, nextTimer;

    setTyped("");
    setTalking(true);
    maybeSpeak(g);
    // culture gesture: bow when greeting in Japanese
    if (g.code === "ja" && !pausedRef.current) {
      setBowing(true);
      setTimeout(() => setBowing(false), 1600);
    }
    typer = setInterval(() => {
      i += 1;
      setTyped(g.text.slice(0, i));
      if (i >= g.text.length) {
        clearInterval(typer);
        setTalking(false);
        holdTimer = setTimeout(() => {
          nextTimer = setTimeout(() => setIdx((n) => (n + 1) % GREETINGS.length), 400);
        }, 1700);
      }
    }, 70);

    return () => {
      clearInterval(typer);
      clearTimeout(holdTimer);
      clearTimeout(nextTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const maybeSpeak = (g) => {
    if (!speakRef.current) return;
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(g.text);
      u.lang = g.lang;
      u.rate = 0.95;
      u.pitch = 1.1;
      const v = synth.getVoices().find((vo) => vo.lang && vo.lang.toLowerCase().startsWith(g.code));
      if (v) u.voice = v;
      synth.speak(u);
    } catch {
      /* ignore */
    }
  };

  const toggleSpeak = () => {
    const next = !speak;
    setSpeak(next);
    speakRef.current = next;
    if (next) maybeSpeak(GREETINGS[idx]);
    else if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  const togglePause = () => {
    const next = !paused;
    setPaused(next);
    pausedRef.current = next;
    // reset head/eyes to neutral when paused
    if (next) {
      if (headRef.current) headRef.current.style.transform = "none";
      if (leftPupil.current) leftPupil.current.setAttribute("transform", "translate(0,0)");
      if (rightPupil.current) rightPupil.current.setAttribute("transform", "translate(0,0)");
      setNear(false);
    }
  };

  const onRobotClick = useCallback(() => {
    if (pausedRef.current) return;
    setWaving(true);
    setTimeout(() => setWaving(false), 1200);
  }, []);

  const g = GREETINGS[idx];
  const expressive = near || talking;
  const forceMotion = !paused; // robot animates even under reduced-motion unless paused

  const content = (
    <div
      ref={wrapRef}
      className={
        docked
          ? "fixed bottom-3 right-3 z-40 flex flex-col items-center transition-all duration-500 ease-out"
          : "relative mx-auto flex w-full max-w-2xl flex-col items-center transition-all duration-500 ease-out"
      }
      onPointerDown={onRobotClick}
    >
      {/* speech bubble (hidden when docked to keep the corner tidy) */}
      <div
        dir={g.rtl ? "rtl" : "ltr"}
        className={`robot-bubble relative z-10 mb-2 min-h-[3.4rem] min-w-[15rem] max-w-sm rounded-2xl bg-white/95 px-6 py-3.5 text-center shadow-2xl ring-1 ring-white/40 ${docked ? "hidden" : ""}`}
      >
        <span className="mr-2 inline-flex items-center">
          <FlagChip code={g.code} />
        </span>
        <span className="text-xl font-extrabold text-brand-800">
          {typed}
          {talking && <span className="robot-caret">▍</span>}
        </span>
        <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white/95" />
      </div>

      {/* GIANT robot — robot-sway drifts the whole body left↔right */}
      <div className={`${forceMotion ? "robot-force-motion" : ""} robot-float relative select-none ${waving ? "robot-happy" : ""} ${bowing ? "robot-bowing" : ""}`}>
       <div className="robot-sway">
        <span
          className={`robot-glow pointer-events-none absolute left-1/2 top-1/3 -z-10 -translate-x-1/2 -translate-y-1/4 ${docked ? "h-[150px] w-[150px]" : "h-[360px] w-[360px]"} ${expressive ? "robot-glow-strong" : ""}`}
          aria-hidden="true"
        />
        <svg
          width="460"
          height="640"
          viewBox="-50 0 460 640"
          className={`robot-breathe w-auto overflow-visible drop-shadow-2xl transition-all duration-500 ${docked ? "h-[210px]" : "h-[420px] sm:h-[480px]"}`}
          aria-label="AI robot assistant"
          role="img"
        >
          <defs>
            {/* soft white-panel shading */}
            <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.55" stopColor="#eaf1f8" />
              <stop offset="1" stopColor="#c9d6e6" />
            </linearGradient>
            <linearGradient id="panelDark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#dfe8f2" />
              <stop offset="1" stopColor="#aebccd" />
            </linearGradient>
            {/* dark glass face */}
            <radialGradient id="face" cx="0.4" cy="0.35" r="0.9">
              <stop offset="0" stopColor="#15324a" />
              <stop offset="1" stopColor="#081521" />
            </radialGradient>
            {/* glowing cyan for neck mesh + accents */}
            <linearGradient id="cyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7fe3ff" />
              <stop offset="1" stopColor="#0ea5e9" />
            </linearGradient>
            {/* hexagonal mesh for the neck */}
            <pattern id="hexmesh" width="18" height="20.8" patternUnits="userSpaceOnUse" patternTransform="scale(0.7)">
              <path d="M9 0 L18 5.2 L18 15.6 L9 20.8 L0 15.6 L0 5.2 Z" fill="none" stroke="#2bb6e0" strokeWidth="1.1" opacity="0.7" />
            </pattern>
            {/* continuous neck column: from under the chin (y~206) down into the
                collar (y~336) so there is no floating gap */}
            <clipPath id="neckclip">
              <path d="M150 206 q30 12 60 0 l10 128 q-40 16 -80 0 Z" />
            </clipPath>
          </defs>

          {/* ===== NECK + SHOULDERS / TORSO (semi-realistic paneled) ===== */}
          <g>
            {/* glowing hex neck — drawn FIRST so head & collar overlap its ends */}
            <g clipPath="url(#neckclip)">
              <rect x="130" y="200" width="100" height="140" fill="#06283a" />
              <rect x="130" y="200" width="100" height="140" fill="url(#hexmesh)" />
              {/* lit hex cells that pulse */}
              <g className="robot-core" fill="#67e8ff" opacity="0.9">
                <circle cx="168" cy="236" r="3.4" />
                <circle cx="196" cy="252" r="3.4" />
                <circle cx="176" cy="272" r="3.4" />
                <circle cx="200" cy="292" r="3" />
                <circle cx="162" cy="300" r="3" />
                <circle cx="186" cy="224" r="2.6" />
              </g>
            </g>
            {/* subtle neck side shading for roundness */}
            <path d="M150 206 q30 12 60 0 l10 128 q-40 16 -80 0 Z" fill="none" stroke="#0a3a52" strokeWidth="2" opacity="0.5" />

            {/* ===== LEGS + FEET (drawn first, behind the torso) ===== */}
            {/* left leg */}
            <g>
              <rect x="150" y="492" width="26" height="78" rx="12" fill="url(#panelDark)" stroke="#9fb4ca" strokeWidth="2" />
              <circle cx="163" cy="520" r="5" fill="url(#cyan)" className="robot-core" />
              {/* foot */}
              <path d="M138 568 q0 -8 12 -8 l20 0 q10 0 10 14 l0 8 q0 6 -6 6 l-34 0 q-6 0 -6 -6 Z" fill="url(#panel)" stroke="#9fb4ca" strokeWidth="2" />
            </g>
            {/* right leg */}
            <g>
              <rect x="184" y="492" width="26" height="78" rx="12" fill="url(#panelDark)" stroke="#9fb4ca" strokeWidth="2" />
              <circle cx="197" cy="520" r="5" fill="url(#cyan)" className="robot-core" />
              <path d="M184 568 q0 -8 12 -8 l20 0 q12 0 12 8 l0 14 q0 6 -6 6 l-32 0 q-6 0 -6 -6 Z" fill="url(#panel)" stroke="#9fb4ca" strokeWidth="2" />
            </g>

            {/* ===== TORSO: chest plate down to a waist/hip ===== */}
            {/* shoulder shells (overlap the neck bottom → no gap) */}
            <path d="M66 430 Q70 326 150 316 L210 316 Q290 326 294 430 Z" fill="url(#panel)" stroke="#9fb4ca" strokeWidth="2" />
            {/* lower torso / belly tapering to the waist */}
            <path d="M92 428 L268 428 Q266 486 210 500 L150 500 Q94 486 92 428 Z" fill="url(#panelDark)" stroke="#9fb4ca" strokeWidth="2" />
            {/* hip joints */}
            <circle cx="150" cy="498" r="9" fill="#9fb4ca" />
            <circle cx="210" cy="498" r="9" fill="#9fb4ca" />
            {/* collar / upper chest plate */}
            <path d="M116 330 Q180 308 244 330 L252 372 Q180 350 108 372 Z" fill="url(#panelDark)" stroke="#9fb4ca" strokeWidth="1.5" />
            {/* panel seam highlights for a 3D feel */}
            <path d="M96 404 Q180 388 264 404" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
            <path d="M120 332 Q180 350 240 332" fill="none" stroke="#b9c7d8" strokeWidth="1.5" opacity="0.7" />
            <path d="M150 316 L150 330 M210 316 L210 330" stroke="#9fb4ca" strokeWidth="1.5" opacity="0.6" />
            <path d="M180 430 L180 496" stroke="#9fb4ca" strokeWidth="1.5" opacity="0.5" />

            {/* chest core light */}
            <circle cx="180" cy="392" r="16" fill="#0b2436" />
            <circle cx="180" cy="392" r="9" fill="url(#cyan)" className="robot-core" />

            {/* ===== Cognia chest badge — EXACT LogoMark geometry ===== */}
            <g transform="translate(206 366)">
              <circle cx="18" cy="18" r="20" fill="#ffffff" stroke="#0093D0" strokeWidth="2" />
              <svg x="3" y="3" width="30" height="30" viewBox="0 0 64 64">
                <line x1="4" y1="30" x2="60" y2="30" stroke="#9CA3AF" strokeWidth="1" opacity="0.35" />
                <line x1="22" y1="6" x2="22" y2="56" stroke="#9CA3AF" strokeWidth="1" opacity="0.35" />
                <circle cx="5" cy="30" r="2.2" fill="#E4002B" />
                <circle cx="59" cy="30" r="2.2" fill="#E4002B" />
                <circle cx="22" cy="7" r="2.2" fill="#E4002B" />
                <circle cx="22" cy="55" r="2.2" fill="#E4002B" />
                <path d="M34 16 A 16 16 0 1 1 14 40" fill="none" stroke="#9CA3AF" strokeWidth="5" strokeLinecap="round" />
                <circle cx="22" cy="30" r="10" fill="#F5A200" />
                <circle cx="18.5" cy="26.5" r="3" fill="#ffffff" opacity="0.85" />
                <g fill="#9CA3AF">
                  <rect x="34" y="22" width="4" height="4" />
                  <rect x="39" y="26" width="4" height="4" />
                  <rect x="34" y="30" width="4" height="4" />
                  <rect x="40" y="20" width="3" height="3" opacity="0.8" />
                  <rect x="44" y="30" width="3" height="3" opacity="0.7" />
                  <rect x="45" y="24" width="2.5" height="2.5" opacity="0.6" />
                  <rect x="49" y="28" width="2" height="2" opacity="0.5" />
                </g>
              </svg>
            </g>

            {/* ===== LEFT arm: upper arm + forearm + round hand (idle sway) ===== */}
            <g className="robot-arm-left" style={{ transformOrigin: "80px 344px" }}>
              {/* shoulder joint */}
              <circle cx="80" cy="344" r="15" fill="url(#panelDark)" stroke="#9fb4ca" strokeWidth="2" />
              {/* upper arm + forearm */}
              <path d="M66 344 q-18 2 -18 40 l0 70 q0 14 16 14 q16 0 16 -14 l0 -108 Z" fill="url(#panel)" stroke="#9fb4ca" strokeWidth="2" />
              {/* elbow accent */}
              <circle cx="64" cy="392" r="5" fill="url(#cyan)" className="robot-core" />
              {/* hand (3-finger mitt) */}
              <g>
                <circle cx="64" cy="474" r="16" fill="url(#panel)" stroke="#9fb4ca" strokeWidth="2" />
                <rect x="52" y="482" width="7" height="16" rx="3.5" fill="url(#panel)" stroke="#9fb4ca" strokeWidth="1.5" />
                <rect x="61" y="484" width="7" height="18" rx="3.5" fill="url(#panel)" stroke="#9fb4ca" strokeWidth="1.5" />
                <rect x="70" y="482" width="7" height="16" rx="3.5" fill="url(#panel)" stroke="#9fb4ca" strokeWidth="1.5" />
                {/* thumb */}
                <rect x="47" y="468" width="7" height="12" rx="3.5" fill="url(#panel)" stroke="#9fb4ca" strokeWidth="1.5" transform="rotate(-30 50 474)" />
              </g>
            </g>

            {/* ===== RIGHT arm: happy idle wave (bigger wave on click) ===== */}
            <g className={`robot-arm ${waving ? "robot-arm-wave" : "robot-arm-right-idle"}`} style={{ transformOrigin: "280px 344px" }}>
              <circle cx="280" cy="344" r="15" fill="url(#panelDark)" stroke="#9fb4ca" strokeWidth="2" />
              <path d="M294 344 q18 2 18 40 l0 70 q0 14 -16 14 q-16 0 -16 -14 l0 -108 Z" fill="url(#panel)" stroke="#9fb4ca" strokeWidth="2" />
              <circle cx="296" cy="392" r="5" fill="#F5A200" />
              <g>
                <circle cx="296" cy="474" r="16" fill="url(#panel)" stroke="#9fb4ca" strokeWidth="2" />
                <rect x="283" y="482" width="7" height="16" rx="3.5" fill="url(#panel)" stroke="#9fb4ca" strokeWidth="1.5" />
                <rect x="292" y="484" width="7" height="18" rx="3.5" fill="url(#panel)" stroke="#9fb4ca" strokeWidth="1.5" />
                <rect x="301" y="482" width="7" height="16" rx="3.5" fill="url(#panel)" stroke="#9fb4ca" strokeWidth="1.5" />
                <rect x="306" y="468" width="7" height="12" rx="3.5" fill="url(#panel)" stroke="#9fb4ca" strokeWidth="1.5" transform="rotate(30 310 474)" />
              </g>
            </g>
          </g>

          {/* ===== HEAD (idle-look wrapper + cursor-tracking inner) ===== */}
          <g className={!near && !paused ? "robot-idle-look" : ""} style={{ transformOrigin: "180px 150px" }}>
          <g ref={headRef} className="robot-head" style={{ transformOrigin: "180px 150px", transition: "transform 0.12s ease-out" }}>
            {/* antenna sensor */}
            <line x1="180" y1="34" x2="180" y2="58" stroke="#b7c6d8" strokeWidth="5" strokeLinecap="round" />
            <circle cx="180" cy="28" r="8" fill="#F5A200" className="robot-antenna" />

            {/* cranium — paneled humanoid skull */}
            <path d="M104 150 Q104 60 180 56 Q256 60 256 150 Q256 196 214 214 L146 214 Q104 196 104 150 Z" fill="url(#panel)" stroke="#9fb4ca" strokeWidth="2.5" />
            {/* soft specular highlight (upper-left) for a 3D sheen */}
            <path d="M126 92 Q150 68 184 66 Q150 82 138 118 Q128 106 126 92 Z" fill="#ffffff" opacity="0.5" />
            {/* top crest seam + side panel seams */}
            <path d="M180 56 L180 96 M120 104 Q180 86 240 104" fill="none" stroke="#b9c7d8" strokeWidth="2" opacity="0.8" />
            <path d="M118 150 Q180 140 242 150" fill="none" stroke="#b9c7d8" strokeWidth="1.5" opacity="0.6" />
            {/* cheek panel seams flanking the visor */}
            <path d="M130 118 Q126 150 134 180 M230 118 Q234 150 226 180" fill="none" stroke="#b9c7d8" strokeWidth="1.5" opacity="0.55" />

            {/* circular headphone ear pieces (both sides) */}
            <g>
              <circle cx="110" cy="150" r="26" fill="url(#panelDark)" stroke="#8aa0b8" strokeWidth="2.5" />
              <circle cx="110" cy="150" r="15" fill="#13344a" />
              <circle cx="110" cy="150" r="6" fill="url(#cyan)" className="robot-core" />
            </g>
            <g>
              <circle cx="250" cy="150" r="26" fill="url(#panelDark)" stroke="#8aa0b8" strokeWidth="2.5" />
              <circle cx="250" cy="150" r="15" fill="#13344a" />
              <circle cx="250" cy="150" r="6" fill="url(#cyan)" className="robot-core" />
            </g>

            {/* dark glass face screen (visor) */}
            <path d="M138 100 Q180 90 222 100 L222 178 Q180 190 138 178 Z" fill="url(#face)" stroke="#0a1a28" strokeWidth="2" />

            {/* eyebrows (raise when near) */}
            <rect x="150" y="120" width="26" height="6" rx="3" fill="#39c0ec"
              style={{ transform: expressive ? "translateY(-5px)" : "none", transition: "transform 0.2s ease" }} />
            <rect x="184" y="120" width="26" height="6" rx="3" fill="#39c0ec"
              style={{ transform: expressive ? "translateY(-5px)" : "none", transition: "transform 0.2s ease" }} />

            {/* eyes (glowing, track cursor) */}
            <g style={{ transformOrigin: "163px 142px", transform: expressive ? "scale(1.12)" : "scale(1)", transition: "transform 0.2s ease" }}>
              <ellipse cx="163" cy="142" rx="15" ry="16" fill="#08141f" stroke="#2bb6e0" strokeWidth="2" />
              <g ref={leftPupil}>
                <circle cx="163" cy="142" r="8" fill="#66e0ff" className="robot-eye" />
                <circle cx="166" cy="139" r="2.6" fill="#ffffff" />
              </g>
            </g>
            <g style={{ transformOrigin: "197px 142px", transform: expressive ? "scale(1.12)" : "scale(1)", transition: "transform 0.2s ease" }}>
              <ellipse cx="197" cy="142" rx="15" ry="16" fill="#08141f" stroke="#2bb6e0" strokeWidth="2" />
              <g ref={rightPupil}>
                <circle cx="197" cy="142" r="8" fill="#66e0ff" className="robot-eye" />
                <circle cx="200" cy="139" r="2.6" fill="#ffffff" />
              </g>
            </g>

            {/* mouth: smile arc when expressive; glowing bar otherwise */}
            {expressive ? (
              <path d="M156 168 Q180 182 204 168" fill="none" stroke="#39c0ec" strokeWidth="5" strokeLinecap="round" className={talking ? "robot-mouth-talking" : ""} style={{ transformOrigin: "180px 172px" }} />
            ) : (
              <rect x="162" y="168" width="36" height="6" rx="3" fill="#39c0ec" />
            )}

            {/* per-language costume (headgear) — the robot "dresses up" */}
            <Costume code={g.costume} />
          </g>
          </g>
        </svg>
       </div>
      </div>

      {/* controls (hidden when docked) */}
      <div className={`mt-3 flex items-center gap-3 ${docked ? "hidden" : ""}`}>
        <div className="flex gap-1.5">
          {GREETINGS.map((gg, i) => (
            <span
              key={gg.code}
              className={`h-2 w-2 rounded-full transition ${i === idx ? "bg-white" : "bg-white/40"}`}
              title={gg.label}
            />
          ))}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); toggleSpeak(); }}
          aria-pressed={speak}
          className={`rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur transition ${
            speak ? "border-amber-300 bg-amber-400 text-slate-900" : "border-white/50 text-white hover:bg-white/10"
          }`}
        >
          {speak ? "🔊 Robot bersuara" : "🔈 Suarakan robot"}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); togglePause(); }}
          aria-pressed={paused}
          className="rounded-full border border-white/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/10"
          title={paused ? "Aktifkan animasi robot" : "Jeda animasi robot"}
        >
          {paused ? "▶ Animasi" : "⏸ Animasi"}
        </button>
      </div>
    </div>
  );

  // When docked, portal the robot to <body> so its `position: fixed` anchors to
  // the viewport. (In the hero it lives inside a transformed Parallax ancestor,
  // which would otherwise make `fixed` relative to that ancestor and send the
  // docked robot off-screen as the page scrolls.)
  if (docked && mounted) return createPortal(content, document.body);
  return content;
}
