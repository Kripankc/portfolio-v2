import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import Timeline from "@/components/Timeline";
import { projectById, selectedIds, skills, Project } from "@/lib/content";

export default function Home() {
  const selected = selectedIds.map(projectById).filter((p): p is Project => !!p);
  return (
    <>
      <Hero />

      <Section label="Selected work" title="Projects"
        intro="Research and production work in Earth observation, hazard and risk modelling, and geospatial engineering.">
        <div className="grid gap-5 md:grid-cols-2">
          {selected.map((p) => <ProjectCard key={p.id} p={p} />)}
        </div>
        <Link href="/projects/" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-stone-900 hover:text-emerald-700">
          All projects <ArrowRight size={15} />
        </Link>
      </Section>

      <div className="border-y border-stone-200 bg-white">
        <Section label="Experience" title="Work and education">
          <Timeline />
          <Link href="/about/" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-stone-900 hover:text-emerald-700">
            Details and background <ArrowRight size={15} />
          </Link>
        </Section>
      </div>

      <Section label="Skills" title="Tools and methods">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g) => (
            <div key={g.id}>
              <h3 className="font-medium text-stone-900">{g.title}</h3>
              <p className="mt-1 text-sm text-stone-500">{g.description}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {g.tools.map((t) => (
                  <li key={t.name} title={t.description} className="rounded border border-stone-200 bg-white px-2 py-0.5 text-sm text-stone-700">{t.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
