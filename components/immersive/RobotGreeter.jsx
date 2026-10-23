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

// Flag emojis (🇮🇩 etc.) don't render on many desktop browsers (esp. Windows,
// which ships no flag-emoji font — they show as "ID" or boxes), yet work on
// phones/tablets. So we draw tiny CSS/SVG flags that look identical on every OS.
function FlagChip({ code }) {
  const common = "inline-block h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] align-[-2px] ring-1 ring-black/10";
  switch (code) {
    case "id": // red over white
      return (
        <span className={common} aria-hidden="true">
          <span className="block h-1/2 w-full bg-[#e4002b]" />
          <span className="block h-1/2 w-full bg-white" />
        </span>
      );
    case "zh": // red with a yellow star
      return (
        <span className={`${common} relative bg-[#de2910]`} aria-hidden="true">
          <span className="absolute left-[3px] top-[2px] text-[8px] leading-none text-[#ffde00]">★</span>
        </span>
      );
    case "ja": // white with red disc
      return (
        <span className={`${common} relative bg-white`} aria-hidden="true">
          <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bc002d]" />
        </span>
      );
    case "en": // simplified Union-Jack-ish cross
      return (
        <span className={`${common} relative bg-[#012169]`} aria-hidden="true">
          <span className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-white" />
          <span className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 bg-white" />
          <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-[#c8102e]" />
          <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-[#c8102e]" />
        </span>
      );
    case "ar": // Saudi green
      return (
        <span className={`${common} relative bg-[#006c35]`} aria-hidden="true">
          <span className="absolute bottom-[2px] left-1/2 h-[2px] w-3 -translate-x-1/2 bg-white" />
        </span>
      );
    default:
      return null;
  }
}

// Per-language costume worn on the robot's HEAD, so the robot "dresses up" for
// each culture as it greets. Pure SVG (no assets). Each returns head-gear drawn
// in the head's local coordinate space (head shell spans x:96..264, y:62..212).
function Costume({ code }) {
  switch (code) {
    case "id": // Indonesia — blangkon (Javanese cap) in batik brown + gold
      return (
        <g aria-hidden="true">
          <path d="M92 70 Q180 24 268 70 Q268 58 180 50 Q92 58 92 70 Z" fill="#5b3a1a" />
          <path d="M92 70 Q180 44 268 70 L268 78 Q180 56 92 78 Z" fill="#7a4e22" />
          <path d="M236 60 q22 -6 20 16 q-2 14 -18 10 q-10 -4 -2 -26 Z" fill="#8a5a28" />
          <circle cx="245" cy="70" r="4" fill="#F5A200" />
          <path d="M120 58 l6 6 l6 -6 l6 6 l6 -6" fill="none" stroke="#F5A200" strokeWidth="2" />
        </g>
      );
    case "zh": // China — imperial/scholar hat in red + gold
      return (
        <g aria-hidden="true">
          <rect x="120" y="44" width="120" height="16" rx="6" fill="#b91c1c" />
          <rect x="150" y="30" width="60" height="20" rx="8" fill="#dc2626" />
          <rect x="150" y="26" width="60" height="7" rx="3.5" fill="#F5A200" />
          <circle cx="180" cy="22" r="6" fill="#fde047" />
          <path d="M128 60 l104 0" stroke="#fca5a5" strokeWidth="2" />
        </g>
      );
    case "ja": // Japan — samurai kabuto helmet (dark steel + gold crescent)
      return (
        <g aria-hidden="true">
          <path d="M96 72 Q180 38 264 72 Q264 60 180 54 Q96 60 96 72 Z" fill="#334155" />
          <path d="M96 72 Q180 50 264 72 L264 80 Q180 60 96 80 Z" fill="#1e293b" />
          {/* maedate (crescent crest) */}
          <path d="M165 50 Q180 20 195 50 Q180 36 165 50 Z" fill="#F5A200" />
          <path d="M150 72 q-14 10 -10 26" fill="none" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          <path d="M210 72 q14 10 10 26" fill="none" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        </g>
      );
    case "en": // UK/English — graduation mortarboard cap (academic)
      return (
        <g aria-hidden="true">
          <rect x="150" y="50" width="60" height="14" rx="4" fill="#0b2436" />
          <path d="M120 46 L180 32 L240 46 L180 60 Z" fill="#0b2436" />
          <circle cx="180" cy="46" r="3" fill="#F5A200" />
          <path d="M180 46 Q214 50 214 40" fill="none" stroke="#F5A200" strokeWidth="2" />
          <circle cx="214" cy="40" r="3" fill="#F5A200" />
        </g>
      );
    case "ar": // Arabic — keffiyeh / agal headdress (white + black cord)
      return (
        <g aria-hidden="true">
          <path d="M88 66 Q180 40 272 66 L272 96 Q180 74 88 96 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="96" y="60" width="168" height="9" rx="4.5" fill="#0b2436" />
          <rect x="96" y="70" width="168" height="5" rx="2.5" fill="#334155" />
          <path d="M92 70 L70 150 M268 70 L290 150" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
        </g>
      );
    default:
      return null;
  }
}

export default function RobotGreeter() {
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

      {/* GIANT robot */}
      <div className={`${forceMotion ? "robot-force-motion" : ""} robot-float relative select-none ${waving ? "robot-happy" : ""} ${bowing ? "robot-bowing" : ""}`}>
        <span
          className={`robot-glow pointer-events-none absolute left-1/2 top-1/3 -z-10 -translate-x-1/2 -translate-y-1/4 ${docked ? "h-[150px] w-[150px]" : "h-[360px] w-[360px]"} ${expressive ? "robot-glow-strong" : ""}`}
          aria-hidden="true"
        />
        <svg
          width="360"
          height="440"
          viewBox="0 0 360 440"
          className={`robot-breathe w-auto drop-shadow-2xl transition-all duration-500 ${docked ? "h-[150px]" : "h-[360px] sm:h-[420px]"}`}
          aria-label="AI robot assistant"
          role="img"
        >
          {/* ===== BODY / TORSO ===== */}
          <g>
            <rect x="160" y="238" width="40" height="28" rx="10" fill="#cbd5e1" />
            <path
              d="M96 300 Q96 262 140 258 L220 258 Q264 262 264 300 L264 404 Q264 424 244 424 L116 424 Q96 424 96 404 Z"
              fill="#eef4fb"
              stroke="#0093D0"
              strokeWidth="4"
            />
            <circle cx="180" cy="336" r="26" fill="#0b2436" />
            <circle cx="180" cy="336" r="15" fill="#33b3e4" className="robot-core" />
            <circle cx="180" cy="336" r="7" fill="#eaf8ff" />

            {/* ===== Cognia / BINUS chest badge (left chest) ===== */}
            <g transform="translate(118 300)">
              <circle cx="0" cy="0" r="20" fill="#ffffff" stroke="#0093D0" strokeWidth="2" />
              {/* mini Cognia mark: grey orbit + orange planet + pixel trail */}
              <path d="M6 -9 A 11 11 0 1 1 -8 5" fill="none" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
              <circle cx="-4" cy="0" r="6.5" fill="#F5A200" />
              <circle cx="-6" cy="-2.2" r="2" fill="#ffffff" opacity="0.85" />
              <g fill="#9CA3AF">
                <rect x="4" y="-5" width="2.6" height="2.6" />
                <rect x="7.5" y="-2" width="2.6" height="2.6" />
                <rect x="4" y="1.5" width="2.6" height="2.6" />
                <rect x="10.5" y="-4.5" width="2" height="2" opacity="0.7" />
                <rect x="11" y="1" width="1.8" height="1.8" opacity="0.5" />
              </g>
            </g>

            <rect x="150" y="376" width="38" height="7" rx="3.5" fill="#cbd5e1" />
            <rect x="150" y="390" width="38" height="7" rx="3.5" fill="#cbd5e1" />
            <rect x="196" y="376" width="44" height="7" rx="3.5" fill="#cbd5e1" />
            <rect x="196" y="390" width="44" height="7" rx="3.5" fill="#cbd5e1" />

            {/* LEFT arm (gentle idle sway) */}
            <g className="robot-arm-left" style={{ transformOrigin: "83px 292px" }}>
              <rect x="70" y="284" width="26" height="86" rx="13" fill="#eef4fb" stroke="#0093D0" strokeWidth="4" />
              <circle cx="83" cy="378" r="15" fill="#0093D0" />
            </g>
            {/* RIGHT arm (waves on click) */}
            <g className={`robot-arm ${waving ? "robot-arm-wave" : ""}`} style={{ transformOrigin: "277px 292px" }}>
              <rect x="264" y="284" width="26" height="86" rx="13" fill="#eef4fb" stroke="#0093D0" strokeWidth="4" />
              <circle cx="277" cy="378" r="15" fill="#F5A200" />
            </g>
          </g>

          {/* ===== HEAD (idle-look wrapper + cursor-tracking inner) ===== */}
          <g className={!near && !paused ? "robot-idle-look" : ""} style={{ transformOrigin: "180px 150px" }}>
          <g ref={headRef} className="robot-head" style={{ transformOrigin: "180px 150px", transition: "transform 0.12s ease-out" }}>
            <line x1="180" y1="36" x2="180" y2="64" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
            <circle cx="180" cy="30" r="9" fill="#F5A200" className="robot-antenna" />
            <rect x="96" y="62" width="168" height="150" rx="38" fill="#eef4fb" stroke="#0093D0" strokeWidth="4" />
            <rect x="80" y="112" width="16" height="50" rx="7" fill="#0093D0" />
            <rect x="264" y="112" width="16" height="50" rx="7" fill="#0093D0" />
            <rect x="116" y="86" width="128" height="104" rx="24" fill="#0b2436" />

            <rect
              x="138" y="108" width="34" height="7" rx="3.5" fill="#33b3e4"
              style={{ transform: expressive ? "translateY(-5px)" : "none", transition: "transform 0.2s ease" }}
            />
            <rect
              x="188" y="108" width="34" height="7" rx="3.5" fill="#33b3e4"
              style={{ transform: expressive ? "translateY(-5px)" : "none", transition: "transform 0.2s ease" }}
            />

            <g style={{ transformOrigin: "155px 134px", transform: expressive ? "scale(1.12)" : "scale(1)", transition: "transform 0.2s ease" }}>
              <circle cx="155" cy="134" r="18" fill="#0a1a28" stroke="#33b3e4" strokeWidth="2.5" />
              <g ref={leftPupil}>
                <circle cx="155" cy="134" r="9" fill="#66e0ff" className="robot-eye" />
                <circle cx="158.5" cy="130.5" r="3" fill="#ffffff" />
              </g>
            </g>
            <g style={{ transformOrigin: "205px 134px", transform: expressive ? "scale(1.12)" : "scale(1)", transition: "transform 0.2s ease" }}>
              <circle cx="205" cy="134" r="18" fill="#0a1a28" stroke="#33b3e4" strokeWidth="2.5" />
              <g ref={rightPupil}>
                <circle cx="205" cy="134" r="9" fill="#66e0ff" className="robot-eye" />
                <circle cx="208.5" cy="130.5" r="3" fill="#ffffff" />
              </g>
            </g>

            {expressive ? (
              <path d="M150 166 Q180 184 210 166" fill="none" stroke="#33b3e4" strokeWidth="6" strokeLinecap="round" className={talking ? "robot-mouth-talking" : ""} style={{ transformOrigin: "180px 170px" }} />
            ) : (
              <rect x="158" y="166" width="44" height="8" rx="4" fill="#33b3e4" />
            )}

            {/* per-language costume (headgear) — the robot "dresses up" */}
            <Costume code={g.costume} />
          </g>
          </g>
        </svg>
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
