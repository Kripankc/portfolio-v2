"use client";

import React, { useState, useEffect } from 'react';
import {
    Menu,
    X,
    Github,
    Linkedin,
    Mail,
    ChevronRight,
    Map,
    Globe,
    Layers,
    Database,
    Download,
    Code,
    Terminal,
    Cpu,
    Leaf,
    Droplets,
    Wind,
    Activity,
    ArrowUpRight,
    Zap,
    Box,
    Layout,
    GitBranch,
    Server,
    Projector,
    Search
} from 'lucide-react';
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import experienceData from "@/data/experience.json";

// Map icons from skillsData
const iconMap = {
    Code2: <Code size={18} />,
    Globe2: <Globe size={18} />,
    Server: <Server size={18} />,
    Waves: <Droplets size={18} />,
    Map: <Map size={18} />,
    Terminal: <Terminal size={18} />,
    Cpu: <Cpu size={18} />,
    Leaf: <Leaf size={18} />,
    Activity: <Activity size={18} />
};

// Map larger icons for the inspector
const largeIconMap = {
    Code2: <Code className="text-purple-400" size={32} />,
    Globe2: <Globe className="text-emerald-400" size={32} />,
    Server: <Server className="text-purple-400" size={32} />,
    Waves: <Droplets className="text-blue-400" size={32} />,
    Map: <Map className="text-emerald-400" size={32} />,
    Terminal: <Terminal className="text-purple-400" size={32} />,
    Cpu: <Cpu className="text-purple-400" size={32} />,
    Leaf: <Leaf className="text-blue-400" size={32} />,
    Activity: <Activity className="text-orange-400" size={32} />
};

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    // State for interactive sections
    const [activeProject, setActiveProject] = useState(0);
    const [selectedSkill, setSelectedSkill] = useState(skillsData.categories[0].tools[0].name);

    // Handle scroll effects
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

    // Process skills data for the UI
    const skillCategories = skillsData.categories.map(cat => ({
        id: cat.id,
        name: cat.title,
        icon: iconMap[cat.icon as keyof typeof iconMap] || <Code size={18} />,
        color: cat.id === 'gis' || cat.id === 'geo' ? 'text-emerald-500' :
            cat.id === 'modeling' || cat.id === 'env' ? 'text-blue-500' : 'text-purple-500',
        skills: cat.tools.map(t => t.name)
    }));

    // Flatten skills for the details lookups
    const skillDetails: Record<string, any> = {};
    skillsData.categories.forEach(cat => {
        cat.tools.forEach(tool => {
            skillDetails[tool.name] = {
                icon: largeIconMap[cat.icon as keyof typeof largeIconMap] || <Code className="text-purple-400" size={32} />,
                description: tool.description,
                projects: tool.projects.map(pId => pId.replace(/-/g, ' ')),
                category: cat.id
            };
        });
    });

    const getCategoryColor = (catId: string) => {
        if (catId === 'gis' || catId === 'geo') return 'bg-emerald-500';
        if (catId === 'modeling' || catId === 'env') return 'bg-blue-500';
        return 'bg-purple-500';
    };

    // Process project data with design properties
    const designColors = [
        "from-emerald-500 to-teal-600",
        "from-blue-500 to-indigo-600",
        "from-amber-500 to-orange-600",
        "from-purple-500 to-pink-600"
    ];

    const processedProjects = projectsData.map((p, idx) => ({
        ...p,
        id: idx,
        category: p.topics[0] || "Engineering",
        stat: p.featured ? "Featured Impact" : "Research Project",
        color: designColors[idx % designColors.length]
    }));

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
                        <a href="https://github.com/kripankc" target="_blank" className="text-slate-600 hover:text-emerald-600 transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="mailto:hello@example.com" className="text-slate-600 hover:text-emerald-600 transition-colors">
                            <Mail size={20} />
                        </a>
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
                {/* Abstract Background - Geological Lines */}
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
                            <Activity size={16} className="text-emerald-600 animate-pulse" />
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
                            Environmental Engineer at Munich Re. Specialized in Remote Sensing, Hydrological Modeling, and Hazard Assessment.
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

                    {/* Abstract Data Viz Representation */}
                    <div className="relative hidden lg:block h-[600px] w-full">
                        <div className="absolute inset-0 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl overflow-hidden ring-1 ring-white/10">
                            {/* Fake Map Interface */}
                            <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>

                            {/* Floating Data Cards */}
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
                                        <Globe size={48} className="animate-spin-slow" />
                                    </div>
                                </div>
                            </div>

                            {/* Grid Overlay */}
                            <div className="absolute inset-0 opacity-10"
                                style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '50px 50px' }}>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Toolkit / About Section (Redesigned) */}
            <section id="about" className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Technical Toolkit</h2>
                        <p className="text-slate-600 max-w-2xl">
                            From Python automation to industrial GIS standards—explore specific tools and the projects where they made an impact.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 h-auto lg:h-[600px]">
                        {/* Left Column: Skill Navigation */}
                        <div className="lg:col-span-4 flex flex-col h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 space-y-8">
                            {skillCategories.map((category) => (
                                <div key={category.id} className="space-y-4">
                                    <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${category.color}`}>
                                        {category.icon} {category.name}
                                    </div>
                                    <div className="space-y-1.5">
                                        {category.skills.map((skill) => (
                                            <button
                                                key={skill}
                                                onClick={() => setSelectedSkill(skill)}
                                                className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 group relative overflow-hidden ${selectedSkill === skill
                                                        ? 'bg-slate-900 text-white shadow-lg scale-[1.02]'
                                                        : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-100'
                                                    }`}
                                            >
                                                {/* Selection Indicator */}
                                                {selectedSkill === skill && (
                                                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${getCategoryColor(category.id)}`}></div>
                                                )}

                                                <div className="flex justify-between items-center relative z-10">
                                                    <span className="font-semibold text-sm">{skill}</span>
                                                    {selectedSkill === skill && <ChevronRight size={14} className="text-emerald-400" />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column: The Inspector Window */}
                        <div className="lg:col-span-8 relative min-h-[400px]">
                            <div className="h-full bg-slate-900 rounded-3xl p-0.5 relative overflow-hidden shadow-2xl ring-1 ring-white/10">
                                {/* Decorative background grid */}
                                <div className="absolute inset-0 opacity-[0.05]"
                                    style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
                                </div>

                                {/* Top Bar Decoration */}
                                <div className="absolute top-0 left-0 w-full h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
                                    <div className="ml-auto text-[10px] font-mono text-white/20 uppercase tracking-widest">Inspector ready</div>
                                </div>

                                {/* Main Content Card */}
                                <div className="h-full bg-white/[0.02] backdrop-blur-sm rounded-[24px] mt-8 p-8 md:p-12 flex flex-col relative z-10 transition-all duration-300">

                                    {/* Dynamic Icon Background */}
                                    <div className="absolute -right-16 -bottom-16 opacity-[0.03] transform rotate-12 scale-[3.5] pointer-events-none transition-all duration-700">
                                        {skillDetails[selectedSkill]?.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-5 mb-8">
                                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-inner backdrop-blur-md shadow-emerald-500/5 group">
                                                {skillDetails[selectedSkill]?.icon}
                                            </div>
                                            <div>
                                                <div className="text-xs font-mono text-emerald-400 mb-1.5 uppercase tracking-widest flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                                    Category: {skillDetails[selectedSkill]?.category}
                                                </div>
                                                <h2 className="text-3xl font-bold text-white tracking-tight">{selectedSkill}</h2>
                                            </div>
                                        </div>

                                        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mb-12 border-l-2 border-white/10 pl-6">
                                            {skillDetails[selectedSkill]?.description}
                                        </p>

                                        <div>
                                            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
                                                <Activity size={14} className="text-emerald-500" /> Active Project Applications
                                            </h4>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {skillDetails[selectedSkill]?.projects.map((proj: string, idx: number) => (
                                                    <div key={idx} className="group p-5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] hover:border-emerald-500/30 transition-all cursor-default shadow-sm hover:shadow-emerald-500/10 hover:-translate-y-1">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                                            <ArrowUpRight size={14} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
                                                        </div>
                                                        <div className="font-semibold text-slate-200 group-hover:text-white transition-colors capitalize">{proj}</div>
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
            <section id="projects" className="py-24 bg-slate-900 text-white overflow-hidden relative">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                <div className="container mx-auto px-6">
                    <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold tracking-tight">Environmental Case Studies</h2>
                            <p className="text-slate-400 max-w-lg">
                                High-performance modeling and spatial analysis. Hover to reveal technical metrics.
                            </p>
                        </div>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="text-emerald-400 font-medium flex items-center gap-2 hover:translate-x-1 transition-transform"
                        >
                            Collaborate on research <ArrowUpRight size={18} />
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* List Side */}
                        <div className="space-y-4">
                            {processedProjects.map((project, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => setActiveProject(index)}
                                    className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer border ${activeProject === index
                                            ? 'bg-white/10 border-emerald-500/50 translate-x-4 shadow-[0_0_30px_rgba(16,185,129,0.05)]'
                                            : 'bg-transparent border-white/5 hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${activeProject === index ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                                            }`}>
                                            {project.category}
                                        </span>
                                        <ArrowUpRight size={18} className={`transition-all ${activeProject === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                                    </div>
                                    <h3 className={`text-2xl font-bold mb-3 tracking-tight ${activeProject === index ? 'text-white' : 'text-slate-400'}`}>
                                        {project.title}
                                    </h3>
                                    <p className={`text-sm leading-relaxed max-w-md transition-colors ${activeProject === index ? 'text-slate-300' : 'text-slate-500'}`}>
                                        {project.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Dynamic Preview Side */}
                        <div className="relative h-[550px] w-full hidden lg:block perspective-1000">
                            {processedProjects.map((project, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-all duration-700 ease-out transform ${activeProject === index
                                            ? 'opacity-100 translate-y-0 rotate-y-0 scale-100 z-20 shadow-2xl shadow-emerald-900/20'
                                            : 'opacity-0 translate-y-8 -rotate-y-12 scale-95 z-10'
                                        }`}
                                >
                                    <div className={`w-full h-full rounded-[40px] bg-gradient-to-br ${project.color} p-10 relative overflow-hidden group`}>
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-soft-light"></div>

                                        {/* Visual elements */}
                                        <div className="absolute top-0 right-0 p-8 text-white/10 select-none">
                                            <Database size={120} />
                                        </div>

                                        {/* Mock Browser/Interface Window */}
                                        <div className="relative z-10 bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-8 h-full flex flex-col justify-between shadow-2xl">
                                            <div className="space-y-6">
                                                <div className="flex gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-red-400/50 shadow-lg shadow-red-500/20"></div>
                                                    <div className="w-3 h-3 rounded-full bg-yellow-400/50 shadow-lg shadow-yellow-500/20"></div>
                                                    <div className="w-3 h-3 rounded-full bg-green-400/50 shadow-lg shadow-green-500/20"></div>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="text-5xl font-extrabold text-white tracking-tighter animate-float">{project.stat.split(' ')[0]}</div>
                                                    <div className="text-white/40 text-xs font-mono uppercase tracking-widest">{project.stat}</div>
                                                </div>

                                                <div className="h-0.5 w-12 bg-emerald-500 rounded-full"></div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies.slice(0, 4).map(t => (
                                                        <span key={t} className="px-3 py-1.5 bg-white/5 rounded-lg text-[10px] font-bold text-emerald-400 border border-white/5 uppercase tracking-tighter">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                                <button className="w-full py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-emerald-50 transition-all group flex items-center justify-center gap-2 shadow-xl hover:shadow-emerald-500/20">
                                                    Inspect Case Study <ArrowUpRight size={18} className="translate-y-0.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group">
                        {/* Background elements */}
                        <div className="absolute inset-0 bg-slate-50 border border-slate-100 -z-10 group-hover:scale-[1.01] transition-transform duration-500"></div>
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -z-10"></div>

                        <div className="inline-flex items-center gap-2 mb-8 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Available for collaboration</span>
                        </div>

                        <h2 className="text-5xl font-bold text-slate-900 mb-8 tracking-tight">Let's build more <br /> resilient systems.</h2>
                        <p className="text-slate-600 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                            Seeking opportunities in Munich and globally for climate-risk modeling, AI-for-good, and high-impact environmental engineering.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                            <a href="mailto:kripan.kc@outlook.com" className="group px-10 py-5 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all w-full sm:w-auto shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3">
                                Send a Message <Mail size={20} className="group-hover:rotate-12 transition-transform" />
                            </a>
                            <div className="flex items-center gap-8 text-slate-400 px-6">
                                <a href="https://github.com/kripankc" target="_blank" className="hover:text-emerald-600 transition-all hover:scale-110"><Github size={28} /></a>
                                <a href="https://linkedin.com/in/kripankc" target="_blank" className="hover:text-emerald-600 transition-all hover:scale-110"><Linkedin size={28} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white py-16 border-t border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-xl font-bold tracking-tight text-slate-400">
                            Kripan<span className="text-emerald-200">.</span>KC
                        </div>
                        <div className="text-slate-400 text-sm font-medium">
                            © {new Date().getFullYear()} Kripan K.C. &bull; Environmental Engineering & Research
                        </div>
                        <div className="flex gap-6 text-slate-300">
                            {['Home', 'About', 'Projects', 'Contact'].map(item => (
                                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-slate-500 transition-colors">{item}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>

            {/* Scroll Indicator */}
            {scrolled && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-10 right-10 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl z-50 hover:bg-emerald-600 transition-all animate-in fade-in slide-in-from-bottom-10"
                >
                    <ArrowUpRight className="-rotate-45" size={24} />
                </button>
            )}

            <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        .-rotate-y-12 {
          transform: rotateY(-12deg);
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
        </div>
    );
};

export default Portfolio;
