import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import projects from "@/data/projects.json";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects | Kripan K.C.",
    description: "A showcase of my recent work in frontend architecture and geospatial engineering.",
};

export default function ProjectsPage() {
    return (
        <div className="container py-12 md:py-24 space-y-12">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                    Projects
                </h1>
                <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7 max-w-[85%]">
                    From high-performance geospatial engines to modern interactive web applications.
                </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.id} className="group overflow-hidden border transition-colors hover:border-foreground/20">
                        <div className="aspect-[16/9] w-full relative bg-muted flex items-center justify-center overflow-hidden">
                            {/* Use Next/Image in production with real assets */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0 z-10" />
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="object-cover transition-transform group-hover:scale-105"
                            // width={800} height={450} // Use with Next/Image
                            />
                        </div>
                        <CardHeader>
                            <div className="space-y-1">
                                <CardTitle className="text-xl">{project.title}</CardTitle>
                                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                    {project.technologies.slice(0, 3).map((tech) => (
                                        <span key={tech} className="bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground">{tech}</span>
                                    ))}
                                    {project.technologies.length > 3 && <span>+{project.technologies.length - 3}</span>}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="line-clamp-3">
                                {project.description}
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            {project.githubUrl && (
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                        <Github className="mr-2 h-4 w-4" /> Code
                                    </Link>
                                </Button>
                            )}
                            {/* Dynamically create detail link (not implemented fully) */}
                            <Button variant="default" size="sm" asChild>
                                <Link href={`/projects/${project.id}`}>
                                    Details <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
