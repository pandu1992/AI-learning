"use client";

// Decorative animated aurora/gradient blobs for hero backgrounds.
// Purely visual; absolutely positioned behind content. Respects reduced-motion
// via CSS. Place inside a `relative overflow-hidden` container.
export default function AuroraBackground({ className = "" }) {
  return (
    <div className={`aurora-wrap ${className}`} aria-hidden="true">
      <span className="aurora-blob" style={{ background: "#33b3e4", width: 360, height: 360, top: "-12%", left: "8%", animationDelay: "0s" }} />
      <span className="aurora-blob" style={{ background: "#0093D0", width: 420, height: 420, top: "20%", right: "-6%", animationDelay: "-4s" }} />
      <span className="aurora-blob" style={{ background: "#F5A200", width: 300, height: 300, bottom: "-14%", left: "30%", opacity: 0.4, animationDelay: "-8s" }} />
    </div>
  );
}
