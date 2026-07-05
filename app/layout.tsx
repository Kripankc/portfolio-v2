import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const siteConfig = {
    name: "Kripan K C | Geospatial Data Scientist",
    description: "Geospatial Data Scientist and Remote Sensing Engineer specializing in Earth observation, applied deep learning, and climate risk modeling.",
    url: "https://kripankc.github.io/portfolio-v2/",
};

export const metadata: Metadata = {
    title: siteConfig.name,
    description: siteConfig.description,
    keywords: ["Geospatial Data Scientist", "Remote Sensing", "Earth Observation", "Deep Learning", "GIS", "Python", "Climate Risk", "Hazard Modeling"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    inter.variable,
                    mono.variable
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <main className="min-h-screen flex flex-col">
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
