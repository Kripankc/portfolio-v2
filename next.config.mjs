/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // static HTML for GitHub Pages
  basePath: "/portfolio-v2", // site lives at kripankc.github.io/portfolio-v2
  trailingSlash: true,       // /about/ -> about/index.html, works on GitHub Pages
  images: { unoptimized: true },
};

export default nextConfig;
