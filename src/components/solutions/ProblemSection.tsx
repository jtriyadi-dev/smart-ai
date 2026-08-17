import React from 'react';
import { AlertCircle, ArrowDownRight, CheckCircle2 } from 'lucide-react';
import { IndustryProblemItem } from '../../types';

interface ProblemSectionProps {
  problems: IndustryProblemItem[];
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ problems }) => {
  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-red-400 bg-red-950/60 border border-red-800/50 px-3 py-1 rounded-full">
            Common Business Challenges
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            Tantangan Utama Industri Saat Ini
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Hambatan operasional yang sering menghambat pertumbuhan dan efisiensi perusahaan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((prob, idx) => (
            <div
              key={prob.id || idx}
              className="bg-slate-900/50 border border-slate-800 hover:border-red-900/50 rounded-2xl p-6 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-900/50 text-red-400 shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{prob.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {prob.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs text-red-400 font-medium">
                      <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
                      <span>Dampak Bisnis: {prob.impact}</span>
                    </div>

                    <div className="flex items-start gap-2 text-xs text-cyan-300 font-medium bg-cyan-950/40 p-2.5 rounded-lg border border-cyan-900/40">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Solusi AI: {prob.solutionHighlight}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
