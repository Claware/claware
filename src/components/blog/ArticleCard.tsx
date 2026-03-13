'use client';

import Image from 'next/image';
import { Article } from '@/data/blog';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group flex flex-col gap-4">
      {/* Cover Image */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-stone-200 shadow-sm">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        {/* Category Tag - Rose color matching brand */}
        <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
          {article.category}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold text-stone-900 leading-snug group-hover:text-rose-600 transition-colors cursor-pointer">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 pt-3">
          <div className="w-8 h-8 rounded-full bg-stone-200 overflow-hidden ring-1 ring-stone-100">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-900">{article.author.name}</p>
            <p className="text-xs text-stone-500">{article.author.title}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
