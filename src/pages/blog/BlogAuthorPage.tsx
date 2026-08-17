import React, { useState, useEffect } from 'react';
import { BlogService } from '../../services/BlogService';
import { BlogArticle, BlogAuthor } from '../../types';
import { User, Clock, ArrowLeft, Globe, Linkedin } from 'lucide-react';

interface BlogAuthorPageProps {
  slug: string;
}

export const BlogAuthorPage: React.FC<BlogAuthorPageProps> = ({ slug }) => {
  const [author, setAuthor] = useState<BlogAuthor | null>(null);
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    if (slug) {
      const authors = BlogService.getAuthors();
      const aut = authors.find((a) => a.slug === slug || a.id === slug);
      setAuthor(aut || null);

      const list = BlogService.getArticles({ authorSlug: slug, status: 'PUBLISHED' });
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

        {/* Author Header */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={author?.avatar || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80'}
            alt={author?.name}
            className="w-24 h-24 rounded-2xl border-2 border-cyan-500/40 object-cover"
          />

          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">{author?.role || 'Author Profile'}</span>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">{author?.name || slug.replace(/-/g, ' ')}</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">{author?.bio}</p>

            <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
              {author?.socialLinks?.linkedin && (
                <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-cyan-400">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {author?.socialLinks?.website && (
                <a href={author.socialLinks.website} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-cyan-400">
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Author Articles Grid */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Articles Written by {author?.name || slug} ({articles.length})</h3>

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
    </div>
  );
};
