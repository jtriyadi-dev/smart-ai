import React, { useState } from 'react';
import { ShieldCheck, Users, FileText, Database, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'settings'>('leads');

  const mockLeads = [
    { id: 'SAI-L832', name: 'Budi Santoso', company: 'PT Batu Bara Nusantara', industry: 'Pertambangan', appType: 'Fleet Tracking & Fuel OCR', status: 'NEW_LEAD', date: 'Hari Ini, 09:30' },
    { id: 'SAI-L831', name: 'Siti Rahmawati', company: 'PT Sawit Makmur Indah', industry: 'Perkebunan Sawit', appType: 'PKS Yield Prediction AI', status: 'PROPOSAL_SENT', date: 'Kemarin, 14:15' },
    { id: 'SAI-L830', name: 'Dr. Hendra', company: 'RS Medika Sejahtera', industry: 'Rumah Sakit', appType: 'Queue AI & Medical Records', status: 'CONVERTED', date: '12 Feb 2026' }
  ];

  return (
    <div className="py-24 md:py-32 bg-[#06090e] bg-tech-grid min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>ADMINISTRATOR CONTROL CENTER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
              SMART-AI.ID Command Center
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-300 bg-cyan-950/80 px-3 py-1.5 rounded-full border border-cyan-800">
              System Health: Operational 100%
            </span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'leads'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            Leads & Pipeline CRM
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'analytics'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            System Analytics
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            AI Engine Config
          </button>
        </div>

        {activeTab === 'leads' && (
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold font-display text-white">Masuk Application Request (Leads)</h3>
              <span className="text-xs font-mono text-purple-400 font-bold">Total: {mockLeads.length} Requests</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 font-mono text-[11px] text-cyan-400 uppercase">
                  <tr>
                    <th className="p-3">Ref ID</th>
                    <th className="p-3">Nama Client</th>
                    <th className="p-3">Perusahaan</th>
                    <th className="p-3">Industri</th>
                    <th className="p-3">Aplikasi Requested</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {mockLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-3 font-mono font-bold text-cyan-300">{lead.id}</td>
                      <td className="p-3 font-bold text-white">{lead.name}</td>
                      <td className="p-3">{lead.company}</td>
                      <td className="p-3">{lead.industry}</td>
                      <td className="p-3">{lead.appType}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 font-mono">{lead.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-2">
              <span className="text-xs text-slate-400 font-mono">Conversion Rate</span>
              <div className="text-3xl font-extrabold text-white font-display">84.2%</div>
              <p className="text-[11px] text-emerald-400">Consultation to Scope Blueprint conversion</p>
            </div>
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-2">
              <span className="text-xs text-slate-400 font-mono">Active Blueprints</span>
              <div className="text-3xl font-extrabold text-cyan-400 font-display">48 Project Scope</div>
              <p className="text-[11px] text-slate-400">Generated via AI Scope Engine</p>
            </div>
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-2">
              <span className="text-xs text-slate-400 font-mono">Industry Split</span>
              <div className="text-3xl font-extrabold text-purple-400 font-display">Mining & Agriculture</div>
              <p className="text-[11px] text-slate-400">Leading sectors requested</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-lg font-bold font-display text-white">AI Engine Provider Configuration</h3>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Google Gemini 2.5 Flash Model:</span>
                <span className="text-emerald-400 font-mono font-bold">ACTIVE (Server Proxy Route /api/ai-scope-generator)</span>
              </div>
              <p className="text-xs text-slate-400">
                Model API keys are managed via secure server environment variables (.env / process.env.GEMINI_API_KEY).
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
