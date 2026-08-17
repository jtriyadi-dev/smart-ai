import React, { useState } from 'react';
import { X, Sparkles, Loader2, Code2, CheckCircle2, Terminal, ArrowRight, Building2 } from 'lucide-react';
import { AIScopeBlueprint } from '../types';

interface AIBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyBlueprintToForm: (blueprint: AIScopeBlueprint, prompt: string) => void;
}

export const AIBlueprintModal: React.FC<AIBlueprintModalProps> = ({ isOpen, onClose, onApplyBlueprintToForm }) => {
  const [prompt, setPrompt] = useState('');
  const [industry, setIndustry] = useState('Pertambangan');
  const [appType, setAppType] = useState('Custom Business Application & AI');
  const [isGenerating, setIsGenerating] = useState(false);
  const [blueprint, setBlueprint] = useState<AIScopeBlueprint | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim() && !appType) return;
    setIsGenerating(true);
    setBlueprint(null);

    try {
      const res = await fetch('/api/ai-scope-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, industry, appType })
      });

      const data = await res.json();
      if (data.success && data.blueprint) {
        setBlueprint(data.blueprint);
      }
    } catch (err) {
      // Fallback blueprint
      setBlueprint({
        summary: `Sistem ${appType} berbasis web custom untuk industri ${industry} yang mengintegrasikan otomatisasi alur kerja, analisis data real-time, dan model AI Google Gemini.`,
        recommendedStack: {
          frontend: 'React 19 + TypeScript + PWA Mobile Ready',
          backend: 'Node.js Express REST API',
          database: 'PostgreSQL / Supabase High Performance',
          aiEngine: 'Google Gemini 2.5 Flash Multimodal',
          cloud: 'Google Cloud Platform + Cloudflare'
        },
        coreModules: [
          `Dashboard Eksekutif ${industry}`,
          'Sistem Manajemen User & Multi-Role Access',
          'Otomatisasi Approval & Notifikasi WhatsApp',
          'Export Laporan PDF/Excel & Audit Log'
        ],
        aiCapabilities: [
          'Ringkasan Laporan AI Otomatis',
          'Pencarian Cerdas Dokumen SOP (RAG)',
          'Deteksi Anomali Data Operational'
        ],
        estimatedTimeWeeks: '3 - 5 Minggu',
        recommendedPhases: [
          { phase: 'Fase 1', duration: '1 Minggu', title: 'Discovery, Wireframe & DB Schema' },
          { phase: 'Fase 2', duration: '2-3 Minggu', title: 'Core App & AI Integration' },
          { phase: 'Fase 3', duration: '1 Minggu', title: 'Testing & Cloud Deployment' }
        ],
        budgetTier: 'Professional Custom Package'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApply = () => {
    if (blueprint) {
      onApplyBlueprintToForm(blueprint, prompt);
      onClose();
      const formEl = document.querySelector('#request-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl glass-card rounded-2xl border border-cyan-500/40 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto text-left space-y-6">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>INSTANT AI ARCHITECTURE BLUEPRINT GENERATOR</span>
          </div>

          <h3 className="text-2xl font-display font-bold text-white">
            Generasi Blueprint Arsitektur Aplikasi AI
          </h3>

          <p className="text-xs text-slate-300">
            Ketik deskripsi singkat kebutuhan aplikasi bisnis Anda. AI CTO SMART-AI.ID akan merancang rekomendasi tech stack, modul utama, dan estimasi waktu pengembangan.
          </p>
        </div>

        {/* Input Form */}
        <div className="space-y-4 bg-slate-950/80 p-5 rounded-xl border border-slate-800">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase font-mono block mb-1">
                Sektor Industri:
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase font-mono block mb-1">
                Jenis Aplikasi:
              </label>
              <input
                type="text"
                value={appType}
                onChange={(e) => setAppType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 uppercase font-mono block mb-1">
              Deskripsi Masalah / Alur Aplikasi yang Dibutuhkan:
            </label>
            <textarea
              rows={3}
              placeholder="Contoh: Saya butuh sistem kelapa sawit untuk pencatatan panen TBS di afdeling via HP offline, otomatisasi hitung gaji borongan, dan prediksi estimasi hasil panen..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-white placeholder-slate-500"
            ></textarea>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI CTO Sedang Merancang Blueprint Arsitektur...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate AI Solution Blueprint</span>
              </>
            )}
          </button>
        </div>

        {/* Blueprint Output Display */}
        {blueprint && (
          <div className="space-y-4 bg-slate-900/90 p-5 rounded-xl border border-cyan-500/40 animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                <span>Rekomendasi Arsitektur Solusi (SMART-AI Blueprint)</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Estimasi: {blueprint.estimatedTimeWeeks}
              </span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-950 p-3 rounded-lg border border-slate-800">
              "{blueprint.summary}"
            </p>

            {/* Recommended Stack */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-cyan-300 font-mono uppercase">1. Recommended Technology Stack:</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10.5px] font-mono">
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">Frontend</span>
                  <span className="text-slate-200">{blueprint.recommendedStack.frontend}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">Backend</span>
                  <span className="text-slate-200">{blueprint.recommendedStack.backend}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">Database</span>
                  <span className="text-slate-200">{blueprint.recommendedStack.database}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">AI Engine</span>
                  <span className="text-cyan-300 font-bold">{blueprint.recommendedStack.aiEngine}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">Cloud Infrastructure</span>
                  <span className="text-slate-200">{blueprint.recommendedStack.cloud}</span>
                </div>
              </div>
            </div>

            {/* Core Modules & AI Capabilities */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div>
                <div className="text-[11px] font-bold text-cyan-300 font-mono uppercase mb-1.5">2. Core Modules:</div>
                <div className="space-y-1">
                  {blueprint.coreModules.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-cyan-300 font-mono uppercase mb-1.5">3. AI Capabilities:</div>
                <div className="space-y-1">
                  {blueprint.aiCapabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={handleApply}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Gunakan Blueprint Ini & Terapkan ke Form Konsultasi</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
