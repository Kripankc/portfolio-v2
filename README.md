# Kripan K C · portfolio

Personal site: **https://kripankc.github.io/portfolio-v2/**

Next.js 14 (static export) + Tailwind CSS, hosted on GitHub Pages.

## Edit content

All text lives in plain data files; pages read from them.

| What | File |
|---|---|
| Name, title, email, links, CV path | `lib/site.ts` |
| Projects (and which are featured) | `data/projects.json`, groups and home selection in `lib/content.ts` |
| Work experience | `data/experience.json` |
| Education | `data/education.json` |
| Skills | `data/skills.json` |
| Awards, languages | `data/profile.json` |
| CV | `public/documents/Kripan_CV.pdf` |

Periods are written like `Sep 2025 – Mar 2026`, `May 2026 – Present` or `2019 – 2023`; the timeline reads them directly.

## Hero background

Contours of Nepal every 500 m (index lines every 2,000 m) from the Copernicus DEM GLO-90 (ESA, Copernicus Programme), clipped to the Natural Earth 1:10m border. Built by `scripts/build_topo.py` into `public/data/nepal-topo.svg`: run the **Build Nepal topography** action once (Actions tab → Run workflow). The site redeploys when it finishes.

## Run locally

```bash
npm ci
npm run dev        # http://localhost:3000/portfolio-v2
npm run build      # static site in ./out
```
