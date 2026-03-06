import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Claware - Deploy Your AI Assistant in Minutes",
  description: "Skip the technical headaches. Deploy your own 24/7 OpenClaw in under 1 minute — no coding, no configuration, just one click.",
  keywords: ["openClaw", "setup", "openclaw", "simpleClaw", "deploy openclaw", "openclaw ai", "claware", "openclaw telegram"],
  openGraph: {
    title: "Claware - Deploy Your AI Assistant in Minutes",
    description: "Skip the technical headaches. Deploy your own 24/7 OpenClaw in under 1 minute — no coding, no configuration, just one click.",
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
    title: "Claware - Deploy Your AI Assistant in minutes",
    description: "Skip the technical headaches. Deploy your own 24/7 OpenClaw in under 1 minute — no coding, no configuration, just one click.",
    images: ["https://claware.ai/claware.ai-og.png"],
    creator: "@claware",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Claware",
      "legalName": "Claware Inc.",
      "url": "https://claware.ai",
      "logo": "https://claware.ai/claware.ai-og.png",
      "foundingDate": "2024",
      "description": "Skip the technical headaches. Deploy your own 24/7 OpenClaw in under 1 minute — no coding, no configuration, just one click.",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "support@claware.ai"
      },
      "sameAs": [
        "https://twitter.com/claware",
        "https://github.com/Claware"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is OpenClaw and how does it work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "OpenClaw is your personal AI assistant deployed on a dedicated VPS. It integrates with your messaging channels (Telegram, Discord, WhatsApp) and can be configured with your preferred AI model (Claude, GPT-4, Gemini). We handle the entire setup process from purchasing the VPS to deployment."
          }
        },
        {
          "@type": "Question",
          "name": "How to setup OpenClaw Telegram?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Go to @BotFather on Telegram and use the /newbot command to create a new bot. Follow the prompts to name your bot and choose a unique username ending in 'bot'. Copy the bot token provided by BotFather (format: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz) and paste it into your OpenClaw configuration. Your bot will be connected and ready to use."
          }
        },
        {
          "@type": "Question",
          "name": "Which AI models and channels are supported?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We support multiple AI models including Claude Opus, GPT-4o, and Gemini 2.5 Pro. For messaging channels, we currently support Telegram (available now) with Discord, WhatsApp, and Email coming soon. You can switch between models and add multiple channels as they become available."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
