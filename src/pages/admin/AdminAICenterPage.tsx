import React, { useState } from 'react';
import { Sparkles, Cpu, Settings, Database, MessageSquare, ThumbsUp, ThumbsDown, Save, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AdminControlService } from '../../services/AdminControlService';
import { useRouter } from '../../lib/router';

export const AdminAICenterPage: React.FC = () => {
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'conversations'>('overview');
  const [settings, setSettings] = useState(AdminControlService.getSettings());
  const [saveSuccess, setSaveSuccess] = useState(false);

  const aiFeedbackLogs = [
    {
      id: 'FB-001',
      question: 'Berapa perkiraan waktu pembuatan aplikasi fleet tracking pertambangan?',
      response: 'Estimasi waktu pengembangan adalah 4 hingga 6 minggu dengan modul OCR & Telemetry.',
      feedback: 'Helpful',
      timestamp: 'Hari Ini, 08:30'
    },
    {
      id: 'FB-002',
      question: 'Apakah SMART-AI.ID mendukung integrasi SIMRS ICD-10?',
      response: 'Ya, modul AI Hospital kami siap diintegrasikan dengan SIMRS via REST API & HL7/FHIR.',
      feedback: 'Helpful',
      timestamp: 'Kemarin, 14:10'
    },
    {
      id: 'FB-003',
      question: 'Bisakah saya meminta komparasi harga retensi bulanan?',
      response: 'Kami menyediakan skema Retainer SLA 99.9% mulai dari Rp 15.000.000/bulan.',
      feedback: 'Not Helpful',
      timestamp: '12 Aug 2026'
    }
  ];

  const handleSaveAIConfig = (e: React.FormEvent) => {
    e.preventDefault();
    AdminControlService.saveSettings(settings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Tab Header */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'overview' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          AI Telemetry & Activity
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'settings' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Model Architecture Config
        </button>
        <button
          onClick={() => setActiveTab('conversations')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'conversations' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Chatbot Feedback Logs
        </button>
        <button
          onClick={() => navigate('/admin/knowledge')}
          className="ml-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 text-xs font-bold flex items-center gap-1.5"
        >
          <Database className="w-3.5 h-3.5" />
          <span>Kelola Knowledge Base →</span>
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Telemetry Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Total AI Requests</span>
              <div className="text-2xl font-extrabold text-cyan-400 font-display">1,420</div>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">App Builder Sessions</span>
              <div className="text-2xl font-extrabold text-purple-400 font-display">380</div>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Requirement Analyses</span>
              <div className="text-2xl font-extrabold text-indigo-400 font-display">210</div>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Proposals Generated</span>
              <div className="text-2xl font-extrabold text-amber-400 font-display">85</div>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Sales Analyses</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-display">145</div>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Chatbot Dialogs</span>
              <div className="text-2xl font-extrabold text-rose-400 font-display">600</div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-purple-500/30 bg-slate-900/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-300">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI ENGINE HEALTH & PERFORMANCE</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                100% OPERATIONAL
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Provider Google AI Studio / Gemini 2.5 Flash aktif dengan waktu respon rata-rata 1.2 detik dan tingkat keberhasilan generasi 99.4%.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
              <Settings className="w-4 h-4 text-purple-400" />
              <span>AI MODEL ARCHITECTURE CONFIGURATION</span>
            </h3>
            {saveSuccess && (
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Pengaturan Tersimpan!</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSaveAIConfig} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">AI Provider</label>
                <input
                  type="text"
                  value={settings.aiConfig.provider}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      aiConfig: { ...settings.aiConfig, provider: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Model Name</label>
                <input
                  type="text"
                  value={settings.aiConfig.model}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      aiConfig: { ...settings.aiConfig, model: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan-300 font-mono font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Temperature</label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.aiConfig.temperature}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      aiConfig: { ...settings.aiConfig, temperature: parseFloat(e.target.value) }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Max Tokens</label>
                <input
                  type="number"
                  value={settings.aiConfig.maxTokens}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      aiConfig: { ...settings.aiConfig, maxTokens: parseInt(e.target.value) }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">System Prompt Context</label>
              <textarea
                rows={4}
                value={settings.aiConfig.systemPrompt}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    aiConfig: { ...settings.aiConfig, systemPrompt: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">API Key Architecture Storage</label>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between font-mono text-emerald-400">
                <span>{settings.aiConfig.maskedApiKey}</span>
                <span className="text-[10px] text-slate-500">Secured via process.env.GEMINI_API_KEY</span>
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Konfigurasi AI Engine</span>
            </button>
          </form>
        </div>
      )}

      {activeTab === 'conversations' && (
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>CHATBOT FEEDBACK LOGS</span>
            </h3>
            <span className="text-xs font-mono text-purple-400 font-bold">Helpful Rate: 96%</span>
          </div>

          <div className="space-y-3">
            {aiFeedbackLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="font-bold text-cyan-400">{log.id}</span>
                  <span>{log.timestamp}</span>
                </div>
                <div className="font-bold text-white">Q: {log.question}</div>
                <div className="text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  AI: {log.response}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-mono text-slate-500">User Rating:</span>
                  {log.feedback === 'Helpful' ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      <span>Helpful</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-mono font-bold flex items-center gap-1">
                      <ThumbsDown className="w-3 h-3" />
                      <span>Not Helpful</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
