import React from 'react';
import { WorkflowRequirementItem } from '../../types';
import { GitCommit, ArrowRight, UserCheck, CheckCircle2, Shield, AlertCircle } from 'lucide-react';

interface RequirementWorkflowViewProps {
  workflows: WorkflowRequirementItem[];
}

export const RequirementWorkflowView: React.FC<RequirementWorkflowViewProps> = ({
  workflows
}) => {
  if (!workflows || workflows.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
        Workflow bisnis belum dikonfigurasi.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {workflows.map((wf, idx) => (
        <div
          key={idx}
          className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6"
        >
          {/* Header info */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase">
                <GitCommit className="w-4 h-4" />
                <span>WORKFLOW ID: {wf.id || `WF-00${idx + 1}`}</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {wf.workflowName}
              </h3>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                Trigger: <strong className="text-cyan-300">{wf.trigger}</strong>
              </div>
            </div>
          </div>

          {/* Workflow Flow Steps Visual Map */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase font-bold">
              LANGKAH EKSEKUSI WORKFLOW & AKTOR PENGGERAK
            </div>

            {/* Steps Container */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {wf.steps.map((stepText, sIdx) => (
                <div
                  key={sIdx}
                  className="relative p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center">
                      {sIdx + 1}
                    </span>
                    {sIdx < wf.steps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-slate-600 hidden md:block" />
                    )}
                  </div>
                  <p className="text-xs text-slate-200 font-medium">
                    {stepText}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Metadata Grid: Actors, Approval, Output */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-800/80 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
              <div className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>AKTOR TERLIBAT</span>
              </div>
              <p className="font-bold text-slate-200">
                {wf.actors ? wf.actors.join(', ') : 'Operator & Supervisor'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
              <div className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>HIRARKI APPROVAL</span>
              </div>
              <p className="font-bold text-amber-300">
                {wf.approval || 'Approval bertingkat otomatis'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
              <div className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>OUTPUT WORKFLOW</span>
              </div>
              <p className="font-bold text-emerald-300">
                {wf.output || 'Laporan terverifikasi & entri database'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
