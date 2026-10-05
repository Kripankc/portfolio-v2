import type { Metadata } from "next";
import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: `Contact ${site.name}.` };

export default function Contact() {
  const rows = [
    { icon: <Mail size={18} />, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: <Linkedin size={18} />, label: "LinkedIn", value: "linkedin.com/in/kripankc", href: site.linkedin },
    { icon: <Github size={18} />, label: "GitHub", value: "github.com/Kripankc", href: site.github },
  ];
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Contact</h1>
      <p className="mt-3 text-stone-600">For research collaboration, roles in geospatial data science and climate risk, or questions about a project. Email is the quickest way to reach me.</p>
      <ul className="mt-10 divide-y divide-stone-200 border-y border-stone-200">
        {rows.map((r) => (
          <li key={r.label}>
            <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
              className="group flex items-center gap-4 py-5">
              <span className="text-stone-500 group-hover:text-stone-900">{r.icon}</span>
              <span className="w-24 text-sm text-stone-500">{r.label}</span>
              <span className="font-medium text-stone-900 group-hover:text-emerald-700">{r.value}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
