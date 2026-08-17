import React from 'react';
import { Network, CheckCircle, Shield } from 'lucide-react';

interface IntegrationSectionProps {
  integrations: string[];
  technologies?: { category: string; stack: string[] }[];
}

export const IntegrationSection: React.FC<IntegrationSectionProps> = ({ integrations, technologies }) => {
  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5" />
            Integrations & Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            Konektivitas & Integrasi Ekosistem
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Terhubung secara lancar dengan perangkat keras, sensor IoT, dan perangkat lunak yang sudah Anda gunakan.
          </p>
        </div>

        {/* Integrations List */}
        <div className="mb-12">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
            Integrasi Perangkat & Sistem Terkait
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {integrations.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 hover:border-cyan-700/60 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs font-medium text-slate-200 transition-all shadow-md"
              >
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{item}</span>
                <span className="ml-1 text-[10px] text-cyan-400/80 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800/40 font-mono">
                  Integration Available / Can Be Integrated
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Architecture Stack */}
        {technologies && technologies.length > 0 && (
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Modern Technology Architecture Stack</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {technologies.map((tech, idx) => (
                <div key={idx} className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                    {tech.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tech.stack.map((s, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
