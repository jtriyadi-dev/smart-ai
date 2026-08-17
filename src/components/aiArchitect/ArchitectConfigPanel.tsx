import React from 'react';
import { SolutionArchitectInput } from '../../types';
import { Settings, Sparkles, Server, Cpu, Cloud, Layers, ShieldCheck, Zap } from 'lucide-react';

interface ArchitectConfigPanelProps {
  inputData: SolutionArchitectInput;
  onChange: (updated: SolutionArchitectInput) => void;
  onGenerate: () => void;
  isGenerating?: boolean;
}

const APP_TYPES = [
  'Web Application',
  'SaaS',
  'Enterprise Application',
  'Internal Business System',
  'Mobile + Web',
  'PWA'
];

const SCALES = [
  { id: 'Small', label: 'Small', desc: '1-20 Users / Startup' },
  { id: 'Medium', label: 'Medium', desc: '20-200 Users / Mid-Market' },
  { id: 'Large', label: 'Large', desc: '200-2000 Users / Enterprise' },
  { id: 'Enterprise', label: 'Enterprise', desc: '2000+ Users / Multi-National' }
];

const PRIORITIES = [
  'Performance',
  'Security',
  'Scalability',
  'Cost Efficiency',
  'AI Capability',
  'Availability'
];

const DEPLOYMENT_PREFS = [
  { id: 'Cloud', label: 'Cloud Hosted (GCP / Cloud Run / Vercel)' },
  { id: 'On-Premise', label: 'On-Premise (Private Data Center)' },
  { id: 'Hybrid', label: 'Hybrid Cloud & Local DB' },
  { id: 'Not Decided', label: 'Belum Ditentukan / Konsultasikan' }
];

const AI_PREFS = [
  { id: 'AI Optional', label: 'AI Optional', desc: 'Fokus pada core CRUD system' },
  { id: 'AI Recommended', label: 'AI Recommended', desc: 'Integrasi AI Copilot & Document OCR' },
  { id: 'AI Core', label: 'AI Core System', desc: 'Arsitektur berpusat pada model & agent AI' }
];

export const ArchitectConfigPanel: React.FC<ArchitectConfigPanelProps> = ({
  inputData,
  onChange,
  onGenerate,
  isGenerating = false
}) => {
  const selectedPriorities = inputData.priority || ['Performance', 'Security', 'Scalability'];

  const togglePriority = (p: string) => {
    if (selectedPriorities.includes(p)) {
      onChange({ ...inputData, priority: selectedPriorities.filter((item) => item !== p) });
    } else {
      onChange({ ...inputData, priority: [...selectedPriorities, p] });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 text-white shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-xl text-white shadow-md">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Architecture Configuration Preferences</h3>
          <p className="text-xs text-slate-400">
            Sesuaikan parameter preferensi arsitektur teknis sebelum AI merancang diagram dan spesifikasi sistem.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Application Type */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> Application Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {APP_TYPES.map((type) => {
              const active = inputData.applicationType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onChange({ ...inputData, applicationType: type as any })}
                  className={`p-2.5 rounded-lg text-xs font-semibold text-center border transition ${
                    active
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-300 shadow-sm'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* System Scale */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-blue-400" /> System Scale Target
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SCALES.map((sc) => {
              const active = inputData.scale === sc.id;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => onChange({ ...inputData, scale: sc.id as any })}
                  className={`p-2.5 rounded-lg text-xs text-left border transition ${
                    active
                      ? 'bg-blue-950 border-blue-500 text-blue-300 shadow-sm'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold">{sc.label}</div>
                  <div className="text-[10px] opacity-70">{sc.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Architecture Priorities */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Architecture Priorities
          </label>
          <div className="flex flex-wrap gap-1.5">
            {PRIORITIES.map((priority) => {
              const active = selectedPriorities.includes(priority);
              return (
                <button
                  key={priority}
                  type="button"
                  onClick={() => togglePriority(priority)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium border transition ${
                    active
                      ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {priority} {active && '✓'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Deployment Preference */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Cloud className="w-3.5 h-3.5 text-sky-400" /> Deployment Preference
          </label>
          <select
            value={inputData.deploymentPreference || 'Cloud'}
            onChange={(e) => onChange({ ...inputData, deploymentPreference: e.target.value as any })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {DEPLOYMENT_PREFS.map((dp) => (
              <option key={dp.id} value={dp.id}>
                {dp.label}
              </option>
            ))}
          </select>
        </div>

        {/* AI Preference */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AI Architecture Mode
          </label>
          <div className="space-y-1.5">
            {AI_PREFS.map((aip) => {
              const active = inputData.aiArchitecturePreference === aip.id;
              return (
                <button
                  key={aip.id}
                  type="button"
                  onClick={() => onChange({ ...inputData, aiArchitecturePreference: aip.id as any })}
                  className={`w-full p-2 rounded-lg text-xs text-left border flex items-center justify-between transition ${
                    active
                      ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                      : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="font-semibold">{aip.label}</span>
                  <span className="text-[10px] opacity-70 hidden sm:inline">{aip.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-4 border-t border-slate-800/80 flex justify-end">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="px-8 py-3.5 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-600/20 hover:shadow-cyan-600/30 flex items-center gap-2.5 transition transform active:scale-98 disabled:opacity-50"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          {isGenerating ? 'Designing Architecture...' : 'Generate Architecture Diagram'}
        </button>
      </div>
    </div>
  );
};
