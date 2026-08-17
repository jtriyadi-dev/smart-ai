import React from 'react';
import {
  Cpu,
  Sparkles,
  Layers,
  Users,
  DollarSign,
  Shield,
  FileText,
  Workflow,
  Edit2,
  Trash2,
  Eye,
  ChevronUp,
  ChevronDown,
  Lock,
  Boxes,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { ApplicationModule, ModulePriority } from '../../types';

interface ModuleCardProps {
  module: ApplicationModule;
  index: number;
  totalModules: number;
  onViewDetails: (module: ApplicationModule) => void;
  onEdit: (module: ApplicationModule) => void;
  onDelete: (module: ApplicationModule) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  index,
  totalModules,
  onViewDetails,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown
}) => {
  // Category Icon Resolver
  const getCategoryIcon = (category: string, name: string) => {
    const norm = (category + ' ' + name).toLowerCase();
    if (norm.includes('ai') || norm.includes('analytics') || norm.includes('predict')) return Sparkles;
    if (norm.includes('finance') || norm.includes('kasir') || norm.includes('billing') || norm.includes('spp')) return DollarSign;
    if (norm.includes('hr') || norm.includes('employee') || norm.includes('siswa') || norm.includes('pasien')) return Users;
    if (norm.includes('security') || norm.includes('she') || norm.includes('audit')) return Shield;
    if (norm.includes('core') || norm.includes('dashboard')) return Cpu;
    if (norm.includes('report') || norm.includes('report') || norm.includes('rekam')) return FileText;
    return Layers;
  };

  const IconComponent = getCategoryIcon(module.category, module.name);

  // Priority Badge Color Helper
  const getPriorityBadgeClass = (priority: ModulePriority) => {
    switch (priority) {
      case 'Must Have':
        return 'bg-rose-950/80 text-rose-300 border-rose-500/50';
      case 'Recommended':
        return 'bg-blue-950/80 text-blue-300 border-blue-500/50';
      case 'Optional':
        return 'bg-slate-900 text-slate-400 border-slate-700';
      default:
        return 'bg-slate-900 text-slate-300 border-slate-700';
    }
  };

  const hasAIFeatures = module.aiFeatures && module.aiFeatures.length > 0;
  const hasDependencies = module.dependencies && module.dependencies.length > 0;

  return (
    <div
      id={`module-card-${module.id}`}
      className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition-all duration-200 flex flex-col justify-between group relative overflow-hidden backdrop-blur-sm"
    >
      {/* Top Header bar with Category, Priority & Reorder controls */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Category Tag */}
            <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800">
              {module.category}
            </span>

            {/* Priority Tag */}
            <span
              className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md border ${getPriorityBadgeClass(
                module.priority
              )}`}
            >
              {module.priority}
            </span>

            {/* Status / Source Badge */}
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800/80">
              {module.status}
            </span>
          </div>

          {/* Up / Down Reorder buttons */}
          <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => onMoveUp(index)}
              disabled={index === 0}
              title="Pindahkan Ke Atas"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onMoveDown(index)}
              disabled={index === totalModules - 1}
              title="Pindahkan Ke Bawah"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Module Title & Icon */}
        <div className="flex items-start gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-blue-400 group-hover:border-blue-500/50 group-hover:text-cyan-300 transition-colors shrink-0 mt-0.5 shadow-inner">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-semibold text-slate-500">#{module.id}</span>
              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                {module.name}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{module.description}</p>
          </div>
        </div>

        {/* Purpose */}
        {module.purpose && (
          <div className="mt-3 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-xs text-slate-300">
            <span className="text-[10px] font-mono text-slate-500 block font-semibold mb-0.5 uppercase tracking-wide">
              Tujuan Bisnis:
            </span>
            <p className="line-clamp-2 italic text-slate-300/90">&ldquo;{module.purpose}&rdquo;</p>
          </div>
        )}

        {/* Badges Bar (Features Count, AI Badge, Dependencies) */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800/80">
          {/* Feature Count */}
          <div className="flex items-center gap-1 text-[11px] font-mono font-semibold text-slate-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <Boxes className="w-3.5 h-3.5 text-blue-400" />
            <span>{module.features?.length || 0} Fitur</span>
          </div>

          {/* AI Badge */}
          {hasAIFeatures && (
            <div className="flex items-center gap-1 text-[11px] font-mono font-semibold text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800/60">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>{module.aiFeatures.length} AI Capable</span>
            </div>
          )}

          {/* Dependencies Badge */}
          {hasDependencies && (
            <div className="flex items-center gap-1 text-[11px] font-mono text-purple-300 bg-purple-950/80 px-2 py-1 rounded-lg border border-purple-800/60" title="Memiliki Ketergantungan Modul">
              <Workflow className="w-3.5 h-3.5 text-purple-400" />
              <span>{module.dependencies.length} Dep</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onViewDetails(module)}
          className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-blue-400" />
          <span>Detail</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(module)}
            title="Edit Modul"
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-slate-400 hover:text-amber-300 text-xs transition-all cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(module)}
            title="Hapus Modul"
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-rose-500/50 text-slate-400 hover:text-rose-400 text-xs transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
