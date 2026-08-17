import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { AdminSupportLayout } from '../../components/admin/AdminSupportLayout';
import { SupportTicketService } from '../../services/SupportTicketService';
import { TicketSLAService } from '../../services/TicketSLAService';
import { Ticket, TicketStatus, TicketCategory, TicketPriority } from '../../types';
import {
  ListOrdered,
  Search,
  Filter,
  ArrowRight,
  Clock,
  Eye,
  User,
  Building2,
  FolderOpen,
  ChevronRight
} from 'lucide-react';

export const AdminSupportQueuePage: React.FC = () => {
  const { navigate } = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');

  useEffect(() => {
    const list = SupportTicketService.getTickets('', false);
    setTickets(list);
  }, []);

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.companyName && t.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.customerUserName && t.customerUserName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.assigneeName && t.assigneeName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = selectedStatus === 'ALL' || t.status === selectedStatus;
    const matchesCategory = selectedCategory === 'ALL' || t.category === selectedCategory;
    const matchesPriority = selectedPriority === 'ALL' || t.priority === selectedPriority;

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  return (
    <AdminSupportLayout activeTab="queue">
      <div className="space-y-6">
        {/* Filters Toolbar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari ticket #, subjek, perusahaan, customer, assignee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">Semua Status</option>
              <option value="OPEN">OPEN</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="WAITING_FOR_CUSTOMER">WAITING_FOR_CUSTOMER</option>
              <option value="TESTING">TESTING</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="CLOSED">CLOSED</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">Semua Kategori</option>
              <option value="BUG_REPORT">Bug Report</option>
              <option value="TECHNICAL_SUPPORT">Technical Support</option>
              <option value="FEATURE_REQUEST">Feature Request</option>
              <option value="ACCOUNT_ISSUE">Account Issue</option>
              <option value="BILLING_ISSUE">Billing Issue</option>
            </select>

            {/* Priority Filter */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">Semua Priority</option>
              <option value="URGENT">URGENT</option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Ticket Number</th>
                  <th className="py-3.5 px-4">Customer & Company</th>
                  <th className="py-3.5 px-4">Subject & Modul</th>
                  <th className="py-3.5 px-4">Kategori / Priority</th>
                  <th className="py-3.5 px-4">Status / SLA</th>
                  <th className="py-3.5 px-4">Assignee</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredTickets.map((t) => {
                  const sla = TicketSLAService.getSLAStatus(t);
                  const slaColors = TicketSLAService.getSLAColorClasses(sla.status);

                  return (
                    <tr
                      key={t.id}
                      onClick={() => navigate(`/admin/support/${t.id}`)}
                      className="hover:bg-slate-800/50 cursor-pointer transition"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                        {t.ticketNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{t.companyName}</div>
                        <div className="text-[11px] text-slate-400">{t.customerUserName}</div>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-bold text-slate-200 truncate">{t.subject}</div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {t.projectName} • {t.moduleName || 'General'}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                            {SupportTicketService.getCategoryLabel(t.category)}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300">
                            {t.priority}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 space-y-1">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                          {t.status}
                        </span>
                        {t.status !== 'RESOLVED' && t.status !== 'CLOSED' && (
                          <div className={`text-[10px] font-bold ${slaColors.text}`}>
                            SLA: {sla.displayLabel}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 font-medium">
                        {t.assigneeName || 'Unassigned'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/support/${t.id}`);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 text-xs font-semibold transition inline-flex items-center gap-1"
                        >
                          Detail <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminSupportLayout>
  );
};
