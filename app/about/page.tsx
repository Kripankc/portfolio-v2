import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import skills from "@/data/skills.json";
import experience from "@/data/experience.json";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Kripan K.C.",
    description: "Senior Frontend Architect with expertise in Next.js, Geospatial Engineering, and Scalable Systems.",
};

// Badge component removed to simplify build


export default function AboutPage() {
    return (
        <div className="container py-12 md:py-24 space-y-24">
            {/* Bio Section */}
            <section className="space-y-6 max-w-3xl">
                <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                    About Me
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    I'm an Environmental Engineering graduate and current MSc candidate at TUM, specializing in Geospatial Solutions.
                    I bridge the gap between complex environmental data and high-performance digital tools.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                    Currently, I am an Intern at the **Geospatial Solutions Team at Munich Re**, where I develop climate and hazard risk
                    models using advanced Remote Sensing technology and Python-based API development.
                    My goal is to build resilient systems for a sustainable future.
                </p>
            </section>

            {/* Education Section */}
            <section className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight">Education</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>MSc in Environmental Engineering</CardTitle>
                            <CardDescription>Technical University of Munich (TUM), Germany</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-2">2024 - Present</p>
                            <p className="text-sm">Specialization: Environmental Hazards and Risk, Water Resources Management.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>BTech in Environmental Engineering</CardTitle>
                            <CardDescription>Kathmandu University, Nepal</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-2">2018 - 2023</p>
                            <p className="text-sm">Key Subjects: Water Resources, Geographic Information Systems (GIS).</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Skills Section */}
            <section className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight">Technical Skills</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader><CardTitle>Geospatial</CardTitle></CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {skills.geospatial.map(skill => (
                                <span key={skill} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                                    {skill}
                                </span>
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Environmental Modeling</CardTitle></CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {skills.modeling.map(skill => (
                                <span key={skill} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                                    {skill}
                                </span>
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Data & Analysis</CardTitle></CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {skills.analysis.map(skill => (
                                <span key={skill} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                                    {skill}
                                </span>
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Development</CardTitle></CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {skills.frontend.map(skill => (
                                <span key={skill} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                                    {skill}
                                </span>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Experience Timeline */}
            <section className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
                <div className="relative border-l border-muted pl-6 space-y-12">
                    {experience.map((job) => (
                        <div key={job.id} className="relative">
                            <span className="absolute -left-[1.65rem] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <h3 className="text-xl font-bold">{job.role}</h3>
                                <span className="text-sm text-muted-foreground font-mono bg-muted px-2 py-1 rounded">{job.period}</span>
                            </div>
                            <div className="text-lg font-medium text-accent-cyan mb-4">{job.company}</div>
                            <ul className="list-disc list-outside ml-4 space-y-2 text-muted-foreground">
                                {job.description.map((desc, i) => (
                                    <li key={i}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
