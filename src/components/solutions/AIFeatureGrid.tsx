import React from 'react';
import * as Icons from 'lucide-react';
import { Sparkles, Bot, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { AIFeatureItem } from '../../types';

interface AIFeatureGridProps {
  features: AIFeatureItem[];
}

export const AIFeatureGrid: React.FC<AIFeatureGridProps> = ({ features }) => {
  return (
    <section className="py-16 bg-slate-900/50 border-b border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/60 border border-purple-800/50 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Features
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            Kecerdasan Artifisial Terintegrasi
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Mengubah data mentah menjadi wawasan otomatis dan rekomendasi presisi real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {features.map((feat) => {
            const IconComponent = (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[feat.iconName] || Sparkles;

            return (
              <div
                key={feat.id || feat.name}
                className="bg-slate-950/80 border border-purple-900/30 hover:border-purple-600/50 rounded-2xl p-6 transition-all relative overflow-hidden group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-purple-950/80 border border-purple-800/50 text-purple-400 shrink-0 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {feat.name}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-700/50">
                        {feat.type}
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed mt-2">
                      {feat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
