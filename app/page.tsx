import { Hero } from "@/components/sections/hero";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero />
            <section className="py-24 bg-muted/30">
                <div className="container">
                    <div className="mb-12 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Featured Work</h2>
                            <p className="text-muted-foreground mt-2">
                                A selection of recent projects and architectural experiments.
                            </p>
                        </div>
                        <Link
                            href="/projects"
                            className="group flex items-center text-sm font-medium text-primary hover:underline"
                        >
                            View all projects
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Project Cards Placeholder - In production, map from data/projects.json */}
                        <div className="aspect-video rounded-xl bg-muted/50 border flex items-center justify-center text-muted-foreground">
                            Project 1 Preview
                        </div>
                        <div className="aspect-video rounded-xl bg-muted/50 border flex items-center justify-center text-muted-foreground">
                            Project 2 Preview
                        </div>
                        <div className="aspect-video rounded-xl bg-muted/50 border flex items-center justify-center text-muted-foreground">
                            Project 3 Preview
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
