"use client";

import React, { useState, useEffect } from 'react';
import {
    Menu, X, Github, Linkedin, Mail, ChevronDown,
    Map as MapIcon, Globe, Layers, Database, Code, Terminal, Cpu,
    Droplets, Activity, ArrowUpRight, Server,
    GraduationCap, ExternalLink, Briefcase,
    Star, MapPin, Waves, Eye, EyeOff, FileJson, Grid,
    Filter, MoreVertical, Plus, Minus, Move, Code2, Compass
} from 'lucide-react';

import projectsData from '../data/projects.json';
import skillsData from '../data/skills.json';
import experienceData from '../data/experience.json';
import educationData from '../data/education.json';

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = `
  @keyframes scan {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  @keyframes fade-in-up {
    0%   { opacity: 0; transform: translateY(14px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes flow {
    from { background-position: 0px 50%; }
    to   { background-position: -400px 50%; }
  }
  @keyframes radar-ping {
    0%   { transform: scale(0); opacity: 1; }
    100% { transform: scale(3); opacity: 0; }
  }
  @keyframes skill-drop {
    0%   { opacity: 0; transform: translateY(-6px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-scan        { animation: scan 5s linear infinite; }
  .animate-fade-in-up  { animation: fade-in-up 0.6s ease-out forwards; }
  .animate-flow        { background-size: 200% 200%; animation: flow 15s ease infinite; }
  .animate-radar-ping  { animation: radar-ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite; }
  .animate-skill-drop  { animation: skill-drop 0.25s ease-out forwards; }

  /* Map-style flowing streamline background for GIS dashboard */
  .streamline-bg {
    background-color: #f1f5f9;
    background-image: url("data:image/svg+xml,%3Csvg width='400' height='200' viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-10,100 C80,20 120,180 210,100 C300,20 340,180 410,100' fill='none' stroke='%23cbd5e1' stroke-width='1.5' stroke-opacity='0.8'/%3E%3Cpath d='M-10,120 C80,40 120,200 210,120 C300,40 340,200 410,120' fill='none' stroke='%2394a3b8' stroke-width='1' stroke-opacity='0.5'/%3E%3Cpath d='M-10,80 C80,0 120,160 210,80 C300,0 340,160 410,80' fill='none' stroke='%23cbd5e1' stroke-width='1' stroke-opacity='0.6'/%3E%3Cpath d='M-10,140 C80,60 120,220 210,140 C300,60 340,220 410,140' fill='none' stroke='%2394a3b8' stroke-width='0.5' stroke-opacity='0.4'/%3E%3Cpath d='M-10,100 C80,180 120,20 210,100 C300,180 340,20 410,100' fill='none' stroke='%23bae6fd' stroke-width='1' stroke-opacity='0.8' stroke-dasharray='4 4'/%3E%3C/svg%3E");
  }
  .tech-grid-bg {
    background-size: 40px 40px;
    background-image:
      linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px);
  }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .skill-chip { transition: all 0.18s ease; }
  .skill-chip:hover { background: #059669; color: white; border-color: #059669; }
  .nav-link-active { color: #059669; font-weight: 700; }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const projectColors = [
    { color: "border-emerald-500", bg: "bg-emerald-50" },
    { color: "border-blue-500", bg: "bg-blue-50" },
    { color: "border-amber-500", bg: "bg-amber-50" },
    { color: "border-slate-400", bg: "bg-slate-50" },
];

const allProjects = projectsData.map((p: any, index: number) => {
    const isRaster = p.topics?.some((t: string) => t.includes('Remote Sensing') || t.includes('Raster') || t.includes('Climate'));
    return {
        id: p.id,
        featured: p.featured || false,
        title: p.title,
        category: p.topics?.[0] || "Geospatial",
        type: isRaster ? "raster" : "vector",
        description: p.description,
        stat: p.stat || "—",
        statLabel: p.statLabel || "Key Metric",
        tech: p.technologies || [],
        color: projectColors[index % projectColors.length].color,
        bg: projectColors[index % projectColors.length].bg,
        links: { github: p.githubUrl || null },
    };
});

const featuredProjects = allProjects.filter((p: any) => p.featured);

const iconMap: { [key: string]: any } = {
    "Code2": <Code2 size={15} />,
    "Globe2": <Globe size={15} />,
    "Server": <Server size={15} />,
    "Waves": <Waves size={15} />,
    "Code": <Code size={15} />,
    "Globe": <Globe size={15} />,
    "Database": <Database size={15} />,
};

const skillCategories = (skillsData as any).categories.map((cat: any) => ({
    id: cat.id,
    name: cat.title,
    icon: iconMap[cat.icon] || <Code size={15} />,
    skills: cat.tools.map((t: any) => t.name),
}));

const timeline = [
    ...experienceData.map((e: any) => ({ type: 'work', year: e.period, title: e.role, org: e.company, desc: e.description[0] })),
    ...educationData.map((e: any) => ({ type: 'edu', year: e.period, title: e.degree, org: e.institution, desc: e.honors })),
];

// ─── TOPOGRAPHIC BACKGROUND ───────────────────────────────────────────────────
const TopoBackground = ({ opacity = 1 }: { opacity?: number }) => (
    <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity }}
    >
        <g fill="none" strokeWidth="1.2">
            {/* Hill cluster — left */}
            {[170, 135, 100, 68, 40, 18].map((r, i) => (
                <ellipse key={`l${i}`} cx="12%" cy="62%" rx={r} ry={r * 0.58} stroke="#059669" strokeOpacity={0.06 + i * 0.012} />
            ))}
            {/* Hill cluster — right */}
            {[210, 168, 128, 90, 58, 28].map((r, i) => (
                <ellipse key={`r${i}`} cx="84%" cy="32%" rx={r} ry={r * 0.62} stroke="#059669" strokeOpacity={0.05 + i * 0.01} />
            ))}
            {/* Small peak — top center */}
            {[90, 60, 35, 15].map((r, i) => (
                <ellipse key={`t${i}`} cx="52%" cy="14%" rx={r} ry={r * 0.52} stroke="#0d9488" strokeOpacity={0.06 + i * 0.015} />
            ))}
        </g>
        {/* Elevation labels */}
        <text x="12%" y="43%" fontSize="8" fill="#059669" fillOpacity="0.22" fontFamily="monospace" textAnchor="middle">1 200 m</text>
        <text x="84%" y="18%" fontSize="8" fill="#059669" fillOpacity="0.22" fontFamily="monospace" textAnchor="middle">2 100 m</text>
        <text x="52%" y="8%" fontSize="8" fill="#0d9488" fillOpacity="0.22" fontFamily="monospace" textAnchor="middle">3 400 m</text>
    </svg>
);

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const Navbar = ({ scrolled, currentView, navigateTo, isMenuOpen, setIsMenuOpen }: any) => (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200 py-3'
        : 'bg-white/60 backdrop-blur-sm border-b border-stone-100 py-4'}`}
    >
        <div className="container mx-auto px-6 flex justify-between items-center">
            <div
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => navigateTo('home')}
            >
                <div className="w-8 h-8 bg-emerald-600 text-white flex items-center justify-center rounded-lg text-xs font-black tracking-tight shadow-sm">KC</div>
                <span className="font-bold text-stone-900">Kripan K.C.</span>
            </div>

            <div className="hidden md:flex items-center gap-1">
                {['Home', 'Projects', 'About'].map(item => (
                    <button
                        key={item}
                        onClick={() => navigateTo(item.toLowerCase())}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${currentView === item.toLowerCase()
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'text-stone-500 hover:bg-stone-50 hover:text-stone-800'}`}
                    >{item}</button>
                ))}
                <button
                    onClick={() => navigateTo('contact')}
                    className="ml-3 px-4 py-2 text-sm font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all shadow-sm"
                >Contact</button>
            </div>

            <button className="md:hidden p-2 text-stone-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
        </div>

        {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-stone-100 shadow-lg">
                {['Home', 'Projects', 'About', 'Contact'].map(item => (
                    <button
                        key={item}
                        onClick={() => navigateTo(item.toLowerCase())}
                        className="block w-full text-left px-6 py-3 text-stone-700 hover:bg-stone-50 text-sm font-medium border-b border-stone-50"
                    >{item}</button>
                ))}
            </div>
        )}
    </nav>
);

// ─── GIS MAP DECORATIONS ──────────────────────────────────────────────────────
const NorthArrow = () => (
    <div className="flex flex-col items-center bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm border border-slate-200">
        <span className="text-[10px] font-black text-slate-800 mb-0.5 leading-none">N</span>
        <Compass size={20} strokeWidth={1.5} className="text-slate-800" />
    </div>
);

const ScaleBar = () => (
    <div className="flex flex-col items-start bg-white/90 backdrop-blur-sm p-2 rounded shadow-sm border border-slate-200">
        <div className="flex items-end h-2.5 mb-1 w-[128px]">
            <div className="border-l border-b border-slate-800 h-full w-1/4"></div>
            <div className="border-b border-slate-800 h-full w-1/4 bg-slate-800"></div>
            <div className="border-r border-b border-slate-800 h-full w-1/4"></div>
            <div className="border-r border-b border-slate-800 h-full w-1/4 bg-slate-800"></div>
        </div>
        <div className="flex justify-between w-full text-[9px] font-mono text-slate-700 font-bold px-0.5">
            <span>0</span><span>10</span><span>20 km</span>
        </div>
    </div>
);

// ─── GIS DASHBOARD — UNCHANGED (Featured Projects) ────────────────────────────
const GISDashboard = ({ projects, title }: any) => {
    const [selectedId, setSelectedId] = useState(projects[0]?.id);
    const selectedProject = projects.find((p: any) => p.id === selectedId) || projects[0];
    if (!selectedProject) return null;
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-6 h-[750px] flex flex-col relative z-10">
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                            <MapIcon className="text-emerald-600" /> {title}
                        </h2>
                        <p className="text-slate-500">Interactive GIS Layer Explorer.</p>
                    </div>
                </div>
                <div className="flex-grow flex flex-col md:flex-row gap-0 overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-2xl">
                    {/* Left Sidebar */}
                    <div className="w-full md:w-80 flex-shrink-0 border-b md:border-b-0 md:border-r border-slate-300 bg-slate-50 flex flex-col z-20 shadow-[2px_0_10px_rgba(0,0,0,0.05)]">
                        <div className="p-4 border-b border-slate-300 bg-white flex justify-between items-center">
                            <span className="text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center gap-2">
                                <Layers size={14} /> Contents
                            </span>
                            <div className="flex gap-2">
                                <Filter size={14} className="text-slate-400 cursor-pointer hover:text-slate-700" />
                                <MoreVertical size={14} className="text-slate-400 cursor-pointer hover:text-slate-700" />
                            </div>
                        </div>
                        <div className="flex-grow overflow-y-auto p-3 space-y-1">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 pl-2">Drawing Order</div>
                            {projects.map((project: any) => (
                                <div
                                    key={project.id}
                                    onClick={() => setSelectedId(project.id)}
                                    className={`p-3 rounded border flex items-center gap-3 cursor-pointer transition-all ${selectedId === project.id ? 'bg-blue-50 border-blue-200' : 'bg-transparent border-transparent hover:bg-slate-100'}`}
                                >
                                    <div className={selectedId === project.id ? 'text-blue-600' : 'text-slate-300'}>
                                        {selectedId === project.id ? <Eye size={16} /> : <EyeOff size={16} />}
                                    </div>
                                    <div className="flex items-center justify-center w-5 h-5 bg-white border border-slate-200 rounded shrink-0">
                                        {project.type === 'raster' ? <Grid size={12} className="text-emerald-600" /> : <MapIcon size={12} className="text-blue-600" />}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className={`text-sm truncate ${selectedId === project.id ? 'font-bold text-blue-900' : 'font-medium text-slate-700'}`}>{project.title}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Main Canvas */}
                    <div className="flex-grow relative bg-slate-200 overflow-hidden streamline-bg animate-flow flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]">
                        <div className="absolute top-4 left-4 flex flex-col gap-1 z-10 bg-white/90 backdrop-blur-sm shadow-md rounded border border-slate-300 overflow-hidden hidden md:flex">
                            <button className="p-2 text-slate-600 hover:bg-slate-50 border-b border-slate-200"><Plus size={16} /></button>
                            <button className="p-2 text-slate-600 hover:bg-slate-50"><Minus size={16} /></button>
                        </div>
                        <div className="absolute top-4 right-4 z-10"><NorthArrow /></div>
                        <div className="absolute bottom-4 left-4 z-10 hidden md:block"><ScaleBar /></div>

                        {/* Feature Info Panel */}
                        <div className="w-[90%] md:w-[75%] h-[85%] md:h-[75%] bg-white/95 backdrop-blur-xl border border-slate-300 flex flex-col shadow-2xl rounded-xl z-30 overflow-hidden ring-1 ring-slate-900/5 animate-fade-in-up">
                            <div className="p-3 px-5 border-b border-slate-200 bg-slate-100 flex justify-between items-center cursor-move">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                                    <FileJson size={14} className="text-blue-600" /> Identify Results: Layer Data
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Move size={14} className="hover:text-slate-700 cursor-pointer" />
                                    <X size={14} className="hover:text-slate-700 cursor-pointer" />
                                </div>
                            </div>

                            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 overflow-y-auto flex-grow">
                                {/* Left column */}
                                <div className="flex-1 flex flex-col">
                                    <div className="mb-4">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 inline-block">
                                            {selectedProject.category}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">{selectedProject.title}</h3>
                                    <p className="text-base text-slate-600 leading-relaxed mb-6 max-w-2xl">{selectedProject.description}</p>
                                    <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Tech Stack:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tech.map((t: string) => (
                                            <span key={t} className="px-3 py-1.5 bg-slate-50 text-slate-700 text-xs rounded-md border border-slate-200 font-mono font-medium">{t}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right column — attribute table */}
                                <div className="md:w-[320px] shrink-0 flex flex-col">
                                    {/* Key metric callout */}
                                    <div className="bg-stone-900 rounded-xl p-5 mb-4 text-center">
                                        <div className="text-3xl font-black text-emerald-400 mb-1">{selectedProject.stat}</div>
                                        <div className="text-stone-400 text-xs font-mono uppercase tracking-widest">{selectedProject.statLabel}</div>
                                    </div>

                                    <div className="border rounded-lg border-slate-300 overflow-hidden mb-6 bg-white shadow-sm">
                                        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 uppercase tracking-wider">Feature Attributes</div>
                                        <table className="w-full text-sm text-left">
                                            <tbody className="divide-y divide-slate-100">
                                                <tr>
                                                    <td className="px-4 py-3 border-r border-slate-100 font-mono text-xs text-slate-500 w-1/3">category</td>
                                                    <td className="px-4 py-3 text-slate-600 text-xs">{selectedProject.category}</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3 border-r border-slate-100 font-mono text-xs text-slate-500">geom_type</td>
                                                    <td className="px-4 py-3 text-slate-600 text-xs capitalize">{selectedProject.type}</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3 border-r border-slate-100 font-mono text-xs text-slate-500">tech_count</td>
                                                    <td className="px-4 py-3 text-slate-600 text-xs">{selectedProject.tech.length} technologies</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-auto">
                                        {selectedProject.links.github && (
                                            <a href={selectedProject.links.github} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-sm col-span-2">
                                                <Github size={16} /> View on GitHub
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ─── COMPACT SKILLS ───────────────────────────────────────────────────────────
const CompactSkills = () => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const activeCat = skillCategories.find(c => c.id === activeId);

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-3">
                {skillCategories.map((cat: any) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveId(activeId === cat.id ? null : cat.id)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-all ${activeId === cat.id
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-white text-stone-600 border-stone-200 hover:border-emerald-400 hover:text-emerald-700'}`}
                    >
                        {cat.icon} <span>{cat.name}</span>
                    </button>
                ))}
            </div>

            {activeCat && (
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex flex-wrap gap-2 animate-skill-drop">
                    {activeCat.skills.map((skill: string) => (
                        <span key={skill} className="skill-chip px-3 py-1.5 bg-white border border-stone-200 rounded-full text-xs font-medium text-stone-700 cursor-default shadow-sm">
                            {skill}
                        </span>
                    ))}
                </div>
            )}

            {!activeCat && (
                <div className="p-4 bg-stone-50 border border-dashed border-stone-200 rounded-xl text-xs text-stone-400 text-center">
                    Select a category to explore technologies
                </div>
            )}
        </div>
    );
};

// ─── PROJECTS ARCHIVE PAGE ────────────────────────────────────────────────────
const ProjectsView = () => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', ...Array.from(new Set(allProjects.map((p: any) => p.category)))];
    const filtered = filter === 'All' ? allProjects : allProjects.filter((p: any) => p.category === filter);

    return (
        <div className="min-h-screen bg-stone-50 pt-24 pb-20">
            <style>{styles}</style>
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 mb-4">
                        <Database size={12} /> Project Archive
                    </div>
                    <h1 className="text-3xl font-black text-stone-900 mb-3">All Projects</h1>
                    <p className="text-stone-500 text-sm">Geospatial engineering, remote sensing, and environmental modelling.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map((cat: any) => (
                        <button key={cat} onClick={() => setFilter(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === cat
                                ? 'bg-stone-900 text-white shadow-sm'
                                : 'bg-white text-stone-500 border border-stone-200 hover:border-emerald-400 hover:text-emerald-600'}`}
                        >{cat}</button>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    {filtered.map((project: any) => (
                        <div key={project.id} className="bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group overflow-hidden flex">
                            <div className={`w-1 shrink-0 ${project.color.replace('border-', 'bg-')}`} />
                            <div className="p-6 flex flex-col md:flex-row gap-6 w-full">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 bg-stone-100 px-2 py-0.5 rounded">{project.category}</span>
                                        {project.featured && (
                                            <span className="text-[10px] font-bold uppercase text-emerald-600 flex items-center gap-1">
                                                <Star size={9} className="fill-emerald-600" /> Featured
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-emerald-700 transition-colors">{project.title}</h3>
                                    <p className="text-stone-500 text-sm leading-relaxed mb-3">{project.description}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tech.map((t: string) => (
                                            <span key={t} className="px-2 py-0.5 bg-stone-50 border border-stone-100 rounded text-[10px] font-mono text-stone-400">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="md:w-44 flex flex-col justify-between border-t md:border-t-0 md:border-l border-stone-100 pt-4 md:pt-0 md:pl-6 shrink-0">
                                    <div className="mb-4 bg-stone-900 rounded-xl p-4 text-center">
                                        <div className="text-xl font-black text-emerald-400">{project.stat}</div>
                                        <div className="text-[10px] uppercase text-stone-500 font-bold tracking-wider mt-1">{project.statLabel}</div>
                                    </div>
                                    {project.links.github && (
                                        <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 px-3 py-2 bg-stone-50 hover:bg-stone-900 hover:text-white border border-stone-200 rounded-lg text-sm font-medium text-stone-700 transition-all">
                                            <Github size={13} /> GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
const AboutView = () => (
    <div className="min-h-screen bg-stone-50 pt-24 pb-20">
        <style>{styles}</style>
        <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm sticky top-24">
                        <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black mb-6">KC</div>
                        <h1 className="text-2xl font-black text-stone-900">Kripan K.C.</h1>
                        <p className="text-emerald-600 font-semibold text-sm mt-1 mb-6">Environmental Engineer · Geospatial Developer</p>
                        <p className="text-stone-500 text-sm leading-relaxed mb-6">
                            M.Sc. Environmental Engineering, TUM. Building spatial data systems and risk modelling tools that bridge environmental science and engineering software.
                        </p>
                        <div className="space-y-2 border-t border-stone-100 pt-6">
                            <a href="https://github.com/Kripankc" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors">
                                <Github size={16} /> github.com/Kripankc
                            </a>
                            <a href="mailto:kc.kripan@gmail.com"
                                className="flex items-center gap-2 text-sm text-stone-500 hover:text-emerald-600 transition-colors">
                                <Mail size={16} /> kc.kripan@gmail.com
                            </a>
                            <div className="flex items-center gap-2 text-sm text-stone-400 font-mono">
                                <MapPin size={14} /> 48.1351°N, 11.5820°E
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8">
                    <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
                        <h2 className="text-lg font-black text-stone-900 mb-8 flex items-center gap-2 border-b border-stone-100 pb-4">
                            <Briefcase size={18} className="text-emerald-600" /> Professional Journey
                        </h2>
                        <div className="relative border-l-2 border-stone-100 ml-3 space-y-10">
                            {timeline.map((item: any, i: number) => (
                                <div key={i} className="relative pl-10">
                                    <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${item.type === 'work' ? 'bg-emerald-500' : 'bg-blue-400'}`} />
                                    <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
                                        <h3 className="font-bold text-stone-900">{item.title}</h3>
                                        <span className="font-mono text-xs text-stone-400 mt-0.5">{item.year}</span>
                                    </div>
                                    <div className="text-sm font-semibold text-emerald-700 mb-2">{item.org}</div>
                                    {item.desc && <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// ─── CONTACT PAGE — minimal, just email + LinkedIn ────────────────────────────
const ContactView = () => (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 relative overflow-hidden">
        <style>{styles}</style>
        <TopoBackground opacity={0.5} />

        {/* Subtle scan overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan" />
        </div>

        <div className="relative z-10 w-full max-w-lg mx-auto px-6 text-center">
            {/* Location badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-stone-200 rounded-full text-stone-500 text-xs font-mono mb-8 shadow-sm">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                48.1351°N, 11.5820°E · Munich, Germany
            </div>

            <h1 className="text-5xl font-black text-stone-900 mb-3">Say hello.</h1>
            <p className="text-stone-400 mb-10 text-sm">Pick a channel. I respond within 48 hours.</p>

            <div className="grid grid-cols-2 gap-4">
                {/* Email */}
                <a
                    href="mailto:kc.kripan@gmail.com"
                    className="group flex flex-col items-center gap-4 p-6 bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-emerald-400 hover:shadow-lg transition-all"
                >
                    <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                        <Mail size={24} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Email</div>
                        <div className="font-bold text-stone-800 text-xs leading-tight">kc.kripan<br />@gmail.com</div>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold mt-auto">
                        Write now <ArrowUpRight size={11} />
                    </div>
                </a>

                {/* LinkedIn */}
                <a
                    href="https://linkedin.com/in/kripankc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-4 p-6 bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-blue-400 hover:shadow-lg transition-all"
                >
                    <div className="w-14 h-14 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                        <Linkedin size={24} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">LinkedIn</div>
                        <div className="font-bold text-stone-800 text-xs leading-tight">Kripan K.C.</div>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600 text-xs font-bold mt-auto">
                        View profile <ArrowUpRight size={11} />
                    </div>
                </a>
            </div>

            {/* GIS coordinate footer */}
            <div className="mt-10 text-xs font-mono text-stone-300 flex items-center justify-center gap-4">
                <span>EPSG:4326</span>
                <span>·</span>
                <span>WGS84</span>
                <span>·</span>
                <span>ALT 519m</span>
            </div>
        </div>
    </div>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [currentView, setCurrentView] = useState('home');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navigateTo = (view: string) => {
        setIsMenuOpen(false);
        setCurrentView(view);
        window.scrollTo(0, 0);
    };

    const renderView = () => {
        switch (currentView) {
            case 'home': return (
                <main>
                    <style>{styles}</style>

                    {/* ── SECTION 1: Hero ── */}
                    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-50">
                        <TopoBackground />

                        {/* Scan line */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
                            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-scan shadow-[0_0_8px_rgba(5,150,105,0.6)]" />
                        </div>

                        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
                            {/* Status badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-stone-200 rounded-full text-stone-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                Geospatial Data Science · Munich Re Internship
                            </div>

                            {/* Name */}
                            <h1 className="text-7xl md:text-9xl font-black tracking-tight leading-[0.9] mb-6 text-stone-900">
                                Kripan<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">K.C.</span>
                            </h1>

                            {/* Tagline */}
                            <p className="text-lg md:text-xl text-stone-500 leading-relaxed mb-8 max-w-xl mx-auto">
                                Building <span className="text-emerald-700 font-semibold">spatial pipelines</span>,{' '}
                                <span className="text-teal-700 font-semibold">global-scale algorithms</span>, and{' '}
                                <span className="text-blue-700 font-semibold">geospatial risk tools</span>.
                            </p>

                            {/* Stat pills */}
                            <div className="flex flex-wrap justify-center gap-2.5 mb-10">
                                {[
                                    { val: '~200', label: 'territories mapped' },
                                    { val: '5', label: 'production systems' },
                                    { val: '9', label: 'countries linked' },
                                    { val: '50m', label: 'raster resolution' },
                                ].map(s => (
                                    <div key={s.val} className="px-4 py-2 bg-white border border-stone-200 rounded-xl text-sm shadow-sm hover:-translate-y-0.5 transition-transform cursor-default">
                                        <span className="font-black text-stone-900">{s.val}</span>
                                        <span className="text-stone-400 ml-1.5 text-xs">{s.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={() => navigateTo('projects')}
                                    className="px-7 py-3.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all hover:-translate-y-0.5 shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 text-sm"
                                >
                                    View All Projects <ArrowUpRight size={15} />
                                </button>
                                <a
                                    href="https://github.com/Kripankc/geospatial-portfolio"
                                    target="_blank" rel="noopener noreferrer"
                                    className="px-7 py-3.5 bg-white border border-stone-200 text-stone-700 rounded-xl font-bold hover:border-stone-300 hover:bg-stone-50 transition-all hover:-translate-y-0.5 shadow-sm flex items-center justify-center gap-2 text-sm"
                                >
                                    <Github size={15} /> Portfolio Repo
                                </a>
                            </div>

                            <div className="mt-14 flex flex-col items-center gap-1 text-stone-300">
                                <ChevronDown size={20} className="animate-bounce" />
                            </div>
                        </div>

                        {/* Corner coordinates */}
                        <div className="absolute bottom-6 left-6 font-mono text-[10px] text-stone-300 hidden md:flex flex-col gap-0.5">
                            <div className="border-b border-l border-stone-200 w-5 h-5 mb-1" />
                            <span>48.1351° N</span>
                            <span>11.5820° E</span>
                        </div>
                        <div className="absolute bottom-6 right-6 font-mono text-[10px] text-stone-300 text-right hidden md:flex flex-col gap-0.5 items-end">
                            <div className="border-b border-r border-stone-200 w-5 h-5 mb-1 self-end" />
                            <span>EPSG:4326</span>
                            <span>WGS84</span>
                        </div>
                    </section>

                    {/* ── SECTION 2: About + Technical Stack ── */}
                    <section className="min-h-screen flex items-center py-20 bg-white border-t border-stone-100">
                        <div className="container mx-auto px-6">
                            <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto items-center">

                                {/* LEFT: About */}
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-5 flex items-center gap-2">
                                        <MapPin size={11} /> Profile
                                    </div>
                                    <h2 className="text-4xl font-black text-stone-900 mb-5 leading-tight">
                                        Translating Earth's systems<br />
                                        into <span className="text-emerald-600">computational logic.</span>
                                    </h2>
                                    <p className="text-stone-500 leading-relaxed mb-8 text-sm">
                                        Environmental Engineering graduate from TUM with hands-on experience building production
                                        geospatial systems at Munich Re. I bridge physical environmental science and modern
                                        software architecture — building tools that help organizations understand and price climate risk.
                                    </p>

                                    {/* Experience timeline — compact pills */}
                                    <div className="space-y-2.5">
                                        {[
                                            { year: 'Sep 2025 – Mar 2026', role: 'Geospatial Data Science Intern', org: 'Munich Re', color: 'bg-emerald-50 border-emerald-100' },
                                            { year: 'Nov 2024 – Sep 2025', role: 'Student Research Assistant', org: 'TUM', color: 'bg-blue-50 border-blue-100' },
                                            { year: 'Jun 2023 – Apr 2024', role: 'Environmental Engineer', org: 'RISE Nepal', color: 'bg-stone-50 border-stone-200' },
                                            { year: 'Apr 2020 – Mar 2024', role: 'Freelance GIS Analyst', org: 'Upwork', color: 'bg-amber-50 border-amber-100' },
                                        ].map(item => (
                                            <div key={item.org} className={`flex items-center justify-between px-4 py-3 rounded-xl border ${item.color}`}>
                                                <div>
                                                    <div className="font-semibold text-stone-800 text-sm">{item.role}</div>
                                                    <div className="text-xs text-stone-400">{item.org}</div>
                                                </div>
                                                <div className="font-mono text-[10px] text-stone-400 text-right hidden sm:block">{item.year}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => navigateTo('about')}
                                        className="mt-6 flex items-center gap-1.5 text-sm font-bold text-stone-500 hover:text-emerald-600 transition-colors"
                                    >
                                        Full biography <ArrowUpRight size={13} />
                                    </button>
                                </div>

                                {/* RIGHT: Compact Skills */}
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-5 flex items-center gap-2">
                                        <Layers size={11} /> Technical Competencies
                                    </div>
                                    <p className="text-stone-400 text-xs mb-5">Select a domain to explore tools.</p>

                                    <CompactSkills />

                                    {/* Contact links */}
                                    <div className="mt-8 pt-6 border-t border-stone-100 flex flex-wrap gap-2">
                                        <a
                                            href="mailto:kc.kripan@gmail.com"
                                            className="flex items-center gap-1.5 px-3 py-2 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-lg text-xs font-medium text-stone-600 hover:text-emerald-700 transition-all"
                                        >
                                            <Mail size={12} /> kc.kripan@gmail.com
                                        </a>
                                        <a
                                            href="https://linkedin.com/in/kripankc"
                                            target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-2 bg-stone-50 hover:bg-blue-50 border border-stone-200 hover:border-blue-300 rounded-lg text-xs font-medium text-stone-600 hover:text-blue-700 transition-all"
                                        >
                                            <Linkedin size={12} /> LinkedIn
                                        </a>
                                        <a
                                            href="https://github.com/Kripankc"
                                            target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-xs font-medium text-stone-600 transition-all"
                                        >
                                            <Github size={12} /> GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── SECTION 3: Featured Projects — GISDashboard unchanged ── */}
                    <GISDashboard projects={featuredProjects} title="Featured Projects" />
                </main>
            );
            case 'about': return <AboutView />;
            case 'projects': return <ProjectsView />;
            case 'contact': return <ContactView />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
            <Navbar
                scrolled={scrolled}
                currentView={currentView}
                navigateTo={navigateTo}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />

            {renderView()}

            <footer className="bg-white border-t border-stone-100 py-6">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <span className="font-mono text-xs text-stone-400">
                        48.1351°N, 11.5820°E · © {new Date().getFullYear()} Kripan K.C.
                    </span>
                    <div className="flex gap-3">
                        <a href="https://github.com/Kripankc" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors"><Github size={16} /></a>
                        <a href="https://linkedin.com/in/kripankc" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-blue-600 transition-colors"><Linkedin size={16} /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;
