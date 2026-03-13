'use client';

import Image from 'next/image';
import { Article, formatDate } from '@/data/blog';

interface HeroSectionProps {
  article?: Article;
}

export default function HeroSection({ article }: HeroSectionProps) {
  if (!article) {
    return (
      <section className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-[#F8F7F5] to-white" />
        <div className="relative p-8 md:p-12 lg:p-16 text-center">
          <div className="text-stone-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-stone-700 mb-2">
            Coming Soon
          </h2>
          <p className="text-stone-500 max-w-md mx-auto">
            We&apos;re working on some great content. Stay tuned for our first article!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-2xl">
      {/* Background gradient - warm tones matching Claware brand */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-[#F8F7F5] to-white" />

      <div className="relative grid md:grid-cols-2 gap-6 p-6 md:p-8 lg:px-4 lg:py-10">
        {/* Left: Article Info */}
        <div className="flex flex-col justify-center space-y-4">
          {/* Date & Read Time */}
          <span className="text-sm text-stone-500 font-medium">
            {formatDate(article.publishedAt)} · {article.readTime}
          </span>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-stone-900 leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-base text-stone-600 leading-relaxed max-w-lg">
            {article.excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden ring-2 ring-white shadow-sm">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-stone-900">{article.author.name}</p>
              <p className="text-xs text-stone-500">{article.author.title}</p>
            </div>
          </div>
        </div>

        {/* Right: Cover Image with chart-like overlay */}
        <div className="relative aspect-[16/10] md:aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-stone-200 to-stone-300 shadow-lg">
          {/* Simulated chart visualization for the hero article */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-stone-100/60 to-orange-50/40">
            {/* Chart lines simulation */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
              {/* Grid lines */}
              <defs>
                <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="line2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D97706" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Area under curves */}
              <path
                d="M 20 180 Q 80 170 120 150 T 200 120 T 280 80 T 360 30 L 360 220 L 20 220 Z"
                fill="url(#line1)"
                fillOpacity="0.1"
              />
              <path
                d="M 20 200 Q 80 195 120 180 T 200 150 T 280 120 T 360 90 L 360 220 L 20 220 Z"
                fill="url(#line2)"
                fillOpacity="0.1"
              />

              {/* Main lines */}
              <path
                d="M 20 180 Q 80 170 120 150 T 200 120 T 280 80 T 360 30"
                fill="none"
                stroke="#059669"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 20 200 Q 80 195 120 180 T 200 150 T 280 120 T 360 90"
                fill="none"
                stroke="#D97706"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Data point labels */}
              <text x="340" y="25" fill="#059669" fontSize="12" fontWeight="600">20.8M</text>
              <text x="340" y="85" fill="#D97706" fontSize="12" fontWeight="600">9.9M</text>

              {/* Legend */}
              <g transform="translate(30, 30)">
                <circle cx="0" cy="0" r="3" fill="#059669" />
                <text x="10" y="4" fill="#78716C" fontSize="9" fontWeight="500">TOTAL VIEWERSHIP</text>
                <circle cx="0" cy="18" r="3" fill="#D97706" />
                <text x="10" y="22" fill="#78716C" fontSize="9" fontWeight="500">AI VIEWERSHIP</text>
              </g>

              {/* X-axis labels */}
              <text x="20" y="235" fill="#A8A29E" fontSize="8">DEC 2024</text>
              <text x="360" y="235" fill="#A8A29E" fontSize="8">DEC 2025</text>
            </svg>
          </div>

          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
