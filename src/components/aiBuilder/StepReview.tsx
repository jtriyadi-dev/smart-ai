import React from 'react';
import { AIBuilderInput } from '../../types';
import { Sparkles, Building2, AlertTriangle, Target, Users, Monitor, Layers, ArrowRight } from 'lucide-react';

interface StepReviewProps {
  formData: AIBuilderInput;
  onEditStep: (stepIndex: number) => void;
  onSubmit: () => void;
}

export const StepReview: React.FC<StepReviewProps> = ({ formData, onEditStep, onSubmit }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-left">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <span>Tinjau Ringkasan Kebutuhan Aplikasi</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Periksa kembali data yang telah Anda masukkan sebelum AI Application Architect memprosesnya.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-xs">
        {/* Business Summary Card */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold font-mono text-cyan-400 flex items-center gap-1.5 uppercase">
              <Building2 className="w-3.5 h-3.5" />
              1. Profil Bisnis
            </span>
            <button
              onClick={() => onEditStep(0)}
              className="text-[10px] text-slate-400 hover:text-cyan-300 underline cursor-pointer"
            >
              Ubah
            </button>
          </div>
          <p className="text-white font-semibold">{formData.businessName || 'Perusahaan Klien'}</p>
          <p className="text-slate-400">Industri: <span className="text-slate-200">{formData.businessIndustry || '-'}</span></p>
          <p className="text-slate-400">Skala Organisasi: <span className="text-slate-200">{formData.businessType || '-'}</span></p>
          <p className="text-slate-400">Lokasi: <span className="text-slate-200">{formData.businessLocation || '-'}</span></p>
          <p className="text-slate-300 italic bg-slate-950 p-2 rounded border border-slate-800 line-clamp-2">
            "{formData.businessDescription || '-'}"
          </p>
        </div>

        {/* Problem Summary Card */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold font-mono text-amber-400 flex items-center gap-1.5 uppercase">
              <AlertTriangle className="w-3.5 h-3.5" />
              2. Masalah Operasional
            </span>
            <button
              onClick={() => onEditStep(1)}
              className="text-[10px] text-slate-400 hover:text-amber-300 underline cursor-pointer"
            >
              Ubah
            </button>
          </div>
          <p className="text-slate-300 italic bg-slate-950 p-2 rounded border border-slate-800 line-clamp-2">
            "{formData.businessProblems || '-'}"
          </p>
          <div className="flex flex-wrap gap-1">
            {(formData.quickProblemSelections || []).map((p, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px]">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Requirements Summary Card */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold font-mono text-cyan-400 flex items-center gap-1.5 uppercase">
              <Target className="w-3.5 h-3.5" />
              3. Target & Ekspektasi
            </span>
            <button
              onClick={() => onEditStep(2)}
              className="text-[10px] text-slate-400 hover:text-cyan-300 underline cursor-pointer"
            >
              Ubah
            </button>
          </div>
          <p className="text-slate-300 italic bg-slate-950 p-2 rounded border border-slate-800 line-clamp-2">
            "{formData.requirementsGoalsText || '-'}"
          </p>
          <div className="flex flex-wrap gap-1">
            {(formData.goalsSelections || []).map((g, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px]">
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Scale & Platform Card */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold font-mono text-cyan-400 flex items-center gap-1.5 uppercase">
              <Users className="w-3.5 h-3.5" />
              4 & 5. Skala & Platform
            </span>
            <button
              onClick={() => onEditStep(3)}
              className="text-[10px] text-slate-400 hover:text-cyan-300 underline cursor-pointer"
            >
              Ubah
            </button>
          </div>
          <p className="text-slate-400">Target User: <span className="text-white font-semibold">{formData.userScale || '11-50'} users</span></p>
          <p className="text-slate-400">Cabang/Site: <span className="text-white font-semibold">{formData.branchesCount || '1'} site</span></p>
          <p className="text-slate-400">Platform: <span className="text-cyan-300 font-semibold">{(formData.platforms || []).join(', ') || 'Web Desktop'}</span></p>
        </div>
      </div>

      {/* Selected Features Card */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold font-mono text-cyan-400 flex items-center gap-1.5 uppercase">
            <Layers className="w-3.5 h-3.5" />
            6. Modul Fitur Terpilih ({(formData.selectedFeatures || []).length} Fitur)
          </span>
          <button
            onClick={() => onEditStep(5)}
            className="text-[10px] text-slate-400 hover:text-cyan-300 underline cursor-pointer"
          >
            Ubah
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {(formData.selectedFeatures || []).map((feat, i) => (
            <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-[11px]">
              {feat}
            </span>
          ))}
          {formData.customFeatures && (
            <span className="px-2.5 py-1 rounded-lg bg-purple-950 border border-purple-800 text-purple-300 text-[11px]">
              Custom: {formData.customFeatures}
            </span>
          )}
        </div>
      </div>

      {/* Trigger AI Button */}
      <div className="pt-4 border-t border-slate-800">
        <button
          onClick={onSubmit}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 text-white font-extrabold text-sm rounded-xl shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer glow-primary-cta"
        >
          <Sparkles className="w-5 h-5 text-cyan-200" />
          <span>Jalankan AI Application Architect Engine</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
