import { Hero } from "@/components/sections/hero";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import projects from "@/data/projects.json";

export default function Home() {
    const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

    return (
        <div className="flex flex-col min-h-screen">
            <Hero />

            <section className="py-24 bg-muted/30">
                <div className="container">
                    <div className="mb-12 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Scientific Focus</h2>
                            <p className="text-muted-foreground mt-2">
                                Bridging environmental data with computational modeling and geospatial analysis.
                            </p>
                        </div>
                        <Link
                            href="/projects"
                            className="group flex items-center text-sm font-medium text-primary hover:underline"
                        >
                            Explore all research
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {featuredProjects.map((project) => (
                            <Link key={project.id} href={`/projects/${project.id}`} className="group block">
                                <div className="space-y-4">
                                    <div className="aspect-video relative overflow-hidden rounded-xl border bg-muted transition-all group-hover:shadow-lg">
                                        <img
                                            src={project.imageUrl}
                                            alt={project.title}
                                            className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent flex items-end p-4">
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.slice(0, 2).map(tech => (
                                                    <span key={tech} className="text-[10px] font-bold bg-background/80 backdrop-blur px-2 py-0.5 rounded uppercase">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 border-t">
                <div className="container grid gap-12 md:grid-cols-2 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">Applied Geospatial Science</h2>
                        <p className="text-lg text-muted-foreground">
                            I leverage Python and Satellite imagery to assess climate risk
                            at scale. From modeling flood hazards in the Alps to analyzing
                            glacier dynamics in the Himalayas.
                        </p>
                        <div className="flex gap-4">
                            <Button asChild>
                                <Link href="/about">My Expertise</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/contact">Get in Touch</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted aspect-square rounded-2xl flex flex-col items-center justify-center p-6 text-center space-y-2 border border-border/50">
                            <span className="text-3xl font-bold text-primary">GIS</span>
                            <span className="text-xs uppercase font-bold tracking-widest opacity-50">Spatial Analyst</span>
                        </div>
                        <div className="bg-primary text-primary-foreground aspect-square rounded-2xl flex flex-col items-center justify-center p-6 text-center space-y-2 border shadow-xl">
                            <span className="text-3xl font-bold">Python</span>
                            <span className="text-xs uppercase font-bold tracking-widest opacity-70">Hazards Modeling</span>
                        </div>
                        <div className="bg-muted aspect-square rounded-2xl flex flex-col items-center justify-center p-6 text-center space-y-2 border border-border/50">
                            <span className="text-3xl font-bold">APIs</span>
                            <span className="text-xs uppercase font-bold tracking-widest opacity-50">Production Risk</span>
                        </div>
                        <div className="bg-muted aspect-square rounded-2xl flex flex-col items-center justify-center p-6 text-center space-y-2 border border-border/50">
                            <span className="text-3xl font-bold">Remote</span>
                            <span className="text-xs uppercase font-bold tracking-widest opacity-50">Sensing Data</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
