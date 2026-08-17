import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus, LeadPriority } from '../../types';
import { LeadService } from '../../services/leadService';
import { WhatsAppButton } from '../common/WhatsAppButton';
import {
  X,
  User,
  Building,
  Mail,
  Phone,
  Sparkles,
  Clock,
  MessageSquare,
  Send,
  FileText,
  Shield,
  Layers,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface LeadDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onUpdateLead: (updated: Lead) => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  isOpen,
  onClose,
  lead,
  onUpdateLead
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ai_summary' | 'timeline' | 'notes'>('overview');
  const [newNote, setNewNote] = useState<string>('');
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(false);

  useEffect(() => {
    if (lead && activeTab === 'ai_summary' && !aiSummary) {
      fetchAISummary();
    }
  }, [lead, activeTab]);

  if (!isOpen || !lead) return null;

  const fetchAISummary = async () => {
    setIsLoadingSummary(true);
    try {
      const res = await fetch(`/api/leads/${lead.id}/ai-summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setAiSummary(json.data);
        }
      }
    } catch (e) {
      console.warn('Failed fetching AI summary:', e);
    } finally {
      setIsLoadingSummary(false);
    }
  };

  const handleStatusChange = (newStatus: LeadStatus) => {
    const updated = LeadService.updateLeadStatus(lead.id, newStatus);
    if (updated) onUpdateLead(updated);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const note = LeadService.addLeadNote(lead.id, newNote, 'Admin');
    if (note) {
      const refreshed = LeadService.getLeadsLocal().find((l) => l.id === lead.id);
      if (refreshed) onUpdateLead(refreshed);
      setNewNote('');
    }
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'New': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'Contacted': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'Qualified': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Consultation Scheduled': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Proposal Sent': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Won': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Lost': return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-slate-800 bg-slate-950/80 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-black text-white">{lead.name}</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/40">
                {lead.referenceCode}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {lead.company} • {lead.industry} • Source: <strong className="text-slate-200">{lead.source}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={lead.status}
              onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold focus:outline-none bg-slate-950 ${getStatusBadge(lead.status)}`}
            >
              <option value="New">Status: New</option>
              <option value="Contacted">Status: Contacted</option>
              <option value="Qualified">Status: Qualified</option>
              <option value="Consultation Scheduled">Status: Consultation Scheduled</option>
              <option value="Proposal Sent">Status: Proposal Sent</option>
              <option value="Negotiation">Status: Negotiation</option>
              <option value="Won">Status: Won</option>
              <option value="Lost">Status: Lost</option>
            </select>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 px-6 border-b border-slate-800 bg-slate-950/40 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Lead Overview
          </button>
          <button
            onClick={() => setActiveTab('ai_summary')}
            className={`py-3 px-4 font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'ai_summary' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Lead Executive Summary</span>
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-3 px-4 font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'timeline' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Activity Timeline ({lead.activities.length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-4 font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'notes' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Internal Notes ({lead.notes?.length || 0})
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Score & Priority Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">AI Lead Score</span>
                  <div className="text-xl font-black text-amber-400 flex items-center gap-2">
                    <span>{lead.score.totalScore}/100</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                      {lead.score.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{lead.score.explanation}</p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Priority & Assignment</span>
                  <p className="text-sm font-bold text-white mb-1">Priority: {lead.priority}</p>
                  <p className="text-xs text-slate-400">Assigned: <strong className="text-purple-300">{lead.assignedTo}</strong></p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Quick Action</span>
                  <WhatsAppButton
                    source="Lead Admin Modal"
                    contextData={{ name: lead.name, referenceCode: lead.referenceCode }}
                    variant="Primary"
                    size="sm"
                    label="Hubungi Klien via WA"
                    className="w-full justify-center"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Kontak & Perusahaan</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Email:</span>
                    <span className="font-mono">{lead.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">WhatsApp:</span>
                    <span className="font-mono">{lead.whatsapp || lead.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Ukuran Perusahaan:</span>
                    <span>{lead.companySize}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Layanan:</span>
                    <span>{lead.service}</span>
                  </div>
                </div>
              </div>

              {/* Estimate Summary if available */}
              {lead.estimateSummary && (
                <div className="bg-purple-950/20 p-4 rounded-2xl border border-purple-800/30">
                  <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">Attached AI Estimate Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Judul Proyek:</span>
                      <strong className="text-white">{lead.estimateSummary.title}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Timeline Range:</span>
                      <strong className="text-amber-300">{lead.estimateSummary.timeline}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Kisaran Investasi:</span>
                      <strong className="text-emerald-400 font-mono">{lead.estimateSummary.investment}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Message / Application details */}
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Pesan & Kebutuhan Proyek</h4>
                <p className="text-slate-300 leading-relaxed font-mono text-[11px] whitespace-pre-line">
                  {lead.message || lead.applicationDetails?.businessProblem || 'Tidak ada catatan pesan tambahan.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'ai_summary' && (
            <div className="space-y-4">
              {isLoadingSummary ? (
                <div className="text-center py-12 text-slate-400">
                  <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto mb-2" />
                  <p>Membuat AI Lead Executive Summary...</p>
                </div>
              ) : aiSummary ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-purple-950/20 p-4 rounded-2xl border border-purple-800/30">
                    <h4 className="font-bold text-purple-300 mb-1 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Executive Summary Prospek</span>
                    </h4>
                    <p className="text-slate-300 leading-relaxed">{aiSummary.projectSummary}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                      <strong className="text-slate-400 block mb-1">Masalah Bisnis Utama:</strong>
                      <p className="text-slate-200">{aiSummary.businessProblem}</p>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                      <strong className="text-slate-400 block mb-1">Solusi & Modul Diusulkan:</strong>
                      <p className="text-slate-200">{aiSummary.requestedSolution}</p>
                    </div>
                  </div>

                  <div className="bg-emerald-950/20 p-4 rounded-2xl border border-emerald-800/30">
                    <strong className="text-emerald-400 block mb-1">Rekomendasi Tindakan Selanjutnya (AI Recommendation):</strong>
                    <p className="text-slate-200 font-semibold">{aiSummary.recommendedNextAction}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  Ringkasan AI belum dibuat. Klik muat ulang.
                </div>
              )}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
              {lead.activities.map((act) => (
                <div key={act.id} className="relative pl-8 bg-slate-950/40 p-3 rounded-2xl border border-slate-800">
                  <div className="absolute left-2 top-3.5 w-3 h-3 rounded-full bg-purple-500 border-2 border-slate-900" />
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white">{act.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(act.timestamp).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{act.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Tambah catatan internal..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Simpan Note</span>
                </button>
              </form>

              <div className="space-y-2">
                {(!lead.notes || lead.notes.length === 0) ? (
                  <p className="text-slate-500 text-center py-6">Belum ada catatan internal.</p>
                ) : (
                  lead.notes.map((note) => (
                    <div key={note.id} className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <strong className="text-purple-300">{note.author}</strong>
                        <span className="font-mono">{new Date(note.timestamp).toLocaleString('id-ID')}</span>
                      </div>
                      <p className="text-slate-200">{note.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
