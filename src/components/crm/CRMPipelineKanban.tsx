import React, { useState } from 'react';
import {
  MoreVertical,
  MessageCircle,
  Eye,
  Edit3,
  ArrowRight,
  AlertTriangle,
  Clock,
  UserCheck,
  TrendingUp,
  X,
  CheckCircle2,
  AlertCircle,
  Building2,
  Calendar
} from 'lucide-react';
import { Opportunity, OpportunityStage } from '../../types';
import { PipelineService } from '../../services/pipelineService';

interface CRMPipelineKanbanProps {
  opportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onEditOpportunity: (opp: Opportunity) => void;
  onMoveStage: (oppId: string, newStage: OpportunityStage) => void;
  onWhatsAppClick: (opp: Opportunity) => void;
}

export const CRMPipelineKanban: React.FC<CRMPipelineKanbanProps> = ({
  opportunities,
  onSelectOpportunity,
  onEditOpportunity,
  onMoveStage,
  onWhatsAppClick
}) => {
  const stages = PipelineService.getStages();
  const [warningModal, setWarningModal] = useState<{
    isOpen: boolean;
    opp?: Opportunity;
    targetStage?: OpportunityStage;
    warningText?: string;
  }>({ isOpen: false });

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const formatCurrency = (min: number, max: number) => {
    const avg = (min + max) / 2;
    if (avg >= 1e9) {
      return `Rp ${(avg / 1e9).toFixed(1)} M`;
    }
    return `Rp ${(avg / 1e6).toFixed(0)} Jt`;
  };

  const isStageSkipped = (currentStage: OpportunityStage, targetStage: OpportunityStage) => {
    const order: OpportunityStage[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'];
    const currentIdx = order.indexOf(currentStage);
    const targetIdx = order.indexOf(targetStage);

    if (targetStage === 'LOST') return false;
    return targetIdx - currentIdx > 1;
  };

  const handleRequestMove = (opp: Opportunity, targetStage: OpportunityStage) => {
    setActiveMenuId(null);
    if (opp.stage === targetStage) return;

    if (isStageSkipped(opp.stage, targetStage)) {
      setWarningModal({
        isOpen: true,
        opp,
        targetStage,
        warningText: `This opportunity is moving from ${opp.stage} to ${targetStage} without going through intermediate stages.`
      });
    } else {
      onMoveStage(opp.id, targetStage);
    }
  };

  const confirmWarningMove = () => {
    if (warningModal.opp && warningModal.targetStage) {
      onMoveStage(warningModal.opp.id, warningModal.targetStage);
    }
    setWarningModal({ isOpen: false });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">Urgent</span>;
      case 'High':
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">High</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">Medium</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700">Low</span>;
    }
  };

  return (
    <div className="relative">
      {/* Mobile view notice */}
      <div className="text-xs text-slate-400 mb-2 flex items-center justify-between md:hidden">
        <span>Geser horizontal untuk melihat seluruh 7 stage pipeline:</span>
        <span className="text-blue-400 font-semibold">Kanban Board &rarr;</span>
      </div>

      {/* Kanban Board Layout */}
      <div className="flex gap-4 overflow-x-auto pb-6 pt-1 min-h-[620px] scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {stages.map((st) => {
          const stageOpps = opportunities.filter((o) => o.stage === st.stage);
          const stageTotal = stageOpps.reduce((acc, o) => acc + (o.stage === 'WON' && o.finalDealValue ? o.finalDealValue : (o.estimatedValueMin + o.estimatedValueMax) / 2), 0);

          return (
            <div
              key={st.stage}
              className="w-72 sm:w-80 shrink-0 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 flex flex-col justify-between"
            >
              {/* Stage Header */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: st.color }}></span>
                    <h3 className="text-sm font-bold text-white tracking-wide">{st.label}</h3>
                    <span className="px-2 py-0.5 text-xs font-semibold bg-slate-800 text-slate-300 rounded-full">
                      {stageOpps.length}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{st.probability}%</span>
                </div>

                {/* Stage Financial Metric */}
                <div className="text-xs font-semibold text-slate-400 mb-3 flex items-center justify-between bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800/50">
                  <span>Est. Value:</span>
                  <span className="text-blue-400 font-bold font-mono">
                    {stageTotal > 0 ? `Rp ${(stageTotal / 1e6).toFixed(0)} Jt` : 'Rp 0'}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 min-h-[480px]">
                  {stageOpps.length === 0 ? (
                    <div className="border border-dashed border-slate-800/80 rounded-xl p-8 text-center text-slate-500 text-xs my-auto">
                      Belum ada opportunity pada stage ini.
                    </div>
                  ) : (
                    stageOpps.map((opp) => (
                      <div
                        key={opp.id}
                        className="group bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-xl p-3.5 shadow-lg transition-all duration-200 relative"
                      >
                        {/* Stale Badge */}
                        {opp.lastActivityAt &&
                          Math.floor((Date.now() - new Date(opp.lastActivityAt).getTime()) / (1000 * 60 * 60 * 24)) >= 14 && (
                            <div className="absolute -top-2 left-3 px-2 py-0.5 bg-rose-500 text-white text-[9px] font-bold rounded-full shadow flex items-center space-x-1">
                              <AlertCircle className="w-2.5 h-2.5" />
                              <span>Stale Opportunity (&gt;14 Hari)</span>
                            </div>
                          )}

                        {/* Top Info */}
                        <div className="flex items-start justify-between mb-1.5">
                          <span className="text-[11px] font-medium text-blue-400 flex items-center space-x-1">
                            <Building2 className="w-3 h-3" />
                            <span className="truncate max-w-[150px]">{opp.companyName}</span>
                          </span>

                          <div className="flex items-center space-x-1">
                            {getPriorityBadge(opp.priority)}
                            <button
                              onClick={() => setActiveMenuId(activeMenuId === opp.id ? null : opp.id)}
                              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
                            >
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Context Dropdown Menu */}
                        {activeMenuId === opp.id && (
                          <div className="absolute right-3 top-10 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-30 p-1.5 space-y-1">
                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                onSelectOpportunity(opp);
                              }}
                              className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center space-x-2"
                            >
                              <Eye className="w-3.5 h-3.5 text-blue-400" />
                              <span>Lihat Detail</span>
                            </button>
                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                onEditOpportunity(opp);
                              }}
                              className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center space-x-2"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                              <span>Edit Opportunity</span>
                            </button>
                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                onWhatsAppClick(opp);
                              }}
                              className="w-full text-left px-3 py-1.5 text-xs text-emerald-400 hover:bg-emerald-500/10 rounded-lg flex items-center space-x-2"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Kirim WhatsApp</span>
                            </button>

                            <div className="border-t border-slate-800 my-1 pt-1 text-[10px] text-slate-400 px-3 uppercase font-semibold">
                              Pindah Stage:
                            </div>
                            {stages.map((target) => (
                              <button
                                key={target.stage}
                                disabled={target.stage === opp.stage}
                                onClick={() => handleRequestMove(opp, target.stage)}
                                className={`w-full text-left px-3 py-1 text-[11px] rounded flex items-center justify-between ${
                                  target.stage === opp.stage
                                    ? 'text-slate-600 cursor-not-allowed'
                                    : 'text-slate-300 hover:bg-blue-600/20 hover:text-blue-300'
                                }`}
                              >
                                <span>{target.label}</span>
                                {target.stage === opp.stage && <CheckCircle2 className="w-3 h-3 text-slate-600" />}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Project Name */}
                        <h4
                          onClick={() => onSelectOpportunity(opp)}
                          className="text-xs font-bold text-slate-100 hover:text-blue-300 cursor-pointer line-clamp-2 mb-2 leading-snug"
                        >
                          {opp.name}
                        </h4>

                        {/* Contact Name & Lead Score */}
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                          <span className="truncate max-w-[130px]">Pic: {opp.contactName}</span>
                          <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 font-bold font-mono">
                            Score: {opp.leadScore}
                          </span>
                        </div>

                        {/* Financial Value & Owner */}
                        <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/80 mb-2.5 flex items-center justify-between">
                          <div>
                            <div className="text-[10px] text-slate-400">Estimated Value</div>
                            <div className="text-xs font-bold text-white font-mono">
                              {formatCurrency(opp.estimatedValueMin, opp.estimatedValueMax)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] text-slate-400">Assigned Sales</div>
                            <div className="text-[11px] font-medium text-slate-300 flex items-center space-x-1">
                              <UserCheck className="w-3 h-3 text-blue-400" />
                              <span>{opp.owner}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Actions & Dates */}
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/60">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>Follow-up: {opp.nextFollowUpDate || 'Hari ini'}</span>
                          </div>

                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => onWhatsAppClick(opp)}
                              title="Hubungi via WhatsApp"
                              className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onSelectOpportunity(opp)}
                              title="Buka Detail"
                              className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage Skipping Confirmation Modal */}
      {warningModal.isOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center space-x-3 text-amber-400 mb-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Konfirmasi Perpindahan Stage</h3>
                <p className="text-xs text-amber-400/90 font-medium">Stage Skipping Warning</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              {warningModal.warningText}
            </p>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setWarningModal({ isOpen: false })}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl"
              >
                Batal
              </button>
              <button
                onClick={confirmWarningMove}
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/20"
              >
                Tetap Pindahkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
