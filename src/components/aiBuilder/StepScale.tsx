import React from 'react';
import { AIBuilderInput } from '../../types';
import { Users, Building, Activity, Globe2, Sparkles } from 'lucide-react';

interface StepScaleProps {
  formData: AIBuilderInput;
  onChange: (field: keyof AIBuilderInput, value: any) => void;
}

export const StepScale: React.FC<StepScaleProps> = ({ formData, onChange }) => {
  const userScaleOptions: AIBuilderInput['userScale'][] = ['1–10', '11–50', '51–100', '101–500', '500+'];
  const branchOptions: AIBuilderInput['branchesCount'][] = ['1', '2–5', '6–20', '21–50', '50+'];
  const txOptions: AIBuilderInput['estimatedTransactions'][] = ['Low', 'Medium', 'High', 'Very High'];
  const locOptions: AIBuilderInput['operationalLocations'][] = ['Single Location', 'Multiple Locations', 'Multi-Region', 'Multi-Country'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-left">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-cyan-400" />
          <span>Skala & Kompleksitas Operasional</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Bantu AI memperkirakan kapasitas server, optimasi database, dan performa infrastruktur cloud.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* User Scale */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase font-mono block flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Jumlah Pengguna Sistem (Users)</span>
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {userScaleOptions.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => onChange('userScale', opt)}
                className={`py-2.5 px-1 rounded-xl text-xs font-medium text-center transition-all cursor-pointer border ${
                  formData.userScale === opt
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Branches */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase font-mono block flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-cyan-400" />
            <span>Jumlah Cabang / Site Operasional</span>
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {branchOptions.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => onChange('branchesCount', opt)}
                className={`py-2.5 px-1 rounded-xl text-xs font-medium text-center transition-all cursor-pointer border ${
                  formData.branchesCount === opt
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Transactions */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase font-mono block flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Estimasi Volume Transaksi / Input Data</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {txOptions.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => onChange('estimatedTransactions', opt)}
                className={`py-2.5 px-2 rounded-xl text-xs font-medium text-center transition-all cursor-pointer border ${
                  formData.estimatedTransactions === opt
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Operational Locations */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase font-mono block flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cakupan Wilayah Operasional</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {locOptions.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => onChange('operationalLocations', opt)}
                className={`py-2 px-2 rounded-xl text-[11px] font-medium text-center transition-all cursor-pointer border ${
                  formData.operationalLocations === opt
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>Arsitektur cloud SMART-AI.ID siap dikonfigurasi untuk auto-scaling hingga jutaan request/hari tanpa kemacetan.</span>
      </div>
    </div>
  );
};
