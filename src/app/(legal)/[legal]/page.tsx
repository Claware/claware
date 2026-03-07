import { notFound } from 'next/navigation';
import TermsContent from '@/content/legal/terms.mdx';

// Valid legal page slugs that should render the Terms of Service
const validSlugs = ['tos', 'terms'];

export default async function LegalPage({
  params,
}: {
  params: Promise<{ legal: string }>;
}) {
  const { legal } = await params;

  // Check if the slug is valid
  if (!validSlugs.includes(legal)) {
    notFound();
  }

  // Both tos and terms render the same content
  return <TermsContent />;
}

// Generate static params for both paths
export function generateStaticParams() {
  return [
    { legal: 'tos' },
    { legal: 'terms' },
  ];
}

// Metadata for both paths
export const metadata = {
  title: 'Terms of Service - Claware',
  description: 'Terms of Service for Claware',
};
