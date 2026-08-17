import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalLayout } from '../../components/portal/CustomerPortalLayout';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { SupportTicketService } from '../../services/SupportTicketService';
import { TicketMessageService } from '../../services/TicketMessageService';
import { TicketSLAService } from '../../services/TicketSLAService';
import { SupportNotificationService } from '../../services/SupportNotificationService';
import { Ticket, TicketMessage, TicketAttachment } from '../../types';
import {
  LifeBuoy,
  ArrowLeft,
  Send,
  Upload,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Star,
  MessageSquare,
  ShieldCheck,
  FolderOpen,
  Layers,
  User,
  Building2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Download,
  Info
} from 'lucide-react';

export const CustomerTicketDetailPage: React.FC = () => {
  const { navigate } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [replyText, setReplyText] = useState('');
  const [replyAttachments, setReplyAttachments] = useState<TicketAttachment[]>([]);
  const [submittingReply, setSubmittingReply] = useState(false);

  // Modals
  const [csatModalOpen, setCsatModalOpen] = useState(false);
  const [csatRating, setCsatRating] = useState(5);
  const [csatFeedback, setCsatFeedback] = useState('');

  const [reopenModalOpen, setReopenModalOpen] = useState(false);
  const [reopenReason, setReopenReason] = useState('');

  const [sidebarCollapsedMobile, setSidebarCollapsedMobile] = useState(true);

  // Extract ID from path e.g. /portal/support/TCK-2026-000001 or /portal/tickets/TCK-2026-000001
  const pathParts = window.location.pathname.split('/');
  const ticketIdFromUrl = pathParts[pathParts.length - 1];

  useEffect(() => {
    const s = CustomerPortalService.getCurrentSession();
    if (s) {
      setSession(s);
      loadTicketDetails(s.company.id);
    }
  }, [ticketIdFromUrl]);

  const loadTicketDetails = (companyId: string) => {
    const t = SupportTicketService.getTicketById(ticketIdFromUrl, companyId, true);
    if (t) {
      setTicket(t);
      // Get conversation filtered for customer
      const msgs = TicketMessageService.getConversation(t.id, companyId, true);
      setMessages(msgs);
    }
  };

  if (!session) return null;

  if (!ticket) {
    return (
      <CustomerPortalLayout activePath="/portal/tickets">
        <div className="p-12 text-center text-slate-400">
          <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-white mb-1">Ticket Not Found</h3>
          <p className="text-xs text-slate-500 mb-4">
            Ticket dengan ID {ticketIdFromUrl} tidak ditemukan atau Anda tidak memiliki hak akses.
          </p>
          <button
            onClick={() => navigate('/portal/tickets')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Kembali ke Ticket List
          </button>
        </div>
      </CustomerPortalLayout>
    );
  }

  // SLA Calculation
  const sla = TicketSLAService.getSLAStatus(ticket);
  const slaColors = TicketSLAService.getSLAColorClasses(sla.status);

  // Upload attachment for reply
  const handleReplyFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newAtt: TicketAttachment = {
        id: `ATT-${Date.now()}`,
        name: file.name,
        fileName: file.name,
        url: URL.createObjectURL(file),
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        uploadedBy: session.user.id,
        uploadedByName: session.user.name,
        isScanned: true,
        scanStatus: 'CLEAN',
        createdAt: new Date().toISOString()
      };
      setReplyAttachments((prev) => [...prev, newAtt]);
    }
  };

  // Submit Reply
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() && replyAttachments.length === 0) return;

    setSubmittingReply(true);

    setTimeout(() => {
      TicketMessageService.sendMessage(
        ticket.id,
        session.user.id,
        session.user.name,
        'Customer User',
        'CUSTOMER',
        replyText,
        'CUSTOMER_REPLY',
        'CUSTOMER_VISIBLE',
        replyAttachments
      );

      setReplyText('');
      setReplyAttachments([]);
      setSubmittingReply(false);
      loadTicketDetails(session.company.id);
    }, 400);
  };

  // Confirm Resolution
  const handleConfirmResolution = () => {
    setCsatModalOpen(true);
  };

  const handleCSATSubmit = () => {
    SupportTicketService.submitCSAT(ticket.id, csatRating, csatFeedback);
    SupportTicketService.updateTicketStatus(
      ticket.id,
      'CLOSED',
      session.user.id,
      session.user.name,
      'Customer dikonfirmasi telah puas dengan solusi dan menutup ticket.'
    );

    setCsatModalOpen(false);
    loadTicketDetails(session.company.id);
  };

  // Reopen Ticket
  const handleReopenSubmit = () => {
    if (!reopenReason.trim()) return;

    SupportTicketService.updateTicketStatus(
      ticket.id,
      'REOPENED',
      session.user.id,
      session.user.name,
      `Customer melakukan Reopen Ticket. Alasan: ${reopenReason}`
    );

    // Add customer reply explaining reopen reason
    TicketMessageService.sendMessage(
      ticket.id,
      session.user.id,
      session.user.name,
      'Customer User',
      'CUSTOMER',
      `Reopen Ticket Requested: ${reopenReason}`,
      'CUSTOMER_REPLY',
      'CUSTOMER_VISIBLE'
    );

    setReopenModalOpen(false);
    setReopenReason('');
    loadTicketDetails(session.company.id);
  };

  return (
    <CustomerPortalLayout activePath="/portal/tickets">
      {/* Top Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/portal/tickets')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                {ticket.ticketNumber}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {SupportTicketService.getCustomerStatusLabel(ticket.status)}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                {ticket.priority}
              </span>
            </div>
            <h1 className="text-lg font-bold text-white">{ticket.subject}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={SupportNotificationService.getWhatsAppSupportUrl(ticket.ticketNumber, ticket.subject)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Support
          </a>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Left Content: Resolution Banner, Testing Info, Thread, Reply Box (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* RESOLVED BANNER WITH ACTION BUTTONS */}
          {ticket.status === 'RESOLVED' && (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-200 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" /> Support Ticket Solved / Resolved
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tim Support SMART-AI.ID telah menyelesaikan penanganan ticket ini.
              </p>
              {ticket.resolution && (
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                  <div className="font-semibold text-emerald-300">Ringkasan Solusi (Resolution Summary):</div>
                  <p className="text-slate-300">{ticket.resolution.summary}</p>
                  {ticket.resolution.fixVersion && (
                    <div className="text-[10px] text-slate-500 mt-1">
                      Versi Rilis Patch: <span className="text-cyan-400 font-mono font-bold">{ticket.resolution.fixVersion}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={handleConfirmResolution}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Konfirmasi Solusi & Beri Rating
                </button>
                <button
                  onClick={() => setReopenModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Issue Masih Terjadi (Reopen)
                </button>
              </div>
            </div>
          )}

          {/* TESTING STATUS INFO BANNER */}
          {ticket.status === 'TESTING' && (
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs space-y-2">
              <div className="font-bold flex items-center gap-2 text-purple-300">
                <Sparkles className="w-4 h-4 text-purple-400" /> Testing Phase In Progress
              </div>
              <p className="text-slate-300 leading-relaxed">
                Fix code / patch telah dibuat oleh Tim Developer dan saat ini sedang menjalani pengujian otomatis QA & verifikasi di environment Staging.
              </p>
            </div>
          )}

          {/* CONVERSATION THREAD */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 pb-4 border-b border-slate-800">
              <MessageSquare className="w-4 h-4 text-cyan-400" /> Percakapan & Update Thread ({messages.length})
            </h2>

            <div className="space-y-4">
              {messages.map((m) => {
                const isCustomer = m.senderType === 'CUSTOMER';
                const isSystem = m.senderType === 'SYSTEM';

                if (isSystem) {
                  return (
                    <div key={m.id} className="text-center my-3">
                      <span className="px-3 py-1 rounded-full bg-slate-800/80 text-[11px] font-medium text-slate-400 border border-slate-700/50 inline-block">
                        {m.message}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 space-y-2 shadow-md ${
                        isCustomer
                          ? 'bg-cyan-950/60 border border-cyan-500/30 text-slate-100 rounded-tr-none'
                          : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 text-[11px] text-slate-400 border-b border-slate-800/60 pb-1.5">
                        <span className="font-bold text-cyan-300">
                          {m.senderName} {m.senderRole ? `(${m.senderRole})` : ''}
                        </span>
                        <span>{new Date(m.createdAt).toLocaleString('id-ID')}</span>
                      </div>

                      <p className="text-xs leading-relaxed whitespace-pre-wrap">{m.message}</p>

                      {/* Attachments */}
                      {m.attachments && m.attachments.length > 0 && (
                        <div className="pt-2 border-t border-slate-800/60 space-y-1">
                          <div className="text-[10px] text-slate-400 font-semibold">Lampiran File:</div>
                          {m.attachments.map((att, idx) => (
                            <a
                              key={idx}
                              href={att.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs text-cyan-400 transition"
                            >
                              <span className="truncate">{att.name || att.fileName}</span>
                              <Download className="w-3.5 h-3.5 shrink-0 ml-2 text-slate-400" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* REPLY INPUT BOX */}
            {ticket.status !== 'CLOSED' ? (
              <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-800 space-y-3">
                <textarea
                  rows={3}
                  placeholder="Ketik balasan atau pesan Anda untuk Tim Support SMART-AI.ID..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      id="reply-attachment-input"
                      onChange={handleReplyFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="reply-attachment-input"
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5 text-cyan-400" /> Tambah Lampiran
                    </label>
                    {replyAttachments.length > 0 && (
                      <span className="text-[11px] text-cyan-400 font-medium">
                        {replyAttachments.length} file terlampir
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submittingReply || (!replyText.trim() && replyAttachments.length === 0)}
                    className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition flex items-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" /> Kirim Balasan
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-500">
                Ticket ini berstatus CLOSED. Percakapan telah ditutup secara permanen.
              </div>
            )}
          </div>

          {/* TIMELINE AUDIT LOG */}
          {ticket.timeline && ticket.timeline.length > 0 && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" /> Ticket Activity Timeline
              </h3>
              <div className="space-y-3 relative pl-4 border-l border-slate-800">
                {ticket.timeline.map((event, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-500 border-2 border-slate-900" />
                    <div className="text-xs font-bold text-slate-200">{event.title}</div>
                    <div className="text-[11px] text-slate-400">{event.description}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {new Date(event.date).toLocaleString('id-ID')} {event.author ? `• oleh ${event.author}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar Information Panel (1 col) */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" /> Information Sidebar
              </h3>
              <button
                onClick={() => setSidebarCollapsedMobile(!sidebarCollapsedMobile)}
                className="md:hidden text-slate-400 p-1"
              >
                {sidebarCollapsedMobile ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </div>

            <div className={`space-y-3 text-xs ${sidebarCollapsedMobile ? 'hidden md:block' : 'block'}`}>
              <div>
                <span className="text-slate-500 text-[11px]">Nomor Ticket</span>
                <div className="font-mono font-bold text-cyan-400">{ticket.ticketNumber}</div>
              </div>

              <div>
                <span className="text-slate-500 text-[11px]">Perusahaan & Customer</span>
                <div className="font-medium text-slate-200">{ticket.companyName || session.company.name}</div>
                <div className="text-[11px] text-slate-400">{ticket.customerUserName}</div>
              </div>

              <div>
                <span className="text-slate-500 text-[11px]">Project & Modul Terkait</span>
                <div className="font-medium text-slate-200 flex items-center gap-1">
                  <FolderOpen className="w-3.5 h-3.5 text-cyan-400" /> {ticket.projectName || 'General'}
                </div>
                {ticket.moduleName && (
                  <div className="text-[11px] text-purple-400 flex items-center gap-1 mt-0.5">
                    <Layers className="w-3.5 h-3.5" /> Modul: {ticket.moduleName}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <div>
                  <span className="text-slate-500 text-[10px]">Kategori</span>
                  <div className="font-semibold text-slate-200">{SupportTicketService.getCategoryLabel(ticket.category)}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px]">Prioritas</span>
                  <div className="font-semibold text-amber-400">{ticket.priority}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-500 text-[10px]">Assignee Support Agent</span>
                <div className="font-semibold text-cyan-300 flex items-center gap-1.5 mt-0.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" /> {ticket.assigneeName || 'Menunggu Penugasan'}
                </div>
              </div>

              {/* SLA Target */}
              {ticket.status !== 'RESOLVED' && ticket.status !== 'CLOSED' && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 font-medium">SLA Target Response:</div>
                  <div className={`text-xs font-bold ${slaColors.text} flex items-center gap-1`}>
                    <Clock className="w-3.5 h-3.5" /> {sla.displayLabel}
                  </div>
                </div>
              )}

              <div>
                <span className="text-slate-500 text-[10px]">Waktu Dibuat</span>
                <div className="text-slate-400">{new Date(ticket.createdAt).toLocaleString('id-ID')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSAT MODAL */}
      {csatModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white text-center">Tingkat Kepuasan Layanan (CSAT)</h3>
            <p className="text-xs text-slate-300 text-center">
              Bagaimana pengalaman Anda terkait penanganan ticket #{ticket.ticketNumber}?
            </p>

            {/* Stars */}
            <div className="flex justify-center items-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setCsatRating(star)}
                  className={`p-2 transition ${csatRating >= star ? 'text-amber-400 scale-110' : 'text-slate-700'}`}
                >
                  <Star className="w-7 h-7 fill-current" />
                </button>
              ))}
            </div>

            <textarea
              rows={3}
              placeholder="Masukan atau umpan balik Anda untuk tim kami (opsional)..."
              value={csatFeedback}
              onChange={(e) => setCsatFeedback(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setCsatModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleCSATSubmit}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition"
              >
                Kirim & Tutup Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REOPEN MODAL */}
      {reopenModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-400" /> Reopen Support Ticket
            </h3>
            <p className="text-xs text-slate-300">
              Jelaskan alasan reopening jika kendala masih terjadi atau perbaikan belum sepenuhnya menyelesaikan masalah.
            </p>

            <textarea
              required
              rows={4}
              placeholder="Jelaskan bagian kendala yang belum teratasi..."
              value={reopenReason}
              onChange={(e) => setReopenReason(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setReopenModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleReopenSubmit}
                disabled={!reopenReason.trim()}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition disabled:opacity-50"
              >
                Konfirmasi Reopen
              </button>
            </div>
          </div>
        </div>
      )}
    </CustomerPortalLayout>
  );
};
