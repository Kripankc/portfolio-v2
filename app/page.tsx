"use client";

import React, { useState, useEffect } from 'react';
import {
    Menu, X, Github, Linkedin, Mail, ChevronRight, ChevronLeft, ChevronDown,
    Map as MapIcon, Globe, Layers, Database, Download, Code, Terminal, Cpu,
    Leaf, Droplets, Wind, Activity, ArrowUpRight, Zap, Box, GitBranch, Server,
    GraduationCap, Award, HeartHandshake, ExternalLink, Search, Filter, Briefcase,
    Star, MapPin, Calendar, Waves, Compass, Eye, EyeOff, FileJson, Grid,
    MoreVertical, Plus, Minus, Send, Radio, Move, Code2
} from 'lucide-react';

import projectsData from '../data/projects.json';
import skillsData from '../data/skills.json';
import experienceData from '../data/experience.json';
import educationData from '../data/education.json';

// --- CUSTOM CSS FOR ANIMATIONS ---
const styles = `
  @keyframes scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  @keyframes fade-in-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes flow {
    from { background-position: 0px 50%; }
    to { background-position: -400px 50%; }
  }
  @keyframes orbit {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes radar-ping {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(3); opacity: 0; }
  }
  .animate-scan {
    animation: scan 4s linear infinite;
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }
  .animate-flow {
    background-size: 200% 200%;
    animation: flow 15s ease infinite;
  }
  .animate-orbit {
    animation: orbit 20s linear infinite;
  }
  .animate-orbit-reverse {
    animation: orbit 25s linear infinite reverse;
  }
  .animate-radar-ping {
    animation: radar-ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  
  .tech-grid-bg {
    background-size: 40px 40px;
    background-image: 
      linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px);
  }

  .topo-bg {
    background-color: #f8fafc;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 2.24 5 5 2.24 5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 2.24 5 5 2.24 5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 2.24 5 5 2.24 5 5 2.24 5 5 2.24 5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2394a3b8' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
  }

  .streamline-bg {
    background-color: #f1f5f9;
    background-image: url("data:image/svg+xml,%3Csvg width='400' height='200' viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-10,100 C80,20 120,180 210,100 C300,20 340,180 410,100' fill='none' stroke='%23cbd5e1' stroke-width='1.5' stroke-opacity='0.8'/%3E%3Cpath d='M-10,120 C80,40 120,200 210,120 C300,40 340,200 410,120' fill='none' stroke='%2394a3b8' stroke-width='1' stroke-opacity='0.5'/%3E%3Cpath d='M-10,80 C80,0 120,160 210,80 C300,0 340,160 410,80' fill='none' stroke='%23cbd5e1' stroke-width='1' stroke-opacity='0.6'/%3E%3Cpath d='M-10,140 C80,60 120,220 210,140 C300,60 340,220 410,140' fill='none' stroke='%2394a3b8' stroke-width='0.5' stroke-opacity='0.4'/%3E%3Cpath d='M-10,60 C80,-20 120,140 210,60 C300,-20 340,140 410,60' fill='none' stroke='%23cbd5e1' stroke-width='0.5' stroke-opacity='0.7'/%3E%3Cpath d='M-10,100 C80,180 120,20 210,100 C300,180 340,20 410,100' fill='none' stroke='%23bae6fd' stroke-width='1' stroke-opacity='0.8' stroke-dasharray='4 4'/%3E%3C/svg%3E");
  }
  
  .scrollbar-hide::-webkit-scrollbar {
      display: none;
  }
`;

// --- DATA DEFINITIONS ---

const bio = {
    title: "Engineering with Purpose",
    description: "I am an Environmental Engineer passionate about leveraging technology to solve critical ecological challenges. With a strong foundation in both physical environmental processes and modern computational tools, I build systems that not only analyze risk but help mitigate it. My work bridges the gap between raw scientific data and actionable policy insights.",
};

// Merge Experience and Education for Timeline
const timeline = [
    ...experienceData.map((exp: any) => ({
        type: 'work',
        year: exp.period,
        title: exp.role,
        org: exp.company,
        desc: exp.description[0], // Take first line of description
        tech: [] // Tech not explicitly in experience.json, leaving empty or could infer
    })),
    ...educationData.map((edu: any) => ({
        type: 'edu',
        year: edu.period,
        title: edu.degree,
        org: edu.institution,
        desc: edu.honors
    }))
];

// Map Projects Data
const projectColors = [
    { color: "border-emerald-500", bg: "bg-emerald-50" },
    { color: "border-blue-500", bg: "bg-blue-50" },
    { color: "border-amber-500", bg: "bg-amber-50" },
    { color: "border-slate-400", bg: "bg-slate-50" }
];

const allProjects = projectsData.map((p: any, index: number) => {
    const isRaster = p.topics?.some((t: string) => t.includes('Remote Sensing') || t.includes('Raster'));
    const isSensor = p.topics?.some((t: string) => t.includes('IoT') || t.includes('Sensor'));

    return {
        id: p.id,
        featured: p.featured || false,
        title: p.title,
        category: p.topics?.[0] || "Geospatial",
        type: isRaster ? "raster" : (isSensor ? "sensor" : "vector"),
        description: p.description,
        stat: "N/A", // Placeholder
        statLabel: "Metric",
        tech: p.technologies || [],
        color: projectColors[index % projectColors.length].color,
        bg: projectColors[index % projectColors.length].bg,
        links: { github: p.githubUrl, demo: "#" }
    };
});

const featuredProjects = allProjects.filter((p: any) => p.featured);

// Map Skills Data
const iconMap: { [key: string]: any } = {
    "Code2": <Code2 size={20} />,
    "Globe2": <Globe size={20} />,
    "Server": <Server size={20} />,
    "Waves": <Waves size={20} />,
    // Fallbacks
    "Code": <Code size={20} />,
    "Globe": <Globe size={20} />,
    "Database": <Database size={20} />,
    "Terminal": <Terminal size={20} />,
    "Cpu": <Cpu size={20} />,
    "Layers": <Layers size={20} />
};

const skillColors = [
    'bg-blue-50 text-blue-600 border-blue-200',
    'bg-emerald-50 text-emerald-600 border-emerald-200',
    'bg-purple-50 text-purple-600 border-purple-200',
    'bg-cyan-50 text-cyan-600 border-cyan-200'
];

const skillCategories = (skillsData as any).categories.map((cat: any, index: number) => ({
    id: cat.id,
    name: cat.title,
    icon: iconMap[cat.icon] || <Code size={20} />,
    color: skillColors[index % skillColors.length],
    skills: cat.tools.map((t: any) => t.name),
    projects: cat.tools.flatMap((t: any) => t.projects || []) // Array of project IDs
}));


// --- SEPARATED COMPONENTS TO FIX RENDERING ISSUES ---

const Navbar = ({ scrolled, currentView, navigateTo, isMenuOpen, setIsMenuOpen }: any) => (
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/95 backdrop-blur-md border-slate-200 py-3' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
            <div
                className="text-xl font-bold tracking-tight text-slate-900 cursor-pointer flex items-center gap-2"
                onClick={() => navigateTo('home')}
            >
                <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center rounded-lg shadow-sm">KC</div>
                <span>Kripan K.C.</span>
            </div>

            <div className="hidden md:flex items-center space-x-1">
                {['Home', 'About', 'Projects'].map(item => {
                    const isActive = currentView === item.toLowerCase();
                    return (
                        <button
                            key={item}
                            onClick={() => navigateTo(item.toLowerCase())}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${isActive
                                    ? 'bg-slate-100 text-slate-900'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            {item}
                        </button>
                    );
                })}
                <button
                    onClick={() => navigateTo('contact')}
                    className={`ml-4 px-4 py-2 text-sm font-medium rounded-lg transition-all shadow-md hover:shadow-lg ${currentView === 'contact' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                >
                    Contact
                </button>
            </div>

            <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-b border-slate-200">
                <div className="flex flex-col py-2">
                    {['Home', 'About', 'Projects', 'Contact'].map(item => (
                        <button
                            key={item}
                            onClick={() => navigateTo(item.toLowerCase())}
                            className="px-6 py-4 text-left text-slate-600 hover:bg-slate-50 font-medium border-b border-slate-50 last:border-0"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        )}
    </nav>
);

const TechArsenal = ({ navigateTo }: any) => {
    const [activeTechCategory, setActiveTechCategory] = useState(skillCategories[0].id);
    const activeCategoryData = skillCategories.find((c: any) => c.id === activeTechCategory);

    return (
        <section className="py-24 bg-white border-y border-slate-100">
            <div className="container mx-auto px-6">
                <div className="mb-12 flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900">Technical Arsenal</h2>
                        <p className="text-slate-500 mt-2">Technologies I use to build robust solutions.</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {skillCategories.map((cat: any) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTechCategory(cat.id)}
                            className={`p-6 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between h-32 relative overflow-hidden ${activeTechCategory === cat.id
                                    ? `bg-white border-blue-500 shadow-md ring-1 ring-blue-500`
                                    : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-white'
                                }`}
                        >
                            <div className="flex justify-between items-start w-full">
                                <div className={`p-2 rounded-lg ${cat.color} bg-opacity-20`}>{cat.icon}</div>
                                {activeTechCategory === cat.id && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                            </div>
                            <div>
                                <h3 className={`font-bold text-sm ${activeTechCategory === cat.id ? 'text-blue-700' : 'text-slate-700'}`}>{cat.name}</h3>
                                <div className="text-xs text-slate-400 mt-1">{cat.skills.length} skills</div>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
                    <div className="flex flex-col md:flex-row">
                        <div className="p-8 md:w-1/2 border-b md:border-b-0 md:border-r border-slate-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-slate-900">{activeCategoryData?.name}</h3>
                                <span className="text-xs font-mono text-slate-400 border border-slate-200 px-2 py-1 rounded">COMPETENCIES</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {activeCategoryData?.skills.map((skill: string) => (
                                    <span key={skill} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="p-8 md:w-1/2 bg-slate-50/50">
                            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-6">
                                <Layers size={16} className="text-blue-500" /> Applied in Projects
                            </h4>
                            <div className="space-y-3">
                                {activeCategoryData?.projects.slice(0, 3).map((pid: string) => {
                                    const project = allProjects.find((p: any) => p.id === pid);
                                    if (!project) return null;
                                    return (
                                        <div key={pid} className="group p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer flex justify-between items-center"
                                            onClick={() => navigateTo('projects')}
                                        >
                                            <div>
                                                <h5 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{project.title}</h5>
                                                <p className="text-xs text-slate-500 mt-0.5">{project.category}</p>
                                            </div>
                                            <ArrowUpRight size={14} className="text-slate-300 group-hover:text-blue-500" />
                                        </div>
                                    );
                                })}
                                {activeCategoryData?.projects.length === 0 && (
                                    <p className="text-sm text-slate-400 italic">No projects linked to this category yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

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
            <span>0</span>
            <span>10</span>
            <span>20 km</span>
        </div>
    </div>
);

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

                {/* Main Dashboard Container */}
                <div className="flex-grow flex flex-col md:flex-row gap-0 overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-2xl">

                    {/* Left Sidebar: Layer Control (ArcGIS "Contents" Pane) */}
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
                                    className={`p-3 rounded border flex items-center gap-3 cursor-pointer transition-all ${selectedId === project.id
                                            ? 'bg-blue-50 border-blue-200'
                                            : 'bg-transparent border-transparent hover:bg-slate-100'
                                        }`}
                                >
                                    <div className={`${selectedId === project.id ? 'text-blue-600' : 'text-slate-300'}`}>
                                        {selectedId === project.id ? <Eye size={16} /> : <EyeOff size={16} />}
                                    </div>
                                    <div className="flex items-center justify-center w-5 h-5 bg-white border border-slate-200 rounded shrink-0">
                                        {project.type === 'raster' && <Grid size={12} className="text-emerald-600" />}
                                        {project.type === 'vector' && <MapIcon size={12} className="text-blue-600" />}
                                        {project.type === 'sensor' && <Activity size={12} className="text-amber-600" />}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className={`text-sm truncate ${selectedId === project.id ? 'font-bold text-blue-900' : 'font-medium text-slate-700'}`}>{project.title}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Main: Map Canvas & Floating Info Panel */}
                    <div className="flex-grow relative bg-slate-200 overflow-hidden streamline-bg animate-flow flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]">

                        {/* Map Controls */}
                        <div className="absolute top-4 left-4 flex flex-col gap-1 z-10 bg-white/90 backdrop-blur-sm shadow-md rounded border border-slate-300 overflow-hidden hidden md:flex">
                            <button className="p-2 text-slate-600 hover:bg-slate-50 border-b border-slate-200"><Plus size={16} /></button>
                            <button className="p-2 text-slate-600 hover:bg-slate-50"><Minus size={16} /></button>
                        </div>

                        {/* North Arrow */}
                        <div className="absolute top-4 right-4 z-10">
                            <NorthArrow />
                        </div>

                        {/* Scale Bar */}
                        <div className="absolute bottom-4 left-4 z-10 hidden md:block">
                            <ScaleBar />
                        </div>

                        {/* Feature Info Panel (Floating Centered Layer Box) */}
                        <div className="w-[90%] md:w-[75%] h-[85%] md:h-[75%] bg-white/95 backdrop-blur-xl border border-slate-300 flex flex-col shadow-2xl rounded-xl z-30 overflow-hidden ring-1 ring-slate-900/5 animate-fade-in-up">
                            {/* Panel Header */}
                            <div className="p-3 px-5 border-b border-slate-200 bg-slate-100 flex justify-between items-center cursor-move">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                                    <FileJson size={14} className="text-blue-600" /> Identify Results: Layer Data
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Move size={14} className="hover:text-slate-700 cursor-pointer" />
                                    <X size={14} className="hover:text-slate-700 cursor-pointer" />
                                </div>
                            </div>

                            {/* Content - Landscape Centered Layout */}
                            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 overflow-y-auto custom-scrollbar flex-grow">

                                {/* Left Column: Descriptions & Tags */}
                                <div className="flex-1 flex flex-col">
                                    <div className="mb-4">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 inline-block">
                                            {selectedProject.category}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                                        {selectedProject.title}
                                    </h3>
                                    <p className="text-base text-slate-600 leading-relaxed mb-6 max-w-2xl">
                                        {selectedProject.description}
                                    </p>

                                    <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Tech Stack:</div>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {selectedProject.tech.map((t: string) => (
                                            <span key={t} className="px-3 py-1.5 bg-slate-50 text-slate-700 text-xs rounded-md border border-slate-200 font-mono font-medium">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Column: Attribute Table & Links */}
                                <div className="md:w-[350px] shrink-0 flex flex-col">
                                    <div className="border rounded-lg border-slate-300 overflow-hidden mb-6 bg-white shadow-sm">
                                        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                            Feature Attributes
                                        </div>
                                        <table className="w-full text-sm text-left">
                                            <tbody className="divide-y divide-slate-100">
                                                <tr>
                                                    <td className="px-4 py-3 border-r border-slate-100 font-mono text-xs text-slate-500 w-1/3">stat_metric</td>
                                                    <td className="px-4 py-3 font-bold text-slate-900">{selectedProject.stat}</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3 border-r border-slate-100 font-mono text-xs text-slate-500 w-1/3">metric_desc</td>
                                                    <td className="px-4 py-3 text-slate-600 text-xs">{selectedProject.statLabel}</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3 border-r border-slate-100 font-mono text-xs text-slate-500 w-1/3">geom_type</td>
                                                    <td className="px-4 py-3 text-slate-600 text-xs capitalize">{selectedProject.type}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-auto">
                                        {selectedProject.links.github && (
                                            <a href={selectedProject.links.github} className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-sm">
                                                <Github size={16} /> Code
                                            </a>
                                        )}
                                        {selectedProject.links.demo && (
                                            <a href={selectedProject.links.demo} className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm">
                                                <ExternalLink size={16} /> Live
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

const ProjectsView = () => {
    const [projectFilter, setProjectFilter] = useState('All');
    const categories = ['All', ...Array.from(new Set(allProjects.map((p: any) => p.category)))];
    const filteredProjects = projectFilter === 'All'
        ? allProjects
        : allProjects.filter((p: any) => p.category === projectFilter);

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-20 tech-grid-bg">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
                        <Database className="text-blue-600" /> Project Archive
                    </h1>
                    <p className="text-slate-500">A comprehensive index of engineering logs, codebases, and experiments.</p>
                </div>

                <div className="flex justify-center gap-2 mb-12 flex-wrap">
                    {categories.map((cat: any) => (
                        <button
                            key={cat}
                            onClick={() => setProjectFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${projectFilter === cat
                                    ? 'bg-slate-900 text-white shadow-md'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-400 hover:text-blue-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-6">
                    {filteredProjects.map((project: any) => (
                        <div key={project.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group flex flex-col md:flex-row">
                            {/* Left Accent Bar */}
                            <div className={`w-full md:w-2 h-2 md:h-auto bg-gradient-to-b ${project.color.replace('border-', 'from-').replace('-500', '-500 to-transparent')}`}></div>

                            <div className="p-6 md:p-8 w-full flex flex-col md:flex-row gap-6 relative">

                                {/* Main Content Info */}
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                                            {project.category}
                                        </span>
                                        {project.featured && (
                                            <span className="text-[10px] font-bold uppercase text-emerald-600 flex items-center gap-1">
                                                <Star size={10} className="fill-emerald-600" /> Featured
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4 max-w-2xl">{project.description}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t: string) => (
                                            <span key={t} className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[10px] font-mono text-slate-500">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Side Stats & Actions */}
                                <div className="md:w-48 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 shrink-0">
                                    <div className="mb-4">
                                        <div className="text-xl font-bold text-slate-900">{project.stat}</div>
                                        <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">{project.statLabel}</div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        {project.links.github && (
                                            <a href={project.links.github} className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-sm font-medium text-slate-700 transition-colors">
                                                <Github size={14} /> Code Repository
                                            </a>
                                        )}
                                        {project.links.demo && (
                                            <a href={project.links.demo} className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded text-sm font-medium text-blue-700 transition-colors">
                                                <ExternalLink size={14} /> View Live
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AboutView = () => (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
        <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12">
                {/* Sidebar */}
                <div className="lg:col-span-4 h-fit lg:sticky lg:top-28">
                    <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                        <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6 mx-auto lg:mx-0">KC</div>
                        <h1 className="text-2xl font-bold text-slate-900 text-center lg:text-left">Kripan K.C.</h1>
                        <p className="text-emerald-600 font-medium mb-6 text-center lg:text-left">Environmental Engineer & Geospatial Developer</p>
                        <div className="space-y-4 text-sm text-slate-600 mb-8 border-t border-slate-100 pt-6"><p>{bio.description}</p></div>
                        <div className="flex gap-4 justify-center lg:justify-start">
                            <a href="#" className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-emerald-600 transition-colors"><Github size={20} /></a>
                            <a href="#" className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-blue-600 transition-colors"><Linkedin size={20} /></a>
                            <a href="mailto:hello@example.com" className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-red-500 transition-colors"><Mail size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Timeline Content */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-xl border border-slate-200 p-8 md:p-12 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 mb-12 flex items-center gap-3 border-b border-slate-100 pb-4">
                            <Calendar className="text-emerald-600" size={20} />
                            <span>Professional Journey</span>
                        </h2>

                        <div className="relative border-l-2 border-slate-100 ml-3 space-y-12">
                            {timeline.map((item: any, index: number) => (
                                <div key={index} className="relative pl-12 group">
                                    <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm transition-all duration-300 group-hover:scale-125 ${item.type === 'honor' ? 'bg-amber-400 ring-4 ring-amber-50' :
                                            item.type === 'work' ? 'bg-slate-900 ring-4 ring-slate-50' : 'bg-emerald-500 ring-4 ring-emerald-50'
                                        }`}></div>

                                    {item.type === 'honor' ? (
                                        // Compact Honor Badge
                                        <div className="bg-gradient-to-r from-amber-50 to-white p-4 rounded-lg border border-amber-200 relative overflow-hidden w-full md:w-2/3 hover:shadow-md transition-shadow">
                                            <div className="flex flex-col sm:flex-row justify-between items-start mb-1 relative z-10">
                                                <div className="font-bold text-amber-900 flex items-center gap-2 text-sm">
                                                    <Award size={14} /> {item.title}
                                                </div>
                                                <span className="text-[10px] font-bold bg-amber-200 text-amber-800 px-2 py-0.5 rounded">{item.year}</span>
                                            </div>
                                            <p className="text-xs text-slate-700">{item.desc}</p>
                                            {item.badge && <div className="mt-2 inline-block bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">{item.badge}</div>}
                                        </div>
                                    ) : (
                                        // Standard Experience/Edu Card
                                        <div>
                                            <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
                                                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                                                <span className="font-mono text-xs text-slate-400">{item.year}</span>
                                            </div>
                                            <div className="text-sm font-medium text-emerald-700 mb-3">{item.org}</div>
                                            <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.desc}</p>
                                            {item.tech && (
                                                <div className="flex flex-wrap gap-2">
                                                    {item.tech.map((t: string) => (
                                                        <span key={t} className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">{t}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ContactView = () => (
    <div className="min-h-screen bg-slate-50 pt-20 flex flex-col">
        <style>{styles}</style>
        <div className="flex-grow flex items-center justify-center py-12 px-6">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row">

                {/* Left Side: GIS Node Graphic */}
                <div className="md:w-5/12 bg-slate-900 p-12 relative overflow-hidden flex flex-col justify-center text-white min-h-[400px]">
                    <div className="absolute inset-0 tech-grid-bg opacity-20"></div>

                    {/* Animated Radar Graphic */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-emerald-500/20 rounded-full flex items-center justify-center">
                        <div className="w-48 h-48 border border-emerald-500/30 rounded-full"></div>
                        <div className="absolute w-32 h-32 border border-emerald-500/40 rounded-full"></div>
                        <div className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-radar-ping"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-emerald-400 mb-4">
                            <Radio size={20} className="animate-pulse" />
                            <span className="font-mono text-xs tracking-widest uppercase">Uplink Ready</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-4">Establish <br /> Connection</h2>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8">
                            Open to opportunities in environmental modeling, geospatial data analysis, and climate tech engineering. Send a transmission to my secure node.
                        </p>
                        <div className="space-y-4">
                            <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                                <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:bg-white/10"><Mail size={16} /></div>
                                <span className="font-mono text-sm">hello@example.com</span>
                            </a>
                            <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                                <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:bg-white/10"><MapPin size={16} /></div>
                                <span className="font-mono text-sm">48.1351° N, 11.5820° E (Munich)</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="md:w-7/12 p-8 md:p-16 bg-white relative">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Send className="text-blue-600" size={24} /> Send Transmission
                    </h3>
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Sender ID (Name)</label>
                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="Jane Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Return Protocol (Email)</label>
                                <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="jane@example.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Subject Vector</label>
                            <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="Project Inquiry / Collaboration" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Payload (Message)</label>
                            <textarea rows={5} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none custom-scrollbar" placeholder="Enter transmission details..."></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white rounded-lg px-6 py-4 font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
                            Transmit Data <ArrowUpRight size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
);

// --- MAIN APP ---

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [currentView, setCurrentView] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigateTo = (view: string, sectionId: string | null = null) => {
        setIsMenuOpen(false);
        setCurrentView(view);
        window.scrollTo(0, 0);

        if (sectionId && view === 'home') {
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    const renderView = () => {
        switch (currentView) {
            case 'home':
                return (
                    <main className="pt-20">
                        <style>{styles}</style>

                        {/* Hero Section */}
                        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden tech-grid-bg">
                            <div className="absolute inset-0 pointer-events-none opacity-20">
                                <div className="w-full h-[2px] bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-scan"></div>
                            </div>

                            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 text-center md:text-left">

                                {/* Creative Profile Photo Slot */}
                                <div className="relative group shrink-0 mt-8 md:mt-0">
                                    <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-orbit w-56 h-56 md:w-80 md:h-80 -z-10 scale-110"></div>
                                    <div className="absolute inset-0 rounded-full border border-dashed border-slate-300 animate-orbit-reverse w-56 h-56 md:w-80 md:h-80 -z-10 scale-125"></div>
                                    <div className="w-56 h-56 md:w-80 md:h-80 rounded-full bg-slate-200 border-4 border-white shadow-2xl overflow-hidden relative flex items-center justify-center text-slate-400">
                                        <span className="text-sm uppercase tracking-widest font-bold">Add Photo</span>
                                    </div>
                                    <div className="absolute -bottom-4 right-4 md:right-8 bg-white p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                        <span className="text-[10px] md:text-xs font-bold text-slate-600">System Online</span>
                                    </div>
                                </div>

                                <div className="animate-fade-in-up max-w-2xl">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-6">
                                        <Globe size={12} className="text-emerald-500" />
                                        Geospatial Intelligence
                                    </div>

                                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6">
                                        Mapping the <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                                            Future World
                                        </span>
                                    </h1>

                                    <p className="text-xl text-slate-600 leading-relaxed mb-10">
                                        I combine environmental engineering with modern software architecture to build scalable risk models and data pipelines.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                        <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all hover:-translate-y-1 shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2">
                                            Download CV <Download size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] opacity-5 pointer-events-none">
                                <Globe size={600} className="text-slate-300 animate-spin-slow" style={{ animationDuration: '60s' }} />
                            </div>
                        </section>

                        {/* Creative Career Snapshot (Bento Grid) */}
                        <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
                            <div className="container mx-auto px-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min max-w-6xl mx-auto">

                                    {/* Big Bio Box */}
                                    <div className="md:col-span-8 bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
                                        <div className="text-emerald-600 font-mono text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                                            <Terminal size={16} /> PROFILE_INIT
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                                            Translating Earth's complex systems into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">computational logic.</span>
                                        </h2>
                                        <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
                                            My expertise lies in transforming environmental datasets into robust software solutions. By leveraging cloud computing and spatial algorithms, I help organizations predict climate hazards and engineer resilience.
                                        </p>
                                    </div>

                                    {/* Current Role Box */}
                                    <div className="md:col-span-4 bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col justify-center">
                                        <div className="absolute inset-0 tech-grid-bg opacity-20 pointer-events-none"></div>
                                        <Briefcase className="mb-6 text-emerald-400 relative z-10" size={32} />
                                        <div className="relative z-10">
                                            <p className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-2">Current Role</p>
                                            <h3 className="text-2xl font-bold mb-1">Munich Re</h3>
                                            <p className="text-emerald-400 font-medium">Geospatial Data Engineer</p>
                                        </div>
                                    </div>

                                    {/* Interactive Map/Location Box */}
                                    <div className="md:col-span-4 bg-white border border-slate-200 p-8 rounded-3xl relative overflow-hidden flex items-center justify-center min-h-[200px]">
                                        <div className="absolute inset-0 topo-bg opacity-50 pointer-events-none"></div>
                                        <div className="relative z-10 flex flex-col items-center text-center">
                                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 shadow-sm border border-blue-100">
                                                <MapPin size={24} />
                                            </div>
                                            <span className="font-bold text-slate-800 text-lg">Munich, Germany</span>
                                            <span className="text-xs text-slate-500 font-mono mt-2 bg-white px-2 py-1 rounded border border-slate-100">48.1351° N, 11.5820° E</span>
                                        </div>
                                    </div>

                                    {/* Education Box */}
                                    <div className="md:col-span-4 bg-emerald-50 border border-emerald-100 p-8 rounded-3xl text-emerald-900 flex flex-col justify-center">
                                        <GraduationCap className="mb-6 text-emerald-600" size={32} />
                                        <p className="text-emerald-700/70 font-bold uppercase tracking-wider text-xs mb-2">Alma Mater</p>
                                        <h3 className="text-2xl font-bold mb-1">TUM</h3>
                                        <p className="text-emerald-800 font-medium text-sm">M.Sc. Environmental Engineering</p>
                                    </div>

                                    {/* Full Bio Link Box */}
                                    <div
                                        onClick={() => navigateTo('about')}
                                        className="md:col-span-4 bg-blue-600 text-white p-8 rounded-3xl flex items-center justify-between cursor-pointer hover:bg-blue-700 transition-colors shadow-lg group"
                                    >
                                        <div>
                                            <span className="text-blue-200 font-bold uppercase tracking-wider text-xs block mb-1">Discover More</span>
                                            <span className="font-bold text-2xl">Full Biography</span>
                                        </div>
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <ArrowUpRight size={24} className="text-white" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>

                        <TechArsenal navigateTo={navigateTo} />
                        <GISDashboard projects={featuredProjects} title="Featured Projects" />
                    </main>
                );
            case 'about':
                return <AboutView />;
            case 'projects':
                return <ProjectsView />;
            case 'contact':
                return <ContactView />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <Navbar
                scrolled={scrolled}
                currentView={currentView}
                navigateTo={navigateTo}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />

            {renderView()}

            <footer className="bg-white py-12 border-t border-slate-200">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
                    <div className="mb-4 md:mb-0">
                        © {new Date().getFullYear()} Kripan K.C. All rights reserved.
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-slate-900 transition-colors"><Github size={18} /></a>
                        <a href="#" className="hover:text-blue-600 transition-colors"><Linkedin size={18} /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;
