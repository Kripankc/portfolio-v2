/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",  // <=== Enables static HTML export for GitHub Pages
    images: {
        unoptimized: true, // <=== Required for static export (Next.js Image API needs a server)
    },
    // If your repo is NOT at the root (e.g. username.github.io/repo-name),
    // you might need to uncomment and set the repo name here:
    basePath: "/portfolio-v2",
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
