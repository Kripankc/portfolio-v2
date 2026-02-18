import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const siteConfig = {
    name: "Kripan K.C. | Environmental Engineer",
    description: "Environmental Engineer specializing in GIS, Remote Sensing, and Python for climate risk and hazard modeling.",
    url: "https://kripankc.github.io/portfolio-v2/",
};

export const metadata: Metadata = {
    title: siteConfig.name,
    description: siteConfig.description,
    keywords: ["Environmental Engineer", "GIS", "Remote Sensing", "Python", "Climate Risk", "Hazard Modeling"],
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
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="relative flex min-h-screen flex-col">
                        <main className="flex-1">
                            {children}
                        </main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
