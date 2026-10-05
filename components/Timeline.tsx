import { education, experience, parsePeriod, Span } from "@/lib/content";

// Work and education on one time axis: one row per role or degree, a bar from
// start to end, so overlapping roles (studies + thesis + research job) are visible.

const short = (org: string) =>
  org.includes("DLR") ? "DLR, Earth Observation"
    : org.includes("Technical University") ? "TUM"
      : org.includes("RISE") ? "RISE Nepal"
        : org;

interface Row extends Span { title: string; org: string; period: string }

const work: Row[] = experience.map((e) => ({ title: e.role, org: short(e.company), period: e.period, ...parsePeriod(e.period) }));
const study: Row[] = education.map((e) => ({ title: e.degree, org: short(e.institution), period: e.period, ...parsePeriod(e.period) }));
const all = [...work, ...study];
const y0 = Math.floor(Math.min(...all.map((r) => r.start)) / 12);
const y1 = Math.max(...all.map((r) => Math.floor((r.end ?? r.start) / 12))) + 1; // axis ends at the start of this year
const years = Array.from({ length: y1 - y0 + 1 }, (_, i) => y0 + i);
const pct = (m: number) => ((m - y0 * 12) / ((y1 - y0) * 12)) * 100;

const sortRows = (rows: Row[]) => [...rows].sort((a, b) => b.start - a.start);

function Grid() {
  return (
    <>
      {years.map((y) => (
        <span key={y} className="absolute inset-y-0 w-px bg-stone-200" style={{ left: `${pct(y * 12)}%` }} />
      ))}
    </>
  );
}

function Bar({ r, color }: { r: Row; color: string }) {
  const left = pct(r.start);
  const right = r.end == null ? 100 : pct(r.end + 1);
  const ongoing = r.end == null;
  return (
    <div className="absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full"
      style={{
        left: `${left}%`, width: `${Math.max(1.2, right - left)}%`,
        background: ongoing ? `linear-gradient(90deg, ${color} 70%, ${color}33)` : color,
      }}
      title={`${r.title}, ${r.org}: ${r.period}`} />
  );
}

function Group({ label, rows, color }: { label: string; rows: Row[]; color: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-stone-500">
        <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: color }} /> {label}
      </div>
      <ul className="divide-y divide-stone-200 border-y border-stone-200">
        {sortRows(rows).map((r) => (
          <li key={r.title + r.period} className="grid gap-2 py-3 md:grid-cols-[17rem_1fr] md:items-center md:gap-6">
            <div className="min-w-0">
              <div className="text-sm font-medium text-stone-900">{r.title}</div>
              <div className="text-sm text-stone-500">{r.org} · {r.period}</div>
            </div>
            <div className="relative h-5 md:h-9">
              <div className="md:hidden"><Grid /></div>
              <Bar r={r} color={color} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Timeline() {
  return (
    <div className="relative space-y-8">
      {/* year grid behind all rows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:grid md:grid-cols-[17rem_1fr] md:gap-6">
        <div className="hidden md:block" />
        <div className="relative"><Grid /></div>
      </div>
      <Group label="Work" rows={work} color="#047857" />
      <Group label="Education" rows={study} color="#64748b" />
      <div className="grid md:grid-cols-[17rem_1fr] md:gap-6">
        <div className="hidden md:block" />
        <div className="relative h-5 text-xs text-stone-500">
          {years.slice(0, -1).map((y) => (
            <span key={y} className="absolute -translate-x-0 pl-1" style={{ left: `${pct(y * 12)}%` }}>{y}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
