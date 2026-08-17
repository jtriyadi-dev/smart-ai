import React from 'react';
import { CopilotMessage, CopilotQueryResponse } from '../../types';
import {
  Sparkles,
  Bot,
  User,
  Database,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  HelpCircle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface CopilotChatThreadProps {
  messages: CopilotMessage[];
  isThinking: boolean;
  onOpenExplainability: (resp: CopilotQueryResponse) => void;
  onFollowUpClick: (q: string) => void;
  onNavigate: (path: string) => void;
}

export const CopilotChatThread: React.FC<CopilotChatThreadProps> = ({
  messages,
  isThinking,
  onOpenExplainability,
  onFollowUpClick,
  onNavigate
}) => {
  return (
    <div className="space-y-6">
      {messages.map((msg) => (
        <div key={msg.id} className="space-y-3">
          
          {/* User Message */}
          {msg.sender === 'user' ? (
            <div className="flex justify-end">
              <div className="flex items-start gap-3 max-w-xl">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg leading-relaxed">
                  {msg.text}
                </div>
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <User className="w-4 h-4" />
                </div>
              </div>
            </div>
          ) : (
            /* Copilot Response */
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shrink-0 mt-1">
                <Bot className="w-5 h-5" />
              </div>

              <div className="flex-1 space-y-4 max-w-3xl">
                {msg.responseObject ? (
                  <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
                    
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800 text-[11px]">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono font-bold flex items-center gap-1">
                          <Database className="w-3 h-3" /> {msg.responseObject.dataSourceName}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono">
                          {msg.responseObject.periodLabel}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 text-[10px]">
                          Confidence: {msg.responseObject.confidence}
                        </span>
                        <button
                          onClick={() => onOpenExplainability(msg.responseObject!)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold transition flex items-center gap-1"
                        >
                          <HelpCircle className="w-3 h-3 text-cyan-400" /> Cara Perhitungan?
                        </button>
                      </div>
                    </div>

                    {/* Summary Narrative */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" /> Executive AI Summary
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-normal">
                        {msg.responseObject.summaryText}
                      </p>
                    </div>

                    {/* Metric Card & Growth */}
                    {msg.responseObject.metricResult && (
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <div className="text-[10px] font-mono text-slate-400 uppercase">Total Saat Ini</div>
                          <div className="text-xl font-extrabold text-cyan-400 mt-0.5">
                            {msg.responseObject.metricResult.formattedCurrent}
                          </div>
                        </div>

                        {msg.responseObject.metricResult.formattedPrevious && (
                          <div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase">Periode Sebelumnya</div>
                            <div className="text-xl font-bold text-slate-300 mt-0.5">
                              {msg.responseObject.metricResult.formattedPrevious}
                            </div>
                          </div>
                        )}

                        {msg.responseObject.metricResult.growthPercent !== undefined && (
                          <div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase">Pertumbuhan (Growth)</div>
                            <div
                              className={`text-xl font-extrabold flex items-center gap-1 mt-0.5 ${
                                msg.responseObject.metricResult.growthPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                              }`}
                            >
                              {msg.responseObject.metricResult.growthPercent >= 0 ? (
                                <ArrowUpRight className="w-5 h-5" />
                              ) : (
                                <ArrowDownRight className="w-5 h-5" />
                              )}
                              {msg.responseObject.metricResult.growthPercent}%
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Recharts Bar Chart */}
                    {msg.responseObject.chartData && msg.responseObject.chartData.length > 0 && (
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-cyan-400" /> Distribusi Data Aktual
                        </div>
                        <div className="h-48 w-full pt-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={msg.responseObject.chartData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                              <XAxis dataKey="label" stroke="#64748b" fontSize={10} />
                              <YAxis stroke="#64748b" fontSize={10} />
                              <Tooltip
                                contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#fff' }}
                              />
                              <Bar dataKey="currentValue" fill="#06b6d4" radius={[6, 6, 0, 0]} name="Nilai Aktual" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}

                    {/* Anomaly Alerts */}
                    {msg.responseObject.alerts.length > 0 && (
                      <div className="space-y-3">
                        <div className="text-xs font-bold text-amber-400 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" /> Anomaly & Operational Alerts
                        </div>
                        {msg.responseObject.alerts.map((al) => (
                          <div key={al.id} className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-amber-300">{al.title}</span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 font-bold uppercase">
                                {al.severity}
                              </span>
                            </div>
                            <p className="text-slate-300 text-[11px] leading-relaxed">{al.whatHappened}</p>
                            <div className="text-[10px] font-mono text-cyan-300">💡 Solusi: {al.recommendedAction}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Recommendations */}
                    {msg.responseObject.recommendations.length > 0 && (
                      <div className="space-y-3">
                        <div className="text-xs font-bold text-cyan-400 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" /> AI Strategic Recommendations
                        </div>
                        {msg.responseObject.recommendations.map((rec) => (
                          <div key={rec.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                            <div className="font-bold text-white flex items-center justify-between">
                              <span>{rec.title}</span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                                {rec.priority} PRIORITY
                              </span>
                            </div>
                            <p className="text-slate-300 text-[11px]">{rec.actionText}</p>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px]">
                              <span className="text-emerald-400 font-mono">Dampak: {rec.impactDescription}</span>
                              {rec.targetPage && (
                                <button
                                  onClick={() => onNavigate(rec.targetPage!)}
                                  className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition flex items-center gap-1"
                                >
                                  {rec.ctaText || 'Eksekusi Tindakan'} <ArrowUpRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Forecast Box if present */}
                    {msg.responseObject.forecast && (
                      <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-2 text-xs">
                        <div className="text-xs font-bold text-purple-300 flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-purple-400" /> Proyeksi AI (Forecast)
                          </span>
                          <span className="font-mono text-purple-300 font-bold">
                            {msg.responseObject.forecast.formattedValue}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 italic">{msg.responseObject.forecast.disclaimer}</p>
                      </div>
                    )}

                    {/* Follow-up Question Chips */}
                    {msg.responseObject.followUpQuestions && (
                      <div className="pt-3 border-t border-slate-800 space-y-2">
                        <div className="text-[10px] font-mono text-slate-400">PILIHAN PERTANYAAN LANJUTAN:</div>
                        <div className="flex flex-wrap gap-2">
                          {msg.responseObject.followUpQuestions.map((q, idx) => (
                            <button
                              key={idx}
                              onClick={() => onFollowUpClick(q)}
                              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-white text-xs transition flex items-center gap-1.5"
                            >
                              <span>💡 {q}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                ) : (
                  /* Plain text response */
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white leading-relaxed">
                    {msg.text}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      ))}

      {/* Typing Indicator */}
      {isThinking && (
        <div className="flex items-center gap-3 text-xs text-cyan-400 animate-pulse font-mono">
          <Bot className="w-5 h-5 animate-spin text-cyan-400" />
          <span>AI Business Copilot sedang menganalisis database & menghitung agregasi deterministik...</span>
        </div>
      )}
    </div>
  );
};
