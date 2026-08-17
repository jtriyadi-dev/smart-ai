import React from 'react';
import { AIBuilderInput } from '../../types';
import { Target, Check, Sparkles, Cpu } from 'lucide-react';

interface StepRequirementsProps {
  formData: AIBuilderInput;
  onChange: (field: keyof AIBuilderInput, value: any) => void;
  errors: Record<string, string>;
}

export const StepRequirements: React.FC<StepRequirementsProps> = ({ formData, onChange, errors }) => {
  const goalOptions = [
    'Automation',
    'Centralized Data',
    'Real-time Monitoring',
    'Better Reporting',
    'Cost Reduction',
    'Productivity Improvement',
    'Data Analytics',
    'Decision Support',
    'Customer Service',
    'Operational Control'
  ];

  const toggleGoal = (goal: string) => {
    const current = formData.goalsSelections || [];
    if (current.includes(goal)) {
      onChange('goalsSelections', current.filter((item) => item !== goal));
    } else {
      onChange('goalsSelections', [...current, goal]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-left">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
          <Target className="w-6 h-6 text-cyan-400" />
          <span>Bagaimana Anda Ingin Aplikasi Bekerja?</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Definisikan ekspektasi hasil, tujuan efisiensi, dan alur aplikasi impian yang Anda butuhkan.
        </p>
      </div>

      {/* Requirements Goals Text */}
      <div>
        <label className="text-xs font-bold text-slate-300 uppercase font-mono block mb-1.5 flex items-center justify-between">
          <span>Jelaskan ekspektasi & alur ideal aplikasi <span className="text-red-400">*</span></span>
          <span className="text-[10px] text-slate-500 font-normal">Sebutkan hasil akhir yang diharapkan</span>
        </label>
        <textarea
          rows={4}
          placeholder="Contoh: Saya ingin semua data produksi dapat dimasukkan ke satu sistem, laporan terbentuk otomatis, dan manajemen dapat melihat dashboard realtime dari mana saja."
          value={formData.requirementsGoalsText}
          onChange={(e) => onChange('requirementsGoalsText', e.target.value)}
          className={`w-full bg-slate-900/90 border rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all ${
            errors.requirementsGoalsText ? 'border-red-500' : 'border-slate-700/80'
          }`}
        ></textarea>
        {errors.requirementsGoalsText && (
          <p className="text-[11px] text-red-400 mt-1">{errors.requirementsGoalsText}</p>
        )}
      </div>

      {/* Goal Cards */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300 uppercase font-mono block">
          Target Utama yang Ingin Dicapai (Pilih beberapa):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {goalOptions.map((goal) => {
            const isSelected = (formData.goalsSelections || []).includes(goal);
            return (
              <button
                type="button"
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`p-3 rounded-xl text-xs font-medium transition-all text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer border ${
                  isSelected
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold shadow-md shadow-cyan-950/50'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                  isSelected ? 'bg-cyan-500 border-cyan-400 text-black' : 'border-slate-700'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span>{goal}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-300 flex items-center gap-2">
        <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>Pilihan target Anda akan menentukan prioritas arsitektur backend, skema database, dan integrasi AI.</span>
      </div>
    </div>
  );
};
