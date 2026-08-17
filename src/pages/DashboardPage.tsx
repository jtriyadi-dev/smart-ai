import React, { useState } from 'react';
import { User, FileText, CheckCircle2, Clock, AlertCircle, LifeBuoy, ArrowRight, FolderKanban, DollarSign } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'proposals' | 'tickets'>('overview');

  const mockProject = {
    id: 'PRJ-2026-001',
    name: 'Smart Mining Operational System & AI Analytics',
    status: 'IN_DEVELOPMENT',
    progress: 65,
    targetDate: '15 April 2026',
    modules: ['Fleet Tracking', 'Fuel OCR AI', 'Executive Dashboard', 'WhatsApp Alert Gateway']
  };

  return (
    <div className="py-24 md:py-32 bg-[#06090e] bg-tech-grid min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <User className="w-4 h-4" />
              <span>CUSTOMER PORTAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Selamat Datang, Client Portal
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Account Status: Active Client</span>
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 mb-8 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            Project Status & Milestones
          </button>
          <button
            onClick={() => setActiveTab('proposals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'proposals'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            Proposal & Quotations
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'tickets'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            Support Tickets
          </button>
        </div>

        {/* Content Tabs */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 glass-card rounded-2xl p-6 border border-white/10 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400">{mockProject.id}</span>
                  <h3 className="text-xl font-display font-bold text-white">{mockProject.name}</h3>
                </div>
                <span className="text-xs font-mono font-bold bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800">
                  {mockProject.status}
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-400">Project Progress:</span>
                  <span className="text-cyan-400 font-bold">{mockProject.progress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${mockProject.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono block">Estimasi Deployment:</span>
                  <span className="text-xs font-bold text-white">{mockProject.targetDate}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono block">Dedicated Engineer:</span>
                  <span className="text-xs font-bold text-cyan-300">Tim Solution Architect SMART-AI.ID</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <h3 className="text-base font-bold font-display text-white pb-3 border-b border-slate-800">
                Fitur Module Terdaftar:
              </h3>
              <div className="space-y-2">
                {mockProject.modules.map((m, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'proposals' && (
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-lg font-bold font-display text-white pb-3 border-b border-slate-800">
              Dokumen Proposal & Penawaran
            </h3>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-500">PROPOSAL #SAI-PROP-982</span>
                <h4 className="text-sm font-bold text-white">Proposal Arsitektur System Smart Mining AI</h4>
              </div>
              <button className="px-4 py-2 bg-slate-900 border border-cyan-500/40 text-cyan-300 font-bold text-xs rounded-xl hover:bg-cyan-950">
                Download PDF
              </button>
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold font-display text-white">Support Tickets</h3>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs rounded-xl">
                Buat Ticket Baru
              </button>
            </div>
            <p className="text-xs text-slate-400">Tidak ada ticket masalah terbuka saat ini. Sistem berjalan normal.</p>
          </div>
        )}

      </div>
    </div>
  );
};
