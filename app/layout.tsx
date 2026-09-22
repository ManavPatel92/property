import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: { default: "Executive Lets Ltd", template: "%s | Executive Lets Ltd" }, description: "Explore lettings, sales and property management with Executive Lets Ltd.", icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
