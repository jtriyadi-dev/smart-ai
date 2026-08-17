import React, { useState, useEffect } from 'react';
import { BlogService } from '../../services/BlogService';
import { BlogArticle } from '../../types';
import { ReadingProgressBar } from '../../components/blog/ReadingProgressBar';
import { TableOfContents } from '../../components/blog/TableOfContents';
import { SocialShareButtons } from '../../components/blog/SocialShareButtons';
import { CommentSection } from '../../components/blog/CommentSection';
import { Clock, Calendar, ArrowLeft, ArrowRight, Sparkles, Building2, Layers, AlertCircle, MessageSquare } from 'lucide-react';

interface BlogDetailPageProps {
  slug: string;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ slug }) => {
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<BlogArticle[]>([]);
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      const item = BlogService.getArticleBySlug(slug);
      if (item) {
        setArticle(item);
        BlogService.trackView(slug);

        // Fetch related articles
        const related = BlogService.getArticles({
          categorySlug: item.category?.slug,
          status: 'PUBLISHED'
        }).filter((a) => a.id !== item.id).slice(0, 3);

        setRelatedArticles(related);
      }
    }
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Article Not Found</h2>
        <p className="text-slate-400 text-xs mb-6">Artikel yang Anda cari tidak ditemukan atau telah dipindahkan.</p>
        <a href="/blog" className="px-5 py-2.5 bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold text-xs rounded-xl">
          Kembali ke Blog
        </a>
      </div>
    );
  }

  const articleUrl = window.location.href;
  const isConceptOrCase = article.articleType === 'CONCEPT' || article.articleType === 'CASE STUDY';

  const handleCTAClick = () => {
    BlogService.trackCTAClick(article.slug);
    if (article.cta?.type === 'AI_BUILDER') {
      window.location.href = '/ai-app-builder';
    } else if (article.cta?.type === 'INDUSTRY_SOLUTION' && article.industrySlug) {
      window.location.href = `/solutions/${article.industrySlug}`;
    } else if (article.cta?.type === 'PORTFOLIO' && article.portfolioSlug) {
      window.location.href = `/portfolio/${article.portfolioSlug}`;
    } else if (article.cta?.linkUrl) {
      window.location.href = article.cta.linkUrl;
    } else {
      setConsultModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 pb-20 relative">
      <ReadingProgressBar />

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 pt-28">
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <a href="/" className="hover:text-cyan-400">Home</a>
          <span>&gt;</span>
          <a href="/blog" className="hover:text-cyan-400">Blog</a>
          <span>&gt;</span>
          <a href={`/blog/category/${article.category?.slug}`} className="hover:text-cyan-400">
            {article.category?.name}
          </a>
          <span>&gt;</span>
          <span className="text-slate-200 truncate max-w-xs">{article.title}</span>
        </nav>
      </div>

      {/* Header Container */}
      <header className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
            {article.category?.name || 'AI & Technology'}
          </span>
          {article.articleType && (
            <span className="px-2.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 font-mono text-xs font-bold">
              {article.articleType}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="text-lg text-slate-300 font-light leading-relaxed">
            {article.subtitle}
          </p>
        )}

        {/* Author & Metadata */}
        <div className="py-4 border-y border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={article.author?.avatar || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80'}
              alt={article.author?.name}
              className="w-10 h-10 rounded-full border border-cyan-500/40 object-cover"
            />
            <div>
              <a href={`/blog/author/${article.author?.slug}`} className="text-xs font-bold text-white hover:text-cyan-300 block">
                By {article.author?.name || 'SMART-AI.ID Editorial Team'}
              </a>
              <span className="text-[10px] font-mono text-slate-400">{article.author?.role || 'Tech Specialist'}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              {new Date(article.publishedAt || article.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {article.readingTime} min read
            </span>
          </div>
        </div>

        {/* Concept / Illustrative Disclaimer Warning */}
        {isConceptOrCase && (
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold font-mono uppercase block mb-0.5">CONCEPT / ILLUSTRATIVE SCENARIO</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Artikel ini memuat skenario dan ilustrasi konseptual arsitektur software buatan SMART-AI.ID untuk tujuan edukasi & evaluasi sistem, bukan merupakan klaim hasil langsung dari klien nyata tertentu.
              </p>
            </div>
          </div>
        )}

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-80 sm:h-[420px]">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Main Content & TOC */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <TableOfContents contentHtml={article.content} />

        {/* Article Body */}
        <article
          id="article-content-body"
          className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-6 pt-4"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Article Inline CTA */}
        {article.cta && (
          <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-500/40 my-10 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
              <Sparkles className="w-4 h-4" />
              <span>{article.cta.title || 'Next Steps'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tertarik menerapkan arsitektur serupa untuk meningkatkan efisiensi dan visibilitas operasional bisnis Anda?
            </p>
            <button
              onClick={handleCTAClick}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{article.cta.buttonText || 'Consult With Us'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Related Solution Badges if bound */}
        <div className="grid sm:grid-cols-2 gap-4 my-8">
          {article.industrySlug && (
            <a
              href={`/solutions/${article.industrySlug}`}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Building2 className="w-4 h-4" />
                <span>Explore Industry Solution ({article.industrySlug})</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
          )}

          {article.portfolioSlug && (
            <a
              href={`/portfolio/${article.portfolioSlug}`}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <Layers className="w-4 h-4" />
                <span>View Portfolio Showcase</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 my-6">
          <span className="text-xs font-mono text-slate-500 mr-2">Tags:</span>
          {article.tags.map((tag, idx) => (
            <a
              key={idx}
              href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 text-xs transition-colors"
            >
              #{tag}
            </a>
          ))}
        </div>

        {/* Social Share */}
        <SocialShareButtons title={article.title} url={articleUrl} />

        {/* Author Box */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-4 my-8">
          <img
            src={article.author?.avatar || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80'}
            alt={article.author?.name}
            className="w-14 h-14 rounded-2xl border border-cyan-500/40 object-cover shrink-0"
          />
          <div className="space-y-1">
            <span className="text-xs font-mono text-cyan-400 font-bold">WRITTEN BY</span>
            <h4 className="text-sm font-bold text-white">{article.author?.name}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{article.author?.bio}</p>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="space-y-4 my-12">
            <h3 className="text-lg font-display font-bold text-white">Related Articles</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <div key={rel.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono text-cyan-400">{rel.category?.name}</span>
                  <h5 className="text-xs font-bold text-white line-clamp-2">
                    <a href={`/blog/${rel.slug}`} className="hover:text-cyan-300">
                      {rel.title}
                    </a>
                  </h5>
                  <span className="text-[10px] font-mono text-slate-500 block">{rel.readingTime} min read</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comment Section */}
        <CommentSection articleId={article.id} articleTitle={article.title} />
      </div>

      {/* Consultation Modal */}
      {consultModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Request Consultation</h3>
            <p className="text-xs text-slate-300">
              Isi form berikut untuk mendiskusikan implementasi solusi dari artikel: <strong className="text-cyan-300">{article.title}</strong>
            </p>
            <div className="space-y-3">
              <input type="text" placeholder="Nama Lengkap *" className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
              <input type="email" placeholder="Email Bisnis *" className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
              <input type="text" placeholder="Nomor WhatsApp *" className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setConsultModalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert('Permintaan konsultasi berhasil dikirim!');
                  setConsultModalOpen(false);
                }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold rounded-xl"
              >
                Kirim Permintaan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
