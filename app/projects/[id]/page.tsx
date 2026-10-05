import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { domainOf, projectById, projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = projectById(params.id);
  return p ? { title: p.title, description: p.description.slice(0, 160) } : {};
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const p = projectById(params.id);
  if (!p) notFound();
  const domain = domainOf(p.id);
  return (
    <article className="mx-auto max-w-3xl px-5 pb-20 pt-28 sm:px-8">
      <Link href="/projects/" className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900">
        <ArrowLeft size={15} /> All projects
      </Link>
      {domain && <p className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-emerald-700">{domain.title}</p>}
      <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl">{p.title}</h1>
      {p.stat && (
        <p className="mt-4 text-stone-900"><span className="text-2xl font-semibold">{p.stat}</span> <span className="text-stone-500">{p.statLabel}</span></p>
      )}
      <p className="mt-8 text-lg leading-relaxed text-stone-700">{p.description}</p>

      {(p.liveUrl || p.githubUrl) && (
        <div className="mt-8 flex flex-wrap gap-3">
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700">
              <ExternalLink size={15} /> Open the app
            </a>
          )}
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-stone-300 px-4 py-2 text-sm font-medium text-stone-800 hover:border-stone-900">
              <Github size={15} /> Source code
            </a>
          )}
        </div>
      )}

      <dl className="mt-12 grid gap-8 border-t border-stone-200 pt-8 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase tracking-[0.14em] text-stone-500">Tools</dt>
          <dd className="mt-2 flex flex-wrap gap-1.5">
            {p.technologies.map((t) => <span key={t} className="rounded border border-stone-200 bg-white px-2 py-0.5 text-sm text-stone-700">{t}</span>)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-[0.14em] text-stone-500">Libraries</dt>
          <dd className="mt-2 font-mono text-sm text-stone-600">{p.libraries.join(", ")}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-[0.14em] text-stone-500">Topics</dt>
          <dd className="mt-2 text-sm text-stone-700">{p.topics.join(" · ")}</dd>
        </div>
      </dl>
    </article>
  );
}
