import React, { useState, useEffect } from 'react';
import { KnowledgeBaseService } from '../../services/KnowledgeBaseService';
import { ChatbotService } from '../../services/ChatbotService';
import {
  KnowledgeArticle,
  KnowledgeCategory,
  KnowledgeMainCategory,
  KnowledgeStatus,
  KnowledgeVisibility,
  UnansweredQuestion,
  ChatAnalytics,
  CompanyInfo,
  PricingRule,
  KnowledgeAuditLog
} from '../../types';
import {
  BookOpen,
  Plus,
  Search,
  Sparkles,
  Edit,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Tag,
  Eye,
  BarChart3,
  HelpCircle,
  FileText,
  Save,
  X,
  History,
  ShieldCheck,
  Building2,
  Briefcase,
  Factory,
  DollarSign,
  Cpu,
  FolderKanban,
  UserCheck,
  Headphones,
  RotateCcw,
  Check,
  Copy,
  Terminal,
  Lock,
  Layers,
  ArrowRight
} from 'lucide-react';

export const AdminKnowledgePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'company'
    | 'services'
    | 'industries'
    | 'faq'
    | 'pricing'
    | 'technology'
    | 'portfolio'
    | 'sales'
    | 'support'
    | 'articles'
    | 'gap_tracker'
    | 'ai_generator'
    | 'rag_simulator'
    | 'audit_trail'
  >('dashboard');

  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [unanswered, setUnanswered] = useState<UnansweredQuestion[]>([]);
  const [analytics, setAnalytics] = useState<ChatAnalytics | null>(null);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(KnowledgeBaseService.getCompanyInfo());
  const [pricingRules, setPricingRules] = useState<PricingRule[]>(KnowledgeBaseService.getPricingRules());
  const [auditLogs, setAuditLogs] = useState<KnowledgeAuditLog[]>(KnowledgeBaseService.getAuditLogs());

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal Article Editor State
  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState({
    title: '',
    slug: '',
    category: 'Services' as KnowledgeCategory,
    summary: '',
    content: '',
    tags: '',
    status: 'PUBLISHED' as KnowledgeStatus,
    visibility: 'PUBLIC' as KnowledgeVisibility,
    priority: 1
  });

  // Version History Modal
  const [versionModalOpen, setVersionModalOpen] = useState(false);
  const [versionModalArticle, setVersionModalArticle] = useState<KnowledgeArticle | null>(null);

  // AI Generator State
  const [genTopic, setGenTopic] = useState('');
  const [genCategory, setGenCategory] = useState<KnowledgeCategory>('Services');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<{
    title: string;
    summary: string;
    content: string;
    tags: string[];
  } | null>(null);

  // RAG Simulator State
  const [simQuery, setSimQuery] = useState('SMART-AI.ID itu apa dan layanan apa yang tersedia?');
  const [simRole, setSimRole] = useState<'GUEST' | 'CUSTOMER' | 'ADMIN'>('GUEST');
  const [simResult, setSimResult] = useState<{
    contextText: string;
    sources: { id: string; title: string }[];
  } | null>(null);

  // Company Form Save Toast
  const [companySavedSuccess, setCompanySavedSuccess] = useState(false);

  useEffect(() => {
    loadData();
  }, [selectedCategory, searchQuery, activeTab]);

  const loadData = () => {
    const list = KnowledgeBaseService.getArticles('ALL', selectedCategory as any, searchQuery);
    setArticles(list);
    setUnanswered(KnowledgeBaseService.getUnansweredQuestions());
    setAnalytics(ChatbotService.getAnalytics());
    setCompanyInfo(KnowledgeBaseService.getCompanyInfo());
    setPricingRules(KnowledgeBaseService.getPricingRules());
    setAuditLogs(KnowledgeBaseService.getAuditLogs());
  };

  const handleOpenEditor = (art?: KnowledgeArticle) => {
    if (art) {
      setEditingArticleId(art.id);
      setArticleForm({
        title: art.title,
        slug: art.slug,
        category: art.category as KnowledgeCategory,
        summary: art.summary,
        content: art.content,
        tags: art.tags.join(', '),
        status: art.status,
        visibility: art.visibility,
        priority: art.priority || 1
      });
    } else {
      setEditingArticleId(null);
      setArticleForm({
        title: '',
        slug: '',
        category: 'Services',
        summary: '',
        content: '',
        tags: 'smart-ai, solusi, ai',
        status: 'PUBLISHED',
        visibility: 'PUBLIC',
        priority: 1
      });
    }
    setEditorModalOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = articleForm.tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingArticleId) {
      KnowledgeBaseService.updateArticle(
        editingArticleId,
        {
          title: articleForm.title,
          slug: articleForm.slug,
          category: articleForm.category,
          summary: articleForm.summary,
          content: articleForm.content,
          tags: tagArray,
          status: articleForm.status,
          visibility: articleForm.visibility,
          priority: Number(articleForm.priority)
        },
        'Admin'
      );
    } else {
      KnowledgeBaseService.createArticle({
        title: articleForm.title,
        slug: articleForm.slug,
        category: articleForm.category,
        summary: articleForm.summary,
        content: articleForm.content,
        tags: tagArray,
        status: articleForm.status,
        visibility: articleForm.visibility,
        priority: Number(articleForm.priority),
        authorName: 'SMART-AI Admin'
      });
    }

    setEditorModalOpen(false);
    loadData();
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel Knowledge Base ini?')) {
      KnowledgeBaseService.deleteArticle(id);
      loadData();
    }
  };

  const handleSaveCompanyInfo = (e: React.FormEvent) => {
    e.preventDefault();
    KnowledgeBaseService.saveCompanyInfo(companyInfo);
    setCompanySavedSuccess(true);
    setTimeout(() => setCompanySavedSuccess(false), 3000);
  };

  const handleGenerateAIDraft = async () => {
    if (!genTopic.trim()) return;
    setIsGenerating(true);
    const draft = await KnowledgeBaseService.generateArticleDraftWithAI(genTopic, genCategory);
    setGeneratedDraft(draft);
    setIsGenerating(false);
  };

  const handlePublishGeneratedDraft = () => {
    if (!generatedDraft) return;
    KnowledgeBaseService.createArticle({
      title: generatedDraft.title,
      slug: generatedDraft.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: genCategory,
      summary: generatedDraft.summary,
      content: generatedDraft.content,
      tags: generatedDraft.tags,
      status: 'REVIEW', // Mandatory Human Review Workflow
      visibility: 'PUBLIC',
      priority: 2,
      authorName: 'AI Knowledge Generator'
    });
    setGeneratedDraft(null);
    setGenTopic('');
    setActiveTab('articles');
    loadData();
  };

  const handleConvertGapToDraft = (gap: UnansweredQuestion) => {
    setGenTopic(gap.question);
    setGenCategory('Services');
    setActiveTab('ai_generator');
    KnowledgeBaseService.resolveUnansweredQuestion(gap.id);
  };

  const handleRunRAGSimulation = () => {
    const res = KnowledgeBaseService.retrieveRAGContext(simQuery, simRole);
    setSimResult(res);
  };

  const handleRollbackVersion = (articleId: string, verNum: number) => {
    KnowledgeBaseService.rollbackVersion(articleId, verNum, 'Admin');
    setVersionModalOpen(false);
    loadData();
  };

  // Metrics Dashboard counts
  const totalCount = articles.length;
  const publishedCount = articles.filter((a) => a.status === 'PUBLISHED').length;
  const draftCount = articles.filter((a) => a.status === 'DRAFT').length;
  const reviewCount = articles.filter((a) => a.status === 'REVIEW').length;
  const archivedCount = articles.filter((a) => a.status === 'ARCHIVED').length;

  return (
    <div className="py-24 md:py-32 bg-[#06090e] bg-tech-grid min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>CENTRAL AI KNOWLEDGE MANAGEMENT SYSTEM</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              SMART-AI.ID Knowledge Base
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Central Source of Truth (RAG Brain) untuk seluruh AI Chatbot, Sales Assistant, Project Estimator, & Business Copilot.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleOpenEditor()}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Artikel Baru
            </button>
            <button
              onClick={() => setActiveTab('ai_generator')}
              className="px-4 py-2.5 rounded-2xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs shadow-lg transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Generate Artikel via AI
            </button>
          </div>
        </div>

        {/* Dashboard Top Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Total Articles</div>
            <div className="text-xl font-extrabold text-white">{totalCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-[10px] font-mono text-emerald-400 uppercase">Published</div>
            <div className="text-xl font-extrabold text-emerald-400">{publishedCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-[10px] font-mono text-purple-400 uppercase">Pending Review</div>
            <div className="text-xl font-extrabold text-purple-400">{reviewCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-[10px] font-mono text-amber-400 uppercase">Draft</div>
            <div className="text-xl font-extrabold text-amber-400">{draftCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-[10px] font-mono text-rose-400 uppercase">Unanswered Gaps</div>
            <div className="text-xl font-extrabold text-rose-400">{unanswered.length}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-[10px] font-mono text-cyan-400 uppercase">AI RAG Hits</div>
            <div className="text-xl font-extrabold text-cyan-400">{analytics?.totalSessions || 128}</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs">
          {[
            { id: 'dashboard', label: 'Knowledge Dashboard', icon: BarChart3 },
            { id: 'company', label: '1. Company Knowledge', icon: Building2 },
            { id: 'services', label: '2. Services', icon: Briefcase },
            { id: 'industries', label: '3. Industries', icon: Factory },
            { id: 'faq', label: '4. FAQ Catalog', icon: HelpCircle },
            { id: 'pricing', label: '5. Pricing Rules', icon: DollarSign },
            { id: 'technology', label: '6. Technology', icon: Cpu },
            { id: 'portfolio', label: '7. Portfolio', icon: FolderKanban },
            { id: 'sales', label: '8. Sales Knowledge', icon: UserCheck },
            { id: 'support', label: '9. Support Policy', icon: Headphones },
            { id: 'articles', label: 'Articles Repository', icon: BookOpen },
            { id: 'gap_tracker', label: 'Knowledge Gaps', icon: AlertTriangle },
            { id: 'ai_generator', label: 'AI Generator', icon: Sparkles },
            { id: 'rag_simulator', label: 'RAG Tester', icon: Terminal },
            { id: 'audit_trail', label: 'Audit Log', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2.5 rounded-2xl font-bold transition shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md font-extrabold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* TAB 1: COMPANY KNOWLEDGE EDITOR                          */}
        {/* ======================================================== */}
        {activeTab === 'company' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-cyan-400" /> Profil & Identitas Perusahaan (Company Knowledge)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Sumber data resmi untuk menjawab pertanyaan publik seperti "SMART-AI.ID itu apa?" atau "Apa keunggulan perusahaan?".
                </p>
              </div>
              {companySavedSuccess && (
                <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Tersimpan ke RAG Database
                </span>
              )}
            </div>

            <form onSubmit={handleSaveCompanyInfo} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Nama Perusahaan Resmi</label>
                  <input
                    type="text"
                    value={companyInfo.name}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Nama Brand / Merk</label>
                  <input
                    type="text"
                    value={companyInfo.brandName}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, brandName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Website Resmi</label>
                  <input
                    type="text"
                    value={companyInfo.website}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Email Resmi</label>
                  <input
                    type="text"
                    value={companyInfo.email}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Deskripsi Ringkas Perusahaan</label>
                <textarea
                  rows={3}
                  value={companyInfo.description}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Visi Perusahaan</label>
                  <textarea
                    rows={2}
                    value={companyInfo.vision}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, vision: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Misi Perusahaan</label>
                  <textarea
                    rows={2}
                    value={companyInfo.mission}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, mission: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Simpan Pengetahuan Perusahaan
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: PRICING RULES EDITOR                              */}
        {/* ======================================================== */}
        {activeTab === 'pricing' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-cyan-400" /> Pricing Rule Engine & Multiplier Configurator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Aturan biaya otomatis untuk AI Project Estimator & Sales Assistant.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs leading-relaxed flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Aturan Penting:</strong> Hasil kalkulasi biaya dari Knowledge Base adalah <em>Pricing Guidance / Estimasi Awal non-binding</em>. AI wajib menginformasikan bahwa Quotation resmi diterbitkan setelah analisis teknis oleh tim Solution Architect.
              </span>
            </div>

            <div className="space-y-3">
              {pricingRules.map((rule) => (
                <div key={rule.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{rule.name} ({rule.id})</span>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${rule.active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}`}>
                      {rule.active ? 'ACTIVE RULE' : 'INACTIVE'}
                    </span>
                  </div>
                  <p className="text-slate-400">{rule.description}</p>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-900 font-mono text-[11px]">
                    <div>Kondisi: <span className="text-cyan-400">{rule.condition}</span></div>
                    <div>Bobot Multiplier: <span className="text-purple-400">{rule.multiplier}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB ARTICLES REPOSITORY & MANAGEMENT                      */}
        {/* ======================================================== */}
        {(activeTab === 'articles' || activeTab === 'dashboard') && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari artikel pengetahuan..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {['ALL', 'Industries', 'Services', 'Pricing Guidance', 'Integration', 'AI Capabilities', 'Process', 'Support'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles List */}
            <div className="space-y-4">
              {articles.map((art) => (
                <div key={art.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {art.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        art.visibility === 'PUBLIC'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : art.visibility === 'CUSTOMER'
                          ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                          : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                      }`}>
                        {art.visibility}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        art.status === 'PUBLISHED'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : art.status === 'REVIEW'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {art.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setVersionModalArticle(art);
                          setVersionModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold transition flex items-center gap-1"
                      >
                        <History className="w-3.5 h-3.5 text-cyan-400" /> v{art.version || 1}
                      </button>
                      <button
                        onClick={() => handleOpenEditor(art)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition"
                      >
                        <Edit className="w-3.5 h-3.5 text-cyan-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(art.id)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white">{art.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{art.summary}</p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-400">
                    <div className="flex items-center gap-3">
                      <span>Penulis: <strong className="text-slate-300">{art.authorName}</strong></span>
                      <span>Dilihat: <strong className="text-cyan-400">{art.views}</strong></span>
                      <span>Helpful: <strong className="text-emerald-400">{art.helpfulCount}</strong></span>
                    </div>
                    <span>Diperbarui: {new Date(art.updatedAt).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB GAP TRACKER & UNANSWERED QUESTIONS                   */}
        {/* ======================================================== */}
        {activeTab === 'gap_tracker' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" /> Knowledge Gap & Unanswered Questions Tracker
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Daftar pertanyaan dari user/client yang belum terjawab lengkap oleh AI. Klik tombol untuk mengkonversi pertanyaan menjadi draft artikel baru.
              </p>
            </div>

            <div className="space-y-3">
              {unanswered.map((gap) => (
                <div key={gap.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="font-bold text-white">"{gap.question}"</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">
                      Intent: {gap.intent} • Tanggal: {new Date(gap.createdAt).toLocaleString('id-ID')}
                    </div>
                  </div>
                  <button
                    onClick={() => handleConvertGapToDraft(gap)}
                    className="px-3.5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs transition shrink-0 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Buat Artikel via AI
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB AI ARTICLE GENERATOR                                 */}
        {/* ======================================================== */}
        {activeTab === 'ai_generator' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" /> AI Knowledge Article Draft Generator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Gunakan AI Gemini untuk membuat draf artikel pengetahuan lengkap. Semua artikel AI mewajibkan Human Review sebelum dipublikasikan.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Topik atau Pertanyaan</label>
                <input
                  type="text"
                  value={genTopic}
                  onChange={(e) => setGenTopic(e.target.value)}
                  placeholder="e.g. Integrasi Sensor Suhu IoT pada Gudang Farmasi"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Kategori Utama</label>
                <select
                  value={genCategory}
                  onChange={(e) => setGenCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="Services">Services</option>
                  <option value="Industries">Industries</option>
                  <option value="Pricing Guidance">Pricing Guidance</option>
                  <option value="Integration">Integration</option>
                  <option value="AI Capabilities">AI Capabilities</option>
                  <option value="Process">Process</option>
                  <option value="Support">Support</option>
                </select>
              </div>

              <button
                onClick={handleGenerateAIDraft}
                disabled={isGenerating || !genTopic.trim()}
                className="px-5 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold transition disabled:opacity-50 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> {isGenerating ? 'AI Sedang Menyusun Artikel...' : 'Generate AI Draft'}
              </button>

              {/* Draft Result */}
              {generatedDraft && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-4 pt-4 mt-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-400" /> Draf Hasil Generasi AI (Status: REVIEW)
                    </span>
                    <button
                      onClick={handlePublishGeneratedDraft}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Simpan sebagai Draf untuk Review Human
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white">{generatedDraft.title}</h3>
                  <p className="text-slate-300 italic">{generatedDraft.summary}</p>
                  <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] leading-relaxed whitespace-pre-line border border-slate-800">
                    {generatedDraft.content}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB RAG SIMULATOR                                         */}
        {/* ======================================================== */}
        {activeTab === 'rag_simulator' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" /> RAG Retrieval Context Simulator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Uji coba bagaimana RAG Engine menemukan dan menyusun konteks dokumen sebelum dikirimkan ke model AI.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 font-bold mb-1">Pertanyaan Simulasi</label>
                  <input
                    type="text"
                    value={simQuery}
                    onChange={(e) => setSimQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Simulasi Role User</label>
                  <select
                    value={simRole}
                    onChange={(e) => setSimRole(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="GUEST">GUEST (Public Only)</option>
                    <option value="CUSTOMER">CUSTOMER (Public + Customer)</option>
                    <option value="ADMIN">ADMIN (All Visibility)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleRunRAGSimulation}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" /> Jalankan Simulasi RAG Search
              </button>

              {simResult && (
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Dokumen Sumber Terpilih ({simResult.sources.length} Dokumen)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {simResult.sources.map((src) => (
                      <span key={src.id} className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[11px]">
                        📄 {src.title} ({src.id})
                      </span>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[11px] leading-relaxed whitespace-pre-line">
                    {simResult.contextText}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Editor Modal */}
      {editorModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">
                {editingArticleId ? 'Edit Artikel Knowledge Base' : 'Tambah Artikel Knowledge Base Baru'}
              </h3>
              <button onClick={() => setEditorModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-3">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Judul Artikel</label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Kategori</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="Services">Services</option>
                    <option value="Industries">Industries</option>
                    <option value="Pricing Guidance">Pricing Guidance</option>
                    <option value="Integration">Integration</option>
                    <option value="AI Capabilities">AI Capabilities</option>
                    <option value="Process">Process</option>
                    <option value="Support">Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Akses Visibility</label>
                  <select
                    value={articleForm.visibility}
                    onChange={(e) => setArticleForm({ ...articleForm, visibility: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="PUBLIC">PUBLIC (Guest/Chatbot)</option>
                    <option value="CUSTOMER">CUSTOMER (Portal Only)</option>
                    <option value="INTERNAL">INTERNAL (Admin/Dev)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Status Publikasi</label>
                  <select
                    value={articleForm.status}
                    onChange={(e) => setArticleForm({ ...articleForm, status: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="REVIEW">REVIEW</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">RingkasanSingkat (Summary)</label>
                <textarea
                  rows={2}
                  required
                  value={articleForm.summary}
                  onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Isi Artikel Lengkap (Markdown)</label>
                <textarea
                  rows={8}
                  required
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Tags (pisahkan koma)</label>
                <input
                  type="text"
                  value={articleForm.tags}
                  onChange={(e) => setArticleForm({ ...articleForm, tags: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditorModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                >
                  Simpan Artikel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Version History Modal */}
      {versionModalOpen && versionModalArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full space-y-4 shadow-2xl max-h-[80vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">
                Riwayat Versi: {versionModalArticle.title}
              </h3>
              <button onClick={() => setVersionModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {versionModalArticle.versions?.map((v) => (
                <div key={v.version} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-cyan-400">Versi {v.version}</span>
                    <button
                      onClick={() => handleRollbackVersion(versionModalArticle.id, v.version)}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] transition"
                    >
                      Rollback ke Versi ini
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Diubah oleh: {v.updatedBy} • Tanggal: {new Date(v.updatedAt).toLocaleString('id-ID')}
                  </div>
                  <p className="text-slate-300 pt-1 text-[11px] leading-relaxed">{v.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
