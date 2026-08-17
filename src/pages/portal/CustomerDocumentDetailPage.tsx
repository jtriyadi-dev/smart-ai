import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalLayout } from '../../components/portal/CustomerPortalLayout';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { DocumentService } from '../../services/DocumentService';
import { AIDocumentAssistantService } from '../../services/AIDocumentAssistantService';
import {
  DocumentModel,
  DocumentVersion,
} from '../../types';
import {
  FolderOpen,
  Download,
  FileText,
  ShieldCheck,
  Star,
  Pin,
  Share2,
  Bot,
  ArrowLeft,
  Lock,
  Clock,
  CheckCircle2,
  AlertCircle,
  Layers,
  Sparkles,
  History,
  FileCheck,
  Building2,
  UserCheck,
  Link,
  Eye,
  X,
  FileSpreadsheet,
  Receipt,
  FileCode,
  HelpCircle,
} from 'lucide-react';

export const CustomerDocumentDetailPage: React.FC = () => {
  const { navigate, currentPath } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [doc, setDoc] = useState<DocumentModel | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'versions' | 'approvals' | 'contract' | 'related' | 'audit'>('overview');
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);

  // Modals State
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [aiCompareResult, setAiCompareResult] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Version Upload Draf State
  const [newVerNum, setNewVerNum] = useState('');
  const [newVerDesc, setNewVerDesc] = useState('');
  const [addVerSuccess, setAddVerSuccess] = useState(false);

  useEffect(() => {
    const s = CustomerPortalService.getCurrentSession();
    if (!s) return;
    setSession(s);

    // Extract ID from pathname e.g. /portal/documents/doc_prop_001
    const parts = currentPath.split('/');
    const docId = parts[parts.length - 1];

    if (docId) {
      const found = DocumentService.getDocumentById(docId, s.company.id, s.user.role);
      if (found) {
        setDoc(found);
        DocumentService.recordAction(found.id, 'VIEWED', s.user.name);
      }
    }
  }, [currentPath]);

  if (!session) return null;

  if (!doc) {
    return (
      <CustomerPortalLayout activePath="/portal/documents">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-xs text-slate-400">
          <AlertCircle className="w-8 h-8 text-rose-400 mx-auto mb-2" />
          <span>Dokumen tidak ditemukan atau Anda tidak memiliki hak akses.</span>
          <div className="mt-4">
            <button
              onClick={() => navigate('/portal/documents')}
              className="px-4 py-2 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700"
            >
              Kembali ke Document Center
            </button>
          </div>
        </div>
      </CustomerPortalLayout>
    );
  }

  const handleToggleFavorite = () => {
    DocumentService.toggleFlag(doc.id, 'isFavorite');
    const updated = DocumentService.getDocumentById(doc.id, session.company.id, session.user.role);
    if (updated) setDoc(updated);
  };

  const handleTogglePin = () => {
    DocumentService.toggleFlag(doc.id, 'isPinned');
    const updated = DocumentService.getDocumentById(doc.id, session.company.id, session.user.role);
    if (updated) setDoc(updated);
  };

  const handleDownload = () => {
    DocumentService.recordAction(doc.id, 'DOWNLOADED', session.user.name);
    alert(`Memulai pengunduhan terenkripsi dokumen resmi: ${doc.name} (${doc.documentNumber})`);
    const updated = DocumentService.getDocumentById(doc.id, session.company.id, session.user.role);
    if (updated) setDoc(updated);
  };

  const handleGenerateShare = () => {
    const linkObj = DocumentService.generateShareLink(doc.id, session.user.name, 7);
    setShareUrl(linkObj.shareUrl);
    setShareModalOpen(true);
    const updated = DocumentService.getDocumentById(doc.id, session.company.id, session.user.role);
    if (updated) setDoc(updated);
  };

  const handleRunAiAnalysis = async () => {
    setAiModalOpen(true);
    setAiLoading(true);
    const res = await AIDocumentAssistantService.summarizeDocument(doc);
    setAiAnalysis(res);
    setAiLoading(false);
  };

  const handleCompareVersionsWithAi = async (v1: DocumentVersion, v2: DocumentVersion) => {
    setAiModalOpen(true);
    setAiLoading(true);
    const res = await AIDocumentAssistantService.compareVersions(doc, v1, v2);
    setAiCompareResult(res);
    setAiLoading(false);
  };

  const handleAddVersion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVerNum || !newVerDesc) return;
    const updated = DocumentService.addVersion(doc.id, newVerNum, newVerDesc, session.user.name);
    if (updated) {
      setDoc(updated);
      setAddVerSuccess(true);
      setTimeout(() => {
        setAddVerSuccess(false);
        setNewVerNum('');
        setNewVerDesc('');
      }, 1500);
    }
  };

  return (
    <CustomerPortalLayout activePath="/portal/documents">
      {/* Breadcrumb Bar */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
        <button onClick={() => navigate('/portal/documents')} className="hover:text-cyan-400 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Document Center
        </button>
        <span>/</span>
        <span className="text-slate-300 font-semibold">{doc.category.replace('_', ' ')}</span>
        <span>/</span>
        <span className="text-cyan-300 truncate max-w-[200px]">{doc.documentNumber}</span>
      </div>

      {/* Main Document Header Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold text-[11px] uppercase tracking-wider">
                {doc.category.replace('_', ' ')}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono font-bold text-[11px]">
                {doc.documentNumber}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-[11px]">
                {doc.status}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 font-semibold text-[11px]">
                {doc.classification}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 font-bold text-[11px]">
                v{doc.version}
              </span>
            </div>

            <h1 className="text-xl font-bold text-white mb-2">{doc.name}</h1>
            <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">{doc.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md transition"
            >
              <Download className="w-4 h-4" /> Unduh PDF Resmi
            </button>
            <button
              onClick={handleGenerateShare}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition"
              title="Bagikan Tautan Aman"
            >
              <Share2 className="w-4 h-4" /> Bagikan
            </button>
            <button
              onClick={handleRunAiAnalysis}
              className="px-3.5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Bot className="w-4 h-4 text-cyan-400" /> AI Analyst
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`p-2.5 rounded-xl border transition ${
                doc.isFavorite
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="Favorit"
            >
              <Star className={`w-4 h-4 ${doc.isFavorite ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={handleTogglePin}
              className={`p-2.5 rounded-xl border transition ${
                doc.isPinned
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="Disematkan"
            >
              <Pin className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Document Viewer Canvas Box */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 md:p-8 mb-6 relative overflow-hidden shadow-2xl">
        {/* Security Watermark Overlay Toggle */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-white">Interactive Digital Document Canvas</span>
            <span>•</span>
            <span>Format Ref: {doc.storageReference}</span>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-medium">
            <input
              type="checkbox"
              checked={watermarkEnabled}
              onChange={(e) => setWatermarkEnabled(e.target.checked)}
              className="accent-cyan-500 rounded"
            />
            <span>Watermark Keamanan</span>
          </label>
        </div>

        {/* Printable Document Sheet Simulation */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-8 max-w-4xl mx-auto relative shadow-inner text-slate-200">
          {/* Watermark Diagonal Text Overlay */}
          {watermarkEnabled && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10 select-none overflow-hidden">
              <div className="rotate-[-30deg] text-center font-black text-3xl md:text-5xl tracking-widest text-cyan-400 uppercase leading-relaxed">
                SMART-AI.ID / {session.company.name} <br />
                {doc.classification} / {doc.documentNumber}
              </div>
            </div>
          )}

          {/* Letterhead Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 font-black text-slate-950 flex items-center justify-center text-base">
                SAI
              </div>
              <div>
                <div className="font-extrabold text-white text-base tracking-wide">PT SMART AI INDONESIA</div>
                <div className="text-[11px] text-slate-400">Enterprise AI Software & Digital System Solution Provider</div>
              </div>
            </div>

            <div className="text-right text-xs">
              <div className="font-bold text-cyan-400">{doc.documentNumber}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Versi: {doc.version}</div>
            </div>
          </div>

          {/* Document Content Abstract */}
          <div className="space-y-4 text-xs leading-relaxed">
            <div className="text-center py-2 border-b border-slate-800/60 mb-4">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">{doc.name}</h2>
              <span className="text-[11px] text-slate-400 font-mono">Diterbitkan untuk: {session.company.name}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800/60 mb-4 text-[11px]">
              <div>
                <span className="text-slate-400 block">Kategori Dokumen:</span>
                <span className="font-bold text-cyan-300">{doc.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Nama Proyek Terkait:</span>
                <span className="font-bold text-white">{doc.projectName || 'General System'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Diunggah Oleh:</span>
                <span className="font-semibold text-slate-200">{doc.uploadedBy}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Tanggal Registrasi:</span>
                <span className="font-semibold text-slate-200">{new Date(doc.createdAt).toLocaleDateString('id-ID')}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/60">
              <h4 className="font-bold text-white mb-1">Deskripsi Ringkas & Ketentuan</h4>
              <p className="text-slate-300">{doc.description}</p>
            </div>

            {/* E-Signature Box Simulation for Contracts */}
            {doc.contractDetails && (
              <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 gap-6 text-[11px]">
                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
                  <div className="text-slate-400 font-semibold mb-2">Pihak Pertama (Penyedia)</div>
                  <div className="font-bold text-white">PT SMART AI INDONESIA</div>
                  <div className="mt-6 pt-2 border-t border-slate-800 text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Disahkan & Tanda Tangan Digital
                  </div>
                </div>

                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
                  <div className="text-slate-400 font-semibold mb-2">Pihak Kedua (Pelanggan)</div>
                  <div className="font-bold text-white">{session.company.name}</div>
                  <div className="mt-6 pt-2 border-t border-slate-800 text-cyan-300 font-bold">
                    Penandatangan: {doc.contractDetails.signerName || 'Hendra Wijaya'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabbed Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 mb-6 text-xs overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 font-bold border-b-2 transition whitespace-nowrap px-2 ${
            activeTab === 'overview'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Spesifikasi & Detail
        </button>
        <button
          onClick={() => setActiveTab('versions')}
          className={`pb-3 font-bold border-b-2 transition whitespace-nowrap px-2 flex items-center gap-1.5 ${
            activeTab === 'versions'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <span>Riwayat Versi</span>
          <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-cyan-400 text-[10px]">
            {doc.versions ? doc.versions.length : 1}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('approvals')}
          className={`pb-3 font-bold border-b-2 transition whitespace-nowrap px-2 ${
            activeTab === 'approvals'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Workflow Persetujuan
        </button>
        {doc.contractDetails && (
          <button
            onClick={() => setActiveTab('contract')}
            className={`pb-3 font-bold border-b-2 transition whitespace-nowrap px-2 ${
              activeTab === 'contract'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Kontrak & E-Signature
          </button>
        )}
        <button
          onClick={() => setActiveTab('related')}
          className={`pb-3 font-bold border-b-2 transition whitespace-nowrap px-2 ${
            activeTab === 'related'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Grafik Dokumen Terkait
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-3 font-bold border-b-2 transition whitespace-nowrap px-2 ${
            activeTab === 'audit'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Log Audit & Keamanan
        </button>
      </div>

      {/* TAB CONTENT PANELS */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-white text-sm mb-2">Metadata Dokumen</h3>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Nomor Registrasi:</span>
              <span className="font-mono font-bold text-cyan-300">{doc.documentNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Perusahaan Pelanggan:</span>
              <span className="font-bold text-white">{doc.companyName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Nama Proyek Terkait:</span>
              <span className="font-semibold text-slate-200">{doc.projectName || 'Umum'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Kategori & Tipe Mime:</span>
              <span className="font-semibold text-slate-200">{doc.category} ({doc.mimeType})</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Ukuran File:</span>
              <span className="font-semibold text-slate-200">{doc.fileSize}</span>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-white text-sm mb-2">Akses & Keamanan</h3>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Klasifikasi Keamanan:</span>
              <span className="font-bold text-purple-300">{doc.classification}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Visibilitas Portal:</span>
              <span className="font-bold text-emerald-400">{doc.visibility}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Diunggah Oleh:</span>
              <span className="font-semibold text-slate-200">{doc.uploadedBy}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Jumlah Diunduh:</span>
              <span className="font-bold text-cyan-300">{doc.downloadCount} kali</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Masa Berlaku Masa Depan:</span>
              <span className="font-semibold text-amber-300">
                {doc.expiresAt ? new Date(doc.expiresAt).toLocaleDateString('id-ID') : 'Berlaku Selamanya'}
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'versions' && (
        <div className="space-y-6 text-xs">
          {/* New Version Upload Simulation Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
            <h3 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
              <History className="w-4 h-4 text-cyan-400" /> Unggah Versi Revisi Baru (Non-Destructive)
            </h3>
            <p className="text-slate-400 text-xs mb-4">
              Setiap unggahan versi baru akan secara otomatis mengarsipkan versi sebelumnya tanpa menghapus riwayat audit.
            </p>

            {addVerSuccess ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
                Versi baru berhasil ditambahkan ke riwayat dokumen!
              </div>
            ) : (
              <form onSubmit={handleAddVersion} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={newVerNum}
                  onChange={(e) => setNewVerNum(e.target.value)}
                  placeholder="Nomor Versi (misal: 2.1)"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  required
                />
                <input
                  type="text"
                  value={newVerDesc}
                  onChange={(e) => setNewVerDesc(e.target.value)}
                  placeholder="Catatan Ringkas Perubahan / Revisi"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  required
                />
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition"
                >
                  Tambah Versi Baru
                </button>
              </form>
            )}
          </div>

          {/* Versions Table */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-4">Versi</th>
                  <th className="p-4">Deskripsi Perubahan</th>
                  <th className="p-4">Diunggah Oleh</th>
                  <th className="p-4">Tanggal</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {doc.versions &&
                  doc.versions.map((ver, idx) => (
                    <tr key={ver.id} className="hover:bg-slate-800/30">
                      <td className="p-4 font-bold text-cyan-300">
                        v{ver.version} {idx === 0 && <span className="text-[10px] bg-cyan-500/10 px-2 py-0.5 rounded text-cyan-400 ml-1">Terbaru</span>}
                      </td>
                      <td className="p-4 text-slate-300">{ver.changeDescription}</td>
                      <td className="p-4 text-slate-400">{ver.uploadedBy}</td>
                      <td className="p-4 text-slate-400">{new Date(ver.createdAt).toLocaleDateString('id-ID')}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={handleDownload}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold"
                        >
                          Unduh
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'approvals' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-xs">
          <h3 className="font-bold text-white text-sm mb-4">Review & Approval Decision Matrix</h3>

          {doc.approvals && doc.approvals.length > 0 ? (
            <div className="space-y-3">
              {doc.approvals.map((app) => (
                <div key={app.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{app.reviewerName}</span>
                      <span className="text-slate-400">({app.reviewerRole || 'Reviewer'})</span>
                    </div>
                    <p className="text-slate-300 mt-1">"{app.comment}"</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-[11px]">
                      {app.status}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">{new Date(app.reviewedAt).toLocaleDateString('id-ID')}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-slate-400">Belum ada keputusan persetujuan tersimpan.</div>
          )}
        </div>
      )}

      {activeTab === 'contract' && doc.contractDetails && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-xs space-y-4">
          <h3 className="font-bold text-white text-sm">Status E-Signature & Keabsahan Kontrak</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <span className="text-slate-400 block mb-1">Nomor Perjanjian:</span>
              <span className="font-mono font-bold text-cyan-300">{doc.contractDetails.contractNumber}</span>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <span className="text-slate-400 block mb-1">Status Tanda Tangan:</span>
              <span className="font-bold text-emerald-400">{doc.contractDetails.signatureStatus}</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'related' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-xs text-center">
          <h3 className="font-bold text-white text-sm mb-2">Grafik Keterkaitan Dokumen (Related Graph)</h3>
          <p className="text-slate-400 mb-6">
            Rantai keterhubungan resmi dari proposal awal hingga serah terima proyek.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="p-3 bg-slate-950 border border-cyan-500/40 rounded-xl font-bold text-cyan-300">
              Proposal (SAI-PROP-2026-0001)
            </div>
            <span className="text-slate-500 font-bold">→</span>
            <div className="p-3 bg-slate-950 border border-cyan-500/40 rounded-xl font-bold text-amber-300">
              Quotation (SAI-QUO-2026-0001)
            </div>
            <span className="text-slate-500 font-bold">→</span>
            <div className="p-3 bg-slate-950 border border-cyan-500/40 rounded-xl font-bold text-cyan-300">
              Kontrak Induk (SAI-CON-2026-0001)
            </div>
            <span className="text-slate-500 font-bold">→</span>
            <div className="p-3 bg-slate-950 border border-cyan-500/40 rounded-xl font-bold text-rose-300">
              Invoices & Receipts
            </div>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-xs">
          <h3 className="font-bold text-white text-sm mb-4">Jejak Audit Security & Aktivitas Akses</h3>
          <div className="space-y-3">
            {doc.auditLogs &&
              doc.auditLogs.map((log) => (
                <div key={log.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-cyan-300 uppercase mr-2">[{log.action}]</span>
                    <span className="text-white font-medium">{log.performedBy}</span>
                    <div className="text-slate-400 text-[11px] mt-0.5">{log.details}</div>
                  </div>
                  <span className="text-slate-500 text-[10px]">{new Date(log.timestamp).toLocaleString('id-ID')}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#090d16] border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button onClick={() => setShareModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-white mb-2">Tautan Berbagi Terenkripsi</h3>
            <p className="text-xs text-slate-400 mb-4">
              Tautan berikut hanya dapat diakses oleh pihak yang berhak dan akan kedaluwarsa dalam 7 hari.
            </p>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-cyan-300 break-all mb-4">
              {shareUrl}
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                alert('Tautan berhasil disalin!');
                setShareModalOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition"
            >
              Salin Tautan
            </button>
          </div>
        </div>
      )}

      {/* AI ANALYST MODAL */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#090d16] border border-slate-800 rounded-2xl w-full max-w-xl p-6 relative shadow-2xl max-h-[85vh] overflow-y-auto no-scrollbar">
            <button onClick={() => setAiModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-6 h-6 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Gemini AI Document Analysis</h3>
            </div>

            {aiLoading ? (
              <div className="py-12 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
                <Sparkles className="w-6 h-6 text-cyan-400 animate-spin" />
                <span>Menganalisis dokumen dengan AI...</span>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                {aiAnalysis && (
                  <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl text-slate-200">
                    <h4 className="font-bold text-cyan-300 mb-1">Ringkasan</h4>
                    <p>{aiAnalysis.summary}</p>
                  </div>
                )}
                {aiCompareResult && (
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-slate-200">
                    <h4 className="font-bold text-white mb-1">Perbandingan Versi</h4>
                    <p>{aiCompareResult.summary}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </CustomerPortalLayout>
  );
};
