import React from 'react';
import { ApplicationAnalysis, RequirementAnalyzerInput } from '../../types';
import { Sparkles, Building2, Layers, Cpu, Check, AlertTriangle, Monitor, Users, CheckSquare, Target } from 'lucide-react';

interface RequirementBlueprintBannerProps {
  blueprint: ApplicationAnalysis | null;
  inputData: RequirementAnalyzerInput;
  onChangeInputData: (newInput: RequirementAnalyzerInput) => void;
  onUseBlueprint: () => void;
  onUseManual: () => void;
  isUsingBlueprint: boolean;
}

export const RequirementBlueprintBanner: React.FC<RequirementBlueprintBannerProps> = ({
  blueprint,
  inputData,
  onChangeInputData,
  onUseBlueprint,
  onUseManual,
  isUsingBlueprint
}) => {
  const depthOptions: Array<'Basic' | 'Standard' | 'Detailed' | 'Enterprise'> = [
    'Basic',
    'Standard',
    'Detailed',
    'Enterprise'
  ];

  const priorityOptions = [
    'Cost Efficiency',
    'Speed',
    'Scalability',
    'Security',
    'Automation',
    'AI Capability'
  ];

  const handleTogglePriority = (p: string) => {
    const current = inputData.priority || [];
    let updated: string[];
    if (current.includes(p)) {
      updated = current.filter((x) => x !== p);
    } else {
      updated = [...current, p];
    }
    onChangeInputData({ ...inputData, priority: updated });
  };

  const handleSetDepth = (depth: 'Basic' | 'Standard' | 'Detailed' | 'Enterprise') => {
    onChangeInputData({ ...inputData, requirementDepth: depth });
  };

  return (
    <div className="space-y-6">
      {/* Blueprint Detection Alert Banner */}
      {blueprint ? (
        <div className="glass-card rounded-2xl p-6 border border-cyan-500/40 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  BLUEPRINT DITEMUKAN DARI AI APPLICATION BUILDER
                </div>
                <h3 className="text-lg font-extrabold text-white">
                  {blueprint.recommendedSolution?.solutionName || 'Aplikasi Custom AI'}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onUseBlueprint}
                className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                  isUsingBlueprint
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Gunakan Blueprint Ini</span>
              </button>

              <button
                type="button"
                onClick={onUseManual}
                className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  !isUsingBlueprint
                    ? 'bg-cyan-500 text-slate-950 font-black'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                <span>Mulai dari Manual Requirement</span>
              </button>
            </div>
          </div>

          {/* Blueprint Data Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-slate-400 flex items-center gap-1 font-mono text-[10px]">
                <Building2 className="w-3 h-3 text-cyan-400" />
                <span>BISNIS & INDUSTRI</span>
              </div>
              <p className="font-bold text-slate-200 truncate">{inputData.businessProfile.name || 'Klien'}</p>
              <p className="text-[11px] text-slate-400">{inputData.businessProfile.industry}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-slate-400 flex items-center gap-1 font-mono text-[10px]">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span>MASALAH UTAMA</span>
              </div>
              <p className="font-medium text-slate-300 line-clamp-2 text-[11px]">
                {inputData.businessProblems || '-'}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-slate-400 flex items-center gap-1 font-mono text-[10px]">
                <Users className="w-3 h-3 text-emerald-400" />
                <span>SKALA USER & PLATFORM</span>
              </div>
              <p className="font-bold text-slate-200">{inputData.companyScale.userScale} Users</p>
              <p className="text-[11px] text-slate-400 truncate">{inputData.platform.join(', ') || 'Web'}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-slate-400 flex items-center gap-1 font-mono text-[10px]">
                <Layers className="w-3 h-3 text-indigo-400" />
                <span>MODUL REKOMENDASI</span>
              </div>
              <p className="font-bold text-cyan-300">
                {blueprint.recommendedModules?.length || 0} Modul AI Terdefinisi
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Mode Input: <strong>Manual Software Requirement Input</strong></span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Belum ada blueprint tersimpan</span>
        </div>
      )}

      {/* Analysis Configuration Section */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
          <Target className="w-4 h-4" />
          <span>OPSI KONFIGURASI ANALISIS REQUIREMENT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Requirement Depth Level */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              Requirement Depth (Kedalaman Spesifikasi)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {depthOptions.map((depth) => {
                const isSel = inputData.requirementDepth === depth;
                return (
                  <button
                    key={depth}
                    type="button"
                    onClick={() => handleSetDepth(depth)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                      isSel
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {depth}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-500">
              Default: <strong>Standard</strong>. Untuk sistem enterprise kompleks, pilih <strong>Detailed</strong> atau <strong>Enterprise</strong>.
            </p>
          </div>

          {/* Project Priorities Multi-Select */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              Prioritas Utama Proyek (Pilih beberapa)
            </label>
            <div className="flex flex-wrap gap-2">
              {priorityOptions.map((p) => {
                const isChecked = (inputData.priority || []).includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleTogglePriority(p)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-md border flex items-center justify-center ${isChecked ? 'bg-cyan-500 border-cyan-400' : 'border-slate-700'}`}>
                      {isChecked && <Check className="w-2.5 h-2.5 text-slate-950 font-bold" />}
                    </div>
                    <span>{p}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
