"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Globe2, Server, Waves, ChevronRight, Projector } from "lucide-react";
import skillsData from "@/data/skills.json";

const iconMap = {
    Code2: Code2,
    Globe2: Globe2,
    Server: Server,
    Waves: Waves
};

export default function InteractiveSkills() {
    const [selectedCategory, setSelectedCategory] = useState(skillsData.categories[0].id);

    return (
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
            {/* Category Selection Icons */}
            <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto pb-4 lg:pb-0">
                {skillsData.categories.map((category) => {
                    const Icon = iconMap[category.icon as keyof typeof iconMap] || Code2;
                    const isSelected = selectedCategory === category.id;

                    return (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left min-w-[200px] lg:min-w-0 ${isSelected
                                    ? "bg-primary text-primary-foreground border-primary shadow-lg scale-[1.02]"
                                    : "bg-card hover:bg-accent border-border"
                                }`}
                        >
                            <Icon className={`h-6 w-6 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
                            <div>
                                <div className="font-bold">{category.title}</div>
                                <div className={`text-xs ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                                    {category.tools.length} Tools
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Details Panel */}
            <div className="relative min-h-[400px]">
                <AnimatePresence mode="wait">
                    {skillsData.categories.map((category) => (
                        category.id === selectedCategory && (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">{category.title}</h3>
                                    <p className="text-muted-foreground italic">{category.description}</p>
                                </div>

                                <div className="grid gap-4">
                                    {category.tools.map((tool) => (
                                        <Card key={tool.name} className="group overflow-hidden border-muted hover:border-primary/50 transition-colors">
                                            <CardHeader className="p-4 pb-2">
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                                        <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                                                        {tool.name}
                                                    </CardTitle>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0 space-y-3">
                                                <p className="text-sm text-muted-foreground">{tool.description}</p>
                                                {tool.projects && tool.projects.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 pt-2">
                                                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-bold flex items-center gap-1">
                                                            <Projector className="h-3 w-3" /> Used in:
                                                        </span>
                                                        {tool.projects.map(pId => (
                                                            <span key={pId} className="text-[10px] bg-secondary/50 px-2 py-0.5 rounded text-secondary-foreground font-medium">
                                                                {pId.replace(/-/g, ' ')}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
