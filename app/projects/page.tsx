import type { Metadata } from "next";
import Link from "next/link";
import { domains, projectById, Project } from "@/lib/content";

export const metadata: Metadata = { title: "Projects", description: "Projects in Earth observation, geospatial algorithm engineering, hydrology and data systems." };

export default function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Projects</h1>
      <p className="mt-3 max-w-2xl text-stone-600">Research, coursework and production work, grouped by field.</p>
      <div className="mt-14 space-y-16">
        {domains.map((d) => (
          <section key={d.id} aria-labelledby={`d-${d.id}`}>
            <h2 id={`d-${d.id}`} className="text-xl font-semibold text-stone-900">{d.title}</h2>
            <p className="mt-1 text-sm text-stone-500">{d.blurb}</p>
            <ul className="mt-5 divide-y divide-stone-200 border-y border-stone-200">
              {d.ids.map(projectById).filter((p): p is Project => !!p).map((p) => (
                <li key={p.id}>
                  <Link href={`/projects/${p.id}/`} className="group grid gap-1 py-5 md:grid-cols-[1fr_14rem] md:gap-8">
                    <div>
                      <h3 className="font-medium text-stone-900 group-hover:text-emerald-700">{p.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-stone-600">{p.description}</p>
                    </div>
                    {p.stat && (
                      <p className="text-sm md:text-right"><span className="font-semibold text-stone-900">{p.stat}</span> <span className="text-stone-500">{p.statLabel}</span></p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
