import React, { useState, useEffect } from 'react';
import {
  Brain,
  Sparkles,
  TrendingUp,
  Search,
  Filter,
  Building2,
  User,
  ArrowRight,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Plus,
  RefreshCw,
  BarChart3,
  Calendar,
  MessageSquare,
  FileText,
  Zap,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Opportunity, Lead } from '../../types';
import { CRMService } from '../../services/crmService';
import { LeadService } from '../../services/leadService';
import { AISalesAssistantPanel } from '../../components/crm/AISalesAssistantPanel';
import { AISalesScoreService } from '../../services/aiSalesScoreService';

export const AISalesAssistantPage: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStage, setFilterStage] = useState<string>('ALL');

  // Modal actions
  const [activeModal, setActiveModal] = useState<'meeting' | 'proposal' | 'followup' | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    // Initialize & Load Opportunities
    CRMService.initializeInitialData();
    const opps = CRMService.getOpportunities();
    setOpportunities(opps);

    // Check URL query param for leadId
    const urlParams = new URLSearchParams(window.location.search);
    const queryLeadId = urlParams.get('leadId');

    if (queryLeadId) {
      const found = opps.find((o) => o.id === queryLeadId || o.leadId === queryLeadId);
      if (found) setSelectedOpp(found);
      else if (opps.length > 0) setSelectedOpp(opps[0]);
    } else if (opps.length > 0) {
      setSelectedOpp(opps[0]);
    }
  }, []);

  // Filtered list for selector
  const filteredOpps = opportunities.filter((opp) => {
    const matchesSearch =
      opp.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.contactName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = filterStage === 'ALL' || opp.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  const handleTriggerAction = (actionType: string, detail: any) => {
    setActionSuccessMsg(`Tindakan "${actionType}" telah berhasil dieksekusi.`);
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 p-4 md:p-8 space-y-8 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
            <span>Admin</span>
            <span>/</span>
            <span>CRM & Sales</span>
            <span>/</span>
            <span className="text-cyan-400 font-semibold">AI Sales Assistant</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
              <Brain className="w-6 h-6" />
            </div>
            AI Sales Assistant & Executive Copilot
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Asisten cerdas berbasis AI untuk scoring otomatis (0-100), analisis kualifikasi lead, rekomendasi solusi terarah, dan pembuatan pesan follow-up.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-3">
          <a
            href="/admin/crm"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" /> Open Smart CRM
          </a>
        </div>
      </div>

      {/* Success Banner */}
      {actionSuccessMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{actionSuccessMsg}</span>
          </div>
          <button onClick={() => setActionSuccessMsg(null)} className="text-emerald-400 hover:text-white">
            &times;
          </button>
        </motion.div>
      )}

      {/* Daily Sales Brief Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Active Opportunities</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">{opportunities.length} Prospek aktif</div>
          <p className="text-xs text-slate-400 mt-1">
            Rp {(opportunities.reduce((acc, o) => acc + (o.estimatedValueMax || 0), 0) / 1e6).toFixed(0)} Juta total nilai estimasi pipeline
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">High Score Leads (Hot)</span>
            <Flame className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-2">
            {opportunities.filter((o) => o.leadScore >= 75 || o.priority === 'High' || o.priority === 'Urgent').length} Lead Berkualitas Tinggi
          </div>
          <p className="text-xs text-slate-400 mt-1">AI Lead Score &gt; 75/100, siap dipresentasikan</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Rekomendasi Follow-up Hari Ini</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400 mt-2">
            {opportunities.filter((o) => o.stage === 'CONTACTED' || o.stage === 'PROPOSAL' || o.stage === 'QUALIFIED').length} Pesan WA Perlu Dikirim
          </div>
          <p className="text-xs text-slate-400 mt-1">Gunakan template 5 varian nada bicara AI</p>
        </div>
      </div>

      {/* Main Workspace: Selector & Analysis Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Lead Selector (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span>Pilih Prospek Klien</span>
              <span className="text-xs font-mono text-cyan-400">{filteredOpps.length} Available</span>
            </h2>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari perusahaan atau kontak..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Stage Filter Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px]">
              {['ALL', 'NEW', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION'].map((stage) => (
                <button
                  key={stage}
                  onClick={() => setFilterStage(stage)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition whitespace-nowrap ${
                    filterStage === stage
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>

            {/* Opportunity List Cards */}
            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredOpps.map((opp) => {
                const isSelected = selectedOpp?.id === opp.id;
                return (
                  <div
                    key={opp.id}
                    onClick={() => setSelectedOpp(opp)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer relative ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-950/60 to-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-white block">{opp.companyName}</span>
                        <span className="text-[11px] text-slate-400 block truncate max-w-[180px]">{opp.name}</span>
                      </div>

                      {/* Lead Score Pill */}
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                          opp.leadScore >= 80
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : opp.leadScore >= 60
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        {opp.leadScore || 85}/100
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2.5 pt-2 border-t border-slate-800/60">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-500" /> {opp.contactName}
                      </span>
                      <span className="font-semibold text-slate-300">
                        Rp {((opp.estimatedValueMax || 150e6) / 1e6).toFixed(0)}M
                      </span>
                    </div>
                  </div>
                );
              })}

              {filteredOpps.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-500 bg-slate-950/40 rounded-xl border border-slate-800">
                  Tidak ada prospek lead yang sesuai dengan kata kunci pencarian.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: AI Sales Assistant Panel (8 Columns) */}
        <div className="lg:col-span-8">
          {selectedOpp ? (
            <AISalesAssistantPanel
              opportunity={selectedOpp}
              onOpenConsultationModal={() => setActiveModal('meeting')}
              onActionTriggered={handleTriggerAction}
            />
          ) : (
            <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-400 space-y-3">
              <Brain className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">Pilih Prospek Klien</h3>
              <p className="text-xs text-slate-400">Pilih salah satu prospek lead dari daftar di sebelah kiri untuk melihat analisis AI Sales Assistant.</p>
            </div>
          )}
        </div>
      </div>

      {/* ACTION MODAL: MEETING SCHEDULE */}
      <AnimatePresence>
        {activeModal === 'meeting' && selectedOpp && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0b0f17] border border-cyan-500/30 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" /> Schedule Technical Presentation
                </h3>
                <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                  &times;
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div>
                  <label className="font-semibold block mb-1">Perusahaan Klien:</label>
                  <input
                    type="text"
                    disabled
                    value={selectedOpp.companyName}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-400"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Tanggal Sesi Consultation:</label>
                  <input
                    type="date"
                    defaultValue={new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Waktu Sesi:</label>
                  <input
                    type="time"
                    defaultValue="10:00"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button onClick={() => setActiveModal(null)} className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg">
                  Batal
                </button>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    handleTriggerAction('SCHEDULE_MEETING', { oppId: selectedOpp.id });
                  }}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg"
                >
                  Konfirmasi Jadwal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
