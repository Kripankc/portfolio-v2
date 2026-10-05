import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project, domainOf } from "@/lib/content";

/** Card used for selected work on the home page. */
export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={`/projects/${p.id}/`}
      className="group flex h-full flex-col rounded-lg border border-stone-200 bg-white p-6 transition-colors hover:border-stone-400">
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-stone-500">{domainOf(p.id)?.title ?? p.topics[0]}</p>
        <ArrowUpRight size={17} className="shrink-0 text-stone-400 transition-colors group-hover:text-stone-900" />
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-snug text-stone-900">{p.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-stone-600">{p.description}</p>
      <div className="mt-auto pt-6">
        {p.stat && (
          <p className="text-sm text-stone-900"><span className="font-semibold">{p.stat}</span> <span className="text-stone-500">{p.statLabel}</span></p>
        )}
        <p className="mt-2 text-xs text-stone-500">{p.technologies.slice(0, 4).join(" · ")}</p>
      </div>
    </Link>
  );
}
