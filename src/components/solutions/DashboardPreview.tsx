import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts';
import {
  Sparkles, TrendingUp, TrendingDown, Layers, MapPin, AlertCircle,
  Table as TableIcon, LayoutDashboard, RefreshCw, Eye
} from 'lucide-react';
import { IndustryDashboardPreviewConfig } from '../../types';

interface DashboardPreviewProps {
  config: IndustryDashboardPreviewConfig;
  industryName: string;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({ config, industryName }) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'table' | 'insight'>('analytics');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  return (
    <section className="py-16 bg-slate-900/60 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-3">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Live Interactive Preview</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Dashboard Operational Command Center ({industryName})
          </h2>

          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/60 border border-amber-800/50 text-amber-300 text-xs font-semibold">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Demo — Sample Data</span>
          </div>
        </div>

        {/* Dashboard Shell Frame */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Bar */}
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400 border-l border-slate-800 pl-3">
                https://app.smart-ai.id/{industryName.toLowerCase().replace(/\s+/g, '-')}/dashboard
              </span>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === 'analytics'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Analytics & Charts
              </button>
              <button
                onClick={() => setActiveTab('table')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === 'table'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Data Records
              </button>
              <button
                onClick={() => setActiveTab('insight')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === 'insight'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                AI Insights
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6">
            {/* AI Insight Banner */}
            <div className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-cyan-950/60 border border-purple-800/50 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-purple-200">
              <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 animate-pulse" />
              <div className="leading-relaxed">{config.aiInsightBanner}</div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {config.kpis.map((kpi, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 rounded-xl p-4 transition-all"
                >
                  <div className="text-xs text-slate-400 font-medium mb-1">{kpi.label}</div>
                  <div className="text-2xl font-black text-white tracking-tight">{kpi.value}</div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold ${
                        kpi.isPositive ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {kpi.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {kpi.change}
                    </span>
                    {kpi.subtext && <span className="text-[10px] text-slate-500 truncate max-w-[120px]">{kpi.subtext}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Tab Views */}
            {activeTab === 'analytics' && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white">{config.chartTitle}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setChartType('bar')}
                      className={`text-xs px-2.5 py-1 rounded ${chartType === 'bar' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'text-slate-400'}`}
                    >
                      Bar
                    </button>
                    <button
                      onClick={() => setChartType('line')}
                      className={`text-xs px-2.5 py-1 rounded ${chartType === 'line' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'text-slate-400'}`}
                    >
                      Line
                    </button>
                  </div>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'bar' ? (
                      <BarChart data={config.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                        <Legend />
                        <Bar dataKey="actual" fill="#06b6d4" name="Realisasi Actual" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="target" fill="#3b82f6" name="Target Plan" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    ) : (
                      <LineChart data={config.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                        <Legend />
                        <Line type="monotone" dataKey="actual" stroke="#06b6d4" strokeWidth={3} name="Realisasi Actual" />
                        <Line type="monotone" dataKey="target" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" name="Target Plan" />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'table' && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{config.tableTitle}</h3>
                  <span className="text-xs text-slate-500">Menampilkan {config.tableRows.length} baris sampel</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
                        {config.tableHeaders.map((head, i) => (
                          <th key={i} className="p-3 font-semibold">{head}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {config.tableRows.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-900/40">
                          {config.tableHeaders.map((head, j) => (
                            <td key={j} className="p-3 font-medium">
                              {String(row[head] || '-')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'insight' && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Rekomendasi AI Real-time</span>
                </h3>

                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-950 rounded-lg border border-purple-900/40 text-xs text-slate-300">
                    <span className="font-bold text-purple-300 block mb-1">Anomali Terdeteksi</span>
                    {config.aiInsightBanner}
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-lg border border-cyan-900/40 text-xs text-slate-300">
                    <span className="font-bold text-cyan-300 block mb-1">Rekomendasi Tindakan</span>
                    Sistem merekomendasikan optimasi jadwal kerja dan alokasi daya otomatis untuk menjaga efisiensi di atas 90%.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
