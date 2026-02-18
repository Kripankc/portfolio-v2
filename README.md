# Portfolio v2 Scaffold

This is a production-ready portfolio scaffold built with Next.js 14, TypeScript, TailwindCSS, and Framer Motion. It follows strict architectural guidelines for scalability, accessibility, and performance.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript throughout (Strict Mode)
- **Styling**: TailwindCSS (Utility-first) + `clsx` / `tailwind-merge`
- **Animations**: Framer Motion + React Three Fiber (Hero)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Theming**: `next-themes` (Dark/Light Mode)
- **Testing**: Setup for Jest + Playwright (Configuration included in `package.json`)

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

3.  **Build for Production**:
    ```bash
    npm run build
    npm start
    ```

## Folder Structure

```
portfolio-next/
├── app/                  # Next.js App Router
│   ├── globals.css       # Global styles & Tailwind directives
│   ├── layout.tsx        # Root layout (Providers, Fonts, SEO)
│   ├── page.tsx          # Home page (Hero, Featured)
│   ├── projects/         # Projects route
│   │   ├── page.tsx      # Projects list
│   │   └── [id]/page.tsx # Dynamic project detail
│   └── ...
├── components/           # Reusable components
│   ├── ui/               # Atomic UI (Button, Card, Header, Footer)
│   │   ├── button.tsx    # Shadcn-compatible Button
│   │   ├── header.tsx    # Sticky Nav + Mobile Drawer
│   │   ├── footer.tsx    # Simple Footer
│   │   ├── canvas-scene.tsx # R3F 3D Scene
│   └── sections/         # Page sections
│       ├── hero.tsx      # Hero section (with R3F dynamic import)
│       └── ...
├── lib/                  # Utilities
│   └── utils.ts          # Class merging helper (cn)
├── hooks/                # Custom React hooks
├── data/                 # JSON Content
│   └── projects.json     # Project data schema
├── types/                # TypeScript definitions
│   └── index.ts          # Project, Experience types
├── public/               # Static assets
│   └── projects/         # Project images
├── types/                # Type definitions
├── tailwind.config.ts    # Tailwind config + extended theme
├── tsconfig.json         # TypeScript config
├── next.config.mjs       # Next.js config
└── package.json          # Dependencies & Scripts
```

## Key Configuration Files

-   **`tailwind.config.ts`**: Includes extended theme (HSL variables), animations (`float`, `accordion`), and dark mode configuration.
-   **`app/globals.css`**: Defines CSS variables for `background`, `foreground`, `primary`, `secondary` following shadcn/ui convention.
-   **`app/layout.tsx`**: Implements `next-themes` provider, `Inter`/`JetBrains Mono` fonts, and SEO metadata.
-   **`components/ui/button.tsx`**: Uses `class-variance-authority` for robust button variants.

## Deployment Instructions (Vercel)

This scaffold is optimized for deployment on Vercel.

1.  **Push to GitHub**:
    Initialize a git repository and push this folder.
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/yourusername/portfolio-next.git
    git push -u origin main
    ```

2.  **Import Project in Vercel**:
    -   Go to [Vercel Dashboard](https://vercel.com/dashboard).
    -   Click **"Add New..."** -> **"Project"**.
    -   Import your GitHub repository.

3.  **Configure Build Settings**:
    -   Framework Preset: **Next.js** (Auto-detected).
    -   Root Directory: `./portfolio-next` (if inside a monorepo) or `./` (if root).
    -   Environment Variables: None required for basic setup.

4.  **Deploy**:
    -   Click **Deploy**. Vercel will build and assign a domain automatically.

## Next Steps

-   **Implement Data Fetching**: Create utility functions in `lib/data.ts` to read `data/projects.json`.
-   **Add Images**: Place project images in `public/projects/`.
-   **Customize Theme**: Adjust HSL values in `app/globals.css` to match your brand colors.
-   **Connect Forms**: Set up a server action or API route for the Contact form using `react-hook-form` and `zod`.
