"use client";

import React, { useState, useEffect } from 'react';
import {
    Menu,
    X,
    Github,
    Linkedin,
    Mail,
    ChevronRight,
    ChevronLeft,
    ChevronDown,
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
    GitBranch,
    Server,
    GraduationCap,
    Award,
    HeartHandshake,
    ExternalLink,
    Search,
    Filter,
    Briefcase,
    BookOpen,
    Star,
    MapPin,
    Calendar
} from 'lucide-react';

import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import experienceData from "@/data/experience.json";
import educationData from "@/data/education.json";

// --- HELPERS & CONFIG ---

const designColors = [
    "from-emerald-500 to-teal-600",
    "from-blue-500 to-indigo-600",
    "from-amber-500 to-orange-600",
    "from-purple-500 to-pink-600",
    "from-cyan-500 to-blue-600"
];

const iconMap: Record<string, any> = {
    Code2: <Code size={20} />,
    Globe2: <Globe size={20} />,
    Server: <Server size={20} />,
    Waves: <Droplets size={20} />,
    Map: <Map size={20} />,
    Terminal: <Terminal size={20} />,
    Cpu: <Cpu size={20} />,
    Leaf: <Leaf size={20} />,
    Activity: <Activity size={20} />
};

const getLink = (project: any) => {
    return {
        github: project.githubUrl,
        demo: project.demoUrl || project.githubUrl // Fallback if no demo
    };
};

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [currentView, setCurrentView] = useState('home'); // 'home' | 'projects' | 'about'

    // State for interactive sections
    const [activeProject, setActiveProject] = useState(0);
    const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
    const [showSkillProjects, setShowSkillProjects] = useState<string | null>(null); // Track which skill's projects are shown
    const [projectFilter, setProjectFilter] = useState('All');

    // Data Preparation
    const allProjects = projectsData.map((p, idx) => ({
        id: idx,
        featured: p.featured,
        title: p.title,
        category: p.topics[0] || "Engineering",
        description: p.description,
        stat: p.featured ? "High Impact" : "Research",
        tech: [...p.technologies, ...p.libraries].slice(0, 4),
        color: designColors[idx % designColors.length],
        links: { github: p.githubUrl, demo: p.githubUrl } // Using github as demo if demo missing
    }));

    const featuredProjects = allProjects.filter(p => p.featured);

    const skillCategories = skillsData.categories.map((cat, idx) => {
        let colorClass = 'bg-slate-100 text-slate-700';
        if (idx === 0) colorClass = 'bg-emerald-100 text-emerald-700';
        else if (idx === 1) colorClass = 'bg-blue-100 text-blue-700';
        else if (idx === 2) colorClass = 'bg-purple-100 text-purple-700';
        else if (idx === 3) colorClass = 'bg-amber-100 text-amber-700';

        return {
            id: cat.id,
            name: cat.title,
            icon: iconMap[cat.icon] || <Code size={20} />,
            color: colorClass,
            skills: cat.tools.map(tool => ({
                name: tool.name,
                desc: tool.description,
                places: ["Projects"], // Placeholder as data JSON doesn't separate where skill was used
                projectList: tool.projects.map(pid => {
                    const p = projectsData.find(proj => proj.id === pid);
                    return p ? p.title : pid;
                })
            }))
        };
    });

    const timeline = [
        ...experienceData.map(e => ({
            type: 'work',
            year: e.period,
            title: e.role,
            org: e.company,
            desc: e.description[0],
            tech: [] as string[] // Type assertion
        })),
        ...educationData.map(e => ({
            type: 'edu',
            year: e.year,
            title: e.degree,
            org: e.school,
            desc: e.focus,
            tech: [] as string[]
        }))
    ];

    const bio = {
        title: "Engineering with Purpose",
        description: "I am an Environmental Engineer passionate about leveraging technology to solve critical ecological challenges. Specializing in Geospatial Solutions, Remote Sensing, and Hydrological Modeling to build safe, data-driven environments.",
    };

    const volunteering = [
        // Placeholder or manual entry if desired. Leaving empty/generic triggers based on available data? 
        // Since JSONs don't have volunteering, I will keep a generic placeholder or remove. 
        // I'll keep the one from the snippet as a placeholder but comment it out or leave it if it looks generic enough?
        // "Engineers Without Borders" sounds specific. I will comment it out or use an empty array to be safe.
    ];


    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            if (currentView === 'home') {
                const sections = ['home', 'career-summary', 'featured', 'contact'];
                const current = sections.find(section => {
                    const element = document.getElementById(section);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        return rect.top >= -100 && rect.top < 300;
                    }
                    return false;
                });
                if (current) setActiveSection(current);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentView]);

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

    const nextProject = () => {
        setActiveProject((prev) => (prev + 1) % featuredProjects.length);
    };

    const prevProject = () => {
        setActiveProject((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    };

    // --- SUB-COMPONENTS ---

    const Navbar = () => (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || currentView !== 'home' ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div
                    className="text-2xl font-bold tracking-tight text-slate-900 cursor-pointer"
                    onClick={() => navigateTo('home')}
                >
                    Kripan<span className="text-emerald-600">.</span>KC
                </div>

                <div className="hidden md:flex space-x-8">
                    <button
                        onClick={() => navigateTo('home')}
                        className={`text-sm font-medium transition-colors hover:text-emerald-600 ${currentView === 'home' ? 'text-emerald-600' : 'text-slate-600'}`}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => navigateTo('about')}
                        className={`text-sm font-medium transition-colors hover:text-emerald-600 ${currentView === 'about' ? 'text-emerald-600' : 'text-slate-600'}`}
                    >
                        About
                    </button>
                    <button
                        onClick={() => navigateTo('projects')}
                        className={`text-sm font-medium transition-colors hover:text-emerald-600 ${currentView === 'projects' ? 'text-emerald-600' : 'text-slate-600'}`}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => navigateTo('home', 'contact')}
                        className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
                    >
                        Contact
                    </button>
                </div>

                <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100">
                    <div className="flex flex-col py-4">
                        {['Home', 'About', 'Projects'].map(item => (
                            <button
                                key={item}
                                onClick={() => navigateTo(item.toLowerCase())}
                                className="px-6 py-3 text-left text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );

    // --- VIEWS ---

    const HomeView = () => (
        <>
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
                            Specialized in Remote Sensing, Hydrological Modeling, and Hazard Assessment to build safer, data-driven environments.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button onClick={() => navigateTo('projects')} className="px-8 py-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all hover:shadow-lg flex items-center justify-center gap-2">
                                View Projects <ChevronRight size={18} />
                            </button>
                            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                Download CV <Download size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="relative hidden lg:block h-[600px] w-full">
                        <div className="absolute inset-0 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>

                            <div className="absolute top-1/4 left-10 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white w-48 animate-bounce-slow">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-emerald-500 rounded-lg"><Droplets size={16} /></div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">Hydrology</div>
                                </div>
                                <div className="text-2xl font-bold">124mm</div>
                                <div className="text-xs text-slate-300">Precipitation Spike Detected</div>
                            </div>

                            <div className="absolute bottom-1/3 right-10 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white w-56 animate-pulse-slow">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-orange-500 rounded-lg"><Activity size={16} /></div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-orange-300">Hazard Alert</div>
                                </div>
                                <div className="h-2 w-full bg-white/20 rounded-full mt-2 overflow-hidden">
                                    <div className="h-full w-[70%] bg-orange-500"></div>
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

            {/* Career Summary Section */}
            <section id="career-summary" className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            From <span className="text-emerald-600">Munich to the World</span>, building digital twins of our changing environment.
                        </h2>
                        <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full mb-8"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Current Role */}
                        {timeline.find(t => t.type === 'work') && (
                            <div className="flex flex-col items-center text-center p-6 hover:bg-slate-50 rounded-2xl transition-colors">
                                <Briefcase size={32} className="text-slate-400 mb-4" />
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Current Focus</div>
                                <div className="font-bold text-lg text-slate-900">{timeline.find(t => t.type === 'work')?.title}</div>
                                <div className="text-slate-600">{timeline.find(t => t.type === 'work')?.org}</div>
                            </div>
                        )}

                        {/* Education */}
                        {timeline.find(t => t.type === 'edu') && (
                            <div className="flex flex-col items-center text-center p-6 hover:bg-slate-50 rounded-2xl transition-colors border-x border-slate-100">
                                <GraduationCap size={32} className="text-slate-400 mb-4" />
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Alma Mater</div>
                                <div className="font-bold text-lg text-slate-900">{timeline.find(t => t.type === 'edu')?.title}</div>
                                <div className="text-slate-600">{timeline.find(t => t.type === 'edu')?.org}</div>
                            </div>
                        )}

                        {/* Honors/Key Distinction - using generic or last item if no honor explicit in json */}
                        <div className="flex flex-col items-center text-center p-6 bg-gradient-to-b from-amber-50 to-white rounded-2xl border border-amber-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-400/20 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
                            <Award size={32} className="text-amber-500 mb-4 drop-shadow-sm" />
                            <div className="text-xs font-bold uppercase tracking-widest text-amber-600/70 mb-1">Impact</div>
                            <div className="font-bold text-lg text-slate-900"><span className="text-amber-500">{allProjects.length}+</span> Projects</div>
                            <div className="text-slate-600 text-sm mt-1">Delivered across multiple domains</div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <button
                            onClick={() => navigateTo('about')}
                            className="text-slate-500 hover:text-emerald-600 font-medium inline-flex items-center gap-2 border-b border-transparent hover:border-emerald-600 transition-all pb-0.5"
                        >
                            Read Full Professional Biography <ArrowUpRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Toolkit Section */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                            <Code size={24} className="text-slate-400" /> Technical Toolkit
                        </h3>
                        <p className="text-slate-600 max-w-2xl mb-8">
                            A concise overview of my technical proficiencies. Click on any skill to reveal experience and projects.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {skillCategories.map((cat) => (
                            <div key={cat.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-2 rounded-lg ${cat.color}`}>{cat.icon}</div>
                                    <h4 className="font-bold text-slate-900 text-sm">{cat.name}</h4>
                                </div>

                                <div className="space-y-3">
                                    {cat.skills.map((skill) => (
                                        <div
                                            key={skill.name}
                                            className={`p-3 rounded-xl border transition-all duration-300 ${expandedSkill === skill.name
                                                    ? 'bg-slate-50 border-emerald-500 shadow-md scale-105 relative z-10'
                                                    : 'bg-white border-slate-100 hover:border-emerald-300 cursor-pointer'
                                                }`}
                                            onClick={() => setExpandedSkill(expandedSkill === skill.name ? null : skill.name)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-sm text-slate-800">{skill.name}</span>
                                                <ChevronDown
                                                    size={14}
                                                    className={`text-slate-400 transition-transform duration-300 ${expandedSkill === skill.name ? 'rotate-180' : ''}`}
                                                />
                                            </div>

                                            {expandedSkill === skill.name && (
                                                <div className="mt-3 pt-3 border-t border-slate-200 text-xs animate-in fade-in slide-in-from-top-1">
                                                    <p className="text-slate-600 mb-3 leading-relaxed">{skill.desc}</p>

                                                    {/* Projects Toggle */}
                                                    {skill.projectList.length > 0 && (
                                                        <div>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setShowSkillProjects(showSkillProjects === skill.name ? null : skill.name);
                                                                }}
                                                                className="flex items-center gap-1 text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
                                                            >
                                                                <Layers size={10} />
                                                                <span>Projects</span>
                                                                <ChevronDown size={10} className={`transition-transform ${showSkillProjects === skill.name ? 'rotate-180' : ''}`} />
                                                            </button>

                                                            {showSkillProjects === skill.name && (
                                                                <ul className="mt-2 space-y-1 pl-2 border-l border-emerald-200">
                                                                    {skill.projectList.map(p => (
                                                                        <li key={p} className="text-slate-500 flex items-center gap-2">
                                                                            <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                                                                            {p}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects Carousel */}
            <section id="featured" className="py-24 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
                        <p className="text-slate-400">An interactive showcase of select works.</p>
                    </div>

                    {featuredProjects.length > 0 ? (
          <div className="h-[500px] flex items-center justify-center relative perspective-1000 mb-12">
            {/* Controls */}
            <button 
              onClick={prevProject} 
              className="absolute left-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white border border-white/10 hover:scale-110 hidden md:block"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextProject} 
              className="absolute right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white border border-white/10 hover:scale-110 hidden md:block"
            >
              <ChevronRight size={24} />
            </button>

            {/* Carousel Items */}
            <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
              {featuredProjects.map((project, index) => {
                let offset = index - activeProject;
                if (offset < -1) offset += featuredProjects.length; 
                if (offset > 1) offset -= featuredProjects.length;
                
                const isActive = index === activeProject;
                const isPrev = index === (activeProject - 1 + featuredProjects.length) % featuredProjects.length;
                const isNext = index === (activeProject + 1) % featuredProjects.length;
                
                let className = "transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] absolute w-full max-w-xl";
                let style: React.CSSProperties = {};

                if (isActive) {
                  style = {
                    transform: 'translateX(0) scale(1) rotateY(0deg)',
                    zIndex: 20,
                    opacity: 1,
                  };
                } else if (isPrev) {
                  style = {
                    transform: 'translateX(-60%) scale(0.85) rotateY(15deg) perspective(1000px)',
                    zIndex: 10,
                    opacity: 0.5,
                    filter: 'blur(2px)'
                  };
                } else if (isNext) {
                  style = {
                    transform: 'translateX(60%) scale(0.85) rotateY(-15deg) perspective(1000px)',
                    zIndex: 10,
                    opacity: 0.5,
                    filter: 'blur(2px)'
                  };
                } else {
                  style = {
                    transform: 'translateZ(-200px) scale(0)',
                    zIndex: 0,
                    opacity: 0
                  };
                }

                return (
                  <div 
                    key={index} 
                    className={className} 
                    style={style}
                    onClick={() => setActiveProject(index)}
                  >
                    <div className={`rounded-3xl bg-gradient-to-br ${project.color} p-1 shadow-2xl cursor-pointer`}>
                      <div className="rounded-[20px] bg-slate-900/90 backdrop-blur-md p-8 h-[400px] flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                           <Activity size={120} />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-6">
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded">
                              {project.category}
                            </span>
                            <div className="flex gap-1">
                               <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                               <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                               <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                            </div>
                          </div>
                          
                          <h3 className="text-3xl font-bold text-white mb-4 line-clamp-2">{project.title}</h3>
                          <p className="text-slate-300 leading-relaxed mb-6 line-clamp-3">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-8">
                            {project.tech.map(t => (
                              <span key={t} className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 border border-white/5">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-auto border-t border-white/10 pt-4 flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-white">{project.stat}</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest">Impact Metric</div>
                          </div>
                          <button className="p-3 bg-white text-slate-900 rounded-full hover:scale-110 transition-transform">
                             <ArrowUpRight size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            ) : (
                <div className="text-base text-center text-slate-400">
                    No featured projects to display.
                </div>
            )}
          </div>

          <div className="text-center">
            <button 
              onClick={() => navigateTo('projects')}
              className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-500 transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 inline-flex items-center gap-2"
            >
              View Project Archive <ArrowUpRight size={18} />
            </button>
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
                                <a href="mailto:kripan.kc@outlook.com" className="hover:text-emerald-600 transition-colors"><Mail size={24} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

    const AboutView = () => (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Left Sidebar - Bio & Intro */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                            <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6">KC</div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">Kripan K.C.</h1>
                            <p className="text-emerald-600 font-medium mb-6">Environmental Engineer & Geospatial Developer</p>
                            <p className="text-slate-600 leading-relaxed text-sm mb-8">
                                {bio.description}
                            </p>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <MapPin size={16} /> Munich, Germany
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Mail size={16} /> kripan.kc@outlook.com
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Timeline */}
                    <div className="lg:col-span-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                            <Calendar className="text-slate-400" /> Career Timeline
                        </h2>

                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                            {timeline.map((item, index) => (
                                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    {/* Icon */}
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                        {item.type === 'work' && <Briefcase size={16} className="text-blue-600" />}
                                        {item.type === 'edu' && <GraduationCap size={16} className="text-emerald-600" />}
                                    </div>

                                    {/* Content Card */}
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                                            <time className="font-mono text-xs text-slate-400 mb-1 sm:mb-0">{item.year}</time>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${item.type === 'work' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                {item.type === 'work' ? 'Experience' : 'Education'}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h3>
                                        <div className="text-sm font-medium text-slate-500 mb-3">{item.org}</div>
                                        <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const ProjectsView = () => {
        const categories = ['All', ...Array.from(new Set(allProjects.map(p => p.category)))];
        const filteredProjects = projectFilter === 'All'
            ? allProjects
            : allProjects.filter(p => p.category === projectFilter);

        return (
            <div className="min-h-screen bg-slate-50 pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-2xl mb-12">
                        <div className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-2">Portfolio Archive</div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-6">All Projects</h1>
                        <p className="text-slate-600 text-lg">
                            A comprehensive list of my engineering projects, codebases, and experiments.
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setProjectFilter(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${projectFilter === cat
                                            ? 'bg-slate-900 text-white shadow-lg'
                                            : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Project Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group">
                                <div className={`h-2 w-full bg-gradient-to-r ${project.color}`}></div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 border border-slate-100 px-2 py-1 rounded bg-slate-50">
                                            {project.category}
                                        </span>
                                        <div className="flex gap-2">
                                            {project.links.github && <a href={project.links.github} target="_blank" className="text-slate-400 hover:text-slate-900"><Github size={16} /></a>}
                                            {project.links.demo && <a href={project.links.demo} target="_blank" className="text-slate-400 hover:text-emerald-600"><ExternalLink size={16} /></a>}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tech.map(t => (
                                            <span key={t} className="px-2 py-1 bg-slate-50 text-slate-600 text-xs rounded border border-slate-100">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
            <Navbar />
            {currentView === 'home' && <HomeView />}
            {currentView === 'about' && <AboutView />}
            {currentView === 'projects' && <ProjectsView />}

            {/* Footer */}
            <footer className="bg-white py-12 border-t border-slate-100">
                <div className="container mx-auto px-6 text-center text-slate-400 text-sm">
                    © {new Date().getFullYear()} Kripan K.C. Environmental Engineering & Design.
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;
