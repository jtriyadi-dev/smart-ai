import React, { useState, useEffect } from 'react';
import { BlogService } from '../../services/BlogService';
import { BlogArticle, BlogCategory } from '../../types';
import { Search, Sparkles, Clock, ArrowRight, TrendingUp, Tag, User, BookOpen } from 'lucide-react';
import { NewsletterSignup } from '../../components/blog/NewsletterSignup';

export const BlogLandingPage: React.FC = () => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const loadData = () => {
    const cats = BlogService.getCategories();
    setCategories(cats);

    const filter: any = { status: 'PUBLISHED' };
    if (selectedCategory !== 'All') {
      filter.categorySlug = selectedCategory;
    }
    const list = BlogService.getArticles(filter);
    setArticles(list);
  };

  const featuredArticle = articles.find((a) => a.isFeatured) || articles[0];
  const remainingArticles = articles.filter((a) => a.id !== featuredArticle?.id);
  const trendingArticles = articles.filter((a) => a.isTrending || a.isPopular).slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/blog/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 pb-20">
      {/* Hero Header */}
      <section className="relative pt-28 pb-16 px-4 border-b border-slate-800/80 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PREMIUM AI & SOFTWARE PUBLICATION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
            SMART-AI.ID <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Insights</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Insights, ideas, technology, and practical guides for building smarter digital businesses.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto relative pt-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles by topic, technology, or industry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-28 py-3.5 bg-slate-900/90 border border-slate-800 focus:border-cyan-500 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none shadow-xl transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 pt-12 space-y-16">
        {/* Featured Article Section */}
        {featuredArticle && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>FEATURED ARTICLE</span>
            </div>

            <div className="group rounded-3xl bg-slate-900/80 border border-slate-800/80 overflow-hidden hover:border-cyan-500/40 transition-all duration-300 shadow-2xl grid lg:grid-cols-12">
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
                <img
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:hidden" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-bold">
                    {featuredArticle.category?.name || 'AI & Technology'}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="hidden lg:block">
                    <span className="px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-bold">
                      {featuredArticle.category?.name || 'AI & Technology'}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                    <a href={`/blog/${featuredArticle.slug}`}>{featuredArticle.title}</a>
                  </h2>

                  <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredArticle.author?.avatar || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80'}
                      alt={featuredArticle.author?.name}
                      className="w-8 h-8 rounded-full border border-cyan-500/40"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-200 block">{featuredArticle.author?.name || 'SMART-AI.ID Team'}</span>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                        <span>{new Date(featuredArticle.publishedAt || featuredArticle.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          {featuredArticle.readingTime} min read
                        </span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`/blog/${featuredArticle.slug}`}
                    className="px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Category Filter Pills */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Explore Categories</h3>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Topics
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Grid & Sidebar */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Article Grid */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>Latest Articles</span>
              </h3>
              <span className="text-xs font-mono text-slate-500">{remainingArticles.length} Articles</span>
            </div>

            {remainingArticles.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
                <p className="text-slate-400 text-xs">Belum ada artikel tambahan di kategori ini.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {remainingArticles.map((art) => (
                  <div
                    key={art.id}
                    className="group rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={art.coverImage}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex gap-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-cyan-400 font-mono text-[10px] font-bold">
                            {art.category?.name || 'Technology'}
                          </span>
                          {art.articleType && (
                            <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[9px] font-bold uppercase">
                              {art.articleType}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                          <a href={`/blog/${art.slug}`}>{art.title}</a>
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{art.excerpt}</p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/50 mt-4 text-[11px] text-slate-500">
                      <span className="font-medium text-slate-300">{art.author?.name || 'SMART-AI.ID'}</span>
                      <div className="flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>{art.readingTime} min read</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Trending Articles */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>TRENDING & POPULAR</span>
              </div>

              <div className="space-y-4 divide-y divide-slate-800 text-xs">
                {trendingArticles.map((art, idx) => (
                  <div key={art.id} className="pt-3 first:pt-0 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span className="text-cyan-400 font-bold">#0{idx + 1}</span>
                      <span>{art.viewCount || 0} views</span>
                    </div>
                    <a
                      href={`/blog/${art.slug}`}
                      className="font-bold text-slate-200 hover:text-cyan-300 transition-colors line-clamp-2 block leading-snug"
                    >
                      {art.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* AI App Builder CTA Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-500/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Need a Custom AI Application?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rancang dan estimasi arsitektur software AI kustom sesuai kebutuhan spesifik perusahaan Anda secara instan.
              </p>
              <a
                href="/ai-app-builder"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
              >
                <span>Build Your Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <NewsletterSignup />
      </div>
    </div>
  );
};
