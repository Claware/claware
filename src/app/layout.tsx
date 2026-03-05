import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Claware - Deploy Your AI Assistant in Hours",
  description: "Yes, it does take a few hours to deploy your OpenClaw. I'll set up everything from purchasing the VPS to configuring and deploying your instance.",
  keywords: ["openClaw", "setup", "openclaw", "simpleClaw", "deploy openclaw", "openclaw ai", "claware"],
  openGraph: {
    title: "Claware - Deploy Your AI Assistant in Hours",
    description: "Yes, it does take a few hours to deploy your OpenClaw. I'll set up everything from purchasing the VPS to configuring and deploying your instance.",
    url: "https://claware.ai",
    siteName: "Claware",
    images: [
      {
        url: "https://claware.ai/claware.ai-og.png",
        width: 1200,
        height: 630,
        alt: "Claware - Deploy Your OpenClaw",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claware - Deploy Your AI Assistant in Hours",
    description: "Yes, it does take a few hours to deploy your OpenClaw. I'll set up everything from purchasing the VPS to configuring and deploying your instance.",
    images: ["https://claware.ai/claware.ai-og.png"],
    creator: "@claware",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
