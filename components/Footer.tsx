import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>© {new Date().getFullYear()} {site.name} · {site.location}</span>
        <div className="flex items-center gap-4">
          <a href={`mailto:${site.email}`} className="hover:text-stone-900" aria-label="Email"><Mail size={17} /></a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-stone-900" aria-label="LinkedIn"><Linkedin size={17} /></a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-stone-900" aria-label="GitHub"><Github size={17} /></a>
        </div>
      </div>
    </footer>
  );
}
