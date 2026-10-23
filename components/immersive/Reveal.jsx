"use client";

import { useEffect, useRef, useState } from "react";

// Wraps children in a reveal-on-scroll effect using IntersectionObserver.
// Adds the `.in-view` class when scrolled into view (CSS handles the animation).
// `delay` (ms) staggers grouped reveals. Falls back to visible if unsupported.
export default function Reveal({ children, delay = 0, className = "", variant, as: Tag = "div" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  // `variant` picks an alternate animation class (reveal-left/right/zoom) and
  // replaces the default vertical `.reveal`. Falls back to `.reveal`.
  const baseClass = variant ? `reveal-${variant}` : "reveal";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setInView(true); obs.unobserve(e.target); }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`${baseClass} ${inView ? "in-view" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
