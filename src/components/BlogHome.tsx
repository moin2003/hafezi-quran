import React, { useState } from 'react';
import { ArrowLeft, BookOpen, ChevronRight, Clock, Calendar, Tag, Sparkles } from 'lucide-react';
import { blogPosts, BlogPost } from '../data/blogPosts';

interface BlogHomeProps {
  lang: 'bn' | 'en';
  theme: string;
  onSelectPost: (slug: string) => void;
  onGoHome: () => void;
  onOpenReader: () => void;
}

const CATEGORIES = [
  { slug: 'all', bn: 'সব', en: 'All' },
  { slug: 'surah', bn: 'সূরা', en: 'Surah' },
  { slug: 'hifz', bn: 'হিফয', en: 'Hifz' },
  { slug: 'tilawat', bn: 'তিলাওয়াত', en: 'Tilawat' },
  { slug: 'about', bn: 'পরিচিতি', en: 'About' },
  { slug: 'ramadan', bn: 'রমজান', en: 'Ramadan' },
];

function formatDate(dateStr: string, lang: 'bn' | 'en'): string {
  const date = new Date(dateStr);
  if (lang === 'bn') {
    return date.toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const CARD_GRADIENTS = [
  'from-emerald-800 to-emerald-950',
  'from-teal-800 to-emerald-950',
  'from-green-800 to-emerald-950',
  'from-emerald-700 to-teal-950',
  'from-emerald-900 to-green-950',
];

export const BlogHome: React.FC<BlogHomeProps> = ({
  lang,
  onSelectPost,
  onGoHome,
  onOpenReader,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const t = {
    bn: {
      brand: 'QuranFolio ব্লগ',
      subtitle: 'ইসলামিক জ্ঞান, তাফসির ও হিফয গাইড',
      readQuran: 'কোরআন পড়ুন',
      featuredLabel: 'বিশেষ নিবন্ধ',
      readMore: 'বিস্তারিত পড়ুন',
      readTime: 'মিনিট পাঠ',
      allArticles: 'সকল নিবন্ধ',
      noResults: 'এই বিভাগে কোনো নিবন্ধ নেই।',
      by: 'লেখক:',
    },
    en: {
      brand: 'QuranFolio Blog',
      subtitle: 'Islamic Knowledge, Tafsir & Hifz Guides',
      readQuran: 'Read Quran',
      featuredLabel: 'Featured Article',
      readMore: 'Read More',
      readTime: 'min read',
      allArticles: 'All Articles',
      noResults: 'No articles in this category.',
      by: 'By',
    },
  }[lang];

  const filtered =
    activeCategory === 'all'
      ? blogPosts
      : blogPosts.filter((p) => p.categorySlug === activeCategory);

  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-b from-[#02120a] via-[#062312] to-[#010e05] text-white flex flex-col select-none">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/3 left-0 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-emerald-700/15 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 translate-x-1/4 w-[500px] h-[500px] rounded-full bg-emerald-800/10 blur-[180px] pointer-events-none" />

      {/* ─── Sticky Header ─── */}
      <header className="sticky top-0 z-30 bg-[#02120a]/95 backdrop-blur-md border-b border-emerald-800/60 shrink-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          {/* Back button */}
          <button
            onClick={onGoHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-700/60 hover:border-emerald-500/80 text-emerald-300 hover:text-white text-sm font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{lang === 'bn' ? 'হোম' : 'Home'}</span>
          </button>

          {/* Brand */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h1 className="text-base sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-emerald-200">
                {t.brand}
              </h1>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-[10px] sm:text-xs text-emerald-400 font-medium">{t.subtitle}</p>
          </div>

          {/* Read Quran pill */}
          <button
            onClick={onOpenReader}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 border border-emerald-400/40 text-white text-xs sm:text-sm font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-emerald-950/60 shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200" />
            <span className="whitespace-nowrap">{t.readQuran}</span>
          </button>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-8 flex-1">

        {/* ─── Featured Post ─── */}
        {activeCategory === 'all' && (
          <section>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3 h-3" />
              {t.featuredLabel}
            </div>
            <div
              onClick={() => onSelectPost(featured.slug)}
              className="group relative rounded-2xl overflow-hidden border border-emerald-700/50 hover:border-amber-400/60 cursor-pointer transition-all duration-300 hover:scale-[1.01] shadow-2xl shadow-emerald-950/80"
            >
              {/* Gradient bg */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-emerald-900 to-[#02120a]" />
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
              {/* Glow */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

              <div className="relative p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                {/* Islamic emblem decorative */}
                <div className="hidden md:flex shrink-0 w-32 h-32 lg:w-40 lg:h-40 rounded-2xl bg-gradient-to-br from-emerald-700/40 to-emerald-900/60 border border-emerald-600/40 items-center justify-center text-5xl select-none">
                  ☪
                </div>

                <div className="flex-1 min-w-0">
                  {/* Category badge */}
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-800/80 border border-emerald-600/60 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
                    {featured.category[lang]}
                  </span>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-amber-100 transition-colors leading-snug mb-3">
                    {featured.title[lang]}
                  </h2>

                  <p className="text-emerald-200/80 text-sm sm:text-base leading-relaxed mb-5 line-clamp-3">
                    {featured.excerpt[lang]}
                  </p>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-400 mb-5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(featured.publishedAt, lang)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime} {t.readTime}
                    </span>
                    <span className="text-emerald-500">
                      {t.by} {featured.author[lang]}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 group-hover:from-emerald-500 group-hover:to-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-950/60 transition-all border border-emerald-400/30">
                    {t.readMore}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── Category Filters ─── */}
        <section>
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer border ${
                  activeCategory === cat.slug
                    ? 'bg-emerald-600 border-emerald-400/60 text-white shadow-lg shadow-emerald-950/60'
                    : 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/80 hover:border-emerald-500/60 hover:text-white'
                }`}
              >
                {cat[lang]}
              </button>
            ))}
          </div>
        </section>

        {/* ─── All Articles Title ─── */}
        <div className="-mb-4 flex items-center gap-2">
          <span className="text-sm font-bold text-amber-300 uppercase tracking-wider">{t.allArticles}</span>
          <div className="flex-1 h-px bg-emerald-800/60" />
          <span className="text-xs text-emerald-500">{filtered.length} {lang === 'bn' ? 'টি নিবন্ধ' : 'articles'}</span>
        </div>

        {/* ─── Post Grid ─── */}
        {filtered.length === 0 ? (
          <p className="text-center text-emerald-400 py-12">{t.noResults}</p>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pb-8">
            {(activeCategory === 'all' ? filtered : filtered).map((post, i) => (
              <PostCard
                key={post.id}
                post={post}
                lang={lang}
                gradient={CARD_GRADIENTS[i % CARD_GRADIENTS.length]}
                readTime={t.readTime}
                readMore={t.readMore}
                onClick={() => onSelectPost(post.slug)}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

/* ── Post Card ── */
interface PostCardProps {
  post: BlogPost;
  lang: 'bn' | 'en';
  gradient: string;
  readTime: string;
  readMore: string;
  onClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, lang, gradient, readTime, readMore, onClick }) => (
  <div
    onClick={onClick}
    className="group rounded-2xl border border-emerald-700/50 hover:border-amber-400/50 cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-emerald-950/60 overflow-hidden flex flex-col"
  >
    {/* Thumbnail */}
    <div className={`relative h-36 sm:h-40 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:14px_14px]" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
      <span className="relative text-4xl select-none opacity-70">☪</span>
      {/* Category badge */}
      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
        {post.category[lang]}
      </span>
    </div>

    {/* Body */}
    <div className="flex-1 flex flex-col p-4 sm:p-5 bg-gradient-to-b from-emerald-950/90 to-[#02120a]">
      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-100 transition-colors leading-snug mb-2 line-clamp-2">
        {post.title[lang]}
      </h3>
      <p className="text-xs sm:text-sm text-emerald-300/80 leading-relaxed mb-4 line-clamp-3 flex-1">
        {post.excerpt[lang]}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {post.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] bg-emerald-900/60 border border-emerald-700/50 text-emerald-400">
            <Tag className="w-2 h-2" />
            {tag}
          </span>
        ))}
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs text-emerald-500 border-t border-emerald-800/50 pt-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex items-center gap-1 whitespace-nowrap">
            <Clock className="w-3 h-3" />
            {post.readTime} {readTime}
          </span>
          <span className="flex items-center gap-1 truncate">
            <Calendar className="w-3 h-3 shrink-0" />
            <span className="truncate">{new Date(post.publishedAt).getFullYear()}</span>
          </span>
        </div>
        <span className="flex items-center gap-1 text-emerald-400 font-bold whitespace-nowrap group-hover:text-amber-300 transition-colors">
          {readMore} <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  </div>
);
