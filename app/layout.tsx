import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/400.css";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.title}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { title: `${site.name} · ${site.title}`, description: site.description, url: site.url, type: "website" },
  keywords: ["Geospatial data science", "Remote sensing", "Earth observation", "Deep learning", "GIS", "Climate risk", "Hydrology"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 font-sans text-stone-800 antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
