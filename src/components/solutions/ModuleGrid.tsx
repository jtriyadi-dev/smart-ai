import React from 'react';
import * as Icons from 'lucide-react';
import { IndustryModuleItem } from '../../types';

interface ModuleGridProps {
  modules: IndustryModuleItem[];
}

export const ModuleGrid: React.FC<ModuleGridProps> = ({ modules }) => {
  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-3 py-1 rounded-full">
            Core Modules
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            Modul Utama Aplikasi
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Rangkaian modul bisnis yang siap digunakan dan dikustomisasi sesuai alur kerja perusahaan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => {
            const IconComponent = (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[mod.iconName] || Icons.Box;

            return (
              <div
                key={mod.id || mod.name}
                className="bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-cyan-800/60 rounded-2xl p-6 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  {mod.aiBadge && (
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                      {mod.aiBadge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                  {mod.name}
                </h3>

                <p className="text-slate-400 text-xs leading-relaxed">
                  {mod.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
