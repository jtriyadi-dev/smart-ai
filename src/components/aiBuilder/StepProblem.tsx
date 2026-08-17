import React from 'react';
import { AIBuilderInput } from '../../types';
import { AlertTriangle, Check, Sparkles, Layers } from 'lucide-react';

interface StepProblemProps {
  formData: AIBuilderInput;
  onChange: (field: keyof AIBuilderInput, value: any) => void;
  errors: Record<string, string>;
}

export const StepProblem: React.FC<StepProblemProps> = ({ formData, onChange, errors }) => {
  const quickOptions = [
    'Manual Data Entry',
    'Excel Management',
    'Paper Based Process',
    'Disconnected Systems',
    'Slow Reporting',
    'Inventory Problems',
    'Production Monitoring',
    'Employee Management',
    'Customer Management',
    'Other'
  ];

  const toggleQuickOption = (opt: string) => {
    const current = formData.quickProblemSelections || [];
    if (current.includes(opt)) {
      onChange('quickProblemSelections', current.filter((item) => item !== opt));
    } else {
      onChange('quickProblemSelections', [...current, opt]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-left">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-amber-400" />
          <span>Apa Masalah yang Ingin Anda Selesaikan?</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Identifikasi kendala operasional, bottleneck pencatatan, atau inefisiensi yang sering terjadi saat ini.
        </p>
      </div>

      {/* Main Textarea */}
      <div>
        <label className="text-xs font-bold text-slate-300 uppercase font-mono block mb-1.5 flex items-center justify-between">
          <span>Jelaskan proses atau masalah bisnis Anda saat ini <span className="text-red-400">*</span></span>
          <span className="text-[10px] text-slate-500 font-normal">Sebutkan kendala utama</span>
        </label>
        <textarea
          rows={4}
          placeholder="Contoh: Saat ini data produksi masih menggunakan Excel. Monitoring alat berat belum realtime dan laporan dibuat manual."
          value={formData.businessProblems}
          onChange={(e) => onChange('businessProblems', e.target.value)}
          className={`w-full bg-slate-900/90 border rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all ${
            errors.businessProblems ? 'border-red-500' : 'border-slate-700/80'
          }`}
        ></textarea>
        {errors.businessProblems && (
          <p className="text-[11px] text-red-400 mt-1">{errors.businessProblems}</p>
        )}
      </div>

      {/* Quick Select Chips */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300 uppercase font-mono block">
          Pilihan Masalah Cepat (Bisa Pilih Lebih dari Satu):
        </label>
        <div className="flex flex-wrap gap-2">
          {quickOptions.map((opt) => {
            const isSelected = (formData.quickProblemSelections || []).includes(opt);
            return (
              <button
                type="button"
                key={opt}
                onClick={() => toggleQuickOption(opt)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-950/80 border-amber-500/80 text-amber-300 font-semibold shadow-sm'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[10px] ${
                  isSelected ? 'bg-amber-500 border-amber-400 text-black' : 'border-slate-700'
                }`}>
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        <span>AI akan menganalisis setiap poin kendala untuk merancang modul dan pencegahan risiko yang relevan.</span>
      </div>
    </div>
  );
};
