"use client";

import { useEffect } from "react";
import { useProgress } from "./ProgressProvider";

// Drop-in tracker: records a "visit" (for Continue-learning + streak) on mount,
// and optionally marks an item complete. Renders nothing.
//   <ProgressTracker visitHref="/demos/knn" visitLabel="k-NN"
//                    completeKey="demo:knn" completeType="demo" />
// If `completeOnMount` is false, nothing is marked complete (visit-only).
export default function ProgressTracker({
  visitHref,
  visitLabel,
  completeKey,
  completeType = "demo",
  completeOnMount = true,
}) {
  const { visit, complete } = useProgress();

  useEffect(() => {
    if (visitHref) visit(visitHref, visitLabel);
    if (completeKey && completeOnMount) complete(completeKey, completeType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
