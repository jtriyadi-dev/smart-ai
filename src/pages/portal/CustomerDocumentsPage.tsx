import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalLayout } from '../../components/portal/CustomerPortalLayout';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { DocumentService, DocumentFilterOptions } from '../../services/DocumentService';
import { AIDocumentAssistantService } from '../../services/AIDocumentAssistantService';
import {
  DocumentModel,
  DocumentCategory,
  DocumentStatus,
  DocumentClassification,
  DocumentRequest,
} from '../../types';
import {
  FolderOpen,
  Download,
  FileText,
  Filter,
  ShieldCheck,
  Search,
  Plus,
  Star,
  Pin,
  Share2,
  Sparkles,
  Bot,
  Eye,
  FileCode,
  FileCheck,
  Receipt,
  FileSpreadsheet,
  AlertCircle,
  X,
  Send,
  Layers,
  LayoutGrid,
  List,
  Lock,
  Clock,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

export const CustomerDocumentsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [documents, setDocuments] = useState<DocumentModel[]>([]);
  const [kpis, setKpis] = useState<{
    totalDocuments: number;
    proposals: number;
    quotations: number;
    contracts: number;
    invoices: number;
    receipts: number;
    projectDocs: number;
    userManuals: number;
    actionRequired: number;
  }>({
    totalDocuments: 0,
    proposals: 0,
    quotations: 0,
    contracts: 0,
    invoices: 0,
    receipts: 0,
    projectDocs: 0,
    userManuals: 0,
    actionRequired: 0,
  });

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'ALL'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<DocumentStatus | 'ALL'>('ALL');
  const [selectedClassification, setSelectedClassification] = useState<DocumentClassification | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'NEWEST' | 'OLDEST' | 'NAME_ASC' | 'NAME_DESC' | 'RECENTLY_UPDATED'>('NEWEST');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);

  // Modals & Drawers State
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [shareModalDoc, setShareModalDoc] = useState<DocumentModel | null>(null);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [aiModalDoc, setAiModalDoc] = useState<DocumentModel | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<{
    summary: string;
    keyHighlights: string[];
    obligationsOrScope: string[];
    disclaimer: string;
  } | null>(null);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // New Document Request Form State
  const [newReqType, setNewReqType] = useState<DocumentCategory>('PROJECT_DOCUMENT');
  const [newReqDesc, setNewReqDesc] = useState('');
  const [newReqDate, setNewReqDate] = useState('');
  const [newReqMsg, setNewReqMsg] = useState('');
  const [reqSuccess, setReqSuccess] = useState(false);

  useEffect(() => {
    const s = CustomerPortalService.getCurrentSession();
    if (s) {
      setSession(s);
      loadDocuments(s.company.id, s.user.role);
    }
  }, [
    selectedCategory,
    selectedStatus,
    selectedClassification,
    searchQuery,
    sortBy,
    showFavoritesOnly,
    showPinnedOnly,
  ]);

  const loadDocuments = (companyId: string, role: any) => {
    const filterOptions: DocumentFilterOptions = {
      category: selectedCategory,
      status: selectedStatus,
      classification: selectedClassification,
      searchQuery,
      sortBy,
      showFavoritesOnly,
      showPinnedOnly,
    };
    const list = DocumentService.getDocuments(companyId, role, filterOptions);
    setDocuments(list);

    const stats = DocumentService.getKPIs(companyId, role);
    setKpis(stats);
  };

  if (!session) return null;

  const categoriesList: { label: string; value: DocumentCategory | 'ALL' }[] = [
    { label: 'All Documents', value: 'ALL' },
    { label: 'Proposals', value: 'PROPOSAL' },
    { label: 'Quotations', value: 'QUOTATION' },
    { label: 'Contracts', value: 'CONTRACT' },
    { label: 'Invoices', value: 'INVOICE' },
    { label: 'Receipts', value: 'PAYMENT_RECEIPT' },
    { label: 'SRS & Requirements', value: 'REQUIREMENT' },
    { label: 'Technical Docs', value: 'TECHNICAL_DOCUMENT' },
    { label: 'UI/UX Specs', value: 'UI_UX_DOCUMENT' },
    { label: 'UAT Documents', value: 'UAT_DOCUMENT' },
    { label: 'Release Notes', value: 'RELEASE_NOTE' },
    { label: 'User Manuals', value: 'USER_MANUAL' },
    { label: 'Other', value: 'OTHER' },
  ];

  const getCategoryIcon = (category: DocumentCategory) => {
    switch (category) {
      case 'PROPOSAL':
        return <FileText className="w-5 h-5 text-indigo-400" />;
      case 'QUOTATION':
        return <FileCheck className="w-5 h-5 text-amber-400" />;
      case 'CONTRACT':
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      case 'INVOICE':
        return <Receipt className="w-5 h-5 text-rose-400" />;
      case 'PAYMENT_RECEIPT':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
      case 'REQUIREMENT':
      case 'TECHNICAL_DOCUMENT':
        return <FileCode className="w-5 h-5 text-blue-400" />;
      case 'UI_UX_DOCUMENT':
        return <Layers className="w-5 h-5 text-purple-400" />;
      case 'UAT_DOCUMENT':
        return <CheckCircle2 className="w-5 h-5 text-teal-400" />;
      case 'RELEASE_NOTE':
        return <Sparkles className="w-5 h-5 text-cyan-300" />;
      case 'USER_MANUAL':
        return <HelpCircle className="w-5 h-5 text-emerald-300" />;
      default:
        return <FolderOpen className="w-5 h-5 text-slate-400" />;
    }
  };

  const handleToggleFavorite = (docId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    DocumentService.toggleFlag(docId, 'isFavorite');
    loadDocuments(session.company.id, session.user.role);
  };

  const handleTogglePin = (docId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    DocumentService.toggleFlag(docId, 'isPinned');
    loadDocuments(session.company.id, session.user.role);
  };

  const handleOpenShareModal = (doc: DocumentModel, e: React.MouseEvent) => {
    e.stopPropagation();
    setShareModalDoc(doc);
    const linkObj = DocumentService.generateShareLink(doc.id, session.user.name, 7);
    setShareUrl(linkObj.shareUrl);
  };

  const handleOpenAiModal = async (doc: DocumentModel, e: React.MouseEvent) => {
    e.stopPropagation();
    setAiModalDoc(doc);
    setAiLoading(true);
    setAiAnswer(null);
    setAiQuestion('');
    const summaryData = await AIDocumentAssistantService.summarizeDocument(doc);
    setAiAnalysis(summaryData);
    setAiLoading(false);
  };

  const handleAskAiQuestion = async () => {
    if (!aiModalDoc || !aiQuestion.trim()) return;
    setAiLoading(true);
    const ans = await AIDocumentAssistantService.answerQuestion(aiModalDoc, aiQuestion);
    setAiAnswer(ans);
    setAiLoading(false);
  };

  const handleDownloadDoc = (doc: DocumentModel, e: React.MouseEvent) => {
    e.stopPropagation();
    DocumentService.recordAction(doc.id, 'DOWNLOADED', session.user.name);
    CustomerPortalService.logActivity(
      session.company.id,
      session.user.id,
      session.user.name,
      'DOWNLOAD_DOCUMENT',
      'DocumentModel',
      doc.id,
      { name: doc.name, number: doc.documentNumber }
    );
    alert(`Memulai pengunduhan terenkripsi dokumen resmi: ${doc.name} (${doc.documentNumber})`);
    loadDocuments(session.company.id, session.user.role);
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReqDesc || !newReqDate) {
      alert('Mohon lengkapi deskripsi dokumen dan tanggal tenggat.');
      return;
    }
    DocumentService.createRequest({
      companyId: session.company.id,
      companyName: session.company.name,
      requestedBy: session.user.id,
      requestedByName: session.user.name,
      documentType: newReqType,
      description: newReqDesc,
      requiredByDate: newReqDate,
      message: newReqMsg,
    });
    setReqSuccess(true);
    setTimeout(() => {
      setReqSuccess(false);
      setRequestModalOpen(false);
      setNewReqDesc('');
      setNewReqMsg('');
    }, 1500);
  };

  return (
    <CustomerPortalLayout activePath="/portal/documents">
      {/* Top Title & Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <FolderOpen className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">Document Center & Archive</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Pusat Repositori Dokumen Resmi, Kontrak Terenkripsi, Spesifikasi Teknis & Panduan Perusahaan {session.company.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setRequestModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Ajukan Permintaan Dokumen</span>
          </button>
        </div>
      </div>

      {/* Dynamic KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Total Dokumen</span>
          <div className="text-lg font-bold text-white mt-1">{kpis.totalDocuments}</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-indigo-400">Proposals</span>
          <div className="text-lg font-bold text-indigo-300 mt-1">{kpis.proposals}</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-amber-400">Quotations</span>
          <div className="text-lg font-bold text-amber-300 mt-1">{kpis.quotations}</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-cyan-400">Kontrak Aktif</span>
          <div className="text-lg font-bold text-cyan-300 mt-1">{kpis.contracts}</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-rose-400">Invoices</span>
          <div className="text-lg font-bold text-rose-300 mt-1">{kpis.invoices}</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-blue-400">Dokumen Teknis</span>
          <div className="text-lg font-bold text-blue-300 mt-1">{kpis.projectDocs}</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-emerald-400">User Manuals</span>
          <div className="text-lg font-bold text-emerald-300 mt-1">{kpis.userManuals}</div>
        </div>
      </div>

      {/* Category Filter Pills Bar */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto text-xs pb-2 no-scrollbar">
        {categoriesList.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-3.5 py-2 rounded-xl font-semibold transition whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === cat.value
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search, Secondary Filter Toolbar & View Mode Switch */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama dokumen, nomor registrasi, tags..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdowns & Toggles */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto text-xs">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500/50"
          >
            <option value="ALL">Semua Status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="APPROVED">APPROVED</option>
            <option value="PENDING_REVIEW">PENDING REVIEW</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>

          {/* Classification Filter */}
          <select
            value={selectedClassification}
            onChange={(e) => setSelectedClassification(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500/50"
          >
            <option value="ALL">Semua Klasifikasi</option>
            <option value="PUBLIC_TO_CUSTOMER">Public Client</option>
            <option value="CUSTOMER_PRIVATE">Customer Private</option>
            <option value="CONFIDENTIAL">Confidential</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500/50"
          >
            <option value="NEWEST">Terbaru</option>
            <option value="OLDEST">Terlama</option>
            <option value="NAME_ASC">Nama A-Z</option>
            <option value="NAME_DESC">Nama Z-A</option>
            <option value="RECENTLY_UPDATED">Baru Diperbarui</option>
          </select>

          {/* Quick Filters */}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`p-2 rounded-xl border transition flex items-center gap-1 ${
              showFavoritesOnly
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Favorit Saya"
          >
            <Star className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-amber-400' : ''}`} />
          </button>

          <button
            onClick={() => setShowPinnedOnly(!showPinnedOnly)}
            className={`p-2 rounded-xl border transition flex items-center gap-1 ${
              showPinnedOnly
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Disematkan (Pinned)"
          >
            <Pin className="w-3.5 h-3.5" />
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 ml-auto lg:ml-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'list' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Document Listing Area */}
      {documents.length === 0 ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-12 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-3">
          <FolderOpen className="w-10 h-10 text-slate-600" />
          <span>Tidak ada dokumen yang memenuhi kriteria pencarian / filter Anda.</span>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => navigate(`/portal/documents/${doc.id}`)}
              className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition group relative shadow-sm"
            >
              <div>
                {/* Header Row: Category Badge & Quick Actions */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition">
                      {getCategoryIcon(doc.category)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                        {doc.category.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 font-semibold">{doc.documentNumber}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleToggleFavorite(doc.id, e)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-slate-800 transition"
                      title="Favorit"
                    >
                      <Star className={`w-3.5 h-3.5 ${doc.isFavorite ? 'text-amber-400 fill-amber-400' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => handleTogglePin(doc.id, e)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-slate-800 transition"
                      title="Pin Document"
                    >
                      <Pin className={`w-3.5 h-3.5 ${doc.isPinned ? 'text-cyan-400 fill-cyan-400' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Document Name & Description */}
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition line-clamp-2 mb-1.5">
                  {doc.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4">{doc.description}</p>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-1.5 mb-4 text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-semibold">
                    {doc.type} • {doc.fileSize}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold">
                    Ver {doc.version}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
                    {doc.status}
                  </span>
                  {doc.watermarked && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 text-[10px] flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Watermark
                    </span>
                  )}
                </div>
              </div>

              {/* Footer Row: Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px]">
                  {new Date(doc.createdAt).toLocaleDateString('id-ID')}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleOpenAiModal(doc, e)}
                    className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 transition border border-cyan-500/20"
                    title="Analisis AI"
                  >
                    <Bot className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleOpenShareModal(doc, e)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    title="Bagikan Tautan"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDownloadDoc(doc, e)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 transition"
                    title="Unduh PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-4">Dokumen</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Project</th>
                  <th className="p-4">Versi & Ukuran</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {documents.map((doc) => (
                  <tr
                    key={doc.id}
                    onClick={() => navigate(`/portal/documents/${doc.id}`)}
                    className="hover:bg-slate-800/40 cursor-pointer transition"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-800 text-cyan-400 shrink-0">
                          {getCategoryIcon(doc.category)}
                        </div>
                        <div>
                          <div className="font-bold text-white hover:text-cyan-300 transition">{doc.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">{doc.documentNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-semibold text-[11px]">
                        {doc.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300 max-w-[180px] truncate">
                      {doc.projectName || 'Umum'}
                    </td>
                    <td className="p-4 text-slate-400">
                      <span className="font-bold text-slate-200">v{doc.version}</span> • {doc.fileSize}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-semibold text-[11px]">
                        {doc.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleOpenAiModal(doc, e)}
                          className="p-2 rounded-lg bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition"
                          title="Tanya AI"
                        >
                          <Bot className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleOpenShareModal(doc, e)}
                          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                          title="Bagikan"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDownloadDoc(doc, e)}
                          className="p-2 rounded-lg bg-slate-800 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition"
                          title="Unduh"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REQUEST DOCUMENT MODAL */}
      {requestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#090d16] border border-slate-800 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl">
            <button
              onClick={() => setRequestModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Plus className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Ajukan Permintaan Dokumen Baru</h3>
            </div>

            {reqSuccess ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center text-emerald-400 text-xs">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
                Permintaan dokumen berhasil dikirim ke tim Account Manager SMART-AI.ID!
              </div>
            ) : (
              <form onSubmit={handleCreateRequest} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kategori Dokumen</label>
                  <select
                    value={newReqType}
                    onChange={(e) => setNewReqType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="PROJECT_DOCUMENT">Project / Technical Document</option>
                    <option value="PAYMENT_RECEIPT">Faktur Pajak & Kuitansi Pembayaran</option>
                    <option value="UAT_DOCUMENT">Dokumen UAT & Sign-off</option>
                    <option value="USER_MANUAL">User & Admin Manual</option>
                    <option value="OTHER">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Judul & Deskripsi Kebutuhan</label>
                  <input
                    type="text"
                    value={newReqDesc}
                    onChange={(e) => setNewReqDesc(e.target.value)}
                    placeholder="Contoh: Salinan Faktur Pajak PPh 23 Bulan Agustus 2026"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Dibutuhkan Sebelum Tanggal</label>
                  <input
                    type="date"
                    value={newReqDate}
                    onChange={(e) => setNewReqDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Catatan Tambahan (Opsional)</label>
                  <textarea
                    rows={3}
                    value={newReqMsg}
                    onChange={(e) => setNewReqMsg(e.target.value)}
                    placeholder="Instruksi atau nomor referensi khusus..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setRequestModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition"
                  >
                    Kirim Permintaan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* SHARE LINK MODAL */}
      {shareModalDoc && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#090d16] border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => setShareModalDoc(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Share2 className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Bagikan Dokumen Secara Aman</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Tautan waktu terbatas (berlaku 7 hari) dengan proteksi enkripsi tenant.
            </p>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 break-all mb-4">
              {shareUrl}
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                alert('Tautan terenkripsi berhasil disalin ke clipboard!');
                setShareModalDoc(null);
              }}
              className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition"
            >
              Salin Tautan Teraplikasi
            </button>
          </div>
        </div>
      )}

      {/* AI DOCUMENT ANALYST MODAL */}
      {aiModalDoc && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#090d16] border border-slate-800 rounded-2xl w-full max-w-2xl p-6 relative shadow-2xl max-h-[85vh] overflow-y-auto no-scrollbar">
            <button
              onClick={() => setAiModalDoc(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-6 h-6 text-cyan-400" />
              <div>
                <h3 className="text-base font-bold text-white">Gemini AI Document Analyst</h3>
                <span className="text-xs text-slate-400">{aiModalDoc.name}</span>
              </div>
            </div>

            {aiLoading ? (
              <div className="py-12 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
                <Sparkles className="w-6 h-6 text-cyan-400 animate-spin" />
                <span>Memproses analisis dokumen dengan Gemini 2.5 Flash...</span>
              </div>
            ) : (
              <div className="space-y-4 text-xs mt-4">
                {aiAnalysis && (
                  <>
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                      <h4 className="font-bold text-cyan-300 mb-1">Ringkasan Eksekutif AI</h4>
                      <p className="text-slate-200 leading-relaxed">{aiAnalysis.summary}</p>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                      <h4 className="font-bold text-white mb-2">Sorotan Utama (Key Highlights)</h4>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {aiAnalysis.keyHighlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                      <h4 className="font-bold text-white mb-2">Cakupan / Ketentuan Utama</h4>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {aiAnalysis.obligationsOrScope.map((o, i) => (
                          <li key={i}>{o}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {/* Q&A Interactive Box */}
                <div className="border-t border-slate-800 pt-4">
                  <h4 className="font-bold text-white mb-2">Tanya Apapun Tentang Dokumen Ini</h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      placeholder="Contoh: Berapa masa berlaku kontrak ini?"
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      onClick={handleAskAiQuestion}
                      className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition"
                    >
                      Tanya
                    </button>
                  </div>

                  {aiAnswer && (
                    <div className="mt-3 p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 leading-relaxed">
                      {aiAnswer}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </CustomerPortalLayout>
  );
};
