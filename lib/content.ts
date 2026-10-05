import projectsJson from "@/data/projects.json";
import experienceJson from "@/data/experience.json";
import educationJson from "@/data/education.json";
import skillsJson from "@/data/skills.json";
import profileJson from "@/data/profile.json";

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  libraries: string[];
  topics: string[];
  stat?: string;
  statLabel?: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
  featured?: boolean;
}
export interface Experience { id: string; role: string; company: string; period: string; description: string[] }
export interface Education { degree: string; institution: string; period: string; honors?: string; focus?: string; thesis?: string }
export interface SkillGroup { id: string; title: string; description: string; tools: { name: string; description: string }[] }

export const projects = projectsJson as Project[];
export const experience = experienceJson as Experience[];
export const education = educationJson as Education[];
export const skills = (skillsJson as { categories: SkillGroup[] }).categories;
export const profile = profileJson as { languages: { name: string; level: string }[]; awards: { title: string; detail: string }[] };

export const projectById = (id: string) => projects.find((p) => p.id === id);

/** Projects grouped by domain, in display order. */
export const domains: { id: string; title: string; blurb: string; ids: string[] }[] = [
  { id: "eo", title: "Earth observation and deep learning", blurb: "Satellite and aerial imagery, semantic segmentation and environmental monitoring.",
    ids: ["dlr-alpine-river-segmentation", "el-nino-drought-agent", "glacier-dynamics-nepal", "lulc-change-detection"] },
  { id: "algo", title: "Geospatial algorithm engineering", blurb: "Production-scale spatial algorithms, performance work and entity resolution.",
    ids: ["global-territorial-buffer-engine", "geospatial-memory-optimizer", "us-coastal-proximity-toolbox", "sfd-mfd-municipality-enrichment"] },
  { id: "hydro", title: "Hydrology and water resources", blurb: "Flood risk, rainfall-runoff and snowmelt modelling.",
    ids: ["areal-precipitation-refinement", "flood-risk-reduction-roshaupten", "snowmelt-runoff-modeling"] },
  { id: "soft", title: "Software and data systems", blurb: "Desktop tools, API pipelines and large-scale data validation.",
    ids: ["batch-api-enrichment-application", "india-building-osm-validation"] },
];
export const domainOf = (id: string) => domains.find((d) => d.ids.includes(id));

/** Selected work on the home page. */
export const selectedIds = ["dlr-alpine-river-segmentation", "el-nino-drought-agent", "global-territorial-buffer-engine", "areal-precipitation-refinement"];

// ------------------------------------------------------------------ periods
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** Month index (years * 12 + month0) from "May 2026", "2024", or null for "Present". */
function parsePoint(s: string, isEnd: boolean): number | null {
  const t = s.trim().toLowerCase();
  if (t.startsWith("present")) return null;
  const y = t.match(/\d{4}/);
  if (!y) return null;
  const m = MONTHS.findIndex((mm) => t.includes(mm));
  return Number(y[0]) * 12 + (m >= 0 ? m : isEnd ? 11 : 0);
}

export interface Span { start: number; end: number | null; expected: boolean }

/** "Sep 2025 – Mar 2026", "2024 – Oct 2026 (expected)", "May 2026 – Present". */
export function parsePeriod(period: string): Span {
  const [a, b = "Present"] = period.split(/\s[–-]\s/);
  return { start: parsePoint(a, false) ?? 0, end: parsePoint(b, true), expected: /expected/i.test(b) };
}
