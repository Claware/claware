// Author type
export interface Author {
  id: string;
  name: string;
  title: string;
  avatar: string;
}

// Category type
export type Category =
  | 'All articles'
  | 'AI trends'
  | 'Announcements'
  | 'For founders'
  | 'Engineering'
  | 'Design'
  | 'Best practices';

// Article type
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: Category;
  author: Author;
  publishedAt: string;
  readTime: string;
}

// Mock authors
export const authors: Author[] = [
  {
    id: 'peri',
    name: 'Peri Langlois',
    title: 'Head of Product Marketing',
    avatar: '/favicon.svg',
  },
  {
    id: 'hahnbee',
    name: 'Hahnbee Lee',
    title: 'Co-Founder',
    avatar: '/blog/claware-ai-founder-0xinhua-twitter-avatar.webp',
  },
  {
    id: 'alex',
    name: 'Alex Chen',
    title: 'Lead Engineer',
    avatar: '/favicon.svg',
  },
];

// Mock articles data
export const articles: Article[] = [
  // {
  //   id: '1',
  //   title: 'Almost half your docs traffic is AI, time to understand the agent experience',
  //   excerpt: 'Nearly half of all the traffic to your documentation site is now AI agents. How can you create a great agent experience?',
  //   coverImage: '/blog/hero-chart.svg',
  //   category: 'AI trends',
  //   author: authors[0],
  //   publishedAt: '2026-02-17',
  //   readTime: '4 min read',
  // }
];

// Categories array
export const categories: Category[] = [
  'All articles',
  'AI trends',
  'Announcements',
  'For founders',
  'Engineering',
  'Design',
  'Best practices',
];

// Helper functions
export function getLatestArticle(): Article {
  return articles[0];
}

export function getArticlesByCategory(category: Category): Article[] {
  if (category === 'All articles') return articles;
  return articles.filter((article) => article.category === category);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
