import React from 'react';
import { Target, Sparkles, CheckCircle } from 'lucide-react';
import { IndustryUseCaseItem } from '../../types';

interface UseCaseSectionProps {
  useCases: IndustryUseCaseItem[];
}

export const UseCaseSection: React.FC<UseCaseSectionProps> = ({ useCases }) => {
  return (
    <section className="py-16 bg-slate-900/50 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-800/50 px-3 py-1 rounded-full">
            Real-World Use Cases
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            Studi Kasus Penerapan Nyata
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Bagaimana modul & AI bekerja menyelesaikan skenario operasional lapangan yang kompleks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((uc, idx) => (
            <div
              key={uc.id || idx}
              className="bg-slate-950 border border-slate-800 hover:border-blue-700/50 rounded-2xl p-6 transition-all space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-950 border border-blue-800 text-blue-400">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{uc.title}</h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="font-semibold text-slate-400 block mb-1">Skenario Masalah:</span>
                  <p className="text-slate-300">{uc.scenario}</p>
                </div>

                <div className="bg-purple-950/40 p-3 rounded-xl border border-purple-900/40">
                  <span className="font-semibold text-purple-300 block mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Peran Kecerdasan AI:
                  </span>
                  <p className="text-purple-200">{uc.aiRole}</p>
                </div>

                <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/40">
                  <span className="font-semibold text-emerald-300 block mb-1 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Hasil Akhir (Outcome):
                  </span>
                  <p className="text-emerald-200 font-medium">{uc.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
