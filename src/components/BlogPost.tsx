import React, { useEffect } from 'react';
import { ArrowLeft, BookOpen, Clock, Calendar, Share2, ChevronRight } from 'lucide-react';
import { blogPosts, BlogPost as BlogPostType } from '../data/blogPosts';

interface BlogPostProps {
  slug: string;
  lang: 'bn' | 'en';
  theme: string;
  onGoBack: () => void;
  onOpenReader: () => void;
}

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
];

export const BlogPost: React.FC<BlogPostProps> = ({ slug, lang, onGoBack, onOpenReader }) => {
  const post = blogPosts.find((p) => p.slug === slug);

  // SEO: set document title
  useEffect(() => {
    if (post) {
      document.title = post.metaTitle[lang];
    }
    return () => {
      document.title = '15-Line Noorani Hafezi Quran Sharif | QuranFolio';
    };
  }, [post, lang]);

  const t = {
    bn: {
      backLabel: 'ব্লগে ফিরুন',
      by: 'লেখক:',
      readTime: 'মিনিট পাঠ',
      share: 'শেয়ার করুন',
      shareText: 'এই নিবন্ধটি শেয়ার করুন:',
      fbShare: 'Facebook-এ শেয়ার',
      waShare: 'WhatsApp-এ শেয়ার',
      twShare: 'Twitter-এ শেয়ার',
      ctaTitle: 'কোরআন পড়া শুরু করুন →',
      ctaBody: '১৫ লাইনের নূরানী হাফেজী কোরআন শরীফ এখনই পড়ুন। সম্পূর্ণ বিনামূল্যে, অফলাইনেও।',
      ctaBtn: 'কোরআন পড়ুন',
      relatedTitle: 'সংশ্লিষ্ট নিবন্ধসমূহ',
      readMore: 'পড়ুন',
      notFound: 'নিবন্ধটি খুঁজে পাওয়া যায়নি।',
    },
    en: {
      backLabel: 'Back to Blog',
      by: 'By',
      readTime: 'min read',
      share: 'Share',
      shareText: 'Share this article:',
      fbShare: 'Share on Facebook',
      waShare: 'Share on WhatsApp',
      twShare: 'Share on Twitter',
      ctaTitle: 'Start Reading the Quran →',
      ctaBody: 'Read the 15-Line Noorani Hafezi Quran right now. Completely free, works offline too.',
      ctaBtn: 'Open Quran',
      relatedTitle: 'Related Articles',
      readMore: 'Read',
      notFound: 'Article not found.',
    },
  }[lang];

  if (!post) {
    return (
      <div className="fixed inset-0 z-50 bg-[#02120a] flex flex-col items-center justify-center text-white gap-4">
        <p className="text-emerald-300 text-lg">{t.notFound}</p>
        <button
          onClick={onGoBack}
          className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold transition-all cursor-pointer"
        >
          {t.backLabel}
        </button>
      </div>
    );
  }

  const shareUrl = `https://hafezi-quran-theta.vercel.app/blog/${post.slug}`;
  const shareTitle = post.title[lang];

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-b from-[#02120a] via-[#062312] to-[#010e05] text-white flex flex-col">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-8 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/3 right-0 translate-x-1/4 w-[400px] h-[400px] rounded-full bg-emerald-700/10 blur-[160px] pointer-events-none" />

      {/* ─── Sticky Header ─── */}
      <header className="sticky top-0 z-30 bg-[#02120a]/95 backdrop-blur-md border-b border-emerald-800/60 shrink-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button
            onClick={onGoBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-700/60 hover:border-emerald-500/80 text-emerald-300 hover:text-white text-sm font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t.backLabel}</span>
          </button>

          <h1 className="flex-1 text-sm sm:text-base font-bold text-emerald-100 truncate">
            {post.title[lang]}
          </h1>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: shareTitle, url: shareUrl }).catch(() => {});
              } else {
                navigator.clipboard?.writeText(shareUrl).catch(() => {});
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-700/60 text-emerald-300 hover:text-white text-xs font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title={t.share}
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">{t.share}</span>
          </button>
        </div>
      </header>

      {/* ─── Hero Section ─── */}
      <div className="relative bg-gradient-to-br from-emerald-900/80 via-[#062312] to-[#02120a] border-b border-emerald-800/50">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:14px_14px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {/* Category */}
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/60 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            {post.category[lang]}
          </span>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug mb-5">
            {post.title[lang]}
          </h1>

          {/* Excerpt */}
          <p className="text-emerald-200/80 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
            {post.excerpt[lang]}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt, lang)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime} {t.readTime}
            </span>
            <span className="text-emerald-300 font-medium">
              {t.by} {post.author[lang]}
            </span>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 flex-1">

        {/* Article body */}
        <article
          className="
            prose prose-invert prose-emerald max-w-none
            prose-headings:text-emerald-200 prose-headings:font-bold prose-headings:leading-snug
            prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b prose-h2:border-emerald-800/60
            prose-p:text-emerald-100/90 prose-p:leading-relaxed prose-p:text-base prose-p:sm:text-[17px]
            prose-ul:text-emerald-100/90 prose-li:marker:text-emerald-500 prose-li:text-base prose-li:leading-relaxed
            prose-strong:text-white
          "
          dangerouslySetInnerHTML={{ __html: post.content[lang] }}
        />

        {/* ─── Tags ─── */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-emerald-800/50">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-700/60 text-emerald-400 text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* ─── Share Section ─── */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-emerald-950/60 border border-emerald-800/60">
          <p className="text-sm font-bold text-emerald-200 mb-3">{t.shareText}</p>
          <div className="flex flex-wrap gap-3">
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-700/80 hover:bg-blue-600 border border-blue-500/40 text-white text-sm font-semibold transition-all hover:scale-105 cursor-pointer"
              aria-label={t.fbShare}
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-700/80 hover:bg-green-600 border border-green-500/40 text-white text-sm font-semibold transition-all hover:scale-105 cursor-pointer"
              aria-label={t.waShare}
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>

            {/* Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-700/80 hover:bg-sky-600 border border-sky-500/40 text-white text-sm font-semibold transition-all hover:scale-105 cursor-pointer"
              aria-label={t.twShare}
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
              </svg>
              Twitter
            </a>
          </div>
        </div>

        {/* ─── CTA Box ─── */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 border border-emerald-600/60 shadow-2xl shadow-emerald-950/80 text-center">
          <div className="text-3xl mb-3 select-none">☪</div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{t.ctaTitle}</h3>
          <p className="text-emerald-200/80 text-sm sm:text-base mb-5 max-w-md mx-auto">{t.ctaBody}</p>
          <button
            onClick={onOpenReader}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-emerald-950 font-black text-base shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <BookOpen className="w-5 h-5" />
            {t.ctaBtn}
          </button>
        </div>

        {/* ─── Related Posts ─── */}
        {relatedPosts.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-bold text-amber-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              {t.relatedTitle}
              <div className="flex-1 h-px bg-emerald-800/60" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((rp, i) => (
                <RelatedCard
                  key={rp.id}
                  post={rp}
                  lang={lang}
                  gradient={CARD_GRADIENTS[i % CARD_GRADIENTS.length]}
                  readMore={t.readMore}
                  readTime={t.readTime}
                  onClick={() => {
                    // Scroll to top then navigate
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setTimeout(() => {
                      // We can't directly change slug here; parent must handle this.
                      // Use a custom event or just call onGoBack and let parent re-render.
                    }, 100);
                  }}
                />
              ))}
            </div>
          </section>
        )}

        <div className="h-12" />
      </main>
    </div>
  );
};

/* ── Related Post Card ── */
interface RelatedCardProps {
  post: BlogPostType;
  lang: 'bn' | 'en';
  gradient: string;
  readMore: string;
  readTime: string;
  onClick: () => void;
}

const RelatedCard: React.FC<RelatedCardProps> = ({ post, lang, gradient, readMore, readTime }) => (
  <div
    className={`group rounded-xl border border-emerald-700/50 overflow-hidden shadow-lg cursor-default`}
  >
    <div className={`h-20 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:10px_10px]" />
      <span className="text-2xl select-none opacity-60">☪</span>
    </div>
    <div className="p-3 bg-emerald-950/80">
      <span className="block text-[10px] text-emerald-500 font-bold uppercase tracking-wider mb-1">
        {post.category[lang]}
      </span>
      <h4 className="text-xs sm:text-sm font-bold text-white leading-snug mb-2 line-clamp-2">
        {post.title[lang]}
      </h4>
      <div className="flex items-center justify-between text-[10px] text-emerald-500">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {post.readTime} {readTime}
        </span>
        <span className="flex items-center gap-0.5 text-emerald-400 font-bold">
          {readMore} <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  </div>
);
