import React, { useState, useEffect } from 'react';
import { BlogService } from '../../../services/BlogService';
import {
  BlogArticle,
  BlogCategory,
  BlogTag,
  BlogComment,
  MediaItem,
  ContentIdea,
  BlogAuditLog,
  BlogArticleStatus,
  BlogArticleType
} from '../../../types';
import {
  FileText,
  Folder,
  Tag,
  MessageSquare,
  Image as ImageIcon,
  Calendar,
  BarChart2,
  Settings,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Copy,
  ExternalLink,
  ShieldCheck,
  Check,
  X,
  Monitor,
  Tablet,
  Smartphone,
  History,
  Clock,
  ArrowRight,
  Filter,
  CheckSquare,
  Square,
  RotateCcw
} from 'lucide-react';

export const AdminBlogPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'articles' | 'categories' | 'tags' | 'comments' | 'media' | 'calendar' | 'analytics' | 'settings'>('dashboard');

  // Article state
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [auditLogs, setAuditLogs] = useState<BlogAuditLog[]>([]);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<BlogArticleStatus | 'ALL'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticleIds, setSelectedArticleIds] = useState<string[]>([]);

  // Editor Modal state
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState<Partial<BlogArticle>>({
    title: '',
    subtitle: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    categoryId: 'cat-1',
    tags: ['AI'],
    articleType: 'ARTICLE',
    status: 'DRAFT',
    visibility: 'PUBLIC',
    isFeatured: false,
    isTrending: false,
    isPopular: false,
    scheduledAt: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: [],
    knowledgeEnabled: false,
    industrySlug: '',
    portfolioSlug: ''
  });

  // AI Assistant Drawer
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(false);
  const [aiTopicInput, setAiTopicInput] = useState<string>('');
  const [aiGenerating, setAiGenerating] = useState<boolean>(false);

  // Preview Mode State
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewArticle, setPreviewArticle] = useState<BlogArticle | null>(null);

  // Version History Drawer
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState<boolean>(false);

  // Category / Tag / Idea Modals
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
  const [newCatName, setNewCatName] = useState<string>('');
  const [newCatDesc, setNewCatDesc] = useState<string>('');

  const [isTagModalOpen, setIsTagModalOpen] = useState<boolean>(false);
  const [newTagName, setNewTagName] = useState<string>('');

  const [isIdeaModalOpen, setIsIdeaModalOpen] = useState<boolean>(false);
  const [newIdeaTitle, setNewIdeaTitle] = useState<string>('');
  const [newIdeaTopic, setNewIdeaTopic] = useState<string>('');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    const arts = BlogService.getArticles({ status: 'ALL' });
    setArticles(arts);

    const cats = BlogService.getCategories();
    setCategories(cats);

    const tgs = BlogService.getTags();
    setTags(tgs);

    const cmts = BlogService.getComments();
    setComments(cmts);

    const mda = BlogService.getMedia();
    setMediaList(mda);

    const idas = BlogService.getContentIdeas();
    setIdeas(idas);

    const logs = BlogService.getAuditLogs();
    setAuditLogs(logs);
  };

  // Filtered Articles
  const filteredArticles = articles.filter((art) => {
    if (statusFilter !== 'ALL' && art.status !== statusFilter) return false;
    if (categoryFilter !== 'ALL' && art.categoryId !== categoryFilter && art.category?.slug !== categoryFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        art.title.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.category?.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Editor Actions
  const handleOpenNewEditor = () => {
    setEditingArticleId(null);
    setArticleForm({
      title: '',
      subtitle: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
      categoryId: categories[0]?.id || 'cat-1',
      tags: ['AI', 'Automation'],
      articleType: 'ARTICLE',
      status: 'DRAFT',
      visibility: 'PUBLIC',
      isFeatured: false,
      isTrending: false,
      isPopular: false,
      seoTitle: '',
      seoDescription: '',
      knowledgeEnabled: false,
      industrySlug: '',
      portfolioSlug: ''
    });
    setIsEditorOpen(true);
  };

  const handleOpenEditEditor = (art: BlogArticle) => {
    setEditingArticleId(art.id);
    setArticleForm({ ...art });
    setIsEditorOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setArticleForm((prev) => {
      const autoSlug = BlogService.generateSlug(val);
      return {
        ...prev,
        title: val,
        slug: prev.slug ? prev.slug : autoSlug,
        seoTitle: prev.seoTitle ? prev.seoTitle : val
      };
    });
  };

  const handleSaveArticle = () => {
    if (!articleForm.title?.trim()) {
      alert('Judul artikel tidak boleh kosong.');
      return;
    }

    if (editingArticleId) {
      BlogService.updateArticle(editingArticleId, articleForm);
    } else {
      BlogService.createArticle(articleForm);
    }

    setIsEditorOpen(false);
    loadAllData();
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      BlogService.deleteArticle(id);
      loadAllData();
    }
  };

  const handleSyncKB = (id: string) => {
    BlogService.syncToKnowledgeBase(id);
    loadAllData();
    alert('Artikel berhasil disinkronkan ke Knowledge Base!');
  };

  // Bulk Actions
  const handleSelectAllArticles = () => {
    if (selectedArticleIds.length === filteredArticles.length) {
      setSelectedArticleIds([]);
    } else {
      setSelectedArticleIds(filteredArticles.map((a) => a.id));
    }
  };

  const handleToggleSelectArticle = (id: string) => {
    setSelectedArticleIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleBulkPublish = () => {
    selectedArticleIds.forEach((id) => {
      BlogService.updateArticle(id, { status: 'PUBLISHED' });
    });
    setSelectedArticleIds([]);
    loadAllData();
  };

  const handleBulkDelete = () => {
    if (confirm(`Apakah Anda yakin ingin menghapus ${selectedArticleIds.length} artikel terpilih?`)) {
      selectedArticleIds.forEach((id) => {
        BlogService.deleteArticle(id);
      });
      setSelectedArticleIds([]);
      loadAllData();
    }
  };

  // AI Assistant Generator
  const handleAiGenerateDraft = () => {
    if (!aiTopicInput.trim()) return;
    setAiGenerating(true);

    setTimeout(() => {
      const cat = categories.find((c) => c.id === articleForm.categoryId) || categories[0];
      const outline = BlogService.aiGenerateOutline(aiTopicInput);
      const draft = BlogService.aiGenerateDraft(aiTopicInput, outline, cat?.name || 'AI');

      setArticleForm((prev) => ({
        ...prev,
        title: draft.title,
        subtitle: draft.subtitle,
        excerpt: draft.excerpt,
        content: draft.content,
        status: 'DRAFT', // MANDATORY
        seoTitle: draft.title,
        seoDescription: draft.excerpt
      }));

      setAiGenerating(false);
      setIsAiDrawerOpen(false);
      alert('Draft AI berhasil dibuat! Status diatur ke DRAFT untuk verifikasi akurasi faktual.');
    }, 1200);
  };

  const seoCheck = BlogService.checkArticleSEOQuality(articleForm);
  const analytics = BlogService.getAnalyticsSummary();

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 pb-20 pt-24">
      {/* Top Header & Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <FileText className="w-4 h-4" />
              <span>SMART-AI.ID CMS & CONTENT ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">Blog & Content Management</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleOpenNewEditor}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Article</span>
            </button>
            <button
              onClick={() => setIsAiDrawerOpen(true)}
              className="px-4 py-2.5 bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:bg-slate-800 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI Content Assistant</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-slate-800/80 scrollbar-none">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
            { id: 'articles', label: 'Articles', icon: FileText, badge: articles.length },
            { id: 'categories', label: 'Categories', icon: Folder, badge: categories.length },
            { id: 'tags', label: 'Tags', icon: Tag, badge: tags.length },
            { id: 'comments', label: 'Comments', icon: MessageSquare, badge: comments.filter((c) => c.status === 'PENDING').length },
            { id: 'media', label: 'Media Library', icon: ImageIcon, badge: mediaList.length },
            { id: 'calendar', label: 'Ideas & Calendar', icon: Calendar, badge: ideas.length },
            { id: 'analytics', label: 'Analytics', icon: BarChart2 },
            { id: 'settings', label: 'Settings & Sync', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-cyan-950 border border-cyan-500/40 text-cyan-300 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] font-mono text-slate-300">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400">Total Articles</span>
                <div className="text-2xl font-bold text-white">{analytics.totalArticles}</div>
                <div className="text-[10px] font-mono text-cyan-400">{analytics.publishedCount} Published • {analytics.draftCount} Draft</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400">Total Views</span>
                <div className="text-2xl font-bold text-emerald-400">{analytics.totalViews}</div>
                <div className="text-[10px] font-mono text-slate-500">Across all published articles</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400">CTA Clicks</span>
                <div className="text-2xl font-bold text-indigo-400">{analytics.totalCTAClicks}</div>
                <div className="text-[10px] font-mono text-slate-500">Lead & App Builder conversions</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400">Avg Reading Time</span>
                <div className="text-2xl font-bold text-amber-400">{analytics.avgReadTime} min</div>
                <div className="text-[10px] font-mono text-slate-500">Calculated word count depth</div>
              </div>
            </div>

            {/* Top Viewed Articles Table */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white font-mono uppercase">Top Performing Articles</h3>
              <div className="divide-y divide-slate-800 text-xs">
                {analytics.topArticles.map((art) => (
                  <div key={art.id} className="py-3 flex items-center justify-between">
                    <div>
                      <a href={`/blog/${art.slug}`} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-200 hover:text-cyan-300">
                        {art.title}
                      </a>
                      <span className="text-[10px] font-mono text-slate-500 block">{art.category?.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <span className="font-mono text-emerald-400 font-bold block">{art.viewCount} views</span>
                        <span className="text-[10px] font-mono text-indigo-400">{art.ctaClicks || 0} CTA clicks</span>
                      </div>
                      <a href={`/blog/${art.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-cyan-400">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARTICLES MANAGEMENT */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            {/* Filters Bar */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none w-48"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                  <option value="REVIEW">Review</option>
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="ARCHIVED">Archived</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="ALL">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bulk Actions */}
              {selectedArticleIds.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 font-bold">{selectedArticleIds.length} selected</span>
                  <button onClick={handleBulkPublish} className="px-3 py-1 bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-lg">
                    Bulk Publish
                  </button>
                  <button onClick={handleBulkDelete} className="px-3 py-1 bg-rose-950 border border-rose-500/40 text-rose-300 text-xs font-bold rounded-lg">
                    Bulk Delete
                  </button>
                </div>
              )}
            </div>

            {/* Articles Table */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 font-mono text-[11px]">
                    <tr>
                      <th className="p-3 w-10">
                        <button onClick={handleSelectAllArticles} className="cursor-pointer">
                          {selectedArticleIds.length === filteredArticles.length && filteredArticles.length > 0 ? (
                            <CheckSquare className="w-4 h-4 text-cyan-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-600" />
                          )}
                        </button>
                      </th>
                      <th className="p-3">Title & Category</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">SEO Score</th>
                      <th className="p-3">Views / Clicks</th>
                      <th className="p-3">KB Sync</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredArticles.map((art) => {
                      const score = BlogService.checkArticleSEOQuality(art).score;
                      return (
                        <tr key={art.id} className="hover:bg-slate-950/50">
                          <td className="p-3">
                            <button onClick={() => handleToggleSelectArticle(art.id)} className="cursor-pointer">
                              {selectedArticleIds.includes(art.id) ? (
                                <CheckSquare className="w-4 h-4 text-cyan-400" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-600" />
                              )}
                            </button>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-white max-w-sm line-clamp-1">{art.title}</div>
                            <div className="text-[10px] font-mono text-cyan-400">{art.category?.name} • {art.readingTime} min</div>
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                                art.status === 'PUBLISHED'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                                  : art.status === 'DRAFT'
                                  ? 'bg-slate-800 text-slate-300'
                                  : art.status === 'SCHEDULED'
                                  ? 'bg-amber-950 text-amber-400 border border-amber-500/40'
                                  : 'bg-rose-950 text-rose-400'
                              }`}
                            >
                              {art.status}
                            </span>
                          </td>
                          <td className="p-3 font-mono font-bold">
                            <span className={score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-amber-400' : 'text-rose-400'}>
                              {score}/100
                            </span>
                          </td>
                          <td className="p-3 font-mono">
                            <span className="text-slate-200">{art.viewCount || 0} v</span> / <span className="text-cyan-400">{art.ctaClicks || 0} c</span>
                          </td>
                          <td className="p-3">
                            {art.syncedToKnowledgeBase ? (
                              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-[10px] font-bold">Synced</span>
                            ) : (
                              <button
                                onClick={() => handleSyncKB(art.id)}
                                className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-cyan-300 font-mono text-[10px] cursor-pointer"
                              >
                                Sync KB
                              </button>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => {
                                  setPreviewArticle(art);
                                  setIsPreviewOpen(true);
                                }}
                                className="p-1.5 rounded bg-slate-950 text-slate-400 hover:text-cyan-400 cursor-pointer"
                                title="Preview"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleOpenEditEditor(art)}
                                className="p-1.5 rounded bg-slate-950 text-slate-400 hover:text-indigo-400 cursor-pointer"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteArticle(art.id)}
                                className="p-1.5 rounded bg-slate-950 text-slate-400 hover:text-rose-400 cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-mono uppercase">Categories ({categories.length})</h3>
              <button
                onClick={() => setIsCategoryModalOpen(true)}
                className="px-3 py-1.5 bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const count = articles.filter((a) => a.categoryId === cat.id || a.category?.slug === cat.slug).length;
                return (
                  <div key={cat.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{cat.name}</span>
                      <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px] font-mono font-bold">
                        {count} articles
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">{cat.description}</p>
                    <div className="text-[10px] font-mono text-slate-500 pt-2">slug: {cat.slug}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: TAGS */}
        {activeTab === 'tags' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-mono uppercase">Tags ({tags.length})</h3>
              <button
                onClick={() => setIsTagModalOpen(true)}
                className="px-3 py-1.5 bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Tag</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tg) => {
                const count = articles.filter((a) => a.tags?.some((t) => t.toLowerCase() === tg.name.toLowerCase())).length;
                return (
                  <div key={tg.id} className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center gap-2">
                    <span className="font-bold text-slate-200">#{tg.name}</span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-950 text-cyan-400 font-mono text-[10px]">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: COMMENTS MODERATION */}
        {activeTab === 'comments' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white font-mono uppercase">Comment Moderation ({comments.length})</h3>
            <div className="space-y-3">
              {comments.map((cmt) => (
                <div key={cmt.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{cmt.name}</span>
                      <span className="text-[10px] font-mono text-slate-500">({cmt.email})</span>
                      <span className="px-2 py-0.2 rounded bg-slate-950 text-cyan-400 text-[10px] font-mono">{cmt.status}</span>
                    </div>
                    <p className="text-xs text-slate-300">{cmt.comment}</p>
                    <span className="text-[10px] font-mono text-slate-500 block">Article: {cmt.articleTitle}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        BlogService.updateCommentStatus(cmt.id, 'APPROVED');
                        loadAllData();
                      }}
                      className="px-3 py-1 bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-lg cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        BlogService.updateCommentStatus(cmt.id, 'REJECTED');
                        loadAllData();
                      }}
                      className="px-3 py-1 bg-rose-950 border border-rose-500/40 text-rose-300 text-xs font-bold rounded-lg cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: MEDIA LIBRARY */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-mono uppercase">Media Library ({mediaList.length})</h3>
              <button
                onClick={() => {
                  const url = prompt('Masukkan URL Gambar:');
                  if (url) {
                    BlogService.addMedia({ url, filename: 'uploaded-image.jpg', altText: 'Uploaded Image' });
                    loadAllData();
                  }
                }}
                className="px-3 py-1.5 bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Media URL</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mediaList.map((m) => (
                <div key={m.id} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="h-32 rounded-xl overflow-hidden bg-slate-950">
                    <img src={m.url} alt={m.altText} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-white text-xs block truncate">{m.filename}</span>
                    <span className="text-[10px] font-mono text-slate-400 block">Alt: {m.altText || 'MISSING ALT TEXT!'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: IDEAS & CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-mono uppercase">Content Planning Board</h3>
              <button
                onClick={() => setIsIdeaModalOpen(true)}
                className="px-3 py-1.5 bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Idea</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-4 gap-4">
              {['IDEA', 'PLANNED', 'WRITING', 'PUBLISHED'].map((st) => (
                <div key={st} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase block border-b border-slate-800 pb-2">{st}</span>
                  <div className="space-y-2">
                    {ideas
                      .filter((i) => i.status === st)
                      .map((idea) => (
                        <div key={idea.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                          <span className="font-bold text-white text-xs block">{idea.title}</span>
                          <span className="text-[10px] font-mono text-slate-500 block">{idea.topic}</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase">Real Analytics Breakdown</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block">Total Traffic</span>
                <span className="text-xl font-bold text-cyan-400 font-mono">{analytics.totalViews} views</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block">Conversion Rate</span>
                <span className="text-xl font-bold text-emerald-400 font-mono">
                  {analytics.totalViews > 0 ? ((analytics.totalCTAClicks / analytics.totalViews) * 100).toFixed(1) : 0}%
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block">Avg Reading Time</span>
                <span className="text-xl font-bold text-indigo-400 font-mono">{analytics.avgReadTime} min</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: SETTINGS & SYNC */}
        {activeTab === 'settings' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-white font-mono uppercase">Blog SEO & System Settings</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">RSS Feed Endpoint:</label>
                <input type="text" readOnly value="https://www.smart-ai.id/blog/rss.xml" className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-cyan-300" />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Knowledge Base Sync Strategy:</label>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                  Published articles with <strong className="text-cyan-300">knowledgeEnabled = true</strong> are indexed for AI Chatbot queries and Knowledge Base searches after Human Review.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ARTICLE EDITOR MODAL */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 max-w-4xl w-full my-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">
                {editingArticleId ? 'Edit Article' : 'Create New Article'}
              </h2>
              <button onClick={() => setIsEditorOpen(false)} className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SEO Score Check Banner */}
            <div className={`p-4 rounded-2xl border text-xs flex items-center justify-between ${seoCheck.score >= 80 ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300' : 'bg-amber-950/50 border-amber-500/40 text-amber-300'}`}>
              <div>
                <span className="font-bold font-mono">SEO QUALITY SCORE: {seoCheck.score}/100</span>
                <p className="text-[11px] text-slate-300 mt-0.5">{seoCheck.issues[0]?.message}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono text-slate-400">Title *</label>
                <input
                  type="text"
                  value={articleForm.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  placeholder="Judul artikel..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Slug</label>
                <input
                  type="text"
                  value={articleForm.slug || ''}
                  onChange={(e) => setArticleForm({ ...articleForm, slug: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Category</label>
                <select
                  value={articleForm.categoryId || 'cat-1'}
                  onChange={(e) => setArticleForm({ ...articleForm, categoryId: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Article Type</label>
                <select
                  value={articleForm.articleType || 'ARTICLE'}
                  onChange={(e) => setArticleForm({ ...articleForm, articleType: e.target.value as any })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                >
                  <option value="ARTICLE">ARTICLE</option>
                  <option value="GUIDE">GUIDE</option>
                  <option value="CONCEPT">CONCEPT</option>
                  <option value="CASE STUDY">CASE STUDY</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Status</label>
                <select
                  value={articleForm.status || 'DRAFT'}
                  onChange={(e) => setArticleForm({ ...articleForm, status: e.target.value as any })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="REVIEW">REVIEW</option>
                  <option value="SCHEDULED">SCHEDULED</option>
                  <option value="PUBLISHED">PUBLISHED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono text-slate-400">Excerpt / Meta Description</label>
                <textarea
                  rows={2}
                  value={articleForm.excerpt || ''}
                  onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value, seoDescription: e.target.value })}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono text-slate-400">Article Content (HTML)</label>
                <textarea
                  rows={8}
                  value={articleForm.content || ''}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                />
              </div>

              <div className="space-y-1 sm:col-span-2 flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="kb-check"
                  checked={articleForm.knowledgeEnabled || false}
                  onChange={(e) => setArticleForm({ ...articleForm, knowledgeEnabled: e.target.checked })}
                  className="rounded border-slate-800 bg-slate-950 text-cyan-500"
                />
                <label htmlFor="kb-check" className="text-xs font-mono text-slate-300 cursor-pointer">
                  Enable Knowledge Base indexing for AI Chatbot queries
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <button onClick={() => setIsEditorOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl">
                Cancel
              </button>
              <button onClick={handleSaveArticle} className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold rounded-xl shadow-md">
                Save Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI CONTENT ASSISTANT DRAWER */}
      {isAiDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/80 backdrop-blur-md">
          <div className="p-6 bg-slate-900 border-l border-slate-800 w-full max-w-md h-full space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Sparkles className="w-5 h-5" />
                <span>AI Content Assistant</span>
              </div>
              <button onClick={() => setIsAiDrawerOpen(false)} className="p-1 rounded bg-slate-950 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs space-y-1">
              <span className="font-bold font-mono uppercase block">FACT CHECK WARNING</span>
              <p className="text-[11px] text-slate-300">
                Artikel yang dihasilkan AI akan selalu berstatus <strong className="text-amber-300 font-bold">DRAFT</strong>. Harap lakukan Human Review mengenai keakuratan faktual sebelum memublikasikan.
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-mono text-slate-400 block">Topik atau Judul Utama:</label>
              <input
                type="text"
                value={aiTopicInput}
                onChange={(e) => setAiTopicInput(e.target.value)}
                placeholder="Contoh: AI untuk Manajemen Armada Tambang Nikel"
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />

              <button
                onClick={handleAiGenerateDraft}
                disabled={aiGenerating || !aiTopicInput}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{aiGenerating ? 'Generating Draft...' : 'Generate Full Draft (DRAFT)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW DEVICE MODAL */}
      {isPreviewOpen && previewArticle && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 w-full max-w-5xl flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white font-mono">
              <span>ARTICLE PREVIEW: {previewArticle.title}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 ${previewDevice === 'desktop' ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-950 text-slate-400'}`}
              >
                <Monitor className="w-4 h-4" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 ${previewDevice === 'tablet' ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-950 text-slate-400'}`}
              >
                <Tablet className="w-4 h-4" />
                <span>Tablet</span>
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 ${previewDevice === 'mobile' ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-950 text-slate-400'}`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Mobile</span>
              </button>

              <button onClick={() => setIsPreviewOpen(false)} className="p-2 bg-slate-950 text-slate-400 rounded-xl ml-4">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            className={`bg-[#06090e] border border-slate-800 rounded-3xl overflow-y-auto p-6 transition-all h-[80vh] ${
              previewDevice === 'mobile' ? 'w-[375px]' : previewDevice === 'tablet' ? 'w-[768px]' : 'w-full max-w-4xl'
            }`}
          >
            <h1 className="text-2xl font-bold text-white mb-2">{previewArticle.title}</h1>
            <p className="text-xs text-slate-400 mb-4">{previewArticle.excerpt}</p>
            <div className="prose prose-invert text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: previewArticle.content }} />
          </div>
        </div>
      )}

      {/* CATEGORY / TAG / IDEA CREATION MODALS */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-md w-full space-y-4">
            <h3 className="text-sm font-bold text-white">Add Category</h3>
            <input
              type="text"
              placeholder="Category Name"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
            <textarea
              placeholder="Description"
              value={newCatDesc}
              onChange={(e) => setNewCatDesc(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsCategoryModalOpen(false)} className="px-4 py-2 bg-slate-800 text-xs text-slate-300 rounded-xl">Batal</button>
              <button
                onClick={() => {
                  BlogService.createCategory({ name: newCatName, description: newCatDesc });
                  setIsCategoryModalOpen(false);
                  loadAllData();
                }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-xs text-white font-bold rounded-xl"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {isTagModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-md w-full space-y-4">
            <h3 className="text-sm font-bold text-white">Add Tag</h3>
            <input
              type="text"
              placeholder="Tag Name"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsTagModalOpen(false)} className="px-4 py-2 bg-slate-800 text-xs text-slate-300 rounded-xl">Batal</button>
              <button
                onClick={() => {
                  BlogService.createTag(newTagName);
                  setIsTagModalOpen(false);
                  loadAllData();
                }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-xs text-white font-bold rounded-xl"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {isIdeaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-md w-full space-y-4">
            <h3 className="text-sm font-bold text-white">Add Content Idea</h3>
            <input
              type="text"
              placeholder="Idea Title"
              value={newIdeaTitle}
              onChange={(e) => setNewIdeaTitle(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
            <input
              type="text"
              placeholder="Topic / Category"
              value={newIdeaTopic}
              onChange={(e) => setNewIdeaTopic(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsIdeaModalOpen(false)} className="px-4 py-2 bg-slate-800 text-xs text-slate-300 rounded-xl">Batal</button>
              <button
                onClick={() => {
                  BlogService.addContentIdea({ title: newIdeaTitle, topic: newIdeaTopic, category: newIdeaTopic });
                  setIsIdeaModalOpen(false);
                  loadAllData();
                }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-xs text-white font-bold rounded-xl"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
