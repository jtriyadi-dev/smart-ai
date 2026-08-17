import React from 'react';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface BenefitsSectionProps {
  benefits: string[];
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ benefits }) => {
  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full">
            Business Benefits
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            Manfaat Nyata Bagi Bisnis Anda
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Nilai tambah jangka panjang yang dihasilkan dari investasi transformasi digital berbasis AI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((ben, idx) => (
            <div
              key={idx}
              className="bg-slate-900/50 border border-slate-800 hover:border-emerald-800/50 rounded-2xl p-6 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 w-fit mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                  {ben}
                </h3>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>Terukur & Berkelanjutan</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
