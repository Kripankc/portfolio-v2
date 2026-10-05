import type { Metadata } from "next";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import Timeline from "@/components/Timeline";
import { education, experience, profile } from "@/lib/content";
import { asset, site } from "@/lib/site";

export const metadata: Metadata = { title: "About", description: `About ${site.name}: experience, education, awards and languages.` };

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-emerald-700">{children}</h2>
);

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 sm:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_18rem]">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">About</h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-stone-700">
            <p>I am an environmental engineer from Nepal, based in Munich. My work sits between Earth observation, hazard and risk modelling, and software engineering.</p>
            <p>For my M.Sc. in Environmental Engineering at TUM I am writing my Master&apos;s thesis at DLR (Earth Observation), training a U-Net to map sediment, shallow water, vegetation and shadow in Alpine rivers from high-resolution orthophotos. Before that I interned in corporate underwriting at Munich Re, building large-scale geodata workflows and a geodata enrichment tool. I also work as a research and teaching assistant at TUM on flood risk.</p>
            <p>Earlier I worked as an environmental engineer in Nepal on environmental impact assessments, and as a freelance GIS analyst for international clients.</p>
          </div>
        </div>
        <aside className="space-y-3 text-sm lg:pt-16">
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-stone-700 hover:text-stone-900"><Mail size={16} /> {site.email}</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-stone-700 hover:text-stone-900"><Linkedin size={16} /> LinkedIn</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-stone-700 hover:text-stone-900"><Github size={16} /> GitHub</a>
          <a href={asset(site.cv)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-stone-700 hover:text-stone-900"><Download size={16} /> CV (PDF)</a>
        </aside>
      </div>

      <section className="mt-20">
        <H2>Timeline</H2>
        <div className="mt-6"><Timeline /></div>
      </section>

      <section className="mt-20">
        <H2>Experience</H2>
        <ol className="mt-6 divide-y divide-stone-200 border-y border-stone-200">
          {experience.map((e) => (
            <li key={e.id} className="grid gap-2 py-7 md:grid-cols-[14rem_1fr] md:gap-8">
              <p className="text-sm text-stone-500">{e.period}</p>
              <div>
                <h3 className="font-medium text-stone-900">{e.role}</h3>
                <p className="text-sm text-stone-600">{e.company}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-stone-700 marker:text-stone-400">
                  {e.description.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <H2>Education</H2>
        <ol className="mt-6 divide-y divide-stone-200 border-y border-stone-200">
          {education.map((e) => (
            <li key={e.degree} className="grid gap-2 py-7 md:grid-cols-[14rem_1fr] md:gap-8">
              <p className="text-sm text-stone-500">{e.period}</p>
              <div>
                <h3 className="font-medium text-stone-900">{e.degree}</h3>
                <p className="text-sm text-stone-600">{e.institution}</p>
                <dl className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-stone-700">
                  {e.focus && <div><dt className="inline text-stone-500">Focus: </dt><dd className="inline">{e.focus}</dd></div>}
                  {e.thesis && <div><dt className="inline text-stone-500">Thesis: </dt><dd className="inline">{e.thesis}</dd></div>}
                  {e.honors && <div><dt className="inline text-stone-500">Grades and awards: </dt><dd className="inline">{e.honors}</dd></div>}
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-20 grid gap-12 md:grid-cols-2">
        <section>
          <H2>Awards and presentations</H2>
          <ul className="mt-6 divide-y divide-stone-200 border-y border-stone-200">
            {profile.awards.map((a) => (
              <li key={a.title + a.detail} className="py-4">
                <p className="font-medium text-stone-900">{a.title}</p>
                <p className="text-sm text-stone-500">{a.detail}</p>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <H2>Languages</H2>
          <ul className="mt-6 divide-y divide-stone-200 border-y border-stone-200">
            {profile.languages.map((l) => (
              <li key={l.name} className="flex justify-between py-4">
                <span className="font-medium text-stone-900">{l.name}</span>
                <span className="text-sm text-stone-500">{l.level}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
