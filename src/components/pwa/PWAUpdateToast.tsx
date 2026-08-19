import React from 'react';
import { RefreshCw, Sparkles, X } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

export const PWAUpdateToast: React.FC = () => {
  const { hasUpdate, updateApp } = usePWA();
  const [dismissed, setDismissed] = React.useState(false);

  if (!hasUpdate || dismissed) {
    return null;
  }

  return (
    <aside 
      aria-label="Pembaruan Aplikasi PWA"
      className="fixed top-20 right-4 sm:right-6 z-50 animate-in slide-in-from-top-4 duration-300 max-w-sm"
    >
      <div className="p-3.5 rounded-xl bg-[#0b1329]/95 border border-cyan-500/40 backdrop-blur-xl shadow-xl shadow-cyan-950/50 text-slate-100 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0 pr-1">
          <p className="text-xs font-bold text-white">Versi Baru Tersedia</p>
          <p className="text-[11px] text-slate-300 mt-0.5">Pembaruan sistem SMART-AI.ID telah diunduh di latar belakang.</p>
          <div className="mt-2.5 flex items-center gap-2">
            <button
              onClick={updateApp}
              className="py-1 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Perbarui Sekarang
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="py-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            >
              Nanti
            </button>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800/60"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
