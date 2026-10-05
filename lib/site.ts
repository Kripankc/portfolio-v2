// Site-wide facts. Edit here; every page reads from this file.
export const site = {
  name: "Kripan K C",
  title: "Geospatial Data Scientist",
  tagline: "Earth observation, deep learning and climate risk.",
  description:
    "Kripan K C, geospatial data scientist working on Earth observation, deep learning and climate risk. M.Sc. Environmental Engineering at TUM, Master's thesis at DLR.",
  url: "https://kripankc.github.io/portfolio-v2/",
  email: "kripankc3@gmail.com",
  github: "https://github.com/Kripankc",
  linkedin: "https://www.linkedin.com/in/kripankc",
  location: "Munich, Germany",
  cv: "/documents/Kripan_CV.pdf",
};

// Plain <a> and <img> tags do not get next.config basePath; next/link does.
export const BASE_PATH = "/portfolio-v2";
export const asset = (path: string) => `${BASE_PATH}${path}`;
