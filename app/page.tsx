"use client";

import React, { useState, useEffect } from 'react';
import {
    Menu, X, Github, Linkedin, Mail, ChevronRight, Map, Globe, Layers, Database,
    Download, Code, Terminal, Cpu, Leaf, Droplets, Wind, Activity, ArrowUpRight, Zap,
    Box, Layout, GitBranch, Server, GraduationCap, Award, HeartHandshake, BookOpen
} from 'lucide-react';

import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import experienceData from "@/data/experience.json";
import educationData from "@/data/education.json";

// --- DATA MAPPING & UTILS ---

const iconMap = {
    Code2: <Code size={18} />, Globe2: <Globe size={18} />, Server: <Server size={18} />,
    Waves: <Droplets size={18} />, Map: <Map size={18} />, Terminal: <Terminal size={18} />,
    Cpu: <Cpu size={18} />, Leaf: <Leaf size={18} />, Activity: <Activity size={18} />
};

const largeIconMap = {
    Code2: <Code className="text-purple-400" size={32} />, Globe2: <Globe className="text-emerald-400" size={32} />,
    Server: <Server className="text-purple-400" size={32} />, Waves: <Droplets className="text-blue-400" size={32} />,
    Map: <Map className="text-emerald-400" size={32} />, Terminal: <Terminal className="text-purple-400" size={32} />,
    Cpu: <Cpu className="text-purple-400" size={32} />, Leaf: <Leaf className="text-blue-400" size={32} />,
    Activity: <Activity className="text-orange-400" size={32} />
};

const designColors = [
    "from-emerald-500 to-teal-600",
    "from-blue-500 to-indigo-600",
    "from-amber-500 to-orange-600",
    "from-purple-500 to-pink-600"
];

// --- MAIN COMPONENT ---

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    // Interactive State
    const [activeProject, setActiveProject] = useState(0);
    const [selectedSkill, setSelectedSkill] = useState(skillsData.categories[0].tools[0].name);

    // Scroll Handler
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            const sections = ['home', 'about', 'projects', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top >= -100 && rect.top < 300;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // --- DATA PREPARATION ---

    // Process Projects
    const processedProjects = projectsData.map((p, idx) => ({
        ...p,
        id: idx,
        category: p.topics[0] || "Engineering",
        stat: p.featured ? "High Impact" : "Research",
        color: designColors[idx % designColors.length]
    }));

    // Process Skills
    const skillCategories = skillsData.categories.map(cat => ({
        id: cat.id,
        name: cat.title,
        icon: iconMap[cat.icon as keyof typeof iconMap] || <Code size={18} />,
        color: cat.id === 'gis' || cat.id === 'geo' ? 'text-emerald-500' :
            cat.id === 'modeling' || cat.id === 'env' ? 'text-blue-500' : 'text-purple-500',
        skills: cat.tools.map(t => t.name)
    }));

    const skillDetails: Record<string, any> = {};
    skillsData.categories.forEach(cat => {
        cat.tools.forEach(tool => {
            skillDetails[tool.name] = {
                icon: largeIconMap[cat.icon as keyof typeof largeIconMap] || <Code className="text-purple-400" size={32} />,
                description: tool.description,
                projects: tool.projects.map(pId => {
                    const found = projectsData.find(p => p.id === pId);
                    return found ? found.title : pId.replace(/-/g, ' ');
                }),
                category: cat.title
            };
        });
    });

    const getCategoryColor = (catId: string) => {
        if (catId === 'gis' || catId === 'geo') return 'bg-emerald-500';
        if (catId === 'modeling' || catId === 'env') return 'bg-blue-500';
        return 'bg-purple-500';
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">

            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="text-2xl font-bold tracking-tight text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer" onClick={() => scrollToSection('home')}>
                        Kripan<span className="text-emerald-600">.</span>KC
                    </div>

                    <div className="hidden md:flex space-x-8">
                        {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className={`text-sm font-medium transition-colors hover:text-emerald-600 ${activeSection === item.toLowerCase() ? 'text-emerald-600' : 'text-slate-600'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {/* Social Links placeholder */}
                    </div>

                    <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100">
                        <div className="flex flex-col py-4">
                            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                    className="px-6 py-3 text-left text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,50 Q25,40 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M0,60 Q25,50 50,60 T100,60" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M0,40 Q25,30 50,40 T100,40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                </div>
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-emerald-100/50 rounded-full blur-3xl -z-10"></div>

                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium">
                            <Activity size={16} className="text-emerald-600" />
                            <span>Analyzing Risk &bull; Modeling Resilience</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-slate-900 tracking-tight">
                            Deciphering <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                                Environmental Risk
                            </span> <br />
                            with Geospatial Intelligence.
                        </h1>

                        <p className="text-xl text-slate-600 max-w-lg leading-relaxed border-l-4 border-emerald-500 pl-6">
                            Environmental Engineer at Munich Re. Specialized in Remote Sensing, Hydrological Modeling, and Hazard Assessment to build safer, data-driven environments.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                onClick={() => scrollToSection('projects')}
                                className="px-8 py-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                Explore Models <ChevronRight size={18} />
                            </button>
                            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                                Download CV <Download size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="relative hidden lg:block h-[600px] w-full">
                        <div className="absolute inset-0 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>

                            <div className="absolute top-1/4 left-10 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white w-48 animate-float">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-emerald-500 rounded-lg"><Droplets size={16} /></div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">Hydrology</div>
                                </div>
                                <div className="text-2xl font-bold">124mm</div>
                                <div className="text-xs text-slate-300">Precipitation Spike Detected</div>
                            </div>

                            <div className="absolute bottom-1/3 right-10 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white w-56 animate-float" style={{ animationDelay: '1s' }}>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-orange-500 rounded-lg"><Activity size={16} /></div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-orange-300">Hazard Alert</div>
                                </div>
                                <div className="h-2 w-full bg-white/20 rounded-full mt-2 overflow-hidden">
                                    <div className="h-full w-[70%] bg-orange-500 animate-pulse"></div>
                                </div>
                                <div className="flex justify-between text-xs text-slate-300 mt-2">
                                    <span>Risk Level</span>
                                    <span>High</span>
                                </div>
                            </div>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="w-32 h-32 rounded-full border-4 border-emerald-500/30 flex items-center justify-center relative">
                                    <div className="w-24 h-24 rounded-full bg-emerald-500/20 animate-ping"></div>
                                    <div className="absolute inset-0 flex items-center justify-center text-emerald-400">
                                        <Map size={32} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expanded About Section */}
            <section id="about" className="py-24 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">About Me</h2>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            I am an Environmental Engineer experienced in GIS, Remote Sensing, and advanced geospatial analysis. Currently at Munich Re, I focus on building scalable solutions for climate risk modeling and hazard assessment. My work bridges the gap between complex environmental data and actionable risk intelligence.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                        {/* Education */}
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-emerald-600"><GraduationCap size={24} /></div>
                                <h3 className="text-lg font-bold text-slate-900">Education</h3>
                            </div>
                            <div className="space-y-6">
                                {educationData.map((edu, idx) => (
                                    <div key={idx} className="relative pl-6 border-l-2 border-emerald-200">
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-emerald-200"></div>
                                        <h4 className="font-bold text-slate-900 leading-tight">{edu.degree}</h4>
                                        <div className="text-sm text-slate-500 mb-1 mt-1">{edu.school}</div>
                                        <div className="text-xs text-slate-400 mb-2">{edu.year}</div>
                                        <div className="text-xs text-emerald-700 bg-emerald-50 inline-block px-2 py-1 rounded font-medium">{edu.focus}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 lg:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600"><Award size={24} /></div>
                                <h3 className="text-lg font-bold text-slate-900">Professional Experience</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {experienceData.slice(0, 4).map((exp, idx) => (
                                    <div key={idx} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{exp.role}</h4>
                                            <span className="text-[10px] text-slate-400 whitespace-nowrap bg-slate-50 px-2 py-1 rounded-full">{exp.period}</span>
                                        </div>
                                        <div className="text-xs font-bold text-emerald-600 mb-2">{exp.company}</div>
                                        <ul className="space-y-1">
                                            {exp.description.slice(0, 2).map((desc, i) => (
                                                <li key={i} className="text-xs text-slate-500 leading-relaxed pl-2 relative before:content-['•'] before:absolute before:left-0 before:text-slate-300">
                                                    {desc}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Technical Toolkit Section */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                            <Code size={24} className="text-slate-400" /> Technical Toolkit
                        </h3>
                        <p className="text-slate-600 max-w-2xl mb-8">
                            Select a core competency below to inspect technical details and relevant case studies.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 h-[600px]">
                        {/* Left Column: Skill Navigation */}
                        <div className="lg:col-span-4 flex flex-col h-full overflow-y-auto pr-2 custom-scrollbar space-y-8">
                            {skillCategories.map((category) => (
                                <div key={category.id}>
                                    <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 ${category.color}`}>
                                        {category.icon} {category.name}
                                    </div>
                                    <div className="space-y-1">
                                        {category.skills.map((skill) => (
                                            <button
                                                key={skill}
                                                onClick={() => setSelectedSkill(skill)}
                                                className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 group relative overflow-hidden ${selectedSkill === skill
                                                        ? 'bg-slate-900 text-white shadow-lg scale-100'
                                                        : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-100'
                                                    }`}
                                            >
                                                {selectedSkill === skill && (
                                                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${getCategoryColor(category.id)}`}></div>
                                                )}
                                                <div className="flex justify-between items-center relative z-10">
                                                    <span className="font-medium text-sm">{skill}</span>
                                                    {selectedSkill === skill && <ChevronRight size={16} className="text-emerald-400" />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column: Inspector Window */}
                        <div className="lg:col-span-8 relative">
                            <div className="h-full bg-slate-900 rounded-3xl p-1 relative overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 opacity-10"
                                    style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
                                </div>
                                <div className="absolute top-0 left-0 w-full h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                    <div className="ml-auto text-[10px] font-mono text-white/30 uppercase tracking-widest">System Ready</div>
                                </div>
                                <div className="h-full bg-white/5 backdrop-blur-sm rounded-[20px] mt-8 p-8 md:p-12 flex flex-col relative z-10">
                                    <div className="absolute -right-10 -bottom-10 opacity-5 transform rotate-12 scale-150 pointer-events-none">
                                        {skillDetails[selectedSkill]?.icon}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 shadow-inner backdrop-blur-md">
                                                {skillDetails[selectedSkill]?.icon}
                                            </div>
                                            <div>
                                                <div className="text-xs font-mono text-emerald-400 mb-1 uppercase tracking-widest">
                                                    Module: {skillDetails[selectedSkill]?.category}
                                                </div>
                                                <h2 className="text-3xl font-bold text-white">{selectedSkill}</h2>
                                            </div>
                                        </div>
                                        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mb-10 border-l-2 border-white/10 pl-6">
                                            {skillDetails[selectedSkill]?.description}
                                        </p>
                                        <div>
                                            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
                                                <Activity size={14} /> Active Deployments
                                            </h4>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {skillDetails[selectedSkill]?.projects.map((proj: string, idx: number) => (
                                                    <div key={idx} className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-emerald-500/30 transition-all cursor-default">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                                            <ArrowUpRight size={14} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
                                                        </div>
                                                        <div className="font-medium text-slate-200 group-hover:text-white transition-colors capitalize text-sm">{proj}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dynamic Projects Section */}
            <section id="projects" className="py-24 bg-slate-900 text-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
                        <p className="text-slate-400">Hover over a project to preview the architecture.</p>
                    </div>

                    <div className="relative">
                        <div className="grid md:grid-cols-2 gap-12 items-start">

                            {/* Left Side: Scrollable List */}
                            <div className="space-y-4">
                                {processedProjects.map((project, index) => (
                                    <div
                                        key={index}
                                        onMouseEnter={() => setActiveProject(index)}
                                        className={`p-8 rounded-2xl transition-all duration-300 cursor-pointer border ${activeProject === index
                                                ? 'bg-white/10 border-emerald-500/50 translate-x-4 shadow-xl'
                                                : 'bg-transparent border-white/5 hover:bg-white/5'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <span className={`text-xs font-bold uppercase tracking-wider ${activeProject === index ? 'text-emerald-400' : 'text-slate-500'
                                                }`}>
                                                {project.category}
                                            </span>
                                            <ArrowUpRight size={18} className={activeProject === index ? 'opacity-100' : 'opacity-0'} />
                                        </div>
                                        <h3 className={`text-2xl font-bold mb-3 ${activeProject === index ? 'text-white' : 'text-slate-400'}`}>
                                            {project.title}
                                        </h3>
                                        <p className={`text-sm leading-relaxed transition-colors line-clamp-3 ${activeProject === index ? 'text-slate-300' : 'text-slate-500'}`}>
                                            {project.description}
                                        </p>
                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {project.technologies.slice(0, 4).map(t => (
                                                <span key={t} className={`text-[10px] px-2 py-1 rounded border ${activeProject === index ? 'border-white/20 text-white/70' : 'border-white/5 text-slate-600'
                                                    }`}>
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Side: Sticky Preview Window */}
                            <div className="hidden md:block sticky top-24 h-[500px]">
                                <div className="relative w-full h-full">
                                    {processedProjects.map((project, index) => (
                                        <div
                                            key={index}
                                            className={`absolute inset-0 transition-all duration-500 ease-out transform ${activeProject === index
                                                    ? 'opacity-100 scale-100 z-20 translate-y-0'
                                                    : 'opacity-0 scale-95 z-10 translate-y-4 pointer-events-none'
                                                }`}
                                        >
                                            <div className={`w-full h-full rounded-3xl bg-gradient-to-br ${project.color} p-1 shadow-2xl`}>
                                                <div className="h-full w-full rounded-[20px] bg-slate-900/90 backdrop-blur-xl relative overflow-hidden flex flex-col">

                                                    {/* Top Bar */}
                                                    <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                                                        <div className="flex gap-2">
                                                            <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                                                            <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                                                            <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                                                        </div>
                                                        <div className="text-[10px] uppercase font-bold tracking-widest text-white/30">System v2.0</div>
                                                    </div>

                                                    {/* Main Content */}
                                                    <div className="p-8 flex-grow flex flex-col justify-center relative">
                                                        {/* Background Texture */}
                                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

                                                        <div className="relative z-10 text-center">
                                                            <div className="inline-block p-4 rounded-full bg-white/5 mb-6 border border-white/10">
                                                                <Activity className="text-white" size={32} />
                                                            </div>
                                                            <h4 className="text-4xl font-bold text-white mb-2 tracking-tight">{project.stat}</h4>
                                                            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">Primary Focus</p>

                                                            <button className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 group">
                                                                View Case Study
                                                                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto bg-slate-100 rounded-3xl p-8 md:p-16 text-center">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to collaborate?</h2>
                        <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
                            Open to opportunities in environmental modeling, geospatial data analysis, and climate tech.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                            <a href="mailto:kripan.kc@outlook.com" className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors w-full sm:w-auto">
                                Get in Touch
                            </a>
                            <div className="flex items-center gap-6 text-slate-400">
                                <a href="https://github.com/kripankc" target="_blank" className="hover:text-emerald-600 transition-colors"><Github size={24} /></a>
                                <a href="https://linkedin.com/in/kripankc" target="_blank" className="hover:text-emerald-600 transition-colors"><Linkedin size={24} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white py-12 border-t border-slate-100">
                <div className="container mx-auto px-6 text-center text-slate-400 text-sm">
                    © {new Date().getFullYear()} Kripan K.C. Environmental Engineering & Design.
                </div>
            </footer>
            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 4px;
        }
      `}</style>
        </div>
    );
};

export default Portfolio;
