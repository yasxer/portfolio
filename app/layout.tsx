import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import GlobalFX from "./components/GlobalFX";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yasser Haoues | Full-Stack Web Developer",
  description:
    "Portfolio of Yasser Haoues — Full-Stack Web Developer specializing in modern web applications, APIs, and creative digital experiences. Based in Algeria.",
  keywords: [
    "Yasser Haoues",
    "Full-Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Portfolio",
    "Algeria",
  ],
  authors: [{ name: "Yasser Haoues" }],
  openGraph: {
    title: "Yasser Haoues | Full-Stack Web Developer",
    description:
      "Full-Stack Web Developer specializing in modern web applications, APIs, and creative digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <GlobalFX />
        {children}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
