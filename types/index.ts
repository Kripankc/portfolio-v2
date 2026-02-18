export type Project = {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
};

export type Experience = {
    id: string;
    role: string;
    company: string;
    period: string;
    description: string[];
};

export type SiteConfig = {
    name: string;
    description: string;
    navItems: { label: string; href: string }[];
    socials: { label: string; href: string; icon: string }[];
};
