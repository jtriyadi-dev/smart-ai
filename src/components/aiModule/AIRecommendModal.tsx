import React, { useState } from 'react';
import { X, Sparkles, Plus, CheckCircle2, RefreshCw, Boxes } from 'lucide-react';
import { ApplicationModule } from '../../types';

interface AIRecommendModalProps {
  isOpen: boolean;
  suggestedModules: ApplicationModule[];
  isLoading: boolean;
  onClose: () => void;
  onAddSelected: (modules: ApplicationModule[]) => void;
}

export const AIRecommendModal: React.FC<AIRecommendModalProps> = ({
  isOpen,
  suggestedModules,
  isLoading,
  onClose,
  onAddSelected
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleConfirmAdd = () => {
    const chosen = suggestedModules.filter((m) => selectedIds.includes(m.id));
    onAddSelected(chosen);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-950 border border-blue-800 text-blue-400">
              <Sparkles className="w-5 h-5 animate-pulse text-cyan-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Rekomendasi Modul Tambahan AI</h3>
              <p className="text-xs text-slate-400">Modul pelengkap yang direkomendasikan AI untuk meningkatkan nilai bisnis</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mb-3" />
              <p className="text-sm font-semibold text-white">AI sedang mencari modul tambahan terbaik...</p>
            </div>
          ) : suggestedModules.length > 0 ? (
            <div className="space-y-3">
              {suggestedModules.map((mod) => {
                const isChecked = selectedIds.includes(mod.id);

                return (
                  <div
                    key={mod.id}
                    onClick={() => toggleSelect(mod.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-blue-950/80 border-blue-500 shadow-md shadow-blue-950/50'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="mt-1">
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-700 bg-slate-900'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-blue-300 border border-slate-800 font-bold uppercase">
                          {mod.category}
                        </span>
                        <h4 className="font-bold text-white text-sm">{mod.name}</h4>
                      </div>
                      <p className="text-slate-300 text-xs mb-2">{mod.description}</p>
                      <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-[11px] text-slate-400 italic">
                        &ldquo;{mod.purpose}&rdquo;
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-500">
              Seluruh modul penting untuk industri Anda telah lengkap dikonfigurasi.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            {selectedIds.length} Modul Terpilih
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={handleConfirmAdd}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-950 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambahkan Modul Terpilih</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
