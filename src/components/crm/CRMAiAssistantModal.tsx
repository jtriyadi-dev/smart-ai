import React, { useState } from 'react';
import {
  Sparkles,
  X,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Clock,
  Briefcase,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Opportunity, Lead } from '../../types';
import { AICRMService, AIPipelineAnalysis } from '../../services/aiCrmService';

interface CRMAiAssistantModalProps {
  opportunities: Opportunity[];
  leads: Lead[];
  isOpen: boolean;
  onClose: () => void;
}

export const CRMAiAssistantModal: React.FC<CRMAiAssistantModalProps> = ({
  opportunities,
  leads,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const analysis: AIPipelineAnalysis = AICRMService.analyzePipeline(opportunities, leads);

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-blue-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-blue-400">
            <div className="p-2.5 bg-blue-500/20 border border-blue-500/40 rounded-2xl">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI Pipeline Health & Bottleneck Analyzer</h2>
              <p className="text-xs text-blue-300">SMART-AI.ID Intelligent CRM Insights Engine</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-xs text-slate-200">
          {/* Health Summary */}
          <div className="bg-slate-950 border border-blue-500/30 rounded-2xl p-4 space-y-2">
            <div className="font-bold text-blue-400 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>Ringkasan Kesehatan Pipeline</span>
            </div>
            <p className="text-sm text-slate-100 leading-relaxed font-medium">
              {analysis.healthSummary}
            </p>
          </div>

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-medium">High Priority Deals</div>
              <div className="text-lg font-bold text-amber-400 mt-1">{analysis.highPriorityCount} Prospek</div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-medium">Stale Opportunities</div>
              <div className="text-lg font-bold text-rose-400 mt-1">{analysis.staleOpportunitiesCount} Deals</div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-medium">Overdue Follow-ups</div>
              <div className="text-lg font-bold text-rose-300 mt-1">{analysis.overdueFollowUpsCount} Task</div>
            </div>
          </div>

          {/* Stale Leads Section */}
          {analysis.staleOpportunities.length > 0 && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 space-y-2">
              <div className="font-bold text-rose-400 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Terdeteksi Stale Opportunities (&gt; 14 Hari Tanpa Aktivitas)</span>
              </div>
              <ul className="space-y-1.5 pt-1">
                {analysis.staleOpportunities.map((st) => (
                  <li key={st.id} className="bg-slate-950 p-2.5 rounded-xl border border-rose-500/20 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white">{st.companyName}</span> - {st.name}
                    </div>
                    <span className="text-[10px] font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded">
                      {st.daysInactive} Hari Pasif
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottlenecks */}
          {analysis.bottlenecks.length > 0 && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-2">
              <div className="font-bold text-amber-300">Potensi Hambatan Penutupan Deal (Bottlenecks):</div>
              <ul className="list-disc list-inside space-y-1 text-slate-200">
                {analysis.bottlenecks.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          {/* AI Recommended Actions */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="font-bold text-emerald-400 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Rekomendasi Tindakan Strategis Sales:</span>
            </div>
            <ul className="space-y-2 pt-1">
              {analysis.recommendedActions.map((act, idx) => (
                <li key={idx} className="flex items-start space-x-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <span className="p-1 bg-emerald-500/20 text-emerald-400 rounded shrink-0 font-bold text-[10px]">{idx + 1}</span>
                  <span className="text-slate-200">{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-500/20"
          >
            Tutup Insights
          </button>
        </div>
      </div>
    </div>
  );
};
