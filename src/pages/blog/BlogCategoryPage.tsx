import React, { useState, useEffect } from 'react';
import { BlogService } from '../../services/BlogService';
import { BlogArticle, BlogCategory } from '../../types';
import { Folder, Clock, ArrowLeft } from 'lucide-react';

interface BlogCategoryPageProps {
  slug: string;
}

export const BlogCategoryPage: React.FC<BlogCategoryPageProps> = ({ slug }) => {
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    if (slug) {
      const cats = BlogService.getCategories();
      const cat = cats.find((c) => c.slug === slug);
      setCategory(cat || null);

      const list = BlogService.getArticles({ categorySlug: slug, status: 'PUBLISHED' });
      setArticles(list);
    }
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 pb-20 pt-28">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <a href="/blog" className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Articles</span>
        </a>

        {/* Category Header */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
            <Folder className="w-3.5 h-3.5" />
            <span>CATEGORY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
            {category ? category.name : slug.replace(/-/g, ' ')}
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {category?.description || `Kumpulan artikel dan analisis seputar ${slug.replace(/-/g, ' ')}.`}
          </p>

          <div className="pt-2 text-xs font-mono text-slate-500">
            Total {articles.length} articles found
          </div>
        </div>

        {/* Article Grid */}
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
