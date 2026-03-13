import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Claware',
  description:
    'Insights, updates, and best practices for AI agents, documentation, and knowledge management.',
  keywords: [
    'OpenClaw',
    'openclaw setup',
    'openclaw telegram',
    'openclaw whatsapp',
    'openclaw discord',
    'Claware blog',
  ],
  openGraph: {
    title: 'Blog - Claware',
    description:
      'Insights, updates, and best practices for AI agents, documentation, and knowledge management.',
    url: 'https://claware.ai/blog',
    siteName: 'Claware',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Claware',
    description:
      'Insights, updates, and best practices for AI agents, documentation, and knowledge management.',
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
