"use client";

import { useLang } from "../LanguageProvider";
import BeforeAfterViz from "./BeforeAfterViz";
import FunnelViz from "./FunnelViz";
import TimelineViz from "./TimelineViz";
import PipelineViz from "./PipelineViz";
import ScatterClusterViz from "./ScatterClusterViz";
import ThresholdViz from "./ThresholdViz";

// Dispatcher: renders an interactive visualization from a spec object.
// spec = { type, caption:{id,en}, ...typeSpecificFields }
const REGISTRY = {
  beforeAfter: BeforeAfterViz,
  funnel: FunnelViz,
  timeline: TimelineViz,
  pipeline: PipelineViz,
  scatterCluster: ScatterClusterViz,
  threshold: ThresholdViz,
};

export default function CaseViz({ spec }) {
  const { lang } = useLang();
  if (!spec) return null;
  const Comp = REGISTRY[spec.type];
  if (!Comp) return null;
  const caption = spec.caption?.[lang];

  return (
    <figure className="my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <Comp spec={spec} lang={lang} />
      {caption && <figcaption className="mt-3 text-center text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  );
}
