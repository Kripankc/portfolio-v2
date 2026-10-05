import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { asset, site } from "@/lib/site";

// Contours of Nepal from Copernicus DEM GLO-90, built by scripts/build_topo.py
// (GitHub Action "Build Nepal topography"). If the file has not been built yet,
// the hero simply has no background.
const TOPO = "/data/nepal-topo.svg";
const hasTopo = fs.existsSync(path.join(process.cwd(), "public", TOPO));

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-stone-200">
      {hasTopo && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(TOPO)} alt="" className="topo absolute right-[-6%] top-1/2 w-[118%] max-w-none -translate-y-[42%] opacity-60 md:right-[-4%] md:w-[82%] md:opacity-100" />
        </div>
      )}
      <div className="relative mx-auto flex min-h-[86vh] max-w-6xl flex-col justify-center px-5 pb-16 pt-28 sm:px-8">
        <p className="mb-5 text-sm text-stone-500">{site.location}</p>
        <h1 className="text-5xl font-semibold tracking-tight text-stone-900 sm:text-7xl">{site.name}</h1>
        <p className="mt-4 text-xl text-stone-800 sm:text-2xl">{site.title}</p>
        <p className="mt-1 text-xl text-stone-500 sm:text-2xl">{site.tagline}</p>
        <p className="mt-6 max-w-xl text-stone-600">
          M.Sc. Environmental Engineering at the Technical University of Munich. Master&apos;s thesis at the German Aerospace Center (DLR), training deep learning models to map Alpine rivers from aerial imagery.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link href="/projects/" className="inline-flex items-center gap-2 rounded-md bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700">
            View projects <ArrowRight size={15} />
          </Link>
          <a href={asset(site.cv)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-stone-50/80 px-5 py-2.5 text-sm font-medium text-stone-800 transition-colors hover:border-stone-900">
            <Download size={15} /> Download CV
          </a>
          <div className="ml-1 flex items-center gap-3 text-stone-500">
            <a href={`mailto:${site.email}`} aria-label="Email" className="p-1 hover:text-stone-900"><Mail size={19} /></a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-1 hover:text-stone-900"><Linkedin size={19} /></a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-1 hover:text-stone-900"><Github size={19} /></a>
          </div>
        </div>
      </div>
      {hasTopo && (
        <p className="absolute bottom-4 right-5 hidden font-mono text-[11px] text-stone-400 sm:block sm:right-8">
          Nepal · contours every 500 m · Copernicus DEM GLO-90
        </p>
      )}
    </section>
  );
}
