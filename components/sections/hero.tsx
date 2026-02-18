"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

const CanvasScene = dynamic(() => import("@/components/ui/canvas-scene"), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-transparent" />,
});

export function Hero() {
    return (
        <section className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden py-12 md:py-24 lg:py-32">
            <div className="container relative z-10 flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 space-y-6"
                >
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        Building{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                            Digital Landscapes
                        </span>
                    </h1>
                    <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:mx-0 md:text-xl">
                        Senior Frontend Architect specializing in scalable web applications, geospatial
                        visualization, and performance optimization.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                        <Button size="lg" asChild>
                            <Link href="/projects">
                                View Projects <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/cv.pdf" target="_blank">
                                Download CV <Download className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="flex-1 items-center justify-center hidden md:flex h-[500px] w-full"
                >
                    <div className="relative h-full w-full">
                        <Suspense fallback={null}>
                            <CanvasScene />
                        </Suspense>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
