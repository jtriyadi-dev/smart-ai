import React, { useState } from 'react';
import { Layers, Workflow, ArrowDown, Sparkles, Cpu, Boxes, CheckCircle2 } from 'lucide-react';
import { ApplicationModule } from '../../types';

interface ModuleArchitectureMapProps {
  modules: ApplicationModule[];
  onSelectModule: (module: ApplicationModule) => void;
}

export const ModuleArchitectureMap: React.FC<ModuleArchitectureMapProps> = ({ modules, onSelectModule }) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  const categories = ['Core', 'Operations', 'Management', 'Finance', 'HR', 'Reporting', 'AI'];

  const groupedModules = categories.reduce((acc, cat) => {
    acc[cat] = modules.filter((m) => m.category.toLowerCase().includes(cat.toLowerCase()));
    return acc;
  }, {} as Record<string, ApplicationModule[]>);

  // Catch any remaining modules in 'Other'
  const categorizedIds = new Set(Object.values(groupedModules).flat().map((m) => m.id));
  const otherModules = modules.filter((m) => !categorizedIds.has(m.id));
  if (otherModules.length > 0) {
    groupedModules['Other'] = otherModules;
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 my-6 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Workflow className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">Module Architecture & Dependency Map</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Peta hierarki antar lapisan modul aplikasi ({modules.length} total modul)
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
          <span>Core Layer</span>
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block ml-2" />
          <span>Ops Layer</span>
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block ml-2" />
          <span>AI Layer</span>
        </div>
      </div>

      {/* Layer Map Stack */}
      <div className="space-y-6 relative">
        {Object.entries(groupedModules).map(([layerName, layerMods], lIdx) => {
          if (!layerMods || layerMods.length === 0) return null;

          return (
            <div key={layerName} className="relative">
              {/* Layer Title Bar */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-slate-950 text-blue-300 border border-slate-800">
                  Layer: {layerName}
                </span>
                <div className="flex-1 h-px bg-slate-800/80" />
              </div>

              {/* Module Nodes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {layerMods.map((mod) => {
                  const isSelected = selectedModuleId === mod.id;
                  const isAI = mod.category === 'AI' || (mod.aiFeatures && mod.aiFeatures.length > 0);

                  return (
                    <div
                      key={mod.id}
                      onClick={() => {
                        setSelectedModuleId(mod.id);
                        onSelectModule(mod);
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-950 border-blue-500 shadow-lg shadow-blue-950'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono text-slate-500 font-bold">#{mod.id}</span>
                          <span
                            className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                              mod.priority === 'Must Have'
                                ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                                : 'bg-blue-950/80 text-blue-300 border-blue-800'
                            }`}
                          >
                            {mod.priority}
                          </span>
                        </div>

                        <h4 className="font-bold text-white text-xs group-hover:text-blue-300 transition-colors line-clamp-1 mb-1">
                          {mod.name}
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">{mod.description}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>{mod.features?.length || 0} Fitur</span>
                        {isAI && (
                          <span className="text-cyan-300 flex items-center gap-1 font-semibold">
                            <Sparkles className="w-3 h-3 text-cyan-400" />
                            AI Enabled
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Connecting Down Arrow between layers */}
              {lIdx < Object.keys(groupedModules).length - 1 && (
                <div className="flex justify-center my-3">
                  <ArrowDown className="w-4 h-4 text-slate-700 animate-bounce" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
