import React, { useState, useEffect } from 'react';
import {
  IndustryType,
  UserRole,
  CopilotMessage,
  CopilotQueryResponse,
  ExecutiveBriefing,
  DataSourceConfig,
  SemanticMetricMapping,
  CopilotAuditRecord,
  FailedQuestionRecord
} from '../../types';
import { BusinessCopilotService } from '../../services/copilot/BusinessCopilotService';
import { DataRegistryService } from '../../services/copilot/DataRegistryService';
import { CopilotAuditService } from '../../services/copilot/CopilotAuditService';

import { CopilotHeader } from '../../components/copilot/CopilotHeader';
import { CopilotChatThread } from '../../components/copilot/CopilotChatThread';
import { CopilotSidebar } from '../../components/copilot/CopilotSidebar';
import { ExplainabilityModal } from '../../components/copilot/ExplainabilityModal';

import {
  Send,
  Sparkles,
  Database,
  Code2,
  ShieldCheck,
  HelpCircle,
  LayoutGrid,
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Plus,
  Terminal,
  Copy,
  Check,
  Eye,
  RefreshCw,
  Cpu
} from 'lucide-react';

interface AdminCopilotPageProps {
  onNavigate?: (path: string) => void;
}

export const AdminCopilotPage: React.FC<AdminCopilotPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'sources' | 'semantic' | 'learning_loop' | 'audit' | 'embedded'>('chat');
  const [activeIndustry, setActiveIndustry] = useState<IndustryType>('RETAIL');
  const [activeRole, setActiveRole] = useState<UserRole>('CEO');

  // Input & Messages
  const [queryInput, setQueryInput] = useState('');
  const [messages, setMessages] = useState<CopilotMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  // Executive Briefing
  const [briefing, setBriefing] = useState<ExecutiveBriefing | null>(null);

  // Admin Data Stores
  const [dataSources, setDataSources] = useState<DataSourceConfig[]>([]);
  const [semanticMappings, setSemanticMappings] = useState<SemanticMetricMapping[]>([]);
  const [auditLogs, setAuditLogs] = useState<CopilotAuditRecord[]>([]);
  const [failedQuestions, setFailedQuestions] = useState<FailedQuestionRecord[]>([]);

  // Explainability Modal State
  const [selectedResponseForModal, setSelectedResponseForModal] = useState<CopilotQueryResponse | null>(null);

  // Copied code state
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, [activeIndustry, activeRole]);

  const loadDashboardData = () => {
    const brief = CopilotAuditService.getExecutiveBriefing(activeIndustry, activeRole);
    setBriefing(brief);

    setDataSources(DataRegistryService.getDataSources());
    setSemanticMappings(DataRegistryService.getSemanticMappings(activeIndustry));
    setAuditLogs(CopilotAuditService.getAuditLogs());
    setFailedQuestions(CopilotAuditService.getFailedQuestions());

    // Initialize welcoming message if thread is empty
    if (messages.length === 0) {
      handleSendQuery('Analisa penjualan bulan ini.');
    }
  };

  const handleSendQuery = async (customQuery?: string) => {
    const q = customQuery || queryInput;
    if (!q.trim()) return;

    const userMsg: CopilotMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString('id-ID')
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customQuery) setQueryInput('');
    setIsThinking(true);

    try {
      const resp = await BusinessCopilotService.processQuery(q, activeIndustry, activeRole);
      const copilotMsg: CopilotMessage = {
        id: `msg-cop-${Date.now()}`,
        sender: 'copilot',
        responseObject: resp,
        timestamp: new Date().toLocaleTimeString('id-ID')
      };

      setMessages((prev) => [...prev, copilotMsg]);
      setAuditLogs(CopilotAuditService.getAuditLogs());
    } catch (err) {
      console.error(err);
    } finally {
      setIsThinking(false);
    }
  };

  const handleResetChat = () => {
    setMessages([]);
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="py-24 md:py-32 bg-[#06090e] bg-tech-grid min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Controls */}
        <CopilotHeader
          activeIndustry={activeIndustry}
          onSelectIndustry={(ind) => {
            setActiveIndustry(ind);
            setMessages([]);
          }}
          activeRole={activeRole}
          onSelectRole={(r) => setActiveRole(r)}
          healthScore={briefing?.healthScore || 92}
          healthStatus={briefing?.healthStatus || 'HEALTHY'}
        />

        {/* Executive Daily Briefing Card */}
        {briefing && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{briefing.greeting} — Executive Morning Briefing</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                AUTOMATIC DAILY BRIEFING: ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {briefing.keyMetricsSummary.map((kpi, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">{kpi.label}</div>
                  <div className="text-xl font-extrabold text-white">{kpi.val}</div>
                  <div className={`text-xs font-bold ${kpi.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {kpi.change} vs periode lalu
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Grid: Sidebar vs Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation & Quick Prompts */}
          <div className="lg:col-span-1">
            <CopilotSidebar
              activeTab={activeTab}
              onSelectTab={(t) => setActiveTab(t)}
              activeIndustry={activeIndustry}
              onSelectPrompt={(p) => handleSendQuery(p)}
            />
          </div>

          {/* Main Module Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* TAB 1: Copilot Chat & Natural Language Query */}
            {activeTab === 'chat' && (
              <div className="space-y-6">
                
                {/* Chat Control Header */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Ruang Diskusi & Analisis AI Copilot ({activeIndustry})</span>
                  </div>

                  <button
                    onClick={handleResetChat}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset Chat Context
                  </button>
                </div>

                {/* Message Thread */}
                <CopilotChatThread
                  messages={messages}
                  isThinking={isThinking}
                  onOpenExplainability={(resp) => setSelectedResponseForModal(resp)}
                  onFollowUpClick={(q) => handleSendQuery(q)}
                  onNavigate={(path) => onNavigate && onNavigate(path)}
                />

                {/* Question Input Box */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl space-y-3">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={queryInput}
                      onChange={(e) => setQueryInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
                      placeholder="Tanyakan hal apapun tentang bisnis Anda (e.g. Analisa penjualan bulan ini)..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-4 pr-12 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                    />
                    <button
                      onClick={() => handleSendQuery()}
                      disabled={!queryInput.trim() || isThinking}
                      className="absolute right-2 p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-lg transition disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono px-1">
                    <span>Mode Keamanan: READ-ONLY • Enkripsi AES-256 • Tenant Isolation</span>
                    <span>Diperkuat oleh Gemini 2.5 Flash</span>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: Data Source Registry */}
            {activeTab === 'sources' && (
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-cyan-400" /> Data Source Registry & Integrations
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Daftar database, sistem ERP, SIMRS, IoT stream, dan API terhubung yang menjadi sumber data deterministik Copilot.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dataSources.map((ds) => (
                    <div key={ds.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {ds.type}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {ds.connectionStatus}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white">{ds.name}</h4>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                        <div>Tabel: <strong className="text-slate-200">{ds.tablesCount}</strong></div>
                        <div>Total Rekaman: <strong className="text-slate-200">{ds.recordsCount.toLocaleString('id-ID')}</strong></div>
                        <div>Akses: <strong className="text-emerald-400 font-mono">READ-ONLY</strong></div>
                        <div>Sync Terakhir: <strong className="text-cyan-400">{ds.lastSync}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Business Semantic Layer */}
            {activeTab === 'semantic' && (
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-cyan-400" /> Business Semantic Layer & Metric Mapping
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Pemetaan dari istilah bisnis alami ke rumus agregasi SQL/API deterministik.
                  </p>
                </div>

                <div className="space-y-3">
                  {semanticMappings.map((map) => (
                    <div key={map.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-cyan-300">{map.displayName} ({map.metric})</span>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 font-bold">
                          Unit: {map.unit}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        Rumus SQL: <span className="text-emerald-400">{map.formula}</span> | Tabel Source: <span className="text-cyan-400">{map.sourceTable}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Learning Loop & Failed Queries */}
            {activeTab === 'learning_loop' && (
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-cyan-400" /> Learning Loop & Failed Question Tracker
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Daftar pertanyaan yang tidak berhasil dipetakan ke metrik. Admin dapat menambah pemetaan agar Copilot semakin cerdas.
                  </p>
                </div>

                <div className="space-y-3">
                  {failedQuestions.map((fq) => (
                    <div key={fq.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">"{fq.question}"</span>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300 font-bold uppercase">
                          {fq.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{fq.failureReason}</p>
                      {fq.notes && <div className="text-[11px] text-cyan-300 font-mono">Catatan Admin: {fq.notes}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: Audit Trail Logs */}
            {activeTab === 'audit' && (
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" /> Audit Trail & Compliance Log
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Jejak eksekusi query, pemeriksaan peran, dan verifikasi keamanan waktu nyata.
                  </p>
                </div>

                <div className="space-y-3">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{log.userName}</span>
                        <span className="text-[10px] font-mono text-slate-500">{log.timestamp}</span>
                      </div>
                      <div className="text-slate-300 font-mono">Query: "{log.question}"</div>
                      <div className="flex items-center gap-4 text-[10px] text-slate-400 pt-1 font-mono">
                        <span>Role: <strong className="text-purple-400">{log.userRole}</strong></span>
                        <span>Source: <strong className="text-cyan-400">{log.dataSource}</strong></span>
                        <span>Waktu: <strong className="text-emerald-400">{log.executionTimeMs}ms</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: Embedded Copilot Integration Code */}
            {activeTab === 'embedded' && (
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <LayoutGrid className="w-5 h-5 text-cyan-400" /> Embedded Copilot Integration API & Widget
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Gunakan kode snippet di bawah ini untuk memasang AI Business Copilot ke dalam aplikasi customer yang dibangun oleh SMART-AI.ID.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cyan-400 font-mono">1. Integration API Endpoint (POST /api/copilot/query)</span>
                      <button
                        onClick={() =>
                          handleCopyCode(`fetch('https://www.smart-ai.id/api/copilot/query', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_CLIENT_KEY' },
  body: JSON.stringify({ question: 'Analisa penjualan bulan ini.', industry: 'MINING', role: 'CEO' })
}).then(res => res.json()).then(data => console.log(data));`)
                        }
                        className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1"
                      >
                        {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedSnippet ? 'Tersalin' : 'Salin Code'}
                      </button>
                    </div>

                    <pre className="font-mono text-[11px] text-slate-300 bg-slate-900 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`fetch('https://www.smart-ai.id/api/copilot/query', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_CLIENT_KEY'
  },
  body: JSON.stringify({
    question: 'Analisa penjualan bulan ini.',
    industry: '${activeIndustry}',
    role: '${activeRole}'
  })
})
.then(res => res.json())
.then(data => console.log(data));`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Explainability Modal */}
      {selectedResponseForModal && (
        <ExplainabilityModal
          response={selectedResponseForModal}
          onClose={() => setSelectedResponseForModal(null)}
        />
      )}
    </div>
  );
};
