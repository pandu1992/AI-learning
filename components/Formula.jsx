"use client";

import katex from "katex";
import { useMemo } from "react";

// Renders a LaTeX string with KaTeX. Works with static export because KaTeX
// renders to an HTML string synchronously (no runtime <script> needed).
// `display` = block (centered, larger) vs inline.
export function Formula({ tex, display = true, className = "" }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        output: "html",
      });
    } catch {
      return tex;
    }
  }, [tex, display]);

  return (
    <span
      className={className}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default Formula;
