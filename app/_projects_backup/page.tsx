"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, ExternalLink, Filter, X } from "lucide-react";
import projectsData from "@/data/projects.json";
import Link from "next/link";

const allTopics = Array.from(new Set(projectsData.flatMap(p => p.topics)));

export default function ProjectsPage() {
    const [filter, setFilter] = useState<string | null>(null);

    const filteredProjects = useMemo(() => {
        if (!filter) return projectsData;
        return projectsData.filter(p => p.topics.includes(filter));
    }, [filter]);

    return (
        <div className="container py-12 md:py-24 space-y-12">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                    Research & Projects
                </h1>
                <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7 max-w-[85%]">
                    Exploring the intersection of environmental science, geospatial technology, and climate risk.
                </p>
            </div>

            {/* Filter UI */}
            <div className="flex flex-wrap items-center justify-center gap-2 pb-8">
                <Button
                    variant={filter === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(null)}
                    className="rounded-full"
                >
                    All Projects
                </Button>
                {allTopics.map((topic) => (
                    <Button
                        key={topic}
                        variant={filter === topic ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter(topic)}
                        className="rounded-full"
                    >
                        {topic}
                    </Button>
                ))}
            </div>

            <motion.div
                layout
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className="group h-full flex flex-col overflow-hidden border transition-all hover:border-primary/50 hover:shadow-xl hover:-translate-y-1">
                                <div className="aspect-[16/9] w-full relative bg-muted overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-60 z-10 transition-opacity group-hover:opacity-40" />
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {project.featured && (
                                        <div className="absolute top-2 right-2 z-20 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-tighter">
                                            Featured
                                        </div>
                                    )}
                                </div>
                                <CardHeader className="p-5 flex-grow">
                                    <div className="space-y-3">
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-1">{project.title}</CardTitle>
                                        <div className="flex flex-wrap gap-1.5 min-h-[50px] content-start">
                                            {project.technologies.map((tech) => (
                                                <span key={tech} className="text-[10px] font-medium bg-secondary/80 text-secondary-foreground px-2 py-0.5 rounded border border-border/50">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <CardDescription className="line-clamp-4 text-sm leading-relaxed">
                                            {project.description}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardFooter className="p-5 pt-0 flex gap-2">
                                    {project.githubUrl && (
                                        <Button variant="outline" size="sm" className="h-8 text-xs flex-1" asChild>
                                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                <Github className="mr-2 h-3.5 w-3.5" /> Code
                                            </Link>
                                        </Button>
                                    )}
                                    <Button variant="default" size="sm" className="h-8 text-xs flex-1" asChild>
                                        <Link href={`/projects/${project.id}`}>
                                            Case Study <ArrowRight className="ml-2 h-3.5 w-3.5" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
                <div className="py-24 text-center space-y-4">
                    <Filter className="mx-auto h-12 w-12 text-muted-foreground/30" />
                    <p className="text-muted-foreground">No projects found for this filter.</p>
                    <Button variant="link" onClick={() => setFilter(null)}>Clear all filters</Button>
                </div>
            )}
        </div>
    );
}
