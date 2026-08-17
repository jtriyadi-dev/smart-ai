import React from 'react';
import {
  X,
  PlusCircle,
  Sparkles,
  Users,
  Briefcase,
  Layers,
  FileText,
  DollarSign,
  PenTool,
  Cpu,
  Brain,
  MessageSquareQuote
} from 'lucide-react';
import { useRouter } from '../../lib/router';

interface QuickActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickActionsModal: React.FC<QuickActionsModalProps> = ({ isOpen, onClose }) => {
  const { navigate } = useRouter();

  if (!isOpen) return null;

  const standardActions = [
    { label: '+ New Lead', route: '/admin/leads', icon: Users, color: 'text-cyan-400' },
    { label: '+ New Customer', route: '/admin/customers', icon: Briefcase, color: 'text-indigo-400' },
    { label: '+ New Project', route: '/admin/projects/new', icon: Layers, color: 'text-emerald-400' },
    { label: '+ New Proposal', route: '/admin/proposals/new', icon: FileText, color: 'text-amber-400' },
    { label: '+ New Quotation', route: '/admin/quotations/new', icon: DollarSign, color: 'text-purple-400' },
    { label: '+ New Invoice', route: '/admin/invoices/new', icon: DollarSign, color: 'text-rose-400' },
    { label: '+ New Article', route: '/admin/blog', icon: PenTool, color: 'text-teal-400' },
    { label: '+ New Service', route: '/admin/services', icon: Cpu, color: 'text-blue-400' }
  ];

  const aiActions = [
    { label: 'Build App with AI', route: '/ai-app-builder', icon: Sparkles, color: 'text-cyan-300' },
    { label: 'Analyze Requirement', route: '/ai-requirement-analyzer', icon: Brain, color: 'text-purple-300' },
    { label: 'Generate Proposal', route: '/admin/proposals/new', icon: MessageSquareQuote, color: 'text-amber-300' },
    { label: 'AI Sales Analysis', route: '/admin/ai-sales-assistant', icon: Sparkles, color: 'text-emerald-300' },
    { label: 'AI Content Assistant', route: '/admin/blog', icon: PenTool, color: 'text-indigo-300' }
  ];

  const handleRun = (route: string) => {
    navigate(route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white font-display">Quick Action Center</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Standard Actions */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">ENTITIES & DOCUMENTS</div>
          <div className="grid grid-cols-2 gap-2">
            {standardActions.map((act, i) => {
              const Icon = act.icon;
              return (
                <button
                  key={i}
                  onClick={() => handleRun(act.route)}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 hover:bg-slate-800 flex items-center gap-3 text-xs font-bold text-slate-200 transition-colors text-left"
                >
                  <Icon className={`w-4 h-4 ${act.color}`} />
                  <span>{act.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Actions */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="text-xs font-mono text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI COPILOT QUICK ACTIONS</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {aiActions.map((act, i) => {
              const Icon = act.icon;
              return (
                <button
                  key={i}
                  onClick={() => handleRun(act.route)}
                  className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/50 hover:bg-purple-900/40 flex items-center gap-3 text-xs font-bold text-purple-100 transition-colors text-left"
                >
                  <Icon className={`w-4 h-4 ${act.color}`} />
                  <span>{act.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
