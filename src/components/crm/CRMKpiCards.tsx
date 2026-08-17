import React from 'react';
import {
  Users,
  Target,
  FileText,
  MessageSquareCode,
  Trophy,
  XCircle,
  TrendingUp,
  Clock,
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react';
import { PipelineSummaryMetrics } from '../../types';

interface CRMKpiCardsProps {
  metrics: PipelineSummaryMetrics;
  onOpenAiAnalysis?: () => void;
}

export const CRMKpiCards: React.FC<CRMKpiCardsProps> = ({ metrics, onOpenAiAnalysis }) => {
  const formatCurrency = (val: number) => {
    if (val >= 1e9) {
      return `Rp ${(val / 1e9).toFixed(2)} Miliar`;
    }
    return `Rp ${(val / 1e6).toFixed(0)} Juta`;
  };

  return (
    <div className="space-y-4">
      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {/* Total Leads */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Total Leads</span>
            <Users className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-white">{metrics.totalLeads}</div>
          <div className="text-[10px] text-slate-400 mt-1">Seluruh Prospek</div>
        </div>

        {/* New Leads */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>New Leads</span>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          </div>
          <div className="text-xl font-bold text-blue-400">{metrics.newLeads}</div>
          <div className="text-[10px] text-slate-400 mt-1">Belum Dikontak</div>
        </div>

        {/* Qualified */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Qualified</span>
            <Target className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-purple-400">{metrics.qualifiedLeads}</div>
          <div className="text-[10px] text-slate-400 mt-1">Terkualifikasi</div>
        </div>

        {/* Open Opps */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Open Deals</span>
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-cyan-400">{metrics.openOpportunities}</div>
          <div className="text-[10px] text-slate-400 mt-1">Aktif di Pipeline</div>
        </div>

        {/* Proposal Sent */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 hover:border-pink-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Proposal</span>
            <FileText className="w-3.5 h-3.5 text-pink-400" />
          </div>
          <div className="text-xl font-bold text-pink-400">{metrics.proposalSent}</div>
          <div className="text-[10px] text-slate-400 mt-1">Penawaran Dikirim</div>
        </div>

        {/* Negotiation */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Negotiation</span>
            <MessageSquareCode className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-amber-400">{metrics.negotiation}</div>
          <div className="text-[10px] text-slate-400 mt-1">Diskusi Komersial</div>
        </div>

        {/* Won */}
        <div className="bg-slate-900/80 border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-3.5 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between text-emerald-400 text-xs mb-1 font-medium">
            <span>Won Deals</span>
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-400">{metrics.won}</div>
          <div className="text-[10px] text-emerald-500/80 mt-1 font-medium">Deal Terpenuhi</div>
        </div>

        {/* Lost */}
        <div className="bg-slate-900/80 border border-rose-500/20 bg-rose-500/5 rounded-xl p-3.5 hover:border-rose-500/40 transition-all">
          <div className="flex items-center justify-between text-rose-400 text-xs mb-1 font-medium">
            <span>Lost Deals</span>
            <XCircle className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-xl font-bold text-rose-400">{metrics.lost}</div>
          <div className="text-[10px] text-rose-500/80 mt-1 font-medium">Gagal Terjadi</div>
        </div>
      </div>

      {/* Secondary Financial & Analytics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-slate-900/90 border border-slate-800 rounded-xl p-4">
        {/* Pipeline Value */}
        <div className="flex items-center space-x-3 pr-4 border-r border-slate-800/80">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Pipeline Value</div>
            <div className="text-lg font-bold text-white">{formatCurrency(metrics.totalPipelineValue)}</div>
            <div className="text-[11px] text-slate-400">Total Nilai Estimasi Deals</div>
          </div>
        </div>

        {/* Weighted Pipeline */}
        <div className="flex items-center space-x-3 pr-4 border-r border-slate-800/80">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Estimated Weighted Pipeline</div>
            <div className="text-lg font-bold text-cyan-400">{formatCurrency(metrics.weightedPipelineValue)}</div>
            <div className="text-[11px] text-slate-400">Estimasi Berbobot Peluang</div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="flex items-center space-x-3 pr-4 border-r border-slate-800/80">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Conversion Rate</div>
            <div className="text-lg font-bold text-emerald-400">
              {metrics.conversionRate > 0 ? `${metrics.conversionRate}%` : 'N/A'}
            </div>
            <div className="text-[11px] text-slate-400">Rasio Prospek Menjadi Won</div>
          </div>
        </div>

        {/* Avg Deal Value */}
        <div className="flex items-center space-x-3 pr-4 border-r border-slate-800/80">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Avg Deal Value</div>
            <div className="text-lg font-bold text-purple-300">
              {metrics.avgDealValue > 0 ? formatCurrency(metrics.avgDealValue) : 'N/A'}
            </div>
            <div className="text-[11px] text-slate-400">Rata-rata Nilai Kontrak</div>
          </div>
        </div>

        {/* Avg Sales Cycle */}
        <div className="flex items-center justify-between space-x-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Avg Sales Cycle</div>
              <div className="text-lg font-bold text-amber-300">{metrics.avgSalesCycleDays} Hari</div>
              <div className="text-[11px] text-slate-400">Durasi Konversi Won</div>
            </div>
          </div>

          {onOpenAiAnalysis && (
            <button
              onClick={onOpenAiAnalysis}
              className="px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 shadow-lg shadow-blue-500/20 transition-all shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Analysis</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
