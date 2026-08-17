import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalLayout } from '../../components/portal/CustomerPortalLayout';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { SupportTicketService } from '../../services/SupportTicketService';
import { TicketSLAService } from '../../services/TicketSLAService';
import { SupportNotificationService } from '../../services/SupportNotificationService';
import { Ticket, TicketCategory, TicketStatus } from '../../types';
import {
  LifeBuoy,
  PlusCircle,
  Search,
  Filter,
  ArrowRight,
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Building2,
  FileText,
  ExternalLink,
  BookOpen,
  Sparkles,
  Layers,
  HelpCircle,
  FolderOpen
} from 'lucide-react';

export const CustomerTicketsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  useEffect(() => {
    const s = CustomerPortalService.getCurrentSession();
    if (s) {
      setSession(s);
      loadTickets(s.company.id);
    }
  }, []);

  const loadTickets = (companyId: string) => {
    const list = SupportTicketService.getTickets(companyId, true);
    setTickets(list);
  };

  if (!session) return null;

  // Filtered Tickets
  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.projectName && t.projectName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.moduleName && t.moduleName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'ALL' || t.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'ALL' ||
      t.status === selectedStatus ||
      (selectedStatus === 'WAITING_FOR_CUSTOMER' && (t.status === 'WAITING_FOR_CUSTOMER' || t.status === 'WAITING_CUSTOMER'));

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate stats dynamically from DB/service
  const totalCount = tickets.length;
  const openCount = tickets.filter((t) => t.status === 'OPEN').length;
  const inProgressCount = tickets.filter((t) => t.status === 'IN_PROGRESS').length;
  const waitingResponseCount = tickets.filter((t) => t.status === 'WAITING_FOR_CUSTOMER' || t.status === 'WAITING_CUSTOMER').length;
  const testingCount = tickets.filter((t) => t.status === 'TESTING').length;
  const resolvedCount = tickets.filter((t) => t.status === 'RESOLVED').length;
  const closedCount = tickets.filter((t) => t.status === 'CLOSED').length;

  const getStatusBadge = (status: TicketStatus) => {
    const label = SupportTicketService.getCustomerStatusLabel(status);
    switch (status) {
      case 'OPEN':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/30">{label}</span>;
      case 'IN_PROGRESS':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">{label}</span>;
      case 'WAITING_FOR_CUSTOMER':
      case 'WAITING_CUSTOMER':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">{label}</span>;
      case 'TESTING':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/30">{label}</span>;
      case 'RESOLVED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">{label}</span>;
      case 'CLOSED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-800 text-slate-400 border border-slate-700">{label}</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-800 text-slate-300">{label}</span>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">URGENT</span>;
      case 'HIGH':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">HIGH</span>;
      case 'MEDIUM':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">MEDIUM</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-400 border border-slate-700">LOW</span>;
    }
  };

  return (
    <CustomerPortalLayout activePath="/portal/tickets">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <LifeBuoy className="w-6 h-6 text-emerald-400" /> Support Ticket Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pusat bantuan teknis, pelaporan kendala, penanganan bug & pengajuan fitur untuk {session.company.name}.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={SupportNotificationService.getWhatsAppSupportUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" /> Helpdesk WhatsApp
          </a>
          <button
            onClick={() => navigate('/portal/support/new')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg transition flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Create Support Ticket
          </button>
        </div>
      </div>

      {/* KPI Cards Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div
          onClick={() => setSelectedStatus('OPEN')}
          className={`p-4 rounded-xl border transition cursor-pointer ${
            selectedStatus === 'OPEN'
              ? 'bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-[11px] text-slate-400 font-medium">Open Tickets</div>
          <div className="text-2xl font-bold text-blue-400 mt-1">{openCount}</div>
        </div>

        <div
          onClick={() => setSelectedStatus('IN_PROGRESS')}
          className={`p-4 rounded-xl border transition cursor-pointer ${
            selectedStatus === 'IN_PROGRESS'
              ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-[11px] text-slate-400 font-medium">In Progress</div>
          <div className="text-2xl font-bold text-cyan-400 mt-1">{inProgressCount}</div>
        </div>

        <div
          onClick={() => setSelectedStatus('WAITING_FOR_CUSTOMER')}
          className={`p-4 rounded-xl border transition cursor-pointer ${
            selectedStatus === 'WAITING_FOR_CUSTOMER'
              ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-[11px] text-slate-400 font-medium truncate">Waiting Response</div>
          <div className="text-2xl font-bold text-amber-400 mt-1">{waitingResponseCount}</div>
        </div>

        <div
          onClick={() => setSelectedStatus('TESTING')}
          className={`p-4 rounded-xl border transition cursor-pointer ${
            selectedStatus === 'TESTING'
              ? 'bg-purple-500/10 border-purple-500/50 shadow-lg shadow-purple-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-[11px] text-slate-400 font-medium">Testing</div>
          <div className="text-2xl font-bold text-purple-400 mt-1">{testingCount}</div>
        </div>

        <div
          onClick={() => setSelectedStatus('RESOLVED')}
          className={`p-4 rounded-xl border transition cursor-pointer ${
            selectedStatus === 'RESOLVED'
              ? 'bg-emerald-500/10 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-[11px] text-slate-400 font-medium">Resolved</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{resolvedCount}</div>
        </div>

        <div
          onClick={() => setSelectedStatus('CLOSED')}
          className={`p-4 rounded-xl border transition cursor-pointer ${
            selectedStatus === 'CLOSED'
              ? 'bg-slate-800 border-slate-600'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-[11px] text-slate-400 font-medium">Closed</div>
          <div className="text-2xl font-bold text-slate-300 mt-1">{closedCount}</div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nomor ticket (SAI-TKT-...), subjek, deskripsi, project, modul..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          {/* Reset button */}
          {(selectedCategory !== 'ALL' || selectedStatus !== 'ALL' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSelectedStatus('ALL');
                setSearchQuery('');
              }}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition shrink-0"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Kategori:
          </span>
          {[
            { id: 'ALL', label: 'All Categories' },
            { id: 'BUG_REPORT', label: 'Bug Report' },
            { id: 'TECHNICAL_SUPPORT', label: 'Technical Support' },
            { id: 'FEATURE_REQUEST', label: 'Feature Request' },
            { id: 'ACCOUNT_ISSUE', label: 'Account Issue' },
            { id: 'BILLING_ISSUE', label: 'Billing Issue' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ticket List */}
      {filteredTickets.length === 0 ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-12 text-center">
          <LifeBuoy className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white mb-1">No support tickets found</h3>
          <p className="text-xs text-slate-400 mb-4 max-w-md mx-auto">
            {tickets.length === 0
              ? 'Belum ada Support Ticket terbuka untuk perusahaan Anda. Buat ticket baru jika menemukan kendala teknis atau pengajuan fitur.'
              : 'Tidak ada ticket yang cocok dengan kriteria pencarian & filter saat ini.'}
          </p>
          <button
            onClick={() => navigate('/portal/support/new')}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition inline-flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Create Support Ticket
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTickets.map((t) => {
            const sla = TicketSLAService.getSLAStatus(t);
            const slaColors = TicketSLAService.getSLAColorClasses(sla.status);

            return (
              <div
                key={t.id}
                onClick={() => navigate(`/portal/support/${t.id}`)}
                className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 cursor-pointer transition shadow-lg group flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  {/* Badges & Meta */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      {t.ticketNumber}
                    </span>
                    {getStatusBadge(t.status)}
                    {getPriorityBadge(t.priority)}
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {SupportTicketService.getCategoryLabel(t.category)}
                    </span>
                    {t.status !== 'RESOLVED' && t.status !== 'CLOSED' && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${slaColors.bg} ${slaColors.text} ${slaColors.border} flex items-center gap-1`}>
                        <Clock className="w-3 h-3" /> SLA: {sla.displayLabel}
                      </span>
                    )}
                  </div>

                  {/* Subject */}
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                    {t.subject}
                  </h3>

                  {/* Description snippet */}
                  <p className="text-xs text-slate-400 line-clamp-1">{t.description}</p>

                  {/* Project & Module */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                    {t.projectName && (
                      <span className="flex items-center gap-1 text-slate-400">
                        <FolderOpen className="w-3.5 h-3.5 text-cyan-500" /> {t.projectName}
                      </span>
                    )}
                    {t.moduleName && (
                      <span className="flex items-center gap-1 text-slate-400">
                        <Layers className="w-3.5 h-3.5 text-purple-400" /> Modul: {t.moduleName}
                      </span>
                    )}
                    <span>Dibuat: {new Date(t.createdAt).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>

                {/* Right side stats & CTA */}
                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800 shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 justify-end">
                      <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> {t.messages.length} Pesan
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Assignee: {t.assigneeName || 'Menunggu Assign'}
                    </div>
                  </div>
                  <span className="px-3 py-1.5 rounded-xl bg-slate-800 group-hover:bg-cyan-500 group-hover:text-slate-950 text-slate-300 font-semibold text-xs transition flex items-center gap-1">
                    Detail <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </CustomerPortalLayout>
  );
};
