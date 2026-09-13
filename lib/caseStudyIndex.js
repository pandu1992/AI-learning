// Unifies the new multi-case model (caseStudiesByField) with the legacy
// single-case model (caseStudies) so pages can handle both during the phased
// rollout. Fields migrated to the new model use their case list; fields not yet
// migrated fall back to the single legacy case wrapped as a one-item list.

import { caseStudiesByField } from "./caseStudyData";
import { caseStudies as legacyCaseStudies } from "./caseStudies";
import { fields } from "./content";

// Returns the list of cases for a field, or [] if unknown.
export function getFieldCases(field) {
  if (caseStudiesByField[field]) return caseStudiesByField[field];
  const legacy = legacyCaseStudies[field];
  if (legacy) {
    // Wrap legacy single case into the new list shape (slug "overview").
    return [{ slug: "overview", icon: legacy.icon, id: legacy.id, en: legacy.en }];
  }
  return [];
}

// Returns a single case by field + slug, or null.
export function getCase(field, slug) {
  return getFieldCases(field).find((c) => c.slug === slug) || null;
}

// Field metadata (icon/title/summary) from content.js.
export function getFieldMeta(field) {
  return fields.find((f) => f.slug === field) || null;
}

// All fields (for the top-level index).
export { fields };

// All (field, slug) pairs for static generation of detail pages.
export function allCaseParams() {
  const params = [];
  for (const f of fields) {
    for (const c of getFieldCases(f.slug)) {
      params.push({ slug: f.slug, caseId: c.slug });
    }
  }
  return params;
}

// Whether a field has more than one case (affects index vs. direct view).
export function fieldHasList(field) {
  return getFieldCases(field).length > 1;
}
