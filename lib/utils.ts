import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
    }).format(new Date(date));
};

// Must match `basePath` in next.config.mjs — plain <a>/<img> tags don't get
// Next's basePath auto-applied the way next/link and next/image do.
const BASE_PATH = "/portfolio-v2";

export const withBasePath = (path: string) => `${BASE_PATH}${path}`;
