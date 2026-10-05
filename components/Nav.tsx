"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { asset, site } from "@/lib/site";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects/", label: "Projects" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export default function Nav() {
  const path = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, "")));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200/70 bg-stone-50/85 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link href="/" className="font-semibold tracking-tight text-stone-900" onClick={() => setOpen(false)}>
          {site.name}
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${active(l.href) ? "text-stone-900 font-medium" : "text-stone-500 hover:text-stone-900"}`}
              aria-current={active(l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
          <a href={asset(site.cv)} target="_blank" rel="noopener noreferrer"
            className="ml-2 rounded-md border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-800 transition-colors hover:border-stone-900">
            CV
          </a>
        </div>
        <button className="p-2 text-stone-700 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-stone-200 bg-stone-50 md:hidden">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={`block px-5 py-3 text-sm ${active(l.href) ? "font-medium text-stone-900" : "text-stone-600"}`}>
              {l.label}
            </Link>
          ))}
          <a href={asset(site.cv)} target="_blank" rel="noopener noreferrer" className="block px-5 py-3 text-sm text-stone-600">Download CV</a>
        </div>
      )}
    </header>
  );
}
