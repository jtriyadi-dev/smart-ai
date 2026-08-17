import React from 'react';
import { AIBuilderInput } from '../../types';
import { Monitor, Smartphone, Tablet, Laptop, Check, Sparkles, ShieldCheck } from 'lucide-react';

interface StepPlatformProps {
  formData: AIBuilderInput;
  onChange: (field: keyof AIBuilderInput, value: any) => void;
}

export const StepPlatform: React.FC<StepPlatformProps> = ({ formData, onChange }) => {
  const platformOptions = [
    { id: 'Web Desktop', name: 'Web Desktop', desc: 'Akses browser layar lebar PC & Komputer Office', icon: Monitor },
    { id: 'Laptop', name: 'Laptop / Notebook', desc: 'Didesain optimal untuk fleksibilitas kerja mobile', icon: Laptop },
    { id: 'Tablet', name: 'Tablet (iPad / Android)', desc: 'Cocok untuk inspeksi lapangan & kasir POS', icon: Tablet },
    { id: 'Android', name: 'Android Native App', desc: 'Aplikasi Android APK / Play Store dedicated', icon: Smartphone },
    { id: 'iPhone', name: 'iPhone / iOS App', desc: 'Aplikasi iOS Apple App Store dedicated', icon: Smartphone },
    { id: 'Mobile Browser', name: 'Mobile Web Browser', desc: 'Responsif instan via Chrome / Safari smartphone', icon: Smartphone },
    { id: 'PWA', name: 'PWA (Progressive Web App)', desc: 'Bisa diinstall layaknya app tanpa Play Store/App Store', icon: Sparkles }
  ];

  const togglePlatform = (id: string) => {
    const current = formData.platforms || [];
    if (current.includes(id)) {
      onChange('platforms', current.filter((p) => p !== id));
    } else {
      onChange('platforms', [...current, id]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-left">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
          <Monitor className="w-6 h-6 text-cyan-400" />
          <span>Platform & Perangkat Pengakses</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Pilih di mana tim, operator, atau jajaran direksi Anda akan mengakses aplikasi ini sehari-hari.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {platformOptions.map((plat) => {
          const IconComp = plat.icon;
          const isSelected = (formData.platforms || []).includes(plat.id);
          const isPwa = plat.id === 'PWA';

          return (
            <button
              type="button"
              key={plat.id}
              onClick={() => togglePlatform(plat.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer relative group ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-950/90 to-slate-900 border-cyan-500/90 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-xl border ${
                  isSelected ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                  isSelected ? 'bg-cyan-500 border-cyan-400 text-black font-bold' : 'border-slate-700'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {plat.name}
                  </h4>
                  {isPwa && (
                    <span className="text-[9px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-700/60 px-1.5 py-0.5 rounded">
                      Rekomendasi
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {plat.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-300 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>Arsitektur modern SMART-AI.ID menggunakan single codebase cross-platform yang menghemat biaya hingga 60%.</span>
      </div>
    </div>
  );
};
