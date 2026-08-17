import React, { useState } from 'react';
import { ProjectEstimationInput } from '../../types';
import { Sliders, CheckCircle2, ChevronDown, ChevronUp, Layers, Cpu, Globe, Users, Shield, Zap } from 'lucide-react';

interface ProjectConfigSummaryCardProps {
  input: ProjectEstimationInput;
  onUpdateInput: (updated: ProjectEstimationInput) => void;
}

export const ProjectConfigSummaryCard: React.FC<ProjectConfigSummaryCardProps> = ({
  input,
  onUpdateInput
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleChange = (field: keyof ProjectEstimationInput, value: any) => {
    onUpdateInput({
      ...input,
      [field]: value
    });
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl mb-8">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Ringkasan Parameter Proyek</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
                {input.industry} ({input.businessType})
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Parameter berikut dibaca dari konfigurasi modul & requirement Anda. Klik untuk menyesuaikan ulang.
            </p>
          </div>
        </div>

        <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Primary Key Metric Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-5">
        <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Skala Modul</span>
          </div>
          <p className="text-sm font-bold text-white">{input.modulesCount || 10} Modul</p>
          <span className="text-[10px] text-slate-500">~{input.featuresCount || 40} Fitur Utama</span>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span>Target Platform</span>
          </div>
          <p className="text-sm font-bold text-white">{input.platform}</p>
          <span className="text-[10px] text-slate-500">{input.projectScale} Scale</span>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Estimasi User</span>
          </div>
          <p className="text-sm font-bold text-white">{input.usersCount} User</p>
          <span className="text-[10px] text-slate-500">{input.userRolesCount} Role Akses</span>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>Tingkat AI</span>
          </div>
          <p className="text-sm font-bold text-white">{input.aiLevel}</p>
          <span className="text-[10px] text-slate-500">Gemini 2.5 Engine</span>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>API Integrasi</span>
          </div>
          <p className="text-sm font-bold text-white">{input.apiIntegrationsCount} Integrasi</p>
          <span className="text-[10px] text-slate-500">Realtime: {input.realtimeLevel}</span>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Shield className="w-3.5 h-3.5 text-rose-400" />
            <span>Prioritas Proyek</span>
          </div>
          <p className="text-sm font-bold text-white">{input.projectPriority}</p>
          <span className="text-[10px] text-slate-500">{input.securityLevel}</span>
        </div>
      </div>

      {/* Collapsible Parameter Editor Form */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/40 p-5 rounded-2xl">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Target Platform</label>
            <select
              value={input.platform}
              onChange={(e) => handleChange('platform', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="Web">Web Application Only</option>
              <option value="Mobile">Mobile Application Only</option>
              <option value="Web + Mobile">Web + Mobile App (Android & iOS)</option>
              <option value="PWA">Progressive Web App (PWA)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Prioritas Pengerjaan</label>
            <select
              value={input.projectPriority}
              onChange={(e) => handleChange('projectPriority', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="Fast Delivery">Fast Delivery (Akselerasi Waktu Launching)</option>
              <option value="Balanced">Balanced (Kecepatan & Kualitas Seimbang)</option>
              <option value="Maximum Quality">Maximum Quality (Pengujian Mendalam & Refactoring)</option>
              <option value="Enterprise Grade">Enterprise Grade (Audit ISO, HA & Scaling)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Tingkat Kecerdasan AI</label>
            <select
              value={input.aiLevel}
              onChange={(e) => handleChange('aiLevel', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="None">None (Tanpa Fitur AI)</option>
              <option value="Basic">Basic (AI Chat Assistant & Prompting Sederhana)</option>
              <option value="Intermediate">Intermediate (AI Recommendations, Document OCR & Analytics)</option>
              <option value="Advanced">Advanced (Predictive Forecasting, RAG Pipeline & Multi-Agent)</option>
              <option value="Enterprise">Enterprise (Custom Fine-tuned LLM, Realtime Computer Vision)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Jumlah Modul Utama</label>
            <input
              type="number"
              min={1}
              max={50}
              value={input.modulesCount}
              onChange={(e) => handleChange('modulesCount', parseInt(e.target.value) || 1)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Jumlah API / Integrasi Eksternal</label>
            <input
              type="number"
              min={0}
              max={20}
              value={input.apiIntegrationsCount}
              onChange={(e) => handleChange('apiIntegrationsCount', parseInt(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Kebutuhan Realtime / Sync</label>
            <select
              value={input.realtimeLevel}
              onChange={(e) => handleChange('realtimeLevel', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="None">None (Standard Request-Response API)</option>
              <option value="Basic">Basic (Realtime Dashboard Updates / WebSockets)</option>
              <option value="Advanced">Advanced (Live GPS Fleet Tracking, IoT, Realtime Chat)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
