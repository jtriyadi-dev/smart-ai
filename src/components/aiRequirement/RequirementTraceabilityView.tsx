import React from 'react';
import { TraceabilityItem } from '../../types';
import { ArrowRight, AlertTriangle, Target, Layers, GitCommit, Sparkles, CheckCircle2 } from 'lucide-react';

interface RequirementTraceabilityViewProps {
  traceabilityMap: TraceabilityItem[];
}

export const RequirementTraceabilityView: React.FC<RequirementTraceabilityViewProps> = ({
  traceabilityMap
}) => {
  if (!traceabilityMap || traceabilityMap.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
        Traceability matrix sedang disusun dari data requirement.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <GitCommit className="w-4 h-4" />
            <span>MATRIKS TRACEABILITY REQUIREMENT</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Penelusuran Kebutuhan End-to-End
          </h3>
          <p className="text-xs text-slate-400">
            Setiap fitur dan modul memiliki rantai korelasi langsung dari akar masalah bisnis hingga kapabilitas AI.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {traceabilityMap.map((item, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4"
          >
            {/* Visual Trace Flowchain Banner */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 text-xs items-center">
              
              {/* Step 1: Problem */}
              <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-mono text-red-400 font-bold">
                  <AlertTriangle className="w-3 h-3" />
                  <span>1. MASALAH BISNIS</span>
                </div>
                <p className="font-semibold text-slate-200 line-clamp-3 text-[11px]">
                  {item.problem}
                </p>
              </div>

              {/* Step 2: BR */}
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-mono text-amber-400 font-bold">
                  <Target className="w-3 h-3" />
                  <span>2. BUSINESS REQ</span>
                </div>
                <p className="font-bold text-amber-300 text-xs">
                  {item.businessRequirementId}
                </p>
                <p className="text-[11px] text-slate-300">Target Efisiensi Terukur</p>
              </div>

              {/* Step 3: FR */}
              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/30 space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-mono text-blue-400 font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>3. FUNCTIONAL REQ</span>
                </div>
                <p className="font-bold text-blue-300 text-xs">
                  {item.functionalRequirementId}
                </p>
                <p className="text-[11px] text-slate-300">Spesifikasi Fitur</p>
              </div>

              {/* Step 4: Module */}
              <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-mono text-indigo-400 font-bold">
                  <Layers className="w-3 h-3" />
                  <span>4. MODUL SISTEM</span>
                </div>
                <p className="font-bold text-slate-200 truncate text-[11px]">
                  {item.moduleName}
                </p>
              </div>

              {/* Step 5: Workflow */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 font-bold">
                  <GitCommit className="w-3 h-3 text-cyan-400" />
                  <span>5. WORKFLOW</span>
                </div>
                <p className="font-semibold text-slate-300 truncate text-[11px]">
                  {item.workflowTitle}
                </p>
              </div>

              {/* Step 6: AI Capability */}
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-300 font-bold">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>6. KAPABILITAS AI</span>
                </div>
                <p className="font-bold text-cyan-200 text-[11px] line-clamp-2">
                  {item.aiCapability}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
