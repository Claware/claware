'use client';

import { useState } from 'react';
import { Category, getLatestArticle, getArticlesByCategory } from '@/data/blog';
import HeroSection from '@/components/blog/HeroSection';
import CategoryFilter from '@/components/blog/CategoryFilter';
import ArticleList from '@/components/blog/ArticleList';
import { Zap, Mail } from 'lucide-react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All articles');

  const latestArticle = getLatestArticle();
  const filteredArticles = getArticlesByCategory(selectedCategory);

  // Exclude latest article from list to avoid duplication (only when showing all articles)
  const displayArticles =
    selectedCategory === 'All articles' ? filteredArticles.slice(1) : filteredArticles;

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      {/* Header */}
      <header className="w-full px-6 py-4 sticky top-0 z-50 bg-[#F8F7F5]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/20 transition-all duration-300 group-hover:shadow-rose-500/30 group-hover:scale-105">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="text-base font-semibold text-stone-800 group-hover:text-rose-600 transition-colors duration-300">
              Claware
            </span>
          </a>

          <nav className="flex items-center gap-6">
            <a
              href="/"
              className="text-sm text-stone-600 hover:text-rose-600 transition-colors duration-200"
            >
              Home
            </a>
            <a href="/blog" className="text-sm font-medium text-stone-900">
              Blog
            </a>
            <a
              href="mailto:support@claware.ai"
              className="hidden sm:flex items-center gap-1.5 text-sm text-stone-600 hover:text-rose-600 transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              <span>Support</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-10">
        {/* Hero Section - Featured Article */}
        <HeroSection article={latestArticle} />

        {/* Category Filter */}
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

        {/* Article List */}
        <ArticleList articles={displayArticles} />
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 mt-16 border-t border-stone-200">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-500">© 2026 Claware</p>
          <div className="flex items-center gap-4">
            <a
              href="/privacy"
              className="text-xs text-stone-500 hover:text-rose-600 transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-xs text-stone-500 hover:text-rose-600 transition-colors duration-200"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
