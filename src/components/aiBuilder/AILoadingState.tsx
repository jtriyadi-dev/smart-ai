import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, Cpu, ShieldCheck, Database, Layers } from 'lucide-react';

interface AILoadingStateProps {
  businessName?: string;
  industry?: string;
}

export const AILoadingState: React.FC<AILoadingStateProps> = ({ businessName, industry }) => {
  const loadingSteps = [
    { title: 'Menganalisis Profil Bisnis & Operasional', desc: `Mengevaluasi karakteristik industri ${industry || 'Enterprise'}...`, icon: Bot },
    { title: 'Memetakan Bottleneck & Risiko Digital', desc: 'Merumuskan digital opportunity dan eliminasi inefisiensi...', icon: Cpu },
    { title: 'Merancang Struktur Modul & Hak Akses RBAC', desc: 'Membangun skema database relasional & otorisasi user...', icon: Database },
    { title: 'Menyusun Alur Kerja Bisnis & Model AI', desc: 'Mengintegrasikan Google Gemini AI Assistant & Document OCR...', icon: Layers },
    { title: 'Kalkulasi Skor Kesiapan Digital & Cloud Architecture', desc: 'Menyiapkan estimasi fasa pengembangan & infrastruktur...', icon: ShieldCheck }
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = loadingSteps[currentStepIndex].icon;

  return (
    <div className="py-16 px-4 max-w-2xl mx-auto text-center space-y-8 animate-in fade-in duration-300">
      
      {/* Animated AI Brain Glow Icon */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[2px] animate-pulse shadow-2xl shadow-cyan-500/40">
          <div className="w-full h-full bg-[#080d1a] rounded-[22px] flex items-center justify-center">
            <CurrentIcon className="w-10 h-10 text-cyan-400 animate-bounce" />
          </div>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-md">
          <Sparkles className="w-4 h-4 animate-spin" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
          AI CTO Architect Sedang Bekerja...
        </h3>
        <p className="text-xs sm:text-sm text-cyan-400 font-mono">
          {businessName ? `Merumuskan Blueprint untuk: ${businessName}` : 'Merumuskan Cetak Biru Arsitektur Aplikasi Custom'}
        </p>
      </div>

      {/* Progress Steps Indicators */}
      <div className="space-y-3 bg-slate-900/80 p-6 rounded-2xl border border-cyan-500/30 text-left">
        {loadingSteps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div key={idx} className="flex items-start gap-3 transition-all">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                isDone
                  ? 'bg-emerald-500 text-black'
                  : isCurrent
                  ? 'bg-cyan-500 text-black animate-ping'
                  : 'bg-slate-800 text-slate-500 border border-slate-700'
              }`}>
                {isDone ? '✓' : idx + 1}
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-bold transition-colors ${
                  isCurrent ? 'text-cyan-300 font-display' : isDone ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {step.title}
                </p>
                {isCurrent && (
                  <p className="text-[11px] text-slate-400 mt-0.5 animate-in fade-in">
                    {step.desc}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-slate-500 italic">
        Proses ini membutuhkan waktu beberapa detik untuk memastikan analisis arsitektur aplikasi presisi dan dapat dipertanggungjawabkan.
      </p>
    </div>
  );
};
