import React, { useState, useEffect } from 'react';
import { BlogService } from '../../services/BlogService';
import { BlogArticle } from '../../types';
import { Search, Clock, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';

export const BlogSearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    setQuery(q);
    if (q) {
      performSearch(q);
    } else {
      setArticles(BlogService.getArticles({ status: 'PUBLISHED' }));
    }
  }, []);

  const performSearch = (q: string) => {
    const results = BlogService.getArticles({ query: q, status: 'PUBLISHED' });
    setArticles(results);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      window.history.pushState({}, '', `/blog/search?q=${encodeURIComponent(query)}`);
      performSearch(query);
    }
  };

  const suggestedTopics = ['AI & Technology', 'Mining', 'Software Cost', 'Smart Hospital', 'Automation', 'Digital Transformation'];

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 pb-20 pt-28">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <a href="/blog" className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Articles</span>
        </a>

        {/* Search Header */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center gap-2">
            <Search className="w-6 h-6 text-cyan-400" />
            <span>Search Articles</span>
          </h1>

          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type keywords, categories, or technologies..."
              className="w-full pl-4 pr-28 py-3 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-white focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs rounded-lg cursor-pointer"
            >
              Search
            </button>
          </form>

          {query && (
            <div className="text-xs font-mono text-slate-400">
              Showing results for: <span className="text-cyan-300 font-bold">"{query}"</span> ({articles.length} articles found)
            </div>
          )}
        </div>

        {/* Results or Suggested Topics */}
        {articles.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
            <p className="text-slate-300 text-sm font-bold">No articles found matching "{query}".</p>
            <p className="text-slate-400 text-xs">Coba kata kunci lain atau pilih topik yang disarankan di bawah ini:</p>

            <div className="pt-4 flex flex-wrap justify-center gap-2">
              <span className="text-xs font-mono text-slate-500 w-full mb-1">Suggested Topics:</span>
              {suggestedTopics.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(topic);
                    performSearch(topic);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-400 hover:border-cyan-500/40 cursor-pointer"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <div
                key={art.id}
                className="group rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-cyan-400 font-mono text-[10px] font-bold">
                        {art.category?.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                      <a href={`/blog/${art.slug}`}>{art.title}</a>
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{art.excerpt}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/50 mt-4 text-[11px] text-slate-500 font-mono">
                  <span>{new Date(art.publishedAt || art.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {art.readingTime} min
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
