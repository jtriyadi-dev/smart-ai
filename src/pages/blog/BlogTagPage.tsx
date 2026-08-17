import React, { useState, useEffect } from 'react';
import { BlogService } from '../../services/BlogService';
import { BlogArticle } from '../../types';
import { Tag, Clock, ArrowLeft } from 'lucide-react';

interface BlogTagPageProps {
  slug: string;
}

export const BlogTagPage: React.FC<BlogTagPageProps> = ({ slug }) => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    if (slug) {
      const list = BlogService.getArticles({ tagSlug: slug, status: 'PUBLISHED' });
      setArticles(list);
    }
  }, [slug]);

  const tagName = slug.replace(/-/g, ' ');

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 pb-20 pt-28">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <a href="/blog" className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Articles</span>
        </a>

        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
            <Tag className="w-3.5 h-3.5" />
            <span>TAG</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white capitalize">
            #{tagName}
          </h1>

          <div className="text-xs font-mono text-slate-500">
            {articles.length} articles tagged with #{tagName}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art) => (
            <div
              key={art.id}
              className="group rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
      </div>
    </div>
  );
};
