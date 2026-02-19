"use client";
import React, { useState, useEffect } from 'react';
import {
    Menu, X, Github, Linkedin, Mail, ChevronRight, ChevronLeft, ChevronDown, Map, Globe,
    Layers, Download, Code, Terminal, Cpu, Leaf, Droplets, Activity, ArrowUpRight,
    Server, GraduationCap, Award, ExternalLink, Briefcase, MapPin, Calendar
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

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [currentView, setCurrentView] = useState('home');
    const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
    const [showSkillProjects, setShowSkillProjects] = useState(false);
    const [projectFilter, setProjectFilter] = useState('All');

    // Data Preparation
    const allProjects = projectsData.map((p, idx) => ({
        id: idx,
        featured: p.featured,
        title: p.title,
        desc: p.description,
        tags: p.technologies,
        category: "Web", // Default or map from tags
        links: { github: p.githubUrl, demo: p.githubUrl }, // Using githubUrl as demo fallback
        color: designColors[idx % designColors.length]
    }));

    const skillCategories = skillsData.categories.map(cat => ({
        name: cat.title,
        icon: cat.icon,
        skills: cat.tools.map(tool => tool.name),
        color: "text-blue-400"
    }));

    const timeline = experienceData.map((job, idx) => ({
        year: job.period,
        role: job.role,
        company: job.company,
        desc: job.description
    }));

    const bio = {
        name: "Kripank",
        role: "DevOps & Cloud Engineer",
        tagline: "Building scalable infrastructure and automated solutions.",
        about: "I am a passionate DevOps Engineer with a strong background in environmental engineering. Wait, what? Yes! I transitioned from analyzing environmental data to optimizing cloud infrastructure. I love automating tedious tasks and building robust CI/CD pipelines.",
        location: "Munich, Germany",
        email: "contact@example.com",
        github: "https://github.com/Kripankc",
        linkedin: "https://linkedin.com/in/kripank"
    };

    // Scroll Handler
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            const sections = ['home', 'about', 'projects', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top >= 0 && rect.top <= 300;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const Navbar = () => (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || currentView !== 'home' ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <button onClick={() => setCurrentView('home')} className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                    K.
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                setCurrentView(item.toLowerCase());
                                setIsMenuOpen(false);
                            }}
                            className={`text-sm font-medium transition-colors hover:text-blue-600 ${currentView === item.toLowerCase() ? 'text-blue-600' : 'text-gray-600'
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 md:hidden flex flex-col space-y-4">
                        {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => {
                                    setCurrentView(item.toLowerCase());
                                    setIsMenuOpen(false);
                                }}
                                className="text-left text-gray-600 hover:text-blue-600 py-2"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );

    const HomeView = () => {
        return (
            <>
                {/* Hero Section */}
                <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-50/50 -z-10" />
                    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center space-x-2 bg-blue-100/50 px-3 py-1 rounded-full text-blue-600 text-sm font-medium">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                <span>Available for Hire</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                                Building <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Digital</span>
                                <br /> Experiences
                            </h1>
                            <p className="text-xl text-gray-600 max-w-lg">
                                {bio.tagline}
                            </p>
                            <div className="flex space-x-4 pt-4">
                                <button onClick={() => setCurrentView('projects')} className="group flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors">
                                    <span>View Work</span>
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="flex items-center space-x-2 border border-gray-200 px-6 py-3 rounded-full hover:border-blue-200 hover:bg-blue-50 transition-colors text-gray-700">
                                    <Download size={18} />
                                    <span>Download CV</span>
                                </button>
                            </div>
                        </div>

                        {/* Hero Visual */}
                        <div className="relative h-[500px] hidden md:block">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-50" />
                            <div className="relative z-10 grid grid-cols-2 gap-4 animate-float">
                                <div className="space-y-4 mt-12">
                                    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-blue-100/50 transform hover:-translate-y-2 transition-transform duration-300">
                                        <Code className="text-blue-500 mb-4" size={32} />
                                        <h3 className="font-bold text-gray-800">Clean Code</h3>
                                        <p className="text-sm text-gray-500">Maintainable & Scalable</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-blue-100/50 transform hover:-translate-y-2 transition-transform duration-300">
                                        <Globe className="text-cyan-500 mb-4" size={32} />
                                        <h3 className="font-bold text-gray-800">Global Scale</h3>
                                        <p className="text-sm text-gray-500">Distributed Systems</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-blue-100/50 transform hover:-translate-y-2 transition-transform duration-300">
                                        <Server className="text-indigo-500 mb-4" size={32} />
                                        <h3 className="font-bold text-gray-800">Backend</h3>
                                        <p className="text-sm text-gray-500">Robust Architecture</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-blue-100/50 transform hover:-translate-y-2 transition-transform duration-300">
                                        <Activity className="text-emerald-500 mb-4" size={32} />
                                        <h3 className="font-bold text-gray-800">Performance</h3>
                                        <p className="text-sm text-gray-500">High Availability</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Career Summary */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="md:w-1/2">
                                <h2 className="text-3xl font-bold mb-6">Career Timeline</h2>
                                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                                    {timeline.slice(0, 3).map((job, idx) => (
                                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                                <Briefcase size={16} />
                                            </div>
                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow">
                                                <div className="flex items-center justify-between space-x-2 mb-1">
                                                    <div className="font-bold text-slate-900">{job.role}</div>
                                                    <time className="font-caveat font-medium text-blue-500">{job.year}</time>
                                                </div>
                                                <div className="text-slate-500 text-sm">{job.company}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => setCurrentView('about')} className="mt-8 text-blue-600 font-medium hover:underline flex items-center">
                                    View Full History <ArrowUpRight size={16} className="ml-1" />
                                </button>
                            </div>
                            <div className="md:w-1/2 bg-gray-50 rounded-2xl p-8 border border-gray-100">
                                <h2 className="text-3xl font-bold mb-6">Education</h2>
                                <div className="space-y-6">
                                    {educationData.map((edu, idx) => (
                                        <div key={idx} className="flex gap-4 items-start">
                                            <div className="bg-white p-3 rounded-lg shadow-sm text-blue-500">
                                                <GraduationCap size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                                <p className="text-gray-600">{edu.institution}</p>
                                                <p className="text-sm text-gray-500 mt-1">{edu.period}</p>
                                                {edu.honors && <div className="mt-2 flex items-center text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full w-fit">
                                                    <Award size={14} className="mr-1" />
                                                    {edu.honors}
                                                </div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Toolkit Preview */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Arsenal</h2>
                                <p className="text-gray-600 max-w-xl">Technologies I use to build robust solutions.</p>
                            </div>
                            <button onClick={() => setShowSkillProjects(!showSkillProjects)} className="hidden md:flex items-center space-x-2 text-blue-600 font-medium hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                                <Code size={20} />
                                <span>{showSkillProjects ? 'Hide Details' : 'View Details'}</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {skillCategories.map((cat) => (
                                <div
                                    key={cat.name}
                                    onClick={() => setExpandedSkill(expandedSkill === cat.name ? null : cat.name)}
                                    className={`bg-white p-6 rounded-xl border transition-all cursor-pointer ${expandedSkill === cat.name
                                        ? 'border-blue-500 shadow-lg ring-2 ring-blue-500/20'
                                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                                        }`}
                                >
                                    <div className={`${cat.color} mb-4`}>
                                        {iconMap[cat.icon] || <Code size={24} />}
                                    </div>
                                    <h3 className="font-medium text-gray-900">{cat.name}</h3>
                                    <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                                        <span>{cat.skills.length} skills</span>
                                        <ChevronDown size={16} className={`transform transition-transform ${expandedSkill === cat.name ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Expanded Skill Details */}
                        {expandedSkill && (
                            <div className="mt-8 bg-white rounded-2xl border border-blue-100 p-8 animate-in fade-in slide-in-from-top-4">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{expandedSkill}</h3>
                                        <p className="text-gray-600">Key competencies and tools</p>
                                    </div>
                                    <button onClick={() => setExpandedSkill(null)} className="text-gray-400 hover:text-gray-600">
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {skillCategories.find(c => c.name === expandedSkill)?.skills.map((skill) => (
                                        <span key={skill} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                {showSkillProjects && (
                                    <div className="mt-8 pt-8 border-t border-gray-100">
                                        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                                            <Layers size={18} className="mr-2 text-blue-500" />
                                            Related Projects
                                        </h4>
                                        <div className="grid md:grid-cols-3 gap-6">
                                            {allProjects.slice(0, 3).map(project => (
                                                <div key={project.id} className="group bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition-colors cursor-pointer" onClick={() => setCurrentView('projects')}>
                                                    <h5 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{project.title}</h5>
                                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Featured Projects Carousel */}
                <section className="py-20 bg-white overflow-hidden">
                    <div className="container mx-auto px-6">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full text-blue-600 text-sm font-medium mb-4">
                                    <span>Selected Works</span>
                                </div>
                                <h2 className="text-4xl font-bold text-gray-900">Featured Projects</h2>
                            </div>
                            <div className="flex space-x-2">
                                <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600">
                                    <ChevronLeft size={24} />
                                </button>
                                <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600">
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="flex space-x-8 overflow-x-auto pb-8 snap-x hide-scrollbar">
                            {allProjects.filter(p => p.featured).map((project) => (
                                <div key={project.id} className="min-w-[300px] md:min-w-[400px] snap-center">
                                    <div className={`h-full bg-gradient-to-br ${project.color} p-1 rounded-2xl`}>
                                        <div className="bg-white h-full rounded-xl p-8 flex flex-col justify-between hover:translate-y-[-4px] transition-transform duration-300">
                                            <div>
                                                <div className="flex justify-between items-start mb-6">
                                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                                                        {project.category}
                                                    </span>
                                                    <div className="flex space-x-2">
                                                        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                                                            <Github size={20} />
                                                        </a>
                                                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                                                            <ExternalLink size={20} />
                                                        </a>
                                                    </div>
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                                                <p className="text-gray-600 mb-6 leading-relaxed">
                                                    {project.desc}
                                                </p>
                                            </div>
                                            <div>
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {project.tags.slice(0, 3).map(tag => (
                                                        <span key={tag} className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <button onClick={() => setCurrentView('projects')} className="w-full py-3 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center group">
                                                    <span>View Case Study</span>
                                                    <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section id="contact" className="py-24 bg-gray-900 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-3xl rounded-full translate-x-1/2" />
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to start a project?</h2>
                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            <a href={`mailto:${bio.email}`} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 flex items-center justify-center">
                                <Mail className="mr-2" />
                                Send an Email
                            </a>
                            <a href={bio.linkedin} target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center">
                                <Linkedin className="mr-2" />
                                Connect on LinkedIn
                            </a>
                        </div>
                    </div>
                </section>
            </>
        );
    };

    const AboutView = () => (
        <div className="pt-24 min-h-screen bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">About Me</h1>
                <div className="prose prose-lg text-gray-600 mb-12">
                    <p className="text-xl leading-relaxed mb-6">{bio.about}</p>
                    <div className="grid md:grid-cols-2 gap-8 not-prose mt-12">
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                <MapPin className="text-blue-500 mr-2" /> Location
                            </h3>
                            <p>{bio.location}</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                <Mail className="text-blue-500 mr-2" /> Contact
                            </h3>
                            <p>{bio.email}</p>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-8">Experience</h2>
                <div className="space-y-12">
                    {timeline.map((job, idx) => (
                        <div key={idx} className="flex gap-6">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                    <Briefcase size={20} />
                                </div>
                                {idx !== timeline.length - 1 && <div className="w-0.5 bg-gray-200 flex-1 my-2" />}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{job.role}</h3>
                                <div className="text-blue-600 font-medium mb-2">{job.company} | {job.year}</div>
                                <p className="text-gray-600 leading-relaxed">{job.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const ProjectsView = () => {
        const categories = ['All', 'Web', 'Data', 'Cloud']; // Example categories
        return (
            <div className="pt-24 min-h-screen bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto mb-16 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">Project Archive</h1>
                        <p className="text-xl text-gray-600 mb-8">A collection of experiments, products, and open source contributions.</p>

                        <div className="flex justify-center flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setProjectFilter(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${projectFilter === cat
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {allProjects.map((project) => (
                            <div key={project.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group">
                                <div className={`h-2 bg-gradient-to-r ${project.color}`} />
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                            {project.category}
                                        </div>
                                        <div className="flex space-x-3 text-gray-400">
                                            <a href={project.links.github} className="hover:text-gray-900 transition-colors"><Github size={20} /></a>
                                            <a href={project.links.demo} className="hover:text-blue-600 transition-colors"><ExternalLink size={20} /></a>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                                    <p className="text-gray-600 mb-6 line-clamp-3">{project.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.slice(0, 4).map(tag => (
                                            <span key={tag} className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                                {tag}
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
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
            <Navbar />
            <main>
                {currentView === 'home' && <HomeView />}
                {currentView === 'about' && <AboutView />}
                {currentView === 'projects' && <ProjectsView />}
                {currentView === 'contact' && <div className="pt-20"><HomeView /></div>}
            </main>
            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
                    <p>&copy; {new Date().getFullYear()} Kripank. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href={bio.github} className="hover:text-blue-600 transition-colors">GitHub</a>
                        <a href={bio.linkedin} className="hover:text-blue-600 transition-colors">LinkedIn</a>
                        <a href={`mailto:${bio.email}`} className="hover:text-blue-600 transition-colors">Email</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;
