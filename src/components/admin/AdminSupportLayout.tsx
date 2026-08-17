import React from 'react';
import { useRouter } from '../../lib/router';
import {
  LifeBuoy,
  LayoutDashboard,
  ListOrdered,
  Users,
  Grid,
  BarChart3,
  Settings,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface Props {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'queue' | 'agents' | 'categories' | 'reports' | 'settings';
}

export const AdminSupportLayout: React.FC<Props> = ({ children, activeTab }) => {
  const { navigate } = useRouter();

  const navs = [
    { id: 'dashboard', label: 'Support Dashboard', path: '/admin/support', icon: LayoutDashboard },
    { id: 'queue', label: 'Support Queue', path: '/admin/support/queue', icon: ListOrdered },
    { id: 'agents', label: 'Agents & Workload', path: '/admin/support/agents', icon: Users },
    { id: 'categories', label: 'Categories', path: '/admin/support/categories', icon: Grid },
    { id: 'reports', label: 'Analytics & CSAT', path: '/admin/support/reports', icon: BarChart3 },
    { id: 'settings', label: 'SLA & Settings', path: '/admin/support/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition"
              title="Kembali ke Admin Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  SMART-AI.ID Admin Support System
                </span>
              </div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2 mt-1">
                <LifeBuoy className="w-6 h-6 text-emerald-400" /> Support Ticket & Service Management
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/portal/tickets')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-cyan-400" /> View Customer Portal View
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
          {navs.map((n) => {
            const Icon = n.icon;
            const isActive = activeTab === n.id;
            return (
              <button
                key={n.id}
                onClick={() => navigate(n.path)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" /> {n.label}
              </button>
            );
          })}
        </div>

        {/* Page Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};
