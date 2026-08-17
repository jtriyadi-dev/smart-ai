import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { AdminSupportLayout } from '../../components/admin/AdminSupportLayout';
import { SupportTicketService } from '../../services/SupportTicketService';
import { TicketMessageService } from '../../services/TicketMessageService';
import { TicketSLAService } from '../../services/TicketSLAService';
import { TicketAIService } from '../../services/TicketAIService';
import { Ticket, TicketStatus, TicketPriority, TicketMessage, TicketAttachment, SupportAgent } from '../../types';
import {
  LifeBuoy,
  ArrowLeft,
  Send,
  Upload,
  Lock,
  Eye,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  UserCheck,
  Tag,
  ShieldCheck,
  FileText,
  Copy,
  Check,
  Layers,
  Building2,
  FolderOpen,
  MessageSquare,
  Wrench,
  Bot
} from 'lucide-react';

export const AdminSupportDetailPage: React.FC = () => {
  const { navigate } = useRouter();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [agents, setAgents] = useState<SupportAgent[]>([]);

  // Messaging state
  const [replyText, setReplyText] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [replyAttachments, setReplyAttachments] = useState<TicketAttachment[]>([]);
  const [sendingMsg, setSendingMsg] = useState(false);

  // Status Change State
  const [statusInput, setStatusInput] = useState<TicketStatus>('OPEN');
  const [priorityInput, setPriorityInput] = useState<TicketPriority>('MEDIUM');
  const [assigneeInput, setAssigneeInput] = useState<string>('');

  // Modals / Dialogs for Resolution & Testing
  const [resolutionModalOpen, setResolutionModalOpen] = useState(false);
  const [resolutionSummary, setResolutionSummary] = useState('');
  const [resolutionFixVersion, setResolutionFixVersion] = useState('');

  const [testingModalOpen, setTestingModalOpen] = useState(false);
  const [testingFixVersion, setTestingFixVersion] = useState('v1.2.4-patch');
  const [testingNotes, setTestingNotes] = useState('Unit test & integration test passed pada staging environment.');

  // AI Assistant States
  const [aiActiveTab, setAiActiveTab] = useState<'ROOT_CAUSE' | 'RESPONSE' | 'FEATURE'>('RESPONSE');
  const [aiRootCause, setAiRootCause] = useState<any>(null);
  const [aiDraftReply, setAiDraftReply] = useState<string>('');
  const [aiLoading, setAiLoading] = useState(false);
  const [promptInstruction, setPromptInstruction] = useState('');

  // Extract ticket ID
  const pathParts = window.location.pathname.split('/');
  const ticketId = pathParts[pathParts.length - 1];

  useEffect(() => {
    loadData();
  }, [ticketId]);

  const loadData = () => {
    const t = SupportTicketService.getTicketById(ticketId, '', false);
    if (t) {
      setTicket(t);
      setStatusInput(t.status);
      setPriorityInput(t.priority);
      setAssigneeInput(t.assigneeId || '');

      const msgs = TicketMessageService.getConversation(t.id, '', false);
      setMessages(msgs);
    }
    const agList = SupportTicketService.getAgents();
    setAgents(agList);
  };

  if (!ticket) {
    return (
      <AdminSupportLayout activeTab="queue">
        <div className="p-12 text-center text-slate-400">
          <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-white mb-1">Ticket Not Found</h3>
          <button
            onClick={() => navigate('/admin/support/queue')}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold"
          >
            Kembali ke Queue
          </button>
        </div>
      </AdminSupportLayout>
    );
  }

  // Handle Status Update
  const handleStatusUpdate = (newStatus: TicketStatus) => {
    if (newStatus === 'RESOLVED') {
      setResolutionModalOpen(true);
      return;
    }
    if (newStatus === 'TESTING') {
      setTestingModalOpen(true);
      return;
    }

    SupportTicketService.updateTicketStatus(
      ticket.id,
      newStatus,
      'ADM-001',
      'System Admin',
      `Status diperbarui dari ${ticket.status} ke ${newStatus}`
    );
    loadData();
  };

  // Submit Resolution
  const handleResolutionSubmit = () => {
    if (!resolutionSummary.trim()) return;

    SupportTicketService.resolveTicket(
      ticket.id,
      'ADM-001',
      'System Admin',
      resolutionSummary,
      resolutionFixVersion || undefined
    );

    setResolutionModalOpen(false);
    loadData();
  };

  // Submit Testing Status
  const handleTestingSubmit = () => {
    SupportTicketService.updateTicketStatus(
      ticket.id,
      'TESTING',
      'ADM-001',
      'System Admin',
      `Memindahkan ticket ke fase Testing Staging. Fix Version: ${testingFixVersion}`
    );

    setTestingModalOpen(false);
    loadData();
  };

  // Assignee Update
  const handleAssigneeChange = (agId: string) => {
    const ag = agents.find((a) => a.id === agId);
    if (ag) {
      SupportTicketService.assignTicket(ticket.id, ag.id, 'ADM-001', 'System Admin');
      loadData();
    }
  };

  // Priority Update
  const handlePriorityChange = (p: TicketPriority) => {
    SupportTicketService.updateTicketPriority(ticket.id, p, 'ADM-001', 'System Admin');
    loadData();
  };

  // Send Message / Internal Note
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() && replyAttachments.length === 0) return;

    setSendingMsg(true);

    setTimeout(() => {
      TicketMessageService.sendMessage(
        ticket.id,
        'ADM-001',
        'System Admin',
        'Senior Support Engineer',
        'SUPPORT',
        replyText,
        isInternalNote ? 'INTERNAL_NOTE' : 'SUPPORT_REPLY',
        isInternalNote ? 'INTERNAL' : 'CUSTOMER_VISIBLE',
        replyAttachments
      );

      setReplyText('');
      setReplyAttachments([]);
      setSendingMsg(false);
      loadData();
    }, 300);
  };

  // AI Assistant Triggers
  const handleGenerateAiResponse = async () => {
    setAiLoading(true);
    const result = await TicketAIService.suggestResponse(ticket, promptInstruction);
    setAiDraftReply(result.draftReply);
    setAiLoading(false);
  };

  const handleAnalyzeRootCause = async () => {
    setAiLoading(true);
    const res = await TicketAIService.analyzeRootCause(ticket);
    setAiRootCause(res);
    setAiLoading(false);
  };

  return (
    <AdminSupportLayout activeTab="queue">
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/support/queue')}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {ticket.ticketNumber}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {ticket.status}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300">
                  {ticket.priority}
                </span>
              </div>
              <h1 className="text-lg font-bold text-white">{ticket.subject}</h1>
            </div>
          </div>

          {/* Quick Action Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Selector */}
            <select
              value={ticket.status}
              onChange={(e) => handleStatusUpdate(e.target.value as TicketStatus)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-cyan-500"
            >
              <option value="OPEN">OPEN</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="WAITING_FOR_CUSTOMER">WAITING_FOR_CUSTOMER</option>
              <option value="TESTING">TESTING</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="CLOSED">CLOSED</option>
            </select>

            {/* Priority Selector */}
            <select
              value={ticket.priority}
              onChange={(e) => handlePriorityChange(e.target.value as TicketPriority)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold focus:outline-none focus:border-cyan-500"
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
              <option value="URGENT">URGENT</option>
            </select>

            {/* Assignee Selector */}
            <select
              value={ticket.assigneeId || ''}
              onChange={(e) => handleAssigneeChange(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
            >
              <option value="">-- Unassigned --</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.role})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Workspace (2 cols): Thread + Internal Note / Reply Box */}
          <div className="lg:col-span-2 space-y-6">
            {/* Conversation Thread */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" /> Ticket Messages & Internal Thread
                </h3>
                <span className="text-xs text-slate-400 font-medium">{messages.length} Total Messages</span>
              </div>

              <div className="space-y-4">
                {messages.map((m) => {
                  const isInternal = m.visibility === 'INTERNAL' || m.messageType === 'INTERNAL_NOTE';
                  const isSupport = m.senderType === 'SUPPORT';

                  return (
                    <div
                      key={m.id}
                      className={`p-4 rounded-2xl border space-y-2 shadow-md ${
                        isInternal
                          ? 'bg-amber-950/40 border-amber-500/40 text-amber-100'
                          : isSupport
                          ? 'bg-slate-950 border-slate-800 text-slate-200'
                          : 'bg-cyan-950/50 border-cyan-500/30 text-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] border-b border-slate-800/60 pb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-cyan-300">
                            {m.senderName} ({m.senderRole || m.senderType})
                          </span>
                          {isInternal && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                              <Lock className="w-3 h-3" /> INTERNAL NOTE - HIDDEN FROM CUSTOMER
                            </span>
                          )}
                        </div>
                        <span className="text-slate-500">{new Date(m.createdAt).toLocaleString('id-ID')}</span>
                      </div>

                      <p className="text-xs leading-relaxed whitespace-pre-wrap">{m.message}</p>
                    </div>
                  );
                })}
              </div>

              {/* REPLY & INTERNAL NOTE BOX */}
              <form onSubmit={handleSendMessage} className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsInternalNote(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      !isInternalNote
                        ? 'bg-cyan-500 text-slate-950 shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" /> Send Reply to Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsInternalNote(true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      isInternalNote
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" /> Add Internal Note (Team Only)
                  </button>
                </div>

                <textarea
                  rows={4}
                  placeholder={
                    isInternalNote
                      ? 'Ketik catatan internal khusus tim (tidak akan terlihat oleh customer)...'
                      : 'Ketik balasan resmi untuk customer...'
                  }
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className={`w-full border rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none ${
                    isInternalNote
                      ? 'bg-amber-950/20 border-amber-500/40 focus:border-amber-400'
                      : 'bg-slate-950 border-slate-800 focus:border-cyan-500'
                  }`}
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-500">
                    {isInternalNote ? 'Catatan disimpan secara privat.' : 'Pesan akan terkirim ke Portal & Email Customer.'}
                  </span>
                  <button
                    type="submit"
                    disabled={sendingMsg || !replyText.trim()}
                    className={`px-5 py-2 rounded-xl text-slate-950 font-bold text-xs shadow-lg transition flex items-center gap-2 disabled:opacity-50 ${
                      isInternalNote ? 'bg-amber-500 hover:bg-amber-400' : 'bg-cyan-500 hover:bg-cyan-400'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" /> {isInternalNote ? 'Simpan Catatan Internal' : 'Kirim Reply Customer'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* AI Assistant & Copilot Panel (1 col) */}
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> AI Support Copilot (Gemini AI)
                </h3>
              </div>

              {/* Copilot Tabs */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => {
                    setAiActiveTab('RESPONSE');
                    if (!aiDraftReply) handleGenerateAiResponse();
                  }}
                  className={`p-2 rounded-lg font-bold text-center transition ${
                    aiActiveTab === 'RESPONSE'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  AI Draft Reply
                </button>
                <button
                  onClick={() => {
                    setAiActiveTab('ROOT_CAUSE');
                    if (!aiRootCause) handleAnalyzeRootCause();
                  }}
                  className={`p-2 rounded-lg font-bold text-center transition ${
                    aiActiveTab === 'ROOT_CAUSE'
                      ? 'bg-purple-500 text-slate-950'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Root Cause Analysis
                </button>
              </div>

              {/* AI Draft Response View */}
              {aiActiveTab === 'RESPONSE' && (
                <div className="space-y-3 pt-2">
                  <input
                    type="text"
                    placeholder="Instruksi tambahan untuk AI (e.g. Infokan patch v1.2.4 akan rilis besok)..."
                    value={promptInstruction}
                    onChange={(e) => setPromptInstruction(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white placeholder-slate-500"
                  />

                  <button
                    onClick={handleGenerateAiResponse}
                    disabled={aiLoading}
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-md flex items-center justify-center gap-2"
                  >
                    <Bot className="w-4 h-4" /> Generate Response Draft
                  </button>

                  {aiDraftReply && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-[10px] text-cyan-400 font-bold uppercase">Draft Balasan AI:</div>
                      <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{aiDraftReply}</p>
                      <button
                        onClick={() => {
                          setReplyText(aiDraftReply);
                          setIsInternalNote(false);
                        }}
                        className="w-full py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 font-bold text-xs transition flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" /> Gunakan Draft ke Box Balasan
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Root Cause View */}
              {aiActiveTab === 'ROOT_CAUSE' && aiRootCause && (
                <div className="space-y-3 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-bold text-purple-300">Ringkasan Analisis:</div>
                    <p className="text-slate-300">{aiRootCause.summary}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-bold text-amber-300">Kemungkinan Penyebab Utama:</div>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      {aiRootCause.possibleCauses.map((c: string, i: number) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-bold text-emerald-300">Rekomendasi Perbaikan:</div>
                    <p className="text-slate-300">{aiRootCause.recommendedFix}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RESOLUTION MODAL */}
      {resolutionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Resolve Support Ticket
            </h3>
            <p className="text-xs text-slate-300">
              Masukkan Ringkasan Solusi (Resolution Summary) yang akan disampaikan kepada customer.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Ringkasan Solusi <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Jelaskan tindakan perbaikan yang telah diterapkan..."
                value={resolutionSummary}
                onChange={(e) => setResolutionSummary(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Patch / Fix Version (Opsional)
              </label>
              <input
                type="text"
                placeholder="e.g. v1.2.4-patch"
                value={resolutionFixVersion}
                onChange={(e) => setResolutionFixVersion(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setResolutionModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleResolutionSubmit}
                disabled={!resolutionSummary.trim()}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition disabled:opacity-50"
              >
                Konfirmasi Resolve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TESTING MODAL */}
      {testingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" /> Move to Testing Phase
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Fix Version / Build Number
              </label>
              <input
                type="text"
                value={testingFixVersion}
                onChange={(e) => setTestingFixVersion(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Catatan Pengujian Staging
              </label>
              <textarea
                rows={3}
                value={testingNotes}
                onChange={(e) => setTestingNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setTestingModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleTestingSubmit}
                className="px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs shadow-lg transition"
              >
                Set Status to Testing
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminSupportLayout>
  );
};
