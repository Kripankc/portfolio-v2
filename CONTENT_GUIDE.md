# Portfolio Content Guide

Since this portfolio is built as a static site (using GitHub Pages), you don't need a complex database or backend server. All your content lives in simple files you can edit directly.

## 1. Where do I put my content?

Your "database" consists of the JSON files in the `data/` folder.

-   **Projects:** `data/projects.json` (Titles, descriptions, tech stack, stats)
-   **Skills/Tools:** `data/skills.json` (Categories like "Geospatial", "Modeling")
-   **Work History:** `data/experience.json`
-   **Education:** `data/education.json`

## 2. How do I add new things?

### Adding a Research Abstract
1.  Open `data/projects.json`.
2.  Add a new block for your research project.
3.  Paste your abstract into the `description` field.

### Uploading Map Results (Images)
1.  Save your map image (e.g., `flood_map_2024.png`) in the `public/projects/` folder.
2.  In `data/projects.json`, set the `imageUrl` to `/projects/flood_map_2024.png`.

### Linking to GitHub Code
1.  In `data/projects.json`, use the `githubUrl` field:
    ```json
    "githubUrl": "https://github.com/kripankc/my-model-repo"
    ```

### Uploading Documents (PDFs/CV)
1.  Create a folder named `public/documents/`.
2.  Upload your PDF (e.g., `Kripan_CV.pdf`).
3.  You can link to it as `/documents/Kripan_CV.pdf`.

## 3. How to Update the Live Site?

After you edit a JSON file or upload an image:
1.  **Commit** your changes (using Git or GitHub Desktop).
2.  **Push** to GitHub.
3.  The **GitHub Actions** will automatically rebuild and deploy your changes.

**No backend code required!**
